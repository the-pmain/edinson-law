import { personEmail, personPhone } from "../content/people.js";
import { site, home, pages, insightBodies, serviceMatter, trust, t, loc } from "../i18n/catalog.js";
import { TEXT_FIELD_MAX } from "../js/prepare-clients-model.js";
import { crumbs, documentPage, fieldMark, insightIcon, practiceIcon, whyIcon } from "./layout.js";
import { claimFormHtml, releaseFormHtml } from "./matter-forms.js";
import { previewDataAttrs } from "./preview-copy.js";
import { todayIso } from "./dates.js";
import { esc } from "./html.js";
import {
  complaintsHtml,
  filterPublicFaqs,
  htmlWithSraLinks,
  isPublicText,
  pricingHtml,
  privacyHtml,
  regulatoryHtml,
  reviewFoot,
  sraRegisterAnchor,
} from "./trust-html.js";

function personHref(person) {
  return `/people/${person.slug}/`;
}

function portraitSlot(person, className = "") {
  const label = t("portraitLabel", { name: person.name });
  return `<div class="portrait-slot ${className}" role="img" aria-label="${esc(label)}">
    <span class="portrait-slot-ring" aria-hidden="true"></span>
    <span class="portrait-slot-initials">${esc(person.initials)}</span>
    <span class="portrait-slot-mark">${esc(t("portraitFollow"))}</span>
  </div>`;
}

function personPortrait(person, className = "person-photo") {
  const useSlot = site.peoplePlaceholders || !person.photo;
  if (!useSlot && person.photo) {
    const w = person.photoWidth || 640;
    const h = person.photoHeight || 640;
    return `<img class="${className}" src="${esc(person.photo)}" width="${w}" height="${h}" alt="${esc(person.name)}" decoding="async">`;
  }
  return portraitSlot(person, className);
}

function personExpertise(person) {
  const role = (person.roleEn || person.role || "").toLowerCase();
  const tags = [];
  if (/owner/.test(role)) tags.push("practice");
  if (/regulatory|hmrc|tax/.test(role)) tags.push("regulatory");
  if (/cross-border|corruption/.test(role)) tags.push("cross-border");
  if (/crypto|digital asset/.test(role)) tags.push("crypto-digital");
  if (/forensic accountant/.test(role)) tags.push("forensic-accounting");
  if (/investigator|investigation|digital forensics|intelligence/.test(role)) {
    tags.push("investigations");
  }
  if (/asset|recovery|confiscation|tracing|payments/.test(role)) tags.push("asset-tracing");
  if (/solicitor|lawyer|prosecution|restraint|disclosure|freezing/.test(role)) {
    tags.push("private-prosecutions");
  }
  return [...new Set(tags)];
}

function expertiseLabel(key) {
  return t(`tag.${key}`);
}

function personGroup(person) {
  const role = (person.roleEn || person.role || "").toLowerCase();
  if (person.principal) return "practice";
  if (/solicitor|lawyer/.test(role)) return "legal";
  if (/investigator|forensic accountant|digital forensics|internal investigation|intelligence/.test(role)) {
    return "investigations";
  }
  return "recovery";
}

function personStatus(person) {
  if (person.principal) return t("ownerSole");
  const role = person.roleEn || person.role || "";
  if (/Solicitor/i.test(role)) return t("solicitor");
  if (/Lawyer/i.test(role)) return t("lawyer");
  if (/Investigator/i.test(role)) return t("investigator");
  return t("specialist");
}

function personChips(person) {
  if (person.principal) {
    return `<span class="chip-row">
    <span class="chip">${esc(t("owner"))}</span>
    <span class="chip chip-status">${esc(t("solePractice"))}</span>
  </span>`;
  }
  if (person.sraRegulated) {
    return `<span class="chip-row">
    <span class="chip">${esc(t("sraRegulated"))}</span>
    <span class="chip chip-status">${esc(t("solicitor"))}</span>
  </span>`;
  }
  const status = personStatus(person);
  const second = expertiseLabel(personExpertise(person)[0]);
  return `<span class="chip-row">
    <span class="chip">${esc(status)}</span>
    ${second ? `<span class="chip chip-status">${esc(second)}</span>` : ""}
  </span>`;
}

function personMailto(person) {
  const email = personEmail(person);
  if (!email) return "";
  return `<a class="person-email" href="mailto:${esc(email)}" title="${esc(email)}">${esc(email)}</a>`;
}

function personTel(person) {
  const phone = personPhone(person);
  if (!phone) return "";
  const href = phone.replace(/[^\d+]/g, "");
  return `<a class="person-email" href="tel:${esc(href)}" title="${esc(phone)}">${esc(phone)}</a>`;
}

function personContact(person) {
  const email = personMailto(person);
  const phone = personTel(person);
  if (!email && !phone) return "";
  if (!phone) return email;
  return `<span class="person-contact">${email}${phone}</span>`;
}

function peopleCards(list = site.people, variant = "") {
  if (!list.length) return "";
  const compact = variant === "compact";
  return `<div class="people-grid${compact ? " people-grid-collective" : ""}">
    ${list
      .map(
        (person) => `<article class="person-card${compact ? " person-card-compact" : ""}" data-expertise="${esc(personExpertise(person).join("|"))}">
          <a class="person-card-link" href="${personHref(person)}">
            ${personPortrait(person)}
            <span class="person-card-copy">
              <h2>${esc(person.name)}</h2>
              ${personChips(person)}
              <p class="muted">${esc(person.summary || person.role)}</p>
            </span>
          </a>
          ${personContact(person)}
        </article>`,
      )
      .join("")}
  </div>`;
}

function principalPerson() {
  return site.people.find((person) => person.principal) || site.people[0];
}

function jsonScript(id, value) {
  return `<script type="application/json" id="${id}">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`;
}

function agreementField({
  id,
  label,
  type = "text",
  autocomplete = "",
  error = "",
  hint = "",
  max = "",
  maxlength = "",
  required = true,
}) {
  const req = required ? ` <span class="req">${esc(t("required"))}</span>` : "";
  const auto = autocomplete ? ` autocomplete="${esc(autocomplete)}"` : "";
  const maxAttr = max ? ` max="${esc(max)}"` : "";
  const maxLengthAttr = maxlength ? ` maxlength="${esc(String(maxlength))}"` : "";
  const reqAttr = required ? " required" : "";
  const hintId = hint ? `${id}-hint` : "";
  const described = hintId ? ` aria-describedby="${esc(hintId)}"` : "";
  const dateAttrs = type === "date" ? ` data-date-format="eu"` : "";
  const control =
    type === "textarea"
      ? `<textarea id="${id}" name="${id}" rows="4"${reqAttr}${auto}${maxLengthAttr}${described}></textarea>`
      : `<input id="${id}" name="${id}" type="${esc(type)}"${reqAttr}${auto}${maxAttr}${maxLengthAttr}${dateAttrs}${described}>`;
  return `<div class="field">
    <label for="${id}">${esc(label)}${req}</label>
    ${control}
    ${hint ? `<p class="hint" id="${esc(hintId)}">${esc(hint)}</p>` : ""}
    ${error ? `<p class="error">${esc(error)}</p>` : ""}
  </div>`;
}

