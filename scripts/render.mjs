import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { site } from "../site.config.js";
import { allPages } from "../src/lib/pages.js";

const root = process.cwd();
const pages = allPages();

for (const page of pages) {
  const dest = join(root, page.file);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, page.html);
  console.log(`wrote ${page.file}`);
}

const origin = site.canonicalOrigin.replace(/\/$/, "");
const urls = pages
  .filter((page) => page.file !== "404.html")
  .map((page) => {
    const path = page.file === "index.html" ? "/" : `/${page.file.replace(/index\.html$/, "")}`;
    return `  <url><loc>${origin}${path}</loc></url>`;
  })
  .join("\n");

writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);

const robots = `User-agent: *\nDisallow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

writeFileSync(join(root, "public/robots.txt"), robots);
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
