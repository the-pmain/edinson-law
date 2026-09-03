import { UK_DATE_PLACEHOLDER } from "./dates.js";
import { esc } from "./html.js";

/** Locked fee earner — matches FIRM_SRA_REGISTER.namedSolicitor in matter-validate.js. */
export const FIXED_FEE_EARNER_LINE = "Abigail Charlotte Wills · abi.wills@edisonlaw.co.uk";

export function field({
  id,
  label,
  type = "text",
  hint = "",
  autocomplete = "",
  maxlength = "",
  value = "",
  rows = 4,
  options = null,
  showWhen = "",
  placeholder = "",
  required = false,
  readonly = false,
  disabled = false,
  className = "",
}) {
  const datePlaceholder = type === "date" ? placeholder || UK_DATE_PLACEHOLDER : placeholder;
  const auto = autocomplete ? ` autocomplete="${esc(autocomplete)}"` : "";
  const maxLengthAttr = maxlength ? ` maxlength="${esc(String(maxlength))}"` : "";
  const val = value ? ` value="${esc(value)}"` : "";
  const ph = datePlaceholder ? ` placeholder="${esc(datePlaceholder)}"` : "";
  const titleAttr = type === "date" ? ` title="${esc(UK_DATE_PLACEHOLDER)}"` : "";
  const when = showWhen ? ` data-show-when="${esc(showWhen)}" hidden` : "";
  const reqAttr = required ? " required" : "";
  const readAttr = readonly ? " readonly" : "";
  const disAttr = disabled ? " disabled" : "";
  const cls = className ? ` class="${esc(className)}"` : "";
  const reqLabel = required ? ` <span class="req">required</span>` : "";
  let control;
  if (options) {
    const opts = options
      .map((item) => {
        const optValue = typeof item === "string" ? item : item.value;
        const optLabel = typeof item === "string" ? item : item.label;
        const selected = optValue === value ? " selected" : "";
        return `<option value="${esc(optValue)}"${selected}>${esc(optLabel)}</option>`;
      })
      .join("");
    control = `<select id="${id}" name="${id}"${cls}${reqAttr}${disAttr}>${opts}</select>`;
  } else if (type === "textarea") {
    control = `<textarea id="${id}" name="${id}" rows="${rows}"${cls}${auto}${maxLengthAttr}${ph}${reqAttr}${readAttr}${disAttr}>${esc(value)}</textarea>`;
  } else if (disabled) {
    // Disabled controls are omitted from FormData — keep a hidden twin for submit.
    control = `<input type="hidden" name="${id}" value="${esc(value)}"><input id="${id}" type="${esc(type)}" value="${esc(value)}" disabled${required ? " aria-required=\"true\"" : ""}${auto}${maxLengthAttr}${ph}${titleAttr}${cls}>`;
  } else {
    control = `<input id="${id}" name="${id}" type="${esc(type)}"${cls}${auto}${maxLengthAttr}${val}${ph}${titleAttr}${reqAttr}${readAttr}>`;
  }
  return `<div class="field"${when}>
    <label for="${id}">${esc(label)}${reqLabel}</label>
    ${control}
    ${hint ? `<p class="hint">${esc(hint)}</p>` : ""}
  </div>`;
}

function group(n, title, body) {
  return `<section class="matter-grp">
    <h2><span class="matter-n">${esc(String(n))}</span> ${esc(title)}</h2>
    <div class="matter-body">${body}</div>
  </section>`;
}

function pair(a, b) {
  return `<div class="matter-two">${a}${b}</div>`;
}

export function agreementFieldsHtml() {
  return `
    ${field({ id: "clientName", label: "Full legal name", autocomplete: "name" })}
    ${field({ id: "clientEmail", label: "Email", type: "email", autocomplete: "email" })}
    ${field({ id: "clientPhone", label: "Telephone", type: "tel", autocomplete: "tel" })}
    ${field({
      id: "clientOccupation",
      label: "Occupation",
      autocomplete: "organization-title",
      maxlength: 80,
    })}
    ${field({ id: "clientDob", label: "Date of birth", type: "date", autocomplete: "bday", hint: UK_DATE_PLACEHOLDER })}
  `;
}

