import { site } from "../../site.config.js";

const address = `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.postcode}`;

export const home = {
  path: "/",
  title: "Edison Law | Financial crime, tax and digital evidence solicitors in London",
  description:
    "London solicitors for legal-led investigations and strategic advice across financial crime, tax disputes and digital-asset matters.",
  schema: "home",
  sections: {
    hero: {
      descriptor: "Crypto investigations & digital asset disputes",
      heading: "Following digital evidence.<br>Building legal cases.",
      lead: "Legal-led investigations and strategic advice across financial crime, tax and digital-asset disputes.",
      cta: { label: "Discuss a matter", href: "/contact/" },
    },
    method: {
      label: "Method",
      heading: "Trace. Analyse. Act.",
      lead: "The sequence is the service. Facts are gathered and tested before a legal route is chosen.",
      steps: [
        {
          title: "Trace",
          text: "Identify the records that matter: accounts, wallets, messages, filings and the people who can speak to them.",
        },
        {
          title: "Analyse",
          text: "Test provenance, gaps and competing explanations. Separate what can be proved from what is only suspected.",
        },
        {
          title: "Act",
          text: "Advise on a proportionate next step: disclosure, defence, negotiation, or a decision to wait for better evidence.",
        },
      ],
    },
    profile: {
      label: "People",
      heading: "A London sole practice, named and regulated.",
      text: `${site.people[0].name} is the solicitor at Edison Law. The firm has been an SRA recognised sole practice since ${site.sraSince}, based in Wimbledon.`,
    },
    insight: {
      label: "Insights",
      heading: "Investigation notes, not marketing copy.",
    },
    london: {
      label: "London and beyond",
      heading: "A London legal route, explained in plain English.",
      text: "Matters often begin in more than one country and more than one system. We say what a London solicitor can and cannot do, and we work with other advisers without theatre.",
    },
    cta: {
      heading: "Discuss a matter, discreetly.",
      text: "Write with the facts you already have. We will say what is known, unknown and dependent on evidence.",
      cta: { label: "Contact Edison Law", href: "/contact/" },
    },
  },
};

