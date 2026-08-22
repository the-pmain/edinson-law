import { defineConfig } from "vite";
import { readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

function htmlInputs(dir, acc = {}) {
  for (const name of readdirSync(dir)) {
    if (["node_modules", "dist", "src", "scripts", "public", ".git"].includes(name)) {
      continue;
    }
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      htmlInputs(full, acc);
    } else if (name.endsWith(".html")) {
      const key = relative(dir, full).replace(/\\/g, "/").replace(/\.html$/, "");
      acc[key || "home"] = full;
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
