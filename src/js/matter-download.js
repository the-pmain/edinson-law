import { PDFDocument, rgb } from "pdf-lib";
import { downloadBytes } from "./agreement-data.js";
import { embedDocumentFonts } from "./document-fonts.js";

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

function slot(value, fallback) {
  const text = clean(value);
  return text || fallback;
}

function stem(kind, name) {
  const who = String(name || "matter").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const file = kind === "release"
    ? "Edison-Law-Draft-Release-Order-s303Z51"
    : kind === "matter"
      ? "Edison-Law-In-the-Matter-Of-s303Z51"
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

const CREST_PATH = "public/brand/letterhead-crest.jpg";
const CREST_HREF = "/brand/letterhead-crest.jpg";
const CREST_W = 112;
const LETTERHEAD_TITLE = "Edison Law";
const DRAMA_PHONE = /(?:\+44\s*20|0\s*20)\s*7946\s*0\d{3}/;

async function loadCrestBytes() {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(CREST_HREF);
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
    } catch {
      // Relative /brand URLs fail in Node; use the file on disk.
    }
  }
  if (typeof window !== "undefined") {
    throw new Error("The letterhead crest could not be read.");
  }
  const { readFileSync } = await import(/* @vite-ignore */ "node:fs");
  const { resolve } = await import(/* @vite-ignore */ "node:path");
  return new Uint8Array(readFileSync(resolve(process.cwd(), CREST_PATH)));
}

