import { readJsonBody, requestPath, sendJson } from "./http.js";
import { requireSupabase, supabaseHeaders } from "./supabase.js";

const EMAIL_OK = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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

function extrasPath(input, occupation) {
  const fromJson = (() => {
    try {
      const parsed = JSON.parse(String(input.pdf_path || ""));
      if (parsed && typeof parsed === "object") return parsed;
    } catch {
      return null;
    }
    return null;
  })();
  const phone = String(fromJson?.phone || input.phone || "").trim().slice(0, 80);
  const job = String(fromJson?.occupation || input.occupation || occupation || "").trim().slice(0, 120);
  return JSON.stringify({ phone, occupation: job });
}

export function validatePrepareClient(input = {}) {
  const full_name = String(input.full_name || "").trim();
  const email = String(input.email || "").trim().toLowerCase();
  const address = String(input.address || input.occupation || "").trim();
  const date_of_birth = String(input.date_of_birth || "").trim();
  const slug = String(input.instructed_person_slug || "").trim();
  const pdf_path = extrasPath(input, address);

  if (full_name.length < 1) return { error: "Enter your name." };
  if (!EMAIL_OK.test(email)) return { error: "Enter a valid email address." };
  if (address.length < 1) return { error: "Enter your occupation." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date_of_birth)) return { error: "Enter your date of birth." };
  if (date_of_birth > todayIso()) return { error: "Date of birth cannot be in the future." };
  if (!JSON.parse(pdf_path).phone) return { error: "Enter your telephone number." };

  return {
    row: {
      full_name,
      email,
      address,
      date_of_birth,
      pdf_path,
      instructed_person_slug: slug || null,
    },
  };
}

export async function insertPrepareClient(row, env = process.env) {
  const { url, key } = requireSupabase(env);
  const response = await fetch(`${url}/rest/v1/prepare_clients`, {
    method: "POST",
    headers: supabaseHeaders(key, {
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const detail = await response.text();
    const error = new Error("Could not save the client record.");
    error.status = response.status;
    error.detail = detail;
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
    sendJson(res, error.status === 500 ? 500 : 502, {
      error: "Could not save the client record.",
    });
  }
}
