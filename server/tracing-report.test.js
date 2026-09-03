import assert from "node:assert/strict";
import test from "node:test";
import { MATTER_MOCK } from "../src/js/matter-forms.js";
import { matterPdf } from "../src/js/matter-download.js";
import {
  buildTracingReport,
  tracingFilename,
  tracingFollowedFromLoss,
  tracingFrozenFromLoss,
} from "../src/js/tracing-report.js";

const mock = MATTER_MOCK.tracing;

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

test("same seed and inputs rebuild the same endpoint", () => {
  const a = buildTracingReport(mock);
  const b = buildTracingReport(mock);
  assert.equal(a.addresses.frozenW, b.addresses.frozenW);
  assert.equal(a.ref, b.ref);
  assert.equal(a.hops.length, b.hops.length);
  assert.equal(a.stats.loss, "£542,100");
});

test("changing the seed changes reconstructed addresses", () => {
  const a = buildTracingReport(mock);
  const b = buildTracingReport({ ...mock, seed: "4418" });
  assert.notEqual(a.addresses.frozenW, b.addresses.frozenW);
});

test("followed and frozen derive from the loss", () => {
  assert.equal(tracingFollowedFromLoss(542100), 535600);
  assert.equal(tracingFrozenFromLoss(542100), 534000);
});

test("frozen is capped at followed", () => {
  const report = buildTracingReport({ ...mock, followed: "100000", frozen: "500000" });
  assert.equal(report.frozen, 100000);
  assert.match(report.warn, /Frozen capped/);
});

test("tracing filename uses the client name", () => {
  assert.equal(tracingFilename("Ms E. Harrow"), "Edison-Law-Tracing-Report-Ms-E-Harrow.pdf");
});

test("blank optional configuration removes related report content", () => {
  const report = buildTracingReport({
    ...mock,
    matterRef: "",
    reportDate: "",
    asAtDate: "",
    reviewer: "",
    reportPurpose: "",
    findingsText: "",
    methodSources: "",
    limitations: "",
    recommendations: "",
    statement: "",
    endpointVenue: "",
    endpointJurisdiction: "",
    endpointConfidence: "",
    exchangeVenue: "",
    exchangeJurisdiction: "",
    bridgeVenue: "",
    bridgeJurisdiction: "",
    swapVenue: "",
    swapJurisdiction: "",
  });
  assert.equal(report.ref, "");
  assert.equal(report.date, "");
  assert.equal(report.asAt, "");
  assert.equal(report.reviewer, "");
  assert.equal(report.subtitle, "");
  assert.deepEqual(report.findings, []);
  assert.deepEqual(report.attribution, []);
  assert.deepEqual(report.method, []);
  assert.deepEqual(report.limitations, []);
  assert.deepEqual(report.nextSteps, []);
  assert.equal(report.statement, "");
  assert.equal(report.sections.attribution, false);
  assert.equal(report.sections.methodology, false);
  assert.equal(report.sections.recommendations, false);
  assert.equal(report.sections.statement, false);
});

test("section controls omit headings and page breaks from the PDF", async () => {
  const out = await matterPdf("tracing", {
    ...mock,
    showSummary: "omit",
    showDiagram: "omit",
    showHopTable: "omit",
    showAttribution: "omit",
    showMethodology: "omit",
    showRecommendations: "omit",
    showAppendix: "omit",
    showStatement: "omit",
  });
  const text = await pdfText(out.bytes);
  assert.doesNotMatch(text, /SUMMARY OF FINDINGS/);
  assert.doesNotMatch(text, /HOW THE FUNDS MOVED/);
  assert.doesNotMatch(text, /THE TRACE, HOP BY HOP/);
  assert.doesNotMatch(text, /METHOD, SOURCES AND LIMITATIONS/);
  assert.doesNotMatch(text, /APPENDIX A/);
  assert.doesNotMatch(text, /Statement/);
});

test("custom narrative is split into clean report items", () => {
  const report = buildTracingReport({
    ...mock,
    findingsText: "First finding.\n\nSecond finding.",
    methodSources: "Ledger review.",
    limitations: "",
    recommendations: "Preserve evidence.\n\nMonitor the endpoint.",
    statement: "Custom statement.",
  });
  assert.deepEqual(report.findings, ["First finding.", "Second finding."]);
  assert.deepEqual(report.method, ["Ledger review."]);
  assert.deepEqual(report.limitations, []);
  assert.deepEqual(report.nextSteps, ["Preserve evidence.", "Monitor the endpoint."]);
  assert.equal(report.statement, "Custom statement.");
  assert.equal(report.sections.methodology, true);
});

test("tracing report PDF carries operator fields and hop table", async () => {
  const out = await matterPdf("tracing", mock);
  assert.ok(out.bytes.byteLength > 2000);
  assert.equal(out.filename, "Edison-Law-Tracing-Report-Ms-E-Harrow.pdf");
  assert.equal(out.validation.ok, true);
  const text = await pdfText(out.bytes);
  assert.match(text, /Cryptoasset Tracing Report/);
  assert.match(text, /Ms E\. Harrow/);
  assert.match(text, /Meridian FX Pro/);
  assert.match(text, /£542,100/);
  assert.match(text, /HOP/);
  assert.match(text, /APPENDIX A/);
  assert.match(text, /Endpoint wallet/);
  assert.equal(/PRIVATE PROSECUTIONS/.test(text), false);
});
