/**
 * Edison Law content. Turn development on or off in config.js.
 */
import { config } from "./config.js";
import { people } from "./src/content/people.js";

export const site = {
  mode: config.develop ? "development" : "production",
  canonicalOrigin: "https://edisonlaw.co.uk",
  name: "Edison Law",
  descriptor: "Law Firm · London",
  masterLine: "Following digital evidence. Building legal cases.",
  shortLine:
    "A London SRA-regulated practice for financial crime investigation, private prosecution and asset recovery.",
  lang: "en-GB",
  locale: "en_GB",
  themeColor: "#0A2028",
  backgroundColor: "#F1F6F4",
  sraNumber: "510498",
  sraUrl: "https://www.sra.org.uk/consumers/register/organisation/?sraNumber=510498",
  sraSince: "1 November 2015",
  email: "",
  phone: "",
  facts: {
    entityType: "SRA recognised sole practice",
    solicitorOnRegister: "Abigail Charlotte Wills",
    companyNumber:
      "[[NEEDS_CLIENT_INPUT: Companies House number, or confirm this is not a limited company]]",
    vatNumber: "[[NEEDS_CLIENT_INPUT: VAT number, or confirm not VAT-registered]]",
    icoNumber: "[[NEEDS_CLIENT_INPUT: ICO registration number]]",
    piInsurer: "[[NEEDS_CLIENT_INPUT: professional indemnity insurer name]]",
    piTerritory: "[[NEEDS_CLIENT_INPUT: PI territorial cover, e.g. England and Wales]]",
    clientMoney:
      "[[NEEDS_CLIENT_INPUT: whether client money is held, and with which bank]]",
    hours: "[[NEEDS_CLIENT_INPUT: office hours]]",
    publishedPhone: "[[NEEDS_CLIENT_INPUT: published landline, or confirm unpublished]]",
    publishedEmail: "[[NEEDS_CLIENT_INPUT: published email address]]",
    responseTime: "[[NEEDS_CLIENT_INPUT: enquiry response time]]",
    namedContact: "[[NEEDS_CLIENT_INPUT: named first point of contact]]",
    outOfHours: "[[NEEDS_CLIENT_INPUT: out-of-hours position]]",
    feeRates: "[[NEEDS_CLIENT_INPUT: hourly rates or fee bands, plus VAT treatment]]",
    firstAdviceTimescale:
      "[[NEEDS_CLIENT_INPUT: typical timescale for first written scope after instruction]]",
    complaintsHandler: "[[NEEDS_CLIENT_INPUT: named complaints handler]]",
  },
  review: {
    by: "[[NEEDS_CLIENT_INPUT: reviewing solicitor name]]",
    title: "[[NEEDS_CLIENT_INPUT: reviewer job title]]",
    date: "[[NEEDS_CLIENT_INPUT: last review date]]",
    next: "[[NEEDS_CLIENT_INPUT: next review date]]",
  },
  address: {
    line1: "12 Augustus Road",
    line2: "Wimbledon",
    city: "London",
    postcode: "SW19 6LN",
    country: "England",
  },
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
    { label: "Investigations", href: "/investigations/" },
    { label: "Insights", href: "/insights/" },
    { label: "People", href: "/people/" },
    { label: "Join us", href: "/join-us/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  footerLinks: [
    { label: "Legal & regulatory", href: "/legal-regulatory/" },
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
      summary:
        "When public authorities decline to investigate or prosecute, we offer an alternative route to justice — from investigation through to trial.",
    },
    {
      id: "asset-tracing",
      index: "02",
      title: "Asset tracing & recovery",
      href: "/expertise/asset-tracing-recovery/",
      summary:
        "Locate misappropriated value — offshore structures, wallets, nominees — and say early whether pursuing it is worth the cost.",
    },
    {
      id: "crypto-fraud",
      index: "03",
      title: "Crypto fraud & digital assets",
      href: "/expertise/crypto-fraud-digital-assets/",
      summary:
        "Map wallets, exchanges and cash-outs, and state what on-chain data can and cannot prove.",
    },
    {
      id: "regulatory",
      index: "04",
      title: "Regulatory defence & investigations",
      href: "/expertise/regulatory-defence-investigations/",
      summary:
        "Representation for individuals and corporates under investigation by the SFO, FCA, HMRC and other regulatory bodies.",
    },
    {
      id: "cross-border",
      index: "05",
      title: "Cross-border fraud & corruption",
      href: "/expertise/cross-border-fraud-corruption/",
      summary:
        "Evidence, freezing and enforcement where a UK-facing loss has its origins — or its proceeds — overseas, with local counsel where the money sits.",
    },
    {
      id: "corporate-intelligence",
      index: "06",
      title: "Corporate intelligence & pre-litigation",
      href: "/expertise/corporate-intelligence/",
      summary:
        "Confidential due diligence, background investigations and integrity monitoring before high-value transactions and appointments.",
    },
  ],

  investigations: [
    {
      id: "internal",
      copyKey: "internalInvestigations",
      title: "Internal investigations",
      href: "/investigations/internal-investigations/",
      summary:
        "Board-level, employee and whistleblower enquiries run so the file still holds if you later prosecute, report or litigate.",
      related: ["regulatory"],
    },
    {
      id: "financial-crime",
      copyKey: "financialCrimeInvestigations",
      title: "Financial crime investigations",
      href: "/investigations/financial-crime/",
      summary:
        "Who was involved, how the scheme ran, and what the documents actually prove — before anyone is asked to commit to a legal route.",
      related: ["private-prosecutions"],
    },
    {
      id: "digital",
      copyKey: "digitalInvestigations",
      title: "Digital and payments investigations",
      href: "/investigations/digital-crypto/",
      summary:
        "Payment diversion, authorised push payment fraud, wallets and devices: hold the trail, then map it in a form a court will accept.",
      related: ["crypto-fraud", "private-prosecutions"],
    },
    {
      id: "cross-border",
      copyKey: "crossBorderInvestigations",
      title: "Cross-border investigations",
      href: "/investigations/cross-border/",
      summary:
        "Foreign registries, overseas subsidiaries, and people who have moved or gone to ground. The facts do not stop at the UK border.",
      related: ["cross-border"],
    },
    {
      id: "asset-tracing",
      copyKey: "assetTracingInvestigations",
      title: "Asset tracing investigations",
      href: "/investigations/asset-tracing/",
      summary:
        "Where the money went, whether any of it is still there, and whether pursuing it is economically worthwhile.",
      related: ["asset-tracing", "crypto-fraud"],
    },
  ],

  people,

  insights: [
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
