/**
 * Byte-mode QR encoder (ECC L, versions 1–6) for explorer URLs.
 * Follows ISO/IEC 18004 function patterns, Reed–Solomon, and mask 0.
 */

const ECC_L = {
  1: { data: 19, ecc: 7, blocks: 1 },
  2: { data: 34, ecc: 10, blocks: 1 },
  3: { data: 55, ecc: 15, blocks: 1 },
  4: { data: 80, ecc: 20, blocks: 1 },
  5: { data: 108, ecc: 26, blocks: 1 },
  6: { data: 136, ecc: 18, blocks: 2 },
};

const BYTE_CAP_L = { 1: 17, 2: 32, 3: 53, 4: 78, 5: 106, 6: 134 };

const ALIGN = {
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
};

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
{
  let x = 1;
  for (let i = 0; i < 255; i += 1) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i += 1) GF_EXP[i] = GF_EXP[i - 255];
}

function gfMul(a, b) {
  if (!a || !b) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function rsGenerator(ecLen) {
  let poly = [1];
  for (let i = 0; i < ecLen; i += 1) {
    const next = new Array(poly.length + 1).fill(0);
    const root = GF_EXP[i];
    for (let j = 0; j < poly.length; j += 1) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], root);
    }
    poly = next;
  }
  return poly;
}

function rsEncode(data, ecLen) {
  const gen = rsGenerator(ecLen);
  const msg = [...data, ...new Array(ecLen).fill(0)];
  for (let i = 0; i < data.length; i += 1) {
    const coef = msg[i];
    if (!coef) continue;
    for (let j = 1; j < gen.length; j += 1) {
      msg[i + j] ^= gfMul(gen[j], coef);
    }
  }
  return msg.slice(data.length);
}

function versionFor(length) {
  for (let version = 1; version <= 6; version += 1) {
    if (length <= BYTE_CAP_L[version]) return version;
  }
  throw new Error("QR payload is too long for this encoder.");
}

function pushBits(bits, value, n) {
  for (let i = n - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
}

function dataCodewords(bytes, version) {
  const { data } = ECC_L[version];
  const bits = [];
  pushBits(bits, 0b0100, 4);
  pushBits(bits, bytes.length, 8);
  for (const byte of bytes) pushBits(bits, byte, 8);
  const capacity = data * 8;
  const remain = capacity - bits.length;
  pushBits(bits, 0, Math.min(4, remain));
  while (bits.length % 8) bits.push(0);
  const words = [];
  for (let i = 0; i < bits.length; i += 8) {
    let word = 0;
    for (let j = 0; j < 8; j += 1) word = (word << 1) | bits[i + j];
    words.push(word);
  }
  const pads = [0xec, 0x11];
  let pad = 0;
  while (words.length < data) {
    words.push(pads[pad % 2]);
    pad += 1;
  }
  return words.slice(0, data);
}

function errorBlocks(words, version) {
  const { data, ecc, blocks } = ECC_L[version];
  const shortData = Math.floor(data / blocks);
  const longBlocks = data % blocks;
  const shortBlocks = blocks - longBlocks;
  const blockData = [];
  let offset = 0;
  for (let i = 0; i < shortBlocks; i += 1) {
    blockData.push(words.slice(offset, offset + shortData));
    offset += shortData;
  }
  for (let i = 0; i < longBlocks; i += 1) {
    blockData.push(words.slice(offset, offset + shortData + 1));
    offset += shortData + 1;
  }
  const blockEcc = blockData.map((block) => [...rsEncode(block, ecc)]);
  const interleaved = [];
  const maxData = shortData + (longBlocks ? 1 : 0);
  for (let i = 0; i < maxData; i += 1) {
    for (const block of blockData) {
      if (i < block.length) interleaved.push(block[i]);
    }
  }
  for (let i = 0; i < ecc; i += 1) {
    for (const block of blockEcc) interleaved.push(block[i]);
  }
  return interleaved;
}

function sizeOf(version) {
  return 21 + 4 * (version - 1);
}

function fill(grid, reserved, x, y, w, h, dark) {
  for (let dy = 0; dy < h; dy += 1) {
    for (let dx = 0; dx < w; dx += 1) {
      const xx = x + dx;
      const yy = y + dy;
      if (yy < 0 || xx < 0 || yy >= grid.length || xx >= grid.length) continue;
      grid[yy][xx] = dark;
      reserved[yy][xx] = true;
    }
  }
}

function finder(grid, reserved, x, y) {
  fill(grid, reserved, x - 1, y - 1, 9, 9, false);
  fill(grid, reserved, x, y, 7, 7, true);
  fill(grid, reserved, x + 1, y + 1, 5, 5, false);
  fill(grid, reserved, x + 2, y + 2, 3, 3, true);
}

function alignment(grid, reserved, cx, cy) {
  fill(grid, reserved, cx - 2, cy - 2, 5, 5, true);
  fill(grid, reserved, cx - 1, cy - 1, 3, 3, false);
  fill(grid, reserved, cx, cy, 1, 1, true);
}

function overlapsFinder(size, x, y) {
  const inFinder = (px, py) =>
    (px <= 8 && py <= 8)
    || (px >= size - 9 && py <= 8)
    || (px <= 8 && py >= size - 9);
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      if (inFinder(x + dx, y + dy)) return true;
    }
  }
  return false;
}

