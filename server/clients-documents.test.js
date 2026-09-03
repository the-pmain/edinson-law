import assert from "node:assert/strict";
import { test } from "node:test";
import {
  attachDocuments,
  validateDocumentWrite,
} from "./clients-documents.js";
import {
  fieldsForKind,
  kindSaved,
  mergeKind,
  normalizeDocuments,
  persistDocuments,
  savedKinds,
  sanitizeFields,
} from "../src/js/clients-documents-model.js";

test("validateDocumentWrite rejects a missing client id", () => {
  const result = validateDocumentWrite({ kind: "claim", fields: { court: "X" } });
  assert.equal(result.error, "That client record could not be found.");
});

test("validateDocumentWrite rejects an unknown kind", () => {
  const result = validateDocumentWrite({
    prepare_client_id: "28dc9899-9f50-4c4b-8784-ccbda7d72a13",
    kind: "invoice",
  });
  assert.equal(result.error, "Choose a document type.");
});

test("validateDocumentWrite keeps only safe field keys", () => {
  const result = validateDocumentWrite({
    prepare_client_id: "28dc9899-9f50-4c4b-8784-ccbda7d72a13",
    kind: "release",
    fields: { court: "  City  ", "bad key": "no", saved_at: "ignore-me" },
  });
  assert.equal(result.error, undefined);
  assert.equal(result.kind, "release");
  assert.equal(result.fields.court, "City");
  assert.equal(result.fields["bad key"], undefined);
});

test("mergeKind writes one document without dropping the others", () => {
  const first = mergeKind(null, "agreement", { clientName: "Jane" }, "2026-01-01T00:00:00.000Z");
  const next = mergeKind(first, "claim", { crimeRef: "NFRC1" }, "2026-01-02T00:00:00.000Z");
  assert.equal(kindSaved(next, "agreement"), true);
  assert.equal(kindSaved(next, "claim"), true);
  assert.equal(kindSaved(next, "release"), false);
  assert.equal(kindSaved(next, "matter"), false);
  assert.deepEqual(savedKinds(next), ["agreement", "claim"]);
  assert.equal(fieldsForKind(next, "agreement").clientName, "Jane");
  assert.equal(next.claim.saved_at, "2026-01-02T00:00:00.000Z");
});

test("normalizeDocuments drops extra keys", () => {
  const documents = normalizeDocuments({
    agreement: { fields: { a: "1" } },
    claim: null,
    matter: { fields: { court: "X" } },
    release: null,
    extra: { no: true },
  });
  assert.equal("extra" in documents, false);
  assert.equal(documents.claim, null);
  assert.equal(documents.matter.fields.court, "X");
});

test("mergeKind stores Application of release order without dropping claim", () => {
  const next = mergeKind(
    { agreement: null, claim: { fields: { crimeRef: "NFRC1" }, saved_at: "2026-01-02T00:00:00.000Z" } },
    "matter",
    { court: "City of London Magistrates' Court" },
    "2026-01-03T00:00:00.000Z",
  );
  assert.equal(kindSaved(next, "claim"), true);
  assert.equal(kindSaved(next, "matter"), true);
  assert.equal(fieldsForKind(next, "matter").court, "City of London Magistrates' Court");
});

test("persistDocuments keeps live agreement, claim, release keys", () => {
  const persisted = persistDocuments(mergeKind(
    { agreement: null, claim: { fields: { crimeRef: "NFRC1" }, saved_at: "2026-01-02T00:00:00.000Z" } },
    "matter",
    { court: "City of London Magistrates' Court" },
    "2026-01-03T00:00:00.000Z",
  ));
  assert.deepEqual(Object.keys(persisted).sort(), ["agreement", "claim", "release"]);
  assert.equal("matter" in persisted, false);
  assert.equal(persisted.claim.fields.crimeRef, "NFRC1");
  assert.equal(persisted.claim.matter.fields.court, "City of London Magistrates' Court");
  assert.equal(kindSaved(persisted, "claim"), true);
  assert.equal(kindSaved(persisted, "matter"), true);
  assert.equal(fieldsForKind(persisted, "matter").court, "City of London Magistrates' Court");
});

