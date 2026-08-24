import { site } from "../../site.config.js";
import { esc } from "./html.js";

const MARK = `<img class="brand-lockup" src="/brand/edison-law-logo.png" alt="Edison Law">`;

const ICONS = {
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/></svg>`,
};

function brand(href = "/") {
  return `<a class="brand" href="${href}">${MARK}</a>`;
}

export function trustBadges() {
  return `<div class="trust-badges">
    <a class="trust-badge" href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">
      <img src="/brand/sra-badge.svg" width="275" height="88" alt="Regulated by Solicitors Regulation Authority">
    </a>
    <a class="trust-badge" href="https://www.laworld.com/" target="_blank" rel="noopener noreferrer">
      <img src="/brand/laworld.jpg" width="275" height="178" alt="LAWORLD">
    </a>
    <a class="trust-badge" href="https://www.icc-ccs.org/" target="_blank" rel="noopener noreferrer">
      <img src="/brand/icc-fraudnet.jpg" width="275" height="83" alt="ICC FraudNet Commercial Crime Services">
    </a>
  </div>`;
}

function isCurrent(item, path) {
  const href = item.href;
  const label = item.label || "";
  if (href === "/") return path === "/";

  if (label === "Investigations") {
    return site.insights.some(
      (note) => note.type === "Investigation note" && path === `/insights/${note.slug}/`,
    );
  }
  if (label === "Insights") {
    if (path === "/insights/") return true;
    return site.insights.some(
      (note) => note.type !== "Investigation note" && path === `/insights/${note.slug}/`,
    );
  }
  if (href === "/expertise/") {
    return path === href || path.startsWith("/expertise/");
  }
  if (href === "/people/") {
    return path === href || path.startsWith("/people/");
  }
  return path === href;
}

function navLinks(items, path, className) {
  const rail = className === "rail-nav";
  return `<nav class="${className}" aria-label="Primary">
    ${items
      .map((item) => {
        const current = isCurrent(item, path);
        const cls = item.kind === "button" ? ' class="btn btn-ink"' : "";
        const label = rail
          ? `<span class="rail-node" aria-hidden="true"></span><span class="rail-label">${esc(item.label)}</span>`
          : esc(item.label);
        return `<a${cls} href="${item.href}"${current ? ' aria-current="page"' : ""}>${label}</a>`;
      })
      .join("")}
  </nav>`;
}

function jsonLd(page) {
  const origin = site.canonicalOrigin.replace(/\/$/, "");
  const url = `${origin}${page.path}`;
  const org = {
    "@type": ["LegalService", "Organization"],
    "@id": `${origin}/#organisation`,
    name: site.name,
    url: origin,
    email: site.email,
    areaServed: "GB",
    description: site.masterLine,
    identifier: site.sraNumber,
    sameAs: [site.sraUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: "GB",
    },
  };

  const graph = [org];

  if (page.schema === "home") {
    graph.push({
      "@type": "WebSite",
      url: origin,
      name: site.name,
      publisher: { "@id": `${origin}/#organisation` },
    });
  }

  if (page.person) {
    const personUrl = `${origin}/people/${page.person.slug}/`;
    graph.push({
      "@type": "Person",
      name: page.person.name,
      jobTitle: page.person.role,
      url: personUrl,
      worksFor: { "@id": `${origin}/#organisation` },
      ...(page.person.photo ? { image: `${origin}${page.person.photo}` } : {}),
    });
  }

  if (page.article) {
    graph.push({
      "@type": "Article",
      headline: page.article.title,
      datePublished: page.article.date,
      description: page.article.description,
      author: { "@type": "Organization", name: site.name },
      publisher: { "@id": `${origin}/#organisation` },
      mainEntityOfPage: url,
    });
  }

  if (page.path !== "/") {
    const crumbs = [{ name: "Home", item: `${origin}/` }];
    if (page.breadcrumbs) {
      for (const crumb of page.breadcrumbs) {
        crumbs.push({ name: crumb.label, item: `${origin}${crumb.href}` });
      }
    }
    crumbs.push({ name: page.crumb || page.heading || page.title, item: url });
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.item,
      })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function searchIndex() {
  const items = [
    { title: "Home", href: "/", type: "Page", text: site.masterLine },
    { title: "Expertise", href: "/expertise/", type: "Page", text: "Practice areas" },
    ...site.practices.map((item) => ({
      title: item.title,
      href: item.href,
      type: "Expertise",
      text: item.summary,
    })),
    { title: "Insights", href: "/insights/", type: "Page", text: "Investigation notes" },
    ...site.insights.map((item) => ({
      title: item.title,
      href: `/insights/${item.slug}/`,
      type: item.type,
      text: item.description,
    })),
    { title: "People", href: "/people/", type: "Page", text: site.people.map((person) => person.name).join(", ") || "People" },
    ...site.people.map((person) => ({
      title: person.name,
      href: `/people/${person.slug}/`,
      type: "People",
      text: `${person.role}. ${person.summary}`,
    })),
    { title: "Join us", href: "/join-us/", type: "Page", text: "Careers at Edison Law" },
    { title: "About", href: "/about/", type: "Page", text: site.shortLine },
    { title: "Contact", href: "/contact/", type: "Page", text: site.email },
    ...site.footerLinks.map((item) => ({
      title: item.label,
      href: item.href,
      type: "Legal",
      text: item.label,
    })),
  ];
  return JSON.stringify(items);
}

