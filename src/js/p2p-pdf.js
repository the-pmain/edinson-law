/**
 * Peer-to-peer cryptoasset sale agreement, laid out programmatically.
 *
 * Palette and type roles follow the site's visual system, as the tracing report
 * does: ink and signal green, Liberation Serif for display, Liberation Sans for
 * body copy, Courier for the small tracked labels and wallet strings, and Great
 * Vibes for the signatures.
 */

import { PDFDocument, StandardFonts, rgb, setCharacterSpacing } from "pdf-lib";
import { embedDocumentFonts } from "./document-fonts.js";
import { buildP2pAgreement, p2pFilename } from "./p2p-agreement.js";

const A4 = [595.28, 841.89];
const MARGIN = 42;

const brand = rgb(10 / 255, 32 / 255, 40 / 255);
const accent = rgb(0, 111 / 255, 99 / 255);
const accentLight = rgb(204 / 255, 234 / 255, 226 / 255);
const muted = rgb(83 / 255, 103 / 255, 109 / 255);
const card = rgb(241 / 255, 246 / 255, 244 / 255);
const rule = rgb(203 / 255, 218 / 255, 214 / 255);
const white = rgb(1, 1, 1);
const teal = rgb(0, 141 / 255, 122 / 255);
const signalBright = rgb(56 / 255, 198 / 255, 176 / 255);
const copper = rgb(184 / 255, 90 / 255, 56 / 255);
const calloutInk = rgb(221 / 255, 233 / 255, 229 / 255);
const sigRule = rgb(159 / 255, 183 / 255, 177 / 255);
const pen = rgb(16 / 255, 42 / 255, 74 / 255);

const LOGO_PATH = "public/brand/letterhead-logo.png";
const LOGO_HREF = "/brand/letterhead-logo.png";
const SCRIPT_PATH = "public/fonts/GreatVibes-Regular.ttf";
const SCRIPT_HREF = "/fonts/GreatVibes-Regular.ttf";
const LOGO_W = 43;
const RUNNING_TITLE = "P2P AGREEMENT";

/* The serif and sans faces are subsets lifted from the authority-form
   template, so text is normalised to the characters they are known to carry. */
function latin(text) {
  return String(text ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\u2026/g, "...");
}

/* Letter-spacing wider than about a tenth of an em is read back as real spaces
   by PDF text extractors, which would leave headings unsearchable. */
const MAX_TRACKING = 0.1;

function tracked(tracking) {
  return Math.min(tracking || 0, MAX_TRACKING);
}

function span(font, text, size, tracking = 0) {
  const t = latin(text);
  if (!t) return 0;
  const base = font.widthOfTextAtSize(t, size);
  const step = tracked(tracking);
  if (!step) return base;
  return base + step * size * (Array.from(t).length - 1);
}

function wrap(font, text, size, width, tracking = 0) {
  const words = latin(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines = [];
  let line = words[0];
  for (let i = 1; i < words.length; i += 1) {
    const next = `${line} ${words[i]}`;
    if (span(font, next, size, tracking) <= width) line = next;
    else {
      lines.push(line);
      line = words[i];
    }
  }
  lines.push(line);
  return lines;
}

/* Tracking is applied with the PDF character-spacing operator rather than by
   placing each glyph, so a tracked label stays one selectable run of text. */
function write(target, text, opts) {
  const t = latin(text);
  if (!t) return;
  const { tracking = 0, ...rest } = opts;
  const step = tracked(tracking);
  if (!step) {
    target.drawText(t, rest);
    return;
  }
  target.pushOperators(setCharacterSpacing(step * rest.size));
  target.drawText(t, rest);
  target.pushOperators(setCharacterSpacing(0));
}

function fit(font, text, size, width) {
  const raw = latin(text);
  if (!raw) return "";
  if (font.widthOfTextAtSize(raw, size) <= width) return raw;
  let out = raw;
  while (out.length > 1 && font.widthOfTextAtSize(`${out}...`, size) > width) {
    out = out.slice(0, -1);
  }
  return `${out}...`;
}

/** Shrinks a single line until it fits, rather than wrapping or clipping it. */
function shrinkToFit(font, text, size, min, width) {
  let out = size;
  while (out > min && font.widthOfTextAtSize(latin(text), out) > width) out -= 0.2;
  return out;
}

async function loadAsset(href, path) {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(href);
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
    } catch {
      // Relative URLs fail in Node; use the file on disk.
    }
  }
  if (typeof window !== "undefined") return null;
  const { readFileSync } = await import(/* @vite-ignore */ "node:fs");
  const { resolve } = await import(/* @vite-ignore */ "node:path");
  return new Uint8Array(readFileSync(resolve(process.cwd(), path)));
}

/* The signature face and the mark are decoration: if either cannot be read the
   agreement still prints, with a ruled signature line and a text masthead. */
