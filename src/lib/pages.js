import { site } from "../../site.config.js";
import { home, pages, insightBodies } from "../content/copy.js";
import { serviceMatter } from "../content/service-matter.js";
import {
  media,
  practiceMedia,
} from "../content/media.js";
import { crumbs, documentPage, insightIcon, practiceIcon, signalGraphic } from "./layout.js";
import { esc } from "./html.js";
import { trust } from "../config/trust.js";
import {
  complaintsHtml,
  contactDetailsHtml,
  filterPublicFaqs,
  htmlWithSraLinks,
  isPublicText,
  pricingHtml,
  privacyHtml,
  regulatoryHtml,
  reviewFoot,
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

function peopleCards(list = site.people, variant = "") {
  if (!list.length) return "";
  const compact = variant === "compact";
  return `<div class="people-grid${compact ? " people-grid-collective" : ""}">
    ${list
      .map(
        (person) => `<a class="person-card${compact ? " person-card-compact" : ""}${
          person.principal ? " person-card-lead" : ""
        }" href="${personHref(person)}">
          ${personPortrait(person)}
          <span class="person-card-copy">
            <h2>${esc(person.name)}</h2>
            <p class="muted">${esc(person.role)}</p>
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
  return `
    <div class="owner-row">
      ${collectiveShot()}
      <div class="owner-row-copy">
        ${
          showIntro
            ? `<p class="label">${esc(profile.label)}</p>
            <h2>${esc(profile.heading)}</h2>
            <p class="lead profile-lead">${htmlWithSraLinks(profile.text)}</p>`
            : `<p class="label">${esc(lead.role)}</p>
            <h2>${esc(lead.name)}</h2>
            <p class="lead profile-lead">${esc(lead.summary)}</p>`
        }
      </div>
    </div>
    ${peopleCards(
      options.all
        ? site.people.filter((person) => !person.principal)
        : site.people.filter((person) => !person.principal).slice(0, 14),
      "compact",
    )}
  `;
}

function insightEntry(item, extra = "") {
  return `<a href="/insights/${item.slug}/">
    <span class="service-mark" aria-hidden="true">${insightIcon(item.slug)}</span>
    <span>
      <p class="label">${esc(item.type)} / ${esc(item.dateLabel)}</p>
      <h2>${esc(item.title)}</h2>
      ${extra}
    </span>
  </a>`;
}

function wrap(inner, band = "") {
  return `<div class="section ${band}"><div class="wrap">${inner}</div></div>`;
}

function titledStack(items) {
  return `<div class="item-stack">
    ${items
      .map(
        (item) => `<article>
          <h3>${esc(item.title)}</h3>
          <p class="muted">${esc(item.text)}</p>
        </article>`,
      )
      .join("")}
  </div>`;
}

