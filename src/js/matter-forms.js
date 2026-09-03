import { bindDatePickers } from "./date-picker.js";
import { formControl } from "./form-control.js";
import { copyFromForm, openDocumentPreview } from "./document-preview.js";
import { FIXED_FEE_EARNER_LINE } from "../lib/matter-fields.js";
import { isRejectedApplicantName } from "./matter-validate.js";
import { P2P_MOCK } from "./p2p-agreement.js";

const CLAIM_MOCK = {
  clientName: "Margaret Hollis",
  clientAddr: "14 Weaver's Row, Leeds LS6 2QT",
  crimeRef: "NFRC260114882",
  policeUrn: "WY/26/014882",
  ourRef: "EL/2026/0431",
  fraudDates: "11 September and 4 October 2025",
  lossValue: "£184,500",
  scamDesc: "an approach on WhatsApp by a person presenting as an account manager for a regulated trading platform, who induced the client to transfer funds to a purported investment account displaying fabricated returns",
  orderDate: "2026-03-03",
  exchange: "Bitfinex",
  walletHolds: "1,412,000 USDT",
  claimed: "184,500 USDT",
  originAddr: "the client's Kraken account",
  funds: "purchase on Kraken between March and July 2025, funded from a Lloyds Bank account ending 4471, the source being the proceeds of sale of a residential property",
  provider: "Elliptic",
  reportDate: "2026-05-19",
  route: "six intermediate addresses and two cross-chain bridges, applying a last-in-first-out analysis to the mixed balance at paragraphs 44 to 58 of that report",
  officer: "DC Alan Reeve",
  agency: "Economic Crime Unit, West Yorkshire Police",
  claimants: "none",
  court: "City of London Magistrates' Court",
  respondent: "",
  copyTo: "CPS Proceeds of Crime Division",
  feeEarner: FIXED_FEE_EARNER_LINE,
};

const CLIENT_WALLET = "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109";

export const MATTER_MOCK = {
  claim: CLAIM_MOCK,
  p2p: P2P_MOCK,
  matter: {
    ...CLAIM_MOCK,
    clientWallet: CLIENT_WALLET,
  },
  release: {
    court: "City of London Magistrates' Court",
    caseRef: "to be allocated",
    before: "District Judge James Clarke",
    orderDated: "2026-07-14",
    freezeDate: "2026-03-03",
    applicant: "Margaret Hollis",
    clientName: "Margaret Hollis",
    clientAddr: "14 Weaver's Row, Leeds LS6 2QT",
    crimeRef: "NFRC260114882",
    ourRef: "EL/2026/0431",
    respondent: "The Chief Officer of Police for West Yorkshire",
    applicationDate: "2026-06-02",
    wsName: "Margaret Hollis",
    wsDate: "2026-06-02",
    provider: "Elliptic",
    reportDate: "2026-05-19",
    hearing: "the Respondent neither supporting nor opposing the application",
    releasedAssets: "184,500 USDT",
    exchange: "Bitfinex",
    destination: "the wallet address nominated by the Applicant",
    agreeWith: "the administrator of the wallet",
    costs: "none",
    costsSum: "",
    feeEarner: FIXED_FEE_EARNER_LINE,
  },
  tracing: {
    clientName: "Ms E. Harrow",
    platform: "Meridian FX Pro",
    matterRef: "EL/2026/4417",
    reportDate: "2026-08-14",
    asAtDate: "2026-08-13",
    analyst: "Nadia Ellis",
    reviewer: "John Adams, Partner",
    reportPurpose: "Funds followed from the victim's wallets to a single frozen endpoint",
    loss: "542100",
    followed: "535600",
    frozen: "534000",
    hops: "4",
    seed: "4417",
    showSummary: "include",
    showDiagram: "include",
    showHopTable: "include",
    showAttribution: "include",
    showMethodology: "include",
    showRecommendations: "include",
    showAppendix: "include",
    showStatement: "include",
    findingsText: "The client made a series of Bitcoin and Tether payments to wallets controlled by the operators of Meridian FX Pro. The platform displayed fabricated returns and did not honour withdrawal requests.\n\nThe Bitcoin payments consolidated into one collection wallet before dividing between a peel chain and a direct exchange route. The Tether was converted to Ether through a non-custodial swap service.\n\nThe three branches reconverged at one Ethereum address with no prior balance or unrelated funding. The traced balance then moved to the endpoint wallet identified in this report.\n\nThe endpoint balance remains unmoved and subject to a freeze. Transaction identifiers, full wallet addresses and the basis of each attribution are recorded in the supporting sections.",
    methodSources: "Public ledger data for Bitcoin, Ethereum and Tron, checked against a second block explorer for each transaction relied on.\n\nCommercial blockchain analytics used to assess service labels and attribution clusters, with material labels compared across two providers.\n\nClient materials, including bank statements, exchange withdrawal confirmations, platform screenshots and correspondence.\n\nValue continuity, timing and transaction structure used to follow the peel chain, exchange route and cross-chain movements.",
    limitations: "Service attribution does not identify the individual account holder and remains dependent on third-party analytics.\n\nCross-chain and swap movements are matched by amount and timing rather than by one continuous on-chain transaction.\n\nSterling values are indicative conversions at the relevant transaction times and may differ from realisable value.\n\nThe reported balance is a point-in-time observation; continued availability depends on the freeze remaining in force.",
    recommendations: "Preserve the endpoint through appropriate injunctive relief and ensure the venue maintaining the freeze receives prompt notice.\n\nSeek targeted disclosure from each identifiable exchange, bridge operator and swap service for KYC records, account identity and transaction instructions.\n\nMaintain continuous monitoring of the endpoint and any traced onward address so movement is detected without waiting for the next manual review.\n\nPreserve the parallel criminal-reporting route and retain the complete evidential export used to prepare this report.",
    statement: "The findings in this report are based on the ledger data and materials identified above and are true to the best of my knowledge and belief. Where a conclusion depends on inference rather than a directly observed transaction, that distinction is stated in the relevant section.",
    endpointVenue: "Endpoint wallet",
    endpointJurisdiction: "Lithuania",
    endpointConfidence: "High",
    exchangeVenue: "Exchange B",
    exchangeJurisdiction: "Singapore",
    bridgeVenue: "Cross-chain bridge operator",
    bridgeJurisdiction: "British Virgin Islands",
    swapVenue: "Non-custodial swap service",
    swapJurisdiction: "Not identified",
  },
};

