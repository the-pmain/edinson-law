/**
 * Honest verification for s.303Z51 victim-claim notices.
 * Statuses reflect format / internal-consistency checks only.
 * They are not a court, SRA, Action Fraud, or on-chain determination.
 */
import {
  FIRM_SRA_REGISTER,
  formatAssetAmount,
  parseMoneyAmount,
  validateMatterFields,
  verifyBlockChainAddresses,
} from "./matter-validate.js";
import { encodeQr } from "./qr-matrix.js";
import { explorerUrl, extractEthAddress } from "./eth-address.js";
import { formatUkLong } from "../lib/dates.js";

const FACT_KEYS = [
  "agency", "claimed", "claimants", "claimantsN", "clientAddr", "clientName",
  "copyTo", "court", "crimeRef", "exchange", "feeEarner", "fraudDates",
  "funds", "lossValue", "officer", "orderDate", "originAddr", "ourRef",
  "policeUrn", "provider", "reportDate", "route", "scamDesc", "wallet",
  "walletHolds",
];

export const SRA_REGISTER_URL = FIRM_SRA_REGISTER.organisationUrl;

export function verificationBadge(status) {
  if (status === "verified") return "[Format checked]";
  if (status === "pending") return "[Pending independent verification]";
  return "[Provisional claim]";
}

export function verificationCitation(kind) {
  if (kind === "solicitor") {
    return "Checked against the SRA public organisation register, number 510498. Confirm practising status at sra.org.uk. Not a court determination.";
  }
  if (kind === "wallet") {
    return "Address format checked. Scan the QR code to open an independent block explorer. On-chain history is not verified in this tool.";
  }
  if (kind === "statute") {
    return "Cited to ss.303Z37 and 303Z51 of the Proceeds of Crime Act 2002, and rule 12 of the Magistrates' Courts (Detention, Freezing and Forfeiture of Cryptoassets, and Miscellaneous Amendments) Rules 2024.";
  }
  if (kind === "nfrc") {
    return "Reference matches Action Fraud NFRC format. Existence of the report is not confirmed by this tool.";
  }
  if (kind === "police") {
    return "Reference matches a conventional UK force URN pattern (force/year/sequence). Existence of the crime record is not confirmed by this tool.";
  }
  return "Format checked against this firm's document rules. Unverified facts are marked Provisional.";
}

export { extractEthAddress, explorerUrl } from "./eth-address.js";

function exhibitMark(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "A1";
  const initials = (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  return `${initials}1`;
}

function hexFrom(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(String(text ?? ""));
  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return hexFrom(new Uint8Array(digest));
  }
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(bytes).digest("hex");
}

export function canonicalClaimFacts(fields = {}) {
  const out = {};
  for (const key of FACT_KEYS) {
    const value = String(fields[key] ?? "").trim();
    if (value) out[key] = value;
  }
  return JSON.stringify(out);
}

export function claimProportion(fields = {}) {
  const claimed = parseMoneyAmount(fields.claimed || "");
  const holds = parseMoneyAmount(fields.walletHolds || "");
  if (!claimed.ok || !holds?.ok || !holds.amount) {
    return { ok: false, share: null, claimed: claimed.ok ? claimed.amount : null, holds: holds?.ok ? holds.amount : null };
  }
  return {
    ok: true,
    share: claimed.amount / holds.amount,
    percent: Math.round((claimed.amount / holds.amount) * 1000) / 10,
    claimedLabel: formatAssetAmount(claimed.amount, claimed.unit || "USDT"),
    holdsLabel: formatAssetAmount(holds.amount, holds.unit || "USDT"),
  };
}

function hasCritical(issues = [], prefix) {
  return issues.some((item) => item.severity === "critical" && (!prefix || String(item.code || "").startsWith(prefix)));
}

function itemStatus(ok, { pending = false, empty = false } = {}) {
  if (empty) return "provisional";
  if (!ok) return "provisional";
  if (pending) return "pending";
  return "verified";
}

