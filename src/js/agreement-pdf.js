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
  const firmSign = [safeText(data.feeEarnerName), safeText(data.feeEarnerTitle)].filter(Boolean).join(", ");

  const slots = [
    { page: 1, x: 164.7, y0: 108.57, y1: 115.27, w: 370, size: 9, pad: 2, text: data.clientName },
    { page: 1, x: 164.7, y0: 134.06, y1: 140.77, w: 370, size: 9, pad: 2, text: formatDob(data.clientDob) },
    { page: 1, x: 164.7, y0: 159.56, y1: 166.27, w: 370, size: 9, pad: 2, text: data.clientPhone },
    { page: 1, x: 164.7, y0: 185.06, y1: 191.76, w: 370, size: 9, pad: 2, text: data.clientOccupation },
    { page: 5, x: 310.5, y0: 288.56, y1: 295.26, w: 220, size: 9, text: data.clientName },
    { page: 5, x: 68.75, y0: 353.05, y1: 359.76, w: 220, size: 9, text: date },
    { page: 5, x: 310.5, y0: 353.05, y1: 359.76, w: 220, size: 8, text: firmSign },
    { page: 5, x: 404.2, y0: 435.2, y1: 445.2, w: 21, size: 8, pad: 2.2, text: data.clientInitials },
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