function formatBits(mask) {
  const data = (0b01 << 3) | mask;
  let rem = data << 10;
  for (let i = 14; i >= 10; i -= 1) {
    if ((rem >>> i) & 1) rem ^= 0x537 << (i - 10);
  }
  return ((data << 10) | rem) ^ 0x5412;
}

function placeFormat(grid, reserved, bits) {
  const size = grid.length;
  const set = (row, col, i) => {
    const dark = ((bits >> (14 - i)) & 1) === 1;
    grid[row][col] = dark;
    reserved[row][col] = true;
  };
  for (let i = 0; i <= 5; i += 1) set(8, i, i);
  set(8, 7, 6);
  set(8, 8, 7);
  set(7, 8, 8);
  for (let i = 9; i <= 14; i += 1) set(14 - i, 8, i);

  for (let i = 0; i <= 6; i += 1) set(size - 1 - i, 8, i);
  for (let i = 7; i <= 14; i += 1) set(8, size - 15 + i, i);

  grid[size - 8][8] = true;
  reserved[size - 8][8] = true;
}

function mask0(x, y) {
  return (x + y) % 2 === 0;
}

function placeData(grid, reserved, codewords) {
  const size = grid.length;
  const bits = [];
  for (const word of codewords) {
    for (let i = 7; i >= 0; i -= 1) bits.push((word >> i) & 1);
  }
  let bit = 0;
  let upward = true;
  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col -= 1;
    for (let n = 0; n < size; n += 1) {
      const y = upward ? size - 1 - n : n;
      for (const x of [col, col - 1]) {
        if (reserved[y][x]) continue;
        const dark = bit < bits.length ? bits[bit] === 1 : false;
        grid[y][x] = dark !== mask0(x, y);
        bit += 1;
      }
    }
    upward = !upward;
  }
}

export function encodeQr(text) {
  const bytes = [...new TextEncoder().encode(String(text || ""))];
  const version = versionFor(bytes.length);
  const size = sizeOf(version);
  const grid = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved = Array.from({ length: size }, () => Array(size).fill(false));

  finder(grid, reserved, 0, 0);
  finder(grid, reserved, size - 7, 0);
  finder(grid, reserved, 0, size - 7);

  for (let i = 8; i < size - 8; i += 1) {
    const dark = i % 2 === 0;
    grid[6][i] = dark;
    reserved[6][i] = true;
    grid[i][6] = dark;
    reserved[i][6] = true;
  }

  const positions = ALIGN[version] || [];
  for (const y of positions) {
    for (const x of positions) {
      if (overlapsFinder(size, x, y)) continue;
      alignment(grid, reserved, x, y);
    }
  }

  placeFormat(grid, reserved, formatBits(0));
  const words = dataCodewords(bytes, version);
  placeData(grid, reserved, errorBlocks(words, version));

  return { data: grid, size, version };
}

export function qrSvg(text, { cell = 4, margin = 4 } = {}) {
  const { data, size } = encodeQr(text);
  const dim = (size + margin * 2) * cell;
  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" role="img" aria-hidden="true">`,
    `<rect width="100%" height="100%" fill="#fff"/>`,
  ];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!data[y][x]) continue;
      parts.push(
        `<rect x="${(x + margin) * cell}" y="${(y + margin) * cell}" width="${cell}" height="${cell}" fill="#0a2028"/>`,
      );
    }
  }
  parts.push("</svg>");
  return parts.join("");
}
