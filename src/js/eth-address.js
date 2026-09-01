const ETH_RE = /^0x[a-fA-F0-9]{40}$/;
const ETH_EMBED_RE = /0x[a-fA-F0-9]{40}/;

/** Full 0x + 40-hex address, preserving input casing. Empty string if none found. */
export function extractEthAddress(value) {
  const match = String(value || "").match(ETH_EMBED_RE);
  return match ? match[0] : "";
}

export function isEthAddress(value) {
  const raw = String(value || "").trim();
  return ETH_RE.test(raw) || Boolean(extractEthAddress(value));
}

/** Trim only; preserve address casing exactly as entered. */
export function formatEthAddress(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (ETH_RE.test(raw)) return raw;
  const found = extractEthAddress(raw);
  if (!found) return raw;
  return raw.replace(ETH_EMBED_RE, found);
}

export function explorerUrl(address) {
  const hex = extractEthAddress(address);
  return hex ? `https://etherscan.io/address/${hex}` : "";
}