export function claimFieldsHtml({ clientWallet = false } = {}) {
  const frozenWalletField = field({
    id: "wallet",
    label: "Frozen wallet address",
    hint: "Full 0x + 40 hexadecimal characters.",
    maxlength: 42,
  });
  const clientWalletField = field({
    id: "clientWallet",
    label: "Client's wallet address",
    maxlength: 42,
    hint: "The wallet to which the court should order the Claimed Assets transferred.",
  });

  return `
    ${group(1, "The client and the loss", `
      ${field({ id: "clientName", label: "Client's full name", autocomplete: "name", placeholder: "Margaret Hollis" })}
      ${field({ id: "clientAddr", label: "Client's address", autocomplete: "street-address", placeholder: "14 Weaver's Row, Leeds LS6 2QT" })}
      ${pair(
        field({
          id: "crimeRef",
          label: "Action Fraud reference",
          placeholder: "NFRC260114882",
        }),
        field({ id: "ourRef", label: "Our reference", placeholder: "EL/2026/0431" }),
      )}
      ${field({
        id: "policeUrn",
        label: "Police crime number (if different)",
        placeholder: "WY/26/014882",
      })}
      ${pair(
        field({ id: "fraudDates", label: "When it happened", placeholder: "11 September and 4 October 2025" }),
        field({ id: "lossValue", label: "Value at the time", placeholder: "£184,500" }),
      )}
      ${field({
        id: "scamDesc",
        label: "How the scam worked",
        type: "textarea",
        hint: "One sentence. The detail belongs in the witness statement.",
        placeholder: "an approach on WhatsApp by a person presenting as an account manager for a regulated trading platform, who induced the client to transfer funds to a purported investment account displaying fabricated returns",
      })}
    `)}
    ${group(2, "The frozen wallet", `
      ${pair(
        field({ id: "orderDate", label: "Date of the freezing order", type: "date" }),
        field({ id: "exchange", label: "Administered by", placeholder: "Bitfinex" }),
      )}
      ${clientWallet
        ? pair(frozenWalletField, clientWalletField)
        : frozenWalletField}
      ${pair(
        field({ id: "walletHolds", label: "Wallet holds", placeholder: "1,412,000 USDT" }),
        field({ id: "claimed", label: "Your client claims", placeholder: "184,500 USDT" }),
      )}
      ${field({
        id: "originAddr",
        label: "Client sent the funds from",
        placeholder: "the client's exchange account",
      })}
    `)}
    ${group(3, "Evidence", `
      ${field({
        id: "funds",
        label: "How your client came by the money",
        type: "textarea",
        hint: "Acquisition, funding account and source of wealth in one sentence — limb (b).",
        placeholder: "purchase on Kraken between March and July 2025, funded from a Lloyds Bank account ending 4471, the source being the proceeds of sale of a residential property",
      })}
      ${pair(
        field({ id: "provider", label: "Analytics provider", placeholder: "Elliptic" }),
        field({ id: "reportDate", label: "Report dated", type: "date" }),
      )}
      ${field({
        id: "route",
        label: "The tracing route",
        type: "textarea",
        hint: "Hops, swaps and any mixing analysis — limb (c).",
        placeholder: "six intermediate addresses and two cross-chain bridges, applying a last-in-first-out analysis to the mixed balance at paragraphs 44 to 58 of that report",
      })}
    `)}
    ${group(4, "Who it goes to", `
      ${pair(
        field({ id: "officer", label: "Officer name and rank", placeholder: "DC Alan Reeve" }),
        field({ id: "agency", label: "Agency or unit", placeholder: "Economic Crime Unit, West Yorkshire Police" }),
      )}
      ${field({
        id: "claimants",
        label: "Other victims claiming",
        options: [
          { value: "none", label: "None known" },
          { value: "some", label: "Others have claimed" },
        ],
        value: "none",
      })}
      ${field({
        id: "claimantsN",
        label: "How many",
        placeholder: "four",
        showWhen: "claimants=some",
      })}
    `)}
    ${group(5, "Firm defaults", `
      <p class="hint">Set these once. They rarely change between matters.</p>
      ${field({ id: "court", label: "Court", value: "City of London Magistrates' Court" })}
      ${field({
        id: "respondent",
        label: "Respondent on the application",
        hint: "Leave blank to use the agency named above.",
        placeholder: "leave blank to use the agency named above",
      })}
      ${field({
        id: "feeEarner",
        label: "Fee earner and contact",
        value: FIXED_FEE_EARNER_LINE,
        required: true,
        disabled: true,
        hint: "Fixed to Abigail Charlotte Wills, the SRA-regulated solicitor named on organisation 510498.",
      })}
      ${field({ id: "copyTo", label: "Copy to", value: "CPS Proceeds of Crime Division" })}
    `)}
  `;
}

