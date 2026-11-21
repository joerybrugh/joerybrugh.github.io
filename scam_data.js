const SCAM_INTRO = {
    title: 'Fraude herkennen begint met even pauzeren',
    text: 'Oplichters gebruiken vertrouwde namen, overtuigende verhalen en tijdsdruk om mensen geld of toegang tot hun accounts te laten afstaan. Deze gids helpt u signalen herkennen, een verzoek veilig controleren en snel handelen als er toch iets misgaat. Een slachtoffer worden is geen reden voor schaamte: meld het en vraag hulp.'
};

const SCAM_MODULES = [
    {
        id: 'phishing-smishing',
        title: 'Phishing en smishing',
        category: 'Valse berichten',
        icon: '🎣',
        summary: 'Criminelen doen zich via e-mail, sms of chat voor als een bank, overheidsdienst of bezorgbedrijf. Ze proberen u naar een valse website te lokken of persoonlijke gegevens en beveiligingscodes te ontfutselen.',
        howItWorks: [
            'Een phishingbericht speelt in op een herkenbare situatie: een betaling die zogenaamd is mislukt, een pakket dat vastzit, een terugbetaling of een waarschuwing dat uw bankrekening wordt geblokkeerd. In België wordt bijvoorbeeld de naam van itsme, een bank of een overheidsdienst misbruikt; in Nederland kunnen berichten zogenaamd van DigiD, de Belastingdienst of een bank komen. De afzender kan er vertrouwd uitzien, maar een naam of logo bewijst niet wie het bericht echt heeft verstuurd. De link leidt soms naar een nagemaakte inlogpagina die uw gebruikersnaam, wachtwoord, kaartgegevens of identiteitsinformatie verzamelt.',
            'Smishing is phishing via sms of berichtenapps. De korte boodschap en het kleine scherm maken het lastiger om een webadres goed te beoordelen. Sommige criminelen bellen daarna ook, zogenaamd om u door het proces te helpen, en vragen u een itsme-aanvraag of bankmelding goed te keuren. Zo proberen ze niet alleen gegevens te verzamelen, maar ook een echte bevestiging van u te krijgen. De druk kan komen van een deadline, dreigend verlies van toegang of de belofte van geld terug. Een officiële instantie vraagt u niet via een onverwachte link om geheime codes te delen. Stop, open zelf de officiële app of website en neem contact op via gegevens die u al kent.'
        ],
        redFlags: [
            'Een onverwachte waarschuwing over blokkering, een terugbetaling of een gemiste levering.',
            'Een link vraagt om bankgegevens, wachtwoorden, kaartgegevens of een itsme-goedkeuring.',
            'De afzender zet aan tot onmiddellijk handelen of dreigt met kosten en verlies van toegang.',
            'Het webadres wijkt af van het officiële domein, bevat extra woorden of gebruikt een verkorte link.',
            'Een beller vraagt u een verificatiecode, pincode of itsme-aanvraag goed te keuren.'
        ],
        realExample: '“Uw bankkaart wordt vandaag geblokkeerd. Bevestig nu uw identiteit via deze link om toegang te behouden.” U verwachtte geen bericht en wordt naar een inlogpagina gestuurd die om uw bankgegevens en een bevestigingscode vraagt.',
        prevention: [
            'Klik niet op onverwachte links; open de officiële app of typ het vertrouwde webadres zelf in.',
            'Keur geen itsme-aanvraag of bankmelding goed die u niet zelf hebt gestart en begrepen.',
            'Deel nooit pincodes, wachtwoorden of eenmalige codes met een beller of via een bericht.',
            'Meld verdachte berichten via de officiële meldkanalen van uw bank of Safeonweb.'
        ]
    },
    {
        id: 'whatsapp-vriend-in-nood',
        title: 'WhatsApp-fraude en vriend-in-nood',
        category: 'Berichten en identiteit',
        icon: '💬',
        summary: 'Een oplichter doet zich voor als uw kind, familielid of vriend(in), vaak met een nieuw telefoonnummer. Met een emotioneel en dringend verhaal probeert die persoon u direct geld te laten overmaken.',
        howItWorks: [
            'Het eerste bericht lijkt vaak onschuldig: “Hoi mama, mijn telefoon is kapot” of “Ik heb een nieuw nummer, sla dit even op”. De afzender kiest een familierelatie omdat die vertrouwd voelt en omdat mensen graag willen helpen. Soms noemt de oplichter een echte naam of gebruikt die informatie die publiek op sociale media staat. Daarna volgt een probleem dat onmiddellijk geld zou vereisen, bijvoorbeeld een kapotte telefoon, een geblokkeerde bankapp of een rekening die vandaag betaald moet worden. Het verzoek kan komen op een moment waarop u niet rustig kunt nadenken.',
            'De fraudeur vraagt meestal om een overschrijving of betaalverzoek en kan uitleggen waarom bellen niet lukt. Die afleiding voorkomt dat u de identiteit eenvoudig controleert. Soms volgt een tweede verzoek zodra de eerste betaling is gedaan. Het gevoel van zorg, schuld of haast is bewust onderdeel van de manipulatie; het bewijst niet dat het verhaal waar is. Gebruik daarom niet het nieuwe nummer om het verzoek te verifiëren. Bel uw familielid op het nummer dat al in uw contacten staat of spreek een persoonlijke controlevraag af. Maak pas geld over nadat u de persoon via een vertrouwd kanaal hebt gesproken en de betaalreden hebt gecontroleerd.'
        ],
        redFlags: [
            'Een onbekend nummer beweert dat een bekende een nieuwe telefoon of simkaart heeft.',
            'Er is direct geld nodig vanwege een noodgeval, blokkering of dringende rekening.',
            'De afzender zegt dat bellen niet kan en wil uitsluitend via chat communiceren.',
            'U krijgt een betaalverzoek naar een rekeningnaam die niet bij uw familielid past.',
            'Na een eerste betaling volgt snel een nieuw verzoek om extra geld.'
        ],
        realExample: '“Hoi pap, dit is mijn nieuwe nummer. Mijn oude telefoon is gevallen en ik kan niet bij mijn bank. Kun je deze rekening voor me betalen? Ik maak het morgen terug.”',
        prevention: [
            'Bel de bekende persoon op het vertrouwde nummer uit uw contacten.',
            'Vraag iets persoonlijks dat een buitenstaander niet eenvoudig kan raden.',
            'Controleer de naam van de rekeninghouder en bespreek het verzoek met iemand anders.',
            'Spreek met familie af hoe u onverwachte geldvragen veilig verifieert.'
        ]
    },
    {
        id: 'marktplaats-tweedehands',
        title: 'Marktplaats- en tweedehandsfraude',
        category: 'Kopen en verkopen',
        icon: '📦',
        summary: 'Bij tweedehandsverkoop proberen oplichters koper of verkoper naar nep-betaalpagina’s of onveilige betaalmethoden te sturen. Valse betaalverzoeken en koeriersverhalen kunnen leiden tot verlies van geld, goederen of accountgegevens.',
        howItWorks: [
            'Een oplichter kan zich voordoen als koper die het artikel direct wil hebben, of als verkoper met een opvallend aantrekkelijke aanbieding. Vaak vraagt die persoon om het gesprek en de betaling buiten het vertrouwde verkoopplatform voort te zetten. Vervolgens verschijnt een link voor een zogenaamde kleine verificatiebetaling, verzendlabel of ontvangstbevestiging. De pagina kan het uiterlijk van een betaalprovider of platform nabootsen en om kaartgegevens, bankinloggegevens of een beveiligingscode vragen. In werkelijkheid kan de invoer worden gebruikt om geld af te schrijven of toegang tot een account te krijgen.',
            'Een bekende variant is het koeriersdienst-verhaal: de koper zegt een pakketdienst te regelen en stuurt een link om uw identiteit, rekening of betaling te bevestigen. Soms wordt een nep-betaalbewijs getoond om druk uit te oefenen op de verkoper en die het artikel alvast te laten verzenden. Een andere truc is een vooruitbetaling vragen voor een product dat niet bestaat. Het professionele taalgebruik, logo of een screenshot kan vertrouwen wekken, maar is eenvoudig na te maken. Blijf daarom in de berichten en betaalstroom van het platform, open betaalverzoeken alleen via de officiële app en controleer zelf of het geld daadwerkelijk is bijgeschreven voordat u goederen overdraagt.'
        ],
        redFlags: [
            'De ander wil meteen naar WhatsApp, e-mail of een andere betaalomgeving overstappen.',
            'U krijgt een link om een betaling te ontvangen, uw rekening te verifiëren of een klein bedrag te betalen.',
            'Een koerier of koper vraagt om kaartgegevens, bankinlog of een verificatiecode.',
            'Een betaalbewijs is alleen een afbeelding of e-mail en het geld staat niet in uw eigen rekening.',
            'De deal is opvallend gunstig en de verkoper weigert veilige platformbetaling of ophalen.'
        ],
        realExample: '“Ik laat het pakket ophalen door een koerier. Bevestig hier eerst uw rekening met een betaling van €0,01, dan kan ik het volledige bedrag vrijgeven.”',
        prevention: [
            'Houd contact en betaling binnen het officiële platform wanneer dat mogelijk is.',
            'Open geen betaal- of koerierslinks die de andere partij onverwacht verstuurt.',
            'Controleer een betaling rechtstreeks in uw eigen bankapp voordat u het artikel verstuurt.',
            'Gebruik bij ophalen een veilige, openbare plek en controleer het geld voordat u overdraagt.'
        ]
    },
    {
        id: 'helpdeskfraude',
        title: 'Helpdeskfraude',
        category: 'Telefoontjes en toegang',
        icon: '🎧',
        summary: 'Een beller beweert medewerker te zijn van Microsoft, een bank of een technische dienst en meldt een probleem met uw computer of rekening. De oplichter probeert u software voor toegang op afstand te laten installeren of betalingen te laten goedkeuren.',
        howItWorks: [
            'De fraude begint met een onverwacht telefoontje, een pop-up op een website of soms een advertentie met een zogenaamd ondersteuningsnummer. De persoon gebruikt technische termen en spreekt rustig en overtuigend, zodat u denkt met een deskundige te praten. Die beweert bijvoorbeeld dat uw computer besmet is, dat er verdachte banktransacties zijn of dat uw account moet worden beveiligd. De boodschap is ontworpen om ongerustheid op te wekken en u te laten handelen voordat u de identiteit van de beller controleert. Een echte naam, logo of technisch verhaal is geen bewijs dat het contact legitiem is.',
            'Vervolgens vraagt de beller soms om programma’s voor toegang op afstand, zoals AnyDesk of TeamViewer, te installeren of een sessiecode te delen. Daarmee kan een onbekende uw scherm zien of uw apparaat bedienen. De fraudeur kan u vragen in te loggen, een betaling te bevestigen, geld naar een “veilige rekening” over te maken of extra software te installeren. Een bankmedewerker of Microsoft-medewerker heeft geen reden om u ongevraagd zulke toegang te laten geven of uw geheime codes te vragen. Beëindig het gesprek, verwijder ongewenste toegang pas nadat u hulp hebt ingeschakeld als u twijfelt, en bel uw bank of leverancier via een nummer van de officiële website.'
        ],
        redFlags: [
            'U wordt ongevraagd gebeld over een virus, verdachte betaling of dringend beveiligingsprobleem.',
            'De beller vraagt u AnyDesk, TeamViewer of andere toegang-op-afstandsoftware te installeren.',
            'U moet een sessiecode, wachtwoord, pincode of bankbevestiging doorgeven.',
            'U wordt gevraagd geld naar een “veilige rekening” of een onbekende rekening over te maken.',
            'De beller houdt u aan de lijn en ontmoedigt u om zelf contact met uw bank op te nemen.'
        ],
        realExample: '“We bellen namens Microsoft. Uw computer stuurt foutmeldingen naar ons. Installeer AnyDesk en geef de code door, dan beveiligen we uw bestanden.”',
        prevention: [
            'Hang op bij een onverwacht technisch of financieel telefoontje en bel zelf terug via een officieel nummer.',
            'Installeer geen software voor toegang op afstand op verzoek van een onbekende beller.',
            'Geef nooit codes of toegang tot uw bankapp of apparaat aan een beller.',
            'Als u al toegang hebt gegeven, verbreek de verbinding en neem vanaf een ander apparaat contact op met uw bank en een betrouwbare IT-dienst.'
        ]
    },
    {
        id: 'beleggings-cryptofraude',
        title: 'Beleggings- en cryptofraude',
        category: 'Geld en investeringen',
        icon: '📈',
        summary: 'Fraudeurs beloven hoge of snelle winst met beleggingen, cryptomunten of handelsplatformen. Nepadvertenties met bekende Vlamingen of Nederlanders worden gebruikt om vertrouwen te wekken en mensen tot steeds grotere stortingen te bewegen.',
        howItWorks: [
            'De eerste kennismaking kan via een advertentie op sociale media of een nieuwsachtige pagina gaan. Een bekende Vlaming of Nederlander lijkt in een video of artikel een investeringsmethode aan te prijzen, maar beeld en citaten kunnen zonder toestemming zijn gemonteerd of door kunstmatige intelligentie zijn aangepast. De advertentie belooft uitzonderlijke opbrengsten, een eenvoudige instap of een tijdelijke kans. Na het invullen van een formulier neemt een verkoper contact op en probeert die vertrouwen op te bouwen. De persoon presenteert zich als adviseur en toont soms een professioneel ogend platform of grafieken die op winst lijken.',
            'Na een kleine eerste storting kan het dashboard groei laten zien, ook als er geen echte belegging bestaat. Het slachtoffer krijgt vervolgens aansporingen om meer geld te storten, familie te overtuigen of geld te lenen. Wanneer iemand wil opnemen, verschijnen verzonnen belastingen, verificatiekosten of extra stortingsvoorwaarden. De druk en persoonlijke aandacht maken het lastig om te stoppen: de fraudeur benadrukt eerdere “winst” en voorspelt dat een kans verloren gaat. Een beroemd gezicht of een online winstoverzicht is geen bewijs van een vergunning of echte belegging. Controleer aanbieder en vergunning via de officiële toezichthouder en laat u onafhankelijk adviseren voordat u geld overmaakt.'
        ],
        redFlags: [
            'Er wordt een hoog, vast of gegarandeerd rendement beloofd met weinig of geen risico.',
            'Een advertentie gebruikt een bekende persoon als aanbeveling, maar de bron is niet diens officiële kanaal.',
            'Een adviseur belt ongevraagd en zet aan tot snel storten of extra geld inleggen.',
            'Het platform toont winst maar vraagt nieuwe kosten of stortingen voordat u kunt opnemen.',
            'U moet betalen in cryptomunten of naar een rekening van een andere persoon of onderneming.'
        ],
        realExample: 'Een advertentie lijkt een bekende Nederlander te tonen die “binnen weken financieel onafhankelijk” werd. Na een kleine inschrijving belt een adviseur met de belofte dat u vandaag nog een gegarandeerde cryptowinst kunt vastleggen.',
        prevention: [
            'Verifieer aanbevelingen via de officiële kanalen van de genoemde persoon en vertrouw niet op losse advertenties.',
            'Controleer de aanbieder en vergunning zelfstandig bij de relevante financiële toezichthouder.',
            'Investeer niet onder tijdsdruk en leen geen geld op advies van een online contact.',
            'Maak geen extra betaling om vermeende winst of opnamekosten vrij te krijgen; vraag onafhankelijk advies.'
        ]
    },
    {
        id: 'romance-scams',
        title: 'Romance scams en datingfraude',
        category: 'Relaties en vertrouwen',
        icon: '❤️',
        summary: 'Een fraudeur bouwt via een datingapp of sociaal netwerk een romantische band op en verzint daarna een noodsituatie. Geldvragen, investeringsverhalen en emotionele chantage kunnen geleidelijk toenemen.',
        howItWorks: [
            'De fraudeur gebruikt vaak een overtuigend profiel met foto’s van iemand anders en zoekt snel intensief contact. Die persoon zegt al gauw dat er een bijzondere band is, stuurt lieve berichten en probeert het gesprek naar een privé-app te verplaatsen. Soms wordt beeldbellen vermeden met excuses over werk, camera of verbinding. De aandacht kan oprecht lijken en wordt gebruikt om vertrouwen op te bouwen. Zodra er een emotionele band is ontstaan, volgt een crisis: een ongeval, een reisprobleem, een geblokkeerde rekening, een medische rekening of een pakket dat vastzit. De ander vraagt geld of persoonlijke gegevens en belooft die later terug te geven.',
            'Sommige fraudeurs vragen om steeds meer geld; anderen sturen het slachtoffer naar een nepbeleggingsplatform of vragen cryptomunten te kopen. Er kan ook druk komen om intieme beelden te delen, waarna dreiging met openbaarmaking wordt gebruikt om betalingen af te dwingen. Schaamte en isolatie zijn daarbij hulpmiddelen: het contact kan zeggen dat vrienden of familie de relatie niet begrijpen. Een echt gevoel maakt de financiële bewering niet automatisch echt. Stuur geen geld naar iemand die u alleen online kent, deel geen intieme beelden onder druk en praat met een vertrouwd persoon. Bij dreiging: bewaar berichten en betaal niet om chantage te laten stoppen.'
        ],
        redFlags: [
            'De relatie wordt ongewoon snel intens en de persoon verklaart vroeg sterke gevoelens.',
            'De ander ontwijkt herhaaldelijk een videogesprek of een veilige ontmoeting.',
            'Er komt een onverwacht verzoek om geld, cryptomunten, cadeaubonnen of financiële hulp.',
            'U wordt gevraagd een investering te doen via een platform dat de persoon heeft gekozen.',
            'De persoon vraagt intieme beelden of dreigt die te verspreiden als u niet betaalt.'
        ],
        realExample: '“Ik wil je zo graag bezoeken, maar mijn rekening is tijdelijk geblokkeerd. Kun je mijn vliegticket voorschieten? Stuur het vandaag nog, dan zien we elkaar eindelijk.”',
        prevention: [
            'Stuur geen geld, cryptomunten of identiteitsdocumenten naar iemand die u alleen online kent.',
            'Bespreek nieuwe online relaties en geldvragen met iemand die u vertrouwt.',
            'Bewaar bij chantage berichten en accountgegevens; betaal niet om een dreiging af te kopen.',
            'Meld het profiel bij het platform en neem bij bedreiging contact op met de politie of hulpdienst.'
        ]
    },
    {
        id: 'ceo-factuurfraude',
        title: 'CEO-fraude en factuurfraude',
        category: 'Werk en organisaties',
        icon: '🧾',
        summary: 'Criminelen doen zich voor als een directielid, leverancier of medewerker en proberen een organisatie een betaling te laten uitvoeren. Vervalste facturen of gewijzigde IBAN-nummers leiden geld om naar een rekening van de fraudeur.',
        howItWorks: [
            'Bij CEO-fraude wordt een medewerker benaderd door iemand die zich voordoet als een bestuurder of manager. Het bericht kan van een nagemaakt e-mailadres komen of een bestaande account gebruiken die is overgenomen. De afzender vraagt om een vertrouwelijke, dringende betaling en benadrukt soms dat er een overname, audit of deadline speelt. Een medewerker kan denken dat snel handelen loyaliteit toont of dat een bestuurder niet gestoord mag worden. Bij factuurfraude onderschept een crimineel communicatie met een leverancier of stuurt een overtuigende factuur met een aangepast rekeningnummer.',
            'De nieuwe IBAN kan in een echte e-mailketen worden aangekondigd met een geloofwaardige reden, bijvoorbeeld een wijziging bij de bank. Omdat naam, logo en factuurnummer bekend kunnen zijn, lijkt de wijziging normaal. Soms wordt er druk gezet om controleprocedures over te slaan of het verzoek geheim te houden. Geld dat naar een fraudeursrekening is overgemaakt kan snel worden verplaatst. Een wijziging van betaalgegevens hoort daarom nooit alleen per e-mail te worden bevestigd. Gebruik een tweede, eerder bekend kanaal om de wijziging te controleren, volg het goedkeuringsproces van de organisatie en laat een tweede bevoegde medewerker de rekeninggegevens en betaling onafhankelijk verifiëren.'
        ],
        redFlags: [
            'Een bestuurder vraagt onverwacht om een dringende of geheime overboeking.',
            'Een leverancier meldt een nieuw IBAN-nummer vlak voor betaling.',
            'Het verzoek vraagt bestaande goedkeurings- of controleprocedures over te slaan.',
            'De afzender maakt gebruik van een afwijkend e-mailadres of reageert ongebruikelijk op vragen.',
            'De rekeningnaam wijkt af van de bekende leverancier of de betaling gaat naar een andere bestemming.'
        ],
        realExample: '“Ik zit in een vergadering en kan niet bellen. Betaal deze factuur van onze nieuwe leverancier vandaag nog op het bijgewerkte IBAN. Houd dit voorlopig vertrouwelijk.”',
        prevention: [
            'Bevestig iedere wijziging van een IBAN via een bekend telefoonnummer dat al in uw administratie staat.',
            'Gebruik functiescheiding: laat een tweede bevoegde medewerker de begunstigde en betaling controleren.',
            'Sla geen verzoek om spoed of geheimhouding hoger aan dan de afgesproken interne controles.',
            'Meld een verdachte of foutieve betaling direct aan uw bank en interne beveiligingsverantwoordelijke.'
        ]
    },
    {
        id: 'malvertising-webshops',
        title: 'Malvertising en valse webshops',
        category: 'Online winkelen',
        icon: '🛍️',
        summary: 'Misleidende advertenties en nepwebshops lokken bezoekers met uitzonderlijke kortingen, nagemaakte merken of tijdsdruk. Sommige sites leveren niets, sturen een ander product of verzamelen betaal- en persoonsgegevens.',
        howItWorks: [
            'Malvertising is misleidende of schadelijke reclame die kan verschijnen op sociale media, zoekpagina’s of websites. Een advertentie kan een bekende winkel nabootsen, een nepactie tonen of u naar een domeinnaam sturen die sterk lijkt op die van een echt merk. De winkel presenteert soms gekopieerde productfoto’s, verzonnen reviews en een aftellende klok. De korting en schaarste zijn bedoeld om u snel te laten afrekenen voordat u bedrijfsgegevens of voorwaarden controleert. Sommige winkels zijn in werkelijkheid onbetrouwbare dropshippers: het product komt laat, wijkt sterk af van de afbeelding of moet naar het buitenland worden teruggestuurd.',
            'Bij ernstigere nepwebshops bestaat de winkel alleen om betalingen of kaartgegevens te verzamelen. De betaalpagina kan professioneel ogen en toch niet bij een echte onderneming horen. Soms wordt een bestelling wel bevestigd, maar komt er nooit een pakket. Een beveiligingsslot in de browser betekent alleen dat de verbinding versleuteld is; het bewijst niet dat de verkoper betrouwbaar is. Controleer daarom de domeinnaam zorgvuldig, zoek onafhankelijke ervaringen en beoordeel of er duidelijke bedrijfs-, retour- en contactgegevens zijn. Betaal bij twijfel niet via een directe overschrijving. Als u gegevens hebt ingevoerd of hebt betaald, neem snel contact op met uw bank en bewaar de bestelbevestiging en communicatie.'
        ],
        redFlags: [
            'De prijs ligt ver onder die bij bekende verkopers en de aanbieding zou direct verlopen.',
            'De domeinnaam bevat extra woorden, spelfouten of een afwijkende extensie.',
            'Contactgegevens, ondernemingsinformatie, retourbeleid of voorwaarden ontbreken of zijn vaag.',
            'De site toont alleen gekopieerde reviews of heeft nauwelijks onafhankelijke ervaringen.',
            'U kunt uitsluitend betalen via overschrijving, cryptomunt of een ongebruikelijk betaalverzoek.'
        ],
        realExample: 'Een advertentie belooft een merkjas voor 80 procent korting, met een klok die bijna afloopt. De webshop heeft geen controleerbaar adres en vraagt om een directe overschrijving naar een privérekening.',
        prevention: [
            'Zoek de winkel zelfstandig op en controleer de exacte domeinnaam en bedrijfsgegevens.',
            'Vergelijk onafhankelijke reviews en lees retour- en contactvoorwaarden voordat u bestelt.',
            'Gebruik een betaalmethode met passende kopersbescherming en vermijd directe overschrijving bij twijfel.',
            'Bewaar bevestigingen; neem bij verdachte afschrijving meteen contact op met uw bank.'
        ]
    }
];

