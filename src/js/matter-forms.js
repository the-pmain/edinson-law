import { bindDatePickers } from "./date-picker.js";
import { formControl } from "./form-control.js";
import { copyFromForm, openDocumentPreview } from "./document-preview.js";
import { FIXED_FEE_EARNER_LINE } from "../lib/matter-fields.js";
import { isRejectedApplicantName } from "./matter-validate.js";

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
