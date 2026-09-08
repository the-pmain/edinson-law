import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeIsTest, normalizeOccupation, TEXT_FIELD_MAX } from "../src/js/prepare-clients-model.js";
import { validatePrepareClient } from "./prepare-clients.js";

const valid = {
  full_name: "Jane Client",
  email: "Jane.Client@example.com",
  phone: "+442079460813",
  date_of_birth: "1978-04-12",
};

test("normalizeOccupation keeps a trimmed value", () => {
  assert.equal(normalizeOccupation("  Solicitor  "), "Solicitor");
});

test("normalizeOccupation turns empty string into null", () => {
  assert.equal(normalizeOccupation(""), null);
  assert.equal(normalizeOccupation("   "), null);
});

test("normalizeOccupation keeps null", () => {
  assert.equal(normalizeOccupation(null), null);
  assert.equal(normalizeOccupation(undefined), null);
});

test("normalizeOccupation caps length like other text fields", () => {
  const value = "x".repeat(TEXT_FIELD_MAX + 20);
  assert.equal(normalizeOccupation(value)?.length, TEXT_FIELD_MAX);
});

test("validatePrepareClient accepts occupation with a value", () => {
  const result = validatePrepareClient({ ...valid, occupation: "  Company director  " });
  assert.equal(result.error, undefined);
  assert.equal(result.row.occupation, "Company director");
  assert.equal(result.row.full_name, "Jane Client");
  assert.equal(result.row.email, "jane.client@example.com");
});

test("validatePrepareClient turns empty occupation into null", () => {
  const result = validatePrepareClient({ ...valid, occupation: "   " });
  assert.equal(result.error, undefined);
  assert.equal(result.row.occupation, null);
});

test("validatePrepareClient accepts missing occupation as null", () => {
  const result = validatePrepareClient(valid);
  assert.equal(result.error, undefined);
  assert.equal(result.row.occupation, null);
});

test("validatePrepareClient accepts occupation null", () => {
  const result = validatePrepareClient({ ...valid, occupation: null });
  assert.equal(result.error, undefined);
  assert.equal(result.row.occupation, null);
});

test("validatePrepareClient always stores is_test as false", () => {
  const omitted = validatePrepareClient(valid);
  assert.equal(omitted.error, undefined);
  assert.equal(omitted.row.is_test, false);

  const forced = validatePrepareClient({ ...valid, is_test: true });
  assert.equal(forced.error, undefined);
  assert.equal(forced.row.is_test, false);
});

test("normalizeIsTest only treats explicit true as a test record", () => {
  assert.equal(normalizeIsTest(true), true);
  assert.equal(normalizeIsTest(false), false);
  assert.equal(normalizeIsTest("true"), false);
  assert.equal(normalizeIsTest(1), false);
  assert.equal(normalizeIsTest(null), false);
});