const QUIZ_QUESTIONS = [
    {
        scenario: 'U ontvangt een sms van een onbekend nummer: uw Belgische bankrekening wordt vandaag geblokkeerd tenzij u via een link uw gegevens bevestigt.',
        answers: ['Waarschijnlijk echt', 'Waarschijnlijk oplichting', 'Onvoldoende informatie; controleer eerst'],
        correct: 1,
        explanation: 'Dit is waarschijnlijk oplichting: onverwachte dreiging, tijdsdruk en een link die om bankgegevens vraagt zijn sterke signalen. Een bericht kan de naam of huisstijl van uw bank namaken, maar dat bewijst niets. De optie “waarschijnlijk echt” is onveilig omdat u de afzender en link niet hebt geverifieerd. “Onvoldoende informatie” is op zichzelf voorzichtig, maar u moet de link niet openen; controleer via uw eigen bankapp of een officieel telefoonnummer.'
    },
    {
        scenario: 'Een onbekend WhatsApp-nummer zegt dat het uw dochter is met een nieuwe telefoon. Ze vraagt om een dringende overschrijving en zegt dat bellen niet lukt.',
        answers: ['Waarschijnlijk echt', 'Waarschijnlijk oplichting', 'Eerst reageren met uw bankgegevens'],
        correct: 1,
        explanation: 'Dit past bij vriend-in-noodfraude: een nieuw nummer, een emotioneel verzoek en een reden om niet te bellen. De optie “waarschijnlijk echt” vertrouwt uitsluitend op de bewering van de afzender. Bankgegevens delen is nooit een passende verificatie en maakt misbruik mogelijk. Bel uw dochter op het oude nummer of controleer via een andere bekende persoon voordat u geld overmaakt.'
    },
    {
        scenario: 'U verkoopt een fiets. De koper stuurt een link van een “koeriersdienst” en vraagt om een kleine kaartbetaling om het geld voor u vrij te geven.',
        answers: ['Waarschijnlijk oplichting', 'Waarschijnlijk echt', 'Betaal en controleer later'],
        correct: 0,
        explanation: 'Een verkoper hoeft geen kaartbetaling te doen om een koper of koerier het geld te laten vrijgeven. De link kan een nagemaakte betaalpagina zijn die kaartgegevens verzamelt. “Waarschijnlijk echt” negeert de onverwachte betaalstap en de externe link. Eerst betalen en later controleren kan het geld al kwijt maken. Houd de transactie binnen het platform en controleer zelf de ontvangst in uw bankapp.'
    },
    {
        scenario: 'Een beller zegt van Microsoft te zijn. Uw computer is volgens hem besmet en u moet TeamViewer installeren en de code voor toegang doorgeven.',
        answers: ['Waarschijnlijk echt', 'Waarschijnlijk oplichting', 'Alleen de code geven als de beller vriendelijk klinkt'],
        correct: 1,
        explanation: 'Een ongevraagde beller die toegang op afstand wil, is een ernstig waarschuwingssignaal. Een vriendelijke toon of technisch jargon bewijst geen identiteit. “Waarschijnlijk echt” zou de beller toegang tot uw apparaat kunnen geven. Een toegangscode delen blijft onveilig, ongeacht hoe overtuigend iemand klinkt. Beëindig het gesprek en neem zelf contact op met de officiële leverancier als u hulp nodig hebt.'
    },
    {
        scenario: 'Een advertentie toont een bekende Vlaamse presentator die zogenaamd een cryptoplatform aanbeveelt. Een adviseur belooft gegarandeerde winst als u vandaag stort.',
        answers: ['Waarschijnlijk echt', 'Waarschijnlijk oplichting', 'Eerst een klein bedrag sturen om het te testen'],
        correct: 1,
        explanation: 'Een bekende naam of video kan zonder toestemming zijn gemonteerd en gegarandeerde winst bestaat niet bij risicovolle beleggingen. Tijdsdruk en een ongevraagd telefoontje zijn extra signalen. De optie “waarschijnlijk echt” verwart een bekend gezicht met controleerbaar bewijs. Een kleine teststorting is niet veilig: nepplatformen tonen soms fictieve winst om u tot grotere stortingen te bewegen. Controleer aanbieders zelfstandig bij een officiële toezichthouder.'
    },
    {
        scenario: 'Iemand die u via een datingapp kent, vraagt na enkele weken om geld voor een medische noodsituatie en wil dat u niemand hierover vertelt.',
        answers: ['Waarschijnlijk oplichting', 'Waarschijnlijk echt omdat u elkaar vertrouwt', 'Een lening sturen maar geen cadeau'],
        correct: 0,
        explanation: 'Een noodverhaal, een geldvraag en het verzoek om geheimhouding zijn sterke signalen van datingfraude. Online vertrouwen is geen onafhankelijke verificatie van iemands identiteit of noodsituatie. Een lening is nog steeds een geldtransfer aan iemand die u niet goed kent en kan verloren gaan. Bespreek de situatie met iemand die u vertrouwt, stuur geen geld en meld het profiel als het verdacht is.'
    },
    {
        scenario: 'Uw leverancier mailt dat zijn IBAN is veranderd. De factuur ziet er vertrouwd uit, maar de wijziging moet vandaag nog worden verwerkt.',
        answers: ['Waarschijnlijk echt; de factuur is bekend', 'Eerst onafhankelijk controleren via een bekend telefoonnummer', 'De betaling uitvoeren en bij twijfel achteraf bellen'],
        correct: 1,
        explanation: 'Een vertrouwde factuur kan zijn aangepast of een e-mailaccount kan zijn overgenomen. Een wijziging van rekeningnummer moet onafhankelijk worden bevestigd via contactgegevens die al in uw administratie staan, niet via een nummer in dezelfde e-mail. De bekende vorm van een factuur is geen bewijs dat de nieuwe IBAN klopt. Achteraf bellen is te laat als de betaling al is doorgestuurd.'
    },
    {
        scenario: 'U opent zelf de officiële app van uw bank nadat u bent ingelogd. Daar staat een melding over een betaling die u zojuist hebt gestart; u herkent bedrag en begunstigde.',
        answers: ['Waarschijnlijk echt, maar controleer de details voordat u bevestigt', 'Waarschijnlijk oplichting omdat alle bankmeldingen nep zijn', 'Bevestigen zonder te lezen'],
        correct: 0,
        explanation: 'Omdat u zelf de officiële app hebt geopend en de betaling herkent, is de melding waarschijnlijk onderdeel van uw eigen transactie. Controleer nog steeds bedrag en begunstigde voordat u bevestigt. “Alle bankmeldingen zijn nep” is te absoluut en helpt niet bij een veilige beoordeling. Zonder te lezen bevestigen kan een fout of onverwachte betaling goedkeuren; stop bij iedere afwijking en neem contact op met de bank.'
    },
    {
        scenario: 'Een webshop biedt een populaire telefoon voor een fractie van de normale prijs. Er is geen controleerbaar adres en betalen kan alleen via overschrijving.',
        answers: ['Waarschijnlijk oplichting', 'Waarschijnlijk echt omdat de site een slotje toont', 'Kopen zolang de aanbieding beschikbaar is'],
        correct: 0,
        explanation: 'Een extreme korting, ontbrekende bedrijfsgegevens en alleen een directe overschrijving vormen samen een hoog risico. Een slotje versleutelt de verbinding maar controleert de verkoper niet. “Waarschijnlijk echt” op basis van het slotje verwart techniek met betrouwbaarheid. Tijdsdruk is juist reden om te stoppen. Zoek onafhankelijke ervaringen en controleer de onderneming; bestel niet als essentiële gegevens ontbreken.'
    },
    {
        scenario: 'Een bankmedewerker die u zelf belt via het nummer op uw bankpas zegt dat er verdachte transacties zijn, maar vraagt u nooit om een code of overschrijving. U twijfelt nog steeds.',
        answers: ['Zonder verdere controle alle instructies opvolgen', 'Gesprek beëindigen en zelf de bank bellen via het nummer op uw pas', 'Uw pincode delen om te bewijzen dat u rekeninghouder bent'],
        correct: 1,
        explanation: 'Zelf terugbellen via een nummer op uw pas is de veiligste manier om de identiteit onafhankelijk te controleren, ook als de beller mogelijk echt is. Een nummerweergave kan worden vervalst, dus volg niet blind instructies op basis van een inkomend gesprek. Een pincode delen is nooit nodig en kan uw rekening in gevaar brengen. Neem zelf contact op en bespreek pas daarna eventuele stappen.'
    }
];

