export const DOCUMENT_KINDS = ["agreement", "claim", "p2p", "matter", "release", "tracing"];

/** Nested on claim when written to live clients_documents (top-level keys stay agreement, claim, release). */
export const NESTED_ON_CLAIM = ["p2p", "matter", "tracing"];

/** Kinds the admin menu can create or edit. Authority is preview-only from the client record. */
export const COMPOSE_KINDS = ["claim", "p2p", "matter", "release", "tracing"];

export const DOCUMENT_LABELS = {
  agreement: "Client authority form",
  claim: "Victim claim",
  p2p: "P2P agreement",
  matter: "Application of release order",
  release: "Release order",
  tracing: "Tracing report",
};

export const DOCUMENT_SHORT_LABELS = {
  agreement: "Authority",
  claim: "Victim claim",
  p2p: "P2P agreement",
  matter: "Application of release order",
  release: "Release order",
  tracing: "Tracing report",
};

export const EMPTY_DOCUMENTS = {
  agreement: null,
  claim: null,
  p2p: null,
  matter: null,
  release: null,
  tracing: null,
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const FIELD_MAX = 8000;
const FIELD_KEYS_MAX = 80;

export function isUuid(value) {
  return UUID_RE.test(String(value || ""));
}

export function isDocumentKind(kind) {
  return DOCUMENT_KINDS.includes(String(kind || ""));
}

export function emptyDocuments() {
  return { ...EMPTY_DOCUMENTS };
}

function asObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}

function savedEntry(value) {
  const obj = asObject(value);
  if (!obj) return null;
  if (!asObject(obj.fields) && obj.saved_at == null) return null;
  return {
    fields: asObject(obj.fields) || {},
    saved_at: obj.saved_at == null ? null : String(obj.saved_at),
  };
}

function nestedOnClaim(raw, key) {
  return savedEntry(raw[key]) || savedEntry(asObject(raw.claim)?.[key]);
}

export function normalizeDocuments(value) {
  const raw = asObject(value) || {};
  return {
    agreement: savedEntry(raw.agreement) || asObject(raw.agreement),
    claim: savedEntry(raw.claim),
    p2p: nestedOnClaim(raw, "p2p"),
    matter: nestedOnClaim(raw, "matter"),
    tracing: nestedOnClaim(raw, "tracing"),
    release: savedEntry(raw.release) || asObject(raw.release),
  };
}

/** Live clients_documents only allows top-level agreement, claim, release. P2P, matter and tracing sit on claim. */
export function persistDocuments(value) {
  const normalized = normalizeDocuments(value);
  const { agreement, claim, release } = normalized;
  const nested = NESTED_ON_CLAIM.filter((key) => normalized[key]);
  let claimOut = null;
  if (claim || nested.length) {
    claimOut = {};
    if (claim) {
      claimOut.fields = claim.fields;
      if (claim.saved_at) claimOut.saved_at = claim.saved_at;
    }
    nested.forEach((key) => {
      claimOut[key] = normalized[key];
    });
  }
  return {
    agreement: agreement || null,
    claim: claimOut,
    release: release || null,
  };
}

export function kindSaved(documents, kind) {
  if (!isDocumentKind(kind)) return false;
  return Boolean(asObject(normalizeDocuments(documents)[kind]));
}

export function savedKinds(documents) {
  const normalized = normalizeDocuments(documents);
  return DOCUMENT_KINDS.filter((kind) => Boolean(asObject(normalized[kind])));
}

export function fieldsForKind(documents, kind) {
  const entry = asObject(normalizeDocuments(documents)[kind]);
  if (!entry) return {};
  const fields = asObject(entry.fields) || entry;
  const out = {};
  Object.entries(fields).forEach(([key, value]) => {
    if (key === "saved_at" || key === "fields" || NESTED_ON_CLAIM.includes(key)) return;
    out[key] = value == null ? "" : String(value);
  });
  return out;
}

export function sanitizeFields(input = {}) {
  const raw = asObject(input) || {};
  const fields = {};
  const keys = Object.keys(raw).slice(0, FIELD_KEYS_MAX);
  for (const key of keys) {
    if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(key)) continue;
    if (key === "saved_at" || key === "fields") continue;
    fields[key] = String(raw[key] ?? "").trim().slice(0, FIELD_MAX);
  }
  return fields;
}

export function mergeKind(documents, kind, fields, savedAt = new Date().toISOString()) {
  if (!isDocumentKind(kind)) {
    throw new Error("Unknown document kind.");
  }
  const next = normalizeDocuments(documents);
  next[kind] = {
    fields: sanitizeFields(fields),
    saved_at: String(savedAt),
  };
  return next;
}
