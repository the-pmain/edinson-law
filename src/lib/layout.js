import { personEmail } from "../content/people.js";
import {
  isPending,
  legalServiceName,
  schemaOpeningHours,
} from "../config/trust.js";
import {
  LOCALES,
  loc,
  localizePath,
  prefixHtml,
  site,
  t,
  trust,
} from "../i18n/catalog.js";
import { UI } from "../i18n/ui.js";
import { esc } from "./html.js";
import { filterPublicFaqs, regulatoryFooterHtml } from "./trust-html.js";

const MARK = `<img class="brand-lockup" src="/brand/edison-law-logo.png" alt="Edison Law">`;

const ICONS = {
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="M16 16l5 5"/></svg>`,
};

const PRACTICE_ICONS = {
  "private-prosecutions": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16"/><path d="M7 19V10h10v9"/><path d="M9 10V7h6v3"/><path d="M4 13h3M17 13h3"/></svg>`,
  "asset-tracing": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="18" r="2.25"/><circle cx="12" cy="6" r="2.25"/><circle cx="19" cy="13" r="2.25"/><path d="M6.8 16.3 10.5 8.2M14.1 7.6 17.1 11.3"/></svg>`,
  "crypto-fraud": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="8" width="7" height="8" rx="1"/><rect x="14.5" y="8" width="7" height="8" rx="1"/><path d="M9.5 12h5"/><path d="M5 11h2.5M5 13h1.75M16.5 11H19M16.5 13h1.75"/></svg>`,
  regulatory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M5 20V9l7-5 7 5v11"/><path d="M10 20v-5h4v5"/><path d="M8.5 12v4M12 12v4M15.5 12v4"/></svg>`,
  "cross-border": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="12" r="3.4"/><circle cx="17" cy="12" r="3.4"/><path d="M10.4 12h3.2"/><path d="M12 5.5v2M12 16.5v2"/></svg>`,
  "corporate-intelligence": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h11v13H8z"/><path d="M5 4h11v3"/><path d="M11 12h5M11 15h3.5"/></svg>`,
};

const PRACTICE_ICON_FALLBACK = PRACTICE_ICONS["corporate-intelligence"];

export function practiceIcon(id) {
  return PRACTICE_ICONS[id] || PRACTICE_ICON_FALLBACK;
}

const INSIGHT_ICONS = {
  "fake-crypto-recovery-services": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="11" width="13" height="9" rx="1.5"/><path d="M8 11V8.2A4 4 0 0 1 16 8.2V11"/><path d="M12 14.2v2.2"/></svg>`,
  "legal-routes-after-crypto-movement": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="12" cy="17" r="2"/><path d="M8.7 9.4 10.8 15.2M15.3 9.4 13.2 15.2"/><path d="M4 20h16"/></svg>`,
  "first-records-after-digital-asset-loss": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h7l4 4v12H8z"/><path d="M15 4v4h4"/><path d="M11 12h5M11 15h3.5"/></svg>`,
  "tracing-assets-across-wallets": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7.8 8.4 10.4 16.1M16.2 8.4 13.6 16.1M8.2 7h7.6"/></svg>`,
  "hmrc-enquiry-evidence": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h8l4 4v12H7z"/><path d="M15 4v4h4"/><path d="M10 12h6M10 15h4"/></svg>`,
  "preserving-digital-evidence": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 7.5h6M9 11h6M9 14.5h3.5"/></svg>`,
};

export function insightIcon(slug) {
  return INSIGHT_ICONS[slug] || PRACTICE_ICON_FALLBACK;
}

const WHY_ICONS = {
  solicitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3"/><path d="M6 19.5c1.2-3.2 3.4-4.8 6-4.8s4.8 1.6 6 4.8"/></svg>`,
  evidence: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/></svg>`,
  fees: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="13" rx="1.5"/><path d="M8 6V5h8v1"/><path d="M8 11.5h3M8 14.5h5"/></svg>`,
  discretion: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="11" width="13" height="9" rx="1.5"/><path d="M8 11V8.2A4 4 0 0 1 16 8.2V11"/></svg>`,
  london: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="12" r="3.4"/><circle cx="17" cy="12" r="3.4"/><path d="M10.4 12h3.2"/></svg>`,
};