export function matterFieldsHtml() {
  return claimFieldsHtml({ clientWallet: true });
}

export function tracingFieldsHtml() {
  const sectionChoice = (id, label, hint = "") => field({
    id,
    label,
    value: "include",
    options: [
      { value: "include", label: "Include" },
      { value: "omit", label: "Omit" },
    ],
    hint,
  });

  return `
    ${group(1, "Report details", `
      ${pair(
        field({ id: "clientName", label: "Client name", autocomplete: "name", placeholder: "Ms E. Harrow" }),
        field({ id: "platform", label: "Fraud / platform name", placeholder: "Meridian FX Pro" }),
      )}
      ${field({
        id: "matterRef",
        label: "Matter reference",
        placeholder: "EL/2026/4417",
        hint: "Optional. Leave blank to remove it from the report.",
      })}
      ${pair(
        field({
          id: "reportDate",
          label: "Report date",
          type: "date",
          hint: "Optional. Leave blank to remove the report-date entry.",
        }),
        field({
          id: "asAtDate",
          label: "Figures accurate as at",
          type: "date",
          hint: "Optional. Leave blank to remove the as-at date from the summary heading.",
        }),
      )}
      ${pair(
        field({
          id: "analyst",
          label: "Prepared by",
          placeholder: "Nadia Ellis",
          hint: "Optional. The role is added automatically.",
        }),
        field({
          id: "reviewer",
          label: "Reviewed by",
          placeholder: "John Adams, Partner",
          hint: "Optional. Leave blank if the report has not been reviewed.",
        }),
      )}
      ${field({
        id: "reportPurpose",
        label: "Report subtitle / scope",
        placeholder: "Funds followed from the victim's wallets to a single frozen endpoint",
        hint: "Optional. A concise sentence beneath the title; leave blank to remove it.",
        maxlength: 220,
      })}
    `)}
    ${group(2, "The loss and the trace", `
      ${field({
        id: "loss",
        label: "Total loss (£)",
        type: "number",
        placeholder: "542100",
        hint: "Changing this figure recalculates followed and frozen unless you have already saved other amounts.",
      })}
      ${pair(
        field({
          id: "followed",
          label: "Followed (£)",
          type: "number",
          placeholder: "535600",
          hint: "Amount followed to the endpoint. Caps at the total loss.",
        }),
        field({
          id: "frozen",
          label: "Frozen (£)",
          type: "number",
          placeholder: "534000",
          hint: "Amount frozen at the endpoint. Caps at the amount followed.",
        }),
      )}
      ${pair(
        field({
          id: "hops",
          label: "Peel hops",
          value: "4",
          options: [
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
            { value: "6", label: "6" },
          ],
        }),
        field({
          id: "seed",
          label: "Seed",
          type: "number",
          value: "4417",
          hint: "Same seed and inputs always rebuild the same hop chain and addresses.",
        }),
      )}
    `)}
    ${group(3, "Sections to include", `
      <p class="hint">Choose the evidence the reader needs. Omitted sections are removed cleanly, including their page breaks.</p>
      ${pair(
        sectionChoice("showSummary", "Summary and key figures"),
        sectionChoice("showDiagram", "Funds-flow diagram"),
      )}
      ${pair(
        sectionChoice("showHopTable", "Hop-by-hop transaction table"),
        sectionChoice("showAttribution", "Attribution and endpoint analysis"),
      )}
      ${pair(
        sectionChoice("showMethodology", "Method and limitations", "This section also requires method or limitation text below."),
        sectionChoice("showRecommendations", "Recommended next steps", "This section also requires recommendation text below."),
      )}
      ${pair(
        sectionChoice("showAppendix", "Address appendix"),
        sectionChoice("showStatement", "Statement and signature", "This section also requires statement text below."),
      )}
    `)}
    ${group(4, "Narrative", `
      <p class="hint">Use one paragraph per blank line. Blank optional content is not printed; there are no empty headings or placeholder sections.</p>
      ${field({
        id: "findingsText",
        label: "Key findings",
        type: "textarea",
        rows: 6,
        showWhen: "showSummary=include",
        placeholder: "Set out each material finding as a separate paragraph.",
        hint: "Optional. Leave blank to show key figures without a numbered findings list.",
      })}
      ${field({
        id: "methodSources",
        label: "Method and sources",
        type: "textarea",
        rows: 6,
        showWhen: "showMethodology=include",
        placeholder: "Public ledger data reviewed and independently verified…",
        hint: "Optional. Each paragraph becomes one item.",
      })}
      ${field({
        id: "limitations",
        label: "Limitations",
        type: "textarea",
        rows: 6,
        showWhen: "showMethodology=include",
        placeholder: "Address attribution identifies a service, not the account holder…",
        hint: "Optional. If both methodology fields are blank, the entire section is omitted.",
      })}
      ${field({
        id: "recommendations",
        label: "Recommended next steps",
        type: "textarea",
        rows: 6,
        showWhen: "showRecommendations=include",
        placeholder: "Preserve the endpoint and maintain continuous wallet monitoring…",
        hint: "Optional. Each paragraph becomes a numbered recommendation.",
      })}
      ${field({
        id: "statement",
        label: "Statement",
        type: "textarea",
        rows: 4,
        showWhen: "showStatement=include",
        placeholder: "The findings are based on the ledger data and materials identified in this report…",
        hint: "Optional. Leave blank to omit both the statement and signature block.",
      })}
    `)}
    ${group(5, "Attribution labels", `
      <p class="hint">Only rows with a venue or service name are printed. Jurisdiction and confidence may be left blank.</p>
      ${pair(
        field({ id: "endpointVenue", label: "Endpoint venue / service", placeholder: "Endpoint wallet", showWhen: "showAttribution=include" }),
        field({ id: "endpointJurisdiction", label: "Endpoint jurisdiction", placeholder: "Lithuania", showWhen: "showAttribution=include" }),
      )}
      ${field({
        id: "endpointConfidence",
        label: "Endpoint confidence",
        value: "",
        options: [
          { value: "", label: "Not stated" },
          { value: "High", label: "High" },
          { value: "Medium", label: "Medium" },
          { value: "Low", label: "Low" },
          { value: "Traced, not frozen", label: "Traced, not frozen" },
        ],
        showWhen: "showAttribution=include",
      })}
      ${pair(
        field({ id: "exchangeVenue", label: "Exchange / pass-through service", placeholder: "Exchange B", showWhen: "showAttribution=include" }),
        field({ id: "exchangeJurisdiction", label: "Exchange jurisdiction", placeholder: "Singapore", showWhen: "showAttribution=include" }),
      )}
      ${pair(
        field({ id: "bridgeVenue", label: "Bridge operator", placeholder: "Cross-chain bridge operator", showWhen: "showAttribution=include" }),
        field({ id: "bridgeJurisdiction", label: "Bridge jurisdiction", placeholder: "British Virgin Islands", showWhen: "showAttribution=include" }),
      )}
      ${pair(
        field({ id: "swapVenue", label: "Swap service", placeholder: "Non-custodial swap service", showWhen: "showAttribution=include" }),
        field({ id: "swapJurisdiction", label: "Swap jurisdiction", placeholder: "Not identified", showWhen: "showAttribution=include" }),
      )}
    `)}
  `;
}

