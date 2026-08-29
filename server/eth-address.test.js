import assert from "node:assert/strict";
import test from "node:test";
import {
  explorerUrl,
  extractEthAddress,
  formatEthAddress,
  isEthAddress,
} from "../src/js/eth-address.js";

test("extracts a complete 0x + 40-hex address", () => {
  const hex = "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109";
  assert.equal(extractEthAddress(hex), hex);
  assert.equal(extractEthAddress(`transfer to ${hex} please`), hex);
  assert.equal(hex.length, 42);
  assert.equal(isEthAddress(hex), true);
  assert.equal(explorerUrl(hex), `https://etherscan.io/address/${hex}`);
});

test("normalises mixed-case addresses without truncating", () => {
  const mixed = "0x3AD188B0C41E9F2B07DD5A3F190BB7C26E4A5109";
  assert.equal(formatEthAddress(mixed), "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109");
  assert.equal(formatEthAddress(mixed).length, 42);
});

test("rejects truncated hex as an eth address", () => {
  assert.equal(extractEthAddress("0x3ad188b0c41e9f2b07dd5a3f"), "");
  assert.equal(isEthAddress("0x3ad188b0c41e9f2b07dd5a3f"), false);
});
