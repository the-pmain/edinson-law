import { firstContactStatement, trust } from "../config/trust.js";

const sraLine = `Edison Law is authorised and regulated by the Solicitors Regulation Authority, SRA number ${trust.firm.sraNumber}.`;

export const home = {
  path: "/",
  title: "Edison Law | Financial crime, private prosecutions and asset recovery in London",
  description:
    "SRA-regulated London solicitors' practice for financial crime investigation, private prosecution and asset recovery. We follow the evidence and say early whether a legal route is realistic. We do not guarantee recoveries.",
  schema: "home",
  sections: {
    hero: {
      descriptor: "Private prosecutions · Asset recovery · Financial crime",
      heading: "Following digital evidence. Building legal cases.",
      lead: "You need to know whether the money can be followed and whether a court in England and Wales will take the facts you already have. Edison Law is an SRA-regulated solicitors' practice in London. We investigate financial crime and advise on private prosecution and recovery only where the evidence will carry it. We will not promise a result the facts cannot support.",
      cta: { label: "Discuss a matter", href: "/contact/" },
      ctaSecondary: { label: "How we work", href: "/how-we-work/" },
    },
    who: {
      label: "Who we are",
      heading: "A London solicitors' practice.",
      lead: `You can check us. ${sraLine} ${trust.firm.regulatorCheckText}`,
      text: "The work is legal-led investigation: preserve what exists, establish what can be proved, and then choose a route — a private prosecution, a freezing application, a civil claim, a report, or no further step. Counsel is instructed where advocacy is needed. Local counsel is instructed where the money sits overseas. We do not claim in-house chambers, a City headquarters, or a laboratory we do not have.",
      actForLabel: "This is usually for you if",
      actFor: [
        "You have lost money to fraud and need a legal route, not a recovery slogan",
        "You are a company, charity or trustee facing internal or payment fraud",
        "You are a professional adviser referring a live matter",
      ],
      actNotForLabel: "We will turn the work away if",
      actNotFor: [
        "You want a guaranteed recovery, conviction or ranking",
        "You need us to invent offices, results or a City headquarters we do not have",
        "You will not let us preserve devices, accounts and originals before a story is written",
      ],
    },
    cobra: {
      label: "Tools on the file",
      heading: "Cobra AI.",
      lead: "On matters where volume or pattern-finding is the problem, we use Cobra AI — an intelligence platform published by IYE Global. It is a tool on the file. It is not a substitute for legal judgment, and it is not a promise that money will come back.",
      text: "IYE Global describes Cobra AI as a system that analyses transactions, relationships, accounts, individuals and behavioural patterns, and can draw in relevant external data, to produce intelligence and leads. Those leads are then reviewed by an investigator. We treat that output the same way we treat any other intelligence: the people who hold the file check it, and it is used only where it can be turned into evidence a court will accept. A model output is not proof.",
      items: [
        {
          title: "What we use it for",
          text: "Mapping networks of payments, entities and people at a scale that is not usefully read by hand — then saying what the picture shows and what it does not.",
        },
        {
          title: "How it is supervised",
          text: "Nothing from the platform is taken as a finding until someone on the file has reviewed it. We do not hand a client a raw export and call it advice.",
        },
        {
          title: "What it is not",
          text: "It is not a recovery product, not an in-house invention, and not used on every matter. IYE Global publishes the full capability list on its own page, including tools we do not run as a matter of course.",
        },
      ],
      sourceNote: "Source — vendor description:",
      sourceLabel: "Cobra AI, IYE Global",
      cta: "Open the Cobra AI page",
    },
    why: {
      label: "Why Edison Law",
      heading: "How the work is run.",
      items: [
        {
          title: "Solicitors, then counsel",
          text: "The file is held here. We instruct counsel where advocacy is needed. The matter is not handed off and forgotten, and we do not describe that as in-house chambers.",
        },
        {
          title: "Evidence before strategy",
          text: "Devices, accounts and originals are held before anyone drafts a narrative. Digital and financial analysis is run so it can be exhibited. We do not overwrite sources or tidy a file that has not been captured.",
        },
        {
          title: "Fees for the work, not for a hope",
          text: "After an initial discussion we provide a written scope and charging basis. Conditional or damages-based arrangements are considered where they are appropriate. Fees are for legal work. They are not a promise that money will come back.",
        },
        {
          title: "Discretion",
          text: "Financial crime is reputationally sensitive. Enquiries are handled confidentially. Do not send passwords, seed phrases or original identity documents through the website.",
        },
        {
          title: "London, with local counsel where required",
          text: "The practice is London-based. Overseas steps are taken with local counsel, registry researchers and investigators in the jurisdictions where the people and the money actually sit — not by listing offices we do not have.",
        },
      ],
    },
    cases: {
      label: "Work of this kind",
      heading: "What we are asked to look at.",
      intro:
        "These are types of matter, not reported results. We do not publish recoveries, sentences, settlement percentages or invented rankings.",
      items: [
        {
          title: "Authorised push payment and payment diversion",
          kind: "Payments",
          jurisdictions: "UK banks, payment institutions, sometimes an overseas cash-out",
          text: "Funds have left through a payment service, correspondent bank or e-money account. The first work is to hold what still exists, map the trail, and say whether an emergency application is realistic before the money moves again.",
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
          text: "Value has moved across wallets, mixers, bridges or exchanges. On-chain data is useful only when its limits are stated. We map what the records show and convert that picture into exhibits — we do not guarantee that coins will be returned.",
        },
        {
          title: "Cross-border facts, London file",
          kind: "Cross-border",
          jurisdictions: "England and Wales, with local counsel where the money sits",
          text: "A UK-facing loss with origins or proceeds overseas. The practice is London-based. Foreign registries, people who have left the jurisdiction, and enforcement elsewhere are handled with local counsel — not by claiming a global network of offices.",
        },
      ],
    },
    standing: {
      label: "How to check this firm",
      heading: "Regulation is the proof, not a ranking.",
      items: [
        `SRA number ${trust.firm.sraNumber} — authorised and regulated by the Solicitors Regulation Authority.`,
        trust.firm.regulatorCheckText,
        "Confirm current authorised individuals on the public SRA organisation record.",
      ],
      note: "We do not display directory rankings, network memberships or press quotes that we have not earned. If a badge, Band 1 listing or recovery figure appears anywhere else online, treat it as unverified until it matches this site and the SRA record.",
      link: "Open the public SRA record",
    },
    profile: {
      label: "The practice",
      heading: "Who you deal with.",
      text: "Richard Edison owns the practice. These are the people who hold the file. Confirm current authorised individuals on the public SRA record.",
      collectiveCaption: "Richard Edison",
      collectiveMark: "Owner",
      collectiveAlt: "Richard Edison, owner of Edison Law",
      collectiveLabel: "The others",
      cta: { label: "All profiles", href: "/people/" },
    },
    insight: {
      label: "Insights",
      heading: "Investigation notes, not marketing copy.",
    },
    london: {
      heading: "London as the legal route.",
      text: "The practice is an SRA-regulated solicitors' firm in London. Work that crosses borders is still held here: the evidential file, the English court, and local counsel where the money actually sits.",
      meta: "London",
      cta: { label: "About the firm", href: "/about/" },
    },
    practiceBar: {
      cta: { label: "All practice areas", href: "/expertise/" },
    },
    cta: {
      heading: "Discuss a matter.",
      text: "Write with the facts you already have. Do not send passwords, seed phrases or original identity documents. We will say whether we can help.",
      cta: { label: "Write to us", href: "/contact/" },
    },
  },
};