function agreementPayload() {
  const lead = principalPerson();
  return {
    firm: {
      address: trust.firm.registeredOffice,
      email: site.email || trust.contact.email,
      phone: site.phone || trust.contact.phone,
      sraNumber: site.sraNumber,
      supervisorName: lead.name,
      supervisorTitle: lead.roleEn || lead.role,
      supervisorRole: "director",
      updateFrequency: "six weeks",
      privacyUrl: "edisonlaw.co.uk/privacy",
      vatTreatment: "plus",
      firstReportWindow: "8-12",
      recoveryTailMonths: "12",
      interestRate: "4",
      singleDisbursementLimit: "500",
      aggregateDisbursementLimit: "2500",
      billingFrequency: "monthly",
      liabilityLimit: "3000000",
      individualRole: "director",
      complaintsPartner: trust.complaints.handlerName,
      complaintsEmail: trust.complaints.email,
      complaintAckDays: String(trust.complaints.acknowledgementDays),
      complaintResponseWeeks: String(trust.complaints.finalResponseWeeks),
      fileRetentionYears: "7",
      valuationBody: "Royal Institution of Chartered Surveyors (RICS)",
    },
    people: site.people.map((person) => ({
      slug: person.slug,
      name: person.name,
      role: person.role,
      email: personEmail(person),
      phone: personPhone(person),
      principal: Boolean(person.principal),
      sraRegulated: Boolean(person.sraRegulated),
    })),
  };
}

function agreementFormHtml() {
  return `
    <div class="wrap">
      ${jsonScript("edison-agreement-defaults", agreementPayload())}
      <form class="form" id="agreement-form" data-agreement-form novalidate ${previewDataAttrs()} data-msg-check="${esc(t("formCheck"))}" data-msg-saving="${esc(t("agreementSaving"))}" data-msg-creating="${esc(t("agreementCreating"))}" data-msg-done="${esc(t("agreementDone"))}" data-msg-fail="${esc(t("agreementFail"))}" data-msg-save-fail="${esc(t("agreementSaveFail"))}">
        <div class="agreement-fields">
          ${agreementField({ id: "clientName", label: t("agreementClientName"), autocomplete: "name", error: t("enterName") })}
          ${agreementField({ id: "clientEmail", label: t("email"), type: "email", autocomplete: "email", error: t("enterEmail") })}
          ${agreementField({ id: "clientPhone", label: t("telephone"), type: "tel", autocomplete: "tel", error: t("enterPhone") })}
          ${agreementField({ id: "clientOccupation", label: t("agreementOccupation"), autocomplete: "organization-title", required: false, maxlength: TEXT_FIELD_MAX })}
          ${agreementField({ id: "clientDob", label: t("agreementDob"), type: "date", autocomplete: "bday", error: t("enterDob"), max: todayIso() })}
        </div>
        <div class="field">
          <label class="checkbox" for="agreementPrivacy">
            <input id="agreementPrivacy" name="agreementPrivacy" type="checkbox" required>
            <span>${linkedPhrase(t("agreementPrivacy"), { privacy: `<a href="/privacy/">${esc(t("privacyNotice"))}</a>` })}</span>
          </label>
          <p class="error">${esc(t("confirmPrivacy"))}</p>
        </div>
        <button class="btn btn-signal form-submit" type="submit" data-agreement-submit>${esc(t("agreementDownload"))}</button>
        <p class="form-status" data-form-status></p>
      </form>
    </div>
  `;
}

function agreementPage() {
  const page = {
    path: "/people/agreement/",
    title: `${t("agreementHeading").replace(/\.$/, "")} | Edison Law`,
    description: t("agreementLead"),
    heading: t("agreementHeading"),
    crumb: t("agreementLabel"),
    breadcrumbs: [{ label: t("nav.people"), href: "/people/" }],
  };
  const body = `
    <main id="content" class="agreement-page">
      <div class="wrap page-head page-head-tight">
        ${crumbs([
          { label: t("nav.people"), href: "/people/" },
          { label: t("agreementLabel") },
        ])}
        <h1>${esc(t("agreementHeading"))}</h1>
        <p class="lead muted">${esc(t("agreementLead"))}</p>
      </div>
      ${agreementFormHtml()}
    </main>
  `;
  return documentPage(page, body);
}

function claimPage() {
  const page = {
    path: "/people/victim-claim/",
    title: `${t("claimHeading").replace(/\.$/, "")} | Edison Law`,
    description: t("claimLead"),
    heading: t("claimHeading"),
    crumb: t("claimLabel"),
    breadcrumbs: [{ label: t("nav.people"), href: "/people/" }],
  };
  const body = `
    <main id="content" class="matter-page claim-page">
      <div class="wrap page-head page-head-tight">
        ${crumbs([
          { label: t("nav.people"), href: "/people/" },
          { label: t("claimLabel") },
        ])}
        <h1>${esc(t("claimHeading"))}</h1>
        <p class="lead muted">${esc(t("claimLead"))}</p>
      </div>
      ${claimFormHtml()}
    </main>
  `;
  return documentPage(page, body);
}

function releasePage() {
  const page = {
    path: "/people/release-order/",
    title: `${t("releaseHeading").replace(/\.$/, "")} | Edison Law`,
    description: t("releaseLead"),
    heading: t("releaseHeading"),
    crumb: t("releaseLabel"),
    breadcrumbs: [{ label: t("nav.people"), href: "/people/" }],
  };
  const body = `
    <main id="content" class="matter-page release-page">
      <div class="wrap page-head page-head-tight">
        ${crumbs([
          { label: t("nav.people"), href: "/people/" },
          { label: t("releaseLabel") },
        ])}
        <h1>${esc(t("releaseHeading"))}</h1>
        <p class="lead muted">${esc(t("releaseLead"))}</p>
      </div>
      ${releaseFormHtml()}
    </main>
  `;
  return documentPage(page, body);
}

