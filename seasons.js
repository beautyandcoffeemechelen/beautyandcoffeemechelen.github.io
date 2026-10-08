/* ============================================================
   BEAUTY & COFFEE — seasonal looks (repeats every year by itself)
   Each holiday gets its own look from a few weeks before until the
   day itself (New Year and Chinese New Year run on ~2 weeks). In
   between, the season look is shown (autumn, winter, spring, summer).
   When two holidays overlap, the one whose date is closest wins.

   To preview a look:  …/?thema=halloween   (any id below)
   or a date:          …/?themadag=2026-12-10
   To switch it all off: SEASONS_ON = false
   ============================================================ */
const SEASONS_ON = true;
const SOAP_SHOP_URL = "https://zeepmechelenhofstade.wixsite.com/sandra";

// Chinese calendar dates (they move every year) — source: qppstudio.net
const LUNAR_DATES = {
  cny:        { 2026:"02-17", 2027:"02-06", 2028:"01-26", 2029:"02-13", 2030:"02-03", 2031:"01-23", 2032:"02-11", 2033:"01-31", 2034:"02-19", 2035:"02-08", 2036:"01-28" },
  dragonboat: { 2026:"06-19", 2027:"06-09", 2028:"05-28", 2029:"06-16", 2030:"06-05", 2031:"06-24", 2032:"06-12", 2033:"06-01", 2034:"06-20", 2035:"06-10", 2036:"05-30" },
  midautumn:  { 2026:"09-25", 2027:"09-15", 2028:"10-03", 2029:"09-22", 2030:"09-12", 2031:"10-01", 2032:"09-19", 2033:"09-08", 2034:"09-27", 2035:"09-16", 2036:"10-04" }
};
const CHINESE_ZODIAC = {   // starting year 2020 = rat
  nl:["de Rat","de Os","de Tijger","het Konijn","de Draak","de Slang","het Paard","de Geit","de Aap","de Haan","de Hond","het Varken"],
  en:["Rat","Ox","Tiger","Rabbit","Dragon","Snake","Horse","Goat","Monkey","Rooster","Dog","Pig"],
  fr:["du Rat","du Buffle","du Tigre","du Lapin","du Dragon","du Serpent","du Cheval","de la Chèvre","du Singe","du Coq","du Chien","du Cochon"]
};

/* date: "MM-DD", or a function(year) that returns "MM-DD" (null = unknown that year)
   from / to: days before / after the date
   fx: falling effect · deco: little figures in the corners */
