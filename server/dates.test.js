import assert from "node:assert/strict";
import test from "node:test";
import {
  formatEuDate,
  formatUkDate,
  formatUkDateTime,
  formatUkLong,
  isIsoDate,
  maskEuDate,
  maskUkDate,
  parseUkDate,
  parseUserDate,
  toIsoDate,
} from "../src/lib/dates.js";

test("05/06/2026 is 5 June, not 6 May", () => {
  const date = parseUkDate("05/06/2026");
  assert.equal(date.getDate(), 5);
  assert.equal(date.getMonth(), 5);
  assert.equal(date.getFullYear(), 2026);
  assert.equal(formatUkLong(date), "5 June 2026");
  assert.equal(formatUkDate(date), "05/06/2026");
});

test("ISO storage converts to UK display without swapping day and month", () => {
  assert.equal(isIsoDate("2026-08-31"), true);
  assert.equal(formatUkDate("2026-08-31"), "31/08/2026");
  assert.equal(formatUkLong("2026-08-31"), "31 August 2026");
  assert.equal(formatUkDate("2026-01-09"), "09/01/2026");
  assert.equal(toIsoDate(parseUkDate("09/04/1998")), "1998-04-09");
});

test("ISO datetimes convert to UK dates without exposing the stored format", () => {
  assert.equal(formatUkDate("1978-04-12T00:00:00.000Z"), "12/04/1978");
  assert.equal(formatUkLong("2026-08-31T14:30:00"), "31 August 2026");
});

test("user input is day-first and rejects impossible dates", () => {
  assert.equal(parseUserDate("31/08/2026") && toIsoDate(parseUserDate("31/08/2026")), "2026-08-31");
  assert.equal(parseUserDate("2026-08-31") && toIsoDate(parseUserDate("2026-08-31")), "2026-08-31");
  assert.equal(parseUkDate("31/02/2026"), null);
  assert.equal(parseUkDate("13/13/2026"), null);
  assert.equal(parseUserDate(""), null);
});

test("typed digits are masked as DD/MM/YYYY", () => {
  assert.equal(maskUkDate("31082026"), "31/08/2026");
  assert.equal(maskUkDate("05"), "05");
  assert.equal(maskUkDate("0506"), "05/06");
});

test("date-time uses DD/MM/YYYY HH:mm", () => {
  const date = new Date(2026, 7, 31, 14, 30);
  assert.equal(formatUkDateTime(date), "31/08/2026 14:30");
});

test("European dates use DD.MM.YYYY", () => {
  assert.equal(formatEuDate("1962-06-22"), "22.06.1962");
  assert.equal(formatEuDate("2026-08-31"), "31.08.2026");
  assert.equal(toIsoDate(parseUkDate("22.06.1962")), "1962-06-22");
  assert.equal(maskEuDate("22061962"), "22.06.1962");
  assert.equal(maskEuDate("05"), "05");
  assert.equal(maskEuDate("0506"), "05.06");
});