function adminPage() {
  const page = {
    path: "/admin/",
    title: "Prepared clients | Edison Law",
    description: "Internal list of client agreement submissions.",
    heading: "Prepared clients",
    crumb: "Admin",
    noindex: true,
    unlisted: true,
    bootScript: `try{if(localStorage.getItem("edison-admin-ok")==="1")document.documentElement.dataset.adminSession="1"}catch(e){}`,
  };
  const body = `
    <main id="content" class="admin-page" data-admin-prepare-clients>
      <section class="admin-lock" data-admin-gate>
        <div class="admin-lock-inner">
          <h1>Passcode</h1>
          <p class="lead muted">Enter four digits to view submissions.</p>
          <div class="admin-pin">
            <div class="admin-pin-dots" data-admin-pin-dots aria-hidden="true">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="admin-pin-pad" role="group" aria-label="PIN keypad">
              <button type="button" data-pin-digit="1">1</button>
              <button type="button" data-pin-digit="2">2</button>
              <button type="button" data-pin-digit="3">3</button>
              <button type="button" data-pin-digit="4">4</button>
              <button type="button" data-pin-digit="5">5</button>
              <button type="button" data-pin-digit="6">6</button>
              <button type="button" data-pin-digit="7">7</button>
              <button type="button" data-pin-digit="8">8</button>
              <button type="button" data-pin-digit="9">9</button>
              <button type="button" class="admin-pin-muted" data-pin-clear>Clear</button>
              <button type="button" data-pin-digit="0">0</button>
              <button type="button" class="admin-pin-muted" data-pin-back aria-label="Delete last digit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M8.2 5.5h11.3A2.5 2.5 0 0 1 22 8v8a2.5 2.5 0 0 1-2.5 2.5H8.2L2.4 12 8.2 5.5z"/>
                  <path d="M11.2 9.2 16.8 14.8M16.8 9.2 11.2 14.8"/>
                </svg>
              </button>
            </div>
            <p class="admin-pin-status" data-admin-gate-status aria-live="polite"></p>
          </div>
        </div>
      </section>
      <section class="admin-open" data-admin-list hidden>
        <div class="wrap page-head page-head-tight">
          <h1>Prepared clients</h1>
          <p class="lead muted">Records submitted through the client agreement form.</p>
        </div>
        <div class="wrap">
          ${jsonScript("edison-agreement-defaults", agreementPayload())}
          <div class="admin-toolbar">
            <p class="muted" data-admin-summary>Loading records</p>
            <p class="admin-action-status" data-admin-action-status aria-live="polite"></p>
            <button class="btn btn-ghost" type="button" data-admin-sign-out>Sign out</button>
          </div>
          <div class="admin-loading" data-admin-loading role="status" aria-label="Loading records">
            <span class="admin-spinner" aria-hidden="true"></span>
          </div>
          <div class="admin-table-wrap" data-admin-table hidden>
            <table class="admin-table">
              <thead>
                <tr>
                  <th scope="col">Received</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Telephone</th>
                  <th scope="col">Occupation</th>
                  <th scope="col">Date of birth</th>
                  <th scope="col">Instructed</th>
                  <th scope="col">Documents</th>
                </tr>
              </thead>
              <tbody data-admin-rows></tbody>
            </table>
          </div>
          <p class="admin-empty muted" data-admin-empty hidden>No client records yet.</p>
          <div class="admin-error" data-admin-error hidden>
            <p class="form-status" data-admin-list-status data-visible="true"></p>
            <button class="btn btn-ghost" type="button" data-admin-retry>Try again</button>
          </div>
          <nav class="admin-pager" data-admin-pager aria-label="Pagination" hidden></nav>
        </div>
      </section>
    </main>
  `;
  return documentPage(page, body);
}

function collectiveShot() {
  const profile = home.sections.profile;
  const lead = principalPerson();
  const src = lead.practicePhoto || lead.photo;
  if (!src) return "";
  const w = lead.practicePhotoWidth || lead.photoWidth || 640;
  const h = lead.practicePhotoHeight || lead.photoHeight || 640;
  return `<a class="owner-row-photo" href="${personHref(lead)}">
      <img src="${esc(src)}" width="${w}" height="${h}" alt="${esc(profile.collectiveAlt)}" decoding="async">
      <span class="owner-row-cap">
        <span>${esc(profile.collectiveCaption)}</span>
        <span class="mono">${esc(profile.collectiveMark)}</span>
      </span>
    </a>`;
}

function peopleCollective(options = {}) {
  const profile = home.sections.profile;
  const lead = principalPerson();
  const showIntro = options.intro !== false;
  const hideRow = options.row === false;
  const shot = options.all
    ? `<span class="owner-row-photo">${personPortrait(lead, "person-photo")}</span>`
    : collectiveShot();
  const copy = showIntro
    ? `<p class="label">${esc(profile.label)}</p>
            <h2>${esc(profile.heading)}</h2>
            <p class="lead profile-lead">${htmlWithSraLinks(profile.text)}</p>`
    : `<h2>${esc(lead.name)}</h2>
            ${personChips(lead)}
            <p class="lead profile-lead">${esc(lead.summary)}</p>`;
  const row = hideRow
    ? showIntro
      ? `<div class="people-home-head">${copy}</div>`
      : ""
    : options.all
      ? `<div class="owner-row" data-expertise="${esc(personExpertise(lead).join("|"))}">
      <a class="owner-row-photo" href="${personHref(lead)}">${personPortrait(lead, "person-photo")}</a>
      <div class="owner-row-copy">
        <a class="owner-row-link" href="${personHref(lead)}">${copy}</a>
        ${personContact(lead)}
      </div>
    </div>`
      : `<div class="owner-row">
      ${shot}
      <div class="owner-row-copy">${copy}</div>
    </div>`;
  const others = site.people.filter((person) => !person.principal);
  const roster = options.all ? others : others.slice(0, 14);
  const cards =
    options.includePeople === false ? "" : peopleCards(roster, "compact");
  return `${row}${cards}`;
}

function insightTopics(item) {
  return (item.related || [])
    .map((id) => site.practices.find((practice) => practice.id === id)?.title)
    .filter(Boolean);
}

function insightReading(item) {
  const blocks = insightBodies[item.slug] || [];
  const words = blocks.reduce((count, block) => count + `${block.heading} ${block.text}`.split(/\s+/).length, 0);
  const minutes = Math.max(1, Math.round(words / 200) || 1);
  return `${minutes === 1 ? t("minRead", { n: minutes }) : t("minRead", { n: minutes })}`;
}

function insightEntry(item, featured = false) {
  const topics = insightTopics(item);
  return `<a class="${featured ? "insight-featured " : ""}insight-entry" href="/insights/${item.slug}/" data-type="${esc(item.type)}" data-topics="${esc(topics.join("|"))}" data-search="${esc(`${item.title} ${item.type} ${item.description}`)}">
    <span class="service-mark" aria-hidden="true">${insightIcon(item.slug)}</span>
    <span class="insight-body">
      <p class="label">${esc(item.type)} / ${esc(item.dateLabel)} / ${esc(insightReading(item))}</p>
      <h2>${esc(item.title)}</h2>
      ${item.description ? `<p class="muted insight-deck">${esc(item.description)}</p>` : ""}
      <span class="insight-foot">
        ${topics.length ? `<span class="chip-row">${topics.map((topic) => `<span class="chip">${esc(topic)}</span>`).join("")}</span>` : ""}
        <span class="service-more">${esc(t("learnMore"))}</span>
      </span>
    </span>
  </a>`;
}

function contactDirectHtml() {
  const c = trust.contact;
  const lines = [];
  if (isPublicText(c.email)) {
    lines.push(`<p class="mono"><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>`);
  }
  if (isPublicText(c.phone)) {
    lines.push(
      `<p class="muted">${esc(t("telephone"))}: <a href="tel:${esc(c.phone.replace(/\s+/g, ""))}">${esc(c.phone)}</a></p>`,
    );
  }
  if (isPublicText(c.address)) {
    lines.push(`<p class="muted">${esc(c.address)}</p>`);
  }
  return lines.join("");
}

function pageJump(items) {
  if (!items?.length) return "";
  return `<nav class="page-jump" aria-label="${esc(t("onThisPage"))}">
          ${items
            .map(
              (item, index) =>
                `<a href="${item.href}"${index === 0 ? ' aria-current="true"' : ""}>${esc(item.label)}</a>`,
            )
            .join("")}
        </nav>`;
}

