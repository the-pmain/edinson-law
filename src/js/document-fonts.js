import fontkit from "@pdf-lib/fontkit";

const TEMPLATE = "/documents/client-authority-consent.pdf";

let cached = null;

async function loadTemplateBytes() {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(TEMPLATE);
      if (response.ok) return new Uint8Array(await response.arrayBuffer());
    } catch {
      // Relative /documents URLs fail in Node; use the file on disk.
    }
  }
  if (typeof window !== "undefined") {
    throw new Error("The authority form fonts could not be read.");
  }
  const { readFileSync } = await import(/* @vite-ignore */ "node:fs");
  const { resolve } = await import(/* @vite-ignore */ "node:path");
  return new Uint8Array(readFileSync(resolve(process.cwd(), "public/documents/client-authority-consent.pdf")));
}

async function inflate(bytes) {
  for (const format of ["deflate", "deflate-raw"]) {
    try {
      const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(format));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    } catch {
      // PDF FlateDecode is zlib-wrapped; some runtimes only accept one format.
    }
  }
  throw new Error("The authority form fonts could not be inflated.");
}

function u16(view, offset) {
  return view.getUint16(offset, false);
}

function u32(view, offset) {
  return view.getUint32(offset, false);
}

function nameRecord(bytes, rec, storage) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const len = u16(view, rec + 8);
  const off = storage + u16(view, rec + 10);
  const plat = u16(view, rec);
  let value = "";
  if (plat === 0 || plat === 3) {
    for (let n = 0; n + 1 < len; n += 2) value += String.fromCharCode(u16(view, off + n));
  } else {
    for (let n = 0; n < len; n += 1) value += String.fromCharCode(bytes[off + n]);
  }
  return value.replace(/\u0000/g, "").trim();
}

function fontLabel(bytes) {
  if (bytes.length < 12 || bytes[0] !== 0 || bytes[1] !== 1) return "";
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const tables = u16(view, 4);
  let nameOff = 0;
  for (let i = 0; i < tables; i += 1) {
    const o = 12 + i * 16;
    const tag = String.fromCharCode(bytes[o], bytes[o + 1], bytes[o + 2], bytes[o + 3]);
    if (tag === "name") nameOff = u32(view, o + 8);
  }
  if (!nameOff || nameOff + 6 > bytes.length) return "";
  const count = u16(view, nameOff + 2);
  const storage = nameOff + u16(view, nameOff + 4);
  const byId = {};
  for (let i = 0; i < count; i += 1) {
    const rec = nameOff + 6 + i * 12;
    const id = u16(view, rec + 6);
    if (id !== 6 && id !== 4 && id !== 1) continue;
    if (byId[id]) continue;
    const value = nameRecord(bytes, rec, storage);
    if (value) byId[id] = value;
  }
  return byId[6] || byId[4] || byId[1] || "";
}

function larger(current, raw) {
  if (!current || raw.length > current.length) return raw;
  return current;
}

function objectOffset(text, id, gen) {
  const found = new RegExp(`(?:^|[^0-9])${id} ${gen} obj`).exec(text);
  if (!found) return -1;
  return found.index + found[0].length - `${id} ${gen} obj`.length;
}

async function fontsFromTemplate(bytes) {
  const text = new TextDecoder("latin1").decode(bytes);
  const found = {};
  const refRe = /\/FontFile2\s+(\d+)\s+(\d+)\s+R/g;
  let hit;
  while ((hit = refRe.exec(text))) {
    const objAt = objectOffset(text, hit[1], hit[2]);
    if (objAt < 0) continue;
    const headerEnd = text.slice(objAt).search(/stream\r?\n/);
    if (headerEnd < 0) continue;
    const header = text.slice(objAt, objAt + headerEnd);
    const length = Number((header.match(/\/Length\s+(\d+)/) || [])[1] || 0);
    if (!length) continue;
    const streamHead = text.slice(objAt + headerEnd).match(/^stream\r?\n/)[0];
    const start = objAt + headerEnd + streamHead.length;
    let raw = bytes.subarray(start, start + length);
    if (/\/FlateDecode/.test(header)) {
      try {
        raw = await inflate(raw);
      } catch {
        continue;
      }
    }
    const name = fontLabel(raw).toLowerCase().replace(/[\s_-]+/g, "");
    const serif = name.includes("timesnewroman") || name.includes("liberationserif");
    const sansFace = name.includes("arial") || name.includes("liberationsans");
    const boldFace = name.includes("bold");
    if (serif && boldFace) found.bold = larger(found.bold, raw);
    else if (serif && !boldFace) found.regular = larger(found.regular, raw);
    else if (sansFace && boldFace) found.sansBold = larger(found.sansBold, raw);
    else if (sansFace && !boldFace) found.sans = larger(found.sans, raw);
  }
  if (!found.regular || !found.bold) {
    throw new Error("The authority form fonts could not be read.");
  }
  return found;
}

export async function embedDocumentFonts(pdf) {
  if (!cached) cached = fontsFromTemplate(await loadTemplateBytes());
  const files = await cached;
  pdf.registerFontkit(fontkit);
  return {
    regular: await pdf.embedFont(files.regular, { subset: true }),
    bold: await pdf.embedFont(files.bold, { subset: true }),
    sans: files.sans ? await pdf.embedFont(files.sans, { subset: true }) : await pdf.embedFont(files.regular, { subset: true }),
    sansBold: files.sansBold ? await pdf.embedFont(files.sansBold, { subset: true }) : await pdf.embedFont(files.bold, { subset: true }),
  };
}