export function whyIcon(id) {
  return WHY_ICONS[id] || PRACTICE_ICON_FALLBACK;
}

const MARK_ATTR = `viewBox="0 0 240 240" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round"`;

const FIELD_MARKS = {
  trace: `<svg ${MARK_ATTR}>
    <rect width="240" height="240" fill="var(--mark-ground)"/>
    <g stroke="var(--mark-line)" stroke-width="0.65" opacity="0.28">
      <path d="M0 24h240M0 48h240M0 72h240M0 96h240M0 120h240M0 144h240M0 168h240M0 192h240M0 216h240"/>
      <path d="M24 0v240M48 0v240M72 0v240M96 0v240M120 0v240M144 0v240M168 0v240M192 0v240M216 0v240"/>
    </g>
    <g fill="none" stroke="var(--mark-line)" opacity="0.24">
      <circle cx="128" cy="126" r="72"/>
      <circle cx="128" cy="126" r="50"/>
      <circle cx="128" cy="126" r="34"/>
    </g>
    <g stroke="var(--mark-sheet)" stroke-width="1.2" opacity="0.78">
      <path d="M128 126 48 72M128 126 198 48M128 126 208 112M128 126 70 202M128 126 192 204"/>
    </g>
    <g fill="var(--mark-ground)" stroke="var(--mark-sheet)" stroke-width="1.8">
      <circle cx="48" cy="72" r="5"/>
      <circle cx="198" cy="48" r="5"/>
      <circle cx="208" cy="112" r="5"/>
      <circle cx="70" cy="202" r="5"/>
      <circle cx="192" cy="204" r="5"/>
    </g>
    <g fill="var(--mark-wash)" opacity="0.22">
      <circle cx="48" cy="72" r="12"/>
      <circle cx="198" cy="48" r="12"/>
      <circle cx="208" cy="112" r="12"/>
      <circle cx="70" cy="202" r="12"/>
      <circle cx="192" cy="204" r="12"/>
    </g>
    <circle cx="128" cy="126" r="34" fill="var(--mark-signal)"/>
    <text x="128" y="121" text-anchor="middle" fill="var(--mark-ink)" font-family="var(--font-mono)" font-size="6" letter-spacing="1.2">EVIDENCE</text>
    <text x="128" y="132" text-anchor="middle" fill="var(--mark-ink)" font-family="var(--font-mono)" font-size="5">WALLET / RECORD</text>
    <text x="14" y="18" fill="var(--mark-sheet)" font-family="var(--font-mono)" font-size="5" letter-spacing="1.4">TRACE MAP</text>
    <text x="188" y="18" fill="var(--mark-sheet)" font-family="var(--font-mono)" font-size="5">METHOD / 01</text>
    <text x="34" y="60" fill="var(--mark-sheet)" font-family="var(--font-mono)" font-size="4">SOURCE</text>
    <text x="194" y="100" fill="var(--mark-sheet)" font-family="var(--font-mono)" font-size="4">EXCHANGE</text>
    <text x="58" y="220" fill="var(--mark-sheet)" font-family="var(--font-mono)" font-size="4">BRIDGE</text>
  </svg>`,
  evidence: `<svg ${MARK_ATTR}>
    <rect width="240" height="240" fill="var(--mark-ground)"/>
    <circle cx="252" cy="-6" r="120" fill="var(--mark-signal)" fill-opacity="0.12"/>
    <rect x="40" y="52" width="138" height="168" rx="3" fill="var(--mark-ink)" fill-opacity="0.1"/>
    <rect x="52" y="34" width="138" height="168" rx="3" fill="var(--mark-sheet)" stroke="var(--mark-ink)" stroke-width="1.6"/>
    <rect x="98" y="16" width="46" height="30" rx="2" fill="var(--mark-signal)"/>
    <path d="M72 68h98M72 90h98M72 112h70M72 134h90M72 156h54M72 178h82" stroke="var(--mark-signal)" stroke-width="2.1"/>
    <rect x="8" y="112" width="56" height="42" rx="2" fill="var(--mark-signal)"/>
    <path d="M18 126h36M18 140h22" stroke="var(--mark-sheet)" stroke-width="2"/>
    <circle cx="198" cy="198" r="24" fill="var(--mark-wash)" stroke="var(--mark-signal)" stroke-width="1.6"/>
    <circle cx="198" cy="198" r="7" fill="var(--mark-signal)"/>
  </svg>`,
  method: `<svg ${MARK_ATTR}>
    <rect width="240" height="240" fill="var(--mark-ground)"/>
    <g stroke="var(--mark-ink)" stroke-width="1.5">
      <rect x="14" y="18" width="74" height="54" rx="2" fill="var(--mark-sheet)"/>
      <rect x="14" y="88" width="74" height="54" rx="2" fill="var(--mark-sheet)"/>
      <rect x="14" y="158" width="74" height="54" rx="2" fill="var(--mark-sheet)"/>
    </g>
    <g stroke="var(--mark-signal)" stroke-width="2">
      <path d="M28 36h46M28 48h30"/>
      <path d="M28 106h46M28 118h24"/>
      <path d="M28 176h46M28 188h34"/>
    </g>
    <g fill="none" stroke="var(--mark-signal)" stroke-width="2">
      <path d="M88 45c28 0 28 63 48 63"/>
      <path d="M88 115h48"/>
      <path d="M88 185c28 0 28-55 48-55"/>
    </g>
    <rect x="128" y="28" width="96" height="184" rx="3" fill="var(--mark-ink)" fill-opacity="0.1"/>
    <rect x="138" y="16" width="88" height="184" rx="3" fill="var(--mark-sheet)" stroke="var(--mark-ink)" stroke-width="1.6"/>
    <rect x="166" y="4" width="32" height="22" rx="2" fill="var(--mark-signal)"/>
    <path d="M154 46h56M154 66h56M154 86h38M154 106h50M154 126h28M154 146h46M154 166h34" stroke="var(--mark-signal)" stroke-width="2"/>
  </svg>`,
  london: `<svg ${MARK_ATTR}>
    <rect width="240" height="240" fill="var(--mark-ground)"/>
    <circle cx="214" cy="18" r="88" fill="var(--mark-signal)" fill-opacity="0.12"/>
    <circle cx="22" cy="228" r="64" fill="var(--mark-ink)" fill-opacity="0.1"/>
    <path d="M84 118v-36a36 36 0 0 1 72 0v36" fill="none" stroke="var(--mark-ink)" stroke-width="12"/>
    <path d="M84 118v-36a36 36 0 0 1 72 0v36" fill="none" stroke="var(--mark-signal)" stroke-width="6"/>
    <rect x="62" y="112" width="116" height="96" rx="10" fill="var(--mark-ink)" fill-opacity="0.12"/>
    <rect x="68" y="106" width="104" height="96" rx="10" fill="var(--mark-signal)"/>
    <circle cx="120" cy="142" r="14" fill="var(--mark-sheet)"/>
    <path d="M120 156v22" stroke="var(--mark-sheet)" stroke-width="6" stroke-linecap="round"/>
  </svg>`,
  discuss: `<svg ${MARK_ATTR}>
    <rect width="240" height="240" fill="var(--mark-ground)"/>
    <rect x="48" y="52" width="144" height="136" rx="3" fill="var(--mark-sheet)" stroke="var(--mark-ink)" stroke-width="1.6"/>
    <rect x="64" y="76" width="52" height="72" rx="2" fill="var(--mark-signal)"/>
    <rect x="124" y="84" width="48" height="64" rx="2" fill="var(--mark-wash)" stroke="var(--mark-signal)" stroke-width="1.5"/>
    <path d="M74 92h32M74 106h32M74 120h18" stroke="var(--mark-sheet)" stroke-width="2"/>
    <rect x="12" y="78" width="28" height="84" rx="3" fill="var(--mark-ink)"/>
    <rect x="200" y="78" width="28" height="84" rx="3" fill="var(--mark-ink)"/>
    <path d="M16 228h208" stroke="var(--mark-line)" stroke-width="1.4"/>
  </svg>`,
  investigate: `<svg ${MARK_ATTR}>
    <rect width="240" height="240" fill="var(--mark-ground)"/>
    <path d="M20 64h84l16 22h100v132H20z" fill="var(--mark-signal)"/>
    <path d="M28 64 84 16h92l-16 48" fill="var(--mark-wash)" stroke="var(--mark-ink)" stroke-width="1.4"/>
    <rect x="40" y="104" width="160" height="96" rx="2" fill="var(--mark-sheet)"/>
    <path d="M56 124h128M56 144h128M56 164h84" stroke="var(--mark-signal)" stroke-width="2.1"/>
  </svg>`,
};

