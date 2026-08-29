import assert from "node:assert/strict";
import test from "node:test";
import {
  coerceSraFeeEarner,
  formatAssetAmount,
  isRejectedApplicantName,
  parseMoneyAmount,
  validateActionFraudReport,
  validateDynamicField,
  validateMatterFields,
  validateMonetaryValues,
  validateSolicitorCredentials,
  verifyBlockChainAddresses,
  verifyApplicantIdentity,
  FIRM_SRA_REGISTER,
} from "../src/js/matter-validate.js";

const people = [
  {
    slug: "liam-brennan",
    name: "Liam Brennan",
    email: "liam.brennan@edisonlaw.co.uk",
    sraRegulated: false,
  },
  {
    slug: "abigail-wills",
    name: "Abigail Charlotte Wills",
    email: "abi.wills@edisonlaw.co.uk",
    sraRegulated: true,
  },
];

test("rejects investigator as letterhead solicitor", () => {
  const out = validateSolicitorCredentials(
    "Liam Brennan · liam.brennan@edisonlawlegal.com",
    people,
  );
  assert.equal(out.ok, false);
  assert.ok(out.issues.some((item) => item.code === "solicitor.not-sra" || item.code === "solicitor.domain"));
  assert.equal(coerceSraFeeEarner("Liam Brennan · liam.brennan@edisonlawlegal.com", people),
    `${FIRM_SRA_REGISTER.namedSolicitor.name} · ${FIRM_SRA_REGISTER.namedSolicitor.email}`);
});

test("accepts SRA-named solicitor", () => {
  const out = validateSolicitorCredentials(
    "Abigail Charlotte Wills · abi.wills@edisonlaw.co.uk",
    people,
  );
  assert.equal(out.ok, true);
});

test("flags ambiguous money grouping like 5000,500", () => {
  const parsed = parseMoneyAmount("5000,500 USDT");
  assert.equal(parsed.ok, false);
  assert.ok(parsed.issues.some((item) => item.code === "money.ambiguous-group"));
});

test("reconciles USDT claim against sterling loss", () => {
  const bad = validateMonetaryValues({
    claimed: "5,000,500 USDT",
    lossValue: "£31,000",
  });
  assert.equal(bad.ok, false);
  assert.ok(bad.issues.some((item) => item.code === "money.fx-implausible"));

  const ok = validateMonetaryValues({
    claimed: "50,005 USDT",
    lossValue: "£31,000",
  });
  assert.equal(ok.ok, true);
  assert.equal(formatAssetAmount(50005, "USDT"), "50,005 USDT");
});

test("validates ethereum wallet format", () => {
  const bad = verifyBlockChainAddresses("0x9f2b41");
  assert.equal(bad.ok, false);
  const good = verifyBlockChainAddresses("0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce");
  assert.equal(good.ok, true);
});

test("validateDynamicField routes fee earner and money", () => {
  const fee = validateDynamicField(
    "feeEarner",
    "Liam Brennan · liam.brennan@edisonlaw.co.uk",
    {},
    { people },
  );
  assert.equal(fee.ok, false);

  const money = validateDynamicField("claimed", "5000,500 USDT", { lossValue: "£31,000" });
  assert.equal(money.ok, false);
});

test("rejects TheLegal-style placeholder applicant names", () => {
  const out = verifyApplicantIdentity({
    clientName: "TheLegal",
    clientAddr: "14 Weaver's Row, Leeds LS6 2QT",
  });
  assert.equal(out.ok, false);
  assert.ok(out.issues.some((item) => item.code === "id.name"));
  assert.equal(isRejectedApplicantName("TheLegal"), true);
  assert.equal(isRejectedApplicantName("test"), true);
  assert.equal(isRejectedApplicantName("[client's name]"), true);
  assert.equal(isRejectedApplicantName("Margaret Hollis"), false);
});

test("matter pack catches missing NFRC and thin identity", () => {
  const out = validateMatterFields({
    feeEarner: "Abigail Charlotte Wills · abi.wills@edisonlaw.co.uk",
    clientName: "Margaret",
    claimed: "50,005 USDT",
    lossValue: "£31,000",
    wallet: "0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce",
    exchange: "Bitfinex",
    orderDate: "2026-03-03",
    provider: "Elliptic",
    reportDate: "2026-05-19",
  }, { people });
  assert.ok(out.issues.some((item) => item.code === "docs.nfrc.missing"));
  assert.ok(validateActionFraudReport({ crimeRef: "NFRC260114882" }).ok);
  assert.equal(verifyApplicantIdentity({ clientName: "Margaret Hollis", clientAddr: "14 Weaver's Row" }).ok, true);
});
