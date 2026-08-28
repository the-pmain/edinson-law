import { readJsonBody, requestPath, sendJson } from "./http.js";
import { requireSupabase, supabaseHeaders } from "./supabase.js";
import { normalizeOccupation, TEXT_FIELD_MAX } from "../src/js/prepare-clients-model.js";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export { readJsonBody };

export function isPrepareClientsRequest(req) {
  return requestPath(req) === "/api/prepare-clients";
}

export function validatePrepareClient(input = {}) {
  const full_name = String(input.full_name || "").trim();
  const email = String(input.email || "").trim().toLowerCase();
  const date_of_birth = String(input.date_of_birth || "").trim();
  const phone = String(input.phone || "").trim().slice(0, TEXT_FIELD_MAX);
  const occupation = normalizeOccupation(input.occupation);
  const slug = String(input.instructed_person_slug || "").trim();

  if (full_name.length < 1) return { error: "Enter your name." };
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };
  if (phone.replace(/\D/g, "").length < 8) return { error: "Enter your telephone number." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date_of_birth)) return { error: "Enter your date of birth." };
  if (date_of_birth > todayIso()) return { error: "Date of birth cannot be in the future." };

  return {
    row: {
      full_name,
      email,
      date_of_birth,
      phone,
      occupation,
      instructed_person_slug: slug || null,
    },
  };
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

function missingField(message) {
  const text = String(message || "");
  return text.match(/field "([^"]+)"/)?.[1]
    || text.match(/Could not find the '([^']+)' column/)?.[1]
    || text.match(/column ["']?[\w.]+["']?\.["']?(\w+)/)?.[1]
    || text.match(/column "([^"]+)"/)?.[1]
    || "";
}

export function saveErrorPayload(error) {
  const parsed = parseDetail(error?.detail);
  const code = String(parsed?.code || "");
  const message = String(parsed?.message || error?.message || "").trim();
  const field = missingField(message);

  if (code === "42703") {
    return {
      error: field
        ? `The database trigger still references ${field}, which is not on prepare_clients.`
        : "The database trigger references a column that is not on prepare_clients.",
      code,
      message,
      ...(field ? { field } : {}),
      hint: "Run server/prepare_clients.sql in the Supabase SQL editor so the trigger only trims full_name, email, phone, occupation and instructed_person_slug.",
    };
  }

  if (code === "PGRST204") {
    return {
      error: message || "The save payload includes a column that is not on prepare_clients.",
      code,
      message,
      ...(field ? { field } : {}),
    };
  }

  return {
    error: message || "Could not save the client record.",
    ...(code ? { code } : {}),
    ...(message && message !== error?.message ? { message } : {}),
  };
}

function responseStatus(error) {
  if (error?.status === 500) return 500;
  const status = Number(error?.status);
  if (Number.isInteger(status) && status >= 400 && status < 600) return status;
  return 502;
}

export async function insertPrepareClient(row, env = process.env) {
  const { url, key } = requireSupabase(env);
  const response = await fetch(`${url}/rest/v1/prepare_clients`, {
    method: "POST",
    headers: supabaseHeaders(key, {
      Accept: "application/json",
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(row),
  });

  const detail = await response.text();
  if (!response.ok) {
    const error = new Error("Could not save the client record.");
    error.status = response.status;
    error.detail = detail;
    throw error;
  }

  let rows = [];
  if (detail.trim()) {
    try {
      rows = JSON.parse(detail);
    } catch {
      const error = new Error("Could not save the client record.");
      error.status = 502;
      error.detail = detail;
      throw error;
    }
  }
  if (!Array.isArray(rows) || rows.length === 0) {
    const error = new Error("Could not save the client record.");
    error.status = 502;
    error.detail = JSON.stringify({
      message: "Insert returned no row. Row-level security may be blocking writes.",
    });
    throw error;
  }
}

export async function handlePrepareClients(req, res, env = process.env) {
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed." });
    return;
  }

  try {
    const input = await readJsonBody(req);
    const checked = validatePrepareClient(input);
    if (checked.error) {
      sendJson(res, 400, { error: checked.error });
      return;
    }
    await insertPrepareClient(checked.row, env);
    sendJson(res, 201, { ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) {
      sendJson(res, 400, { error: "Invalid JSON." });
      return;
    }
    console.error(error.detail || error.message || error);
    sendJson(res, responseStatus(error), saveErrorPayload(error));
  }
}
