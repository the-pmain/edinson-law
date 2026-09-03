/**
 * Peer-to-peer cryptoasset sale agreement between two clients of the firm,
 * with Edison Law as intermediary and guarantor.
 *
 * The model turns raw form values into the printed document: every blank is a
 * labelled gap rather than an empty line, so an unfinished draft still reads as
 * the same agreement. Clause numbering runs 1-20 across all four clause
 * sections and is assigned here, not in the renderer.
 */

import { trust } from "../config/trust.js";
import { FIXED_FEE_EARNER_LINE } from "../lib/matter-fields.js";
import { formatUkLong, todayIso } from "../lib/dates.js";

export const FIRM = {
  name: "Edison Law",
  domain: "edisonlaw.co.uk",
  sraNumber: trust.firm.sraNumber,
  address: trust.firm.registeredOffice,
  practice: "Private prosecutions · Asset recovery · Financial crime",
};

const GAP = "[  ]";

/**
 * Worked example for the form's mock button. Telephone numbers are from the
 * Ofcom drama range and the wallets are well-formed but unowned, so nothing
 * here can reach a real person or a real balance.
 */
export const P2P_MOCK = {
  sellerName: "Alasdair Finn",
  sellerRef: "EL/C/2026/0311",
  sellerEmail: "a.finn@northgate-capital.co.uk",
  sellerPhone: "07700 900412",
  buyerName: "Priya Raghunathan",
  buyerRef: "EL/C/2026/0418",
  buyerEmail: "p.raghunathan@merricklane.com",
  buyerPhone: "07700 900873",
  firmEntity: "Edison Law",
  matterRef: "EL/2026/0518",
  agreementDate: "2026-09-04",
  asset: "Bitcoin (BTC)",
  network: "Bitcoin mainnet",
  amount: "4.250 BTC",
  price: "268400",
  priceWords: "two hundred and sixty-eight thousand four hundred pounds",
  sellerWallet: "bc1qm4v8s0yz3d7htg2kx9ple6ncr5fj0waq8u3vdz",
  buyerWallet: "bc1qw3l5xk8p2fj7vn0dhe4srq9tzc6mu5ay0g2rdk",
  bankName: "A Finn",
  bankSort: "20-45-11",
  bankAccount: "61180422",
  bankRef: "EL-2026-0518",
  settlementTime: "16:00",
  settlementDate: "2026-09-11",
  confirmations: "3",
  guaranteeCap: "268400",
  fee: "4500",
  feePayable: "on completion, by the Buyer",
  feeEarner: FIXED_FEE_EARNER_LINE,
};

