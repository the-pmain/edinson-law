/**
 * Forensic field checks for s.303Z51 matter documents.
 * Live SRA / chain lookups stay out of band — this validates against the firm
 * register, format rules, and cross-field consistency before a PDF is issued.
 */

const PLACEHOLDER_RE = /\[.+\]|^_{2,}$|^\?+$/i;
const REJECTED_PERSON_NAME_RE = /^(thelegal|test|n\/?a|tbd|todo|placeholder)$/i;
const ETH_RE = /^0x[a-fA-F0-9]{40}$/;
const NFRC_RE = /^NFRC\d{9,12}$/i;
const POLICE_URN_RE = /^(?:[A-Z]{1,3}\/\d{2}\/\d{4,8}|\d{10,12})$/i;
const OUR_REF_RE = /^EL\/\d{4}\/\d{3,}$/i;
const FIRM_DOMAINS = ["edisonlaw.co.uk", "edisonlawlegal.com"];
const KNOWN_EXCHANGES = [
  "bitfinex", "binance", "coinbase", "kraken", "okx", "kucoin",
  "bybit", "bitstamp", "gemini", "huobi", "crypto.com",
];

/** Firm register snapshot used in place of a live SRA scrape. */
export const FIRM_SRA_REGISTER = {
  organisationNumber: "510498",
  organisationUrl: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=510498",
  namedSolicitor: {
    name: "Abigail Charlotte Wills",
    email: "abi.wills@edisonlaw.co.uk",
    slug: "abigail-wills",
    sraRegulated: true,
  },
};

export const FIXED_FEE_EARNER_LINE = `${FIRM_SRA_REGISTER.namedSolicitor.name} · ${FIRM_SRA_REGISTER.namedSolicitor.email}`;

function trim(value) {
  return String(value ?? "").trim();
}

function issue(severity, code, message, suggestion = "") {
  return { severity, code, message, suggestion };
}

function result(ok, issues = [], meta = {}) {
  return { ok, issues, ...meta };
}

function parseFeeEarner(line) {
  const parts = trim(line).split(/\s*[·•|]\s*/).map((p) => p.trim()).filter(Boolean);
  const name = parts[0] || "";
  const email = parts.find((p) => p.includes("@")) || "";
  const phone = parts.find((p) => p !== name && p !== email && /[0-9]{4,}/.test(p)) || "";
  return { name, email, phone };
}

function emailDomain(email) {
  const at = String(email).lastIndexOf("@");
  return at >= 0 ? String(email).slice(at + 1).toLowerCase() : "";
}

function findPerson(people, { name = "", email = "", slug = "" } = {}) {
  const list = Array.isArray(people) ? people : [];
  const emailKey = trim(email).toLowerCase();
  const nameKey = trim(name).toLowerCase();
  const slugKey = trim(slug).toLowerCase();
  return list.find((person) => {
    if (slugKey && person.slug === slugKey) return true;
    if (emailKey && String(person.email || "").toLowerCase() === emailKey) return true;
    if (nameKey && String(person.name || "").toLowerCase() === nameKey) return true;
    return false;
  }) || null;
}

/**
 * Validate fee earner against the firm register / SRA-named solicitor.
 * Does not call the live SRA API — returns the public register URL for manual check.
 */
