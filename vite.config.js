import { defineConfig } from "vite";
import { readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

function htmlInputs(dir, acc = {}, root = dir) {
  for (const name of readdirSync(dir)) {
    if (["node_modules", "dist", "src", "scripts", "public", ".git", "tmp-shots"].includes(name)) {
      continue;
    }
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      htmlInputs(full, acc, root);
    } else if (name.endsWith(".html")) {
      const key = relative(root, full).replace(/\\/g, "/").replace(/\.html$/, "").replaceAll("/", "__") || "home";
      acc[key] = full;
    }
  }
  return acc;
}

export default defineConfig({
  appType: "mpa",
  publicDir: "public",
  server: {
    port: 5173,
    host: true,
    open: true,
  },
  build: {
    rollupOptions: {
      input: htmlInputs(resolve(".")),
    },
  },
});