export function fieldMark(kind, className = "field-mark") {
  const svg = FIELD_MARKS[kind] || FIELD_MARKS.evidence;
  return `<div class="${className}" role="presentation">${svg}</div>`;
}

function brand(href = "/") {
  return `<a class="brand" href="${href}">${MARK}</a>`;
}

export function trustBadges() {
  return `<div class="trust-badges" role="group" aria-label="${esc(t("regulationMemberships"))}">
    <a class="trust-badge" href="${esc(site.sraUrl)}" target="_blank" rel="noopener noreferrer">
      <img src="/brand/sra-badge.svg" width="275" height="88" alt="${esc(t("sraBadgeAlt"))}">
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
  if (href === "/") return path === "/";

  if (href === "/investigations/") {
    return path === href || path.startsWith("/investigations/");
  }
  if (href === "/insights/") {
    return path === href || path.startsWith("/insights/");
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
  return `<nav class="${className}" aria-label="${esc(t("primaryNav"))}">
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
  const url = `${origin}${localizePath(page.path)}`;
  const org = {
    "@type": ["LegalService", "Organization"],
    "@id": `${origin}/#organisation`,
    name: legalServiceName(),
    url: origin,
    areaServed: "England and Wales",
    description: site.masterLine,
    identifier: site.sraNumber,
    sameAs: [site.sraUrl],
    openingHours: schemaOpeningHours,
  };
  if (!isPending(trust.contact.email)) org.email = trust.contact.email;
  if (!isPending(trust.contact.phone)) org.telephone = trust.contact.phone;
  if (!isPending(trust.contact.address)) {
    org.address = {
      "@type": "PostalAddress",
      streetAddress: trust.contact.address,
      addressCountry: "GB",
      addressRegion: "England and Wales",
    };
  }

  const graph = [org];

  if (page.schema === "home") {
    graph.push({
      "@type": "WebSite",
      url: `${origin}${localizePath("/")}`,
      name: site.name,
      inLanguage: loc().htmlLang,
      publisher: { "@id": `${origin}/#organisation` },
    });
  }

  if (page.person) {
    const personUrl = `${origin}${localizePath(`/people/${page.person.slug}/`)}`;
    const verifiedSraId = page.person.sraId && !isPending(page.person.sraId);
    const canPublishJobTitle = !/lawyer|solicitor/i.test(page.person.role || "") || verifiedSraId;
    graph.push({
      "@type": "Person",
      name: page.person.name,
      ...(canPublishJobTitle ? { jobTitle: page.person.role } : {}),
      url: personUrl,
      worksFor: { "@id": `${origin}/#organisation` },
      ...(personEmail(page.person) ? { email: personEmail(page.person) } : {}),
      ...(page.person.photo ? { image: `${origin}${page.person.photo}` } : {}),
      ...(verifiedSraId ? { identifier: page.person.sraId } : {}),
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

  if (page.schema === "investigations" || page.schema === "service") {
    const service = {
      "@type": "Service",
      name: (page.title || "").replace(/\s*\|\s*.*$/, "").trim() || page.heading,
      serviceType: page.serviceType || "Legal investigation",
      provider: { "@id": `${origin}/#organisation` },
      areaServed: "England and Wales",
      url,
      description: page.description,
    };
    if (page.schema === "investigations") {
      service.hasOfferCatalog = {
        "@type": "OfferCatalog",
        name: "Investigations",
        itemListElement: site.investigations.map((item, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: item.title,
            url: `${origin}${localizePath(item.href)}`,
          },
        })),
      };
    }
    graph.push(service);
  }

  const faqs = filterPublicFaqs(page.faqs);
  if (faqs.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }

  if (page.path !== "/") {
    const crumbs = [{ name: t("home"), item: `${origin}${localizePath("/")}` }];
    if (page.breadcrumbs) {
      for (const crumb of page.breadcrumbs) {
        crumbs.push({ name: crumb.label, item: `${origin}${localizePath(crumb.href)}` });
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
    { title: t("home"), href: "/", type: t("search.page"), text: t("search.homeText") },
    { title: t("nav.expertise"), href: "/expertise/", type: t("search.page"), text: t("search.expertiseText") },
    ...site.practices.map((item) => ({
      title: item.title,
      href: item.href,
      type: t("search.expertise"),
      text: item.summary,
    })),
    {
      title: t("nav.investigations"),
      href: "/investigations/",
      type: t("search.page"),
      text: t("search.investigationsText"),
    },
    ...site.investigations.map((item) => ({
      title: item.title,
      href: item.href,
      type: t("search.investigations"),
      text: item.summary,
    })),
    { title: t("nav.insights"), href: "/insights/", type: t("search.page"), text: t("search.insightsText") },
    ...site.insights.map((item) => ({
      title: item.title,
      href: `/insights/${item.slug}/`,
      type: item.type,
      text: item.description,
    })),
    { title: t("nav.people"), href: "/people/", type: t("search.page"), text: site.people.map((person) => person.name).join(", ") || t("nav.people") },
    { title: t("agreementHeading"), href: "/people/agreement/", type: t("search.page"), text: t("agreementLead") },
    ...site.people.map((person) => ({
      title: person.name,
      href: `/people/${person.slug}/`,
      type: t("search.people"),
      text: `${person.role}. ${person.summary} ${personEmail(person)}`,
    })),
    { title: t("nav.joinUs"), href: "/join-us/", type: t("search.page"), text: t("search.joinUsText") },
    { title: t("nav.about"), href: "/about/", type: t("search.page"), text: site.shortLine },
    {
      title: site.tools.cobraAi.name,
      href: "/investigations/#cobra-ai",
      type: t("search.page"),
      text: t("search.cobraText", { vendor: site.tools.cobraAi.vendor }),
    },
    { title: t("nav.contact"), href: "/contact/", type: t("search.page"), text: t("search.contactText") },
    ...site.footerLinks.map((item) => ({
      title: item.label,
      href: item.href,
      type: t("search.legal"),
      text: item.label,
    })),
  ];
  return JSON.stringify(items);
}

function alternateLinks(pagePath) {
  const origin = site.canonicalOrigin.replace(/\/$/, "");
  const links = LOCALES.map((item) => {
    const href = `${origin}${localizePath(pagePath, item)}`;
    return `<link rel="alternate" hreflang="${item.hreflang}" href="${href}">`;
  });
  links.push(`<link rel="alternate" hreflang="x-default" href="${origin}${localizePath(pagePath, LOCALES[0])}">`);
  return links.join("\n  ");
}

function ogLocaleTags() {
  const current = loc();
  const tags = [`<meta property="og:locale" content="${current.ogLocale}">`];
  for (const item of LOCALES) {
    if (item.id === current.id) continue;
    tags.push(`<meta property="og:locale:alternate" content="${item.ogLocale}">`);
  }
  return tags.join("\n  ");
}

function languageMenu(pagePath, variant) {
  const current = loc();
  const chevron = `<svg class="lang-switch-chevron" viewBox="0 0 12 8" width="10" height="7" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 1.5L6 6l4.5-4.5"/></svg>`;
  const links = LOCALES.map((item) => {
    const currentAttr = item.id === current.id ? ' aria-current="true"' : "";
    return `<a class="lang-option" href="__I18N__${item.id}__" hreflang="${item.hreflang}" lang="${item.htmlLang}" data-lang="${item.id}" data-lang-link${currentAttr}><span class="lang-option-code">${esc(item.code)}</span><span class="lang-option-name">${esc(item.nativeName)}</span><span class="lang-option-mark" aria-hidden="true"></span></a>`;
  }).join("");

  if (variant === "drawer") {
    return `<div class="lang-switch lang-switch-drawer">
      <p class="label" id="lang-drawer-label">${esc(t("language"))}</p>
      <nav class="lang-menu" aria-labelledby="lang-drawer-label">${links}</nav>
    </div>`;
  }

  const id = variant === "rail" ? "lang-menu-rail" : "lang-menu";
  const extra = variant === "rail" ? " lang-switch-rail" : "";
  return `<details class="lang-switch${extra}" data-lang-switch name="site-lang">
    <summary class="lang-switch-btn">
      <span class="lang-option-code" aria-hidden="true">${esc(current.code)}</span>
      <span class="visually-hidden">${esc(t("language"))}: ${esc(current.nativeName)}</span>
      ${chevron}
    </summary>
    <div class="lang-menu" id="${id}">
      <nav aria-label="${esc(t("language"))}">${links}</nav>
    </div>
  </details>`;
}

function i18nPayload(pagePath) {
  return JSON.stringify({
    locale: loc().id,
    path: pagePath,
    locales: LOCALES.filter((item) => item.id !== "en").map((item) => {
      const ui = UI[item.id];
      return {
        id: item.id,
        hreflang: item.hreflang,
        match: item.match,
        href: localizePath(pagePath, item),
        prompt: ui["suggest.prompt"].replaceAll("{name}", item.nativeName),
        go: ui["suggest.go"].replaceAll("{name}", item.nativeName),
        stay: ui["suggest.stay"],
      };
    }),
  });
}

export function documentPage(page, body) {
  const origin = site.canonicalOrigin.replace(/\/$/, "");
  const sourcePath = page.canonicalPath || page.path;
  const localizedPath = localizePath(sourcePath);
  const canonical = `${origin}${localizedPath}`;
  const title = esc(page.title);
  const description = esc(page.description);
  const ogImage = `${origin}/og-image.png`;
  const robots = page.path === "/404.html" ? "noindex, nofollow" : "index, follow";
  const current = loc();
  const redirect = page.redirectTo ? localizePath(page.redirectTo) : "";

  const html = `<!DOCTYPE html>
<html lang="${esc(current.htmlLang)}" data-locale="${esc(current.id)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${robots}">
  ${redirect ? `<meta http-equiv="refresh" content="0;url=${esc(redirect)}">` : ""}
  <meta name="author" content="${esc(site.name)}">
  <meta name="theme-color" content="${site.themeColor}">
  <meta name="msapplication-TileColor" content="${site.themeColor}">
  <meta name="msapplication-config" content="/browserconfig.xml">
  <meta name="color-scheme" content="light">
  <meta name="format-detection" content="telephone=no">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <link rel="canonical" href="${canonical}">
  ${alternateLinks(sourcePath)}

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
  <meta property="og:image:alt" content="${esc(page.heading || site.name)}">
  ${ogLocaleTags()}
  ${page.article ? `<meta property="article:published_time" content="${page.article.date}">` : ""}

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:image:alt" content="${esc(page.heading || site.name)}">

  <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/fonts/newsreader-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/src/css/main.css">
  <script type="application/ld+json">${jsonLd(page)}</script>
</head>
<body data-mode="${esc(site.mode)}" data-path="${esc(page.path)}" data-locale="${esc(current.id)}">
  <!--
    THESIS: Edison turns fragmented digital and financial facts into a legal position. The site is an evidence desk, not a recovery-service landing or a chambers brochure.
    OWN-WORLD: Midnight and paper fields, Signal reserved for action and nodes, Newsreader display with Manrope interface, IBM Plex Mono only for real metadata, 200px evidence rail from 1680px, hairline rules, node-path graphics.
    STORY: A visitor in a live matter sees a London SRA-regulated firm that investigates then advises, finds the named solicitor and SRA number, and can start a confidential discussion without being sold recovery.
    FIRST VIEWPORT: Compact header or left rail; paper hero; SRA number; specialist descriptor; master line; Discuss a matter in the first viewport; evidence mark.
    FORM: Brief-pinned Direction 01 Evidence Signal and the August 2026 brand-book digital system. No concept-seed; the visual world is already approved.
    FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
  -->
  <a class="skip-link" href="#content">${esc(t("skip"))}</a>

  <div class="lang-suggest" data-lang-suggest hidden>
    <p data-lang-suggest-text></p>
    <a class="btn btn-signal" data-lang-suggest-go></a>
    <button type="button" class="btn btn-ghost" data-lang-suggest-dismiss></button>
  </div>

  <header class="compact-header">
    ${brand("/")}
    ${navLinks(
      site.nav.filter((item) => item.kind !== "button"),
      page.path,
      "header-nav",
    )}
    <div class="header-tools">
      ${languageMenu(sourcePath, "header")}
      ${
        site.search.enabled
          ? `<button class="icon-btn" type="button" data-search-open aria-label="${esc(t("searchSite"))}">${ICONS.search}</button>`
          : ""
      }
      <a class="btn btn-ink" href="/contact/">${esc(t("contact"))}</a>
      <button class="icon-btn menu-btn" type="button" data-menu-open aria-expanded="false" aria-controls="site-drawer">${ICONS.menu}<span>${esc(t("menu"))}</span></button>
    </div>
  </header>

  <aside class="rail" aria-label="${esc(t("evidenceRail"))}">
    ${brand("/")}
    ${navLinks(site.rail, page.path, "rail-nav")}
    <div class="rail-badges">
      ${trustBadges()}
    </div>
    <div class="rail-utility">
      ${languageMenu(sourcePath, "rail")}
      ${site.search.enabled ? `<button type="button" data-search-open>${esc(t("search"))}</button>` : ""}
      <a href="/accessibility/">${esc(t("accessibility"))}</a>
      <a href="/contact/">${esc(t("contact"))}</a>
    </div>
  </aside>

  <div class="drawer" id="site-drawer" data-open="false">
    <div class="drawer-panel" role="dialog" aria-modal="true" aria-label="${esc(t("menuDialog"))}">
      <div class="drawer-top">
        ${brand("/")}
        <button class="icon-btn" type="button" data-menu-close aria-label="${esc(t("closeMenu"))}">${ICONS.close}</button>
      </div>
      ${navLinks([...site.rail, ...site.footerLinks], page.path, "drawer-nav")}
      ${languageMenu(sourcePath, "drawer")}
    </div>
  </div>

  ${
    site.search.enabled
      ? `<dialog class="search-dialog" data-search>
        <form class="search-panel" method="dialog">
          <label class="label" for="site-search">${esc(t("search"))}</label>
          <input id="site-search" type="search" name="q" placeholder="${esc(t("searchPlaceholder"))}" autocomplete="off">
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
            ${site.email ? `<p><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></p>` : ""}
          </div>
          <nav class="footer-links" aria-label="${esc(t("legalNav"))}">
            ${site.footerLinks
              .map((item) => `<a href="${item.href}">${esc(item.label)}</a>`)
              .join("")}
          </nav>
          ${trustBadges()}
        </div>
        <div class="footer-base">
          ${regulatoryFooterHtml()}
          <p>© <span data-year></span> ${esc(trust.firm.tradingName)}</p>
        </div>
      </div>
    </footer>
  </div>

  <script type="application/json" id="edison-search-data">${searchIndex()}</script>
  <script type="application/json" id="edison-i18n">${i18nPayload(sourcePath)}</script>
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
  let output = prefixHtml(html);
  for (const item of LOCALES) {
    output = output.replaceAll(`__I18N__${item.id}__`, localizePath(sourcePath, item));
  }
  return output;
}

export function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb">
    <a href="/">${esc(t("home"))}</a>
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
