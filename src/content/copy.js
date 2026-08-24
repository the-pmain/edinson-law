import { site } from "../../site.config.js";

const address = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.postcode}`;

export const home = {
  path: "/",
  title: "Edison Law | Private prosecutions, asset recovery and financial crime solicitors in London",
  description:
    "Specialist solicitors and barristers for financial crime investigation, private prosecution and asset recovery. A fast, confidential service for victims of fraud, corruption and financial wrongdoing.",
  schema: "home",
  sections: {
    hero: {
      descriptor: "Private prosecutions · Asset recovery · Financial crime",
      heading: "When authorities decline to act, we deliver justice.",
      lead: "Edison Law is a specialist firm of solicitors and barristers with an unrivalled track record in financial crime investigation, private prosecution and asset recovery. We provide a fast, effective and bespoke service to victims of fraud, corruption and financial wrongdoing worldwide.",
      cta: { label: "Instruct Us Confidentially", href: "/contact/" },
      ctaSecondary: { label: "Explore Our Services", href: "/expertise/" },
    },
    who: {
      label: "Who we are",
      heading: "Solicitors and barristers under one roof.",
      lead: "Edison Law is the only firm combining the strategic oversight of specialist financial crime solicitors with the advocacy excellence of experienced criminal barristers under one roof. Founded by former senior prosecutors and regulatory specialists, we offer seamless case management from initial investigation through to the highest courts.",
      text: "Our founding partners have a combined 70 years' experience in criminal justice, regulatory enforcement and complex civil fraud litigation. We are recognised internationally as being at the forefront of asset tracing, crypto fraud recovery and cross-border judgment enforcement.",
      actForLabel: "We act for",
      actFor: [
        "High-net-worth individuals and family offices",
        "Corporations and financial institutions",
        "Charities and non-profit organisations",
        "Government agencies and state entities",
        "Trusts and trustees",
      ],
    },
    why: {
      label: "Why Edison Law",
      heading: "How the work is run.",
      items: [
        {
          title: "Solicitor-barrister integration",
          text: "Unlike traditional firms, we maintain in-house chambers. Your case is prepared and presented by the same team from day one — no handovers, no communication gaps, no duplicated costs.",
        },
        {
          title: "In-house forensics",
          text: "Our dedicated digital forensics laboratory provides rapid evidence preservation, blockchain analysis and expert witness reporting. We maintain chain of custody and court-ready documentation throughout.",
        },
        {
          title: "Results-based fee structures",
          text: "We offer conditional fee arrangements, damages-based agreements and hybrid structures where appropriate, aligning our interests with successful recovery.",
        },
        {
          title: "Absolute discretion",
          text: "We understand the reputational sensitivities of financial crime. All enquiries are handled under strict confidentiality protocols, with secure encrypted communications and discrete engagement structures available.",
        },
        {
          title: "Global reach, London base",
          text: "From our London headquarters, we coordinate asset recovery across six continents, with established relationships with enforcement agencies, forensic specialists and local counsel worldwide.",
        },
      ],
    },
    cases: {
      label: "Representative cases",
      heading: "Work of this kind.",
      items: [
        {
          title: "Cryptocurrency exchange collapse",
          recovery: "Recovery: £23 million",
          jurisdictions: "UK, Singapore, Seychelles, BVI",
          text: "Acted for 147 investors in a collapsed cryptocurrency exchange. Our blockchain forensics team traced misappropriated Bitcoin and Ethereum through 40+ intermediate wallets to cold storage held by exchange operators. Secured worldwide freezing orders within 72 hours of instruction, ultimately negotiating a settlement returning 94% of client assets.",
        },
        {
          title: "Family office embezzlement",
          recovery: "Recovery: £18 million",
          jurisdictions: "UK, Jersey, Dubai, Switzerland",
          text: "Led a private prosecution and parallel civil proceedings against a long-serving family office CFO who embezzled over eight years. Reconstructed complex financial trails across 15 entities, identified concealed property acquisitions, and secured criminal conviction with 8-year custodial sentence. Full recovery achieved through confiscation and civil settlement.",
        },
        {
          title: "SFO defence with parallel recovery",
          recovery: "Recovery: £12 million",
          jurisdictions: "UK, USA",
          text: "Represented former pharmaceutical director in a three-year SFO market manipulation investigation. Successfully argued for no prosecution while simultaneously pursuing civil claims against actual perpetrators, preserving client reputation and recovering misappropriated funds plus costs.",
        },
        {
          title: "State asset recovery",
          recovery: "Recovery: $340 million",
          jurisdictions: "UK, Switzerland, Liechtenstein, multiple offshore centres",
          text: "Acted for a sovereign state in recovering proceeds of corruption concealed through nested trusts, shell companies and art purchases. Pierced beneficial ownership structures across seven jurisdictions, secured recognition of foreign forfeiture orders, and achieved one of the largest civil recovery settlements in UK history.",
        },
      ],
    },
    recognition: {
      label: "Recognition",
      heading: "How the work is described.",
      items: [
        "Chambers UK — Band 1: Financial Crime & Asset Recovery",
        "Legal 500 — Tier 1: Fraud: Civil; Tier 1: Fraud: Criminal",
        "Who's Who Legal — Asset Recovery: Thought Leader",
        "Global Investigations Review — Top 100 Firms: Investigations",
        "Citywealth — Powerwomen: Top 10 Law Firm",
      ],
      quote:
        "Edison Law has revolutionised the approach to private prosecutions in this jurisdiction. Their combination of strategic vision and advocacy excellence is unmatched.",
      quoteSource: "Chambers UK",
    },
    profile: {
      label: "Our people",
      heading: "Who you deal with.",
      text: `Named lawyers at Edison Law, an SRA recognised sole practice since ${site.sraSince}. Open a profile for biography and areas of work.`,
    },
    insight: {
      label: "Insights",
      heading: "Investigation notes, not marketing copy.",
    },
    practiceBar: {
      cta: { label: "Explore Our Services", href: "/expertise/" },
    },
    cta: {
      heading: "Instruct us confidentially.",
      text: "Write with the facts you already have. All enquiries are handled under strict confidentiality protocols.",
      cta: { label: "Instruct Us Confidentially", href: "/contact/" },
    },
  },
};

export const pages = {
  expertise: {
    path: "/expertise/",
    title: "Expertise | Edison Law",
    description: "Private prosecutions, asset tracing, crypto fraud, regulatory defence, cross-border recovery and corporate intelligence.",
    heading: "Our services.",
    lead: "Six connected practices. Each page states the problem, the scope and the method.",
  },
  privateProsecutions: {
    path: "/expertise/private-prosecutions/",
    title: "Private Prosecutions Solicitors in London | Edison Law",
    description:
      "Bespoke criminal prosecutions from investigation through to trial when public authorities decline to act.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "When authorities decline to act.",
    lead: "When public authorities decline to investigate or prosecute, we offer an alternative route to justice. As one of the few firms with in-house prosecutorial authority, we conduct bespoke criminal prosecutions from investigation through to trial, securing convictions and confiscation orders that state agencies cannot or will not pursue.",
    when: [
      "A report to the police, Action Fraud or the SFO has produced no investigation.",
      "The loss is serious enough that a private prosecution is a realistic route.",
      "You need charging decisions, trial advocacy, confiscation or victim compensation handled as one matter.",
    ],
    scope: [
      "Charging decisions",
      "Trial advocacy",
      "Confiscation proceedings",
      "Victim compensation",
    ],
    approach:
      "A private prosecution is judged as harshly as any state prosecution. We assemble the evidential file to a criminal standard from day one, manage disclosure and unused material, and instruct counsel on the assumption that every step will be tested by the defence.",
    faqs: [
      {
        q: "Is a private prosecution always the right route?",
        a: "No. We advise on merit, cost and the likelihood of recovery before a client commits. If the evidence will not hold, we say so.",
      },
      {
        q: "Can this run in parallel with civil recovery?",
        a: "Yes. Recovery strategy is settled at the outset, coordinating criminal restraint and confiscation with civil freezing and proprietary relief where that reaches the money faster.",
      },
    ],
  },
  assetTracing: {
    path: "/expertise/asset-tracing-recovery/",
    title: "Asset Tracing & Recovery Solicitors in London | Edison Law",
    description:
      "Tracing and recovering misappropriated assets through offshore structures, cryptocurrency wallets, shell companies and alter-ego entities.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Where the money has gone.",
    lead: "We trace and recover misappropriated assets wherever perpetrators conceal them — through offshore structures, cryptocurrency wallets, shell companies or alter-ego entities. Our team works with forensic accountants, digital investigators and international enforcement networks to locate and secure assets before they dissipate further.",
    when: [
      "Funds have left the client's control and the destination is unclear.",
      "A defendant appears to have nothing, and that needs to be tested.",
      "Urgent freezing, proprietary or disclosure relief is required.",
    ],
    scope: [
      "Worldwide freezing orders",
      "Proprietary injunctions",
      "Receivership appointments",
      "Trust piercing",
    ],
    approach:
      "The first question is not how a fraud was built but where the money is now. We identify which assets exist, where they sit, who holds them and which jurisdiction's remedies apply — and whether pursuing them is economically worthwhile.",
    faqs: [
      {
        q: "Can you guarantee recovery?",
        a: "No. We will say early when there is value to pursue, and equally early when the trail ends.",
      },
      {
        q: "Do you work with forensic accountants and investigators?",
        a: "Yes. Tracing, freezing and enforcement are run as a single strategy with the firm's forensic and investigative teams, and with local counsel overseas where required.",
      },
    ],
  },
  cryptoFraud: {
    path: "/expertise/crypto-fraud-digital-assets/",
    title: "Crypto Fraud & Digital Asset Solicitors in London | Edison Law",
    description:
      "Blockchain tracing, exchange liaison and recovery strategy for stolen cryptocurrency, wallet theft and digital-asset disputes.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Trace the chain. Freeze the value.",
    lead: "Our dedicated crypto fraud unit combines legal expertise with blockchain analytics to trace stolen digital assets through complex transaction chains. We have recovered millions in cryptocurrency from scams, exchange collapses and wallet thefts, working with exchanges globally to freeze and return assets.",
    when: [
      "Value has moved across wallets, mixers, bridges or exchanges.",
      "An exchange or service provider is holding frozen balances.",
      "A payment diversion or authorised push payment fraud has just occurred.",
    ],
    scope: [
      "Blockchain tracing",
      "Exchange liaison",
      "NFT recovery",
      "DeFi protocol disputes",
    ],
    approach:
      "On-chain data is only useful when its limits are stated. We map what the records show, produce the evidenced picture needed for emergency applications, and convert that tracing work into exhibits that survive the transition from injunction to trial.",
    faqs: [
      {
        q: "Can you guarantee that crypto will be recovered?",
        a: "No. Anyone who guarantees recovery is not describing this work honestly.",
      },
      {
        q: "How quickly can you act?",
        a: "These cases are usually won or lost in the first days. We build the picture needed to support an emergency application before funds are dissipated further.",
      },
    ],
  },
  regulatory: {
    path: "/expertise/regulatory-defence-investigations/",
    title: "Regulatory Defence & Investigations Solicitors in London | Edison Law",
    description:
      "Defence and advisory work for SFO, FCA, HMRC and other regulatory investigations, including dawn raids and interviews under caution.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "When the regulator is already in the room.",
    lead: "We represent individuals and corporates under investigation by the SFO, FCA, HMRC and other regulatory bodies. Our team includes former senior investigators who understand the internal mechanics of regulatory decision-making, enabling us to secure early case closures or favourable settlements.",
    when: [
      "A dawn raid, interview under caution or information notice has landed.",
      "An internal investigation may need to be reported.",
      "Civil settlement or judicial review is a realistic next step.",
    ],
    scope: [
      "Dawn raid response",
      "Interviews under caution",
      "Civil settlement negotiations",
      "Judicial review",
    ],
    approach:
      "Regulatory work is won on the quality of the file and the timing of what is said. We identify the documents that decide the issue, protect privilege, and advise when negotiation is more useful than correspondence.",
    faqs: [
      {
        q: "Will you tell a regulator more than is required?",
        a: "No. Disclosure should be accurate and sufficient. It should not be a narrative offered in hope.",
      },
      {
        q: "Can defence run in parallel with recovery against someone else?",
        a: "Yes, where the facts support it. We have acted to close an investigation while pursuing civil claims against the actual perpetrators.",
      },
    ],
  },
  crossBorder: {
    path: "/expertise/cross-border-fraud-corruption/",
    title: "Cross-Border Fraud & Corruption Solicitors in London | Edison Law",
    description:
      "Multi-jurisdictional asset recovery, mutual legal assistance, recognition of foreign judgments and enforcement across financial centres and offshore territories.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "More than one legal system, one strategy.",
    lead: "We coordinate multi-jurisdictional asset recovery strategies, working with local counsel in over 40 jurisdictions to secure evidence, obtain freezing orders and enforce judgments. Our network includes specialist asset recovery practitioners in financial centres, offshore jurisdictions and civil law territories.",
    when: [
      "A UK-facing loss has its origins — or its proceeds — overseas.",
      "Evidence, freezing relief or enforcement is needed in more than one country.",
      "A foreign judgment or arbitration award needs to be recognised and enforced.",
    ],
    scope: [
      "Mutual legal assistance",
      "Letters of request",
      "Recognition of foreign judgments",
      "Arbitration enforcement",
    ],
    approach:
      "Cross-border work fails when each jurisdiction is treated as a separate case. We hold parallel proceedings together: which claim, in which court, in which order, and at what cost — with local counsel, forensic accountants and investigators managed as a single strategy.",
    faqs: [
      {
        q: "Do you have offices overseas?",
        a: "The practice is London-based. We work with local counsel, registry researchers and investigators in the jurisdictions where the money actually sits.",
      },
      {
        q: "Can you serve a defendant who has left the country?",
        a: "Locating people who have moved or gone to ground is part of the investigative work. Service and enforcement follow once they can be found.",
      },
    ],
  },
  corporateIntelligence: {
    path: "/expertise/corporate-intelligence/",
    title: "Corporate Intelligence & Pre-Litigation Solicitors in London | Edison Law",
    description:
      "Confidential due diligence, source of wealth verification, integrity monitoring and litigation risk assessment before high-value transactions.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Know the counterparty before the money moves.",
    lead: "We conduct confidential due diligence, background investigations and integrity monitoring for high-value transactions, investments and appointments. Our investigations identify undisclosed litigation, regulatory sanctions, political exposure and reputational risks before they crystallise.",
    when: [
      "A transaction, investment or appointment needs enhanced due diligence.",
      "Source of wealth or integrity needs to be verified before funds move.",
      "You need a realistic view of whether a counterparty can satisfy a judgment.",
    ],
    scope: [
      "Enhanced due diligence",
      "Source of wealth verification",
      "Integrity monitoring",
      "Litigation risk assessment",
    ],
    approach:
      "Pre-litigation intelligence is useful only if it is discreet and usable. We establish what a counterparty owns, who they are connected to, and whether money spent chasing them would be wasted — before a client commits to a course of action.",
    faqs: [
      {
        q: "Is this the same as instructing private investigators?",
        a: "Field and open-source enquiry is part of the work, run to a standard that will hold up if the matter later becomes litigation or a private prosecution.",
      },
      {
        q: "Will the subject know they are being looked at?",
        a: "The default is confidential. We say if a step would make the enquiry visible, and we do not take that step without instruction.",
      },
    ],
  },
  insights: {
    path: "/insights/",
    title: "Insights | Edison Law",
    description: "Investigation notes and legal explainers from Edison Law.",
    heading: "Notes from the work.",
    lead: "Short pieces on method. They explain how evidence becomes a legal decision. They are not case studies and they do not report results.",
  },
  people: {
    path: "/people/",
    title: "People | Edison Law",
    description: "Lawyers at Edison Law in London. Open a profile for biography and areas of work.",
    heading: "Our people.",
    lead: "Named lawyers at Edison Law. Open a profile for biography and areas of work.",
  },
  joinUs: {
    path: "/join-us/",
    title: "Join us | Edison Law",
    description:
      "Careers at Edison Law in London. Solicitors, barristers, investigators and forensic specialists in financial crime, private prosecutions and asset recovery.",
    heading: "Join us.",
    lead: "Discover what a career here is actually for: building cases that hold up when the other side tests them.",
    intro: [
      "We recruit and develop people who can take a disordered file — a fraud just discovered, a trail that has already left the banking system — and turn it into a legal position.",
      "The firm is small enough that every person is visible on the work, and specialised enough that the work is serious: private prosecutions, asset tracing, crypto recovery and cross-border enforcement. That combination is the point. You are not a resource on a large matter. You are on the matter.",
    ],
    jump: [
      { label: "Careers with us", href: "#careers" },
      { label: "Why Edison Law", href: "#why" },
      { label: "Get to know us", href: "#people" },
      { label: "Vacancies", href: "#vacancies" },
    ],
    tracks: {
      label: "Careers with us",
      heading: "The work you would do.",
      items: [
        {
          title: "Lawyers",
          text: "Solicitors and barristers who run files from first instruction through to trial, injunction and enforcement. Private prosecutions, asset recovery and regulatory investigations, with the duties of candour and disclosure taken as seriously as the result.",
        },
        {
          title: "Investigators",
          text: "Field and documentary enquiry that turns a suspicion into a set of established facts: witnesses, continuity, unused material, and the people and assets behind a fraud — including those who have moved or gone to ground.",
        },
        {
          title: "Forensic specialists",
          text: "Financial and digital analysis that a court will accept: ledgers, payment chains, blockchain trails and expert evidence. Speed when funds are still moving; precision when the numbers have to survive cross-examination.",
        },
        {
          title: "Asset tracing",
          text: "Locating recoverable value and saying, early, whether pursuing it is worth the cost. Registries, nominees, cross-border structures and the difference between an asset that exists and an asset that can be reached.",
        },
        {
          title: "Business teams",
          text: "The people who keep a specialist practice running: matter intake, confidentiality, billing and the operational discipline a criminal evidential file requires. Applications are considered when the work needs them.",
        },
      ],
    },
    why: {
      label: "Why Edison Law",
      heading: "How the work is done here.",
      items: [
        {
          title: "One team from the first letter",
          text: "Solicitors, barristers, investigators and forensic specialists sit in the same practice. A file is not handed across a chambers wall. The person who scoped the investigation is still on it at trial.",
        },
        {
          title: "Visible on the case",
          text: "The firm is not large enough to hide in. You will be in the room with the client, the evidence and the decision. That is demanding. It is also how people here actually learn the work.",
        },
        {
          title: "Discretion as a habit",
          text: "Financial crime is reputationally sensitive. We recruit people who can be trusted with incomplete facts, reluctant witnesses and clients who are often under pressure. If that is not how you work, this is not the place.",
        },
      ],
    },
    people: {
      label: "Get to know us",
      heading: "Who you would work with.",
      text: "From partners to investigators, the people on the files. Open a profile for the work they actually do.",
    },
    vacancies: {
      label: "Vacancies",
      heading: "If you think you should be here.",
      text: "We do not keep a public vacancy board. Roles open when a matter-load requires them, and they are filled by people who can do the work described on this site.",
      detail:
        "Write with a short account of the work you want to do, the jurisdiction you are qualified in if you are a lawyer, and a CV. Do not send original identity documents. Mark the subject as a careers enquiry.",
      cta: { label: "Write to us", href: "/contact/" },
    },
  },
  about: {
    path: "/about/",
    title: "About Edison Law | London",
    description:
      "A specialist firm of solicitors and barristers for financial crime investigation, private prosecution and asset recovery.",
    heading: "Solicitors and barristers under one roof.",
    blocks: [
      {
        heading: "Who we are",
        text: "Edison Law is the only firm combining the strategic oversight of specialist financial crime solicitors with the advocacy excellence of experienced criminal barristers under one roof. Founded by former senior prosecutors and regulatory specialists, we offer seamless case management from initial investigation through to the highest courts.",
      },
      {
        heading: "Experience",
        text: "Our founding partners have a combined 70 years' experience in criminal justice, regulatory enforcement and complex civil fraud litigation. We are recognised internationally as being at the forefront of asset tracing, crypto fraud recovery and cross-border judgment enforcement.",
      },
      {
        heading: "Who we act for",
        text: "High-net-worth individuals and family offices; corporations and financial institutions; charities and non-profit organisations; government agencies and state entities; trusts and trustees.",
      },
      {
        heading: "Office",
        text: `The practice is an SRA recognised sole practice in London. Correspondence: ${address}. Confirm the current office details on the public SRA record.`,
      },
    ],
  },
  contact: {
    path: "/contact/",
    title: "Contact | Edison Law",
    description: "Instruct Edison Law confidentially about a private prosecution, asset recovery or financial crime matter.",
    heading: "Instruct us confidentially.",
    lead: "All enquiries are handled under strict confidentiality protocols. Do not send passwords, seed phrases or original identity documents through this form. Describe the situation. We will say whether we can help.",
    urgent: `For urgent freezing order applications and asset preservation, write to ${site.email} and mark the subject urgent.`,
  },
  legal: {
    path: "/legal-regulatory/",
    title: "Legal and regulatory | Edison Law",
    description: "Regulatory standing, reserved activities and notices for Edison Law.",
    heading: "Legal and regulatory.",
    blocks: [
      {
        heading: "Regulated name",
        text: `Edison Law is authorised and regulated by the Solicitors Regulation Authority. SRA number ${site.sraNumber}. The firm has been an SRA recognised sole practice since ${site.sraSince}.`,
      },
      {
        heading: "Reserved activities",
        text: "The SRA record lists authority for the exercise of a right of audience, conduct of litigation, reserved instrument activities, probate activities and the administration of oaths. The firm’s published practice on this site is private prosecutions, asset recovery, crypto fraud, regulatory investigations and cross-border financial crime.",
      },
      {
        heading: "Insurance",
        text: "SRA-regulated firms must maintain professional indemnity insurance. The insurer name and wording will be stated here once the firm confirms the current policy for publication.",
      },
      {
        heading: "SRA record",
        text: "The public record is the source for office, people and authorisation details. Check it if anything on this site might be out of date.",
      },
    ],
  },
  complaints: {
    path: "/complaints/",
    title: "Complaints procedure | Edison Law",
    description: "How to complain about Edison Law and how to reach the Legal Ombudsman.",
    heading: "Complaints procedure.",
    intro:
      "If you are unhappy with our service, tell us. We will take the complaint seriously and respond in writing.",
    steps: [
      `Write to Abigail Charlotte Wills at ${site.email} or to ${address}. Mark the letter as a complaint.`,
      "Say what went wrong, when it happened, and what you would like us to do.",
      "We aim to acknowledge a complaint promptly and to give a final written response within eight weeks.",
    ],
    leo: [
      "If you are not satisfied with our final response, or eight weeks have passed, you may be able to refer the matter to the Legal Ombudsman.",
      "Usual time limits: within six months of our final written response, and within one year of the act or omission or of the date you reasonably should have known about it. Confirm the current rules at legalombudsman.org.uk.",
      "Legal Ombudsman, PO Box 6167, Slough, SL1 0EH. Telephone 0300 555 0333. Relay UK 18001 0300 555 0333.",
    ],
  },
  pricing: {
    path: "/pricing/",
    title: "Pricing | Edison Law",
    description: "How Edison Law charges for work and how estimates are given.",
    heading: "Pricing.",
    blocks: [
      {
        heading: "Transparency",
        text: "The SRA Transparency Rules require published prices for certain defined services. The work described on this site — private prosecutions, asset recovery and financial crime — is scoped case by case. We do not publish a menu of fixed fees for that work because the evidence, forum and urgency change the cost.",
      },
      {
        heading: "How we quote",
        text: "After an initial discussion we provide a written scope, the charging basis, likely disbursements and VAT. If we cannot help, we say so. Where appropriate we offer conditional fee arrangements, damages-based agreements and hybrid structures.",
      },
      {
        heading: "No guaranteed recoveries",
        text: "Fees are for legal work. We will not promise a recovery that the evidence does not support.",
      },
    ],
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy | Edison Law",
    description: "How Edison Law handles personal information.",
    heading: "Privacy notice.",
    blocks: [
      {
        heading: "Controller",
        text: `Edison Law is the data controller for this website and for client files. Correspondence: ${address}. Email: ${site.email}.`,
      },
      {
        heading: "What we collect",
        text: "If you write to us we receive the name, contact details and matter description you send. We use that information to decide whether we can act and to reply. We do not run advertising analytics on this preview.",
      },
      {
        heading: "Retention and rights",
        text: "Client files are kept for the period required by professional rules. You may ask for access, correction or erasure where the law allows. You may complain to the Information Commissioner’s Office.",
      },
    ],
  },
  cookies: {
    path: "/cookies/",
    title: "Cookies | Edison Law",
    description: "Cookie use on the Edison Law website.",
    heading: "Cookies.",
    blocks: [
      {
        heading: "What we use",
        text: "This site is built to work without tracking cookies. Analytics in the site configuration are off. If that setting is later enabled, this page will be updated before any non-essential cookie is set.",
      },
      {
        heading: "Essential storage",
        text: "The browser may keep ordinary session data required to display pages. We do not use that to profile you.",
      },
    ],
  },
  accessibility: {
    path: "/accessibility/",
    title: "Accessibility | Edison Law",
    description: "Accessibility of the Edison Law website.",
    heading: "Accessibility.",
    blocks: [
      {
        heading: "Standard",
        text: "We aim to meet WCAG 2.2 AA. Pages use semantic landmarks, a skip link, visible focus, and keyboard-operable navigation.",
      },
      {
        heading: "If something is in the way",
        text: `Email ${site.email} and describe the page, the barrier and the format that would help. We will respond as part of ordinary professional correspondence.`,
      },
    ],
  },
  fraud: {
    path: "/fraud-warning/",
    title: "Fraud warning | Edison Law",
    description: "How to check that a message claiming to be from Edison Law is genuine.",
    heading: "Fraud warning.",
    blocks: [
      {
        heading: "Check the sender",
        text: `We will not ask you to send cryptocurrency, cash or identity documents to a personal account. Treat unexpected payment instructions as suspect. Confirm any bank details using a number or address you already hold, not a number in the same message.`,
      },
      {
        heading: "Check the site",
        text: "This website and our email domain should match. If a message uses a different domain, or a lookalike spelling, do not reply with confidential information.",
      },
      {
        heading: "If you are unsure",
        text: `Write to ${site.email} from an address we already know, or write to the office address recorded with the SRA.`,
      },
    ],
  },
};

export const insightBodies = {
  "tracing-assets-across-wallets": [
    {
      heading: "Summary",
      text: "A wallet trail is not a case. It is a set of records that may support one. This note sets out how we read those records before anyone is asked to act on them.",
    },
    {
      heading: "Context",
      text: "Value can move through several addresses in minutes. Screenshots and explorer links arrive first. They are useful and incomplete. They do not, on their own, prove control, knowledge or a recoverable defendant.",
    },
    {
      heading: "Method",
      text: "We map the transfers that can be shown, record the tools and timestamps used, and mark every hop that depends on an assumption. Exchange records, off-chain messages and the legal identity behind a cluster are treated as separate questions.",
    },
    {
      heading: "Legal options",
      text: "The map then supports a decision: preserve, write a letter, apply for an order, or wait. The decision is legal. The map is evidence.",
    },
    {
      heading: "Limitations",
      text: "Mixers, bridges, missing exchange data and shared addresses all limit what can be said. Those limits belong in the advice, not in a footnote after a hopeful conclusion.",
    },
  ],
  "hmrc-enquiry-evidence": [
    {
      heading: "Summary",
      text: "An enquiry is a request for a file that can answer a defined question. Adding volume is not the same as answering it.",
    },
    {
      heading: "Context",
      text: "HMRC correspondence often arrives with a wide information request. The useful response is the one that meets the notice, protects privilege, and does not volunteer a theory.",
    },
    {
      heading: "Method",
      text: "We list the questions actually asked, the documents that answer them, and the documents that would create a new question if sent. That list becomes the working file.",
    },
    {
      heading: "Legal options",
      text: "Depending on the stage, the next step may be a focused disclosure, a meeting, or advice that the matter is moving toward a different procedure.",
    },
    {
      heading: "Limitations",
      text: "This is not tax-return preparation and it is not a promise that an enquiry will close on any timetable.",
    },
  ],
  "preserving-digital-evidence": [
    {
      heading: "Summary",
      text: "The first hours of a digital matter are usually spent deciding what not to do. Deletion, ‘helpful’ forwarding and informal exports all change the file.",
    },
    {
      heading: "Context",
      text: "Phones, cloud accounts and exchange logins are easy to alter and hard to reconstruct. A later court will ask how the material was obtained.",
    },
    {
      heading: "Method",
      text: "Hold the original source. Record who accessed it and when. Export in a way that preserves metadata where that is possible. Do not draft a narrative on top of the export until the export is stable.",
    },
    {
      heading: "Legal options",
      text: "Preservation sits before strategy. Once the file is stable, the legal options become visible: report, disclose, defend, or take no public step.",
    },
    {
      heading: "Limitations",
      text: "Some sources cannot be preserved perfectly. We say so. A partial file is still more useful than a reconstructed story.",
    },
  ],
};
