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
import { allPages } from "../src/lib/pages.js";

const PLACEHOLDER = /VERIFY_|NEEDS_CLIENT_INPUT/;

const root = process.cwd();
const pages = allPages();
const leaks = [];

const peopleDir = join(root, "people");
const currentPeople = new Set(
  pages
    .map((page) => page.file.match(/^people\/([^/]+)\/index\.html$/)?.[1])
    .filter(Boolean),
);

if (existsSync(peopleDir)) {
  for (const entry of readdirSync(peopleDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || currentPeople.has(entry.name)) continue;
    rmSync(join(peopleDir, entry.name), { recursive: true, force: true });
    console.log(`removed stale people/${entry.name}/`);
  }
}

for (const page of pages) {
  const dest = join(root, page.file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, page.html);
  console.log(`wrote ${page.file}`);
}

function walkHtml(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "dist") continue;
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

writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`,
);

writeFileSync(
  join(root, "public/robots.txt"),
  "User-agent: *\nDisallow: /\n",
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

console.log(`rendered ${pages.length} pages (${site.mode})`);
console.log(`\n${formatOutstandingReport()}`);

if (leaks.length) {
  console.error("Placeholder strings leaked into rendered HTML:");
  for (const file of leaks) console.error(`  ${file}`);
  process.exit(1);
}
