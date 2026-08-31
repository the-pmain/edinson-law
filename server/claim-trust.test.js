import assert from "node:assert/strict";
import test from "node:test";
import {
  buildClaimTrust,
  canonicalClaimFacts,
  claimProportion,
  explorerUrl,
  extractEthAddress,
  sha256Hex,
  verificationBadge,
  verificationCitation,
} from "../src/js/claim-trust.js";
import { MATTER_MOCK } from "../src/js/matter-forms.js";
import { validateActionFraudReport, validateMatterFields } from "../src/js/matter-validate.js";
import { encodeQr } from "../src/js/qr-matrix.js";
import { matterPdf } from "../src/js/matter-download.js";

const people = [
  {
    slug: "abigail-wills",
    name: "Abigail Charlotte Wills",
    email: "abi.wills@edisonlaw.co.uk",
    sraRegulated: true,
  },
];

const FROZEN_WALLET = "0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce";
const ORIGIN_WALLET = "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109";
const claimFixture = {
  ...MATTER_MOCK.claim,
  wallet: FROZEN_WALLET,
  originAddr: `the client's Kraken account, address ${ORIGIN_WALLET}`,
};
const releaseFixture = {
  ...MATTER_MOCK.release,
  wallet: FROZEN_WALLET,
  destinationWallet: ORIGIN_WALLET,
};

test("verification badges are format checks, not court stamps", () => {
  assert.equal(verificationBadge("verified"), "[Format checked]");
  assert.equal(verificationBadge("pending"), "[Pending independent verification]");
  assert.equal(verificationBadge("provisional"), "[Provisional claim]");
  const blob = [
    verificationBadge("verified"),
    verificationCitation("solicitor"),
    verificationCitation("statute"),
    verificationCitation("nfrc"),
  ].join(" ");
  assert.equal(/court verified/i.test(blob), false);
  assert.equal(/court registry api/i.test(blob), false);
});

test("mock victim claim uses proportional amounts and SRA solicitor", () => {
  const mock = claimFixture;
  assert.match(mock.feeEarner, /Abigail Charlotte Wills/);
  assert.match(mock.crimeRef, /^NFRC\d{9,12}$/);
  assert.match(mock.policeUrn, /^[A-Z]{1,3}\/\d{2}\/\d{4,8}$/);
  const share = claimProportion(mock);
  assert.equal(share.ok, true);
  assert.ok(share.percent > 5 && share.percent < 40, `share ${share.percent}% should be a minority of the mixed wallet`);
  const check = validateMatterFields(mock, { people });
  assert.equal(check.ok, true, check.critical.map((item) => item.message).join("; "));
});

test("NFRC and police URN formats", () => {
  assert.equal(validateActionFraudReport({ crimeRef: "NFRC260114882" }).ok, true);
  assert.equal(validateActionFraudReport({ crimeRef: "NFRC123" }).issues.some((item) => item.code === "docs.nfrc.format"), true);
  assert.equal(validateActionFraudReport({ crimeRef: "NFRC260114882", policeUrn: "WY/26/014882" }).issues.some((item) => item.code === "docs.police.format"), false);
  assert.ok(validateActionFraudReport({ crimeRef: "NFRC260114882", policeUrn: "not-a-urn" }).issues.some((item) => item.code === "docs.police.format"));
});

test("claim trust builds explorer QR, exhibits and digest", async () => {
  const trust = await buildClaimTrust(claimFixture, { people });
  assert.equal(trust.wallet, FROZEN_WALLET);
  assert.equal(trust.explorer, explorerUrl(trust.wallet));
  assert.equal(trust.qr.size >= 21, true);
  assert.equal(trust.exhibits.length, 5);
  assert.match(trust.exhibits[0].digest, /^[0-9a-f]{64}$/);
  assert.match(trust.digest, /^[0-9a-f]{64}$/);
  assert.match(trust.disclaimer, /Provisional/);
  assert.equal(/Court Verified|Court Registry API/i.test(JSON.stringify(trust)), false);
  assert.equal(trust.items.solicitor, "verified");
  assert.equal(trust.items.wallet, "verified");
  assert.equal(trust.items.limbA, "pending");
});

test("canonical digest changes when a claimed amount changes", async () => {
  const a = await sha256Hex(canonicalClaimFacts(claimFixture));
  const b = await sha256Hex(canonicalClaimFacts({ ...claimFixture, claimed: "50,000 USDT" }));
  assert.notEqual(a, b);
});

test("release mock includes address and NFRC so save validation can pass", () => {
  assert.equal(MATTER_MOCK.release.clientAddr, "14 Weaver's Row, Leeds LS6 2QT");
  assert.equal(MATTER_MOCK.release.crimeRef, "NFRC260114882");
  assert.equal(MATTER_MOCK.release.ourRef, "EL/2026/0431");
  assert.equal(MATTER_MOCK.release.orderDated, "2026-07-14");
  assert.match(MATTER_MOCK.release.respondent, /Chief Officer of Police for West Yorkshire/);
  assert.equal(releaseFixture.destinationWallet.length, 42);
  const out = validateMatterFields(releaseFixture, { people });
  assert.equal(out.ok, true, out.critical.map((item) => item.message).join("; "));
});

test("QR matrix has finder patterns", () => {
  const url = explorerUrl(FROZEN_WALLET);
  const { data, size } = encodeQr(url);
  assert.equal(extractEthAddress(url).length, 42);
  const finder = (x, y) => {
    assert.equal(data[y][x], true);
    assert.equal(data[y][x + 6], true);
    assert.equal(data[y + 6][x], true);
    assert.equal(data[y + 3][x + 3], true);
    assert.equal(data[y + 1][x + 1], false);
  };
  finder(0, 0);
  finder(size - 7, 0);
  finder(0, size - 7);
});

test("victim claim PDF carries trust metadata", async () => {
  const out = await matterPdf("claim", claimFixture, { people });
  assert.ok(out.bytes.byteLength > 1000);
  assert.equal(out.trust.exhibits.length, 5);
  assert.match(out.trust.digest, /^[0-9a-f]{64}$/);
  assert.equal(out.validation.ok, true);
});

async function pdfText(bytes) {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await getDocument({ data: bytes, disableWorker: true, isEvalSupported: false }).promise;
  const parts = [];
  for (let i = 1; i <= doc.numPages; i += 1) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    parts.push(content.items.map((item) => item.str).join(" "));
  }
  return parts.join(" ").replace(/\s+/g, " ");
}

test("release order is titled as an order, with a full destination address", async () => {
  const out = await matterPdf("release", releaseFixture, { people });
  assert.ok(out.bytes.byteLength > 1000);
  const text = await pdfText(out.bytes);
  assert.match(text, /RELEASE ORDER/);
  assert.match(text, /IT IS ORDERED THAT/);
  assert.match(text, /3\.1/);
  assert.match(text, /3\.5/);
  assert.match(text, /EL\/2026\/0431/);
  assert.match(text, /14 July 2026/);
  assert.match(text, /Chief Officer of Police for West Yorkshire/);
  assert.match(text, /0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109/i);
  assert.match(text, /0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce/i);
  assert.match(text, /Parliamentary Debates/);
  assert.equal(/PRIVATE PROSECUTIONS/.test(text), false);
  assert.equal(/DRAFT ORDER FOR LODGING/.test(text), false);
  assert.equal(/lodging checklist/.test(text), false);
  assert.equal(/APPROVED/.test(text), false);
  assert.equal(/Court Registry API/i.test(text), false);
});
