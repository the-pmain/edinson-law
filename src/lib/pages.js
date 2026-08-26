import { site } from "../../site.config.js";
import { home, pages, insightBodies } from "../content/copy.js";
import { serviceMatter } from "../content/service-matter.js";
import { crumbs, documentPage, fieldMark, insightIcon, practiceIcon, whyIcon } from "./layout.js";
import { esc } from "./html.js";
import { trust } from "../config/trust.js";
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
  const label = `${person.name}, portrait to follow`;
  return `<div class="portrait-slot ${className}" role="img" aria-label="${esc(label)}">
    <span class="portrait-slot-ring" aria-hidden="true"></span>
    <span class="portrait-slot-initials">${esc(person.initials)}</span>
    <span class="portrait-slot-mark">Portrait to follow</span>
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
  const role = (person.role || "").toLowerCase();
  const tags = [];
  if (/owner/.test(role)) tags.push("Practice");
  if (/regulatory|hmrc|tax/.test(role)) tags.push("Regulatory");
  if (/cross-border|corruption/.test(role)) tags.push("Cross-border");
  if (/crypto|digital asset/.test(role)) tags.push("Crypto & digital");
  if (/forensic accountant/.test(role)) tags.push("Forensic accounting");
  if (/investigator|investigation|digital forensics|intelligence/.test(role)) {
    tags.push("Investigations");
  }
  if (/asset|recovery|confiscation|tracing|payments/.test(role)) tags.push("Asset tracing");
  if (/solicitor|lawyer|prosecution|restraint|disclosure|freezing/.test(role)) {
    tags.push("Private prosecutions");
  }
  return [...new Set(tags)];
}

function personGroup(person) {
  const role = (person.role || "").toLowerCase();
  if (person.principal) return "practice";
  if (/solicitor|lawyer/.test(role)) return "legal";
  if (/investigator|forensic accountant|digital forensics|internal investigation|intelligence/.test(role)) {
    return "investigations";
  }
  return "recovery";
}

function personStatus(person) {
  if (person.principal) return "Owner · sole practice";
  const role = person.role || "";
  if (/Solicitor/i.test(role)) return "Solicitor";
  if (/Lawyer/i.test(role)) return "Lawyer";
  if (/Investigator/i.test(role)) return "Investigator";
  return "Specialist";
}

function personChips(person) {
  const status = personStatus(person);
  const roleChip = person.principal ? "Owner" : status;
  const second = person.principal ? "Sole practice" : personExpertise(person)[0];
  return `<span class="chip-row">
    <span class="chip">${esc(roleChip)}</span>
    ${second ? `<span class="chip chip-status">${esc(second)}</span>` : ""}
  </span>`;
}

function peopleCards(list = site.people, variant = "") {
  if (!list.length) return "";
  const compact = variant === "compact";
  return `<div class="people-grid${compact ? " people-grid-collective" : ""}">
    ${list
      .map(
        (person) => `<a class="person-card${compact ? " person-card-compact" : ""}" href="${personHref(person)}" data-expertise="${esc(personExpertise(person).join("|"))}">
          ${personPortrait(person)}
          <span class="person-card-copy">
            <h2>${esc(person.name)}</h2>
            ${personChips(person)}
            <p class="muted">${esc(person.summary || person.role)}</p>
          </span>
        </a>`,
      )
      .join("")}
  </div>`;
}

function principalPerson() {
  return site.people.find((person) => person.principal) || site.people[0];
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
      ? `<a class="owner-row owner-row-link" href="${personHref(lead)}" data-expertise="${esc(personExpertise(lead).join("|"))}">
      ${shot}
      <div class="owner-row-copy">${copy}</div>
    </a>`
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
  return `${minutes} min read`;
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
        <span class="service-more">Learn more</span>
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
      `<p class="muted">Telephone: <a href="tel:${esc(c.phone.replace(/\s+/g, ""))}">${esc(c.phone)}</a></p>`,
    );
  }
  return lines.join("");
}

function pageJump(items) {
  if (!items?.length) return "";
  return `<nav class="page-jump" aria-label="On this page">
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

function actionButton(page, fallbackLabel = "Discuss a matter") {
  const label = page?.cta?.label || fallbackLabel;
  const href = page?.cta?.href || "/contact/";
  return `<a class="btn btn-signal" href="${esc(href)}">${esc(label)}</a>`;
}

