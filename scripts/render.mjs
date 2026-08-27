import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { site } from "../site.config.js";
import { formatOutstandingReport } from "../src/config/trust.js";
import { LOCALES, localizePath, runLocale } from "../src/i18n/catalog.js";
import { allPages } from "../src/lib/pages.js";

const PLACEHOLDER = /VERIFY_|NEEDS_CLIENT_INPUT/;
const root = process.cwd();
const SKIP_WALK = new Set(["node_modules", ".git", "dist", "src", "scripts", "public", "tmp-shots"]);

function pagesFor(locale) {
  return runLocale(locale.id, () =>
    allPages().map((page) => ({
      ...page,
      file: locale.dir ? join(locale.dir, page.file).replaceAll("\\", "/") : page.file,
      locale,
    })),
  );
}

const pages = LOCALES.flatMap(pagesFor);
const leaks = [];

function cleanPeople(dir, prefix) {
  if (!existsSync(dir)) return;
  const current = new Set(
    pages
      .map((page) => page.file.match(new RegExp(`^${prefix}people/([^/]+)/index\\.html$`))?.[1])
      .filter(Boolean),
  );
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || current.has(entry.name)) continue;
    rmSync(join(dir, entry.name), { recursive: true, force: true });
    console.log(`removed stale ${prefix}people/${entry.name}/`);
  }
}

cleanPeople(join(root, "people"), "");
for (const locale of LOCALES) {
  if (!locale.dir) continue;
  cleanPeople(join(root, locale.dir, "people"), `${locale.dir}/`);
}

for (const locale of LOCALES) {
  if (!locale.dir) continue;
  const dir = join(root, locale.dir);
  if (existsSync(dir)) continue;
  mkdirSync(dir, { recursive: true });
}

for (const page of pages) {
  const dest = join(root, page.file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, page.html);
  console.log(`wrote ${page.file}`);
}

function walkHtml(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_WALK.has(name)) continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walkHtml(path, acc);
    else if (name.endsWith(".html")) acc.push(path);
  }
  return acc;
}

for (const file of walkHtml(root)) {
  const html = readFileSync(file, "utf8");
  if (PLACEHOLDER.test(html)) leaks.push(file.replace(`${root}\\`, "").replace(`${root}/`, ""));
}

const origin = site.canonicalOrigin.replace(/\/$/, "");

function publicPath(file) {
  if (file.endsWith("404.html")) return null;
  if (file === "index.html") return "/";
  return `/${file.replace(/index\.html$/, "")}`;
}

function sourcePathFor(file, locale) {
  const relative = locale.dir ? file.slice(locale.dir.length + 1) : file;
  if (relative === "index.html") return "/";
  if (relative.endsWith("404.html")) return "/404.html";
  return `/${relative.replace(/index\.html$/, "")}`;
}

const urls = pages
  .filter((page) => publicPath(page.file))
  .map((page) => {
    const locPath = publicPath(page.file);
    const source = sourcePathFor(page.file, page.locale);
    const alternates = LOCALES.map(
      (item) =>
        `    <xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${origin}${localizePath(source, item)}"/>`,
    ).join("\n");
    const defaultLink = `    <xhtml:link rel="alternate" hreflang="x-default" href="${origin}${localizePath(source, LOCALES[0])}"/>`;
    return `  <url>\n    <loc>${origin}${locPath}</loc>\n${alternates}\n${defaultLink}\n  </url>`;
  })
  .join("\n");

writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
);

writeFileSync(
  join(root, "public/robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
);
writeFileSync(
  join(root, "public/site.webmanifest"),
  JSON.stringify(
    {
      name: "Edison Law",
      short_name: "Edison Law",
      description: site.masterLine,
      start_url: "/",
      display: "standalone",
      background_color: site.backgroundColor,
      theme_color: site.themeColor,
      lang: site.lang,
      icons: [
        { src: "/favicon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
        { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    null,
    2,
  ),
);
writeFileSync(
  join(root, "public/browserconfig.xml"),
  `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/android-chrome-192x192.png"/>
      <TileColor>${site.themeColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>
`,
);

console.log(`rendered ${pages.length} pages (${site.mode}) across ${LOCALES.length} locales`);
console.log(`\n${formatOutstandingReport()}`);

if (leaks.length) {
  console.error("Placeholder strings leaked into rendered HTML:");
  for (const file of leaks) console.error(`  ${file}`);
  process.exit(1);
}
