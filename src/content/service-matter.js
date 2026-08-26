import { isPending, trust } from "../config/trust.js";

export const serviceMatter = {
  privateProsecutions: {
    whenHeading: "When a private prosecution may be appropriate",
    forWhom: [
      "A report to the police, Action Fraud or another public body has produced no investigation or charge, and the facts may still support a criminal case.",
      "The loss is serious enough that proceedings in the magistrates’ court or the Crown Court are a realistic option, not a gesture.",
      "You need a written view on merit, disclosure and cost before committing to a prosecution file.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "A civil claim, regulatory report or further investigation may be more proportionate where the criminal evidential test is not met or recovery is the primary objective. We address that choice at the beginning rather than treating prosecution as the automatic answer.",
    law: {
      heading: "Prosecutorial duties",
      text: "A private prosecution is a criminal case brought by someone other than the Crown. Section 6 of the Prosecution of Offences Act 1985 preserves that right. The case is judged to the same standard as a public prosecution: the Criminal Procedure and Investigations Act 1996 disclosure duties apply, and the Criminal Procedure Rules apply in the magistrates’ court and the Crown Court. The Crown Prosecution Service may take the case over under section 6(2) of the 1985 Act.",
    },
    processHeading: "How a prosecution file is built",
    process: [
      {
        title: "Initial evidence assessment",
        text: "We review what is already in hand, identify gaps, and say whether the facts can meet the criminal standard and whether the likely cost is proportionate.",
      },
      {
        title: "Investigation and witness evidence",
        text: "Statements, continuity and source records are assembled so the file can be tested. Unused material is identified as the enquiry proceeds, not at the last minute.",
      },
      {
        title: "Disclosure and prosecutorial duties",
        text: "Schedules and unused material are prepared on the assumption that the defence and, if it takes the case over, the CPS will read the file cold.",
      },
      {
        title: "Commencing proceedings and instructing counsel",
        text: "If proceedings are justified, the charge decision is taken, the case is issued, and specialist counsel is instructed for advocacy. We do not invent a trial date.",
      },
      {
        title: "Costs, timescales and principal risks",
        text: "Fees, disbursements, the possibility of a costs order, and the separate question of confiscation or compensation after any conviction are set out in writing before the case is issued.",
      },
    ],
    risks: [
      "The CPS can take the case over, continue it, or stop it.",
      "A weak file will be tested in disclosure and at trial. Costs, including a possible costs order, can follow a failed case.",
      "A defendant who has spent or moved the money may leave little to recover even after conviction.",
    ],
    faqs: [
      {
        q: "The police have closed my report. Can you still prosecute?",
        a: "Sometimes. A declined public investigation does not create a right to a private one. We look at whether the evidence can meet the criminal standard and whether the cost is proportionate.",
      },
      {
        q: "Is a private prosecution always the right route?",
        a: "No. A civil claim, a freezing application, a regulatory report or no further step may be the better answer. We address that before you commit.",
      },
      {
        q: "Can this run at the same time as a civil claim?",
        a: "Yes, where the facts support both. Restraint, confiscation, freezing and a civil claim are sequenced so one does not wreck the other.",
      },
      {
        q: "Who appears in court?",
        a: "Instructed counsel, in the magistrates’ court or the Crown Court as the case requires.",
      },
      {
        q: "Will the CPS take it over?",
        a: "They may. Section 6(2) of the Prosecution of Offences Act 1985 allows it. We plan the file on that basis.",
      },
      {
        q: "How long until trial?",
        a: "It depends on the court diary, disclosure and whether the case is summary, either-way or indictable. We will not invent a hearing date.",
      },
      {
        q: "What does it cost if we lose?",
        a: "You remain responsible for our fees and disbursements as agreed in the retainer, and there is a risk of a costs order. We set that out in writing before the case is issued.",
      },
    ],
  },
  assetTracing: {
    whenHeading: "Early questions",
    forWhom: [
      "Money, property or other value has left your control and the destination is unclear.",
      "A defendant appears to have nothing, and that needs to be tested before substantial costs are incurred.",
      "Urgent freezing, proprietary or disclosure relief may be required once assets can be identified.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If reachable value cannot be identified, or if the cost of enforcement is likely to exceed any recovery, the honest next step may be to stop, to pursue a narrower civil claim, or to wait for further information. Tracing is a means of deciding that, not a reason to spend indefinitely.",
    law: {
      heading: "Remedies, not a pot of money",
      text: "Freezing injunctions in the High Court are usually sought under the court’s equitable jurisdiction and CPR Part 25. Worldwide freezing orders, proprietary injunctions, disclosure orders and receivership are separate remedies with different tests. They do not create assets. Tracing in equity follows value; it is not a guarantee that a bank, a nominee or a wallet can be made to pay.",
    },
    processHeading: "How a recovery strategy is formed",
    process: [
      {
        title: "Early asset and enforceability assessment",
        text: "We identify what value can be shown, where it sits, who appears to control it, and whether pursuing it is economically worthwhile.",
      },
      {
        title: "Bank, company, property and digital-asset enquiries",
        text: "Payment records, filings, land and company searches, and digital-asset records are used to build a picture that can later be exhibited.",
      },
      {
        title: "Freezing and disclosure remedies",
        text: "If the evidence will support it, we advise on freezing, proprietary and disclosure applications, including the usual cross-undertaking in damages.",
      },
      {
        title: "Overseas assets and local counsel",
        text: "Where assets or respondents sit outside England and Wales, we identify when foreign-law advice is required and instruct local counsel with your approval.",
      },
      {
        title: "Enforcement economics",
        text: "An asset that exists is not always an asset that can be frozen, charged or sold. We keep the likely recovery under review against the next stage of cost.",
      },
    ],
    risks: [
      "A freezing order does not itself seize value. Assets can be offshore, encumbered, spent or held by someone who will contest the claim.",
      "A cross-undertaking in damages is usual. If the injunction was wrongly granted, you may have to pay.",
      "Banking or on-chain data can run out. Inference is not proof of control.",
    ],
    faqs: [
      {
        q: "Can you guarantee recovery?",
        a: "No. We will say early when there is value to pursue, and equally early when the trail ends.",
      },
      {
        q: "What is a worldwide freezing order?",
        a: "It is a High Court injunction restraining disposal of assets. It does not itself seize them. The usual tests for interim relief still have to be met.",
      },
      {
        q: "Do you work with forensic accountants?",
        a: "Yes, on the same matter where the numbers require it. Tracing, freezing and enforcement are treated as one strategy.",
      },
      {
        q: "How fast can you apply?",
        a: "If the facts support urgency, applications are built as quickly as the evidence allows. Incomplete records slow that down.",
      },
      {
        q: "What if the defendant lives abroad?",
        a: "Service, recognition and enforcement need local counsel where the person or the asset sits. We are a London practice.",
      },
      {
        q: "Are your fees taken from recovered money?",
        a: "Only if a lawful damages-based or similar arrangement is agreed in writing. Otherwise you pay for the work as scoped. See Pricing.",
      },
    ],
  },
  cryptoFraud: {
    whenHeading: "When digital-asset records matter",
    forWhom: [
      "Value has moved across wallets, bridges or exchanges and you need to know what the records actually prove.",
      "An exchange or service provider may be holding a frozen balance.",
      "A payment diversion or authorised push payment fraud has just occurred and the trail may still be moving.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the trail has cashed out, if attribution cannot be established beyond inference, or if the only material is an unverified screenshot, the useful work may be a limited preservation note rather than proceedings. We say that before substantial tracing costs are incurred.",
    law: {
      heading: "Property, disclosure and the limits of the chain",
      text: "English courts have treated cryptoassets as property for the purpose of injunctions and proprietary claims. Emergency relief is still an ordinary High Court application under CPR Part 25. On-chain data is a record of transfers. It does not, on its own, prove who controlled a key, or that an exchange must pay you.",
    },
    processHeading: "From records to a legal case",
    process: [
      {
        title: "Immediate preservation steps",
        text: "Transaction identifiers, exchange correspondence, device images and timestamps are held. We do not overwrite wallets or ask you to test a seed phrase.",
      },
      {
        title: "Wallet and transaction analysis",
        text: "Confirmed transfers are mapped through wallets, bridges and identifiable services, with tool versions and timestamps recorded for later exhibit.",
      },
      {
        title: "Attribution: what is established and what remains inference",
        text: "Clustering and similar techniques are marked as inference. Mixers, missing exchange data and unverified screenshots are treated as limits, not footnotes.",
      },
      {
        title: "Platform engagement and disclosure",
        text: "Where a platform, exchange or other institution may hold relevant records or frozen balances, we advise on letters, preservation requests and formal disclosure routes.",
      },
      {
        title: "Injunctions, proprietary claims and prosecution options",
        text: "If the picture supports it, we advise on urgent relief, proprietary claims or a criminal route. If it does not, we say so.",
      },
    ],
    extraBlocks: [
      {
        heading: "Fraud-recovery warning",
        text: "Edison Law will never ask you for a seed phrase or private key. We cannot reverse a blockchain transaction. Anyone who guarantees that cryptocurrency will be returned, or who asks you to send coins or keys to ‘secure’ them, is not describing this work honestly. See the fraud warning.",
      },
    ],
    risks: [
      "Coins can leave a venue before an order bites.",
      "An exchange outside England and Wales may not act on a London letter. Local process is then a separate cost.",
      "Clustering is inference. Presenting it as fact will be tested.",
    ],
    faqs: [
      {
        q: "Can you guarantee that crypto will be recovered?",
        a: "No. Anyone who guarantees recovery is not describing this work honestly.",
      },
      {
        q: "Will you ask me for my seed phrase?",
        a: "No. We will never ask for a seed phrase or private key. Treat any such request as a fraud. See the fraud warning.",
      },
      {
        q: "Can you reverse a blockchain transaction?",
        a: "No. A recorded transfer cannot be undone by a solicitor. Recovery, if it is possible at all, depends on later legal process against a person or an institution that still holds value.",
      },
      {
        q: "Is a blockchain explorer printout enough?",
        a: "No. Provenance, timestamps, tool versions and the difference between a confirmed hop and a cluster have to be in the exhibit.",
      },
      {
        q: "What if the coins went through a mixer?",
        a: "That usually limits what can be said. The limit belongs in the advice.",
      },
      {
        q: "Which court?",
        a: "Urgent property and injunction work is typically the High Court in England and Wales. Criminal routes, if any, are a separate decision.",
      },
    ],
  },
  regulatory: {
    whenHeading: "When an investigation has started, or is about to",
    forWhom: [
      "A dawn raid, interview under caution or information notice has landed.",
      "An internal investigation may need to be reported, and the file has to be accurate when it is.",
      "Civil, employment or recovery proceedings may run in parallel with a regulatory or criminal enquiry.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the immediate need is a civil recovery, an employment process or a limited internal review, those should be scoped as such rather than treated as interchangeable with a defence to a statutory investigation. We identify the authority, its powers and the client’s objective before a single response is sent.",
    law: {
      heading: "Powers differ by authority",
      text: "Interviews under caution are governed by the Police and Criminal Evidence Act 1984 and the PACE Codes. Compulsory powers, privilege and ‘use’ restrictions are technical and vary by statute. The paragraphs below are a starting map, not a substitute for advice on a named notice.",
    },
    authorities: [
      {
        heading: "Serious Fraud Office",
        text: "The SFO investigates and prosecutes serious or complex fraud, including bribery and corruption falling within its remit. It has compulsory interview and document powers under the Criminal Justice Act 1987. Those powers, the status of answers given under compulsion, and the interaction with a later prosecution are distinct from an ordinary police interview. Timing, privilege and what is said in the first response matter.",
      },
      {
        heading: "Financial Conduct Authority",
        text: "The FCA’s investigation and enforcement work sits primarily under the Financial Services and Markets Act 2000 and the Handbook. Notices, interviews, skilled-person reviews and settlement discussions follow the authority’s own procedure. An authorised firm, an individual at a firm, and an unauthorised person are not in the same position. We advise by reference to the actual notice and the relevant part of the Handbook, not a generic ‘regulator’ script.",
      },
      {
        heading: "HMRC",
        text: "HMRC information powers sit mainly in the Taxes Management Act 1970 and related tax statutes. A civil enquiry, a Code of Practice 8 or 9 investigation, and a criminal investigation are different processes with different consequences. Where tax advice is required, we coordinate with specialist tax advisers rather than treating an HMRC letter as if it were an SFO or FCA notice.",
      },
    ],
    processHeading: "How the first response is controlled",
    process: [
      {
        title: "Dawn raids and urgent first response",
        text: "Who may speak, what must be preserved, and what must not be deleted. Privilege is identified early.",
      },
      {
        title: "Notices and compulsory powers",
        text: "The notice is read against the actual statute and procedure. We advise on scope, timing and what a sufficient response looks like.",
      },
      {
        title: "Interviews under caution",
        text: "Whether to attend, how to prepare, and what the papers show are decisions taken on the facts of the allegation, not as a website slogan.",
      },
      {
        title: "Internal investigations and reporting decisions",
        text: "If the organisation also needs an internal enquiry, hold, access and privilege are settled before interviews start. Notification to an authority is a legal judgment on the facts.",
      },
      {
        title: "Parallel civil, employment or recovery proceedings",
        text: "A related claim, dismissal or recovery can collide with the investigation if it is not sequenced. We treat that as part of the advice.",
      },
      {
        title: "Resolution, challenge or defence",
        text: "Settlement, a challenge to the process, or a defence to proceedings — only as the facts and the forum allow. We will not describe an investigation as closed unless it is.",
      },
    ],
    risks: [
      "Saying too much can waive privilege or create a narrative you cannot later support.",
      "Saying too little, or deleting material, can become a separate allegation.",
      "A parallel civil or recovery case can collide with a defence if it is not sequenced.",
    ],
    faqs: [
      {
        q: "Will you tell a regulator more than is required?",
        a: "No. Disclosure should be accurate and sufficient. It should not be a story offered in hope.",
      },
      {
        q: "Can defence run with recovery against someone else?",
        a: "Yes, where the facts support it. Sequencing is part of the advice.",
      },
      {
        q: "Should I attend an interview under caution?",
        a: "That depends on the allegation, the papers and PACE. We will not give a blanket yes or no on a website.",
      },
      {
        q: "What is a dawn raid?",
        a: "A search under warrant or statutory power. The first hours are about hold, privilege and who speaks. Do not destroy devices.",
      },
      {
        q: "Are your fees covered by insurance?",
        a: trust.fees.thirdPartyFunding,
      },
    ],
  },
  crossBorder: {
    whenHeading: "When more than one legal system is involved",
    forWhom: [
      "Evidence, respondents or assets sit outside England and Wales.",
      "You need service, evidence gathering, interim relief or enforcement in more than one country.",
      "A foreign judgment or arbitration award may need to be recognised, or an English order recognised abroad.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the only useful step is in a court we cannot usefully reach, or if recognition and enforcement will cost more than they return, the honest advice may be a narrower English claim, a local instruction only, or no further action. We set that out before parallel proceedings multiply.",
    law: {
      heading: "Forum, service and recognition",
      text: "Service out of the jurisdiction, letters of request and mutual legal assistance follow the Civil Procedure Rules, the Crime (International Co-operation) Act 2003 where criminal, and the law of the receiving state. Recognition of foreign judgments and arbitration awards depends on the country and the instrument. None of that is a global network of Edison Law offices.",
    },
    extraBlocks: [
      {
        heading: "London practice, local counsel where required",
        text: "We are a London practice. Where foreign-law advice or local procedure is required, we identify and instruct appropriately qualified local counsel with the client's approval.",
      },
    ],
    processHeading: "One strategy across several systems",
    process: [
      {
        title: "Jurisdiction and forum assessment",
        text: "Which claim, in which court, and in which order. A UK file that pretends the world is England will fail.",
      },
      {
        title: "Location of defendants, evidence and assets",
        text: "We map where the people, the records and the value actually sit before anyone files.",
      },
      {
        title: "Service and evidence gathering abroad",
        text: "Service, letters of request and lawful collection follow the rules of the place of collection. Local counsel is instructed when that step is real.",
      },
      {
        title: "Interim relief and recognition",
        text: "An English freezing order does not automatically bite abroad. Recognition, mirroring or a local application is a separate question.",
      },
      {
        title: "Local counsel and cost control",
        text: "Overseas lawyers, translation and certification are scoped as disbursements. Parallel cases are coordinated so one does not ambush the other.",
      },
      {
        title: "Enforcement planning",
        text: "Or a decision to stop, if recognition will cost more than it returns.",
      },
    ],
    risks: [
      "Foreign courts take time and can refuse recognition.",
      "Serving a defendant who has left the UK can fail if they cannot be found.",
      "Translation, apostille and local fees add cost that a London estimate will miss if it is not scoped.",
    ],
    faqs: [
      {
        q: "Do you have offices overseas?",
        a: "No. We are a London practice. Where foreign-law advice or local procedure is required, we identify and instruct appropriately qualified local counsel with the client's approval.",
      },
      {
        q: "Can you serve someone who has left the country?",
        a: "Locating them is investigative work. Service then follows the rules of the place of service.",
      },
      {
        q: "Will an English freezing order bite abroad?",
        a: "Only if it is recognised or mirrored locally, or if a bank in this jurisdiction holds the asset. We will say which of those is real.",
      },
      {
        q: "What about mutual legal assistance?",
        a: "Criminal MLA is a state-to-state process. It is slow and not in our gift. We advise on whether it is worth waiting for.",
      },
      {
        q: "Can you enforce an arbitration award?",
        a: "Often under the Arbitration Act 1996, subject to the usual defences. Enforcement is not a clerical step.",
      },
    ],
  },
  corporateIntelligence: {
    whenHeading: "Before exposure becomes loss",
    forWhom: [
      "A transaction, investment or appointment needs a confidential look at the counterparty first.",
      "You need to know whether material claims, insolvency or sanctions concerns exist.",
      "You want a realistic view of whether a future judgment is likely to have practical value.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the question is already a live claim, a regulatory investigation or a private prosecution, those pages describe the work. Pre-litigation enquiry is for a defined legal or commercial purpose. It is not a licence for unlawful surveillance or a smear.",
    law: {
      heading: "Lawful basis, privacy and proportionality",
      text: "Open-source and registry research is not a licence to process personal data without a lawful basis under UK GDPR and the Data Protection Act 2018. If the output later becomes litigation or a prosecution, it has to have been obtained in a way that can be explained. We do not use methods we could not defend.",
    },
    processHeading: "How a confidential review is scoped",
    process: [
      {
        title: "Pre-transaction and pre-appointment enquiries",
        text: "The purpose, the questions and what we will not do are agreed before work starts. Covert steps are taken only on instruction and only by lawful means.",
      },
      {
        title: "Counterparty and beneficial-ownership research",
        text: "Filings, connections and control are examined so far as the public and paid record allows.",
      },
      {
        title: "Litigation, insolvency and sanctions checks",
        text: "Published lists and related records are searched. Screening is only as good as the list and the identifiers you give us.",
      },
      {
        title: "Pre-action asset assessment",
        text: "Whether a future judgment is likely to have practical value is part of the note, with the limits of the record stated.",
      },
      {
        title: "Lawful basis, privacy and proportionality",
        text: "The enquiry is scoped for a defined purpose. A visible step is identified before it is taken.",
      },
      {
        title: "How findings are reported",
        text: "What is established, what is inference, and what the records do not show. Sources and limitations are recorded for legal review.",
      },
    ],
    risks: [
      "Public records are incomplete. Absence of a hit is not proof of virtue.",
      "A visible step can tip off the subject. We say so before we take it.",
      "Overseas data can be thin, delayed or unreliable.",
    ],
    faqs: [
      {
        q: "Is this the same as instructing private investigators?",
        a: "Field and open-source enquiry can be part of the work. It is run so the product can later sit on a litigation or prosecution file if required.",
      },
      {
        q: "Will the subject know?",
        a: "The default is confidential. We say if a step would make the enquiry visible, and we do not take that step without instruction.",
      },
      {
        q: "Do you guarantee you will find adverse information?",
        a: "No. We report what the records show. A clean picture is still a result.",
      },
      {
        q: "Is this legal advice?",
        a: "When a solicitor here directs it and a retainer says so, the advice on risk and next step is legal work. A raw dump of search results is not.",
      },
      {
        q: "How is personal data handled?",
        a: "Under UK GDPR. See the privacy notice.",
      },
    ],
  },
  internalInvestigations: {
    whenHeading: "When the problem is inside the organisation",
    forWhom: [
      "A whistleblower report, unexplained payments or a gap in the accounts has reached the board.",
      "Employee or fiduciary misconduct needs to be established before anyone is dismissed or reported.",
      "You may have to tell a regulator or insurers, and the file has to be accurate when you do.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "An employment process can sit alongside this work, but it is not a substitute for an evidential file that may later be read by a regulator, a defendant or a judge. If the board already wants a predetermined finding, an investigation will not make that finding honest.",
    law: {
      heading: "Privilege, employment and reporting",
      text: "Employment law, regulatory notification duties and, if the facts are criminal, the same evidential standards as any later prosecution all sit on the same events. Privilege in internal investigations is easy to lose if the purpose and the audience are muddled. We identify hold, access and privilege before anyone is put on notice.",
    },
    processHeading: "How an internal investigation is run",
    process: [
      {
        title: "Scope, hold and privilege",
        text: "Devices and accounts are preserved. Who may see the file is decided before interviews start.",
      },
      {
        title: "Interviews and documents",
        text: "Order of witnesses, continuity, and a record that can later be disclosed without embarrassment.",
      },
      {
        title: "Findings the board can use",
        text: "What is proved, what is not, and whether dismissal, a report, a claim or a private prosecution is supportable.",
      },
    ],
    risks: [
      "A sloppy internal report can become unused material in a later prosecution or a gift to a claimant.",
      "Tipping off too early can destroy the hold.",
      "Mixing HR outcomes with evidential findings can undermine both.",
    ],
    faqs: [
      {
        q: "Will the subjects know they are being investigated?",
        a: "Not always, and not at first. We say when a step would make the enquiry visible. Covert steps are taken only on instruction, and only by lawful means.",
      },
      {
        q: "Is this the same as an HR investigation?",
        a: "No. An employment process can sit alongside this work. It is not a substitute for a file that will be read outside the business.",
      },
      {
        q: "Might we have to tell the FCA or the SFO?",
        a: "Sometimes. Notification is a legal judgment on the facts. We advise; we do not hide a duty.",
      },
      {
        q: "Are interviews recorded?",
        a: trust.method.interviewRecording,
      },
      {
        q: "Can the same file support a private prosecution later?",
        a: "If it was built to a criminal standard, often yes. We do not run a second investigation for theatre if the first file is honest.",
      },
    ],
  },
  financialCrimeInvestigations: {
    whenHeading: "When conduct, participants and loss are still unclear",
    forWhom: [
      "A fraud, false accounting or misappropriation appears to have occurred, but it is not yet clear who did what.",
      "A report to the police or Action Fraud has produced nothing you can use.",
      "You need a file that could later support a private prosecution, a freeze or a regulatory report.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the facts are already clear and the only remaining question is a legal remedy, the expertise pages describe that work. If the material will not support any honest next step, the useful product is that conclusion, given early.",
    law: {
      heading: "Investigation is not a charge",
      text: "Fraud Act 2006 offences, Theft Act offences, false accounting and conspiracy are among the labels that may later be charged. The investigation itself is not a charge. If a private prosecution follows, CPIA disclosure duties apply. We build the file as if they already do.",
    },
    processHeading: "How the record is built",
    process: [
      {
        title: "Preserve the underlying material",
        text: "Devices, emails, ledgers and payment records are held with continuity.",
      },
      {
        title: "Reconstruct conduct, participants and loss",
        text: "Witnesses, documents and financial analysis are used to establish what happened — and to record what remains unknown.",
      },
      {
        title: "A file that can be used",
        text: "A written account a defence solicitor could pick up cold. Then a decision: prosecute, freeze, report, claim, or stop.",
      },
    ],
    risks: [
      "Witnesses forget, leave, or change sides. Early statements matter.",
      "A theory that is neater than the documents will fail in disclosure.",
      "Civil and criminal routes can collide if they are not sequenced.",
    ],
    faqs: [
      {
        q: "Is this a police investigation?",
        a: "No. It is work inside a solicitors’ practice, run so it can be used in court if you later instruct that route.",
      },
      {
        q: "Will you report the crime for me?",
        a: "We can advise on reporting. We do not treat a website form as a police report.",
      },
      {
        q: "How is this different from a private prosecution?",
        a: "This page is the fact-finding. The expertise page is the criminal case that may follow. You may need both, or only this.",
      },
      {
        q: "Do you interview suspects?",
        a: "Where it is lawful and useful. PACE is considered if a cautioned interview is in view.",
      },
      {
        q: "What if the documents are overseas?",
        a: "We work with local counsel and lawful process.",
      },
    ],
  },
  digitalInvestigations: {
    whenHeading: "When devices, accounts and payments are the record",
    forWhom: [
      "A payment diversion, authorised push payment fraud, or wallet movement has just happened.",
      "Devices and accounts need to be held before anyone has a look.",
      "You need a trail in a form a court will accept, not a thread of screenshots.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the immediate need is legal relief rather than preservation, the cryptoassets or asset-tracing pages describe that work. If you only have screenshots and will not preserve devices, the trail may already be too thin to reconstruct.",
    law: {
      heading: "Lawful collection and provenance",
      text: "Authorised push payment disputes involve banks and the Payment Services Regulations 2017, plus any relevant reimbursement scheme in force at the time. Device imaging and communications data have to be obtained lawfully. Exhibits must show provenance.",
    },
    processHeading: "How the trail is held and mapped",
    process: [
      {
        title: "Preserve devices and accounts",
        text: "Do not keep using a compromised inbox to check what happened. We capture first.",
      },
      {
        title: "Produce traceable transaction and communications records",
        text: "Banks, payment institutions and wallets. Each hop is marked as confirmed or inferred.",
      },
      {
        title: "Support the legal decision",
        text: "Letter, application, or stop. The map is evidence. The decision is legal.",
      },
    ],
    extraBlocks: [
      {
        heading: "Keys and passwords",
        text: "Do not send passwords, private keys or seed phrases through the website. We will never ask for a seed phrase or private key.",
      },
    ],
    risks: [
      "Using the live account after the event can overwrite the trail.",
      "A receiving institution may have already paid away.",
      "Screenshots without metadata will be attacked.",
    ],
    faqs: [
      {
        q: "Should I contact my bank first?",
        a: "Yes, promptly, using a number you already hold. Then write to us with what you still have — not passwords.",
      },
      {
        q: "Will you recover APP fraud automatically?",
        a: "No. Reimbursement rules and bank processes change. We advise on the file, not on a promised scheme outcome.",
      },
      {
        q: "Can you image my laptop remotely?",
        a: trust.method.deviceCollection,
      },
      {
        q: "What if I already reinstalled the phone?",
        a: "Tell us. Some traces survive; many do not. Honesty about what was done is part of the file.",
      },
    ],
  },
  crossBorderInvestigations: {
    whenHeading: "When the enquiry has to leave England and Wales",
    forWhom: [
      "People, companies or records sit outside England and Wales.",
      "A defendant has moved or gone to ground.",
      "You need facts from foreign registries, courts or local professionals before you spend on a London claim.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the only useful step would be unlawful where it happens, or if English letters alone cannot compel a foreign registry, the honest product may be a jurisdiction map and a local-counsel recommendation rather than a London enquiry dressed as extra-territorial process.",
    law: {
      heading: "Local law governs local steps",
      text: "Investigative steps abroad follow the law of that place. Compulsory criminal process often requires mutual legal assistance. Civil disclosure from a foreign third party usually needs local counsel. We do not treat a London letterhead as extra-territorial.",
    },
    extraBlocks: [
      {
        heading: "London practice, local counsel where required",
        text: "We are a London practice. Where foreign-law advice or local procedure is required, we identify and instruct appropriately qualified local counsel with the client's approval.",
      },
    ],
    processHeading: "How overseas enquiries are coordinated",
    process: [
      {
        title: "Map the jurisdictions",
        text: "Where the people, the companies and the value actually sit.",
      },
      {
        title: "Obtain and coordinate lawful enquiries",
        text: "Registries, courts and local professionals, in a form that can later be explained to an English court.",
      },
      {
        title: "A single picture",
        text: "What is proved here, what is proved there, and what remains inference.",
      },
    ],
    risks: [
      "Foreign records can be slow, incomplete or expensive to certify.",
      "A step that is lawful in London may not be lawful abroad.",
      "Finding a person is not the same as serving them.",
    ],
    faqs: [
      {
        q: "Can you investigate in any country?",
        a: "We can instruct locally where it is lawful and useful. We do not claim a worldwide office count.",
      },
      {
        q: "How do you find someone who has left?",
        a: "Lawful tracing: records, connections, and local enquiry. We will say when we cannot find them.",
      },
      {
        q: "Are foreign company searches enough?",
        a: "They are a start. Nominees and poor registries limit what a search proves.",
      },
      {
        q: "What languages can you work in?",
        a: isPending(trust.method.languages)
          ? ""
          : `${trust.method.languages} Translation is otherwise a disbursement.`,
      },
      {
        q: "Can this feed an English freezing application?",
        a: "Yes, if the product is exhibited with provenance. A rumour from abroad will not.",
      },
    ],
  },
  assetTracingInvestigations: {
    whenHeading: "When ownership and reachability are the questions",
    forWhom: [
      "You need to know where misappropriated value went, and whether any of it is still there.",
      "A defendant appears to have nothing, and that needs testing before proceedings.",
      "You need schedules a solicitor can put in front of a court.",
    ],
    alternativeHeading: "When another route may be better",
    alternative:
      "If the need is already a freezing application or enforcement, that is legal work described on the asset tracing and recovery page. This page is the investigative work that decides whether those remedies have anything to bite on.",
    law: {
      heading: "Exists is not the same as reachable",
      text: "This page is investigation: locating value and saying whether it is reachable. Freezing orders, receivership and trust claims are legal remedies described on the expertise page. An asset that exists is not always an asset that can be frozen, charged or sold.",
    },
    processHeading: "How ownership and control are tested",
    process: [
      {
        title: "Identify ownership, control and enforcement targets",
        text: "Banks, payment firms, companies, property, goods and wallets, from the point of loss.",
      },
      {
        title: "Test reachability",
        text: "Encumbrances, nominees, location, and the cost of getting there.",
      },
      {
        title: "Stop or hand to the legal route",
        text: "If it is not worth pursuing, we say so. If it is, the expertise remedies can follow.",
      },
    ],
    risks: [
      "A valuable-looking asset can be mortgaged, overseas, or not in the defendant’s control.",
      "Speed without a hold can announce the enquiry.",
      "Mixing investigation with an unfounded freeze application wastes the cross-undertaking.",
    ],
    faqs: [
      {
        q: "Can you guarantee that assets will be found?",
        a: "No. We will tell you early when there is value to pursue, and equally early when the trail ends.",
      },
      {
        q: "How is this different from Asset tracing and recovery under Expertise?",
        a: "This page locates value and tests reachability. The expertise page is the High Court and enforcement work that may follow.",
      },
      {
        q: "Do you chase uneconomic assets?",
        a: "Not if we can see that coming.",
      },
      {
        q: "Do you use insolvency as a tracing tool?",
        a: "Sometimes, where it is faster or more effective. It is not always the right lever.",
      },
    ],
  },
};