function enquiryBand(page, fallbackHeading = "Discuss this matter") {
  const heading = page?.ctaBand?.heading || fallbackHeading;
  const text =
    page?.ctaBand?.text ||
    "Give us a concise account of the matter. Do not send passwords, private keys, seed phrases or original identity documents.";
  return `<div class="cta-band">
          <h2>${esc(heading)}</h2>
          <p class="muted">${esc(text)}</p>
          ${actionButton(page)}
        </div>`;
}

function matterProse(key) {
  const extra = serviceMatter[key];
  if (!extra) return "";
  const whenHeading = extra.whenHeading || "When this work may be appropriate";
  const altHeading = extra.alternativeHeading || "When another route may be better";
  const processHeading = extra.processHeading || "How the work usually runs";
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
      const text = esc(item.text)
        .replace("See the fraud warning.", 'See the <a href="/fraud-warning/">fraud warning</a>.')
        .replace("See Pricing.", 'See <a href="/pricing/">Pricing</a>.');
      return `<h2>${esc(item.heading)}</h2><p>${text}</p>`;
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
        ? `<h2>Principal risks</h2>
    ${bulletList(extra.risks)}`
        : ""
    }
    <h2>Fees</h2>
    <p>We agree the scope and charging basis before substantive work begins. Most matters are charged by reference to time; a fixed fee may be available for a clearly defined preliminary review. Full rates and terms are on the <a href="/pricing/">Pricing</a> page.</p>
    <h2>Who is responsible</h2>
    <p>Each matter is supervised by a named solicitor. Specialist investigators and forensic professionals are introduced where their expertise is needed, with their role and status explained. Job titles on this site are not a reserved-activity authorisation. Confirm current authorised individuals on the <a href="/regulatory-information/">Regulatory information</a> page and the ${sraRegisterAnchor("public SRA record")}.</p>
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
    <span class="practice-more">Learn more</span>
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

      <section class="practice-bar" aria-label="Practice areas">
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
  return documentPage({ ...home, heading: "Home" }, body);
}

