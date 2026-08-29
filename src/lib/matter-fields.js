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
  const auto = autocomplete ? ` autocomplete="${esc(autocomplete)}"` : "";
  const maxLengthAttr = maxlength ? ` maxlength="${esc(String(maxlength))}"` : "";
  const val = value ? ` value="${esc(value)}"` : "";
  const ph = placeholder ? ` placeholder="${esc(placeholder)}"` : "";
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
    control = `<input type="hidden" name="${id}" value="${esc(value)}"><input id="${id}" type="${esc(type)}" value="${esc(value)}" disabled${required ? " aria-required=\"true\"" : ""}${auto}${maxLengthAttr}${ph}${cls}>`;
  } else {
    control = `<input id="${id}" name="${id}" type="${esc(type)}"${cls}${auto}${maxLengthAttr}${val}${ph}${reqAttr}${readAttr}>`;
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
    ${field({ id: "clientDob", label: "Date of birth", type: "date", autocomplete: "bday" })}
  `;
}

export function claimFieldsHtml() {
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
      ${field({ id: "wallet", label: "Frozen wallet address", placeholder: "0x9f2b…41ce" })}
      ${pair(
        field({ id: "walletHolds", label: "Wallet holds", placeholder: "1,412,000 USDT" }),
        field({ id: "claimed", label: "Your client claims", placeholder: "184,500 USDT" }),
      )}
      ${field({
        id: "originAddr",
        label: "Client sent the funds from",
        placeholder: "the client's Kraken account, address 0x3ad1…88b0",
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

export function releaseFieldsHtml() {
  return `
    ${group(1, "The court and the parties", `
      ${field({ id: "court", label: "Court", value: "City of London Magistrates' Court" })}
      ${pair(
        field({ id: "caseRef", label: "Case reference", placeholder: "to be allocated" }),
        field({ id: "before", label: "Before", placeholder: "the District Judge assigned to the application" }),
      )}
      <p class="hint">Leave the case number and judge blank on a lodging draft. The court office allocates both.</p>
      ${pair(
        field({ id: "orderDated", label: "Dated", type: "date" }),
        field({ id: "freezeDate", label: "Crypto wallet freezing order made on", type: "date" }),
      )}
      <p class="hint">Leave Dated blank. The court inserts that date when it makes the order. The freezing-order date is the date of the existing section 303Z37 order.</p>
      ${field({ id: "applicant", label: "Applicant", autocomplete: "name", placeholder: "full legal name" })}
      ${field({
        id: "clientAddr",
        label: "Applicant's address",
        autocomplete: "street-address",
        placeholder: "14 Weaver's Row, Leeds LS6 2QT",
      })}
      ${field({
        id: "crimeRef",
        label: "Action Fraud reference",
        placeholder: "NFRC260114882",
      })}
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
      <p class="hint">Date as it appears on the exhibit. This tool does not retrieve or verify the report from the provider.</p>
      ${field({
        id: "hearing",
        label: "And upon hearing",
        hint: "Intended recital after the hearing. The court amends this when it makes the order.",
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
        placeholder: "0x9f2b41c8e07dd5a3f190bb7c26e4a5109d3f41ce",
        maxlength: 42,
        hint: "Full 0x + 40 hexadecimal characters. Printed on its own line in the draft.",
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
        placeholder: "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109",
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
      <p class="hint">Liberty to apply in respect of the implementation of paragraph [2].</p>
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