function processCards(items) {
  return `<div class="stage-grid">
            ${items
              .map(
                (item) => `<article class="stage-card">
                  <span class="service-mark" aria-hidden="true">${whyIcon(item.icon)}</span>
                  ${item.index ? `<p class="label">${esc(item.index)}</p>` : ""}
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>`;
}

function wrap(inner, band = "") {
  return `<div class="section ${band}"><div class="wrap">${inner}</div></div>`;
}

function titledStack(items, marked = false) {
  return `<div class="item-stack${marked ? " item-stack-marked" : ""}">
    ${items
      .map((item) => {
        const body = `<h3>${esc(item.title)}</h3>
          <p class="muted">${esc(item.text)}</p>`;
        if (!marked) return `<article>${body}</article>`;
        return `<article>
          <span class="service-mark" aria-hidden="true">${whyIcon(item.icon)}</span>
          <span>${body}</span>
        </article>`;
      })
      .join("")}
  </div>`;
}

function numberedList(items) {
  return `<ol class="numbered-list">
    ${items
      .map(
        (item, index) => `<li>
          <span class="numbered-list-index" aria-hidden="true">${index + 1}</span>
          <div class="numbered-list-copy">
            <h3>${esc(item.title)}</h3>
            <p class="muted">${esc(item.text)}</p>
          </div>
        </li>`,
      )
      .join("")}
  </ol>`;
}

function bulletList(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function actionButton(page, fallbackLabel) {
  fallbackLabel = fallbackLabel || t("discussMatter");
  const label = page?.cta?.label || fallbackLabel;
  const href = page?.cta?.href || "/contact/";
  return `<a class="btn btn-signal" href="${esc(href)}">${esc(label)}</a>`;
}

function enquiryBand(page, fallbackHeading) {
  const heading = page?.ctaBand?.heading || fallbackHeading || t("discussThisMatter");
  const text = page?.ctaBand?.text || t("enquiryDefault");
  return `<div class="cta-band">
          <h2>${esc(heading)}</h2>
          <p class="muted">${esc(text)}</p>
          ${actionButton(page)}
        </div>`;
}

function linkedPhrase(template, map) {
  let html = esc(template);
  for (const [token, inner] of Object.entries(map)) {
    html = html.replaceAll(`{${token}}`, inner);
  }
  return html;
}

function linkKnownPhrases(text) {
  let html = esc(text);
  const pairs = [
    [
      t("seeFraudWarning"),
      t("seeFraudWarning").replace(t("fraudWarning"), `<a href="/fraud-warning/">${esc(t("fraudWarning"))}</a>`),
    ],
    ["See the fraud warning.", `See the <a href="/fraud-warning/">${esc(t("fraudWarning"))}</a>.`],
    [
      t("seePricing"),
      t("seePricing").replace(t("pricing"), `<a href="/pricing/">${esc(t("pricing"))}</a>`),
    ],
    ["See Pricing.", `See <a href="/pricing/">${esc(t("pricing"))}</a>.`],
  ];
  for (const [plain, linked] of pairs) {
    html = html.replaceAll(esc(plain), linked);
  }
  return html;
}

function matterProse(key) {
  const extra = serviceMatter[key];
  if (!extra) return "";
  const whenHeading = extra.whenHeading || t("whenWorkAppropriate");
  const altHeading = extra.alternativeHeading || t("whenAnotherRoute");
  const processHeading = extra.processHeading || t("howWorkRuns");
  const alternative = extra.alternative
    ? `<h2>${esc(altHeading)}</h2><p>${esc(extra.alternative)}</p>`
    : extra.notFor?.length
      ? `<h2>${esc(altHeading)}</h2>${bulletList(extra.notFor)}`
      : "";
  const authorities = extra.authorities?.length
    ? extra.authorities
        .filter((item) => isPublicText(item.heading) && isPublicText(item.text))
        .map((item) => `<h3>${esc(item.heading)}</h3><p>${esc(item.text)}</p>`)
        .join("")
    : "";
  const extraBlocks = (extra.extraBlocks || [])
    .filter((item) => isPublicText(item.heading) && isPublicText(item.text))
    .map((item) => {
      return `<h2>${esc(item.heading)}</h2><p>${linkKnownPhrases(item.text)}</p>`;
    })
    .join("");
  const steps = extra.process.filter((step) => isPublicText(step.title) && isPublicText(step.text));
  return `
    <h2>${esc(whenHeading)}</h2>
    ${bulletList(extra.forWhom)}
    ${alternative}
    <h2>${esc(extra.law.heading)}</h2>
    <p>${esc(extra.law.text)}</p>
    ${authorities}
    <h2>${esc(processHeading)}</h2>
    <ol>
      ${steps
        .map((step) => {
          const time = isPublicText(step.timescale) ? ` (${esc(step.timescale)})` : "";
          return `<li><strong>${esc(step.title)}</strong>${time}. ${esc(step.text)}</li>`;
        })
        .join("")}
    </ol>
    ${extraBlocks}
    ${
      extra.risks?.length
        ? `<h2>${esc(t("principalRisks"))}</h2>
    ${bulletList(extra.risks)}`
        : ""
    }
    <h2>${esc(t("fees"))}</h2>
    <p>${linkedPhrase(t("feesMatterText"), {
      pricing: `<a href="/pricing/">${esc(t("pricing"))}</a>`,
    })}</p>
    <h2>${esc(t("whoResponsible"))}</h2>
    <p>${linkedPhrase(t("whoResponsibleText"), {
      regulatory: `<a href="/regulatory-information/">${esc(t("regulatoryInformation"))}</a>`,
      sra: sraRegisterAnchor(t("publicSraRecord")),
    })}</p>
  `;
}

function matterFaqs(page, key) {
  return filterPublicFaqs(serviceMatter[key]?.faqs || page.faqs || []);
}

function cobraSection(band = "") {
  const cobra = home.sections.cobra;
  const href = site.tools.cobraAi.href;
  return `<section class="section${band ? ` ${band}` : ""}" id="cobra-ai">
        <div class="wrap tool-block">
          <p class="label">${esc(cobra.label)}</p>
          <h2>${esc(cobra.heading)}</h2>
          <p class="lead muted">${esc(cobra.lead)}</p>
          <p class="tool-source muted">${esc(cobra.text)} <a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(cobra.sourceLabel)}</a>.</p>
        </div>
      </section>`;
}

function practiceCard(item) {
  return `<a class="practice-item" href="${item.href}">
    ${item.problem ? `<p class="practice-problem">${esc(item.problem)}</p>` : ""}
    <h2>${esc(item.title)}</h2>
    <p>${esc(item.summary)}</p>
    <span class="practice-more">${esc(t("learnMore"))}</span>
  </a>`;
}

function cta(link) {
  return `<a class="btn btn-signal" href="${link.href}">${esc(link.label)}</a>`;
}

function homePage() {
  const why = home.sections.why;
  const cases = home.sections.cases;
  const standing = home.sections.standing;
  const awards = home.sections.awards;
  const body = `
    <main id="content">
      <section class="section band-paper hero-band home-hero">
        <div class="wrap hero home-hero-inner">
          <div class="hero-copy">
            <p class="hero-trust mono"><a href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">SRA ${esc(site.sraNumber)}</a></p>
            <p class="label">${esc(home.sections.hero.descriptor)}</p>
            <h1 class="display">
              ${home.sections.hero.headingLines
                .map((line) => `<span>${esc(line)}</span>`)
                .join("")}
              <em>${esc(home.sections.hero.headingEmphasis)}</em>
            </h1>
            <p class="lead">${esc(home.sections.hero.lead)}</p>
            <div class="hero-actions">
              ${cta(home.sections.hero.cta)}
              <a class="btn btn-ghost" href="${home.sections.hero.ctaSecondary.href}">${esc(
                home.sections.hero.ctaSecondary.label,
              )}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="practice-bar" aria-label="${esc(t("practiceAreas"))}">
        <div class="wrap practice-bar-inner">
          <div class="practice-bar-list">
            ${site.practices.map((item) => practiceCard(item)).join("")}
          </div>
          <a class="btn btn-ghost" href="${home.sections.practiceBar.cta.href}">${esc(
            home.sections.practiceBar.cta.label,
          )}</a>
        </div>
      </section>

      <section class="section awards-section" aria-label="Awards">
        <div class="wrap awards-band">
          <div class="awards-copy">
            <h2>${esc(awards.heading)}</h2>
            <p class="muted">${esc(awards.text)}</p>
          </div>
          <ul class="awards-logos">
            ${awards.items
              .map(
                (item) => `<li>
                  <img src="${esc(item.src)}" alt="${esc(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async">
                </li>`,
              )
              .join("")}
          </ul>
        </div>
      </section>

      <section class="section band-ink">
        <div class="wrap">
          <p class="label">${esc(standing.label)}</p>
          <h2>${esc(standing.heading)}</h2>
          <ul class="recognition-list">
            ${standing.items.map((item) => `<li>${htmlWithSraLinks(item)}</li>`).join("")}
          </ul>
          <p class="standing-note">${htmlWithSraLinks(standing.note)}</p>
          <p><a class="btn btn-ghost" href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">${esc(standing.link)}</a></p>
        </div>
      </section>

      <section class="section band-paper" id="people">
        <div class="wrap people-home">
          ${peopleCollective({ row: false })}
          <div class="people-home-foot">
            <a class="btn btn-ghost" href="${home.sections.profile.cta.href}">${esc(home.sections.profile.cta.label)}</a>
          </div>
        </div>
      </section>

      <section class="section home-work-section">
        <div class="wrap home-work">
          <p class="label">${esc(why.label)}</p>
          <h2>${esc(why.heading)}</h2>
          ${numberedList(why.items)}
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <p class="label">${esc(cases.label)}</p>
          <h2>${esc(cases.heading)}</h2>
          <p class="lead muted method-lead">${esc(cases.intro)}</p>
          <div class="case-grid">
            ${cases.items
              .map(
                (item) => `<article class="case-card">
                  <p class="mono">${esc(item.kind)}</p>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.jurisdictions)}</p>
                  <p>${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>
    </main>
  `;
  return documentPage({ ...home, heading: t("home") }, body);
}

function expertiseIndex() {
  const page = pages.expertise;
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: t("nav.expertise") }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        ${actionButton(page)}
      </div>
      <div class="wrap service-index service-visual-index">
        ${site.practices
          .map(
            (item) => `<a href="${item.href}">
              <span class="service-mark" aria-hidden="true">${practiceIcon(item.id)}</span>
              <span>
                <h2>${esc(item.title)}</h2>
                <p class="muted">${esc(item.summary)}</p>
              </span>
              <span class="service-more">${esc(t("learnMore"))}</span>
            </a>`,
          )
          .join("")}
      </div>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.expertise") }, body);
}