test("nested matter does not mark Victim claim as saved", () => {
  const documents = persistDocuments(mergeKind(null, "matter", { court: "X" }, "2026-01-03T00:00:00.000Z"));
  assert.equal(kindSaved(documents, "claim"), false);
  assert.equal(kindSaved(documents, "matter"), true);
});

test("persistDocuments nests tracing on claim", () => {
  const first = mergeKind(
    { agreement: null, claim: { fields: { crimeRef: "NFRC1" }, saved_at: "2026-01-02T00:00:00.000Z" } },
    "tracing",
    { clientName: "Ada", seed: "4417", loss: "542100" },
    "2026-01-04T00:00:00.000Z",
  );
  const persisted = persistDocuments(first);
  assert.deepEqual(Object.keys(persisted).sort(), ["agreement", "claim", "release"]);
  assert.equal("tracing" in persisted, false);
  assert.equal(persisted.claim.fields.crimeRef, "NFRC1");
  assert.equal(persisted.claim.tracing.fields.clientName, "Ada");
  assert.equal(kindSaved(persisted, "tracing"), true);
  assert.equal(kindSaved(persisted, "claim"), true);
  assert.equal(fieldsForKind(persisted, "tracing").seed, "4417");
});

test("nested tracing does not mark Victim claim as saved", () => {
  const documents = persistDocuments(mergeKind(null, "tracing", { platform: "Meridian FX Pro" }, "2026-01-04T00:00:00.000Z"));
  assert.equal(kindSaved(documents, "claim"), false);
  assert.equal(kindSaved(documents, "tracing"), true);
});

test("persistDocuments nests P2P agreement on claim", () => {
  const first = mergeKind(
    { agreement: null, claim: { fields: { crimeRef: "NFRC1" }, saved_at: "2026-01-02T00:00:00.000Z" } },
    "p2p",
    { sellerName: "Alasdair Finn", buyerName: "Priya Raghunathan", matterRef: "EL/2026/0518" },
    "2026-01-05T00:00:00.000Z",
  );
  const persisted = persistDocuments(first);
  assert.deepEqual(Object.keys(persisted).sort(), ["agreement", "claim", "release"]);
  assert.equal("p2p" in persisted, false);
  assert.equal(persisted.claim.fields.crimeRef, "NFRC1");
  assert.equal(persisted.claim.p2p.fields.sellerName, "Alasdair Finn");
  assert.equal(kindSaved(persisted, "p2p"), true);
  assert.equal(kindSaved(persisted, "claim"), true);
  assert.equal(fieldsForKind(persisted, "p2p").matterRef, "EL/2026/0518");
});

test("nested P2P agreement does not mark Victim claim as saved", () => {
  const documents = persistDocuments(mergeKind(null, "p2p", { sellerName: "Alasdair Finn" }, "2026-01-05T00:00:00.000Z"));
  assert.equal(kindSaved(documents, "claim"), false);
  assert.equal(kindSaved(documents, "p2p"), true);
});

test("sanitizeFields caps and trims", () => {
  assert.equal(sanitizeFields({ clientName: "  Ada  " }).clientName, "Ada");
  assert.equal(sanitizeFields({ note: "x".repeat(9000) }).note.length, 8000);
});

test("attachDocuments maps rows onto prepare_clients items", () => {
  const items = attachDocuments(
    [
      { id: "28dc9899-9f50-4c4b-8784-ccbda7d72a13", full_name: "Jane" },
      { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", full_name: "No docs" },
    ],
    [
      {
        id: "doc-1",
        prepare_client_id: "28dc9899-9f50-4c4b-8784-ccbda7d72a13",
        documents: {
          agreement: { fields: { clientName: "Jane" }, saved_at: "2026-01-01T00:00:00.000Z" },
          claim: null,
          matter: null,
          release: null,
        },
      },
    ],
  );
  assert.equal(items[0].document_id, "doc-1");
  assert.equal(kindSaved(items[0].documents, "agreement"), true);
  assert.equal(items[1].document_id, null);
  assert.equal(kindSaved(items[1].documents, "agreement"), false);
});
