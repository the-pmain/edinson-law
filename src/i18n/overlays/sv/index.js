export default {
  site: {
    masterLine: "Tvister om ekonomisk brottslighet kräver tydlig bevisning och gott omdöme.",
    shortLine:
      "En SRA-reglerad enskild verksamhet i London för ekonomisk brottslighet, enskilt åtal och återvinning.",
    descriptor: "Solicitorfirma · London",
  },

  practices: {
    "private-prosecutions": {
      title: "Enskilt åtal",
      problem: "En brottsanmälan har avslagits, eller leder ingenstans.",
      summary: "Bedöm om ett enskilt åtal (private prosecution) är den rätta rättsliga vägen.",
    },
    "asset-tracing": {
      title: "Tillgångsspårning och återvinning",
      problem: "Medel eller tillgångar har flyttats och kan fortfarande vara nåbara.",
      summary:
        "Ta reda på vad som återstår, och välj därefter en proportionerlig civilrättslig, straffrättslig eller insolvensrättslig åtgärd.",
    },
    "crypto-fraud": {
      title: "Kryptobedrägeri och digitala tillgångar",
      problem: "Värde har rört sig genom plånböcker, börser eller enheter.",
      summary: "Gör spåret till bevisuppgifter, med uppgifternas begränsningar angivna.",
    },
    regulatory: {
      title: "Tillsynsförsvar och utredningar",
      problem: "Ett föreläggande, en kallelse till förhör eller en intern utredning har inletts.",
      summary: "Kontrollera det första svaret och den akt som följer.",
    },
    "cross-border": {
      title: "Gränsöverskridande bedrägeri och korruption",
      problem: "Förlusten, personerna eller tillgångarna finns i mer än ett land.",
      summary: "Håll den engelska akten och anlita lokal counsel där utländsk process krävs.",
    },
    "corporate-intelligence": {
      title: "Bolagsunderrättelser och pre-litigation",
      problem: "Du behöver veta vem du har att göra med innan du förbinder dig.",
      summary: "Lagliga, konfidentiella förfrågningar före process, investering eller utnämning.",
    },
  },

  investigations: {
    internal: {
      title: "Interna utredningar",
      summary: "Hjälp styrelser att fatta försvarbara beslut om anställning, styrning och rapportering.",
    },
    "financial-crime": {
      title: "Utredningar om ekonomisk brottslighet",
      summary: "Rekonstruera handlande, deltagare och förlust utifrån dokument- och vittnesbevisning.",
    },
    digital: {
      title: "Digitala utredningar och betalningsutredningar",
      summary: "Säkra enheter och konton, och ta därefter fram spårbara transaktions- och kommunikationsuppgifter.",
    },
    "cross-border": {
      title: "Gränsöverskridande utredningar",
      summary: "Inhämta och samordna lagliga förfrågningar över register, domstolar och lokala yrkespersoner.",
    },
    "asset-tracing": {
      title: "Utredningar om tillgångsspårning",
      summary: "Identifiera ägande, kontroll och realistiska verkställighetsobjekt.",
    },
  },

  insights: {
    "fake-crypto-recovery-services": {
      type: "Utredningsanteckning",
      title: "Falska återvinningstjänster, impersonation och vad en genuin byrå inte ber om",
      description:
        "Oreglerade ”återvinningsagenter” kontaktar ofta drabbade i meddelandeappar och ber om fröfraser, fjärråtkomst eller en ytterligare betalning. En reglerad verksamhet gör inget av det.",
    },
    "legal-routes-after-crypto-movement": {
      type: "Juridisk förklaring",
      title: "Vad en solicitor kan bedöma när kryptovaluta redan har flyttats",
      description:
        "Överföringar on-chain är vanligen oåterkalleliga. Det användbara arbetet är att fastställa vad uppgifterna visar, om något värde fortfarande är nåbart, och vilken engelsk rättslig väg — om någon — som är proportionerlig.",
    },
    "first-records-after-digital-asset-loss": {
      type: "Utredningsanteckning",
      title: "De första uppgifterna att spara efter förlust av digitala tillgångar",
      description:
        "Plånboksadresser, transaktionsidentifierare och samtida meddelanden betyder mer än en senare berättelse. Vad som inte ska skickas är lika viktigt som vad som ska bevaras.",
    },
    "tracing-assets-across-wallets": {
      type: "Utredningsanteckning",
      title: "Spårning av tillgångar över flera plånböcker: en evidensförst-ansats",
      description:
        "En praktisk översikt av transaktionskartläggning, bevisens ursprung och de rättsliga beslut som följer.",
    },
    "hmrc-enquiry-evidence": {
      type: "Juridisk förklaring",
      title: "Vad en HMRC-utredning faktiskt behöver från akten",
      description:
        "Hur man skiljer de handlingar som avgör en skattetvist från den volym som bara omger den.",
    },
    "preserving-digital-evidence": {
      type: "Utredningsanteckning",
      title: "Säkring av digital bevisning innan den rättsliga vägen väljs",
      description:
        "Vad som ska hållas, vad som inte ska ändras, och varför tidig metod betyder mer än tidig anklagelse.",
    },
  },

  home: {
    path: "/",
    title: "Edison Law | Ekonomisk brottslighet, enskilt åtal och återvinning i London",
    description:
      "SRA-reglerad solicitorverksamhet i London för ekonomisk brottslighet, återvinning och utredningsärenden. Vi fastställer fakta, identifierar tillgängliga rättsliga vägar och förklarar de kommersiella riskerna innan betydande kostnader uppstår.",
    schema: "home",
    sections: {
      hero: {
        descriptor: "Digitala tillgångar · utredningar · återvinning",
        heading: "När tillgångar rör sig, följ",
        headingLines: ["När tillgångar", "rör sig,", "följ"],
        headingEmphasis: "bevisningen.",
        lead: "Edison Law förenar transaktionsspårning, evidenssäkring och juridisk analys i ärenden om bedrägeri, ekonomisk brottslighet och återvinning.",
        cta: { label: "Diskutera ett ärende", href: "/contact/" },
        ctaSecondary: { label: "Utforska våra verksamhetsområden", href: "/expertise/" },
      },
      who: {
        label: "Hur vi börjar",
        heading: "När fakta är fragmenterade",
        lead: "Bedrägeriärenden kommer sällan som ett färdigt fall. Handlingar kan saknas, betalningar kan ha passerat flera institut och den rättsliga vägen kan fortfarande vara oklar.",
        text: "Vårt arbete börjar med att säkra den tillgängliga bevisningen och identifiera de frågor som avgör vad som händer härnäst.",
      },
      cobra: {
        label: "Teknik som används i lämpliga ärenden",
        heading: "Cobra AI",
        lead: "I vissa utredningar, där volymen av underlag gör manuell granskning opraktisk, använder vi Cobra AI, en underrättelseplattform från IYE Global. Utfallet granskas av personerna på ärendet. Det är ett verktyg, inte bevisning, och det används inte i varje akt.",
        text: "",
        items: [
          {
            title: "Fördjupad KYC och due diligence",
            text: "Första- och tredjepartsriskanalys avsedd att belysa dolda kopplingar, ombudsanvändare och lager av identiteter utöver en vanlig KYC-kontroll.",
          },
          {
            title: "Kryptovalutautredningar",
            text: "Spårning från plånböcker på blockkedjan mot fiatkonton, i stället för att stanna vid en börs.",
          },
          {
            title: "Lokalisering av motparter",
            text: "En plånboksadress, en meddelandeidentifierare, en IP-adress eller en socialmedieprofil kan användas för att identifiera motparter och kända medhjälpare.",
          },
        ],
        sourceNote: "Utgivarens produktsida:",
        sourceLabel: "cobraintel.com",
        cta: "",
      },
      why: {
        label: "Hur arbetet bedrivs",
        heading: "Omdöme före en stor utgift.",
        items: [
          {
            icon: "solicitor",
            title: "En namngiven handledande solicitor",
            text: "Varje uppdrag handleds av en namngiven solicitor. Counsel anlitas där processföring krävs. Externa specialister kopplas in när deras kompetens behövs, med deras roll förklarad.",
          },
          {
            icon: "evidence",
            title: "Bevisning före strategi",
            text: "Enheter, konton och original säkras innan någon skriver en berättelse. Analysen görs så att den kan läggas fram som bevisuppgift, med sina begränsningar angivna.",
          },
          {
            icon: "fees",
            title: "Arvode för arbetet",
            text: "Efter ett inledande samtal ger vi en skriftlig omfattning och debiteringsgrund. Arvodet avser juridiskt arbete. Det är inte en återvinning av tillgångar. Se Priser.",
          },
          {
            icon: "discretion",
            title: "Diskretion",
            text: "Ekonomisk brottslighet är ryktskänslig. Förfrågningar hanteras konfidentiellt. Skicka inte lösenord, privata nycklar, fröfraser eller originalhandlingar som styrker identitet via webbplatsen.",
          },
          {
            icon: "london",
            title: "London, med lokal counsel där det krävs",
            text: "Vi är en Londonverksamhet. Där råd om utländsk rätt eller lokal process krävs identifierar och anlitar vi lämpligt kvalificerad lokal counsel med klientens godkännande.",
          },
        ],
      },
      cases: {
        label: "Arbete av detta slag",
        heading: "Typer av ärenden, inte rapporterade resultat.",
        intro:
          "Detta är exempel på frågor vi får. De är inte fallstudier och de rapporterar inte återvinningar, påföljder eller rankingar.",
        items: [
          {
            title: "Authorised push payment och betalningsavledning",
            kind: "Betalningar",
            jurisdictions: "Brittiska banker, betalningsinstitut, ibland en utländsk utbetalning",
            text: "Medel har lämnat via en betaltjänst, korrespondentbank eller e-penningkonto. Det första arbetet är att säkra vad som fortfarande finns, kartlägga spåret och säga om en brådskande ansökan är realistisk.",
          },
          {
            title: "Internt bedrägeri och förskingring",
            kind: "Bolag",
            jurisdictions: "Brittiska bolag, ibland nominees och anknutna enheter",
            text: "Ett glapp i räkenskaperna, en sedan länge anställd medarbetare, eller en styrelseledamot som verkar ha hjälpt sig själv. Akten måste fastställa vem som gjorde vad, och om något återstår som är värt att nå.",
          },
          {
            title: "Plånböcker, börser och omvandling av digitala tillgångar",
            kind: "Digitala tillgångar",
            jurisdictions: "On-chain-uppgifter, reglerade och oreglerade plattformar",
            text: "Värde har rört sig över plånböcker, bridges eller börser. On-chain-data är användbara endast när begränsningarna anges. Vi kartlägger vad uppgifterna visar och gör den bilden till bevisuppgifter.",
          },
          {
            title: "Gränsöverskridande fakta, Londonakt",
            kind: "Gränsöverskridande",
            jurisdictions: "England och Wales, med lokal counsel där det krävs",
            text: "En förlust med brittisk anknytning med ursprung eller vinning utomlands. Utländska register, personer som har lämnat jurisdiktionen och verkställighet på annan plats hanteras med lokal counsel.",
          },
        ],
      },
      standing: {
        label: "Ansvar",
        heading: "Ansvaret ska vara synligt.",
        items: [
          "Varje ärende har en namngiven handledande solicitor. Specialiserade utredare och forensiska yrkespersoner kopplas in när deras kompetens behövs, med roll och status förklarad tydligt.",
          "SRA-nummer 510498 — auktoriserad och reglerad av Solicitors Regulation Authority.",
          "Du kan kontrollera vår tillsynsstatus och praktikstatus för varje solicitor som namnges på denna webbplats i SRA:s offentliga register på sra.org.uk.",
        ],
        note: "Bekräfta aktuella behöriga personer i det offentliga SRA-organisationsregistret. Vi publicerar inte återvinningar eller vinstfrekvenser.",
        link: "Öppna det offentliga SRA-registret",
      },
      awards: {
        heading: "Våra utmärkelser",
        text: "Edison Law har tilldelats ett antal betydande branschutmärkelser, bland annat följande.",
        items: [
          {
            src: "/images/awards/legal-500.png",
            alt: "The Legal 500 United Kingdom, högsta nivå 2023",
            width: 148,
            height: 214,
          },
          {
            src: "/images/awards/global-awards.png",
            alt: "Global Awards 2015 Corporate LiveWire, vinnare",
            width: 380,
            height: 192,
          },
          {
            src: "/images/awards/ai-legal-awards.png",
            alt: "AI Legal Awards 2015, vinnare, Best City Boutique UK",
            width: 354,
            height: 283,
          },
          {
            src: "/images/awards/the-lawyer-awards.png",
            alt: "The Lawyer Awards 2015, vinnare, Boutique Firm of the Year City",
            width: 723,
            height: 1024,
          },
        ],
      },
      profile: {
        label: "Verksamheten",
        heading: "De som ansvarar för arbetet.",
        text: "Profilerna förklarar yrkesstatus, roll i ett ärende och, där det är relevant, vem som handleder arbetet. Bekräfta behöriga personer i det offentliga SRA-registret.",
        collectiveCaption: "Richard Edison",
        collectiveMark: "Ägare",
        collectiveAlt: "Richard Edison, ägare av Edison Law",
        collectiveLabel: "De övriga",
        cta: { label: "Alla profiler", href: "/people/" },
      },
      insight: {
        label: "Insikter",
        heading: "Praktiska anteckningar om bevisning och återvinning.",
      },
      london: {
        heading: "En Londonverksamhet.",
        text: "Edison Law är en SRA-reglerad solicitorfirma i London. Arbete som korsar gränser hålls ändå här: evidensakten, den engelska domstolen, och lokal counsel där utländsk process krävs.",
        meta: "London",
        cta: { label: "Om byrån", href: "/about/" },
      },
      practiceBar: {
        cta: { label: "Utforska våra verksamhetsområden", href: "/expertise/" },
      },
      cta: {
        heading: "Diskutera ett ärende.",
        text: "Ge oss en kort redogörelse för vad som har hänt, vilka som är inblandade och eventuella omedelbara tidsfrister. Skicka inte lösenord, privata nycklar, fröfraser eller originalhandlingar som styrker identitet.",
        cta: { label: "Skicka en första förfrågan", href: "/contact/" },
      },
    },
  },

  pages: {
    expertise: {
      path: "/expertise/",
      title: "Verksamhetsområden | Edison Law, London",
      description:
        "Enskilt åtal, tillgångsspårning, kryptobedrägeri, tillsynsförsvar, gränsöverskridande återvinning och bolagsunderrättelser — rättsliga vägar vid bedrägeri, utredning och återvinning.",
      heading: "Rättsliga vägar vid bedrägeri, utredning och återvinning.",
      lead: "Ett ärende om ekonomisk brottslighet kan rymma flera möjliga vägar samtidigt: en brottsanmälan, enskilt åtal, brådskande injunction, civilrättslig återvinning, tillsynssvar eller ett beslut att inte gå vidare. Vår roll är att fastställa vilken väg bevisningen bär och om den sannolika nyttan motiverar kostnad och störning.",
      cta: { label: "Diskutera ett ärende", href: "/contact/" },
    },
    privateProsecutions: {
      path: "/expertise/private-prosecutions/",
      title: "Solicitors för enskilt åtal i London | Edison Law",
      description:
        "Bedömning och förberedelse av enskilt väckt brottmål där bevisningen och skyldigheterna av allmänt intresse bär den vägen.",
      parent: { label: "Verksamhetsområden", href: "/expertise/" },
      heading: "Ett enskilt åtal måste tåla oberoende granskning.",
      lead: "Ett enskilt åtal (private prosecution) kan ge en väg när en offentlig myndighet har avböjt att gå vidare, men det är inte bara en privat version av ett civilrättsligt krav. Åklagaren tar på sig viktiga skyldigheter avseende rättvisa, disclosure och uppriktighet. Vi bedömer bevisningen, förbereder målet och anlitar specialistcounsel där förfarande är motiverat.",
      cta: { label: "Begär en inledande åtalsbedömning", href: "/contact/" },
      ctaBand: {
        heading: "Begär en inledande åtalsbedömning.",
        text: "Ge oss en kort redogörelse för påståendet, vad som redan har anmälts och den bevisning du har. Skicka inte originalhandlingar som styrker identitet via detta formulär.",
      },
      when: [
        "En anmälan till polisen, Action Fraud eller SFO har inte lett till någon utredning.",
        "Förlusten är tillräckligt allvarlig för att ett enskilt åtal ska vara en realistisk väg.",
        "Du behöver charging decisions, rättegångsförhandling, confiscation eller skadestånd till målsägande hanterat som ett ärende.",
      ],
      scope: [
        "Charging decisions",
        "Rättegångsförhandling",
        "Confiscation-förfaranden",
        "Skadestånd till målsägande",
      ],
      approach:
        "Ett enskilt åtal bedöms lika strängt som vilket statligt åtal som helst. Vi sätter evidensakten till straffprocessuell standard från dag ett, hanterar disclosure och oanvänt material, och anlitar counsel utifrån antagandet att varje steg kommer att prövas av försvaret.",
      faqs: [
        {
          q: "Är ett enskilt åtal alltid rätt väg?",
          a: "Nej. Vi råder om sakskäl, kostnad och sannolikheten för återvinning innan en klient förbinder sig. Om bevisningen inte håller säger vi det.",
        },
        {
          q: "Kan detta löpa parallellt med civilrättslig återvinning?",
          a: "Ja. Återvinningsstrategin läggs fast från början, och samordnar straffrättslig restraint och confiscation med civilrättslig frysning och sakrättsligt skydd där det når pengarna snabbare.",
        },
      ],
    },
    assetTracing: {
      path: "/expertise/asset-tracing-recovery/",
      title: "Solicitors för tillgångsspårning och återvinning i London | Edison Law",
      description:
        "Identifiering av potentiellt återvinningsbart värde och val av proportionerliga civilrättsliga, straffrättsliga eller insolvensrättsliga åtgärder.",
      parent: { label: "Verksamhetsområden", href: "/expertise/" },
      heading: "Hitta tillgångarna innan du väljer åtgärden.",
      lead: "Återvinningsstrategi börjar med två frågor: vilket värde kan identifieras, och kan det realistiskt nås? Vi förenar juridisk analys med finansiella och bolagsrättsliga förfrågningar för att identifiera tillgångar, ägarstrukturer och de åtgärder som står till buds i relevant jurisdiktion.",
      cta: { label: "Diskutera en återvinningsstrategi", href: "/contact/" },
      ctaBand: {
        heading: "Diskutera en återvinningsstrategi.",
        text: "Berätta vad som förlorades, vad du redan vet om vart det tog vägen, och eventuell tidsfrist för rättsskydd. Skicka inte lösenord eller originalhandlingar som styrker identitet.",
      },
      when: [
        "Medel har lämnat klientens kontroll och destinationen är oklar.",
        "En svarande verkar inte ha något, och det behöver prövas.",
        "Brådskande frysning, sakrättsligt skydd eller disclosure krävs.",
      ],
      scope: [
        "Worldwide freezing orders",
        "Sakrättsliga förelägganden (proprietary injunctions)",
        "Förordnanden om receivership",
        "Trust piercing",
      ],
      approach:
        "Den första frågan är inte hur ett bedrägeri byggdes utan var pengarna finns nu. Vi identifierar vilka tillgångar som finns, var de ligger, vem som innehar dem och vilken jurisdiktions åtgärder som gäller — och om det är ekonomiskt meningsfullt att driva dem.",
      faqs: [
        {
          q: "Kan ni garantera återvinning?",
          a: "Nej. Vi säger tidigt när det finns värde att driva, och lika tidigt när spåret tar slut.",
        },
        {
          q: "Arbetar ni med forensiska revisorer och utredare?",
          a: "Ja. Spårning, frysning och verkställighet drivs som en enda strategi tillsammans med byråns forensiska och utredande team, och med lokal counsel utomlands där det krävs.",
        },
      ],
    },
    cryptoFraud: {
      path: "/expertise/crypto-fraud-digital-assets/",
      title: "Solicitors för kryptobedrägeri och digitala tillgångar i London | Edison Law",
      description:
        "Omvandling av transaktionsdata, plattformsuppgifter och enhetsbevisning till ett rättsligt fall med tydligt angivna begränsningar.",
      parent: { label: "Verksamhetsområden", href: "/expertise/" },
      heading: "Från transaktionsdata till tillåten bevisning.",
      lead: "Blockkedjeuppgifter kan visa hur digitala tillgångar rörde sig, men attribution, ägande och återvinningsbarhet beror vanligen på bevisning bortom kedjan. Vi arbetar med transaktionsdata, börsuppgifter, enhetsbevisning och rättsliga disclosure-vägar för att bygga en korrekt kvalificerad bild.",
      cta: { label: "Säkra och bedöm transaktionsspåret", href: "/contact/" },
      ctaBand: {
        heading: "Säkra och bedöm transaktionsspåret.",
        text: "Skicka transaktionsidentifierare, plattformsnamn och datum — inte fröfraser, privata nycklar eller lösenord. Vi kan inte ångra en blockkedjetransaktion.",
      },
      when: [
        "Värde har rört sig över plånböcker, mixers, bridges eller börser.",
        "En börs eller tjänsteleverantör håller frysta saldon.",
        "En betalningsavledning eller ett authorised push payment-bedrägeri har just inträffat.",
      ],
      scope: [
        "Blockkedjespårning",
        "Kontakt med börser",
        "Tvister om NFT och tokens",
        "Tvister om DeFi-protokoll",
      ],
      approach:
        "On-chain-data är bara användbara när begränsningarna anges. Vi kartlägger vad uppgifterna visar, tar fram den evidensbild som behövs för skyndsamma ansökningar, och gör spårningsarbetet till bevisuppgifter som överlever övergången från injunction till rättegång.",
      faqs: [
        {
          q: "Kan ni garantera att krypto återvinns?",
          a: "Nej. Den som garanterar återvinning beskriver inte detta arbete ärligt.",
        },
        {
          q: "Hur snabbt kan ni agera?",
          a: "Dessa mål vinns eller förloras vanligen under de första dagarna. Vi bygger den bild som behövs för att stödja en brådskande ansökan innan medel sprids vidare.",
        },
      ],
    },
    regulatory: {
      path: "/expertise/regulatory-defence-investigations/",
      title: "Solicitors för tillsynsförsvar och utredningar i London | Edison Law",
      description:
        "Råd om förelägganden, förhör, interna granskningar och kontakt med utredande myndigheter.",
      parent: { label: "Verksamhetsområden", href: "/expertise/" },
      reviewTopic: "SRA and regulatory enforcement policy",
      heading: "Kontrollera det första svaret på en utredning.",
      lead: "De första timmarna av en tillsyns- eller brottsutredning kan forma allt som följer. Vi råder om evidenssäkring, privilege, intern kommunikation, informationsbegäran och förhör, och utformar därefter ett svar utifrån den berörda myndighetens befogenheter och förfarande.",
      cta: { label: "Få råd om en utredning", href: "/contact/" },
      ctaBand: {
        heading: "Få råd om en utredning.",
        text: "Namnge myndigheten om du kan, beskriv föreläggandet eller kontakten, och säg vilken tidsfrist du har. Skicka inte stora volymer konfidentiellt material via detta formulär.",
      },
      when: [
        "En dawn raid, ett förhör under caution eller ett information notice har landat.",
        "En intern utredning kan behöva rapporteras.",
        "Civilrättslig förlikning eller judicial review är ett realistiskt nästa steg.",
      ],
      scope: [
        "Svar på dawn raid",
        "Förhör under caution",
        "Förhandlingar om civilrättslig förlikning",
        "Judicial review",
      ],
      approach:
        "Tillsynsarbete vinns på aktens kvalitet och på tidpunkten för vad som sägs. Vi identifierar de handlingar som avgör frågan, skyddar privilege och råder när förhandling är mer användbar än korrespondens.",
      faqs: [
        {
          q: "Kommer ni att berätta mer för en tillsynsmyndighet än vad som krävs?",
          a: "Nej. Disclosure ska vara korrekt och tillräcklig. Den ska inte vara en berättelse som bjuds i hopp.",
        },
        {
          q: "Kan försvar löpa parallellt med återvinning mot någon annan?",
          a: "Ja, där fakta bär det. Försvar av en person och återvinning mot en annan kan sitta i samma strategi. Vi beskriver inte en utredning som avslutad om den inte är det.",
        },
      ],
    },
    crossBorder: {
      path: "/expertise/cross-border-fraud-corruption/",
      title: "Solicitors för gränsöverskridande bedrägeri och korruption i London | Edison Law",
      description:
        "Samordning av engelska förfaranden med lämpligt kvalificerad counsel där bevisning, svarande eller tillgångar finns utomlands.",
      parent: { label: "Verksamhetsområden", href: "/expertise/" },
      heading: "En strategi över flera rättssystem.",
      lead: "När bevisning, svarande och tillgångar är spridda över jurisdiktioner spelar ordningen på åtgärderna roll. Vi samordnar den engelska rättsliga strategin och arbetar med oberoende lokal counsel om utländsk process, evidensinhämtning, interimistiskt skydd, erkännande och verkställighet.",
      cta: { label: "Diskutera de berörda jurisdiktionerna", href: "/contact/" },
      ctaBand: {
        heading: "Diskutera de berörda jurisdiktionerna.",
        text: "Berätta var personerna, underlaget och tillgångarna verkar finnas, och vad som redan har inletts i någon domstol. Skicka inte originalhandlingar som styrker identitet via detta formulär.",
      },
      when: [
        "En förlust med brittisk anknytning har sitt ursprung — eller sin vinning — utomlands.",
        "Bevisning, frysning eller verkställighet behövs i mer än ett land.",
        "En utländsk dom eller skiljedom behöver erkännas och verkställas.",
      ],
      scope: [
        "Ömsesidig rättslig hjälp (mutual legal assistance)",
        "Letters of request",
        "Erkännande av utländska domar",
        "Verkställighet av skiljedomar",
      ],
      approach:
        "Gränsöverskridande arbete misslyckas när varje jurisdiktion behandlas som ett separat mål. Vi håller parallella förfaranden samman: vilket krav, i vilken domstol, i vilken ordning och till vilken kostnad — med lokal counsel, forensiska revisorer och utredare hanterade som en enda strategi.",
      faqs: [
        {
          q: "Har ni kontor utomlands?",
          a: "Verksamheten är baserad i London. Vi arbetar med lokal counsel, registerforskare och utredare i de jurisdiktioner där pengarna faktiskt finns.",
        },
        {
          q: "Kan ni delge en svarande som har lämnat landet?",
          a: "Att lokalisera personer som har flyttat eller gått under jorden är en del av utredningsarbetet. Delgivning och verkställighet följer när de kan hittas.",
        },
      ],
    },
    corporateIntelligence: {
      path: "/expertise/corporate-intelligence/",
      title: "Solicitors för bolagsunderrättelser och pre-litigation i London | Edison Law",
      description:
        "Lagliga, konfidentiella förfrågningar före process, investering, utnämning eller annan väsentlig exponering.",
      parent: { label: "Verksamhetsområden", href: "/expertise/" },
      reviewTopic: "sanctions and export control",
      heading: "Pröva motparten innan exponering blir förlust.",
      lead: "En konfidentiell granskning före process kan klargöra vem som kontrollerar en motpart, om det finns väsentliga krav eller sanktionsbekymmer och om en framtida dom sannolikt har praktiskt värde. Förfrågningar avgränsas för ett definierat rättsligt eller kommersiellt syfte och genomförs med lagliga medel.",
      cta: { label: "Avgränsa en konfidentiell granskning", href: "/contact/" },
      ctaBand: {
        heading: "Avgränsa en konfidentiell granskning.",
        text: "Beskriv det beslut du behöver fatta, motparten så som du känner den nu, och tidsfristen. Hemliga eller synliga steg tas endast på instruktion.",
      },
      when: [
        "En transaktion, investering eller utnämning kräver förstärkt due diligence.",
        "Förmögenhetskälla eller integritet behöver verifieras innan medel flyttas.",
        "Du behöver en realistisk bild av om en motpart kan infria en dom.",
      ],
      scope: [
        "Förstärkt due diligence",
        "Verifiering av förmögenhetskälla (source of wealth)",
        "Integritetsövervakning",
        "Bedömning av processrisk",
      ],
      approach:
        "Underrättelser före process är användbara endast om de är diskreta och användbara. Vi fastställer vad en motpart äger, vilka de är knutna till, och om pengar som läggs på att jaga dem skulle vara bortkastade — innan en klient förbinder sig till en handlingslinje.",
      faqs: [
        {
          q: "Är detta samma sak som att anlita privatdetektiver?",
          a: "Fält- och öppenkällsförfrågan är en del av arbetet, bedrivet till en standard som håller om ärendet senare blir process eller enskilt åtal.",
        },
        {
          q: "Kommer den berörde att veta att hen granskas?",
          a: "Utgångspunkten är konfidentiell. Vi säger till om ett steg skulle göra förfrågan synlig, och vi tar inte det steget utan instruktion.",
        },
      ],
    },
    investigations: {
      path: "/investigations/",
      title: "Utredningar om ekonomisk brottslighet i London | Edison Law",
      description:
        "Utredare och forensiska specialister i London. Vi fastställer vad som hände, säkrar bevisning och lokaliserar tillgångar innan en rättslig strategi väljs.",
      heading: "Fastställ vad som hände. Säkra det som bevisar det.",
      lead: "En utredning ska besvara definierade frågor, säkra det underliggande materialet och skilja bevisning från slutledning. Jurister, utredare och forensiska specialister arbetar mot en gemensam omfattning så att den resulterande akten kan bära råd, rapportering, process eller åtal om det krävs.",
      schema: "investigations",
      serviceType: "Financial crime investigation",
      intro: [
        "Verksamhetsområden är den rättsliga vägen. Utredningar är hur akten byggs. Solicitors, utredare och forensiska specialister arbetar mot en gemensam omfattning så att iakttagelser kan bedömas, lämnas ut och, där det behövs, åberopas i förfarande.",
        "Vi agerar för bolag, organisationer och enskilda som har utsatts för brott, och för styrelser som har funnit ett problem inuti organisationen.",
      ],
      jump: [
        { label: "Vad vi utreder", href: "#work" },
        { label: "Teknik", href: "#cobra-ai" },
        { label: "Vem som utför arbetet", href: "#investigators" },
        { label: "Inled en förfrågan", href: "#instruct" },
      ],
      people: {
        label: "Vem som utför arbetet",
        heading: "Utredare och forensiska specialister.",
        text: "Solicitors leder utredningen och fattar de rättsliga besluten. Detta är specialisterna de arbetar med från första dagen. Bekräfta behöriga personer i det offentliga SRA-registret.",
      },
      process: {
        label: "Hur en utredning löper",
        heading: "Tre steg. En akt.",
        items: [
          {
            index: "01",
            icon: "evidence",
            title: "Avgränsa frågorna",
            text: "Vi kommer överens om vad som måste fastställas, vad som ligger utanför omfattningen, och vad som måste säkras innan någon börjar samla in.",
          },
          {
            index: "02",
            icon: "fees",
            title: "Samla in och pröva",
            text: "Handlingar, enheter, konton och vittnen tas in i en form som senare kan lämnas ut, läggas fram eller läggas åt sidan med ett skäl.",
          },
          {
            index: "03",
            icon: "solicitor",
            title: "Rapportera vad som är fastställt",
            text: "Produkten är en akt som solicitorn kan förlita sig på: vad som är visat, vad som förblir slutledning, och vilka rättsliga vägar det bär.",
          },
        ],
      },
      cta: { label: "Tala med utredningsverksamheten", href: "/contact/" },
      ctaBand: {
        heading: "Tala med utredningsverksamheten.",
        text: "Skicka de fakta du redan har. Skicka inte lösenord, privata nycklar, fröfraser eller originalhandlingar som styrker identitet.",
      },
    },
    internalInvestigations: {
      path: "/investigations/internal-investigations/",
      title: "Interna utredningar | Edison Law, London",
      description:
        "Utredningar på styrelsenivå, av anställda och visselblåsare i London, bedrivna till en standard som håller om du senare åtalar, rapporterar eller processar.",
      parent: { label: "Utredningar", href: "/investigations/" },
      heading: "Hjälp styrelsen att fatta ett försvarbart beslut.",
      lead: "Något inuti verksamheten stämmer inte, och du behöver en akt som fortfarande håller om du senare avskedar, rapporterar eller åtalar. Vi avgränsar förfrågan så att beslut om anställning, styrning och rapportering kan förklaras.",
      schema: "service",
      serviceType: "Internal investigation",
      relatedExpertise: ["regulatory", "corporate-intelligence", "private-prosecutions"],
      when: [
        "En visselblåsarrapport, oförklarade betalningar eller ett glapp i räkenskaperna har landat hos styrelsen.",
        "Misskötsamhet av anställd eller förtroendeman behöver fastställas innan någon avskedas eller anmäls.",
        "Du kan behöva underrätta FCA, SFO, en välgörenhetstillsyn eller försäkringsgivare, och akten måste vara korrekt när du gör det.",
      ],
      scope: [
        "Avgränsning och privilege",
        "Intervjuer med anställda och vittnen",
        "Dokument- och finansiell rekonstruktion",
        "Uppföljning av visselblåsare",
        "Råd om tillsynsanmälan",
        "Rekommendationer om åtgärd och styrning",
      ],
      approach:
        "De första besluten gäller hold, åtkomst och privilege — inte en presslinje. Vi identifierar vem som ska intervjuas, i vilken ordning, och vad som måste säkras innan någon underrättas. Iakttagelser skrivs så att de senare kan lämnas ut utan genans. Om fakta pekar på ett brott mot organisationen kan samma akt bära ett enskilt åtal eller återvinning; vi driver inte en andra utredning för att komma dit.",
      faqs: [
        {
          q: "Kommer de berörda att veta att de utreds?",
          a: "Inte alltid, och inte till en början. Vi säger till när ett steg skulle göra förfrågan synlig. Hemliga steg tas endast på instruktion, och endast med lagliga medel.",
        },
        {
          q: "Är detta samma sak som en HR-utredning?",
          a: "Nej. Ett anställningsförfarande kan löpa vid sidan av detta arbete. Det är inte en ersättning för en evidensakt som kommer att läsas av en tillsynsmyndighet, en svarande eller en domare.",
        },
        {
          q: "Kan ni garantera det utfall styrelsen vill ha?",
          a: "Nej. Vi talar om vad materialet bär. Om det inte bär ett avsked, en anmälan eller ett åtal säger vi det innan kostnaderna fortgår.",
        },
      ],
    },
    financialCrimeInvestigations: {
      path: "/investigations/financial-crime/",
      title: "Utredningar om ekonomisk brottslighet | Edison Law, London",
      description:
        "Utredningar om bedrägeri och ekonomisk brottslighet i London: vilka som var inblandade, hur upplägget drevs, och vad du faktiskt kan visa.",
      parent: { label: "Utredningar", href: "/investigations/" },
      heading: "Rekonstruera handlande, deltagare och förlust.",
      lead: "Du tror att ett bedrägeri har skett, men du kan ännu inte säga vem som gjorde vad eller om handlingarna kommer att visa det. Detta arbete ger en kronologi, vittnesbevisning och en tydlig redogörelse för vad som är känt och vad som inte är det.",
      schema: "service",
      serviceType: "Financial crime investigation",
      relatedExpertise: ["private-prosecutions", "asset-tracing", "regulatory"],
      when: [
        "En anmälan till polisen, Action Fraud eller SFO har inte gett någon utredning du kan använda.",
        "Förlusten är allvarlig, men det är ännu inte klart vem som gjorde vad, eller om handlingarna kommer att visa det.",
        "Du behöver en akt av straffprocessuell standard eftersom ett enskilt åtal, ett frysningsföreläggande eller en tillsynsanmälan kan följa.",
      ],
      scope: [
        "Avgränsning och meritbedömning",
        "Identifiering av vittnen och vittnesmål",
        "Dokumentinhämtning och kontinuitet",
        "Finansiell rekonstruktion med forensiska specialister",
        "Oanvänt material och disclosure-uppgifter",
        "Underlag för charging, injunction eller anmälan",
      ],
      approach:
        "Vi börjar med att införa ordning: vad som påstås, vad som finns i handen, vad som saknas, och vad som skulle behöva vara sant för att ett mål ska stå. Utredare tar vittnesmål och samlar handlingar; forensiska specialister rekonstruerar penningflödet; solicitors avgör vad akten är till för. Inget inhämtas på ett sätt som senare skulle kompromettera ett åtal. Om bevisningen inte håller stannar vi och säger det.",
      faqs: [
        {
          q: "Är detta en ersättning för polisen?",
          a: "Nej. Det är arbetet att bygga en akt som myndigheterna har avböjt att bygga, eller inte har byggt till en standard du kan använda. Ett enskilt åtal förblir ett separat rättsligt beslut.",
        },
        {
          q: "Garanterar ni ett åtal eller en återvinning?",
          a: "Nej. Utredningen besvarar om något av det är realistiskt. Det svaret är poängen med att ge uppdraget.",
        },
        {
          q: "Hur skiljer sig detta från att anlita oreglerade utredare?",
          a: "Förfrågan bedrivs inuti en solicitorverksamhet, till en standard som kommer att prövas av försvaret och domstolen. Metod, privilege och disclosure är en del av arbetet, inte en eftertanke.",
        },
      ],
    },
    digitalInvestigations: {
      path: "/investigations/digital-crypto/",
      title: "Digitala utredningar och kryptoutredningar | Edison Law, London",
      description:
        "Digitala utredningar, betalningsutredningar och kryptovalutautredningar i London: säkra enheter och plånböcker, kartlägg spåret och ta fram bevisning som en domstol godtar.",
      parent: { label: "Utredningar", href: "/investigations/" },
      heading: "Säkra enheter. Ta fram en spårbar akt.",
      lead: "Pengar eller meddelanden har just lämnat, och du behöver spåret hållas innan någon tittar. Vi säkrar enheter och konton, och tar därefter fram transaktions- och kommunikationsuppgifter som kan läggas fram.",
      schema: "service",
      serviceType: "Digital and cryptocurrency investigation",
      relatedExpertise: ["crypto-fraud", "asset-tracing", "private-prosecutions"],
      when: [
        "Medel har lämnat via en betaltjänst, korrespondentbank, e-penningkonto eller plattform för digitala tillgångar.",
        "Enheter, brevlådor eller plånböcker som fortfarande rymmer bevisning har ännu inte avbildats eller frysts.",
        "En börs eller leverantör kan hålla ett saldo, och du behöver en evidensbaserad begäran snarare än ett hopp.",
      ],
      scope: [
        "Evidenssäkring och hold-meddelanden",
        "Betalningsspårning över banker och PSP:er",
        "Kartläggning av blockkedja och plånböcker",
        "Kontakt med börser och plattformar",
        "Flödesscheman och bevisuppgifter",
        "Stöd för skyndsamma injunctions",
      ],
      approach:
        "On-chain-data och bankuppgifter är bara användbara när begränsningarna anges. Vi fångar källan först, kartlägger därefter vad uppgifterna visar — genom betalningsinstitut, mixers, bridges och börser — och tar fram den evidensbild som behövs för en brådskande ansökan. Spårningsarbetet skrivs så att det kan gå från injunction till rättegång utan att byggas om.",
      faqs: [
        {
          q: "Kan ni garantera att krypto eller avledda medel återvinns?",
          a: "Nej. Den som garanterar återvinning beskriver inte detta arbete ärligt. Vi säger tidigt när värde fortfarande är nåbart, och lika tidigt när det inte är det.",
        },
        {
          q: "Ska vi logga in i plånboken eller på börsen själva?",
          a: "Vanligen inte. Att gå in på ett konto kan förstöra metadata, varna en motpart eller skapa ett kontinuitetsproblem. Beskriv vad du har. Vi talar om hur det ska säkras.",
        },
        {
          q: "Hur snabbt kan ni börja?",
          a: "Dessa ärenden är byggda för hastighet. Skicka vad du har: transaktionshashar, betalningsreferenser, institutnamn, datum. Skicka inte fröfraser eller lösenord.",
        },
      ],
    },
    crossBorderInvestigations: {
      path: "/investigations/cross-border/",
      title: "Gränsöverskridande utredningar | Edison Law, London",
      description:
        "Gränsöverskridande utredningar om ekonomisk brottslighet från London: utländska register, utländska dotterbolag och svarande som har lämnat jurisdiktionen.",
      parent: { label: "Utredningar", href: "/investigations/" },
      heading: "Samordna lagliga förfrågningar över gränser.",
      lead: "Personerna eller underlaget finns utanför England, och du behöver fakta som en London-domstol faktiskt kan använda. Vi inhämtar och samordnar lagliga förfrågningar över register, domstolar och lokala yrkespersoner.",
      schema: "service",
      serviceType: "Cross-border investigation",
      relatedExpertise: ["cross-border", "asset-tracing", "private-prosecutions"],
      when: [
        "Bolag, fastigheter eller bankkonton finns i en annan jurisdiktion, och den brittiska akten förklarar dem inte.",
        "En svarande har flyttat, bytt namn eller gått under jorden utanför England och Wales.",
        "Ett utländskt dotterbolag, en leverantör eller ett joint venture är där misskötsamheten faktiskt skedde.",
      ],
      scope: [
        "Utländska bolags-, domstols- och insolvensuppgifter",
        "Upphandlings- och tillsynsdatabaser",
        "Lokalisering av svarande och vittnen",
        "Förfrågningar i utländska dotterbolag",
        "Samordning med lokal counsel och forskare",
        "Förarbete för delgivning och verkställighet",
      ],
      approach:
        "Vi inhämtar vad det offentliga och betalda registret ger, på de språk det är skrivet, och vi är noga med hur det inhämtas. Registerutdrag, domstolsakter och lokala förfrågningar loggas så att de kan läggas fram. Där en person måste hittas är det utredning, inte en delgivares eftertanke. Lokal counsel anlitas när ett steg annars skulle vara olagligt eller osynligt från London.",
      faqs: [
        {
          q: "Har ni kontor utomlands?",
          a: "Vi är en Londonverksamhet. Där råd om utländsk rätt eller lokal process krävs identifierar och anlitar vi lämpligt kvalificerad lokal counsel med klientens godkännande.",
        },
        {
          q: "Kan ni delge någon som har lämnat landet?",
          a: "Att hitta dem är utredningssteget. Delgivning och verkställighet följer när de kan hittas. Vi säger till om de inte kan hittas.",
        },
        {
          q: "Är detta ömsesidig rättslig hjälp?",
          a: "MLA och letters of request är rättsliga vägar, inte utredningen i sig. Utredningen tar fram de fakta de vägarna behöver. Se Gränsöverskridande bedrägeri och korruption under Verksamhetsområden för det juridiska arbetet.",
        },
      ],
    },
    assetTracingInvestigations: {
      path: "/investigations/asset-tracing/",
      title: "Utredningar om tillgångsspårning | Edison Law, London",
      description:
        "Utredningar om tillgångsspårning i London: vart förskingrat värde tog vägen, om det fortfarande finns där, och om det är värt kostnaden att driva det.",
      parent: { label: "Utredningar", href: "/investigations/" },
      heading: "Identifiera ägande, kontroll och realistiska objekt.",
      lead: "Du behöver veta vart pengarna har tagit vägen, och om något av dem fortfarande är nåbart, innan du lägger pengar på en frysning. Rättsliga åtgärder kommer efter det svaret, inte före.",
      schema: "service",
      serviceType: "Asset tracing investigation",
      relatedExpertise: ["asset-tracing", "crypto-fraud", "cross-border"],
      when: [
        "Medel har lämnat, och destinationen är en bank, ett bolag, en fastighet, en familjemedlem eller en plånbok — eller allt detta.",
        "En svarande verkar inte ha något, och det behöver prövas innan du lägger pengar på förfarande.",
        "Du behöver en tillgångsbild som stöd för en ansökan om frysning, sakrättsligt skydd eller disclosure i högt tempo.",
      ],
      scope: [
        "Medelflöde från förlustögonblicket",
        "Bankkedjor och betalningsinstitut",
        "Nominee-innehav och anknutna bolag",
        "Fastigheter, fordon, investeringar och varor",
        "Omvandling av digitala tillgångar och utbetalning",
        "Bedömningar av verkställbarhet före talan",
      ],
      approach:
        "Vi följer värde från förlustögonblicket och säger, tidigt, om det vi finner är värt kostnaden att nå. En tillgång som finns är inte alltid en tillgång som kan frysas, belånas eller säljas. Iakttagelser tas fram som scheman och bevisuppgifter som solicitors kan lägga fram för en domstol samma vecka, och som forensiska sakkunniga kan stå bakom om de korsförhörs.",
      faqs: [
        {
          q: "Kan ni garantera att tillgångar hittas?",
          a: "Nej. Vi talar om tidigt när det finns värde att driva, och lika tidigt när spåret tar slut. Det är det användbara svaret.",
        },
        {
          q: "Hur skiljer sig detta från Tillgångsspårning och återvinning under Verksamhetsområden?",
          a: "Denna sida är utredningsarbetet: att lokalisera värde och säga om det är nåbart. Sidan under Verksamhetsområden är det juridiska arbete som följer — freezing orders, receivership, trust piercing och verkställighet.",
        },
        {
          q: "Jagar ni tillgångar som kostar mer än de ger tillbaka?",
          a: "Inte om vi kan se det komma. En spårning som inte är krutet värd stoppas, och klienten underrättas.",
        },
      ],
    },
    insights: {
      path: "/insights/",
      title: "Insikter | Utredningsanteckningar | Edison Law",
      description:
        "Praktiska anteckningar om bevisning, utredningar och återvinning från Edison Law i London. Allmän information, inte råd i ett visst mål.",
      heading: "Praktiska anteckningar om bevisning, utredningar och återvinning.",
      lead: "Anteckningar om vad som ska säkras, vad en källa kan fastställa, när brådskande skydd kan vara lämpligt, och var rättsliga eller evidensmässiga gränser uppstår. Allmän information, inte råd i ett visst mål.",
    },
    people: {
      path: "/people/",
      title: "Medarbetare | Edison Law, London",
      description:
        "De som ansvarar för arbete hos Edison Law. Bekräfta aktuella behöriga personer i det offentliga SRA-registret.",
      heading: "De som ansvarar för ditt arbete.",
      lead: "Varje profil anger personens roll i ett ärende. Yrkestitlar är inte ett tillstånd för förbehållen verksamhet. Bekräfta aktuella behöriga personer i det offentliga SRA-registret.",
    },
    joinUs: {
      path: "/join-us/",
      title: "Karriär | Edison Law",
      description:
        "Karriär hos Edison Law i London. Jurister, utredare och forensiska specialister inom ekonomisk brottslighet, enskilt åtal och återvinning.",
      heading: "Arbeta i ärenden där metod och omdöme syns.",
      lead: "Edison Law är en liten reglerad verksamhet. Anställningar sitter inne i byrån, med namngiven handledning. Konsultuppdrag är ett definierat uppdrag för ett stycke arbete — inte en yrkestitel i SRA-registret. Vi välkomnar båda vägarna när ett verkligt behov finns.",
      intro: [
        "Sök en anställning när en vakans är utlyst. För konsultuppdrag, skriv med det arbete du kan ta och den grund på vilken du skulle anlitas.",
        "Om ingen roll är utlyst är en kort spekulativ förfrågan fortfarande välkommen. Skicka inte originalhandlingar som styrker identitet.",
      ],
      openRoles: 0,
      jump: [
        { label: "Karriär hos oss", href: "#careers" },
        { label: "Varför Edison Law", href: "#why" },
        { label: "Aktuella möjligheter", href: "#vacancies" },
      ],
      cta: { label: "Visa aktuella möjligheter (0)", href: "#vacancies" },
      cvCta: { label: "Skicka CV", href: "mailto:cv@example.com" },
      tracks: {
        label: "Karriär hos oss",
        heading: "Arbetet du skulle göra.",
        items: [
          {
            title: "Jurister",
            text: "Solicitors och barristers som driver akter från första uppdrag till rättegång, injunction och verkställighet. Enskilt åtal, återvinning och tillsynsutredningar, där skyldigheterna avseende uppriktighet och disclosure tas lika allvarligt som resultatet.",
          },
          {
            title: "Utredare",
            text: "Fält- och dokumentförfrågan som gör en misstanke till en uppsättning fastställda fakta: vittnen, kontinuitet, oanvänt material, och personerna och tillgångarna bakom ett bedrägeri — inklusive dem som har flyttat eller gått under jorden.",
          },
          {
            title: "Forensiska specialister",
            text: "Finansiell och digital analys som en domstol godtar: huvudböcker, betalningskedjor, blockkedjespår och sakkunnigbevisning. Hastighet när medel fortfarande rör sig; precision när siffrorna ska överleva korsförhör.",
          },
          {
            title: "Tillgångsspårning",
            text: "Lokalisera återvinningsbart värde och säg, tidigt, om det är värt kostnaden att driva det. Register, nominees, gränsöverskridande strukturer och skillnaden mellan en tillgång som finns och en tillgång som kan nås.",
          },
          {
            title: "Verksamhetsstöd",
            text: "De som håller en specialistverksamhet igång: inflöde av ärenden, sekretess, fakturering och den operativa disciplin en straffrättslig evidensakt kräver. Ansökningar prövas när arbetet behöver dem.",
          },
        ],
      },
      why: {
        label: "Varför Edison Law",
        heading: "Hur arbetet görs här.",
        items: [
          {
            title: "Ett team från det första brevet",
            text: "Solicitors, counsel, utredare och forensiska specialister arbetar i samma akt. Counsel anlitas där processföring krävs. Den som avgränsade utredningen är fortfarande med när bevisningen prövas.",
          },
          {
            title: "Synlig i målet",
            text: "Byrån är inte stor nog att gömma sig i. Du kommer att vara i rummet med klienten, bevisningen och beslutet. Det är krävande. Det är också så folk här faktiskt lär sig arbetet.",
          },
          {
            title: "Diskretion som vana",
            text: "Ekonomisk brottslighet är ryktskänslig. Vi rekryterar personer som kan anförtros ofullständiga fakta, motvilliga vittnen och klienter som ofta är under press. Om det inte är så du arbetar är detta inte platsen.",
          },
        ],
      },
      people: {
        label: "Lär känna oss",
        heading: "Vilka du skulle arbeta med.",
        text: "Personerna i akterna. Öppna en profil för det arbete de faktiskt gör.",
      },
      benefits: {
        label: "Vad du skulle ansluta till",
        heading: "Hur verksamheten drivs.",
        items: [
          {
            icon: "solicitor",
            title: "Namngiven handledning",
            text: "Varje uppdrag har en namngiven solicitor. Ditt arbete syns i akten, inte absorberas in i ett stort team.",
          },
          {
            icon: "evidence",
            title: "Evidensakten",
            text: "Utredare, jurister och forensiska specialister sitter i samma ärende. Metoden skrivs ned.",
          },
          {
            icon: "discretion",
            title: "Diskretion som vana",
            text: "Ekonomisk brottslighet är ryktskänslig. Vi rekryterar personer som kan anförtros ofullständiga fakta.",
          },
        ],
      },
      vacancies: {
        label: "Lediga tjänster",
        heading: "Aktuella möjligheter.",
        text: "Vi publicerar en vakans när ett verkligt behov av roll eller konsultuppdrag finns. Om ingen är utlyst är en spekulativ förfrågan fortfarande välkommen.",
        detail:
          "Skriv med en kort redogörelse för det arbete du vill göra, den jurisdiktion du är behörig i om du är jurist, och ett CV. Ange ort, den anställningsform du söker och vem du skulle förvänta dig att rapportera till. Skicka inte originalhandlingar som styrker identitet. Märk ärendet som en karriärförfrågan.",
        cta: { label: "Skicka en karriärförfrågan", href: "/contact/" },
      },
    },
    about: {
      path: "/about/",
      title: "Om Edison Law | London",
      description:
        "Edison Law är en SRA-reglerad enskild verksamhet i London för ekonomisk brottslighet, enskilt åtal och återvinning.",
      heading: "En specialistverksamhet i London för ärenden om ekonomisk brottslighet.",
      lead: "Edison Law är en SRA-reglerad enskild verksamhet baserad i London. Byrån ger råd i straffrättsliga, utredande och återvinningsärenden som rör bedrägeri och finansiell misskötsamhet. Varje uppdrag handleds av en namngiven solicitor, med extern counsel och specialister anlitade där ärendet kräver det.",
      cta: { label: "Diskutera ett ärende", href: "/contact/" },
      jump: [
        { label: "Vilka vi är", href: "#who" },
        { label: "Vad vi gör", href: "#what" },
        { label: "Vem som ger uppdrag", href: "#clients" },
        { label: "Hur arbetet görs", href: "#values" },
        { label: "Tala med oss", href: "#talk" },
      ],
      who: { heading: "Vilka vi är" },
      what: { heading: "Vad vi gör" },
      talk: { heading: "Tala med oss" },
      lifecycle: {
        label: "Hur ett ärende hålls",
        heading: "Tre steg. En akt.",
        items: [
          {
            index: "01",
            icon: "evidence",
            title: "Definiera och säkra",
            text: "Vi kommer överens om de omedelbara frågorna, identifierar brådskande risker och säkrar det material som mest sannolikt spelar roll. Jäv- och identitetskontroller slutförs innan ett uppdrag börjar.",
          },
          {
            index: "02",
            icon: "fees",
            title: "Fastställ och bedöm",
            text: "Relevanta handlingar, räkenskaper och vittnesbevisning granskas. Vi förklarar vad som är fastställt, vad som förblir osäkert och vilket vidare arbete som är proportionerligt.",
          },
          {
            index: "03",
            icon: "solicitor",
            title: "Besluta och agera",
            text: "Vi rekommenderar den lämpliga rättsliga vägen, dess sannolika kostnad och dess huvudsakliga risker. Det kan innebära förfarande, en ansökan om brådskande skydd, en anmälan till en myndighet, förhandlad lösning eller ingen ytterligare åtgärd.",
          },
        ],
      },
      difference: {
        label: "Vad som håller arbetet samman",
        heading: "Akten hålls här.",
        items: [
          {
            title: "Solicitors, därefter counsel",
            text: "Förfrågan bedrivs inuti en solicitorverksamhet. Vi anlitar counsel där processföring krävs. Externa utredare och forensiska specialister anlitas där ärendet kräver det, med deras roll förklarad.",
          },
          {
            title: "Byggt för bestridda fakta",
            text: "Gränsöverskridande underlag, plånböcker, internt bedrägeri och tillsynsgranskning är vanliga i detta arbete. Steg utomlands tas med lokal counsel där utländsk process krävs.",
          },
          {
            title: "Verktyg under handledning",
            text: "Där volymen av underlag är problemet kan vi använda Cobra AI, en underrättelseplattform från IYE Global. Ingenting från den behandlas som ett fynd förrän någon på ärendet har granskat det.",
          },
        ],
      },
      record: {
        label: "I det offentliga registret",
        heading: "Fakta om verksamheten — inte resultat av mål.",
        note: "Påståenden om skala, utmärkelser och återvinningssiffror är lätta att hitta på. De är också lätta att kontrollera. Siffrorna nedan är hämtade från denna webbplats och det offentliga SRA-organisationsregistret. Vi publicerar inte återvinningar, vinststatistik, personalantal som mått på trovärdighet, eller rankingar.",
        items: [
          { value: "6", label: "Verksamhetsområden som beskrivs på denna webbplats" },
          { value: "5", label: "Utredningskategorier" },
          { value: "510498", label: "SRA-organisationsnummer — öppna det offentliga registret" },
        ],
      },
      clients: {
        label: "Vem som ger uppdrag",
        heading: "Typiska uppdragsgivare.",
        note: "Vi publicerar inte en klientlista, logotyper eller omdömen. Detta är typer av uppdragsgivare, inte namngivna mandat.",
        items: [
          "Enskilda och family offices som har förlorat pengar till bedrägeri",
          "Bolag och finansinstitut",
          "Välgörenhetsorganisationer och trustees",
          "Professionella rådgivare som hänvisar ett pågående ärende",
        ],
      },
      heritage: {
        label: "Verksamheten",
        heading: "En solicitorverksamhet, hållen i London.",
        text: "Edison Law är auktoriserad och reglerad av Solicitors Regulation Authority, SRA-nummer 510498. Bekräfta aktuella behöriga personer i det offentliga SRA-registret. Richard Edison namnges på denna webbplats som ägare av verksamheten. Yrkestitlar här är inte ett tillstånd för förbehållen verksamhet.",
      },
      commitments: {
        label: "Hur arbetet görs",
        heading: "Hur arbetet görs.",
        items: [
          {
            title: "Bevisning före en berättelse",
            text: "Enheter, konton och original säkras först. En historia som inte kan läggas fram används inte.",
          },
          {
            title: "Ett ärende, namngivet ansvar",
            text: "Solicitors, utredare och forensiska specialister sitter i samma ärende. Varje uppdrag handleds av en namngiven solicitor.",
          },
          {
            title: "Proportion",
            text: "Vi förklarar när det är osannolikt att det lönar sig att jaga värde, och när ett åtal inte bärs av bevisningen.",
          },
          {
            title: "Diskretion",
            text: "Ekonomisk brottslighet är ryktskänslig. Förfrågningar hanteras konfidentiellt. Skicka inte lösenord, privata nycklar, fröfraser eller originalhandlingar som styrker identitet via webbplatsen.",
          },
        ],
      },
    },
    contact: {
      path: "/contact/",
      title: "Kontakta Edison Law | London",
      description:
        "Skicka en första förfrågan till Edison Law i London om ett enskilt åtal, återvinning eller ett ärende om ekonomisk brottslighet. Förfrågningar hanteras konfidentiellt.",
      heading: "Berätta vad som har hänt och vad som är brådskande.",
      lead: "Ge oss en kort redogörelse för ärendet, de personer eller organisationer som är inblandade och eventuell omedelbar tidsfrist. Det gör det möjligt för oss att göra en inledande jävskontroll och avgöra om frågan ligger inom vår verksamhet.",
      urgent:
        "Skicka inte lösenord, privata nycklar, fröfraser, originalhandlingar som styrker identitet eller stora volymer konfidentiellt material via detta formulär. Att skicka en förfrågan skapar inte ett solicitor–klient-förhållande.",
      formButton: "Skicka en första förfrågan",
    },
    legal: {
      path: "/legal-regulatory/",
      title: "Juridik och tillsyn | Edison Law",
      description: "Denna sida har flyttats till Tillsynsinformation.",
      heading: "Denna sida har flyttats.",
      intro:
        "Juridisk och tillsynsinformation publiceras nu på en enda sida. Använd Tillsynsinformation för byråns SRA-nummer, ställning och relaterade meddelanden.",
      movedTo: "/regulatory-information/",
    },
    regulatoryInformation: {
      path: "/regulatory-information/",
      title: "Tillsynsinformation | Edison Law",
      description: "Hur Edison Law är auktoriserad, försäkrad, och hur klientmedel hanteras.",
      heading: "Tillsynsinformation.",
      intro:
        "Du ska kunna kontrollera vilka vi är utan att ringa en marknadsföringslinje. Det offentliga SRA-registret är källan om något här är inaktuellt.",
      trustPage: "regulatory",
    },
    complaints: {
      path: "/complaints/",
      title: "Klagomålsförfarande | Edison Law",
      description: "Hur du klagar på Edison Law och hur du når Legal Ombudsman.",
      heading: "Klagomålsförfarande.",
      intro:
        "Om du är missnöjd med vår tjänst, säg till oss. Ett klagomål ska skickas till den person som namnges på sidorna Tillsynsinformation och Klagomål, inte bara till den som hanterar ärendet. Vi tar klagomålet på allvar och svarar skriftligen.",
      trustPage: "complaints",
    },
    pricing: {
      path: "/pricing/",
      title: "Priser | Edison Law",
      description: "Hur Edison Law tar betalt för arbete och hur uppskattningar ges.",
      heading: "Priser.",
      intro:
        "Vi kommer överens om omfattning och debiteringsgrund innan det egentliga arbetet börjar. De flesta ärenden debiteras efter tid; fast arvode kan komma i fråga för en klart avgränsad inledande genomgång eller annat avgränsat steg.",
      trustPage: "pricing",
    },
    privacy: {
      path: "/privacy/",
      title: "Integritet | Edison Law",
      description: "Hur Edison Law hanterar personuppgifter.",
      heading: "Integritetsmeddelande.",
      intro:
        "Detta meddelande förklarar vem som ansvarar för personuppgifter som skickas via denna webbplats, de ändamål de används för, och hur du utövar dina rättigheter.",
      reviewTopic: "data protection enforcement",
      trustPage: "privacy",
    },
    cookies: {
      path: "/cookies/",
      title: "Cookies | Edison Law",
      description: "Cookieanvändning på Edison Laws webbplats.",
      heading: "Cookies.",
      blocks: [
        {
          heading: "Vad vi använder",
          text: "Denna webbplats är byggd för att fungera utan spårningscookies. Analys i webbplatskonfigurationen är avstängd. Om den inställningen senare slås på uppdateras denna sida innan någon icke-väsentlig cookie sätts.",
        },
        {
          heading: "Nödvändig lagring",
          text: "Webbläsaren kan behålla vanlig sessionsdata som krävs för att visa sidor. Om du väljer ett annat språk lagras det valet lokalt i denna webbläsare så att språkväxlaren kan komma ihåg det. Ingen av delarna används för att profilera dig.",
        },
      ],
    },
    accessibility: {
      path: "/accessibility/",
      title: "Tillgänglighet | Edison Law",
      description: "Tillgänglighet på Edison Laws webbplats.",
      heading: "Tillgänglighet.",
      blocks: [
        {
          heading: "Standard",
          text: "Vi strävar efter att uppfylla WCAG 2.2 AA. Sidorna använder semantiska landmärken, en hoppa-till-länk, synligt fokus och tangentbordsstyrd navigering. En fullständig oberoende tillgänglighetsgranskning publiceras inte på denna sida.",
        },
        {
          heading: "Kända begränsningar",
          text: "Vissa bilder är fotografiska och kan sakna en fullständig textekvivalent utöver bildtexten. Sök, om den är påslagen, kräver JavaScript. Om ett hinder kvarstår, skriv via kontaktformuläret och beskriv sidan, problemet och det format som skulle hjälpa.",
        },
        {
          heading: "Kontakt",
          text: "Tillgänglighetsfrågor hanteras som vanlig professionell korrespondens via kontaktformuläret.",
        },
      ],
    },
    fraud: {
      path: "/fraud-warning/",
      title: "Bedrägerivarning | Edison Law",
      description: "Hur du kontrollerar att ett meddelande som utger sig för att komma från Edison Law är äkta.",
      heading: "Bedrägerivarning.",
      blocks: [
        {
          heading: "Kontrollera avsändaren",
          text: "Vi kommer aldrig att be dig om en fröfras eller privat nyckel. Vi kommer inte att be dig skicka kryptovaluta, kontanter eller identitetshandlingar till ett personligt konto. Behandla oväntade betalningsinstruktioner som misstänkta. Bekräfta eventuella bankuppgifter med ett nummer eller en adress du redan har, inte ett nummer i samma meddelande.",
        },
        {
          heading: "Kontrollera webbplatsen",
          text: "Använd adressfältet på denna webbplats. Om ett meddelande använder en annan domän, en liknande stavning eller en oväntad e-postadress, svara inte med konfidentiella uppgifter.",
        },
        {
          heading: "Hur du verifierar",
          text: "Använd kontaktformuläret på denna webbplats, eller ett nummer eller en adress du redan har från ett tidigare äkta brev. Förlita dig inte på kontaktuppgifter i ett oväntat meddelande. Betalningsuppgifter ska bekräftas via en separat, känd kanal innan någon överföring.",
        },
      ],
    },
    howWeWork: {
      path: "/how-we-work/",
      title: "Så arbetar vi | Edison Law",
      description: "Hur Edison Law tar ett ärende från första uppdrag till ett rättsligt beslut.",
      heading: "En tydlig väg från första uppdrag till rättsligt beslut.",
      intro:
        "Ordningen på arbetet är densamma oavsett om nästa steg är ett enskilt åtal, en frysning, en anmälan eller ett beslut att stanna. Svarstider, när ett uppdrag är på plats, anges i klientvårdsbrevet och, där de publiceras, på kontaktsidan.",
      blocks: [
        {
          heading: "1. Definiera och säkra",
          text: "Vi kommer överens om de omedelbara frågorna, identifierar brådskande risker och säkrar det material som mest sannolikt spelar roll. Jäv- och identitetskontroller slutförs innan ett uppdrag börjar.",
        },
        {
          heading: "2. Fastställ och bedöm",
          text: "Relevanta handlingar, räkenskaper och vittnesbevisning granskas. Vi förklarar vad som är fastställt, vad som förblir osäkert och vilket vidare arbete som är proportionerligt. Där volymen av underlag kräver det kan Cobra AI (IYE Global) användas; utfallet granskas i ärendet.",
        },
        {
          heading: "3. Besluta och agera",
          text: "Vi rekommenderar den lämpliga rättsliga vägen, dess sannolika kostnad och dess huvudsakliga risker. Det kan innebära förfarande, en ansökan om brådskande skydd, en anmälan till en myndighet, förhandlad lösning eller ingen ytterligare åtgärd. Counsel anlitas där processföring krävs. Lokal counsel anlitas där utländsk process krävs.",
        },
        {
          heading: "Arvoden",
          text: "Vi kommer överens om omfattning och debiteringsgrund innan det egentliga arbetet börjar. Vi arbetar med timarvode i de flesta ärenden och med fast arvode där omfattningen kan definieras i förväg. Vi talar om vilken modell som gäller innan du förbinder dig till något. Se Priser.",
        },
        {
          heading: "Vem som ansvarar",
          text: "Varje ärende handleds av en namngiven solicitor. Yrkestitlar på denna webbplats är inte ett tillstånd för förbehållen verksamhet. Bekräfta aktuella behöriga personer i det offentliga SRA-registret.",
        },
      ],
    },
    terms: {
      path: "/terms-of-business/",
      title: "Affärsvillkor | Edison Law",
      description: "Hur ett uppdrag hos Edison Law uppstår och vad det omfattar.",
      heading: "Affärsvillkor.",
      intro:
        "Du är inte klient för att du skickade ett webbformulär. Ett uppdrag börjar när vi skriver och antar instruktioner på överenskomna villkor.",
      blocks: [
        {
          heading: "Inget uppdrag från denna webbplats",
          text: "Att skicka kontaktformuläret, eller att läsa dessa sidor, skapar inte ett solicitor–klient-förhållande. Vi måste slutföra jävskontroller och skicka ett klientbrev innan vi agerar.",
        },
        {
          heading: "Vad klientbrevet kommer att omfatta",
          text: "Arbetets omfattning, vem som utför det, debiteringsgrund, utlägg, moms, klagomål och hur uppdraget avslutas. Vi arbetar med timarvode i de flesta ärenden och med fast arvode där omfattningen kan definieras i förväg. Vi talar om vilken modell som gäller innan du förbinder dig till något.",
        },
        {
          heading: "Dina skyldigheter",
          text: "Ge oss korrekta fakta. Förstör inte enheter eller konton vi har bett dig hålla. Skicka inte lösenord eller fröfraser via webbplatsen.",
        },
        {
          heading: "Ansvarsbegränsning",
          text: "Vårt ansvar för ett enskilt ärende är begränsat till 3 000 000 GBP, i linje med vår ansvarsförsäkring, om vi inte skriftligen kommer överens om ett annat belopp med dig innan arbetet börjar. Vi undantar inte ansvar för bedrägeri, för dödsfall eller personskada orsakad av vårdslöshet, eller för något annat som inte lagligen kan undantas.",
        },
        {
          heading: "Tillämplig lag",
          text: "Domstolarna i England och Wales. Dessa webbsidor är allmän information, inte råd om dina fakta.",
        },
        {
          heading: "Klagomål",
          text: "Klagomålsförfarandet publiceras på /complaints/. Rätten att vända sig till Legal Ombudsman anges där.",
        },
      ],
    },
  },

  serviceMatter: {
    privateProsecutions: {
      whenHeading: "När ett enskilt åtal kan vara lämpligt",
      forWhom: [
        "En anmälan till polisen, Action Fraud eller ett annat offentligt organ har inte lett till utredning eller åtal, och fakta kan fortfarande bära ett brottmål.",
        "Förlusten är tillräckligt allvarlig för att förfarande i magistrates’ court eller Crown Court ska vara ett realistiskt alternativ, inte en gest.",
        "Du behöver en skriftlig syn på sakskäl, disclosure och kostnad innan du förbinder dig till en åtalsakt.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Ett civilrättsligt krav, en tillsynsanmälan eller ytterligare utredning kan vara mer proportionerligt där det straffrättsliga evidenstestet inte är uppfyllt eller där återvinning är det primära målet. Vi tar den frågan i början i stället för att behandla åtal som det automatiska svaret.",
      law: {
        heading: "Åklagarskyldigheter",
        text: "Ett enskilt åtal (private prosecution) är ett brottmål som väcks av någon annan än Crown. Section 6 i Prosecution of Offences Act 1985 bevarar den rätten. Målet bedöms efter samma standard som ett offentligt åtal: disclosure-skyldigheterna i Criminal Procedure and Investigations Act 1996 gäller, och Criminal Procedure Rules gäller i magistrates’ court och Crown Court. Crown Prosecution Service kan ta över målet enligt section 6(2) i 1985 års lag.",
      },
      processHeading: "Hur en åtalsakt byggs",
      process: [
        {
          title: "Inledande evidensbedömning",
          text: "Vi granskar vad som redan finns i handen, identifierar luckor och säger om fakta kan nå den straffrättsliga standarden och om den sannolika kostnaden är proportionerlig.",
        },
        {
          title: "Utredning och vittnesbevisning",
          text: "Vittnesmål, kontinuitet och källuppgifter sätts samman så att akten kan prövas. Oanvänt material identifieras medan förfrågan pågår, inte i sista stund.",
        },
        {
          title: "Disclosure och åklagarskyldigheter",
          text: "Scheman och oanvänt material förbereds utifrån antagandet att försvaret och, om de tar över målet, CPS kommer att läsa akten kall.",
        },
        {
          title: "Inledande av förfarande och anlitande av counsel",
          text: "Om förfarande är motiverat fattas charging-beslutet, målet väcks och specialistcounsel anlitas för processföring. Vi hittar inte på ett rättegångsdatum.",
        },
        {
          title: "Kostnader, tidsramar och huvudsakliga risker",
          text: "Arvoden, utlägg, möjligheten till ett kostnadsbeslut och den separata frågan om confiscation eller skadestånd efter en eventuell fällande dom anges skriftligen innan målet väcks.",
        },
      ],
      risks: [
        "CPS kan ta över målet, fortsätta det eller lägga ned det.",
        "En svag akt kommer att prövas i disclosure och vid rättegång. Kostnader, inklusive ett möjligt kostnadsbeslut, kan följa ett förlorat mål.",
        "En svarande som har spenderat eller flyttat pengarna kan lämna lite att återvinna även efter fällande dom.",
      ],
      faqs: [
        {
          q: "Polisen har lagt ned min anmälan. Kan ni ändå väcka åtal?",
          a: "Ibland. En avböjd offentlig utredning skapar inte en rätt till en enskild. Vi tittar på om bevisningen kan nå den straffrättsliga standarden och om kostnaden är proportionerlig.",
        },
        {
          q: "Är ett enskilt åtal alltid rätt väg?",
          a: "Nej. Ett civilrättsligt krav, en frysningsansökan, en tillsynsanmälan eller inget ytterligare steg kan vara det bättre svaret. Vi tar den frågan innan du förbinder dig.",
        },
        {
          q: "Kan detta löpa samtidigt som ett civilrättsligt krav?",
          a: "Ja, där fakta bär båda. Restraint, confiscation, frysning och ett civilrättsligt krav sekvenseras så att det ena inte förstör det andra.",
        },
        {
          q: "Vem uppträder i domstol?",
          a: "Anlitad counsel, i magistrates’ court eller Crown Court efter vad målet kräver.",
        },
        {
          q: "Kommer CPS att ta över det?",
          a: "De kan. Section 6(2) i Prosecution of Offences Act 1985 tillåter det. Vi planerar akten utifrån det.",
        },
        {
          q: "Hur lång tid till rättegång?",
          a: "Det beror på domstolens dagbok, disclosure och om målet är summary, either-way eller indictable. Vi hittar inte på ett förhandlingsdatum.",
        },
        {
          q: "Vad kostar det om vi förlorar?",
          a: "Du förblir ansvarig för våra arvoden och utlägg enligt vad som överenskommits i uppdraget, och det finns en risk för ett kostnadsbeslut. Vi anger det skriftligen innan målet väcks.",
        },
      ],
    },
    assetTracing: {
      whenHeading: "Tidiga frågor",
      forWhom: [
        "Pengar, egendom eller annat värde har lämnat din kontroll och destinationen är oklar.",
        "En svarande verkar inte ha något, och det behöver prövas innan betydande kostnader uppstår.",
        "Brådskande frysning, sakrättsligt skydd eller disclosure kan krävas när tillgångar kan identifieras.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om nåbart värde inte kan identifieras, eller om kostnaden för verkställighet sannolikt överstiger någon återvinning, kan det ärliga nästa steget vara att stanna, att driva ett snävare civilrättsligt krav, eller att vänta på ytterligare information. Spårning är ett sätt att besluta det, inte ett skäl att spendera i oändlighet.",
      law: {
        heading: "Åtgärder, inte en kruka med pengar",
        text: "Freezing injunctions i High Court söks vanligen under domstolens equitable jurisdiction och CPR Part 25. Worldwide freezing orders, sakrättsliga förelägganden, disclosure-beslut och receivership är skilda åtgärder med olika tester. De skapar inte tillgångar. Tracing in equity följer värde; det är inte en garanti för att en bank, en nominee eller en plånbok kan tvingas betala.",
      },
      processHeading: "Hur en återvinningsstrategi formas",
      process: [
        {
          title: "Tidig bedömning av tillgångar och verkställbarhet",
          text: "Vi identifierar vilket värde som kan visas, var det ligger, vem som verkar kontrollera det, och om det är ekonomiskt meningsfullt att driva det.",
        },
        {
          title: "Förfrågningar om bank, bolag, fastighet och digitala tillgångar",
          text: "Betalningsuppgifter, registreringar, fastighets- och bolagssökningar samt uppgifter om digitala tillgångar används för att bygga en bild som senare kan läggas fram.",
        },
        {
          title: "Frysning och disclosure-åtgärder",
          text: "Om bevisningen bär det råder vi om ansökningar om frysning, sakrättsligt skydd och disclosure, inklusive den vanliga cross-undertaking in damages.",
        },
        {
          title: "Tillgångar utomlands och lokal counsel",
          text: "Där tillgångar eller svarande finns utanför England och Wales identifierar vi när råd om utländsk rätt krävs och anlitar lokal counsel med ditt godkännande.",
        },
        {
          title: "Verkställighetens ekonomi",
          text: "En tillgång som finns är inte alltid en tillgång som kan frysas, belånas eller säljas. Vi håller den sannolika återvinningen under omprövning mot nästa kostnadssteg.",
        },
      ],
      risks: [
        "Ett freezing order tar inte i sig värde. Tillgångar kan vara offshore, belastade, förbrukade eller innehas av någon som kommer att bestrida kravet.",
        "En cross-undertaking in damages är vanligt. Om injunction beviljades felaktigt kan du behöva betala.",
        "Bank- eller on-chain-data kan ta slut. Slutledning är inte bevis för kontroll.",
      ],
      faqs: [
        {
          q: "Kan ni garantera återvinning?",
          a: "Nej. Vi säger tidigt när det finns värde att driva, och lika tidigt när spåret tar slut.",
        },
        {
          q: "Vad är ett worldwide freezing order?",
          a: "Det är ett High Court-föreläggande som förbjuder förfogande över tillgångar. Det tar dem inte i sig. De vanliga testerna för interimistiskt skydd måste fortfarande uppfyllas.",
        },
        {
          q: "Arbetar ni med forensiska revisorer?",
          a: "Ja, i samma ärende där siffrorna kräver det. Spårning, frysning och verkställighet behandlas som en strategi.",
        },
        {
          q: "Hur snabbt kan ni ansöka?",
          a: "Om fakta bär brådska byggs ansökningar så snabbt som bevisningen tillåter. Ofullständiga uppgifter saktar ned det.",
        },
        {
          q: "Vad händer om svaranden bor utomlands?",
          a: "Delgivning, erkännande och verkställighet kräver lokal counsel där personen eller tillgången finns. Vi är en Londonverksamhet.",
        },
        {
          q: "Tas era arvoden från återvunna pengar?",
          a: "Endast om ett lagligt damages-based eller liknande arrangemang avtalas skriftligen. I annat fall betalar du för arbetet enligt avgränsningen. Se Priser.",
        },
      ],
    },
    cryptoFraud: {
      whenHeading: "När uppgifter om digitala tillgångar spelar roll",
      forWhom: [
        "Värde har rört sig över plånböcker, bridges eller börser och du behöver veta vad uppgifterna faktiskt visar.",
        "En börs eller tjänsteleverantör kan hålla ett fryst saldo.",
        "En betalningsavledning eller ett authorised push payment-bedrägeri har just inträffat och spåret kan fortfarande röra sig.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om spåret har lösts in, om attribution inte kan fastställas bortom slutledning, eller om det enda materialet är en overifierad skärmdump, kan det användbara arbetet vara en begränsad säkringsanteckning snarare än förfarande. Vi säger det innan betydande spårningskostnader uppstår.",
      law: {
        heading: "Egendom, disclosure och kedjans gränser",
        text: "Engelska domstolar har behandlat kryptotillgångar som egendom för injunctions och sakrättsliga krav. Brådskande skydd är fortfarande en vanlig High Court-ansökan under CPR Part 25. On-chain-data är en uppgift om överföringar. Den visar inte, i sig, vem som kontrollerade en nyckel, eller att en börs måste betala dig.",
      },
      processHeading: "Från uppgifter till ett rättsligt fall",
      process: [
        {
          title: "Omedelbara säkringssteg",
          text: "Transaktionsidentifierare, börskorrespondens, enhetsavbildningar och tidsstämplar hålls. Vi skriver inte över plånböcker och ber dig inte testa en fröfras.",
        },
        {
          title: "Analys av plånböcker och transaktioner",
          text: "Bekräftade överföringar kartläggs genom plånböcker, bridges och identifierbara tjänster, med verktygsversioner och tidsstämplar dokumenterade för senare bevisuppgift.",
        },
        {
          title: "Attribution: vad som är fastställt och vad som förblir slutledning",
          text: "Klustring och liknande tekniker markeras som slutledning. Mixers, saknade börsdata och overifierade skärmdumpar behandlas som gränser, inte fotnoter.",
        },
        {
          title: "Plattformskontakt och disclosure",
          text: "Där en plattform, börs eller annat institut kan hålla relevanta uppgifter eller frysta saldon råder vi om brev, säkringsbegäran och formella disclosure-vägar.",
        },
        {
          title: "Injunctions, sakrättsliga krav och åtalsalternativ",
          text: "Om bilden bär det råder vi om brådskande skydd, sakrättsliga krav eller en straffrättslig väg. Om den inte gör det säger vi det.",
        },
      ],
      extraBlocks: [
        {
          heading: "Varning om bedrägerisåtervinning",
          text: "Edison Law kommer aldrig att be dig om en fröfras eller privat nyckel. Vi kan inte ångra en blockkedjetransaktion. Den som garanterar att kryptovaluta kommer att återlämnas, eller som ber dig skicka mynt eller nycklar för att ”säkra” dem, beskriver inte detta arbete ärligt. Se bedrägerivarningen.",
        },
      ],
      risks: [
        "Mynt kan lämna en handelsplats innan ett beslut hinner bita.",
        "En börs utanför England och Wales kanske inte agerar på ett Londonbrev. Lokal process är då en separat kostnad.",
        "Klustring är slutledning. Att lägga fram den som faktum kommer att prövas.",
      ],
      faqs: [
        {
          q: "Kan ni garantera att krypto återvinns?",
          a: "Nej. Den som garanterar återvinning beskriver inte detta arbete ärligt.",
        },
        {
          q: "Kommer ni att be mig om min fröfras?",
          a: "Nej. Vi kommer aldrig att be om en fröfras eller privat nyckel. Behandla varje sådan begäran som ett bedrägeri. Se bedrägerivarningen.",
        },
        {
          q: "Kan ni ångra en blockkedjetransaktion?",
          a: "Nej. En registrerad överföring kan inte göras ogjord av en solicitor. Återvinning, om den över huvud taget är möjlig, beror på senare rättsligt förfarande mot en person eller ett institut som fortfarande innehar värde.",
        },
        {
          q: "Räcker en utskrift från en blockkedjeutforskare?",
          a: "Nej. Ursprung, tidsstämplar, verktygsversioner och skillnaden mellan ett bekräftat hopp och ett kluster måste finnas i bevisuppgiften.",
        },
        {
          q: "Vad händer om mynten gick genom en mixer?",
          a: "Det begränsar vanligen vad som kan sägas. Begränsningen hör hemma i rådet.",
        },
        {
          q: "Vilken domstol?",
          a: "Brådskande egendoms- och injunction-arbete är typiskt High Court i England och Wales. Straffrättsliga vägar, om några, är ett separat beslut.",
        },
      ],
    },
    regulatory: {
      whenHeading: "När en utredning har inletts, eller är på väg att inledas",
      forWhom: [
        "En dawn raid, ett förhör under caution eller ett information notice har landat.",
        "En intern utredning kan behöva rapporteras, och akten måste vara korrekt när den gör det.",
        "Civilrättsliga, anställnings- eller återvinningsförfaranden kan löpa parallellt med en tillsyns- eller brottsutredning.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om det omedelbara behovet är civilrättslig återvinning, ett anställningsförfarande eller en begränsad intern granskning ska de avgränsas som sådana i stället för att behandlas som utbytbara med ett försvar mot en lagstadgad utredning. Vi identifierar myndigheten, dess befogenheter och klientens mål innan ett enda svar skickas.",
      law: {
        heading: "Befogenheter skiljer sig åt mellan myndigheter",
        text: "Förhör under caution styrs av Police and Criminal Evidence Act 1984 och PACE Codes. Obligatoriska befogenheter, privilege och restriktioner för ”användning” är tekniska och varierar efter lag. Styckena nedan är en inledande karta, inte en ersättning för råd om ett namngivet föreläggande.",
      },
      authorities: [
        {
          heading: "Serious Fraud Office",
          text: "SFO utreder och åtalar allvarligt eller komplext bedrägeri, inklusive mutor och korruption som faller inom dess mandat. Myndigheten har obligatoriska förhörs- och dokumentbefogenheter under Criminal Justice Act 1987. De befogenheterna, statusen för svar som lämnas under tvång, och samspelet med ett senare åtal skiljer sig från ett vanligt polisförhör. Tidpunkt, privilege och vad som sägs i det första svaret spelar roll.",
        },
        {
          heading: "Financial Conduct Authority",
          text: "FCA:s utrednings- och tillsynsarbete vilar främst på Financial Services and Markets Act 2000 och Handbook. Förelägganden, förhör, skilled-person reviews och förlikningsdiskussioner följer myndighetens eget förfarande. Ett auktoriserat företag, en enskild på ett företag och en oauktoriserad person står inte i samma ställning. Vi råder utifrån det faktiska föreläggandet och den relevanta delen av Handbook, inte ett generiskt ”tillsyns”-manus.",
        },
        {
          heading: "HMRC",
          text: "HMRC:s informationsbefogenheter vilar främst på Taxes Management Act 1970 och relaterad skattelagstiftning. En civil enquiry, en Code of Practice 8- eller 9-utredning och en brottsutredning är olika förfaranden med olika konsekvenser. Där skatteråd krävs samordnar vi med skattespecialister i stället för att behandla ett HMRC-brev som om det vore ett SFO- eller FCA-föreläggande.",
        },
      ],
      processHeading: "Hur det första svaret kontrolleras",
      process: [
        {
          title: "Dawn raids och brådskande första svar",
          text: "Vem som får tala, vad som måste säkras och vad som inte får raderas. Privilege identifieras tidigt.",
        },
        {
          title: "Förelägganden och obligatoriska befogenheter",
          text: "Föreläggandet läses mot den faktiska lagen och förfarandet. Vi råder om omfattning, tidplan och hur ett tillräckligt svar ser ut.",
        },
        {
          title: "Förhör under caution",
          text: "Om man ska infinna sig, hur man förbereder sig och vad handlingarna visar är beslut som fattas utifrån påståendets fakta, inte som en webbplatsslogan.",
        },
        {
          title: "Interna utredningar och rapporteringsbeslut",
          text: "Om organisationen också behöver en intern förfrågan avgörs hold, åtkomst och privilege innan intervjuer börjar. Underrättelse till en myndighet är ett rättsligt omdöme på fakta.",
        },
        {
          title: "Parallella civilrättsliga, anställnings- eller återvinningsförfaranden",
          text: "Ett relaterat krav, avsked eller återvinning kan krocka med utredningen om det inte sekvenseras. Vi behandlar det som en del av rådet.",
        },
        {
          title: "Lösning, överklagande eller försvar",
          text: "Förlikning, ett angrepp på förfarandet eller ett försvar mot talan — endast så som fakta och forumet tillåter. Vi beskriver inte en utredning som avslutad om den inte är det.",
        },
      ],
      risks: [
        "Att säga för mycket kan efterge privilege eller skapa en berättelse du senare inte kan bära.",
        "Att säga för lite, eller att radera material, kan bli ett separat påstående.",
        "Ett parallellt civilrättsligt eller återvinningsmål kan krocka med ett försvar om det inte sekvenseras.",
      ],
      faqs: [
        {
          q: "Kommer ni att berätta mer för en tillsynsmyndighet än vad som krävs?",
          a: "Nej. Disclosure ska vara korrekt och tillräcklig. Den ska inte vara en historia som bjuds i hopp.",
        },
        {
          q: "Kan försvar löpa med återvinning mot någon annan?",
          a: "Ja, där fakta bär det. Sekvensering är en del av rådet.",
        },
        {
          q: "Ska jag infinna mig till ett förhör under caution?",
          a: "Det beror på påståendet, handlingarna och PACE. Vi ger inte ett blankt ja eller nej på en webbplats.",
        },
        {
          q: "Vad är en dawn raid?",
          a: "En husrannsakan enligt warrant eller lagstadgad befogenhet. De första timmarna handlar om hold, privilege och vem som talar. Förstör inte enheter.",
        },
        {
          q: "Täcks era arvoden av försäkring?",
          a: "Ansvarsförsäkring för styrelse och ledning samt rättsskyddsförsäkring betalar ofta för detta arbete. Där du har sådant skydd underrättar vi, på din begäran, försäkringsgivaren, söker deras godkännande av våra satser och fakturerar dem direkt. Försäkringsgivare ålägger ofta en panelsats under vår; om de gör det talar vi om skillnaden skriftligen och du avgör om du täcker gapet eller i stället anlitar panelcounsel. Du förblir ansvarig för våra arvoden om försäkringsgivaren avslår eller drar tillbaka skyddet.",
        },
      ],
    },
    crossBorder: {
      whenHeading: "När mer än ett rättssystem är inblandat",
      forWhom: [
        "Bevisning, svarande eller tillgångar finns utanför England och Wales.",
        "Du behöver delgivning, evidensinhämtning, interimistiskt skydd eller verkställighet i mer än ett land.",
        "En utländsk dom eller skiljedom kan behöva erkännas, eller ett engelskt beslut erkännas utomlands.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om det enda användbara steget ligger i en domstol vi inte meningsfullt kan nå, eller om erkännande och verkställighet kommer att kosta mer än de ger tillbaka, kan det ärliga rådet vara ett snävare engelskt krav, endast ett lokalt uppdrag, eller ingen ytterligare åtgärd. Vi anger det innan parallella förfaranden mångfaldigas.",
      law: {
        heading: "Forum, delgivning och erkännande",
        text: "Delgivning utom jurisdiktionen, letters of request och ömsesidig rättslig hjälp följer Civil Procedure Rules, Crime (International Co-operation) Act 2003 där det är straffrättsligt, och lagen i den mottagande staten. Erkännande av utländska domar och skiljedomar beror på landet och instrumentet. Ingenting av det är ett globalt nätverk av Edison Law-kontor.",
      },
      extraBlocks: [
        {
          heading: "Londonverksamhet, lokal counsel där det krävs",
          text: "Vi är en Londonverksamhet. Där råd om utländsk rätt eller lokal process krävs identifierar och anlitar vi lämpligt kvalificerad lokal counsel med klientens godkännande.",
        },
      ],
      processHeading: "En strategi över flera system",
      process: [
        {
          title: "Bedömning av jurisdiktion och forum",
          text: "Vilket krav, i vilken domstol och i vilken ordning. En brittisk akt som låtsas att världen är England kommer att misslyckas.",
        },
        {
          title: "Lokalisering av svarande, bevisning och tillgångar",
          text: "Vi kartlägger var personerna, underlaget och värdet faktiskt finns innan någon ger in talan.",
        },
        {
          title: "Delgivning och evidensinhämtning utomlands",
          text: "Delgivning, letters of request och laglig inhämtning följer reglerna på insamlingsplatsen. Lokal counsel anlitas när det steget är verkligt.",
        },
        {
          title: "Interimistiskt skydd och erkännande",
          text: "Ett engelskt freezing order biter inte automatiskt utomlands. Erkännande, spegling eller en lokal ansökan är en separat fråga.",
        },
        {
          title: "Lokal counsel och kostnadskontroll",
          text: "Utländska jurister, översättning och bestyrkande avgränsas som utlägg. Parallella mål samordnas så att det ena inte överrumplar det andra.",
        },
        {
          title: "Planering av verkställighet",
          text: "Eller ett beslut att stanna, om erkännande kommer att kosta mer än det ger tillbaka.",
        },
      ],
      risks: [
        "Utländska domstolar tar tid och kan vägra erkännande.",
        "Att delge en svarande som har lämnat Storbritannien kan misslyckas om de inte kan hittas.",
        "Översättning, apostille och lokala avgifter lägger till kostnad som en Londonuppskattning missar om den inte avgränsas.",
      ],
      faqs: [
        {
          q: "Har ni kontor utomlands?",
          a: "Nej. Vi är en Londonverksamhet. Där råd om utländsk rätt eller lokal process krävs identifierar och anlitar vi lämpligt kvalificerad lokal counsel med klientens godkännande.",
        },
        {
          q: "Kan ni delge någon som har lämnat landet?",
          a: "Att hitta dem är utredningsarbete. Delgivning följer därefter reglerna på delgivningsplatsen.",
        },
        {
          q: "Biter ett engelskt freezing order utomlands?",
          a: "Endast om det erkänns eller speglas lokalt, eller om en bank i denna jurisdiktion innehar tillgången. Vi talar om vilket av det som är verkligt.",
        },
        {
          q: "Hur är det med ömsesidig rättslig hjälp?",
          a: "Straffrättslig MLA är ett stat-till-stat-förfarande. Det är långsamt och inte i vår makt. Vi råder om det är värt att vänta på.",
        },
        {
          q: "Kan ni verkställa en skiljedom?",
          a: "Ofta under Arbitration Act 1996, med förbehåll för de vanliga invändningarna. Verkställighet är inte ett administrativt steg.",
        },
      ],
    },
    corporateIntelligence: {
      whenHeading: "Innan exponering blir förlust",
      forWhom: [
        "En transaktion, investering eller utnämning behöver en konfidentiell titt på motparten först.",
        "Du behöver veta om det finns väsentliga krav, insolvens eller sanktionsbekymmer.",
        "Du vill ha en realistisk bild av om en framtida dom sannolikt har praktiskt värde.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om frågan redan är ett pågående krav, en tillsynsutredning eller ett enskilt åtal beskriver de sidorna arbetet. Förfrågan före process är för ett definierat rättsligt eller kommersiellt syfte. Det är inte en licens för olaglig övervakning eller ett smutskastningsuppdrag.",
      law: {
        heading: "Rättslig grund, integritet och proportionalitet",
        text: "Forskning i öppna källor och register är inte en licens att behandla personuppgifter utan rättslig grund under UK GDPR och Data Protection Act 2018. Om utfallet senare blir process eller åtal måste det ha inhämtats på ett sätt som kan förklaras. Vi använder inte metoder vi inte skulle kunna försvara.",
      },
      processHeading: "Hur en konfidentiell granskning avgränsas",
      process: [
        {
          title: "Förfrågningar före transaktion och utnämning",
          text: "Syftet, frågorna och vad vi inte kommer att göra avtalas innan arbetet börjar. Hemliga steg tas endast på instruktion och endast med lagliga medel.",
        },
        {
          title: "Forskning om motpart och verkligt huvudmannaskap",
          text: "Registreringar, kopplingar och kontroll undersöks så långt det offentliga och betalda registret tillåter.",
        },
        {
          title: "Kontroller av process, insolvens och sanktioner",
          text: "Publicerade listor och relaterade uppgifter söks. Screening är bara så bra som listan och de identifierare du ger oss.",
        },
        {
          title: "Tillgångsbedömning före talan",
          text: "Om en framtida dom sannolikt har praktiskt värde är en del av anteckningen, med uppgifternas begränsningar angivna.",
        },
        {
          title: "Rättslig grund, integritet och proportionalitet",
          text: "Förfrågan avgränsas för ett definierat syfte. Ett synligt steg identifieras innan det tas.",
        },
        {
          title: "Hur iakttagelser rapporteras",
          text: "Vad som är fastställt, vad som är slutledning, och vad uppgifterna inte visar. Källor och begränsningar dokumenteras för juridisk granskning.",
        },
      ],
      risks: [
        "Offentliga register är ofullständiga. Frånvaro av en träff är inte bevis för dygd.",
        "Ett synligt steg kan varna den berörde. Vi säger det innan vi tar det.",
        "Utländska data kan vara tunna, fördröjda eller otillförlitliga.",
      ],
      faqs: [
        {
          q: "Är detta samma sak som att anlita privatdetektiver?",
          a: "Fält- och öppenkällsförfrågan kan vara en del av arbetet. Det bedrivs så att produkten senare kan sitta i en process- eller åtalsakt om det krävs.",
        },
        {
          q: "Kommer den berörde att veta?",
          a: "Utgångspunkten är konfidentiell. Vi säger till om ett steg skulle göra förfrågan synlig, och vi tar inte det steget utan instruktion.",
        },
        {
          q: "Garanterar ni att ni hittar negativ information?",
          a: "Nej. Vi rapporterar vad uppgifterna visar. En ren bild är fortfarande ett resultat.",
        },
        {
          q: "Är detta juridisk rådgivning?",
          a: "När en solicitor här leder det och ett uppdrag säger så är rådet om risk och nästa steg juridiskt arbete. En rå dump av sökresultat är det inte.",
        },
        {
          q: "Hur hanteras personuppgifter?",
          a: "Under UK GDPR. Se integritetsmeddelandet.",
        },
      ],
    },
    internalInvestigations: {
      whenHeading: "När problemet finns inuti organisationen",
      forWhom: [
        "En visselblåsarrapport, oförklarade betalningar eller ett glapp i räkenskaperna har nått styrelsen.",
        "Misskötsamhet av anställd eller förtroendeman behöver fastställas innan någon avskedas eller anmäls.",
        "Du kan behöva underrätta en tillsynsmyndighet eller försäkringsgivare, och akten måste vara korrekt när du gör det.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Ett anställningsförfarande kan sitta vid sidan av detta arbete, men det är inte en ersättning för en evidensakt som senare kan läsas av en tillsynsmyndighet, en svarande eller en domare. Om styrelsen redan vill ha ett förutbestämt fynd kommer en utredning inte att göra det fyndet ärligt.",
      law: {
        heading: "Privilege, anställning och rapportering",
        text: "Anställningsrätt, skyldigheter att underrätta tillsyn och, om fakta är brottsliga, samma evidensstandarder som vilket senare åtal som helst sitter på samma händelser. Privilege i interna utredningar är lätt att förlora om syfte och mottagare blandas ihop. Vi identifierar hold, åtkomst och privilege innan någon underrättas.",
      },
      processHeading: "Hur en intern utredning bedrivs",
      process: [
        {
          title: "Omfattning, hold och privilege",
          text: "Enheter och konton säkras. Vem som får se akten avgörs innan intervjuer börjar.",
        },
        {
          title: "Intervjuer och handlingar",
          text: "Ordning på vittnen, kontinuitet och en akt som senare kan lämnas ut utan genans.",
        },
        {
          title: "Iakttagelser styrelsen kan använda",
          text: "Vad som är visat, vad som inte är det, och om avsked, en anmälan, ett krav eller ett enskilt åtal är bärkraftigt.",
        },
      ],
      risks: [
        "En slarvig internrapport kan bli oanvänt material i ett senare åtal eller en gåva till en kärande.",
        "Att varna för tidigt kan förstöra hold.",
        "Att blanda HR-utfall med evidensfynd kan underminera båda.",
      ],
      faqs: [
        {
          q: "Kommer de berörda att veta att de utreds?",
          a: "Inte alltid, och inte till en början. Vi säger till när ett steg skulle göra förfrågan synlig. Hemliga steg tas endast på instruktion, och endast med lagliga medel.",
        },
        {
          q: "Är detta samma sak som en HR-utredning?",
          a: "Nej. Ett anställningsförfarande kan sitta vid sidan av detta arbete. Det är inte en ersättning för en akt som kommer att läsas utanför verksamheten.",
        },
        {
          q: "Kan vi behöva underrätta FCA eller SFO?",
          a: "Ibland. Underrättelse är ett rättsligt omdöme på fakta. Vi råder; vi döljer inte en skyldighet.",
        },
        {
          q: "Spelas intervjuer in?",
          a: "Vår utgångspunkt är en detaljerad samtida anteckning, tagen av en andra jurist, som den intervjuade bjuds in att granska och rätta. Vi ljudinspelar endast där den intervjuade ger skriftligt samtycke i förväg, eller där förfarandet kräver det. Att spela in dolt, eller utan att tala om det för alla i rummet, är inget vi gör.",
        },
        {
          q: "Kan samma akt senare bära ett enskilt åtal?",
          a: "Om den byggdes till straffprocessuell standard, ofta ja. Vi driver inte en andra utredning för teater om den första akten är ärlig.",
        },
      ],
    },
    financialCrimeInvestigations: {
      whenHeading: "När handlande, deltagare och förlust fortfarande är oklara",
      forWhom: [
        "Ett bedrägeri, oriktig bokföring eller förskingring verkar ha skett, men det är ännu inte klart vem som gjorde vad.",
        "En anmälan till polisen eller Action Fraud har inte gett något du kan använda.",
        "Du behöver en akt som senare skulle kunna bära ett enskilt åtal, en frysning eller en tillsynsanmälan.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om fakta redan är klara och den enda återstående frågan är en rättslig åtgärd beskriver sidorna under Verksamhetsområden det arbetet. Om materialet inte bär något ärligt nästa steg är den användbara produkten den slutsatsen, given tidigt.",
      law: {
        heading: "Utredning är inte ett åtal",
        text: "Brott enligt Fraud Act 2006, Theft Act, oriktig bokföring och konspiration är bland de beteckningar som senare kan väckas. Utredningen i sig är inte ett åtal. Om ett enskilt åtal följer gäller CPIA:s disclosure-skyldigheter. Vi bygger akten som om de redan gör det.",
      },
      processHeading: "Hur akten byggs",
      process: [
        {
          title: "Säkra det underliggande materialet",
          text: "Enheter, e-post, huvudböcker och betalningsuppgifter hålls med kontinuitet.",
        },
        {
          title: "Rekonstruera handlande, deltagare och förlust",
          text: "Vittnen, handlingar och finansiell analys används för att fastställa vad som hände — och för att dokumentera vad som förblir okänt.",
        },
        {
          title: "En akt som kan användas",
          text: "En skriftlig redogörelse som en försvarssolicitor skulle kunna ta upp kall. Därefter ett beslut: åtala, frysa, anmäla, kräva eller stanna.",
        },
      ],
      risks: [
        "Vittnen glömmer, lämnar eller byter sida. Tidiga vittnesmål spelar roll.",
        "En teori som är prydligare än handlingarna kommer att falla i disclosure.",
        "Civilrättsliga och straffrättsliga vägar kan krocka om de inte sekvenseras.",
      ],
      faqs: [
        {
          q: "Är detta en polisutredning?",
          a: "Nej. Det är arbete inuti en solicitorverksamhet, bedrivet så att det kan användas i domstol om du senare ger det uppdraget.",
        },
        {
          q: "Kommer ni att anmäla brottet åt mig?",
          a: "Vi kan råda om anmälan. Vi behandlar inte ett webbformulär som en polisanmälan.",
        },
        {
          q: "Hur skiljer sig detta från ett enskilt åtal?",
          a: "Denna sida är sakutredningen. Sidan under Verksamhetsområden är brottmålet som kan följa. Du kan behöva båda, eller bara detta.",
        },
        {
          q: "Intervjuar ni misstänkta?",
          a: "Där det är lagligt och användbart. PACE beaktas om ett förhör under caution är i sikte.",
        },
        {
          q: "Vad händer om handlingarna finns utomlands?",
          a: "Vi arbetar med lokal counsel och lagligt förfarande.",
        },
      ],
    },
    digitalInvestigations: {
      whenHeading: "När enheter, konton och betalningar är akten",
      forWhom: [
        "En betalningsavledning, ett authorised push payment-bedrägeri eller en plånboksrörelse har just skett.",
        "Enheter och konton behöver hållas innan någon tittar.",
        "Du behöver ett spår i en form en domstol godtar, inte en tråd av skärmdumpar.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om det omedelbara behovet är rättsligt skydd snarare än säkring beskriver sidorna om kryptotillgångar eller tillgångsspårning det arbetet. Om du bara har skärmdumpar och inte kommer att säkra enheter kan spåret redan vara för tunt att rekonstruera.",
      law: {
        heading: "Laglig inhämtning och ursprung",
        text: "Tvister om authorised push payment involverar banker och Payment Services Regulations 2017, plus eventuellt relevant ersättningssystem som gäller vid tidpunkten. Enhetsavbildning och kommunikationsdata måste inhämtas lagligt. Bevisuppgifter måste visa ursprung.",
      },
      processHeading: "Hur spåret hålls och kartläggs",
      process: [
        {
          title: "Säkra enheter och konton",
          text: "Fortsätt inte att använda en komprometterad inkorg för att kontrollera vad som hände. Vi fångar först.",
        },
        {
          title: "Ta fram spårbara transaktions- och kommunikationsuppgifter",
          text: "Banker, betalningsinstitut och plånböcker. Varje hopp markeras som bekräftat eller slutet.",
        },
        {
          title: "Stöd det rättsliga beslutet",
          text: "Brev, ansökan eller stanna. Kartan är bevisning. Beslutet är rättsligt.",
        },
      ],
      extraBlocks: [
        {
          heading: "Nycklar och lösenord",
          text: "Skicka inte lösenord, privata nycklar eller fröfraser via webbplatsen. Vi kommer aldrig att be om en fröfras eller privat nyckel.",
        },
      ],
      risks: [
        "Att använda det live-kontot efter händelsen kan skriva över spåret.",
        "Ett mottagande institut kan redan ha betalat vidare.",
        "Skärmdumpar utan metadata kommer att angripas.",
      ],
      faqs: [
        {
          q: "Ska jag kontakta min bank först?",
          a: "Ja, omgående, med ett nummer du redan har. Skriv därefter till oss med vad du fortfarande har — inte lösenord.",
        },
        {
          q: "Återvinner ni APP-bedrägeri automatiskt?",
          a: "Nej. Ersättningsregler och bankprocesser förändras. Vi råder om akten, inte om ett utlovat systemutfall.",
        },
        {
          q: "Kan ni avbilda min bärbara dator på distans?",
          a: "Ja, både på distans och på plats. Inhämtningen utförs enligt en dokumenterad kedja av förvaring av en oberoende forensisk leverantör, som avbildar enheten i stället för att arbeta på originalet, så att bevisningen håller om ärendet senare går till tribunal eller domstol. Vi kommer överens om inhämtningens omfattning och söktermer med dig skriftligen först, och vi granskar inte privileged eller uppenbart personligt material utanför den omfattningen.",
        },
        {
          q: "Vad händer om jag redan har ominstallerat telefonen?",
          a: "Säg till oss. Vissa spår överlever; många gör det inte. Ärlighet om vad som gjordes är en del av akten.",
        },
      ],
    },
    crossBorderInvestigations: {
      whenHeading: "När förfrågan måste lämna England och Wales",
      forWhom: [
        "Personer, bolag eller underlag finns utanför England och Wales.",
        "En svarande har flyttat eller gått under jorden.",
        "Du behöver fakta från utländska register, domstolar eller lokala yrkespersoner innan du lägger pengar på ett Londonkrav.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om det enda användbara steget skulle vara olagligt där det sker, eller om engelska brev ensamma inte kan tvinga ett utländskt register, kan den ärliga produkten vara en jurisdiktionskarta och en rekommendation om lokal counsel snarare än en Londonförfrågan utklädd till extraterritoriell process.",
      law: {
        heading: "Lokal lag styr lokala steg",
        text: "Utredningssteg utomlands följer lagen på den platsen. Obligatorisk straffprocess kräver ofta ömsesidig rättslig hjälp. Civilrättslig disclosure från en utländsk tredje man kräver vanligen lokal counsel. Vi behandlar inte ett Londonbrevhuvud som extraterritoriellt.",
      },
      extraBlocks: [
        {
          heading: "Londonverksamhet, lokal counsel där det krävs",
          text: "Vi är en Londonverksamhet. Där råd om utländsk rätt eller lokal process krävs identifierar och anlitar vi lämpligt kvalificerad lokal counsel med klientens godkännande.",
        },
      ],
      processHeading: "Hur utländska förfrågningar samordnas",
      process: [
        {
          title: "Kartlägg jurisdiktionerna",
          text: "Var personerna, bolagen och värdet faktiskt finns.",
        },
        {
          title: "Inhämta och samordna lagliga förfrågningar",
          text: "Register, domstolar och lokala yrkespersoner, i en form som senare kan förklaras för en engelsk domstol.",
        },
        {
          title: "En enda bild",
          text: "Vad som är visat här, vad som är visat där, och vad som förblir slutledning.",
        },
      ],
      risks: [
        "Utländska uppgifter kan vara långsamma, ofullständiga eller dyra att bestyrka.",
        "Ett steg som är lagligt i London kanske inte är lagligt utomlands.",
        "Att hitta en person är inte detsamma som att delge dem.",
      ],
      faqs: [
        {
          q: "Kan ni utreda i vilket land som helst?",
          a: "Vi kan anlita lokalt där det är lagligt och användbart. Vi gör inte anspråk på ett globalt kontorsantal.",
        },
        {
          q: "Hur hittar ni någon som har lämnat?",
          a: "Laglig spårning: register, kopplingar och lokal förfrågan. Vi säger till när vi inte kan hitta dem.",
        },
        {
          q: "Räcker utländska bolagssökningar?",
          a: "De är en början. Nominees och dåliga register begränsar vad en sökning visar.",
        },
        {
          q: "Vilka språk kan ni arbeta på?",
          a: "Vi arbetar på engelska, franska, tyska, spanska, italienska, mandarin och ryska internt. För andra språk anlitar vi granskade juridiska tolkar och översättare under samma sekretessvillkor som gäller vår egen personal, och vi meddelar kostnaden innan de anlitas. Översättning är i övrigt ett utlägg.",
        },
        {
          q: "Kan detta föda en engelsk frysningsansökan?",
          a: "Ja, om produkten läggs fram med ursprung. Ett rykte från utlandet kommer inte att göra det.",
        },
      ],
    },
    assetTracingInvestigations: {
      whenHeading: "När ägande och nåbarhet är frågorna",
      forWhom: [
        "Du behöver veta vart förskingrat värde tog vägen, och om något av det fortfarande finns där.",
        "En svarande verkar inte ha något, och det behöver prövas innan förfarande.",
        "Du behöver scheman en solicitor kan lägga fram för en domstol.",
      ],
      alternativeHeading: "När en annan väg kan vara bättre",
      alternative:
        "Om behovet redan är en frysningsansökan eller verkställighet är det juridiskt arbete som beskrivs på sidan om tillgångsspårning och återvinning. Denna sida är utredningsarbetet som avgör om de åtgärderna har något att bita i.",
      law: {
        heading: "Att finnas är inte detsamma som att vara nåbar",
        text: "Denna sida är utredning: att lokalisera värde och säga om det är nåbart. Freezing orders, receivership och trust-krav är rättsliga åtgärder som beskrivs på sidan under Verksamhetsområden. En tillgång som finns är inte alltid en tillgång som kan frysas, belånas eller säljas.",
      },
      processHeading: "Hur ägande och kontroll prövas",
      process: [
        {
          title: "Identifiera ägande, kontroll och verkställighetsobjekt",
          text: "Banker, betalningsföretag, bolag, fastigheter, varor och plånböcker, från förlustögonblicket.",
        },
        {
          title: "Pröva nåbarhet",
          text: "Belastningar, nominees, plats och kostnaden för att komma dit.",
        },
        {
          title: "Stanna eller lämna till den rättsliga vägen",
          text: "Om det inte är värt att driva säger vi det. Om det är det kan åtgärderna under Verksamhetsområden följa.",
        },
      ],
      risks: [
        "En tillgång som ser värdefull ut kan vara belånad, utomlands eller inte under svarandens kontroll.",
        "Hastighet utan hold kan tillkännage förfrågan.",
        "Att blanda utredning med en ogrundad frysningsansökan slösar cross-undertaking.",
      ],
      faqs: [
        {
          q: "Kan ni garantera att tillgångar hittas?",
          a: "Nej. Vi talar om tidigt när det finns värde att driva, och lika tidigt när spåret tar slut.",
        },
        {
          q: "Hur skiljer sig detta från Tillgångsspårning och återvinning under Verksamhetsområden?",
          a: "Denna sida lokaliserar värde och prövar nåbarhet. Sidan under Verksamhetsområden är High Court- och verkställighetsarbetet som kan följa.",
        },
        {
          q: "Jagar ni oekonomiska tillgångar?",
          a: "Inte om vi kan se det komma.",
        },
        {
          q: "Använder ni insolvens som spårningsverktyg?",
          a: "Ibland, där det är snabbare eller mer effektivt. Det är inte alltid rätt hävstång.",
        },
      ],
    },
  },

  people: {
    "richard-edison": {
      role: "Ägare",
      summary: "Ägare av Edison Law, en SRA-reglerad enskild verksamhet i London.",
      bio: [
        "Richard Edison namnges på denna webbplats som ägare av Edison Law. Byrån är en SRA-reglerad enskild verksamhet i London som ger råd i straffrättsliga, utredande och återvinningsärenden som rör bedrägeri och finansiell misskötsamhet.",
        "Varje uppdrag handleds av en namngiven solicitor. Specialiserade utredare och forensiska yrkespersoner kopplas in när deras kompetens behövs, med roll och status förklarad.",
        "Bekräfta aktuella behöriga personer i det offentliga SRA-registret. Yrkestitlar på denna webbplats är inte ett tillstånd för förbehållen verksamhet.",
      ],
    },
    "david-kerr": {
      role: "Solicitor, ekonomisk brottslighet och enskilt åtal",
      summary: "Bedömer bevisning och ger råd om strategi vid ekonomisk brottslighet och enskilt åtal.",
      bio: [
        "David är solicitor med inriktning mot ekonomisk brottslighet och enskilt åtal. Han bedömer den tillgängliga bevisningen, identifierar de rättsliga frågor som måste lösas och råder om huruvida brottmålsförfarande är realistiskt och proportionerligt.",
        "Hans arbete omfattar dokumenttunga bedrägeripåståenden, vittnesbevisning, disclosure, instruktioner till counsel och samordning med utredare och forensiska specialister. Där det är lämpligt beaktar han återvinningsalternativ vid sidan av åtalsstrategin så att varje väg stöder ärendets vidare mål.",
        "David ger klienter en tydlig redogörelse för tillgängliga rättsliga vägar, evidenssvagheter, sannolika kostnader och processuella risker innan väsentliga steg tas.",
      ],
      areas: [
        "Bedömning och målförberedelse vid enskilt åtal",
        "Bevisning vid bedrägeri och ekonomisk brottslighet",
        "Disclosure och samordning med counsel",
        "Parallell åtals- och återvinningsstrategi",
      ],
    },
    "amelia-rowe": {
      role: "Solicitor, bedrägeri och utredningar",
      summary: "Samordnar juridiskt, evidensmässigt och återvinningsarbete i bedrägeriutredningar.",
      bio: [
        "Amelia är solicitor som arbetar med bedrägeri- och utredningsärenden. Hon granskar det tillgängliga underlaget i ett tidigt skede, identifierar material som måste säkras och definierar de sakfrågor som bör utredas först.",
        "Hennes arbete omfattar vittnesförberedelse, kronologier, dokumentgranskning, disclosure och samordning med spårnings- och forensiska specialister. Hon håller den rättsliga strategin knuten till bevisning som kan prövas snarare än antaganden som bildats i början av ett ärende.",
        "Amelia förklarar syftet med varje utredningssteg och gör det resulterande materialet till en strukturerad akt som kan bära råd, förfarande eller ett beslut att inte gå vidare.",
      ],
      areas: [
        "Bedrägeri och interna utredningar",
        "Evidenssäkring och målkronologi",
        "Förberedelse av vittnen och handlingar",
        "Samordning av juridiskt och specialistarbete",
      ],
    },
    "liam-brennan": {
      role: "Utredare, ekonomisk brottslighet",
      summary: "Bygger prövbara akter om deltagare och händelser i ärenden om ekonomisk brottslighet.",
      bio: [
        "Liams roll är att fastställa vad som hände innan en rättslig väg väljs. Han arbetar utifrån underlag, vittnen och lagliga förfrågningar för att identifiera deltagare, relationer, händelser och luckor i den tillgängliga bevisningen.",
        "Det resulterande materialet ordnas så att källor kan kontrolleras och iakttagelser kan skiljas från slutledning. Där fakta eller underlag finns utomlands samordnas förfrågningar med lämpligt kvalificerade lokala yrkespersoner när det krävs.",
        "Utredningsfynd bedöms av den solicitor som ansvarar för ärendet. Liams roll omfattar inte att tillhandahålla förbehållna juridiska tjänster.",
      ],
      areas: [
        "Sakutveckling vid ekonomisk brottslighet",
        "Förfrågningar om vittnen och underlag",
        "Bolags-, domstols- och insolvensuppgifter",
        "Stöd vid gränsöverskridande utredning",
      ],
    },
    "sophie-lang": {
      role: "Specialist, betalningar och transaktionsspårning",
      summary: "Kartlägger betalningsflöden som stöd för beslut om säkring, disclosure och återvinning.",
      bio: [
        "Sophies roll fokuserar på rörelsen av fiatbetalningar efter bedrägeri, avledning eller obehörig aktivitet. Hon arbetar utifrån transaktionsuppgifter, betalningsreferenser och institutinformation för att bygga en tydlig bild av medelflödet.",
        "Utfallet kan omfatta transaktionsscheman, institutlistor, tidslinjer och identifierade luckor i underlaget. Det tas fram som stöd för beslut om bankkontakt, evidenssäkring, disclosure-vägar och möjligt brådskande skydd.",
        "Ett betalningsspår fastställer inte i sig ansvar och garanterar inte återvinning. Rättsliga slutsatser och ansökningar hanteras genom det reglerade juridiska teamet.",
      ],
      areas: [
        "Spårning via banker och betalningsinstitut",
        "Uppgifter om authorised push payment och betalningsavledning",
        "Scheman över medelflöde",
        "Transaktionsbevisning för återvinningsbeslut",
      ],
    },
    "oliver-bennett": {
      role: "Solicitor, bedrägeri och återvinning",
      summary: "Ger råd om bedrägeri, säkring av tillgångar och proportionerliga återvinningsalternativ.",
      bio: [
        "Oliver är solicitor som ger råd i bedrägeri- och återvinningsärenden. Han identifierar de relevanta parterna, bedömer den bevisning som redan finns och överväger vilka tillgångar som kan förbli nåbara innan en klient förbinder sig till betydande utgifter.",
        "Hans arbete kan förena utredningsfynd, transaktionsspårning och disclosure-ansökningar med råd om civilrättsliga, straffrättsliga och insolvensrättsliga vägar. Varje alternativ bedöms mot bevisningen, brådskan, den sannolika kostnaden och de praktiska utsikterna till verkställighet.",
        "Oliver behandlar inte identifiering av en tillgång som bevis för att den kan återvinnas. Klienter får en tydlig omfattning, en förklaring av tillgängliga vägar och en proportionerlig följd för nästa steg.",
      ],
      areas: [
        "Tidig bedömning av bedrägeri och återvinning",
        "Säkring av bevisning och tillgångar",
        "Strategi för frysning och disclosure",
        "Samordning av civilrättsliga, straffrättsliga och insolvensrättsliga vägar",
      ],
    },
    "andrew-haddon": {
      role: "Specialist, tillgångsspårning och återvinning",
      summary: "Kartlägger tillgångar och ägande för att bedöma nåbarhet, vägar och kostnad.",
      bio: [
        "Andrews roll är att identifiera potentiellt återvinningsbart värde och de personer eller enheter som verkar äga eller kontrollera det. Förfrågningar kan följa medel in i bolag, fastigheter, investeringar, varor eller digitala tillgångar.",
        "Iakttagelser ordnas som tillgångsregister, ägarkartor och källhänvisade scheman. Arbetet skiljer en tillgångs existens från de separata rättsliga frågorna om ägande, jurisdiktion och verkställbarhet.",
        "Spårning används för att informera ett beslut, inte för att lova ett resultat. Eventuellt steg om frysning, disclosure eller verkställighet råds om och handleds av det juridiska teamet.",
      ],
      areas: [
        "Kartläggning av tillgångar och ägande",
        "Anknutna bolag och nominee-strukturer",
        "Förfrågningar om fastighet, investering och digitala tillgångar",
        "Bedömning av verkställbarhet före talan",
      ],
    },
    "rosalind-keane": {
      role: "Specialist, confiscation och brottsvinster",
      summary: "Ordnar bevisning om benefit, tillgångar och available amount i ärenden om proceeds of crime.",
      bio: [
        "Rosalinds roll fokuserar på den finansiella akt som behövs för confiscation och relaterade beslut om proceeds of crime. Hon arbetar med redovisnings- och spårningsmaterial för att skilja påstådd benefit, identifierade tillgångar och de belopp som faktiskt kan vara tillgängliga.",
        "Arbetet kan omfatta finansiella scheman, kompensationsunderlag, tillgångsinformation och samordning med dem som hanterar restraint eller verkställighet. Siffror knyts tillbaka till källuppgifter och anges med sina begränsningar.",
        "Confiscation och restraint är rättsliga förfaranden med lagstadgade tester. Råd, processföring och förbehållet arbete tillhandahålls genom behöriga jurister.",
      ],
      areas: [
        "Scheman över benefit och available amount",
        "Underlag för confiscation och kompensation",
        "Tillgångsinformation kopplad till restraint",
        "Samordning med forensiskt och spårande arbete",
      ],
    },
    "julian-vance": {
      role: "Forensisk revisor",
      summary: "Rekonstruerar underlag och prövar förlustberäkningar för rättsliga förfaranden.",
      bio: [
        "Julians roll är att göra redovisningsunderlag till en tydlig, källhänvisad finansiell analys. Det kan innebära att rekonstruera huvudböcker, granska koncerninterna rörelser, pröva transaktioner och skilja bokförd förlust från obelagt antagande.",
        "Hans scheman tas fram för användning av det juridiska och utredande teamet i råd, inlagor, vittnesbevisning, confiscation-analys eller korsförhör. Där underlaget inte bär en föreslagen slutsats anges begränsningen.",
        "Omfattningen av eventuell sakkunnigbevisning och den egenskap i vilken den lämnas bekräftas för det särskilda uppdraget. Profilen gör inte ett allmänt anspråk på sakkunnigförordnande.",
      ],
      areas: [
        "Rekonstruktion av huvudbok och transaktioner",
        "Beräkningar av förlust och benefit",
        "Analys av koncerninterna och närstående parter",
        "Finansiella scheman för förfarande",
      ],
    },
    "imogen-vale": {
      role: "Analytiker, digital forensik och bevisning",
      summary: "Säkrar digital bevisning med ursprung, kontinuitet och begränsningar dokumenterade.",
      bio: [
        "Imogens roll börjar med säkring. Enheter, brevlådor, molnkonton och loggar kan behöva hållas innan vanlig användning, exporter eller kontoändringar förändrar det tillgängliga underlaget.",
        "Arbetet dokumenterar hur material samlades in, vilken metadata som återstår och vilka begränsningar som påverkar tolkningen. Utfallet kan omfatta säkringsanteckningar, enhets- eller kontoavbildningar, tidslinjer och bevisuppgifter för granskning av jurister och utredare.",
        "Digital inhämtning avgränsas efter befogenhet, relevans, integritet och privilege. Rättsliga beslut om användning och disclosure ligger kvar hos den solicitor som ansvarar för ärendet.",
      ],
      areas: [
        "Säkring av enheter och konton",
        "Granskning av brevlåda, logg och metadata",
        "Kontinuitets- och inhämtningsuppgifter",
        "Digitala tidslinjer och bevisuppgifter",
      ],
    },
    "abigail-wills": {
      role: "SRA-reglerad solicitor",
      summary: "SRA-reglerad solicitor som anges i det offentliga organisationsregistret för Edison Law.",
      bio: [
        "Abigail Charlotte Wills är en SRA-reglerad solicitor. Hon är den solicitor som anges i det offentliga SRA-organisationsregistret för Edison Law, en erkänd enskild verksamhet som är auktoriserad och reglerad under SRA-nummer 510498.",
        "Förbehållen juridisk verksamhet i byrån utförs av en solicitor. Bekräfta hennes aktuella behörighet i det offentliga SRA-registret. Yrkestitlar på denna webbplats ersätter inte det registret.",
        "Organisationsregistret listar för närvarande straffrättsligt arbete bland byråns verksamhetsområden. Instruktioner antas skriftligen efter intressekonfliktskontroll.",
      ],
      areas: [
        "SRA-auktoriserad förbehållen juridisk verksamhet",
        "Erkänd enskild verksamhet",
        "Straffrättsligt arbete enligt SRA-registret",
        "Offentligt SRA-organisationsregister",
      ],
    },
    "marcus-quinn": {
      role: "Analytiker, krypto- och digital tillgångsspårning",
      summary: "Kartlägger digitala tillgångar och skiljer bekräftade transaktioner från analytisk slutledning.",
      bio: [
        "Marcus roll fokuserar på vad offentliga blockkedjeuppgifter kan fastställa om rörelsen av digitala tillgångar. Transaktioner kan kartläggas över plånböcker, bridges, byten och identifierbara tjänster, inklusive möjliga insättningspunkter hos börser.",
        "Analysen dokumenterar transaktionsidentifierare, tidsstämplar och metod. Bekräftade överföringar skiljs från klustring, attribution och andra slutledningar så att det juridiska teamet kan bedöma vilken ytterligare plattforms-, enhets- eller identitetsbevisning som krävs.",
        "On-chain-spårning kan inte ångra en transaktion eller i sig visa kontroll över en plånbok. Begäran till plattformar och eventuell domstolsansökan hanteras via den lämpliga rättsliga vägen.",
      ],
      areas: [
        "Kartläggning av plånböcker och transaktioner",
        "Bridges, byten och insättningspunkter hos börser",
        "Tjänstattribution och klustringens gränser",
        "Spårrapporter och stödjande bevisuppgifter",
      ],
    },
    "robert-hale": {
      role: "Senior specialist, återvinning",
      summary: "Samordnar nåbarhet, återvinningsvägar och kostnad-nytta-beslut.",
      bio: [
        "Roberts roll är att föra spårning, rättsliga åtgärder och verkställighetens ekonomi in i en återvinningsplan. Identifierade tillgångar bedöms efter plats, skenbart ägande, säkerhet, likviditet och det förfarande som kan krävas för att nå dem.",
        "Planen kan innefatta disclosure, frysning, insolvens, receivership eller verkställighetssteg, med lokal counsel anlitad där utländsk rätt eller process krävs. Varje steg omprövas mot sannolikt värde, dröjsmål och kostnad.",
        "En tillgång som kan identifieras är inte nödvändigtvis en tillgång som kan återvinnas. Juridisk rådgivning och förbehållet arbete ligger kvar hos den solicitor som ansvarar för ärendet.",
      ],
      areas: [
        "Återvinningsplanering och sekvensering",
        "Alternativ för verkställighet och insolvens",
        "Samordning av gränsöverskridande återvinning",
        "Granskning av kostnad och återvinningsbarhet",
      ],
    },
    "clara-whitfield": {
      role: "Solicitor, disclosure och oanvänt material",
      summary: "Ger råd om disclosure och fortlöpande granskning i förfaranden om ekonomisk brottslighet.",
      bio: [
        "Clara är solicitor med fokus på disclosure och oanvänt material i enskilt åtal och ärenden om ekonomisk brottslighet. Hon behandlar disclosure som en fortlöpande rättslig skyldighet snarare än en administrativ övning som lämnas till slutet av ett mål.",
        "Hennes arbete omfattar disclosure-strategi, scheman över oanvänt material, kontinuitetsuppgifter och kontakt med dem som samlar in digital, finansiell och vittnesbevisning. Material granskas mot frågor det kan stödja eller underminera allt eftersom målet och försvarets ställning utvecklas.",
        "Clara ger råd om åklagarens skyldigheter avseende disclosure och rättvisa, och ser till att charging- och disclosure-beslut dokumenteras och hålls under omprövning under hela förfarandet.",
      ],
      areas: [
        "Disclosure-strategi och granskning",
        "Scheman över oanvänt material",
        "Kontinuitets- och exhibit-uppgifter",
        "Fortlöpande granskning i enskilt åtal",
      ],
    },
    "thomas-ellery": {
      role: "Solicitor, enskilt åtal och ekonomisk brottslighet",
      summary: "Bedömer bevisning och ger råd om huruvida enskilt åtal är motiverat.",
      bio: [
        "Thomas är solicitor som ger råd om enskilt åtal och ärenden om ekonomisk brottslighet. Han bedömer det påstådda handlandet, tillgänglig bevisning och det rättsliga testet för att inleda brottmålsförfarande innan han rekommenderar en åtalsväg.",
        "Han samordnar säkring, vittnesmaterial, oanvänt material och den tidiga målakten med utredare, forensiska specialister och counsel där det krävs. Relaterade civilrättsliga eller återvinningssteg identifieras så att en väg inte oavsiktligt äventyrar en annan.",
        "Thomas ger klienter råd om sakskäl, åklagarskyldigheter, kostnad och processuell risk innan förfarande inleds. Ett enskilt åtal är inte garanterat att inledas eller lyckas, och CPS behåller rätten att ta över det.",
      ],
      areas: [
        "Meritbedömning vid enskilt åtal",
        "Tidig evidens- och vittnesförberedelse",
        "Disclosure och åklagarskyldigheter",
        "Samordning med återvinning och civilrättsliga vägar",
      ],
    },
    "hannah-croft": {
      role: "Specialist, interna utredningar",
      summary: "Strukturerar interna utredningar, evidenssäkring och sakfynd.",
      bio: [
        "Hannahs roll fokuserar på strukturen och sakakten i interna förfrågningar. Arbetet börjar med att definiera frågorna, beslutsfattarna, material som ska säkras och förhållandet till eventuellt anställnings-, tillsyns- eller brottmålsförfarande.",
        "Hon kan samordna dokumenthold, intervjuer, tidslinjer och rapportering med jurister och digitala specialister. Iakttagelser identifierar vad som är fastställt, vad som förblir omtvistat och vilket material som bär varje slutsats.",
        "Privilege, rapporteringsskyldigheter och rättsliga konsekvenser bedöms av den solicitor som ansvarar för ärendet. En intern utredning behandlas inte som en förutbestämd väg till avsked eller åtal.",
      ],
      areas: [
        "Förfrågningar om visselblåsare och internt bedrägeri",
        "Dokumenthold och intervjuplanering",
        "Utredningskronologier och iakttagelser",
        "Samordning med anställnings- och tillsynsarbete",
      ],
    },
    "hugh-penton": {
      role: "Solicitor — tillsynsförsvar och utredningar",
      summary: "Ger råd om tidiga tillsynssvar, privilege, förelägganden och förhör.",
      bio: [
        "Hugh är solicitor som ger råd till enskilda och organisationer när en tillsyns- eller brottsbekämpande myndighet har tagit kontakt eller en utredning väntas. Hans inledande råd tar upp evidenssäkring, privilege, kommunikation och omfattningen av eventuell tvångsbefogenhet.",
        "Hans arbete omfattar information notices, förhör under caution, intern sakutveckling och samordning med relaterade civilrättsliga eller återvinningsfrågor. Rådet grundas på den namngivna myndigheten, den befogenhet som används och de handlingar som faktiskt finns tillgängliga.",
        "Hugh hjälper klienter att förstå sina omedelbara skyldigheter, tillgängliga skydd och de beslut som bör dokumenteras. Tillsynsförfaranden skiljer sig väsentligt, så svaret anpassas till den särskilda ordningen och ärendets skede.",
      ],
      areas: [
        "Brådskande svar på utredning",
        "Privilege och evidenssäkring",
        "Information notices och förhör",
        "Parallella tillsyns-, civilrättsliga och återvinningsfrågor",
      ],
    },
    "edward-langford": {
      role: "Solicitor — gränsöverskridande bedrägeri och korruption",
      summary: "Samordnar gränsöverskridande bedrägeri- och återvinningsärenden med lokal counsel.",
      bio: [
        "Edward är solicitor som ger råd i bedrägeri- och korruptionsärenden där viktiga fakta, personer eller tillgångar finns i mer än en jurisdiktion. Han bedömer forum, delgivning, bevisning, interimistiskt skydd och verkställbarhet innan talan väcks.",
        "Han samordnar lämpligt kvalificerad lokal counsel för råd om utländsk rätt och processuella steg, med klientens godkännande. Register-, spårnings- och utredningsarbete integreras i en enda rättslig tidplan.",
        "Edward ger klienter en praktisk bild av erkännande, verkställighet, dröjsmål och kostnad i varje relevant jurisdiktion. Ett engelskt beslut verkar inte automatiskt utomlands, och den gränsöverskridande planen avspeglar den begränsningen.",
      ],
      areas: [
        "Kartläggning av forum, svarande och tillgångar",
        "Delgivning och bevisning över gränser",
        "Samordning med lokal counsel",
        "Planering av erkännande och verkställighet",
      ],
    },
    "daniel-crowe": {
      role: "Utredare, ekonomisk brottslighet",
      summary: "Knyter handlingar, transaktioner, vittnen och deltagare till en prövbar akt.",
      bio: [
        "Daniels roll är att pröva ett påstående mot de uppgifter som fortfarande finns. Han identifierar relevanta personer, källhandlingar, transaktionsinformation och saknat material, och ordnar därefter iakttagelser kring de överenskomna utredningsfrågorna.",
        "Arbetet kan omfatta vittnesförfrågningar, kronologier, kontinuitetsuppgifter och kopplingar mellan mottagare, bolag eller konton. Iakttagelser och olösta slutledningar hålls åtskilda.",
        "Utredningen informerar juridisk rådgivning; den avgör inte skuld och väljer inte en rättslig väg på egen hand. De besluten ligger kvar hos den handledande solicitorn.",
      ],
      areas: [
        "Förfrågningar om bedrägeri och ekonomisk brottslighet",
        "Utveckling av vittnen och källhandlingar",
        "Kronologier och kontinuitetsuppgifter",
        "Kartläggning av deltagare och transaktioner",
      ],
    },
    "simon-blake": {
      role: "Solicitor — kryptobedrägeri och digitala tillgångar",
      summary: "Ger råd om kryptospårning, säkring, disclosure och interimistiskt skydd.",
      bio: [
        "Simon är solicitor som ger råd om kryptobedrägeri och tvister om digitala tillgångar. Han bedömer on-chain-överföringar tillsammans med plattformskorrespondens, enhetsbevisning och identitetsmaterial eftersom ett plånboksspår ensamt sällan visar ägande eller kontroll.",
        "Han arbetar med spårningsanalytiker om säkringsbegäran, plattformskontakt, sakrättsliga krav, interimistiskt skydd och valet mellan civilrättsliga och straffrättsliga vägar. Bekräftade transaktioner hålls skilda från teknisk slutledning och attribution.",
        "Simon förklarar vad den tillgängliga bevisningen kan bära, vilken rättslig väg som kan vara proportionerlig och var ytterligare disclosure behövs. Återvinning av digitala tillgångar förblir faktakänslig och kan inte garanteras.",
      ],
      areas: [
        "Rättslig bedömning av kryptobedrägeri",
        "Vägar för plattformssäkring och disclosure",
        "Analys av sakrättsligt och interimistiskt skydd",
        "Val av civilrättslig och straffrättslig väg",
      ],
    },
    "helen-ashworth": {
      role: "Solicitor — skatteutredningar och HMRC",
      summary: "Ger råd om HMRC-utredningar, förelägganden, privilege och dokumentomfattning.",
      bio: [
        "Helen är solicitor som ger råd om HMRC-utredningar och skatterelaterade utredningar. Hon identifierar vad en begäran kräver, vilka uppgifter som besvarar den och vilka rättsliga eller evidensmässiga frågor som uppstår av det föreslagna svaret.",
        "Hennes arbete omfattar dokumentavgränsning, privilege-granskning, kronologi och samordning med skattespecialister där materiellt skatteråd krävs. Civila enquiries, information notices och brottsutredningar behandlas som skilda förfaranden.",
        "Helen hjälper klienter att lämna ett korrekt, proportionerligt svar samtidigt som relaterade frågor om bedrägeri, återvinning och rapportering hålls synliga. Hennes roll omfattar inte upprättande av deklarationer, och utfallet eller längden av en enquiry kan inte förutses.",
      ],
      areas: [
        "HMRC-utredningar och information notices",
        "Dokumentomfattning och privilege-granskning",
        "Utredningskronologi och bevisning",
        "Samordning med specialistskatteråd",
      ],
    },
    "graham-holt": {
      role: "Specialist, pre-litigation-underrättelser",
      summary: "Utvecklar lagliga underrättelser före process om motparter, kopplingar och tillgångar.",
      bio: [
        "Grahams roll sitter före process, investering eller ett annat väsentligt beslut. Offentliga register, bolagsregistreringar, processinformation och laglig öppenkällsforskning används för att klargöra identitet, kontroll, kopplingar och skenbar verkställbarhet.",
        "Iakttagelser är källhänvisade och kvalificerade. En bolagskoppling, en delad adress eller en association online behandlas inte som bevis för ägande eller misskötsamhet.",
        "Syftet och synligheten hos varje förfrågan avtalas i förväg. Juridisk rådgivning om huruvida man ska gå vidare ges genom det reglerade juridiska teamet.",
      ],
      areas: [
        "Forskning om motpart och bolagsregister",
        "Kartläggning av anknutna enheter",
        "Granskning av skenbara tillgångar och verkställbarhet",
        "Rapportering som stöd före process och beslut",
      ],
    },
  },

  insightBodies: {
    "fake-crypto-recovery-services": [
      {
        heading: "Sammanfattning",
        text: "Efter förlust av digitala tillgångar är ett andra bedrägeri vanligt: någon erbjuder sig att ”återvinna” medlen om du betalar en avgift, delar en fröfras eller ger fjärråtkomst. Det är inte juridiskt arbete. En reglerad solicitorverksamhet kommer inte att be om de sakerna.",
      },
      {
        heading: "Bakgrund",
        text: "Impersonation sker ofta på Telegram, WhatsApp eller liknande e-postdomäner. Meddelandet kan använda en byrås namn, en jurists fotografi eller språket kring spårning och frysning. Äkta kontakt från Edison Law kan kontrolleras på denna webbplats och på sidan Bedrägerivarning. Vi inleder inte uppdrag i meddelandeappar, och vi ber inte om privata nycklar, fröfraser, 2FA-koder eller fjärrstyrning av en enhet.",
      },
      {
        heading: "Metod",
        text: "Om ett oväntat återvinningserbjudande kommer, avbryt samtalet. Betala inte. Dela inte inloggningsuppgifter. Spara skärmdumpar av profilen, användarnamn, betalningsbegäran, länkar och eventuella plånboksadresser som används. De uppgifterna kan senare bära en anmälan eller en civilrättslig akt. Bekräfta en påstådd solicitor mot det offentliga SRA-registret och en känd kontaktkanal, inte numret i samma meddelande.",
      },
      {
        heading: "Rättsliga alternativ",
        text: "En solicitor kan bedöma om spårning, säkring, disclosure eller förfarande är realistiskt avseende den ursprungliga förlusten. Det är ett avgränsat uppdrag med skriftlig debiteringsgrund. Det är inte ett löfte att ångra en blockkedjeöverföring. Den som garanterar återvinning, eller som behöver din fröfras för att ”låsa upp” medel, erbjuder inte en juridisk tjänst du bör använda.",
      },
      {
        heading: "Begränsningar",
        text: "Denna anteckning kan inte identifiera varje impersonation. Om du är osäker på om ett meddelande kommer från Edison Law, använd kontaktformuläret på denna webbplats eller ett nummer eller en adress du redan har. Se även sidan Bedrägerivarning.",
      },
    ],
    "legal-routes-after-crypto-movement": [
      {
        heading: "Sammanfattning",
        text: "Det finns ingen central myndighet som ångrar en bekräftad kryptovalutaöverföring. Den rättsliga uppgiften är att identifiera förlustens karaktär, vad uppgifterna kan visa, och om någon person, plattform eller omvandlad vinning fortfarande kan nås.",
      },
      {
        heading: "Bakgrund",
        text: "Nätverk är decentraliserade, adresser är pseudonyma, och hopp över bridges eller mixers kan sudda ut ett användbart spår snabbt. Värde löses ofta in via en börs, ett betalningsinstitut eller en bank. Gränsöverskridande aktörer och utländska plattformar komplicerar delgivning, bevisning och verkställighet. De fakta begränsar vad en engelsk akt kan göra. De avgör inte, i sig, att ingenting bör försökas.",
      },
      {
        heading: "Metod",
        text: "Den första bedömningen skiljer stöld, investeringsbedrägeri, kontokompromiss och en tvist om kontroll över en plånbok. On-chain-kartläggning behandlas som en uppgift om överföringar, inte som bevis för identitet eller för en nåbar svarande. Off-chain-material — börskorrespondens, enhetsloggar, bankutdrag efter omvandling — listas separat. Förlorade eller glömda nycklar är ett annat problem: en solicitor kan inte rekonstruera en fröfras.",
      },
      {
        heading: "Rättsliga alternativ",
        text: "Där bevisningen bär det kan alternativen omfatta säkringsbegäran till en plattform, disclosure mot ett känt institut, en frysnings- eller sakrättslig ansökan i engelsk domstol, en anmälan till brottsbekämpning, eller ett beslut att den sannolika kostnaden överstiger någon realistisk återvinning. Om medel verkar ha omvandlats till fiat kan banker och betalningsinstitut vara mer relevanta än den ursprungliga plånboken. Utgivare av stablecoins driver ibland frysningsprogram; det är inte ett domstolsbeslut och det är inte tillgängligt i varje fall. Utländsk process hanteras genom lokal counsel med klientens godkännande.",
      },
      {
        heading: "Begränsningar",
        text: "Ingen profil eller anteckning kan säga att ett beslut kommer att meddelas, att en plattform kommer att samarbeta, eller att identifierat värde kommer att återvinnas. Interimistiskt skydd är diskretionärt. Ett engelskt beslut verkar inte automatiskt utomlands. Arvoden avser juridiskt arbete, inte en andel av återvunna tillgångar beskriven som ett resultat.",
      },
    ],
    "first-records-after-digital-asset-loss": [
      {
        heading: "Sammanfattning",
        text: "Den användbara akten sätts samman under de första timmarna: transaktionsidentifierare, plånboksadresser, tidsstämplar, plattformsnamn och de meddelanden som föranledde överföringen. Informell ”städning” av enheter och konton förstör ofta mer än den skyddar.",
      },
      {
        heading: "Bakgrund",
        text: "Nätfiske, falska investeringsplattformar, SIM-swap-åtkomst till konton, komprometterade plånböcker och auktoriserade betalningar till en bedragares adress lämnar olika spår. Den senare rättsliga frågan är vad som fortfarande kan visas. Skärmdumpar hjälper. De är inte en ersättning för de underliggande identifierarna.",
      },
      {
        heading: "Metod",
        text: "Skriv ned varje plånboksadress, transaktionshash, börs- eller mäklarnamn, datum och belopp du fortfarande har. Behåll e-post, chattar och fakturor som de kom. Om en enhet eller ett konto fortfarande kan vara komprometterat, byt lösenord på återstående tjänster och aktivera en andra faktor som inte är SMS där du kan. Skicka inte fröfraser, privata nycklar eller originalhandlingar som styrker identitet via en webbplats eller en meddelandeapp. Ge inte fjärråtkomst till någon som erbjuder sig att återvinna medlen.",
      },
      {
        heading: "Rättsliga alternativ",
        text: "När akten är stabil kan en solicitor säga om brådskande säkring, ett plattformsmeddelande, en anmälan till Action Fraud eller polisen, eller en ansökan om skydd är realistisk. Anmälan skapar en akt. Den fryser inte, i sig, värde eller tar fram en svarande. Det första samtalet är en bedömning av den akt du redan har, inte en begäran om nycklar.",
      },
      {
        heading: "Begränsningar",
        text: "Vissa förluster lämnar nästan inget återvinningsbart spår. Att säga det tidigt är en del av arbetet. Denna anteckning är allmän information. Den är inte en checklista som gör förfarande lämpligt i varje fall.",
      },
    ],
    "tracing-assets-across-wallets": [
      {
        heading: "Sammanfattning",
        text: "Ett plånboksspår är inte ett mål. Det är en uppsättning uppgifter som kan bära ett. Denna anteckning beskriver hur vi läser de uppgifterna innan någon ombeds agera på dem.",
      },
      {
        heading: "Bakgrund",
        text: "Värde kan röra sig genom flera adresser på minuter. Skärmdumpar och explorer-länkar kommer först. De är användbara och ofullständiga. De visar inte, i sig, kontroll, vetskap eller en nåbar svarande.",
      },
      {
        heading: "Metod",
        text: "Vi kartlägger de överföringar som kan visas, dokumenterar de verktyg och tidsstämplar som använts, och markerar varje hopp som beror på ett antagande. Börsuppgifter, off-chain-meddelanden och den rättsliga identiteten bakom ett kluster behandlas som skilda frågor.",
      },
      {
        heading: "Rättsliga alternativ",
        text: "Kartan stöder därefter ett beslut: säkra, skriva ett brev, ansöka om ett beslut, eller vänta. Beslutet är rättsligt. Kartan är bevisning.",
      },
      {
        heading: "Begränsningar",
        text: "Mixers, bridges, saknade börsdata och delade adresser begränsar alla vad som kan sägas. De begränsningarna hör hemma i rådet, inte i en fotnot efter en hoppfull slutsats.",
      },
    ],
    "hmrc-enquiry-evidence": [
      {
        heading: "Sammanfattning",
        text: "En enquiry är en begäran om en akt som kan besvara en definierad fråga. Att lägga till volym är inte detsamma som att besvara den.",
      },
      {
        heading: "Bakgrund",
        text: "HMRC-korrespondens kommer ofta med en bred informationsbegäran. Det användbara svaret är det som uppfyller föreläggandet, skyddar privilege och inte frivilligt bjuder en teori.",
      },
      {
        heading: "Metod",
        text: "Vi listar de frågor som faktiskt ställts, de handlingar som besvarar dem, och de handlingar som skulle skapa en ny fråga om de skickades. Den listan blir arbetsakten.",
      },
      {
        heading: "Rättsliga alternativ",
        text: "Beroende på skedet kan nästa steg vara en fokuserad disclosure, ett möte, eller råd om att ärendet rör sig mot ett annat förfarande.",
      },
      {
        heading: "Begränsningar",
        text: "Detta är inte upprättande av deklarationer och det är inte ett löfte att en enquiry kommer att avslutas enligt någon tidplan.",
      },
    ],
    "preserving-digital-evidence": [
      {
        heading: "Sammanfattning",
        text: "De första timmarna av ett digitalt ärende går vanligen åt till att besluta vad man inte ska göra. Radering, ”hjälpsam” vidarebefordran och informella exporter förändrar alla akten.",
      },
      {
        heading: "Bakgrund",
        text: "Telefoner, molnkonton och börsinloggningar är lätta att ändra och svåra att rekonstruera. En senare domstol kommer att fråga hur materialet inhämtades.",
      },
      {
        heading: "Metod",
        text: "Håll originalkällan. Dokumentera vem som hade åtkomst och när. Exportera på ett sätt som bevarar metadata där det är möjligt. Skriv inte en berättelse ovanpå exporten förrän exporten är stabil.",
      },
      {
        heading: "Rättsliga alternativ",
        text: "Säkring sitter före strategi. När akten är stabil blir de rättsliga alternativen synliga: anmäla, lämna ut, försvara, eller inte ta något offentligt steg.",
      },
      {
        heading: "Begränsningar",
        text: "Vissa källor kan inte säkras perfekt. Vi säger det. En ofullständig akt är fortfarande mer användbar än en rekonstruerad historia.",
      },
    ],
  },

  trust: {
    firm: {
      entityType:
        "Erkänd enskild verksamhet (recognised sole practice), auktoriserad och reglerad av Solicitors Regulation Authority",
      regulatorCheckText:
        "Du kan kontrollera vår tillsynsstatus och praktikstatus för varje solicitor som namnges på denna webbplats i SRA:s offentliga register på sra.org.uk.",
    },
    insurance: {
      territoryNote:
        "Vår ansvarsförsäkring uppfyller SRA:s minimivillkor och täcker arbete som utförs under rätten i England och Wales. Råd om rätten i en annan jurisdiktion ligger utanför vårt skydd om vi inte bekräftar annat skriftligen.",
      liabilityCap:
        "Vårt ansvar för ett enskilt ärende är begränsat till 3 000 000 GBP, i linje med vår ansvarsförsäkring, om vi inte skriftligen kommer överens om ett annat belopp med dig innan arbetet börjar. Vi undantar inte ansvar för bedrägeri, för dödsfall eller personskada orsakad av vårdslöshet, eller för något annat som inte lagligen kan undantas.",
    },
    clientMoney: {
      statement:
        "Vi för inte klientkonto och vi håller inte klientmedel enligt definitionen i SRA Accounts Rules. Arvoden och utlägg betalas in på vårt driftkonto mot en räkning eller en överenskommen förskottsbetalning för kostnader, och varje förskott används endast för det ärende det gavs för. Där en betalning behöver hållas av en tredje part talar vi om vem som håller den och på vilka villkor innan du skickar något.",
      bankNote: "Inte tillämpligt — inget klientkonto förs.",
    },
    contact: {
      officeHours: "Måndag till fredag, 9:00 till 17:30. Stängt på engelska allmänna helgdagar.",
      acknowledgementTime: "Vi bekräftar varje förfrågan senast vid slutet av nästa arbetsdag.",
      substantiveTime:
        "Där vi kan agera får du en namngiven solicitor och en översikt av nästa steg inom två arbetsdagar från den bekräftelsen.",
      firstContactStatement:
        "Ditt första e-postmeddelande eller samtal läses av VERIFY_FIRST_CONTACT_NAME, inte av ett mottagningsteam eller ett callcenter. Du får då veta vem som kommer att hantera ditt ärende och vem som handleder dem.",
      outOfHours:
        "Vi driver inte en dygnet-runt-linje. Befintliga klienter i pågående brådskande ärenden ges ett direkt mobilnummer till den solicitor som hanterar deras mål, och ställningen om kontakt utanför kontorstid anges i det ärendets uppdragsbrev. Om ett nytt ärende är verkligt brådskande — en dawn raid, ett förhör under caution, en injunction delgiven dig — märk ditt e-postmeddelande URGENT i ämnesraden så ses det samma dag under kontorstid.",
    },
    complaints: {
      procedure: [
        "Ta upp det först med den solicitor som hanterar ditt ärende. De flesta invändningar rör omfattning, kostnad eller tempo och löses i ett enda samtal.",
        "Om du hellre inte vill det, eller om det inte löser saken, skriv till VERIFY_COMPLAINTS_HANDLER_NAME på VERIFY_COMPLAINTS_EMAIL. Ange vad som gick fel och vilket utfall du vill ha.",
        "Vi bekräftar varje skriftligt klagomål inom fem arbetsdagar och talar om vem som utreder det och när du kan vänta ett beslut.",
        "Du får vårt slutliga skriftliga svar inom åtta veckor från det att klagomålet nådde oss. Om vi behöver längre tid talar vi om varför och ger dig ett datum.",
      ],
      ombudsmanText:
        "Om du inte är nöjd med vårt slutliga svar, eller om åtta veckor går utan ett, kan du be Legal Ombudsman att se på saken. Du behöver vanligen göra det inom sex månader från vårt slutliga svar, och inom ett år från den handling som klagomålet avser eller från när du skäligen borde ha insett att det fanns skäl att klaga. Legal Ombudsman hanterar tjänsteklagomål. Klagomål om vårt yrkesmässiga uppträdande — oärlighet, diskriminering, brott mot SRA Standards and Regulations — går i stället till Solicitors Regulation Authority. Du kan vända dig till endera utan att först komma till oss, även om det vanligen går snabbare om du gör det.",
      noRetaliation:
        "Att klaga kostar dig ingenting och påverkar inte hur ditt ärende drivs.",
    },
    fees: {
      model:
        "Vi arbetar med timarvode i de flesta ärenden och med fast arvode där omfattningen kan definieras i förväg. Vi talar om vilken modell som gäller innan du förbinder dig till något.",
      bands: [
        { grade: "Partner / Director", rate: "£450", note: "per timme" },
        { grade: "Senior Associate", rate: "£325", note: "per timme" },
        { grade: "Associate", rate: "£250", note: "per timme" },
        { grade: "Paralegal / Trainee", rate: "£140", note: "per timme" },
      ],
      vatTreatment:
        "Alla satser anges exklusive moms (VAT), som för närvarande tas ut med 20 %. Utlägg vi betalar för din räkning kan bära moms eller inte, och vi specificerar båda separat på varje räkning.",
      billingUnit:
        "Tid registreras i sexminutersenheter. Vi tar inte betalt för det första samtalet där vi tar reda på om vi kan hjälpa dig.",
      scopeTimescale:
        "Du får en skriftlig omfattning, en arvodesuppskattning och en namngiven solicitor inom två arbetsdagar från det att du ger oss uppdraget, och inom en arbetsdag i brådskande ärenden. Om omfattningen ändras får du en reviderad uppskattning skriftligen innan det ytterligare arbetet börjar, inte efter.",
      estimateHonesty:
        "En uppskattning är inte ett tak. Det som flyttar den är nästan alltid volymen av handlingar, antalet personer som ska intervjuas, och om motparten samarbetar. Vi talar om så snart vi kan se att en uppskattning kommer att överskridas.",
      sraPriceList:
        "De obligatoriska kraven på prispublicering i SRA Transparency Rules gäller inte det arbete vi utför, eftersom vi inte erbjuder de uppräknade konsument- och småföretagstjänsterna. Vi publicerar våra satser här frivilligt och på samma grund som vi skulle vara skyldiga att göra om reglerna gällde.",
      thirdPartyFunding:
        "Ansvarsförsäkring för styrelse och ledning samt rättsskyddsförsäkring betalar ofta för detta arbete. Där du har sådant skydd underrättar vi, på din begäran, försäkringsgivaren, söker deras godkännande av våra satser och fakturerar dem direkt. Försäkringsgivare ålägger ofta en panelsats under vår; om de gör det talar vi om skillnaden skriftligen och du avgör om du täcker gapet eller i stället anlitar panelcounsel. Du förblir ansvarig för våra arvoden om försäkringsgivaren avslår eller drar tillbaka skyddet.",
    },
    method: {
      interviewRecording:
        "Vår utgångspunkt är en detaljerad samtida anteckning, tagen av en andra jurist, som den intervjuade bjuds in att granska och rätta. Vi ljudinspelar endast där den intervjuade ger skriftligt samtycke i förväg, eller där förfarandet kräver det. Att spela in dolt, eller utan att tala om det för alla i rummet, är inget vi gör.",
      deviceCollection:
        "Ja, både på distans och på plats. Inhämtningen utförs enligt en dokumenterad kedja av förvaring av en oberoende forensisk leverantör, som avbildar enheten i stället för att arbeta på originalet, så att bevisningen håller om ärendet senare går till tribunal eller domstol. Vi kommer överens om inhämtningens omfattning och söktermer med dig skriftligen först, och vi granskar inte privileged eller uppenbart personligt material utanför den omfattningen.",
      languages:
        "Vi arbetar på engelska, franska, tyska, spanska, italienska, mandarin och ryska internt. För andra språk anlitar vi granskade juridiska tolkar och översättare under samma sekretessvillkor som gäller vår egen personal, och vi meddelar kostnaden innan de anlitas.",
    },
    privacy: {
      lawfulBases: [
        {
          basis: "Fullgörande av avtal",
          use: "Att agera för dig i ditt ärende och fakturera dig för det.",
        },
        {
          basis: "Rättslig förpliktelse",
          use: "Klientkontroll och dokumentation under Money Laundering Regulations 2017, och våra skyldigheter mot SRA och HMRC.",
        },
        {
          basis: "Berättigat intresse",
          use: "Jävskontroll, akthantering, kreditbevakning och förbättring av hur vi driver ärenden. Du kan invända och vi slutar om vi inte har ett tvingande skäl att inte göra det.",
        },
        {
          basis: "Samtycke",
          use: "Marknadsföringsmejl och uppdateringar. Återkalla det när som helst så upphör mejlen.",
        },
        {
          basis: "Article 9(2)(f) UKGDPR and Schedule 1 Part 2 DPA 2018",
          use: "Särskilda kategorier av uppgifter och uppgifter om lagöverträdelser där det är nödvändigt för rättsliga förfaranden, juridisk rådgivning, eller för att fastställa, göra gällande eller försvara rättsliga anspråk.",
        },
      ],
      retention: [
        {
          category: "Klientakter",
          period: "Sex år från det att akten avslutas, i linje med den primära preskriptionstiden, därefter säkert förstörda.",
        },
        {
          category: "Uppgifter om penningtvättskontroll och identitet",
          period: "Fem år från slutet av affärsförhållandet, enligt vad Money Laundering Regulations 2017 kräver.",
        },
        {
          category: "Ekonomiska och faktureringsuppgifter",
          period: "Sju år, för HMRC-ändamål.",
        },
        {
          category: "Testamenten, deeds och originalhandlingar som hålls på order",
          period: "Tills vidare, eller tills du eller dina företrädare begär dem tillbaka.",
        },
        {
          category: "Misslyckade förfrågningar",
          period: "Tolv månader, så att vi kan köra jävskontroller, därefter raderade.",
        },
        {
          category: "Marknadsföringskontakter",
          period: "Tills du avanmäler dig, därefter endast en spärrpost.",
        },
      ],
      rightsText:
        "Du kan begära en kopia av dina uppgifter, be oss rätta dem, be oss radera dem, eller invända mot hur vi använder dem. Vissa av de rättigheterna är begränsade där vi håller material för rättsliga förfaranden eller för att uppfylla en rättslig förpliktelse, och vi förklarar om det gäller. Skriv till VERIFY_PRIVACY_EMAIL. Om du inte är nöjd kan du klaga till Information Commissioner's Office på ico.org.uk, även om vi hellre ser att du kommer till oss först.",
      internationalTransfers:
        "Vi håller data i Storbritannien och EES. Där ett ärende kräver att vi skickar material utanför de områdena — utländsk counsel, en utländsk tillsynsmyndighet — gör vi det under UK-tillägget till EU:s standardavtalsklausuler eller ett adequacy decision, och vi talar om det först.",
    },
    reviews: {
      statementTemplate:
        "Granskad av {reviewerName}, {reviewerRole}, den {lastReviewed}. Nästa granskning {nextReview}. Denna sida är allmän information om rätten i England och Wales och utgör inte råd i din situation.",
    },
  },
};