export const pages = {
  expertise: {
    path: "/expertise/",
    title: "Expertise | Edison Law",
    description: "Financial crime, tax disputes, crypto investigations and digital asset disputes.",
    heading: "Work we take on.",
    lead: "Four connected practices. Each page states the problem, the scope and the method — not a catalogue of tools.",
  },
  financialCrime: {
    path: "/expertise/financial-crime/",
    title: "Financial Crime Solicitors in London | Edison Law",
    description: "Legal-led financial crime investigations, defence and advisory work in London.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Establish the facts before the allegation hardens.",
    lead: "Financial crime work fails when narrative runs ahead of evidence. We investigate, advise and defend from the records.",
    when: [
      "A suspected fraud, misappropriation or false accounting issue has surfaced.",
      "Assets may need to be traced, restrained or explained.",
      "You have been asked to account for a transaction trail you did not design.",
    ],
    scope: [
      "Investigations and internal fact-finding with legal privilege in mind.",
      "Defence and advisory work in criminal and related regulatory settings.",
      "Confiscation, restraint and asset-tracing strategy.",
      "Fraud and dishonest-assistance questions that sit across companies and individuals.",
    ],
    approach:
      "We start with the file that already exists, then decide what still needs to be obtained. The first useful output is usually a position note: what can be said, what cannot, and the risk of saying it too early.",
    faqs: [
      {
        q: "Do you recover stolen money as a standard service?",
        a: "No. Recovery is sometimes possible and often not. We will not promise an outcome that the evidence does not support.",
      },
      {
        q: "Can you work with forensic accountants or investigators?",
        a: "Yes, where that is useful and clearly scoped. Legal work and any separate provider are identified as such.",
      },
    ],
  },
  tax: {
    path: "/expertise/tax-disputes-resolution/",
    title: "Tax Disputes & Resolution Solicitors in London | Edison Law",
    description: "Advice on HMRC enquiries, disclosure, settlement and tax investigations.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Resolve the dispute that the numbers created.",
    lead: "We analyse the enquiry, the disclosure and the litigation risk, then advise on a route that matches the evidence.",
    when: [
      "HMRC has opened or widened an enquiry.",
      "A civil matter may become a criminal investigation.",
      "Disclosure, settlement or litigation support is needed.",
    ],
    scope: [
      "HMRC enquiries and information notices.",
      "Civil and criminal tax investigations.",
      "Disclosure and settlement strategy.",
      "Tax litigation support with other counsel where required.",
    ],
    approach:
      "Tax disputes are won or lost on the quality of the file. We identify the documents that decide the issue, the gaps that create risk, and the moment when negotiation is more useful than correspondence.",
    faqs: [
      {
        q: "Will you tell HMRC more than is required?",
        a: "No. Disclosure should be accurate and sufficient. It should not be a narrative offered in hope.",
      },
      {
        q: "Do you prepare tax returns?",
        a: "The firm’s published work is dispute and investigation advice. Accountancy work, if needed, is a separate engagement.",
      },
    ],
  },
  crypto: {
    path: "/expertise/crypto-investigations/",
    title: "Crypto Investigations Solicitors in London | Edison Law",
    description: "Blockchain investigations, wallet analysis and legal strategy for digital-asset matters.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Trace the facts before choosing the legal route.",
    lead: "We analyse transaction evidence, preserve the material that matters and advise on proportionate next steps.",
    when: [
      "Value has moved across wallets or exchanges and the legal question is still forming.",
      "You need an evidence map that a court or counterparty can understand.",
      "A recovery service has already made promises the records do not support.",
    ],
    scope: [
      "Blockchain investigations and wallet analysis.",
      "Evidence preservation and provenance.",
      "Advice on civil, criminal or regulatory next steps.",
      "Working with other lawyers who need a court-ready account of the trail.",
    ],
    approach:
      "On-chain data is only useful when its limits are stated. We map what the records show, what they do not show, and which legal decisions actually turn on that difference.",
    faqs: [
      {
        q: "Can you guarantee that crypto will be recovered?",
        a: "No. Anyone who guarantees recovery is not describing this work honestly.",
      },
      {
        q: "Do you use a proprietary tracing product?",
        a: "Tools are chosen for the matter. We do not lead with software. The legal question comes first.",
      },
    ],
  },
  digitalAssets: {
    path: "/expertise/digital-asset-disputes/",
    title: "Digital Asset Disputes Solicitors in London | Edison Law",
    description: "Ownership, control and dispute strategy for digital assets.",
    parent: { label: "Expertise", href: "/expertise/" },
    heading: "Decide who controls the asset, then decide what to do.",
    lead: "Disputes about digital assets are usually disputes about records, access and authority. We start there.",
    when: [
      "Two parties claim the same wallet, token or account.",
      "A platform, exchange or counterparty is holding value and will not release it.",
      "A business needs a legal position on assets that never existed as paper certificates.",
    ],
    scope: [
      "Ownership and control disputes.",
      "Evidence and recovery strategy.",
      "Contract and trust questions that sit on top of the technical facts.",
      "Cross-border coordination with other advisers.",
    ],
    approach:
      "We translate the technical position into issues a court can try: title, possession, breach, and the practical limits of any order.",
    faqs: [
      {
        q: "Is this the same as a crypto recovery service?",
        a: "No. This is legal work. Any investigative assistance is scoped, and outcomes remain evidence-dependent.",
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
    description: "The solicitor at Edison Law, London.",
    heading: "Who you deal with.",
    lead: "Edison Law is an SRA recognised sole practice. The solicitor is named below. Extended biography will be published only after the firm confirms it.",
  },
  about: {
    path: "/about/",
    title: "About Edison Law | London",
    description: "A London law firm combining legal strategy with evidence-led investigation.",
    heading: "Legal clarity where the records are difficult.",
    blocks: [
      {
        heading: "Purpose",
        text: "To bring legal clarity to financial wrongdoing, complex tax disputes and evidence hidden across digital systems.",
      },
      {
        heading: "Promise",
        text: "Edison turns fragmented facts into an intelligible legal position and a practical route forward.",
      },
      {
        heading: "Position",
        text: "A London law firm combining legal strategy with evidence-led investigation in matters where finance, technology and regulation converge.",
      },
      {
        heading: "Office",
        text: `The head office recorded with the SRA is ${address}.`,
      },
    ],
  },
  contact: {
    path: "/contact/",
    title: "Contact | Edison Law",
    description: "Write to Edison Law about a financial crime, tax or digital-asset matter.",
    heading: "Write with what you know.",
    lead: "Do not send passwords, seed phrases or original identity documents through this form. Describe the situation. We will say whether we can help.",
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
        text: "The SRA record lists authority for the exercise of a right of audience, conduct of litigation, reserved instrument activities, probate activities and the administration of oaths. The firm’s published practice on this site is financial crime, tax disputes and digital-asset work.",
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
      `Write to ${site.people[0].name} at ${site.email} or to ${address}. Mark the letter as a complaint.`,
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
        text: "The SRA Transparency Rules require published prices for certain defined services. The work described on this site — financial crime, tax disputes and digital-asset matters — is scoped case by case. We do not publish a menu of fixed fees for that work because the evidence, forum and urgency change the cost.",
      },
      {
        heading: "How we quote",
        text: "After an initial discussion we provide a written scope, the charging basis, likely disbursements and VAT. If we cannot help, we say so.",
      },
      {
        heading: "No outcome-based promises",
        text: "Fees are for legal work. They are not contingent on recovery of crypto-assets or any other result.",
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
