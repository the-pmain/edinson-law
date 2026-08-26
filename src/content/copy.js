import { firstContactStatement, trust } from "../config/trust.js";

const sraLine = `Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${trust.firm.sraNumber}.`;

export const home = {
  path: "/",
  title: "Edison Law | Financial crime, private prosecutions and asset recovery in London",
  description:
    "SRA-regulated London solicitors' practice for financial crime, asset recovery and investigation matters. We establish the facts, identify the available legal routes and explain the commercial risks before substantial costs are incurred.",
  schema: "home",
  sections: {
    hero: {
      descriptor: "Digital assets · investigations · recovery",
      heading: "When assets move, follow the",
      headingLines: ["When assets", "move,", "follow the"],
      headingEmphasis: "evidence.",
      lead: "Edison Law combines transaction tracing, evidence preservation and legal analysis for fraud, financial-crime and asset-recovery matters.",
      cta: { label: "Discuss a matter", href: "/contact/" },
      ctaSecondary: { label: "Explore our expertise", href: "/expertise/" },
    },
    who: {
      label: "How we begin",
      heading: "When the facts are fragmented",
      lead: "Fraud matters rarely arrive as a complete case. Records may be missing, payments may have crossed several institutions and the legal route may still be uncertain.",
      text: "Our work begins by preserving the available evidence and identifying the questions that will determine what happens next.",
    },
    cobra: {
      label: "Technology used in suitable matters",
      heading: "Cobra AI",
      lead: "On some investigations, where the volume of records makes manual review impractical, we use Cobra AI, an intelligence platform published by IYE Global. Output is reviewed by the people on the matter. It is a tool, not evidence, and it is not used on every file.",
      text: "Vendor description:",
      items: [],
      sourceNote: "",
      sourceLabel: "Cobra AI, IYE Global",
      cta: "",
    },
    why: {
      label: "How the work is run",
      heading: "Judgment before a large spend.",
      items: [
        {
          icon: "solicitor",
          title: "A named supervising solicitor",
          text: "Each instruction is supervised by a named solicitor. Counsel is instructed where advocacy is needed. External specialists are introduced where their expertise is required, with their role explained.",
        },
        {
          icon: "evidence",
          title: "Evidence before strategy",
          text: "Devices, accounts and originals are preserved before anyone drafts a narrative. Analysis is run so it can be exhibited, with its limits stated.",
        },
        {
          icon: "fees",
          title: "Fees for the work",
          text: "After an initial discussion we provide a written scope and charging basis. Fees are for legal work. They are not a recovery of assets. See Pricing.",
        },
        {
          icon: "discretion",
          title: "Discretion",
          text: "Financial crime is reputationally sensitive. Enquiries are handled confidentially. Do not send passwords, private keys, seed phrases or original identity documents through the website.",
        },
        {
          icon: "london",
          title: "London, with local counsel where required",
          text: "We are a London practice. Where foreign-law advice or local procedure is required, we identify and instruct appropriately qualified local counsel with the client's approval.",
        },
      ],
    },
    cases: {
      label: "Work of this kind",
      heading: "Types of matter, not reported results.",
      intro:
        "These are examples of the questions we are asked. They are not case studies and they do not report recoveries, sentences or rankings.",
      items: [
        {
          title: "Authorised push payment and payment diversion",
          kind: "Payments",
          jurisdictions: "UK banks, payment institutions, sometimes an overseas cash-out",
          text: "Funds have left through a payment service, correspondent bank or e-money account. The first work is to preserve what still exists, map the trail, and say whether an emergency application is realistic.",
        },
        {
          title: "Internal fraud and misappropriation",
          kind: "Companies",
          jurisdictions: "UK companies, sometimes nominees and connected entities",
          text: "A gap in the accounts, a long-serving employee, or a director who appears to have helped themselves. The file has to establish who did what, and whether anything remains that is worth reaching.",
        },
        {
          title: "Wallets, exchanges and digital-asset conversion",
          kind: "Digital assets",
          jurisdictions: "On-chain records, regulated and unregulated platforms",
          text: "Value has moved across wallets, bridges or exchanges. On-chain data is useful only when its limits are stated. We map what the records show and convert that picture into exhibits.",
        },
        {
          title: "Cross-border facts, London file",
          kind: "Cross-border",
          jurisdictions: "England and Wales, with local counsel where required",
          text: "A UK-facing loss with origins or proceeds overseas. Foreign registries, people who have left the jurisdiction, and enforcement elsewhere are handled with local counsel.",
        },
      ],
    },
    standing: {
      label: "Responsibility",
      heading: "Responsibility should be visible.",
      items: [
        "Every matter has a named supervising solicitor. Specialist investigators and forensic professionals are introduced where their expertise is needed, with their role and status explained clearly.",
        `SRA number ${trust.firm.sraNumber} — authorised and regulated by the Solicitors Regulation Authority.`,
        trust.firm.regulatorCheckText,
      ],
      note: "Confirm current authorised individuals on the public SRA organisation record. We do not publish recoveries or win rates.",
      link: "Open the public SRA record",
    },
    awards: {
      heading: "Our Awards",
      text: "Edison Law has earned a number of significant industry plaudits, including the following.",
      items: [
        {
          src: "/images/awards/legal-500.png",
          alt: "The Legal 500 United Kingdom Top Tier 2023",
          width: 148,
          height: 214,
        },
        {
          src: "/images/awards/global-awards.png",
          alt: "Global Awards 2015 Corporate LiveWire Winner",
          width: 380,
          height: 192,
        },
        {
          src: "/images/awards/ai-legal-awards.png",
          alt: "AI Legal Awards 2015 Winner, Best City Boutique UK",
          width: 354,
          height: 283,
        },
        {
          src: "/images/awards/the-lawyer-awards.png",
          alt: "The Lawyer Awards 2014 Winner, Boutique Firm of the Year City",
          width: 177,
          height: 250,
        },
      ],
    },
    profile: {
      label: "The practice",
      heading: "The people responsible for the work.",
      text: "Profiles explain professional status, role on a matter and, where relevant, who supervises the work. Confirm authorised individuals on the public SRA record.",
      collectiveCaption: "Richard Edison",
      collectiveMark: "Owner",
      collectiveAlt: "Richard Edison, owner of Edison Law",
      collectiveLabel: "The others",
      cta: { label: "All profiles", href: "/people/" },
    },
    insight: {
      label: "Insights",
      heading: "Practical notes on evidence and recovery.",
    },
    london: {
      heading: "A London practice.",
      text: "Edison Law is an SRA-regulated solicitors' firm in London. Work that crosses borders is still held here: the evidential file, the English court, and local counsel where foreign procedure is required.",
      meta: "London",
      cta: { label: "About the firm", href: "/about/" },
    },
    practiceBar: {
      cta: { label: "Explore our expertise", href: "/expertise/" },
    },
    cta: {
      heading: "Discuss a matter.",
      text: "Give us a concise account of what has happened, who is involved and any immediate deadline. Do not send passwords, private keys, seed phrases or original identity documents.",
      cta: { label: "Send an initial enquiry", href: "/contact/" },
    },
  },
};