/**
 * Peer-to-peer cryptoasset sale. The groups follow the order the agreement
 * prints in, so the form and the document read the same way.
 */
export function p2pFieldsHtml() {
  const partyGroup = (n, title, prefix, mock) => group(n, title, `
    ${pair(
      field({ id: `${prefix}Name`, label: "Full legal name", autocomplete: "name", placeholder: mock.name }),
      field({ id: `${prefix}Ref`, label: "Client reference", placeholder: mock.ref }),
    )}
    ${pair(
      field({ id: `${prefix}Email`, label: "Email", type: "email", placeholder: mock.email }),
      field({ id: `${prefix}Phone`, label: "Telephone", type: "tel", placeholder: mock.phone }),
    )}
  `);

  return `
    ${partyGroup(1, "The seller", "seller", {
      name: "Alasdair Finn",
      ref: "EL/C/2026/0311",
      email: "a.finn@northgate-capital.co.uk",
      phone: "07700 900412",
    })}
    ${partyGroup(2, "The buyer", "buyer", {
      name: "Priya Raghunathan",
      ref: "EL/C/2026/0418",
      email: "p.raghunathan@merricklane.com",
      phone: "07700 900873",
    })}
    ${group(3, "Edison Law as intermediary", `
      <p class="hint">The registered office and SRA number are printed from the firm record.</p>
      ${pair(
        field({
          id: "firmEntity",
          label: "Named on the agreement as",
          value: "Edison Law",
          options: ["Edison Law", "Edison Law Limited", "Edison Law LLP"],
        }),
        field({ id: "matterRef", label: "Matter reference", placeholder: "EL/2026/0518" }),
      )}
      ${field({ id: "agreementDate", label: "Agreement dated", type: "date", hint: "Leave blank to date the agreement today." })}
      ${field({
        id: "feeEarner",
        label: "Fee earner and contact",
        value: FIXED_FEE_EARNER_LINE,
        required: true,
        disabled: true,
        hint: "Fixed to the SRA-regulated solicitor named on the firm register. This name signs for the firm.",
      })}
    `)}
    ${group(4, "The cryptoasset and the price", `
      ${pair(
        field({ id: "asset", label: "Cryptoasset", placeholder: "Bitcoin (BTC)" }),
        field({ id: "network", label: "Network", placeholder: "Bitcoin mainnet" }),
      )}
      ${pair(
        field({ id: "amount", label: "Amount sold", placeholder: "4.250 BTC" }),
        field({ id: "price", label: "Price (£)", placeholder: "268,400" }),
      )}
      ${field({
        id: "priceWords",
        label: "Price in words",
        placeholder: "two hundred and sixty-eight thousand four hundred pounds",
        hint: "Printed in brackets after the figure. Leave blank to print the figure alone.",
        maxlength: 160,
      })}
      ${pair(
        field({
          id: "sellerWallet",
          label: "Seller's wallet address",
          placeholder: "bc1q…",
          hint: "The only address the cryptoasset may be sent from.",
        }),
        field({
          id: "buyerWallet",
          label: "Buyer's wallet address",
          placeholder: "bc1q…",
          hint: "The only address the cryptoasset may be sent to.",
        }),
      )}
    `)}
    ${group(5, "The seller's bank account", `
      <p class="hint">The only account the price may be paid into. Anything sent elsewhere falls outside the guarantee.</p>
      ${pair(
        field({ id: "bankName", label: "Account name", placeholder: "A Finn" }),
        field({ id: "bankSort", label: "Sort code", placeholder: "20-45-11", maxlength: 8 }),
      )}
      ${pair(
        field({ id: "bankAccount", label: "Account number", placeholder: "61180422", maxlength: 8 }),
        field({ id: "bankRef", label: "Payment reference", placeholder: "EL-2026-0518" }),
      )}
    `)}
    ${group(6, "Settlement", `
      ${pair(
        field({ id: "settlementTime", label: "Deadline time", type: "time" }),
        field({ id: "settlementDate", label: "Deadline date", type: "date" }),
      )}
      ${field({
        id: "confirmations",
        label: "Network confirmations required",
        value: "3",
        options: ["1", "2", "3", "6", "12"],
      })}
    `)}
    ${group(7, "The guarantee and the fee", `
      ${field({
        id: "guaranteeCap",
        label: "Guarantee cap (£)",
        placeholder: "268,400",
        hint: "The most the firm will pay in aggregate, however many claims are made.",
      })}
      ${pair(
        field({ id: "fee", label: "Firm's fee (£, plus VAT)", placeholder: "4,500" }),
        field({ id: "feePayable", label: "Fee payable", placeholder: "on completion, by the Buyer" }),
      )}
    `)}
  `;
}

