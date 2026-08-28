import { personEmail, personPhone } from "../content/people.js";
import { site, t } from "../i18n/catalog.js";
import { esc } from "./html.js";
import { previewDataAttrs } from "./preview-copy.js";

function jsonScript(id, value) {
  return `<script type="application/json" id="${id}">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>`;
}

function peoplePayload() {
  return {
    people: site.people.map((person) => ({
      slug: person.slug,
      name: person.name,
      role: person.role,
      email: personEmail(person),
      phone: personPhone(person),
      principal: Boolean(person.principal),
    })),
  };
}

function field({
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
}) {
  const auto = autocomplete ? ` autocomplete="${esc(autocomplete)}"` : "";
  const maxLengthAttr = maxlength ? ` maxlength="${esc(String(maxlength))}"` : "";
  const val = value ? ` value="${esc(value)}"` : "";
  const ph = placeholder ? ` placeholder="${esc(placeholder)}"` : "";
  const when = showWhen ? ` data-show-when="${esc(showWhen)}" hidden` : "";
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
    control = `<select id="${id}" name="${id}">${opts}</select>`;
  } else if (type === "textarea") {
    control = `<textarea id="${id}" name="${id}" rows="${rows}"${auto}${maxLengthAttr}${ph}>${esc(value)}</textarea>`;
  } else {
    control = `<input id="${id}" name="${id}" type="${esc(type)}"${auto}${maxLengthAttr}${val}${ph}>`;
  }
  return `<div class="field"${when}>
    <label for="${id}">${esc(label)}</label>
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

export function claimFormHtml() {
  return `
    <div class="wrap">
      ${jsonScript("edison-matter-defaults", peoplePayload())}
      <form class="form matter-form" id="claim-form" data-matter-form="claim" novalidate ${previewDataAttrs()}>
        <p class="matter-kicker">Victim claim to frozen cryptoassets &nbsp;·&nbsp; <b>s.303Z51 POCA 2002</b></p>
        ${group(1, "The client and the loss", `
          ${field({ id: "clientName", label: "Client's full name", autocomplete: "name", placeholder: "Margaret Hollis" })}
          ${field({ id: "clientAddr", label: "Client's address", autocomplete: "street-address", placeholder: "14 Weaver's Row, Leeds LS6 2QT" })}
          ${pair(
            field({ id: "crimeRef", label: "Action Fraud reference", placeholder: "NFRC260114882" }),
            field({ id: "ourRef", label: "Our reference", placeholder: "EL/2026/0431" }),
          )}
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
            placeholder: "Name · telephone · email",
          })}
          ${field({ id: "copyTo", label: "Copy to", value: "CPS Proceeds of Crime Division" })}
        `)}
        <button class="btn btn-signal form-submit" type="submit" data-matter-download>${esc(t("matterDownload"))}</button>
        <p class="matter-foot">${esc(t("matterFieldsNote"))}</p>
      </form>
    </div>
  `;
}

export function releaseFormHtml() {
  const sra = site.sraNumber;
  return `
    <div class="wrap">
      ${jsonScript("edison-matter-defaults", peoplePayload())}
      <form class="form matter-form" id="release-form" data-matter-form="release" novalidate ${previewDataAttrs()}>
        <p class="matter-kicker">Practice note and precedent &nbsp;·&nbsp; <b>s.303Z51 POCA 2002</b></p>

        <section class="matter-note">
          <h2>What approval looks like: the release order under s.303Z51</h2>
          <h3>There is no letter</h3>
          <p>The court does not write to you approving the application. It makes an order, which the court office seals and issues. In practice the applicant lodges a draft order with the application, the court approves or amends it at the hearing, and the sealed version is what you then serve on the enforcement agency and the exchange. Drafting it yourself is normal, expected, and to your advantage — the court is far more likely to adopt your wording than to compose its own.</p>
        </section>

        <section class="matter-note">
          <h3>What happens, in order</h3>
          <ol>
            <li>You file the written application specifying the grounds, with the witness statement, exhibit and tracing report, and a draft order.</li>
            <li>The court sends copies to the enforcement agency and to affected persons, and fixes a hearing not earlier than seven days from the date it is fixed.</li>
            <li>At the hearing the court decides whether it is satisfied of the three matters in section 303Z51. If it is, it makes the release order — usually in the applicant's draft, amended as the bench requires.</li>
            <li>The court office seals and issues the order. That sealed order is your evidence of approval.</li>
            <li>Release must be effected within seven days of the making of the order, unless a longer period is agreed.</li>
            <li>You serve the sealed order on the agency and on the exchange administering the wallet, and follow up on the mechanics of the transfer.</li>
          </ol>
        </section>

        <section class="matter-flag">
          <h3>The trap: forfeiture proceedings block release</h3>
          <p>Cryptoassets cannot be released under section 303Z51 while forfeiture proceedings under section 303Z41 are ongoing — and that includes any appeal. If the agency has applied for forfeiture, or does so in response to your application, the court cannot release to your client until those proceedings are concluded. Establish the forfeiture position before you file, and tell your client plainly that a successful application may still mean a wait.</p>
        </section>

        <section class="matter-note">
          <h3>A second route, if the tracing is difficult</h3>
          <p>Section 303Z51 also allows release to a person who was not the person from whom the assets were seized, where the court finds the assets belong to them, the “release condition” is met, and the person from whom they were seized raises no objection. The release condition is satisfied where the grounds for the freezing order no longer apply, or where the court declines to make a forfeiture order. Worth keeping in reserve.</p>
        </section>

        <p class="release-band">Draft order lodged by the applicant — not a sealed order of the court</p>
        <p class="release-court-label">Precedent · Draft release order</p>

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
            id: "respondent",
            label: "Respondent",
            placeholder: "Chief Constable of ___ / National Crime Agency / HMRC",
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
          ${field({ id: "wallet", label: "Crypto wallet address", placeholder: "0x…" })}
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
            placeholder: "0x…",
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
            placeholder: "Name · telephone · email",
          })}
        `)}

        <section class="matter-note">
          <h3>Points on the draft</h3>
          <h4>Recitals earn their place</h4>
          <p>The three “BEING SATISFIED” limbs mirror the statutory conditions word for word. A sealed order that records the court’s satisfaction on each limb is what the exchange and the agency will read, and it forestalls argument later about what was decided.</p>
          <h4>Say where the assets go</h4>
          <p>Paragraph 2 is the one most often left out and most often needed. An order that releases assets without naming a destination leaves the exchange with nothing to act on. Nominate the wallet, or your client account, and settle the mechanics with the exchange before the hearing so the seven days are workable.</p>
          <h4>Preserve the freeze on the balance</h4>
          <p>Paragraph 3 matters where other victims may claim. You are asking for your client’s share, not for the order to fall away.</p>
          <h4>Costs</h4>
          <p>Where the agency has been given a properly evidenced claim and has opposed it without good reason, ask. Where it has been neutral or helpful, no order is usually the right outcome and asking will not help your client’s standing in future matters.</p>
        </section>

        <p class="matter-foot">To be sealed and issued by the court. This draft carries no seal and is of no effect until the court makes an order in these or amended terms.</p>
        <p class="matter-foot">Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${esc(sra)}. This document is an internal precedent. It is a draft order for lodging with an application; it is not, and must not be presented as, an order of any court. It has not been settled by counsel and must be checked against the legislation and rules in force at the date of use.</p>
        <button class="btn btn-signal form-submit" type="submit" data-matter-download>${esc(t("matterDownload"))}</button>
        <p class="matter-foot">${esc(t("matterFieldsNote"))}</p>
      </form>
    </div>
  `;
}
