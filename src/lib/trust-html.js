import {
  complaintsProcedure,
  containsPending,
  firstContactLine,
  firstContactStatement,
  isPending,
  privacyRightsText,
  reviewStatement,
  sraRegisterUrl,
} from "../config/trust.js";
import { loc, t, trust } from "../i18n/catalog.js";
import { esc } from "./html.js";

export function isPublicText(value) {
  return typeof value === "string" && value.length > 0 && !containsPending(value) && !value.includes("NEEDS_CLIENT_INPUT");
}

export function reviewedNote(topic) {
  const text = reviewStatement(topic, loc().dateLocale, trust);
  if (!text) return "";
  return `<p class="mono">${esc(text)}</p>`;
}

export function reviewFoot(page) {
  const note = reviewedNote(page?.reviewTopic);
  if (!note) return "";
  return `<div class="wrap" style="padding-bottom:4rem">${note}</div>`;
}

export function sraRegisterAnchor(label = "sra.org.uk") {
  return `<a href="${esc(sraRegisterUrl())}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;
}

export function regulatorCheckHtml() {
  const text = trust.firm.regulatorCheckText;
  const domain = "sra.org.uk";
  const index = text.lastIndexOf(domain);
  if (index < 0) return esc(text);
  return esc(text.slice(0, index)) + sraRegisterAnchor(domain) + esc(text.slice(index + domain.length));
}

export function htmlWithSraLinks(text) {
  if (typeof text !== "string" || !text) return "";
  const check = trust.firm.regulatorCheckText;
  const html = text.includes(check)
    ? text.split(check).map((part) => esc(part)).join(regulatorCheckHtml())
    : esc(text);
  return html
    .replaceAll(t("publicSraOrganisationRecord"), sraRegisterAnchor(t("publicSraOrganisationRecord")))
    .replaceAll(t("publicSraRecord"), sraRegisterAnchor(t("publicSraRecord")))
    .replaceAll("public SRA organisation record", sraRegisterAnchor(t("publicSraOrganisationRecord")))
    .replaceAll("public SRA record", sraRegisterAnchor(t("publicSraRecord")));
}

function block(heading, text) {
  if (!isPublicText(text)) return "";
  return `<article class="legal-entry"><h2>${esc(heading)}</h2><p>${htmlWithSraLinks(text)}</p></article>`;
}

function blockHtml(heading, inner) {
  if (!inner) return "";
  return `<article class="legal-entry"><h2>${esc(heading)}</h2>${inner}</article>`;
}

function isRecordedId(value) {
  return isPublicText(value) && /[0-9]/.test(value);
}

export function regulatoryFooterHtml() {
  const f = trust.firm;
  const ids = [
    `<a href="${esc(sraRegisterUrl())}" target="_blank" rel="noopener noreferrer">SRA ${esc(f.sraNumber)}</a>`,
  ];
  if (isRecordedId(f.companyNumber)) ids.push(`<span>${esc(t("company"))} ${esc(f.companyNumber)}</span>`);
  if (isRecordedId(f.vatNumber)) ids.push(`<span>${esc(t("vat"))} ${esc(f.vatNumber)}</span>`);
  if (isRecordedId(f.icoNumber)) ids.push(`<span>${esc(t("ico"))} ${esc(f.icoNumber)}</span>`);

  const lines = [`<p class="footer-ids">${ids.join("")}</p>`];
  if (isPublicText(f.registeredOffice)) lines.push(`<p>${esc(f.registeredOffice)}</p>`);
  lines.push(`<p><a href="/regulatory-information/">${esc(t("regulatoryInformation"))}</a></p>`);
  return lines.join("");
}

export function contactDetailsHtml() {
  const c = trust.contact;
  const parts = [];
  if (isPublicText(c.officeHours)) parts.push(`<p class="muted">${esc(c.officeHours)}</p>`);
  if (isPublicText(c.phone)) {
    parts.push(
      `<p class="muted">${esc(t("telephone"))}: <a href="tel:${esc(c.phone.replace(/\s+/g, ""))}">${esc(c.phone)}</a></p>`,
    );
  }
  if (isPublicText(c.email)) {
    parts.push(`<p class="mono"><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>`);
  }
  if (isPublicText(c.address)) parts.push(`<p class="muted">${esc(c.address)}</p>`);
  const named = firstContactLine(trust);
  if (named) parts.push(`<p class="muted">${esc(t("firstContact"))}: ${esc(named)}</p>`);
  const statement = firstContactStatement(trust);
  if (statement) parts.push(`<p class="muted">${esc(statement)}</p>`);
  if (isPublicText(c.acknowledgementTime)) parts.push(`<p class="muted">${esc(c.acknowledgementTime)}</p>`);
  if (isPublicText(c.substantiveTime)) parts.push(`<p class="muted">${esc(c.substantiveTime)}</p>`);
  if (isPublicText(c.outOfHours)) parts.push(`<p class="muted">${esc(c.outOfHours)}</p>`);
  return parts.join("");
}

export function feeBandsHtml() {
  return `<div class="item-stack">
    ${trust.fees.bands
      .filter((band) => isPublicText(band.grade) && isPublicText(band.rate))
      .map(
        (band) => `<article>
          <h3>${esc(band.grade)}</h3>
          <p class="muted">${esc(band.rate)} ${esc(band.note || "")}</p>
        </article>`,
      )
      .join("")}
  </div>`;
}

export function regulatoryHtml() {
  const f = trust.firm;
  const ins = trust.insurance;
  const money = trust.clientMoney;
  const parts = [
    block(
      t("legal.regulatedName"),
      t("legal.regulatedNameText", { name: f.tradingName, n: f.sraNumber }),
    ),
  ];
  if (isPublicText(f.legalName)) parts.push(block(t("legal.legalName"), f.legalName));
  if (isPublicText(f.entityType)) parts.push(block(t("legal.entityType"), f.entityType));
  if (isPublicText(f.companyNumber)) parts.push(block(t("legal.companyNumber"), f.companyNumber));
  if (isPublicText(f.registeredOffice)) parts.push(block(t("legal.registeredOffice"), f.registeredOffice));
  if (isPublicText(f.vatNumber)) parts.push(block(t("legal.vatNumber"), f.vatNumber));
  parts.push(blockHtml(t("legal.howToCheck"), `<p>${regulatorCheckHtml()}</p>`));

  const insuranceBits = [];
  if (isPublicText(ins.insurer)) insuranceBits.push(t("legal.insurer", { n: ins.insurer }));
  if (isPublicText(ins.minimumCover)) {
    insuranceBits.push(t("legal.minCover", { n: ins.minimumCover }));
  }
  if (isPublicText(ins.territory)) insuranceBits.push(t("legal.territory", { n: ins.territory }));
  if (isPublicText(ins.territoryNote)) insuranceBits.push(ins.territoryNote);
  if (insuranceBits.length) parts.push(block(t("legal.pii"), insuranceBits.join(" ")));
  if (isPublicText(ins.liabilityCap)) parts.push(block(t("legal.limitation"), ins.liabilityCap));

  if (isPublicText(money.statement)) parts.push(block(t("legal.clientMoney"), money.statement));
  if (isPublicText(money.bankNote)) parts.push(block(t("legal.clientAccount"), money.bankNote));
  if (isPublicText(f.icoNumber)) parts.push(block(t("legal.dataProtection"), t("legal.icoReg", { n: f.icoNumber })));
  parts.push(
    `<p class="legal-note">${t("legal.seePrivacy").replace("{privacy}", `<a href="/privacy/">${esc(t("privacyNotice"))}</a>`)}</p>`,
  );
  return parts.filter(Boolean).join("");
}

export function complaintsHtml() {
  const c = trust.complaints;
  const parts = [];
  if (isPublicText(c.handlerName) && isPublicText(c.handlerRole)) {
    parts.push(block(t("legal.whoComplaints"), `${c.handlerName}, ${c.handlerRole}.`));
  }
  const steps = complaintsProcedure(trust);
  if (steps.length) {
    parts.push(blockHtml(
      t("legal.howToComplain"),
      `<ol>${steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>`,
    ));
  }
  if (isPublicText(c.ombudsmanText)) parts.push(block(t("legal.ombudsman"), c.ombudsmanText));
  parts.push(
    `<p class="legal-note">${esc(t("legal.ombudsmanAddress"))} <a href="https://www.legalombudsman.org.uk/" rel="noopener noreferrer">legalombudsman.org.uk</a></p>`,
  );
  if (isPublicText(c.noRetaliation)) parts.push(`<p class="legal-note">${esc(c.noRetaliation)}</p>`);
  return parts.filter(Boolean).join("");
}

export function pricingHtml() {
  const f = trust.fees;
  const parts = [
    block(t("legal.howWeCharge"), f.model),
    `<article class="legal-entry"><h2>${esc(t("legal.hourlyRates"))}</h2>${feeBandsHtml()}</article>`,
  ];
  parts.push(block(t("legal.supervision"), t("legal.supervisionText")));
  parts.push(block(t("legal.vat"), f.vatTreatment));
  parts.push(block(t("legal.timeRecorded"), f.billingUnit));
  parts.push(block(t("legal.scopeTimescales"), f.scopeTimescale));
  parts.push(block(t("legal.estimates"), f.estimateHonesty));
  if (isPublicText(f.sraPriceList)) parts.push(block(t("legal.sraPrice"), f.sraPriceList));
  parts.push(block(t("legal.thirdParty"), f.thirdPartyFunding));
  if (isPublicText(f.standardTerms)) {
    parts.push(
      `<p class="legal-note">${esc(t("legal.standardTerms"))} <a href="${esc(f.standardTerms)}">${esc(f.standardTerms)}</a></p>`,
    );
  }
  parts.push(block(t("legal.noGuarantees"), t("legal.noGuaranteesText")));
  return parts.filter(Boolean).join("");
}

export function privacyHtml() {
  const p = trust.privacy;
  const parts = [];
  if (isPublicText(p.controller)) parts.push(block(t("legal.controller"), p.controller));
  if (isPublicText(p.icoNumber)) parts.push(block(t("legal.icoRegistration"), p.icoNumber));
  parts.push(block(t("legal.whatWeCollect"), t("legal.whatWeCollectText")));
  if (p.lawfulBases?.length) {
    parts.push(blockHtml(
      t("legal.lawfulBases"),
      `<ul>${p.lawfulBases
        .filter((item) => isPublicText(item.basis) && isPublicText(item.use))
        .map((item) => `<li><strong>${esc(item.basis)}.</strong> ${esc(item.use)}</li>`)
        .join("")}</ul>`,
    ));
  }
  if (p.retention?.length) {
    parts.push(blockHtml(
      t("legal.retention"),
      `<ul>${p.retention
        .filter((item) => isPublicText(item.category) && isPublicText(item.period))
        .map((item) => `<li><strong>${esc(item.category)}.</strong> ${esc(item.period)}</li>`)
        .join("")}</ul>`,
    ));
  }
  const rights = privacyRightsText(trust);
  if (rights) parts.push(block(t("legal.yourRights"), rights));
  parts.push(block(t("legal.transfers"), p.internationalTransfers));
  return parts.filter(Boolean).join("");
}

export function filterPublicFaqs(faqs) {
  return (faqs || []).filter((item) => isPublicText(item.q) && isPublicText(item.a));
}