export function releaseFieldsHtml() {
  return `
    ${group(1, "The court and the parties", `
      ${field({ id: "court", label: "Court", value: "City of London Magistrates' Court" })}
      ${pair(
        field({ id: "caseRef", label: "Case reference", placeholder: "to be allocated" }),
        field({ id: "before", label: "Before", placeholder: "District Judge ____ / the bench" }),
      )}
      ${pair(
        field({ id: "orderDated", label: "Dated", type: "date" }),
        field({ id: "freezeDate", label: "Crypto wallet freezing order made on", type: "date" }),
      )}
      ${field({ id: "applicant", label: "Applicant", autocomplete: "name", placeholder: "full legal name" })}
      ${field({
        id: "clientAddr",
        label: "Applicant's address",
        autocomplete: "street-address",
        placeholder: "14 Weaver's Row, Leeds LS6 2QT",
      })}
      ${pair(
        field({
          id: "crimeRef",
          label: "Action Fraud reference",
          placeholder: "NFRC260114882",
        }),
        field({ id: "ourRef", label: "Our reference", placeholder: "EL/2026/0431" }),
      )}
      ${field({
        id: "respondent",
        label: "Respondent",
        placeholder: "The Chief Officer of Police for West Yorkshire",
        hint: "Statutory style: the Chief Officer of Police for the force, or the enforcement officer named on the freezing order. Cryptoasset freezing orders are obtained by that officer, not by the court of its own motion.",
      })}
    `)}
    ${group(2, "The application before the court", `
      ${field({ id: "applicationDate", label: "Upon the application of the Applicant dated", type: "date" })}
      ${pair(
        field({ id: "wsName", label: "Witness statement of", placeholder: "name" }),
        field({ id: "wsDate", label: "Witness statement dated", type: "date" }),
      )}
      ${pair(
        field({ id: "provider", label: "Tracing report of", placeholder: "Elliptic" }),
        field({ id: "reportDate", label: "Tracing report dated", type: "date" }),
      )}
      ${field({
        id: "hearing",
        label: "And upon hearing",
        options: [
          { value: "", label: "Select" },
          {
            value: "the solicitor for the Applicant and the representative of the Respondent",
            label: "the solicitor for the Applicant and the representative of the Respondent",
          },
          {
            value: "the Respondent neither supporting nor opposing the application",
            label: "the Respondent neither supporting nor opposing the application",
          },
        ],
      })}
    `)}
    <section class="matter-note matter-limbs">
      <h3>And the court being satisfied that</h3>
      <ol type="a">
        <li>the Applicant was deprived of the cryptoassets to which the application relates, or of property which they represent, by unlawful conduct;</li>
        <li>the cryptoassets of which the Applicant was deprived were not recoverable property immediately before the Applicant was deprived of them; and</li>
        <li>those cryptoassets belong to the Applicant.</li>
      </ol>
      <p>And the court being further satisfied that no proceedings for forfeiture under section 303Z41 of that Act are ongoing in respect of the cryptoassets to be released.</p>
    </section>
    ${group(3, "It is ordered that", `
      ${field({
        id: "releasedAssets",
        label: "Quantity and asset to be released (the Released Assets)",
        placeholder: "184,500 USDT",
      })}
      ${field({
        id: "wallet",
        label: "Crypto wallet address",
        maxlength: 42,
        hint: "Full 0x + 40 hexadecimal characters. Printed in full on the order.",
      })}
      ${field({ id: "exchange", label: "Administered by", placeholder: "Bitfinex" })}
      ${field({
        id: "destination",
        label: "The Released Assets shall be transferred to",
        options: [
          { value: "", label: "Select" },
          {
            value: "the wallet address nominated by the Applicant",
            label: "the wallet address nominated by the Applicant",
          },
          {
            value: "the client account of the Applicant's solicitors",
            label: "the client account of the Applicant's solicitors",
          },
        ],
      })}
      ${field({
        id: "destinationWallet",
        label: "Wallet address nominated by the Applicant",
        maxlength: 42,
        hint: "Full 0x + 40 hexadecimal characters. Do not wrap this inside a sentence.",
        showWhen: "destination=the wallet address nominated by the Applicant",
      })}
      ${field({
        id: "agreeWith",
        label: "Unless a longer period is agreed between the Applicant and",
        options: [
          { value: "", label: "Select" },
          { value: "the Respondent", label: "the Respondent" },
          { value: "the administrator of the wallet", label: "the administrator of the wallet" },
        ],
      })}
      <p class="hint">The Released Assets shall be transferred within seven days of the date of this order, unless a longer period is agreed.</p>
      <p class="hint">The crypto wallet freezing order shall continue in respect of the balance of the cryptoassets held in the wallet.</p>
    `)}
    ${group(4, "Costs", `
      ${field({
        id: "costs",
        label: "Costs",
        options: [
          { value: "", label: "Select" },
          {
            value: "pay",
            label: "The Respondent shall pay the Applicant's costs of this application, summarily assessed, within 14 days.",
          },
          { value: "none", label: "There be no order as to costs." },
        ],
      })}
      ${field({
        id: "costsSum",
        label: "Summarily assessed in the sum of",
        placeholder: "£",
        showWhen: "costs=pay",
      })}
      <p class="hint">Liberty to apply in respect of the implementation of paragraph 2.</p>
    `)}
    ${group(5, "Fee earner", `
      ${field({
        id: "feeEarner",
        label: "Fee earner and contact",
        value: FIXED_FEE_EARNER_LINE,
        required: true,
        disabled: true,
        hint: "Fixed to the SRA-regulated solicitor named on the firm register.",
      })}
    `)}
  `;
}
