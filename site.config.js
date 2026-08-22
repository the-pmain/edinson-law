/**
 * Edison Law content. Turn development on or off in config.js.
 */
import { config } from "./config.js";

export const site = {
  mode: config.develop ? "development" : "production",
  canonicalOrigin: "https://edisonlaw.co.uk",
  name: "Edison Law",
  descriptor: "Law Firm · London",
  masterLine: "Following digital evidence. Building legal cases.",
  shortLine: "Editorial forensics for modern legal work.",
  lang: "en-GB",
  locale: "en_GB",
  themeColor: "#0A2028",
  backgroundColor: "#F1F6F4",
  sraNumber: "510498",
  sraUrl: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=510498",
  sraSince: "1 November 2015",
  email: "abi.wills@edisonlaw.co.uk",
  emailSource: "public directory — confirm before launch",
  phone: "",
  address: {
    line1: "12 Augustus Road",
    line2: "Wimbledon",
    city: "London",
    postcode: "SW19 6LN",
    country: "England",
  },
  analytics: { enabled: config.analytics },
  search: { enabled: config.search },

  nav: [
    { label: "Expertise", href: "/expertise/" },
    { label: "Insights", href: "/insights/" },
    { label: "People", href: "/people/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/", kind: "button" },
  ],

  rail: [
    { label: "Expertise", href: "/expertise/" },
    { label: "Investigations", href: "/insights/" },
    { label: "Insights", href: "/insights/" },
    { label: "People", href: "/people/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  footerLinks: [
    { label: "Legal & regulatory", href: "/legal-regulatory/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Complaints", href: "/complaints/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Cookies", href: "/cookies/" },
    { label: "Accessibility", href: "/accessibility/" },
    { label: "Fraud warning", href: "/fraud-warning/" },
  ],

  practices: [
    {
      id: "financial-crime",
      index: "01",
      title: "Financial crime",
      href: "/expertise/financial-crime/",
      summary: "Investigations, defence and advisory work where the facts sit across companies, accounts and people.",
    },
    {
      id: "tax",
      index: "02",
      title: "Tax disputes & resolution",
      href: "/expertise/tax-disputes-resolution/",
      summary: "HMRC enquiries, disclosure and settlement, and litigation support when the numbers and the law diverge.",
    },
    {
      id: "crypto",
      index: "03",
      title: "Crypto investigations",
      href: "/expertise/crypto-investigations/",
      summary: "Transaction analysis and evidence strategy for matters that begin on-chain and must end in a legal position.",
    },
    {
      id: "digital-assets",
      index: "04",
      title: "Digital asset disputes",
      href: "/expertise/digital-asset-disputes/",
      summary: "Ownership, control and recovery strategy for assets that exist as records rather than objects.",
    },
  ],

  people: [
    {
      name: "Abigail Charlotte Wills",
      shortName: "Abigail Wills",
      initials: "AW",
      role: "Solicitor",
      firm: "Edison Law",
      summary:
        "SRA-regulated solicitor at Edison Law, a recognised sole practice in London. Profiles and practising details will be expanded only with facts the firm confirms.",
    },
  ],

  insights: [
    {
      slug: "tracing-assets-across-wallets",
      type: "Investigation note",
      date: "2026-08-18",
      dateLabel: "18.08.2026",
      title: "Tracing assets across multiple wallets: an evidence-first approach",
      description:
        "A practical overview of transaction mapping, evidence provenance and the legal decisions that follow.",
      related: ["crypto", "digital-assets"],
    },
    {
      slug: "hmrc-enquiry-evidence",
      type: "Legal explainer",
      date: "2026-07-09",
      dateLabel: "09.07.2026",
      title: "What an HMRC enquiry actually needs from the file",
      description:
        "How to separate the documents that decide a tax dispute from the volume that merely surrounds it.",
      related: ["tax"],
    },
    {
      slug: "preserving-digital-evidence",
      type: "Investigation note",
      date: "2026-06-12",
      dateLabel: "12.06.2026",
      title: "Preserving digital evidence before the legal route is chosen",
      description:
        "What to hold, what not to alter, and why early method matters more than early accusation.",
      related: ["financial-crime", "crypto"],
    },
  ],
};
