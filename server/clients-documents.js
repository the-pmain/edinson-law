import { readJsonBody, requestPath, sendJson } from "./http.js";
import { requireSupabase, supabaseHeaders } from "./supabase.js";
import {
  isDocumentKind,
  isUuid,
  mergeKind,
  normalizeDocuments,
  persistDocuments,
  sanitizeFields,
} from "../src/js/clients-documents-model.js";

const SELECT = "id,prepare_client_id,documents,created_at,updated_at";

export function isAdminClientsDocumentsRequest(req) {
  return requestPath(req) === "/api/admin/clients-documents";
}

function parseDetail(detail) {
  if (!detail) return null;
  if (typeof detail === "object") return detail;
  try {
    return JSON.parse(detail);
  } catch {
    const text = String(detail).trim();
    return text ? { message: text } : null;
  }
}

function supabaseError(message, response, detail) {
  const error = new Error(message);
  error.status = response.status;
  error.detail = detail;
  const parsed = parseDetail(detail);
  const code = String(parsed?.code || "");
  const text = String(parsed?.message || detail || "");
  if (code === "42P01" || /relation .* does not exist/i.test(text)) {
    error.hint = "Create public.clients_documents in the Supabase SQL editor.";
  } else if (code === "42703" || /column .* does not exist/i.test(text)) {
    error.hint = "clients_documents is missing a column the app expects (id, prepare_client_id, documents).";
  } else if (code === "23503") {
    error.hint = "That client record was not found.";
  } else if (code === "23514") {
    error.hint = "documents must stay an object of agreement, claim and release. P2P agreement, application of release order and tracing report are stored on claim.";
  } else if (code === "42501" || text.includes("row-level security")) {
    error.hint = "Row-level security blocked this write.";
  }
  return error;
}

async function readJsonResponse(response, fallbackMessage) {
  const detail = await response.text();
  if (!response.ok) throw supabaseError(fallbackMessage, response, detail);
  if (!detail.trim()) return [];
  try {
    return JSON.parse(detail);
  } catch {
    throw supabaseError(fallbackMessage, { status: 502 }, detail);
  }
}

export function validateDocumentWrite(input = {}) {
  const prepare_client_id = String(input.prepare_client_id || "").trim();
  const kind = String(input.kind || "").trim();
  if (!isUuid(prepare_client_id)) return { error: "That client record could not be found." };
  if (!isDocumentKind(kind)) return { error: "Choose a document type." };
  return {
    prepare_client_id,
    kind,
    fields: sanitizeFields(input.fields),
  };
}

export function attachDocuments(items, rows) {
  const byClient = new Map();
  (Array.isArray(rows) ? rows : []).forEach((row) => {
    if (!row?.prepare_client_id) return;
    byClient.set(row.prepare_client_id, {
      id: row.id,
      documents: normalizeDocuments(row.documents),
      updated_at: row.updated_at || null,
    });
  });
  return (Array.isArray(items) ? items : []).map((item) => {
    const found = item?.id ? byClient.get(item.id) : null;
    return {
      ...item,
      document_id: found?.id || null,
      documents: found?.documents || normalizeDocuments(null),
    };
  });
}

async function rest(env, path, options = {}) {
  const { url, key } = requireSupabase(env);
  return fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: supabaseHeaders(key, {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    }),
  });
}

export async function listDocumentsForClients(ids, env = process.env) {
  const unique = [...new Set((ids || []).filter(isUuid))];
  if (!unique.length) return [];
  const endpoint = new URL("clients_documents", "http://local/");
  endpoint.searchParams.set("select", SELECT);
  endpoint.searchParams.set("prepare_client_id", `in.(${unique.join(",")})`);
  const response = await rest(env, `clients_documents?${endpoint.searchParams.toString()}`);
  const rows = await readJsonResponse(response, "Could not load saved documents.");
  return Array.isArray(rows) ? rows : [];
}

export async function getDocumentsRow(prepareClientId, env = process.env) {
  const response = await rest(
    env,
    `clients_documents?prepare_client_id=eq.${prepareClientId}&select=${SELECT}&limit=1`,
  );
  const rows = await readJsonResponse(response, "Could not load saved documents.");
  return Array.isArray(rows) && rows[0] ? rows[0] : null;
}

async function insertDocumentsRow(prepareClientId, documents, env = process.env) {
  const response = await rest(env, "clients_documents", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({
      prepare_client_id: prepareClientId,
      documents,
    }),
  });
  const rows = await readJsonResponse(response, "Could not save the document.");
  if (!Array.isArray(rows) || !rows[0]) {
    const error = new Error("Could not save the document.");
    error.status = 502;
    throw error;
  }
  return rows[0];
}

async function updateDocumentsRow(id, documents, env = process.env) {
  const response = await rest(env, `clients_documents?id=eq.${id}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ documents }),
  });
  const rows = await readJsonResponse(response, "Could not save the document.");
  if (!Array.isArray(rows) || !rows[0]) {
    const error = new Error("Could not save the document.");
    error.status = 502;
    throw error;
  }
  return rows[0];
}

export async function upsertDocumentKind({ prepare_client_id, kind, fields }, env = process.env) {
  const existing = await getDocumentsRow(prepare_client_id, env);
  const documents = persistDocuments(mergeKind(existing?.documents, kind, fields));
  const row = existing?.id
    ? await updateDocumentsRow(existing.id, documents, env)
    : await insertDocumentsRow(prepare_client_id, documents, env);
  return {
    id: row.id,
    prepare_client_id: row.prepare_client_id,
    documents: normalizeDocuments(row.documents),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function responseStatus(error) {
  if (error?.status === 500) return 500;
  const status = Number(error?.status);
  if (Number.isInteger(status) && status >= 400 && status < 600) return status;
  return 502;
}

export async function handleAdminClientsDocuments(req, res, env = process.env) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, { "X-Robots-Tag": "noindex, nofollow" });
    res.end();
    return;
  }
  if (req.method !== "PUT") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  try {
    const input = await readJsonBody(req);
    const checked = validateDocumentWrite(input);
    if (checked.error) {
      sendJson(res, 400, { error: checked.error });
      return;
    }
    const row = await upsertDocumentKind(checked, env);
    sendJson(res, 200, row);
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: "Invalid JSON." });
      return;
    }
    console.error(error.detail || error.message || error);
    sendJson(res, responseStatus(error), {
      error: error.message || "Could not save the document.",
      ...(error.hint ? { hint: error.hint } : {}),
    });
  }
}
