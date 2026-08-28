import { AsyncLocalStorage } from "node:async_hooks";
import { site as sourceSite } from "../../site.config.js";
import { home as sourceHome, pages as sourcePages, insightBodies as sourceBodies } from "../content/copy.js";
import { people as sourcePeople } from "../content/people.js";
import { serviceMatter as sourceMatter } from "../content/service-matter.js";
import { trust as sourceTrust } from "../config/trust.js";
import { DEFAULT_LOCALE, LOCALES, isAssetPath, localeById, localizePath as localizePathRaw } from "./locales.js";
import { FOOTER_LABELS, NAV_LABELS, UI } from "./ui.js";
import sv from "./overlays/sv/index.js";
import nb from "./overlays/nb/index.js";
import da from "./overlays/da/index.js";
import de from "./overlays/de/index.js";

const OVERLAYS = { sv, nb, da, de };
const als = new AsyncLocalStorage();
const cache = new Map();

function merge(base, over) {
  if (over === undefined) return structuredClone(base);
  if (Array.isArray(over)) return structuredClone(over);
  if (over && typeof over === "object") {
    if (base && typeof base === "object" && !Array.isArray(base)) {
      const out = structuredClone(base);
      for (const key of Object.keys(over)) {
        out[key] = merge(base[key], over[key]);
      }
      return out;
    }
    return structuredClone(over);
  }
  return over;
}

function mergeBy(list, dict, key) {
  if (!dict) return structuredClone(list);
  return list.map((item) => {
    const extra = dict[item[key]];
    return extra ? merge(item, extra) : structuredClone(item);
  });
}

function labelItems(items, labels) {
  return items.map((item) => ({
    ...item,
    label: labels[item.href] || item.label,
  }));
}

function buildCatalog(id) {
  if (cache.has(id)) return cache.get(id);
  const locale = localeById(id);
  const over = OVERLAYS[id] || {};
  const ui = UI[id] || UI.en;
  const navLabels = NAV_LABELS[id] || NAV_LABELS.en;
  const footerLabels = FOOTER_LABELS[id] || FOOTER_LABELS.en;

  const site = merge(sourceSite, over.site || {});
  site.lang = locale.htmlLang;
  site.locale = locale.ogLocale;
  site.nav = labelItems(sourceSite.nav, navLabels);
  site.rail = labelItems(sourceSite.rail, navLabels);
  site.footerLinks = labelItems(sourceSite.footerLinks, footerLabels);
  site.practices = mergeBy(sourceSite.practices, over.practices, "id");
  site.investigations = mergeBy(sourceSite.investigations, over.investigations, "id");
  site.insights = mergeBy(sourceSite.insights, over.insights, "slug");
  site.people = sourcePeople.map((person) => {
    const extra = over.people?.[person.slug] || {};
    return {
      ...person,
      ...extra,
      slug: person.slug,
      name: person.name,
      shortName: person.shortName,
      initials: person.initials,
      photo: person.photo,
      photoWidth: person.photoWidth,
      photoHeight: person.photoHeight,
      practicePhoto: person.practicePhoto,
      practicePhotoWidth: person.practicePhotoWidth,
      practicePhotoHeight: person.practicePhotoHeight,
      principal: person.principal,
      featured: person.featured,
      sraRegulated: person.sraRegulated,
      email: person.email,
      firm: person.firm,
      roleEn: person.role,
    };
  });

  const catalog = {
    locale,
    ui,
    site,
    home: merge(sourceHome, over.home),
    pages: merge(sourcePages, over.pages),
    insightBodies: merge(sourceBodies, over.insightBodies),
    serviceMatter: merge(sourceMatter, over.serviceMatter),
    trust: merge(sourceTrust, over.trust),
  };

  cache.set(id, catalog);
  return catalog;
}

export function runLocale(id, fn) {
  return als.run(buildCatalog(id), fn);
}

export function i18n() {
  return als.getStore() || buildCatalog(DEFAULT_LOCALE);
}

export function loc() {
  return i18n().locale;
}

export function t(key, vars) {
  const catalog = i18n();
  let value = catalog.ui[key] ?? UI.en[key] ?? key;
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
  }
  return value;
}

function catalogProxy(key) {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "then") return undefined;
        const target = i18n()[key];
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      has(_, prop) {
        return prop in i18n()[key];
      },
      ownKeys() {
        return Reflect.ownKeys(i18n()[key]);
      },
      getOwnPropertyDescriptor(_, prop) {
        return Object.getOwnPropertyDescriptor(i18n()[key], prop);
      },
    },
  );
}

export const site = catalogProxy("site");
export const home = catalogProxy("home");
export const pages = catalogProxy("pages");
export const insightBodies = catalogProxy("insightBodies");
export const serviceMatter = catalogProxy("serviceMatter");
export const trust = catalogProxy("trust");

export function pageHref(path, locale = loc()) {
  return localizePath(path, locale);
}

export function prefixHtml(html, locale = loc()) {
  if (!locale.prefix) return html;
  const rewrite = (path) => {
    if (!path.startsWith("/") || isAssetPath(path)) return path;
    if (path === locale.prefix || path.startsWith(`${locale.prefix}/`)) return path;
    for (const item of LOCALES) {
      if (item.prefix && (path === item.prefix || path.startsWith(`${item.prefix}/`))) return path;
    }
    return localizePath(path, locale);
  };
  return html
    .replaceAll(/(href|src)="(\/[^"]*)"/g, (_, attr, path) => `${attr}="${rewrite(path)}"`)
    .replaceAll(/url=(\/[^"'\s>]+)/g, (_, path) => `url=${rewrite(path)}`)
    .replaceAll(/"href":"(\/[^"]*)"/g, (_, path) => `"href":"${rewrite(path)}"`);
}

export function localizePath(path, locale) {
  return localizePathRaw(path, locale || loc());
}

export { LOCALES };