function expertiseIndex() {
  const page = pages.expertise;
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "Expertise" }])}
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
              <span class="service-more">Learn more</span>
            </a>`,
          )
          .join("")}
      </div>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: "Expertise" }, body);
}

function servicePage(key, practiceId) {
  const page = pages[key];
  const related = site.insights.filter((item) => item.related.includes(practiceId));
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([
          { label: "Expertise", href: "/expertise/" },
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
        <h2>Questions we are asked</h2>
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
              <p class="label">Related insights</p>
              <div class="insight-list">
              ${related
                .map((item) => insightEntry(item))
                .join("")}
              </div>
            </div>
          `)
          : ""
      }
      ${wrap(enquiryBand(page, "Discuss this matter"))}
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
  const notes = site.insights.filter((item) => item.type === "Investigation note");
  const body = `
    <main id="content">
      <section class="section band-paper hero-band">
        <div class="wrap split-visual page-open">
          <div class="page-open-copy">
            ${crumbs([{ label: "Investigations" }])}
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
      <section class="practice-bar" id="work" aria-label="Investigation types">
        <div class="wrap practice-bar-inner">
          <div class="practice-bar-head">
            <p class="label">What we investigate</p>
            <h2>Five categories of investigation.</h2>
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
          <p><a class="btn btn-ghost" href="/people/">All profiles</a></p>
        </div>
      </section>
      ${
        notes.length
          ? `<section class="section band-paper">
        <div class="wrap">
          <p class="label">Investigation notes</p>
          <h2>Method, written down.</h2>
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
          ${enquiryBand(page, "Speak to the investigations practice")}
        </div>
      </section>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: "Investigations" }, body);
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
          { label: "Investigations", href: "/investigations/" },
          { label: page.heading },
        ])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        ${actionButton(page, "Speak to the investigations practice")}
      </div>
      ${wrap(`
        <div class="prose">
          ${matterProse(item.copyKey)}
        </div>
      `)}
      ${
        matterFaqs(page, item.copyKey).length
          ? wrap(`
        <h2>Questions we are asked</h2>
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
              <p class="label">Legal routes this work supports</p>
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
              <p class="label">Related insights</p>
              <div class="insight-list">
              ${related.map((note) => insightEntry(note)).join("")}
              </div>
            </div>
          `)
          : ""
      }
      ${wrap(enquiryBand(page, "Speak to the investigations practice"))}
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
        ${crumbs([{ label: "Insights" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        <div class="insight-tools">
          <label class="insight-search">
            <span class="label">Search</span>
            <input type="search" data-insight-search placeholder="Search notes" autocomplete="off">
          </label>
          <div class="chip-row chip-filters" data-insight-filters>
            <button type="button" class="chip chip-filter" data-filter="all" aria-pressed="true">All</button>
            ${types.map((type) => `<button type="button" class="chip chip-filter" data-filter="${esc(type)}">${esc(type)}</button>`).join("")}
            ${topics.map((topic) => `<button type="button" class="chip chip-filter" data-filter="${esc(topic)}">${esc(topic)}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="wrap insight-list">
        ${site.insights
          .map((item, index) => insightEntry(item, index === 0))
          .join("")}
        <p class="insight-empty muted" data-insight-empty hidden>No notes match that filter.</p>
      </div>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: "Insights" }, body);
}

function insightPage(item) {
  const blocks = insightBodies[item.slug];
  const page = {
    path: `/insights/${item.slug}/`,
    title: `${item.title} | Edison Law`,
    description: item.description,
    heading: item.title,
    article: item,
    breadcrumbs: [{ label: "Insights", href: "/insights/" }],
    crumb: item.title,
  };
  const body = `
    <main id="content">
      <article class="wrap page-head">
        ${crumbs([
          { label: "Insights", href: "/insights/" },
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
          <p class="mono">Disclaimer</p>
          <p>This note is general information about method. It is not advice on a specific matter and it does not describe a client result.</p>
        </div>
        <p><a href="/contact/">Discuss a related matter</a></p>
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
      heading: "Legal strategy & proceedings",
      text: "Solicitors working across fraud, private prosecutions, interim relief, disclosure and related financial-crime proceedings.",
    },
    {
      id: "investigations",
      heading: "Investigations & evidence",
      text: "Investigators and forensic specialists who preserve, test and organise the factual record.",
    },
    {
      id: "recovery",
      heading: "Asset recovery & digital assets",
      text: "Specialists focused on payment trails, asset ownership, proceeds of crime and digital-asset movement.",
    },
  ];
  const body = `
    <main id="content">
      <div class="wrap page-head page-head-tight">
        ${crumbs([{ label: "People" }])}
        <div class="chip-row chip-filters" data-people-filters>
          <button type="button" class="chip chip-filter" data-filter="all" aria-pressed="true">All</button>
          ${filters.map((item) => `<button type="button" class="chip chip-filter" data-filter="${esc(item)}">${esc(item)}</button>`).join("")}
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
  return documentPage({ ...page, crumb: "People" }, body);
}

function joinUsPage() {
  const page = pages.joinUs;
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "Join us" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        ${pageJump(page.jump)}
        <div class="page-head-intro join-intro">
          ${page.intro.map((para) => `<p>${esc(para)}</p>`).join("")}
          <p><a class="btn btn-signal" href="${esc(page.cvCta.href)}">${esc(page.cvCta.label)}</a></p>
          <p><a href="/people/">People at Edison Law</a></p>
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
  return documentPage({ ...page, crumb: "Join us" }, body);
}

function personPage(person) {
  const isSolicitor = /Solicitor/i.test(person.role || "");
  const profileStatusDetail = isSolicitor
    ? "Solicitor in an SRA-regulated legal practice"
    : "Legal work supervised by a named solicitor";
  const profileRoleNote = isSolicitor
    ? `This profile describes representative areas of work. Current practising status can be checked on the ${sraRegisterAnchor("public SRA record")}.`
    : `This profile describes the person's role and representative areas of work. A job title is not a reserved-activity authorisation. Confirm authorised individuals on the <a href="/regulatory-information/">Regulatory information</a> page and the ${sraRegisterAnchor("public SRA record")}.`;
  const page = {
    path: personHref(person),
    title: `${person.name} | Edison Law`,
    description: person.summary,
    heading: person.name,
    person,
    breadcrumbs: [{ label: "People", href: "/people/" }],
    crumb: person.name,
  };
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([
          { label: "People", href: "/people/" },
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
          <p class="profile-status">
            <span>${esc(personStatus(person))}</span>
            <span>London</span>
            <span>${esc(profileStatusDetail)}</span>
          </p>
          <p class="muted profile-role-note">${profileRoleNote}</p>
          <h2>Role and focus</h2>
          ${person.bio.map((para) => `<p>${htmlWithSraLinks(para)}</p>`).join("")}
          ${
            person.quotes?.length
              ? person.quotes.map((item) => `<blockquote>${esc(item)}</blockquote>`).join("")
              : ""
          }
          ${person.closing ? `<p>${htmlWithSraLinks(person.closing)}</p>` : ""}
          ${
            person.areas?.length
              ? `<h2>Key areas of work</h2>
            <ul>${person.areas.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
              : ""
          }
          ${
            person.experience?.length
              ? `<h2>Work of this kind</h2>
            <p class="muted">These items describe the kinds of file this person works on. They are not published client results.</p>
            <ul>${person.experience.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
              : ""
          }
          <p><a class="btn btn-signal" href="/contact/">Send an initial enquiry</a></p>
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
        ${crumbs([{ label: "About" }])}
        <div class="about-open-copy">
          <h1>About</h1>
          <p class="lead">${esc(page.heading)}</p>
          <p class="trust-strip">
            <a class="mono" href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">SRA ${esc(site.sraNumber)}</a>
            <span>London</span>
            <span>Each matter is supervised by a named solicitor</span>
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
  return documentPage({ ...page, crumb: "About" }, body);
}

function contactPage() {
  const page = pages.contact;
  const body = `
    <main id="content">
      <div class="wrap contact-page">
        ${crumbs([{ label: "Contact" }])}
        <div class="contact-layout">
          <div class="contact-copy">
            <h1>${esc(page.heading)}</h1>
            <p class="lead muted">${esc(page.lead)}</p>
            <aside class="safety-callout">
              <p class="label">Safety</p>
              <p>${esc(page.urgent)}</p>
            </aside>
            <div class="contact-direct">
              <p class="label">Write or call</p>
              ${contactDirectHtml()}
            </div>
          </div>
          <form class="form" id="contact-form" novalidate data-mailto="${esc(site.email)}" data-ack="${esc(trust.contact.acknowledgementTime)}">
          <p class="form-eta muted">${esc(trust.contact.acknowledgementTime)}</p>
          <div class="field">
            <label for="full-name">Full name <span class="req">required</span></label>
            <input id="full-name" name="name" type="text" autocomplete="name" required>
            <p class="error" data-error-for="name">Enter your name.</p>
          </div>
          <div class="field">
            <label for="email">Email <span class="req">required</span></label>
            <input id="email" name="email" type="email" autocomplete="email" required>
            <p class="error" data-error-for="email">Enter a valid email address.</p>
          </div>
          <div class="field">
            <label for="organisation">Organisation (optional)</label>
            <input id="organisation" name="organisation" type="text" autocomplete="organization">
          </div>
          <div class="field">
            <label for="matter">Matter type <span class="req">required</span></label>
            <select id="matter" name="matter" required>
              <option value="">Select one</option>
              ${site.practices.map((item) => `<option>${esc(item.title)}</option>`).join("")}
              <option>Something else</option>
            </select>
            <p class="error" data-error-for="matter">Choose a matter type.</p>
          </div>
          <div class="field">
            <label for="message">How we can help <span class="req">required</span></label>
            <textarea id="message" name="message" required></textarea>
            <p class="error" data-error-for="message">Describe the situation in a few sentences.</p>
          </div>
          <div class="field">
            <label class="checkbox" for="privacy">
              <input id="privacy" name="privacy" type="checkbox" required>
              <span>I understand this message is not a retainer and I have read the <a href="/privacy/">privacy notice</a>.</span>
            </label>
            <p class="error" data-error-for="privacy">Confirm you have read the privacy notice.</p>
          </div>
          <button class="btn btn-signal form-submit" type="submit">${esc(page.formButton || "Send an initial enquiry")}</button>
          <p class="form-status" data-form-status></p>
          <p class="small muted">${
            site.email
              ? `This preview does not send data to a server. It opens a draft to ${esc(site.email)} on this device.`
              : esc(trust.contact.acknowledgementTime)
          }</p>
        </form>
        </div>
      </div>
    </main>
  `;
  return documentPage({ ...page, crumb: "Contact" }, body);
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
        <p><a class="btn btn-signal" href="${esc(page.movedTo)}">Regulatory information</a></p>
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
    title: "Page not found | Edison Law",
    description: "The requested page is not on the Edison Law website.",
    heading: "That page is not here.",
  };
  const body = `
    <main id="content">
      <div class="wrap page-head">
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">The address may have changed. Use search or return to the homepage.</p>
        <a class="btn btn-signal" href="/">Home</a>
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
