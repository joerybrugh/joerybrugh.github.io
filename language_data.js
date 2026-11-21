const makeItem = (dutch, target, phonetic, literal, exampleSentence, grammarNote) => ({
    dutch,
    target,
    phonetic,
    literal,
    exampleSentence,
    grammarNote
});

const LESSONS = {
    english: {
        name: 'English',
        dutchName: 'Engels',
        flag: '🇬🇧',
        speechLang: 'en-US',
        alphabetGuide: 'Engels gebruikt het Latijnse alfabet met 26 letters. De spelling vertelt niet altijd precies hoe een woord klinkt: dezelfde lettercombinatie kan verschillende klanken hebben, zoals de a in cat, name en water. Luister daarom naar hele woorden en leer uitspraak samen met spelling. In dit materiaal staat bij elk woord een eenvoudige IPA-uitspraak; die is een hulp, geen vervanging voor luisteren.\\n\\nLet op woordklemtoon: in veel Engelse woorden klinkt één lettergreep duidelijk sterker. De th in think is een luchtige klank met de tong bij de tanden; de th in this is stemhebbend. De r klinkt anders dan de Nederlandse r. Engelse werkwoorden veranderen weinig met de persoon: I work, you work, maar he works. Gebruik a of an voor een enkelvoudig telbaar zelfstandig naamwoord, afhankelijk van de beginklank.',
        categories: [
            {
                title: 'Begroetingen & Basis',
                items: [
                    makeItem('hallo', 'Hello', '/həˈloʊ/', 'hallo', 'Hello, my name is Sara. — Hallo, ik heet Sara.', 'Hello is neutraal en past bij een eerste ontmoeting.'),
                    makeItem('goedemorgen', 'Good morning', '/ɡʊd ˈmɔːrnɪŋ/', 'goedemorgen', 'Good morning, Mr Brown. — Goedemorgen, meneer Brown.', 'Gebruik good morning tot ongeveer het middaguur.'),
                    makeItem('goedemiddag', 'Good afternoon', '/ɡʊd ˌæftərˈnuːn/', 'goedemiddag', 'Good afternoon, everyone. — Goedemiddag, iedereen.', 'Afternoon is de periode na de middag.'),
                    makeItem('goedenavond', 'Good evening', '/ɡʊd ˈiːvnɪŋ/', 'goedenavond', 'Good evening, welcome to our home. — Goedenavond, welkom bij ons thuis.', 'Good evening is een begroeting; bij afscheid zegt men good night.'),
                    makeItem('hoe gaat het?', 'How are you?', '/haʊ ɑːr juː/', 'hoe ben jij?', 'How are you today? — Hoe gaat het vandaag met je?', 'Dit is een vaste vraag; een kort antwoord is gebruikelijk.'),
                    makeItem('goed, dank je', 'I am well, thank you', '/aɪ æm wɛl θæŋk juː/', 'ik ben goed, dank jou', 'I am well, thank you. — Het gaat goed, dank je.', 'Well beschrijft hoe het met iemand gaat; good beschrijft meestal een zelfstandig naamwoord.'),
                    makeItem('alsjeblieft', 'Please', '/pliːz/', 'alsjeblieft', 'Please sit here. — Ga hier alsjeblieft zitten.', 'Please maakt een verzoek beleefder en staat vaak aan het begin.'),
                    makeItem('dank je wel', 'Thank you', '/θæŋk juː/', 'dank jou', 'Thank you for your help. — Dank je wel voor je hulp.', 'Thank you is neutraal; thanks is informeler.'),
                    makeItem('tot ziens', 'Goodbye', '/ɡʊdˈbaɪ/', 'goed weg', 'Goodbye, see you tomorrow. — Tot ziens, tot morgen.', 'Goodbye is geschikt voor formele en informele situaties.'),
                    makeItem('ik begrijp het niet', 'I do not understand', '/aɪ duː nɑːt ˌʌndərˈstænd/', 'ik doe niet begrijpen', 'I do not understand this question. — Ik begrijp deze vraag niet.', 'Gebruik do not voor een ontkenning in de tegenwoordige tijd.')
                ]
            },
            {
                title: 'Eten & Drinken',
                items: [
                    makeItem('water', 'Water', '/ˈwɔːtər/', 'water', 'May I have some water, please? — Mag ik alstublieft wat water?', 'Some klinkt natuurlijk bij een beleefd aanbod of verzoek.'),
                    makeItem('koffie', 'Coffee', '/ˈkɔːfi/', 'koffie', 'I drink coffee in the morning. — Ik drink ’s ochtends koffie.', 'Coffee is meestal ontelbaar; zeg a cup of coffee voor één kop.'),
                    makeItem('thee', 'Tea', '/tiː/', 'thee', 'Would you like tea with breakfast? — Wil je thee bij het ontbijt?', 'Would you like is een beleefde manier om iets aan te bieden.'),
                    makeItem('brood', 'Bread', '/brɛd/', 'brood', 'We buy fresh bread every day. — We kopen elke dag vers brood.', 'Bread is meestal ontelbaar; gebruik a loaf of bread voor een heel brood.'),
                    makeItem('rijst', 'Rice', '/raɪs/', 'rijst', 'The rice is ready for dinner. — De rijst is klaar voor het avondeten.', 'Rice is ontelbaar; zeg some rice, niet one rice.'),
                    makeItem('kip', 'Chicken', '/ˈtʃɪkɪn/', 'kip', 'She orders chicken and vegetables. — Zij bestelt kip en groenten.', 'Chicken kan het dier of het vlees betekenen.'),
                    makeItem('groenten', 'Vegetables', '/ˈvɛdʒtəbəlz/', 'groenten', 'These vegetables are very fresh. — Deze groenten zijn erg vers.', 'Vegetables staat meestal in het meervoud.'),
                    makeItem('fruit', 'Fruit', '/fruːt/', 'fruit', 'We eat fruit after lunch. — We eten fruit na de lunch.', 'Fruit is vaak ontelbaar; gebruik pieces of fruit voor losse stukken.'),
                    makeItem('de rekening', 'The bill', '/ðə bɪl/', 'de rekening', 'Could we have the bill, please? — Mogen we alstublieft de rekening?', 'In restaurants betekent bill de rekening; in Amerika hoort check ook vaak.'),
                    makeItem('ik ben vegetariër', 'I am vegetarian', '/aɪ æm ˌvɛdʒəˈtɛəriən/', 'ik ben vegetariër', 'I am vegetarian, so I do not eat meat. — Ik ben vegetariër, dus ik eet geen vlees.', 'Na am kun je een bijvoeglijk naamwoord of beroep gebruiken.')
                ]
            },
            {
                title: 'Reizen & Richtingen',
                items: [
                    makeItem('waar is het station?', 'Where is the station?', '/wɛər ɪz ðə ˈsteɪʃən/', 'waar is het station?', 'Excuse me, where is the station? — Pardon, waar is het station?', 'Where staat vooraan in een directe vraag.'),
                    makeItem('links', 'Left', '/lɛft/', 'links', 'Turn left at the next street. — Sla bij de volgende straat linksaf.', 'Turn left is de gebruikelijke instructie om linksaf te slaan.'),
                    makeItem('rechts', 'Right', '/raɪt/', 'rechts', 'The museum is on the right. — Het museum is aan de rechterkant.', 'On the right betekent aan de rechterkant.'),
                    makeItem('rechtdoor', 'Straight ahead', '/streɪt əˈhɛd/', 'recht vooruit', 'Go straight ahead for two blocks. — Ga twee straten rechtdoor.', 'Ahead geeft richting vooruit aan.'),
                    makeItem('het vliegveld', 'The airport', '/ði ˈɛərpɔːrt/', 'het lucht-haven', 'The bus goes to the airport. — De bus gaat naar het vliegveld.', 'Airport bestaat uit air en port, maar betekent samen vliegveld.'),
                    makeItem('een kaartje', 'A ticket', '/ə ˈtɪkɪt/', 'een kaartje', 'I need a ticket to London. — Ik heb een kaartje naar Londen nodig.', 'Gebruik a voor een enkelvoudig telbaar woord dat met een medeklinkerklank begint.'),
                    makeItem('de bushalte', 'The bus stop', '/ðə ˈbʌs stɑːp/', 'de bus-stop', 'Is this the bus stop for the city centre? — Is dit de bushalte naar het centrum?', 'Bus stop is de halte; bus station is een busstation.'),
                    makeItem('hoe ver is het?', 'How far is it?', '/haʊ fɑːr ɪz ɪt/', 'hoe ver is het?', 'How far is it from here? — Hoe ver is het vanaf hier?', 'How far vraagt naar afstand; from here betekent vanaf hier.'),
                    makeItem('ik ben verdwaald', 'I am lost', '/aɪ æm lɔːst/', 'ik ben verdwaald', 'I am lost; can you help me? — Ik ben verdwaald; kunt u mij helpen?', 'Lost is hier een bijvoeglijk naamwoord na am.'),
                    makeItem('de uitgang', 'The exit', '/ði ˈɛɡzɪt/', 'de uitgang', 'The exit is near the main entrance. — De uitgang is bij de hoofdingang.', 'Exit is een zelfstandig naamwoord; het werkwoord exit klinkt formeler.')
                ]
            },
            {
                title: 'Noodgevallen & Gezondheid',
                items: [
                    makeItem('help!', 'Help!', '/hɛlp/', 'help', 'Help, please call an ambulance! — Help, bel alstublieft een ambulance!', 'Gebruik help als directe oproep om hulp.'),
                    makeItem('bel de politie', 'Call the police', '/kɔːl ðə pəˈliːs/', 'bel de politie', 'Please call the police now. — Bel nu alstublieft de politie.', 'Call betekent hier bellen; gebruik the bij police.'),
                    makeItem('ik heb een dokter nodig', 'I need a doctor', '/aɪ niːd ə ˈdɑːktər/', 'ik heb een dokter nodig', 'I need a doctor; I feel very ill. — Ik heb een dokter nodig; ik voel me erg ziek.', 'Need krijgt direct het benodigde zelfstandig naamwoord.'),
                    makeItem('het ziekenhuis', 'The hospital', '/ðə ˈhɑːspɪtəl/', 'het ziekenhuis', 'Please take me to the hospital. — Breng me alstublieft naar het ziekenhuis.', 'In het Engels gebruik je meestal the hospital.'),
                    makeItem('ik heb pijn', 'I am in pain', '/aɪ æm ɪn peɪn/', 'ik ben in pijn', 'I am in pain and need help. — Ik heb pijn en heb hulp nodig.', 'De vaste uitdrukking is in pain, niet on pain.'),
                    makeItem('ik ben allergisch voor', 'I am allergic to', '/aɪ æm əˈlɜːrdʒɪk tuː/', 'ik ben allergisch voor', 'I am allergic to peanuts. — Ik ben allergisch voor pinda’s.', 'Na allergic to volgt een zelfstandig naamwoord of werkwoord op -ing.'),
                    makeItem('waar is de apotheek?', 'Where is the pharmacy?', '/wɛər ɪz ðə ˈfɑːrməsi/', 'waar is de apotheek?', 'Where is the nearest pharmacy? — Waar is de dichtstbijzijnde apotheek?', 'Nearest is de overtreffende trap van near.'),
                    makeItem('ik voel me ziek', 'I feel sick', '/aɪ fiːl sɪk/', 'ik voel ziek', 'I feel sick and need to sit down. — Ik voel me ziek en moet gaan zitten.', 'Na feel gebruik je een bijvoeglijk naamwoord zoals sick.'),
                    makeItem('de ambulance', 'The ambulance', '/ði ˈæmbjələns/', 'de ambulance', 'The ambulance is on its way. — De ambulance is onderweg.', 'On its way betekent onderweg.'),
                    makeItem('ik heb mijn medicijnen nodig', 'I need my medicine', '/aɪ niːd maɪ ˈmɛdɪsɪn/', 'ik heb mijn medicijnen nodig', 'I need my medicine with some water. — Ik heb mijn medicijnen met wat water nodig.', 'Medicine is vaak ontelbaar als het om medicatie in het algemeen gaat.')
                ]
            },
            {
                title: 'Cijfers & Tijd',
                items: [
                    makeItem('een', 'One', '/wʌn/', 'een', 'I have one small bag. — Ik heb één kleine tas.', 'One is het getal; a is het onbepaalde lidwoord.'),
                    makeItem('twee', 'Two', '/tuː/', 'twee', 'The train leaves in two minutes. — De trein vertrekt over twee minuten.', 'Na two staat een telbaar zelfstandig naamwoord in het meervoud.'),
                    makeItem('drie', 'Three', '/θriː/', 'drie', 'We booked a table for three people. — We hebben een tafel voor drie personen gereserveerd.', 'De th in three is stemloos en klinkt niet als een Nederlandse t.'),
                    makeItem('vier', 'Four', '/fɔːr/', 'vier', 'The shop opens at four o’clock. — De winkel opent om vier uur.', 'Zeg at four o’clock voor een tijdstip.'),
                    makeItem('vijf', 'Five', '/faɪv/', 'vijf', 'The walk takes five minutes. — De wandeling duurt vijf minuten.', 'Five heeft de klank /aɪ/, zoals in time.'),
                    makeItem('zes', 'Six', '/sɪks/', 'zes', 'My room is on the sixth floor. — Mijn kamer is op de zesde verdieping.', 'Sixth is een rangtelwoord; let op de th aan het einde.'),
                    makeItem('zeven', 'Seven', '/ˈsɛvən/', 'zeven', 'Our flight leaves at seven. — Onze vlucht vertrekt om zeven uur.', 'De eerste lettergreep van seven krijgt de klemtoon.'),
                    makeItem('acht', 'Eight', '/eɪt/', 'acht', 'The café closes at eight tonight. — Het café sluit vanavond om acht uur.', 'Eight rijmt op late; de gh wordt niet uitgesproken.'),
                    makeItem('negen', 'Nine', '/naɪn/', 'negen', 'The bus arrives at nine in the morning. — De bus komt om negen uur ’s ochtends aan.', 'Gebruik in the morning voor de ochtend.'),
                    makeItem('tien', 'Ten', '/tɛn/', 'tien', 'The ticket costs ten pounds. — Het kaartje kost tien pond.', 'Zeg ten pounds voor een bedrag; de valuta volgt na het getal.')
                ]
            }
        ]
    },
    chinese: {
        name: '中文',
        dutchName: 'Mandarijn',
        flag: '🇨🇳',
        speechLang: 'zh-CN',
        alphabetGuide: 'Mandarijn wordt geschreven met Chinese karakters (Hanzi), niet met een alfabet zoals het Nederlands. Elk karakter draagt betekenis en meestal ook een lettergreep. Pinyin schrijft de uitspraak met Latijnse letters en toonmarkeringen. Mandarijn heeft vier hoofdtonen en een neutrale toon: dezelfde lettergreep kan met een andere toon een andere betekenis krijgen. Oefen de toon mee met het woord; spreek Pinyin niet uit volgens Nederlandse spelling.\\n\\nEen derde toon daalt en stijgt; twee derde tonen naast elkaar worden in de uitspraak vaak aangepast, hoewel de geschreven toonmarkering hetzelfde blijft. De uitgangsvragen gebruiken 吗 (ma), terwijl 不 (bù) een veelvoorkomende ontkenning is. Woorden veranderen meestal niet voor meervoud of werkwoordstijd; tijdsaanduidingen en context geven die informatie. De woorden hieronder tonen Hanzi, Pinyin, een letterlijke ontleding en een voorbeeldzin.',
        categories: [
            {
                title: 'Begroetingen & Basis',
                items: [
                    makeItem('hallo', '你好', 'nǐ hǎo', 'jij goed', '你好，我叫安娜。— Hallo, ik heet Anna.', '你好 is een algemene begroeting; 您好 is beleefder tegen onbekenden.'),
                    makeItem('goedemorgen', '早上好', 'zǎoshang hǎo', 'ochtend goed', '早上好，我们现在出发。— Goedemorgen, we vertrekken nu.', '早上 betekent ochtend; 好 maakt er een begroeting van.'),
                    makeItem('goedenavond', '晚上好', 'wǎnshang hǎo', 'avond goed', '晚上好，欢迎来我家。— Goedenavond, welkom bij mij thuis.', '晚上好 is een begroeting; 晚安 betekent welterusten.'),
                    makeItem('hoe gaat het?', '你好吗？', 'nǐ hǎo ma', 'jij goed vraagdeeltje', '你好吗？我今天很好。— Hoe gaat het? Het gaat vandaag heel goed met mij.', '吗 aan het einde maakt van een zin een ja-neevraag.'),
                    makeItem('goed, dank je', '我很好，谢谢', 'wǒ hěn hǎo, xièxie', 'ik heel goed, dank', '我很好，谢谢。— Het gaat goed met mij, dank je.', '很 staat vaak voor een bijvoeglijk naamwoord en hoeft niet altijd heel sterk te betekenen.'),
                    makeItem('alsjeblieft', '请', 'qǐng', 'alstublieft', '请坐在这里。— Ga alstublieft hier zitten.', '请 maakt een verzoek beleefd en staat vaak voor het werkwoord.'),
                    makeItem('dank je wel', '谢谢', 'xièxie', 'dank dank', '谢谢你今天帮助我。— Dank je dat je mij vandaag hebt geholpen.', '你 na 谢谢 maakt duidelijk tegen wie de dank gericht is.'),
                    makeItem('tot ziens', '再见', 'zàijiàn', 'opnieuw zien', '再见，我们明天见。— Tot ziens, we zien elkaar morgen.', '再见 is letterlijk elkaar weer zien en is een gewone afscheidsgroet.'),
                    makeItem('ik begrijp het niet', '我不明白', 'wǒ bù míngbai', 'ik niet begrijpen', '我不明白这个问题。— Ik begrijp deze vraag niet.', '不 staat vóór het werkwoord om de tegenwoordige tijd te ontkennen.'),
                    makeItem('wat is uw naam?', '你叫什么名字？', 'nǐ jiào shénme míngzi', 'jij heet wat naam', '你好，你叫什么名字？— Hallo, hoe heet je?', '什么 betekent wat; 叫 betekent heten of noemen.')
                ]
            },
            {
                title: 'Eten & Drinken',
                items: [
                    makeItem('water', '水', 'shuǐ', 'water', '请给我一杯水。— Geef mij alstublieft een glas water.', '杯 is het maatwoord voor een kop of glas drank.'),
                    makeItem('koffie', '咖啡', 'kāfēi', 'koffie', '我早上喝咖啡。— Ik drink ’s ochtends koffie.', '喝 gebruik je voor drinken; 吃 voor eten.'),
                    makeItem('thee', '茶', 'chá', 'thee', '你想喝茶吗？— Wil je thee drinken?', '想 betekent willen; 吗 maakt de zin tot een vraag.'),
                    makeItem('brood', '面包', 'miànbāo', 'meel-brood', '我买了两个面包。— Ik heb twee broodjes gekocht.', '个 is een algemeen maatwoord; 面包 kan brood of broodje betekenen.'),
                    makeItem('rijst', '米饭', 'mǐfàn', 'rijst-maaltijd', '我们晚饭吃米饭。— We eten rijst bij het avondeten.', '米饭 betekent gekookte rijst; 饭 kan ook maaltijd betekenen.'),
                    makeItem('kip', '鸡肉', 'jīròu', 'kip-vlees', '她不吃鸡肉。— Zij eet geen kip.', '肉 betekent vlees en staat na het dier om het soort vlees te noemen.'),
                    makeItem('groenten', '蔬菜', 'shūcài', 'groente-groente', '这些蔬菜很新鲜。— Deze groenten zijn erg vers.', '这些 betekent deze in het meervoud; er is geen aparte meervoudsvorm nodig.'),
                    makeItem('fruit', '水果', 'shuǐguǒ', 'water-vrucht', '我每天吃水果。— Ik eet elke dag fruit.', '每天 betekent elke dag en staat vaak vóór het werkwoord.'),
                    makeItem('de rekening', '账单', 'zhàngdān', 'rekening-biljet', '请给我们账单。— Geef ons alstublieft de rekening.', '请 maakt dit verzoek beleefd; 我们 betekent wij of ons.'),
                    makeItem('ik ben vegetariër', '我是素食者', 'wǒ shì sùshízhě', 'ik ben vegetariër', '我是素食者，我不吃肉。— Ik ben vegetariër en eet geen vlees.', '是 verbindt een persoon met een zelfstandig naamwoord of identiteit.')
                ]
            },
            {
                title: 'Reizen & Richtingen',
                items: [
                    makeItem('waar is het station?', '车站在哪里？', 'chēzhàn zài nǎlǐ', 'station bevindt zich waar', '请问，车站在哪里？— Pardon, waar is het station?', '在哪里 vraagt naar de locatie; 请问 is een beleefde manier om een vraag te beginnen.'),
                    makeItem('links', '左边', 'zuǒbiān', 'linker-kant', '银行在左边。— De bank is aan de linkerkant.', '边 betekent kant; gebruik 在 om een locatie aan te geven.'),
                    makeItem('rechts', '右边', 'yòubiān', 'rechter-kant', '洗手间在右边。— Het toilet is aan de rechterkant.', '右 betekent rechts en 边 betekent kant.'),
                    makeItem('rechtdoor', '一直走', 'yìzhí zǒu', 'steeds lopen', '一直走，然后向左转。— Loop rechtdoor en sla daarna linksaf.', '一直 geeft aan dat u een richting aanhoudt; 走 betekent lopen.'),
                    makeItem('het vliegveld', '机场', 'jīchǎng', 'vliegtuig-veld', '我们坐出租车去机场。— We nemen een taxi naar het vliegveld.', '去 betekent gaan naar en staat vóór de bestemming.'),
                    makeItem('een kaartje', '一张票', 'yì zhāng piào', 'een maatwoord kaartje', '我想买一张去北京的票。— Ik wil een kaartje naar Beijing kopen.', '张 is het maatwoord voor platte voorwerpen zoals tickets.'),
                    makeItem('de bushalte', '公共汽车站', 'gōnggòng qìchē zhàn', 'openbaar bus station', '公共汽车站离这里很近。— De bushalte is heel dichtbij.', '离 geeft afstand tot een plek aan; 近 betekent dichtbij.'),
                    makeItem('hoe ver is het?', '有多远？', 'yǒu duō yuǎn', 'is hoeveel ver', '从这里到酒店有多远？— Hoe ver is het van hier naar het hotel?', '从…到… betekent van…tot… en helpt een afstandsvraag vormen.'),
                    makeItem('ik ben verdwaald', '我迷路了', 'wǒ mílù le', 'ik verdwalen voltooid', '对不起，我迷路了。— Pardon, ik ben verdwaald.', '了 markeert hier een veranderde of voltooide toestand.'),
                    makeItem('de uitgang', '出口', 'chūkǒu', 'uitgang-mond', '请问，最近的出口在哪里？— Pardon, waar is de dichtstbijzijnde uitgang?', '出 betekent naar buiten en 口 betekent opening.')
                ]
            },
            {
                title: 'Noodgevallen & Gezondheid',
                items: [
                    makeItem('help!', '救命！', 'jiùmìng', 'red leven', '救命！请叫警察！— Help! Bel alstublieft de politie!', '救命 is een dringende uitroep bij direct gevaar.'),
                    makeItem('bel de politie', '请叫警察', 'qǐng jiào jǐngchá', 'alstublieft roep politie', '请叫警察，我需要帮助。— Bel alstublieft de politie, ik heb hulp nodig.', '叫 betekent roepen of bellen; 请 maakt het verzoek beleefd.'),
                    makeItem('ik heb een dokter nodig', '我需要医生', 'wǒ xūyào yīshēng', 'ik nodig hebben dokter', '我需要医生，我感觉不舒服。— Ik heb een dokter nodig, ik voel me niet goed.', '需要 betekent nodig hebben en staat vóór het zelfstandig naamwoord.'),
                    makeItem('het ziekenhuis', '医院', 'yīyuàn', 'genees-instelling', '最近的医院在哪里？— Waar is het dichtstbijzijnde ziekenhuis?', '医院 is ziekenhuis; 最近 betekent het dichtstbijzijnde.'),
                    makeItem('ik heb pijn', '我疼', 'wǒ téng', 'ik pijn hebben', '我的头疼。— Mijn hoofd doet pijn.', 'Lichaamsdeel plus 疼 benoemt waar het pijn doet.'),
                    makeItem('ik ben allergisch voor', '我对…过敏', 'wǒ duì… guòmǐn', 'ik tegenover… allergisch', '我对花生过敏。— Ik ben allergisch voor pinda’s.', '对…过敏 is de vaste constructie voor allergisch zijn voor iets.'),
                    makeItem('waar is de apotheek?', '药店在哪里？', 'yàodiàn zài nǎlǐ', 'medicijn-winkel bevindt zich waar', '请问，药店在哪里？— Pardon, waar is de apotheek?', '药店 is apotheek; 请问 verzacht de vraag.'),
                    makeItem('ik voel me ziek', '我不舒服', 'wǒ bù shūfu', 'ik niet comfortabel', '我今天不舒服，想休息。— Ik voel me vandaag niet goed en wil rusten.', '不舒服 betekent zich niet goed voelen; 想 betekent willen.'),
                    makeItem('de ambulance', '救护车', 'jiùhùchē', 'reddings-hulp-auto', '请叫救护车！— Bel alstublieft een ambulance!', '请叫 is een beleefd verzoek om iemand of iets te bellen.'),
                    makeItem('ik heb mijn medicijnen nodig', '我需要我的药', 'wǒ xūyào wǒ de yào', 'ik nodig hebben mijn medicijn', '我需要我的药和一些水。— Ik heb mijn medicijnen en wat water nodig.', '的 geeft bezit aan; 药 betekent medicijn of medicijnen.')
                ]
            },
            {
                title: 'Cijfers & Tijd',
                items: [
                    makeItem('een', '一', 'yī', 'een', '我有一个包。— Ik heb één tas.', '个 is een algemeen maatwoord na het getal 一.'),
                    makeItem('twee', '二', 'èr', 'twee', '我买了两张票。— Ik heb twee kaartjes gekocht.', 'Voor hoeveelheden vóór een maatwoord gebruik je vaak 两 in plaats van 二.'),
                    makeItem('drie', '三', 'sān', 'drie', '我们三点出发。— We vertrekken om drie uur.', 'Tijdsaanduidingen zoals 三点 staan meestal vóór het werkwoord.'),
                    makeItem('vier', '四', 'sì', 'vier', '车站离这里四公里。— Het station is vier kilometer hiervandaan.', 'Getal plus kilometer geeft een afstand aan.'),
                    makeItem('vijf', '五', 'wǔ', 'vijf', '请给我五个苹果。— Geef mij alstublieft vijf appels.', '个 is een algemeen maatwoord voor appels wanneer de soortmaat niet wordt gebruikt.'),
                    makeItem('zes', '六', 'liù', 'zes', '我们六点吃晚饭。— We eten om zes uur avondeten.', '点 gebruik je om hele uren aan te geven.'),
                    makeItem('zeven', '七', 'qī', 'zeven', '我的火车七点到。— Mijn trein komt om zeven uur aan.', '到 kan aankomen betekenen en staat na het tijdstip of onderwerp.'),
                    makeItem('acht', '八', 'bā', 'acht', '商店早上八点开门。— De winkel opent om acht uur ’s ochtends.', '早上 betekent ochtend en staat vóór het tijdstip.'),
                    makeItem('negen', '九', 'jiǔ', 'negen', '会议九点开始。— De vergadering begint om negen uur.', '开始 betekent beginnen; het tijdstip staat vóór het werkwoord.'),
                    makeItem('tien', '十', 'shí', 'tien', '现在十点，我们该走了。— Het is nu tien uur, we moeten gaan.', '现在 betekent nu; 该…了 drukt uit dat het tijd is om iets te doen.')
                ]
            }
        ]
    },
    korean: {
        name: '한국어',
        dutchName: 'Koreaans',
        flag: '🇰🇷',
        speechLang: 'ko-KR',
        alphabetGuide: 'Koreaans gebruikt Hangul, een alfabet dat uit medeklinkers en klinkers bestaat. Letters worden samengevoegd tot vierkante lettergreepblokken, bijvoorbeeld 한 = ㅎ + ㅏ + ㄴ. De basis bevat 14 medeklinkers en 10 klinkers. Een lettergreep begint meestal met een medeklinker; ㅇ is stil aan het begin en klinkt als ng aan het einde. De romanisatie hieronder volgt Revised Romanization, maar de werkelijke uitspraak verandert soms door klankverbindingen en assimilatie.\\n\\nKoreaans heeft geen lexicale tonen zoals Mandarijn. De beleefdheid blijkt sterk uit de werkwoorduitgang. Veel voorbeeldzinnen gebruiken de beleefde dagelijkse stijl op -요; formele situaties kunnen een vorm op -습니다 vragen. Onderwerpdeeltjes 은/는 en onderwerpdeeltjes 이/가 markeren de rol van zelfstandige naamwoorden. Woordenboeken geven vaak de stam op -다; in gewone gesprekken wordt die niet altijd zo gebruikt. Luister naar zinsritme en let op batchim, de eindmedeklinker in een Hangul-blok.',
        categories: [
            {
                title: 'Begroetingen & Basis',
                items: [
                    makeItem('hallo', '안녕하세요', 'annyeonghaseyo', 'vrede-zijn beleefde groet', '안녕하세요, 저는 안나예요. — Hallo, ik ben Anna.', '안녕하세요 is een beleefde, veelgebruikte begroeting.'),
                    makeItem('goedemorgen', '좋은 아침이에요', 'joeun achimieyo', 'goede ochtend-is', '좋은 아침이에요, 잘 잤어요? — Goedemorgen, heb je goed geslapen?', '좋은 아침 is letterlijk goede ochtend; begroetingen kunnen per situatie verschillen.'),
                    makeItem('goedenavond', '안녕하세요', 'annyeonghaseyo', 'vrede-zijn beleefde groet', '안녕하세요, 오늘 저녁은 어때요? — Goedenavond, hoe is uw avond?', 'Koreaans heeft geen aparte vaste avondgroet die overal wordt gebruikt; 안녕하세요 blijft natuurlijk.'),
                    makeItem('hoe gaat het?', '잘 지내세요?', 'jal jinaeseyo', 'goed verblijven-vraag', '요즘 잘 지내세요? — Hoe gaat het de laatste tijd met u?', '세요 is een beleefde uitgang; 요즘 betekent de laatste tijd.'),
                    makeItem('goed, dank je', '잘 지내요, 고마워요', 'jal jinaeyo, gomawoyo', 'goed verblijven, dankbaar-zijn', '네, 잘 지내요. 고마워요. — Ja, het gaat goed. Dank je.', '요 maakt de uitspraak beleefd en vriendelijk in dagelijks gesprek.'),
                    makeItem('alsjeblieft', '주세요', 'juseyo', 'geven-alstublieft', '물 한 잔 주세요. — Geef me alstublieft een glas water.', '주세요 volgt op wat u wilt ontvangen en is een beleefd verzoek.'),
                    makeItem('dank je wel', '감사합니다', 'gamsahamnida', 'dankbaar-zijn formeel', '도와주셔서 감사합니다. — Dank u wel dat u mij hebt geholpen.', '감사합니다 is beleefd en formeler dan 고마워요.'),
                    makeItem('tot ziens', '안녕히 가세요', 'annyeonghi gaseyo', 'vredevol gaan-alstublieft', '안녕히 가세요, 내일 만나요. — Tot ziens, tot morgen.', 'Gebruik 가세요 tegen degene die weggaat; tegen degene die blijft zegt u 계세요.'),
                    makeItem('ik begrijp het niet', '이해하지 못해요', 'ihaehaji motaeyo', 'begrijpen-niet kunnen', '죄송하지만 이해하지 못해요. — Pardon, maar ik begrijp het niet.', '못해요 drukt onvermogen uit; 죄송하지만 maakt de zin beleefder.'),
                    makeItem('wat is uw naam?', '성함이 어떻게 되세요?', 'seonghami eotteoke doeseyo', 'naam hoe zijn-beleefd', '실례지만 성함이 어떻게 되세요? — Pardon, hoe heet u?', '성함 is een beleefde vorm van naam; gebruik dit bij onbekenden of ouderen.')
                ]
            },
            {
                title: 'Eten & Drinken',
                items: [
                    makeItem('water', '물', 'mul', 'water', '물 한 잔 주세요. — Een glas water alstublieft.', '잔 is het telwoord voor een glas of kopje.'),
                    makeItem('koffie', '커피', 'keopi', 'koffie', '아침에 커피를 마셔요. — Ik drink ’s ochtends koffie.', '를 markeert het lijdend voorwerp; in gesprek kan het soms wegvallen.'),
                    makeItem('thee', '차', 'cha', 'thee', '저는 저녁에 차를 마셔요. — Ik drink ’s avonds thee.', '마셔요 is de beleefde dagelijkse vorm van drinken.'),
                    makeItem('brood', '빵', 'ppang', 'brood', '빵과 과일을 샀어요. — Ik heb brood en fruit gekocht.', '과 betekent en bij zelfstandige naamwoorden.'),
                    makeItem('rijst', '밥', 'bap', 'gekookte rijst-maaltijd', '저녁에 밥을 먹어요. — Ik eet ’s avonds rijst.', '밥 betekent gekookte rijst en kan ook maaltijd betekenen.'),
                    makeItem('kip', '닭고기', 'dakgogi', 'kip-vlees', '저는 닭고기를 좋아해요. — Ik houd van kip.', '를 markeert 닭고기 als lijdend voorwerp.'),
                    makeItem('groenten', '채소', 'chaeso', 'groenten', '채소를 많이 먹어요. — Ik eet veel groenten.', '많이 betekent veel en staat vóór het werkwoord.'),
                    makeItem('fruit', '과일', 'gwail', 'fruit', '매일 아침 과일을 먹어요. — Ik eet elke ochtend fruit.', '매일 betekent elke dag en staat vóór de tijd of handeling.'),
                    makeItem('de rekening', '계산서', 'gyesanseo', 'rekening-document', '계산서 주세요. — De rekening alstublieft.', '주세요 maakt een kort verzoek beleefd; 계산서 is rekening of bon.'),
                    makeItem('ik ben vegetariër', '저는 채식주의자예요', 'jeoneun chaesikjuuijayeyo', 'ik vegetarisch-persoon-ben', '저는 채식주의자예요. 고기는 먹지 않아요. — Ik ben vegetariër. Ik eet geen vlees.', '는 markeert het onderwerp; 예요 is een beleefde vorm van zijn.')
                ]
            },
            {
                title: 'Reizen & Richtingen',
                items: [
                    makeItem('waar is het station?', '역이 어디예요?', 'yeogi eodiyeyo', 'station waar-is', '실례합니다, 역이 어디예요? — Pardon, waar is het station?', '어디예요 vraagt waar iets is; 역이 markeert het onderwerp.'),
                    makeItem('links', '왼쪽', 'oenjjok', 'linkerkant', '다음 길에서 왼쪽으로 가세요. — Ga bij de volgende straat naar links.', '으로 geeft hier richting aan; 가세요 is een beleefd verzoek.'),
                    makeItem('rechts', '오른쪽', 'oreunjjok', 'rechterkant', '은행은 오른쪽에 있어요. — De bank is aan de rechterkant.', '에 markeert de plaats waar iets zich bevindt.'),
                    makeItem('rechtdoor', '곧장 가세요', 'gotjang gaseyo', 'rechtuit gaan-alstublieft', '여기서 곧장 가세요. — Ga vanaf hier rechtdoor.', '곧장 betekent rechtuit; 세요 geeft een beleefde instructie.'),
                    makeItem('het vliegveld', '공항', 'gonghang', 'lucht-haven', '공항까지 택시로 가요. — Ik ga met de taxi naar het vliegveld.', '까지 betekent tot of naar; 로 markeert hier het vervoermiddel.'),
                    makeItem('een kaartje', '표 한 장', 'pyo han jang', 'kaartje een plat-telwoord', '서울행 표 한 장 주세요. — Een kaartje naar Seoul alstublieft.', '장 is het telwoord voor platte voorwerpen zoals kaartjes.'),
                    makeItem('de bushalte', '버스 정류장', 'beoseu jeongnyujang', 'bus halteplaats', '버스 정류장은 어디예요? — Waar is de bushalte?', '은 markeert het onderwerp; 정류장 betekent halte.'),
                    makeItem('hoe ver is het?', '얼마나 멀어요?', 'eolmana meoreoyo', 'hoeveel ver-is', '여기서 호텔까지 얼마나 멀어요? — Hoe ver is het van hier naar het hotel?', '얼마나 vraagt naar de mate; 멀어요 betekent ver zijn.'),
                    makeItem('ik ben verdwaald', '길을 잃었어요', 'gireul ireosseoyo', 'weg verliezen-verleden', '죄송해요, 길을 잃었어요. — Pardon, ik ben verdwaald.', '을 markeert 길 als lijdend voorwerp; 잃었어요 is verleden tijd.'),
                    makeItem('de uitgang', '출구', 'chulgu', 'uitgang-opening', '가장 가까운 출구가 어디예요? — Waar is de dichtstbijzijnde uitgang?', '가장 가까운 betekent dichtstbijzijnde; 가 markeert het onderwerp.')
                ]
            },
            {
                title: 'Noodgevallen & Gezondheid',
                items: [
                    makeItem('help!', '도와주세요!', 'dowajuseyo', 'helpen-alstublieft', '도와주세요! 경찰을 불러 주세요. — Help alstublieft! Bel de politie.', '주세요 maakt een verzoek beleefd; gebruik dit bij hulp vragen.'),
                    makeItem('bel de politie', '경찰을 불러 주세요', 'gyeongchareul bulleo juseyo', 'politie roepen geef-alstublieft', '위험해요. 경찰을 불러 주세요. — Het is gevaarlijk. Bel alstublieft de politie.', '을 markeert 경찰 als lijdend voorwerp; 불러 주세요 is een beleefd verzoek.'),
                    makeItem('ik heb een dokter nodig', '의사가 필요해요', 'uisaga piryohaeyo', 'dokter nodig-hebben', '아파요. 의사가 필요해요. — Ik ben ziek. Ik heb een dokter nodig.', '가 markeert 의사 als onderwerp van nodig zijn.'),
                    makeItem('het ziekenhuis', '병원', 'byeongwon', 'zieken-instelling', '가까운 병원이 어디예요? — Waar is het dichtstbijzijnde ziekenhuis?', '가까운 betekent dichtbij; 병원 is ziekenhuis of kliniek.'),
                    makeItem('ik heb pijn', '아파요', 'apayo', 'pijnlijk-zijn', '머리가 아파요. — Mijn hoofd doet pijn.', 'Lichaamsdeel plus 가 아파요 benoemt waar het pijn doet.'),
                    makeItem('ik ben allergisch voor', '…에 알레르기가 있어요', '…e allereugiga isseoyo', '…aan allergie-bestaat', '저는 땅콩에 알레르기가 있어요. — Ik ben allergisch voor pinda’s.', '에 geeft hier aan waarop de allergie betrekking heeft.'),
                    makeItem('waar is de apotheek?', '약국이 어디예요?', 'yakgugi eodiyeyo', 'apotheek waar-is', '실례지만 약국이 어디예요? — Pardon, waar is de apotheek?', '약국 is apotheek; 실례지만 is een beleefde manier om iemand aan te spreken.'),
                    makeItem('ik voel me ziek', '몸이 안 좋아요', 'momi an joayo', 'lichaam niet goed-is', '오늘 몸이 안 좋아요. — Ik voel me vandaag niet goed.', '안 staat vóór het bijvoeglijk naamwoord om het te ontkennen.'),
                    makeItem('de ambulance', '구급차', 'gugeupcha', 'eerste-hulp-auto', '구급차를 불러 주세요. — Bel alstublieft een ambulance.', '를 markeert 구급차 als lijdend voorwerp.'),
                    makeItem('ik heb mijn medicijnen nodig', '약이 필요해요', 'yagi piryohaeyo', 'medicijn nodig-hebben', '두통이 있어요. 약이 필요해요. — Ik heb hoofdpijn. Ik heb medicijnen nodig.', '이 markeert 약 als onderwerp; 두통 betekent hoofdpijn.')
                ]
            },
            {
                title: 'Cijfers & Tijd',
                items: [
                    makeItem('een', '하나', 'hana', 'een', '사과 하나 주세요. — Eén appel alstublieft.', '하나 is het inheemse getal één; gebruik het met veel voorwerpen.'),
                    makeItem('twee', '둘', 'dul', 'twee', '표 두 장 주세요. — Twee kaartjes alstublieft.', 'Voor een telwoord verandert 둘 vaak in 두.'),
                    makeItem('drie', '셋', 'set', 'drie', '세 명이 같이 가요. — Drie mensen gaan samen.', 'Voor een telwoord verandert 셋 vaak in 세.'),
                    makeItem('vier', '넷', 'net', 'vier', '네 시에 만나요. — We ontmoeten elkaar om vier uur.', 'Voor een telwoord verandert 넷 vaak in 네; uren tellen met inheemse getallen.'),
                    makeItem('vijf', '다섯', 'daseot', 'vijf', '다섯 분 기다려 주세요. — Wacht alstublieft vijf minuten.', '분 is het beleefde telwoord voor minuten.'),
                    makeItem('zes', '여섯', 'yeoseot', 'zes', '여섯 시에 출발해요. — We vertrekken om zes uur.', 'Gebruik inheemse getallen voor uren op de klok.'),
                    makeItem('zeven', '일곱', 'ilgop', 'zeven', '버스가 일곱 시에 와요. — De bus komt om zeven uur.', '가 markeert 버스 als onderwerp; 와요 betekent komen.'),
                    makeItem('acht', '여덟', 'yeodeol', 'acht', '여덟 명이 식당에 있어요. — Er zijn acht mensen in het restaurant.', '명 is het telwoord voor mensen.'),
                    makeItem('negen', '아홉', 'ahop', 'negen', '아홉 시에 문을 열어요. — We openen de deur om negen uur.', '시 markeert een uur op de klok.'),
                    makeItem('tien', '열', 'yeol', 'tien', '열 분 후에 출발해요. — We vertrekken over tien minuten.', '후에 betekent later of na; 분 telt minuten.')
                ]
            }
        ]
    },
    kinyarwanda: {
        name: 'Kinyarwanda',
        dutchName: 'Kinyarwanda',
        flag: '🇷🇼',
        speechLang: 'rw-RW',
        alphabetGuide: 'Kinyarwanda gebruikt het Latijnse alfabet. De vijf klinkers a, e, i, o en u worden doorgaans helder uitgesproken; klinkers kunnen kort of lang klinken en de lengte kan verschil maken. De spelling is relatief regelmatig, maar combinaties als ny en ngw vormen herkenbare klanken. De schrijfwijze helpt bij het leren, terwijl luisteren naar moedertaalsprekers belangrijk blijft voor ritme en intonatie. De uitspraaknotatie bij de woorden is een eenvoudige Nederlandstalige benadering, geen officiële fonetische transcriptie.\\n\\nZelfstandige naamwoorden horen bij grammaticale klassen. Het voorvoegsel kan enkelvoud en meervoud aangeven en beïnvloedt soms de vorm van bijvoeglijke naamwoorden en werkwoorden. Voorbeelden zijn umuntu (persoon) en abantu (mensen). Werkwoorden krijgen voor- en achtervoegsels die onderwerp, tijd en betekenis markeren. De woorden in deze beginnersgids zijn bruikbare basisvormen; zinscontext kan de vorm veranderen. Kinyarwanda kent beleefde aanspreekvormen, en murakoze is een veelgebruikte respectvolle dankbetuiging.',
        categories: [
            {
                title: 'Begroetingen & Basis',
                items: [
                    makeItem('hallo', 'Muraho', 'mu-RA-ho', 'u bent er', 'Muraho, nitwa Aline. — Hallo, ik heet Aline.', 'Muraho is een beleefde begroeting voor één of meer mensen.'),
                    makeItem('goedemorgen', 'Mwaramutse', 'mwa-ra-MUT-se', 'u bent opgestaan', 'Mwaramutse, amakuru? — Goedemorgen, hoe gaat het?', 'Mwaramutse is de gebruikelijke ochtendgroet.'),
                    makeItem('goedenavond', 'Mwiriwe', 'mwi-RI-we', 'u bent de dag doorgekomen', 'Mwiriwe neza, nimugire umugoroba mwiza. — Goedenavond, een fijne avond gewenst.', 'Mwiriwe kan overdag als begroeting worden gebruikt.'),
                    makeItem('hoe gaat het?', 'Amakuru?', 'a-ma-KU-ru', 'nieuws?', 'Amakuru? — Ni meza, murakoze. — Hoe gaat het? — Goed, dank u.', 'Amakuru betekent letterlijk nieuws; het is een gewone vraag naar iemands toestand.'),
                    makeItem('goed, dank je', 'Ni meza, murakoze', 'ni ME-za, mu-ra-KO-ze', 'het is goed, dank u', 'Ni meza, murakoze. — Het gaat goed, dank u.', 'Murakoze is een beleefde dankbetuiging.'),
                    makeItem('alsjeblieft', 'Nyamuneka', 'nya-mu-NE-ke', 'alstublieft', 'Nyamuneka, icara hano. — Ga alstublieft hier zitten.', 'Nyamuneka verzacht een verzoek en staat meestal vooraan.'),
                    makeItem('dank je wel', 'Murakoze', 'mu-ra-KO-ze', 'u hebt gedaan', 'Murakoze ku bufasha bwanyu. — Dank u voor uw hulp.', 'Murakoze is beleefd; murakoze cyane betekent hartelijk dank.'),
                    makeItem('tot ziens', 'Murabeho', 'mu-ra-BE-ho', 'u zult er zijn', 'Murabeho, tuzongera kubonana. — Tot ziens, we zien elkaar weer.', 'Murabeho is een gebruikelijke afscheidsgroet.'),
                    makeItem('ik begrijp het niet', 'Sinumva', 'si-NUM-va', 'ik begrijp niet', 'Sinumva neza; mwabisubiramo? — Ik begrijp het niet goed; kunt u dat herhalen?', 'si- ontkent vaak een werkwoordsvorm in de eerste persoon.'),
                    makeItem('wat is uw naam?', 'Witwa nde?', 'wi-twa nde', 'u wordt genoemd wie?', 'Witwa nde? — Nitwa Aline. — Hoe heet u? — Ik heet Aline.', 'Witwa nde is een gewone vraag; nitwa betekent ik heet.')
                ]
            },
            {
                title: 'Eten & Drinken',
                items: [
                    makeItem('water', 'Amazi', 'a-MA-zi', 'water', 'Ndashaka amazi, nyamuneka. — Ik wil graag water, alstublieft.', 'Amazi is een zelfstandig naamwoord in een meervoudsklasse, maar betekent water.'),
                    makeItem('koffie', 'Ikawa', 'i-KA-wa', 'koffie', 'Nanywa ikawa mu gitondo. — Ik drink ’s ochtends koffie.', 'Mu gitondo betekent in de ochtend.'),
                    makeItem('thee', 'Icyayi', 'i-CHYA-yi', 'thee', 'Ndashaka icyayi gishyushye. — Ik wil graag hete thee.', 'Gishyushye betekent heet; bijvoeglijke vormen stemmen af op de naamwoordklasse.'),
                    makeItem('brood', 'Umugati', 'u-mu-GA-ti', 'brood', 'Yaguze umugati mushya. — Hij of zij heeft vers brood gekocht.', 'Umugati behoort tot een naamwoordklasse met het voorvoegsel umu-.'),
                    makeItem('rijst', 'Umuceri', 'u-mu-CE-ri', 'rijst', 'Turya umuceri ku mugoroba. — We eten ’s avonds rijst.', 'Turya betekent we eten; ku mugoroba betekent ’s avonds.'),
                    makeItem('kip', 'Inkoko', 'i-NKO-ko', 'kip', 'Ndya inkoko n’umuceri. — Ik eet kip met rijst.', 'N’ is een samentrekking van na, met.'),
                    makeItem('groenten', 'Imboga', 'i-mbo-GA', 'groenten', 'Imboga ni nziza ku buzima. — Groenten zijn goed voor de gezondheid.', 'Imboga heeft deze vorm voor groente; ni verbindt onderwerp en beschrijving.'),
                    makeItem('fruit', 'Imbuto', 'i-mbu-to', 'vruchten', 'Ndya imbuto buri munsi. — Ik eet elke dag fruit.', 'Buri munsi betekent elke dag en staat vaak na het werkwoord.'),
                    makeItem('de rekening', 'Fagitire', 'fa-gi-TI-re', 'factuur of rekening', 'Mwazana fagitire, nyamuneka? — Kunt u de rekening brengen, alstublieft?', 'Fagitire is een ingeburgerd leenwoord voor rekening of factuur.'),
                    makeItem('ik ben vegetariër', 'Sindya inyama', 'sin-dya i-NYA-ma', 'ik eet geen vlees', 'Sindya inyama, ariko ndya imboga. — Ik eet geen vlees, maar wel groenten.', 'Sindya betekent ik eet niet; deze omschrijving is duidelijker dan een zeldzaam leenwoord.')
                ]
            },
            {
                title: 'Reizen & Richtingen',
                items: [
                    makeItem('waar is het station?', 'Sitasiyo iri he?', 'si-ta-SI-yo i-ri he', 'station is waar?', 'Sitasiyo iri he? — Waar is het station?', 'Iri is een vorm van zijn die bij deze naamwoordklasse past.'),
                    makeItem('links', 'Ibumoso', 'i-bu-MO-so', 'linkerkant', 'Hindukira ibumoso ku muhanda ukurikira. — Sla bij de volgende weg linksaf.', 'Hindukira is een bevelsvorm voor afslaan; ku muhanda betekent op de weg.'),
                    makeItem('rechts', 'Iburyo', 'i-bu-RYO', 'rechterkant', 'Hindukira iburyo hafi y’ishuri. — Sla rechtsaf bij de school.', 'Hafi ya betekent dichtbij of bij.'),
                    makeItem('rechtdoor', 'Komeza ugende imbere', 'ko-ME-za u-GE-nde i-MBE-re', 'doorgaan ga vooruit', 'Komeza ugende imbere kugeza ku isoko. — Ga rechtdoor tot aan de markt.', 'Komeza betekent doorgaan; kugeza ku betekent tot aan.'),
                    makeItem('het vliegveld', 'Ikibuga cy’indege', 'i-ki-BU-ga chyi-n-DE-ge', 'terrein van vliegtuigen', 'Tugiye ku kibuga cy’indege. — We gaan naar het vliegveld.', 'Ku duidt hier een bestemming aan; tugiye betekent we gaan.'),
                    makeItem('een kaartje', 'Itike', 'i-TI-ke', 'kaartje of ticket', 'Ndashaka itike ya bisi. — Ik wil een busticket.', 'Ya verbindt itike met de bestemming of soort, hier bus.'),
                    makeItem('de bushalte', 'Ahahagarara bisi', 'a-ha-ha-ga-RA-ra BI-si', 'plaats waar bus stopt', 'Ahahagarara bisi iri hafi? — Is de bushalte dichtbij?', 'De uitdrukking beschrijft de plek waar de bus stopt.'),
                    makeItem('hoe ver is het?', 'Ni kure bingana iki?', 'ni KU-re bi-NGA-na i-KI', 'het is ver hoeveel?', 'Ni kure bingana iki uvuye hano? — Hoe ver is het hiervandaan?', 'Bingana iki vraagt naar de hoeveelheid of mate; uvuye hano betekent vanaf hier.'),
                    makeItem('ik ben verdwaald', 'Nayobye', 'na-YO-bye', 'ik ben de weg kwijt', 'Nayobye, mwamfasha? — Ik ben verdwaald, kunt u mij helpen?', 'Mwamfasha is een beleefd verzoek: kunt u mij helpen?'),
                    makeItem('de uitgang', 'Irembo ryo gusohoka', 'i-REM-bo ryo gu-so-HO-ka', 'poort om naar buiten te gaan', 'Irembo ryo gusohoka riri he? — Waar is de uitgang?', 'Ryo verbindt irembo met de handeling gusohoka, naar buiten gaan.')
                ]
            },
            {
                title: 'Noodgevallen & Gezondheid',
                items: [
                    makeItem('help!', 'Mfasha!', 'm-FASHA', 'help mij', 'Mfasha! Ndakeneye ubufasha. — Help! Ik heb hulp nodig.', 'Mfasha is een directe vraag om hulp; gebruik een duidelijke stem bij gevaar.'),
                    makeItem('bel de politie', 'Hamagara polisi', 'ha-ma-GA-ra po-LI-si', 'bel politie', 'Hamagara polisi, hari ikibazo. — Bel de politie, er is een probleem.', 'Hamagara betekent bellen of roepen; hari ikibazo betekent er is een probleem.'),
                    makeItem('ik heb een dokter nodig', 'Nkeneye umuganga', 'n-ke-NE-ye u-mu-GA-nga', 'ik heb dokter nodig', 'Nkeneye umuganga vuba. — Ik heb snel een dokter nodig.', 'Nkeneye betekent ik heb nodig; vuba betekent snel.'),
                    makeItem('het ziekenhuis', 'Ibitaro', 'i-bi-TA-ro', 'ziekenhuis', 'Ibitaro biri hafi y’uyu mujyi. — Het ziekenhuis ligt dicht bij deze stad.', 'Ibitaro is de gebruikelijke term voor ziekenhuis.'),
                    makeItem('ik heb pijn', 'Ndababara', 'nda-ba-BA-ra', 'ik heb pijn', 'Ndababara mu nda. — Ik heb buikpijn.', 'Mu nda betekent in de buik; lichaamslocatie volgt na de uitdrukking.'),
                    makeItem('ik ben allergisch voor', 'Mfite allergie ku', 'm-fi-te al-ler-JI ku', 'ik heb allergie voor', 'Mfite allergie ku mata. — Ik ben allergisch voor melk.', 'Mfite betekent ik heb; ku verbindt allergie met het allergeen.'),
                    makeItem('waar is de apotheek?', 'Farumasi iri he?', 'fa-ru-MA-si i-ri he', 'apotheek is waar?', 'Farumasi iri he? — Waar is de apotheek?', 'Farumasi is een veelgebruikt leenwoord voor apotheek.'),
                    makeItem('ik voel me ziek', 'Ndumva ndwaye', 'ndu-mva nda-RWE', 'ik voel dat ik ziek ben', 'Ndumva ndwaye kuva mu gitondo. — Ik voel me ziek sinds vanochtend.', 'Ndumva betekent ik voel; kuva mu gitondo betekent sinds de ochtend.'),
                    makeItem('de ambulance', 'Imbangukiragutabara', 'i-mba-ngu-ki-ra-gu-ta-BA-ra', 'voertuig dat snel hulp brengt', 'Hamagara imbangukiragutabara. — Bel de ambulance.', 'Dit lange woord verwijst naar de hulpdienst; ambulance wordt ook begrepen in stedelijke context.'),
                    makeItem('ik heb mijn medicijnen nodig', 'Nkeneye imiti yanjye', 'n-ke-NE-ye i-MI-ti ya-nje', 'ik heb mijn medicijnen nodig', 'Nkeneye imiti yanjye ubu. — Ik heb mijn medicijnen nu nodig.', 'Imiti is medicijnen; yanjye betekent mijn en ubu betekent nu.')
                ]
            },
            {
                title: 'Cijfers & Tijd',
                items: [
                    makeItem('een', 'Imwe', 'I-mwe', 'een', 'Mfite itike imwe. — Ik heb één kaartje.', 'Imwe is de passende telvorm bij itike; telwoorden stemmen af op de naamwoordklasse.'),
                    makeItem('twee', 'Kabiri', 'ka-BI-ri', 'twee keer of twee', 'Tugenda mu minota ibiri. — We gaan over twee minuten.', 'Ibiri is de telvorm die bij iminota, minuten, past.'),
                    makeItem('drie', 'Gatatu', 'ga-TA-tu', 'drie', 'Dufite imizigo itatu. — We hebben drie koffers.', 'Itatu stemt af op de klasse van imizigo.'),
                    makeItem('vier', 'Kane', 'KA-ne', 'vier', 'Bisi ihagera saa yine. — De bus komt om vier uur aan.', 'Saa geeft een tijdstip aan; telvormen kunnen per context wisselen.'),
                    makeItem('vijf', 'Gatanu', 'ga-TA-nu', 'vijf', 'Tegereza iminota itanu. — Wacht vijf minuten.', 'Itanu past hier bij iminota; tegereza betekent wacht.'),
                    makeItem('zes', 'Gatandatu', 'ga-ta-NDA-tu', 'zes', 'Isoko rifunga saa kumi n’ebyiri. — De markt sluit om zes uur ’s avonds.', 'Tijdsaanduidingen in Kinyarwanda kunnen anders tellen dan op een Nederlandse klok.'),
                    makeItem('zeven', 'Karindwi', 'ka-rin-DWI', 'zeven', 'Turahura saa moya n’igice. — We ontmoeten elkaar om halfacht.', 'De lokale tijdtelling begint rond zonsopgang; saa moya is ongeveer zeven uur op de gewone klok.'),
                    makeItem('acht', 'Umunani', 'u-mu-NA-ni', 'acht', 'Bisi ihaguruka saa mbiri. — De bus vertrekt om acht uur ’s ochtends.', 'Lokale tijdsaanduidingen tellen vanaf de ochtend; controleer de context.'),
                    makeItem('negen', 'Icyenda', 'i-chye-NDA', 'negen', 'Tuzagera saa tatu. — We komen om negen uur aan.', 'Saa tatu verwijst in lokale tijdtelling vaak naar negen uur in de ochtend.'),
                    makeItem('tien', 'Icumi', 'i-CU-mi', 'tien', 'Mfite amafaranga icumi. — Ik heb tien eenheden geld.', 'Icumi betekent tien; benoem de valuta apart in echte betalingssituaties.')
                ]
            }
        ]
    }
};