export function validateSolicitorCredentials(feeEarner, people = []) {
  const issues = [];
  const parsed = parseFeeEarner(feeEarner);
  if (!parsed.name && !parsed.email) {
    issues.push(issue("critical", "solicitor.missing", "No fee earner is set on the document."));
    return result(false, issues, {
      parsed,
      recommended: FIRM_SRA_REGISTER.namedSolicitor,
      registerUrl: FIRM_SRA_REGISTER.organisationUrl,
    });
  }

  const person = findPerson(people, parsed);
  const named = FIRM_SRA_REGISTER.namedSolicitor;
  const domain = emailDomain(parsed.email);

  if (parsed.email && !FIRM_DOMAINS.includes(domain)) {
    issues.push(issue(
      "critical",
      "solicitor.domain",
      `Fee earner email uses unrecognised domain @${domain}.`,
      `Use ${named.email} for reserved-work correspondence.`,
    ));
  }

  if (person && !person.sraRegulated) {
    issues.push(issue(
      "critical",
      "solicitor.not-sra",
      `${person.name} is on the firm roster but is not the SRA-regulated solicitor. Investigative staff must not appear as the letterhead contact on court or claim documents.`,
      `Replace with ${named.name} · ${named.email}. Confirm practising status at ${FIRM_SRA_REGISTER.organisationUrl}.`,
    ));
  }

  if (!person && parsed.email.toLowerCase() !== named.email) {
    issues.push(issue(
      "critical",
      "solicitor.unknown",
      `Fee earner "${parsed.name || parsed.email}" is not on the firm register.`,
      `Use ${named.name} · ${named.email}.`,
    ));
  }

  if (person?.sraRegulated || parsed.email.toLowerCase() === named.email) {
    if (parsed.email.toLowerCase() !== named.email && person?.slug === named.slug) {
      issues.push(issue(
        "medium",
        "solicitor.email-mismatch",
        "SRA solicitor name matched but email differs from the organisation record contact.",
        named.email,
      ));
    }
  }

  const ok = !issues.some((item) => item.severity === "critical");
  return result(ok, issues, {
    parsed,
    person,
    recommended: named,
    registerUrl: FIRM_SRA_REGISTER.organisationUrl,
  });
}

/** Coerce a fee-earner line to the SRA-named solicitor when the current value is unsafe. */
export function coerceSraFeeEarner(feeEarner, people = []) {
  const check = validateSolicitorCredentials(feeEarner, people);
  if (check.ok) {
    const email = check.parsed.email || check.recommended.email;
    const name = check.person?.name || check.parsed.name || check.recommended.name;
    const phone = check.parsed.phone || check.person?.phone || "";
    return [name, phone, email].filter(Boolean).join(" · ");
  }
  const named = check.recommended;
  return FIXED_FEE_EARNER_LINE;
}

/**
 * Parse crypto/fiat money strings. Flags non-standard grouping such as "5000,500 USDT".
 */
export function parseMoneyAmount(value) {
  const raw = trim(value);
  if (!raw) return { ok: false, amount: null, unit: "", raw, issues: [issue("critical", "money.empty", "Amount is empty.")] };

  const issues = [];
  const match = raw.match(/^([^0-9]*?)\s*([0-9][0-9.,]*)\s*([A-Za-z£$€]*)$/);
  if (!match) {
    return {
      ok: false,
      amount: null,
      unit: "",
      raw,
      issues: [issue("critical", "money.unparsed", `Cannot parse amount "${raw}".`, "Use forms like 50,005 USDT or £31,000.")],
    };
  }

  const prefix = trim(match[1]);
  const digits = match[2];
  const suffix = trim(match[3] || prefix.replace(/[^A-Za-z]/g, ""));
  const unit = (suffix || (prefix.includes("£") ? "GBP" : "")).replace(/^£$/, "GBP").toUpperCase();

  // Ambiguous: thousands digits with a single comma mid-number like 5000,500
  if (/^\d{4,},\d{3}$/.test(digits) && !/^\d{1,3}(,\d{3})+$/.test(digits)) {
    const asUk = Number(digits.replace(/,/g, ""));
    const asEuroDecimal = Number(digits.replace(",", "."));
    issues.push(issue(
      "critical",
      "money.ambiguous-group",
      `Amount "${digits}" is not standard English grouping (expected 5,000,500 or 50,005).`,
      Number.isFinite(asUk)
        ? `If you meant ${asUk.toLocaleString("en-GB")} ${unit}, confirm against the sterling figure. Euro-style decimal would be ${asEuroDecimal}.`
        : "Rewrite with explicit English thousands separators.",
    ));
  }

  let normalizedDigits = digits;
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(digits)) {
    normalizedDigits = digits.replace(/,/g, "");
  } else if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(digits)) {
    normalizedDigits = digits.replace(/\./g, "").replace(",", ".");
  } else if (/^\d+,\d{1,2}$/.test(digits)) {
    normalizedDigits = digits.replace(",", ".");
  } else {
    normalizedDigits = digits.replace(/,/g, "");
  }

  const amount = Number(normalizedDigits);
  if (!Number.isFinite(amount) || amount < 0) {
    issues.push(issue("critical", "money.nan", `Amount "${raw}" is not a finite number.`));
  }

  const ok = issues.every((item) => item.severity !== "critical") && Number.isFinite(amount);
  return { ok, amount: Number.isFinite(amount) ? amount : null, unit, raw, issues };
}