export function claimItemStatuses(fields = {}, validation) {
  const report = validation || validateMatterFields(fields);
  const codes = new Set(report.issues.map((item) => item.code));
  const identityOk = !hasCritical(report.issues, "id.") && Boolean(String(fields.clientName || "").trim());
  const walletCheck = verifyBlockChainAddresses(fields.wallet || "");
  const moneyOk = !codes.has("money.claim-exceeds-wallet") && !codes.has("money.fx-implausible") && !codes.has("money.empty");
  const nfrcOk = Boolean(String(fields.crimeRef || "").trim()) && !codes.has("docs.nfrc.missing") && !codes.has("docs.nfrc.format");
  const police = String(fields.policeUrn || "").trim();
  const evidencePresent = Boolean(String(fields.provider || "").trim() && String(fields.reportDate || "").trim());
  const solicitorOk = !hasCritical(report.issues, "solicitor.");

  return {
    identity: itemStatus(identityOk, { empty: !String(fields.clientName || "").trim() }),
    wallet: itemStatus(walletCheck.ok && moneyOk, {
      empty: !String(fields.wallet || "").trim(),
    }),
    evidence: itemStatus(evidencePresent, {
      pending: evidencePresent,
      empty: !evidencePresent,
    }),
    nfrc: itemStatus(nfrcOk, { empty: !String(fields.crimeRef || "").trim() }),
    police: police ? itemStatus(!codes.has("docs.police.format"), { pending: true }) : "provisional",
    solicitor: itemStatus(solicitorOk, { empty: !String(fields.feeEarner || "").trim() }),
    service: itemStatus(Boolean(String(fields.officer || "").trim() && String(fields.agency || "").trim()), {
      pending: true,
      empty: !String(fields.officer || fields.agency || "").trim(),
    }),
    limbA: itemStatus(Boolean(String(fields.scamDesc || "").trim()), { pending: true, empty: !String(fields.scamDesc || "").trim() }),
    limbB: itemStatus(Boolean(String(fields.funds || "").trim()), { pending: true, empty: !String(fields.funds || "").trim() }),
    limbC: itemStatus(evidencePresent && walletCheck.ok, { pending: true, empty: !evidencePresent }),
  };
}

function scoreFrom(parts) {
  const total = parts.reduce((sum, part) => sum + part.weight, 0) || 1;
  const got = parts.reduce((sum, part) => sum + (part.ok ? part.weight : 0), 0);
  return Math.round((got / total) * 100);
}

function scoreLabel(score) {
  if (score >= 80) return "High completeness";
  if (score >= 55) return "Moderate completeness";
  return "Low completeness";
}