function servicePage(key, practiceId) {
  const page = pages[key];
  const related = site.insights.filter((item) => item.related.includes(practiceId));
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([
          { label: t("nav.expertise"), href: "/expertise/" },
          { label: page.heading },
        ])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
          ${actionButton(page)}
      </div>
      ${wrap(`
        <div class="prose">
          ${matterProse(key)}
        </div>
      `)}
      ${
        matterFaqs(page, key).length
          ? wrap(`
        <h2>${esc(t("questionsAsked"))}</h2>
        <div class="faq">
          ${matterFaqs(page, key)
            .map(
              (item) => `<details>
                <summary>${esc(item.q)}</summary>
                <p>${htmlWithSraLinks(item.a)}</p>
              </details>`,
            )
            .join("")}
        </div>
      `)
          : ""
      }
      ${
        related.length
          ? wrap(`
            <div class="related">
              <p class="label">${esc(t("relatedInsights"))}</p>
              <div class="insight-list">
              ${related
                .map((item) => insightEntry(item))
                .join("")}
              </div>
            </div>
          `)
          : ""
      }
      ${wrap(enquiryBand(page, t("discussThisMatter")))}
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage(
    {
      ...page,
      faqs: matterFaqs(page, key),
      schema: page.schema || "service",
      breadcrumbs: [page.parent],
      crumb: page.heading,
    },
    body,
  );
}

