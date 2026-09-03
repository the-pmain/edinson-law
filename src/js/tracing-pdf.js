import { PDFDocument, StandardFonts, rgb, setCharacterSpacing } from "pdf-lib";
import { embedDocumentFonts } from "./document-fonts.js";
import {
  buildTracingReport,
  tracingFilename,
} from "./tracing-report.js";

const A4 = [595.28, 841.89];
const MARGIN = 42;
/* Palette and type roles follow the site's visual system: the signal greens and
   copper of edisonlawlegal.com, Newsreader for display, Manrope for body copy
   and IBM Plex Mono for the small uppercase labels. */
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
const paper = rgb(1, 1, 1);
const calloutInk = rgb(221 / 255, 233 / 255, 229 / 255);
const heroSub = rgb(216 / 255, 229 / 255, 225 / 255);
const badgeInk = rgb(128 / 255, 90 / 255, 21 / 255);
const badgeRule = rgb(168 / 255, 117 / 255, 25 / 255);
const sigRule = rgb(159 / 255, 183 / 255, 177 / 255);
const LOGO_PATH = "public/brand/letterhead-logo.png";
const LOGO_HREF = "/brand/letterhead-logo.png";
const LOGO_W = 43;
const TRACING_FOOT_REG = "Authorised and regulated by the Solicitors Regulation Authority, SRA no. 510498 · VAT GB 214 5578 09 · ICO registration ZA145872 · Private prosecutions · Asset tracing & recovery · Crypto fraud & digital assets · Regulatory defence · Cross-border fraud · Corporate intelligence";

/* Courier and Times Italic are WinAnsi-encoded, which covers the report's
   dashes, ellipses and quotes but has no arrow glyph. */
function latin(text) {
  return String(text ?? "")
    .replace(/\u2192/g, "->")
    .replace(/[\u2010\u2011\u2012\u2015]/g, "-");
}

/* Letter-spacing wider than about a tenth of an em is read back as real spaces
   by PDF text extractors, which would leave headings unsearchable, so the
   report's wider CSS tracking is clamped to just under that threshold. */
const MAX_TRACKING = 0.1;

function tracked(tracking) {
  return Math.min(tracking || 0, MAX_TRACKING);
}

/** Width of a run once CSS-style letter-spacing, expressed in ems, is added. */
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

async function loadLogoBytes() {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(LOGO_HREF);
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
    } catch {
      // Relative /brand URLs fail in Node; use the file on disk.
    }
  }
  if (typeof window !== "undefined") throw new Error("The masthead logo could not be read.");
  const { readFileSync } = await import(/* @vite-ignore */ "node:fs");
  const { resolve } = await import(/* @vite-ignore */ "node:path");
  return new Uint8Array(readFileSync(resolve(process.cwd(), LOGO_PATH)));
}

async function embedLogo(pdf) {
  try {
    return await pdf.embedPng(await loadLogoBytes());
  } catch {
    return null;
  }
}

