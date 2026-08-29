import { personEmail, personPhone } from "../content/people.js";
import { site, t } from "../i18n/catalog.js";
import { esc } from "./html.js";
import { claimFieldsHtml, releaseFieldsHtml } from "./matter-fields.js";
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

        ${releaseFieldsHtml()}

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
