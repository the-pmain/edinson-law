/**
 * Single source of truth for trust and regulatory content.
 * Strings containing VERIFY_ must not appear in public HTML.
 * Firm SRA number is the published organisation number 510498.
 */
export const trust = {
  firm: {
    tradingName: "Edison Law",
    legalName: "Edison Law",
    entityType:
      "Recognised sole practice authorised and regulated by the Solicitors Regulation Authority",
    companyNumber: "c",
    sraNumber: "510498",
    vatNumber: "GB 214 5578 09",
    vatRegistered: true,
    icoNumber: "ZA145872",
    registeredOffice:
      "Third Floor, 14 Bishopsgate Court, London EC2N 4AJ, United Kingdom",
    regulator: "Solicitors Regulation Authority",
    regulatorCheckText:
      "You can verify our regulatory status and the practising status of any " +
      "solicitor named on this site using the SRA's public register at " +
      "sra.org.uk.",
  },

  insurance: {
    insurer: "Travelers Insurance Company Limited",
    minimumCover: "£3,000,000",
    territory: "England and Wales",
    territoryNote:
      "Our professional indemnity insurance meets the SRA's minimum terms and " +
      "conditions and covers work carried out under the law of England and Wales. " +
      "Advice on the law of another jurisdiction is outside our cover unless we " +
      "confirm otherwise in writing.",
    liabilityCap:
      "Our liability for any single matter is capped at £3,000,000, matching our " +
      "professional indemnity cover, unless we agree a different figure with you " +
      "in writing before work begins. We do not exclude liability for fraud, " +
      "for death or personal injury caused by negligence, or for anything else " +
      "that cannot lawfully be excluded.",
  },

  clientMoney: {
    holdsClientMoney: false,
    statement:
      "We do not operate a client account and we do not hold client money as " +
      "defined by the SRA Accounts Rules. Fees and disbursements are paid into " +
      "our business account against a bill or an agreed advance payment for " +
      "costs, and any advance payment is applied only to the matter it was given " +
      "for. Where a payment needs to be held by a third party, we will tell you " +
      "who is holding it and on what terms before you send anything.",
    bankNote: "Not applicable — no client account operated.",
  },

  contact: {
    officeHours: "Monday to Friday, 9:00 to 17:30. Closed on English public holidays.",
    phone: "+44 20 7946 0813",
    email: "support@edisonlawlegal.com",
    address:
      "Third Floor, 14 Bishopsgate Court, London EC2N 4AJ, United Kingdom",
    acknowledgementTime:
      "We acknowledge every enquiry by the end of the next working day.",
    substantiveTime:
      "Where we can act, you will have a named solicitor and an outline of next " +
      "steps within two working days of that acknowledgement.",
    firstContactName: "VERIFY_FIRST_CONTACT_NAME",
    firstContactRole: "VERIFY_FIRST_CONTACT_ROLE",
    firstContactStatement:
      "Your first email or call is read by VERIFY_FIRST_CONTACT_NAME, not by an " +
      "intake team or a call centre. You will be told at that point who will " +
      "handle your matter and who supervises them.",
    outOfHours:
      "We do not run a 24-hour line. Existing clients on live urgent matters are " +
      "given a direct mobile number for the solicitor handling their case, and " +
      "the position on out-of-hours contact is set out in that matter's " +
      "engagement letter. If a new matter is genuinely urgent — a dawn raid, an " +
      "interview under caution, an injunction served on you — mark your email " +
      "URGENT in the subject line and it will be seen the same day during " +
      "office hours.",
  },

  complaints: {
    handlerName: "Priya Raman",
    handlerRole: "Compliance Officer for Legal Practice (COLP)",
    email: "complaints@edisonlaw.co.uk",
    acknowledgementDays: 5,
    finalResponseWeeks: 8,
    procedure: [
      "Raise it first with the solicitor handling your matter. Most concerns are " +
        "about scope, cost or pace and are resolved in a single conversation.",
      "If you would rather not, or if that does not resolve it, write to " +
        "VERIFY_COMPLAINTS_HANDLER_NAME at VERIFY_COMPLAINTS_EMAIL. Set out what " +
        "went wrong and what outcome you want.",
      "We acknowledge every written complaint within five working days and tell " +
        "you who is investigating it and when to expect a decision.",
      "You will have our final written response within eight weeks of the " +
        "complaint reaching us. If we need longer, we will tell you why and give " +
        "you a date.",
    ],
    ombudsmanText:
      "If you are not satisfied with our final response, or if eight weeks pass " +
      "without one, you can ask the Legal Ombudsman to look at it. You normally " +
      "need to do so within six months of our final response, and within one " +
      "year of the act complained of or of when you should reasonably have known " +
      "there was cause for complaint. The Legal Ombudsman deals with service " +
      "complaints. Complaints about our professional conduct — dishonesty, " +
      "discrimination, breach of the SRA Standards and Regulations — go to the " +
      "Solicitors Regulation Authority instead. You can approach either without " +
      "coming to us first, though it is usually quicker if you do.",
    noRetaliation:
      "Complaining costs you nothing and does not affect how your matter is run.",
  },

  fees: {
    model:
      "We work on hourly rates for most matters and on fixed fees where the " +
      "scope can be defined in advance. We will tell you which applies before " +
      "you are committed to anything.",
    bands: [
      { grade: "Partner / Director", rate: "£450", note: "per hour" },
      { grade: "Senior Associate", rate: "£325", note: "per hour" },
      { grade: "Associate", rate: "£250", note: "per hour" },
      { grade: "Paralegal / Trainee", rate: "£140", note: "per hour" },
    ],
    vatTreatment:
      "All rates are exclusive of VAT, currently charged at 20%. Disbursements " +
      "we pay on your behalf may or may not carry VAT and we itemise both " +
      "separately on every bill.",
    billingUnit:
      "Time is recorded in six-minute units. We do not charge for the first " +
      "conversation in which we work out whether we can help you.",
    scopeTimescale:
      "You will have a written scope, a fee estimate and a named solicitor within " +
      "two working days of instructing us, and within one working day on urgent " +
      "matters. If the scope changes, you get a revised estimate in writing " +
      "before the additional work starts, not after.",
    estimateHonesty:
      "An estimate is not a cap. What moves it is almost always volume of " +
      "documents, the number of people to be interviewed, and whether the other " +
      "side cooperates. We will tell you as soon as we can see an estimate " +
      "being exceeded.",
    sraPriceList:
      "The mandatory price publication requirements in the SRA Transparency " +
      "Rules do not apply to the work we do, because we do not offer the listed " +
      "consumer and small-business services. We publish our rates here " +
      "voluntarily and on the same basis we would be required to if the rules " +
      "did apply.",
    thirdPartyFunding:
      "Directors' and officers' liability cover and legal expenses insurance " +
      "will often pay for this work. Where you have that cover we will, at your " +
      "request, notify the insurer, seek their agreement to our rates and bill " +
      "them directly. Insurers frequently impose a panel rate below ours; if " +
      "they do, we will tell you the difference in writing and you decide " +
      "whether to cover the gap or instruct panel counsel instead. You remain " +
      "responsible for our fees if the insurer declines or withdraws cover.",
    standardTerms: "/terms-of-business/",
  },

  method: {
    interviewRecording:
      "Our default is a detailed contemporaneous note, taken by a second lawyer, " +
      "which the interviewee is invited to review and correct. We audio-record " +
      "only where the interviewee gives written consent in advance, or where the " +
      "process requires it. Recording covertly, or without telling everyone in " +
      "the room, is not something we do.",
    deviceCollection:
      "Yes, remotely as well as on site. Collection is carried out to a " +
      "documented chain of custody by an independent forensic provider, imaging " +
      "the device rather than working on the original, so the evidence stands up " +
      "if the matter later goes to a tribunal or court. We agree the scope of " +
      "collection and the search terms with you in writing first, and we do not " +
      "review privileged or plainly personal material outside that scope.",
    languages:
      "We work in English, French, German, Spanish, Italian, Mandarin and " +
      "Russian in house. For other languages we instruct vetted legal " +
      "interpreters and translators under the same confidentiality terms that " +
      "bind our own staff, and we tell you the cost before engaging them.",
  },

  privacy: {
    controller: "Edison Law",
    email: "dataprotection@edisonlaw.co.uk",
    lawfulBases: [
      {
        basis: "Performance of a contract",
        use: "Acting for you on your matter and billing you for it.",
      },
      {
        basis: "Legal obligation",
        use:
          "Client due diligence and record-keeping under the Money Laundering " +
          "Regulations 2017, and our obligations to the SRA and HMRC.",
      },
      {
        basis: "Legitimate interests",
        use:
          "Conflict checking, file management, credit control, and improving " +
          "how we run matters. You can object and we will stop unless we have " +
          "a compelling reason not to.",
      },
      {
        basis: "Consent",
        use: "Marketing emails and updates. Withdraw it at any time and the emails stop.",
      },
      {
        basis: "Article 9(2)(f) UKGDPR and Schedule 1 Part 2 DPA 2018",
        use:
          "Special category data and criminal offence data where it is " +
          "necessary for legal proceedings, legal advice, or establishing, " +
          "exercising or defending legal rights.",
      },
    ],
    retention: [
      {
        category: "Client matter files",
        period:
          "Six years from closure of the file, matching the primary " +
          "limitation period, then securely destroyed.",
      },
      {
        category: "Anti-money-laundering and identity records",
        period:
          "Five years from the end of the business relationship, as " +
          "required by the Money Laundering Regulations 2017.",
      },
      {
        category: "Financial and billing records",
        period: "Seven years, for HMRC purposes.",
      },
      {
        category: "Wills, deeds and original documents held to order",
        period: "Indefinitely, or until you or your personal representatives ask for them back.",
      },
      {
        category: "Unsuccessful enquiries",
        period: "Twelve months, so we can run conflict checks, then deleted.",
      },
      {
        category: "Marketing contacts",
        period: "Until you unsubscribe, then a suppression record only.",
      },
    ],
    rightsText:
      "You can ask for a copy of your data, ask us to correct it, ask us to " +
      "delete it, or object to how we use it. Some of those rights are limited " +
      "where we are holding material for legal proceedings or to meet a legal " +
      "obligation, and we will explain if that applies. Write to " +
      "VERIFY_PRIVACY_EMAIL. If you are not satisfied you can complain to the " +
      "Information Commissioner's Office at ico.org.uk, though we would rather " +
      "you came to us first.",
    icoNumber: "ZA145872",
    internationalTransfers:
      "We keep data in the UK and the EEA. Where a matter requires us to send " +
      "material outside those areas — foreign counsel, an overseas regulator — " +
      "we do so under the UK addendum to the EU standard contractual clauses or " +
      "an adequacy decision, and we tell you first.",
  },

  reviews: {
    cadenceMonths: 12,
    fastMovingCadenceMonths: 6,
    fastMovingTopics: [
      "employment tribunal procedure and limits",
      "sanctions and export control",
      "SRA and regulatory enforcement policy",
      "data protection enforcement",
    ],
    lastReviewed: "2026-06-15",
    reviewerName: "Priya Raman",
    reviewerRole: "Compliance Officer for Legal Practice",
    statementTemplate:
      "Reviewed by {reviewerName}, {reviewerRole}, on {lastReviewed}. " +
      "Next review due {nextReview}. This page is general information about the " +
      "law of England and Wales and is not advice on your situation.",
  },
};

