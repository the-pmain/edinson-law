import { isUuid } from "../src/js/clients-documents-model.js";
import { normalizeIsTest, PREPARE_CLIENTS_SELECT } from "../src/js/prepare-clients-model.js";
import { attachDocuments, listDocumentsForClients } from "./clients-documents.js";
import { readJsonBody, requestPath, requestUrl, sendJson } from "./http.js";
import { requireSupabase, supabaseHeaders } from "./supabase.js";

const DEFAULT_PER_PAGE = 20;
const MAX_PER_PAGE = 100;

export function isAdminPrepareClientsRequest(req) {
  return requestPath(req) === "/api/admin/prepare-clients";
}

export function parsePrepareClientsQuery(searchParams) {
  const pageRaw = Number.parseInt(String(searchParams.get("page") || "1"), 10);
  const perRaw = Number.parseInt(String(searchParams.get("per_page") || searchParams.get("limit") || DEFAULT_PER_PAGE), 10);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;
  const per_page = Number.isFinite(perRaw) ? Math.min(MAX_PER_PAGE, Math.max(1, perRaw)) : DEFAULT_PER_PAGE;
  const isTestRaw = String(searchParams.get("is_test") || "").trim().toLowerCase();
  const is_test = isTestRaw === "true" ? true : isTestRaw === "false" ? false : undefined;
  return { page, per_page, ...(is_test === undefined ? {} : { is_test }) };
}

export function validatePrepareClientIsTest(input = {}) {
  const id = String(input.id || "").trim();
  if (!isUuid(id)) return { error: "That client record could not be found." };
  if (typeof input.is_test !== "boolean") return { error: "Mark whether this client is a test record." };
  return { id, is_test: input.is_test };
}

function withIsTest(item) {
  return { ...item, is_test: normalizeIsTest(item?.is_test) };
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
  endpoint.searchParams.set("select", PREPARE_CLIENTS_SELECT);
  endpoint.searchParams.set("order", "created_at.desc,id.desc");
  if (typeof query.is_test === "boolean") {
    endpoint.searchParams.set("is_test", `eq.${query.is_test}`);
  }

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
    } else if (detail.includes("42703") || /column .* does not exist/i.test(detail)) {
      error.hint = "Run server/prepare_clients.sql in the Supabase SQL editor so prepare_clients includes is_test.";
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
  items = items.map(withIsTest);
  const total = parseTotal(response.headers.get("content-range"), items.length);
  const rows = await listDocumentsForClients(items.map((item) => item.id), env);
  return { items: attachDocuments(items, rows), ...pageMeta(query.page, query.per_page, total) };
}

export async function updatePrepareClientIsTest({ id, is_test }, env = process.env) {
  const { url, key, usingServiceRole } = requireSupabase(env);
  const endpoint = new URL("/rest/v1/prepare_clients", `${url}/`);
  endpoint.searchParams.set("id", `eq.${id}`);
  endpoint.searchParams.set("select", PREPARE_CLIENTS_SELECT);

  const response = await fetch(endpoint, {
    method: "PATCH",
    headers: supabaseHeaders(key, {
      Accept: "application/json",
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify({ is_test }),
  });

  const detail = await response.text();
  if (!response.ok) {
    const error = new Error("Could not update the client record.");
    error.status = response.status;
    error.detail = detail;
    if (detail.includes("42501") || detail.includes("row-level security")) {
      error.hint = usingServiceRole
        ? "Row-level security blocked this write."
        : "Row-level security blocked this write. Add SUPABASE_SERVICE_ROLE_KEY to .env.";
    } else if (detail.includes("42703") || /column .* does not exist/i.test(detail)) {
      error.hint = "Run server/prepare_clients.sql in the Supabase SQL editor so prepare_clients includes is_test.";
    }
    throw error;
  }

  let rows = [];
  if (detail.trim()) {
    try {
      rows = JSON.parse(detail);
    } catch {
      const error = new Error("Could not update the client record.");
      error.status = 502;
      error.detail = detail;
      throw error;
    }
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    const error = new Error("That client record could not be found.");
    error.status = 404;
    throw error;
  }
  return withIsTest(rows[0]);
}

export async function handleAdminPrepareClients(req, res, env = process.env) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "X-Robots-Tag": "noindex, nofollow" });
    res.end();
    return;
  }
  if (req.method !== "GET" && req.method !== "PATCH") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  try {
    if (req.method === "PATCH") {
      const input = await readJsonBody(req);
      const checked = validatePrepareClientIsTest(input);
      if (checked.error) {
        sendJson(res, 400, { error: checked.error });
        return;
      }
      const item = await updatePrepareClientIsTest(checked, env);
      sendJson(res, 200, { item });
      return;
    }

    const query = parsePrepareClientsQuery(requestUrl(req).searchParams);
    const result = await listPrepareClients(query, env);
    sendJson(res, 200, result);
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: "Invalid JSON." });
      return;
    }
    console.error(error.detail || error.message || error);
    const fallback = req.method === "PATCH"
      ? "Could not update the client record."
      : "Could not load client records.";
    sendJson(res, error.status === 500 ? 500 : error.status === 404 ? 404 : 502, {
      error: error.message || fallback,
      ...(error.hint ? { hint: error.hint } : {}),
    });
  }
}
