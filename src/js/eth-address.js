const ETH_RE = /^0x[a-fA-F0-9]{40}$/;

/** Full 0x + 40-hex address, lowercased. Empty string if none found. */
export function extractEthAddress(value) {
  const match = String(value || "").match(/0x[a-fA-F0-9]{40}/);
  return match ? `0x${match[0].slice(2).toLowerCase()}` : "";
}

export function isEthAddress(value) {
  return ETH_RE.test(extractEthAddress(value) || String(value || "").trim());
}

/** Replace a bare or embedded 40-hex address with a complete 42-character form. */
export function formatEthAddress(value) {
  const found = extractEthAddress(value);
  if (!found) return String(value || "").trim();
  const raw = String(value || "").trim();
  if (ETH_RE.test(raw) || raw === found) return found;
  return raw.replace(/0x[a-fA-F0-9]{40}/, found);
}

export function explorerUrl(address) {
  const hex = extractEthAddress(address);
  return hex ? `https://etherscan.io/address/${hex}` : "";
}