export const pages = {
  expertise: {
    path: "/expertise/",
    title: "Legal Expertise | Edison Law, London",
    description:
      "Private prosecutions, asset tracing, crypto fraud, regulatory defence, cross-border recovery and corporate intelligence — six connected practices in London.",
    heading: "Our services.",
    lead: "You have a live problem: a fraud, a trail of money, a regulator, or a decision whether to prosecute. Each page states who the work is for, what the law actually says, how it usually runs, and when we would turn it away.",
  },
  privateProsecutions: {
    path: "/expertise/private-prosecutions/",
    title: "Private Prosecutions Solicitors in London | Edison Law",
    description:
      "Criminal prosecutions from investigation through to trial when public authorities decline to act.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "When authorities decline to act.",
    lead: "The police or Action Fraud have not taken your case on, and you still need to know if a criminal court will. A private prosecution is possible only if the evidence will hold. We assemble the file to a criminal standard, manage disclosure, and instruct counsel. We will advise against a prosecution the evidence cannot carry.",
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
    lead: "You do not know where the money has gone, and you need to know whether chasing it is worth the cost. We locate misappropriated value through banks, nominees, property, companies or wallets. Tracing and freezing are legal work. They are not a guarantee that money will come back.",
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
    heading: "What the chain can prove.",
    lead: "Value has moved across wallets or exchanges, and you need to know what the chain can actually prove. We map hops and cash-outs and convert that picture into exhibits. We have not published recovery totals. Anyone who guarantees that cryptocurrency will be returned is not describing this work honestly.",
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
      "Defence and advisory work for SFO, FCA, HMRC and other regulatory investigations, including dawn raids and interviews under caution.",
    parent: { label: "Expertise", href: "/expertise/" },
    reviewTopic: "SRA and regulatory enforcement policy",
    heading: "When the regulator is already in the room.",
    lead: "A regulator or investigator is already in contact, and you need to know what to say and what to hold. We represent individuals and companies under investigation by the SFO, FCA, HMRC and other bodies. The work is the quality of the file — not a claim that we can close an enquiry because someone here used to work at the agency.",
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
      "Multi-jurisdictional asset recovery, mutual legal assistance, recognition of foreign judgments and enforcement across financial centres and offshore territories.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "More than one legal system, one strategy.",
    lead: "The loss or the money sits outside England, and you need a London file that is honest about what can be done from here. We work with local counsel where the people and the money actually sit. We do not list a count of countries as if it were a network of offices.",
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
    reviewTopic: "sanctions and export control",
    heading: "Know the counterparty before the money moves.",
    lead: "You need to know who you are dealing with before the money or the appointment moves. We conduct confidential, lawful due diligence and integrity checks. We identify undisclosed litigation, sanctions hits and connections — and we state what the records do not show.",
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
    heading: "Establish the facts first.",
    lead: "You do not yet know what happened, and you should not pick a legal route until you do. Investigations here decide whether a private prosecution, a freezing order or a regulatory report is possible — and whether it is worth the cost.",
    schema: "investigations",
    serviceType: "Financial crime investigation",
    intro: [
      "Expertise is the legal route. Investigations are how the file is built. Solicitors, investigators and forensic specialists sit in the same practice, so the person who scopes the enquiry is still on the matter when the evidence is tested.",
      "The work is run in that order: preserve devices, accounts and originals; establish what the documents prove; locate people, entities and value; then file so a defence lawyer could pick the record up cold and still find it honest.",
      "We act for companies, organisations and individuals who have been the victims of crime, and for boards that have found a problem inside the organisation. We do not investigate for entertainment, and we will say early when the material will not support the course a client wants.",
      "Where the volume of records is the problem, we use Cobra AI (IYE Global) as an investigative tool. Its output is reviewed here. It does not replace the file, and it does not decide the legal route.",
    ],
    jump: [
      { label: "What we investigate", href: "#work" },
      { label: "Cobra AI", href: "#cobra-ai" },
      { label: "Who does the work", href: "#investigators" },
      { label: "Instruct", href: "#instruct" },
    ],
    people: {
      label: "Who does the work",
      heading: "Investigators and forensic specialists.",
      text: "The people who build the file. Solicitors direct the investigation and take the legal decisions; these are the specialists they work with from the first day.",
    },
    cta: {
      heading: "Discuss an investigation.",
      text: "Send the facts you already have. Do not send passwords, seed phrases or original identity documents. We will say whether we can help.",
    },
  },
  internalInvestigations: {
    path: "/investigations/internal-investigations/",
    title: "Internal Investigations | Edison Law, London",
    description:
      "Board-level, employee and whistleblower investigations in London, run to a standard that holds if you later prosecute, report or litigate.",
    parent: { label: "Investigations", href: "/investigations/" },
    heading: "When the problem is inside the organisation.",
    lead: "Something inside the business does not add up, and you need a file that will still hold if you later dismiss, report or prosecute. We run the enquiry as if each of those steps is already on the table.",
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
    heading: "What happened, and what you can prove.",
    lead: "You think a fraud has happened, but you cannot yet say who did what or whether the documents will prove it. This work produces a file: witnesses, continuity and a clear account of what is known and what is not.",
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
    heading: "Hold the trail before it moves again.",
    lead: "Money or messages have just left, and you need the trail held before anyone has a look. Payment diversion, authorised push payment fraud, wallets and devices: capture first, then map in a form a court will accept.",
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
    heading: "The facts do not stop at the UK border.",
    lead: "The people or the records sit outside England, and you need facts a London court can actually use. We read the foreign record, find the people, and put those facts into one file. We do not treat a London letterhead as extra-territorial.",
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
        a: "The practice is London-based. We work with local counsel, registry researchers and investigators in the jurisdictions where the people and the money actually sit.",
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
    heading: "Find the value. Then decide.",
    lead: "You need to know where the money has gone, and whether any of it is still there, before you spend on a freeze. Legal remedies come after that answer, not before. We will tell you to stop if the chase is not worth the cost.",
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
      "Notes on evidence, tracing and legal method from Edison Law in London. They explain how a file is built — not case studies, and not results.",
    heading: "Notes from the work.",
    lead: "Short pieces on method. They explain how evidence becomes a legal decision. They are not case studies and they do not report results.",
  },
  people: {
    path: "/people/",
    title: "People | Edison Law, London",
    description:
      "Richard Edison, owner of Edison Law, and the people who work the file. Confirm current authorised individuals on the public SRA record.",
    heading: "Our people.",
    lead: `You will want named humans, not a logo. Richard Edison owns the practice. Job titles on this site are not a reserved-activity authorisation. ${trust.firm.regulatorCheckText}`,
  },
  joinUs: {
    path: "/join-us/",
    title: "Join us | Edison Law",
    description:
      "Careers at Edison Law in London. Lawyers, investigators and forensic specialists in financial crime, private prosecutions and asset recovery.",
    heading: "Join us.",
    lead: "You want to know what the work here actually is: building files that hold up when the other side tests them. We do not keep a public vacancy board.",
    intro: [
      "We recruit and develop people who can take a disordered file — a fraud just discovered, a trail that has already left the banking system — and turn it into a legal position.",
      "The practice is small. Every person is visible on the work: private prosecutions, asset tracing, crypto fraud and cross-border enforcement. You are not a resource on a large matter. You are on the matter.",
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
      "Edison Law is an SRA recognised sole practice in London for financial crime investigation, private prosecution and asset recovery.",
    heading: "A London solicitors' practice.",
    lead: "You need a firm you can check, not a recovery slogan. Edison Law is an SRA recognised sole practice in London. The work is to turn a disordered set of facts into a file that can be tested in court — and to say early when it cannot.",
    lifecycle: {
      label: "How a matter is held",
      heading: "Three stages. One file.",
      items: [
        {
          index: "01",
          title: "Preserve",
          text: "Devices, accounts and originals are held before anyone drafts a narrative. What still exists is captured so it can later be exhibited — not overwritten to make a neater story.",
        },
        {
          index: "02",
          title: "Establish",
          text: "Investigators, forensic specialists and lawyers work the same matter until it is clear what the documents prove, and what they do not. Cobra AI is used where volume or pattern-finding is the problem. Its output is reviewed here.",
        },
        {
          index: "03",
          title: "Advise",
          text: "A private prosecution, a freezing application, a civil claim, a regulatory report — or no further step. Counsel is instructed where advocacy is needed. Local counsel is instructed where people or value sit overseas.",
        },
      ],
    },
    difference: {
      label: "What holds the work together",
      heading: "The file is held here.",
      items: [
        {
          title: "Solicitors, then counsel",
          text: "The enquiry is run inside a solicitors' practice. We instruct counsel where advocacy is needed. The matter is not handed to an unregulated investigator and forgotten, and we do not describe that as in-house chambers.",
        },
        {
          title: "Built for contested facts",
          text: "Cross-border records, wallets, internal fraud and regulatory scrutiny are ordinary in this work. Overseas steps are taken with local counsel where the money actually sits — not by listing offices we do not have.",
        },
        {
          title: "Tools under supervision",
          text: "Where the volume of records is the problem, we use Cobra AI, an intelligence platform published by IYE Global. Nothing from it is treated as a finding until someone on the file has reviewed it. A model output is not proof.",
        },
      ],
    },
    record: {
      label: "On the public record",
      heading: "Facts of the practice — not results of cases.",
      note: "Scale claims, awards and recovery figures are easy to invent. They are also easy to check. The numbers below are taken from this site and the SRA organisation record. We do not publish recoveries, win rates or rankings.",
      items: [
        { value: "6", label: "Connected practices on this site" },
        { value: "5", label: "Lines of investigation" },
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
      heading: "A solicitors' practice, held by its owner.",
      text: `${sraLine} Richard Edison owns the practice: the work, the people and the files. ${trust.firm.regulatorCheckText}`,
    },
    commitments: {
      label: "How the work is done",
      heading: "What we actually commit to.",
      items: [
        {
          title: "Evidence before a narrative",
          text: "Devices, accounts and originals are held first. A story that cannot be exhibited is not used.",
        },
        {
          title: "One file",
          text: "Solicitors, investigators and forensic specialists sit on the same matter. The person who scopes the enquiry is still there when the evidence is tested.",
        },
        {
          title: "Proportion",
          text: "We say early when pursuing value is not worth the cost, and when a prosecution the evidence cannot carry should not be run.",
        },
        {
          title: "Discretion",
          text: "Financial crime is reputationally sensitive. Enquiries are handled confidentially. Do not send passwords, seed phrases or original identity documents through the website.",
        },
      ],
    },
  },
  contact: {
    path: "/contact/",
    title: "Contact Edison Law | London",
    description:
      "Write to Edison Law in London about a private prosecution, asset recovery or financial crime matter. Enquiries are handled confidentially.",
    heading: "Discuss a matter.",
    lead: "Write with the facts you already have. Do not send passwords, seed phrases or original identity documents through this form. Describe the situation. We will say whether we can help.",
    urgent: "If a freezing application may be needed in days rather than weeks, use the form below and mark the matter as urgent.",
  },
  legal: {
    path: "/legal-regulatory/",
    title: "Legal and regulatory | Edison Law",
    description: "Regulatory standing, professional indemnity, client money and notices for Edison Law.",
    heading: "Legal and regulatory.",
    intro:
      "You should be able to check who we are without calling a marketing line. The public SRA record is the source if anything here is out of date.",
    trustPage: "regulatory",
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
    intro: "If you are unhappy with our service, tell us. We will take the complaint seriously and respond in writing.",
    trustPage: "complaints",
  },
  pricing: {
    path: "/pricing/",
    title: "Pricing | Edison Law",
    description: "How Edison Law charges for work and how estimates are given.",
    heading: "Pricing.",
    intro: "You should know how you will be charged before you instruct.",
    trustPage: "pricing",
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy | Edison Law",
    description: "How Edison Law handles personal information.",
    heading: "Privacy notice.",
    intro: "You have a right to know who controls your data and how to complain.",
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
        text: "We aim to meet WCAG 2.2 AA. Pages use semantic landmarks, a skip link, visible focus, and keyboard-operable navigation.",
      },
      {
        heading: "If something is in the way",
        text: "Write via the contact form and describe the page, the barrier and the format that would help. We will respond as part of ordinary professional correspondence.",
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
        text: "Use the contact form from an address we already know, or write from a number or address you already hold. Do not rely on contact details in an unexpected message.",
      },
    ],
  },
  howWeWork: {
    path: "/how-we-work/",
    title: "How we work | Edison Law",
    description: "How Edison Law holds a file: preserve, establish, advise — and when we turn work away.",
    heading: "How we work.",
    intro:
      "You should know the order of the work before you instruct. It is the same whether the next step is a private prosecution, a freeze, a report, or a decision to stop.",
    blocks: [
      {
        heading: "1. Preserve",
        text: "Devices, accounts and originals are held before anyone drafts a narrative. What still exists is captured so it can later be exhibited. Timescale: same day to 48 hours once instructed, unless the volume makes that impossible — in which case we say so.",
      },
      {
        heading: "2. Establish",
        text: `Investigators, forensic specialists and solicitors work the same matter until it is clear what the documents prove, and what they do not. Cobra AI (IYE Global) is used where volume or pattern-finding is the problem. Its output is reviewed here. ${trust.fees.scopeTimescale}`,
      },
      {
        heading: "3. Advise",
        text: "A private prosecution, a freezing application, a civil claim, a regulatory report — or no further step. Counsel is instructed where advocacy is needed. Local counsel is instructed where people or value sit overseas.",
      },
      {
        heading: "When we turn work away",
        text: "We will not run a prosecution the evidence cannot carry, chase value that is not worth the cost, or promise a recovery. We will not accept seed phrases, passwords or original identity documents through the website.",
      },
      {
        heading: "Fees",
        text: `You pay for work done. ${trust.fees.model} See Pricing.`,
      },
      {
        heading: "Who holds the file",
        text: [
          firstContactStatement(),
          trust.firm.regulatorCheckText,
          "Job titles on this site are not a reserved-activity authorisation.",
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
