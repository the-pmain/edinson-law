import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { downloadBytes } from "./agreement-data.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const ink = rgb(10 / 255, 32 / 255, 40 / 255);
const muted = rgb(83 / 255, 103 / 255, 109 / 255);
const band = rgb(122 / 255, 22 / 255, 22 / 255);
const paper = rgb(1, 1, 1);
const A4 = [595.28, 841.89];

function clean(value) {
  return String(value || "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2022/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\s+/g, " ")
    .trim();
}

export function formValues(form) {
  const out = {};
  new FormData(form).forEach((value, name) => {
    out[name] = String(value || "").trim();
  });
  return out;
}

function fmt(iso) {
  if (!iso) return "";
  const p = String(iso).split("-");
  if (p.length !== 3) return iso;
  const date = new Date(+p[0], +p[1] - 1, +p[2]);
  if (Number.isNaN(date.valueOf())) return iso;
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function shift(iso, days = 0, years = 0) {
  if (!iso) return "";
  const p = String(iso).split("-");
  if (p.length !== 3) return "";
  const date = new Date(+p[0], +p[1] - 1, +p[2]);
  if (Number.isNaN(date.valueOf())) return "";
  if (years) date.setFullYear(date.getFullYear() + years);
  if (days) date.setDate(date.getDate() + days);
  return fmt(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
}

function todayIso() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function exhibitOf(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "";
  return `${(parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase()}1`;
}

function slot(value, fallback) {
  const text = clean(value);
  return text || fallback;
}

function stem(kind, name) {
  const who = String(name || "matter").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const file = kind === "release"
    ? "Edison-Law-Draft-Release-Order-s303Z51"
    : "Edison-Law-Victim-Claim-s303Z51";
  return `${file}-${who || "completed"}.pdf`;
}

function wrap(font, text, size, width) {
  const words = clean(text).split(" ").filter(Boolean);
  if (!words.length) return [""];
  const lines = [];
  let line = words[0];
  for (let i = 1; i < words.length; i += 1) {
    const next = `${line} ${words[i]}`;
    if (font.widthOfTextAtSize(next, size) <= width) line = next;
    else {
      lines.push(line);
      line = words[i];
    }
  }
  lines.push(line);
  return lines;
}

async function writePdf(title, blocks) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.TimesRoman);
  const bold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const margin = 54;
  const width = A4[0] - margin * 2;
  let page = pdf.addPage(A4);
  let y = A4[1] - 50;

  const ensure = (need) => {
    if (y - need >= 48) return;
    page = pdf.addPage(A4);
    y = A4[1] - 50;
  };

  const drawLines = (lines, font, size, leading, color = ink, align = "left") => {
    lines.forEach((line) => {
      ensure(leading);
      const w = font.widthOfTextAtSize(line, size);
      const x = align === "center" ? (A4[0] - w) / 2 : margin;
      page.drawText(line, { x, y, size, font, color });
      y -= leading;
    });
  };

  blocks.forEach((block) => {
    if (block.type === "space") {
      y -= block.h || 10;
      return;
    }
    if (block.type === "rule") {
      ensure(14);
      page.drawRectangle({ x: margin, y: y + 4, width, height: 0.8, color: ink });
      y -= 12;
      return;
    }
    if (block.type === "band") {
      ensure(28);
      page.drawRectangle({ x: margin, y: y - 6, width, height: 22, color: band });
      const label = clean(block.text).toUpperCase();
      const size = 8;
      const w = sansBold.widthOfTextAtSize(label, size);
      page.drawText(label, { x: (A4[0] - w) / 2, y: y, size, font: sansBold, color: paper });
      y -= 28;
      return;
    }
    if (block.type === "head") {
      ensure(36);
      drawLines([clean(block.firm || "EDISON LAW")], sansBold, 13, 16, ink);
      drawLines(wrap(sans, block.sub || "Private prosecutions  Asset recovery  Financial crime", 8, width), sans, 8, 11, muted, "left");
      y -= 6;
      page.drawRectangle({ x: margin, y: y + 8, width, height: 1.4, color: ink });
      y -= 10;
      return;
    }
    if (block.type === "h") {
      y -= 6;
      drawLines(wrap(sansBold, block.text, 9, width), sansBold, 9, 13, rgb(0, 105 / 255, 92 / 255));
      y -= 2;
      return;
    }
    const font = block.bold ? bold : regular;
    const size = block.size || 11;
    const leading = block.leading || 15;
    const prefix = block.n ? `${block.n}  ` : "";
    const lines = wrap(font, prefix + block.text, size, width);
    drawLines(lines, font, size, leading, ink, block.align || "left");
    if (block.after) y -= block.after;
  });

  pdf.setTitle(title);
  pdf.setAuthor("Edison Law");
  pdf.setCreator("Edison Law");
  return pdf.save();
}

function claimBlocks(f) {
  const today = todayIso();
  const letterDate = fmt(today);
  const orderDateL = slot(fmt(f.orderDate), "[order date]");
  const reportDateL = slot(fmt(f.reportDate), "[report date]");
  const client = slot(f.clientName, "[client's name]");
  const claimed = slot(f.claimed, "[amount claimed]");
  const respondent = slot(f.respondent || f.agency, "[respondent]");
  const wsName = slot(f.clientName, "[witness name]");
  const wsDate = letterDate;
  const exhibit = exhibitOf(f.clientName) || "[exhibit]";
  const orderExpiry = shift(f.orderDate, 0, 2) || "[expiry date]";
  const replyBy = shift(today, 14) || "[reply-by date]";
  const claimantsLine = f.claimants === "some"
    ? `The Applicant is aware of ${slot(f.claimantsN, "[how many]")} other persons who claim to be victims of the same or related conduct and whose claims may attach to the Frozen Wallet. The Applicant's position on distribution is set out in the witness statement.`
    : "The Applicant is not aware of any competing claim to the cryptoassets held in the Frozen Wallet.";

  return [
    { type: "head", firm: "EDISON LAW", sub: "Private prosecutions · Asset recovery · Financial crime" },
    { type: "p", text: `${letterDate}  ·  By email`, size: 10, after: 4 },
    { type: "p", text: `To: ${slot(f.officer, "[officer]")}, ${slot(f.agency, "[agency]")}`, size: 10 },
    { type: "p", text: `Copy: ${slot(f.copyTo, "[copy to]")}`, size: 10, after: 4 },
    { type: "p", text: `Our client: ${client}  ·  Our ref: ${slot(f.ourRef, "[our reference]")}  ·  Crime ref: ${slot(f.crimeRef, "[Action Fraud reference]")}`, size: 10, after: 10 },
    { type: "p", text: `Crypto wallet freezing order made ${orderDateL} at ${slot(f.court, "[court]")} — victim claim under section 303Z51 of the Proceeds of Crime Act 2002`, bold: true, after: 8 },
    { type: "p", text: `We act for ${client}, who was the victim of a fraud reported to Action Fraud under reference ${slot(f.crimeRef, "[Action Fraud reference]")}. Our client was induced to transfer ${claimed}, then worth approximately ${slot(f.lossValue, "[value lost]")}, on ${slot(f.fraudDates, "[dates of the fraud]")}.` },
    { type: "p", text: `We understand that the wallet ${slot(f.wallet, "[wallet address]")}, administered by ${slot(f.exchange, "[exchange]")} and frozen by the above order, holds cryptoassets which include the proceeds of that fraud. Our client claims ${claimed} of those assets as a victim under section 303Z51 and intends to apply to the court for their release. We do not seek to disturb the freezing order itself.` },
    { type: "h", text: "OUR CLIENT'S CASE ON THE THREE STATUTORY LIMBS" },
    { type: "p", n: "1.", text: `Deprived by unlawful conduct. Our client was deprived of the cryptoassets, or of property which they represent, by ${slot(f.scamDesc, "[how the scam worked]")}.` },
    { type: "p", n: "2.", text: `Not recoverable property beforehand. The assets were our client's own, acquired by ${slot(f.funds, "[how the client came by the money]")}.` },
    { type: "p", n: "3.", text: `They belong to our client. The tracing analysis of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL} follows our client's transfers from ${slot(f.originAddr, "[origin address]")} through ${slot(f.route, "[tracing route]")}, and attributes ${claimed} to our client.` },
    { type: "h", text: "ENCLOSED" },
    { type: "p", n: "•", text: `the witness statement of ${wsName} dated ${wsDate}, with exhibit ${exhibit};` },
    { type: "p", n: "•", text: `the tracing report of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL};` },
    { type: "p", n: "•", text: "bank and exchange records evidencing the transfers out and the lawful source of the funds; and" },
    { type: "p", n: "•", text: "the Action Fraud report and correspondence with the platform." },
    { type: "h", text: "CONFIRMATIONS WE WOULD BE GRATEFUL FOR" },
    { type: "p", n: "1.", text: "whether you support, oppose or are neutral on our client's claim;" },
    { type: "p", n: "2.", text: "whether any other victim has made or notified a claim to the assets in the frozen wallet, and if so how many and for what aggregate sum;" },
    { type: "p", n: "3.", text: "the current quantity and value of the cryptoassets held in the frozen wallet;" },
    { type: "p", n: "4.", text: `whether an extension or a forfeiture application is contemplated before the order expires on ${orderExpiry}, and on what timetable; and` },
    { type: "p", n: "5.", text: "whether you require anything further from our client before the application is issued." },
    { type: "space", h: 8 },
    { type: "p", text: "Our client is willing to co-operate fully with your investigation, including by providing a further statement or attending to give evidence should that assist." },
    { type: "p", text: `Please respond by ${replyBy}. We will issue in any event thereafter, in order to protect our client's position before the freezing order expires.` },
    { type: "space", h: 16 },
    { type: "p", text: "Yours sincerely" },
    { type: "space", h: 18 },
    { type: "p", text: "Edison Law", bold: true },
    { type: "p", text: slot(f.feeEarner, "[fee earner]") },
    { type: "space", h: 28 },
    { type: "band", text: "Draft · for settling before filing · not an order of the court" },
    { type: "p", text: `IN THE ${slot(f.court, "[court]")}`, bold: true, align: "center" },
    { type: "p", text: "Case reference  to be allocated", align: "center", size: 10, after: 6 },
    { type: "rule" },
    { type: "p", text: `IN THE MATTER OF a crypto wallet freezing order made under section 303Z37 of the Proceeds of Crime Act 2002 on ${orderDateL}`, align: "center", size: 10 },
    { type: "p", text: "AND IN THE MATTER OF an application under section 303Z51 of that Act for the release of cryptoassets to a victim of unlawful conduct", align: "center", size: 10, after: 6 },
    { type: "rule" },
    { type: "p", text: `Applicant: ${client}, of ${slot(f.clientAddr, "[client's address]")}`, size: 10 },
    { type: "p", text: `Respondent: ${respondent}`, size: 10, after: 8 },
    { type: "h", text: "1. THE FREEZING ORDER" },
    { type: "p", n: "1.", text: `On ${orderDateL} this court made a crypto wallet freezing order under section 303Z37 of the Proceeds of Crime Act 2002 in respect of the crypto wallet ${slot(f.wallet, "[wallet address]")}, administered by ${slot(f.exchange, "[exchange]")} (the Frozen Wallet). The Applicant does not seek to disturb that order.` },
    { type: "p", n: "2.", text: `The Frozen Wallet holds ${slot(f.walletHolds, "[wallet contents]")}. The Applicant claims ${claimed} of those cryptoassets (the Claimed Assets).` },
    { type: "h", text: "2. THE ORDER SOUGHT" },
    { type: "p", n: "3.", text: "The Applicant applies under section 303Z51 for an order that the Claimed Assets be released to the Applicant within seven days, together with such further or other order as the court thinks fit." },
    { type: "h", text: "3. THE GROUNDS" },
    { type: "p", n: "4.", text: `The Applicant was deprived of the Claimed Assets, or of property which they represent, by unlawful conduct. On ${slot(f.fraudDates, "[dates of the fraud]")} the Applicant was induced by ${slot(f.scamDesc, "[how the scam worked]")} to transfer ${claimed}, then worth approximately ${slot(f.lossValue, "[value lost]")}, from ${slot(f.originAddr, "[origin address]")}. That conduct amounted to fraud by false representation contrary to section 2 of the Fraud Act 2006. It was reported to Action Fraud under reference ${slot(f.crimeRef, "[Action Fraud reference]")}.` },
    { type: "p", n: "5.", text: `The cryptoassets of which the Applicant was deprived were not recoverable property immediately before the Applicant was deprived of them. The Applicant acquired them by ${slot(f.funds, "[how the client came by the money]")}. The Applicant has no relevant convictions and the funds had no connection with criminal conduct.` },
    { type: "p", n: "6.", text: `The Claimed Assets belong to the Applicant. The tracing analysis of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL} follows the Applicant's transfers from ${slot(f.originAddr, "[origin address]")} through ${slot(f.route, "[tracing route]")}, and attributes ${claimed} of the cryptoassets held in the Frozen Wallet to the Applicant.` },
    { type: "h", text: "4. OTHER CLAIMANTS" },
    { type: "p", n: "7.", text: claimantsLine },
    { type: "h", text: "5. EVIDENCE RELIED UPON" },
    { type: "p", n: "8.", text: `The witness statement of ${wsName} dated ${wsDate}, with exhibit ${exhibit}.` },
    { type: "p", n: "9.", text: `The tracing report of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL}.` },
    { type: "p", n: "10.", text: `The Action Fraud report under reference ${slot(f.crimeRef, "[Action Fraud reference]")}.` },
    { type: "h", text: "6. NOTICE AND LISTING" },
    { type: "p", n: "11.", text: `This application is made in writing and specifies the grounds on which it is made, in accordance with rule 12(1) of the Magistrates' Courts (Detention, Freezing and Forfeiture of Cryptoassets, and Miscellaneous Amendments) Rules 2024. Copies have been sent to the Respondent and to ${slot(f.exchange, "[exchange]")}. The Applicant asks the court to fix a hearing date under rule 12(5), and invites the court to expedite the listing having regard to the expiry of the freezing order on ${orderExpiry} and to the volatility of the assets.` },
    { type: "space", h: 20 },
    { type: "p", text: `Signed                    Edison Law, solicitors for the Applicant    ·    Dated  ${letterDate}` },
  ];
}

function releaseBlocks(f) {
  const dated = slot(fmt(f.orderDated), "[date]");
  const freeze = slot(fmt(f.freezeDate), "[date]");
  const appDate = slot(fmt(f.applicationDate), "[date]");
  const wsDate = slot(fmt(f.wsDate), "[date]");
  const reportDate = slot(fmt(f.reportDate), "[date]");
  const applicant = slot(f.applicant, "[name]");
  const destination = f.destination === "the wallet address nominated by the Applicant" && f.destinationWallet
    ? `the wallet address nominated by the Applicant (${clean(f.destinationWallet)})`
    : slot(f.destination, "[the wallet address nominated by the Applicant / the client account of the Applicant's solicitors]");
  const costs = f.costs === "pay"
    ? `The Respondent shall pay the Applicant's costs of this application, summarily assessed in the sum of ${slot(f.costsSum, "£____")}, within 14 days.`
    : f.costs === "none"
      ? "There be no order as to costs."
      : "[The Respondent shall pay the Applicant's costs of this application, summarily assessed in the sum of £____, within 14 days. / There be no order as to costs.]";

  return [
    { type: "band", text: "Draft order lodged by the applicant — not a sealed order of the court" },
    { type: "p", text: "PRECEDENT", align: "center", size: 9, after: 2 },
    { type: "p", text: "DRAFT RELEASE ORDER", bold: true, align: "center", size: 14, after: 10 },
    { type: "p", text: `IN THE ${slot(f.court, "[CITY OF LONDON] MAGISTRATES' COURT")}`, bold: true, align: "center" },
    { type: "p", text: `Case reference ${slot(f.caseRef, "[     ]")}`, align: "center", size: 10 },
    { type: "p", text: `Before ${slot(f.before, "[District Judge ____ / the bench]")}`, align: "center", size: 10 },
    { type: "p", text: `Dated ${dated}`, align: "center", size: 10, after: 8 },
    { type: "rule" },
    { type: "p", text: `IN THE MATTER OF a crypto wallet freezing order made under section 303Z37 of the Proceeds of Crime Act 2002 on ${freeze}` },
    { type: "p", text: "AND IN THE MATTER OF an application under section 303Z51 of that Act", after: 8 },
    { type: "p", text: `Applicant: ${applicant}` },
    { type: "p", text: `Respondent: ${slot(f.respondent, "[Chief Constable of ___ / National Crime Agency / HMRC]")}`, after: 8 },
    { type: "p", text: `UPON the application of the Applicant dated ${appDate}` },
    { type: "p", text: `AND UPON reading the witness statement of ${slot(f.wsName, "[name]")} dated ${wsDate} and the tracing report of ${slot(f.provider, "[provider]")} dated ${reportDate}` },
    { type: "p", text: `AND UPON hearing ${slot(f.hearing, "[the solicitor for the Applicant and the representative of the Respondent / the Respondent neither supporting nor opposing the application]")}`, after: 8 },
    { type: "p", text: "AND THE COURT BEING SATISFIED that:", bold: true },
    { type: "p", n: "(a)", text: "the Applicant was deprived of the cryptoassets to which the application relates, or of property which they represent, by unlawful conduct;" },
    { type: "p", n: "(b)", text: "the cryptoassets of which the Applicant was deprived were not recoverable property immediately before the Applicant was deprived of them; and" },
    { type: "p", n: "(c)", text: "those cryptoassets belong to the Applicant" },
    { type: "space", h: 6 },
    { type: "p", text: "AND THE COURT BEING FURTHER SATISFIED that no proceedings for forfeiture under section 303Z41 of that Act are ongoing in respect of the cryptoassets to be released", after: 8 },
    { type: "p", text: "It is ordered that", bold: true, after: 8 },
    { type: "p", n: "1.", text: `Pursuant to section 303Z51 of the Proceeds of Crime Act 2002, ${slot(f.releasedAssets, "[quantity and asset]")} of the cryptoassets held in the crypto wallet ${slot(f.wallet, "[address]")}, administered by ${slot(f.exchange, "[exchange]")} and the subject of the crypto wallet freezing order dated ${freeze} (the Released Assets), be released to the Applicant.` },
    { type: "p", n: "2.", text: `The Released Assets shall be transferred to ${destination} within seven days of the date of this order, unless a longer period is agreed between the Applicant and ${slot(f.agreeWith, "[the Respondent / the administrator of the wallet]")}.` },
    { type: "p", n: "3.", text: `The crypto wallet freezing order dated ${freeze} shall continue in respect of the balance of the cryptoassets held in the wallet.` },
    { type: "p", n: "4.", text: costs },
    { type: "p", n: "5.", text: "Liberty to apply in respect of the implementation of paragraph 2." },
    { type: "space", h: 16 },
    { type: "p", text: "To be sealed and issued by the court. This draft carries no seal and is of no effect until the court makes an order in these or amended terms.", size: 9 },
    { type: "space", h: 8 },
    { type: "p", text: "Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number 510498. This document is an internal precedent. It is a draft order for lodging with an application; it is not, and must not be presented as, an order of any court. It has not been settled by counsel and must be checked against the legislation and rules in force at the date of use.", size: 8 },
  ];
}

export async function matterPdf(kind, values) {
  const name = values.clientName || values.applicant || "";
  const blocks = kind === "release" ? releaseBlocks(values) : claimBlocks(values);
  const title = kind === "release"
    ? `Edison Law draft release order - ${name || "s.303Z51"}`
    : `Edison Law victim claim - ${name || "s.303Z51"}`;
  const bytes = await writePdf(title, blocks);
  return { bytes, filename: stem(kind, name) };
}

export async function downloadMatter(form) {
  const kind = form.getAttribute("data-matter-form");
  const { bytes, filename } = await matterPdf(kind, formValues(form));
  downloadBytes(bytes, filename);
}