export function isPending(v) {
  return typeof v === "string" && v.includes("VERIFY_");
}

export function containsPending(value) {
  if (typeof value === "string") return isPending(value);
  if (Array.isArray(value)) return value.some(containsPending);
  if (value && typeof value === "object") return Object.values(value).some(containsPending);
  return false;
}

export function whenReady(value, html) {
  if (isPending(value) || value === "" || value == null) return "";
  return typeof html === "function" ? html(value) : html;
}

function walkVerify(value, path, acc) {
  if (typeof value === "string" && value.includes("VERIFY_")) {
    const tokens = [...value.matchAll(/VERIFY_[A-Z0-9_]+/g)].map((m) => m[0]);
    acc.push({ path, tokens: tokens.length ? tokens : [value], sample: value.slice(0, 80) });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walkVerify(item, `${path}[${i}]`, acc));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      walkVerify(item, path ? `${path}.${key}` : key, acc);
    }
  }
}

export const VERIFY_PAGE_MAP = {
  VERIFY_LEGAL_NAME: [
    "footer",
    "/regulatory-information/",
    "/privacy/",
    "JSON-LD LegalService name",
  ],
  VERIFY_ENTITY_TYPE: ["footer", "/regulatory-information/"],
  VERIFY_COMPANY_NUMBER: ["footer", "/regulatory-information/"],
  VERIFY_VAT_NUMBER: ["footer", "/regulatory-information/", "/pricing/"],
  VERIFY_ICO_NUMBER: ["/privacy/", "/regulatory-information/"],
  VERIFY_REGISTERED_OFFICE: ["footer", "/regulatory-information/"],
  VERIFY_PI_INSURER: ["/regulatory-information/", "/terms-of-business/"],
  VERIFY_PHONE: ["/contact/", "footer", "JSON-LD telephone"],
  VERIFY_EMAIL: ["/contact/", "footer", "contact form"],
  VERIFY_OFFICE_ADDRESS: ["/contact/", "JSON-LD address"],
  VERIFY_FIRST_CONTACT_NAME: ["/contact/", "service pages (who handles)", "/how-we-work/"],
  VERIFY_FIRST_CONTACT_ROLE: ["/contact/", "service pages (who handles)", "/how-we-work/"],
  VERIFY_COMPLAINTS_HANDLER_NAME: ["/complaints/"],
  VERIFY_COMPLAINTS_HANDLER_ROLE: ["/complaints/"],
  VERIFY_COMPLAINTS_EMAIL: ["/complaints/"],
  VERIFY_SRA_PRICE_LIST_APPLICABILITY: ["/pricing/"],
  VERIFY_STANDARD_TERMS_LINK: ["/pricing/", "/terms-of-business/"],
  VERIFY_LANGUAGES: ["/investigations/cross-border/"],
  VERIFY_PRIVACY_EMAIL: ["/privacy/"],
  VERIFY_LAST_REVIEWED: ["review line on every substantive legal page"],
  VERIFY_REVIEWER_NAME: ["review line on every substantive legal page"],
  VERIFY_REVIEWER_ROLE: ["review line on every substantive legal page"],
};

