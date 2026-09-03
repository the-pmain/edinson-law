import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { privacyNoticeUrl } from "./agreement-data.js";
import { formatEuDate, formatUkLong } from "../lib/dates.js";

const TEMPLATE = "/documents/client-authority-consent.pdf";
const SCRIPT_FONT = "/fonts/GreatVibes-Regular.ttf";
const PAGE_H = 842.88;
const ink = rgb(10 / 255, 32 / 255, 40 / 255);
const bodyInk = rgb(20 / 255, 37 / 255, 43 / 255);
const pen = rgb(18 / 255, 24 / 255, 48 / 255);
const paper = rgb(1, 1, 1);
const PRIVACY_LINE = { page: 3, x: 51, y0: 467.32, y1: 478.39, w: 493.47, size: 10, leading: 15 };

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
  return formatUkLong(value);
}

function formatDob(value) {
  return formatEuDate(value);
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

function fitSize(font, text, maxWidth, size, minSize) {
  let next = size;
  const value = safeText(text);
  if (!value) return size;
  while (next > minSize && font.widthOfTextAtSize(value, next) > maxWidth) next -= 0.4;
  return next;
}

function wrapLines(font, text, size, maxWidth) {
  const words = safeText(text).split(" ").filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) line = next;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function fillPrivacyUrl(page, font, url) {
  const text = `legitimate interest in investigating and recovering assets. Our privacy notice is at ${safeText(url)}.`;
  let size = PRIVACY_LINE.size;
  let lines = wrapLines(font, text, size, PRIVACY_LINE.w);
  while (lines.length > 2 && size > 8) {
    size -= 0.3;
    lines = wrapLines(font, text, size, PRIVACY_LINE.w);
  }
  if (lines.length > 2) {
    lines = [lines[0], fitText(font, lines.slice(1).join(" "), size, PRIVACY_LINE.w)];
  }
  const coverH = PRIVACY_LINE.leading * lines.length + 2;
  page.drawRectangle({
    x: PRIVACY_LINE.x - 1.2,
    y: PAGE_H - PRIVACY_LINE.y0 - coverH,
    width: PRIVACY_LINE.w + 3,
    height: coverH,
    color: paper,
  });
  lines.forEach((line, index) => {
    page.drawText(line, {
      x: PRIVACY_LINE.x,
      y: PAGE_H - (PRIVACY_LINE.y1 + index * PRIVACY_LINE.leading) + 0.5,
      size,
      font,
      color: bodyInk,
    });
  });
}

function fill(page, font, slot, text) {
  const value = safeText(text);
  const pad = slot.pad ?? 1.2;
  const size = slot.fit
    ? fitSize(font, value, slot.w - 1, slot.size, slot.minSize || 12)
    : slot.size;
  const height = Math.max(slot.y1 - slot.y0, size) + pad * 2;
  const width = slot.w;
  if (slot.cover !== false) {
    page.drawRectangle({
      x: slot.x - pad,
      y: PAGE_H - slot.y0 - height,
      width: width + pad * 2,
      height,
      color: paper,
    });
  }
  if (!value) return;
  const drawn = fitText(font, value, size, width - 1);
  page.drawText(drawn, {
    x: slot.x,
    y: PAGE_H - slot.y1 + 0.5,
    size,
    font,
    color: slot.color || ink,
  });
}

async function loadBytes(url, existing, fail) {
  if (existing) return existing;
  const response = await fetch(url);
  if (!response.ok) throw new Error(fail);
  return new Uint8Array(await response.arrayBuffer());
}

export async function generateAgreementPdf(data, templateBytes, scriptFontBytes) {
  const pdf = await PDFDocument.load(
    await loadBytes(TEMPLATE, templateBytes, "The authority form template could not be loaded."),
  );
  pdf.registerFontkit(fontkit);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const times = await pdf.embedFont(StandardFonts.TimesRoman);
  const script = await pdf.embedFont(
    await loadBytes(SCRIPT_FONT, scriptFontBytes, "The signature font could not be loaded."),
    { subset: true },
  );
  const pages = pdf.getPages();
  const date = formatAgreementDate(data.agreementDate);
  const firmSign = [safeText(data.feeEarnerName), safeText(data.feeEarnerTitle)].filter(Boolean).join(", ");

  const slots = [
    { page: 1, x: 164.7, y0: 108.57, y1: 115.27, w: 370, size: 9, pad: 2, text: data.clientName },
    { page: 1, x: 164.7, y0: 134.06, y1: 140.77, w: 370, size: 9, pad: 2, text: formatDob(data.clientDob) },
    { page: 1, x: 164.7, y0: 159.56, y1: 166.27, w: 370, size: 9, pad: 2, text: data.clientPhone },
    { page: 1, x: 164.7, y0: 185.06, y1: 191.76, w: 370, size: 9, pad: 2, text: data.clientOccupation },
    {
      page: 5,
      x: 66.5,
      y0: 274,
      y1: 293.4,
      w: 228,
      size: 22,
      minSize: 13,
      fit: true,
      cover: false,
      font: script,
      color: pen,
      text: data.clientName,
    },
    { page: 5, x: 310.5, y0: 288.56, y1: 295.26, w: 220, size: 9, text: data.clientName },
    { page: 5, x: 68.75, y0: 353.05, y1: 359.76, w: 220, size: 9, text: date },
    { page: 5, x: 310.5, y0: 353.05, y1: 359.76, w: 220, size: 8, text: firmSign },
    { page: 5, x: 404.2, y0: 435.2, y1: 445.2, w: 21, size: 8, pad: 2.2, text: data.clientInitials },
  ];

  for (const slot of slots) {
    fill(pages[slot.page], slot.font || font, slot, slot.text);
  }
  fillPrivacyUrl(pages[PRIVACY_LINE.page], times, privacyNoticeUrl(data.privacyUrl));

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