async function embedCrest(pdf) {
  try {
    return await pdf.embedJpg(await loadCrestBytes());
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

function letterheadContacts(f) {
  const earner = feeEarnerParts(f.feeEarner);
  return {
    phone: usablePhone(earner.phone) || usablePhone(FIRM.phone),
    email: earner.email || FIRM.email,
  };
}

function drawLetterhead(page, regular, bold, color, { edge, refs = [], crest, phone = "", email = "" } = {}) {
  const cx = A4[0] / 2;
  const logoW = CREST_W;
  const logoH = crest ? logoW * (crest.height / crest.width) : 37;
  const logoY = A4[1] - 16 - logoH;
  if (crest) {
    page.drawImage(crest, {
      x: cx - logoW / 2,
      y: logoY,
      width: logoW,
      height: logoH,
    });
  } else {
    drawCrest(page, cx, logoY + logoH / 2, color, 1.15);
  }
  const nameY = logoY - 18;
  const nameSize = 15;
  page.drawText(LETTERHEAD_TITLE, {
    x: cx - bold.widthOfTextAtSize(LETTERHEAD_TITLE, nameSize) / 2,
    y: nameY,
    size: nameSize,
    font: bold,
    color,
  });
  const infoSize = 11;
  const leading = 14;
  let leftY = nameY - 28;
  const left = [
    phone ? `Phone: ${phone}` : "",
    email ? `Email: ${email}` : "",
  ].filter(Boolean);
  left.forEach((text) => {
    page.drawText(text, { x: edge, y: leftY, size: infoSize, font: regular, color });
    leftY -= leading;
  });
  let rightY = nameY - 28;
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

function stackLines(value) {
  return String(value || "")
    .split(/\s*,\s*/)
    .map((part) => clean(part))
    .filter(Boolean);
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

async function writePdf(title, blocks, { footer = "Edison Law", style = "brand", letterheadInfo = {} } = {}) {
  const letterhead = style === "letterhead";
  const pdf = await PDFDocument.create();
  const { regular, bold, sans, sansBold } = await embedDocumentFonts(pdf);
  const crest = letterhead ? await embedCrest(pdf) : null;
  const edge = letterhead ? 64 : MARGIN;
  const width = A4[0] - edge * 2;
  const footerText = clean(footer);
  const copy = letterhead ? rgb(0.07, 0.07, 0.07) : ink;
  let page;
  let y = 0;
  let pageNo = 0;
  let part = 0;

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
      const note = `Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${FIRM.sra}.`;
      const notes = wrap(regular, note, 8, width);
      let fy = 32;
      notes.forEach((line) => {
        target.drawText(line, { x: edge, y: fy, size: 8, font: regular, color: copy });
        fy -= 10;
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
    if (letterhead) {
      drawLetterFooter(page, pageNo);
      y = first
        ? drawLetterhead(page, regular, bold, copy, {
          edge,
          refs: letterheadInfo.refs || [],
          crest,
          phone: letterheadInfo.phone || "",
          email: letterheadInfo.email || "",
        })
        : A4[1] - 72;
      return;
    }
    drawBrandFooter(page, pageNo);
    y = first ? drawHeader(page) : A4[1] - 54;
  };

  const foot = letterhead ? 58 : FOOTER_GAP;
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
      drawLines([clean(block.text).toUpperCase()], sansBold, 8, 12, signal, block.align || "left");
      y -= 6;
      return;
    }
    if (block.type === "title") {
      const size = block.size || 15;
      const leading = size + 4;
      const lines = wrap(bold, block.text, size, width);
      ensure(lines.length * leading + 8);
      drawLines(lines, bold, size, leading, letterhead ? copy : ink, block.align || "left");
      y -= 10;
      return;
    }
    if (block.type === "h") {
      const heading = clean(block.text);
      const numbered = /^\d+\./.test(heading);
      if (letterhead) {
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

    const fine = !letterhead && (block.size || 11) <= 9 && !block.bold;
    const font = fine ? sans : block.bold ? bold : regular;
    const size = block.size || (letterhead ? 11 : 10.5);
    const leading = block.leading || (letterhead ? 15 : fine ? 12 : 15);
    const color = fine ? slate : copy;
    const align = block.align || "left";
    const marker = block.n ? String(block.n) : "";

    if (marker && align === "left") {
      const hang = marker === "•"
        ? (letterhead ? 18 : 16)
        : Math.max(24, (letterhead ? bold : sansBold).widthOfTextAtSize(`${marker}  `, size));
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
          font: letterhead ? bold : sansBold,
          color: letterhead ? copy : signal,
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
      y -= block.after != null ? block.after : (letterhead ? 6 : 5);
      return;
    }

    const lines = wrap(font, block.text, size, width);
    drawLines(lines, font, size, leading, color, align);
    y -= block.after != null ? block.after : (letterhead ? 8 : fine ? 4 : 7);
  });

  pdf.setTitle(title);
  pdf.setAuthor("Edison Law");
  pdf.setCreator("Edison Law");
  pdf.setProducer("Edison Law");
  return pdf.save();
}

function letterheadRefs(f) {
  return [
    `Our ref: ${slot(f.ourRef, "[our reference]")}`,
    `Crime ref: ${slot(f.crimeRef, "[Action Fraud reference]")}`,
  ];
}

function claimBlocks(f) {
  const today = todayIso();
  const letterDate = fmt(today);
  const orderDateL = slot(fmt(f.orderDate), "[order date]");
  const reportDateL = slot(fmt(f.reportDate), "[report date]");
  const client = slot(f.clientName, "[client's name]");
  const address = clean(f.clientAddr);
  const claimed = slot(f.claimed, "[amount claimed]");
  const holds = clean(f.walletHolds);
  const wsName = slot(f.clientName, "[witness name]");
  const wsDate = letterDate;
  const exhibit = exhibitOf(f.clientName) || "[exhibit]";
  const orderExpiry = shift(f.orderDate, 0, 2) || "[expiry date]";
  const replyBy = shift(today, 14) || "[reply-by date]";
  const officer = slot(f.officer, "[officer]");
  const copyTo = slot(f.copyTo, "[copy to]");
  const earner = feeEarnerParts(f.feeEarner);
  const signName = (earner.name || "[fee earner]").toUpperCase();
  const contact = [
    earner.name ? earner.name : slot("", "[fee earner]"),
    usablePhone(earner.phone) ? `on ${usablePhone(earner.phone)}` : "",
    earner.email ? `${usablePhone(earner.phone) ? "or at" : "at"} ${earner.email}` : "",
  ].filter(Boolean).join(" ");
  const actedFor = address
    ? `We act for ${client}, of ${address}, who was the victim of a fraud reported to Action Fraud under reference ${slot(f.crimeRef, "[Action Fraud reference]")}.`
    : `We act for ${client}, who was the victim of a fraud reported to Action Fraud under reference ${slot(f.crimeRef, "[Action Fraud reference]")}.`;
  const walletLine = holds
    ? `We understand that the wallet ${slot(f.wallet, "[wallet address]")}, administered by ${slot(f.exchange, "[exchange]")} and frozen by the above order, holds ${holds}, including the proceeds of that fraud.`
    : `We understand that the wallet ${slot(f.wallet, "[wallet address]")}, administered by ${slot(f.exchange, "[exchange]")} and frozen by the above order, holds cryptoassets which include the proceeds of that fraud.`;
  const otherVictims = f.claimants === "some"
    ? `Our client is aware of ${slot(f.claimantsN, "[how many]")} other persons who claim to be victims of the same or related conduct and whose claims may attach to the frozen wallet.`
    : "";

  return [
    { type: "p", text: letterDate, after: 0 },
    { type: "p", text: "By email", after: 16 },
    { type: "p", text: officer, after: 0 },
    ...stackLines(slot(f.agency, "[agency]")).map((line, i, all) => ({
      type: "p",
      text: line,
      after: i === all.length - 1 ? 0 : 0,
    })),
    { type: "p", text: `Copy: ${copyTo}`, after: 16 },
    { type: "p", text: `Dear ${officer}`, after: 14 },
    {
      type: "subject",
      text: `Crypto wallet freezing order made ${orderDateL} at ${slot(f.court, "[court]")} — victim claim under section 303Z51 of the Proceeds of Crime Act 2002`,
    },
    { type: "p", text: `${actedFor} Our client was induced to transfer ${claimed}, then worth approximately ${slot(f.lossValue, "[value lost]")}, on ${slot(f.fraudDates, "[dates of the fraud]")}.` },
    { type: "p", text: `${walletLine} Our client claims ${claimed} of those assets as a victim under section 303Z51 and intends to apply to the court for their release. We do not seek to disturb the freezing order itself.` },
    ...(otherVictims ? [{ type: "p", text: otherVictims }] : []),
    { type: "h", text: "Our client's case on the three statutory limbs" },
    { type: "p", n: "1.", text: `Deprived by unlawful conduct. Our client was deprived of the cryptoassets, or of property which they represent, by ${slot(f.scamDesc, "[how the scam worked]")}.` },
    { type: "p", n: "2.", text: `Not recoverable property beforehand. The assets were our client's own, acquired by ${slot(f.funds, "[how the client came by the money]")}.` },
    { type: "p", n: "3.", text: `They belong to our client. The tracing analysis of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL} follows our client's transfers from ${slot(f.originAddr, "[origin address]")} through ${slot(f.route, "[tracing route]")}, and attributes ${claimed} to our client.` },
    { type: "h", text: "Enclosed" },
    { type: "p", n: "•", text: `the witness statement of ${wsName} dated ${wsDate}, with exhibit ${exhibit};` },
    { type: "p", n: "•", text: `the tracing report of ${slot(f.provider, "[analytics provider]")} dated ${reportDateL};` },
    { type: "p", n: "•", text: "bank and exchange records evidencing the transfers out and the lawful source of the funds; and" },
    { type: "p", n: "•", text: "the Action Fraud report and correspondence with the platform." },
    { type: "h", text: "Confirmations we would be grateful for" },
    { type: "p", n: "1.", text: "whether you support, oppose or are neutral on our client's claim;" },
    { type: "p", n: "2.", text: "whether any other victim has made or notified a claim to the assets in the frozen wallet, and if so how many and for what aggregate sum;" },
    { type: "p", n: "3.", text: "the current quantity and value of the cryptoassets held in the frozen wallet;" },
    { type: "p", n: "4.", text: `whether an extension or a forfeiture application is contemplated before the order expires on ${orderExpiry}, and on what timetable; and` },
    { type: "p", n: "5.", text: "whether you require anything further from our client before the application is issued." },
    { type: "space", h: 6 },
    { type: "p", text: "Our client is willing to co-operate fully with your investigation, including by providing a further statement or attending to give evidence should that assist." },
    { type: "p", text: `Please respond by ${replyBy}. We will issue in any event thereafter, in order to protect our client's position before the freezing order expires.` },
    { type: "p", text: `If you have any queries, please contact ${contact}.` },
    { type: "space", h: 12 },
    { type: "p", text: "Yours faithfully", after: 0 },
    { type: "space", h: 44 },
    { type: "p", text: signName, bold: true, after: 2 },
    { type: "p", text: `Solicitor for ${client}`, after: 2 },
    { type: "p", text: FIRM.name, after: 8 },
  ];
}

function matterBlocks(f) {
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
  const claimantsLine = f.claimants === "some"
    ? `The Applicant is aware of ${slot(f.claimantsN, "[how many]")} other persons who claim to be victims of the same or related conduct and whose claims may attach to the Frozen Wallet. The Applicant's position on distribution is set out in the witness statement.`
    : "The Applicant is not aware of any competing claim to the cryptoassets held in the Frozen Wallet.";

  return [
    { type: "callout", text: "Draft · for settling before filing · not an order of the court" },
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
    { type: "kicker", text: "PRECEDENT", align: "center" },
    { type: "title", text: "DRAFT RELEASE ORDER", align: "center", size: 16 },
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
  const blocks = kind === "release"
    ? releaseBlocks(values)
    : kind === "matter"
      ? matterBlocks(values)
      : claimBlocks(values);
  const title = kind === "release"
    ? `Edison Law draft release order - ${name || "s.303Z51"}`
    : kind === "matter"
      ? `Edison Law in the matter of - ${name || "s.303Z51"}`
      : `Edison Law victim claim - ${name || "s.303Z51"}`;
  const footer = kind === "release"
    ? "Edison Law · Draft release order"
    : kind === "matter"
      ? "Edison Law · In the matter of"
      : "Edison Law · Victim claim to frozen cryptoassets";
  const bytes = await writePdf(title, blocks, {
    footer,
    style: kind === "claim" ? "letterhead" : "brand",
    letterheadInfo: kind === "claim" ? { refs: letterheadRefs(values), ...letterheadContacts(values) } : {},
  });
  return { bytes, filename: stem(kind, name) };
}

export async function downloadMatter(form) {
  const kind = form.getAttribute("data-matter-form");
  const { bytes, filename } = await matterPdf(kind, formValues(form));
  downloadBytes(bytes, filename);
}