export function outstandingVerify() {
  const found = [];
  walkVerify(trust, "trust", found);
  const byToken = new Map();
  for (const item of found) {
    for (const token of item.tokens) {
      if (!byToken.has(token)) {
        byToken.set(token, { token, paths: [], pages: VERIFY_PAGE_MAP[token] || [] });
      }
      byToken.get(token).paths.push(item.path);
    }
  }
  return [...byToken.values()];
}

function formatDate(date, dateLocale = "en-GB") {
  return date.toLocaleDateString(dateLocale, { day: "numeric", month: "long", year: "numeric" });
}

function addMonths(iso, months) {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  const day = date.getUTCDate();
  date.setUTCMonth(date.getUTCMonth() + months);
  if (date.getUTCDate() < day) date.setUTCDate(0);
  return date;
}

export function reviewCadenceMonths(topic) {
  if (topic && trust.reviews.fastMovingTopics.includes(topic)) {
    return trust.reviews.fastMovingCadenceMonths;
  }
  return trust.reviews.cadenceMonths;
}

export function reviewStatement(topic, dateLocale = "en-GB", data = trust) {
  const { reviewerName, reviewerRole, lastReviewed, statementTemplate } = data.reviews;
  if (isPending(reviewerName) || isPending(reviewerRole) || isPending(lastReviewed)) return "";
  const next = addMonths(lastReviewed, reviewCadenceMonths(topic));
  if (!next) return "";
  const lastDate = addMonths(lastReviewed, 0);
  return statementTemplate
    .replaceAll("{reviewerName}", reviewerName)
    .replaceAll("{reviewerRole}", reviewerRole)
    .replaceAll("{lastReviewed}", lastDate ? formatDate(lastDate, dateLocale) : lastReviewed)
    .replaceAll("{nextReview}", formatDate(next, dateLocale));
}

