import { site } from "../../site.config.js";
import { home, pages, insightBodies } from "../content/copy.js";
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

function peopleCards() {
  return `<div class="people-grid">
    ${site.people
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

function roomPhoto() {
  return `<figure class="room-photo">
    <img src="/images/meeting-room.jpg" width="1024" height="1024" alt="A quiet meeting room with leather seating and daylight" decoding="async">
  </figure>`;
}

function cta(link) {
  return `<a class="btn btn-signal" href="${link.href}">${esc(link.label)}</a>`;
}

function homePage() {
  const featured = site.insights[0];
  const body = `
    <main id="content">
      <section class="band-paper">
        <div class="wrap hero">
          <div class="hero-copy">
            <p class="label">${esc(home.sections.hero.descriptor)}</p>
            <h1 class="display"><span>Following digital evidence.</span><span>Building legal cases.</span></h1>
            <p class="lead">${esc(home.sections.hero.lead)}</p>
            ${cta(home.sections.hero.cta)}
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
        <div class="wrap">
          <p class="label">${esc(home.sections.method.label)}</p>
          <h2>${esc(home.sections.method.heading)}</h2>
          <p class="lead muted method-lead">${esc(home.sections.method.lead)}</p>
          <div class="method-grid">
            ${home.sections.method.steps
              .map(
                (step) => `<article class="method-step">
                  <span class="method-node" aria-hidden="true"></span>
                  <h3>${esc(step.title)}</h3>
                  <p class="muted">${esc(step.text)}</p>
                </article>`,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section band-ink">
        <div class="wrap people-home">
          <p class="label">${esc(home.sections.profile.label)}</p>
          <h2>${esc(home.sections.profile.heading)}</h2>
          <p class="lead profile-lead">${esc(home.sections.profile.text)}</p>
          ${peopleCards()}
          <p class="mono">SRA ${esc(site.sraNumber)}</p>
        </div>
      </section>

      <section class="section">
        <div class="wrap reading">
          <p class="label">${esc(home.sections.insight.label)}</p>
          <h2>${esc(home.sections.insight.heading)}</h2>
          <a class="insight-row" href="/insights/${featured.slug}/">
            <h3>${esc(featured.title)}</h3>
            <p class="muted">${esc(featured.description)}</p>
          </a>
        </div>
      </section>

      <section class="section band-paper">
        <div class="wrap split-visual">
          <div>
            <p class="label">${esc(home.sections.london.label)}</p>
            <h2>${esc(home.sections.london.heading)}</h2>
            <p class="lead london-lead">${esc(home.sections.london.text)}</p>
          </div>
          ${roomPhoto()}
        </div>
      </section>

      <section class="section">
        <div class="wrap cta-band reading">
          <h2>${esc(home.sections.cta.heading)}</h2>
          <p class="lead muted">${esc(home.sections.cta.text)}</p>
          <a class="btn btn-ink" href="${home.sections.cta.cta.href}">${esc(home.sections.cta.cta.label)}</a>
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
      <div class="wrap service-index">
        ${site.practices
          .map(
            (item) => `<a href="${item.href}">
              <p class="label">${item.index}</p>
              <h2>${esc(item.title)}</h2>
              <p class="muted">${esc(item.summary)}</p>
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
        <a class="btn btn-signal" href="/contact/">Discuss a matter</a>
      </div>
      ${wrap(`
        <div class="prose">
          <h2>When to contact us</h2>
          <ul>${page.when.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          <h2>Scope</h2>
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
                  (item) => `<a class="insight-row" href="/insights/${item.slug}/">
                    <p class="mono">${esc(item.type)} / ${esc(item.dateLabel)}</p>
                    <h3>${esc(item.title)}</h3>
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
          <p class="muted">Send the facts you already have. We will say whether the next step is legal work, more evidence, or no action yet.</p>
          <a class="btn btn-signal" href="/contact/">Contact</a>
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
      <div class="wrap">
        ${site.insights
          .map(
            (item) => `<a class="insight-row" href="/insights/${item.slug}/">
              <p class="mono">${esc(item.type)} / ${esc(item.dateLabel)}</p>
              <h3>${esc(item.title)}</h3>
              <p class="muted">${esc(item.description)}</p>
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
      <div class="wrap split-visual about-visual" style="padding-bottom:6rem">
        ${roomPhoto()}
        <div class="prose">
        ${page.blocks
          .map((block) => `<h2>${esc(block.heading)}</h2><p>${esc(block.text)}</p>`)
          .join("")}
        </div>
      </div>
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
        <p class="mono">${esc(site.email)}</p>
        <p class="muted small">London</p>
      </div>
      <div class="wrap split-visual contact-visual" style="padding-bottom:6rem">
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
              <option>Financial crime</option>
              <option>Tax disputes &amp; resolution</option>
              <option>Crypto investigations</option>
              <option>Digital asset disputes</option>
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
          <button class="btn btn-signal" type="submit">Prepare email</button>
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
    { file: "expertise/financial-crime/index.html", html: servicePage("financialCrime", "financial-crime") },
    {
      file: "expertise/tax-disputes-resolution/index.html",
      html: servicePage("tax", "tax"),
    },
    {
      file: "expertise/crypto-investigations/index.html",
      html: servicePage("crypto", "crypto"),
    },
    {
      file: "expertise/digital-asset-disputes/index.html",
      html: servicePage("digitalAssets", "digital-assets"),
    },
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
