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
      slug: "ingrid-halliwell",
      name: "Ingrid Halliwell",
      shortName: "Ingrid Halliwell",
      initials: "IH",
      role: "Partner — Fraud, Financial Crime & Private Prosecutions",
      firm: "Edison Law",
      photo: "/images/people/ingrid-halliwell.png",
      photoWidth: 472,
      photoHeight: 472,
      summary:
        "Acts for companies, organisations and individuals who have been the victims of crime, combining investigative rigour with commercial pragmatism.",
      bio: [
        "Ingrid is a partner in our fraud and financial crime team, part of a unique firm of solicitors and barristers with an unrivalled track record in conducting major fraud prosecutions and regulatory work.",
        "She acts for companies, organisations and individuals who have been the victims of crime, providing a service that combines investigative rigour with commercial pragmatism. Ingrid has significant experience in the private prosecution of fraud, corporate dishonesty and financial crime, and regularly advises boards, shareholders and trustees who have been failed by the conventional enforcement route.",
        "Her practice has a strong asset recovery dimension. Ingrid advises clients on the most effective means of tracing, freezing and retrieving assets linked to the offending, working alongside forensic accountants, insolvency practitioners and offshore counsel to secure restraint and confiscation orders, civil freezing injunctions and proprietary relief — often in parallel with the criminal process.",
        "Ingrid is known for taking early, decisive control of complex investigations: preserving evidence, mapping the flow of funds and building a case file capable of withstanding scrutiny from the outset. Clients value her calm judgment in high-pressure situations and her ability to explain difficult strategic choices in plain terms.",
      ],
      areas: [
        "Private prosecutions of fraud, bribery and corporate dishonesty",
        "Corporate internal investigations and self-reporting",
        "Civil and criminal asset tracing and recovery",
        "Proceeds of crime, restraint and confiscation proceedings",
        "Regulatory investigations and enforcement action",
        "Advising victims of investment, procurement and insider fraud",
      ],
    },
    {
      slug: "julian-ashcroft-verne",
      name: "Julian Ashcroft-Verne",
      shortName: "Julian Ashcroft-Verne",
      initials: "JA",
      role: "Head of Financial Crime & Corporate Investigations",
      firm: "Edison Law",
      photo: "/images/people/julian-ashcroft-verne.png",
      photoWidth: 472,
      photoHeight: 472,
      summary:
        "Leads the financial crime practice. Acts for companies, organisations and individuals who have been the victims of crime, including where the state cannot or will not act.",
      bio: [
        "Julian leads the firm's financial crime practice. As part of a unique firm of solicitors and barristers with an unrivalled track record in conducting major fraud prosecutions and regulatory work, he brings a rare combination of advocacy experience and forensic investigative discipline to every instruction.",
        "He acts for companies, organisations and individuals who have been the victims of crime — from listed groups defrauded by senior insiders, to family businesses stripped of value by trusted advisers, to individuals caught in sophisticated investment schemes. Where the state cannot or will not act, Julian brings the case himself.",
        "Private prosecutions. Julian has significant experience in the private prosecution of fraud, corporate dishonesty and financial crime. He has taken cases from first suspicion through search and seizure, charge, committal and trial, and is regularly instructed where the conventional reporting route has stalled or produced no result.",
        "Asset recovery. He advises clients on the best means of retrieving assets linked to the offending, coordinating criminal restraint and confiscation with civil freezing relief, proprietary claims and cross-border enforcement. He works routinely with forensic accountants, crypto-tracing specialists and offshore counsel to locate value before it disappears.",
        "Regulatory work. Julian also advises on the regulatory consequences that follow a fraud — reporting obligations, dealings with the FCA, SFO and other enforcement bodies, and the governance repair work that boards need to demonstrate afterwards.",
        "Clients describe him as methodical, unflappable and unusually direct about what a case is genuinely worth pursuing.",
      ],
      experience: [
        "Private prosecution of a former finance director for a multi-million pound procurement fraud",
        "Worldwide freezing order and tracing exercise following the misappropriation of trust assets",
        "Advising an international group on self-reporting after an internal bribery investigation",
        "Recovery of digital assets dissipated through mixers and offshore exchanges",
        "Defending and advising individuals in parallel criminal and regulatory proceedings",
      ],
    },
    {
      slug: "nicholas-braithwaite",
      name: "Nicholas Braithwaite",
      shortName: "Nick Braithwaite",
      initials: "NB",
      role: "Senior Partner — Fraud, Regulatory & Private Prosecutions",
      firm: "Edison Law",
      photo: "/images/people/nicholas-braithwaite.png",
      photoWidth: 472,
      photoHeight: 472,
      summary:
        "Senior partner and a founding member of the financial crime practice. Instructed by companies, organisations and individuals who have been the victims of crime, including where a report to the police or the SFO has gone nowhere.",
      bio: [
        "Nick is the senior partner of the firm and one of the founding members of its financial crime practice. Ours is a unique firm of solicitors and barristers with an unrivalled track record in conducting major fraud prosecutions and regulatory work, and Nick has spent the better part of three decades building exactly that reputation — first as a prosecutor of serious economic crime, and since then on behalf of those on the receiving end of it.",
        "His work is centred on companies, organisations and individuals who have been the victims of crime. Nick's view, formed over many years of watching cases stall in the hands of under-resourced agencies, is that a well-prepared victim is often the only person who will ever move a fraud case forward. He therefore has significant experience in the private prosecution of fraud, corporate dishonesty and financial crime, and he is frequently instructed after a report to the police or the Serious Fraud Office has gone nowhere. He is candid with clients about the cost, the evidential burden and the risks of that route — and equally candid about when it is the only route that will work.",
        "Alongside the criminal case, Nick advises on the best means of retrieving assets linked to the offending. He treats recovery as the real measure of success: a conviction that leaves the client no better off is, in his words, an expensive form of vindication. He therefore builds tracing and preservation strategy into a matter from the first meeting, combining restraint and confiscation under the criminal regime with civil freezing injunctions, proprietary claims, insolvency remedies and enforcement in the jurisdictions where the money has actually come to rest.",
        "Nick also leads the firm's regulatory work, advising boards on internal investigations, self-reporting, dawn raids and dealings with the FCA, SFO, HMRC and professional regulators — as well as the reputational and governance consequences that follow.",
        "He is a natural chair of a difficult room. Clients and colleagues alike describe him as the person who brings the temperature down, sets out the three realistic options, and then says plainly which one he would choose.",
      ],
      quotes: [
        "Utterly unflappable, and the person you want in the room when a fraud has just come to light.",
        "Combines the instincts of a prosecutor with a genuinely commercial head.",
      ],
      closing:
        "Nick sits on the firm's management board, supervises the training of its junior lawyers, and lectures regularly on private prosecutions and asset recovery.",
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
