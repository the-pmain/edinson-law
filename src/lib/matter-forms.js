import { personEmail, personPhone } from "../content/people.js";
import { site, t } from "../i18n/catalog.js";
import { esc } from "./html.js";
import { claimFieldsHtml, p2pFieldsHtml, releaseFieldsHtml } from "./matter-fields.js";
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
      sraRegulated: Boolean(person.sraRegulated),
    })),
  };
}

export function claimFormHtml() {
  return `
    <div class="wrap">
      ${jsonScript("edison-matter-defaults", peoplePayload())}
      <form class="form matter-form" id="claim-form" data-matter-form="claim" novalidate ${previewDataAttrs()}>
        <p class="matter-kicker">Victim claim to frozen cryptoassets &nbsp;·&nbsp; <b>s.303Z51 POCA 2002</b></p>
        ${claimFieldsHtml()}
        <button class="btn btn-signal form-submit" type="submit" data-matter-download>${esc(t("matterDownload"))}</button>
        <p class="matter-foot">${esc(t("matterFieldsNote"))}</p>
      </form>
    </div>
  `;
}

export function p2pFormHtml() {
  const sra = site.sraNumber;
  return `
    <div class="wrap">
      ${jsonScript("edison-matter-defaults", peoplePayload())}
      <form class="form matter-form" id="p2p-form" data-matter-form="p2p" novalidate ${previewDataAttrs()}>
        <p class="matter-kicker">P2P Agreement &nbsp;·&nbsp; <b>Two clients, one intermediary</b></p>

        <section class="matter-note">
          <h2>What this agreement does</h2>
          <h3>A sale between two clients, on terms the firm can stand behind</h3>
          <p>Both parties are already on the books, so identity, address, source of funds and wallet control have been verified through onboarding and are not repeated here. The agreement fixes the asset, the amount, the price, the two wallets and the one bank account, then sets out the six steps that move the deal from clearance to settlement confirmation. Time is of the essence at every step.</p>
        </section>

        <section class="matter-note">
          <h3>The guarantee is the point of the document</h3>
          <p>If one party performs and the other does not, the firm pays the party that performed for its direct loss, up to the capped amount you set below. The claimant must have completed its own steps on time, must give the defaulting party two working days to put it right, and must claim in writing with the payment confirmations and transaction hashes within 30 days of the settlement deadline. Price movements, lost profit, wrong addresses, lost keys and anything settled outside the six steps are excluded.</p>
        </section>

        <section class="matter-flag">
          <h3>The firm holds neither the money nor the cryptoasset</h3>
          <p>Edison Law does not act as solicitor for either party on the transaction and gives no view on whether the deal is a good one. Both parties are advised to take independent advice and both must consent to the firm acting in this limited role for the two of them. Set the guarantee cap deliberately: it is the firm's total exposure under the agreement, whoever claims and however many claims are made.</p>
        </section>

        ${p2pFieldsHtml()}

        <p class="matter-foot">Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${esc(sra)}.</p>
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
        <p class="matter-kicker">Release order &nbsp;·&nbsp; <b>s.303Z51 POCA 2002</b></p>

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

        <p class="release-band">Release order under section 303Z51</p>
        <p class="release-court-label">Release order</p>

        ${releaseFieldsHtml()}

        <section class="matter-note">
          <h3>Points on the order</h3>
          <h4>Recitals earn their place</h4>
          <p>The three “BEING SATISFIED” limbs mirror the statutory conditions word for word. A sealed order that records the court’s satisfaction on each limb is what the exchange and the agency will read, and it forestalls argument later about what was decided.</p>
          <h4>Say where the assets go</h4>
          <p>Paragraph 2 is the one most often left out and most often needed. An order that releases assets without naming a destination leaves the exchange with nothing to act on. Nominate the wallet, or your client account, and settle the mechanics with the exchange before the hearing so the seven days are workable.</p>
          <h4>Preserve the freeze on the balance</h4>
          <p>Paragraph 3 matters where other victims may claim. You are asking for your client’s share, not for the order to fall away.</p>
          <h4>Costs</h4>
          <p>Where the agency has been given a properly evidenced claim and has opposed it without good reason, ask. Where it has been neutral or helpful, no order is usually the right outcome and asking will not help your client’s standing in future matters.</p>
        </section>

        <p class="matter-foot">Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${esc(sra)}.</p>
        <button class="btn btn-signal form-submit" type="submit" data-matter-download>${esc(t("matterDownload"))}</button>
        <p class="matter-foot">${esc(t("matterFieldsNote"))}</p>
      </form>
    </div>
  `;
}
