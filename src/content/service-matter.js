import { firstContactStatement, isPending, trust } from "../config/trust.js";

const costs = `You pay for work done, not for a hoped-for recovery. ${trust.fees.model} ${trust.fees.vatTreatment} Counsel, court fees, tracing tools, translation and overseas lawyers are usually billed as disbursements on top. Conditional fee arrangements and damages-based agreements are considered only where they are lawful for the work. See Pricing.`;

const named = firstContactStatement();
const handler = `The file is held at Edison Law.${named ? ` ${named}` : ""} Advocacy in court is done by instructed counsel, not by listing in-house chambers. Job titles on this site are not a reserved-activity authorisation. ${trust.firm.regulatorCheckText}`;

const firstScope = trust.fees.scopeTimescale;

export const serviceMatter = {
  privateProsecutions: {
    forWhom: [
      "You have reported a fraud or theft and the police, Action Fraud or another public body has declined to investigate or to charge.",
      "The loss is serious enough that a criminal case in the magistrates’ court or the Crown Court is a realistic option, not a gesture.",
      "You can fund an evidential file, disclosure and counsel, or you want a written view on whether that cost is proportionate before you start.",
    ],
    notFor: [
      "You want a guaranteed conviction, a guaranteed confiscation order, or a publicity campaign.",
      "The allegation is a civil disagreement dressed as crime, or the evidence will not meet the criminal standard.",
      "You need us to run a prosecution the unused material would destroy. We will say no.",
    ],
    law: {
      heading: "What the law actually says",
      text: "A private prosecution is a criminal case brought by someone other than the Crown. Section 6 of the Prosecution of Offences Act 1985 preserves that right. The case is judged to the same standard as a public prosecution: the Criminal Procedure and Investigations Act 1996 disclosure duties apply, and the Criminal Procedure Rules apply in the magistrates’ court and the Crown Court. The Crown Prosecution Service may take the case over under section 6(2) of the 1985 Act. We have no extra prosecutorial licence beyond what the SRA already authorises for this firm.",
    },
    process: [
      {
        title: "Hold what still exists",
        timescale: "same day to 48 hours once instructed",
        text: "Devices, emails, bank records and originals are captured so they can later be exhibited. We do not tidy a file that has not been held.",
      },
      {
        title: "Merit and cost",
        timescale: firstScope,
        text: "We say whether the facts can meet the criminal standard, what disclosure will look like, and whether the cost is proportionate. If they cannot, we stop.",
      },
      {
        title: "Build the criminal file",
        timescale: "weeks to months, depending on volume",
        text: "Statements, continuity, unused material and a disclosure schedule. The test is whether a defence solicitor could pick the file up cold and still find it honest.",
      },
      {
        title: "Start the case",
        timescale: "when the file will hold",
        text: "Charge decision, then issue in the magistrates’ court. Either-way and indictable work may go to the Crown Court. We do not guess a trial date.",
      },
      {
        title: "Trial and after",
        timescale: "often many months; confiscation only if conviction supports it",
        text: "Counsel is instructed for advocacy. Compensation or confiscation is a separate decision after the evidence, not a promise at the outset.",
      },
    ],
    costs,
    risks: [
      "The CPS can take the case over, continue it, or stop it. That is a statutory power, not a slight.",
      "A weak file will be tested in disclosure and at trial. Costs, including a possible costs order, can follow a failed case.",
      "A defendant who has spent or moved the money may leave little to recover even after conviction.",
      "We mitigate this by saying no early, running disclosure as if the defence already has the unused material, and keeping recovery as a separate, honest question.",
    ],
    handler,
    faqs: [
      {
        q: "The police have closed my report. Can you still prosecute?",
        a: "Sometimes. A declined public investigation does not create a right to a private one. We look at whether the evidence can meet the criminal standard and whether the cost is proportionate.",
      },
      {
        q: "Is a private prosecution always the right route?",
        a: "No. A civil claim, a freezing application, a regulatory report or no further step may be the honest answer. We say so before you commit.",
      },
      {
        q: "Can this run at the same time as a civil claim?",
        a: "Yes, where the facts support both. Restraint, confiscation, freezing and a civil claim are sequenced so one does not wreck the other.",
      },
      {
        q: "Who appears in court?",
        a: "Instructed counsel, in the magistrates’ court or the Crown Court as the case requires. We do not describe that as in-house chambers.",
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
      {
        q: "When would you turn this down?",
        a: "When the evidence will not hold, when unused material would destroy the case, when the cost is out of proportion to what can be proved, or when you want a guaranteed result.",
      },
    ],
  },
  assetTracing: {
    forWhom: [
      "Money, property or other value has left your control and you do not know where it sits.",
      "Someone appears to have nothing, and you need that tested before you spend on proceedings.",
      "You may need a freezing, proprietary or disclosure order in the High Court at speed.",
    ],
    notFor: [
      "You want a guaranteed recovery figure or a promise that assets will be found.",
      "The chase will cost more than any reachable value, and you still want it run as theatre.",
      "You need us to describe tracing as a product that returns coins or cash on a timetable.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Freezing injunctions in the High Court are usually sought under the court’s equitable jurisdiction and CPR Part 25. Worldwide freezing orders, proprietary injunctions, disclosure orders and receivership are separate remedies with different tests. They do not create assets. The Fraud Act 2006 and, after conviction, the Proceeds of Crime Act 2002 may also be relevant. Tracing in equity follows value; it is not a guarantee that a bank, a nominee or a wallet can be made to pay.",
    },
    process: [
      {
        title: "Hold the trail",
        timescale: "same day to 48 hours once instructed",
        text: "Bank records, payment messages, company filings and device images are captured before anyone drafts a recovery story.",
      },
      {
        title: "Say whether it is worth pursuing",
        timescale: firstScope,
        text: "We map where value went and whether any of it is still reachable at a cost you should pay. If it is not, we stop.",
      },
      {
        title: "Choose the remedy",
        timescale: "days where urgency is real; longer if the picture is incomplete",
        text: "Freezing, proprietary relief, disclosure against a bank, or receivership — only if the evidence will carry the application.",
      },
      {
        title: "Enforce or stop",
        timescale: "weeks to many months",
        text: "Local counsel is instructed where the asset sits overseas. We will advise you to stop if the remaining value is not worth the powder.",
      },
    ],
    costs,
    risks: [
      "A freezing order is not a pot of money. Assets can be offshore, encumbered, spent or held by someone who will fight.",
      "A cross-undertaking in damages is usual. If the injunction was wrongly granted, you may have to pay.",
      "On-chain or banking data can run out. Inference is not proof of control.",
      "We mitigate this by stating limits in the advice, and by not applying for relief the evidence cannot support.",
    ],
    handler,
    faqs: [
      {
        q: "Can you guarantee recovery?",
        a: "No. We will say early when there is value to pursue, and equally early when the trail ends.",
      },
      {
        q: "What is a worldwide freezing order?",
        a: "It is a High Court injunction restraining disposal of assets. It does not itself seize them. The American Cyanamid and related tests still have to be met.",
      },
      {
        q: "Do you work with forensic accountants?",
        a: "Yes, on the same file. Tracing, freezing and enforcement are one strategy, not a relay of unregulated reports.",
      },
      {
        q: "How fast can you apply?",
        a: "If the facts support urgency, applications are built in days. Incomplete records slow that down. We will not file an empty skeleton to look busy.",
      },
      {
        q: "What if the defendant lives abroad?",
        a: "Service out, recognition and enforcement need local counsel where the person or the asset sits. We do not list offices we do not have.",
      },
      {
        q: "Are your fees taken from recovered money?",
        a: "Only if a lawful damages-based or similar arrangement is agreed in writing. Otherwise you pay for the work as scoped. See Pricing.",
      },
      {
        q: "What disbursements should I expect?",
        a: "Counsel, court fees, registry searches, overseas lawyers, and specialist tracing tools where they are used. These are set out in the written scope.",
      },
      {
        q: "When would you turn this down?",
        a: "When there is no reachable value, when the cost will exceed any recovery, or when you want a guaranteed figure.",
      },
    ],
  },
  cryptoFraud: {
    forWhom: [
      "Value has moved across wallets, mixers, bridges or exchanges and you need to know what the records actually prove.",
      "An exchange or service provider may be holding a frozen balance.",
      "A payment diversion has just occurred and the trail may still be moving.",
    ],
    notFor: [
      "You want a guarantee that cryptocurrency will be returned.",
      "You want us to recover coins by threatening an unregulated ‘recovery room’.",
      "You need a dashboard screenshot treated as a court-ready exhibit without provenance.",
    ],
    law: {
      heading: "What the law actually says",
      text: "English courts have treated cryptoassets as property for the purpose of injunctions and proprietary claims. Emergency relief is still an ordinary High Court application under CPR Part 25: you must show a serious issue, a real risk, and a case that is just and convenient. On-chain data is a record of transfers. It does not, on its own, prove who controlled a key, or that an exchange must pay you. Proceeds of Crime Act 2002 powers after conviction are a different route again.",
    },
    process: [
      {
        title: "Preserve the record",
        timescale: "hours to 48 hours once instructed",
        text: "Transaction IDs, exchange emails, device images and timestamps are held. We do not overwrite wallets or ‘test’ a seed phrase.",
      },
      {
        title: "Map what the chain shows",
        timescale: "days, longer if hops and platforms multiply",
        text: "Confirmed transfers are separated from clustering inferences. Mixers, bridges and missing exchange data are marked as limits, not footnotes.",
      },
      {
        title: "Decide the legal step",
        timescale: "often in the first days if funds are still moving",
        text: "A letter, a freeze request to a platform, or a High Court application — or no step, if the trail has cashed out.",
      },
      {
        title: "Exhibits for later",
        timescale: "alongside any urgent application",
        text: "The map has to survive the move from injunction to trial. Counsel is instructed where advocacy is needed.",
      },
    ],
    costs,
    risks: [
      "Coins can leave a venue before an order bites. Speed without a proper hold is wasted money.",
      "An exchange outside England and Wales may ignore a letter. Local process is then a separate cost.",
      "Clustering is inference. Presenting it as fact will be tested.",
      "We mitigate this by stating what the records prove, and by not guaranteeing return of assets.",
    ],
    handler,
    faqs: [
      {
        q: "Can you guarantee that crypto will be recovered?",
        a: "No. Anyone who guarantees recovery is not describing this work honestly.",
      },
      {
        q: "How quickly can you act?",
        a: "These files are often won or lost in the first days. We build the picture needed for an emergency application only if the facts support one.",
      },
      {
        q: "Will you ask me for my seed phrase?",
        a: "Not through this website, and not by a surprise payment instruction. Treat any such request as suspect. See the fraud warning.",
      },
      {
        q: "Is a blockchain explorer printout enough?",
        a: "No. Provenance, timestamps, tool versions and the difference between a confirmed hop and a cluster have to be in the exhibit.",
      },
      {
        q: "Do you use tracing software?",
        a: "Where volume requires it, including tools named on this site. Output is reviewed on the file. A model export is not proof.",
      },
      {
        q: "What if the coins went through a mixer?",
        a: "That usually limits what can be said. The limit belongs in the advice, not after a hopeful conclusion.",
      },
      {
        q: "Which court?",
        a: "Urgent property and injunction work is typically the High Court in England and Wales. Criminal routes, if any, are a separate decision.",
      },
      {
        q: "When would you turn this down?",
        a: "When the trail has ended, when you want a guaranteed return of coins, or when the only ‘evidence’ is an unverified screenshot.",
      },
    ],
  },
  regulatory: {
    forWhom: [
      "A dawn raid, interview under caution, or information notice has landed.",
      "An internal investigation may need to be reported to the FCA, SFO, HMRC or another body.",
      "You need a file that is accurate when you speak, and quiet when you should not.",
    ],
    notFor: [
      "You want us to claim we can close an enquiry because someone here used to work at the agency.",
      "You want a narrative offered in hope rather than disclosure that is accurate and sufficient.",
      "You need us to hide material that a regulator or a court is entitled to see.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Interviews under caution are governed by the Police and Criminal Evidence Act 1984 and the PACE Codes. The Serious Fraud Office has compulsory powers under the Criminal Justice Act 1987. The FCA’s Handbook and FSMA 2000 frame much authorised-firm work. HMRC information powers sit in the Taxes Management Act 1970 and related statutes. Privilege, compelled answers and ‘use’ restrictions are technical. We will not summarise them into a slogan.",
    },
    process: [
      {
        title: "Stabilise the first hours",
        timescale: "same day if a raid or caution is live",
        text: "Who may speak, what must be preserved, and what must not be deleted. Privilege is identified early.",
      },
      {
        title: "Scope the file",
        timescale: firstScope,
        text: "Which documents decide the issue. Volume is not the same as an answer.",
      },
      {
        title: "Engage or stay quiet",
        timescale: "as the notice or invitation requires",
        text: "A written response, an interview, or a decision that more time is needed. Timing is part of the work.",
      },
      {
        title: "Settlement, challenge or defence",
        timescale: "months, sometimes longer",
        text: "Civil settlement, judicial review, or criminal defence — only as the facts and the forum allow. We will not describe an investigation as closed unless it is.",
      },
    ],
    costs,
    risks: [
      "Saying too much can waive privilege or create a narrative you cannot later support.",
      "Saying too little, or deleting material, can be a separate allegation.",
      "A parallel civil or recovery case against someone else can collide with your defence if it is not sequenced.",
      "We mitigate this by identifying the deciding documents, protecting privilege, and refusing to over-claim what the file shows.",
    ],
    handler,
    faqs: [
      {
        q: "Will you tell a regulator more than is required?",
        a: "No. Disclosure should be accurate and sufficient. It should not be a story offered in hope.",
      },
      {
        q: "Can defence run with recovery against someone else?",
        a: "Yes, where the facts support it. We will not pretend the two cannot collide. Sequencing is part of the advice.",
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
        q: "Do you negotiate with the FCA or HMRC?",
        a: "Where negotiation is more useful than correspondence, yes. We do not sell a personal relationship with a named official.",
      },
      {
        q: "How long does an enquiry last?",
        a: "From weeks to years. We will not invent a closing date.",
      },
      {
        q: "Are your fees covered by insurance?",
        a: trust.fees.thirdPartyFunding,
      },
      {
        q: "When would you turn this down?",
        a: "When you want material hidden, when you want a claim we used to work at the agency, or when you need a guaranteed end to the enquiry.",
      },
    ],
  },
  crossBorder: {
    forWhom: [
      "A UK-facing loss has its origins, or its proceeds, overseas.",
      "You need evidence, freezing relief or enforcement in more than one country.",
      "A foreign judgment or arbitration award may need to be recognised here, or an English order recognised there.",
    ],
    notFor: [
      "You want a list of overseas offices we do not have.",
      "You expect English process alone to seize assets in a place that will not recognise it.",
      "You need us to skip local counsel where the money actually sits.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Service out of the jurisdiction, letters of request and mutual legal assistance follow the Civil Procedure Rules, the Crime (International Co-operation) Act 2003 where criminal, and the law of the receiving state. Recognition of some foreign judgments in England still uses common law or statute such as the Foreign Judgments (Reciprocal Enforcement) Act 1933, depending on the country. Arbitration awards often proceed under the Arbitration Act 1996 and the New York Convention. None of that is a global network of Edison Law offices.",
    },
    process: [
      {
        title: "Establish where the people and the value sit",
        timescale: firstScope,
        text: "A UK file that pretends the world is England will fail. We map forum, asset and defendant before anyone files.",
      },
      {
        title: "Instruct locally",
        timescale: "as soon as a foreign step is real",
        text: "Local counsel, registry researchers and investigators where the money sits. We hold the strategy here.",
      },
      {
        title: "Sequence the courts",
        timescale: "weeks to many months",
        text: "Which claim, in which court, in which order, and at what cost. Parallel cases are coordinated so one does not ambush the other.",
      },
      {
        title: "Recognise or enforce",
        timescale: "depends on the foreign court and any appeal",
        text: "Or stop, if recognition will cost more than it returns.",
      },
    ],
    costs,
    risks: [
      "Foreign courts take time and can refuse recognition. That is ordinary, not a surprise we hide.",
      "Serving a defendant who has left the UK can fail if they cannot be found.",
      "Translation, apostille and local fees add cost that a London estimate can miss if it is not scoped.",
      "We mitigate this by instructing locally, stating forum risk in writing, and advising you to stop when the economics fail.",
    ],
    handler,
    faqs: [
      {
        q: "Do you have offices overseas?",
        a: "No. The practice is London-based. We work with local counsel where the people and the money sit.",
      },
      {
        q: "Can you serve someone who has left the country?",
        a: "Locating them is investigative work. Service then follows the rules of the place of service. We do not pretend that is automatic.",
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
        a: "Often under the Arbitration Act 1996, subject to the usual defences. We will not treat enforcement as a clerical step.",
      },
      {
        q: "Which language will the file be in?",
        a: "The London file is in English. Foreign records are translated where they will be exhibited. Translation is a disbursement.",
      },
      {
        q: "How do you charge for overseas lawyers?",
        a: "As disbursements under the written scope, unless a different arrangement is agreed. See Pricing.",
      },
      {
        q: "When would you turn this down?",
        a: "When the only honest step is in a court we cannot usefully reach, when you want fictional overseas offices, or when the cost will exceed any recovery.",
      },
    ],
  },
  corporateIntelligence: {
    forWhom: [
      "A transaction, investment or appointment needs a discreet look at the counterparty first.",
      "You need source of wealth or integrity tested before funds move.",
      "You want a realistic view of whether a person or company could satisfy a judgment.",
    ],
    notFor: [
      "You want unlawful surveillance, hacking, or a pretext that would not survive a court.",
      "You need a blackmail file or a smear.",
      "You expect the subject to be unaware if a step would in fact make the enquiry visible.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Open-source and lawful enquiry is not a licence to process personal data without a lawful basis under UK GDPR and the Data Protection Act 2018. The SRA Codes still apply to solicitors directing the work. If the output later becomes litigation or a private prosecution, it has to have been obtained in a way that can be explained. We do not use methods we could not defend.",
    },
    process: [
      {
        title: "Scope and lawful basis",
        timescale: "days",
        text: "What you need to know, why, and what we will not do. Covert steps are taken only on instruction and only by lawful means.",
      },
      {
        title: "Records and people",
        timescale: "one to several weeks for a standard file",
        text: "Filings, litigation, sanctions lists, connections and, where instructed, field enquiry. Findings are written so they can be disclosed later without embarrassment.",
      },
      {
        title: "A usable note",
        timescale: firstScope,
        text: "What is established, what is inference, and whether money spent chasing the counterparty would be wasted.",
      },
    ],
    costs,
    risks: [
      "Public records are incomplete. Absence of a hit is not proof of virtue.",
      "A visible step can tip off the subject. We say so before we take it.",
      "Overseas data can be thin, delayed or unreliable.",
      "We mitigate this by marking sources, refusing unlawful methods, and writing limits into the note.",
    ],
    handler,
    faqs: [
      {
        q: "Is this the same as instructing private investigators?",
        a: "Field and open-source enquiry can be part of the work. It is run so the product can later sit on a litigation or prosecution file.",
      },
      {
        q: "Will the subject know?",
        a: "The default is confidential. We say if a step would make the enquiry visible, and we do not take that step without instruction.",
      },
      {
        q: "Do you guarantee you will find dirt?",
        a: "No. We report what the records show. A clean picture is still a result.",
      },
      {
        q: "Can you check sanctions?",
        a: "We can search published lists and related records. Screening is only as good as the list and the identifiers you give us.",
      },
      {
        q: "Is this legal advice?",
        a: "When a solicitor here directs it and a retainer says so, the advice on risk and next step is legal work. A raw dump of search results is not.",
      },
      {
        q: "How is personal data handled?",
        a: "Under UK GDPR. See the privacy notice. We do not run this work as a marketing list.",
      },
      {
        q: "What does it cost?",
        a: `A scoped enquiry with a written cap or hourly basis. ${trust.fees.model} See Pricing.`,
      },
      {
        q: "When would you turn this down?",
        a: "When the method would be unlawful, when you want a smear, or when you need a guaranteed adverse finding.",
      },
    ],
  },
  internalInvestigations: {
    forWhom: [
      "A whistleblower report, unexplained payments or a gap in the accounts has reached the board.",
      "Employee or fiduciary misconduct needs to be established before anyone is dismissed or reported.",
      "You may have to tell a regulator or insurers, and the file has to be accurate when you do.",
    ],
    notFor: [
      "You want a predetermined finding to justify a dismissal already decided.",
      "You need an HR process passed off as an evidential investigation.",
      "You want us to guarantee the outcome the board prefers.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Employment law, regulatory notification duties and, if the facts are criminal, the same evidential standards as any later prosecution all sit on the same events. Privilege in internal investigations is easy to lose if the purpose and the audience are muddled. We identify hold, access and privilege before anyone is put on notice.",
    },
    process: [
      {
        title: "Hold, access, privilege",
        timescale: "same day to 48 hours",
        text: "Devices and accounts are preserved. Who may see the file is decided before interviews start.",
      },
      {
        title: "Interviews and documents",
        timescale: "days to weeks",
        text: "Order of witnesses, continuity, and a record that can later be disclosed without embarrassment.",
      },
      {
        title: "Findings and next step",
        timescale: firstScope,
        text: "What is proved, what is not, and whether dismissal, a report, a claim or a private prosecution is supportable. If it is not, we say so.",
      },
    ],
    costs,
    risks: [
      "A sloppy internal report can become unused material in a later prosecution or a gift to a claimant.",
      "Tipping off too early can destroy the hold.",
      "Mixing HR outcomes with evidential findings can undermine both.",
      "We mitigate this by writing for the next reader — a regulator, a defendant or a judge — from the first day.",
    ],
    handler,
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
        q: "Can you guarantee the outcome the board wants?",
        a: "No. We tell you what the material supports.",
      },
      {
        q: "Might we have to tell the FCA or the SFO?",
        a: "Sometimes. Notification is a legal judgment on the facts, not a marketing line. We advise; we do not hide a duty.",
      },
      {
        q: "Are interviews recorded?",
        a: trust.method.interviewRecording,
      },
      {
        q: "Can the same file support a private prosecution later?",
        a: "If it was built to a criminal standard, often yes. We do not run a second investigation for theatre if the first file is honest.",
      },
      {
        q: "What about whistleblower protection?",
        a: "PIDA and related duties may apply. We will not use this page as a substitute for advice on a named reporter.",
      },
      {
        q: "When would you turn this down?",
        a: "When you want a scripted finding, when you will not preserve devices, or when you need us to hide material from a regulator who is entitled to it.",
      },
    ],
  },
  financialCrimeInvestigations: {
    forWhom: [
      "A fraud, false accounting or misappropriation has occurred, but it is not yet clear who did what.",
      "A report to the police or Action Fraud has produced nothing you can use.",
      "You need a file that could later support a private prosecution, a freeze or a regulatory report.",
    ],
    notFor: [
      "You want us to investigate for entertainment or to pressure someone with an unfinished story.",
      "You need a guaranteed identification of a culprit.",
      "You will not let us preserve original devices and accounts.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Fraud Act 2006 offences, Theft Act offences, false accounting under the Theft Act 1968, and conspiracy at common law are among the criminal labels that may later be charged. The investigation itself is not a charge. If a private prosecution follows, CPIA disclosure duties apply. We build the file as if they already do.",
    },
    process: [
      {
        title: "Preserve",
        timescale: "same day to 48 hours once instructed",
        text: "Devices, emails, ledgers and payment records are held with continuity.",
      },
      {
        title: "Establish",
        timescale: "weeks, driven by volume",
        text: "Who was involved, how the scheme ran, and what the documents prove — and do not.",
      },
      {
        title: "File",
        timescale: firstScope,
        text: "A written account a defence solicitor could pick up cold. Then a decision: prosecute, freeze, report, claim, or stop.",
      },
    ],
    costs,
    risks: [
      "Witnesses forget, leave, or change sides. Early statements matter.",
      "A theory that is neater than the documents will fail in disclosure.",
      "Civil and criminal routes can collide if they are not sequenced.",
      "We mitigate this by holding originals first and by writing what is unknown as clearly as what is known.",
    ],
    handler,
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
        a: "Where it is lawful and useful. An interview is not an ambush for content. PACE is considered if a cautioned interview is in view.",
      },
      {
        q: "What if the documents are overseas?",
        a: "We work with local counsel and lawful process. We do not hack inboxes.",
      },
      {
        q: "Can you work from copies only?",
        a: "Copies can start the picture. Originals and metadata still need a hold if the file will be tested.",
      },
      {
        q: "How long does it take?",
        a: "A small payments file can be scoped in days. A multi-year ledger can take months. Volume drives time.",
      },
      {
        q: "When would you turn this down?",
        a: "When you want a culprit named without evidence, when you will not preserve devices, or when the material will not support any honest next step.",
      },
    ],
  },
  digitalInvestigations: {
    forWhom: [
      "A payment diversion, authorised push payment fraud, or wallet movement has just happened.",
      "You need devices and accounts held before anyone ‘has a look’.",
      "You need a trail in a form a court will accept, not a thread of screenshots.",
    ],
    notFor: [
      "You want us to log into accounts with your passwords over email.",
      "You need a guarantee the money is still there.",
      "You want seed phrases sent through the contact form.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Authorised push payment disputes involve banks and the Payment Services Regulations 2017, plus any relevant reimbursement scheme in force at the time. Device imaging and communications data have to be obtained lawfully. Exhibits must show provenance. We will not treat a forwarded PDF as a complete payment trail.",
    },
    process: [
      {
        title: "Hold devices and accounts",
        timescale: "hours to 48 hours",
        text: "Do not keep using a compromised inbox to ‘check’. We capture first.",
      },
      {
        title: "Map the payments",
        timescale: "days, longer with many institutions",
        text: "Banks, payment institutions, wallets. Each hop is marked as confirmed or inferred.",
      },
      {
        title: "Support the legal decision",
        timescale: "in parallel if a freeze is realistic",
        text: "Letter, application, or stop. The map is evidence. The decision is legal.",
      },
    ],
    costs,
    risks: [
      "Using the live account after the event can overwrite the trail.",
      "A receiving institution may have already paid away.",
      "Screenshots without metadata will be attacked.",
      "We mitigate this by holding first, stating limits, and refusing passwords through the website.",
    ],
    handler,
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
        q: "What is Cobra AI in this work?",
        a: "A named tool from IYE Global used where volume requires it. Output is reviewed here. It is not a recovery product.",
      },
      {
        q: "How fast must I act?",
        a: "Hours can matter. That is not a reason to send seed phrases through a web form.",
      },
      {
        q: "Do you speak to the receiving bank?",
        a: "Where a lawful request or order supports it. A cold call from an unknown ‘investigator’ is often ignored, and should be.",
      },
      {
        q: "What if I already reinstalled the phone?",
        a: "Tell us. Some traces survive; many do not. Honesty about what was done is part of the file.",
      },
      {
        q: "When would you turn this down?",
        a: "When you want a guaranteed return of funds, when you will only send screenshots, or when you ask us to use your passwords by email.",
      },
    ],
  },
  crossBorderInvestigations: {
    forWhom: [
      "People, companies or records sit outside England and Wales.",
      "A defendant has moved or gone to ground.",
      "You need facts from foreign registries before you spend on a London claim.",
    ],
    notFor: [
      "You want us to operate as if we were licensed in every country.",
      "You need covert action that would be unlawful in the place it happens.",
      "You expect English letters alone to compel a foreign registry.",
    ],
    law: {
      heading: "What the law actually says",
      text: "Investigative steps abroad follow the law of that place. Compulsory criminal process often requires MLA. Civil disclosure from a foreign third party usually needs local counsel. We do not treat a London letterhead as extra-territorial.",
    },
    process: [
      {
        title: "Map the jurisdictions",
        timescale: "days",
        text: "Where the people, the companies and the value actually sit.",
      },
      {
        title: "Lawful collection",
        timescale: "weeks to months",
        text: "Local counsel, registries, and process that can later be explained to an English court.",
      },
      {
        title: "A single picture",
        timescale: firstScope,
        text: "What is proved here, what is proved there, and what remains inference.",
      },
    ],
    costs,
    risks: [
      "Foreign records can be slow, incomplete or expensive to certify.",
      "A step that is lawful in London may not be lawful abroad.",
      "Finding a person is not the same as serving them.",
      "We mitigate this by instructing locally and by writing jurisdiction limits into the note.",
    ],
    handler,
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
        q: "Will you bribe a registry clerk?",
        a: "No.",
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
      {
        q: "Who is on the file?",
        a: `${handler}`,
      },
      {
        q: "When would you turn this down?",
        a: "When the only methods on offer would be unlawful where they happen, or when you want a global-firm fiction.",
      },
    ],
  },
  assetTracingInvestigations: {
    forWhom: [
      "You need to know where misappropriated value went, and whether any of it is still there.",
      "A defendant appears to have nothing, and that needs testing before proceedings.",
      "You need schedules a solicitor can put in front of a court the same week.",
    ],
    notFor: [
      "You want a guarantee that assets will be found.",
      "You want us to chase value that will cost more than it returns.",
      "You need this page confused with the legal remedies on the Expertise tracing page.",
    ],
    law: {
      heading: "What the law actually says",
      text: "This page is investigation: locating value and saying whether it is reachable. Freezing orders, receivership and trust claims are legal remedies described on the Expertise page. An asset that exists is not always an asset that can be frozen, charged or sold. Equity traces value; enforcement still needs a defendant, a court and a reachable item.",
    },
    process: [
      {
        title: "Flow of funds from the point of loss",
        timescale: "days to weeks",
        text: "Banks, payment firms, companies, property, goods, wallets.",
      },
      {
        title: "Reachability",
        timescale: firstScope,
        text: "Encumbrances, nominees, location, and cost of getting there.",
      },
      {
        title: "Stop or hand to the legal route",
        timescale: "when the picture is honest",
        text: "If it is not worth the powder, we say so. If it is, the Expertise remedies can follow.",
      },
    ],
    costs,
    risks: [
      "A valuable-looking asset can be mortgaged, overseas, or not in the defendant’s control.",
      "Speed without a hold can announce the enquiry.",
      "Mixing investigation with an unfounded freeze application wastes the cross-undertaking.",
      "We mitigate this by separating ‘exists’ from ‘reachable’, and by stopping early.",
    ],
    handler,
    faqs: [
      {
        q: "Can you guarantee that assets will be found?",
        a: "No. That is the useful answer, given early.",
      },
      {
        q: "How is this different from Asset tracing and recovery under Expertise?",
        a: "This page locates value and tests reachability. The Expertise page is the High Court and enforcement work that may follow.",
      },
      {
        q: "Do you chase uneconomic assets?",
        a: "Not if we can see that coming. We will tell you to stop.",
      },
      {
        q: "What about property in a spouse’s name?",
        a: "It may or may not be reachable. That is a legal and evidential question, not a slogan.",
      },
      {
        q: "Do you use insolvency as a tracing tool?",
        a: "Sometimes, where it is faster or more effective. It is not always the right lever.",
      },
      {
        q: "Will I get a spreadsheet of bank accounts?",
        a: "You get schedules that can be exhibited, with sources. A rumour list is not a product we sell.",
      },
      {
        q: "How are crypto and fiat treated?",
        a: "As different records on the same flow-of-funds question. Limits of each belong in the note.",
      },
      {
        q: "When would you turn this down?",
        a: "When you want a guaranteed find, when the chase is obviously uneconomic, or when you will not let us hold the underlying records.",
      },
    ],
  },
};