function investigationIndex() {
  const page = pages.investigations;
  const investigators = site.people.filter((person) => personGroup(person) === "investigations");
  const notes = site.insights.filter((item) => item.typeKey === "note");
  const body = `
    <main id="content">
      <section class="section band-paper hero-band">
        <div class="wrap split-visual page-open">
          <div class="page-open-copy">
            ${crumbs([{ label: t("nav.investigations") }])}
            <h1>${esc(page.heading)}</h1>
            <p class="lead">${esc(page.lead)}</p>
            ${pageJump(page.jump)}
            ${actionButton(page)}
          </div>
          ${fieldMark("investigate", "field-mark")}
        </div>
      </section>
      <section class="section" id="process">
        <div class="wrap">
          <p class="label">${esc(page.process.label)}</p>
          <h2>${esc(page.process.heading)}</h2>
          ${processCards(page.process.items)}
        </div>
      </section>
      <section class="practice-bar" id="work" aria-label="${esc(t("investigationTypes"))}">
        <div class="wrap practice-bar-inner">
          <div class="practice-bar-head">
            <p class="label">${esc(t("whatWeInvestigate"))}</p>
            <h2>${esc(t("fiveCategories"))}</h2>
            <p>${esc(page.intro[0])}</p>
          </div>
          <div class="practice-bar-list">
            ${site.investigations.map((item) => practiceCard(item)).join("")}
          </div>
        </div>
      </section>
      ${cobraSection("band-paper")}
      <section class="section" id="investigators">
        <div class="wrap">
          <p class="label">${esc(page.people.label)}</p>
          <h2>${esc(page.people.heading)}</h2>
          <p class="lead profile-lead">${htmlWithSraLinks(page.people.text)}</p>
          ${peopleCards(investigators, "compact")}
          <p><a class="btn btn-ghost" href="/people/">${esc(t("allProfiles"))}</a></p>
        </div>
      </section>
      ${
        notes.length
          ? `<section class="section band-paper">
        <div class="wrap">
          <p class="label">${esc(t("investigationNotes"))}</p>
          <h2>${esc(t("methodWritten"))}</h2>
          <div class="insight-list">
          ${notes
            .map((item) => insightEntry(item))
            .join("")}
          </div>
        </div>
      </section>`
          : ""
      }
      <section class="section" id="instruct">
        <div class="wrap">
          ${enquiryBand(page)}
        </div>
      </section>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.investigations") }, body);
}

function investigationPage(item) {
  const page = {
    ...pages[item.copyKey],
    cta: pages[item.copyKey].cta || pages.investigations.cta,
    ctaBand: pages[item.copyKey].ctaBand || pages.investigations.ctaBand,
  };
  const related = site.insights.filter((note) =>
    (item.related || []).some((id) => note.related.includes(id)),
  );
  const routes = site.practices.filter((practice) =>
    (page.relatedExpertise || []).includes(practice.id),
  );
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([
          { label: t("nav.investigations"), href: "/investigations/" },
          { label: page.heading },
        ])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        ${actionButton(page)}
      </div>
      ${wrap(`
        <div class="prose">
          ${matterProse(item.copyKey)}
        </div>
      `)}
      ${
        matterFaqs(page, item.copyKey).length
          ? wrap(`
        <h2>${esc(t("questionsAsked"))}</h2>
        <div class="faq">
          ${matterFaqs(page, item.copyKey)
            .map(
              (faq) => `<details>
                <summary>${esc(faq.q)}</summary>
                <p>${htmlWithSraLinks(faq.a)}</p>
              </details>`,
            )
            .join("")}
        </div>
      `)
          : ""
      }
      ${
        routes.length
          ? wrap(`
            <div class="related">
              <p class="label">${esc(t("legalRoutesSupport"))}</p>
              ${routes
                .map(
                  (practice) => `<a class="insight-visual" href="${practice.href}">
                    <span class="service-mark" aria-hidden="true">${practiceIcon(practice.id)}</span>
                    <span class="insight-copy">
                      <h3>${esc(practice.title)}</h3>
                      <p class="muted">${esc(practice.summary)}</p>
                    </span>
                  </a>`,
                )
                .join("")}
            </div>
          `)
          : ""
      }
      ${
        related.length
          ? wrap(`
            <div class="related">
              <p class="label">${esc(t("relatedInsights"))}</p>
              <div class="insight-list">
              ${related.map((note) => insightEntry(note)).join("")}
              </div>
            </div>
          `)
          : ""
      }
      ${wrap(enquiryBand(page))}
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage(
    {
      ...page,
      faqs: matterFaqs(page, item.copyKey),
      breadcrumbs: [page.parent],
      crumb: page.heading,
    },
    body,
  );
}

function insightsIndex() {
  const page = pages.insights;
  const types = [...new Set(site.insights.map((item) => item.type))];
  const topics = [...new Set(site.insights.flatMap((item) => insightTopics(item)))];
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: t("nav.insights") }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        <div class="insight-tools">
          <label class="insight-search">
            <span class="label">${esc(t("search"))}</span>
            <input type="search" data-insight-search placeholder="${esc(t("searchNotes"))}" autocomplete="off">
          </label>
          <div class="chip-row chip-filters" data-insight-filters>
            <button type="button" class="chip chip-filter" data-filter="all" aria-pressed="true">${esc(t("all"))}</button>
            ${types.map((type) => `<button type="button" class="chip chip-filter" data-filter="${esc(type)}">${esc(type)}</button>`).join("")}
            ${topics.map((topic) => `<button type="button" class="chip chip-filter" data-filter="${esc(topic)}">${esc(topic)}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="wrap insight-list">
        ${site.insights
          .map((item, index) => insightEntry(item, index === 0))
          .join("")}
        <p class="insight-empty muted" data-insight-empty hidden>${esc(t("noNotes"))}</p>
      </div>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.insights") }, body);
}

function insightPage(item) {
  const blocks = insightBodies[item.slug];
  const page = {
    path: `/insights/${item.slug}/`,
    title: `${item.title} | Edison Law`,
    description: item.description,
    heading: item.title,
    article: item,
    breadcrumbs: [{ label: t("nav.insights"), href: "/insights/" }],
    crumb: item.title,
  };
  const body = `
    <main id="content">
      <article class="wrap page-head">
        ${crumbs([
          { label: t("nav.insights"), href: "/insights/" },
          { label: item.title },
        ])}
        <p class="mono">${esc(item.type)} / ${esc(item.dateLabel)}</p>
        <h1>${esc(item.title)}</h1>
        <p class="lead muted">${esc(item.description)}</p>
      </article>
      <div class="wrap prose">
        ${blocks
          .map((block) => `<h2>${esc(block.heading)}</h2><p>${esc(block.text)}</p>`)
          .join("")}
        <div class="evidence-note">
          <p class="mono">${esc(t("disclaimer"))}</p>
          <p>${esc(t("disclaimerText"))}</p>
        </div>
        <p><a href="/contact/">${esc(t("discussRelated"))}</a></p>
      </div>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage(page, body);
}

function peoplePage() {
  const page = pages.people;
  const filters = [...new Set(site.people.flatMap((person) => personExpertise(person)))];
  const directoryGroups = [
    {
      id: "legal",
      heading: t("peopleLegalHeading"),
      text: t("peopleLegalText"),
    },
    {
      id: "investigations",
      heading: t("peopleInvestHeading"),
      text: t("peopleInvestText"),
    },
    {
      id: "recovery",
      heading: t("peopleRecoveryHeading"),
      text: t("peopleRecoveryText"),
    },
  ];
  const body = `
    <main id="content">
      <div class="wrap page-head page-head-tight">
        ${crumbs([{ label: t("nav.people") }])}
        <div class="chip-row chip-filters" data-people-filters>
          <button type="button" class="chip chip-filter" data-filter="all" aria-pressed="true">${esc(t("all"))}</button>
          ${filters.map((item) => `<button type="button" class="chip chip-filter" data-filter="${esc(item)}">${esc(expertiseLabel(item))}</button>`).join("")}
        </div>
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${htmlWithSraLinks(page.lead)}</p>
      </div>
      <div class="wrap people-index" data-people-index>
        ${peopleCollective({ intro: false, all: true, includePeople: false })}
        ${directoryGroups
          .map((group) => {
            const members = site.people.filter(
              (person) => !person.principal && personGroup(person) === group.id,
            );
            if (!members.length) return "";
            return `<section class="people-directory-group" data-people-group>
              <div class="people-directory-head">
                <p class="label">${esc(group.heading)}</p>
                <p class="muted">${esc(group.text)}</p>
              </div>
              ${peopleCards(members, "compact")}
            </section>`;
          })
          .join("")}
      </div>
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.people") }, body);
}