export function documentPage(page, body) {
  const origin = site.canonicalOrigin.replace(/\/$/, "");
  const canonical = `${origin}${page.path}`;
  const title = esc(page.title);
  const description = esc(page.description);
  const ogImage = `${origin}/og-image.png`;
  const robots = site.mode === "development" ? "noindex, nofollow" : "index, follow";

  return `<!DOCTYPE html>
<html lang="${site.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${robots}">
  <meta name="author" content="${esc(site.name)}">
  <meta name="theme-color" content="${site.themeColor}">
  <meta name="msapplication-TileColor" content="${site.themeColor}">
  <meta name="msapplication-config" content="/browserconfig.xml">
  <meta name="color-scheme" content="light">
  <meta name="format-detection" content="telephone=no">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <link rel="canonical" href="${canonical}">

  <link rel="icon" href="/brand/edison-law-logo.png" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="apple-mobile-web-app-title" content="${esc(site.name)}">
  <meta name="application-name" content="${esc(site.name)}">
  <meta name="mobile-web-app-capable" content="yes">

  <meta property="og:type" content="${page.article ? "article" : "website"}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Edison Law">
  <meta property="og:locale" content="${site.locale}">
  ${page.article ? `<meta property="article:published_time" content="${page.article.date}">` : ""}

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">

  <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/newsreader-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/src/css/main.css">
  <script type="application/ld+json">${jsonLd(page)}</script>
</head>
<body data-mode="${esc(site.mode)}" data-path="${esc(page.path)}">
  <!--
    THESIS: Edison turns fragmented digital and financial facts into a legal position. The site is an evidence desk, not a recovery-service landing or a chambers brochure.
    OWN-WORLD: Midnight and paper fields, Signal reserved for action and nodes, Newsreader display with Manrope interface, IBM Plex Mono only for real metadata, 248px evidence rail from 1280px, hairline rules, node-path graphics.
    STORY: A visitor in a live matter sees a London SRA-regulated firm that investigates then advises, finds the named solicitor and SRA number, and can start a confidential discussion without being sold recovery.
    FIRST VIEWPORT: Compact header or left rail; paper hero; specialist descriptor; master line at display scale; one Discuss a matter action; evidence-signal rings with three nodes; SRA standing already in the chrome.
    FORM: Brief-pinned Direction 01 Evidence Signal and the August 2026 brand-book digital system. No concept-seed; the visual world is already approved.
    FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
  -->
  <a class="skip-link" href="#content">Skip to content</a>
  <div class="preview-banner" role="status">
    <p>Development preview. Confirm SRA, contact, people and insurance details with the firm before publication. Email currently taken from a public listing.</p>
  </div>

  <header class="compact-header">
    ${brand("/")}
    ${navLinks(
      site.nav.filter((item) => item.kind !== "button"),
      page.path,
      "header-nav",
    )}
    <div class="header-tools">
      ${
        site.search.enabled
          ? `<button class="icon-btn" type="button" data-search-open aria-label="Search the site">${ICONS.search}</button>`
          : ""
      }
      <a class="btn btn-ink" href="/contact/">Contact</a>
      <button class="icon-btn menu-btn" type="button" data-menu-open aria-expanded="false" aria-controls="site-drawer">${ICONS.menu}<span>Menu</span></button>
    </div>
  </header>

  <aside class="rail" aria-label="Evidence rail">
    ${brand("/")}
    ${navLinks(site.rail, page.path, "rail-nav")}
    <div class="rail-utility">
      ${site.search.enabled ? `<button type="button" data-search-open>Search</button>` : ""}
      <a href="/accessibility/">Accessibility</a>
      <a href="/contact/">Contact</a>
      <p class="mono">SRA ${esc(site.sraNumber)}</p>
    </div>
  </aside>

  <div class="drawer" id="site-drawer" data-open="false">
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
      <div class="drawer-top">
        ${brand("/")}
        <button class="icon-btn" type="button" data-menu-close aria-label="Close menu">${ICONS.close}</button>
      </div>
      ${navLinks([...site.rail, ...site.footerLinks], page.path, "drawer-nav")}
    </div>
  </div>

  ${
    site.search.enabled
      ? `<dialog class="search-dialog" data-search>
        <form class="search-panel" method="dialog">
          <label class="label" for="site-search">Search</label>
          <input id="site-search" type="search" name="q" placeholder="Expertise, notes, people" autocomplete="off">
          <div class="search-results" data-search-results></div>
        </form>
      </dialog>`
      : ""
  }

  <div class="site">
    ${body}
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            ${brand("/")}
            <p>London</p>
            <p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>
          </div>
          <nav class="footer-links" aria-label="Legal">
            ${site.footerLinks
              .map((item) => `<a href="${item.href}">${esc(item.label)}</a>`)
              .join("")}
          </nav>
          ${trustBadges()}
        </div>
        <div class="footer-base">
          <p>Authorised and regulated by the Solicitors Regulation Authority. SRA number ${esc(
            site.sraNumber,
          )}.</p>
          <p>© <span data-year></span> Edison Law</p>
        </div>
      </div>
    </footer>
  </div>

  <script type="application/json" id="edison-search-data">${searchIndex()}</script>
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
}

export function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">Home</a>
    ${items
      .map((item, i) => {
        const last = i === items.length - 1;
        return last
          ? `<span aria-hidden="true">/</span><span aria-current="page">${esc(item.label)}</span>`
          : `<span aria-hidden="true">/</span><a href="${item.href}">${esc(item.label)}</a>`;
      })
      .join("")}
  </nav>`;
}

export function signalGraphic() {
  return `<svg class="signal-graphic" viewBox="0 0 320 320" role="img" aria-label="Evidence signal: three nodes on concentric rings">
    <g fill="none" stroke="#008D7A" stroke-opacity="0.35" stroke-width="1.2">
      <circle cx="160" cy="160" r="56"/>
      <circle cx="160" cy="160" r="96"/>
      <circle cx="160" cy="160" r="136"/>
    </g>
    <g fill="#008D7A">
      <circle cx="296" cy="160" r="6"/>
      <circle cx="78" cy="48" r="6"/>
      <circle cx="92" cy="268" r="6"/>
    </g>
  </svg>`;
}
