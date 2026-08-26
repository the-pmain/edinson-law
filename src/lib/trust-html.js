import {
  complaintsProcedure,
  containsPending,
  firstContactLine,
  firstContactStatement,
  isPending,
  privacyRightsText,
  reviewStatement,
  sraRegisterUrl,
  trust,
} from "../config/trust.js";
import { esc } from "./html.js";

export function isPublicText(value) {
  return typeof value === "string" && value.length > 0 && !containsPending(value) && !value.includes("NEEDS_CLIENT_INPUT");
}

export function reviewedNote(topic) {
  const text = reviewStatement(topic);
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
    .replaceAll("public SRA organisation record", sraRegisterAnchor("public SRA organisation record"))
    .replaceAll("public SRA record", sraRegisterAnchor("public SRA record"));
}

function block(heading, text) {
  if (!isPublicText(text)) return "";
  return `<article class="legal-entry"><h2>${esc(heading)}</h2><p>${htmlWithSraLinks(text)}</p></article>`;
}

function blockHtml(heading, inner) {
  if (!inner) return "";
  return `<article class="legal-entry"><h2>${esc(heading)}</h2>${inner}</article>`;
}

export function regulatoryFooterHtml() {
  const f = trust.firm;
  const lines = [`<p>${esc(f.tradingName)}</p>`];
  if (isPublicText(f.legalName) && f.legalName !== f.tradingName) {
    lines.push(`<p>${esc(f.legalName)}</p>`);
  }
  if (isPublicText(f.entityType)) lines.push(`<p>${esc(f.entityType)}</p>`);
  if (isPublicText(f.companyNumber)) lines.push(`<p>Company number ${esc(f.companyNumber)}</p>`);
  lines.push(
    `<p>Authorised and regulated by the Solicitors Regulation Authority, SRA number ${esc(f.sraNumber)}.</p>`,
  );
  if (isPublicText(f.vatNumber)) lines.push(`<p>VAT number ${esc(f.vatNumber)}</p>`);
  if (isPublicText(f.registeredOffice)) {
    lines.push(`<p>Registered office: ${esc(f.registeredOffice)}</p>`);
  }
  lines.push(`<p><a href="/regulatory-information/">Regulatory information</a></p>`);
  return lines.join("");
}

export function contactDetailsHtml() {
  const c = trust.contact;
  const parts = [];
  if (isPublicText(c.officeHours)) parts.push(`<p class="muted">${esc(c.officeHours)}</p>`);
  if (isPublicText(c.phone)) {
    parts.push(
      `<p class="muted">Telephone: <a href="tel:${esc(c.phone.replace(/\s+/g, ""))}">${esc(c.phone)}</a></p>`,
    );
  }
  if (isPublicText(c.email)) {
    parts.push(`<p class="mono"><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>`);
  }
  if (isPublicText(c.address)) parts.push(`<p class="muted">${esc(c.address)}</p>`);
  const named = firstContactLine();
  if (named) parts.push(`<p class="muted">First point of contact: ${esc(named)}</p>`);
  const statement = firstContactStatement();
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
      "Regulated name",
      `${f.tradingName} is authorised and regulated by the Solicitors Regulation Authority. SRA number ${f.sraNumber}.`,
    ),
  ];
  if (isPublicText(f.legalName)) parts.push(block("Legal name", f.legalName));
  if (isPublicText(f.entityType)) parts.push(block("Entity type", f.entityType));
  if (isPublicText(f.companyNumber)) parts.push(block("Company number", f.companyNumber));
  if (isPublicText(f.registeredOffice)) parts.push(block("Registered office", f.registeredOffice));
  if (isPublicText(f.vatNumber)) parts.push(block("VAT number", f.vatNumber));
  parts.push(blockHtml("How to check us", `<p>${regulatorCheckHtml()}</p>`));

  const insuranceBits = [];
  if (isPublicText(ins.insurer)) insuranceBits.push(`Insurer: ${ins.insurer}.`);
  if (isPublicText(ins.minimumCover)) {
    insuranceBits.push(`Minimum cover: ${ins.minimumCover}.`);
  }
  if (isPublicText(ins.territory)) insuranceBits.push(`Territory: ${ins.territory}.`);
  if (isPublicText(ins.territoryNote)) insuranceBits.push(ins.territoryNote);
  if (insuranceBits.length) parts.push(block("Professional indemnity insurance", insuranceBits.join(" ")));
  if (isPublicText(ins.liabilityCap)) parts.push(block("Limitation of liability", ins.liabilityCap));

  if (isPublicText(money.statement)) parts.push(block("Client money", money.statement));
  if (isPublicText(money.bankNote)) parts.push(block("Client account", money.bankNote));
  if (isPublicText(f.icoNumber)) parts.push(block("Data protection", `ICO registration: ${f.icoNumber}.`));
  parts.push(
    `<p class="legal-note">See also the <a href="/privacy/">privacy notice</a>.</p>`,
  );
  return parts.filter(Boolean).join("");
}

