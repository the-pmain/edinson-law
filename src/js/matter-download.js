import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { downloadBytes } from "./agreement-data.js";
import { embedDocumentFonts } from "./document-fonts.js";
import { buildClaimTrust, verificationBadge } from "./claim-trust.js";
import { extractEthAddress, formatEthAddress } from "./eth-address.js";
import {
  coerceSraFeeEarner,
  formatAssetAmount,
  parseMoneyAmount,
  validateMatterFields,
} from "./matter-validate.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const ink = rgb(10 / 255, 32 / 255, 40 / 255);
const slate = rgb(83 / 255, 103 / 255, 109 / 255);
const line = rgb(203 / 255, 218 / 255, 214 / 255);
const white = rgb(1, 1, 1);
const signal = rgb(0, 111 / 255, 99 / 255);
const copper = rgb(184 / 255, 90 / 255, 56 / 255);
const copperSoft = rgb(240 / 255, 216 / 255, 205 / 255);
const A4 = [595.28, 841.89];
const HEADER_H = 96;
const MARGIN = 56;
const FOOTER_GAP = 48;

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

const PLACEHOLDER_NAME_RE = /^\[.+\]$|^(thelegal|test|n\/?a|tbd|todo|placeholder|full name)$/i;

function titleCasePersonName(value) {
  const text = clean(value);
  if (!text || PLACEHOLDER_NAME_RE.test(text)) return "";
  return text.replace(/[\p{L}']+/gu, (word) => {
    if (/^(of|de|van|von|da|del|la|le)$/i.test(word)) return word.toLowerCase();
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

function applicantDisplayName(value) {
  return titleCasePersonName(value) || "the Applicant";
}

function caseReferenceLine(value) {
  const text = clean(value);
  if (!text || /to be allocated|tbc|tba|confidential|\[/i.test(text)) {
    return "Case reference: [CONFIDENTIAL CLIENT INFORMATION]";
  }
  return `Case reference: ${text}`;
}

function slot(value, fallback) {
  const text = clean(value);
  return text || fallback;
}

function stem(kind, name) {
  const who = String(name || "matter").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const file = kind === "release"
    ? "Edison-Law-Release-Order-s303Z51"
    : kind === "matter"
      ? "Edison-Law-Application-of-Release-Order-s303Z51"
      : "Edison-Law-Victim-Claim-s303Z51";
  return `${file}-${who || "completed"}.pdf`;
}

const FIRM = {
  name: "Edison Law",
  role: "Solicitors",
  phone: "",
  email: "abi.wills@edisonlaw.co.uk",
  address: ["12 Augustus Road", "Wimbledon", "London SW19 6LN"],
  sra: "510498",
};

const LOGO_PATH = "public/brand/matter-crest.jpg";
const LOGO_HREF = "/brand/matter-crest.jpg";
const LOGO_MAX_H = 84;
const LETTERHEAD_TITLE = "Edison Law";
const DRAMA_PHONE = /(?:\+44\s*20|0\s*20)\s*7946\s*0\d{3}/;

async function loadLogoBytes() {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(LOGO_HREF);
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
    } catch {
      // Relative /brand URLs fail in Node; use the file on disk.
    }
  }
  if (typeof window !== "undefined") {
    throw new Error("The letterhead logo could not be read.");
  }
  const { readFileSync } = await import(/* @vite-ignore */ "node:fs");
  const { resolve } = await import(/* @vite-ignore */ "node:path");
  return new Uint8Array(readFileSync(resolve(process.cwd(), LOGO_PATH)));
}

async function embedLogo(pdf) {
  try {
    const bytes = await loadLogoBytes();
    if (bytes[0] === 0xff && bytes[1] === 0xd8) return await pdf.embedJpg(bytes);
    return await pdf.embedPng(bytes);
  } catch {
    return null;
  }
}

function drawCrest(page, cx, y, color, scale = 1) {
  const s = scale;
  page.drawEllipse({
    x: cx,
    y,
    xScale: 14 * s,
    yScale: 16 * s,
    borderColor: color,
    borderWidth: 1.15,
  });
  page.drawLine({
    start: { x: cx - 11 * s, y: y + 5 * s },
    end: { x: cx + 11 * s, y: y + 5 * s },
    thickness: 1.15,
    color,
  });
  page.drawLine({
    start: { x: cx, y: y + 9.5 * s },
    end: { x: cx, y: y - 8 * s },
    thickness: 1.15,
    color,
  });
  page.drawCircle({ x: cx - 8.5 * s, y: y - 2.4 * s, size: 3 * s, borderColor: color, borderWidth: 1 });
  page.drawCircle({ x: cx + 8.5 * s, y: y - 2.4 * s, size: 3 * s, borderColor: color, borderWidth: 1 });
}

function usablePhone(value) {
  const text = clean(value);
  if (!text || DRAMA_PHONE.test(text)) return "";
  return text;
}

function letterheadContacts(f, people = []) {
  const coerced = coerceSraFeeEarner(f.feeEarner, people);
  const earner = feeEarnerParts(coerced);
  return {
    phone: usablePhone(earner.phone) || usablePhone(FIRM.phone),
  };
}

function normalizeMoneyField(value, fallbackUnit = "") {
  const parsed = parseMoneyAmount(value);
  if (!parsed.ok || parsed.amount == null) return clean(value);
  const unit = parsed.unit || fallbackUnit;
  if (unit === "GBP" || String(value || "").trim().startsWith("£")) {
    return `£${parsed.amount.toLocaleString("en-GB")}`;
  }
  return formatAssetAmount(parsed.amount, unit || "USDT");
}

function sanitizeMatterValues(values, people = []) {
  const next = { ...values };
  if (next.feeEarner != null) next.feeEarner = coerceSraFeeEarner(next.feeEarner, people);
  for (const key of ["claimed", "walletHolds", "releasedAssets"]) {
    if (next[key]) next[key] = normalizeMoneyField(next[key], "USDT");
  }
  if (next.lossValue) next.lossValue = normalizeMoneyField(next.lossValue, "GBP");
  for (const key of ["wallet", "destinationWallet"]) {
    if (next[key]) next[key] = formatEthAddress(next[key]);
  }
  return next;
}

function drawLetterhead(page, regular, bold, color, { edge, refs = [], logo, phone = "" } = {}) {
  const cx = A4[0] / 2;
  const logoH = logo ? LOGO_MAX_H : 37;
  const logoW = logo ? logoH * (logo.width / logo.height) : 64;
  const logoY = A4[1] - 16 - logoH;
  if (logo) {
    page.drawImage(logo, {
      x: cx - logoW / 2,
      y: logoY,
      width: logoW,
      height: logoH,
    });
  } else {
    drawCrest(page, cx, logoY + logoH / 2, color, 1.15);
  }
  const nameSize = 15;
  const nameY = logoY - 18;
  page.drawText(LETTERHEAD_TITLE, {
    x: cx - bold.widthOfTextAtSize(LETTERHEAD_TITLE, nameSize) / 2,
    y: nameY,
    size: nameSize,
    font: bold,
    color,
  });
  const infoTop = nameY - 28;
  const infoSize = 11;
  const leading = 14;
  let leftY = infoTop;
  const left = [
    phone ? `Phone: ${phone}` : "",
  ].filter(Boolean);
  left.forEach((text) => {
    page.drawText(text, { x: edge, y: leftY, size: infoSize, font: regular, color });
    leftY -= leading;
  });
  let rightY = infoTop;
  const right = [...FIRM.address];
  if (refs.length) {
    right.push("");
    right.push(...refs);
  }
  right.forEach((text) => {
    if (!text) {
      rightY -= 8;
      return;
    }
    page.drawText(text, {
      x: A4[0] - edge - regular.widthOfTextAtSize(text, infoSize),
      y: rightY,
      size: infoSize,
      font: regular,
      color,
    });
    rightY -= leading;
  });
  return Math.min(leftY, rightY) - 36;
}

function feeEarnerParts(value) {
  const parts = String(value || "").split(/\s*[·•|]\s*/).map((part) => part.trim()).filter(Boolean);
  const name = parts[0] || "";
  const email = parts.find((part) => part.includes("@")) || "";
  const phone = parts.find((part) => part !== name && part !== email && /[0-9]{4,}/.test(part)) || "";
  return { name, phone, email };
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

async function writePdf(title, blocks, {
  footer = "Edison Law",
  style = "brand",
  letterheadInfo = {},
  watermark = "",
  documentId = "",
  generatedAt = "",
} = {}) {
  const letterhead = style === "letterhead";
  const courtDraft = style === "court-draft";
  const pdf = await PDFDocument.create();
  const { regular, bold, sans, sansBold } = await embedDocumentFonts(pdf);
  const italic = letterhead ? await pdf.embedFont(StandardFonts.TimesRomanItalic) : null;
  const logo = letterhead ? await embedLogo(pdf) : null;
  const edge = letterhead ? 64 : MARGIN;
  const width = A4[0] - edge * 2;
  const footerText = clean(footer);
  const copy = letterhead || courtDraft ? rgb(0.07, 0.07, 0.07) : ink;
  const draftGray = rgb(0.86, 0.87, 0.88);
  let page;
  let y = 0;
  let pageNo = 0;
  let part = 0;

  const drawWatermark = (target) => {
    if (!watermark) return;
    target.drawText(watermark, {
      x: 132,
      y: 248,
      size: 84,
      font: sansBold,
      color: draftGray,
      rotate: degrees(45),
    });
  };

  const drawDraftFooter = (target, n, total) => {
    const left = 56;
    const usable = A4[0] - 112;
    target.drawRectangle({ x: left, y: 40, width: usable, height: 0.4, color: line });
    const one = "Draft order - not sealed. Of no effect until the court makes an order and the court office issues it.";
    const two = [
      documentId ? `Document ID: ${documentId}` : "",
      `Page ${n} of ${total}`,
      generatedAt ? `Prepared ${generatedAt}` : "",
      `Edison Law  SRA ${FIRM.sra}`,
    ].filter(Boolean).join("  |  ");
    target.drawText(one, { x: left, y: 28, size: 6.5, font: sans, color: slate });
    target.drawText(two, { x: left, y: 16, size: 6.5, font: sans, color: slate });
  };

  const drawBrandFooter = (target, n) => {
    target.drawRectangle({ x: edge, y: 32, width, height: 0.4, color: line });
    target.drawText(footerText, { x: edge, y: 20, size: 7, font: sans, color: slate });
    const num = String(n);
    target.drawText(num, {
      x: A4[0] - edge - sans.widthOfTextAtSize(num, 7),
      y: 20,
      size: 7,
      font: sans,
      color: slate,
    });
  };

  const drawLetterFooter = (target, n) => {
    if (n === 1) {
      target.drawRectangle({ x: edge, y: 44, width: 80, height: 0.5, color: copy });
      const size = 8;
      const markSize = 5.5;
      let fx = edge;
      const fy = 32;
      target.drawText("1", {
        x: fx,
        y: fy + 3.2,
        size: markSize,
        font: regular,
        color: copy,
      });
      fx += regular.widthOfTextAtSize("1", markSize) + 3;
      const before = "Victoria, ";
      target.drawText(before, { x: fx, y: fy, size, font: regular, color: copy });
      fx += regular.widthOfTextAtSize(before, size);
      const debates = "Parliamentary Debates";
      target.drawText(debates, { x: fx, y: fy, size, font: italic || regular, color: copy });
      fx += (italic || regular).widthOfTextAtSize(debates, size);
      target.drawText(", Legislative Council, 29 February 2012, 1055 (Jaala Pulford)", {
        x: fx,
        y: fy,
        size,
        font: regular,
        color: copy,
      });
      return;
    }
    const num = String(n);
    target.drawText(num, {
      x: (A4[0] - regular.widthOfTextAtSize(num, 9)) / 2,
      y: 28,
      size: 9,
      font: regular,
      color: copy,
    });
  };

  const drawHeader = (target) => {
    target.drawRectangle({
      x: 0,
      y: A4[1] - HEADER_H,
      width: A4[0],
      height: HEADER_H,
      color: ink,
    });
    const brand = "EDISON LAW";
    const brandSize = 18;
    target.drawText(brand, {
      x: (A4[0] - sansBold.widthOfTextAtSize(brand, brandSize)) / 2,
      y: A4[1] - 40,
      size: brandSize,
      font: sansBold,
      color: white,
    });
    const ruleW = 52;
    target.drawRectangle({
      x: (A4[0] - ruleW) / 2,
      y: A4[1] - 50,
      width: ruleW,
      height: 1.5,
      color: signal,
    });
    const practice = "PRIVATE PROSECUTIONS  ·  ASSET RECOVERY  ·  FINANCIAL CRIME";
    const practiceSize = 6.5;
    target.drawText(practice, {
      x: (A4[0] - sans.widthOfTextAtSize(practice, practiceSize)) / 2,
      y: A4[1] - 68,
      size: practiceSize,
      font: sans,
      color: rgb(214 / 255, 226 / 255, 222 / 255),
    });
    return A4[1] - HEADER_H - 22;
  };

  const addPage = (first) => {
    page = pdf.addPage(A4);
    pageNo += 1;
    if (courtDraft) {
      drawWatermark(page);
      y = first ? A4[1] - 40 : A4[1] - 48;
      return;
    }
    if (letterhead) {
      drawLetterFooter(page, pageNo);
      y = first
        ? drawLetterhead(page, regular, bold, copy, {
          edge,
          refs: letterheadInfo.refs || [],
          logo,
          phone: letterheadInfo.phone || "",
        })
        : A4[1] - 72;
      return;
    }
    drawBrandFooter(page, pageNo);
    y = first ? drawHeader(page) : A4[1] - 54;
  };

  const foot = courtDraft ? 58 : letterhead ? 58 : FOOTER_GAP;
  const ensure = (need) => {
    if (y - need >= foot) return;
    addPage(false);
  };

  const drawLines = (lines, font, size, leading, color = copy, align = "left") => {
    lines.forEach((line) => {
      ensure(leading);
      const w = font.widthOfTextAtSize(line, size);
      const x = align === "center" ? (A4[0] - w) / 2 : edge;
      page.drawText(line, { x, y, size, font, color });
      y -= leading;
    });
  };

  const drawCallout = (text) => {
    const size = 9;
    const leading = 12;
    const padX = 16;
    const padY = 12;
    const lines = wrap(regular, text, size, width - padX * 2 - 4);
    const h = lines.length * leading + padY * 2;
    ensure(h + 8);
    const boxY = y - h + 8;
    page.drawRectangle({ x: edge, y: boxY, width, height: h, color: copperSoft });
    page.drawRectangle({ x: edge, y: boxY, width: 4, height: h, color: copper });
    let ty = y - 4;
    lines.forEach((line) => {
      page.drawText(line, { x: edge + padX, y: ty, size, font: regular, color: ink });
      ty -= leading;
    });
    y -= h + 12;
  };

  addPage(true);

  blocks.forEach((block) => {
    if (block.type === "space") {
      y -= block.h || 10;
      return;
    }
    if (block.type === "break") {
      part = 0;
      addPage(true);
      return;
    }
    if (block.type === "rule") {
      ensure(16);
      page.drawRectangle({ x: edge, y: y + 6, width, height: 0.45, color: letterhead ? copy : line });
      y -= 12;
      return;
    }
    if (block.type === "callout") {
      drawCallout(block.text);
      return;
    }
    if (block.type === "notice") {
      const size = 8.5;
      const leading = 11;
      const padX = 10;
      const padY = 10;
      const lines = wrap(sansBold, block.text, size, width - padX * 2);
      const h = lines.length * leading + padY * 2;
      ensure(h + 8);
      const boxY = y - h + 8;
      page.drawRectangle({
        x: edge,
        y: boxY,
        width,
        height: h,
        color: rgb(0.96, 0.96, 0.96),
        borderColor: copy,
        borderWidth: 0.6,
      });
      let ty = y - 6;
      lines.forEach((line) => {
        page.drawText(line, { x: edge + padX, y: ty, size, font: sansBold, color: copy });
        ty -= leading;
      });
      y -= h + 12;
      return;
    }
    if (block.type === "qr") {
      const matrix = block.matrix;
      const modules = block.size || matrix?.length || 0;
      if (!modules || !matrix) return;
      const quiet = 3;
      const cell = block.cell || 1.35;
      const qrW = (modules + quiet * 2) * cell;
      const textWidth = Math.max(120, width - qrW - 14);
      const captionLines = wrap(sansBold, block.caption || "", 8, textWidth);
      const urlLines = wrap(sans, block.url || "", 7, textWidth);
      const statusLines = wrap(sans, block.status || "", 8, textWidth);
      const textH = (captionLines.length + urlLines.length + statusLines.length) * 11 + 6;
      const h = Math.max(qrW, textH) + 6;
      ensure(h + 8);
      const boxY = y - qrW;
      const black = letterhead ? copy : ink;
      page.drawRectangle({
        x: edge,
        y: boxY,
        width: qrW,
        height: qrW,
        color: white,
        borderColor: line,
        borderWidth: 0.45,
      });
      for (let row = 0; row < modules; row += 1) {
        for (let col = 0; col < modules; col += 1) {
          if (!matrix[row][col]) continue;
          page.drawRectangle({
            x: edge + (quiet + col) * cell,
            y: boxY + (quiet + (modules - 1 - row)) * cell,
            width: cell + 0.12,
            height: cell + 0.12,
            color: black,
          });
        }
      }
      let ty = y - 4;
      const tx = edge + qrW + 14;
      const paintSide = (lines, size, font, color) => {
        lines.forEach((line) => {
          page.drawText(line, { x: tx, y: ty, size, font, color });
          ty -= 11;
        });
      };
      paintSide(captionLines, 8, sansBold, black);
      paintSide(urlLines, 7, sans, slate);
      paintSide(statusLines, 8, sans, slate);
      y -= h + 8;
      return;
    }
    if (block.type === "exhibit") {
      const padX = 12;
      const leading = 11;
      const titleLines = wrap(sansBold, `Exhibit ${block.mark}  ${block.badge || ""}`, 9, width - padX * 2);
      const bodyLines = wrap(regular, block.title || "", 9, width - padX * 2);
      const digestLines = wrap(sans, `SHA-256  ${block.digest || ""}`, 7, width - padX * 2);
      const scoreLines = wrap(sans, `Evidence completeness  ${block.score}/100  ·  ${block.scoreLabel || ""}`, 8, width - padX * 2);
      const noteLines = wrap(regular, block.note || "", 8, width - padX * 2);
      const h = (titleLines.length + bodyLines.length + digestLines.length + scoreLines.length + noteLines.length) * leading + 20;
      ensure(h + 8);
      const boxY = y - h + 8;
      page.drawRectangle({
        x: edge,
        y: boxY,
        width,
        height: h,
        color: rgb(247 / 255, 250 / 255, 249 / 255),
      });
      page.drawRectangle({ x: edge, y: boxY, width: 3, height: h, color: signal });
      let ty = y - 2;
      const paint = (lines, size, font, color) => {
        lines.forEach((line) => {
          page.drawText(line, { x: edge + padX, y: ty, size, font, color });
          ty -= leading;
        });
      };
      paint(titleLines, 9, sansBold, ink);
      paint(bodyLines, 9, regular, copy);
      paint(digestLines, 7, sans, slate);
      paint(scoreLines, 8, sans, slate);
      paint(noteLines, 8, regular, slate);
      y -= h + 10;
      return;
    }
    if (block.type === "split") {
      const left = (block.left || []).map((text) => clean(text)).filter(Boolean);
      const right = (block.right || []).map((text) => clean(text)).filter(Boolean);
      const rows = Math.max(left.length, right.length);
      const leading = 14;
      ensure(rows * leading + 8);
      for (let i = 0; i < rows; i += 1) {
        if (left[i]) page.drawText(left[i], { x: edge, y, size: 11, font: regular, color: copy });
        if (right[i]) {
          const w = regular.widthOfTextAtSize(right[i], 11);
          page.drawText(right[i], { x: A4[0] - edge - w, y, size: 11, font: regular, color: copy });
        }
        y -= leading;
      }
      y -= block.after != null ? block.after : 12;
      return;
    }
    if (block.type === "subject") {
      const lines = wrap(bold, block.text, 11, width);
      ensure(lines.length * 15 + 10);
      drawLines(lines, bold, 11, 15, copy);
      y -= 14;
      return;
    }
    if (block.type === "footnote") {
      ensure(28);
      y -= 8;
      page.drawRectangle({ x: edge, y: y + 10, width: 80, height: 0.5, color: copy });
      const lines = wrap(regular, block.text, 8, width);
      drawLines(lines, regular, 8, 11, copy);
      return;
    }
    if (block.type === "kicker") {
      ensure(18);
      drawLines([clean(block.text).toUpperCase()], sansBold, 8, 12, courtDraft ? copy : signal, block.align || "left");
      y -= 6;
      return;
    }
    if (block.type === "title") {
      const size = block.size || 15;
      const leading = size + 4;
      const lines = wrap(bold, block.text, size, width);
      ensure(lines.length * leading + 8);
      drawLines(lines, bold, size, leading, letterhead || courtDraft ? copy : ink, block.align || "left");
      y -= 10;
      return;
    }
    if (block.type === "h") {
      const heading = clean(block.text);
      const numbered = /^\d+\./.test(heading);
      if (letterhead || courtDraft) {
        const lines = wrap(bold, heading, 11, width);
        ensure(lines.length * 15 + 56);
        y -= 16;
        drawLines(lines, bold, 11, 15, copy);
        y -= 4;
        return;
      }
      ensure(numbered ? 30 : 44);
      y -= 8;
      if (!numbered) {
        part += 1;
        const label = `PART ${part}`;
        const size = 7;
        const boxW = sansBold.widthOfTextAtSize(label, size) + 10;
        page.drawRectangle({
          x: edge,
          y: y - 3,
          width: boxW,
          height: 13,
          color: signal,
        });
        page.drawText(label, {
          x: edge + 5,
          y,
          size,
          font: sansBold,
          color: white,
        });
        y -= 20;
      }
      drawLines(wrap(sansBold, heading, 9, width), sansBold, 9, 12, ink);
      page.drawRectangle({ x: edge, y: y + 6, width, height: 0.45, color: line });
      y -= 10;
      return;
    }

    const fine = !letterhead && !courtDraft && (block.size || 11) <= 9 && !block.bold;
    const font = fine ? sans : block.bold ? bold : regular;
    const size = block.size || (letterhead || courtDraft ? 11 : 10.5);
    const leading = block.leading || (letterhead || courtDraft ? 15 : fine ? 12 : 15);
    const color = fine ? slate : copy;
    const align = block.align || "left";
    const marker = block.n ? String(block.n) : "";
    const markerFont = letterhead || courtDraft ? bold : sansBold;
    const markerColor = letterhead || courtDraft ? copy : signal;

    if (marker && align === "left") {
      const hang = marker === "•"
        ? (letterhead ? 18 : 16)
        : Math.max(marker.startsWith("[") ? 32 : 24, markerFont.widthOfTextAtSize(`${marker}  `, size));
      const lines = wrap(font, block.text, size, width - hang);
      ensure(lines.length * leading + 8);
      if (marker === "•") {
        page.drawRectangle({
          x: edge + (letterhead ? 4 : 3),
          y: y + 2,
          width: letterhead ? 3.6 : 3.2,
          height: letterhead ? 3.6 : 3.2,
          color: letterhead ? copy : signal,
        });
      } else {
        page.drawText(marker, {
          x: edge,
          y,
          size,
          font: markerFont,
          color: markerColor,
        });
      }
      lines.forEach((line, i) => {
        page.drawText(line, {
          x: edge + hang,
          y: y - i * leading,
          size,
          font,
          color,
        });
      });
      y -= lines.length * leading;
      y -= block.after != null ? block.after : (letterhead || courtDraft ? 6 : 5);
      return;
    }

    const lines = wrap(font, block.text, size, width);
    drawLines(lines, font, size, leading, color, align);
    y -= block.after != null ? block.after : (letterhead || courtDraft ? 8 : fine ? 4 : 7);
  });

  if (courtDraft) {
    const pages = pdf.getPages();
    const total = pages.length;
    pages.forEach((target, i) => drawDraftFooter(target, i + 1, total));
  }

  pdf.setTitle(title);
  pdf.setAuthor("Edison Law");
  pdf.setCreator("Edison Law");
  pdf.setProducer("Edison Law");
  if (courtDraft) {
    pdf.setSubject("Draft order for lodging. Not sealed. Of no effect until the court makes an order.");
  }
  return pdf.save();
}

function letterheadRefs(f) {
  return [
    `Our ref: ${slot(f.ourRef, "[our reference]")}`,
    `Crime ref: ${slot(f.crimeRef, "[Action Fraud reference]")}`,
    ...(f.policeUrn ? [`Police URN: ${clean(f.policeUrn)}`] : []),
  ];
}

function badgeFor(trust, key) {
  const status = trust?.items?.[key];
  return status ? `  ${verificationBadge(status)}` : "";
}

function claimBlocks(f, trust = null) {
  const today = todayIso();
  const letterDate = fmt(today);
  const orderDateL = slot(fmt(f.orderDate), "[order date]");
  const reportDateL = slot(fmt(f.reportDate), "[report date]");
  const client = slot(f.clientName, "[client's name]");
  const address = slot(f.clientAddr, "[client's address]");
  const claimed = slot(f.claimed, "[amount claimed]");
  const holds = slot(f.walletHolds, "[wallet contents]");
  const wsName = slot(f.clientName, "[witness name]");
  const wsDate = letterDate;
  const exhibit = exhibitOf(f.clientName) || "[exhibit]";
  const orderExpiry = shift(f.orderDate, 0, 2) || "[expiry date]";
  const replyBy = shift(today, 14) || "[reply-by date]";
  const officer = slot(f.officer, "[officer]");
  const agency = slot(f.agency, "[agency]");
  const copyTo = slot(f.copyTo, "[copy to]");
  const earner = feeEarnerParts(f.feeEarner);
  const signName = (earner.name || "[fee earner]").toUpperCase();
  const contact = [
    earner.name ? earner.name : slot("", "[fee earner]"),
    usablePhone(earner.phone) ? `on ${usablePhone(earner.phone)}` : "",
    earner.email ? `${usablePhone(earner.phone) ? "or at" : "at"} ${earner.email}` : "",
  ].filter(Boolean).join(" ");
  const otherVictims = f.claimants === "some"
    ? `The Applicant is aware of ${slot(f.claimantsN, "[how many]")} other persons who claim to be victims of the same or related conduct and whose claims may attach to the Frozen Wallet.`
    : "The Applicant is not aware of any competing claim to the cryptoassets held in the Frozen Wallet.";
  const crimeLine = [
    `Our ref ${slot(f.ourRef, "[our reference]")}`,
    `Crime ref ${slot(f.crimeRef, "[Action Fraud reference]")}`,
    f.policeUrn ? `Police URN ${clean(f.policeUrn)}` : "",
  ].filter(Boolean).join("  ·  ");
  const share = trust?.proportion?.ok
    ? `The claimed quantity is ${trust.proportion.percent}% of the recorded frozen balance (${trust.proportion.claimedLabel} of ${trust.proportion.holdsLabel}).`
    : "";
  const exhibits = Array.isArray(trust?.exhibits) ? trust.exhibits : [];

  return [
    { type: "kicker", text: "NOTICE", align: "center" },
    { type: "title", text: "VICTIM CLAIM TO FROZEN CRYPTOASSETS", align: "center", size: 16 },
    { type: "p", text: `IN THE ${slot(f.court, "[court]")}`, bold: true, align: "center" },
    { type: "p", text: crimeLine, align: "center", size: 10 },
    { type: "p", text: "By email", align: "center", size: 10 },
    { type: "p", text: `Dated ${letterDate}`, align: "center", size: 10, after: 8 },
    { type: "rule" },
    { type: "p", text: `IN THE MATTER OF a crypto wallet freezing order made under section 303Z37 of the Proceeds of Crime Act 2002 on ${orderDateL}` },
    { type: "p", text: "AND IN THE MATTER OF a victim claim under section 303Z51 of that Act for the release of cryptoassets", after: 4 },
    { type: "p", text: trust?.citations?.statute || "Cited to ss.303Z37 and 303Z51 POCA 2002 and rule 12 of the Magistrates' Courts (Detention, Freezing and Forfeiture of Cryptoassets, and Miscellaneous Amendments) Rules 2024.", size: 8, after: 8 },
    { type: "p", text: `Applicant: ${client}, of ${address}${badgeFor(trust, "identity")}` },
    { type: "p", text: `To: ${officer}, ${agency}` },
    { type: "p", text: `Copy: ${copyTo}`, after: 8 },
    { type: "p", text: `UPON notice that the Applicant was induced to transfer ${claimed}, then worth approximately ${slot(f.lossValue, "[value lost]")}, on ${slot(f.fraudDates, "[dates of the fraud]")}, and that the fraud was reported to Action Fraud under reference ${slot(f.crimeRef, "[Action Fraud reference]")}${f.policeUrn ? ` (police URN ${clean(f.policeUrn)})` : ""}${badgeFor(trust, "nfrc")}` },
    { type: "p", text: `AND UPON the Applicant claiming ${claimed} of the cryptoassets held in the wallet ${slot(f.wallet, "[wallet address]")}, administered by ${slot(f.exchange, "[exchange]")} and frozen by the above order (the Frozen Wallet), which holds ${holds}${badgeFor(trust, "wallet")}` },
    ...(share ? [{ type: "p", text: share, size: 9 }] : []),
    ...(trust?.qr
      ? [{
        type: "qr",
        matrix: trust.qr.data,
        size: trust.qr.size,
        url: trust.explorer,
        caption: "Independent explorer for the frozen wallet",
        status: trust.citations?.wallet || "",
      }]
      : []),
    { type: "p", text: "AND UPON the Applicant intending to apply to the court for release of those assets under section 303Z51, without seeking to disturb the freezing order itself", after: 8 },
    { type: "p", text: "THE APPLICANT'S CASE ON THE THREE STATUTORY LIMBS is that:", bold: true },
    { type: "p", n: "(a)", text: `the Applicant was deprived of the cryptoassets, or of property which they represent, by unlawful conduct, namely ${slot(f.scamDesc, "[how the scam worked]")};${badgeFor(trust, "limbA")}` },
    { type: "p", n: "(b)", text: `the cryptoassets of which the Applicant was deprived were not recoverable property immediately before the Applicant was deprived of them, having been acquired by ${slot(f.funds, "[how the client came by the money]")}; and${badgeFor(trust, "limbB")}` },
    { type: "p", n: "(c)", text: `those cryptoassets belong to the Applicant. The tracing analysis of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL} follows the Applicant's transfers from ${slot(f.originAddr, "[origin address]")} through ${slot(f.route, "[tracing route]")}, and attributes ${claimed} to the Applicant.${badgeFor(trust, "limbC")}` },
    { type: "space", h: 6 },
    { type: "p", text: otherVictims, after: 8 },
    { type: "p", text: "Schedule of exhibits", bold: true, after: 6 },
    { type: "p", text: "Each digest is a SHA-256 fingerprint of the particulars recorded in this file. It is not a qualified electronic signature and it is not a court or SRA seal. Completeness scores reflect whether required particulars are present, not the merits.", size: 8, after: 8 },
    ...(exhibits.length
      ? exhibits.map((item) => ({ type: "exhibit", ...item }))
      : [
        { type: "p", n: "1.", text: `the witness statement of ${wsName} dated ${wsDate}, with exhibit ${exhibit};` },
        { type: "p", n: "2.", text: `the tracing report of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL};` },
        { type: "p", n: "3.", text: "bank and exchange records evidencing the transfers out and the lawful source of the funds; and" },
        { type: "p", n: "4.", text: "the Action Fraud report and correspondence with the platform.", after: 8 },
      ]),
    { type: "p", text: "The Applicant invites confirmation of the following", bold: true, after: 8 },
    { type: "p", n: "1.", text: "whether the addressee supports, opposes or is neutral on the Applicant's claim;" },
    { type: "p", n: "2.", text: "whether any other victim has made or notified a claim to the assets in the Frozen Wallet, and if so how many and for what aggregate sum;" },
    { type: "p", n: "3.", text: "the current quantity and value of the cryptoassets held in the Frozen Wallet;" },
    { type: "p", n: "4.", text: `whether an extension or a forfeiture application is contemplated before the order expires on ${orderExpiry}, and on what timetable; and` },
    { type: "p", n: "5.", text: "whether anything further is required from the Applicant before the application is issued.", after: 8 },
    { type: "p", text: "The Applicant is willing to co-operate fully with the investigation, including by providing a further statement or attending to give evidence should that assist." },
    { type: "p", text: `Please respond by ${replyBy}. The Applicant will issue in any event thereafter, in order to protect their position before the freezing order expires.` },
    { type: "p", text: `If you have any queries, please contact ${contact}.`, after: 8 },
    { type: "space", h: 12 },
    { type: "p", text: `Signed                    ${signName}, solicitor for the Applicant    ·    Dated  ${letterDate}` },
    { type: "p", text: trust?.citations?.solicitor || `Solicitor: confirm practising status on the SRA public register, organisation ${FIRM.sra}.`, size: 8, after: 8 },
    ...(trust?.digest
      ? [{ type: "p", text: `Canonical fact digest (SHA-256): ${trust.digest}`, size: 7 }]
      : []),
    { type: "space", h: 10 },
    { type: "p", text: `Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${FIRM.sra}.`, size: 8 },
  ];
}

function matterBlocks(f) {
  const today = todayIso();
  const letterDate = fmt(today);
  const orderDateL = slot(fmt(f.orderDate), "the date of the freezing order");
  const reportDateL = slot(fmt(f.reportDate), "the date of the tracing report");
  const client = applicantDisplayName(f.clientName);
  const claimed = slot(f.claimed, "the claimed cryptoassets");
  const respondent = slot(f.respondent || f.agency, "the Respondent");
  const wsName = applicantDisplayName(f.clientName);
  const wsDate = letterDate;
  const exhibit = exhibitOf(titleCasePersonName(f.clientName)) || "A1";
  const orderExpiry = shift(f.orderDate, 0, 2) || "the expiry of the freezing order";
  const caseRef = caseReferenceLine(f.caseRef);
  const provider = slot(f.provider, "the analytics provider");
  const exchange = slot(f.exchange, "the wallet administrator");
  const wallet = slot(f.wallet, "the frozen wallet");
  const holds = slot(f.walletHolds, "cryptoassets");
  const crimeRef = slot(f.crimeRef, "the Action Fraud reference");
  const address = clean(f.clientAddr);
  const applicantLine = address
    ? `Applicant: ${client}, of ${address}`
    : `Applicant: ${client}`;
  const claimantsLine = f.claimants === "some"
    ? `The Applicant is aware of ${slot(f.claimantsN, "other")} other persons who claim to be victims of the same or related conduct and whose claims may attach to the Frozen Wallet. The Applicant's position on distribution is set out in the witness statement.`
    : "The Applicant is not aware of any competing claim to the cryptoassets held in the Frozen Wallet.";

  return [
    { type: "title", text: "APPLICATION OF RELEASE ORDER", align: "center", size: 16 },
    { type: "p", text: `IN THE ${slot(f.court, "City of London Magistrates' Court")}`, bold: true, align: "center" },
    { type: "p", text: caseRef, align: "center", size: 10, after: 6 },
    { type: "rule" },
    { type: "p", text: `IN THE MATTER OF a crypto wallet freezing order made under section 303Z37 of the Proceeds of Crime Act 2002 on ${orderDateL}`, align: "center", size: 10 },
    { type: "p", text: "AND IN THE MATTER OF an application under section 303Z51 of that Act for the release of cryptoassets to a victim of unlawful conduct", align: "center", size: 10, after: 6 },
    { type: "rule" },
    { type: "p", text: applicantLine, size: 10 },
    { type: "p", text: `Respondent: ${respondent}`, size: 10, after: 8 },
    { type: "h", text: "1. THE FREEZING ORDER" },
    { type: "p", n: "1.1", text: `On ${orderDateL} this court made a crypto wallet freezing order under section 303Z37 of the Proceeds of Crime Act 2002 in respect of the crypto wallet ${wallet}, administered by ${exchange} (the Frozen Wallet). The Applicant does not seek to disturb that order.` },
    { type: "p", n: "1.2", text: `The Frozen Wallet holds ${holds}. The Applicant demonstrates ownership of ${claimed} of those cryptoassets (the Claimed Assets).` },
    { type: "h", text: "2. THE ORDER SOUGHT" },
    { type: "p", n: "2.1", text: "The Applicant applies under section 303Z51 for an order that the Claimed Assets be released to the Applicant within seven days, together with such further or other order as the court thinks fit." },
    { type: "h", text: "3. THE GROUNDS" },
    { type: "p", n: "3.1", text: `The Applicant was deprived of the Claimed Assets, or of property which they represent, by unlawful conduct. On ${slot(f.fraudDates, "the dates of the fraud")} the Applicant was induced by ${slot(f.scamDesc, "the fraudulent conduct")} to transfer ${claimed}, then worth approximately ${slot(f.lossValue, "the value lost")}, from ${slot(f.originAddr, "the origin address")}. That conduct amounted to fraud by false representation contrary to section 2 of the Fraud Act 2006. It was reported to Action Fraud under reference ${crimeRef}.` },
    { type: "p", n: "3.2", text: `The cryptoassets of which the Applicant was deprived were not recoverable property immediately before the Applicant was deprived of them. The Applicant acquired them by ${slot(f.funds, "lawful means")}. The Applicant has no relevant convictions and the funds had no connection with criminal conduct.` },
    { type: "p", n: "3.3", text: `The Claimed Assets belong to the Applicant. The tracing analysis of ${provider} dated ${reportDateL} follows the Applicant's transfers from ${slot(f.originAddr, "the origin address")} through ${slot(f.route, "the tracing route")}. The tracing analysis definitively attributes the assets to the Applicant, including ${claimed} of the cryptoassets held in the Frozen Wallet.` },
    { type: "h", text: "4. OTHER CLAIMANTS" },
    { type: "p", n: "4.1", text: claimantsLine },
    { type: "h", text: "5. EVIDENCE RELIED UPON" },
    { type: "p", n: "5.1", text: `The witness statement of ${wsName} dated ${wsDate}, with exhibit ${exhibit}, is filed with this application.` },
    { type: "p", n: "5.2", text: `The tracing report of ${provider} dated ${reportDateL} is attached to this application.` },
    { type: "p", n: "5.3", text: `The Action Fraud report under reference ${crimeRef} is filed with this application.` },
    { type: "h", text: "6. NOTICE AND LISTING" },
    { type: "p", n: "6.1", text: `This application is made pursuant to section 303Z51 of the Proceeds of Crime Act 2002. It is made in writing and specifies the grounds on which it is made, in accordance with rule 12(1) of the Magistrates' Courts (Detention, Freezing and Forfeiture of Cryptoassets, and Miscellaneous Amendments) Rules 2024. Copies have been sent to the Respondent and to ${exchange}. The Applicant asks the court to fix a hearing date under rule 12(5), and invites the court to expedite the listing having regard to the expiry of the freezing order on ${orderExpiry} and to the volatility of the assets.` },
    { type: "space", h: 20 },
    { type: "p", text: `Signed                    Edison Law, solicitors for the Applicant    ·    Dated  ${letterDate}` },
  ];
}

function walletDisplay(value, placeholder) {
  const formatted = formatEthAddress(value);
  const hex = extractEthAddress(formatted);
  return hex || slot(formatted, placeholder);
}

function releaseBlocks(f) {
  const dated = slot(fmt(f.orderDated), "[date]");
  const freeze = slot(fmt(f.freezeDate), "the date of the freezing order");
  const appDate = slot(fmt(f.applicationDate), "[date]");
  const wsDate = slot(fmt(f.wsDate), "[date]");
  const reportDate = slot(fmt(f.reportDate), "the date of the tracing report");
  const applicant = slot(f.applicant, "[name]");
  const address = clean(f.clientAddr);
  const applicantLine = address
    ? `Applicant: ${applicant}, of ${address}`
    : `Applicant: ${applicant}`;
  const respondent = slot(
    f.respondent,
    "[the Chief Officer of Police for ____ / the National Crime Agency / HMRC]",
  );
  const destWallet = walletDisplay(
    f.destinationWallet,
    "[0x followed by 40 hexadecimal characters]",
  );
  const nominatedWallet = f.destination === "the wallet address nominated by the Applicant";
  const clientAccount = f.destination === "the client account of the Applicant's solicitors";
  const destinationClause = nominatedWallet
    ? "the wallet address nominated by the Applicant, namely:"
    : clientAccount
      ? "the client account of the Applicant's solicitors."
      : slot(
        f.destination,
        "[the wallet address nominated by the Applicant / the client account of the Applicant's solicitors]",
      );
  const costs = f.costs === "pay"
    ? `The Respondent shall pay the Applicant's costs of this application, summarily assessed in the sum of ${slot(f.costsSum, "£____")}, within 14 days.`
    : f.costs === "none"
      ? "There be no order as to costs."
      : "[The Respondent shall pay the Applicant's costs of this application, summarily assessed in the sum of £____, within 14 days. / There be no order as to costs.]";
  const destBlocks = nominatedWallet
    ? [{ type: "p", text: destWallet, bold: true, size: 11, after: 8 }]
    : [];
  const letterDate = slot(fmt(f.orderDated), dated);

  return [
    { type: "title", text: "RELEASE ORDER", align: "center", size: 16 },
    { type: "p", text: `IN THE ${slot(f.court, "City of London Magistrates' Court")}`, bold: true, align: "center" },
    { type: "p", text: caseReferenceLine(f.caseRef), align: "center", size: 10 },
    { type: "p", text: `Before ${slot(f.before, "[District Judge ____ / the bench]")}`, align: "center", size: 10 },
    { type: "p", text: `Dated ${dated}`, align: "center", size: 10, after: 6 },
    { type: "rule" },
    { type: "p", text: `IN THE MATTER OF a crypto wallet freezing order made under section 303Z37 of the Proceeds of Crime Act 2002 on ${freeze}`, align: "center", size: 10 },
    { type: "p", text: "AND IN THE MATTER OF an application under section 303Z51 of that Act for the release of cryptoassets", align: "center", size: 10, after: 6 },
    { type: "rule" },
    { type: "p", text: applicantLine, size: 10 },
    { type: "p", text: `Respondent: ${respondent}`, size: 10, after: 8 },
    { type: "h", text: "1. THE APPLICATION" },
    { type: "p", n: "1.1", text: `Upon the application of the Applicant dated ${appDate}.` },
    { type: "p", n: "1.2", text: `And upon reading the witness statement of ${slot(f.wsName, "[name]")} dated ${wsDate} and the tracing report of ${slot(f.provider, "[provider]")} dated ${reportDate}.` },
    { type: "p", n: "1.3", text: `And upon hearing ${slot(f.hearing, "[the solicitor for the Applicant and the representative of the Respondent / the Respondent neither supporting nor opposing the application]")}.` },
    { type: "h", text: "2. THE COURT BEING SATISFIED" },
    { type: "p", n: "2.1", text: "The Applicant was deprived of the cryptoassets to which the application relates, or of property which they represent, by unlawful conduct." },
    { type: "p", n: "2.2", text: "The cryptoassets of which the Applicant was deprived were not recoverable property immediately before the Applicant was deprived of them." },
    { type: "p", n: "2.3", text: "Those cryptoassets belong to the Applicant." },
    { type: "p", n: "2.4", text: "No proceedings for forfeiture under section 303Z41 of that Act are ongoing in respect of the cryptoassets to be released." },
    { type: "h", text: "3. IT IS ORDERED THAT" },
    { type: "p", n: "3.1", text: `Pursuant to section 303Z51 of the Proceeds of Crime Act 2002, ${slot(f.releasedAssets, "[quantity and asset]")} of the cryptoassets held in the crypto wallet ${walletDisplay(f.wallet, "[address]")}, administered by ${slot(f.exchange, "[exchange]")} and the subject of the crypto wallet freezing order dated ${freeze} (the Released Assets), be released to the Applicant.` },
    { type: "p", n: "3.2", text: `The Released Assets shall be transferred, within seven days of the date of this order unless a longer period is agreed between the Applicant and ${slot(f.agreeWith, "[the Respondent / the administrator of the wallet]")}, to ${destinationClause}` },
    ...destBlocks,
    { type: "p", n: "3.3", text: `The crypto wallet freezing order dated ${freeze} shall continue in respect of the balance of the cryptoassets held in the wallet.` },
    { type: "p", n: "3.4", text: costs },
    { type: "p", n: "3.5", text: "Liberty to apply in respect of the implementation of paragraph 3.2." },
    { type: "space", h: 20 },
    { type: "p", text: `Signed                    Edison Law, solicitors for the Applicant    ·    Dated  ${letterDate}` },
  ];
}

export async function matterPdf(kind, values, options = {}) {
  const people = Array.isArray(options.people) ? options.people : [];
  const sanitized = sanitizeMatterValues(values, people);
  const name = sanitized.clientName || sanitized.applicant || "";
  const trust = kind === "claim" ? await buildClaimTrust(sanitized, { people }) : null;
  const blocks = kind === "release"
    ? releaseBlocks(sanitized)
    : kind === "matter"
      ? matterBlocks(sanitized)
      : claimBlocks(sanitized, trust);
  const title = kind === "release"
    ? `Edison Law release order - ${name || "s.303Z51"}`
    : kind === "matter"
      ? `Edison Law application of release order - ${name || "s.303Z51"}`
      : `Edison Law victim claim - ${name || "s.303Z51"}`;
  const footer = kind === "release"
    ? "Edison Law · Release order"
    : kind === "matter"
      ? "Edison Law · Application of release order"
      : "Edison Law · Victim claim to frozen cryptoassets";
  const letterhead = kind === "matter" || kind === "release";
  const bytes = await writePdf(title, blocks, {
    footer,
    style: letterhead ? "letterhead" : "brand",
    letterheadInfo: letterhead
      ? { refs: letterheadRefs(sanitized), ...letterheadContacts(sanitized, people) }
      : {},
  });
  return {
    bytes,
    filename: stem(kind, name),
    validation: trust?.validation || validateMatterFields(values, { people }),
    sanitized,
    trust,
  };
}

export async function downloadMatter(form) {
  const kind = form.getAttribute("data-matter-form");
  const { bytes, filename } = await matterPdf(kind, formValues(form));
  downloadBytes(bytes, filename);
}