function joinUsPage() {
  const page = pages.joinUs;
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: t("nav.joinUs") }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        ${pageJump(page.jump)}
        <div class="page-head-intro join-intro">
          ${page.intro.map((para) => `<p>${esc(para)}</p>`).join("")}
          <p><a class="btn btn-signal" href="${esc(page.cvCta.href)}">${esc(page.cvCta.label)}</a></p>
          <p><a href="/people/">${esc(t("peopleAtEdison"))}</a></p>
        </div>
      </div>
      <section class="section" id="careers">
        <div class="wrap">
          <p class="label">${esc(page.tracks.label)}</p>
          <h2>${esc(page.tracks.heading)}</h2>
          <div class="service-index career-tracks">
            ${page.tracks.items
              .map(
                (item) => `<article>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="section band-paper" id="why">
        <div class="wrap">
          <p class="label">${esc(page.why.label)}</p>
          <h2>${esc(page.why.heading)}</h2>
          ${titledStack(page.why.items)}
        </div>
      </section>
      <section class="section" id="culture">
        <div class="wrap split-visual">
          <div>
            <p class="label">${esc(page.benefits.label)}</p>
            <h2>${esc(page.benefits.heading)}</h2>
            ${titledStack(page.benefits.items, true)}
          </div>
          ${fieldMark("discuss", "field-mark")}
        </div>
      </section>
      <section class="section band-ink join-vacancies" id="vacancies">
        <div class="wrap cta-band">
          <p class="label">${esc(page.vacancies.label)}</p>
          <h2>${esc(page.vacancies.heading)}</h2>
          <p class="lead muted">${esc(page.vacancies.text)}</p>
          <p class="muted">${esc(page.vacancies.detail)}</p>
          <a class="btn btn-signal" href="${page.vacancies.cta.href}">${esc(page.vacancies.cta.label)}</a>
        </div>
      </section>
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.joinUs") }, body);
}

function personPage(person) {
  const isSolicitor = /Solicitor/i.test(person.roleEn || person.role || "");
  const profileStatusDetail = isSolicitor ? t("solicitorStatus") : t("supervisedStatus");
  const profileRoleNote = isSolicitor
    ? linkedPhrase(t("solicitorRoleNote"), { sra: sraRegisterAnchor(t("publicSraRecord")) })
    : linkedPhrase(t("otherRoleNote"), {
        regulatory: `<a href="/regulatory-information/">${esc(t("regulatoryInformation"))}</a>`,
        sra: sraRegisterAnchor(t("publicSraRecord")),
      });
  const page = {
    path: personHref(person),
    title: `${person.name} | Edison Law`,
    description: person.summary,
    heading: person.name,
    person,
    breadcrumbs: [{ label: t("nav.people"), href: "/people/" }],
    crumb: person.name,
  };
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([
          { label: t("nav.people"), href: "/people/" },
          { label: person.name },
        ])}
      </div>
      <div class="wrap person-page">
        <aside class="person-aside">
          ${personPortrait(person, "person-photo person-photo-lead")}
        </aside>
        <div class="prose">
          <h1>${esc(person.name)}</h1>
          <p class="mono">${esc(person.role)}</p>
          ${personChips(person)}
          ${personContact(person)}
          <p class="profile-status">
            <span>${esc(personStatus(person))}</span>
            <span>London</span>
            <span>${esc(profileStatusDetail)}</span>
          </p>
          <p class="muted profile-role-note">${profileRoleNote}</p>
          <h2>${esc(t("roleAndFocus"))}</h2>
          ${person.bio.map((para) => `<p>${htmlWithSraLinks(para)}</p>`).join("")}
          ${
            person.quotes?.length
              ? person.quotes.map((item) => `<blockquote>${esc(item)}</blockquote>`).join("")
              : ""
          }
          ${person.closing ? `<p>${htmlWithSraLinks(person.closing)}</p>` : ""}
          ${
            person.areas?.length
              ? `<h2>${esc(t("keyAreas"))}</h2>
            <ul>${person.areas.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
              : ""
          }
          ${
            person.experience?.length
              ? `<h2>${esc(t("workOfThisKind"))}</h2>
            <p class="muted">${esc(t("workOfThisKindNote"))}</p>
            <ul>${person.experience.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
              : ""
          }
          <p class="profile-actions">
            <a class="btn btn-signal" href="/people/agreement/?instruct=${esc(person.slug)}">${esc(t("agreementProfileCta"))}</a>
          </p>
        </div>
      </div>
    </main>
  `;
  return documentPage(page, body);
}

function aboutPage() {
  const page = pages.about;
  const record = page.record;
  const clients = page.clients;
  const commitments = page.commitments;
  const difference = page.difference;
  const heritage = page.heritage;
  const facts = record.items;
  const body = `
    <main id="content">
      <div class="wrap page-head about-open">
        ${crumbs([{ label: t("nav.about") }])}
        <div class="about-open-copy">
          <h1>${esc(t("aboutTitle"))}</h1>
          <p class="lead">${esc(page.heading)}</p>
          <p class="trust-strip">
            <a class="mono" href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">SRA ${esc(site.sraNumber)}</a>
            <span>London</span>
            <span>${esc(t("supervisedBySolicitor"))}</span>
          </p>
          ${pageJump(page.jump)}
          ${actionButton(page)}
        </div>
        ${fieldMark("london", "field-mark")}
      </div>
      <section class="section" id="who">
        <div class="wrap about-story">
          <h2>${esc(page.who.heading)}</h2>
          <p class="lead muted">${esc(page.lead)}</p>
          <p>${htmlWithSraLinks(heritage.text)}</p>
        </div>
      </section>
      <section class="section" id="what">
        <div class="wrap">
          <div class="about-story">
            <h2>${esc(page.what.heading)}</h2>
            <p class="lead muted">${esc(difference.heading)}</p>
          </div>
          ${titledStack(difference.items)}
          <div class="about-record">
            <h3>${esc(record.heading)}</h3>
            <p class="muted">${htmlWithSraLinks(record.note)}</p>
            <div class="facts-strip about-facts">
              ${facts
                .map((item) => {
                  const value =
                    item.value === site.sraNumber
                      ? `<a href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.value)}</a>`
                      : esc(item.value);
                  return `<p class="fact-item"><span class="fact-value">${value}</span><span class="fact-label">${esc(item.label)}</span></p>`;
                })
                .join("")}
            </div>
          </div>
        </div>
      </section>
      <section class="section" id="clients">
        <div class="wrap about-story">
          <h2>${esc(clients.label)}</h2>
          <p class="lead muted">${esc(clients.heading)}</p>
          <p class="muted">${esc(clients.note)}</p>
          <ul class="audience-list">
            ${clients.items.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </div>
      </section>
      <section class="section" id="values">
        <div class="wrap">
          <h2>${esc(commitments.heading)}</h2>
          ${titledStack(commitments.items)}
        </div>
      </section>
      <section class="section band-ink" id="talk">
        <div class="wrap cta-band">
          <h2>${esc(page.talk.heading)}</h2>
          <p class="lead muted">${esc(pages.contact.lead)}</p>
          ${contactDirectHtml()}
          ${actionButton(page)}
        </div>
      </section>
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.about") }, body);
}

function contactPage() {
  const page = pages.contact;
  const body = `
    <main id="content">
      <div class="wrap contact-page">
        ${crumbs([{ label: t("nav.contact") }])}
        <div class="contact-layout">
          <div class="contact-copy contact-intro">
            <h1>${esc(page.heading)}</h1>
            <p class="lead muted">${esc(page.lead)}</p>
          </div>
          <form class="form" id="contact-form" novalidate data-mailto="${esc(site.email)}" data-ack="${esc(trust.contact.acknowledgementTime)}" data-msg-check="${esc(t("formCheck"))}" data-msg-draft="${esc(t("formDraft"))}" data-msg-subject="${esc(t("formSubject"))}" data-label-name="${esc(t("formName"))}" data-label-email="${esc(t("formEmail"))}" data-label-org="${esc(t("formOrg"))}" data-label-matter="${esc(t("formMatter"))}">
          <p class="form-eta muted">${esc(trust.contact.acknowledgementTime)}</p>
          <div class="field">
            <label for="full-name">${esc(t("fullName"))} <span class="req">${esc(t("required"))}</span></label>
            <input id="full-name" name="name" type="text" autocomplete="name" required>
            <p class="error" data-error-for="name">${esc(t("enterName"))}</p>
          </div>
          <div class="field">
            <label for="email">${esc(t("email"))} <span class="req">${esc(t("required"))}</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required>
            <p class="error" data-error-for="email">${esc(t("enterEmail"))}</p>
          </div>
          <div class="field">
            <label for="organisation">${esc(t("organisation"))}</label>
            <input id="organisation" name="organisation" type="text" autocomplete="organization">
          </div>
          <div class="field">
            <label for="matter">${esc(t("matterType"))} <span class="req">${esc(t("required"))}</span></label>
            <select id="matter" name="matter" required>
              <option value="">${esc(t("selectOne"))}</option>
              ${site.practices.map((item) => `<option>${esc(item.title)}</option>`).join("")}
              <option>${esc(t("somethingElse"))}</option>
            </select>
            <p class="error" data-error-for="matter">${esc(t("chooseMatter"))}</p>
          </div>
          <div class="field">
            <label for="message">${esc(t("howWeCanHelp"))} <span class="req">${esc(t("required"))}</span></label>
            <textarea id="message" name="message" required></textarea>
            <p class="error" data-error-for="message">${esc(t("describeSituation"))}</p>
          </div>
          <aside class="safety-callout">
            <p class="label">${esc(t("safety"))}</p>
            <p>${esc(page.urgent)}</p>
          </aside>
          <div class="field">
            <label class="checkbox" for="privacy">
              <input id="privacy" name="privacy" type="checkbox" required>
              <span>${linkedPhrase(t("privacyConsent"), { privacy: `<a href="/privacy/">${esc(t("privacyNotice"))}</a>` })}</span>
            </label>
            <p class="error" data-error-for="privacy">${esc(t("confirmPrivacy"))}</p>
          </div>
          <button class="btn btn-signal form-submit" type="submit">${esc(page.formButton || t("sendEnquiry"))}</button>
          <p class="form-status" data-form-status></p>
          <p class="small muted">${
            site.email
              ? t("formPreview", { email: esc(site.email) })
              : esc(trust.contact.acknowledgementTime)
          }</p>
        </form>
          <div class="contact-copy contact-aside">
            <div class="contact-direct">
              <p class="label">${esc(t("writeOrCall"))}</p>
              ${contactDirectHtml()}
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
  return documentPage({ ...page, crumb: t("nav.contact") }, body);
}

