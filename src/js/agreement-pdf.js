import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const TEMPLATE = "/documents/client-authority-consent.pdf";
const PAGE_H = 842.88;
const ink = rgb(10 / 255, 32 / 255, 40 / 255);
const paper = rgb(1, 1, 1);

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
  const [year, month, day] = String(value).split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

function fitText(font, text, size, maxWidth) {
  let value = safeText(text);
  if (!value) return "";
  if (font.widthOfTextAtSize(value, size) <= maxWidth) return value;
  while (value.length > 1 && font.widthOfTextAtSize(`${value}...`, size) > maxWidth) {
    value = value.slice(0, -1);
  }
  return `${value}...`;
}

function vatWord(treatment) {
  return treatment === "including" ? "including" : "plus";
}

function fill(page, font, slot, text) {
  const value = safeText(text);
  const pad = slot.pad ?? 1.2;
  const height = Math.max(slot.y1 - slot.y0, slot.size) + pad * 2;
  const width = slot.w;
  page.drawRectangle({
    x: slot.x - pad,
    y: PAGE_H - slot.y0 - height,
    width: width + pad * 2,
    height,
    color: paper,
  });
  if (!value) return;
  const drawn = fitText(font, value, slot.size, width - 1);
  page.drawText(drawn, {
    x: slot.x,
    y: PAGE_H - slot.y1 + 0.5,
    size: slot.size,
    font,
    color: ink,
  });
}

async function loadTemplate(templateBytes) {
  if (templateBytes) return templateBytes;
  const response = await fetch(TEMPLATE);
  if (!response.ok) throw new Error("The authority form template could not be loaded.");
  return new Uint8Array(await response.arrayBuffer());
}

export async function generateAgreementPdf(data, templateBytes) {
  const pdf = await PDFDocument.load(await loadTemplate(templateBytes));
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  const date = formatAgreementDate(data.agreementDate);
  const vat = vatWord(data.vatTreatment);
  const firmSign = [safeText(data.feeEarnerName), safeText(data.feeEarnerTitle)].filter(Boolean).join(", ");
  const cancel = safeText(data.cancellationEmail) || safeText(data.firmAddress);
  const liability = data.liabilityLimit
    ? `£${String(data.liabilityLimit).replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : "£3,000,000";

  const slots = [
    { page: 0, x: 344.68, y0: 556.37, y1: 565.76, w: 66, size: 8, text: data.sraNumber || "510498" },
    { page: 1, x: 164.7, y0: 108.57, y1: 115.27, w: 370, size: 9, pad: 2, text: data.clientName },
    { page: 1, x: 164.7, y0: 134.06, y1: 140.77, w: 370, size: 9, pad: 2, text: formatDob(data.clientDob) },
    { page: 1, x: 164.7, y0: 159.56, y1: 166.27, w: 370, size: 9, pad: 2, text: data.clientPhone },
    { page: 1, x: 164.7, y0: 185.06, y1: 191.76, w: 370, size: 9, pad: 2, text: data.clientOccupation },
    { page: 1, x: 121.87, y0: 669.62, y1: 679.0, w: 61, size: 8, text: vat },
    { page: 2, x: 261.0, y0: 137.89, y1: 147.28, w: 16, size: 8, text: data.recoveryTailMonths || "12" },
    { page: 3, x: 394.58, y0: 124.39, y1: 133.78, w: 41, size: 7, text: data.updateFrequency || "six weeks" },
    { page: 3, x: 378.85, y0: 468.63, y1: 478.01, w: 120, size: 7.5, text: data.privacyUrl || "edisonlaw.co.uk/privacy" },
    { page: 3, x: 204.97, y0: 530.12, y1: 539.51, w: 48, size: 8, text: liability },
    { page: 3, x: 63.41, y0: 683.12, y1: 692.5, w: 200, size: 7.5, text: cancel },
    { page: 3, x: 490, y0: 744.61, y1: 754.0, w: 52, size: 7, text: data.complaintsPartner },
    { page: 3, x: 53.25, y0: 759.61, y1: 769.0, w: 145, size: 7.5, text: data.complaintsEmail },
    { page: 3, x: 206.66, y0: 759.61, y1: 769.0, w: 12, size: 8, text: data.complaintAckDays || "5" },
    { page: 3, x: 417.49, y0: 759.61, y1: 769.0, w: 12, size: 8, text: data.complaintResponseWeeks || "8" },
    { page: 5, x: 310.5, y0: 288.56, y1: 295.26, w: 220, size: 9, text: data.clientName },
    { page: 5, x: 68.75, y0: 353.05, y1: 359.76, w: 220, size: 9, text: date },
    { page: 5, x: 310.5, y0: 353.05, y1: 359.76, w: 220, size: 8, text: firmSign },
    { page: 5, x: 344.68, y0: 563.12, y1: 572.5, w: 66, size: 8, text: data.sraNumber || "510498" },
  ];

  for (const slot of slots) {
    fill(pages[slot.page], font, slot, slot.text);
  }

  const client = safeText(data.clientName);
  const reference = safeText(data.matterReference);
  pdf.setTitle(`Edison Law client authority and consent - ${reference || client}`);
  pdf.setAuthor("Edison Law");
  pdf.setSubject(`Client authority and consent form for ${client}`);
  pdf.setKeywords(["Edison Law", "client authority", "consent form", "edisonlaw.co.uk"]);
  pdf.setCreator("Edison Law");
  pdf.setProducer("Edison Law");

  return pdf.save();
}