function clean(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Printed value, or a labelled gap so the reader can see what is missing. */
function slot(value, gap = GAP) {
  return clean(value) || gap;
}

function money(value, gap = GAP) {
  const raw = clean(value);
  if (!raw) return `£${gap}`;
  if (raw.startsWith("£")) return raw;
  const digits = Number(raw.replace(/[,\s]/g, ""));
  if (Number.isFinite(digits) && /^[\d,.\s]+$/.test(raw)) {
    return `£${digits.toLocaleString("en-GB")}`;
  }
  return `£${raw}`;
}

function longDate(value, gap = GAP) {
  return formatUkLong(value) || gap;
}

/** "14:00 on 11 September 2026" — the reference prints time before date. */
function deadline(time, date) {
  return `${slot(time, "[time]")} on ${longDate(date, "[date]")}`;
}

function party(values, prefix) {
  return {
    name: slot(values[`${prefix}Name`], "[name]"),
    ref: slot(values[`${prefix}Ref`]),
    email: slot(values[`${prefix}Email`]),
    phone: slot(values[`${prefix}Phone`]),
  };
}

function bankLine(values) {
  return [
    `Name ${slot(values.bankName)}`,
    `Sort code ${slot(values.bankSort)}`,
    `Account ${slot(values.bankAccount)}`,
    `Reference ${slot(values.bankRef)}`,
  ].join("  ·  ");
}

function assetLine(values) {
  const asset = slot(values.asset, "[cryptoasset]");
  const network = clean(values.network);
  return network ? `${asset} on ${network}` : asset;
}

function priceLine(values) {
  const words = clean(values.priceWords);
  const figure = money(values.price);
  return words ? `${figure} (${words})` : figure;
}

function confirmationsLine(values) {
  const n = clean(values.confirmations);
  return `${n || "[  ]"} network confirmations`;
}

function feeEarnerName(values) {
  const parts = clean(values.feeEarner).split(/\s*[·•|]\s*/).filter(Boolean);
  return parts[0] || "";
}

/**
 * How it settles — the six steps, in order. Time is of the essence at each one,
 * which is why the deadline and the confirmation count are stated on the deal
 * table above rather than buried in the wording here.
 */
function settlementClauses() {
  return [
    "Both parties are existing clients of Edison Law. Identity, address, source of funds and wallet control have already been verified through the firm's client onboarding, and no further checks are required before settlement.",
    "Edison Law confirms in writing to both parties that the deal is clear to settle.",
    "The Seller sends a small test transfer to the Buyer's wallet. The Buyer confirms it has arrived.",
    "The Buyer pays the full price to the Seller's bank account above and sends the payment confirmation to the Seller and to Edison Law.",
    "Once the money has cleared, the Seller confirms receipt and sends the cryptoasset from the Seller's wallet to the Buyer's wallet, then sends the transaction hash to the Buyer and to Edison Law.",
    "The Buyer confirms receipt after the required confirmations. Edison Law issues a settlement confirmation and the deal is complete.",
  ];
}

function promiseClauses() {
  return [
    "The Seller owns the cryptoasset outright, free of any claim, and it is not the proceeds of crime.",
    "The Buyer is paying with its own lawful funds from an account in its own name, and is not acting for anyone else.",
    "Both parties control the wallets listed above and confirm every detail on this page is correct.",
    "Money and cryptoassets move only between the accounts and wallets listed above. Anything sent elsewhere is at that party's own risk and is not covered by the guarantee.",
    "Each party tells Edison Law immediately if anything changes, or if any claim, freezing order or law enforcement interest touches the cryptoasset or the funds.",
    "Neither party settles this deal outside the steps above without Edison Law's written agreement.",
  ];
}

function guaranteeClauses() {
  return [
    "If one party does what it promised and the other does not, Edison Law will pay the party that performed for its direct loss, up to the capped amount below.",
    "To claim, that party must have completed its own steps on time, must first ask the defaulting party to put it right and allow two working days, and must claim in writing with the payment confirmations and transaction hashes within 30 days of the settlement deadline.",
    "The guarantee does not cover price movements, lost profit, transfers sent to a wrong address, a party's own mistake or loss of keys, network or exchange failure, or anything settled outside the steps above.",
    "If Edison Law pays out, the defaulting party repays it in full on demand, with costs and interest, and Edison Law takes over that party's claim.",
  ];
}

function otherClauses(values) {
  return [
    "Edison Law holds neither the money nor the cryptoasset. It does not act as solicitor for either party on this transaction and gives no advice on whether the deal is a good one. Each party has been advised to take independent advice, and both consent to the firm acting in this limited role for both of them.",
    `Edison Law's fee for this transaction is ${money(values.fee)} plus VAT, payable ${slot(values.feePayable)}, and both parties are jointly liable for it.`,
    "Edison Law may pause or stop acting where it is required to by law or by the SRA Standards and Regulations, and may not be able to explain why. That is not a breach of this agreement.",
    "This agreement is the whole of what has been agreed, may be signed in counterparts including by electronic signature, and is governed by the law of England and Wales, whose courts have exclusive jurisdiction.",
  ];
}

/** Numbers a run of clauses from `start`, returning the list and the next number. */
function numberFrom(start, texts) {
  return texts.map((text, i) => ({ n: start + i, text }));
}

export function buildP2pAgreement(values = {}) {
  const dated = clean(values.agreementDate) || todayIso();
  const settles = numberFrom(1, settlementClauses());
  const promises = numberFrom(settles.length + 1, promiseClauses());
  const guarantee = numberFrom(settles.length + promises.length + 1, guaranteeClauses());
  const other = numberFrom(
    settles.length + promises.length + guarantee.length + 1,
    otherClauses(values),
  );

  return {
    firm: FIRM,
    title: "P2P Agreement",
    subtitle: "Between two clients of the firm, with Edison Law as intermediary and guarantor",
    dated: longDate(dated),
    matterRef: slot(values.matterRef),
    names: { seller: clean(values.sellerName), buyer: clean(values.buyerName) },
    seller: party(values, "seller"),
    buyer: party(values, "buyer"),
    intermediary: {
      name: slot(values.firmEntity, FIRM.name),
      address: FIRM.address,
      feeEarner: slot(feeEarnerName(values)),
      matterRef: slot(values.matterRef),
    },
    deal: [
      ["Cryptoasset", assetLine(values)],
      ["Amount", slot(values.amount)],
      ["Price", priceLine(values)],
      ["Seller's wallet", slot(values.sellerWallet, "[address]"), "mono"],
      ["Buyer's wallet", slot(values.buyerWallet, "[address]"), "mono"],
      ["Seller's bank account", bankLine(values)],
      ["Settlement deadline", deadline(values.settlementTime, values.settlementDate)],
      ["Confirmations required", confirmationsLine(values)],
    ],
    guaranteeCap: `${money(values.guaranteeCap)} in aggregate`,
    guaranteeCapNote: "This is the most Edison Law will pay under this agreement in total, whether claimed by one party or both, and however many claims are made.",
    clauses: { settles, promises, guarantee, other },
    signatories: [
      { role: "Seller", name: clean(values.sellerName), date: longDate(dated, "") },
      { role: "Buyer", name: clean(values.buyerName), date: longDate(dated, "") },
      { role: "For Edison Law", name: feeEarnerName(values), date: longDate(dated, "") },
    ],
  };
}

function slugName(value) {
  return clean(value).replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function p2pFilename(agreement) {
  const who = [agreement?.names?.seller, agreement?.names?.buyer]
    .map(slugName)
    .filter(Boolean)
    .join("-and-");
  return `Edison-Law-P2P-Agreement-${who || "draft"}.pdf`;
}