export function formatAssetAmount(amount, unit = "USDT") {
  if (!Number.isFinite(amount)) return "";
  const whole = Number.isInteger(amount) ? amount : Math.round(amount * 100) / 100;
  const text = whole.toLocaleString("en-GB", {
    maximumFractionDigits: Number.isInteger(whole) ? 0 : 2,
  });
  return unit && unit !== "GBP" ? `${text} ${unit}` : `£${text}`;
}

/**
 * Cross-check claimed crypto against stated sterling value.
 * USDT is treated as ~1 USD; GBP band is a soft reasonableness check only.
 */
export function validateMonetaryValues(fields = {}) {
  const issues = [];
  const claimed = parseMoneyAmount(fields.claimed || fields.releasedAssets || "");
  const loss = parseMoneyAmount(fields.lossValue || "");
  const holds = fields.walletHolds ? parseMoneyAmount(fields.walletHolds) : null;

  issues.push(...claimed.issues);
  if (String(fields.lossValue || "").trim()) issues.push(...loss.issues);
  if (holds) issues.push(...holds.issues);

  if (claimed.ok && holds?.ok && claimed.amount > holds.amount) {
    issues.push(issue(
      "critical",
      "money.claim-exceeds-wallet",
      `Claimed ${formatAssetAmount(claimed.amount, claimed.unit)} exceeds wallet holdings ${formatAssetAmount(holds.amount, holds.unit)}.`,
    ));
  }

  if (claimed.ok && loss.ok && /USDT|USD|USDC/.test(claimed.unit) && (loss.unit === "GBP" || String(fields.lossValue || "").includes("£"))) {
    const gbpPerUnit = loss.amount / claimed.amount;
    // Soft band: stablecoin vs GBP historically ~0.70–1.10; widen for date drift.
    if (gbpPerUnit < 0.45 || gbpPerUnit > 1.35) {
      issues.push(issue(
        "critical",
        "money.fx-implausible",
        `Implied rate £${gbpPerUnit.toFixed(4)} per ${claimed.unit} between "${fields.claimed || fields.releasedAssets}" and "${fields.lossValue}" is outside a plausible stablecoin/GBP band.`,
        "Reconcile the crypto quantity with the sterling loss at the transfer dates (e.g. 50,005 USDT ↔ ~£31,000 is plausible; 5,000,500 USDT is not).",
      ));
    }
  }

  return result(!issues.some((item) => item.severity === "critical"), issues, {
    claimed,
    loss,
    holds,
    suggestions: {
      claimed: claimed.ok ? formatAssetAmount(claimed.amount, claimed.unit || "USDT") : "",
      lossValue: loss.ok ? (String(fields.lossValue || "").includes("£") || loss.unit === "GBP" ? `£${loss.amount.toLocaleString("en-GB")}` : formatAssetAmount(loss.amount, loss.unit)) : "",
    },
  });
}

export function validateFreezingOrder(fields = {}) {
  const issues = [];
  if (!trim(fields.orderDate || fields.freezeDate)) {
    issues.push(issue("critical", "docs.freezing-order.date", "Freezing order date is missing."));
  }
  if (!trim(fields.wallet)) {
    issues.push(issue("critical", "docs.freezing-order.wallet", "Frozen wallet address is missing."));
  }
  if (!trim(fields.exchange)) {
    issues.push(issue("medium", "docs.freezing-order.exchange", "Exchange / administrator is missing."));
  }
  if (!trim(fields.court)) {
    issues.push(issue("medium", "docs.freezing-order.court", "Court that made the freezing order is missing."));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues);
}