const TRUST_PAGE_HTML = {
  regulatory: regulatoryHtml,
  complaints: complaintsHtml,
  pricing: pricingHtml,
  privacy: privacyHtml,
};

function legalPage(key) {
  const page = pages[key];
  if (page.movedTo) {
    const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: page.heading }])}
        <h1>${esc(page.heading)}</h1>
        ${page.intro && isPublicText(page.intro) ? `<p class="lead muted">${htmlWithSraLinks(page.intro)}</p>` : ""}
        <p><a class="btn btn-signal" href="${esc(page.movedTo)}">${esc(t("regulatoryInformation"))}</a></p>
      </div>
    </main>
  `;
    return documentPage(
      { ...page, crumb: page.heading, canonicalPath: page.movedTo, redirectTo: page.movedTo },
      body,
    );
  }
  const extra = TRUST_PAGE_HTML[page.trustPage]
    ? TRUST_PAGE_HTML[page.trustPage]()
    : (page.blocks || [])
        .filter((block) => isPublicText(block.text))
        .map((block) => `<article class="legal-entry"><h2>${esc(block.heading)}</h2><p>${htmlWithSraLinks(block.text)}</p></article>`)
        .join("");

  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: page.heading }])}
        <h1>${esc(page.heading)}</h1>
        ${page.intro && isPublicText(page.intro) ? `<p class="lead muted">${htmlWithSraLinks(page.intro)}</p>` : ""}
      </div>
      <div class="wrap legal-doc">
        ${loc().id !== "en" ? `<p class="legal-note muted">${esc(t("translationNote"))}</p>` : ""}
        ${extra}
      </div>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: page.heading }, body);
}

function notFoundPage() {
  const page = {
    path: "/404.html",
    title: t("pageNotFound"),
    description: t("pageNotFoundDesc"),
    heading: t("pageNotFoundHeading"),
  };
  const body = `
    <main id="content">
      <div class="wrap page-head">
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(t("pageNotFoundLead"))}</p>
        <a class="btn btn-signal" href="/">${esc(t("home"))}</a>
      </div>
    </main>
  `;
  return documentPage(page, body);
}

export function allPages() {
  return [
    { file: "index.html", html: homePage() },
    { file: "expertise/index.html", html: expertiseIndex() },
    { file: "expertise/private-prosecutions/index.html", html: servicePage("privateProsecutions", "private-prosecutions") },
    {
      file: "expertise/asset-tracing-recovery/index.html",
      html: servicePage("assetTracing", "asset-tracing"),
    },
    {
      file: "expertise/crypto-fraud-digital-assets/index.html",
      html: servicePage("cryptoFraud", "crypto-fraud"),
    },
    {
      file: "expertise/regulatory-defence-investigations/index.html",
      html: servicePage("regulatory", "regulatory"),
    },
    {
      file: "expertise/cross-border-fraud-corruption/index.html",
      html: servicePage("crossBorder", "cross-border"),
    },
    {
      file: "expertise/corporate-intelligence/index.html",
      html: servicePage("corporateIntelligence", "corporate-intelligence"),
    },
    { file: "investigations/index.html", html: investigationIndex() },
    ...site.investigations.map((item) => ({
      file: `${item.href.replace(/^\//, "")}index.html`,
      html: investigationPage(item),
    })),
    { file: "insights/index.html", html: insightsIndex() },
    ...site.insights.map((item) => ({
      file: `insights/${item.slug}/index.html`,
      html: insightPage(item),
    })),
    { file: "people/index.html", html: peoplePage() },
    { file: "people/agreement/index.html", html: agreementPage() },
    { file: "people/victim-claim/index.html", html: claimPage() },
    { file: "people/release-order/index.html", html: releasePage() },
    { file: "admin/index.html", html: adminPage(), unlisted: true, englishOnly: true },
    ...site.people.map((person) => ({
      file: `people/${person.slug}/index.html`,
      html: personPage(person),
    })),
    { file: "join-us/index.html", html: joinUsPage() },
    { file: "about/index.html", html: aboutPage() },
    { file: "contact/index.html", html: contactPage() },
    { file: "legal-regulatory/index.html", html: legalPage("legal") },
    { file: "regulatory-information/index.html", html: legalPage("regulatoryInformation") },
    { file: "how-we-work/index.html", html: legalPage("howWeWork") },
    { file: "terms-of-business/index.html", html: legalPage("terms") },
    { file: "complaints/index.html", html: legalPage("complaints") },
    { file: "pricing/index.html", html: legalPage("pricing") },
    { file: "privacy/index.html", html: legalPage("privacy") },
    { file: "cookies/index.html", html: legalPage("cookies") },
    { file: "accessibility/index.html", html: legalPage("accessibility") },
    { file: "fraud-warning/index.html", html: legalPage("fraud") },
    { file: "404.html", html: notFoundPage() },
  ];
}
