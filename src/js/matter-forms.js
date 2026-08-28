import { copyFromForm, openDocumentPreview } from "./document-preview.js";

const MOCK = {
  claim: {
    clientName: "Margaret Hollis",
    clientAddr: "14 Weaver's Row, Leeds LS6 2QT",
    crimeRef: "NFRC260114882",
    ourRef: "EL/2026/0431",
    fraudDates: "11 September and 4 October 2025",
    lossValue: "£184,500",
    scamDesc: "an approach on WhatsApp by a person presenting as an account manager for a regulated trading platform, who induced the client to transfer funds to a purported investment account displaying fabricated returns",
    orderDate: "2026-03-03",
    exchange: "Bitfinex",
    wallet: "0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce",
    walletHolds: "1,412,000 USDT",
    claimed: "184,500 USDT",
    originAddr: "the client's Kraken account, address 0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109",
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
  },
  release: {
    court: "City of London Magistrates' Court",
    caseRef: "to be allocated",
    before: "District Judge Hale",
    orderDated: "2026-07-14",
    freezeDate: "2026-03-03",
    applicant: "Margaret Hollis",
    respondent: "Chief Constable of West Yorkshire",
    applicationDate: "2026-06-02",
    wsName: "Margaret Hollis",
    wsDate: "2026-06-02",
    provider: "Elliptic",
    reportDate: "2026-05-19",
    hearing: "the Respondent neither supporting nor opposing the application",
    releasedAssets: "184,500 USDT",
    wallet: "0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce",
    exchange: "Bitfinex",
    destination: "the wallet address nominated by the Applicant",
    destinationWallet: "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109",
    agreeWith: "the administrator of the wallet",
    costs: "none",
    costsSum: "",
  },
};

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
    await openDocumentPreview({
      copy: copyFromForm(form),
      prepare: () => matterPdf(kind, formValues(form)),
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
      const field = form.elements.namedItem(name);
      const on = String(field?.value || "") === want;
      node.hidden = !on;
    });
  };

  form.addEventListener("change", sync);
  form.addEventListener("input", sync);
  fillFeeEarner(form);
  addDock(form, sync);
  sync();
}

function addDock(form, sync) {
  const kind = form.getAttribute("data-matter-form");
  const data = MOCK[kind];
  if (!data) return;

  const dock = document.createElement("div");
  dock.className = "matter-dock";

  const mock = document.createElement("button");
  mock.type = "button";
  mock.className = "matter-mock";
  mock.textContent = "Mock data";
  mock.setAttribute("aria-label", "Fill this form with mock data");
  mock.addEventListener("click", () => {
    applyMock(form, data);
    sync();
  });
  dock.append(mock);
  document.body.append(dock);
}

function applyMock(form, data) {
  Object.entries(data).forEach(([name, value]) => {
    const field = form.elements.namedItem(name);
    if (!field || name === "feeEarner") return;
    field.value = value;
  });
}

function fillFeeEarner(form) {
  const input = form.elements.namedItem("feeEarner");
  if (!input || input.value) return;
  const slug = new URLSearchParams(window.location.search).get("instruct") || "";
  const node = document.getElementById("edison-matter-defaults");
  if (!node) return;
  let payload = null;
  try {
    payload = JSON.parse(node.textContent || "null");
  } catch {
    return;
  }
  const people = Array.isArray(payload?.people) ? payload.people : [];
  const person = people.find((item) => item.slug === slug)
    || people.find((item) => item.principal)
    || people[0];
  if (!person) return;
  input.value = [person.name, person.phone, person.email].filter(Boolean).join(" · ");
}