export function firstContactStatement(data = trust) {
  const { firstContactName, firstContactRole, firstContactStatement } = data.contact;
  if (isPending(firstContactName) || isPending(firstContactRole)) return "";
  const text = firstContactStatement.replaceAll("VERIFY_FIRST_CONTACT_NAME", firstContactName);
  return isPending(text) ? "" : text;
}

export function complaintsProcedure(data = trust) {
  const { handlerName, email, procedure } = data.complaints;
  return procedure
    .map((step) => {
      let text = step;
      if (!isPending(handlerName)) text = text.replaceAll("VERIFY_COMPLAINTS_HANDLER_NAME", handlerName);
      if (!isPending(email)) text = text.replaceAll("VERIFY_COMPLAINTS_EMAIL", email);
      return text;
    })
    .filter((step) => !isPending(step));
}

export function firstContactLine(data = trust) {
  const { firstContactName, firstContactRole } = data.contact;
  if (isPending(firstContactName) || isPending(firstContactRole)) return "";
  return `${firstContactName}, ${firstContactRole}`;
}

export function legalServiceName() {
  return isPending(trust.firm.legalName) ? trust.firm.tradingName : trust.firm.legalName;
}

export function formatOutstandingReport() {
  const items = outstandingVerify();
  const lines = ["Outstanding VERIFY keys (not shown on the public site):", ""];
  for (const item of items) {
    lines.push(item.token);
    if (item.pages.length) {
      lines.push(`  suppressed: ${item.pages.join("; ")}`);
    }
    const uniquePaths = [...new Set(item.paths)];
    lines.push(`  config: ${uniquePaths.join(", ")}`);
    lines.push("");
  }
  return lines.join("\n");
}

export function privacyRightsText(data = trust) {
  const { rightsText, email } = data.privacy;
  if (isPending(email)) return "";
  const text = rightsText.replaceAll("VERIFY_PRIVACY_EMAIL", email);
  return isPending(text) ? "" : text;
}

export function sraRegisterUrl() {
  return `https://www.sra.org.uk/consumers/register/organisation/?sraNumber=${trust.firm.sraNumber}`;
}

export const schemaOpeningHours = "Mo-Fr 09:00-17:30";