export async function claimExhibits(fields = {}, validation) {
  const report = validation || validateMatterFields(fields);
  const mark = exhibitMark(fields.clientName || fields.applicant);
  const prefix = mark.replace(/1$/, "") || "A";
  const items = claimItemStatuses(fields, report);
  const walletOk = verifyBlockChainAddresses(fields.wallet || "").ok;
  const nfrcOk = items.nfrc === "verified";

  const schedule = [
    {
      mark: `${prefix}1`,
      kind: "witness-statement",
      title: `Witness statement of ${fields.clientName || "[name]"} (to be signed and dated; statement of truth)`,
      status: items.identity,
      note: "CPR-style statement of truth required before filing. Placeholder until the signed original is on the file.",
      parts: [
        { ok: Boolean(fields.clientName), weight: 40 },
        { ok: Boolean(fields.clientAddr), weight: 30 },
        { ok: Boolean(fields.scamDesc), weight: 30 },
      ],
      particulars: {
        deponent: fields.clientName || "",
        address: fields.clientAddr || "",
      },
    },
    {
      mark: `${prefix}2`,
      kind: "tracing-report",
      title: `Tracing report of ${fields.provider || "[provider]"} dated ${formatUkLong(fields.reportDate) || "[date]"}`,
      status: items.evidence,
      note: "Independent analytics exhibit. Completeness reflects particulars recorded here, not a finding that the trace is correct.",
      parts: [
        { ok: Boolean(fields.provider), weight: 30 },
        { ok: Boolean(fields.reportDate), weight: 30 },
        { ok: Boolean(fields.route), weight: 40 },
      ],
      particulars: {
        provider: fields.provider || "",
        reportDate: fields.reportDate || "",
        route: fields.route || "",
      },
    },
    {
      mark: `${prefix}3`,
      kind: "source-records",
      title: "Bank and exchange records evidencing the transfers out and the lawful source of the funds",
      status: items.limbB,
      note: "Native-format records with a recorded hash of each file, once paginated and marked. Chain of custody to be completed before filing.",
      parts: [
        { ok: Boolean(fields.funds), weight: 40 },
        { ok: Boolean(fields.originAddr), weight: 30 },
        { ok: Boolean(fields.lossValue), weight: 30 },
      ],
      particulars: {
        funds: fields.funds || "",
        originAddr: fields.originAddr || "",
        lossValue: fields.lossValue || "",
      },
    },
    {
      mark: `${prefix}4`,
      kind: "action-fraud",
      title: `Action Fraud report ${fields.crimeRef || "[NFRC]"}${fields.policeUrn ? `; police URN ${fields.policeUrn}` : ""}`,
      status: nfrcOk ? "verified" : items.nfrc,
      note: "Format of the reference is checked. The report itself is not retrieved from Action Fraud or the force in this tool.",
      parts: [
        { ok: nfrcOk, weight: 60 },
        { ok: Boolean(fields.policeUrn), weight: 20 },
        { ok: Boolean(fields.officer && fields.agency), weight: 20 },
      ],
      particulars: {
        crimeRef: fields.crimeRef || "",
        policeUrn: fields.policeUrn || "",
        officer: fields.officer || "",
        agency: fields.agency || "",
      },
    },
    {
      mark: `${prefix}5`,
      kind: "freezing-order",
      title: `Crypto wallet freezing order under s.303Z37 POCA 2002 dated ${formatUkLong(fields.orderDate) || "[date]"} (copy of the sealed order)`,
      status: fields.orderDate && walletOk ? "pending" : "provisional",
      note: "The sealed order is the court's act. This notice only records the date and wallet particulars. Exhibit the sealed copy when it is on the file.",
      parts: [
        { ok: Boolean(fields.orderDate), weight: 40 },
        { ok: walletOk, weight: 40 },
        { ok: Boolean(fields.court), weight: 20 },
      ],
      particulars: {
        orderDate: fields.orderDate || "",
        wallet: fields.wallet || "",
        court: fields.court || "",
        exchange: fields.exchange || "",
      },
    },
  ];

  const exhibits = [];
  for (const item of schedule) {
    const score = scoreFrom(item.parts);
    const digest = await sha256Hex(JSON.stringify({
      mark: item.mark,
      kind: item.kind,
      particulars: item.particulars,
    }));
    exhibits.push({
      mark: item.mark,
      kind: item.kind,
      title: item.title,
      status: item.status,
      badge: verificationBadge(item.status),
      note: item.note,
      score,
      scoreLabel: scoreLabel(score),
      digest,
    });
  }
  return exhibits;
}

export async function buildClaimTrust(fields = {}, ctx = {}) {
  const validation = validateMatterFields(fields, ctx);
  const items = claimItemStatuses(fields, validation);
  const wallet = extractEthAddress(fields.wallet);
  const explorer = wallet ? explorerUrl(wallet) : "";
  const exhibits = await claimExhibits(fields, validation);
  const digest = await sha256Hex(canonicalClaimFacts(fields));
  const proportion = claimProportion(fields);
  return {
    validation,
    items,
    wallet,
    explorer,
    qr: explorer ? encodeQr(explorer) : null,
    exhibits,
    digest,
    proportion,
    solicitor: FIRM_SRA_REGISTER,
    citations: {
      solicitor: verificationCitation("solicitor"),
      wallet: verificationCitation("wallet"),
      statute: verificationCitation("statute"),
      nfrc: verificationCitation("nfrc"),
    },
    disclaimer:
      "This is a solicitor's notice of a victim claim under section 303Z51 of the Proceeds of Crime Act 2002. It is not a sealed court order and it has not been determined by a court. Format checks confirm internal consistency of names, amounts, references and addresses recorded in this file. They are not a finding by a court, the SRA, Action Fraud, a police force, or any block explorer. Assertions that have not been independently verified are marked Provisional.",
  };
}
