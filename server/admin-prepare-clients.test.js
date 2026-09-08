import assert from "node:assert/strict";
import { test } from "node:test";
import {
  parsePrepareClientsQuery,
  validatePrepareClientIsTest,
} from "./admin-prepare-clients.js";

const ID = "28dc9899-9f50-4c4b-8784-ccbda7d72a13";

test("parsePrepareClientsQuery omits is_test unless true or false is given", () => {
  const plain = parsePrepareClientsQuery(new URLSearchParams("page=1"));
  assert.equal("is_test" in plain, false);

  const on = parsePrepareClientsQuery(new URLSearchParams("is_test=true"));
  assert.equal(on.is_test, true);

  const off = parsePrepareClientsQuery(new URLSearchParams("is_test=false"));
  assert.equal(off.is_test, false);
});

test("validatePrepareClientIsTest requires a client id and a boolean flag", () => {
  assert.equal(
    validatePrepareClientIsTest({ is_test: true }).error,
    "That client record could not be found.",
  );
  assert.equal(
    validatePrepareClientIsTest({ id: ID }).error,
    "Mark whether this client is a test record.",
  );
  assert.equal(
    validatePrepareClientIsTest({ id: ID, is_test: "true" }).error,
    "Mark whether this client is a test record.",
  );

  const ok = validatePrepareClientIsTest({ id: ID, is_test: false });
  assert.equal(ok.error, undefined);
  assert.equal(ok.id, ID);
  assert.equal(ok.is_test, false);
});
