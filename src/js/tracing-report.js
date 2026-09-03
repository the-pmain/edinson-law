/**
 * Seeded cryptoasset tracing model used by the admin Tracing report.
 * Ported from the mock tracing report generator: operator fields in, hop
 * chain and addresses out. Same seed and inputs always rebuild the same report.
 */

const BECH = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const HEX = "0123456789abcdef";
const JURIS = [
  "Lithuania",
  "Seychelles",
  "Singapore",
  "Estonia",
  "British Virgin Islands",
  "Cyprus",
  "Panama",
  "Hong Kong",
];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export const TRACING_REVIEWER = "John Adams, Partner";

function mulberry32(a) {
  return function random() {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function chars(set, n, rnd) {
  let s = "";
  for (let i = 0; i < n; i += 1) s += set[Math.floor(rnd() * set.length)];
  return s;
}

export function money(n) {
  return GBP.format(Math.round(n / 100) * 100);
}

function btc(n) {
  return `${n.toFixed(3)} BTC`;
}

function eth(n) {
  return `${n.toFixed(2)} ETH`;
}

function num(n) {
  return new Intl.NumberFormat("en-GB").format(n);
}

function pct(a, b) {
  return `${(a / b * 100).toFixed(1)}%`;
}

function dLong(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function dShort(d) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
}

function addDays(d, n) {
  const x = new Date(d.getTime());
  x.setDate(x.getDate() + n);
  return x;
}

function shorten(a) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}

function stemName(name) {
  return String(name || "matter").replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function tracingFilename(clientName) {
  const who = stemName(clientName);
  return `Edison-Law-Tracing-Report-${who || "completed"}.pdf`;
}

export function tracingFollowedFromLoss(loss) {
  return Math.round(loss * 0.988 / 100) * 100;
}

export function tracingFrozenFromLoss(loss) {
  return Math.round(loss * 0.985 / 100) * 100;
}

function asNumber(value, fallback) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : fallback;
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function configuredText(fields, key, fallback = "") {
  return hasOwn(fields, key) ? String(fields[key] || "").trim() : fallback;
}

function configuredParagraphs(fields, key, fallback) {
  if (!hasOwn(fields, key)) return fallback;
  return String(fields[key] || "")
    .split(/\n\s*\n+/)
    .map((item) => item.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

function configuredDate(fields, key, fallback) {
  if (!hasOwn(fields, key)) return fallback;
  const value = String(fields[key] || "").trim();
  if (!value) return "";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return dLong(date);
}

function includesSection(fields, key) {
  return String(fields[key] || "include") !== "omit";
}

export function buildTracingReport(fields = {}) {
  const seed = Math.max(1, parseInt(String(fields.seed || ""), 10) || 1);
  const loss = Math.max(1000, asNumber(fields.loss, 100000));
  const peelHops = parseInt(String(fields.hops || ""), 10) || 4;
  const client = String(fields.clientName || "").trim();
  const platform = String(fields.platform || "").trim();
  const analyst = configuredText(fields, "analyst", "Mock");

  let followed = asNumber(fields.followed, loss * 0.988);
  let frozen = asNumber(fields.frozen, followed * 0.997);
  const notes = [];
  if (followed > loss) {
    followed = loss;
    notes.push("Followed capped at the total loss.");
  }
  if (frozen > followed) {
    frozen = followed;
    notes.push("Frozen capped at the amount followed.");
  }
  if (followed < loss * 0.05) {
    followed = loss * 0.05;
    notes.push("Followed raised to 5% of the loss — below that there is no chain to report.");
  }

  const rnd = mulberry32(seed);
  const pick = (list) => list[Math.floor(rnd() * list.length)];
  const range = (min, max) => min + rnd() * (max - min);

  const price = Math.round(range(44000, 58000) / 100) * 100;
  const ethPrice = Math.round(range(2200, 3400) / 10) * 10;
  const usdRate = +(range(0.74, 0.81)).toFixed(3);
  const btcShare = range(0.55, 0.75);

  const btcGBP = loss * btcShare;
  const usdtGBP = loss - btcGBP;
  const btcAmt = +(btcGBP / price).toFixed(3);
  const usdt = Math.round(usdtGBP / usdRate / 1000) * 1000;

  const peelShare = range(0.54, 0.68);
  const peelGBP = btcGBP * peelShare;
  const directGBP = btcGBP - peelGBP;

  const k = followed / loss;
  const w1 = range(0.3, 0.7);
  const w2 = 1 - w1;
  const w3 = range(0.3, 0.7);
  const w4 = 1 - w3;

  const peelOutGBP = peelGBP * (k ** w1);
  const bridgeGBP = peelOutGBP * (k ** w2);
  const directOutGBP = directGBP * (k ** w3);
  const exchBGBP = directOutGBP * (k ** w4);
  const swapGBP = usdtGBP * k;
  const consGBP = bridgeGBP + exchBGBP + swapGBP;

  const gap = consGBP - frozen;
  const dissipated = gap > consGBP * 0.005;

  const peelAmt = +(peelGBP / price).toFixed(3);
  const peelOut = +(peelOutGBP / price).toFixed(3);
  const bridgeOut = +(bridgeGBP / price).toFixed(3);
  const directAmt = +(directGBP / price).toFixed(3);
  const directOut = +(directOutGBP / price).toFixed(3);
  const exchBOut = +(exchBGBP / price).toFixed(3);
  const bridgeETH = +(bridgeGBP / ethPrice).toFixed(2);
  const exchBETH = +(exchBGBP / ethPrice).toFixed(2);
  const swapETH = +(swapGBP / ethPrice).toFixed(2);
  const consETH = +(consGBP / ethPrice).toFixed(2);

  const unfollowed = loss - followed;
  const totalHops = dissipated ? 12 : 11;

  const today = new Date();
  const lossStart = addDays(today, -Math.round(range(150, 230)));
  const lossEnd = addDays(lossStart, Math.round(range(35, 60)));
  const h2 = addDays(lossEnd, 2);
  const h3 = addDays(h2, 1);
  const h4 = addDays(h3, 2);
  const h5 = addDays(h4, 1);
  const h6 = addDays(h2, 1);
  const h7 = addDays(h6, 1);
  const h8 = addDays(h7, 4);
  const h9 = addDays(h5, 1);
  const h10 = addDays(h9, 2);
  const freezeDate = addDays(h10, Math.round(range(3, 14)));
  const asAt = addDays(today, -1);

  const btcBech = () => `bc1q${chars(BECH, 38, rnd)}`;
  const btcP2SH = () => `3${chars(B58, 33, rnd)}`;
  const btcLegacy = () => `1${chars(B58, 33, rnd)}`;
  const ethAddr = () => `0x${chars(HEX, 40, rnd)}`;
  const tronAddr = () => `T${chars(B58, 33, rnd)}`;

  const A = {
    victim: btcBech(),
    victimT: tronAddr(),
    collection: btcBech(),
    peel1: btcP2SH(),
    peelLast: btcBech(),
    direct: btcBech(),
    exchB: btcLegacy(),
    exchBOut: ethAddr(),
    bridgeOut: ethAddr(),
    swapOut: ethAddr(),
    cons: ethAddr(),
    frozenW: ethAddr(),
    onward: ethAddr(),
  };

  const payments = Math.round(range(8, 14));
  const sources = Math.round(range(22, 41));
  const generatedRef = `EL/${today.getFullYear()}/${String(Math.round(range(100, 9899))).padStart(4, "0")}`;
  const jA = pick(JURIS);
  const jB = pick(JURIS.filter((x) => x !== jA));
  const jC = pick(JURIS.filter((x) => x !== jA && x !== jB));

  const defaultFindings = [
    `The client transferred ${btc(btcAmt)} and ${num(usdt)} USDT to wallets controlled by the operators of a fraudulent trading platform between ${dLong(lossStart)} and ${dLong(lossEnd)}. No withdrawal from the platform was ever honoured.`,
    `All ${payments} Bitcoin payments consolidated within 48 hours into a single collection wallet, ${shorten(A.collection)}, which received deposits from at least ${sources} other funding sources over the same period. The Tether payments went to a separate Tron address, ${shorten(A.victimT)}.`,
    `From the collection wallet the Bitcoin split two ways: ${btc(peelAmt)} through a ${peelHops}-stage peel chain and across a cross-chain bridge, and ${btc(directAmt)} in direct hops through a deposit and withdrawal at Exchange B. The Tether was swapped to Ether at a non-custodial service on ${dLong(h8)}.`,
    `All three branches reconverge. On ${dLong(h9)} the bridge output, the Exchange B withdrawal and the swap proceeds arrive at one Ethereum address, ${shorten(A.cons)}, which had no prior balance and no other funding source. ${money(followed)} — ${pct(followed, loss)} of the loss — arrives there.`,
  ];
  if (dissipated) {
    defaultFindings.push(
      `On ${dLong(h10)} the consolidated balance was split: ${money(frozen)} to ${shorten(A.frozenW)}, and ${money(gap)} onward to ${shorten(A.onward)}. Both destinations were followed; the second has been dormant since.`,
      `${money(frozen)} sits at the endpoint wallet, frozen on ${dLong(freezeDate)} and unmoved since. The onward ${money(gap)} remains traced but is not within the freeze.`,
    );
  } else {
    defaultFindings.push(
      `On ${dLong(h10)} the whole consolidated balance moved once more, to ${shorten(A.frozenW)}, where it has remained. That wallet was frozen on ${dLong(freezeDate)} and its balance today is ${money(frozen)}.`,
      `The chain is unbroken. ${money(frozen)} — ${pct(frozen, loss)} of the loss — sits at a single identified endpoint; the remaining ${money(loss - frozen)} is network, bridge and swap fees, itemised hop by hop below.`,
    );
  }
  const findings = configuredParagraphs(fields, "findingsText", defaultFindings);

  const hopRows = [
    {
      hop: "1",
      date: `${dShort(lossStart)} – ${dShort(lossEnd)}`,
      fromTo: `${shorten(A.victim)} → ${shorten(A.collection)}`,
      amount: btc(btcAmt),
      observation: `${payments} deposits consolidated into one collection wallet within 48 hours of each payment.`,
    },
    {
      hop: "2",
      date: dShort(h2),
      fromTo: `${shorten(A.collection)} → ${shorten(A.peel1)}`,
      amount: btc(peelAmt),
      observation: "First peel. Change output retained at a co-spent address in the same cluster.",
    },
    {
      hop: "3",
      date: `${dShort(h3)} – ${dShort(h4)}`,
      fromTo: `${shorten(A.peel1)} → (${peelHops - 1} further addresses)`,
      amount: btc(peelOut),
      observation: "Peel chain: a small output shed at each hop, the bulk carried forward. Every peeled output followed and accounted for.",
    },
    {
      hop: "4",
      date: dShort(h4),
      fromTo: `${shorten(A.peelLast)} → bridge contract`,
      amount: btc(bridgeOut),
      observation: "Deposit to a cross-chain bridge. Bridge fee deducted on entry.",
    },
    {
      hop: "5",
      date: dShort(h5),
      fromTo: `bridge → ${shorten(A.bridgeOut)}`,
      amount: eth(bridgeETH),
      observation: "Ether received on the far side. Matched by amount, timing and one-to-one bridge accounting — an inference, not a single on-chain link.",
    },
    {
      hop: "6",
      date: dShort(h6),
      fromTo: `${shorten(A.collection)} → ${shorten(A.direct)}`,
      amount: btc(directOut),
      observation: "Second branch, moved directly with no attempt at obfuscation.",
    },
    {
      hop: "7",
      date: dShort(h7),
      fromTo: `${shorten(A.direct)} → ${shorten(A.exchB)}`,
      amount: btc(exchBOut),
      observation: "Deposit address attributed to Exchange B. Held four days, then withdrawn in a single transaction.",
    },
    {
      hop: "8",
      date: dShort(h8),
      fromTo: `${shorten(A.exchB)} → ${shorten(A.exchBOut)}`,
      amount: eth(exchBETH),
      observation: "Withdrawn from Exchange B as Ether. Same-value conversion confirmed against the venue's published rate at the timestamp.",
    },
    {
      hop: "9",
      date: dShort(h8),
      fromTo: `${shorten(A.victimT)} → ${shorten(A.swapOut)}`,
      amount: eth(swapETH),
      observation: `Tether leg: ${num(usdt)} USDT swapped to Ether at a non-custodial service. Matched by amount and timing — the second inferred step.`,
    },
    {
      hop: "10",
      date: dShort(h9),
      fromTo: `three inputs → ${shorten(A.cons)}`,
      amount: eth(consETH),
      observation: "All three branches arrive at one address with no prior balance and no other funding source.",
    },
  ];
  if (dissipated) {
    hopRows.push({
      hop: "11",
      date: dShort(h10),
      fromTo: `${shorten(A.cons)} → ${shorten(A.onward)}`,
      amount: money(gap),
      observation: "Onward payment made before the freeze. Followed to a single address, dormant since.",
    });
  }
  hopRows.push({
    hop: dissipated ? "12" : "11",
    date: dShort(h10),
    fromTo: `${shorten(A.cons)} → ${shorten(A.frozenW)}`,
    amount: money(frozen),
    observation: `Endpoint. Balance left untouched. Wallet frozen ${dLong(freezeDate)} and unmoved since.`,
    final: true,
  });

  const defaultAttribution = [
    {
      venue: "Endpoint wallet",
      jurisdiction: jA,
      value: money(frozen),
      confidence: "High",
      basis: `Self-hosted Ethereum address, frozen at the venue holding its counterparty exposure. Balance confirmed against two block explorers on ${dShort(asAt)}.`,
    },
    {
      venue: "Exchange B",
      jurisdiction: jB,
      value: money(exchBGBP),
      confidence: "High",
      basis: "Deposit and withdrawal addresses in a cluster attributed to the venue by two independent analytics providers.",
    },
    {
      venue: "Bridge operator",
      jurisdiction: jC,
      value: money(bridgeGBP),
      confidence: "Medium",
      basis: "Contract address published by the operator; the far-side output matched by amount and timing rather than by a single link.",
    },
    {
      venue: "Swap service",
      jurisdiction: "—",
      value: money(swapGBP),
      confidence: "Medium",
      basis: "Non-custodial swap; entry and exit matched on amount, rate and a 90-second window.",
    },
  ];
  if (dissipated) {
    defaultAttribution.splice(1, 0, {
      venue: "Onward address",
      jurisdiction: "—",
      value: money(gap),
      confidence: "Traced, not frozen",
      basis: "Self-hosted address receiving the pre-freeze payment. Identified and monitored; no venue holds it.",
    });
  }

  const attributionKeys = [
    "endpointVenue", "endpointJurisdiction", "endpointConfidence",
    "exchangeVenue", "exchangeJurisdiction",
    "bridgeVenue", "bridgeJurisdiction",
    "swapVenue", "swapJurisdiction",
  ];
  const hasConfiguredAttribution = attributionKeys.some((key) => hasOwn(fields, key));
  const attribution = hasConfiguredAttribution
    ? [
      {
        venue: configuredText(fields, "endpointVenue"),
        jurisdiction: configuredText(fields, "endpointJurisdiction"),
        value: money(frozen),
        confidence: configuredText(fields, "endpointConfidence"),
        basis: defaultAttribution.find((row) => row.venue === "Endpoint wallet")?.basis || "",
      },
      {
        venue: configuredText(fields, "exchangeVenue"),
        jurisdiction: configuredText(fields, "exchangeJurisdiction"),
        value: money(exchBGBP),
        confidence: "High",
        basis: defaultAttribution.find((row) => row.venue === "Exchange B")?.basis || "",
      },
      {
        venue: configuredText(fields, "bridgeVenue"),
        jurisdiction: configuredText(fields, "bridgeJurisdiction"),
        value: money(bridgeGBP),
        confidence: "Medium",
        basis: defaultAttribution.find((row) => row.venue === "Bridge operator")?.basis || "",
      },
      {
        venue: configuredText(fields, "swapVenue"),
        jurisdiction: configuredText(fields, "swapJurisdiction"),
        value: money(swapGBP),
        confidence: "Medium",
        basis: defaultAttribution.find((row) => row.venue === "Swap service")?.basis || "",
      },
    ].filter((row) => row.venue)
    : defaultAttribution;

  const defaultNextSteps = [
    `Preserve the endpoint. ${money(frozen)} sits at one address, already frozen. A proprietary injunction against persons unknown, plus notice to the venue maintaining the freeze, should be issued before the freeze is reviewed.`,
    "Disclosure where the chain touched a service. Bankers Trust and Norwich Pharmacal relief against Exchange B, the bridge operator and the swap service for account identity, KYC records and instructions given.",
    "Serve the unknown. The defendants are persons unknown. Consider service by alternative means, including service by transfer to the endpoint wallet, on which the court has been willing to make orders.",
    "Report and preserve the criminal route. A report to Action Fraud and consideration of the cryptoasset provisions of Part 5 of the Proceeds of Crime Act 2002 as a parallel route to the civil claim.",
    "Watch the address. Continuous monitoring on the endpoint wallet, so any movement is known within the hour rather than at the next review.",
  ];
  if (dissipated) {
    defaultNextSteps.splice(1, 0, `Extend to the onward payment. The ${money(gap)} paid away before the freeze is traced but unprotected. It should be included in the injunction and the address served in the same application.`);
  }
  const nextSteps = configuredParagraphs(fields, "recommendations", defaultNextSteps);

  const appendix = [
    { role: "Victim wallet", network: "Bitcoin", address: A.victim },
    { role: "Victim wallet", network: "Tron", address: A.victimT },
    { role: "Collection wallet", network: "Bitcoin", address: A.collection },
    { role: "Peel chain, first hop", network: "Bitcoin", address: A.peel1 },
    { role: "Peel chain, final hop", network: "Bitcoin", address: A.peelLast },
    { role: "Direct branch", network: "Bitcoin", address: A.direct },
    { role: "Exchange B deposit", network: "Bitcoin", address: A.exchB },
    { role: "Exchange B withdrawal", network: "Ethereum", address: A.exchBOut },
    { role: "Bridge output", network: "Ethereum", address: A.bridgeOut },
    { role: "Swap output", network: "Ethereum", address: A.swapOut },
    { role: "Consolidation wallet", network: "Ethereum", address: A.cons },
  ];
  if (dissipated) appendix.push({ role: "Onward address — traced", network: "Ethereum", address: A.onward });
  appendix.push({ role: "Endpoint wallet — frozen", network: "Ethereum", address: A.frozenW });

  const hopDays = Math.round((h10 - lossEnd) / 864e5);
  const method = configuredParagraphs(fields, "methodSources", [
    "Public ledger data for Bitcoin, Ethereum and Tron, read from full-node block explorers and verified against a second explorer for every transaction relied on.",
    "Commercial blockchain analytics — attribution clusters and service labels — from two providers, each used under the firm's own subscription.",
    "Clustering by the common-input-ownership heuristic, with change outputs identified by address type and round-number reasoning. Peel chains followed by value continuity rather than by cluster alone.",
    "Client materials: bank statements, exchange withdrawal confirmations, platform screenshots and correspondence.",
    `Sterling values converted at the spot rate on the date of each transfer — £${num(price)} per BTC, £${num(ethPrice)} per ETH and £${usdRate.toFixed(3)} per USDT on the dates relied on — and rounded to the nearest £100.`,
  ]);
  const limitations = configuredParagraphs(fields, "limitations", [
    "Attribution of an address to a named venue rests on third-party analytics. Those attributions are reliable in general but are not evidence of the identity of any account holder, and are stated with the confidence level shown.",
    "The common-input-ownership heuristic can be defeated deliberately, by collaborative spending. Nothing in this trace suggests it was, but the possibility is not excluded.",
    "The cross-chain steps are matched by amount and timing rather than by a single on-chain link. They are the weakest inferences in the chain and are identified as such in the hop table.",
    `The difference between the loss and the amount followed, ${money(unfollowed)}, is network, bridge and swap fees shed at the hops shown. No part of it left the traced chain to an unidentified destination.`,
    `The balance is as at ${dLong(asAt)}. The freeze is a matter for the venue holding it and can be lifted; nothing here should be read as an assurance that the sum remains available.`,
    "This report is prepared for the client's use in these proceedings. It is not a CPR Part 35 expert report and carries no expert's declaration.",
  ]);
  const statement = configuredText(
    fields,
    "statement",
    "The findings in this report are based on the ledger data and materials described above and are true to the best of my knowledge and belief. Where an inference has been drawn rather than a transaction directly observed, that is stated in the relevant paragraph.",
  );
  const ref = configuredText(fields, "matterRef", generatedRef);
  const reportDate = configuredDate(fields, "reportDate", dLong(today));
  const asAtDate = configuredDate(fields, "asAtDate", dLong(asAt));
  const reviewer = configuredText(fields, "reviewer", TRACING_REVIEWER);
  const defaultSubtitle = dissipated
    ? "Funds followed from the victim's wallets to a frozen endpoint, with the onward payment identified"
    : "Funds followed from the victim's wallets to a single frozen endpoint";
  const subtitle = configuredText(fields, "reportPurpose", defaultSubtitle);
  const sections = {
    summary: includesSection(fields, "showSummary"),
    diagram: includesSection(fields, "showDiagram"),
    hops: includesSection(fields, "showHopTable") && hopRows.length > 0,
    attribution: includesSection(fields, "showAttribution") && attribution.length > 0,
    methodology: includesSection(fields, "showMethodology") && (method.length > 0 || limitations.length > 0),
    recommendations: includesSection(fields, "showRecommendations") && nextSteps.length > 0,
    appendix: includesSection(fields, "showAppendix") && appendix.length > 0,
    statement: includesSection(fields, "showStatement") && Boolean(statement),
  };

  return {
    client,
    platform,
    analyst,
    reviewer,
    ref,
    date: reportDate,
    asAt: asAtDate,
    asAtShort: dShort(asAt),
    subject: platform ? `Investment fraud — "${platform}"` : "",
    subtitle,
    sections,
    dissipated,
    warn: notes.join(" "),
    followed,
    frozen,
    loss,
    stats: {
      loss: money(loss),
      lossSub: `${btc(btcAmt)} and ${num(usdt)} USDT across ${payments} payments`,
      followed: money(followed),
      followedSub: `${pct(followed, loss)} of the loss${unfollowed > loss * 0.002
        ? `; ${money(unfollowed)} shed as fees and dust en route`
        : "; every output followed"}`,
      frozen: money(frozen),
      frozenSub: `${pct(frozen, loss)} of the loss, frozen ${dShort(freezeDate)}${dissipated ? `; ${money(gap)} moved on first` : ""}`,
      hops: String(totalHops),
      hopsSub: `Across 3 networks, over ${hopDays} days`,
    },
    findings,
    diagram: {
      victimBtc: shorten(A.victim),
      victimUsdt: shorten(A.victimT),
      collection: shorten(A.collection),
      peel: `${peelHops} hops · ${Math.round(range(3, 6))} days`,
      direct: `2 hops · ${dShort(h6)}`,
      swap: dShort(h8),
      bridge: dShort(h5),
      cons: shorten(A.cons),
      frozen: shorten(A.frozenW),
      frozenSub: `${money(frozen)} · ${dShort(freezeDate)}`,
      e1: btcAmt.toFixed(2),
      e2: peelAmt.toFixed(2),
      e3: directAmt.toFixed(2),
      e4: peelOut.toFixed(2),
      e5: directOut.toFixed(2),
      e6: `${num(usdt)} USDT`,
      e7: `${bridgeETH.toFixed(1)} ETH`,
      e8: `${exchBETH.toFixed(1)} ETH`,
      e9: consETH.toFixed(1),
    },
    hops: hopRows,
    attribution,
    endpoint: {
      amount: money(frozen),
      address: shorten(A.frozenW),
      body: dissipated
        ? `${money(followed)} of the ${money(loss)} loss was followed across three networks and ${totalHops} hops. ${money(frozen)} is frozen at the endpoint wallet; the ${money(gap)} paid onward beforehand is identified and monitored but sits outside the freeze.`
        : `${money(followed)} of the ${money(loss)} loss was followed across three networks and ${totalHops} hops. The whole of it reached this one wallet, frozen on ${dLong(freezeDate)} and unmoved since.`,
    },
    method,
    limitations,
    nextSteps,
    appendix,
    signature: analyst ? `${analyst} · Forensic Analyst · Edison Law · ${reportDate || dLong(today)}` : "",
    statement,
    addresses: A,
  };
}
