import { site } from "../../site.config.js";
import { home, pages, insightBodies } from "../content/copy.js";
import {
  insightMedia,
  investigationMedia,
  media,
  practiceMedia,
} from "../content/media.js";
import { crumbs, documentPage, signalGraphic } from "./layout.js";
import { esc } from "./html.js";

function personHref(person) {
  return `/people/${person.slug}/`;
}

function personPortrait(person, className = "person-photo") {
  if (person.photo) {
    const w = person.photoWidth || 640;
    const h = person.photoHeight || 640;
    return `<img class="${className}" src="${esc(person.photo)}" width="${w}" height="${h}" alt="${esc(person.name)}" decoding="async">`;
  }
  return `<div class="profile-initials" aria-hidden="true">${esc(person.initials)}</div>`;
}

function peopleCards(list = site.people) {
  if (!list.length) return "";
  return `<div class="people-grid">
    ${list
      .map(
        (person) => `<a class="person-card" href="${personHref(person)}">
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

function wrap(inner, band = "") {
  return `<div class="section ${band}"><div class="wrap">${inner}</div></div>`;
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
  const recognition = home.sections.recognition;
  const london = home.sections.london;
  const body = `
    <main id="content">
      <section class="band-paper">
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

      <section class="practice-bar" aria-label="Practice areas">
        <div class="wrap practice-bar-inner">
          <div class="practice-bar-list">
            ${site.practices
              .map(
                (item) => `<a class="practice-item" href="${item.href}">
                  ${figure(practiceMedia(item.id), "media-figure practice-photo")}
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
            <p class="lead muted method-lead">${esc(who.lead)}</p>
            <p class="muted">${esc(who.text)}</p>
            <p class="label audience-label">${esc(who.actForLabel)}</p>
            <ul class="audience-list">
              ${who.actFor.map((item) => `<li>${esc(item)}</li>`).join("")}
            </ul>
          </div>
        </div>
      </section>

      <section class="section band-paper">
        <div class="wrap">
          <p class="label">${esc(why.label)}</p>
          <h2>${esc(why.heading)}</h2>
          <div class="method-grid why-grid">
            ${why.items
              .map(
                (item) => `<article class="method-step">
                  <span class="method-node" aria-hidden="true"></span>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>

      ${photoStrip(
        [media.archiveBoxes, media.deskFiles, media.meetingRoom],
        "The rooms in which the work is done",
      )}

      <section class="section">
        <div class="wrap">
          <p class="label">${esc(cases.label)}</p>
          <h2>${esc(cases.heading)}</h2>
          <div class="case-grid">
            ${cases.items
              .map(
                (item) => `<article class="case-card">
                  <p class="mono">${esc(item.recovery)}</p>
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
          <p class="label">${esc(recognition.label)}</p>
          <h2>${esc(recognition.heading)}</h2>
          <ul class="recognition-list">
            ${recognition.items.map((item) => `<li>${esc(item)}</li>`).join("")}
          </ul>
          <blockquote class="recognition-quote">
            <p>${esc(recognition.quote)}</p>
            <p class="mono">${esc(recognition.quoteSource)}</p>
          </blockquote>
        </div>
      </section>

      <section class="section">
        <div class="wrap people-home">
          <p class="label">${esc(home.sections.profile.label)}</p>
          <h2>${esc(home.sections.profile.heading)}</h2>
          <p class="lead profile-lead">${esc(home.sections.profile.text)}</p>
          ${peopleCards()}
          <p class="mono">SRA ${esc(site.sraNumber)}</p>
        </div>
      </section>

      <section class="section band-paper">
        <div class="wrap">
          <p class="label">${esc(home.sections.insight.label)}</p>
          <h2>${esc(home.sections.insight.heading)}</h2>
          <a class="insight-visual" href="/insights/${featured.slug}/">
            ${figure(insightMedia(featured.slug), "media-figure insight-photo")}
            <span class="insight-copy">
              <p class="mono">${esc(featured.type)} / ${esc(featured.dateLabel)}</p>
              <h3>${esc(featured.title)}</h3>
              <p class="muted">${esc(featured.description)}</p>
            </span>
          </a>
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
              ${figure(practiceMedia(item.id), "media-figure service-thumb")}
              <span>
                <p class="label">${item.index}</p>
                <h2>${esc(item.title)}</h2>
                <p class="muted">${esc(item.summary)}</p>
              </span>
            </a>`,
          )
          .join("")}
      </div>
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
          <a class="btn btn-signal" href="/contact/">Instruct us confidentially</a>
      </div>
      ${wrap(`
        <div class="prose">
          <h2>When to contact us</h2>
          <ul>${page.when.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          <h2>Services</h2>
          <ul>${page.scope.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          <h2>Our approach</h2>
          <p>${esc(page.approach)}</p>
        </div>
      `)}
      ${wrap(`
        <h2>Questions we are asked</h2>
        <div class="faq">
          ${page.faqs
            .map(
              (item) => `<details>
                <summary>${esc(item.q)}</summary>
                <p>${esc(item.a)}</p>
              </details>`,
            )
            .join("")}
        </div>
      `)}
      ${
        related.length
          ? wrap(`
            <div class="related">
              <p class="label">Related insights</p>
              ${related
                .map(
                  (item) => `<a class="insight-visual" href="/insights/${item.slug}/">
                    ${figure(insightMedia(item.slug), "media-figure insight-photo")}
                    <span class="insight-copy">
                      <p class="mono">${esc(item.type)} / ${esc(item.dateLabel)}</p>
                      <h3>${esc(item.title)}</h3>
                    </span>
                  </a>`,
                )
                .join("")}
            </div>
          `)
          : ""
      }
      ${wrap(`
        <div class="cta-band">
          <h2>Discuss this matter</h2>
          <p class="muted">Send the facts you already have. All enquiries are handled under strict confidentiality protocols.</p>
          <a class="btn btn-signal" href="/contact/">Instruct us confidentially</a>
        </div>
      `)}
    </main>
  `;
  return documentPage(
    {
      ...page,
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
        <a class="btn btn-signal" href="/contact/">Instruct us confidentially</a>
      </div>
      <div class="wrap join-intro">
        ${page.intro.map((para) => `<p>${esc(para)}</p>`).join("")}
      </div>
      <section class="section band-paper" id="method">
        <div class="wrap">
          <p class="label">${esc(page.method.label)}</p>
          <h2>${esc(page.method.heading)}</h2>
          <div class="method-grid investigation-method">
            ${page.method.items
              .map(
                (item) => `<article class="method-step">
                  <span class="method-node" aria-hidden="true"></span>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>
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
                  ${figure(investigationMedia(item.id), "media-figure practice-photo")}
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
          ${peopleCards(investigators)}
          <p><a class="btn btn-ghost" href="/people/">All profiles</a></p>
        </div>
      </section>
      ${
        notes.length
          ? `<section class="section band-paper">
        <div class="wrap">
          <p class="label">Investigation notes</p>
          <h2>Method, written down.</h2>
          ${notes
            .map(
              (item) => `<a class="insight-visual" href="/insights/${item.slug}/">
                ${figure(insightMedia(item.slug), "media-figure insight-photo")}
                <span class="insight-copy">
                  <p class="mono">${esc(item.type)} / ${esc(item.dateLabel)}</p>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.description)}</p>
                </span>
              </a>`,
            )
            .join("")}
        </div>
      </section>`
          : ""
      }
      <section class="section" id="instruct">
        <div class="wrap cta-band">
          <h2>${esc(page.cta.heading)}</h2>
          <p class="lead muted">${esc(page.cta.text)}</p>
          <a class="btn btn-signal" href="/contact/">${esc("Write to us")}</a>
        </div>
      </section>
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
        <a class="btn btn-signal" href="/contact/">Instruct us confidentially</a>
      </div>
      ${wrap(`
        <div class="prose">
          <h2>When to contact us</h2>
          <ul>${page.when.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
          <h2>What the investigation covers</h2>
          <ul>${page.scope.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
          <h2>Our approach</h2>
          <p>${esc(page.approach)}</p>
        </div>
      `)}
      ${wrap(`
        <h2>Questions we are asked</h2>
        <div class="faq">
          ${page.faqs
            .map(
              (faq) => `<details>
                <summary>${esc(faq.q)}</summary>
                <p>${esc(faq.a)}</p>
              </details>`,
            )
            .join("")}
        </div>
      `)}
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
              ${related
                .map(
                  (note) => `<a class="insight-visual" href="/insights/${note.slug}/">
                    ${figure(insightMedia(note.slug), "media-figure insight-photo")}
                    <span class="insight-copy">
                      <p class="mono">${esc(note.type)} / ${esc(note.dateLabel)}</p>
                      <h3>${esc(note.title)}</h3>
                    </span>
                  </a>`,
                )
                .join("")}
            </div>
          `)
          : ""
      }
      ${wrap(`
        <div class="cta-band">
          <h2>Instruct this investigation</h2>
          <p class="muted">Send the facts you already have. All enquiries are handled under strict confidentiality protocols.</p>
          <a class="btn btn-signal" href="/contact/">Instruct us confidentially</a>
        </div>
      `)}
    </main>
  `;
  return documentPage(
    {
      ...page,
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
      <div class="wrap insights-index">
        ${site.insights
          .map(
            (item) => `<a class="insight-visual" href="/insights/${item.slug}/">
              ${figure(insightMedia(item.slug), "media-figure insight-photo")}
              <span class="insight-copy">
                <p class="mono">${esc(item.type)} / ${esc(item.dateLabel)}</p>
                <h3>${esc(item.title)}</h3>
                <p class="muted">${esc(item.description)}</p>
              </span>
            </a>`,
          )
          .join("")}
      </div>
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
        <p class="lead muted">${esc(page.lead)}</p>
      </div>
      <div class="wrap people-index">
        ${peopleCards()}
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
          <div class="method-grid">
            ${page.why.items
              .map(
                (item) => `<article class="method-step">
                  <span class="method-node" aria-hidden="true"></span>
                  <h3>${esc(item.title)}</h3>
                  <p class="muted">${esc(item.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
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
          ${peopleCards()}
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
          ${person.bio.map((para) => `<p>${esc(para)}</p>`).join("")}
          ${
            person.quotes?.length
              ? person.quotes.map((item) => `<blockquote>${esc(item)}</blockquote>`).join("")
              : ""
          }
          ${person.closing ? `<p>${esc(person.closing)}</p>` : ""}
          ${
            person.areas?.length
              ? `<h2>Key areas of work</h2>
            <ul>${person.areas.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`
              : ""
          }
          ${
            person.experience?.length
              ? `<h2>Representative experience</h2>
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
  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: "About" }])}
        <h1>${esc(page.heading)}</h1>
      </div>
      <div class="wrap split-visual about-visual">
        ${figure(media.meetingRoom, "media-figure room-photo")}
        <div class="prose">
        ${page.blocks
          .map((block) => `<h2>${esc(block.heading)}</h2><p>${esc(block.text)}</p>`)
          .join("")}
        </div>
      </div>
      ${photoStrip(
        [media.fileRoom, media.archiveBoxes, media.evidenceTable],
        "Rooms and files",
      )}
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
        <p class="mono">${esc(site.email)}</p>
        <p class="muted small">${esc(`${site.address.line1}, ${site.address.line2}, ${site.address.city} ${site.address.postcode}`)}</p>
      </div>
      <div class="wrap split-visual contact-visual">
        <form class="form" id="contact-form" novalidate>
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
          <button class="btn btn-signal" type="submit">Instruct us confidentially</button>
          <p class="form-status" data-form-status></p>
          <p class="small muted">This preview does not send data to a server. It opens a draft to ${esc(
            site.email,
          )} on this device.</p>
        </form>
        ${roomPhoto()}
      </div>
    </main>
  `;
  return documentPage({ ...page, crumb: "Contact" }, body);
}

function legalPage(key) {
  const page = pages[key];
  const extra =
    key === "complaints"
      ? `
        <h2>How to complain</h2>
        <ol>${page.steps.map((item) => `<li>${esc(item)}</li>`).join("")}</ol>
        <h2>Legal Ombudsman</h2>
        ${page.leo.map((item) => `<p>${esc(item)}</p>`).join("")}
        <p><a href="https://www.legalombudsman.org.uk/" rel="noopener noreferrer">legalombudsman.org.uk</a></p>
      `
      : page.blocks.map((block) => `<h2>${esc(block.heading)}</h2><p>${esc(block.text)}</p>`).join("");

  const body = `
    <main id="content">
      <div class="wrap page-head">
        ${crumbs([{ label: page.heading }])}
        <h1>${esc(page.heading)}</h1>
        ${page.intro ? `<p class="lead muted">${esc(page.intro)}</p>` : ""}
      </div>
      <div class="wrap prose" style="padding-bottom:6rem">
        ${extra}
        ${
          key === "legal"
            ? `<p><a href="${esc(site.sraUrl)}" rel="noopener noreferrer">View the SRA record for ${esc(
                site.sraNumber,
              )}</a></p>`
            : ""
        }
      </div>
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
    { file: "complaints/index.html", html: legalPage("complaints") },
    { file: "pricing/index.html", html: legalPage("pricing") },
    { file: "privacy/index.html", html: legalPage("privacy") },
    { file: "cookies/index.html", html: legalPage("cookies") },
    { file: "accessibility/index.html", html: legalPage("accessibility") },
    { file: "fraud-warning/index.html", html: legalPage("fraud") },
    { file: "404.html", html: notFoundPage() },
  ];
}