const SEASON_THEMES = [
  { id:"halloween", date:"10-31", from:26, to:0, fx:"bats", fxItems:["🦇","🍂"],
    deco:[{ e:"🕷️", at:"spider" }, { e:"🧙‍♀️", at:"fly" }, { e:"🎃", at:"bl" }, { e:"👻", at:"br" }],
    hello:{ nl:"Griezelig gezellig — fijne Halloween!", en:"Spooky and cosy — happy Halloween!", fr:"Effrayant et chaleureux — joyeux Halloween !" },
    facts:{
      nl:["Halloween komt van ‘All Hallows’ Eve’: de avond vóór Allerheiligen.","De eerste lantaarns in Ierland waren uitgeholde rapen, geen pompoenen. 🎃","Volgens oud bijgeloof brengt een spin in huis geluk — laat ze dus maar zitten! 🕷️"],
      en:["Halloween comes from ‘All Hallows’ Eve’: the evening before All Saints’ Day.","The first lanterns in Ireland were hollowed-out turnips, not pumpkins. 🎃","Old folklore says a spider in the house brings luck — so let it be! 🕷️"],
      fr:["Halloween vient de « All Hallows’ Eve » : la veille de la Toussaint.","Les premières lanternes en Irlande étaient des navets évidés, pas des citrouilles. 🎃","Selon une vieille croyance, une araignée dans la maison porte bonheur — laissez-la ! 🕷️"] },
    promo:{ nl:"Iets lekkers zonder suiker? Een handgemaakt zeepje voor je griezelfeestje!", en:"A sugar-free treat? A handmade soap for your spooky party!", fr:"Une friandise sans sucre ? Un savon fait main pour votre fête d’Halloween !" } },

  { id:"sintemette", date:"11-11", from:10, to:0, fx:"stars", fxItems:["✨","🍬"],
    deco:[{ e:"🏮", at:"tl" }, { e:"🍬", at:"br" }, { e:"🧥", at:"bl" }],
    hello:{ nl:"Sinte-Mette, Sinte-Mette… 11 november in Mechelen!", en:"Sinte-Mette: Saint Martin’s Day in Mechelen, 11 November!", fr:"Sinte-Mette : la Saint-Martin à Malines, le 11 novembre !" },
    facts:{
      nl:["In Mechelen heet Sint-Maarten ‘Sinte-Mette’: op 11 november gaan kinderen zingend van deur tot deur voor een snoepje.","Sint-Maarten sneed zijn rode mantel in twee om een arme bedelaar warm te houden.","Volgens een oud verhaal verstopte Maarten zich tussen de ganzen toen hij bisschop moest worden — hun gesnater verraadde hem."],
      en:["In Mechelen, Saint Martin is called ‘Sinte-Mette’: on 11 November children go singing from door to door for sweets.","Saint Martin cut his red cloak in two to keep a poor beggar warm.","Legend says Martin hid among geese when he was to become bishop — their honking gave him away."],
      fr:["À Malines, saint Martin s’appelle « Sinte-Mette » : le 11 novembre, les enfants chantent de porte en porte pour des bonbons.","Saint Martin a coupé son manteau rouge en deux pour réchauffer un pauvre mendiant.","Selon la légende, Martin s’est caché parmi les oies pour ne pas devenir évêque — leurs cris l’ont trahi."] } },

  { id:"sinterklaas", date:"12-06", from:24, to:0, fx:"sweets", fxItems:["🍬","🍪","⭐"],
    deco:[{ e:"🎁", at:"tl" }, { e:"🐴", at:"walk" }, { e:"👞", at:"bl" }, { e:"🥕", at:"br" }],
    hello:{ nl:"Sinterklaas komt eraan! Heb jij je schoen al gezet? 👞", en:"Saint Nicholas is coming! Have you put out your shoe yet? 👞", fr:"Saint Nicolas arrive ! As-tu déjà mis ta chaussure ? 👞" },
    facts:{
      nl:["Sinterklaas is gebaseerd op Sint-Nicolaas, een bisschop uit Myra, in het huidige Turkije.","Een wortel in je schoen voor het paard? Die traditie gaat al heel lang mee. 🥕","Kinderen zingen liedjes bij de schoorsteen in de hoop op een cadeautje op 6 december."],
      en:["Sinterklaas is based on Saint Nicholas, a bishop from Myra in today’s Turkey.","A carrot in your shoe for the horse? A tradition that goes back a long way. 🥕","Children sing songs by the chimney hoping for a present on 6 December."],
      fr:["Saint Nicolas était un évêque de Myre, dans l’actuelle Turquie.","Une carotte dans la chaussure pour le cheval ? Une tradition très ancienne. 🥕","Les enfants chantent près de la cheminée en espérant un cadeau le 6 décembre."] },
    promo:{ nl:"Een handgemaakt zeepje past perfect in de schoen! 👞", en:"A handmade soap fits perfectly in the shoe! 👞", fr:"Un savon fait main tient parfaitement dans la chaussure ! 👞" } },

  { id:"kerst", date:"12-25", from:18, to:1, fx:"snow", fxItems:["❄️","·","✦"],
    deco:[{ e:"🎄", at:"bl" }, { e:"⭐", at:"tr" }, { e:"🎁", at:"br" }, { e:"🔔", at:"tl" }],
    hello:{ nl:"Zalige kerstdagen vanuit Beauty & Coffee 🎄", en:"Merry Christmas from Beauty & Coffee 🎄", fr:"Joyeux Noël de la part de Beauty & Coffee 🎄" },
    facts:{
      nl:["De versierde kerstboom werd in de 19de eeuw populair in onze streken.","In de Sint-Romboutstoren in Mechelen hangen twee volledige beiaarden — kerstklanken gegarandeerd. 🔔","Elektrische kerstlichtjes bestaan sinds 1882; daarvoor hingen er echte kaarsjes in de boom."],
      en:["The decorated Christmas tree became popular in our region in the 19th century.","St Rumbold’s Tower in Mechelen holds two complete carillons — Christmas tunes guaranteed. 🔔","Electric Christmas lights have existed since 1882; before that, real candles hung in the tree."],
      fr:["Le sapin décoré est devenu populaire chez nous au XIXe siècle.","La tour Saint-Rombaut de Malines abrite deux carillons complets — mélodies de Noël garanties. 🔔","Les guirlandes électriques existent depuis 1882 ; avant, on mettait de vraies bougies dans le sapin."] },
    promo:{ nl:"Nog een cadeautje onder de boom nodig? Handgemaakte zeepjes of een cadeaubon!", en:"Need a gift under the tree? Handmade soaps or a gift voucher!", fr:"Encore un cadeau sous le sapin ? Des savons faits main ou un bon cadeau !" } },

  { id:"nieuwjaar", date:"01-01", from:5, to:14, fx:"confetti", fxItems:["🎉","✨","🎊"],
    deco:[{ e:"🥂", at:"bl" }, { e:"🎆", at:"tr" }, { e:"🎇", at:"tl" }],
    hello:{ nl:"Gelukkig Nieuwjaar! Op een stralend jaar ✨", en:"Happy New Year! Here’s to a radiant year ✨", fr:"Bonne année ! À une année rayonnante ✨" },
    facts:{
      nl:["In Vlaanderen lezen kinderen op nieuwjaarsdag hun nieuwjaarsbrief voor aan meter en peter.","In Spanje eten ze om middernacht 12 druiven: één bij elke klokslag. 🍇","Goede voornemens zijn eeuwenoud: de Babyloniërs beloofden hun goden geleende spullen terug te geven."],
      en:["In Flanders, children read their New Year’s letter aloud to their godparents on 1 January.","In Spain people eat 12 grapes at midnight: one with each chime. 🍇","New Year’s resolutions are ancient: the Babylonians promised their gods to return borrowed items."],
      fr:["En Flandre, les enfants lisent leur lettre de Nouvel An à leurs parrain et marraine le 1er janvier.","En Espagne, on mange 12 raisins à minuit : un à chaque coup d’horloge. 🍇","Les bonnes résolutions sont très anciennes : les Babyloniens promettaient à leurs dieux de rendre ce qu’ils avaient emprunté."] } },

  { id:"cny", date:y => LUNAR_DATES.cny[y] || null, from:14, to:14, fx:"lanterns", fxItems:["🏮","🧧","✨"],
    deco:[{ e:"🏮", at:"tl" }, { e:"🏮", at:"tr" }, { e:"🐉", at:"walk" }, { e:"🧧", at:"br" }],
    hello:{ nl:"Gelukkig Chinees Nieuwjaar! 新年快乐 — het jaar van {animal}", en:"Happy Chinese New Year! 新年快乐 — the year of the {animal}", fr:"Bonne année chinoise ! 新年快乐 — l’année {animal}" },
    facts:{
      nl:["Chinees Nieuwjaar valt op de tweede nieuwe maan na de winterzonnewende; daarom verandert de datum elk jaar.","Rode enveloppen met geld (hongbao) brengen geluk. Rood verjaagt volgens de legende het monster Nian. 🧧","Dit is het jaar van {animal}. Elk dier komt om de 12 jaar terug."],
      en:["Chinese New Year falls on the second new moon after the winter solstice, so the date changes every year.","Red envelopes with money (hongbao) bring luck; red scares away the monster Nian, says the legend. 🧧","This is the year of the {animal}. Each animal comes back every 12 years."],
      fr:["Le Nouvel An chinois tombe à la deuxième nouvelle lune après le solstice d’hiver ; la date change donc chaque année.","Les enveloppes rouges avec de l’argent (hongbao) portent bonheur ; selon la légende, le rouge fait fuir le monstre Nian. 🧧","C’est l’année {animal}. Chaque animal revient tous les 12 ans."] } },

  { id:"valentijn", date:"02-14", from:14, to:0, fx:"hearts", fxItems:["💕","❤️","🌹"],
    deco:[{ e:"💘", at:"tr" }, { e:"🌹", at:"bl" }, { e:"💌", at:"br" }],
    hello:{ nl:"Fijne Valentijn! Verwen jezelf of je lief 💕", en:"Happy Valentine’s! Treat yourself or your love 💕", fr:"Joyeuse Saint-Valentin ! Faites-vous plaisir ou gâtez votre moitié 💕" },
    facts:{
      nl:["Valentijn was een priester uit de 3de eeuw; pas in de middeleeuwen werd zijn feestdag aan de liefde gekoppeld.","Rode rozen staan voor liefde, roze rozen voor dankbaarheid. 🌹","Een kus verbruikt een paar calorieën — de leukste training die er is. 😉"],
      en:["Valentine was a 3rd-century priest; only in the Middle Ages did his feast become linked to love.","Red roses mean love, pink roses mean gratitude. 🌹","A kiss burns a few calories — the nicest workout there is. 😉"],
      fr:["Valentin était un prêtre du IIIe siècle ; ce n’est qu’au Moyen Âge que sa fête a été liée à l’amour.","Les roses rouges disent l’amour, les roses roses la gratitude. 🌹","Un baiser brûle quelques calories — le plus agréable des entraînements. 😉"] },
    promo:{ nl:"Verras je lief met een handgemaakt zeepje of een cadeaubon 💕", en:"Surprise your love with a handmade soap or a gift voucher 💕", fr:"Surprenez votre moitié avec un savon fait main ou un bon cadeau 💕" } },

  { id:"pasen", date:y => easterMMDD(y), from:14, to:1, fx:"eggs", fxItems:["🥚","🌷","🐣"],
    deco:[{ e:"🔔", at:"fly" }, { e:"🐣", at:"bl" }, { e:"🐰", at:"br" }, { e:"🌷", at:"tl" }],
    hello:{ nl:"Vrolijk Pasen! De paasklokken zijn onderweg 🔔", en:"Happy Easter! The Easter bells are on their way 🔔", fr:"Joyeuses Pâques ! Les cloches sont en route 🔔" },
    facts:{
      nl:["In België brengen de paasklokken de eitjes: ze vliegen naar Rome en strooien op de terugweg eieren in de tuin. 🔔","Pasen valt op de eerste zondag na de eerste volle maan van de lente.","Het grootste chocolade-ei ooit was meer dan 10 meter hoog."],
      en:["In Belgium the Easter bells bring the eggs: they fly to Rome and drop eggs in the garden on the way back. 🔔","Easter falls on the first Sunday after the first full moon of spring.","The largest chocolate egg ever was more than 10 metres tall."],
      fr:["En Belgique, ce sont les cloches de Pâques qui apportent les œufs : elles volent à Rome et les sèment au retour. 🔔","Pâques tombe le premier dimanche après la première pleine lune du printemps.","Le plus grand œuf en chocolat jamais réalisé mesurait plus de 10 mètres."] },
    promo:{ nl:"Een eitje is lekker, een handgemaakt zeepje blijft langer 🐣", en:"An egg is tasty, a handmade soap lasts longer 🐣", fr:"Un œuf, c’est bon ; un savon fait main dure plus longtemps 🐣" } },

  { id:"moederdag", date:y => nthSundayMMDD(y, 5, 2), from:14, to:0, fx:"petals", fxItems:["🌸","💐","💗"],
    deco:[{ e:"💐", at:"bl" }, { e:"🌸", at:"tr" }],
    hello:{ nl:"Fijne Moederdag! 💐", en:"Happy Mother’s Day! 💐", fr:"Bonne fête des mères ! 💐" },
    facts:{
      nl:["In het grootste deel van België is het Moederdag op de tweede zondag van mei; in Antwerpen-stad op 15 augustus!","Anna Jarvis zette in 1908 de eerste Moederdag op in de Verenigde Staten.","Een verwenmoment cadeau doen? Een cadeaubon van Beauty & Coffee kan altijd."],
      en:["In most of Belgium, Mother’s Day is the second Sunday of May; in the city of Antwerp it’s 15 August!","Anna Jarvis started the first Mother’s Day in the United States in 1908.","Want to give some pampering? A Beauty & Coffee gift voucher always works."],
      fr:["Dans la plupart de la Belgique, la fête des mères est le deuxième dimanche de mai ; à Anvers-ville, le 15 août !","Anna Jarvis a lancé la première fête des mères aux États-Unis en 1908.","Offrir un moment de bien-être ? Un bon cadeau Beauty & Coffee fait toujours plaisir."] },
    promo:{ nl:"Voor mama: handgemaakte zeepjes of een cadeaubon 💐", en:"For mum: handmade soaps or a gift voucher 💐", fr:"Pour maman : des savons faits main ou un bon cadeau 💐" } },

  { id:"vaderdag", date:y => nthSundayMMDD(y, 6, 2), from:14, to:0, fx:"stars", fxItems:["⭐","☕","✨"],
    deco:[{ e:"👔", at:"tr" }, { e:"☕", at:"bl" }],
    hello:{ nl:"Fijne Vaderdag! ☕", en:"Happy Father’s Day! ☕", fr:"Bonne fête des pères ! ☕" },
    facts:{
      nl:["In België is het Vaderdag op de tweede zondag van juni.","Ook mannen zijn van harte welkom voor een gelaatsverzorging of massage!","Sonora Smart Dodd vierde in 1910 de eerste Vaderdag in de Verenigde Staten."],
      en:["In Belgium, Father’s Day is the second Sunday of June.","Men are very welcome for a facial or a massage too!","Sonora Smart Dodd held the first Father’s Day in the United States in 1910."],
      fr:["En Belgique, la fête des pères est le deuxième dimanche de juin.","Les hommes sont aussi les bienvenus pour un soin du visage ou un massage !","Sonora Smart Dodd a célébré la première fête des pères aux États-Unis en 1910."] },
    promo:{ nl:"Voor papa: een handgemaakt zeepje of een massagebon ☕", en:"For dad: a handmade soap or a massage voucher ☕", fr:"Pour papa : un savon fait main ou un bon massage ☕" } },

  { id:"drakenboot", date:y => LUNAR_DATES.dragonboat[y] || null, from:14, to:0, fx:"waves", fxItems:["🌊","🐉","🍃"],
    deco:[{ e:"🐉", at:"walk" }, { e:"🛶", at:"bl" }, { e:"🍙", at:"br" }],
    hello:{ nl:"Fijn Drakenbootfestival! 端午节快乐 🐉", en:"Happy Dragon Boat Festival! 端午节快乐 🐉", fr:"Bonne fête des bateaux-dragons ! 端午节快乐 🐉" },
    facts:{
      nl:["Het Drakenbootfestival herdenkt de dichter Qu Yuan; roeiers zochten hem met hun boten op de rivier.","Op deze dag eet men zongzi: kleefrijst gewikkeld in bamboebladeren. 🍙","Een drakenboot heeft vooraan een drakenkop en een trommelaar die het roeiritme aangeeft. 🥁"],
      en:["The Dragon Boat Festival remembers the poet Qu Yuan; rowers searched the river for him in their boats.","On this day people eat zongzi: sticky rice wrapped in bamboo leaves. 🍙","A dragon boat has a dragon head at the front and a drummer who sets the rowing rhythm. 🥁"],
      fr:["La fête des bateaux-dragons rend hommage au poète Qu Yuan ; les rameurs le cherchaient sur la rivière.","Ce jour-là, on mange des zongzi : du riz gluant enveloppé de feuilles de bambou. 🍙","Un bateau-dragon a une tête de dragon à l’avant et un tambour qui donne le rythme. 🥁"] } },

  { id:"nationale", date:"07-21", from:14, to:0, fx:"flags", fxItems:["🇧🇪","🎆"],
    deco:[{ e:"🇧🇪", at:"tl" }, { e:"🇧🇪", at:"tr" }, { e:"🎆", at:"br" }],
    hello:{ nl:"Fijne nationale feestdag! 🇧🇪", en:"Happy Belgian National Day! 🇧🇪", fr:"Bonne fête nationale ! 🇧🇪" },
    facts:{
      nl:["Op 21 juli 1831 legde Leopold I de eed af als eerste koning der Belgen.","Zwart, geel en rood komen uit het wapen van het hertogdom Brabant.","Op 21 juli is er in Brussel een groot defilé en ’s avonds vuurwerk. 🎆"],
      en:["On 21 July 1831, Leopold I took the oath as the first King of the Belgians.","Black, yellow and red come from the coat of arms of the Duchy of Brabant.","On 21 July Brussels has a big parade and fireworks in the evening. 🎆"],
      fr:["Le 21 juillet 1831, Léopold Ier a prêté serment comme premier roi des Belges.","Le noir, le jaune et le rouge viennent des armoiries du duché de Brabant.","Le 21 juillet, Bruxelles accueille un grand défilé et un feu d’artifice le soir. 🎆"] } },

  { id:"midautumn", date:y => LUNAR_DATES.midautumn[y] || null, from:14, to:0, fx:"lanterns", fxItems:["🏮","🌕","✨"],
    deco:[{ e:"🌕", at:"tr" }, { e:"🥮", at:"bl" }, { e:"🏮", at:"tl" }, { e:"🐇", at:"br" }],
    hello:{ nl:"Fijn Midherfstfestival! 中秋节快乐 🥮", en:"Happy Mid-Autumn Festival! 中秋节快乐 🥮", fr:"Bonne fête de la mi-automne ! 中秋节快乐 🥮" },
    facts:{
      nl:["Tijdens het Midherfstfestival is de maan op haar volst en helderst van het jaar. 🌕","Maankoekjes (mooncakes) delen staat voor samenzijn met je familie. 🥮","Volgens de legende woont de godin Chang’e op de maan, samen met een jadekonijn. 🐇"],
      en:["At the Mid-Autumn Festival the moon is at its fullest and brightest of the year. 🌕","Sharing mooncakes stands for being together with your family. 🥮","Legend says the goddess Chang’e lives on the moon with a jade rabbit. 🐇"],
      fr:["Lors de la fête de la mi-automne, la lune est la plus pleine et la plus brillante de l’année. 🌕","Partager des gâteaux de lune symbolise l’union de la famille. 🥮","Selon la légende, la déesse Chang’e vit sur la lune avec un lapin de jade. 🐇"] } },

  /* ---- the seasons: shown when there is no holiday ---- */
  { id:"herfst", season:true, fx:"leaves", fxItems:["🍂","🍁","🍃"],
    deco:[{ e:"🍁", at:"tr" }, { e:"🍄", at:"bl" }],
    hello:{ nl:"Gezellige herfst — tijd voor een warme latte en wat extra verzorging 🍂", en:"Cosy autumn — time for a warm latte and some extra care 🍂", fr:"Automne douillet — l’heure d’un latte chaud et d’un soin en plus 🍂" },
    facts:{
      nl:["Bladeren kleuren in de herfst omdat het groene bladgroen afbreekt; geel en oranje zaten er altijd al in.","Pumpkin spice is een mix van kaneel, gember, nootmuskaat en kruidnagel. 🎃","Na de zomerzon heeft je huid in de herfst extra nood aan vocht en een frisse scrub."],
      en:["Leaves change colour in autumn because the green chlorophyll breaks down; the yellow and orange were there all along.","Pumpkin spice is a mix of cinnamon, ginger, nutmeg and cloves. 🎃","After the summer sun, your skin needs extra moisture and a fresh scrub in autumn."],
      fr:["Les feuilles changent de couleur en automne car la chlorophylle verte se dégrade ; le jaune et l’orange étaient déjà là.","Le pumpkin spice est un mélange de cannelle, gingembre, muscade et clou de girofle. 🎃","Après le soleil de l’été, la peau a besoin d’hydratation et d’un gommage en automne."] } },
  { id:"winter", season:true, fx:"snow", fxItems:["❄️","·","✦"],
    deco:[{ e:"⛄", at:"bl" }, { e:"❄️", at:"tr" }],
    hello:{ nl:"Warm de winter op met koffie en verzorging ❄️", en:"Warm up the winter with coffee and care ❄️", fr:"Réchauffez l’hiver avec un café et un soin ❄️" },
    facts:{
      nl:["Geen twee sneeuwvlokken zijn hetzelfde, maar bijna allemaal hebben ze zes armen. ❄️","Koude buitenlucht en verwarming drogen je huid uit: geef haar in de winter extra vocht.","De Azteken dronken al cacao lang vóór wij — maar dan bitter en met chili."],
      en:["No two snowflakes are alike, but almost all have six arms. ❄️","Cold air outside and heating inside dry out your skin: give it extra moisture in winter.","The Aztecs drank cocoa long before us — but bitter and with chili."],
      fr:["Aucun flocon de neige n’est identique, mais presque tous ont six branches. ❄️","L’air froid et le chauffage dessèchent la peau : hydratez-la davantage en hiver.","Les Aztèques buvaient du cacao bien avant nous — mais amer et pimenté."] } },
  { id:"lente", season:true, fx:"petals", fxItems:["🌸","🌷","🦋"],
    deco:[{ e:"🌷", at:"bl" }, { e:"🦋", at:"fly" }],
    hello:{ nl:"Fris de lente in — tijd voor een nieuwe start 🌸", en:"Spring into freshness — time for a new start 🌸", fr:"Place au printemps — l’heure d’un nouveau départ 🌸" },
    facts:{
      nl:["Krokussen en sneeuwklokjes zijn de eerste bloemen die de lente aankondigen.","De ‘Mechelse koekoek’ is een bekend kippenras dat zijn naam aan onze stad dankt. 🐔","In de lente maakt een scrub je huid klaar voor de eerste zonnestralen."],
      en:["Crocuses and snowdrops are the first flowers to announce spring.","The ‘Mechelse Koekoek’ is a well-known chicken breed named after our city. 🐔","In spring, a scrub gets your skin ready for the first sunshine."],
      fr:["Les crocus et les perce-neige sont les premières fleurs du printemps.","Le « coucou de Malines » est une race de poule connue qui porte le nom de notre ville. 🐔","Au printemps, un gommage prépare la peau aux premiers rayons du soleil."] } },
  { id:"zomer", season:true, fx:"sun", fxItems:["☀️","🍦","🌼"],
    deco:[{ e:"☀️", at:"tr" }, { e:"🍦", at:"bl" }],
    hello:{ nl:"Zomerse vibes: een iced latte en een stralende huid ☀️", en:"Summer vibes: an iced latte and glowing skin ☀️", fr:"Ambiance d’été : un latte glacé et une peau éclatante ☀️" },
    facts:{
      nl:["Ook bij bewolkt weer komt een groot deel van de uv-straling door: smeer je goed in! ☀️","Cold brew trekt 12 tot 24 uur in koud water en smaakt daardoor zachter.","Rond 21 juni is het de langste dag van het jaar."],
      en:["Even on cloudy days much of the UV light gets through: use your sunscreen! ☀️","Cold brew steeps for 12 to 24 hours in cold water, which makes it taste smoother.","Around 21 June is the longest day of the year."],
      fr:["Même par temps nuageux, une grande partie des UV passe : protégez-vous ! ☀️","Le cold brew infuse 12 à 24 heures dans de l’eau froide, d’où son goût plus doux.","Autour du 21 juin, c’est le jour le plus long de l’année."] } }
];
const SEASON_DEFAULT_PROMO = {
  nl:"Op zoek naar een cadeautje? Ontdek mijn handgemaakte zeepjes 🧼",
  en:"Looking for a little gift? Discover my handmade soaps 🧼",
  fr:"Envie d’un petit cadeau ? Découvrez mes savons faits main 🧼"
};

// Easter Sunday (Gregorian, anonymous algorithm) → "MM-DD"
function easterMMDD(y){
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
}
// the n-th Sunday of a month → "MM-DD"
function nthSundayMMDD(y, month, n){
  const first = new Date(y, month - 1, 1).getDay();
  const day = 1 + ((7 - first) % 7) + (n - 1) * 7;
  return String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
}