export function validateEllipticReport(fields = {}) {
  const issues = [];
  const provider = trim(fields.provider);
  if (!provider) {
    issues.push(issue("critical", "docs.trace.provider", "Tracing provider is missing."));
  }
  if (!trim(fields.reportDate)) {
    issues.push(issue("critical", "docs.trace.date", "Tracing report date is missing."));
  }
  if (!trim(fields.route)) {
    issues.push(issue("medium", "docs.trace.route", "Tracing route / methodology summary is missing."));
  }
  if (provider && !/elliptic|chainalysis|trmlabs|crystal|ciphertrace/i.test(provider)) {
    issues.push(issue("medium", "docs.trace.provider-unknown", `Provider "${provider}" is not a recognised analytics house — confirm the exhibit name.`));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues);
}

export function validateActionFraudReport(fields = {}) {
  const issues = [];
  const ref = trim(fields.crimeRef);
  if (!ref) {
    issues.push(issue("critical", "docs.nfrc.missing", "Action Fraud / NFRC reference is missing."));
  } else if (!NFRC_RE.test(ref) && !PLACEHOLDER_RE.test(ref)) {
    issues.push(issue("medium", "docs.nfrc.format", `Crime reference "${ref}" does not look like an NFRC number.`, "Expected form NFRC followed by 9 to 12 digits."));
  }
  const urn = trim(fields.policeUrn || "");
  if (urn && !POLICE_URN_RE.test(urn) && !PLACEHOLDER_RE.test(urn)) {
    issues.push(issue(
      "medium",
      "docs.police.format",
      `Police URN "${urn}" does not match a conventional force/year/sequence or 10–12 digit number.`,
      "Example: WY/26/014882.",
    ));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues);
}

export function validateWitnessStatement(fields = {}) {
  const issues = [];
  const name = trim(fields.wsName || fields.clientName || fields.applicant);
  if (!name) {
    issues.push(issue("critical", "docs.ws.name", "Witness / applicant name is missing for the statement reference."));
  }
  if (PLACEHOLDER_RE.test(name)) {
    issues.push(issue("critical", "docs.ws.placeholder", "Witness name is still a placeholder."));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues);
}