export async function generateTracingPdf(values = {}) {
  const report = buildTracingReport(values);
  const pdf = await PDFDocument.create();
  const { regular, sans, sansBold } = await embedDocumentFonts(pdf);
  const italic = await pdf.embedFont(StandardFonts.TimesRomanItalic);
  const mono = await pdf.embedFont(StandardFonts.Courier);
  const logo = await embedLogo(pdf);
  const width = A4[0] - MARGIN * 2;
  const foot = 46;
  let page;
  let y = 0;
  let pageNo = 0;

  const addPage = () => {
    page = pdf.addPage(A4);
    pageNo += 1;
    page.drawRectangle({ x: 0, y: 0, width: A4[0], height: A4[1], color: paper });
    page.drawRectangle({ x: MARGIN, y: 28, width, height: 0.8, color: brand });
    const footSize = 5.7;
    const left = "EDISON LAW · SRA 510498 · EDISONLAWLEGAL.COM";
    const mid = "MOCK · TRAINING USE ONLY";
    const right = [
      report.ref,
      pageNo > 1 ? `PAGE ${pageNo}` : "",
    ].filter(Boolean).join(" · ");
    const leftEnd = MARGIN + span(mono, left, footSize);
    const rightStart = A4[0] - MARGIN - span(mono, right, footSize);
    write(page, left, { x: MARGIN, y: 16, size: footSize, font: mono, color: accent });
    write(page, mid, {
      x: (leftEnd + rightStart - span(mono, mid, footSize)) / 2,
      y: 16,
      size: footSize,
      font: mono,
      color: accent,
    });
    write(page, right, { x: rightStart, y: 16, size: footSize, font: mono, color: accent });
    y = A4[1] - 36;
    if (pageNo > 1) {
      const running = "CRYPTOASSET TRACING REPORT";
      const identity = fit(
        mono,
        [report.client, report.ref].filter(Boolean).join(" · "),
        6.2,
        width * 0.52,
      );
      write(page, running, {
        x: MARGIN,
        y: A4[1] - 24,
        size: 6.2,
        font: mono,
        color: brand,
        tracking: 0.08,
      });
      write(page, identity, {
        x: A4[0] - MARGIN - mono.widthOfTextAtSize(identity, 6.2),
        y: A4[1] - 24,
        size: 6.2,
        font: mono,
        color: accent,
      });
      page.drawRectangle({ x: MARGIN, y: A4[1] - 31, width, height: 0.5, color: rule });
      y = A4[1] - 46;
    }
  };

  const ensure = (need) => {
    if (y - need >= foot) return;
    addPage();
  };

  /* Open band: a heavy rule above, a hairline below, no fill. */
  const band = (title, cap) => {
    ensure(34);
    y -= 10;
    page.drawRectangle({ x: MARGIN, y: y + 10, width, height: 1.2, color: brand });
    const heading = title.toUpperCase();
    write(page, heading, { x: MARGIN, y, size: 7.6, font: mono, color: brand, tracking: 0.12 });
    if (cap) {
      const room = width - span(mono, heading, 7.6, 0.12) - 16;
      const label = fit(italic, cap, 8.1, room);
      write(page, label, {
        x: A4[0] - MARGIN - italic.widthOfTextAtSize(label, 8.1),
        y,
        size: 8.1,
        font: italic,
        color: accent,
      });
    }
    page.drawRectangle({ x: MARGIN, y: y - 5, width, height: 0.5, color: rule });
    y -= 16;
  };

  const drawTable = (columns, rows, { headerRepeat = true, compact = false } = {}) => {
    const size = compact ? 7.7 : 8.3;
    const headSize = compact ? 6.3 : 6.6;
    const leading = compact ? 9 : 10.1;
    const padX = 6;
    const padY = compact ? 2.8 : 4;
    const colW = columns.map((col) => width * col.width);

    const paintHeader = () => {
      ensure(20);
      page.drawRectangle({ x: MARGIN, y: y - 8, width, height: 16, color: brand });
      page.drawRectangle({ x: MARGIN, y: y - 8, width, height: 2, color: teal });
      let x = MARGIN;
      columns.forEach((col, i) => {
        const label = col.label.toUpperCase();
        const textW = span(mono, label, headSize, 0.08);
        const tx = col.align === "right" ? x + colW[i] - padX - textW : x + padX;
        write(page, label, { x: tx, y: y - 2, size: headSize, font: mono, color: white, tracking: 0.08 });
        x += colW[i];
      });
      y -= 16;
    };

    /* The confidence column prints as the report's bordered badge, not plain text. */
    const drawBadge = (col, x, i, row) => {
      const label = String(row[col.key] || "").toUpperCase();
      if (!label) return;
      const ok = row.confidence === "High";
      let bs = 6;
      while (bs > 4.2 && span(mono, label, bs, 0.09) + 8 > colW[i] - padX * 2) bs -= 0.2;
      const bw = span(mono, label, bs, 0.09) + 8;
      page.drawRectangle({
        x: x + padX,
        y: y - padY - bs - 1.4,
        width: bw,
        height: bs + 5,
        borderColor: ok ? accent : badgeRule,
        borderWidth: 0.6,
      });
      write(page, label, {
        x: x + padX + 4,
        y: y - padY - bs + 0.6,
        size: bs,
        font: mono,
        color: ok ? accent : badgeInk,
        tracking: 0.09,
      });
    };

    const cellLines = (row) => columns.map((col, i) => {
      if (col.badge) return [""];
      const font = col.mono ? mono : sans;
      const cellSize = col.mono ? (compact ? 6.5 : 7) : size;
      return wrap(font, row[col.key] || "", cellSize, colW[i] - padX * 2);
    });

    paintHeader();
    rows.forEach((row, rowIndex) => {
      const linesPerCol = cellLines(row);
      const n = Math.max(1, ...linesPerCol.map((lines) => lines.length));
      const h = n * leading + padY * 2;
      if (y - h < foot) {
        addPage();
        if (headerRepeat) paintHeader();
      }
      if (row.final) {
        page.drawRectangle({ x: MARGIN, y: y - h + 4, width, height: h, color: accentLight });
      } else if (rowIndex % 2 === 1) {
        page.drawRectangle({ x: MARGIN, y: y - h + 4, width, height: h, color: card });
      }
      let x = MARGIN;
      columns.forEach((col, i) => {
        if (col.badge) {
          drawBadge(col, x, i, row);
          x += colW[i];
          return;
        }
        const font = col.mono ? mono : sans;
        const cellSize = col.mono ? (compact ? 6.5 : 7) : size;
        let ty = y - padY;
        linesPerCol[i].forEach((line) => {
          const textW = font.widthOfTextAtSize(line, cellSize);
          const tx = col.align === "right" ? x + colW[i] - padX - textW : x + padX;
          write(page, line, { x: tx, y: ty, size: cellSize, font, color: brand });
          ty -= leading;
        });
        x += colW[i];
      });
      page.drawRectangle({ x: MARGIN, y: y - h + 4, width, height: 0.5, color: rule });
      y -= h;
    });
    y -= 8;
  };

  addPage();

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
  const strap = "When assets move, follow the evidence.";
  const regLine = "edisonlawlegal.com · SRA no. 510498";
  write(page, strap, {
    x: A4[0] - MARGIN - italic.widthOfTextAtSize(latin(strap), 9.4),
    y: mastTop - mastH / 2 + 2,
    size: 9.4,
    font: italic,
    color: brand,
  });
  write(page, regLine, {
    x: A4[0] - MARGIN - span(mono, regLine, 6.7, 0.06),
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
  y -= 12;

  write(page, "Digital assets · investigations · recovery".toUpperCase(), {
    x: MARGIN,
    y,
    size: 7,
    font: mono,
    color: accent,
    tracking: 0.11,
  });
  y -= 21;
  write(page, "Cryptoasset Tracing Report", { x: MARGIN, y, size: 23, font: regular, color: brand });
  y -= report.subtitle ? 15 : 20;
  if (report.subtitle) {
    write(page, report.subtitle, { x: MARGIN, y, size: 10.2, font: italic, color: muted });
    y -= 18;
  }

  const meta = [
    [["Client", report.client], ["Matter ref", report.ref]],
    [["Subject", report.subject], ["Report date", report.date]],
    [["Prepared by", report.analyst ? `${report.analyst}, Forensic Analyst` : ""], ["Reviewed by", report.reviewer]],
  ].filter((row) => row.some((entry) => entry[1]));
  meta.forEach((row, i) => {
    const kW = width * 0.19;
    const vW = width * 0.31;
    const valueLines = row.map((entry) => entry[1]
      ? wrap(sans, entry[1], 8.6, vW - 12).slice(0, 3)
      : []);
    const h = Math.max(17, Math.max(...valueLines.map((lines) => lines.length)) * 10 + 7);
    row.forEach((entry, col) => {
      if (!entry[1]) return;
      const x = MARGIN + col * (kW + vW);
      page.drawRectangle({ x, y: y - h + 11, width: kW, height: h, color: card });
      write(page, entry[0].toUpperCase(), {
        x: x + 6,
        y: y - 1,
        size: 6.5,
        font: mono,
        color: accent,
        tracking: 0.08,
      });
      valueLines[col].forEach((line, lineIndex) => {
        write(page, line, {
          x: x + kW + 6,
          y: y - 1 - lineIndex * 10,
          size: 8.6,
          font: sans,
          color: brand,
        });
      });
    });
    if (i < meta.length - 1) {
      page.drawRectangle({ x: MARGIN, y: y - h + 11, width, height: 0.5, color: rule });
    }
    y -= h;
    if (i === meta.length - 1) y -= 4;
  });

  if (report.sections.summary) {
    band("Summary of findings", report.asAt ? `Figures as at ${report.asAt}` : "");

    const stats = [
      { lab: "Total loss", fig: report.stats.loss, sub: report.stats.lossSub },
      { lab: "Followed to the endpoint", fig: report.stats.followed, sub: report.stats.followedSub },
      { lab: "Frozen at the endpoint", fig: report.stats.frozen, sub: report.stats.frozenSub, hero: true },
      { lab: "Hops followed", fig: report.stats.hops, sub: report.stats.hopsSub },
    ];
    const gap = 7;
    const statW = (width - gap * 3) / 4;
    const statH = 64;
    ensure(statH + 8);
    stats.forEach((stat, i) => {
      const x = MARGIN + i * (statW + gap);
      page.drawRectangle({
        x,
        y: y + 10 - statH,
        width: statW,
        height: statH,
        color: stat.hero ? brand : card,
        borderColor: stat.hero ? brand : rule,
        borderWidth: 0.5,
      });
      page.drawRectangle({
        x,
        y: y + 8,
        width: statW,
        height: 2,
        color: stat.hero ? signalBright : accent,
      });
      wrap(mono, stat.lab.toUpperCase(), 6.2, statW - 14, 0.1).slice(0, 2).forEach((line, li) => {
        write(page, line, {
          x: x + 7,
          y: y - 2 - li * 8,
          size: 6.2,
          font: mono,
          color: stat.hero ? accentLight : accent,
          tracking: 0.1,
        });
      });
      let figureSize = 16;
      while (figureSize > 12 && regular.widthOfTextAtSize(latin(stat.fig), figureSize) > statW - 14) {
        figureSize -= 0.5;
      }
      write(page, stat.fig, {
        x: x + 7,
        y: y - 24,
        size: figureSize,
        font: regular,
        color: stat.hero ? white : brand,
      });
      wrap(sans, stat.sub, 7.1, statW - 14).slice(0, 2).forEach((line, li) => {
        write(page, line, {
          x: x + 7,
          y: y - 37 - li * 8.5,
          size: 7.1,
          font: sans,
          color: stat.hero ? heroSub : muted,
        });
      });
    });
    y -= statH + 2;

    report.findings.forEach((item, i) => {
      const hang = 18;
      const lines = wrap(sans, item, 9.1, width - hang);
      ensure(lines.length * 12.7 + 6);
      write(page, `${i + 1}.`, { x: MARGIN, y, size: 8.4, font: mono, color: accent });
      lines.forEach((line, li) => {
        write(page, line, { x: MARGIN + hang, y: y - li * 12.7, size: 9.1, font: sans, color: brand });
      });
      y -= lines.length * 12.7 + 4.4;
    });
  }

  if (report.sections.diagram) {
    const figureH = flowFigureHeight(width, italic);
    ensure(figureH + 34);
    band("How the funds moved", "Every branch followed to the same endpoint");
    drawFlowFigure(page, report.diagram, {
      x: MARGIN,
      top: y + 8,
      w: width,
      fonts: { sansBold, italic, mono },
    });
    y -= figureH - 4;
  }

  if (report.sections.hops || report.sections.attribution) {
    ensure(150);
    if (report.sections.hops) {
      band("The trace, hop by hop", "Unbroken chain, victim wallet to frozen endpoint");
      drawTable(
        [
          { key: "hop", label: "Hop", width: 0.07 },
          { key: "date", label: "Date", width: 0.14 },
          { key: "fromTo", label: "From -> to", width: 0.28, mono: true },
          { key: "amount", label: "Amount", width: 0.13, align: "right" },
          { key: "observation", label: "Observation", width: 0.38 },
        ],
        report.hops,
      );
    }

    if (report.sections.attribution) {
      band("Endpoint and pass-through attribution", "Basis and confidence stated where supplied");
      drawTable(
        [
          { key: "venue", label: "Venue or service", width: 0.19 },
          { key: "jurisdiction", label: "Jurisdiction", width: 0.13 },
          { key: "value", label: "Value", width: 0.13, align: "right" },
          { key: "confidence", label: "Confidence", width: 0.16, badge: true },
          { key: "basis", label: "Basis of attribution", width: 0.39 },
        ],
        report.attribution,
      );

      const bigLead = `${report.endpoint.amount} at `;
      const bigAddr = latin(report.endpoint.address);
      const bodyLines = wrap(sans, report.endpoint.body, 9, width - 26);
      const boxH = bodyLines.length * 12 + 44;
      ensure(boxH + 8);
      page.drawRectangle({ x: MARGIN, y: y + 10 - boxH, width, height: boxH, color: brand });
      page.drawRectangle({ x: MARGIN, y: y + 10 - boxH, width: 4, height: boxH, color: signalBright });
      write(page, "The endpoint".toUpperCase(), {
        x: MARGIN + 14,
        y: y,
        size: 6.7,
        font: mono,
        color: accentLight,
        tracking: 0.17,
      });
      write(page, bigLead, { x: MARGIN + 14, y: y - 18, size: 15, font: regular, color: white });
      write(page, bigAddr, {
        x: MARGIN + 14 + regular.widthOfTextAtSize(latin(bigLead), 15),
        y: y - 18,
        size: 10,
        font: mono,
        color: white,
      });
      let cy = y - 32;
      bodyLines.forEach((line) => {
        write(page, line, { x: MARGIN + 14, y: cy, size: 9, font: sans, color: calloutInk });
        cy -= 12;
      });
      y -= boxH;
    }
  }

  if (report.sections.methodology || report.sections.recommendations) {
    ensure(190);
    if (report.sections.methodology) {
      band("Method, sources and limitations", "To be read with every finding above");
      const methodTop = y;
      const bothColumns = report.method.length > 0 && report.limitations.length > 0;
      const columnGap = bothColumns ? 28 : 0;
      const columnWidth = bothColumns ? (width - columnGap) / 2 : width;
      const drawEvidenceColumn = (title, items, x) => {
        let columnY = methodTop;
        if (!items.length) return columnY;
        write(page, title, { x, y: columnY, size: 10.4, font: italic, color: accent });
        columnY -= 16;
        items.forEach((item) => {
          const lines = wrap(sans, item, 8.45, columnWidth - 16);
          write(page, "—", { x: x + 1, y: columnY, size: 8.45, font: sans, color: teal });
          lines.forEach((line, lineIndex) => {
            write(page, line, {
              x: x + 16,
              y: columnY - lineIndex * 10.9,
              size: 8.45,
              font: sans,
              color: brand,
            });
          });
          columnY -= lines.length * 10.9 + 4.4;
        });
        return columnY;
      };
      const methodEnd = drawEvidenceColumn("Method and sources", report.method, MARGIN);
      const limitsX = bothColumns ? MARGIN + columnWidth + columnGap : MARGIN;
      const limitsEnd = report.limitations.length
        ? drawEvidenceColumn("Limitations", report.limitations, limitsX)
        : methodEnd;
      const evidenceBottom = Math.min(methodEnd, limitsEnd);
      if (bothColumns) {
        page.drawRectangle({
          x: MARGIN + columnWidth + columnGap / 2,
          y: evidenceBottom + 5,
          width: 0.5,
          height: methodTop - evidenceBottom - 1,
          color: rule,
        });
      }
      y = evidenceBottom - 2;
    }

    if (report.sections.recommendations) {
      band("What follows from this", "For instruction, not yet actioned");
      report.nextSteps.forEach((item, i) => {
        const hang = 18;
        const lines = wrap(sans, item, 9.1, width - hang);
        ensure(lines.length * 12.7 + 6);
        write(page, `${i + 1}.`, { x: MARGIN, y, size: 8.4, font: mono, color: accent });
        lines.forEach((line, li) => {
          write(page, line, { x: MARGIN + hang, y: y - li * 12.7, size: 9.1, font: sans, color: brand });
        });
        y -= lines.length * 12.7 + 4.4;
      });
    }
  }

  if (report.sections.appendix || report.sections.statement) {
    if (report.sections.appendix && (report.sections.methodology || report.sections.recommendations)) {
      addPage();
    } else {
      ensure(report.sections.appendix ? 220 : 130);
    }
    if (report.sections.appendix) {
      band("Appendix A — addresses relied on", "Full strings, as read from the ledger");
      drawTable(
        [
          { key: "role", label: "Role", width: 0.26 },
          { key: "network", label: "Network", width: 0.14 },
          { key: "address", label: "Address", width: 0.60, mono: true },
        ],
        report.appendix,
        { compact: true },
      );
    }

    if (report.sections.statement) {
      const statementLines = wrap(sans, report.statement, 8.9, width);
      const statementBlock = 14 + statementLines.length * 11.6 + (report.signature ? 66 : 28);
      ensure(statementBlock);
      write(page, "Statement", { x: MARGIN, y, size: 10, font: italic, color: accent });
      y -= 14;
      statementLines.forEach((line) => {
        write(page, line, { x: MARGIN, y, size: 8.9, font: sans, color: brand });
        y -= 11.6;
      });
      if (report.signature) {
        y -= 18;
        ensure(36);
        page.drawRectangle({ x: MARGIN, y: y + 8, width: width * 0.44, height: 0.6, color: sigRule });
        y -= 6;
        write(page, report.signature, { x: MARGIN, y, size: 8, font: sans, color: brand });
      }
    }
  }

  y -= 16;
  page.drawRectangle({ x: MARGIN, y: y + 8, width, height: 0.8, color: brand });
  y -= 4;
  wrap(sans, TRACING_FOOT_REG, 6.2, width).forEach((line) => {
    ensure(9);
    write(page, line, { x: MARGIN, y, size: 6.2, font: sans, color: muted });
    y -= 9;
  });

  pdf.setTitle(`Edison Law tracing report - ${report.client}`);
  pdf.setAuthor("Edison Law");
  pdf.setCreator("Edison Law");
  pdf.setSubject("Cryptoasset tracing report");
  const bytes = await pdf.save();
  return {
    bytes,
    filename: tracingFilename(report.client),
    report,
    sanitized: values,
    validation: { ok: true, issues: [], critical: [] },
  };
}

/* Three disciplined routes converge on fixed ports at one endpoint. Orthogonal
   connectors keep amounts, arrowheads and nodes from competing for the same
   space, even when the generated values are unusually long. */
const VIEW_W = 880;
const VIEW_H = 300;
const FIGCAP = "Figure 1 — every branch of the loss, followed to the endpoint. Connector values are labelled in BTC, ETH or USDT; the endpoint is stated in sterling. Network, bridge and swap fees are itemised in the hop table.";

const FLOW_NODES = [
  { x: 8, y: 104, w: 98, h: 48, tone: "ink", title: "Victim · BTC", tx: 18, ty: 124, key: "victimBtc", sy: 139 },
  { x: 8, y: 228, w: 98, h: 48, tone: "ink", title: "Victim · USDT", tx: 18, ty: 248, key: "victimUsdt", sy: 263 },
  { x: 130, y: 104, w: 98, h: 48, tone: "ink", title: "Collection", tx: 140, ty: 124, key: "collection", sy: 139 },
  { x: 254, y: 24, w: 110, h: 48, tone: "copper", title: "Peel chain", tx: 264, ty: 44, key: "peel", sy: 59 },
  { x: 254, y: 126, w: 110, h: 48, tone: "ink", title: "Direct hops", tx: 264, ty: 146, key: "direct", sy: 161 },
  { x: 254, y: 228, w: 110, h: 48, tone: "copper", title: "Swap to ETH", tx: 264, ty: 248, key: "swap", sy: 263 },
  { x: 404, y: 24, w: 110, h: 48, tone: "copper", title: "Bridge to ETH", tx: 414, ty: 44, key: "bridge", sy: 59 },
  { x: 404, y: 126, w: 110, h: 48, tone: "ink", title: "Exchange B", tx: 414, ty: 146, text: "pass-through", sy: 161 },
  { x: 568, y: 104, w: 98, h: 48, tone: "ink", title: "Consolidation", tx: 578, ty: 124, key: "cons", sy: 139 },
  {
    x: 706,
    y: 96,
    w: 170,
    h: 64,
    tone: "end",
    title: "Endpoint wallet · FROZEN",
    titleSize: 12.5,
    tx: 717,
    ty: 119,
    key: "frozen",
    sy: 137,
    key2: "frozenSub",
    sy2: 151,
  },
];

/* Targets stop four units before their node. Branches enter consolidation at
   three distinct ports, so none of the routes cross or share an arrowhead. */
const FLOW_EDGES = [
  { points: [[106, 128], [126, 128]] },
  { points: [[228, 116], [240, 116], [240, 48], [250, 48]] },
  { points: [[228, 140], [240, 140], [240, 150], [250, 150]] },
  { points: [[364, 48], [400, 48]] },
  { points: [[364, 150], [400, 150]] },
  { points: [[106, 252], [250, 252]] },
  { points: [[514, 48], [532, 48], [532, 116], [564, 116]] },
  { points: [[514, 150], [544, 150], [544, 128], [564, 128]] },
  { points: [[364, 252], [556, 252], [556, 140], [564, 140]] },
  { points: [[666, 128], [702, 128]] },
];

/* `w` is the clear run available to each label, so an unusually large figure
   shrinks rather than running under a neighbouring box. */
const FLOW_LABELS = [
  { key: "e1", x: 118, y: 120, w: 34 },
  { key: "e2", x: 240, y: 82, w: 40 },
  { key: "e3", x: 240, y: 134, w: 40 },
  { key: "e4", x: 382, y: 40, w: 38 },
  { key: "e5", x: 382, y: 142, w: 38 },
  { key: "e6", x: 178, y: 244, w: 142 },
  { key: "e7", x: 532, y: 80, w: 54 },
  { key: "e8", x: 544, y: 142, w: 50 },
  { key: "e9", x: 684, y: 120, w: 38 },
];

const FLOW_LEGEND = [
  { tone: "ink", label: "Attributable hop" },
  { tone: "copper", label: "Obfuscation or chain-hop" },
  { tone: "end", label: "Frozen endpoint" },
];

const FLOW_TONES = { ink: brand, copper, end: teal };
const EDGE_STROKE = rgb(92 / 255, 126 / 255, 122 / 255);
const LANE_RULE = rgb(222 / 255, 232 / 255, 229 / 255);
const FIG_PAD = 10;
const ARROW_LEN = 8;
const ARROW_HALF = 4;

/** Direction the marker-end arrow points, taken from the last non-zero control leg. */
function edgeDirection(edge) {
  const tip = edge.points.at(-1);
  const previous = edge.points.at(-2);
  const dx = tip[0] - previous[0];
  const dy = tip[1] - previous[1];
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

function flowFigureHeight(w, italic) {
  const svgW = w - FIG_PAD * 2;
  const svgH = svgW * (VIEW_H / VIEW_W);
  const caption = wrap(italic, FIGCAP, 7.1, svgW).length;
  return FIG_PAD * 2 + svgH + 8 + 9 + 7 + caption * 9;
}

function drawFlowFigure(page, d, { x, top, w, fonts }) {
  const { sansBold, italic, mono } = fonts;
  const height = flowFigureHeight(w, italic);
  const svgW = w - FIG_PAD * 2;
  const scale = svgW / VIEW_W;
  const svgH = VIEW_H * scale;
  const left = x + FIG_PAD;
  const svgTop = top - FIG_PAD;

  page.drawRectangle({
    x,
    y: top - height,
    width: w,
    height,
    color: card,
    borderColor: rule,
    borderWidth: 0.5,
  });

  const px = (v) => left + v * scale;
  const py = (v) => svgTop - v * scale;

  /* Quiet lane rules make the three routes scannable without turning the
     figure into a table. */
  [92, 202].forEach((laneY) => {
    page.drawLine({
      start: { x: px(4), y: py(laneY) },
      end: { x: px(876), y: py(laneY) },
      thickness: 0.7 * scale,
      color: LANE_RULE,
    });
  });

  FLOW_EDGES.forEach((edge) => {
    const points = edge.points;
    for (let i = 1; i < points.length; i += 1) {
      page.drawLine({
        start: { x: px(points[i - 1][0]), y: py(points[i - 1][1]) },
        end: { x: px(points[i][0]), y: py(points[i][1]) },
        thickness: 1.8 * scale,
        color: EDGE_STROKE,
      });
    }
    const [dx, dy] = edgeDirection(edge);
    const [tipX, tipY] = points.at(-1);
    const baseX = tipX - dx * ARROW_LEN;
    const baseY = tipY - dy * ARROW_LEN;
    /* Two stroked arms stay crisp at PDF zoom levels where filled SVG marker
       paths can become malformed wedges. */
    [
      [baseX - dy * ARROW_HALF, baseY + dx * ARROW_HALF],
      [baseX + dy * ARROW_HALF, baseY - dx * ARROW_HALF],
    ].forEach(([armX, armY]) => {
      page.drawLine({
        start: { x: px(armX), y: py(armY) },
        end: { x: px(tipX), y: py(tipY) },
        thickness: 1.8 * scale,
        color: EDGE_STROKE,
      });
    });
  });

  FLOW_NODES.forEach((node) => {
    page.drawRectangle({
      x: px(node.x),
      y: py(node.y + node.h),
      width: node.w * scale,
      height: node.h * scale,
      color: FLOW_TONES[node.tone],
    });
    const room = (node.x + node.w - node.tx - 6) * scale;
    let titleSize = (node.titleSize || 13) * scale;
    while (titleSize > 11 * scale && sansBold.widthOfTextAtSize(node.title, titleSize) > room) {
      titleSize -= 0.2 * scale;
    }
    write(page, fit(sansBold, node.title, titleSize, room), {
      x: px(node.tx),
      y: py(node.ty),
      size: titleSize,
      font: sansBold,
      color: white,
    });
    const sub = node.text || d[node.key] || "";
    let subSize = 11.2 * scale;
    while (subSize > 9.6 * scale && mono.widthOfTextAtSize(latin(sub), subSize) > room) {
      subSize -= 0.2 * scale;
    }
    write(page, fit(mono, sub, subSize, room), {
      x: px(node.tx),
      y: py(node.sy),
      size: subSize,
      font: mono,
      color: white,
      opacity: 0.86,
    });
    if (!node.key2) return;
    const second = d[node.key2] || "";
    let secondSize = 11.2 * scale;
    while (secondSize > 9.6 * scale && mono.widthOfTextAtSize(latin(second), secondSize) > room) {
      secondSize -= 0.2 * scale;
    }
    write(page, fit(mono, second, secondSize, room), {
      x: px(node.tx),
      y: py(node.sy2),
      size: secondSize,
      font: mono,
      color: white,
      opacity: 0.86,
    });
  });

  /* Each value sits on a bordered chip. This separates measurement from route
     geometry and makes the amount visually belong to the connector. */
  FLOW_LABELS.forEach((label) => {
    const text = latin(d[label.key]);
    if (!text) return;
    const room = (label.w - 4) * scale;
    let size = 10.2 * scale;
    while (size > 7 * scale && mono.widthOfTextAtSize(text, size) > room) size -= 0.2 * scale;
    const textW = mono.widthOfTextAtSize(text, size);
    const originX = px(label.x) - textW / 2;
    const originY = py(label.y);
    page.drawRectangle({
      x: originX - 4 * scale,
      y: originY - 3 * scale,
      width: textW + 8 * scale,
      height: size + 5 * scale,
      color: white,
      borderColor: rule,
      borderWidth: 0.45,
    });
    write(page, text, { x: originX, y: originY, size, font: mono, color: brand });
  });

  let lx = left;
  const legendY = svgTop - svgH - 8 - 6.8;
  FLOW_LEGEND.forEach((item) => {
    page.drawRectangle({ x: lx, y: legendY - 0.5, width: 8, height: 8, color: FLOW_TONES[item.tone] });
    write(page, item.label, { x: lx + 12, y: legendY, size: 6.8, font: mono, color: brand });
    lx += 12 + mono.widthOfTextAtSize(item.label, 6.8) + 14;
  });

  let cy = legendY - 7 - 7.1;
  wrap(italic, FIGCAP, 7.1, svgW).forEach((line) => {
    write(page, line, { x: left, y: cy, size: 7.1, font: italic, color: muted });
    cy -= 9;
  });

  return height;
}
