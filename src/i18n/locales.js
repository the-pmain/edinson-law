/**
 * Locale registry. English is unprefixed. Add a language by:
 * 1. appending an entry here
 * 2. adding chrome strings in ui.js
 * 3. adding src/i18n/overlays/<id>/ with translated copy
 * 4. importing that overlay in catalog.js
 */
export const DEFAULT_LOCALE = "en";

export const LOCALES = [
  {
    id: "en",
    prefix: "",
    dir: "",
    htmlLang: "en-GB",
    hreflang: "en-GB",
    ogLocale: "en_GB",
    dateLocale: "en-GB",
    code: "EN",
    nativeName: "English",
    englishName: "English",
    match: ["en"],
  },
  {
    id: "sv",
    prefix: "/sv",
    dir: "sv",
    htmlLang: "sv-SE",
    hreflang: "sv-SE",
    ogLocale: "sv_SE",
    dateLocale: "sv-SE",
    code: "SV",
    nativeName: "Svenska",
    englishName: "Swedish",
    match: ["sv"],
  },
  {
    id: "nb",
    prefix: "/nb",
    dir: "nb",
    htmlLang: "nb-NO",
    hreflang: "nb-NO",
    ogLocale: "nb_NO",
    dateLocale: "nb-NO",
    code: "NO",
    nativeName: "Norsk",
    englishName: "Norwegian",
    match: ["nb", "nn", "no"],
  },
  {
    id: "da",
    prefix: "/da",
    dir: "da",
    htmlLang: "da-DK",
    hreflang: "da-DK",
    ogLocale: "da_DK",
    dateLocale: "da-DK",
    code: "DA",
    nativeName: "Dansk",
    englishName: "Danish",
    match: ["da"],
  },
  {
    id: "de",
    prefix: "/de",
    dir: "de",
    htmlLang: "de-DE",
    hreflang: "de-DE",
    ogLocale: "de_DE",
    dateLocale: "de-DE",
    code: "DE",
    nativeName: "Deutsch",
    englishName: "German",
    match: ["de"],
  },
];

export const LOCALE_BY_ID = Object.fromEntries(LOCALES.map((item) => [item.id, item]));

export function localeById(id) {
  return LOCALE_BY_ID[id] || LOCALE_BY_ID[DEFAULT_LOCALE];
}

export function localizePath(path, locale) {
  const loc = typeof locale === "string" ? localeById(locale) : locale;
  const raw = path || "/";
  if (raw.startsWith("http") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("#")) {
    return raw;
  }
  if (!loc?.prefix) return raw;
  if (raw === "/404.html") return `${loc.prefix}/404.html`;
  if (raw === "/") return `${loc.prefix}/`;
  return `${loc.prefix}${raw}`;
}

const ASSET = /^\/(src|brand|fonts|images|favicon|apple-touch|android-chrome|og-image|site\.webmanifest|browserconfig|robots\.txt|sitemap)/;

export function isAssetPath(path) {
  return ASSET.test(path);
}