const PICKER_FIELDS = "input[type='time'], input[type='datetime-local'], select";

export function bindFullFieldPickers(root) {
  bindDatePickers(root);
  if (!root?.querySelectorAll) return;
  root.querySelectorAll(PICKER_FIELDS).forEach((el) => {
    if (el.dataset.fullPicker === "1") return;
    el.dataset.fullPicker = "1";
    el.addEventListener("click", () => {
      if (el.disabled || el.readOnly) return;
      if (typeof el.showPicker !== "function") return;
      try {
        el.showPicker();
      } catch {
        /* Picker already open, or the browser blocked it. */
      }
    });
  });
}

export function matterForms() {
  document.querySelectorAll("[data-matter-form]").forEach(bindForm);
}

async function runPreview(form, button) {
  const label = button?.dataset.label || button?.textContent || "Preview";
  if (button) {
    button.dataset.label = label;
    button.disabled = true;
  }
  try {
    const kind = form.getAttribute("data-matter-form");
    const { formValues, matterPdf } = await import("./matter-download.js");
    const people = readMatterPeople();
    await openDocumentPreview({
      copy: copyFromForm(form),
      prepare: () => matterPdf(kind, formValues(form), { people }),
    });
  } catch {
    if (button) button.textContent = "Try again";
  } finally {
    if (!button) return;
    button.disabled = false;
    window.setTimeout(() => {
      button.textContent = button.dataset.label || label;
    }, 1200);
  }
}

function bindForm(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runPreview(form, form.querySelector("[data-matter-download]"));
  });

  const sync = () => {
    form.querySelectorAll("[data-show-when]").forEach((node) => {
      const rule = node.getAttribute("data-show-when") || "";
      const eq = rule.indexOf("=");
      if (eq < 0) return;
      const name = rule.slice(0, eq);
      const want = rule.slice(eq + 1);
      const field = formControl(form, name);
      const on = String(field?.value || "") === want;
      node.hidden = !on;
    });
  };

  form.addEventListener("change", sync);
  form.addEventListener("input", sync);
  fillFeeEarner(form);
  bindFullFieldPickers(form);
  addDock(form, sync);
  sync();
}

function addDock(form, sync) {
  const kind = form.getAttribute("data-matter-form");
  const data = MATTER_MOCK[kind];
  if (!data) return;

  const dock = document.createElement("div");
  dock.className = "matter-dock";

  const mock = document.createElement("button");
  mock.type = "button";
  mock.className = "matter-mock";
  mock.textContent = "Mock data";
  mock.setAttribute("aria-label", "Fill this form with mock data");
  mock.addEventListener("click", () => {
    applyMatterMock(form, kind);
    sync();
  });
  dock.append(mock);
  document.body.append(dock);
}

const WALLET_MOCK_KEYS = new Set(["wallet", "destinationWallet", "clientWallet"]);

export function applyMatterMock(form, kind, { keepFilled = [] } = {}) {
  const data = MATTER_MOCK[kind];
  if (!form || !data) return false;
  const keep = new Set(keepFilled);
  Object.entries(data).forEach(([name, value]) => {
    if (name === "feeEarner" || WALLET_MOCK_KEYS.has(name)) return;
    const field = formControl(form, name);
    if (!field) return;
    const current = String(field.value || "").trim();
    if (keep.has(name) && current && !isRejectedApplicantName(current)) return;
    field.value = value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
  });
  WALLET_MOCK_KEYS.forEach((name) => {
    const field = formControl(form, name);
    if (field) field.value = "";
  });
  lockFeeEarner(form);
  return true;
}

function lockFeeEarner(form) {
  const line = FIXED_FEE_EARNER_LINE;
  form.querySelectorAll('[name="feeEarner"], #feeEarner').forEach((node) => {
    node.value = line;
  });
}

function fillFeeEarner(form) {
  lockFeeEarner(form);
}

function readMatterPeople() {
  const node = document.getElementById("edison-matter-defaults");
  if (!node) return [];
  try {
    const payload = JSON.parse(node.textContent || "null");
    return Array.isArray(payload?.people) ? payload.people : [];
  } catch {
    return [];
  }
}