const EMERGENCY_GUIDE = {
    title: 'Slachtoffer geworden? Stappenplan',
    intro: 'Snel handelen kan verdere schade beperken. U hoeft niet zeker te weten dat er fraude is voordat u uw bank of een meldpunt om hulp vraagt.',
    steps: [
        {
            title: 'Stop het contact en verbreek toegang',
            details: 'Klik niet verder, maak geen extra geld over en deel geen nieuwe codes. Als iemand toegang op afstand heeft tot uw apparaat, verbreek dan de internetverbinding en gebruik een ander, veilig apparaat om hulp te zoeken.'
        },
        {
            title: 'Bel uw bank of kaartuitgever onmiddellijk',
            details: 'Vraag om verdachte betalingen te blokkeren, uw rekening of kaart te beveiligen en te vertellen welke vervolgstappen nodig zijn. In België kunt u voor het blokkeren van een bankkaart Card Stop bellen op 078 170 170. Woont u in Nederland, neem dan direct contact op met uw eigen bank of kaartuitgever.'
        },
        {
            title: 'Beveilig accounts vanaf een schoon apparaat',
            details: 'Wijzig wachtwoorden die u hebt gedeeld of opnieuw gebruikt, begin met uw e-mail en bankaccounts, en schakel waar mogelijk tweestapsverificatie in. Meld onbekende sessies af. Als u software voor toegang op afstand hebt geïnstalleerd, laat het apparaat controleren door een betrouwbare IT-dienst.'
        },
        {
            title: 'Bewaar bewijs en meld de fraude',
            details: 'Bewaar berichten, e-mailadressen, telefoonnummers, betaalbewijzen, rekeningnummers en screenshots. Verwijder niets voordat u de informatie hebt veiliggesteld. Meld verdachte berichten bij Safeonweb in België, en neem in Nederland contact op met de Fraudehelpdesk. Doe bij financiële schade ook aangifte of vraag uw bank waar u aangifte kunt doen.'
        },
        {
            title: 'Vraag hulp en wees niet bang om te melden',
            details: 'Vertel een vertrouwd persoon wat er is gebeurd en volg de instructies van uw bank en meldpunt. Schaamte helpt de fraudeur; melden kan verdere schade voorkomen en anderen waarschuwen. Betaal geen zogenaamde herstel- of terugvorderingsdienst die u ongevraagd benadert.'
        }
    ],
    resources: [
        {
            name: 'Safeonweb',
            detail: 'Belgische informatie over online veiligheid en het melden van verdachte berichten.',
            url: 'https://safeonweb.be/'
        },
        {
            name: 'Card Stop: 078 170 170',
            detail: 'Belgische bankkaart blokkeren bij verlies, diefstal of vermoeden van misbruik.',
            url: 'https://www.cardstop.be/'
        },
        {
            name: 'Fraudehelpdesk',
            detail: 'Nederlandse informatie en meldmogelijkheid voor fraude en oplichting.',
            url: 'https://www.fraudehelpdesk.nl/'
        }
    ]
};
