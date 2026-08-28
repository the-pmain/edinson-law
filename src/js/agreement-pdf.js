import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const ink = rgb(10 / 255, 32 / 255, 40 / 255);
const slate = rgb(83 / 255, 103 / 255, 109 / 255);
const signal = rgb(0, 111 / 255, 99 / 255);
const line = rgb(203 / 255, 218 / 255, 214 / 255);
const white = rgb(1, 1, 1);
const mint = rgb(204 / 255, 234 / 255, 226 / 255);

function safeText(value) {
  return String(value || "")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^\x20-\x7e\u00a0-\u00ff]/g, "");
}

export function formatAgreementDate(value) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.valueOf())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDob(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

function money(value) {
  const cleaned = String(value || "").replace(/[^0-9.]/g, "");
  if (!cleaned) return "";
  const number = Number(cleaned);
  if (!Number.isFinite(number)) return `£${cleaned}`;
  return `£${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(number)}`;
}

function wrapText(font, value, size, maxWidth) {
  const words = safeText(value).split(" ").filter(Boolean);
  if (!words.length) return [];
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) current = candidate;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function vatLine(treatment) {
  return treatment === "including"
    ? "20% fee, inclusive of VAT"
    : "20% fee, plus VAT at the prevailing rate";
}

export async function generateAgreementPdf(data) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([PAGE_W, PAGE_H]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const date = formatAgreementDate(data.agreementDate);
  const reference = safeText(data.matterReference);
  const client = safeText(data.clientName);
  const address = safeText(data.clientAddress);
  const dob = formatDob(data.clientDob);
  const feeEarner = [safeText(data.feeEarnerName), safeText(data.feeEarnerTitle)].filter(Boolean).join(", ");
  const supervisor = [safeText(data.supervisorName), safeText(data.supervisorTitle)].filter(Boolean).join(", ");
  const contact = [safeText(data.feeEarnerEmail), safeText(data.feeEarnerPhone)].filter(Boolean).join("  ·  ");

  page.drawRectangle({ x: 0, y: PAGE_H - 78, width: PAGE_W, height: 78, color: ink });
  page.drawRectangle({ x: 0, y: PAGE_H - 80, width: PAGE_W, height: 2, color: signal });
  page.drawText("EDISON LAW", {
    x: MARGIN,
    y: PAGE_H - 36,
    size: 13,
    font: bold,
    color: white,
  });
  page.drawText("Prepared client agreement", {
    x: MARGIN,
    y: PAGE_H - 52,
    size: 9,
    font: regular,
    color: mint,
  });
  page.drawText("Not yet accepted instructions", {
    x: MARGIN,
    y: PAGE_H - 66,
    size: 7.5,
    font: regular,
    color: rgb(0.62, 0.74, 0.72),
  });

  const refWidth = bold.widthOfTextAtSize(reference, 9);
  page.drawText(reference, {
    x: PAGE_W - MARGIN - refWidth,
    y: PAGE_H - 40,
    size: 9,
    font: bold,
    color: white,
  });
  const dateWidth = regular.widthOfTextAtSize(date, 8);
  page.drawText(date, {
    x: PAGE_W - MARGIN - dateWidth,
    y: PAGE_H - 54,
    size: 8,
    font: regular,
    color: mint,
  });
  const sra = `SRA ${safeText(data.sraNumber)}`;
  const sraWidth = regular.widthOfTextAtSize(sra, 8);
  page.drawText(sra, {
    x: PAGE_W - MARGIN - sraWidth,
    y: PAGE_H - 66,
    size: 8,
    font: regular,
    color: mint,
  });

  let y = PAGE_H - 104;
  const labelW = 108;
  const valueX = MARGIN + labelW;
  const valueW = CONTENT_W - labelW;

  const rule = () => {
    page.drawRectangle({ x: MARGIN, y: y + 8, width: CONTENT_W, height: 0.6, color: line });
    y -= 6;
  };

  const heading = (text) => {
    y -= 6;
    page.drawText(text.toUpperCase(), {
      x: MARGIN,
      y,
      size: 7.5,
      font: bold,
      color: signal,
    });
    y -= 14;
  };

  const row = (label, value) => {
    const lines = wrapText(regular, value, 9, valueW).slice(0, 4);
    const used = lines.length || 1;
    page.drawText(label, { x: MARGIN, y, size: 8, font: regular, color: slate });
    if (!lines.length) {
      page.drawText("—", { x: valueX, y, size: 9, font: regular, color: ink });
    } else {
      lines.forEach((item, index) => {
        page.drawText(item, {
          x: valueX,
          y: y - index * 12,
          size: 9,
          font: regular,
          color: ink,
        });
      });
    }
    y -= used * 12 + 6;
  };

  const para = (text, size = 8.5, leading = 12) => {
    const lines = wrapText(regular, text, size, CONTENT_W);
    lines.forEach((item) => {
      page.drawText(item, { x: MARGIN, y, size, font: regular, color: ink });
      y -= leading;
    });
  };

  heading("Client");
  row("Name", client);
  row("Email", safeText(data.clientEmail));
  row("Address", address);
  row("Date of birth", dob);

  rule();
  heading("Conduct of the matter");
  row("Day to day", feeEarner);
  row("Contact", contact);
  row(
    "Supervision",
    supervisor ? `${supervisor} (${safeText(data.supervisorRole) || "director"})` : "",
  );
  row("Updates", safeText(data.updateFrequency) || "monthly");
  row("First report", `${safeText(data.firstReportWindow) || "8-12"} weeks`);

  rule();
  heading("Terms");
  para(
    `${vatLine(data.vatTreatment)}. Disbursements billed ${safeText(data.billingFrequency) || "monthly"}; ` +
      `${money(data.singleDisbursementLimit) || "£500"} each and ${money(data.aggregateDisbursementLimit) || "£2,500"} in aggregate without further approval. ` +
      `Recovery work may continue for ${safeText(data.recoveryTailMonths) || "12"} months after termination. ` +
      `Interest ${safeText(data.interestRate) || "4"}% above base. Liability capped at ${money(data.liabilityLimit) || "£3,000,000"}. ` +
      `The file is kept for ${safeText(data.fileRetentionYears) || "7"} years. Independent valuer: ${safeText(data.valuationBody) || "RICS"}.`,
  );

  y -= 6;
  rule();
  heading("Complaints");
  para(
    `First contact ${safeText(data.initialComplaintContact) || safeText(data.supervisorName)}. ` +
      `If unresolved, the Complaints Partner, ${safeText(data.complaintsPartner)}, at ${safeText(data.complaintsEmail)}. ` +
      `We acknowledge within ${safeText(data.complaintAckDays) || "5"} working days and give a substantive response within ${safeText(data.complaintResponseWeeks) || "8"} weeks. ` +
      `A copy of the complaints procedure is on edisonlawlegal.com/complaints.`,
  );

  const col = (CONTENT_W - 16) / 2;
  const left = MARGIN;
  const right = MARGIN + col + 16;
  const signY = 128;
  const lineY = 100;
  page.drawText("SIGNATURE", {
    x: MARGIN,
    y: signY,
    size: 7.5,
    font: bold,
    color: signal,
  });
  page.drawText("Client", { x: left, y: signY - 16, size: 8, font: bold, color: ink });
  page.drawText("Edison Law", { x: right, y: signY - 16, size: 8, font: bold, color: ink });
  page.drawLine({
    start: { x: left, y: lineY },
    end: { x: left + col, y: lineY },
    thickness: 0.7,
    color: line,
  });
  page.drawLine({
    start: { x: right, y: lineY },
    end: { x: right + col, y: lineY },
    thickness: 0.7,
    color: line,
  });
  page.drawText(client || "Name", {
    x: left,
    y: lineY - 12,
    size: 7.5,
    font: regular,
    color: slate,
  });
  page.drawText(feeEarner || "Authorised signatory", {
    x: right,
    y: lineY - 12,
    size: 7.5,
    font: regular,
    color: slate,
  });
  page.drawText(`Date  ${date}`, {
    x: left,
    y: lineY - 26,
    size: 7.5,
    font: regular,
    color: slate,
  });
  page.drawText(`Date  ${date}`, {
    x: right,
    y: lineY - 26,
    size: 7.5,
    font: regular,
    color: slate,
  });

  const footer = [
    safeText(data.firmAddress),
    safeText(data.cancellationEmail),
    "edisonlawlegal.com",
  ].filter(Boolean).join("  ·  ");
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: 36, color: ink });
  const footerSize = 7;
  const footerWidth = regular.widthOfTextAtSize(footer, footerSize);
  page.drawText(footer, {
    x: Math.max(MARGIN, (PAGE_W - footerWidth) / 2),
    y: 15,
    size: footerSize,
    font: regular,
    color: mint,
  });

  pdf.setTitle(`Edison Law prepared client agreement - ${reference}`);
  pdf.setAuthor("Edison Law");
  pdf.setSubject(`Prepared client agreement for ${client}`);
  pdf.setKeywords(["Edison Law", "client agreement", "edisonlawlegal.com"]);
  pdf.setCreator("Edison Law");
  pdf.setProducer("Edison Law");

  return pdf.save();
}
