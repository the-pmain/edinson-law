/**
 * Edison Law content. Turn development on or off in config.js.
 */
import { config } from "./config.js";
import { isPending, sraRegisterUrl, trust } from "./src/config/trust.js";
import { people } from "./src/content/people.js";

export const site = {
  mode: config.develop ? "development" : "production",
  canonicalOrigin: "https://edisonlaw.co.uk",
  name: "Edison Law",
  descriptor: "Law Firm · London",
  masterLine: "Financial crime disputes demand clear evidence and sound judgment.",
  shortLine:
    "A London SRA-regulated sole practice for financial crime, private prosecution and asset recovery.",
  lang: "en-GB",
  locale: "en_GB",
  themeColor: "#0A2028",
  backgroundColor: "#F1F6F4",
  sraNumber: trust.firm.sraNumber,
  sraUrl: sraRegisterUrl(),
  email: isPending(trust.contact.email) ? "" : trust.contact.email,
  phone: isPending(trust.contact.phone) ? "" : trust.contact.phone,
  analytics: { enabled: config.analytics },
  search: { enabled: config.search },
  peoplePlaceholders: false,
  tools: {
    cobraAi: {
      name: "Cobra AI",
      vendor: "IYE Global",
      href: "https://iyeglobal.com/cobra-ai/",
    },
  },

  nav: [
    { label: "Expertise", href: "/expertise/" },
    { label: "Investigations", href: "/investigations/" },
    { label: "Insights", href: "/insights/" },
    { label: "People", href: "/people/" },
    { label: "Join us", href: "/join-us/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/", kind: "button" },
  ],

  rail: [
    { label: "Expertise", href: "/expertise/" },
    { label: "Insights", href: "/insights/" },
    { label: "People", href: "/people/" },
    { label: "Join us", href: "/join-us/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  footerLinks: [
    { label: "Regulatory information", href: "/regulatory-information/" },
    { label: "How we work", href: "/how-we-work/" },
    { label: "Terms of business", href: "/terms-of-business/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Complaints", href: "/complaints/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Cookies", href: "/cookies/" },
    { label: "Accessibility", href: "/accessibility/" },
    { label: "Fraud warning", href: "/fraud-warning/" },
  ],

  practices: [
    {
      id: "private-prosecutions",
      index: "01",
      title: "Private prosecutions",
      href: "/expertise/private-prosecutions/",
      problem: "A criminal complaint has been declined, or is going nowhere.",
      summary: "Assess whether a private prosecution is the right legal route.",
    },
    {
      id: "asset-tracing",
      index: "02",
      title: "Asset tracing & recovery",
      href: "/expertise/asset-tracing-recovery/",
      problem: "Funds or assets have been moved and may still be reachable.",
      summary: "Find what remains, then choose a proportionate civil, criminal or insolvency remedy.",
    },
    {
      id: "crypto-fraud",
      index: "03",
      title: "Crypto fraud & digital assets",
      href: "/expertise/crypto-fraud-digital-assets/",
      problem: "Value has moved through wallets, exchanges or devices.",
      summary: "Turn the trail into exhibits, with the limits of the records stated.",
    },
    {
      id: "regulatory",
      index: "04",
      title: "Regulatory defence & investigations",
      href: "/expertise/regulatory-defence-investigations/",
      problem: "A notice, interview or internal investigation has started.",
      summary: "Control the first response and the record that follows.",
    },
    {
      id: "cross-border",
      index: "05",
      title: "Cross-border fraud & corruption",
      href: "/expertise/cross-border-fraud-corruption/",
      problem: "The loss, the people or the assets sit in more than one country.",
      summary: "Hold the English file and instruct local counsel where foreign procedure is required.",
    },
    {
      id: "corporate-intelligence",
      index: "06",
      title: "Corporate intelligence & pre-litigation",
      href: "/expertise/corporate-intelligence/",
      problem: "You need to know who you are dealing with before you commit.",
      summary: "Lawful, confidential enquiries before litigation, investment or appointment.",
    },
  ],

  investigations: [
    {
      id: "internal",
      copyKey: "internalInvestigations",
      title: "Internal investigations",
      href: "/investigations/internal-investigations/",
      summary:
        "Help boards make defensible employment, governance and reporting decisions.",
      related: ["regulatory"],
    },
    {
      id: "financial-crime",
      copyKey: "financialCrimeInvestigations",
      title: "Financial crime investigations",
      href: "/investigations/financial-crime/",
      summary:
        "Reconstruct conduct, participants and loss from documentary and witness evidence.",
      related: ["private-prosecutions"],
    },
    {
      id: "digital",
      copyKey: "digitalInvestigations",
      title: "Digital and payments investigations",
      href: "/investigations/digital-crypto/",
      summary:
        "Preserve devices and accounts, then produce traceable transaction and communications records.",
      related: ["crypto-fraud", "private-prosecutions"],
    },
    {
      id: "cross-border",
      copyKey: "crossBorderInvestigations",
      title: "Cross-border investigations",
      href: "/investigations/cross-border/",
      summary:
        "Obtain and coordinate lawful enquiries across registries, courts and local professionals.",
      related: ["cross-border"],
    },
    {
      id: "asset-tracing",
      copyKey: "assetTracingInvestigations",
      title: "Asset tracing investigations",
      href: "/investigations/asset-tracing/",
      summary:
        "Identify ownership, control and realistic enforcement targets.",
      related: ["asset-tracing", "crypto-fraud"],
    },
  ],

  people,

  insights: [
    {
      slug: "fake-crypto-recovery-services",
      type: "Investigation note",
      date: "2026-08-26",
      dateLabel: "26.08.2026",
      title: "Fake recovery services, impersonation and what a genuine firm will not ask for",
      description:
        "Unregulated ‘recovery agents’ often contact victims on messaging apps and ask for seed phrases, remote access or a further payment. A regulated practice does none of those things.",
      related: ["crypto-fraud", "asset-tracing"],
    },
    {
      slug: "legal-routes-after-crypto-movement",
      type: "Legal explainer",
      date: "2026-08-25",
      dateLabel: "25.08.2026",
      title: "What a solicitor can assess after cryptocurrency has already moved",
      description:
        "On-chain transfers are usually irreversible. The useful work is to establish what the records show, whether any value remains reachable, and which English legal route — if any — is proportionate.",
      related: ["crypto-fraud", "asset-tracing", "cross-border"],
    },
    {
      slug: "first-records-after-digital-asset-loss",
      type: "Investigation note",
      date: "2026-08-22",
      dateLabel: "22.08.2026",
      title: "The first records to keep after a digital-asset loss",
      description:
        "Wallet addresses, transaction identifiers and contemporaneous messages matter more than a later narrative. What not to send is as important as what to preserve.",
      related: ["crypto-fraud", "private-prosecutions"],
    },
    {
      slug: "tracing-assets-across-wallets",
      type: "Investigation note",
      date: "2026-08-18",
      dateLabel: "18.08.2026",
      title: "Tracing assets across multiple wallets: an evidence-first approach",
      description:
        "A practical overview of transaction mapping, evidence provenance and the legal decisions that follow.",
      related: ["crypto-fraud", "asset-tracing"],
    },
    {
      slug: "hmrc-enquiry-evidence",
      type: "Legal explainer",
      date: "2026-07-09",
      dateLabel: "09.07.2026",
      title: "What an HMRC enquiry actually needs from the file",
      description:
        "How to separate the documents that decide a tax dispute from the volume that merely surrounds it.",
      related: ["regulatory"],
    },
    {
      slug: "preserving-digital-evidence",
      type: "Investigation note",
      date: "2026-06-12",
      dateLabel: "12.06.2026",
      title: "Preserving digital evidence before the legal route is chosen",
      description:
        "What to hold, what not to alter, and why early method matters more than early accusation.",
      related: ["private-prosecutions", "crypto-fraud"],
    },
  ],
};