function bulletList(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function matterProse(key) {
  const extra = serviceMatter[key];
  if (!extra) return "";
  return `
    <h2>Who this is for</h2>
    ${bulletList(extra.forWhom)}
    <h2>Who this is not for</h2>
    ${bulletList(extra.notFor)}
    <h2>${esc(extra.law.heading)}</h2>
    <p>${esc(extra.law.text)}</p>
    <h2>How the work usually runs</h2>
    <ol>
      ${extra.process
        .filter(
          (step) =>
            isPublicText(step.title) && isPublicText(step.text) && isPublicText(step.timescale),
        )
        .map(
          (step) =>
            `<li><strong>${esc(step.title)}</strong> (${esc(step.timescale)}). ${esc(step.text)}</li>`,
        )
        .join("")}
    </ol>
    <h2>What it costs</h2>
    <p>${esc(extra.costs)}</p>
    <h2>What can go wrong</h2>
    ${bulletList(extra.risks)}
    <h2>Who handles your matter</h2>
    <p>${htmlWithSraLinks(extra.handler)}</p>
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
          <p>${esc(cobra.text)}</p>
          ${titledStack(cobra.items)}
          <p class="tool-source muted">${esc(cobra.sourceNote)} <a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(cobra.sourceLabel)}</a>.</p>
          <p><a class="btn btn-ghost" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(cobra.cta)}</a></p>
        </div>
      </section>`;
}

function figure(item, className = "media-figure") {
  if (!item) return "";
  return `<figure class="${className}">
    <img src="${esc(item.src)}" width="${item.width}" height="${item.height}" alt="${esc(item.alt)}" decoding="async" loading="lazy">
  </figure>`;
}

function roomPhoto() {
  return figure(media.meetingRoom, "media-figure room-photo");
}

function photoStrip(items, label) {
  return `<section class="photo-strip-band" aria-label="${esc(label)}">
    <div class="wrap photo-strip">
      ${items.map((item) => figure(item, "media-figure")).join("")}
    </div>
  </section>`;
}

function cta(link) {
  return `<a class="btn btn-signal" href="${link.href}">${esc(link.label)}</a>`;
}

function homePage() {
  const featured = site.insights[0];
  const who = home.sections.who;
  const why = home.sections.why;
  const cases = home.sections.cases;
  const standing = home.sections.standing;
  const london = home.sections.london;
  const body = `
    <main id="content">
      <section class="section band-paper">
        <div class="wrap hero">
          <div class="hero-copy">
            <p class="label">${esc(home.sections.hero.descriptor)}</p>
            <h1 class="display">${esc(home.sections.hero.heading)}</h1>
            <p class="lead">${esc(home.sections.hero.lead)}</p>
            <div class="hero-actions">
              ${cta(home.sections.hero.cta)}
              <a class="btn btn-ghost" href="${home.sections.hero.ctaSecondary.href}">${esc(
                home.sections.hero.ctaSecondary.label,
              )}</a>
            </div>
          </div>
          ${signalGraphic()}
        </div>
      </section>

      <section class="section band-paper" id="people">
        <div class="wrap people-home">
          ${peopleCollective()}
          <div class="people-home-foot">
            <a class="btn btn-ghost" href="${home.sections.profile.cta.href}">${esc(home.sections.profile.cta.label)}</a>
          </div>
        </div>
      </section>

      <section class="practice-bar" aria-label="Practice areas">
        <div class="wrap practice-bar-inner">
          <div class="practice-bar-list">
            ${site.practices
              .map(
                (item) => `<a class="practice-item" href="${item.href}">
                  <h2>${esc(item.title)}</h2>
                  <p>${esc(item.summary)}</p>
                </a>`,
              )
              .join("")}
          </div>
          <a class="btn btn-ghost" href="${home.sections.practiceBar.cta.href}">${esc(
            home.sections.practiceBar.cta.label,
          )}</a>
        </div>
      </section>

      <section class="section">
        <div class="wrap split-visual who-visual">
          ${figure(media.fileCorridor, "media-figure")}
          <div class="who-copy">
            <p class="label">${esc(who.label)}</p>
            <h2>${esc(who.heading)}</h2>
            <p class="lead muted method-lead">${htmlWithSraLinks(who.lead)}</p>
            <p class="muted">${esc(who.text)}</p>
            <p class="label audience-label">${esc(who.actForLabel)}</p>
            <ul class="audience-list">
              ${who.actFor.map((item) => `<li>${esc(item)}</li>`).join("")}
            </ul>
            <p class="label audience-label">${esc(who.actNotForLabel)}</p>
            <ul class="audience-list">
              ${who.actNotFor.map((item) => `<li>${esc(item)}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>

      <section class="section band-paper">
        <div class="wrap">
          <p class="label">${esc(why.label)}</p>
          <h2>${esc(why.heading)}</h2>
          ${titledStack(why.items)}
        </div>
      </section>

      ${cobraSection()}

      ${photoStrip(
        [media.archiveBoxes, media.deskFiles, media.meetingRoom],
        "The rooms in which the work is done",
      )}

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

      <section class="section band-ink">
        <div class="wrap">
          <p class="label">${esc(standing.label)}</p>
          <h2>${esc(standing.heading)}</h2>
          <ul class="recognition-list">
            ${standing.items.map((item) => `<li>${htmlWithSraLinks(item)}</li>`).join("")}
          </ul>
          <p class="standing-note">${esc(standing.note)}</p>
          <p><a class="btn btn-ghost" href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">${esc(standing.link)}</a></p>
        </div>
      </section>

      <section class="section band-paper">
        <div class="wrap">
          <p class="label">${esc(home.sections.insight.label)}</p>
          <h2>${esc(home.sections.insight.heading)}</h2>
          <div class="service-index service-visual-index">
            ${insightEntry(featured, `<p class="muted">${esc(featured.description)}</p>`)}
          </div>
        </div>
      </section>

      <section class="section band-ink london-band">
        <div class="wrap split-visual">
          ${figure(media.londonStreet, "media-figure")}
          <div class="london-copy">
            <h2>${esc(london.heading)}</h2>
            <p class="lead muted london-lead">${esc(london.text)}</p>
            <p class="mono">${esc(london.meta)}</p>
            <a class="btn btn-ghost" href="${london.cta.href}">${esc(london.cta.label)}</a>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap split-visual cta-visual">
          ${figure(media.evidenceTable, "media-figure")}
          <div class="cta-band reading">
            <h2>${esc(home.sections.cta.heading)}</h2>
            <p class="lead muted">${esc(home.sections.cta.text)}</p>
            <a class="btn btn-ink" href="${home.sections.cta.cta.href}">${esc(home.sections.cta.cta.label)}</a>
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
      </div>
      <div class="wrap service-index service-visual-index">
        ${site.practices
          .map(
            (item) => `<a href="${item.href}">
              <span class="service-mark" aria-hidden="true">${practiceIcon(item.id)}</span>
              <span>
                <p class="label">${item.index}</p>
                <h2>${esc(item.title)}</h2>
                <p class="muted">${esc(item.summary)}</p>
              </span>
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
          <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
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
              <div class="service-index service-visual-index">
              ${related
                .map((item) => insightEntry(item))
                .join("")}
              </div>
            </div>
          `)
          : ""
      }
      ${wrap(`
        <div class="cta-band">
          <h2>Discuss this matter</h2>
          <p class="muted">Write with the facts you already have. Do not send passwords, seed phrases or original identity documents.</p>
          <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
        </div>
      `)}
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
  const investigators = site.people.filter((person) =>
    /investigator|forensic|tracing/i.test(person.role),
  );
  const notes = site.insights.filter((item) => item.type === "Investigation note");
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "Investigations" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        <nav class="page-jump" aria-label="On this page">
          ${page.jump.map((item) => `<a href="${item.href}">${esc(item.label)}</a>`).join("")}
        </nav>
        <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
      </div>
      <div class="wrap join-intro">
        ${page.intro.map((para) => `<p>${esc(para)}</p>`).join("")}
      </div>
      ${cobraSection("band-paper")}
      <section class="practice-bar" id="work" aria-label="Investigation types">
        <div class="wrap practice-bar-inner">
          <div class="practice-bar-head">
            <p class="label">What we investigate</p>
            <h2>Five lines of enquiry.</h2>
          </div>
          <div class="practice-bar-list">
            ${site.investigations
              .map(
                (item) => `<a class="practice-item" href="${item.href}">
                  <h2>${esc(item.title)}</h2>
                  <p>${esc(item.summary)}</p>
                </a>`,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="section" id="investigators">
        <div class="wrap">
          <p class="label">${esc(page.people.label)}</p>
          <h2>${esc(page.people.heading)}</h2>
          <p class="lead profile-lead">${esc(page.people.text)}</p>
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
          <div class="service-index service-visual-index">
          ${notes
            .map((item) => insightEntry(item, `<p class="muted">${esc(item.description)}</p>`))
            .join("")}
          </div>
        </div>
      </section>`
          : ""
      }
      <section class="section" id="instruct">
        <div class="wrap cta-band">
          <h2>${esc(page.cta.heading)}</h2>
          <p class="lead muted">${esc(page.cta.text)}</p>
          <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
        </div>
      </section>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: "Investigations" }, body);
}

function investigationPage(item) {
  const page = pages[item.copyKey];
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
        <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
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
                    ${figure(practiceMedia(practice.id), "media-figure insight-photo")}
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
              <div class="service-index service-visual-index">
              ${related.map((note) => insightEntry(note)).join("")}
              </div>
            </div>
          `)
          : ""
      }
      ${wrap(`
        <div class="cta-band">
          <h2>Discuss this investigation</h2>
          <p class="muted">Write with the facts you already have. Do not send passwords, seed phrases or original identity documents.</p>
          <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
        </div>
      `)}
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
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "Insights" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
      </div>
      <div class="wrap service-index service-visual-index">
        ${site.insights
          .map((item) => insightEntry(item, `<p class="muted">${esc(item.description)}</p>`))
          .join("")}
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
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "People" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${htmlWithSraLinks(page.lead)}</p>
      </div>
      <div class="wrap people-index">
        ${peopleCollective({ intro: false, all: true })}
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
        <nav class="page-jump" aria-label="On this page">
          ${page.jump.map((item) => `<a href="${item.href}">${esc(item.label)}</a>`).join("")}
        </nav>
      </div>
      <div class="wrap join-intro">
        ${page.intro.map((para) => `<p>${esc(para)}</p>`).join("")}
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
      <section class="section" id="people">
        <div class="wrap">
          <div class="join-people-head">
            <div>
              <p class="label">${esc(page.people.label)}</p>
              <h2>${esc(page.people.heading)}</h2>
              <p class="lead profile-lead">${esc(page.people.text)}</p>
            </div>
            <a class="btn btn-ghost" href="/people/">All profiles</a>
          </div>
          ${peopleCards(site.people, "compact")}
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
          <p class="muted">${htmlWithSraLinks(trust.firm.regulatorCheckText)}</p>
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
          <p><a class="btn btn-signal" href="/contact/">Discuss a matter</a></p>
        </div>
      </div>
    </main>
  `;
  return documentPage(page, body);
}

function aboutPage() {
  const page = pages.about;
  const story = page.lifecycle;
  const record = page.record;
  const clients = page.clients;
  const commitments = page.commitments;
  const namedOnFile = String(site.people.filter((person) => !person.principal).length);
  const facts = [
    ...record.items,
    { value: namedOnFile, label: "People on the file in these pages, besides the owner" },
  ];
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "About" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
      </div>
      <section class="section-tight">
        <div class="wrap">
          <p class="label">${esc(story.label)}</p>
          <h2>${esc(story.heading)}</h2>
          <div class="stage-grid">
            ${story.items
              .map(
                (item) => `<article class="stage-card">
                  <p class="label">${esc(item.index)}</p>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="wrap">
          <p class="label">${esc(clients.label)}</p>
          <h2>${esc(clients.heading)}</h2>
          <p class="lead muted method-lead">${esc(clients.note)}</p>
          <ul class="audience-list">
            ${clients.items.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
        </div>
      </section>
      <section class="section band-ink">
        <div class="wrap">
          <p class="label">${esc(record.label)}</p>
          <h2>${esc(record.heading)}</h2>
          <p class="lead muted">${esc(record.note)}</p>
          <div class="facts-strip">
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
      </section>
      <section class="section">
        <div class="wrap">
          <p class="label">${esc(commitments.label)}</p>
          <h2>${esc(commitments.heading)}</h2>
          ${titledStack(commitments.items)}
        </div>
      </section>
      ${reviewFoot(page)}
    </main>
  `;
  return documentPage({ ...page, crumb: "About" }, body);
}

function contactPage() {
  const page = pages.contact;
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "Contact" }])}
        <h1>${esc(page.heading)}</h1>
        <p class="lead muted">${esc(page.lead)}</p>
        <p class="muted">${esc(page.urgent)}</p>
        ${contactDetailsHtml()}
      </div>
      <div class="wrap split-visual contact-visual">
        <form class="form" id="contact-form" novalidate data-mailto="${esc(site.email)}" data-ack="${esc(trust.contact.acknowledgementTime)}">
          <div class="field">
            <label for="full-name">Full name</label>
            <input id="full-name" name="name" type="text" autocomplete="name" required>
            <p class="error" data-error-for="name">Enter your name.</p>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" required>
            <p class="error" data-error-for="email">Enter a valid email address.</p>
          </div>
          <div class="field">
            <label for="organisation">Organisation (optional)</label>
            <input id="organisation" name="organisation" type="text" autocomplete="organization">
          </div>
          <div class="field">
            <label for="matter">Matter type</label>
            <select id="matter" name="matter" required>
              <option value="">Select one</option>
              ${site.practices.map((item) => `<option>${esc(item.title)}</option>`).join("")}
              <option>Something else</option>
            </select>
            <p class="error" data-error-for="matter">Choose a matter type.</p>
          </div>
          <div class="field">
            <label for="message">How we can help</label>
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
          <button class="btn btn-signal" type="submit">Discuss a matter</button>
          <p class="form-status" data-form-status></p>
          <p class="small muted">${
            site.email
              ? `This preview does not send data to a server. It opens a draft to ${esc(site.email)} on this device.`
              : esc(trust.contact.acknowledgementTime)
          }</p>
        </form>
        ${roomPhoto()}
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
  const extra = TRUST_PAGE_HTML[page.trustPage]
    ? TRUST_PAGE_HTML[page.trustPage]()
    : (page.blocks || [])
        .filter((block) => isPublicText(block.text))
        .map((block) => `<h2>${esc(block.heading)}</h2><p>${htmlWithSraLinks(block.text)}</p>`)
        .join("");

  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: page.heading }])}
        <h1>${esc(page.heading)}</h1>
        ${page.intro && isPublicText(page.intro) ? `<p class="lead muted">${htmlWithSraLinks(page.intro)}</p>` : ""}
      </div>
      <div class="wrap prose" style="padding-bottom:6rem">
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
