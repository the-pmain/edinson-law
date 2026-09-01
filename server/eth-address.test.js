import assert from "node:assert/strict";
import test from "node:test";
import {
  explorerUrl,
  extractEthAddress,
  formatEthAddress,
  isEthAddress,
} from "../src/js/eth-address.js";

const CHECKSUMMED = "0x5Ca474847c7b6d63624ae76081f5165BE899AbCc";

test("extracts a complete 0x + 40-hex address", () => {
  const hex = "0x3ad188b0c41e9f2b07dd5a3f190bb7c26e4a5109";
  assert.equal(extractEthAddress(hex), hex);
  assert.equal(extractEthAddress(`transfer to ${hex} please`), hex);
  assert.equal(hex.length, 42);
  assert.equal(isEthAddress(hex), true);
  assert.equal(explorerUrl(hex), `https://etherscan.io/address/${hex}`);
});

test("preserves mixed-case and checksummed addresses", () => {
  assert.equal(extractEthAddress(CHECKSUMMED), CHECKSUMMED);
  assert.equal(formatEthAddress(CHECKSUMMED), CHECKSUMMED);
  assert.equal(formatEthAddress(CHECKSUMMED).length, 42);
  assert.equal(
    formatEthAddress(`custody wallet ${CHECKSUMMED} on file`),
    `custody wallet ${CHECKSUMMED} on file`,
  );
});

test("rejects truncated hex as an eth address", () => {
  assert.equal(extractEthAddress("0x3ad188b0c41e9f2b07dd5a3f"), "");
  assert.equal(isEthAddress("0x3ad188b0c41e9f2b07dd5a3f"), false);
});