export function complaintsHtml() {
  const c = trust.complaints;
  const parts = [];
  if (isPublicText(c.handlerName) && isPublicText(c.handlerRole)) {
    parts.push(block("Who handles complaints", `${c.handlerName}, ${c.handlerRole}.`));
  }
  const steps = complaintsProcedure();
  if (steps.length) {
    parts.push(blockHtml(
      "How to complain",
      `<ol>${steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>`,
    ));
  }
  if (isPublicText(c.ombudsmanText)) parts.push(block("Legal Ombudsman and the SRA", c.ombudsmanText));
  parts.push(
    `<p class="legal-note">Legal Ombudsman, PO Box 6167, Slough, SL1 0EH. Telephone 0300 555 0333. Relay UK 18001 0300 555 0333. <a href="https://www.legalombudsman.org.uk/" rel="noopener noreferrer">legalombudsman.org.uk</a></p>`,
  );
  if (isPublicText(c.noRetaliation)) parts.push(`<p class="legal-note">${esc(c.noRetaliation)}</p>`);
  return parts.filter(Boolean).join("");
}

export function pricingHtml() {
  const f = trust.fees;
  const parts = [
    block("How we charge", f.model),
    `<article class="legal-entry"><h2>Hourly rates</h2>${feeBandsHtml()}</article>`,
  ];
  parts.push(
    block(
      "Supervision",
      "Each charging category is used under the supervision of a named solicitor. The bands describe how time is billed. Confirm who will do the work, and who will supervise it, before the retainer begins.",
    ),
  );
  parts.push(block("VAT", f.vatTreatment));
  parts.push(block("How time is recorded", f.billingUnit));
  parts.push(block("Scope and timescales", f.scopeTimescale));
  parts.push(block("Estimates", f.estimateHonesty));
  if (isPublicText(f.sraPriceList)) parts.push(block("SRA Transparency Rules", f.sraPriceList));
  parts.push(block("Insurance and third-party funding", f.thirdPartyFunding));
  if (isPublicText(f.standardTerms)) {
    parts.push(
      `<p class="legal-note">Standard terms of business: <a href="${esc(f.standardTerms)}">${esc(f.standardTerms)}</a></p>`,
    );
  }
  parts.push(
    block(
      "No guaranteed recoveries",
      "Fees are for legal work. We will not promise a recovery that the evidence does not support.",
    ),
  );
  return parts.filter(Boolean).join("");
}

export function privacyHtml() {
  const p = trust.privacy;
  const parts = [];
  if (isPublicText(p.controller)) parts.push(block("Controller", p.controller));
  if (isPublicText(p.icoNumber)) parts.push(block("ICO registration", p.icoNumber));
  parts.push(
    block(
      "What we collect",
      "If you write to us we receive the name, contact details and matter description you send. We use that information to decide whether we can act and to reply. We do not run advertising analytics on this preview.",
    ),
  );
  if (p.lawfulBases?.length) {
    parts.push(blockHtml(
      "Lawful bases",
      `<ul>${p.lawfulBases
        .filter((item) => isPublicText(item.basis) && isPublicText(item.use))
        .map((item) => `<li><strong>${esc(item.basis)}.</strong> ${esc(item.use)}</li>`)
        .join("")}</ul>`,
    ));
  }
  if (p.retention?.length) {
    parts.push(blockHtml(
      "Retention",
      `<ul>${p.retention
        .filter((item) => isPublicText(item.category) && isPublicText(item.period))
        .map((item) => `<li><strong>${esc(item.category)}.</strong> ${esc(item.period)}</li>`)
        .join("")}</ul>`,
    ));
  }
  const rights = privacyRightsText();
  if (rights) parts.push(block("Your rights", rights));
  parts.push(block("International transfers", p.internationalTransfers));
  return parts.filter(Boolean).join("");
}

export function filterPublicFaqs(faqs) {
  return (faqs || []).filter((item) => isPublicText(item.q) && isPublicText(item.a));
}
