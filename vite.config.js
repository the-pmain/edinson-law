import { defineConfig, loadEnv } from "vite";
import { readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { handleAdminPrepareClients, isAdminPrepareClientsRequest } from "./server/admin-prepare-clients.js";
import { handlePrepareClients, isPrepareClientsRequest } from "./server/prepare-clients.js";

function htmlInputs(dir, acc = {}, root = dir) {
  for (const name of readdirSync(dir)) {
    if (["node_modules", "dist", "src", "scripts", "public", "server", "projects", ".git", "tmp-shots"].includes(name)) {
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

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    appType: "mpa",
    publicDir: "public",
    server: {
      port: 5173,
      host: true,
      open: true,
    },
    plugins: [
      {
        name: "prepare-clients-api",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = new URL(req.url || "/", "http://localhost");
            if (url.pathname === "/admin") {
              res.writeHead(302, { Location: `/admin/${url.search}` });
              res.end();
              return;
            }
            const path = url.pathname;
            if (path === "/admin/" || path.startsWith("/admin/")) {
              res.setHeader("X-Robots-Tag", "noindex, nofollow");
              res.setHeader("Cache-Control", "no-store");
            }
            if (isAdminPrepareClientsRequest(req)) {
              handleAdminPrepareClients(req, res, env).catch(next);
              return;
            }
            if (!isPrepareClientsRequest(req)) {
              next();
              return;
            }
            handlePrepareClients(req, res, env).catch(next);
          });
        },
        configurePreviewServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = new URL(req.url || "/", "http://localhost");
            if (url.pathname === "/admin") {
              res.writeHead(302, { Location: `/admin/${url.search}` });
              res.end();
              return;
            }
            next();
          });
        },
      },
    ],
    build: {
      rollupOptions: {
        input: htmlInputs(resolve(".")),
      },
    },
  };
});
