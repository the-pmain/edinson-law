import { requestPath, requestUrl, sendJson } from "./http.js";
import { requireSupabase, supabaseHeaders } from "./supabase.js";

const DEFAULT_PER_PAGE = 20;
const MAX_PER_PAGE = 100;
const SELECT = "id,created_at,full_name,email,address,date_of_birth,pdf_path,instructed_person_slug";

export function isAdminPrepareClientsRequest(req) {
  return requestPath(req) === "/api/admin/prepare-clients";
}

export function parsePrepareClientsQuery(searchParams) {
  const pageRaw = Number.parseInt(String(searchParams.get("page") || "1"), 10);
  const perRaw = Number.parseInt(String(searchParams.get("per_page") || searchParams.get("limit") || DEFAULT_PER_PAGE), 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const per_page = Number.isFinite(perRaw) ? Math.min(MAX_PER_PAGE, Math.max(1, perRaw)) : DEFAULT_PER_PAGE;
  return { page, per_page };
}

function parseTotal(contentRange, fallback = 0) {
  const match = String(contentRange || "").match(/\/(\d+|\*)\s*$/);
  if (!match || match[1] === "*") return fallback;
  return Number.parseInt(match[1], 10) || fallback;
}

function pageMeta(page, per_page, total) {
  const total_pages = Math.max(1, Math.ceil(total / per_page) || 1);
  return {
    page,
    per_page,
    total,
    total_pages: total === 0 ? 0 : total_pages,
    has_prev: page > 1 && total > 0,
    has_next: total > 0 && page < total_pages,
  };
}

export async function listPrepareClients(query, env = process.env) {
  const { url, key, usingServiceRole } = requireSupabase(env);
  const from = (query.page - 1) * query.per_page;
  const to = from + query.per_page - 1;
  const endpoint = new URL("/rest/v1/prepare_clients", `${url}/`);
  endpoint.searchParams.set("select", SELECT);
  endpoint.searchParams.set("order", "created_at.desc,id.desc");

  const response = await fetch(endpoint, {
    headers: supabaseHeaders(key, {
      Range: `${from}-${to}`,
      "Range-Unit": "items",
      Prefer: "count=exact",
    }),
  });

  const detail = await response.text();
  if (response.status === 416) {
    const total = parseTotal(response.headers.get("content-range"), 0);
    return { items: [], ...pageMeta(query.page, query.per_page, total) };
  }
  if (!response.ok) {
    const error = new Error("Could not load client records.");
    error.status = response.status;
    error.detail = detail;
    if (detail.includes("42501") || detail.includes("row-level security")) {
      error.hint = usingServiceRole
        ? "Row-level security blocked this read."
        : "Row-level security blocked this read. Add SUPABASE_SERVICE_ROLE_KEY to .env.";
    }
    throw error;
  }

  let items = [];
  if (detail.trim()) {
    try {
      items = JSON.parse(detail);
    } catch {
      const error = new Error("Could not load client records.");
      error.status = 502;
      error.detail = detail;
      throw error;
    }
  }
  if (!Array.isArray(items)) items = [];
  const total = parseTotal(response.headers.get("content-range"), items.length);
  return { items, ...pageMeta(query.page, query.per_page, total) };
}

export async function handleAdminPrepareClients(req, res, env = process.env) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "X-Robots-Tag": "noindex, nofollow" });
    res.end();
    return;
  }
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  try {
    const query = parsePrepareClientsQuery(requestUrl(req).searchParams);
    const result = await listPrepareClients(query, env);
    sendJson(res, 200, result);
  } catch (error) {
    console.error(error.detail || error.message || error);
    sendJson(res, error.status === 500 ? 500 : 502, {
      error: error.message || "Could not load client records.",
      ...(error.hint ? { hint: error.hint } : {}),
    });
  }
}