export function validateCaseReference(fields = {}) {
  const issues = [];
  const ref = trim(fields.caseRef || "");
  if (!ref || /to be allocated|tbc|tba|\[/i.test(ref)) {
    issues.push(issue(
      "medium",
      "case.unallocated",
      "Case reference is not yet allocated.",
      "Draft wording: Case reference: [CONFIDENTIAL CLIENT INFORMATION]. Replace with the court-issued number when allocated.",
    ));
    return result(true, issues, { allocated: false });
  }
  return result(true, issues, { allocated: true });
}

export function verifyBlockChainAddresses(address) {
  const value = trim(address);
  const issues = [];
  if (!value) {
    issues.push(issue("critical", "chain.empty", "Blockchain address is empty."));
    return result(false, issues);
  }
  // Allow descriptive origin text that embeds an address.
  const embedded = value.match(/0x[a-fA-F0-9]{40}/);
  const candidate = embedded ? embedded[0] : value;
  if (value.startsWith("0x") || embedded) {
    if (!ETH_RE.test(candidate)) {
      issues.push(issue("critical", "chain.eth-format", `"${candidate}" is not a 40-hex Ethereum address.`));
    }
  } else if (/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/.test(value)) {
    // rough bitcoin bech32 / legacy accept
  } else if (!/account|wallet|exchange|kraken|binance|address/i.test(value)) {
    issues.push(issue("medium", "chain.unrecognised", `Address "${value}" is not a recognised on-chain format.`));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues, { address: candidate });
}

export function verifyTransactionHistory(fromAddress, toAddress, amount) {
  const issues = [];
  const from = verifyBlockChainAddresses(fromAddress);
  const to = verifyBlockChainAddresses(toAddress);
  const money = amount ? parseMoneyAmount(amount) : { ok: true, issues: [] };
  issues.push(...from.issues, ...to.issues, ...money.issues);
  if (from.ok && to.ok && from.address && to.address && from.address.toLowerCase() === to.address.toLowerCase()) {
    issues.push(issue("critical", "chain.same-endpoint", "Origin and destination addresses are identical."));
  }
  issues.push(issue(
    "medium",
    "chain.history-offline",
    "Transaction history is not verified on-chain in this tool.",
    "Confirm transfers against the tracing exhibit and explorer records before filing.",
  ));
  return result(!issues.some((i) => i.severity === "critical"), issues);
}

export function verifyExchangeRelationship(address, exchange) {
  const issues = [];
  const addr = verifyBlockChainAddresses(address);
  issues.push(...addr.issues);
  const ex = trim(exchange);
  if (!ex) {
    issues.push(issue("medium", "exchange.missing", "Exchange / administrator name is missing."));
  } else if (!KNOWN_EXCHANGES.some((name) => ex.toLowerCase().includes(name))) {
    issues.push(issue("medium", "exchange.unknown", `Exchange "${ex}" is not in the known venue list — confirm the administrator named on the freezing order.`));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues);
}

/** True when a name would fail the critical identity check (empty, bracket placeholder, TheLegal, test). */
export function isRejectedApplicantName(value) {
  const name = trim(value);
  return !name || PLACEHOLDER_RE.test(name) || REJECTED_PERSON_NAME_RE.test(name);
}

export function verifyApplicantIdentity(applicantDetails = {}) {
  const issues = [];
  const name = trim(applicantDetails.clientName || applicantDetails.applicant || applicantDetails.name);
  const address = trim(applicantDetails.clientAddr || applicantDetails.address);
  if (isRejectedApplicantName(name)) {
    issues.push(issue("critical", "id.name", "Applicant full name is missing, a placeholder, or not a personal name (e.g. TheLegal).", "Use the client's full legal name."));
  } else if (name.split(/\s+/).length < 2) {
    issues.push(issue("medium", "id.name-thin", "Applicant name should usually include forename and surname."));
  }
  if (!address || PLACEHOLDER_RE.test(address)) {
    issues.push(issue("critical", "id.address", "Applicant address is missing or still a placeholder."));
  }
  return result(!issues.some((i) => i.severity === "critical"), issues, { name, address });
}

const FIELD_HANDLERS = {
  feeEarner: (value, fields, ctx) => validateSolicitorCredentials(value, ctx.people),
  claimed: (value, fields) => validateMonetaryValues({ ...fields, claimed: value }),
  lossValue: (value, fields) => validateMonetaryValues({ ...fields, lossValue: value }),
  walletHolds: (value, fields) => validateMonetaryValues({ ...fields, walletHolds: value }),
  releasedAssets: (value, fields) => validateMonetaryValues({ ...fields, releasedAssets: value }),
  wallet: (value, fields) => verifyExchangeRelationship(value, fields.exchange),
  destinationWallet: (value) => verifyBlockChainAddresses(value),
  clientWallet: (value, fields) => verifyTransactionHistory(fields.wallet, value, fields.claimed),
  originAddr: (value, fields) => verifyTransactionHistory(value, fields.wallet, fields.claimed),
  exchange: (value, fields) => verifyExchangeRelationship(fields.wallet || fields.destinationWallet || fields.clientWallet, value),
  orderDate: (_value, fields) => validateFreezingOrder(fields),
  freezeDate: (_value, fields) => validateFreezingOrder(fields),
  provider: (_value, fields) => validateEllipticReport(fields),
  reportDate: (_value, fields) => validateEllipticReport(fields),
  crimeRef: (_value, fields) => validateActionFraudReport(fields),
  policeUrn: (_value, fields) => validateActionFraudReport(fields),
  wsName: (_value, fields) => validateWitnessStatement(fields),
  clientName: (value, fields) => verifyApplicantIdentity({ ...fields, clientName: value }),
  applicant: (value, fields) => verifyApplicantIdentity({ ...fields, applicant: value }),
  caseRef: (_value, fields) => validateCaseReference(fields),
  ourRef: (value) => {
    const ref = trim(value);
    if (!ref) return result(false, [issue("medium", "ref.our.missing", "Our ref is missing.")]);
    if (!OUR_REF_RE.test(ref) && !PLACEHOLDER_RE.test(ref)) {
      return result(true, [issue("medium", "ref.our.format", `Our ref "${ref}" is non-standard.`, "Preferred form EL/YYYY/####.")]);
    }
    return result(true, []);
  },
};

export function validateDynamicField(fieldName, value, fields = {}, ctx = {}) {
  const name = String(fieldName || "");
  const provided = value != null && trim(value) !== "";
  if (!provided && !["caseRef"].includes(name)) {
    return result(false, [issue("medium", "field.empty", `Field "${name}" is empty.`)], { fieldName: name, suggestions: [] });
  }
  if (provided && PLACEHOLDER_RE.test(trim(value))) {
    return result(false, [issue("critical", "field.placeholder", `Field "${name}" still contains placeholder text.`)], { fieldName: name });
  }
  const handler = FIELD_HANDLERS[name];
  if (!handler) {
    return result(true, [], { fieldName: name, note: "No specialised handler — presence check only." });
  }
  const out = handler(value, { ...fields, [name]: value }, ctx);
  return { ...out, fieldName: name };
}

export function validateMatterFields(fields = {}, ctx = {}) {
  const keys = [
    "feeEarner", "clientName", "applicant", "claimed", "lossValue", "walletHolds",
    "wallet", "originAddr", "exchange", "orderDate", "freezeDate", "provider",
    "reportDate", "crimeRef", "policeUrn", "wsName", "caseRef", "ourRef", "destinationWallet", "clientWallet",
  ];
  const seen = new Set();
  const issues = [];
  const fieldResults = {};

  for (const key of keys) {
    if (!(key in fields) && !["feeEarner", "clientName", "applicant", "claimed", "wallet"].includes(key)) continue;
    if (seen.has(key)) continue;
    // Skip empty optional release-only fields when absent.
    if (fields[key] == null || fields[key] === "") {
      if (!["feeEarner", "clientName", "applicant", "claimed", "lossValue", "wallet", "crimeRef", "clientWallet"].includes(key)) continue;
    }
    const out = validateDynamicField(key, fields[key], fields, ctx);
    fieldResults[key] = out;
    for (const item of out.issues) {
      const stamp = `${item.code}|${item.message}`;
      if (seen.has(stamp)) continue;
      seen.add(stamp);
      issues.push({ ...item, field: key });
    }
  }

  // Always run the document suite once.
  for (const fn of [validateFreezingOrder, validateEllipticReport, validateActionFraudReport, validateWitnessStatement, validateCaseReference, validateMonetaryValues]) {
    const out = fn(fields);
    for (const item of out.issues) {
      const stamp = `${item.code}|${item.message}`;
      if (seen.has(stamp)) continue;
      seen.add(stamp);
      issues.push(item);
    }
  }

  const id = verifyApplicantIdentity(fields);
  for (const item of id.issues) {
    const stamp = `${item.code}|${item.message}`;
    if (seen.has(stamp)) continue;
    seen.add(stamp);
    issues.push(item);
  }

  if (fields.feeEarner != null || ctx.people) {
    const sol = validateSolicitorCredentials(fields.feeEarner, ctx.people);
    for (const item of sol.issues) {
      const stamp = `${item.code}|${item.message}`;
      if (seen.has(stamp)) continue;
      seen.add(stamp);
      issues.push(item);
    }
  }

  const critical = issues.filter((item) => item.severity === "critical");
  return {
    ok: critical.length === 0,
    issues,
    critical,
    medium: issues.filter((item) => item.severity === "medium"),
    fieldResults,
    coercedFeeEarner: coerceSraFeeEarner(fields.feeEarner, ctx.people),
  };
}