async function embedOptional(href, path, embed) {
  try {
    const bytes = await loadAsset(href, path);
    return bytes ? await embed(bytes) : null;
  } catch {
    return null;
  }
}

export async function generateP2pPdf(values = {}) {
  const deed = buildP2pAgreement(values);
  const pdf = await PDFDocument.create();
  const { regular, bold, sansBold } = await embedDocumentFonts(pdf);
  const italic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  const mono = await pdf.embedFont(StandardFonts.Courier);
  const script = await embedOptional(SCRIPT_HREF, SCRIPT_PATH, (bytes) =>
    pdf.embedFont(bytes, { subset: true }));
  const logo = await embedOptional(LOGO_HREF, LOGO_PATH, (bytes) => pdf.embedPng(bytes));

  const width = A4[0] - MARGIN * 2;
  const foot = 46;
  let page;
  let y = 0;
  let pageNo = 0;

  const addPage = () => {
    page = pdf.addPage(A4);
    pageNo += 1;
    page.drawRectangle({ x: MARGIN, y: 28, width, height: 0.8, color: brand });
    const size = 5.7;
    const left = `EDISON LAW · SRA ${deed.firm.sraNumber} · ${deed.firm.domain.toUpperCase()}`;
    const right = `MATTER REF ${deed.matterRef} · PAGE ${pageNo}`;
    const leftEnd = MARGIN + span(mono, left, size);
    const rightStart = A4[0] - MARGIN - span(mono, right, size);
    write(page, left, { x: MARGIN, y: 16, size, font: mono, color: accent });
    write(page, RUNNING_TITLE, {
      x: (leftEnd + rightStart - span(mono, RUNNING_TITLE, size)) / 2,
      y: 16,
      size,
      font: mono,
      color: accent,
    });
    write(page, right, { x: rightStart, y: 16, size, font: mono, color: accent });
    y = pageNo === 1 ? A4[1] - 36 : A4[1] - 48;
  };

  const ensure = (need) => {
    if (y - need >= foot) return;
    addPage();
  };

  /* Filled band, as the section headers of the table treatment: solid ink bar,
     signal strip along the top edge, and the standing condition that governs
     the section set in italic on the right. */
  const band = (title, cap) => {
    ensure(58);
    y -= 12;
    const padX = 8;
    page.drawRectangle({ x: MARGIN, y: y - 5, width, height: 17, color: brand });
    page.drawRectangle({ x: MARGIN, y: y + 10, width, height: 2, color: teal });
    const heading = title.toUpperCase();
    write(page, heading, {
      x: MARGIN + padX,
      y,
      size: 7.6,
      font: mono,
      color: white,
      tracking: 0.12,
    });
    if (cap) {
      const room = width - span(mono, heading, 7.6, 0.12) - padX * 3;
      const label = fit(italic, cap, 8.1, room);
      write(page, label, {
        x: A4[0] - MARGIN - padX - italic.widthOfTextAtSize(label, 8.1),
        y,
        size: 8.1,
        font: italic,
        color: accentLight,
      });
    }
    y -= 22;
  };

  /** Numbered clause, hanging indent, mono figure in signal green. */
  const clauses = (items) => {
    items.forEach((item) => {
      const hang = 18;
      const lines = wrap(regular, item.text, 8.8, width - hang);
      ensure(lines.length * 11.4 + 6);
      write(page, `${item.n}.`, { x: MARGIN, y, size: 8, font: mono, color: accent });
      lines.forEach((line, i) => {
        write(page, line, { x: MARGIN + hang, y: y - i * 11.4, size: 8.8, font: regular, color: brand });
      });
      y -= lines.length * 11.4 + 4;
    });
    y -= 2;
  };

  /* Three party panels on one row. Every panel carries the same four rows so
     the block reads as a grid, and the tallest panel sets the height. */
  const partyCards = (cards) => {
    const gap = 8;
    const cardW = (width - gap * 2) / 3;
    const padX = 8;
    const valueW = cardW - padX * 2;
    const rowsOf = (entries) => entries.map(([label, value]) => ({
      label,
      lines: wrap(regular, value, 8.2, valueW).slice(0, 2),
    }));
    const measured = cards.map((item) => rowsOf(item.rows));
    const rowH = (row) => 7.4 + row.lines.length * 9.4 + 5.2;
    const bodyH = Math.max(...measured.map((rows) => rows.reduce((sum, row) => sum + rowH(row), 0)));
    const cardH = 20 + bodyH + 6;
    ensure(cardH + 10);

    cards.forEach((item, i) => {
      const x = MARGIN + i * (cardW + gap);
      const top = y + 10;
      page.drawRectangle({
        x,
        y: top - cardH,
        width: cardW,
        height: cardH,
        color: card,
        borderColor: rule,
        borderWidth: 0.5,
      });
      page.drawRectangle({ x, y: top - 2, width: cardW, height: 2, color: accent });
      write(page, item.title.toUpperCase(), {
        x: x + padX,
        y: top - 14,
        size: 6.8,
        font: mono,
        color: brand,
        tracking: 0.1,
      });
      let ry = top - 20;
      measured[i].forEach((row) => {
        write(page, row.label.toUpperCase(), {
          x: x + padX,
          y: ry - 6,
          size: 5.9,
          font: mono,
          color: accent,
          tracking: 0.08,
        });
        row.lines.forEach((line, li) => {
          write(page, line, {
            x: x + padX,
            y: ry - 15.4 - li * 9.4,
            size: 8.2,
            font: regular,
            color: brand,
          });
        });
        ry -= rowH(row);
        page.drawRectangle({
          x: x + padX,
          y: ry + 3,
          width: valueW,
          height: 0.4,
          color: rule,
        });
      });
    });
    y -= cardH + 2;
  };

  /* The deal terms: a tinted label column against the printed value, so a
     reader checking a wallet or a deadline lands on one row and stays there. */
  const dealTable = (rows) => {
    const labelW = width * 0.29;
    const valueW = width - labelW;
    const padX = 7;
    rows.forEach(([label, value, kind]) => {
      const font = kind === "mono" ? mono : regular;
      const size = kind === "mono" ? 7.4 : 9;
      const lines = wrap(font, value, size, valueW - padX * 2);
      const h = Math.max(18, lines.length * 10.4 + 7.6);
      if (y - h < foot) addPage();
      const top = y + 11;
      page.drawRectangle({ x: MARGIN, y: top - h, width: labelW, height: h, color: card });
      write(page, label.toUpperCase(), {
        x: MARGIN + padX,
        y: y - 1,
        size: 6.4,
        font: mono,
        color: accent,
        tracking: 0.08,
      });
      lines.forEach((line, i) => {
        write(page, line, {
          x: MARGIN + labelW + padX,
          y: y - 1 - i * 10.4,
          size,
          font,
          color: brand,
        });
      });
      page.drawRectangle({ x: MARGIN, y: top - h, width, height: 0.5, color: rule });
      y -= h;
    });
    y -= 6;
  };

  /* The cap is the commercial heart of the guarantee, so it is the one filled
     panel in the document. */
  const capPanel = (figure, note) => {
    const padX = 14;
    const noteLines = wrap(regular, note, 8.4, width - padX * 2 - 4);
    const h = noteLines.length * 11 + 52;
    ensure(h + 10);
    const top = y + 10;
    page.drawRectangle({ x: MARGIN, y: top - h, width, height: h, color: brand });
    page.drawRectangle({ x: MARGIN, y: top - h, width: 4, height: h, color: signalBright });
    write(page, "Guarantee cap".toUpperCase(), {
      x: MARGIN + padX,
      y: top - 16,
      size: 6.7,
      font: mono,
      color: accentLight,
      tracking: 0.17,
    });
    write(page, figure, {
      x: MARGIN + padX,
      y: top - 38,
      size: shrinkToFit(regular, figure, 17, 12, width - padX * 2),
      font: regular,
      color: white,
    });
    let ny = top - 54;
    noteLines.forEach((line) => {
      write(page, line, { x: MARGIN + padX, y: ny, size: 8.4, font: regular, color: calloutInk });
      ny -= 11;
    });
    y -= h + 4;
  };

  /* One panel per signatory. The typed name is set in the script face on the
     rule, and repeated in print beneath it with the date. */
  const signatureCards = (signatories) => {
    const gap = 8;
    const cardW = (width - gap * 2) / 3;
    const padX = 10;
    const cardH = 104;
    ensure(cardH + 10);
    signatories.forEach((item, i) => {
      const x = MARGIN + i * (cardW + gap);
      const top = y + 10;
      page.drawRectangle({
        x,
        y: top - cardH,
        width: cardW,
        height: cardH,
        color: white,
        borderColor: rule,
        borderWidth: 0.5,
      });
      page.drawRectangle({ x, y: top - 2, width: cardW, height: 2, color: copper });
      write(page, item.role.toUpperCase(), {
        x: x + padX,
        y: top - 15,
        size: 6.8,
        font: mono,
        color: brand,
        tracking: 0.1,
      });
      const ruleY = top - 54;
      const room = cardW - padX * 2;
      if (item.name && script) {
        write(page, item.name, {
          x: x + padX + 2,
          y: ruleY + 5,
          size: shrinkToFit(script, item.name, 19, 11, room - 4),
          font: script,
          color: pen,
        });
      }
      page.drawRectangle({ x: x + padX, y: ruleY, width: room, height: 0.6, color: sigRule });
      write(page, "Signature".toUpperCase(), {
        x: x + padX,
        y: ruleY - 10,
        size: 5.9,
        font: mono,
        color: accent,
        tracking: 0.08,
      });
      [["Name", item.name], ["Date", item.date]].forEach(([label, value], row) => {
        const ly = ruleY - 26 - row * 14;
        write(page, label, { x: x + padX, y: ly, size: 8, font: regular, color: muted });
        const labelW = regular.widthOfTextAtSize(label, 8) + 10;
        write(page, fit(regular, value, 8, room - labelW), {
          x: x + padX + labelW,
          y: ly,
          size: 8,
          font: regular,
          color: brand,
        });
      });
    });
    y -= cardH + 4;
  };

  addPage();

  /* Masthead: wordmark and mark on the left, the regulated identity on the
     right, closed by the house heavy rule and hairline. */
  const logoH = logo ? LOGO_W * (logo.height / logo.width) : 0;
  const mastH = Math.max(logoH, 28);
  const mastTop = y + 10;
  if (logo) {
    page.drawImage(logo, {
      x: MARGIN,
      y: mastTop - mastH / 2 - logoH / 2,
      width: LOGO_W,
      height: logoH,
    });
  }
  write(page, "EDISON LAW", {
    x: MARGIN + (logo ? LOGO_W + 10 : 0),
    y: mastTop - mastH / 2 - 4,
    size: 12,
    font: sansBold,
    color: brand,
    tracking: 0.18,
  });
  const practice = deed.firm.practice.toUpperCase();
  const identity = `${deed.firm.domain.toUpperCase()} · SRA NO. ${deed.firm.sraNumber}`;
  write(page, practice, {
    x: A4[0] - MARGIN - span(mono, practice, 6.7, 0.06),
    y: mastTop - mastH / 2 + 2,
    size: 6.7,
    font: mono,
    color: brand,
    tracking: 0.06,
  });
  write(page, identity, {
    x: A4[0] - MARGIN - span(mono, identity, 6.7, 0.06),
    y: mastTop - mastH / 2 - 10,
    size: 6.7,
    font: mono,
    color: accent,
    tracking: 0.06,
  });
  y = mastTop - mastH - 8;
  page.drawRectangle({ x: MARGIN, y, width, height: 1, color: brand });
  y -= 4;
  page.drawRectangle({ x: MARGIN, y, width, height: 0.5, color: rule });
  y -= 26;

  write(page, deed.title, { x: MARGIN, y, size: 20, font: bold, color: brand, tracking: 0.01 });
  y -= 16;
  write(page, deed.subtitle, { x: MARGIN, y, size: 9.6, font: italic, color: copper });
  y -= 12;

  band(
    "Parties",
    "Both parties are existing clients - identity, source of funds and wallet control verified on file",
  );
  partyCards([
    {
      title: "Seller",
      rows: [
        ["Name", deed.seller.name],
        ["Client ref", deed.seller.ref],
        ["Email", deed.seller.email],
        ["Phone", deed.seller.phone],
      ],
    },
    {
      title: "Buyer",
      rows: [
        ["Name", deed.buyer.name],
        ["Client ref", deed.buyer.ref],
        ["Email", deed.buyer.email],
        ["Phone", deed.buyer.phone],
      ],
    },
    {
      title: "Intermediary",
      rows: [
        ["Name", deed.intermediary.name],
        ["Address", deed.intermediary.address],
        ["Fee earner", deed.intermediary.feeEarner],
        ["Matter ref", deed.intermediary.matterRef],
      ],
    },
  ]);

  band("The deal", `Dated ${deed.dated}`);
  dealTable(deed.deal);

  band("How it settles", "Time is of the essence at every step");
  clauses(deed.clauses.settles);

  band("What each party promises", "Given now and repeated at settlement");
  clauses(deed.clauses.promises);

  /* The guarantee, the cap and the signatures are the operative half of the
     agreement and always open a fresh page, as the reference does. */
  addPage();

  band("Edison Law's guarantee", "Capped · claims within 30 days");
  clauses(deed.clauses.guarantee);
  capPanel(deed.guaranteeCap, deed.guaranteeCapNote);

  band("Other terms", "England & Wales");
  clauses(deed.clauses.other);

  band("Signed", "One copy each · original to the file");
  signatureCards(deed.signatories);

  pdf.setTitle(`Edison Law P2P Agreement - ${deed.matterRef}`);
  pdf.setAuthor("Edison Law");
  pdf.setCreator("Edison Law");
  pdf.setProducer("Edison Law");
  pdf.setSubject("P2P Agreement");

  return {
    bytes: await pdf.save(),
    filename: p2pFilename(deed),
    agreement: deed,
    sanitized: values,
    validation: { ok: true, issues: [], critical: [] },
  };
}