export const pages = {
  expertise: {
    path: "/expertise/",
    title: "Legal Expertise | Edison Law, London",
    description:
      "Private prosecutions, asset tracing, crypto fraud, regulatory defence, cross-border recovery and corporate intelligence — legal routes for fraud, investigations and recovery.",
    heading: "Legal routes for fraud, investigations and recovery.",
    lead: "A financial-crime matter can involve several possible routes at once: a criminal complaint, private prosecution, urgent injunction, civil recovery, regulatory response or a decision not to proceed. Our role is to establish which route the evidence supports and whether the likely benefit justifies the cost and disruption.",
    cta: { label: "Discuss a matter", href: "/contact/" },
  },
  privateProsecutions: {
    path: "/expertise/private-prosecutions/",
    title: "Private Prosecutions Solicitors in London | Edison Law",
    description:
      "Assessing and preparing privately brought criminal proceedings where the evidence and public-interest duties support that course.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "A private prosecution must be built to withstand independent scrutiny.",
    lead: "A private prosecution may provide a route where a public authority has declined to proceed, but it is not simply a private version of a civil claim. The prosecutor assumes important duties of fairness, disclosure and candour. We assess the evidence, prepare the case and instruct specialist counsel where proceedings are justified.",
    cta: { label: "Request an initial prosecution assessment", href: "/contact/" },
    ctaBand: {
      heading: "Request an initial prosecution assessment.",
      text: "Give us a concise account of the allegation, what has already been reported, and the evidence you hold. Do not send original identity documents through this form.",
    },
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
      "Identifying potentially recoverable value and selecting proportionate civil, criminal or insolvency remedies.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Find the assets before choosing the remedy.",
    lead: "Recovery strategy begins with two questions: what value can be identified, and can it realistically be reached? We combine legal analysis with financial and corporate enquiries to identify assets, ownership structures and the remedies available in the relevant jurisdiction.",
    cta: { label: "Discuss a recovery strategy", href: "/contact/" },
    ctaBand: {
      heading: "Discuss a recovery strategy.",
      text: "Tell us what was lost, what you already know about where it went, and any deadline for relief. Do not send passwords or original identity documents.",
    },
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
      "Converting transaction data, platform records and device evidence into a legal case with clearly stated limits.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "From transaction data to admissible evidence.",
    lead: "Blockchain records can show how digital assets moved, but attribution, ownership and recoverability usually depend on evidence beyond the chain. We work with transaction data, exchange records, device evidence and legal disclosure routes to build a properly qualified picture.",
    cta: { label: "Preserve and assess the transaction trail", href: "/contact/" },
    ctaBand: {
      heading: "Preserve and assess the transaction trail.",
      text: "Send transaction identifiers, platform names and dates — not seed phrases, private keys or passwords. We cannot reverse a blockchain transaction.",
    },
    when: [
      "Value has moved across wallets, mixers, bridges or exchanges.",
      "An exchange or service provider is holding frozen balances.",
      "A payment diversion or authorised push payment fraud has just occurred.",
    ],
    scope: [
      "Blockchain tracing",
      "Exchange liaison",
      "NFT and token disputes",
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
      "Advice on notices, interviews, internal reviews and engagement with investigating authorities.",
    parent: { label: "Expertise", href: "/expertise/" },
    reviewTopic: "SRA and regulatory enforcement policy",
    heading: "Control the first response to an investigation.",
    lead: "The first hours of a regulatory or criminal investigation can shape everything that follows. We advise on evidence preservation, privilege, internal communications, information requests and interviews, then develop a response based on the powers and procedure of the relevant authority.",
    cta: { label: "Get advice on an investigation", href: "/contact/" },
    ctaBand: {
      heading: "Get advice on an investigation.",
      text: "Name the authority if you can, describe the notice or contact, and say what deadline you have. Do not send large volumes of confidential material through this form.",
    },
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
        a: "Yes, where the facts support it. Defence of one person and recovery against another can sit on the same strategy. We will not describe an investigation as closed unless it is.",
      },
    ],
  },
  crossBorder: {
    path: "/expertise/cross-border-fraud-corruption/",
    title: "Cross-Border Fraud & Corruption Solicitors in London | Edison Law",
    description:
      "Coordinating English proceedings with appropriately qualified counsel where evidence, respondents or assets are overseas.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "One strategy across several legal systems.",
    lead: "When evidence, respondents and assets are spread across jurisdictions, the order of action matters. We coordinate the English legal strategy and work with independent local counsel on foreign procedure, evidence gathering, interim relief, recognition and enforcement.",
    cta: { label: "Discuss the jurisdictions involved", href: "/contact/" },
    ctaBand: {
      heading: "Discuss the jurisdictions involved.",
      text: "Tell us where the people, the records and the assets appear to sit, and what has already been started in any court. Do not send original identity documents through this form.",
    },
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
      "Lawful, confidential enquiries before litigation, investment, appointment or other material exposure.",
    parent: { label: "Expertise", href: "/expertise/" },
    reviewTopic: "sanctions and export control",
    heading: "Test the counterparty before exposure becomes loss.",
    lead: "A confidential pre-litigation review can clarify who controls a counterparty, whether material claims or sanctions concerns exist and whether a future judgment is likely to have practical value. Enquiries are scoped for a defined legal or commercial purpose and conducted by lawful means.",
    cta: { label: "Scope a confidential review", href: "/contact/" },
    ctaBand: {
      heading: "Scope a confidential review.",
      text: "Describe the decision you need to take, the counterparty as you currently know them, and the deadline. Covert or visible steps are taken only on instruction.",
    },
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
  investigations: {
    path: "/investigations/",
    title: "Financial Crime Investigations in London | Edison Law",
    description:
      "Investigators and forensic specialists in London. We establish what happened, preserve evidence and locate assets before a legal strategy is chosen.",
    heading: "Establish what happened. Preserve what proves it.",
    lead: "An investigation should answer defined questions, preserve the underlying material and distinguish evidence from inference. Lawyers, investigators and forensic specialists work to a common scope so that the resulting record can support advice, reporting, litigation or prosecution if required.",
    schema: "investigations",
    serviceType: "Financial crime investigation",
    intro: [
      "Expertise is the legal route. Investigations are how the record is built. Solicitors, investigators and forensic specialists work to a common scope so that findings can be assessed, disclosed and, where necessary, relied upon in proceedings.",
      "We act for companies, organisations and individuals who have been the victims of crime, and for boards that have found a problem inside the organisation.",
    ],
    jump: [
      { label: "What we investigate", href: "#work" },
      { label: "Technology", href: "#cobra-ai" },
      { label: "Who does the work", href: "#investigators" },
      { label: "Start an enquiry", href: "#instruct" },
    ],
    people: {
      label: "Who does the work",
      heading: "Investigators and forensic specialists.",
      text: "Solicitors direct the investigation and take the legal decisions. These are the specialists they work with from the first day. Confirm authorised individuals on the public SRA record.",
    },
    process: {
      label: "How an investigation runs",
      heading: "Three steps. One record.",
      items: [
        {
          index: "01",
          icon: "evidence",
          title: "Scope the questions",
          text: "We agree what must be established, what is out of scope, and what must be preserved before anyone starts collecting.",
        },
        {
          index: "02",
          icon: "fees",
          title: "Gather and test",
          text: "Documents, devices, accounts and witnesses are taken in a form that can later be disclosed, exhibited or discarded with a reason.",
        },
        {
          index: "03",
          icon: "solicitor",
          title: "Report what is established",
          text: "The product is a record the solicitor can rely on: what is proved, what remains inference, and what legal routes that supports.",
        },
      ],
    },
    cta: { label: "Speak to the investigations practice", href: "/contact/" },
    ctaBand: {
      heading: "Speak to the investigations practice.",
      text: "Send the facts you already have. Do not send passwords, private keys, seed phrases or original identity documents.",
    },
  },
  internalInvestigations: {
    path: "/investigations/internal-investigations/",
    title: "Internal Investigations | Edison Law, London",
    description:
      "Board-level, employee and whistleblower investigations in London, run to a standard that holds if you later prosecute, report or litigate.",
    parent: { label: "Investigations", href: "/investigations/" },
    heading: "Help the board make a defensible decision.",
    lead: "Something inside the business does not add up, and you need a record that will still hold if you later dismiss, report or prosecute. We scope the enquiry so that employment, governance and reporting decisions can be explained.",
    schema: "service",
    serviceType: "Internal investigation",
    relatedExpertise: ["regulatory", "corporate-intelligence", "private-prosecutions"],
    when: [
      "A whistleblower report, unexplained payments or a gap in the accounts has landed on the board.",
      "Employee or fiduciary misconduct needs to be established before anyone is dismissed or reported.",
      "You may have to tell the FCA, SFO, a charity regulator or insurers, and the file has to be accurate when you do.",
    ],
    scope: [
      "Scoping and privilege",
      "Employee and witness interviews",
      "Documentary and financial reconstruction",
      "Whistleblower follow-up",
      "Regulatory notification advice",
      "Remedial and governance recommendations",
    ],
    approach:
      "The first decisions are about hold, access and privilege — not about a press line. We identify who should be interviewed, in what order, and what must be preserved before anyone is put on notice. Findings are written so they can be disclosed later without embarrassment. If the facts point to a crime against the organisation, the same file can support a private prosecution or recovery; we do not run a second investigation to get there.",
    faqs: [
      {
        q: "Will the subjects know they are being investigated?",
        a: "Not always, and not at first. We say when a step would make the enquiry visible. Covert steps are taken only on instruction, and only by lawful means.",
      },
      {
        q: "Is this the same as an HR investigation?",
        a: "No. An employment process can sit alongside this work. It is not a substitute for an evidential file that will be read by a regulator, a defendant or a judge.",
      },
      {
        q: "Can you guarantee the outcome the board wants?",
        a: "No. We will tell you what the material supports. If it does not support a dismissal, a report or a prosecution, we say so before costs run on.",
      },
    ],
  },
  financialCrimeInvestigations: {
    path: "/investigations/financial-crime/",
    title: "Financial Crime Investigations | Edison Law, London",
    description:
      "Fraud and financial crime investigations in London: who was involved, how the scheme ran, and what you can actually prove.",
    parent: { label: "Investigations", href: "/investigations/" },
    heading: "Reconstruct conduct, participants and loss.",
    lead: "You think a fraud has happened, but you cannot yet say who did what or whether the documents will prove it. This work produces a chronology, witness evidence and a clear account of what is known and what is not.",
    schema: "service",
    serviceType: "Financial crime investigation",
    relatedExpertise: ["private-prosecutions", "asset-tracing", "regulatory"],
    when: [
      "A report to the police, Action Fraud or the SFO has produced no investigation you can use.",
      "The loss is serious, but it is not yet clear who did what, or whether the documents will prove it.",
      "You need a criminal-standard file because a private prosecution, a freezing order or a regulatory report may follow.",
    ],
    scope: [
      "Case scoping and merit assessment",
      "Witness identification and statements",
      "Documentary gathering and continuity",
      "Financial reconstruction with forensic specialists",
      "Unused material and disclosure records",
      "Briefing for charging, injunction or report",
    ],
    approach:
      "We start by imposing order: what is alleged, what is in hand, what is missing, and what would have to be true for a case to stand. Investigators take statements and gather documents; forensic specialists rebuild the money; solicitors decide what the file is for. Nothing is obtained in a way that will later embarrass a prosecution. If the evidence will not hold, we stop and say so.",
    faqs: [
      {
        q: "Is this a substitute for the police?",
        a: "No. It is the work of building a file the authorities have declined to build, or have not built to a standard you can use. A private prosecution remains a separate legal decision.",
      },
      {
        q: "Do you guarantee a prosecution or a recovery?",
        a: "No. The investigation answers whether either is realistic. That answer is the point of instructing it.",
      },
      {
        q: "How is this different from instructing unregulated investigators?",
        a: "The enquiry is run inside a solicitors' practice, to a standard that will be tested by the defence and the court. Method, privilege and disclosure are part of the work, not an afterthought.",
      },
    ],
  },
  digitalInvestigations: {
    path: "/investigations/digital-crypto/",
    title: "Digital and Crypto Investigations | Edison Law, London",
    description:
      "Digital, payments and cryptocurrency investigations in London: preserve devices and wallets, map the trail, and produce evidence a court will accept.",
    parent: { label: "Investigations", href: "/investigations/" },
    heading: "Preserve devices. Produce a traceable record.",
    lead: "Money or messages have just left, and you need the trail held before anyone has a look. We preserve devices and accounts, then produce transaction and communications records that can be exhibited.",
    schema: "service",
    serviceType: "Digital and cryptocurrency investigation",
    relatedExpertise: ["crypto-fraud", "asset-tracing", "private-prosecutions"],
    when: [
      "Funds have left through a payment service, correspondent bank, e-money account or digital-asset platform.",
      "Devices, mailboxes or wallets that still hold evidence have not yet been imaged or frozen.",
      "An exchange or provider may be holding a balance, and you need an evidenced request rather than a hope.",
    ],
    scope: [
      "Evidence preservation and hold notices",
      "Payments tracing across banks and PSPs",
      "Blockchain and wallet mapping",
      "Exchange and platform liaison",
      "Flow-of-funds schedules and exhibits",
      "Support for emergency injunctions",
    ],
    approach:
      "On-chain data and bank records are only useful when their limits are stated. We capture the source first, then map what the records show — through payment institutions, mixers, bridges and exchanges — and produce the evidenced picture needed for an emergency application. That tracing work is written so it can move from injunction to trial without being rebuilt.",
    faqs: [
      {
        q: "Can you guarantee that crypto or diverted funds will be recovered?",
        a: "No. Anyone who guarantees recovery is not describing this work honestly. We will say early when value is still reachable, and equally early when it is not.",
      },
      {
        q: "Should we log into the wallet or exchange ourselves?",
        a: "Usually not. Accessing an account can destroy metadata, alert a counterparty or create a continuity problem. Describe what you have. We will say how to preserve it.",
      },
      {
        q: "How quickly can you start?",
        a: "These matters are built for speed. Send what you have: transaction hashes, payment references, institution names, dates. Do not send seed phrases or passwords.",
      },
    ],
  },
  crossBorderInvestigations: {
    path: "/investigations/cross-border/",
    title: "Cross-Border Investigations | Edison Law, London",
    description:
      "Cross-border financial crime investigations from London: foreign registries, overseas subsidiaries, and defendants who have left the jurisdiction.",
    parent: { label: "Investigations", href: "/investigations/" },
    heading: "Coordinate lawful enquiries across borders.",
    lead: "The people or the records sit outside England, and you need facts a London court can actually use. We obtain and coordinate lawful enquiries across registries, courts and local professionals.",
    schema: "service",
    serviceType: "Cross-border investigation",
    relatedExpertise: ["cross-border", "asset-tracing", "private-prosecutions"],
    when: [
      "Companies, property or bank accounts sit in another jurisdiction, and the UK file does not explain them.",
      "A defendant has relocated, changed name, or gone to ground outside England and Wales.",
      "An overseas subsidiary, supplier or joint venture is where the misconduct actually happened.",
    ],
    scope: [
      "Foreign company, court and insolvency records",
      "Procurement and regulatory databases",
      "Location of defendants and witnesses",
      "Enquiries in overseas subsidiaries",
      "Coordination with local counsel and researchers",
      "Service and enforcement groundwork",
    ],
    approach:
      "We obtain what the public and paid record will give, in the languages it is written in, and we are careful about how it is obtained. Registry extracts, court files and local enquiries are logged so they can be exhibited. Where a person has to be found, that is investigation, not a process-server's afterthought. Local counsel are instructed when a step would otherwise be unlawful or invisible from London.",
    faqs: [
      {
        q: "Do you have offices overseas?",
        a: "We are a London practice. Where foreign-law advice or local procedure is required, we identify and instruct appropriately qualified local counsel with the client's approval.",
      },
      {
        q: "Can you serve someone who has left the country?",
        a: "Locating them is the investigative step. Service and enforcement follow once they can be found. We will say if they cannot.",
      },
      {
        q: "Is this mutual legal assistance?",
        a: "MLA and letters of request are legal routes, not the investigation itself. The investigation produces the facts those routes need. See Cross-border fraud and corruption under Expertise for the legal work.",
      },
    ],
  },
  assetTracingInvestigations: {
    path: "/investigations/asset-tracing/",
    title: "Asset Tracing Investigations | Edison Law, London",
    description:
      "Asset tracing investigations in London: where misappropriated value went, whether it is still there, and whether pursuing it is worth the cost.",
    parent: { label: "Investigations", href: "/investigations/" },
    heading: "Identify ownership, control and realistic targets.",
    lead: "You need to know where the money has gone, and whether any of it is still reachable, before you spend on a freeze. Legal remedies come after that answer, not before.",
    schema: "service",
    serviceType: "Asset tracing investigation",
    relatedExpertise: ["asset-tracing", "crypto-fraud", "cross-border"],
    when: [
      "Funds have left, and the destination is a bank, a company, a property, a family member or a wallet — or all of them.",
      "A defendant appears to have nothing, and that needs to be tested before you spend on proceedings.",
      "You need an asset picture to support a freezing, proprietary or disclosure application at speed.",
    ],
    scope: [
      "Flow-of-funds from the point of loss",
      "Banking chains and payment institutions",
      "Nominee holdings and connected companies",
      "Property, vehicles, investments and goods",
      "Digital-asset conversion and cash-out",
      "Pre-action enforceability assessments",
    ],
    approach:
      "We follow value from the point of loss and we say, early, whether what we find is worth the cost of reaching it. An asset that exists is not always an asset that can be frozen, charged or sold. Findings are produced as schedules and exhibits that solicitors can put in front of a court the same week, and that forensic experts can stand behind if they are cross-examined.",
    faqs: [
      {
        q: "Can you guarantee that assets will be found?",
        a: "No. We will tell you early when there is value to pursue, and equally early when the trail ends. That is the useful answer.",
      },
      {
        q: "How is this different from Asset tracing and recovery under Expertise?",
        a: "This page is the investigative work: locating value and saying whether it is reachable. The Expertise page is the legal work that follows — freezing orders, receivership, trust piercing and enforcement.",
      },
      {
        q: "Do you chase assets that will cost more than they return?",
        a: "Not if we can see that coming. A tracing exercise that is not worth the powder is stopped, and the client is told.",
      },
    ],
  },
  insights: {
    path: "/insights/",
    title: "Insights | Investigation Notes | Edison Law",
    description:
      "Practical notes on evidence, investigations and recovery from Edison Law in London. General information, not advice on a particular case.",
    heading: "Practical notes on evidence, investigations and recovery.",
    lead: "Notes on what to preserve, what a source can establish, when urgent relief may be appropriate, and where legal or evidential limits arise. General information, not advice on a particular case.",
  },
  people: {
    path: "/people/",
    title: "People | Edison Law, London",
    description:
      "The people responsible for work at Edison Law. Confirm current authorised individuals on the public SRA record.",
    heading: "The people responsible for your work.",
    lead: "Each profile states the person's role on a matter. Job titles are not a reserved-activity authorisation. Confirm current authorised individuals on the public SRA record.",
  },
  joinUs: {
    path: "/join-us/",
    title: "Join us | Edison Law",
    description:
      "Careers at Edison Law in London. Lawyers, investigators and forensic specialists in financial crime, private prosecutions and asset recovery.",
    heading: "Work on matters where method and judgment are visible.",
    lead: "Edison Law is a small regulated practice. Employee roles sit inside the firm, with named supervision. Consultancy is a defined instruction for a piece of work — not a job title on the SRA record. We welcome either route when a genuine requirement is available.",
    intro: [
      "Apply for an employed role when a vacancy is listed. For consultancy, write with the work you can take and the basis on which you would be instructed.",
      "If no role is listed, a concise speculative approach is still welcome. Do not send original identity documents.",
    ],
    openRoles: 0,
    jump: [
      { label: "Careers with us", href: "#careers" },
      { label: "Why Edison Law", href: "#why" },
      { label: "Current opportunities", href: "#vacancies" },
    ],
    cta: { label: "View current opportunities (0)", href: "#vacancies" },
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
          text: "Solicitors, counsel, investigators and forensic specialists work on the same file. Counsel is instructed where advocacy is needed. The person who scoped the investigation is still on it when the evidence is tested.",
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
      text: "The people on the files. Open a profile for the work they actually do.",
    },
    benefits: {
      label: "What you would join",
      heading: "How the practice is run.",
      items: [
        {
          icon: "solicitor",
          title: "Named supervision",
          text: "Every instruction has a named solicitor. Your work is visible on the file, not absorbed into a large team.",
        },
        {
          icon: "evidence",
          title: "The evidential file",
          text: "Investigators, lawyers and forensic specialists sit on the same matter. Method is written down.",
        },
        {
          icon: "discretion",
          title: "Discretion as a habit",
          text: "Financial crime is reputationally sensitive. We recruit people who can be trusted with incomplete facts.",
        },
      ],
    },
    vacancies: {
      label: "Vacancies",
      heading: "Current opportunities.",
      text: "We publish a vacancy when a genuine role or consultancy requirement is available. If none is listed, a speculative approach is still welcome.",
      detail:
        "Write with a short account of the work you want to do, the jurisdiction you are qualified in if you are a lawyer, and a CV. Include location, employment status you seek, and who you would expect to report to. Do not send original identity documents. Mark the subject as a careers enquiry.",
      cta: { label: "Send a careers enquiry", href: "/contact/" },
    },
  },
  about: {
    path: "/about/",
    title: "About Edison Law | London",
    description:
      "Edison Law is an SRA-regulated sole practice in London for financial crime, private prosecution and asset recovery.",
    heading: "A specialist London practice for financial-crime matters.",
    lead: "Edison Law is an SRA-regulated sole practice based in London. The firm advises on criminal, investigative and recovery matters involving fraud and financial misconduct. Each instruction is supervised by a named solicitor, with external counsel and specialist professionals engaged where the matter requires them.",
    cta: { label: "Discuss a matter", href: "/contact/" },
    lifecycle: {
      label: "How a matter is held",
      heading: "Three stages. One file.",
      items: [
        {
          index: "01",
          icon: "evidence",
          title: "Define and preserve",
          text: "We agree the immediate questions, identify urgent risks and preserve the material most likely to matter. Conflict and identity checks are completed before a retainer begins.",
        },
        {
          index: "02",
          icon: "fees",
          title: "Establish and assess",
          text: "The relevant documents, accounts and witness evidence are reviewed. We explain what is established, what remains uncertain and what further work is proportionate.",
        },
        {
          index: "03",
          icon: "solicitor",
          title: "Decide and act",
          text: "We recommend the appropriate legal route, its likely cost and its principal risks. That may involve proceedings, an application for urgent relief, a report to an authority, negotiated resolution or no further action.",
        },
      ],
    },
    difference: {
      label: "What holds the work together",
      heading: "The file is held here.",
      items: [
        {
          title: "Solicitors, then counsel",
          text: "The enquiry is run inside a solicitors' practice. We instruct counsel where advocacy is needed. External investigators and forensic specialists are engaged where the matter requires them, with their role explained.",
        },
        {
          title: "Built for contested facts",
          text: "Cross-border records, wallets, internal fraud and regulatory scrutiny are ordinary in this work. Overseas steps are taken with local counsel where foreign procedure is required.",
        },
        {
          title: "Tools under supervision",
          text: "Where the volume of records is the problem, we may use Cobra AI, an intelligence platform published by IYE Global. Nothing from it is treated as a finding until someone on the matter has reviewed it.",
        },
      ],
    },
    record: {
      label: "On the public record",
      heading: "Facts of the practice — not results of cases.",
      note: "Scale claims, awards and recovery figures are easy to invent. They are also easy to check. The figures below are taken from this site and the public SRA organisation record. We do not publish recoveries, win rates, staff counts as a proxy for credibility, or rankings.",
      items: [
        { value: "6", label: "Practice areas described on this site" },
        { value: "5", label: "Investigation categories" },
        { value: trust.firm.sraNumber, label: "SRA organisation number — open the public record" },
      ],
    },
    clients: {
      label: "Who instructs",
      heading: "Typical instructing clients.",
      note: "We do not publish a client list, logos or testimonials. These are types of instructing client, not named mandates.",
      items: [
        "Individuals and family offices who have lost money to fraud",
        "Companies and financial institutions",
        "Charities and trustees",
        "Professional advisers referring a live matter",
      ],
    },
    heritage: {
      label: "The practice",
      heading: "A solicitors' practice, held in London.",
      text: `${sraLine} Confirm current authorised individuals on the public SRA record. Richard Edison is named on this site as owner of the practice. Job titles here are not a reserved-activity authorisation.`,
    },
    commitments: {
      label: "How the work is done",
      heading: "How the work is done.",
      items: [
        {
          title: "Evidence before a narrative",
          text: "Devices, accounts and originals are preserved first. A story that cannot be exhibited is not used.",
        },
        {
          title: "One matter, named responsibility",
          text: "Solicitors, investigators and forensic specialists sit on the same matter. Each instruction is supervised by a named solicitor.",
        },
        {
          title: "Proportion",
          text: "We explain when pursuing value is unlikely to justify the cost, and when a prosecution is not supported by the evidence.",
        },
        {
          title: "Discretion",
          text: "Financial crime is reputationally sensitive. Enquiries are handled confidentially. Do not send passwords, private keys, seed phrases or original identity documents through the website.",
        },
      ],
    },
  },
  contact: {
    path: "/contact/",
    title: "Contact Edison Law | London",
    description:
      "Send an initial enquiry to Edison Law in London about a private prosecution, asset recovery or financial crime matter. Enquiries are handled confidentially.",
    heading: "Tell us what has happened and what is urgent.",
    lead: "Give us a concise account of the matter, the people or organisations involved and any immediate deadline. This allows us to conduct an initial conflict check and decide whether the issue falls within our practice.",
    urgent: "Do not send passwords, private keys, seed phrases, original identity documents or large volumes of confidential material through this form. Sending an enquiry does not create a solicitor-client relationship.",
    formButton: "Send an initial enquiry",
  },
  legal: {
    path: "/legal-regulatory/",
    title: "Legal and regulatory | Edison Law",
    description: "This page has moved to Regulatory information.",
    heading: "This page has moved.",
    intro:
      "Legal and regulatory information is now published on a single page. Use Regulatory information for the firm's SRA number, standing and related notices.",
    movedTo: "/regulatory-information/",
  },
  regulatoryInformation: {
    path: "/regulatory-information/",
    title: "Regulatory information | Edison Law",
    description: "How Edison Law is authorised, insured, and how client money is handled.",
    heading: "Regulatory information.",
    intro:
      "You should be able to check who we are without calling a marketing line. The public SRA record is the source if anything here is out of date.",
    trustPage: "regulatory",
  },
  complaints: {
    path: "/complaints/",
    title: "Complaints procedure | Edison Law",
    description: "How to complain about Edison Law and how to reach the Legal Ombudsman.",
    heading: "Complaints procedure.",
    intro: "If you are unhappy with our service, tell us. A complaint should be sent to the person named on the Regulatory information and Complaints pages, not only to whoever is handling the matter. We will take the complaint seriously and respond in writing.",
    trustPage: "complaints",
  },
  pricing: {
    path: "/pricing/",
    title: "Pricing | Edison Law",
    description: "How Edison Law charges for work and how estimates are given.",
    heading: "Pricing.",
    intro: "We agree the scope and charging basis before substantive work begins. Most matters are charged by reference to time; a fixed fee may be available for a clearly defined preliminary review or other bounded stage.",
    trustPage: "pricing",
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy | Edison Law",
    description: "How Edison Law handles personal information.",
    heading: "Privacy notice.",
    intro: "This notice explains who controls personal information sent through this website, the purposes for which it is used, and how to exercise your rights.",
    reviewTopic: "data protection enforcement",
    trustPage: "privacy",
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
        text: "We aim to meet WCAG 2.2 AA. Pages use semantic landmarks, a skip link, visible focus, and keyboard-operable navigation. A full independent accessibility audit is not published on this page.",
      },
      {
        heading: "Known limitations",
        text: "Some images are photographic and may not carry a full text equivalent beyond the caption. Search, if enabled, requires JavaScript. If a barrier remains, write via the contact form and describe the page, the problem and the format that would help.",
      },
      {
        heading: "Contact",
        text: "Accessibility queries are handled as ordinary professional correspondence through the contact form.",
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
        text: "We will never ask you for a seed phrase or private key. We will not ask you to send cryptocurrency, cash or identity documents to a personal account. Treat unexpected payment instructions as suspect. Confirm any bank details using a number or address you already hold, not a number in the same message.",
      },
      {
        heading: "Check the site",
        text: "Use the address bar on this website. If a message uses a different domain, a lookalike spelling, or an unexpected email address, do not reply with confidential information.",
      },
      {
        heading: "How to verify",
        text: "Use the contact form on this site, or a number or address you already hold from a previous genuine letter. Do not rely on contact details in an unexpected message. Payment details should be confirmed by a separate, known channel before any transfer.",
      },
    ],
  },
  howWeWork: {
    path: "/how-we-work/",
    title: "How we work | Edison Law",
    description: "How Edison Law takes a matter from first instruction to a legal decision.",
    heading: "A clear route from first instruction to legal decision.",
    intro:
      "The order of the work is the same whether the next step is a private prosecution, a freeze, a report, or a decision to stop. Response times, once a retainer is in place, are set out in client care correspondence and, where published, on the Contact page.",
    blocks: [
      {
        heading: "1. Define and preserve",
        text: "We agree the immediate questions, identify urgent risks and preserve the material most likely to matter. Conflict and identity checks are completed before a retainer begins.",
      },
      {
        heading: "2. Establish and assess",
        text: "The relevant documents, accounts and witness evidence are reviewed. We explain what is established, what remains uncertain and what further work is proportionate. Where the volume of records requires it, Cobra AI (IYE Global) may be used; its output is reviewed on the matter.",
      },
      {
        heading: "3. Decide and act",
        text: "We recommend the appropriate legal route, its likely cost and its principal risks. That may involve proceedings, an application for urgent relief, a report to an authority, negotiated resolution or no further action. Counsel is instructed where advocacy is needed. Local counsel is instructed where foreign procedure is required.",
      },
      {
        heading: "Fees",
        text: `We agree the scope and charging basis before substantive work begins. ${trust.fees.model} See Pricing.`,
      },
      {
        heading: "Who is responsible",
        text: [
          firstContactStatement(),
          "Each matter is supervised by a named solicitor. Job titles on this site are not a reserved-activity authorisation.",
          "Confirm current authorised individuals on the public SRA record.",
        ]
          .filter(Boolean)
          .join(" "),
      },
    ],
  },
  terms: {
    path: "/terms-of-business/",
    title: "Terms of business | Edison Law",
    description: "How a retainer with Edison Law is formed and what it covers.",
    heading: "Terms of business.",
    intro:
      "You are not a client because you sent a web form. A retainer starts when we write to accept instructions on agreed terms.",
    blocks: [
      {
        heading: "No retainer from this website",
        text: "Sending the contact form, or reading these pages, does not create a solicitor-client relationship. We must complete conflict checks and send a client care letter before we act.",
      },
      {
        heading: "What the client care letter will cover",
        text: `Scope of work, who will do it, charging basis, disbursements, VAT, complaints, and how to end the retainer. ${trust.fees.model}`,
      },
      {
        heading: "Your responsibilities",
        text: "Give us accurate facts. Do not destroy devices or accounts we have asked you to hold. Do not send passwords or seed phrases through the website.",
      },
      {
        heading: "Limitation of liability",
        text: trust.insurance.liabilityCap,
      },
      {
        heading: "Governing law",
        text: "The courts of England and Wales. These web pages are general information, not advice on your facts.",
      },
      {
        heading: "Complaints",
        text: "The complaints procedure is published at /complaints/. Legal Ombudsman referral rights are set out there.",
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
