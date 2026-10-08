/* ============================================================
   BEAUTY & COFFEE — data model
   Product & treatment names are salon/brand terms and stay
   identical in NL/EN, per the studio's own menu & protocols.
   ============================================================ */

const MOOD_ICONS = { relax:"🌿", energetic:"✨", focus:"🧖‍♀️", luxury:"💛", group:"👥" };
const CATEGORY_ICONS = { coffee:"☕", tea:"🫖", matcha:"🍵" };

/* Real photos of specific drinks, shown on the result screen when the
   matched drink has one available. Deliberately matched to the EXACT
   drink name (e.g. only "Matcha Latte", not "Iced Matcha Latte" or
   plain "Matcha") — showing the wrong variant's photo would be more
   misleading than showing no photo at all. */
const DRINK_PHOTOS = {
  "Matcha Latte": ["assets/drinks/matcha-latte-1.jpg", "assets/drinks/matcha-latte-2.jpg", "assets/drinks/matcha-latte-3.jpg", "assets/drinks/matcha-latte-4.jpg", "assets/drinks/matcha-latte-5.jpg"],
  "Matcha Latte met witte choco": ["assets/drinks/matcha-latte-3.jpg", "assets/drinks/matcha-latte-5.jpg"],
  "Latte": ["assets/drinks/latte.jpg", "assets/drinks/latte-2.jpg"],
  "Cappuccino": ["assets/drinks/cappuccino.jpg", "assets/drinks/cappuccino-2.jpg", "assets/drinks/cappuccino-3.jpg", "assets/drinks/cappuccino-4.jpg"],
  "Double Cappuccino": ["assets/drinks/cappuccino-dubbel-2.jpg", "assets/drinks/cappuccino-dubbel-3.jpg", "assets/drinks/cappuccino-dubbel.jpg", "assets/drinks/cappuccino-3.jpg", "assets/drinks/cappuccino-4.jpg"],
  "Espresso": ["assets/drinks/espresso.jpg", "assets/drinks/espresso-2.jpg"],
  "Doppio": ["assets/drinks/doppio.jpg", "assets/drinks/doppio-2.jpg"],
  "Latte Macchiato": ["assets/drinks/latte-macchiato.jpg", "assets/drinks/latte-macchiato-2.jpg"],
  "Vietnamese Phin Coffee": ["assets/drinks/vietnamese-phin.jpg", "assets/drinks/phin-2.jpg", "assets/drinks/phin-3.jpg", "assets/drinks/phin-4.jpg"],
  "Long Black": ["assets/drinks/long-black.jpg", "assets/drinks/long-black-2.jpg"],
  "Moka Pot": ["assets/drinks/mokkapot.jpg"],
  "Hot Chocolate (Milk)": ["assets/drinks/chocomelk.jpg"]
};
/* A Latte with the "pumpkin" topping shows the pumpkin spice latte photo. */
const DRINK_PHOTOS_BY_EXTRA = {
  pumpkin: { "Latte": ["assets/drinks/pumpkin-spice-latte.jpg"] }
};
/* Cut-out versions (transparent background) for the "drink jumps out of
   the screen" animation. A photo without a cut-out still animates, but
   as a zoom inside its frame instead of popping out of it. */
const DRINK_CUTOUTS = {
  "assets/drinks/latte.jpg": "assets/drinks/latte-cut.webp",
  "assets/drinks/cappuccino.jpg": "assets/drinks/cappuccino-cut.webp",
  "assets/drinks/latte-macchiato.jpg": "assets/drinks/latte-macchiato-cut.webp",
  "assets/drinks/vietnamese-phin.jpg": "assets/drinks/vietnamese-phin-cut.webp",
  "assets/drinks/pumpkin-spice-latte.jpg": "assets/drinks/pumpkin-spice-latte-cut.webp",
  "assets/drinks/long-black.jpg": "assets/drinks/long-black-cut.webp",
  "assets/drinks/cappuccino-2.jpg": "assets/drinks/cappuccino-2-cut.webp",
  "assets/drinks/cappuccino-3.jpg": "assets/drinks/cappuccino-3-cut.webp",
  "assets/drinks/cappuccino-4.jpg": "assets/drinks/cappuccino-4-cut.webp",
  "assets/drinks/cappuccino-dubbel-2.jpg": "assets/drinks/cappuccino-dubbel-2-cut.webp",
  "assets/drinks/cappuccino-dubbel-3.jpg": "assets/drinks/cappuccino-dubbel-3-cut.webp",
  "assets/drinks/espresso.jpg": "assets/drinks/espresso-cut.webp",
  "assets/drinks/doppio.jpg": "assets/drinks/doppio-cut.webp",
  "assets/drinks/doppio-2.jpg": "assets/drinks/doppio-2-cut.webp",
  "assets/drinks/espresso-2.jpg": "assets/drinks/espresso-2-cut.webp",
  "assets/drinks/matcha-latte-3.jpg": "assets/drinks/matcha-latte-3-cut.webp",
  "assets/drinks/matcha-latte-4.jpg": "assets/drinks/matcha-latte-4-cut.webp",
  "assets/drinks/latte-2.jpg": "assets/drinks/latte-2-cut.webp",
  "assets/drinks/latte-macchiato-2.jpg": "assets/drinks/latte-macchiato-2-cut.webp",
  "assets/drinks/long-black-2.jpg": "assets/drinks/long-black-2-cut.webp",
  "assets/drinks/matcha-latte-5.jpg": "assets/drinks/matcha-latte-5-cut.webp",
  "assets/drinks/matcha-latte-1.jpg": "assets/drinks/matcha-latte-1-cut.webp",
  "assets/drinks/matcha-latte-2.jpg": "assets/drinks/matcha-latte-2-cut.webp"
};
const CAFFEINE_ICONS = { caff:"⚡", decaf:"🌙" };
const TEMPERATURE_ICONS = { hot:"🔥", iced:"🧊" };
const PROFILE_ICONS = { kind:"🧒", man:"🧔", vrouw:"👩" };

const MOODS = ["relax","energetic","focus","luxury","group"];
const CATEGORIES = ["coffee","tea","matcha"];
const CAFFEINE_OPTIONS = ["caff","decaf"];
const TEMPERATURE_OPTIONS = ["hot","iced"];
const PROFILES = ["kind","man","vrouw"];
const AGE_BRACKETS = ["16-29","30-44","45plus"];
const AGE_ICONS = { "16-29":"🌱", "30-44":"🌳", "45plus":"✨" };

const MILK_OPTIONS = ["none","whole","oat","extra"];
const EXTRA_OPTIONS = ["honey","sugar","cream","pumpkin"];   // vanilla ice cream only in workshops (affogato); no Biscoff for now
const TEA_EXTRA_OPTIONS = ["honey","sugar"];
const MATCHA_EXTRA_OPTIONS = ["sugar"];   // no honey with matcha // whipped cream/ice cream/biscoff/pumpkin spice are coffee-only toppings

/* ---------- coffee origins & blends (with tasting notes) ---------- */
const COFFEE_ORIGINS = [
  { id:"peru", name:"Peru La Prosperidad", region:"Cajamarca", notes:"Dark chocolate, plum, honey", decaf:false },
  { id:"colombia_decaf", name:"Colombia Tumbaga Decaf", notes:"Tropical fruit, clementine, milk chocolate", decaf:true },
  { id:"duette", name:"Duette Blend", region:"Brazil & Malawi", notes:"Milk chocolate, caramel, honey", decaf:false },
  { id:"house", name:"House Blend", region:"Brazil, Guatemala & Colombia", notes:"Hazelnut, maple", decaf:false }
];

/* ---------- tea selection ---------- */
// All teas Sandra serves: the longer list from the shop plus the extra
// teas from the drinks menu. (No "Cocktail Fruit Mix" — not served.)
const TEAS_DECAF = [
  "Linden Blossom","Piña Colada Fruit Mix","Tropical Dream Fruit Mix",
  "Lipton Rooibos","Lipton Morocco Mint","Pickwick Chamomile","Altın Otu"
];
const TEAS_CAFF = [
  "Sun of Heaven (Organic Sencha & Mango)","China Bancha","China Jasmine","Jasmine Dragon Pearl",
  "Cascara Costa Rica Sonora","Lipton Peach Mango","Lipton Refreshing Lemon",
  "Pickwick Original English","Pickwick Green Tea Pure","Lipton Japanese Sencha","Lord Nelson Chai",
  "Organo Gold Organic Green Tea (with Ganoderma)","Witte Thee","Powley Cha","Ambachtelijke Bloeithee"
];
// every tea on the list gets the tea photo
TEAS_DECAF.concat(TEAS_CAFF).forEach(n => { DRINK_PHOTOS[n] = ["assets/drinks/thee.jpg"]; });
const HOT_EXTRAS_DECAF = ["Hot Chocolate (Milk)", "Hot Chocolate (White)"];

/* ---------- beverage menu ----------
   Iced is a hot/iced sub-choice within Coffee or Tea, not its own category. */
const BEVERAGES = {
  coffee: {
    caff: [
      { name:"Espresso", style:"black" }, { name:"Doppio", style:"black" },
      { name:"Americano", style:"black" }, { name:"Long Black", style:"black" },
      { name:"Cappuccino", style:"milk" }, { name:"Double Cappuccino", style:"milk" },
      { name:"Cappuccino & Choco", style:"milk" }, { name:"Latte", style:"milk" },
      { name:"Latte Macchiato", style:"milk" }, { name:"Flat White", style:"milk" },
      { name:"Vietnamese Phin Coffee", style:"slow" }, { name:"V60", style:"slow" },
      { name:"Moka Pot", style:"slow" }, { name:"French Press", style:"slow" }
    ],
    decaf: [
      { name:"Espresso", style:"black" }, { name:"Doppio", style:"black" },
      { name:"Americano", style:"black" }, { name:"Long Black", style:"black" },
      { name:"Cappuccino", style:"milk" }, { name:"Latte", style:"milk" },
      { name:"Flat White", style:"milk" },
      { name:"Vietnamese Phin Coffee", style:"slow" }, { name:"V60", style:"slow" },
      { name:"Moka Pot", style:"slow" }, { name:"French Press", style:"slow" }
    ]
  },
  coffeeIced: {
    caff: [
      { name:"Iced Coffee + Whipped Cream" },
      { name:"Iced Latte + Choco + Whipped Cream" }
    ],
    decaf: [
      { name:"Iced Coffee + Whipped Cream" },
      { name:"Iced Latte + Choco + Whipped Cream" }
    ]
  }
};

/* ---------- kids drinks (fixed, no caffeine ever) ---------- */
const KIDS_DRINKS = [
  { id:"water", name:{ nl:"Plat water", en:"Still water" }, icon:"💧" },
  { id:"chocolate", name:{ nl:"Warme chocomelk (Nesquik)", en:"Hot chocolate (Nesquik)" }, icon:"☕" }
];
const KIDS_TREATMENT = "Kindermanicure";

/* ============================================================
   GOOGLE REVIEWS — shown in the app as "Wat klanten zeggen".
   A hand-picked copy of a few public Google reviews: no Google API,
   no extra cookies, works offline. Update it now and then:
   - rating / count: as shown on Google Maps (with the date in asOf)
   - items: copy the text exactly as written (do not change words),
     shorten only by cutting off whole sentences, and use first name +
     initial. Shown in the language the review was written in.
   ============================================================ */
const GOOGLE_REVIEWS = {
  rating: 4.9,
  count: 36,
  asOf: "2026-10-02",
  allUrl: "https://www.google.com/maps/search/?api=1&query=Beauty%20%26%20Coffee%20Barbarastraat",
  items: [
    { name:"Sihm M.", stars:5, topic:"Teambuilding",
      text:"Mijn collega’s en ik hebben genoten van onze teambuilding bij Sandra. We kozen voor een pakket op maat." },
    { name:"Dominique R.", stars:5, topic:"Gelaatsverzorging & pedicure",
      text:"Van een heel ontspannende, zalige gelaatsverzorging en pedicure genoten." }
  ]
};

/* ============================================================
   NAME TRANSLATIONS — treatment, product, soap and drink names.
   The original name (as used in the salon) stays the key and is
   used for matching, photos and the booking message; this table
   only changes what the client SEES in English / French (and
   Dutch for the English drink notes). Missing entry = original.
   ============================================================ */
const NAME_I18N = {
 "Iced Latte + Choco + Whipped Cream": {"nl": "IJslatte + choco + slagroom", "fr": "Latte glacé + choco + chantilly"},
 "Iced Matcha Latte": {"fr": "Matcha latte glacé"},
 "Double Cappuccino": {"nl": "Cappuccino Dubbel", "fr": "Cappuccino double"},
 "Cappuccino & Choco": {"fr": "Cappuccino & choco"},
 "Vietnamese Phin Coffee": {"nl": "Vietnamese Phin Koffie", "fr": "Café vietnamien (phin)"},
 "V60": {"nl": "V60 Filterkoffie", "en": "V60 Filter Coffee", "fr": "Café filtre V60"},
 "Moka Pot": {"nl": "Mokkapot", "fr": "Cafetière moka"},
 "Matcha Latte met witte choco": {"en": "Matcha Latte with white chocolate", "fr": "Matcha latte au chocolat blanc"},
 "Tropical fruit, clementine, milk chocolate": {"nl": "Tropisch fruit, clementine, melkchocolade", "fr": "Fruits tropicaux, clémentine, chocolat au lait"},
 "Groen & Mango": {"en": "Green & Mango", "fr": "Vert & mangue"},
 "Klassiek Groen": {"en": "Classic Green", "fr": "Vert classique"},
 "Witte Thee": {"en": "White Tea", "fr": "Thé blanc"},
 "Zwarte Thee": {"en": "Black Tea", "fr": "Thé noir"},
 "Ambachtelijke Bloeithee": {"en": "Artisanal Blooming Tea", "fr": "Thé fleur artisanal"},
 "Lindebloesem": {"en": "Linden Blossom", "fr": "Fleur de tilleul"},
 "Kamille": {"en": "Chamomile", "fr": "Camomille"},
 "Hot Stone Massage": {
  "en": "Hot Stone Massage",
  "fr": "Massage aux pierres chaudes"
 },
 "Cuppingmassage": {
  "en": "Cupping Massage",
  "fr": "Massage par ventouses (cupping)"
 },
 "Cupping Body Renewal": {
  "en": "Cupping Body Renewal",
  "fr": "Cupping Body Renewal (gommage et ventouses)"
 },
 "Swedish Full Body Massage": {
  "en": "Swedish Full Body Massage",
  "fr": "Massage suédois corps entier"
 },
 "Zweedse Rug-Nek-Schouder Massage": {
  "en": "Swedish Back, Neck & Shoulder Massage",
  "fr": "Massage suédois dos, nuque et épaules"
 },
 "Zweedse Benen- & Voetenmassage": {
  "en": "Swedish Leg & Foot Massage",
  "fr": "Massage suédois jambes et pieds"
 },
 "Energetic Back Wrap": {
  "en": "Energetic Back Wrap",
  "fr": "Enveloppement énergisant du dos"
 },
 "Extended Manicure/Pedicure with SPA supplement": {
  "en": "Extended Manicure/Pedicure with SPA supplement",
  "fr": "Manucure/pédicure complète avec supplément SPA"
 },
 "Brow Lift": {
  "en": "Brow Lift",
  "fr": "Rehaussement des sourcils (brow lift)"
 },
 "Henna Brows": {
  "en": "Henna Brows",
  "fr": "Sourcils au henné"
 },
 "Lash Lift with Tint": {
  "en": "Lash Lift with Tint",
  "fr": "Rehaussement des cils avec teinture"
 },
 "Evening / Party Glam Makeup": {
  "en": "Evening / Party Glam Makeup",
  "fr": "Maquillage glamour de soirée / fête"
 },
 "Skin-Renewing Hydra Peeling pH": {
  "en": "Skin-Renewing Hydra Peeling pH",
  "fr": "Peeling hydratant rénovateur pH"
 },
 "Signature Facial Treatment": {
  "en": "Signature Facial Treatment",
  "fr": "Soin du visage Signature"
 },
 "Fill Me Micro Infusion Treatment": {
  "en": "Fill Me Micro Infusion Treatment",
  "fr": "Soin Fill Me par micro-infusion"
 },
 "Fruit Acid Peeling Dr. Renaud": {
  "en": "Fruit Acid Peeling Dr. Renaud",
  "fr": "Peeling aux acides de fruits Dr. Renaud"
 },
 "Zuiverende Rugverzorging": {
  "en": "Purifying Back Treatment",
  "fr": "Soin purifiant du dos"
 },
 "Botanische Anti-Age": {
  "en": "Botanical Anti-Age Treatment",
  "fr": "Soin anti-âge botanique"
 },
 "Harmoniserende Full Body Verzorging": {
  "en": "Harmonising Full Body Treatment",
  "fr": "Soin harmonisant corps entier"
 },
 "Energetische Full Body Pakking": {
  "en": "Energising Full Body Wrap",
  "fr": "Enveloppement énergisant corps entier"
 },
 "Beauty & Skincare Workshop – Make-up": {
  "en": "Beauty & Skincare Workshop – Make-up",
  "fr": "Atelier Beauty & Skincare – Maquillage"
 },
 "Beauty & Skincare Workshop – Gelaatsverzorging": {
  "en": "Beauty & Skincare Workshop – Facial Care",
  "fr": "Atelier Beauty & Skincare – Soin du visage"
 },
 "Coffee Tasting Basic": {
  "en": "Coffee Tasting Basic",
  "fr": "Dégustation de café – Base"
 },
 "Coffee Tasting Advanced": {
  "en": "Coffee Tasting Advanced",
  "fr": "Dégustation de café – Approfondie"
 },
 "Private Barista Workshop": {
  "en": "Private Barista Workshop",
  "fr": "Atelier barista privé"
 },
 "Extended Manicure": {
  "en": "Extended Manicure",
  "fr": "Manucure complète"
 },
 "Express Pedicure": {
  "en": "Express Pedicure",
  "fr": "Pédicure express"
 },
 "Extended Pedicure": {
  "en": "Extended Pedicure",
  "fr": "Pédicure complète"
 },
 "Afslankingsmassage": {
  "en": "Slimming Massage",
  "fr": "Massage amincissant"
 },
 "Okselontharing": {
  "en": "Underarm Waxing",
  "fr": "Épilation des aisselles"
 },
 "Beenontharing": {
  "en": "Leg Waxing",
  "fr": "Épilation des jambes"
 },
 "Rugontharing": {
  "en": "Back Waxing",
  "fr": "Épilation du dos"
 },
 "Buikontharing": {
  "en": "Stomach Waxing",
  "fr": "Épilation du ventre"
 },
 "Borstontharing": {
  "en": "Chest Waxing",
  "fr": "Épilation du torse"
 },
 "Express Gelaatsverzorging": {
  "en": "Express Facial",
  "fr": "Soin du visage express"
 },
 "Acnécontrole – Équilibre Pureté Citron Vert": {
  "en": "Acne Control – Équilibre Pureté Citron Vert",
  "fr": "Contrôle de l'acné – Équilibre Pureté Citron Vert"
 },
 "Bridal Proefmake-up": {
  "en": "Bridal Trial Make-up",
  "fr": "Essai maquillage de mariée"
 },
 "Bridal Proefmake-up & Bruidsmake-up": {
  "en": "Bridal Trial & Wedding-Day Make-up",
  "fr": "Essai et maquillage de mariée le jour J"
 },
 "Huwelijksdag Make-up (per persoon)": {
  "en": "Wedding-Day Make-up (per person)",
  "fr": "Maquillage le jour du mariage (par personne)"
 },
 "Brow Tinting": {
  "en": "Brow Tinting",
  "fr": "Teinture des sourcils"
 },
 "Brow Shaping (mappen & ontharen)": {
  "en": "Brow Shaping (mapping & hair removal)",
  "fr": "Mise en forme des sourcils (mapping et épilation)"
 },
 "Lash Tinting": {
  "en": "Lash Tinting",
  "fr": "Teinture des cils"
 },
 "Express Manicure": {
  "en": "Express Manicure",
  "fr": "Manucure express"
 },
 "Kinontharing": {
  "en": "Chin Hair Removal",
  "fr": "Épilation du menton"
 },
 "Bovenlipontharing": {
  "en": "Upper Lip Hair Removal",
  "fr": "Épilation de la lèvre supérieure"
 },
 "Wenkbrauwen opschonen (zonder mapping)": {
  "en": "Brow Tidy-up (without mapping)",
  "fr": "Nettoyage des sourcils (sans mapping)"
 },
 "Schouderontharing": {
  "en": "Shoulder Waxing",
  "fr": "Épilation des épaules"
 },
 "Borst- & Buikontharing": {
  "en": "Chest & Stomach Waxing",
  "fr": "Épilation du torse et du ventre"
 },
 "Volledige Beenontharing": {
  "en": "Full Leg Waxing",
  "fr": "Épilation des jambes complètes"
 },
 "Harmoniserende Rugverzorging": {
  "en": "Harmonising Back Treatment",
  "fr": "Soin harmonisant du dos"
 },
 "Teambuilding Beauty & Pamper Experience": {
  "en": "Team Building Beauty & Pamper Experience",
  "fr": "Team building Beauty & Pamper Experience"
 },
 "Teambuilding Specialty Coffee Experience": {
  "en": "Team Building Specialty Coffee Experience",
  "fr": "Team building Specialty Coffee Experience"
 },
 "Cat Eye & Magnetische Gellak Manicure Workshop": {
  "en": "Cat Eye & Magnetic Gel Polish Manicure Workshop",
  "fr": "Atelier manucure Cat Eye & vernis gel magnétique"
 },
 "Kindermanicure": {
  "en": "Kids' Manicure",
  "fr": "Manucure pour enfants"
 },
 "Gerlasan Handcrème (met Ureum)": {
  "en": "Gerlasan Hand Cream (with urea)",
  "fr": "Crème mains Gerlasan (à l'urée)"
 },
 "Gehwol Fusskraft Intensive Cream / Blauw (75 ml)": {
  "en": "Gehwol Fusskraft Intensive Cream / Blue (75 ml)",
  "fr": "Gehwol Fusskraft Intensive Cream / Bleu (75 ml)"
 },
 "Syndet zeepvrij": {
  "en": "Syndet soap-free bar",
  "fr": "Pain Syndet sans savon"
 },
 "Geitenmelkzeep": {
  "en": "Goat milk soap",
  "fr": "Savon au lait de chèvre"
 },
 "Aloë Vera zeep": {
  "en": "Aloe vera soap",
  "fr": "Savon à l'aloe vera"
 },
 "Komkommerzeep": {
  "en": "Cucumber soap",
  "fr": "Savon au concombre"
 },
 "Amandelmelkzeep": {
  "en": "Almond milk soap",
  "fr": "Savon au lait d'amande"
 },
 "Pale Ale zeep": {
  "en": "Pale ale soap",
  "fr": "Savon à la pale ale"
 },
 "Koffiezeep": {
  "en": "Coffee soap",
  "fr": "Savon au café"
 },
 "Matcha-mandarijnscrub": {
  "en": "Matcha-mandarin scrub",
  "fr": "Gommage matcha-mandarine"
 },
 "Hot Chocolate (Milk)": {
  "nl": "Warme chocomelk (Nesquik)",
  "en": "Hot chocolate (Nesquik)",
  "fr": "Chocolat chaud (Nesquik)"
 },
 "Hot Chocolate (White)": {
  "nl": "Warme Chocomelk (wit)",
  "fr": "Chocolat chaud (blanc)"
 },
 "Iced Coffee + Whipped Cream": {
  "nl": "IJskoffie + slagroom",
  "fr": "Café glacé + chantilly"
 },
 "Iced Latte + Choco + Whipped Cream + Biscoff Crumbs": {
  "nl": "IJslatte + choco + slagroom + Biscoff-kruimels",
  "fr": "Latte glacé + choco + chantilly + éclats de Biscoff"
 },
 "Dark chocolate, plum, honey": {
  "nl": "Pure chocolade, pruim, honing",
  "fr": "Chocolat noir, prune, miel"
 },
 "Nutty, cream, orange": {
  "nl": "Nootachtig, room, sinaasappel",
  "fr": "Noisette, crème, orange"
 },
 "Milk chocolate, caramel, honey": {
  "nl": "Melkchocolade, karamel, honing",
  "fr": "Chocolat au lait, caramel, miel"
 },
 "Hazelnut, maple": {
  "nl": "Hazelnoot, ahorn",
  "fr": "Noisette, érable"
 },
 "2 scoops vanilla ice cream": {
  "nl": "2 bolletjes vanille-ijs",
  "fr": "2 boules de glace vanille"
 }
};
/* Treatment names exactly as on the price list (NL/EN/FR). The catalog
   name stays the internal key; the client always sees the price-list name
   in the match, favourites, booking message and share card. */
const PRICELIST_NAMES = {
 "Hot Stone Massage": {
  "nl": "Hot Stone Massage",
  "en": "Hot Stone Massage",
  "fr": "Massage aux pierres chaudes (Hot Stone)"
 },
 "Cuppingmassage": {
  "nl": "Cuppingmassage",
  "en": "Cupping massage",
  "fr": "Massage aux ventouses (cupping)"
 },
 "Cupping Body Renewal": {
  "nl": "Cupping Body Renewal",
  "en": "Cupping Body Renewal",
  "fr": "Cupping Body Renewal"
 },
 "Swedish Full Body Massage": {
  "nl": "Zweedse full body massage",
  "en": "Swedish full body massage",
  "fr": "Massage suédois corps entier"
 },
 "Zweedse Rug-Nek-Schouder Massage": {
  "nl": "Zweedse rug-nek-schouder massage",
  "en": "Swedish back-neck-shoulder massage",
  "fr": "Massage suédois dos-nuque-épaules"
 },
 "Zweedse Benen- & Voetenmassage": {
  "nl": "Zweedse benen-voeten massage",
  "en": "Swedish legs-feet massage",
  "fr": "Massage suédois jambes-pieds"
 },
 "Energetic Back Wrap": {
  "nl": "Energetische rugpakking",
  "en": "Energising back wrap",
  "fr": "Enveloppement énergisant du dos"
 },
 "Brow Lift": {
  "nl": "Brow Lift",
  "en": "Brow Lift",
  "fr": "Brow Lift"
 },
 "Henna Brows": {
  "nl": "Henna Brows",
  "en": "Henna Brows",
  "fr": "Henna Brows"
 },
 "Lash Lift with Tint": {
  "nl": "Lash Lift met kleuring",
  "en": "Lash Lift with tint",
  "fr": "Lash Lift avec teinture"
 },
 "Evening / Party Glam Makeup": {
  "nl": "Avondmake-up / Party / Glam",
  "en": "Evening / Party / Glam make-up",
  "fr": "Maquillage de soirée / Party / Glam"
 },
 "Skin-Renewing Hydra Peeling pH": {
  "nl": "Huidvernieuwende Hydra Peeling pH",
  "en": "Skin-renewing Hydra Peeling pH",
  "fr": "Hydra Peeling pH régénérant"
 },
 "Signature Facial Treatment": {
  "nl": "Signature gelaatsverzorging",
  "en": "Signature facial",
  "fr": "Soin du visage Signature"
 },
 "Fill Me Micro Infusion Treatment": {
  "nl": "Fill Me Micro Infusie Treatment",
  "en": "Fill Me Micro Infusion Treatment",
  "fr": "Fill Me Micro Infusion Treatment"
 },
 "Fruit Acid Peeling Dr. Renaud": {
  "nl": "Fruitzurenpeeling 4/26 Dr. Renaud",
  "en": "Fruit acid peel 4/26 Dr. Renaud",
  "fr": "Peeling aux acides de fruits 4/26 Dr. Renaud"
 },
 "Lift Summum": {
  "nl": "Lift Summum",
  "en": "Lift Summum",
  "fr": "Lift Summum"
 },
 "Zuiverende Rugverzorging": {
  "nl": "Zuiverende rugbehandeling",
  "en": "Purifying back treatment",
  "fr": "Soin purifiant du dos"
 },
 "Botanische Anti-Age": {
  "nl": "Botanische Anti-Age",
  "en": "Botanical Anti-Age",
  "fr": "Anti-âge botanique"
 },
 "Harmoniserende Full Body Verzorging": {
  "nl": "Harmoniserende verzorging full body",
  "en": "Harmonising full body care",
  "fr": "Soin harmonisant corps entier"
 },
 "Energetische Full Body Pakking": {
  "nl": "Energetische lichaamspakking full body",
  "en": "Energising full body wrap",
  "fr": "Enveloppement énergisant corps entier"
 },
 "Coffee Tasting Basic": {
  "nl": "Koffieproeverij Basis",
  "en": "Coffee tasting – Basic",
  "fr": "Dégustation de café – Base"
 },
 "Coffee Tasting Advanced": {
  "nl": "Koffieproeverij Verdiepend",
  "en": "Coffee tasting – Advanced",
  "fr": "Dégustation de café – Approfondie"
 },
 "Private Barista Workshop": {
  "nl": "Barista Privéworkshop",
  "en": "Barista Private Workshop",
  "fr": "Atelier privé barista"
 },
 "Extended Manicure": {
  "nl": "Uitgebreide manicure",
  "en": "Full manicure",
  "fr": "Manucure complète"
 },
 "Express Pedicure": {
  "nl": "Express pedicure",
  "en": "Express pedicure",
  "fr": "Pédicure express"
 },
 "Extended Pedicure": {
  "nl": "Uitgebreide pedicure",
  "en": "Full pedicure",
  "fr": "Pédicure complète"
 },
 "Afslankingsmassage": {
  "nl": "Afslankingsmassage",
  "en": "Slimming massage",
  "fr": "Massage minceur"
 },
 "Express Gelaatsverzorging": {
  "nl": "Express gelaatsverzorging",
  "en": "Express facial",
  "fr": "Soin du visage express"
 },
 "Acnécontrole – Équilibre Pureté Citron Vert": {
  "nl": "Acnécontrole – Équilibre Pureté Citron Vert",
  "en": "Acne control – Équilibre Pureté Citron Vert",
  "fr": "Contrôle acné – Équilibre Pureté Citron Vert"
 },
 "Bridal Proefmake-up": {
  "nl": "Bridal proefmake-up",
  "en": "Bridal trial make-up",
  "fr": "Essai maquillage de mariée"
 },
 "Bridal Proefmake-up & Bruidsmake-up": {
  "nl": "Bridal proefmake-up & bruidsmake-up",
  "en": "Bridal trial & wedding-day make-up",
  "fr": "Essai & maquillage de mariée"
 },
 "Huwelijksdag Make-up (per persoon)": {
  "nl": "Huwelijksdag make-up, per persoon",
  "en": "Wedding-day make-up, per person",
  "fr": "Maquillage du jour J, par personne"
 },
 "Brow Tinting": {
  "nl": "Brow Tinting (kleuren haar)",
  "en": "Brow tinting (hair colour)",
  "fr": "Teinture des sourcils (coloration des poils)"
 },
 "Lash Tinting": {
  "nl": "Lash Tinting (kleuren wimpers)",
  "en": "Lash tinting",
  "fr": "Teinture des cils"
 },
 "Express Manicure": {
  "nl": "Express manicure",
  "en": "Express manicure",
  "fr": "Manucure express"
 },
 "Harmoniserende Rugverzorging": {
  "nl": "Harmoniserende verzorging rug",
  "en": "Harmonising back care",
  "fr": "Soin harmonisant du dos"
 },
 "Teambuilding Beauty & Pamper Experience": {
  "nl": "Teambuilding Beauty & Pamper Experience",
  "en": "Team building Beauty & Pamper Experience",
  "fr": "Team building Beauty & Pamper Experience"
 },
 "Teambuilding Specialty Coffee Experience": {
  "nl": "Teambuilding Specialty Coffee Experience",
  "en": "Team building Specialty Coffee Experience",
  "fr": "Team building Specialty Coffee Experience"
 },
 "Cat Eye & Magnetische Gellak Manicure Workshop": {
  "nl": "Cat Eye & Magnetische Gellak Manicure Workshop",
  "en": "Cat Eye & Magnetic Gel Polish Manicure Workshop",
  "fr": "Atelier manucure Cat Eye & vernis gel magnétique"
 },
 "Okselontharing": {
  "nl": "Ontharing – oksels",
  "en": "Hair removal – underarms",
  "fr": "Épilation – aisselles"
 },
 "Beenontharing": {
  "nl": "Ontharing – onderbenen",
  "en": "Hair removal – lower legs",
  "fr": "Épilation – bas des jambes"
 },
 "Rugontharing": {
  "nl": "Ontharing – rug",
  "en": "Hair removal – back",
  "fr": "Épilation – dos"
 },
 "Buikontharing": {
  "nl": "Ontharing – buik",
  "en": "Hair removal – stomach",
  "fr": "Épilation – ventre"
 },
 "Borstontharing": {
  "nl": "Ontharing – borst",
  "en": "Hair removal – chest",
  "fr": "Épilation – torse"
 },
 "Kinontharing": {
  "nl": "Ontharing – kin",
  "en": "Hair removal – chin",
  "fr": "Épilation – menton"
 },
 "Bovenlipontharing": {
  "nl": "Ontharing – bovenlip",
  "en": "Hair removal – upper lip",
  "fr": "Épilation – lèvre supérieure"
 },
 "Wenkbrauwen opschonen (zonder mapping)": {
  "nl": "Ontharing – wenkbrauwen (zonder mapping / opschonen)",
  "en": "Hair removal – eyebrows (no mapping / tidy-up)",
  "fr": "Épilation – sourcils (sans cartographie / nettoyage)"
 },
 "Schouderontharing": {
  "nl": "Ontharing – schouders",
  "en": "Hair removal – shoulders",
  "fr": "Épilation – épaules"
 },
 "Borst- & Buikontharing": {
  "nl": "Ontharing – borst & buik",
  "en": "Hair removal – chest & stomach",
  "fr": "Épilation – torse & ventre"
 },
 "Volledige Beenontharing": {
  "nl": "Ontharing – volledige benen",
  "en": "Hair removal – full legs",
  "fr": "Épilation – jambes complètes"
 },
 "Extended Manicure/Pedicure with SPA supplement": {
  "nl": "Uitgebreide manicure & pedicure met SPA-supplement",
  "en": "Full manicure & pedicure with SPA add-on",
  "fr": "Manucure & pédicure complètes avec supplément SPA"
 },
 "Brow Shaping (mappen & ontharen)": {
  "nl": "Brow Shaping (mappen en ontharen)",
  "en": "Brow shaping (mapping & hair removal)",
  "fr": "Brow shaping (cartographie & épilation)"
 },
 "Beauty & Skincare Workshop – Make-up": {
  "nl": "Beauty & Skincare Workshop – make-up",
  "en": "Beauty & Skincare Workshop – make-up",
  "fr": "Atelier Beauty & Skincare – maquillage"
 },
 "Beauty & Skincare Workshop – Gelaatsverzorging": {
  "nl": "Beauty & Skincare Workshop – gelaatsverzorging",
  "en": "Beauty & Skincare Workshop – facial care",
  "fr": "Atelier Beauty & Skincare – soin du visage"
 }
};
Object.keys(PRICELIST_NAMES).forEach(k => { NAME_I18N[k] = Object.assign({}, NAME_I18N[k] || {}, PRICELIST_NAMES[k]); });

function trName(s, lang){
  if (!s || typeof s !== "string") return s;
  const e = NAME_I18N[s];
  return (e && e[lang]) || s;
}

/* ============================================================
   PRODUCT CATALOG — home-care recommendations
   inStock is a per-category (and per-soap) toggle so the app
   never advises something that's currently sold out in Wix.
   ============================================================ */
const PRODUCT_CATEGORIES = {
  facial: {
    label: { nl:"Gelaatsverzorging", en:"Facial Care" },
    inStock: true,
    products: [
      { id:"cleanser", name:"Mild Creamy Cleanser (200 ml)",
        usage:{ nl:"'s Morgens en 's avonds verdelen over gelaat, hals en decolleté. Inmasseren en afspoelen met lauw water.",
                en:"Morning and evening, spread over face, neck and décolleté. Massage in and rinse off with lukewarm water." } },
      { id:"tonic", name:"Radiant Firming Tonic (200 ml)",
        usage:{ nl:"Na reiniging aanbrengen op een wattenschijfje en over gelaat, hals en decolleté strijken. Niet afspoelen.",
                en:"After cleansing, apply to a cotton pad and sweep over face, neck and décolleté. Do not rinse off." } },
      { id:"facerub", name:"Mild Face Rub (50 ml)",
        usage:{ nl:"1 à 2 keer per week op een gereinigde, vochtige huid inmasseren (oogomtrek vermijden) en afspoelen.",
                en:"1–2 times a week, massage into cleansed, damp skin (avoid the eye area) and rinse off." } },
      { id:"serum", name:"Deep Xpress Moist Serum (30 ml)",
        usage:{ nl:"'s Morgens en/of 's avonds enkele druppels aanbrengen onder de dag- of nachtcrème.",
                en:"Morning and/or evening, apply a few drops underneath your day or night cream." } },
      { id:"hydracream", name:"Super Hydrating Cream / Hyaluron³ Replenish Cream (50 ml)",
        usage:{ nl:"'s Morgens en/of 's avonds aanbrengen op gelaat, hals en decolleté na het serum.",
                en:"Morning and/or evening, apply to face, neck and décolleté after the serum." } },
      { id:"mask", name:"Deep Xpress Hydro Mask (75 ml)",
        usage:{ nl:"1 à 2 keer per week ruim aanbrengen, 10–15 minuten laten inwerken en afspoelen.",
                en:"1–2 times a week, apply generously, leave on for 10–15 minutes and rinse off." } },
      { id:"fillme", name:"Fill Me Up — Skin Infusion System",
        usage:{ nl:"Eenmaal per 2 weken. Micro-naaldjes applicator vullen met de hyaluronzuur-ampul en zachtjes stempelen op het gelaat.",
                en:"Once every 2 weeks. Fill the micro-needle applicator with the hyaluronic acid ampoule and gently stamp onto the face." } },
      { id:"hyalift", name:"Hya-Lift+ Hyaluronic Acid Serum",
        usage:{ nl:"Dagelijks 's morgens en/of 's avonds enkele druppels aanbrengen vóór de dag- of nachtcrème.",
                en:"Daily, morning and/or evening, apply a few drops before your day or night cream." } }
    ]
  },
  eye: {
    label: { nl:"Oogverzorging", en:"Eye Care" },
    inStock: true,
    products: [
      { id:"eyegel", name:"Aqualift Eye Gel (15 ml)",
        usage:{ nl:"'s Morgens en 's avonds een kleine hoeveelheid met de ringvinger tokkelend aanbrengen rond de ooguitkasten.",
                en:"Morning and evening, gently pat a small amount around the eye contours with your ring finger." } }
    ]
  },
  body: {
    label: { nl:"Lichaamsverzorging", en:"Body Care" },
    inStock: true,
    products: [
      { id:"bodymoist", name:"24h Body Moisturizer (250 ml)",
        usage:{ nl:"Dagelijks na het douchen over het lichaam aanbrengen en inmasseren.",
                en:"Daily after showering, apply over the body and massage in." } },
      { id:"bust", name:"Perfect Bust Formula (150 ml)", genders:["vrouw"],   // never suggested to men
        usage:{ nl:"Dagelijks op buste en decolleté aanbrengen met opwaartse, cirkelvormige bewegingen.",
                en:"Daily, apply to the bust and décolleté using upward, circular movements." } }
    ]
  },
  hand: {
    label: { nl:"Hand & Nagel", en:"Hand & Nail" },
    inStock: true,
    products: [
      { id:"handcream", name:"Hand Care Cream (50 ml)",
        usage:{ nl:"Meerdere malen per dag, vooral na het wassen, inmasseren — ook op de nagelriemen.",
                en:"Several times a day, especially after washing, massage in — also over the cuticles." } },
      { id:"gerlasan", name:"Gerlasan Handcrème (met Ureum)",
        usage:{ nl:"Dagelijks en na elk contact met water aanbrengen en goed inwrijven.",
                en:"Apply daily and after every contact with water, rubbing in well." } }
    ]
  },
  foot: {
    label: { nl:"Voetverzorging", en:"Foot Care" },
    inStock: true,
    products: [
      { id:"gehwol", name:"Gehwol Fusskraft Intensive Cream / Blauw (75 ml)",
        usage:{ nl:"Dagelijks 1 à 2 maal inmasseren op de voeten en tussen de tenen, bij voorkeur na een voetbad.",
                en:"1–2 times daily, massage into feet and between toes, ideally after a foot bath." } }
    ]
  },
  sun: {
    label: { nl:"Zonbescherming", en:"Sun Protection" },
    inStock: true,
    products: [
      { id:"spf50", name:"High Protection Sun Care SPF 50 (75 ml)",
        usage:{ nl:"Rijkelijk aanbrengen op gelaat en blootgestelde huid, 20 minuten vóór blootstelling. Regelmatig herhalen.",
                en:"Apply generously to face and exposed skin 20 minutes before sun exposure. Reapply regularly." } }
    ]
  },
  soap: {
    label: { nl:"Ambachtelijke Zepen", en:"Artisan Soaps" },
    inStock: true,
    products: [
      { id:"geitenmelk", name:"Geitenmelkzeep", tag:"dry",
        usage:{ nl:"Voedende zeep voor de droge huid — dagelijks gebruiken bij het douchen of wassen.",
                en:"Nourishing soap for dry skin — use daily when showering or washing." } },
      { id:"aloevera", name:"Aloë Vera zeep", tag:"sensitive",
        usage:{ nl:"Kalmerende zeep, ideaal na ontharing of voor de gevoelige huid.",
                en:"Soothing soap, ideal after hair removal or for sensitive skin." } },
      { id:"syndet", name:"Syndet zeepvrij", tag:"sensitive",
        usage:{ nl:"Zeepvrije, ongeparfumeerde variant speciaal voor de gevoelige huid.",
                en:"Soap-free, unscented variant specially formulated for sensitive skin." } },
      { id:"komkommer", name:"Komkommerzeep", tag:"sensitive",
        usage:{ nl:"Verfrissend en kalmerend, fijn voor de huid na zonblootstelling of ontharing.",
                en:"Refreshing and soothing, great for the skin after sun exposure or hair removal." } },
      { id:"amandelmelk", name:"Amandelmelkzeep", tag:"dry",
        usage:{ nl:"Voedende zeep die de droge huid verzacht — dagelijks te gebruiken.",
                en:"Nourishing soap that softens dry skin — suitable for daily use." } },
      { id:"paleale", name:"Pale Ale zeep", tag:"general",
        usage:{ nl:"Ambachtelijke reinigende zeep met antioxidanten uit bierbrouw-ingrediënten.",
                en:"Artisan cleansing soap with antioxidants from beer-brewing ingredients." } },
      { id:"koffie", name:"Koffiezeep", tag:"general",
        usage:{ nl:"Licht exfoliërende zeep — perfect gecombineerd met je Beauty & Coffee moment.",
                en:"Gently exfoliating soap — a perfect match for your Beauty & Coffee moment." } },
      { id:"matcha", name:"Matcha-mandarijnscrub", tag:"general",
        usage:{ nl:"Exfoliërende scrub die de huid verheldert — 1 à 2 keer per week gebruiken.",
                en:"Exfoliating scrub that brightens the skin — use 1–2 times a week." } }
    ]
  }
};

/* Choose a homecare recommendation, respecting live stock status.
   Falls back to another in-stock category (in priority order) or a
   general care tip when everything requested is sold out. */
const HOMECARE_FALLBACK_ORDER = ["facial","body","hand","foot","soap","eye","sun"];

/* Picks WHICH product to recommend (language-independent — the random pick
   happens exactly once, at match-generation time) and returns just its ids.
   Call resolveHomecareText() with the current language whenever rendering,
   so a language switch always shows correctly translated text. */
/* profile: "vrouw" / "man" / "kind". A product with a `genders` list is only
   suggested to those profiles (e.g. the bust cream only to women). */
function pickHomecareProduct(categoryId, soapHints, profile){
  const tryCategory = (catId) => {
    const cat = PRODUCT_CATEGORIES[catId];
    if (!cat || !cat.inStock) return null;
    let pool = cat.products.filter(p => !p.genders || !profile || p.genders.includes(profile));
    if (catId === "soap" && soapHints && soapHints.length){
      const hinted = pool.filter(p => soapHints.includes(p.id));
      if (hinted.length) pool = hinted;
    }
    if (!pool.length) return null;
    const product = pickRandom(pool);
    return { categoryId: catId, productId: product.id };
  };

  let result = tryCategory(categoryId);
  if (result) return result;

  for (const fallbackId of HOMECARE_FALLBACK_ORDER){
    if (fallbackId === categoryId) continue;
    result = tryCategory(fallbackId);
    if (result) return result;
  }
  return null; // triggers the generic care-tip message in the UI
}

function resolveHomecareText(pick, lang){
  if (!pick) return null;
  const cat = PRODUCT_CATEGORIES[pick.categoryId];
  if (!cat) return null;
  const product = cat.products.find(p => p.id === pick.productId);
  if (!product) return null;
  return { categoryLabel: cat.label[lang], productName: trName(product.name, lang), usage: product.usage[lang] };
}

/* Secondary soap suggestion — surfaces the dry/sensitive-skin artisan soaps
   alongside whatever the primary home-care recommendation is, since those
   soaps suit almost anyone and deserve more visibility. Skipped when soap
   is already the primary recommendation (no point suggesting it twice). */
function pickSecondarySoap(primaryCategoryId){
  if (primaryCategoryId === "soap") return null;
  const cat = PRODUCT_CATEGORIES.soap;
  if (!cat || !cat.inStock) return null;
  const pool = cat.products.filter(p => p.tag === "dry" || p.tag === "sensitive");
  if (!pool.length) return null;
  const product = pickRandom(pool);
  return { categoryId: "soap", productId: product.id };
}

/* ============================================================
   TREATMENT CATALOG
   Every treatment is tagged with the moods it satisfies, the
   profiles allowed to receive it, and whether it must be
   filtered out after recent/upcoming sun exposure.

   Optional field: price — e.g. price:"€65" — add this to any
   item below to show it on the result screen. Left out (or null)
   by default; the app then just links to your full price list.
   ============================================================ */
const TREATMENTS_CATALOG = [
  { id:"hotstone", name:"Hot Stone Massage", moods:["relax"], genders:["vrouw"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, excludeSummer:true, promoted:true, price:"€90 (90')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een diep ontspannende lichaamsmassage met warme stenen die over de huid glijden, gecombineerd met manuele massagetechnieken — een moment om helemaal tot rust te komen.",
               en:"A deeply relaxing body massage with warm stones gliding over the skin, combined with manual massage techniques — a moment to fully unwind." },
    funfact:{ nl:"De stenen zijn meestal van basalt, een vulkanisch gesteente dat warmte lang vasthoudt — daarom blijft de massage aangenaam warm aanvoelen.",
              en:"The stones are usually basalt, a volcanic rock that holds heat for a long time — which is why the massage stays pleasantly warm." },
    aftercare:{ nl:"Drink de eerste 24 uur extra water, vermijd een hete douche of sauna direct erna en neem de tijd om na te rusten.",
                en:"Drink extra water for the first 24 hours, avoid a hot shower or sauna right after, and take time to rest afterwards." } },

  { id:"cupping", name:"Cuppingmassage", moods:["focus","relax"], genders:["vrouw","man"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, cuppingRelated:true, promoted:true, price:"€60 (60')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een intensieve massage waarbij cups lokaal worden ingezet in combinatie met manuele massagetechnieken, bijvoorbeeld op rug, schouders, armen of benen.",
               en:"An intensive massage where cups are used locally in combination with manual massage techniques, for example on the back, shoulders, arms or legs." },
    funfact:{ nl:"De bekende 'cupping-plekken' ontstaan door de zuigkracht van de cups op de huid — hoe donkerder de plek, hoe intenser de lokale reactie was. We behandelen daarom altijd gericht specifieke zones en nooit het hele lichaam in één keer.",
              en:"The well-known 'cupping marks' come from the suction the cups create on the skin — the darker the mark, the more intense the local reaction was. That's why we always target specific zones and never treat the entire body at once." },
    caution:{ nl:"Cupping is niet geschikt bij koorts, besmettelijke huidziekten, maag- of darmzweren, hartaandoeningen of een te laag lichaamsgewicht — laat het ons vooraf weten als dit op jou van toepassing is. De zon in mag gewoon na een lokale cupping massage.",
              en:"Cupping isn't suitable if you have a fever, a contagious skin condition, stomach or intestinal ulcers, a heart condition, or are underweight — please let us know beforehand if any of these apply to you. Sun exposure is fine after a local cupping massage." },
    aftercare:{ nl:"Sommige mensen voelen zich na cupping behoorlijk moe en wat gevoelig — vergelijkbaar met na een pittige training. Plan er daarom het liefst niets meer na: ga rechtstreeks naar huis, vermijd werk of winkelen, en gun jezelf rust. Stel de behandelde huid ook niet meteen bloot aan een hete of koude douche/bad. Drink voldoende water, gebruik eventueel Arnica-olie tegen blauwe plekken, en houd er rekening mee dat de plekken tot ongeveer 7 dagen zichtbaar kunnen blijven — handig om te weten vóór een zwembad- of strandmoment, trouwfeest of fotoshoot. Voor duurzaam onderhoud wordt een sessie om de 3 tot 6 weken aanbevolen.",
                en:"Some people feel quite tired and a little sore after cupping — similar to how you'd feel after an intense workout. It's best not to plan anything else afterwards: head straight home, skip work or errands, and give yourself time to rest. Also don't expose the treated skin to a hot or cold shower/bath right away. Drink plenty of water, optionally use Arnica oil to reduce bruising, and keep in mind the marks can stay visible for about 7 days — worth knowing ahead of a swimwear moment, a wedding, or a photoshoot. For long-term maintenance, a session every 3 to 6 weeks is recommended." } },

  { id:"cuppingpeeling", name:"Cupping Body Renewal", moods:["focus","relax"], genders:["vrouw","man"], sunSensitive:true, isMassage:true, pregnancyUnsafe:true, cuppingRelated:true, promoted:true, price:"€120 (120')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een uitgebreide behandeling voor één gekozen lichaamszone: een lichaamspeeling en Thermo Body Pack, gevolgd door een intensieve cuppingmassage. Peel → Wrap → Cup → Coffee.",
               en:"An extensive treatment for one chosen body zone: a body peel and Thermo Body Pack, followed by an intensive cupping massage. Peel → Wrap → Cup → Coffee." },
    funfact:{ nl:"Omdat cupping een intensieve behandeling is, wordt niet het hele lichaam in één sessie gecupt. Een volgende lichaamszone kan, wanneer passend, tijdens een latere afspraak aan bod komen — de keuze van zone en traject bespreken we tijdens de intake.",
              en:"Because cupping is an intensive treatment, the whole body isn't cupped in a single session. A next body zone can, when suitable, be treated during a later appointment — the choice of zone and treatment plan is discussed during the intake." },
    caution:{ nl:"Cupping is niet geschikt bij koorts, besmettelijke huidziekten, maag- of darmzweren, hartaandoeningen of een te laag lichaamsgewicht — laat het ons vooraf weten als dit op jou van toepassing is. Ga je na deze behandeling in de zon? Dan raden we de peeling af vanwege verhoogde gevoeligheid.",
              en:"Cupping isn't suitable if you have a fever, a contagious skin condition, stomach or intestinal ulcers, a heart condition, or are underweight — please let us know beforehand if any of these apply to you. Planning sun exposure after this treatment? Then we'd advise against the peeling due to increased sensitivity." },
    aftercare:{ nl:"Sommige mensen voelen zich na cupping behoorlijk moe en wat gevoelig — vergelijkbaar met na een pittige training. Plan er daarom het liefst niets meer na: ga rechtstreeks naar huis, vermijd werk of winkelen, en gun jezelf rust. Stel de behandelde huid ook niet meteen bloot aan een hete of koude douche/bad. Vermijd daarnaast de eerste 24 tot 48 uur directe zon, de zonnebank en sauna's op de behandelde zone — gebruik nadien een hoge SPF. Drink voldoende water, gebruik eventueel Arnica-olie tegen blauwe plekken, en houd er rekening mee dat de plekken tot ongeveer 7 dagen zichtbaar kunnen blijven — handig om te weten vóór een zwembad- of strandmoment, trouwfeest of fotoshoot.",
                en:"Some people feel quite tired and a little sore after cupping — similar to how you'd feel after an intense workout. It's best not to plan anything else afterwards: head straight home, skip work or errands, and give yourself time to rest. Also don't expose the treated skin to a hot or cold shower/bath right away. On top of that, avoid direct sun, tanning beds, and saunas on the treated zone for the first 24 to 48 hours — use a high SPF afterwards. Drink enough water, optionally use Arnica oil to reduce bruising, and keep in mind the marks can stay visible for about 7 days — worth knowing ahead of a swimwear moment, a wedding, or a photoshoot." } },

  { id:"swedish", name:"Swedish Full Body Massage", moods:["relax"], genders:["vrouw"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, promoted:true, price:"€70 (60')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een volledige, ontspannende lichaamsmassage met aandacht voor het hele lichaam — de intensiteit wordt afgestemd op jouw voorkeur.",
               en:"A complete, relaxing full-body massage with attention for the whole body — the intensity is tailored to your preference." },
    funfact:{ nl:"De Zweedse massage combineert vijf klassieke bewegingen en ligt aan de basis van de meeste westerse massagetechnieken.",
              en:"Swedish massage combines five classic strokes and forms the basis of most Western massage techniques." },
    aftercare:{ nl:"Drink de eerste 24 uur ruim water, vermijd zware maaltijden vlak na de massage en bouw rustmomenten in.",
                en:"Drink plenty of water for the first 24 hours, avoid heavy meals right after the massage, and build in moments of rest." } },

  { id:"swedishbackneck", name:"Zweedse Rug-Nek-Schouder Massage", moods:["relax"], genders:["vrouw","man"], sunSensitive:false, isMassage:true, promoted:true, price:"€40 (30')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een ontspannende massage met extra aandacht voor rug, nek en schouders — ideaal wanneer je behoefte hebt aan een moment van rust.",
               en:"A relaxing massage with extra attention for the back, neck and shoulders — ideal whenever you need a moment of calm." },
    funfact:{ nl:"Deze kortere massage focust bewust op de zones waar we de meeste spanning opbouwen — ideaal als een volledige lichaamsmassage (nog) niet aan de orde is, zoals tijdens de zwangerschap.",
              en:"This shorter massage deliberately focuses on the areas where we build up the most tension — ideal when a full-body massage isn't (yet) an option, such as during pregnancy." },
    aftercare:{ nl:"Drink voldoende water na de massage en neem de tijd om rustig na te bewegen.",
                en:"Drink enough water after the massage and take time to move gently afterwards." } },

  { id:"swedishlegs", name:"Zweedse Benen- & Voetenmassage", moods:["relax"], genders:["vrouw","man"], sunSensitive:false, isMassage:true, promoted:true, price:"€40 (30')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een ontspannende massage voor benen en voeten die vermoeid of zwaar aanvoelen.",
               en:"A relaxing massage for legs and feet that feel tired or heavy." },
    funfact:{ nl:"Lang staan of zitten zorgt ervoor dat vocht zich makkelijker ophoopt in de onderbenen — een gerichte massage helpt de doorstroming weer op gang.",
              en:"Standing or sitting for long periods makes fluid build up more easily in the lower legs — a targeted massage helps get circulation moving again." },
    aftercare:{ nl:"Leg je benen na de massage waar mogelijk nog even iets hoger, en drink voldoende water.",
                en:"Where possible, keep your legs slightly elevated for a while after the massage, and drink enough water." } },

  { id:"backwrap", name:"Energetic Back Wrap", moods:["relax","focus"], genders:["vrouw"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, promoted:true, price:"€65 (60')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een verzorgende rugpakking met verfrissende peeling, revitaliserende algenpakking en massage.",
               en:"A caring back wrap with a refreshing peel, revitalizing algae wrap and massage." },
    funfact:{ nl:"Een lichaamswikkel combineert warmte met actieve ingrediënten, waardoor de huid ze beter opneemt.",
              en:"A body wrap combines heat with active ingredients, helping the skin absorb them more effectively." },
    aftercare:{ nl:"Eenmaal thuis kun je gewoon douchen zoals normaal — drink wel voldoende water en hydrateer de huid dagelijks.",
                en:"You can shower normally once you're home — just drink enough water and moisturize the skin daily." } },

  { id:"manipedispa", name:"Extended Manicure/Pedicure with SPA supplement", moods:["relax","luxury"], genders:["vrouw","man"], sunSensitive:false, price:"€35 manicure + €35 pedicure + €30 SPA-supplement",
    homecare:{ category:"hand" },
    benefits:{ nl:"Verzorgde handen én voeten in één sessie, met een extra ontspannen SPA-behandeling.",
               en:"Cared-for hands and feet in a single session, with an extra-relaxing SPA touch." },
    funfact:{ nl:"Regelmatige manicure/pedicure verbetert niet alleen de look, maar ook de nagelgezondheid op lange termijn.",
              en:"Regular manicures/pedicures improve not just the look but also long-term nail health." },
    aftercare:{ nl:"Kies je voor gellak of verstevigende BIAB? Dan zijn je nagels direct droog en stootvast. Bij klassieke nagellak raden we aan om je handen de eerste 2 uur en voeten de eerste 4 uur (gesloten schoenen) rust te gunnen. Hydrateer nagelriemen dagelijks met nagelriemolie.",
                en:"Opting for gel polish or builder gel (BIAB)? Your nails are dry and smudge-proof immediately! For classic nail polish, please allow 2 hours (hands) or 4 hours (feet in closed shoes) to fully dry. Apply cuticle oil daily for best results." } },

  { id:"browlift", name:"Brow Lift", moods:["energetic"], genders:["vrouw"], sunSensitive:false, price:"€75 (75')",
    homecare:{ category:"eye" },
    benefits:{ nl:"Een open, wakkere blik zonder dagelijks stylen — de wenkbrauwhaartjes blijven weken op hun plek.",
               en:"An open, awake look with no daily styling — the brow hairs stay in place for weeks." },
    funfact:{ nl:"Een brow lift werkt met dezelfde techniek als een lash lift, maar dan gericht op de wenkbrauw.",
              en:"A brow lift uses the same technique as a lash lift, but is applied to the eyebrow instead." },
    aftercare:{ nl:"Houd de wenkbrauwen 24 uur droog en vermijd de eerste 48 uur oliehoudende reinigers op de wenkbrauw.",
                en:"Keep the brows dry for 24 hours and avoid oil-based cleansers on the brow area for the first 48 hours." } },

  { id:"hennabrows", name:"Henna Brows", moods:["energetic"], genders:["vrouw"], sunSensitive:false, price:"€50 (60')",
    homecare:{ category:"eye" },
    benefits:{ nl:"Voller ogende wenkbrauwen met een natuurlijke kleurintensiteit die weken meegaat.",
               en:"Fuller-looking brows with a natural color intensity that lasts for weeks." },
    funfact:{ nl:"Henna kleurt niet alleen de haartjes maar ook de huid eronder, voor een extra vol effect.",
              en:"Henna colors not just the hairs but also the skin underneath, for an extra full effect." },
    aftercare:{ nl:"Houd de wenkbrauwen 24 uur droog en vermijd scrubs of peelings rond de wenkbrauw gedurende 3 dagen.",
                en:"Keep the brows dry for 24 hours and avoid scrubs or peels around the brow area for 3 days." } },

  { id:"lashlift", name:"Lash Lift with Tint", moods:["energetic"], genders:["vrouw"], sunSensitive:false, lensWarning:true, price:"€75 (75')",
    homecare:{ category:"eye" },
    benefits:{ nl:"Krullende, donkere wimpers zonder mascara — bespaart tijd in je ochtendroutine.",
               en:"Curled, darker lashes without mascara — saves time in your morning routine." },
    funfact:{ nl:"Het effect van een lash lift houdt gemiddeld één volledige wimpergroeicyclus aan, ongeveer 6 tot 8 weken.",
              en:"The effect of a lash lift lasts on average one full lash growth cycle, about 6 to 8 weeks." },
    aftercare:{ nl:"Houd de wimpers de eerste 24 uur volledig droog en vermijd olie-based make-up remover.",
                en:"Keep the lashes completely dry for the first 24 hours and avoid oil-based makeup remover." } },

  { id:"glammakeup", timeOfDay: "pm", name:"Evening / Party Glam Makeup", moods:["energetic","luxury"], genders:["vrouw"], sunSensitive:false, price:"€60 (60')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een foto- en feestklare look, afgestemd op jouw gelegenheid en huidtype.",
               en:"A photo- and party-ready look, tailored to your occasion and skin type." },
    funfact:{ nl:"Professionele glam-make-up gebruikt laagjestechnieken zodat de look de hele avond intact blijft.",
              en:"Professional glam makeup uses layering techniques so the look stays intact all evening." },
    aftercare:{ nl:"Reinig 's avonds grondig met een milde cleanser en hydrateer de huid voor het slapengaan.",
                en:"Cleanse thoroughly in the evening with a mild cleanser and moisturize the skin before bed." } },

  { id:"hydrapeel", name:"Skin-Renewing Hydra Peeling pH", moods:["energetic","focus"], genders:["vrouw","man"], sunSensitive:true, seasonalBoost:true, price:"€100 (90')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een verzorgende peeling voor een vale of vermoeide uitstraling en een ongelijkmatige huiduitstraling.",
               en:"A caring peel for a dull or tired-looking complexion and an uneven skin tone." },
    funfact:{ nl:"Je huid heeft een echte barrièrefunctie: ze beperkt vochtverlies naar buiten tot een minimum en houdt schadelijke stoffen van buitenaf tegen.",
              en:"Your skin has a real barrier function: it keeps moisture loss to a minimum and blocks harmful substances from getting in." },
    aftercare:{ nl:"Gebruik 7 dagen dagelijks SPF 50, vermijd de zon 14 dagen en sla scrubs 48 uur over.",
                en:"Use SPF 50 daily for 7 days, avoid sun exposure for 14 days and skip scrubs for 48 hours." } },

  { id:"signaturefacial", name:"Signature Facial Treatment", moods:["focus"], genders:["vrouw","man"], sunSensitive:false, price:"€85 (75')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een uitgebreide gelaatsverzorging met aandacht voor reiniging, huidconditie, verzorging en ontspanning.",
               en:"An extensive facial with attention for cleansing, skin condition, care and relaxation." },
    funfact:{ nl:"Wist je dat je huid zichzelf voortdurend vernieuwt? Om de ongeveer 4 weken heb je een volledig nieuwe opperhuid.",
              en:"Did you know your skin constantly renews itself? Roughly every 4 weeks, you have a completely new epidermis." },
    aftercare:{ nl:"Gebruik 7 dagen dagelijks SPF 50 en drink voldoende water om het reinigingseffect te ondersteunen.",
                en:"Use SPF 50 daily for 7 days and drink enough water to support the cleansing effect." } },

  { id:"fillme", name:"Fill Me Micro Infusion Treatment", moods:["focus"], genders:["vrouw","man"], sunSensitive:true, price:"€99 (45-60')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Brengt hyaluronzuur diep in de huid voor een plumpend, verjongend effect.",
               en:"Delivers hyaluronic acid deep into the skin for a plumping, rejuvenating effect." },
    funfact:{ nl:"De behandeling gebruikt micro-naaldjes die kleiner zijn dan een haar om het serum efficiënt in te brengen.",
              en:"The treatment uses micro-needles thinner than a hair to deliver the serum efficiently." },
    aftercare:{ nl:"Draag de eerste 24 uur geen make-up en vermijd 48 uur de zon en sauna. Het dagelijks aanbrengen van een zonnebrandcrème met SPF 50 is essentieel om de pas vernieuwde huid optimaal te beschermen.",
                en:"Avoid wearing makeup for the first 24 hours and stay out of the sun and sauna for 48 hours. Daily application of SPF 50 sunscreen is essential to properly protect your newly refreshed skin." } },

  { id:"fruitacid", name:"Fruit Acid Peeling Dr. Renaud", moods:["focus"], genders:["vrouw","man"], sunSensitive:true, monthRange:[9,10,11,12,1,2,3], seasonalBoost:true, price:"€100 (75')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een professionele peeling met fruitzuren, gericht op een frissere en egalere huiduitstraling.",
               en:"A professional fruit-acid peel, aimed at a fresher and more even-looking complexion." },
    funfact:{ nl:"De opperhuid bestaat uit maar liefst 4 tot 5 dunne sublagen — op plekken die zwaar belast worden, zoals je handpalmen, komt er zelfs een extra laag bij.",
              en:"The epidermis is made up of no fewer than 4 to 5 thin sublayers — areas under heavy strain, like your palms, even get an extra layer." },
    aftercare:{ nl:"Gebruik 7 dagen dagelijks SPF 50, vermijd de zon 14 dagen en sla actieve producten 48 uur over.",
                en:"Use SPF 50 daily for 7 days, avoid sun exposure for 14 days and skip active products for 48 hours." } },

  { id:"liftsummere", name:"Lift Summum", moods:["focus","luxury"], genders:["vrouw","man"], sunSensitive:false, minAge30:true, price:"€120 (70')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een uitgebreide verzorging voor een huid met zichtbare tekenen van huidveroudering en verlies van stevigheid.",
               en:"An extensive treatment for skin showing visible signs of aging and loss of firmness." },
    funfact:{ nl:"Onder je huid zit de hypodermis, die dienstdoet als een echt 'stootkussen' — die vetlaag vangt schokken van buitenaf op en geeft structuur.",
              en:"Beneath your skin lies the hypodermis, which acts as a real 'shock cushion' — that fat layer absorbs impact from the outside and provides structure." },
    aftercare:{ nl:"Gebruik dagelijks SPF, drink voldoende water en vermijd de eerste 24 uur zware make-up.",
                en:"Use SPF daily, drink enough water and avoid heavy makeup for the first 24 hours." } },

  { id:"detoxback", name:"Zuiverende Rugverzorging", moods:["focus"], genders:["vrouw"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, promoted:true, price:"€70 (60')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een uitgebreide verzorging voor de rug met dieptereiniging, verzorging van onzuiverheden, een verzorgende pakking en ontspannende massage.",
               en:"An extensive back treatment with deep cleansing, care for blemishes, a nourishing wrap and a relaxing massage." },
    funfact:{ nl:"De rug is een van de moeilijkst zelf te verzorgen zones — een reden temeer voor een salonbehandeling.",
              en:"The back is one of the hardest areas to care for yourself — all the more reason for a salon treatment." },
    aftercare:{ nl:"Draag de eerste 24 uur bij voorkeur losse kleding. Eenmaal thuis kun je gewoon douchen zoals normaal.",
                en:"Preferably wear loose clothing for the first 24 hours. You can shower normally once you're home." } },

  { id:"antiagefacial", name:"Botanische Anti-Age", moods:["luxury"], genders:["vrouw"], sunSensitive:false, minAge45:true, price:"€125 (90')",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een uitgebreide botanische gelaatsverzorging voor een huid met zichtbare tekenen van huidveroudering.",
               en:"An extensive botanical facial for skin showing visible signs of aging." },
    funfact:{ nl:"In de basale laag zitten naast huidcellen ook melanocyten, de pigmentcellen die je huidskleur bepalen — en mee bepalen hoe je huid met de tijd verandert.",
              en:"The basal layer also contains melanocytes — the pigment cells that determine your skin color, and play a role in how your skin changes over time." },
    aftercare:{ nl:"Gebruik dagelijks SPF 50 gedurende 7 dagen en reinig 's avonds grondig.",
                en:"Use SPF 50 daily for 7 days and cleanse thoroughly in the evening." } },

  { id:"harmonizingbody", name:"Harmoniserende Full Body Verzorging", moods:["luxury"], genders:["vrouw"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, promoted:true, price:"€70 (70')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een verzorgende lichaamsbehandeling met peeling en massage voor een ruwe, droge of onregelmatige huid — ook interessant als extra verzorging na ontharing.",
               en:"A caring body treatment with peeling and massage for rough, dry or uneven skin — also nice as extra care after hair removal." },
    funfact:{ nl:"Deze behandeling combineert peeling, massage én masker in één doorlopende sessie.",
              en:"This treatment combines exfoliation, massage and a mask in one continuous session." },
    aftercare:{ nl:"Drink de eerste 24 uur veel water en hydrateer de huid dagelijks met een bodylotion.",
                en:"Drink plenty of water for the first 24 hours and moisturize the skin daily with a body lotion." } },

  { id:"fullbodywrap", name:"Energetische Full Body Pakking", moods:["luxury","relax"], genders:["vrouw"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, promoted:true, price:"€110 (120')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een uitgebreid lichaamsritueel met verfrissende peeling, revitaliserende algenpakking en massage — een moment om even helemaal te vertragen.",
               en:"An extensive body ritual with a refreshing peel, revitalizing algae wrap and massage — a moment to fully slow down." },
    funfact:{ nl:"Een full body wrap wordt vaak gecombineerd met warmte om actieve stoffen dieper te laten doordringen.",
              en:"A full body wrap is often combined with heat to help active ingredients penetrate more deeply." },
    aftercare:{ nl:"Eenmaal thuis kun je gewoon douchen zoals normaal — drink de eerste dag wel extra veel water.",
                en:"You can shower normally once you're home — just drink extra water on the first day." } },

  { id:"makeupworkshop", name:"Beauty & Skincare Workshop – Make-up", moods:["group"], genders:["vrouw"], sunSensitive:false, price:"€75 (75′) · duo €65 p.p. · 3–4 p. €55 p.p.",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een gezellige privéworkshop waarin je leert hoe je jouw make-up mooi en praktisch kunt aanbrengen — met een uitgebreide Beauty & Coffee-tafel vol verse hapjes en een affogato met vanille-ijs als afsluiter.",
               en:"A fun private workshop where you'll learn how to apply your makeup beautifully and practically — with an extensive Beauty & Coffee spread of fresh treats and an affogato with vanilla ice cream to finish." },
    funfact:{ nl:"Deelnemers gaan naar huis met een persoonlijke productenlijst afgestemd op hun huidtype.",
              en:"Participants go home with a personal product list tailored to their skin type." },
    aftercare:{ nl:"Geen specifieke nazorg nodig — reinig de huid zoals gewoonlijk aan het einde van de dag.",
                en:"No specific aftercare needed — cleanse the skin as usual at the end of the day." } },

  { id:"facialworkshop", name:"Beauty & Skincare Workshop – Gelaatsverzorging", moods:["group"], genders:["vrouw","man"], sunSensitive:false, price:"€75 (75′) · duo €65 p.p. · 3–4 p. €55 p.p.",
    homecare:{ category:"facial" },
    benefits:{ nl:"Ontdek een eenvoudige verzorgingsroutine en leer hoe je jouw look daarna met een mooie touch-up afwerkt.",
               en:"Discover a simple skincare routine and learn how to finish your look afterwards with a lovely touch-up." },
    funfact:{ nl:"Je gaat naar huis met de exacte volgorde van producten die het beste bij jouw huid past — en met een eigen goodiebag vol proefverpakkingen om je nieuwe routine thuis meteen te ontdekken.",
              en:"You'll go home with the exact product order that suits your skin best — plus your own goodie bag full of sample sizes to try your new routine at home right away." },
    aftercare:{ nl:"Gebruik dagelijks SPF na een gelaatsbehandeling en hydrateer 's avonds goed.",
                en:"Use daily SPF after a facial treatment and moisturize well in the evening." } },

  { id:"tastingbasic", name:"Coffee Tasting Basic", moods:["group"], genders:["vrouw","man"], sunSensitive:false, price:"€60 – €85 p.p. (120′)",
    homecare:{ category:"soap", soapHint:["koffie"] },
    benefits:{ nl:"Leer de basis van koffie proeven: aroma's, zuurgraad en afdronk herkennen.",
               en:"Learn the basics of coffee tasting: recognizing aroma, acidity and aftertaste." },
    funfact:{ nl:"Onze Peru Single Origin en House Blend komen allebei langs tijdens deze proeverij.",
              en:"Both our Peru Single Origin and House Blend feature in this tasting." },
    aftercare:{ nl:"Geen nazorg nodig — geniet gerust van nog een kopje na afloop.",
                en:"No aftercare needed — feel free to enjoy another cup afterwards." } },

  { id:"tastingadvanced", name:"Coffee Tasting Advanced", moods:["group"], genders:["vrouw","man"], sunSensitive:false, price:"€65 – €95 p.p. (180′)",
    homecare:{ category:"soap", soapHint:["koffie"] },
    benefits:{ nl:"Verdiep je in origin-vergelijkingen en brouwmethodes als een echte barista.",
               en:"Dive deeper into origin comparisons and brewing methods like a true barista." },
    funfact:{ nl:"Je proeft dezelfde bonen bereid via V60, French Press én Moka Pot om het verschil te ervaren.",
              en:"You'll taste the same beans prepared via V60, French Press and Moka Pot to experience the difference." },
    aftercare:{ nl:"Geen nazorg nodig — noteer je favoriete bereidingswijze voor thuis.",
                en:"No aftercare needed — jot down your favorite brew method for at home." } },

  { id:"baristaworkshop", name:"Private Barista Workshop", moods:["group"], genders:["vrouw","man"], sunSensitive:false, price:"€175 (120')",
    homecare:{ category:"soap", soapHint:["koffie"] },
    benefits:{ nl:"Leer hoe je thuis lekkere espresso's, espresso-afgeleiden en slow coffees kunt bereiden met onder andere V60, French Press, Phin en Moka Pot.",
               en:"Learn how to brew delicious espressos, espresso-based drinks and slow coffees at home using a V60, French Press, Phin and Moka Pot, among others." },
    funfact:{ nl:"Perfecte latte art begint bij melk die tot exact de juiste microschuim-textuur is opgeklopt.",
              en:"Perfect latte art starts with milk steamed to exactly the right microfoam texture." },
    aftercare:{ nl:"Geen nazorg nodig — oefen thuis gerust met je eigen espressomachine.",
                en:"No aftercare needed — feel free to practice at home on your own espresso machine." } },

  { id:"manicure", name:"Extended Manicure", moods:["relax","luxury"], genders:["vrouw","man"], sunSensitive:false, price:"€35 (60')",
    homecare:{ category:"hand" },
    benefits:{ nl:"Knippen, vijlen, nagelriemverzorging, polijsten, verzorging van de nagelomgeving en massage.",
               en:"Trimming, filing, cuticle care, buffing, care of the nail area and a hand massage." },
    funfact:{ nl:"Regelmatige nagelriemverzorging voorkomt op termijn braamranden en droge nagelriemen.",
              en:"Regular cuticle care prevents hangnails and dry cuticles over time." },
    aftercare:{ nl:"Kies je voor gellak of verstevigende BIAB? Dan zijn je nagels direct droog en stootvast. Bij klassieke nagellak raden we aan om je handen de eerste 2 uur droog te houden. Hydrateer nagelriemen dagelijks met nagelriemolie.",
                en:"Opting for gel polish or builder gel (BIAB)? Your nails are dry and smudge-proof immediately! For classic nail polish, please allow 2 hours (hands) to fully dry. Apply cuticle oil daily for best results.." } },

  { id:"pedicureexpress", name:"Express Pedicure", moods:["relax","luxury"], genders:["vrouw","man"], sunSensitive:false, price:"€30 (30')",
    homecare:{ category:"foot" },
    benefits:{ nl:"Een basisvoetverzorging voor verzorgde nagels en nagelwallen — knippen, vijlen, nagelwalreiniging en voetencrème.",
               en:"A basic pedicure for well-groomed nails and nail walls — trimming, filing, nail-wall cleaning and foot cream." },
    funfact:{ nl:"Deze versie bevat bewust geen eeltverwijdering of massage — ideaal als je snel toonbare voeten wil zonder een volledige behandeling.",
              en:"This version deliberately skips hard-skin removal and massage — ideal when you want presentable feet quickly, without a full treatment." },
    aftercare:{ nl:"Hydrateer je voeten en nagelriemen regelmatig, zeker als je geen eeltbehandeling kreeg.",
                en:"Moisturize your feet and cuticles regularly, especially since this version skips the hard-skin treatment." } },

  { id:"pedicure", name:"Extended Pedicure", moods:["relax","luxury"], genders:["vrouw","man"], sunSensitive:false, promoted:true, price:"€35 (60')",
    homecare:{ category:"foot" },
    benefits:{ nl:"Een complete voetverzorging met aandacht voor nagels, nagelwallen, nagelriemen, eelt en ontspanning.",
               en:"A complete pedicure with attention for nails, nail walls, cuticles, hard skin and relaxation." },
    funfact:{ nl:"Eeltverwijdering helpt niet alleen esthetisch, maar voorkomt ook drukplekken bij het lopen.",
              en:"Removing hard skin isn't just cosmetic — it also prevents pressure spots while walking." },
    aftercare:{ nl:"Kies je voor gellak? Dan zijn je nagels direct droog en stootvast. Bij klassieke nagellak raden we aan om je voeten de eerste 4 uur (gesloten schoenen) rust te gunnen. Hydrateer nagelriemen dagelijks met nagelriemolie.",
                en:"Opting for gel polish or builder gel (BIAB)? Your nails are dry and smudge-proof immediately! For classic nail polish, please allow 4 hours (feet in closed shoes) to fully dry. Apply cuticle oil daily for best results." } },

  { id:"slimmassage", name:"Afslankingsmassage", moods:["relax","focus","luxury"], genders:["vrouw","man"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, requiresDietExercise:true, promoted:true, price:"€55 (60')",
    homecare:{ category:"body" },
    benefits:{ nl:"Een stevige lichaamsmassage waarbij gewerkt wordt rond de zones van de lymfeklieren en vervolgens met diepere massagetechnieken op de gewenste lichaamszones — gericht op huidverzorging en lichaamscontouren binnen het aangeleerde massageprotocol.",
               en:"A firm body massage that works around the lymph node areas and then applies deeper massage techniques to the desired body zones — focused on skin care and body contours within the trained massage protocol." },
    funfact:{ nl:"Deze massagetechniek combineert stevige grepen met specifieke bewegingsrichtingen voor een verstevigend effect.",
              en:"This massage technique combines firm grips with specific movement directions for a tightening effect." },
    aftercare:{ nl:"Drink de eerste 24 uur extra water om de afvoer van afvalstoffen te ondersteunen.",
                en:"Drink extra water for the first 24 hours to support the removal of waste products." } },

  { id:"oksel", name:"Okselontharing", moods:["energetic"], genders:["vrouw","man"], sunSensitive:true, waxing:true, price:"€15 (20')",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer","syndet"] },
    benefits:{ nl:"Wekenlang zachte, gladde oksels zonder dagelijks scheren.",
               en:"Weeks of soft, smooth armpits without daily shaving." },
    funfact:{ nl:"Ontharen met was verwijdert het haar met de wortel, waardoor het langzamer en zachter teruggroeit dan bij scheren.",
              en:"Waxing removes hair from the root, so regrowth is slower and softer than with shaving." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, deodorant, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, deodorant, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"been", name:"Beenontharing", moods:["energetic"], genders:["vrouw","man"], sunSensitive:true, waxing:true, price:"€30 onderbenen (20′) · €40 met knieën (35′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Wekenlang gladde benen met een fijnere, langzamere hergroei dan bij scheren.",
               en:"Weeks of smooth legs, with finer, slower regrowth than shaving." },
    funfact:{ nl:"Na een aantal ontharingsbeurten groeit het haar vaak dunner en spaarzamer terug.",
              en:"After several waxing sessions, hair often grows back thinner and more sparse." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"rug", name:"Rugontharing", moods:["energetic","focus"], genders:["man"], sunSensitive:true, waxing:true, price:"€40 (60')",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Een gladde, verzorgde rug zonder de moeite van zelf scheren op een moeilijk bereikbare plek.",
               en:"A smooth, groomed back without the hassle of shaving a hard-to-reach area yourself." },
    funfact:{ nl:"De rug is een van de meest gevraagde ontharingszones bij mannen vóór het zomerseizoen.",
              en:"The back is one of the most requested waxing areas for men ahead of summer." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"buik", name:"Buikontharing", moods:["energetic"], genders:["man"], sunSensitive:true, waxing:true, price:"€20 (45')",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Een gladde buik met langdurig resultaat en fijnere hergroei.",
               en:"A smooth stomach with long-lasting results and finer regrowth." },
    funfact:{ nl:"De huid op de buik is gevoeliger, daarom werken we hier met extra zachte was.",
              en:"The skin on the stomach is more sensitive, which is why we use extra-gentle wax here." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"borst", name:"Borstontharing", moods:["energetic"], genders:["man"], sunSensitive:true, waxing:true, price:"€25 (45')",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Een verzorgde, gladde borstkas met resultaat dat weken meegaat.",
               en:"A groomed, smooth chest with results that last for weeks." },
    funfact:{ nl:"Net als bij de rug groeit het haar na herhaalde behandelingen vaak dunner terug.",
              en:"As with the back, hair often grows back thinner after repeated treatments." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  /* ---- added from the price list (v22) ---- */
  { id:"expressfacial", name:"Express Gelaatsverzorging", moods:["energetic","focus"], genders:["vrouw","man"], sunSensitive:false, price:"€60 (30′)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een snelle maar grondige opfrisbeurt: reiniging, dieptereiniging, een crèmemasker en dagcrème — ideaal als je weinig tijd hebt en toch een frisse huid wil.",
               en:"A quick yet thorough refresh: cleansing, deep cleansing, a cream mask and day cream — ideal when you're short on time but still want fresh skin." },
    funfact:{ nl:"Ook een korte verzorging helpt: een propere huid neemt de actieve stoffen van een masker en dagcrème beter op.",
              en:"Even a short treatment helps: clean skin absorbs the active ingredients of a mask and day cream better." },
    aftercare:{ nl:"Gebruik de komende dagen dagelijks een SPF, drink voldoende water en laat je huid de eerste 24 uur zoveel mogelijk rusten zonder zware make-up.",
                en:"Use SPF daily for the next few days, drink enough water and let your skin rest as much as possible for the first 24 hours without heavy make-up." } },

  { id:"acnefacial", name:"Acnécontrole – Équilibre Pureté Citron Vert", moods:["focus"], genders:["vrouw","man"], sunSensitive:false, price:"€65 (60′)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een zuiverende gelaatsverzorging voor een onzuivere of vette huid, met een huidanalyse bij de eerste behandeling zodat de verzorging echt op jouw huid is afgestemd.",
               en:"A purifying facial for blemish-prone or oily skin, with a skin analysis at the first treatment so the care is truly tailored to your skin." },
    funfact:{ nl:"Onzuiverheden ontstaan vaak wanneer talg en dode huidcellen samen een porie afsluiten — regelmatige, zachte reiniging helpt dat te voorkomen.",
              en:"Blemishes often form when sebum and dead skin cells together block a pore — regular, gentle cleansing helps prevent this." },
    caution:{ nl:"Gebruik je medicatie tegen acne (bv. Roaccutane) of een voorschrift van de dermatoloog? Laat het vooraf weten, dan passen we de behandeling aan.",
              en:"Are you using acne medication (e.g. Roaccutane) or a dermatologist's prescription? Let us know beforehand so we can adapt the treatment." },
    aftercare:{ nl:"Raak je gezicht zo weinig mogelijk aan, gebruik de eerste 24 uur geen zware make-up en bescherm je huid dagelijks met een lichte, niet-vette SPF.",
                en:"Touch your face as little as possible, avoid heavy make-up for the first 24 hours and protect your skin daily with a light, non-greasy SPF." } },

  { id:"bridaltrial", name:"Bridal Proefmake-up", moods:["luxury","energetic"], genders:["vrouw"], sunSensitive:false, price:"€65 (60′)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een rustige proefsessie om samen jouw bruidslook uit te werken: we testen kleuren, houdbaarheid en stijl, zodat je op je grote dag zeker bent van het resultaat.",
               en:"A relaxed trial session to create your bridal look together: we test colours, longevity and style, so you're confident about the result on your big day." },
    funfact:{ nl:"Een proefmake-up plan je best een paar weken voor de trouw — dan kan je de look ook eens laten zien op foto en bij daglicht.",
              en:"A trial is best planned a few weeks before the wedding — that way you can also see the look in photos and in daylight." },
    aftercare:{ nl:"Verwijder je make-up 's avonds grondig met een milde reiniger en breng daarna een hydraterende crème aan.",
                en:"Remove your make-up thoroughly in the evening with a mild cleanser, then apply a moisturising cream." } },

  { id:"bridalpackage", name:"Bridal Proefmake-up & Bruidsmake-up", moods:["luxury"], genders:["vrouw"], sunSensitive:false, price:"€135 (2×60′)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Het volledige pakket: een proefsessie om je look uit te werken én de make-up op je trouwdag zelf, zodat alles tot in de puntjes klopt.",
               en:"The full package: a trial session to create your look and the make-up on your wedding day itself, so every detail is right." },
    funfact:{ nl:"Minerale make-up is licht en ademend, en blijft daardoor ook tijdens een lange trouwdag comfortabel aanvoelen.",
              en:"Mineral make-up is light and breathable, so it stays comfortable even during a long wedding day." },
    aftercare:{ nl:"Verwijder je make-up 's avonds grondig met een milde reiniger en breng daarna een hydraterende crème aan.",
                en:"Remove your make-up thoroughly in the evening with a mild cleanser, then apply a moisturising cream." } },

  { id:"weddingguest", name:"Huwelijksdag Make-up (per persoon)", moods:["group","energetic"], genders:["vrouw"], sunSensitive:false, price:"€40 (30′)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een verzorgde make-up voor mama, getuige, bruidsmeisje of gast op de trouwdag — mooi afgestemd op de bruidslook.",
               en:"A polished make-up for mum, witness, bridesmaid or guest on the wedding day — nicely matched to the bridal look." },
    funfact:{ nl:"Met een kleine groep op dezelfde dag maken we een planning, zodat iedereen op tijd en ontspannen klaar is.",
              en:"For a small group on the same day we make a schedule, so everyone is ready on time and relaxed." },
    aftercare:{ nl:"Verwijder je make-up 's avonds grondig met een milde reiniger en breng daarna een hydraterende crème aan.",
                en:"Remove your make-up thoroughly in the evening with a mild cleanser, then apply a moisturising cream." } },

  { id:"browtint", name:"Brow Tinting", moods:["energetic"], genders:["vrouw","man"], sunSensitive:false, price:"€20 (15′)",
    homecare:{ category:"eye" },
    benefits:{ nl:"Het kleuren van je wenkbrauwharen voor een vollere, meer gedefinieerde blik — zonder dagelijks bijwerken met potlood.",
               en:"Tinting your brow hairs for a fuller, more defined look — without filling them in with pencil every day." },
    funfact:{ nl:"Lichte of grijze wenkbrauwharen worden met een tint ineens zichtbaar, waardoor de wenkbrauw voller oogt.",
              en:"Light or grey brow hairs suddenly become visible with a tint, making the brow look fuller." },
    caution:{ nl:"Bij een eerste kleuring doen we best 48 uur vooraf een huidtest, om een allergische reactie uit te sluiten.",
              en:"For a first tint it's best to do a patch test 48 hours beforehand to rule out an allergic reaction." },
    aftercare:{ nl:"Maak je wenkbrauwen de eerste 24 uur niet nat, vermijd sauna en stoom, en gebruik geen peeling op die zone.",
                en:"Don't get your brows wet for the first 24 hours, avoid sauna and steam, and don't use an exfoliant on that area." } },

  { id:"browshaping", name:"Brow Shaping (mappen & ontharen)", moods:["energetic"], genders:["vrouw","man"], sunSensitive:true, waxing:true, price:"€25 (20′)",
    homecare:{ category:"eye" },
    benefits:{ nl:"We meten je wenkbrauwen op maat van jouw gezicht (mapping) en brengen ze daarna mooi in vorm door te ontharen.",
               en:"We measure your brows to suit your face (mapping) and then shape them beautifully by removing hair." },
    funfact:{ nl:"Bij brow mapping bepalen we begin, hoogste punt en einde van je wenkbrauw aan de hand van je neus, pupil en ooghoek.",
              en:"With brow mapping we determine the start, arch and end of your brow based on your nose, pupil and eye corner." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"lashtint", name:"Lash Tinting", moods:["energetic"], genders:["vrouw"], sunSensitive:false, lensWarning:true, price:"€20 (15′)",
    homecare:{ category:"eye" },
    benefits:{ nl:"Het kleuren van je wimpers voor een intensere blik, ook zonder mascara — handig voor vakantie, sport of een drukke week.",
               en:"Tinting your lashes for a more intense look, even without mascara — handy for holidays, sport or a busy week." },
    funfact:{ nl:"De uiteinden van wimpers zijn vaak lichter dan de basis; door te kleuren lijken ze ineens langer.",
              en:"The tips of lashes are often lighter than the base; tinting makes them suddenly look longer." },
    caution:{ nl:"Bij een eerste kleuring doen we best 48 uur vooraf een huidtest, om een allergische reactie uit te sluiten.",
              en:"For a first tint it's best to do a patch test 48 hours beforehand to rule out an allergic reaction." },
    aftercare:{ nl:"Maak je wimpers de eerste 24 uur niet nat, wrijf niet in je ogen en vermijd sauna en stoom.",
                en:"Don't get your lashes wet for the first 24 hours, don't rub your eyes, and avoid sauna and steam." } },

  { id:"manicureexpress", name:"Express Manicure", moods:["energetic","relax"], genders:["vrouw","man"], sunSensitive:false, price:"€30 (30′)",
    homecare:{ category:"hand" },
    benefits:{ nl:"Snel verzorgde handen: knippen, vijlen, nagelriemen verzorgen en een voedende handcrème.",
               en:"Quickly groomed hands: trimming, filing, cuticle care and a nourishing hand cream." },
    funfact:{ nl:"Een nagel groeit gemiddeld zo'n 3 millimeter per maand — een vingernagel volledig vernieuwen duurt dus enkele maanden.",
              en:"A nail grows on average about 3 millimetres a month — so fully renewing a fingernail takes several months." },
    aftercare:{ nl:"Smeer je handen en nagelriemen dagelijks in en draag handschoenen bij afwas of schoonmaak.",
                en:"Moisturise your hands and cuticles daily and wear gloves when washing up or cleaning." } },

  { id:"kin", name:"Kinontharing", moods:["energetic"], genders:["vrouw"], sunSensitive:true, waxing:true, price:"€10 (10′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Een gladde kin, snel en verzorgd — zonder scheren of pincet.",
               en:"A smooth chin, quick and neat — without shaving or tweezers." },
    funfact:{ nl:"Haartjes op de kin kunnen door hormonale schommelingen sterker worden; regelmatig ontharen houdt het beheersbaar.",
              en:"Chin hairs can become stronger due to hormonal changes; regular hair removal keeps it manageable." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"bovenlip", name:"Bovenlipontharing", moods:["energetic"], genders:["vrouw"], sunSensitive:true, waxing:true, price:"€10 (10′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Een gladde bovenlip met resultaat dat weken meegaat.",
               en:"A smooth upper lip with results that last for weeks." },
    funfact:{ nl:"De huid boven de lip is dun en gevoelig; daarom werken we hier met zachte was of threading.",
              en:"The skin above the lip is thin and sensitive, which is why we use gentle wax or threading here." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"wenkbrauwontharing", name:"Wenkbrauwen opschonen (zonder mapping)", moods:["energetic"], genders:["vrouw","man"], sunSensitive:true, waxing:true, price:"€15 (20′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Je bestaande wenkbrauwvorm netjes opgeschoond — voor een verzorgde blik zonder de vorm te veranderen.",
               en:"Your existing brow shape neatly tidied up — for a groomed look without changing the shape." },
    funfact:{ nl:"Threading is een eeuwenoude ontharingstechniek met een gedraaide katoenen draad, zonder was op de huid.",
              en:"Threading is an age-old hair-removal technique using a twisted cotton thread, with no wax on the skin." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"schouders", name:"Schouderontharing", moods:["energetic"], genders:["man"], sunSensitive:true, waxing:true, price:"€15 (25′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Gladde, verzorgde schouders — handig in combinatie met een rugontharing.",
               en:"Smooth, groomed shoulders — handy in combination with a back wax." },
    funfact:{ nl:"Na herhaalde behandelingen groeit het haar op de schouders vaak dunner terug.",
              en:"After repeated treatments, hair on the shoulders often grows back thinner." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"borstbuik", name:"Borst- & Buikontharing", moods:["energetic"], genders:["man"], sunSensitive:true, waxing:true, price:"€40 (90′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Borst en buik in één behandeling glad en verzorgd, met resultaat dat weken meegaat.",
               en:"Chest and stomach smooth and groomed in one treatment, with results that last for weeks." },
    funfact:{ nl:"Samen behandelen is voordeliger dan borst en buik apart, en je huid heeft maar één keer hersteltijd nodig.",
              en:"Treating both together costs less than chest and stomach separately, and your skin needs recovery time only once." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"volledigebenen", name:"Volledige Beenontharing", moods:["energetic"], genders:["vrouw","man"], sunSensitive:true, waxing:true, price:"€50 (60′)",
    homecare:{ category:"soap", soapHint:["aloevera","komkommer"] },
    benefits:{ nl:"Wekenlang gladde benen, van enkel tot bovenbeen.",
               en:"Weeks of smooth legs, from ankle to thigh." },
    funfact:{ nl:"Na een aantal ontharingsbeurten groeit het haar vaak dunner en spaarzamer terug.",
              en:"After several waxing sessions, hair often grows back thinner and more sparse." },
    aftercare:{ nl:"Vermijd de eerste 24 tot 48 uur directe zon, de zonnebank, strakke kleding en hete douches of sauna's. Breng op ontblote zones altijd een zonnebrandcrème met hoge beschermingsfactor (SPF 50) aan om roodheid en pigmentvlekken te voorkomen.",
                en:"Avoid direct sun exposure, tanning beds, tight clothing, hot showers, and saunas for the first 24 to 48 hours. Always apply a high protection sunscreen (SPF 50) to exposed areas to prevent redness and hyperpigmentation." } },

  { id:"harmonizingback", name:"Harmoniserende Rugverzorging", moods:["relax","focus"], genders:["vrouw","man"], sunSensitive:false, isMassage:true, pregnancyUnsafe:true, price:"€35 (30′)",
    homecare:{ category:"body" },
    benefits:{ nl:"Een korte verwenbeurt voor je rug: een peeling en massage voor een zachte, gladde huid en losgemaakte spieren.",
               en:"A short treat for your back: a peeling and massage for soft, smooth skin and relaxed muscles." },
    funfact:{ nl:"De rug is een zone die we zelf moeilijk bereiken — daardoor krijgt de huid daar vaak het minst verzorging.",
              en:"The back is an area we can hardly reach ourselves — which is why the skin there often gets the least care." },
    aftercare:{ nl:"Drink voldoende water en smeer je rug de dagen erna in met een voedende bodylotion.",
                en:"Drink enough water and apply a nourishing body lotion to your back in the following days." } },

  { id:"teambeauty", name:"Teambuilding Beauty & Pamper Experience", moods:["group"], genders:["vrouw","man"], sunSensitive:false, price:"€275 per groep (max. 4)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een exclusief arrangement voor je team of vriendengroep: een uitgebreide workshop naar keuze (gelaatsverzorging met make-up touch-up, beauty make-up of threading), een specialty coffee bar, welkomstdrankje, zoete en hartige hapjes, een affogato en een luxe attentie voor iedereen.",
               en:"An exclusive package for your team or group of friends: an extended workshop of your choice (facial with make-up touch-up, beauty make-up or threading), a specialty coffee bar, welcome drink, sweet and savoury bites, an affogato and a luxury gift for everyone." },
    funfact:{ nl:"Een affogato is Italiaans voor 'verdronken': een bol vanille-ijs overgoten met een warme espresso — of bij ons ook met matcha.",
              en:"Affogato is Italian for 'drowned': a scoop of vanilla ice cream topped with a hot espresso — or, with us, with matcha too." },
    aftercare:{ nl:"Schrijf minstens 1 week op voorhand in. Na een gelaatsverzorging gebruik je best dagelijks een SPF.",
                en:"Please register at least 1 week in advance. After a facial it's best to use SPF daily." } },

  { id:"teamcoffee", name:"Teambuilding Specialty Coffee Experience", moods:["group"], genders:["vrouw","man"], sunSensitive:false, price:"€295 per groep (max. 4)",
    homecare:{ category:"soap", soapHint:["koffie"] },
    benefits:{ nl:"Een exclusief arrangement rond koffie: een uitgebreide koffieworkshop naar keuze (Specialty Koffieproeverij Basis of Verdiepend), een specialty coffee bar, welkomstdrankje, zoete en hartige hapjes en een affogato.",
               en:"An exclusive coffee package: an extended coffee workshop of your choice (Specialty Coffee Tasting Basic or Advanced), a specialty coffee bar, welcome drink, sweet and savoury bites and an affogato." },
    funfact:{ nl:"Specialty coffee is koffie die door gecertificeerde proevers minstens 80 op 100 punten krijgt.",
              en:"Specialty coffee is coffee that certified tasters score at least 80 out of 100 points." },
    aftercare:{ nl:"Schrijf minstens 1 week op voorhand in. Noteer na afloop je favoriete koffie en bereiding voor thuis.",
                en:"Please register at least 1 week in advance. Afterwards, jot down your favourite coffee and brew method for at home." } },

  { id:"cateye", name:"Cat Eye & Magnetische Gellak Manicure Workshop", moods:["group","energetic"], genders:["vrouw"], sunSensitive:false, price:"€85 privé · duo €75 p.p. (90–120′)",
    homecare:{ category:"hand" },
    benefits:{ nl:"Leer zelf een prachtig magnetisch ‘Cat Eye’-effect op je nagels maken, met alle professionele lakken, magneten en UV/LED-lampen — plus specialty coffee/thee en huisgemaakte zoetigheden.",
               en:"Learn to create a beautiful magnetic ‘cat eye’ effect on your nails, with all professional polishes, magnets and UV/LED lamps — plus specialty coffee/tea and homemade sweets." },
    funfact:{ nl:"Cat eye-gellak bevat fijne metaalachtige deeltjes; met een magneet trek je ze in een lijn, waardoor die typische lichtstreep ontstaat.",
              en:"Cat eye gel polish contains fine metallic particles; a magnet pulls them into a line, creating that typical streak of light." },
    caution:{ nl:"Max. 2 deelnemers. Je nagels moeten bij aanvang volledig vrij zijn van lak, gellak of gelnagels.",
              en:"Max. 2 participants. Your nails must be completely free of polish, gel polish or gel nails at the start." },
    aftercare:{ nl:"Smeer je nagelriemen dagelijks in met nagelriemolie en laat gellak altijd professioneel verwijderen (soak-off), niet aftrekken.",
                en:"Apply cuticle oil daily and always have gel polish removed professionally (soak-off) — never peel it off." } }
];

/* Gentle, never-sun-sensitive, never-massage items usable as a safe
   fallback when a mood + profile + sun/health combination leaves no match. */
const SAFE_FALLBACK_IDS = ["signaturefacial","manicure","pedicure","liftsummere"];

/* Optional free-text "waar heb je last van?" field — a lightweight,
   fully local keyword scan (no AI, nothing sent anywhere). Each entry
   maps a set of keywords to the treatment ids they should boost. This
   is a hint layered on top of the mood-based matching, not a
   replacement for it — the guided questions (safety filters included)
   remain the reliable backbone. */
const COMPLAINT_KEYWORDS = [
  { words:["rug","rugpijn","rugklachten","nek","schouder","schouders"], ids:["backwrap","detoxback","harmonizingbody","harmonizingback","swedishbackneck","cupping","cuppingpeeling"] },
  { words:["stress","gestrest","ontspanning","ontspannen","moe","vermoeid","uitgeput"], ids:["swedish","swedishbackneck","hotstone","cupping"] },
  { words:["spierpijn","spieren","stijf","gespannen"], ids:["cupping","cuppingpeeling","slimmassage","swedish"] },
  { words:["rimpels","veroudering","verouderen","huidveroudering","stevigheid"], ids:["antiagefacial","liftsummere"] },
  { words:["pigmentatie","pigmentvlekken","oneffen","dof","vale huid","vaal"], ids:["hydrapeel","fruitacid"] },
  { words:["onzuiverheden","puistjes","acne","vette huid"], ids:["signaturefacial","acnefacial","expressfacial"] },
  { words:["voeten","voet","eelt","nagelriem","ingegroeide nagel"], ids:["pedicure"] },
  { words:["nagels","handen","manicure"], ids:["manicure","manipedispa","manicureexpress","cateye"] },
  { words:["wimpers","wenkbrauwen","brows","lashes"], ids:["lashlift","browlift","hennabrows","browtint","browshaping","lashtint","wenkbrauwontharing"] },
  { words:["ontharen","ontharing","haargroei","beharing"], ids:["oksel","been","rug","buik","borst","kin","bovenlip","wenkbrauwontharing","schouders","borstbuik","volledigebenen"] },
  { words:["contour","silhouet","gewicht","afslanken","cellulite"], ids:["slimmassage"] },
  { words:["make-up","makeup","visagie"], ids:["glammakeup","bridaltrial","weddingguest"] },
  { words:["bruid","bruiloft","huwelijk","trouw","trouwfeest"], ids:["bridaltrial","bridalpackage","weddingguest"] },
  { words:["teambuilding","team","collega","collega's","vriendinnen","groep"], ids:["teambeauty","teamcoffee"] },
  { words:["koffie","barista","proeverij"], ids:["teamcoffee","tastingbasic","tastingadvanced","baristaworkshop"] }
];

function boostByComplaint(pool, complaintText){
  if (!complaintText) return pool;
  const text = complaintText.toLowerCase();
  const matchedIds = new Set();
  COMPLAINT_KEYWORDS.forEach(entry => {
    if (entry.words.some(w => text.includes(w))){
      entry.ids.forEach(id => matchedIds.add(id));
    }
  });
  if (!matchedIds.size) return pool;
  const boosted = pool.filter(item => matchedIds.has(item.id));
  return boosted.length ? boosted : pool;
}

/* "Liever niet": treatment groups a client can rule out before the match
   (e.g. a man who really doesn't want a pedicure). */
const AVOID_GROUPS = {
  feet:     ["pedicure","pedicureexpress","manipedispa"],
  hands:    ["manicure","manicureexpress","manipedispa","cateye"],
  massage:  ["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","backwrap","detoxback","harmonizingbody","fullbodywrap","slimmassage","harmonizingback"],
  waxing:   ["oksel","been","rug","buik","borst","browshaping","kin","bovenlip","wenkbrauwontharing","schouders","borstbuik","volledigebenen"],
  face:     ["hydrapeel","signaturefacial","fillme","fruitacid","liftsummere","antiagefacial","expressfacial","acnefacial"],
  makeup:   ["glammakeup","bridaltrial","bridalpackage","weddingguest"],
  browlash: ["browlift","hennabrows","lashlift","browtint","browshaping","lashtint","wenkbrauwontharing"],
  workshop: ["makeupworkshop","facialworkshop","tastingbasic","tastingadvanced","baristaworkshop","teambeauty","teamcoffee","cateye"]
};
const AVOID_ICONS = { feet:"🦶", hands:"💅", massage:"💆", waxing:"🪒", face:"🧖", makeup:"💄", browlash:"👁️", workshop:"☕" };

function matchTreatment(mood, gender, sunExposed, healthFlags, complaintText){
  healthFlags = healthFlags || {};
  const genderOk = (item) => item.genders.includes(gender);
  const sunOk = (item) => !sunExposed || !item.sunSensitive;
  const phlebitisOk = (item) => !healthFlags.phlebitis || !item.isMassage;
  const dietOk = (item) => !item.requiresDietExercise || healthFlags.dietExercise;
  const menstruationOk = (item) => !healthFlags.menstruation || !item.cuppingRelated;
  const pregnancyOk = (item) => !healthFlags.pregnant || !item.pregnancyUnsafe;
  const roaccutaneOk = (item) => !healthFlags.roaccutane || !item.waxing;
  const ageOk = (item) => (!item.minAge45 || healthFlags.age45Plus) && (!item.minAge30 || healthFlags.age30Plus);

  const currentHour = new Date().getHours();
  const timeOk = (item) => !(currentHour < 12 && item.timeOfDay === "pm");

  const currentMonth = new Date().getMonth() + 1; // 1-12
  const isSummer = currentMonth >= 6 && currentMonth <= 8; // Jun-Aug
  const seasonOk = (item) => !item.excludeSummer || !isSummer;
  const monthRangeOk = (item) => !item.monthRange || item.monthRange.includes(currentMonth);

  const avoid = Array.isArray(healthFlags.avoid) ? healthFlags.avoid : [];
  const avoidOk = (item) => !avoid.some(g => (AVOID_GROUPS[g] || []).includes(item.id));
  const allOk = (item) => avoidOk(item) && genderOk(item) && sunOk(item) && timeOk(item) && phlebitisOk(item) && dietOk(item) && menstruationOk(item) && pregnancyOk(item) && roaccutaneOk(item) && ageOk(item) && seasonOk(item) && monthRangeOk(item);

  let pool = TREATMENTS_CATALOG.filter(item => item.moods.includes(mood) && allOk(item));

  // Muscle pain / a lot of stress → steer toward cupping when it's available
  // for the chosen mood (cupping only fits "focus" and "relax" moods).
  if (healthFlags.musclePain){
    const cuppingPool = pool.filter(item => item.cuppingRelated);
    if (cuppingPool.length) pool = cuppingPool;
  }

  // Free-text complaint (optional) → narrow toward treatments matching
  // the keywords found, if any of those still fit the chosen mood.
  pool = boostByComplaint(pool, complaintText);

  // Business push: give massages, body peelings/wraps, and pedicure a much
  // higher chance of being recommended — and give the pigmentation-fading
  // peelings extra weight specifically outside the sunny summer months.
  if (pool.length){
    const weighted = [];
    pool.forEach(item => {
      weighted.push(item);
      if (item.promoted){ weighted.push(item); weighted.push(item); }
      if (item.seasonalBoost && !isSummer){ weighted.push(item); weighted.push(item); }
    });
    pool = weighted;
  }

  if (!pool.length){
    pool = TREATMENTS_CATALOG.filter(item => allOk(item) && SAFE_FALLBACK_IDS.includes(item.id));
  }
  if (!pool.length){
    pool = TREATMENTS_CATALOG.filter(item => avoidOk(item) && genderOk(item) && !item.sunSensitive && !item.isMassage);
  }
  if (!pool.length){
    pool = TREATMENTS_CATALOG.filter(item => genderOk(item) && !item.sunSensitive && !item.isMassage);
  }
  return pickRandom(pool);
}

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

/* ============================================================
   CURRENT ACTIONS (shown on the result screen, above "Praktisch")
   Add, edit or remove an entry here — nothing else needs to change.
   Optional: from / until as "YYYY-MM-DD". Outside that window the
   action hides itself automatically. Leave null for "no end date".
   ============================================================ */
const CURRENT_ACTIONS = [
  { id:"grabbelton", icon:"🎁", from:null, until:null,
    title:{ nl:"Grabbelton", en:"Lucky dip" },
    text:{ nl:"Besteed je €75 of meer tijdens dezelfde afspraak? Dan mag je één keer grabbelen in de grabbelton. Zolang de voorraad strekt.",
           en:"Spend €75 or more during the same appointment and you get one grab from the lucky dip. While stocks last." } }
];

/* ============================================================
   BOOKING SLOTS — chips shown above the booking buttons.
   Currently weekend only (also in the evening). Add or remove
   entries when your availability changes; (French text: lang-fr.js) the choice is added to the mail/WhatsApp text.
   ============================================================ */
const BOOKING_SLOTS = [
  { id:"za-vm", nl:"Zaterdag voormiddag", en:"Saturday morning" },
  { id:"za-nm", nl:"Zaterdag namiddag",   en:"Saturday afternoon" },
  { id:"za-av", nl:"Zaterdagavond",       en:"Saturday evening" },
  { id:"zo-vm", nl:"Zondag voormiddag",   en:"Sunday morning" },
  { id:"zo-av", nl:"Zondagavond",         en:"Sunday evening" }
];

/* ============================================================
   VERSION + SOCIAL MEDIA
   APP_VERSION is shown at the bottom of the app, so you can ask a client
   "which version do you see?". Raise it with every update (and the
   CACHE_NAME in sw.js too).
   SOCIAL_LINKS: leave a link "" to hide that button.
   ============================================================ */
const APP_VERSION = "v66 · 08/10/2026";
/* Newsletter: paste the address of the newsletter page on the WordPress
   site (the page with the Subscribe block), e.g.
   "https://sanmakeupstudio.wordpress.com/nieuwsbrief/".
   Filled in → the app sends people to that page (WordPress newsletter,
   they confirm by email). Left "" → old behaviour: a ready-made email. */
const NEWSLETTER_URL = "https://sanmakeupstudio.wordpress.com/nieuwsbrief/";
/* News card: shows the latest posts from the WordPress site in the app.
   site:     the WordPress.com address (no https://).
   category: "" = all posts; or a category slug, e.g. "weetjes".
   count:    how many posts to show (1–5).
   allUrl:   where "Alle berichten op de website" goes. The homepage is a
             static page, so this points to the overview of all posts.
   Set site to "" to hide the news card completely. */
const NEWS_FEED = {
  site: "sanmakeupstudio.wordpress.com",
  category: "",
  count: 3,
  allUrl: "https://sanmakeupstudio.wordpress.com/author/beautyglowbysandra/"
};
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/beauty_and_coffee_mechelen/",
  facebook: "https://www.facebook.com/profile.php?id=100071510416360"   // zakelijke pagina (niet het privéprofiel)
};

/* ============================================================
   STAMP CARD VIA QR (salon mode) — secured with a digital signature
   Open the app on your own phone with #salon at the end of the
   address. It shows a QR code that changes every 30 seconds; the
   client scans it in her app to get a stamp (max 1 per day).

   Only a phone that holds the PRIVATE salon key can make valid codes.
   That key is NOT in this public file: Sandra installs it once on her
   own phone with her personal salon link (see the separate, secret
   PDF). Here is only the PUBLIC key: with it every client's app can
   check that a QR really comes from the salon, but nobody can make
   one. Lost or leaked key? Ask for a new key pair: replace
   SALON_PUBLIC_KEY and install the new link on your phone.

   ADVENT_CODE_SECRET: check digits for the advent vouchers (stops
   typos and made-up codes; the real protection is Sandra's salon
   phone, which accepts every voucher only once).
   SALON_MODE_PIN: optional extra code asked before salon mode opens.
   ============================================================ */
const SALON_PUBLIC_KEY = { kty:"EC", crv:"P-256", x:"vzH_vQj12yo9Ph-G9J0bqD7vBWqI4_j0rcsuC_gvzgA", y:"t47ymdksQYYUf3-K39kVSY2GZIH2ZEvIFUKCs16LZg4" };
const ADVENT_CODE_SECRET = "96df64c53f6c1e4bad236a7260ee1b986d9e3952377171c4";
const SALON_MODE_PIN = "";

/* ============================================================
   ADVENT CALENDAR (1–25 December)
   - A door can only be opened ON its own day; a missed day stays closed.
   - Behind each door: one item from ADVENT.items — a small gift ("gift")
     or a voucher ("discount", only facial 10% / massage 15%).
   - The client shows the voucher in the salon; Sandra scans its QR in
     salon mode (#salon → "Advent"). Her phone remembers every scanned
     code, so each voucher works only once, and it allows at most
     maxGiftsPerClient gifts per client (= per phone).
   - LIVE SWITCH: live:false = the public sees NOTHING of the calendar
     until liveFrom (1 December: then it goes live by itself)
     (no card, no #advent link). Sandra tests with the private link
       https://beautyandcoffeemechelen.github.io/?voorproef=<previewKey>
     (a bar at the top lets her pick any day). Set live:true when OK.
   - Booking rules (dates counted from the day the door was opened):
       * every deadline ends on the SUNDAY evening of the week in which
         it falls (Sandra works on Saturday and Sunday);
       * every voucher: book the appointment WITH the code within
         bookWithinDays (3 weeks); the appointment itself may be up to
         useWithinDays (6 weeks) later; moving or cancelling the
         appointment = the voucher lapses (Sandra marks it in salon mode);
       * homemade:true products (short shelf life): the appointment
         itself must take place within homemadeDays (3 weeks).
     Gifts only with a treatment from giftMinSpend euro, discounts and
     extras on a treatment from discountMinSpend euro.
   - Types: "gift" (product), "discount" (% off), "extra" (a free add-on
     with a booked treatment, see "with").
   - stock on an ITEM = total number for all its doors together (e.g. 1
     gold mask); stock on a DOOR = max. for that door. null = no limit.
     The salon phone refuses a scan once the stock is used up.
   - soldOut: true on an item = sold out: clients see it on their voucher
     (after you upload data.js) and the salon phone refuses it.
   - photo: a cut-out product photo shown in the voucher's square.
   - cond (gifts): own condition instead of "a treatment from €giftMinSpend",
     e.g. the Guinot sample only with a booked facial-care workshop.
   - Salon products (type "extra"): the client sees only "highlights"
     (what's in it and what it's good for). The full "ingredients" list
     stays here for Sandra, for questions about allergies.
   - Per item: "use" = what it is / how to use it, "ingredients" = INCI
     list as on the packaging — one text, or { nl, en, fr } — ("" = not
     shown; then the app refers to the label on the product).
     The printed label/card with the product is what the law requires;
     the app only repeats it.
   ============================================================ */
const ADVENT = {
  live: false,                  // true = public right away (e.g. on 15/11 for the announcement)
  liveFrom: "2026-12-01",       // public automatically from this day, even if live is still false
  previewKey: "BC-XMAS-7Q4K",   // the private preview link: ?voorproef=BC-XMAS-7Q4K
  year: 2026,
  teaserFrom: "2026-11-15",     // from this day the start screen announces the calendar (when live)
  bookWithinDays: 21,           // book the appointment with the code within 3 weeks after opening
  useWithinDays: 42,            // the appointment takes place at the latest 6 weeks after opening
  homemadeDays: 21,             // homemade products: the appointment within 3 weeks (shelf life)
  giftMinSpend: 20,             // gifts: only with a treatment of at least €20
  maxGiftsPerClient: 1,         // 1 gift per client for the whole calendar (null = no limit)
  discountMinSpend: 60,         // discounts: only on a treatment from €60
  maxDiscountsPerClient: null,  // discounts per client (null = no limit; they are never combinable)
  maxExtrasPerClient: null,     // free extras per client (null = no limit; 1 per treatment)
  items: {
    lipbalm: { type:"gift", homemade:true, icon:"💋",
      nl:"Home made kokoslippenbalsem", en:"Home-made coconut lip balm", fr:"Baume à lèvres coco fait maison",
      use:{ nl:"Verzorgende lippenbalsem met bijenwas, sheaboter, kokos- en ricinusolie. Breng aan op je lippen wanneer ze droog aanvoelen.",
            en:"Nourishing lip balm with beeswax, shea butter, coconut and castor oil. Apply to your lips whenever they feel dry.",
            fr:"Baume nourrissant à la cire d'abeille, au beurre de karité et aux huiles de coco et de ricin. Appliquez sur les lèvres dès qu'elles sont sèches." },
      ingredients:"Cera Alba (Beeswax), Butyrospermum Parkii (Shea) Butter, Cocos Nucifera (Coconut) Oil, Ricinus Communis (Castor) Seed Oil, Tocopherol" },
    lipscrub: { type:"gift", homemade:true, icon:"🍯",
      nl:"Home made lipscrub", en:"Home-made lip scrub", fr:"Gommage lèvres fait maison",
      use:{ nl:"Lipscrub met suiker en kokosolie. Wrijf een beetje zacht over je lippen, veeg of spoel af en breng daarna lippenbalsem aan. Niet gebruiken op kloofjes of wondjes.",
            en:"Lip scrub with sugar and coconut oil. Gently rub a little over your lips, wipe or rinse off, then apply lip balm. Do not use on cracks or wounds.",
            fr:"Gommage au sucre et à l'huile de coco. Frottez doucement un peu de produit sur les lèvres, essuyez ou rincez, puis appliquez un baume. Ne pas utiliser sur des gerçures ou plaies." },
      ingredients:"Sucrose, Cocos Nucifera (Coconut) Oil" },
    guinot: { type:"gift", icon:"🧴",
      cond:{ nl:"een geboekte gelaatsverzorgingsworkshop", en:"a booked facial-care workshop", fr:"un atelier soin du visage réservé" },
      photo:"assets/advent/guinot.webp",
      nl:"Staaltje Guinot Éclat Parfait scrub", en:"Guinot Éclat Parfait scrub sample", fr:"Échantillon de gommage Guinot Éclat Parfait",
      use:{ nl:"Scrubcrème voor het gezicht met dubbele microkorrels (sheabutter). Breng aan op een gereinigde huid, masseer zacht met kleine cirkeltjes en spoel af met lauw water. Vermijd de oogcontour. Bevat zoete-amandelolie en parfum.",
            en:"Face exfoliating cream with double microbeads (shea). Apply to cleansed skin, massage gently in small circles and rinse with lukewarm water. Avoid the eye contour. Contains sweet almond oil and fragrance.",
            fr:"Crème exfoliante visage à double micrograins (karité). Appliquez sur peau nettoyée, massez doucement en petits cercles et rincez à l'eau tiède. Évitez le contour des yeux. Contient de l'huile d'amande douce et du parfum." },
      ingredients:"Water/Eau (Aqua), Isopropyl Palmitate, Glyceryl Stearate SE, Cetearyl Alcohol, C10-18 Triglycerides, Glycerin, Cellulose Acetate, Propanediol, Steareth-21, Pentylene Glycol, Decyl Glucoside, Butyrospermum Parkii (Shea) Butter Extract, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Cetearyl Glucoside, Tocopheryl Acetate, Fragrance (Parfum), Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Caprylyl Glycol, Xanthan Gum, Butylene Glycol, BHT, Disodium EDTA, Hexyl Cinnamal, Linalool, Benzyl Benzoate, Red 4 (CI 14700), Yellow 5 (CI 19140)" },
    eyeflash: { type:"gift", icon:"👁️",
      photo:"assets/advent/eyeflash.webp",
      nl:"Ampul Janssen Cosmetics Eye Flash Fluid", en:"Janssen Cosmetics Eye Flash Fluid ampoule", fr:"Ampoule Janssen Cosmetics Eye Flash Fluid",
      use:{ nl:"Hydraterend oogserum met hyaluronzuur en peptidecomplex (1,5 ml). Doe de ampul in een tissue en breek ze met een korte ruk open. Breng de inhoud voorzichtig aan rond de ogen en klop zacht in. Alleen uitwendig gebruik.",
            en:"Hydrating eye serum with hyaluronic acid and a peptide complex (1.5 ml). Place the ampoule in a tissue and break it open with one sudden movement. Gently apply around the eyes after cleansing and pat into the skin. For external use only.",
            fr:"Sérum contour des yeux hydratant à l'acide hyaluronique et complexe peptidique (1,5 ml). Tenez l'ampoule dans un mouchoir en papier et cassez l'extrémité d'un coup sec. Appliquez en douceur sur le contour des yeux nettoyé et faites pénétrer en tapotant. Usage externe uniquement." },
      ingredients:"Aqua (Water), Butylene Glycol, Glycerin, Pentylene Glycol, Xanthan Gum, Sodium Hyaluronate, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Carbomer, Coco-Glucoside, Trideceth-9, PEG-40 Hydrogenated Castor Oil, PEG-7 Glyceryl Cocoate, Tetrasodium Glutamate Diacetate, Propylene Glycol, Citric Acid, Sodium Hydroxide, Parfum (Fragrance), Phenoxyethanol, Sodium Benzoate, Sodium Lactate, CI 16035 (Red 40)" },
    bathsalt: { type:"gift", homemade:true, icon:"🛁",
      photo:"assets/advent/bathsalt.webp",
      nl:"Home made badzout lavendel", en:"Home-made lavender bath salts", fr:"Sels de bain lavande faits maison",
      use:{ nl:"Badzout met lavendel (blauw). Los een handvol op in warm badwater. Niet inslikken; buiten bereik van kinderen houden; vermijd contact met de ogen.",
            en:"Bath salts with lavender (blue). Dissolve a handful in warm bath water. Do not swallow; keep out of reach of children; avoid contact with the eyes.",
            fr:"Sels de bain à la lavande (bleus). Dissolvez une poignée dans l'eau chaude du bain. Ne pas avaler ; tenir hors de portée des enfants ; éviter le contact avec les yeux." },
      ingredients:"Sodium Bicarbonate, Magnesium Sulfate, Cocos Nucifera (Coconut) Oil, Lavandula Angustifolia (Lavender) Oil, Linalool*, Limonene*, CI 42090",
      ingredientsNote:{ nl:"* uit de etherische olie", en:"* from the essential oil", fr:"* issu de l'huile essentielle" } },
    bathsalt2: { type:"gift", homemade:true, icon:"🍊",
      photo:"assets/advent/bathsalt2.webp",
      nl:"Home made badzout mandarijn & lavendel", en:"Home-made mandarin & lavender bath salts", fr:"Sels de bain mandarine & lavande faits maison",
      use:{ nl:"Badzout met mandarijn en lavendel. Los een handvol op in warm badwater. Niet inslikken; buiten bereik van kinderen houden; vermijd contact met de ogen.",
            en:"Bath salts with mandarin and lavender. Dissolve a handful in warm bath water. Do not swallow; keep out of reach of children; avoid contact with the eyes.",
            fr:"Sels de bain à la mandarine et à la lavande. Dissolvez une poignée dans l'eau chaude du bain. Ne pas avaler ; tenir hors de portée des enfants ; éviter le contact avec les yeux." },
      ingredients:"Sodium Bicarbonate, Magnesium Sulfate, Cocos Nucifera (Coconut) Oil, Citrus Reticulata (Mandarin Orange) Peel Oil, Lavandula Angustifolia (Lavender) Oil, Limonene*, Linalool*, CI 19140, CI 75470",
      ingredientsNote:{ nl:"* uit de etherische oliën", en:"* from the essential oils", fr:"* issu des huiles essentielles" } },
    spoolie: { type:"gift", icon:"🖌️",
      photo:"assets/advent/spoolie.webp",
      nl:"Mascaraborsteltje", en:"Mascara wand", fr:"Goupillon à mascara",
      use:{ nl:"Om je wimpers en wenkbrauwen mooi in model te kammen. Persoonlijk gebruik.", en:"To comb your lashes and brows into shape. For personal use.", fr:"Pour peigner cils et sourcils. Usage personnel." },
      ingredients:"", noIngredients:true },
    buffer: { type:"gift", icon:"💅",
      photo:"assets/advent/buffer.webp",
      nl:"Mini buffervijltje voor de nagels", en:"Mini nail buffer", fr:"Mini polissoir à ongles",
      use:{ nl:"Om je nagels glad te vijlen en te laten glanzen. Werk in één richting. Persoonlijk gebruik — niet delen.", en:"To smooth your nails and make them shine. Work in one direction. For personal use — do not share.", fr:"Pour lisser et faire briller les ongles. Travaillez dans un seul sens. Usage personnel — ne pas partager." },
      ingredients:"", noIngredients:true },
    eraser: { type:"gift", icon:"✏️",
      photo:"assets/advent/eraser.webp",
      nl:"Magic Eraser – correctiestift voor nagellak", en:"Magic Eraser – nail polish corrector pen", fr:"Magic Eraser – stylo correcteur de vernis",
      use:{ nl:"Veeg foutjes van nagellak langs je nagelriem weg met de punt van de stift. Niet in de ogen of op wondjes.", en:"Wipe away nail polish mistakes along the cuticle with the tip of the pen. Keep away from eyes and wounds.", fr:"Effacez les débordements de vernis le long des cuticules avec la pointe du stylo. Éviter les yeux et les plaies." },
      ingredients:"", ingrOnPack:true },
    // not behind a door at the moment (no original packaging/label left)
    clay: { type:"gift", icon:"🏺",
      nl:"Rood kleimasker uit Marokko", en:"Red Moroccan clay mask", fr:"Masque à l'argile rouge du Maroc",
      use:{ nl:"Meng een theelepel klei met wat water tot een smeuïge pasta. Breng aan op een gereinigde huid (niet rond de ogen), laat ± 10 minuten werken en spoel af met lauw water voor de klei helemaal uitdroogt.",
            en:"Mix a teaspoon of clay with a little water into a smooth paste. Apply to cleansed skin (not around the eyes), leave on for about 10 minutes and rinse with lukewarm water before it dries completely.",
            fr:"Mélangez une cuillère à café d'argile avec un peu d'eau pour obtenir une pâte lisse. Appliquez sur peau nettoyée (pas autour des yeux), laissez poser environ 10 minutes et rincez à l'eau tiède avant séchage complet." },
      ingredients:"" },
    // ---- free extras with a booked treatment (valid discountDays) ----
    led: { type:"extra", icon:"💡", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      photo:"assets/advent/led.webp", product:"LED-lichttunnel",
      highlights:{ nl:"10 minuten in de LED-lichttunnel, afgestemd op jouw huid. <b>Rood</b>: stimuleert collageen en celvernieuwing — anti-aging, minder rimpels. <b>Groen</b>: vermindert roodheid. <b>Blauw</b>: zuiverend bij onzuiverheden en acné. <b>Oranje</b>: revitaliserend, voor een elastischere huid.",
                   en:"10 minutes in the LED light tunnel, matched to your skin. <b>Red</b>: stimulates collagen and cell renewal — anti-ageing, fewer wrinkles. <b>Green</b>: reduces redness. <b>Blue</b>: purifying for blemishes and acne. <b>Orange</b>: revitalising, for more elastic skin.",
                   fr:"10 minutes dans le tunnel de lumière LED, adapté à votre peau. <b>Rouge</b> : stimule le collagène et le renouvellement cellulaire — anti-âge, moins de rides. <b>Vert</b> : atténue les rougeurs. <b>Bleu</b> : purifiant pour les imperfections et l'acné. <b>Orange</b> : revitalisant, pour une peau plus élastique." },
      nl:"Gratis 10 min LED-lichttherapie", en:"Free 10-min LED light therapy", fr:"10 min de luminothérapie LED offertes" },
    handspa: { type:"extra", icon:"🤲", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      nl:"Gratis handpeeling & -massage", en:"Free hand peeling & massage", fr:"Gommage & massage des mains offerts" },
    hotstoneface: { type:"extra", icon:"🪨", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      nl:"Gratis Hot Stone gelaatsmassage", en:"Free Hot Stone facial massage", fr:"Massage visage aux pierres chaudes offert" },
    facecupping: { type:"extra", icon:"✨", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      nl:"Gratis liftende cuppingmassage voor het gelaat", en:"Free lifting cupping facial massage", fr:"Massage liftant aux ventouses du visage offert" },
    peelanti: { type:"extra", icon:"🌟", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met kaviaarextract, hamamelis, lavendel en collageen — verstevigt en geeft de rijpere huid een frisse, gladde uitstraling.", en:"With caviar extract, witch hazel, lavender and collagen — firms and gives mature skin a fresh, smooth look.", fr:"À l'extrait de caviar, à l'hamamélis, à la lavande et au collagène — raffermit et donne aux peaux matures un aspect frais et lisse." },
      photo:"assets/advent/algo-age.webp", product:"Bio Balance Algoherbal Ageing (poedermasker + Essence Gel)",
      ingredients:"Poeder (Lavender): Zea Mays (Corn) Starch, Algin, Calcium Sulfate, Glucose, Magnesium Carbonate, Lavandula Angustifolia (Lavender) Flower, Sodium Phosphate, CI 42090, Lavandula Angustifolia (Lavender) Oil. — Essence Gel (Lavender & Caviar): Aqua, Butylene Glycol, Aloe Barbadensis Extract, Glycerin, Caviar Extract, Hamamelis Virginiana Extract, Lavandula Angustifolia Extract, Carbomer, Triethanolamine, Hyaluronic Acid, Hydrolyzed Collagen, Allantoin, PEG-40 Hydrogenated Castor Oil, Parfum, CI 42090, Phenoxyethanol, Limonene, Linalool, Geraniol, Alpha-Isomethyl Ionone, CI 16035",
      nl:"Gratis anti-aging peel-off masker", en:"Free anti-ageing peel-off mask", fr:"Masque peel-off anti-âge offert" },
    peelsens: { type:"extra", icon:"🌹", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met rozenblaadjes, rozenolie, aloë vera, komkommer en hyaluronzuur — kalmeert, hydrateert en verzacht de gevoelige huid.", en:"With rose petals, rose oil, aloe vera, cucumber and hyaluronic acid — calms, hydrates and softens sensitive skin.", fr:"Aux pétales de rose, à l'huile de rose, à l'aloe vera, au concombre et à l'acide hyaluronique — apaise, hydrate et adoucit les peaux sensibles." },
      photo:"assets/advent/algo-sens.webp", product:"Bio Balance Algoherbal Sensitive – Rose (poedermasker + Essence Gel)",
      ingredients:"Poeder (Rose): Zea Mays (Corn) Starch, Algin, Calcium Sulfate, Glucose, Magnesium Carbonate, Rosa Centifolia Flower, Sodium Phosphate, CI 16035, Rosa Rugosa Flower Oil. — Essence Gel (Rose): Aqua, Butylene Glycol, Aloe Barbadensis Extract, Glycerin, Cucumis Sativus Fruit Extract, Hydrolyzed Collagen, Carbomer, Triethanolamine, PEG-40 Hydrogenated Castor Oil, Hyaluronic Acid, Parfum, Disodium EDTA, Phenoxyethanol, Limonene, Linalool, Alpha-Isomethyl Ionone, CI 16035",
      nl:"Gratis rozen peel-off masker voor de gevoelige huid", en:"Free rose peel-off mask for sensitive skin", fr:"Masque peel-off à la rose pour peaux sensibles offert" },
    collagen: { type:"extra", icon:"🫧", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met marien collageen en haver — liftend en verstevigend, voor een zichtbaar gladdere huid.", en:"With marine collagen and oat — lifting and firming, for visibly smoother skin.", fr:"Au collagène marin et à l'avoine — liftant et raffermissant, pour une peau visiblement plus lisse." },
      photo:"assets/advent/collagen.webp", product:"Bio Balance Super Collageen Gelmasker Lifting",
      ingredients:"Aqua, Soluble Collagen, Propanediol, Phenoxyethanol, Avena Sativa (Oat) Kernel Extract, Carbomer, Caprylyl Glycol, Sodium Hydroxide, Disodium EDTA, Sodium Benzoate",
      nl:"Gratis collageenvliesmasker", en:"Free collagen sheet mask", fr:"Masque en tissu au collagène offert" },
    goldmask: { type:"extra", icon:"👑", stock:1, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met collageen, hyaluronzuur, centella en groene thee — hydrateert en geeft een stralende, frisse look.", en:"With collagen, hyaluronic acid, centella and green tea — hydrates and gives a radiant, fresh look.", fr:"Au collagène, à l'acide hyaluronique, à la centella et au thé vert — hydrate et donne un teint frais et éclatant." },
      photo:"assets/advent/goldmask.webp", product:"Gold Bio-Collagen Facial Mask",
      ingredients:"Aqua, Glycerin, Xanthan Gum, Mica, Chondrus Crispus Powder, Titanium Dioxide, Chlorphenesin, …, Methylparaben, Potassium Chloride, Sodium Hyaluronate, Hydrolyzed Collagen, Butylene Glycol, Centella Asiatica Extract, Polygonum Cuspidatum Root Extract, Scutellaria Baicalensis Root Extract, Camellia Sinensis Leaf Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Chamomilla Recutita (Matricaria) Flower Extract, Rosmarinus Officinalis (Rosemary) Leaf Extract, Iron Oxides, Citric Acid, Potassium Citrate, PEG-40 Hydrogenated Castor Oil, …",
      ingredientsNote:{ nl:"… = onleesbaar op de verpakking; volledige lijst op de verpakking in het salon", en:"… = unreadable on the pack; full list on the pack in the salon", fr:"… = illisible sur l'emballage ; liste complète sur l'emballage au salon" },
      nl:"Gratis gouden collageenmasker", en:"Free gold collagen mask", fr:"Masque au collagène doré offert" },
    spamani: { type:"extra", icon:"💅", with:{ nl:"manicure", en:"manicure", fr:"manucure" },
      nl:"Gratis SPA manicure", en:"Free SPA manicure", fr:"Manucure SPA offerte" },
    spapedi: { type:"extra", icon:"🦶", with:{ nl:"pedicure", en:"pedicure", fr:"pédicure" },
      nl:"Gratis SPA pedicure", en:"Free SPA pedicure", fr:"Pédicure SPA offerte" },
    // ---- more salon products ----
    luminoclear: { type:"extra", icon:"✨", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met vitamine C, melkzuur (AHA), witte lelie en berendruif — voor een egalere, stralende teint bij pigmentvlekjes.", en:"With vitamin C, lactic acid (AHA), white lily and bearberry — for a more even, radiant complexion with pigment spots.", fr:"À la vitamine C, à l'acide lactique (AHA), au lys blanc et à la busserole — pour un teint plus uniforme et éclatant en cas de taches pigmentaires." },
      photo:"assets/advent/luminoclear.webp", product:"Bio Balance LuminoClear BioCell Mask (Pigment, met AHA)",
      nl:"Gratis LuminoClear biocellulosemasker (pigmentvlekjes)", en:"Free LuminoClear biocellulose mask (pigmentation)", fr:"Masque biocellulose LuminoClear offert (taches pigmentaires)",
      ingredients:"Aqua (Water), Propylene Glycol, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, Sodium Ascorbyl Phosphate, Sodium Stearoyl Glutamate, Lactic Acid, Parfum (Fragrance), Sodium Benzoate, 1,2-Hexanediol, Caprylyl Glycol, Xanthan Gum, Lilium Candidum Leaf Cell Extract, Sodium Phytate, Helianthus Annuus (Sunflower) Seed Oil, Linalool, Arctostaphylos Uva Ursi Leaf Extract, Geraniol, Citronellol, Limonene" },
    peelblueberry: { type:"extra", icon:"🫐", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met bosbes, vitamine C en kamilleolie — een kalmerend algenmasker voor de gevoelige huid.", en:"With bilberry, vitamin C and chamomile oil — a soothing seaweed mask for sensitive skin.", fr:"À la myrtille, à la vitamine C et à l'huile de camomille — un masque aux algues apaisant pour les peaux sensibles." },
      product:"Bio Balance Peel-Off Algenmasker Bosbessen (Sensitive)",
      nl:"Gratis kalmerend bosbessen peel-off masker", en:"Free soothing blueberry peel-off mask", fr:"Masque peel-off apaisant à la myrtille offert",
      ingredients:"Diatomaceous Earth, Algin, Calcium Sulfate, Tetrasodium Pyrophosphate, Sodium Ascorbate, Maltodextrin, Vaccinium Myrtillus Fruit Extract, Ormenis Multicaulis Oil, Limonene" },
    facial10: { type:"discount", icon:"🧖", value:"10%",
      nl:"10% korting op een gelaatsverzorging", en:"10% off a facial", fr:"10 % de réduction sur un soin du visage",
      treat:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" } },
    massage15: { type:"discount", icon:"💆", value:"15%",
      nl:"15% korting op een massage", en:"15% off a massage", fr:"15 % de réduction sur un massage",
      treat:{ nl:"massage", en:"massage", fr:"massage" } }
  },
  doors: [
    { day:1,  item:"lipbalm",       stock:null },
    { day:2,  item:"led",           stock:null },
    { day:3,  item:"bathsalt",      stock:null },
    { day:4,  item:"handspa",       stock:null },
    { day:5,  item:"spoolie",       stock:null },
    { day:6,  item:"facial10",      stock:null },
    { day:7,  item:"eyeflash",      stock:null },
    { day:8,  item:"peelsens",      stock:null },
    { day:9,  item:"bathsalt2",     stock:null },
    { day:10, item:"hotstoneface",  stock:null },
    { day:11, item:"massage15",     stock:null },
    { day:12, item:"buffer",        stock:null },
    { day:13, item:"facecupping",   stock:null },
    { day:14, item:"guinot",        stock:null },
    { day:15, item:"spamani",       stock:null },
    { day:16, item:"peelblueberry", stock:null },
    { day:17, item:"lipscrub",      stock:null },
    { day:18, item:"peelanti",      stock:null },
    { day:19, item:"eraser",        stock:null },
    { day:20, item:"massage15",     stock:null },
    { day:21, item:"collagen",      stock:null },
    { day:22, item:"spapedi",       stock:null },
    { day:23, item:"luminoclear",   stock:null },
    { day:24, item:"goldmask",      stock:null },
    { day:25, item:"massage15",     stock:null }
  ]
};

/* TEST-PHASE RESET: change this text (e.g. to "launch-2026-11") when the
   app officially starts. The next time any phone opens the app, its stamps,
   discoveries, favourites and last match are wiped once — so test data from
   the test phase disappears everywhere. */
const DATA_RESET_VERSION = "test-2026-10";

/* Reward for a full stamp card (10 stamps). Change the text freely;
   validMonths = how long after the 10th stamp the reward can be used. */
const STAMP_REWARD = {
  nl: "10% korting op je volgende behandeling",
  en: "10% off your next treatment",
  fr: "10 % de réduction sur votre prochain soin",
  validMonths: 3
};

/* ============================================================
   PRICE LIST (tab "Prijslijst") — prices as on the website
   "Vanaf 1/06/2026", plus the cupping treatments.
   Fields per item: n = name, d = short description (optional),
   time, price, note (optional). Everything is bilingual (nl/en).
   ============================================================ */
function PI(nl, en, time, price, dnl, den, nnl, nen){
  return { n:{nl, en}, d: dnl ? {nl:dnl, en:den} : null, time, price, note: nnl ? {nl:nnl, en:nen} : null };
}
const PRICE_LIST = [
  { id:"facial", icon:"🌿", title:{ nl:"Gelaatsverzorging", en:"Facials" }, items:[
    PI("Express gelaatsverzorging","Express facial","30′","€60","Reiniging, dieptereiniging, crèmemasker & dagcrème.","Cleansing, deep cleansing, cream mask & day cream."),
    PI("Acnécontrole – Équilibre Pureté Citron Vert","Acne control – Équilibre Pureté Citron Vert","60′","€65","Zuiverende behandeling, met huidanalyse bij de eerste behandeling.","Purifying treatment, with skin analysis at the first treatment."),
    PI("Signature gelaatsverzorging","Signature facial","75′","€85","Uitgebreide verzorging met massage; ook voor gevoelige huid.","Full facial with massage; also suitable for sensitive skin."),
    PI("Fill Me Micro Infusie Treatment","Fill Me Micro Infusion Treatment","45–60′","€99","Cleanser, tonic, Fill Me Serum, masker, LED-masker & UV-bescherming.","Cleanser, tonic, Fill Me Serum, mask, LED mask & UV protection."),
    PI("Fruitzurenpeeling 4/26 Dr. Renaud","Fruit acid peel 4/26 Dr. Renaud","75′","€100","Voor een egalere teint. Enkel van september tot maart.","For a more even skin tone. Only from September to March."),
    PI("Huidvernieuwende Hydra Peeling pH","Skin-renewing Hydra Peeling pH","90′","€100","Voor een frisse uitstraling en een egalere teint.","For a fresh glow and a more even skin tone."),
    PI("Lift Summum","Lift Summum","70′","€120","Voor een strakker ogende huid, met massage en gelaatsmasker.","For firmer-looking skin, with massage and face mask."),
    PI("Botanische Anti-Age","Botanical Anti-Age","90′","€125","Verzorgende anti-age behandeling met ampul, massage en masker.","Anti-age care with ampoule, massage and mask.")
  ]},
  { id:"facial-extra", icon:"✨", title:{ nl:"Extra’s bij je gelaatsverzorging", en:"Facial add-ons" }, items:[
    PI("Handpeeling & -massage","Hand peeling & massage","10′","€10"),
    PI("LED-therapie","LED therapy","10′","€10"),
    PI("Ontharing wenkbrauwen","Eyebrow hair removal","15′","€15"),
    PI("Ampul / serum","Ampoule / serum","5′","€5"),
    PI("Peel-off masker","Peel-off mask","20′","€15"),
    PI("Collageenvliesmasker","Collagen sheet mask","20′","€20"),
    PI("Anti-aging paraffinemasker","Anti-aging paraffin mask","30′","€20"),
    PI("Hot Stone gelaatsmassage","Hot Stone facial massage","20′","€20"),
    PI("Touch-up dagmake-up na gelaatsverzorging","Day make-up touch-up after facial","25′","€25")
  ]},
  { id:"makeup", icon:"💄", title:{ nl:"Visagie (minerale / HD make-up)", en:"Make-up (mineral / HD)" }, items:[
    PI("Touch-up dagmake-up na gelaatsverzorging","Day make-up touch-up after facial","25′","€25"),
    PI("Avondmake-up / Party / Glam","Evening / Party / Glam make-up","60′","€60",null,null,"Valse wimpers? Breng zelf wimpers en wimperlijm mee; ik breng ze aan.","False lashes? Bring your own lashes and lash glue; I'll apply them."),
    PI("Bridal proefmake-up","Bridal trial make-up","60′","€65"),
    PI("Bridal proefmake-up & bruidsmake-up","Bridal trial & wedding-day make-up","2×60′","€135"),
    PI("Huwelijksdag make-up, per persoon","Wedding-day make-up, per person","30′","€40")
  ]},
  { id:"brows", icon:"🪮", title:{ nl:"Brows (wenkbrauwen)", en:"Brows" }, items:[
    PI("Brow Tinting (kleuren haar)","Brow tinting (hair colour)","15′","€20"),
    PI("Shaping (mappen en ontharen)","Shaping (mapping & hair removal)","20′","€25"),
    PI("Henna Brows","Henna Brows","60′","€50","Mappen, shapen, kleuren van haar en huid; tot 6 weken.","Mapping, shaping, colouring hair and skin; up to 6 weeks."),
    PI("Brow Lift","Brow Lift","75′","€75","Mappen, shapen, lamineren, kleuren van haar en huid; tot 6 weken.","Mapping, shaping, lamination, colouring hair and skin; up to 6 weeks.")
  ]},
  { id:"lashes", icon:"👁️", title:{ nl:"Lashes (wimpers)", en:"Lashes" }, items:[
    PI("Lash Tinting (kleuren wimpers)","Lash tinting","15′","€20"),
    PI("Lash Lift met kleuring","Lash Lift with tint","75′","€75",null,null,"Tot 6 weken.","Up to 6 weeks.")
  ]},
  { id:"manicure", icon:"💅", title:{ nl:"Manicure (handverzorging)", en:"Manicure" }, items:[
    PI("Express manicure","Express manicure","30′","€30","Knippen, vijlen, nagelriemen & verzorgende handcrème.","Trimming, filing, cuticles & nourishing hand cream."),
    PI("Uitgebreide manicure","Full manicure","60′","€35","Knippen, vijlen, nagelriemen, polijsten, eelt & massage.","Trimming, filing, cuticles, buffing, hard skin & massage."),
    PI("Kindermanicure","Children’s manicure","20′","€20","Vijlen en kindernagellak of peel-off.","Filing and children’s nail polish or peel-off."),
    PI("Supplement SPA manicure","Add-on: SPA manicure","30′","€30","Peeling, masker, pakking, massage & verzorging.","Peeling, mask, wrap, massage & care."),
    PI("Supplement verwijderen nagellak / gellak / BIAB","Add-on: removal of polish / gel / BIAB","40′","€20"),
    PI("Supplement nagellak","Add-on: nail polish","30′","€5"),
    PI("Supplement gellak (soak-off)","Add-on: gel polish (soak-off)","30′","€20"),
    PI("Supplement BIAB (soak-off)","Add-on: BIAB (soak-off)","45′","€25")
  ]},
  { id:"pedicure", icon:"🦶", title:{ nl:"Pedicure (voetverzorging)", en:"Pedicure" }, items:[
    PI("Express pedicure","Express pedicure","30′","€30","Knippen, vijlen, nagelwalreiniging & voetencrème (zonder eeltverwijdering, zonder massage).","Trimming, filing, nail-fold cleaning & foot cream (no hard-skin removal, no massage)."),
    PI("Uitgebreide pedicure","Full pedicure","60′","€35","Knippen, vijlen, nagelwalreiniging, nagelriemen, normale eeltverwijdering & korte voetenmassage.","Trimming, filing, nail-fold cleaning, cuticles, standard hard-skin removal & short foot massage.","+ €10 per extra 15′ bij overmatige eeltbehandeling.","+ €10 per extra 15′ for heavy hard-skin treatment."),
    PI("Supplement ingegroeide nagel / copoline, per nagel","Add-on: ingrown nail / copoline, per nail","+10′","€5","Plaatsen van een copoline-verband in de nagelwal.","Placing a copoline bandage in the nail fold."),
    PI("Supplement drukvrij leggen / foambescherming, per teen","Add-on: pressure relief / foam protection, per toe","5′","€2,50","Een zacht foambeschermbuisje om wrijving en druk van de schoen te verlichten.","A soft foam tube to relieve friction and pressure from the shoe."),
    PI("Supplement SPA pedicure","Add-on: SPA pedicure","+30′","€30","Peeling, masker, pakking, uitgebreide massage.","Peeling, mask, wrap, extended massage."),
    PI("Supplement nagellak","Add-on: nail polish","30′","€5"),
    PI("Supplement gellak (soak-off)","Add-on: gel polish (soak-off)","45′","€20"),
    PI("Supplement verwijderen nagellak / gellak","Add-on: removal of polish / gel","40′","€20")
  ]},
  { id:"waxing", icon:"🌸", title:{ nl:"Ontharing (waxen / threading / epileren)", en:"Hair removal (waxing / threading / tweezing)" }, items:[
    PI("Kin","Chin","10′","€10"),
    PI("Bovenlip","Upper lip","10′","€10"),
    PI("Wenkbrauwen (zonder mapping / opschonen)","Eyebrows (no mapping / tidy-up)","20′","€15"),
    PI("Oksels","Underarms","20′","€15"),
    PI("Schouders","Shoulders","25′","€15"),
    PI("Buik","Stomach","45′","€20"),
    PI("Borst","Chest","45′","€25"),
    PI("Onderbenen","Lower legs","20′","€30"),
    PI("Onderbenen & knieën","Lower legs & knees","35′","€40"),
    PI("Rug","Back","60′","€40"),
    PI("Borst & buik","Chest & stomach","90′","€40"),
    PI("Volledige benen","Full legs","60′","€50")
  ]},
  { id:"body", icon:"🤍", title:{ nl:"Lichaamsverzorging & massage", en:"Body care & massage" }, items:[
    PI("Cuppingmassage","Cupping massage","60′","€60","Gerichte cuppingmassage op specifieke zones.","Targeted cupping massage on specific zones."),
    PI("Cupping Body Renewal","Cupping Body Renewal","120′","€120","Peeling, Thermo Body Pack en cupping voor één lichaamszone per sessie.","Peeling, Thermo Body Pack and cupping for one body zone per session."),
    PI("Zweedse full body massage","Swedish full body massage","60′","€70","Relaxerend en spierversoepelend.","Relaxing and muscle-softening."),
    PI("Zweedse rug-nek-schouder massage","Swedish back-neck-shoulder massage","30′","€40","Bij stress en verkrampte spieren.","For stress and tense muscles."),
    PI("Zweedse benen-voeten massage","Swedish legs-feet massage","30′","€40","Bij vermoeide benen.","For tired legs."),
    PI("Hot Stone Massage","Hot Stone Massage","90′","€90","Diepe relaxatie met warme stenen.","Deep relaxation with warm stones."),
    PI("Afslankingsmassage","Slimming massage","60′","€55","Stimulerende massage, aanvullend bij gezonde voeding en beweging (ook voor mannen).","Stimulating massage, complementary to healthy eating and exercise (men welcome too)."),
    PI("Zuiverende rugbehandeling","Purifying back treatment","60′","€70","Dieptereiniging, pakking en anti-stressmassage.","Deep cleansing, wrap and anti-stress massage."),
    PI("Harmoniserende verzorging rug","Harmonising back care","30′","€35","Peeling en massage voor een zachte, gladde huid.","Peeling and massage for soft, smooth skin."),
    PI("Harmoniserende verzorging full body","Harmonising full body care","70′","€70","Peeling en massage voor een zachte, gladde huid.","Peeling and massage for soft, smooth skin."),
    PI("Energetische rugpakking","Energising back wrap","60′","€65","Verfrissende peeling, algenpakking en massage.","Refreshing peeling, seaweed wrap and massage."),
    PI("Energetische lichaamspakking full body","Energising full body wrap","120′","€110","Verfrissende peeling, algenpakking en massage.","Refreshing peeling, seaweed wrap and massage.")
  ]},
  { id:"workshops", icon:"☕", title:{ nl:"Beauty & Koffie workshops", en:"Beauty & Coffee workshops" },
    note:{ nl:"Minstens 1 week op voorhand inschrijven. Inclusief gebruik van alle professionele materialen, specialty coffee/thee/matcha & verse verwennerij.",
           en:"Please register at least 1 week in advance. Includes use of all professional materials, specialty coffee/tea/matcha & fresh treats." },
    items:[
    PI("Teambuilding Beauty & Pamper Experience","Team building Beauty & Pamper Experience","","€275",
       "Uitgebreide workshop naar keuze (gelaatsverzorging met make-up touch-up, beauty make-up of threading), specialty coffee bar, welkomstdrankje, zoete en hartige hapjes, affogato (vanille-ijs met espresso of matcha) en een luxe attentie voor elke deelnemer.",
       "Extended workshop of your choice (facial with make-up touch-up, beauty make-up or threading), specialty coffee bar, welcome drink, sweet and savoury bites, affogato (vanilla ice cream with espresso or matcha) and a luxury gift for every participant.",
       "Per groep, max. 4 deelnemers","Per group, max. 4 participants"),
    PI("Teambuilding Specialty Coffee Experience","Team building Specialty Coffee Experience","","€295",
       "Uitgebreide koffieworkshop naar keuze (Specialty Koffieproeverij Basis of Verdiepend), specialty coffee bar, welkomstdrankje, zoete en hartige hapjes en affogato (vanille-ijs met espresso of matcha).",
       "Extended coffee workshop of your choice (Specialty Coffee Tasting Basic or Advanced), specialty coffee bar, welcome drink, sweet and savoury bites and affogato (vanilla ice cream with espresso or matcha).",
       "Per groep, max. 4 deelnemers","Per group, max. 4 participants"),
    PI("Beauty & Skincare Workshop","Beauty & Skincare Workshop","75′","€75",
       "Gelaatsverzorging, beauty make-up of threading. Ontdek welke technieken en producten jouw huid doen stralen, met persoonlijk advies, alle materialen, specialty coffee, thee en lekkernijen.",
       "Facial care, beauty make-up or threading. Discover which techniques and products make your skin glow, with personal advice, all materials, specialty coffee, tea and treats.",
       "Privé 1 op 1: €75 · Duo: €65 p.p. · 3–4 personen: €55 p.p.","Private 1-to-1: €75 · Duo: €65 p.p. · 3–4 people: €55 p.p."),
    PI("Cat Eye & Magnetische Gellak Manicure Workshop","Cat Eye & Magnetic Gel Polish Manicure Workshop","90–120′","€85",
       "Leer zelf een prachtig magnetisch ‘Cat Eye’-effect op je nagels maken. Inclusief alle professionele lakken, magneten en UV/LED-lampen, plus specialty coffee/thee en huisgemaakte zoetigheden.",
       "Learn to create a beautiful magnetic ‘cat eye’ effect on your nails. Includes all professional polishes, magnets and UV/LED lamps, plus specialty coffee/tea and homemade sweets.",
       "Privé 1 op 1: €85 · Duo: €75 p.p. · Max. 2 deelnemers. Je nagels moeten bij aanvang volledig vrij zijn van lak, gellak of gelnagels.",
       "Private 1-to-1: €85 · Duo: €75 p.p. · Max. 2 participants. Your nails must be completely free of polish, gel polish or gel nails at the start."),
    PI("Koffieproeverij Basis","Coffee tasting – Basic","120′","€60 – €85 p.p.",
       "Ontdek koffiearoma’s, het verhaal van boon tot specialty coffee en vergelijk en beoordeel meerdere koffies. Inclusief koffie/thee of water.",
       "Discover coffee aromas, the story from bean to specialty coffee, and compare and rate several coffees. Includes coffee/tea or water.",
       "Duo: €85 p.p. · 3–4 personen: €60 p.p.","Duo: €85 p.p. · 3–4 people: €60 p.p."),
    PI("Koffieproeverij Verdiepend","Coffee tasting – Advanced","180′","€65 – €95 p.p.",
       "Meer over verwerkingsprocessen, variëteiten, omgevingsfactoren, brandprofielen en smaken. Inclusief koffie/thee of water.",
       "More on processing methods, varieties, growing conditions, roast profiles and flavours. Includes coffee/tea or water.",
       "Duo: €95 p.p. · 3–4 personen: €65 p.p.","Duo: €95 p.p. · 3–4 people: €65 p.p."),
    PI("Barista Privéworkshop","Barista Private Workshop","120′","€175",
       "Zet thuis zelf espresso’s, espresso-afgeleiden en slow coffees met een V60, French Press, Phin of Mokapot. Inclusief koffie/thee of water en een leuke attentie.",
       "Learn to make espressos, espresso-based drinks and slow coffees at home with a V60, French Press, Phin or Moka pot. Includes coffee/tea or water and a nice little gift.",
       "Privé 1 op 1","Private 1-to-1")
  ]}
];

/* ============================================================
   HOUSE RULES (screen "Huisregels") — taken from the website.
   Structure: sections → groups → items. Every text is bilingual
   (nl/en); French lives in lang-fr.js. Home-visit clauses are left
   out on purpose while home visits are paused.
   ============================================================ */
function R(nl, en){ return { nl, en }; }
const HOUSE_RULES = [
  { id:"appointments", icon:"📅", title:R("Afspraken en annuleringen","Appointments and cancellations"), intro:null, outro:null,
    groups:[{ title:null, items:[
      R("Afspraken worden enkel telefonisch, persoonlijk of via e-mail vastgelegd.","Appointments are only made by phone, in person or by email."),
      R("Annuleren of verplaatsen kan tot 1 uur vooraf via 0499 22 19 01.","You can cancel or reschedule up to 1 hour in advance via 0499 22 19 01."),
      R("Bij annulatie minder dan 1 uur op voorhand wordt 50% van de behandeling aangerekend, tenzij bij ziekte (zie hieronder).","If you cancel less than 1 hour in advance, 50% of the treatment is charged, except in case of illness (see below)."),
      R("Na 3 keer niet opdagen is het niet meer mogelijk om een afspraak te maken bij Beauty & Coffee.","After 3 no-shows it is no longer possible to make an appointment at Beauty & Coffee."),
      R("Bij ziekte: verwittig zo snel mogelijk. Annuleer je minstens 1 uur vóór de afspraak, dan worden er geen kosten aangerekend. Bij laattijdige annulatie geldt de 50%-regel.","In case of illness: let me know as soon as possible. If you cancel at least 1 hour before the appointment, no costs are charged. For late cancellations the 50% rule applies."),
      R("Kom op tijd. Te laat? Verwittig meteen per telefoon of sms. Bij meer dan 15 minuten vertraging kan de behandeling ingekort of geannuleerd worden tegen de annulatiekost.","Please be on time. Running late? Let me know immediately by phone or text. With more than 15 minutes delay the treatment may be shortened or cancelled, subject to the cancellation fee."),
      R("Bij wanbetaling is het niet meer mogelijk om een afspraak te maken bij Beauty & Coffee.","In case of non-payment it is no longer possible to make an appointment at Beauty & Coffee.")
    ]}] },
  { id:"parking", icon:"🚗", title:R("Bereikbaarheid en parkeren","Getting here and parking"), intro:null, outro:null,
    groups:[{ title:null, items:[
      R("Kom je met de auto? Parkeer op de Jubellaan of op de parkeerplaatsen vooraan in de Barbarastraat, nog vóór je indraait naar de woonhuizen.","Coming by car? Park on the Jubellaan or in the parking spaces at the front of the Barbarastraat, before you turn in toward the houses."),
      R("Rij niet door tot aan de woonhuizen: in dat doodlopende stukje is geen parkeerplaats voor bezoekers.","Please don't drive on to the houses: there is no visitor parking in that dead-end stretch."),
      R("Vanaf de parkeerstrook in de Barbarastraat is het maar 2 minuten stappen tot bij mij; vanaf de Jubellaan ongeveer 5 minuten.","From the parking strip in the Barbarastraat it's only a 2-minute walk to my place; from the Jubellaan about 5 minutes."),
      R("Kom je met de fiets of bakfiets? Die mag je vastzetten bij de fietsen.","Coming by bike or cargo bike? You can lock it up with the bikes."),
      R("Route nodig? Tik op het kaartje hieronder: Google Maps opent met de route naar mij.","Need directions? Tap the map below: Google Maps opens with directions to me.")
    ]}] },
  { id:"hygiene", icon:"🧼", title:R("Hygiëne en verzorging","Hygiene and care"),
    intro:R("Voor een aangename en professionele behandeling verwacht ik van elke klant het volgende:","For a pleasant and professional treatment I expect the following from every client:"), outro:null,
    groups:[
      { title:R("Handhygiëne","Hand hygiene"), items:[
        R("Propere handen en nagels: geen zichtbaar vuil onder de nagels of donkere verkleuring op de huid.","Clean hands and nails: no visible dirt under the nails or dark discolouration on the skin."),
        R("Geen plakkerige of vettige handen (bv. van eten, olie of zalf).","No sticky or greasy hands (e.g. from food, oil or ointment)."),
        R("Heb je infecties of open wonden? Geef dit vooraf aan voor de manicure. Mogelijk verplaatsen we de afspraak naar een andere datum om de wonde niet te verergeren.","Do you have infections or open wounds? Please tell me in advance for the manicure. We may move the appointment to another date so the wound doesn't get worse.")
      ]},
      { title:R("Voethygiëne (bij voetverzorging)","Foot hygiene (for foot care)"), items:[
        R("Voeten zijn gewassen voor de afspraak.","Feet are washed before the appointment."),
        R("Geen zichtbaar vuil of sterke geur door gebrek aan hygiëne.","No visible dirt or strong odour due to lack of hygiene."),
        R("Bij overmatig zweten: het gebruik van voetpoeder of deodorant wordt sterk aangeraden.","In case of excessive sweating: using foot powder or deodorant is strongly recommended."),
        R("Neem teenslippers mee als je nagellak of gellak wilt bij de pedicure.","Bring flip-flops if you would like nail polish or gel polish with your pedicure."),
        R("Heb je infecties of open wonden? Geef dit vooraf aan voor de pedicure. Mogelijk verplaatsen we de afspraak naar een andere datum om de wonde niet te verergeren.","Do you have infections or open wounds? Please tell me in advance for the pedicure. We may move the appointment to another date so the wound doesn't get worse."),
        R("Medische aandoeningen zoals hyperhidrosis (overmatige zweetproductie) of schimmelinfecties moeten vooraf gemeld worden.","Medical conditions such as hyperhidrosis (excessive sweating) or fungal infections must be reported in advance.")
      ]},
      { title:R("Intieme hygiëne (bij lichaamsbehandelingen zoals lichaamsontharing en -massage)","Intimate hygiene (for body treatments such as body hair removal and massage)"), items:[
        R("De huid is proper en fris gewassen op de dag van de behandeling.","Skin is clean and freshly washed on the day of the treatment."),
        R("Geen onaangename geuren door gebrek aan hygiëne.","No unpleasant odours due to lack of hygiene."),
        R("Bij onvoldoende hygiëne kan de behandeling geweigerd worden zonder terugbetaling.","In case of insufficient hygiene the treatment may be refused without refund."),
        R("Draag losse kledij voor de lichaamsontharing.","Wear loose clothing for body hair removal."),
        R("Heb je infecties of open wonden? Geef dit vooraf aan voor de lichaamsmassage.","Do you have infections or open wounds? Please tell me in advance for the body massage.")
      ]},
      { title:R("Geurbeleid (roken, cannabis, sterke lichaamsgeuren)","Odour policy (smoking, cannabis, strong body odours)"), items:[
        R("Roken en cannabisgebruik vlak voor de behandeling zijn afgeraden.","Smoking and cannabis use right before the treatment are discouraged."),
        R("Heb je een sterke tabaks-, wiet- of andere geur die als storend wordt ervaren, dan kan de behandeling geweigerd worden zonder terugbetaling.","If you have a strong tobacco, cannabis or other smell that is experienced as disturbing, the treatment may be refused without refund."),
        R("Normaal transpireren is geen probleem. Is de geur hinderlijk door gebrek aan hygiëne, dan kan de behandeling ingekort of geweigerd worden.","Normal perspiration is not a problem. If the odour is bothersome due to lack of hygiene, the treatment may be shortened or refused."),
        R("Parfum en sterk geparfumeerde crèmes zijn niet gewenst, omdat die hinderlijk kunnen zijn voor de behandelaar en andere klanten.","Perfume and strongly scented creams are not wanted, as they can be bothersome for the practitioner and other clients.")
      ]},
      { title:R("Gelaatsverzorging, lash lifts en brow styling","Facials, lash lifts and brow styling"), items:[
        R("Kom bij voorkeur zonder make-up.","Preferably come without make-up."),
        R("Gebruik geen zware gezichtscrème of olie vlak voor de behandeling.","Don't use heavy face cream or oil right before the treatment."),
        R("Contactlenzen: draag voor de lashlift en gelaatsverzorging liefst geen lenzen, of neem een lenzenpotje en -vloeistof mee. Vergeet zeker je bril niet.","Contact lenses: for the lash lift and facial, preferably don't wear lenses, or bring a lens case and solution. Definitely don't forget your glasses."),
        R("Draag bij voorkeur een topje met spaghettibandjes.","Preferably wear a top with spaghetti straps.")
      ]}
    ] },
  { id:"contra", icon:"⚠️", title:R("Contra-indicaties","Contraindications"),
    intro:R("Om medische en hygiënische redenen kan een behandeling niet doorgaan bij:","For medical and hygiene reasons a treatment cannot go ahead in case of:"),
    outro:R("Twijfel je? Raadpleeg dan eerst een arts.","In doubt? Please consult a doctor first."),
    groups:[{ title:null, items:[
      R("Open wonden, ernstige ontstekingen of verse littekens in het behandelgebied.","Open wounds, severe inflammation or fresh scars in the treatment area."),
      R("Huid die recent sterk verbrand is door de zon in het behandelgebied.","Skin that was recently badly sunburnt in the treatment area."),
      R("Koorts, griep of andere virale infecties (zie “bij ziekte” bij annuleren).","Fever, flu or other viral infections (see “in case of illness” under cancelling).")
    ]}] },
  { id:"practical", icon:"🌿", title:R("Praktische afspraken","Practical arrangements"), intro:null, outro:null,
    groups:[{ title:null, items:[
      R("Kom alleen voor behandelingen, tenzij je minderjarig bent. Een workshop vindt plaats in de open keuken en eetruimte. Ben je minderjarig, dan word je vergezeld door een ouder.","Please come alone for treatments, unless you are a minor. A workshop takes place in the open kitchen and dining area. If you are a minor, you must be accompanied by a parent."),
      R("Roken is verboden in het gebouw om hygiënische en brandveiligheidsredenen.","Smoking is not allowed in the building for hygiene and fire-safety reasons."),
      R("Laat sieraden en accessoires best thuis om verlies of beschadiging te vermijden.","Best leave jewellery and accessories at home to avoid loss or damage."),
      R("Zet je gsm op stil tijdens de behandeling.","Please put your phone on silent during the treatment."),
      R("Alle behandelingen hebben een esthetisch karakter.","All treatments are aesthetic in nature.")
    ]}] }
];

/* ============================================================
   SKIN FACTS ("Weetjes over huid, haar en voeten")
   36 short facts from the anatomy e-learnings (B1 skin, B2 hair).
   theme: A skin in short · B sun, colour, vitamin D · C epidermis ·
   D below the surface · E sweat, sebum, odour · F feet and hands ·
   G goosebumps and hair · H skin flora.
   French text lives in lang-fr.js (by code). Informational only:
   no treatment promises. Figures should be checked against the
   original e-learning before publishing.
   Softened until verified: C1 (was "25 to 30 layers") and F1 (was
   "up to 620 per cm2"). A2 got "on average". Restore the figures here
   (and in lang-fr.js for French) once checked.
   ============================================================ */
const SKIN_FACTS = [
  { code:"A1", theme:"A", nl:"Je huid is het grootste orgaan van je lichaam.", en:"Your skin is the largest organ of your body." },
  { code:"A2", theme:"A", nl:"Gemiddeld heb je elke 4 weken een volledig nieuwe opperhuid: je huid vernieuwt zichzelf voortdurend.", en:"On average you get a completely new epidermis every 4 weeks: your skin constantly renews itself." },
  { code:"A3", theme:"A", nl:"Je huid heeft 9 functies, van barrière en warmteregulatie tot vitamine D-productie, vetreserve en tast.", en:"Your skin has 9 functions, from barrier and temperature regulation to vitamin D production, fat storage and touch." },
  { code:"A4", theme:"A", nl:"Je huid is ook een communicatiemiddel: je wordt rood van schaamte, wit door ziekte en krijgt kippenvel bij koude of angst.", en:"Your skin is also a means of communication: you blush with embarrassment, turn pale from illness and get goosebumps from cold or fear." },
  { code:"A5", theme:"A", nl:"Via je huid neem je prikkels op zoals temperatuur, tast, de positie van je ledematen en pijn. Zo kun je met gesloten ogen voorwerpen herkennen.", en:"Through your skin you pick up stimuli such as temperature, touch, the position of your limbs and pain. That's how you can recognise objects with your eyes closed." },
  { code:"B1", theme:"B", nl:"Het grootste deel van je vitamine D maakt je lichaam zelf aan onder invloed van zonlicht. Voeding zoals vette vis, eieren, melk of boter levert de rest.", en:"Most of your vitamin D is made by your body itself under the influence of sunlight. Food such as oily fish, eggs, milk or butter provides the rest." },
  { code:"B2", theme:"B", nl:"Melanine in je opperhuid absorbeert UV-stralen.", en:"Melanin in your epidermis absorbs UV rays." },
  { code:"B3", theme:"B", nl:"Je huidskleur wordt vooral bepaald door de grootte en het aantal pigmentkorrels in de basale laag van je opperhuid.", en:"Your skin colour is mainly determined by the size and number of pigment granules in the basal layer of your epidermis." },
  { code:"B4", theme:"B", nl:"Een moedervlek is een goedaardige ophoping van melanocyten (pigmentcellen).", en:"A mole is a benign cluster of melanocytes (pigment cells)." },
  { code:"C1", theme:"C", nl:"Je hoornlaag bestaat uit vele lagen dode cellen, en juist die dode cellen zijn een van de beste beschermingen tegen indringers.", en:"Your horny layer consists of many layers of dead cells, and it is precisely those dead cells that are one of the best protections against intruders." },
  { code:"C2", theme:"C", nl:"Eelt ontstaat wanneer je hoornlaag extreem veel wrijving ondervindt.", en:"Calluses form when your horny layer is exposed to extreme friction." },
  { code:"C3", theme:"C", nl:"De cellen in je stekellaag houden elkaar vast met kleine “stekeltjes” (desmosomen). Dat maakt je huid flexibel en stevig.", en:"The cells in your spinous layer hold on to each other with tiny “spines” (desmosomes). That makes your skin flexible and strong." },
  { code:"C4", theme:"C", nl:"Langerhanscellen in je huid zijn vertakte cellen die meehelpen aan je afweer.", en:"Langerhans cells in your skin are branched cells that help your immune defence." },
  { code:"D1", theme:"D", nl:"Collageen zorgt voor de stevigheid van je huid, elastine voor de rekbaarheid en veerkracht.", en:"Collagen gives your skin its firmness, elastin its stretch and resilience." },
  { code:"D2", theme:"D", nl:"Je onderhuid is tegelijk energieopslag, isolatielaag en stootkussen.", en:"Your subcutaneous layer is energy storage, insulation and shock absorber all in one." },
  { code:"D3", theme:"D", nl:"Zoogdieren hebben een dikke vacht. Bij de mens ging die verloren en nam het vet onder je huid de isolatie over.", en:"Mammals have thick fur. In humans it was lost, and the fat under your skin took over the insulation." },
  { code:"E1", theme:"E", nl:"Apocrien zweet is geurloos tot het op je huid komt. De typische zweetgeur ontstaat pas wanneer bacteriën het omzetten.", en:"Apocrine sweat is odourless until it reaches your skin. The typical sweat smell only arises when bacteria break it down." },
  { code:"E2", theme:"E", nl:"Je hebt 2 tot 5 miljoen zweetklieren.", en:"You have 2 to 5 million sweat glands." },
  { code:"E3", theme:"E", nl:"Talg vormt samen met zweet je zuurmantel, die je huid beschermt tegen bacteriën en ziekteverwekkers.", en:"Sebum and sweat together form your acid mantle, which protects your skin against bacteria and pathogens." },
  { code:"E4", theme:"E", nl:"Hoeveel talg je aanmaakt hangt af van je hormonen en je leeftijd, niet van je zenuwstelsel.", en:"How much sebum you produce depends on your hormones and your age, not on your nervous system." },
  { code:"F1", theme:"F", nl:"Je voetzolen hebben een van de hoogste dichtheden aan zweetklieren van je lichaam.", en:"Your soles have one of the highest densities of sweat glands in your body." },
  { code:"F2", theme:"F", nl:"Op je handpalmen en voetzolen groeien geen haren en zitten geen talgklieren.", en:"No hair grows on your palms and soles, and there are no sebaceous glands." },
  { code:"F3", theme:"F", nl:"Onder je voetzolen (en handpalmen en zitvlak) dient het vet bijna uitsluitend als stootkussen.", en:"Under the soles of your feet (and palms and buttocks) the fat serves almost exclusively as a shock absorber." },
  { code:"F4", theme:"F", nl:"Handpalmen en voetzolen hebben een extra huidlaag: de doorschijnende laag, die enkel in dikke huid voorkomt.", en:"Palms and soles have an extra skin layer: the translucent layer, which only occurs in thick skin." },
  { code:"G1", theme:"G", nl:"Kippenvel: een klein spiertje bij het haarzakje trekt samen en zet het haar rechtop. Zo blijft er warme lucht tussen de haartjes hangen als isolatie.", en:"Goosebumps: a tiny muscle at the hair follicle contracts and makes the hair stand upright. That traps warm air between the hairs as insulation." },
  { code:"G2", theme:"G", nl:"Elk haartje heeft zijn eigen haaroprichter, de kippenvelspier.", en:"Every hair has its own arrector pili, the goosebump muscle." },
  { code:"G3", theme:"G", nl:"Haren zijn meer dan sier: alle haarfollikels hebben zenuwen die reageren op druk of buiging van de haarschacht.", en:"Hairs are more than decoration: all hair follicles have nerves that respond to pressure or bending of the hair shaft." },
  { code:"G4", theme:"G", nl:"Vanaf halverwege de schacht bestaat je haar uit dood materiaal: de haarcellen vullen zich met keratine en sterven af.", en:"From halfway up the shaft, your hair consists of dead material: the hair cells fill with keratin and die off." },
  { code:"G5", theme:"G", nl:"De kleur van je haar komt van melanocyten in de haarwortel die pigmentkorrels afgeven.", en:"The colour of your hair comes from melanocytes in the hair root that release pigment granules." },
  { code:"G6", theme:"G", nl:"De buitenste laag van je haar (cuticula) ligt als dakpannen over elkaar. Die schubben houden het haar glad en beschermen tegen chemicaliën, UV-straling en hitte.", en:"The outer layer of your hair (cuticle) overlaps like roof tiles. Those scales keep the hair smooth and protect against chemicals, UV radiation and heat." },
  { code:"G7", theme:"G", nl:"De vezellaag (cortex) bepaalt of je haar steil of krullend is.", en:"The fibre layer (cortex) determines whether your hair is straight or curly." },
  { code:"G8", theme:"G", nl:"Wat het merg (medulla) van je haar precies doet, is nog niet bekend. Niet elk haartype heeft er een.", en:"What exactly the medulla (core) of your hair does is not yet known. Not every hair type has one." },
  { code:"G9", theme:"G", nl:"In elke haarfollikel monden 2 tot 3 talgklieren uit.", en:"2 to 3 sebaceous glands open into each hair follicle." },
  { code:"G10", theme:"G", nl:"Je haarwortel is gevoelig voor hormonen en kan beïnvloed worden door voeding, stress en genetica.", en:"Your hair root is sensitive to hormones and can be influenced by nutrition, stress and genetics." },
  { code:"H1", theme:"H", nl:"Je huid kan nooit volledig steriel gemaakt worden: nuttige micro-organismen leven er permanent en vormen een eerste barrière tegen besmetting.", en:"Your skin can never be made completely sterile: useful micro-organisms live there permanently and form a first barrier against infection." },
  { code:"H2", theme:"H", nl:"Tijdelijke (transiënte) huidflora verwijder je gemakkelijk door je handen te wassen of te ontsmetten.", en:"Temporary (transient) skin flora is easily removed by washing or disinfecting your hands." }
];
/* Which themes are shown for which treatment (null = any fact). */
const SKIN_FACT_POOLS = {
  kids: ["A","G","H"],
  byTreatment: {
    expressfacial:["A","B","C","D"], acnefacial:["A","B","C","D"], bridaltrial:["A","B"], bridalpackage:["A","B"], weddingguest:["A","B"], browtint:["G"], browshaping:["G"], lashtint:["G"], manicureexpress:["F","H","C"], cateye:["F","H","C"], kin:["G"], bovenlip:["G"], wenkbrauwontharing:["G"], schouders:["G"], borstbuik:["G"], volledigebenen:["G"], harmonizingback:["A","D","E"], teambeauty:["A","B","C"],
    pedicure:["F","E","C"], pedicureexpress:["F","E","C"],
    manipedispa:["F","C","H"], manicure:["F","H","C"],
    oksel:["G","E"], been:["G"], rug:["G"], buik:["G"], borst:["G"],
    browlift:["G"], hennabrows:["G"], lashlift:["G"],
    hydrapeel:["A","B","C","D"], signaturefacial:["A","B","C","D"], fillme:["A","B","C","D"],
    fruitacid:["A","B","C","D"], liftsummere:["A","B","C","D"], antiagefacial:["A","B","C","D"],
    glammakeup:["A","B"], makeupworkshop:["A","B","C"], facialworkshop:["A","B","C"],
    hotstone:["A","D","E"], cupping:["A","D","E"], cuppingpeeling:["A","D","E"],
    swedish:["A","D","E"], swedishbackneck:["A","D","E"], swedishlegs:["A","D","E"],
    backwrap:["A","D","E"], harmonizingbody:["A","D","E"], fullbodywrap:["A","D","E"],
    slimmassage:["A","D","E"], detoxback:["A","D","E"]
  },
  sun: ["B"]
};

/* ============================================================
   CONDITION FACTS ("Weetjes: huid, zon en gezondheid")
   62 facts from the pathology e-learnings (skin cancer, benign
   growths, pigmentation, acne, feet, dry skin, infections,
   allergy/irritation, sweat disorders). Separate from SKIN_FACTS
   (anatomy) because the source and register differ; both render
   through the same skin-fact card.
   theme codes: SH zon & huidkanker · TU huidgezwellen ·
   PI pigment & vlekken · AC acne & talg · PE voeten & pedicure ·
   DR droge huid & verhoorning · IN infecties ·
   AL allergie & irritatie · ZW zweet.
   Some facts touch real conditions (skin cancer, herpes, HPV,
   diabetes). Kept factual and non-alarming; never shown as medical
   advice — see skinfact_disclaimer in i18n.js. French text lives in
   lang-fr.js (by code).
   ============================================================ */
const CONDITION_FACTS = [
  { code:"SH1", theme:"SH", kop:"80 – 15 – 5", nl:"Van alle huidkankers is 80% een basaalcelcarcinoom, 15% een plaveiselcelcarcinoom en 5% een melanoom. Het melanoom is het zeldzaamst, maar wel de meest agressieve vorm.", en:"Of all skin cancers, 80% are basal cell carcinoma, 15% squamous cell carcinoma and 5% melanoma. Melanoma is the rarest, but the most aggressive form.", kopEn:"80 – 15 – 5" },
  { code:"SH2", theme:"SH", kop:"De ABCDE-regel", nl:"Check je moedervlekken op Asymmetrie, Boordgroei (onregelmatige rand), Color change (2 of meer kleuren), Diameter (meer dan 6 mm) en Evolutie (verandert, jeukt of bloedt).", en:"Check your moles for Asymmetry, Border irregularity, Colour change (2 or more colours), Diameter (more than 6 mm) and Evolution (changes, itches or bleeds).", kopEn:"The ABCDE rule" },
  { code:"SH3", theme:"SH", kop:"Kinderhuid en zon", nl:"Een ernstige zonverbranding bij kinderen jonger dan 5 jaar kan later melanomen doen ontstaan. Regelmatig zonnen en de zonnebank verhogen het risico ook.", en:"A severe sunburn in children under 5 can lead to melanoma later in life. Regular sunbathing and sunbeds also increase the risk.", kopEn:"Child skin and sun" },
  { code:"SH4", theme:"SH", kop:"Zonnekeratose", nl:"Actinische keratose is een voorstadium van huidkanker: ruwe, schilferige plekjes door te veel UV van zon of zonnebank, vooral op handruggen, onderarmen, gelaat en schedelhuid. Je voelt ze vaak eerder dan je ze ziet.", en:"Actinic keratosis is a precursor to skin cancer: rough, scaly patches caused by too much UV from sun or sunbeds, mostly on the backs of the hands, forearms, face and scalp. You often feel them before you see them.", kopEn:"Actinic keratosis" },
  { code:"SH5", theme:"SH", kop:"Steeds jonger", nl:"Het basaalcelcarcinoom zie je steeds vaker bij jongere mensen, al vanaf ongeveer 30 jaar. Een licht huidtype (type 1 of 2) heeft het grootste risico.", en:"Basal cell carcinoma is increasingly seen in younger people, from around age 30. A fair skin type (type 1 or 2) carries the highest risk.", kopEn:"Getting younger" },
  { code:"SH6", theme:"SH", kop:"Een wondje dat blijft", nl:"Een niet-genezend wondje of zweertje met permanent een korstje kan een teken zijn van een basaalcelcarcinoom. Dat groeit traag en zaait (vrijwel) nooit uit.", en:"A wound or sore that won't heal and keeps a permanent scab can be a sign of basal cell carcinoma. It grows slowly and (almost) never spreads.", kopEn:"A wound that won't heal" },
  { code:"SH7", theme:"SH", kop:"Verdachte vlek", nl:"Een vlek die verandert, asymmetrisch is, een grillige rand of meerdere kleurschakeringen heeft, groter is dan 6 mm of jeukt, ontsteekt of bloedt: een reden om een arts te raadplegen.", en:"A spot that changes, is asymmetrical, has an irregular border or several shades of colour, is bigger than 6 mm, or itches, becomes inflamed or bleeds: a reason to see a doctor.", kopEn:"A suspicious spot" },
  { code:"TU1", theme:"TU", kop:"Spider naevi", nl:"Spider naevi (kleine bloedvaatjes die als een spinnetje uitstralen) ontstaan vaak op zonblootgestelde plekken zoals gezicht, nek en benen. Kleine, oppervlakkige exemplaren kunnen met elektrocoagulatie of fulguratie behandeld worden.", en:"Spider naevi (tiny blood vessels radiating out like a spider) often appear on sun-exposed areas such as the face, neck and legs. Small, superficial ones can be treated with electrocoagulation or fulguration.", kopEn:"Spider naevi" },
  { code:"TU2", theme:"TU", kop:"Steelwratjes", nl:"Iedereen van 30 jaar of ouder heeft wel ergens een of meer fibromen (steelwratjes). Ze gaan niet vanzelf weg, maar kunnen bij cosmetisch bezwaar goed en veilig verwijderd worden.", en:"Almost everyone aged 30 or older has one or more skin tags (fibromas) somewhere. They don't disappear on their own, but if they bother you cosmetically they can be removed safely.", kopEn:"Skin tags" },
  { code:"TU3", theme:"TU", kop:"Ouderdomswratten", nl:"Ouderdomswratten zijn verheven bruine of zwarte, vaak ruwe vlekken die vooral bij oudere mensen voorkomen. Ze zijn goedaardig.", en:"Seborrhoeic warts are raised brown or black, often rough patches that mainly occur in older people. They are benign.", kopEn:"Seborrhoeic warts" },
  { code:"TU4", theme:"TU", kop:"Zwarte huidbultjes", nl:"Zwarte huidbultjes (dermatosis papulosa nigra) zijn kleine, donkere bultjes die vooral voorkomen bij mensen met een donkere huidskleur, meestal in het gezicht.", en:"Dermatosis papulosa nigra are small, dark bumps that mainly occur in people with darker skin, usually on the face.", kopEn:"Dark bumps" },
  { code:"TU5", theme:"TU", kop:"Bloedvatgezwel bij baby's", nl:"Een hemangioom (verheven bloedvatgezwel) is een goedaardige ophoping van bloedvaten die eruitziet als een rood of blauw knobbeltje. Het komt vaak voor bij baby's en kinderen.", en:"A haemangioma (a raised cluster of blood vessels) is a benign growth that looks like a red or blue bump. It is common in babies and young children.", kopEn:"Baby blood-vessel growth" },
  { code:"PI1", theme:"PI", kop:"Parfum + zon = vlekken", nl:"Berloque dermatitis: parfum, bodylotion of deodorant (vaak met bergamot) kan donkere vlekken of strepen geven, klassiek in de vorm van druppels. Vaak verdwijnt het vanzelf; zonbescherming is belangrijk.", en:"Berloque dermatitis: perfume, body lotion or deodorant (often containing bergamot) combined with sun can leave dark spots or streaks, classically drop-shaped. It often fades on its own; sun protection matters.", kopEn:"Perfume + sun = spots" },
  { code:"PI2", theme:"PI", kop:"Moedervlekken", nl:"Moedervlekken kunnen al voor de geboorte bestaan of later ontstaan. Erfelijkheid en verbranding tijdens de jeugd spelen een rol.", en:"Moles can be present from before birth or develop later in life. Heredity and sunburn during childhood both play a role.", kopEn:"Moles" },
  { code:"PI3", theme:"PI", kop:"Ouderdomsvlekken", nl:"Levervlekken (ouderdomsvlekken) zijn goedaardig en verschijnen bijna altijd na je 50e à 60e, vooral op gelaat, decolleté en handruggen.", en:"Age spots (liver spots) are benign and almost always appear after age 50 to 60, mainly on the face, décolletage and backs of the hands.", kopEn:"Age spots" },
  { code:"PI4", theme:"PI", kop:"Vitiligo", nl:"Bij vitiligo verdwijnen de pigmentcellen uit de huid. Het kan op elke leeftijd plots ontstaan; bij 70 à 80% van de mensen begint het voor hun 30e. Extra zonbescherming is nodig.", en:"In vitiligo, pigment cells disappear from the skin. It can start suddenly at any age; in 70 to 80% of people it begins before age 30. Extra sun protection is needed.", kopEn:"Vitiligo" },
  { code:"PI5", theme:"PI", kop:"Albinisme", nl:"Albinisme is aangeboren: melanine ontbreekt gedeeltelijk of volledig, wat een (gedeeltelijk) witte huid met rode ogen geeft.", en:"Albinism is congenital: melanin is partly or completely absent, resulting in (partly) white skin and often reddish eyes.", kopEn:"Albinism" },
  { code:"PI6", theme:"PI", kop:"Na de puist", nl:"Na acne blijven rode vlekjes 3 tot 9 maanden zichtbaar en donkere vlekjes kunnen tot 3 jaar blijven, vooral bij een donkerder huidtype en zonblootstelling.", en:"After acne, red marks can remain visible for 3 to 9 months, and dark marks can last up to 3 years, especially in darker skin types and with sun exposure.", kopEn:"After the pimple" },
  { code:"AC1", theme:"AC", kop:"Mythe: chocolade", nl:"Volgens de e-learning veroorzaken slechte hygiëne, vitaminetekort, voedselallergieën, chocolade en mayonaise geen acne. Wél: talg, hormonen, verstopte follikels, bacteriën en erfelijkheid.", en:"According to the course material, poor hygiene, vitamin deficiency, food allergies, chocolate and mayonnaise do not cause acne. What does: sebum, hormones, clogged follicles, bacteria and heredity.", kopEn:"Myth: chocolate" },
  { code:"AC2", theme:"AC", kop:"Hormonen", nl:"Vooral mannelijke hormonen (androgenen) prikkelen de talgklieren, bij jongens én meisjes. Niet de hoeveelheid hormonen telt, maar het onevenwicht en de gevoeligheid van de talgkliertjes.", en:"Mainly male hormones (androgens) stimulate the sebaceous glands, in both boys and girls. It's not the amount of hormones that counts, but the imbalance and the sensitivity of the glands.", kopEn:"Hormones" },
  { code:"AC3", theme:"AC", kop:"Geduld loont", nl:"Acne reageert traag: de eerste maand is er meestal weinig verbetering, na zes maanden behandeling minstens 80% verbetering van de letsels.", en:"Acne responds slowly: there is usually little improvement in the first month, but after six months of treatment at least 80% improvement of the lesions.", kopEn:"Patience pays off" },
  { code:"AC4", theme:"AC", kop:"Deppen, niet wrijven", nl:"Wrijven stimuleert de talgproductie. Reinig acnehuid met milde zeep en dep hem droog. Sterk ontvettende producten kunnen de talgproductie juist stimuleren.", en:"Rubbing stimulates sebum production. Cleanse acne-prone skin with a mild soap and pat it dry. Strongly degreasing products can actually stimulate sebum production.", kopEn:"Pat, don't rub" },
  { code:"AC5", theme:"AC", kop:"Goed ontschminken", nl:"Make-up mag bij acne, maar vergroot de verstopping van de poriën als je niet goed ontschminkt. Een katoenen kussensloop absorbeert beter.", en:"Make-up is fine with acne, but it worsens clogged pores if you don't remove it properly. A cotton pillowcase absorbs better.", kopEn:"Remove make-up well" },
  { code:"AC6", theme:"AC", kop:"Mallorca acne", nl:"Zon in combinatie met zonnebrand of cosmetica met comedogene ingrediënten kan kleine, rode, jeukende bultjes geven. Kies een niet-comedogene, olievrije zonnebrand.", en:"Sun combined with sunscreen or cosmetics containing comedogenic ingredients can cause small, red, itchy bumps. Choose a non-comedogenic, oil-free sunscreen.", kopEn:"Mallorca acne" },
  { code:"AC7", theme:"AC", kop:"Rosacea is geen acne", nl:"\"Acne rosacea\" heeft ondanks de puistjes niets met acne te maken. Het is een chronische roodheid van het gelaat, vooral bij een lichte huid.", en:"\"Acne rosacea\", despite the pimples, has nothing to do with acne. It is a chronic redness of the face, mainly in fair skin.", kopEn:"Rosacea isn't acne" },
  { code:"AC8", theme:"AC", kop:"Roaccutane en waxen", nl:"Tijdens een behandeling met Roaccutane en de twee maanden erna mag je niet epileren met was: er kunnen stukken huid meekomen. De huid is ook zongevoelig.", en:"During treatment with Roaccutane and for two months afterwards, you should not wax: pieces of skin can be pulled off with the wax. The skin is also sun-sensitive.", kopEn:"Roaccutane and waxing" },
  { code:"AC9", theme:"AC", kop:"Baby-acne", nl:"Baby-acne verdwijnt meestal vanzelf. Niet uitknijpen of manipuleren!", en:"Baby acne usually disappears on its own. Don't squeeze or pick at it!", kopEn:"Baby acne" },
  { code:"PE1", theme:"PE", kop:"Wrat of likdoorn?", nl:"Bij een likdoorn lopen de huidlijnen over het letsel heen. Bij een voetzoolwrat wijken de huidlijnen rondom de wrat af.", en:"With a corn, the skin lines run straight across the lesion. With a plantar wart, the skin lines deviate around the wart.", kopEn:"Wart or corn?" },
  { code:"PE2", theme:"PE", kop:"Wratten overleven buiten het lichaam", nl:"HPV kan lang overleven in een vochtige omgeving zoals gemeenschappelijke douches, zwembadvloeren en natte handdoeken. Draag daar eigen slippers.", en:"HPV can survive for a long time in a damp environment such as communal showers, pool floors and wet towels. Wear your own flip-flops there.", kopEn:"Warts survive outside the body" },
  { code:"PE3", theme:"PE", kop:"Wratten gaan vaak vanzelf weg", nl:"Wratten verdwijnen vaak vanzelf na een 2-tal jaar. Bevriezen met vloeibare stikstof vraagt meestal meerdere beurten, met telkens ongeveer 3 weken ertussen.", en:"Warts often disappear on their own after about 2 years. Freezing with liquid nitrogen usually takes several sessions, roughly 3 weeks apart.", kopEn:"Warts often go away on their own" },
  { code:"PE4", theme:"PE", kop:"Voetschimmel houdt van warm en vochtig", nl:"Schimmels zitten graag op warme, vochtige plekken zoals voeten en tussen de tenen. Droog goed tussen de tenen, draag katoenen of wollen sokken en ruime, liefst lederen schoenen.", en:"Fungi love warm, moist places such as feet and between the toes. Dry well between your toes, wear cotton or wool socks and roomy, preferably leather shoes.", kopEn:"Fungus loves warm and damp" },
  { code:"PE5", theme:"PE", kop:"Hardnekkig", nl:"Schimmelinfecties zijn hardnekkig en komen vaak terug. Een langdurige behandeling van weken tot maanden is vaak nodig.", en:"Fungal infections are stubborn and often come back. A prolonged treatment of weeks to months is often needed.", kopEn:"Stubborn" },
  { code:"PE6", theme:"PE", kop:"Blaartjes op de voetzool", nl:"Blaartjes op de handpalmen of voetzolen zijn meestal een overgevoeligheidsreactie op een schimmelinfectie elders op het lichaam.", en:"Small blisters on the palms or soles are usually a hypersensitivity reaction to a fungal infection elsewhere on the body.", kopEn:"Blisters on the sole" },
  { code:"PE7", theme:"PE", kop:"Zweetvoeten", nl:"Tegen zweetvoeten helpen dagelijks schone (katoenen) kousen, schoenen meermaals per dag wisselen en lederen schoenen die de voet niet afsluiten. Minder koffie, alcohol en scherpe kruiden helpt ook.", en:"For sweaty feet, clean (cotton) socks every day, changing shoes several times a day, and leather shoes that let the foot breathe all help. Less coffee, alcohol and spicy food helps too.", kopEn:"Sweaty feet" },
  { code:"PE8", theme:"PE", kop:"Diabetes en de huid", nl:"Bij diabetes is er een verhoogde kans op schimmelinfecties (verminderde weerstand) en op fibromen (steelwratjes).", en:"With diabetes there is an increased risk of fungal infections (reduced resistance) and of skin tags (fibromas).", kopEn:"Diabetes and skin" },
  { code:"PE9", theme:"PE", kop:"Geen steenpuist op de voetzool", nl:"Steenpuisten komen nooit voor op de voetzool of handpalm: daar zitten geen haarzakjes.", en:"Boils never occur on the sole of the foot or the palm: there are no hair follicles there.", kopEn:"No boils on the sole" },
  { code:"PE10", theme:"PE", kop:"Teek verwijderen", nl:"Pak een teek met een pincet bij de kop en trek hem langzaam recht omhoog. Zorg dat ook de monddelen mee zijn.", en:"Grip a tick with tweezers at the head and pull it slowly and straight upward. Make sure the mouthparts come out too.", kopEn:"Removing a tick" },
  { code:"DR1", theme:"DR", kop:"Herstel in een week", nl:"Een uitgedroogde huid maakt zelf extra huidvetten aan. Met rust en een beschermende vette crème is de barrière na ongeveer 1 week hersteld.", en:"Dehydrated skin produces extra skin lipids itself. With rest and a protective, rich cream the barrier is usually restored after about 1 week.", kopEn:"Healed in a week" },
  { code:"DR2", theme:"DR", kop:"Vette crème voor het slapen", nl:"Vaselinehoudende crèmes werken heel goed bij een droge huid, maar trekken langzaam in. Daarom zijn ze vooral praktisch voor het slapengaan.", en:"Vaseline-based creams work very well for dry skin, but absorb slowly. That's why they're especially practical at bedtime.", kopEn:"Rich cream at bedtime" },
  { code:"DR3", theme:"DR", kop:"Katoen onder rubber", nl:"Draag onder rubberen of PVC handschoenen bij voorkeur katoenen verbandhandschoenen. Zo bescherm je je handen tegen uitdroging.", en:"Wear cotton liner gloves underneath rubber or PVC gloves whenever possible. That protects your hands against drying out.", kopEn:"Cotton under rubber" },
  { code:"DR4", theme:"DR", kop:"Psoriasis: snelle huid", nl:"Een normale huid vernieuwt zich elke 28 dagen, een psoriasishuid al in 4 tot 6 dagen. Psoriasis is niet besmettelijk.", en:"Normal skin renews itself every 28 days; skin with psoriasis renews in just 4 to 6 days. Psoriasis is not contagious.", kopEn:"Psoriasis: fast skin" },
  { code:"DR5", theme:"DR", kop:"Stress en psoriasis", nl:"Psoriasis is stressgevoelig: bij meer stress kan het opflakkeren. Bij ongeveer 30% van de patiënten heeft een ouder of kind het ook.", en:"Psoriasis is sensitive to stress: it can flare up with more stress. In about 30% of patients, a parent or child also has it.", kopEn:"Stress and psoriasis" },
  { code:"DR6", theme:"DR", kop:"Schubbenhuid", nl:"Het woord ichthyosis komt van het Griekse \"ichthys\", vis, vanwege de schubachtige huid. Het is een groep erfelijke aandoeningen.", en:"The word ichthyosis comes from the Greek \"ichthys\", fish, because of the scaly skin. It is a group of hereditary conditions.", kopEn:"Scaly skin" },
  { code:"DR7", theme:"DR", kop:"Ruwe bultjes", nl:"Bij keratosis pilaris blokkeert opgehoopt keratine de haarfollikels en ontstaan kleine harde bultjes. De klachten verbeteren vaak met de tijd, vooral op volwassen leeftijd.", en:"In keratosis pilaris, built-up keratin blocks the hair follicles, causing small hard bumps. The symptoms often improve over time, especially into adulthood.", kopEn:"Rough little bumps" },
  { code:"AL1", theme:"AL", kop:"Irritatie of allergie?", nl:"Irritatie beschadigt rechtstreeks de huidbarrière en kan iedereen overkomen. Bij een allergie speelt het immuunsysteem mee en reageert niet iedereen.", en:"Irritation directly damages the skin barrier and can happen to anyone. With an allergy, the immune system is involved and not everyone reacts.", kopEn:"Irritation or allergy?" },
  { code:"AL2", theme:"AL", kop:"Plots allergisch", nl:"Een contactallergie kan pas optreden na lange tijd probleemloos gebruik van hetzelfde product, bijvoorbeeld bij iemand die jarenlang kunstnagels droeg.", en:"A contact allergy can develop only after a long period of trouble-free use of the same product, for example in someone who wore acrylic nails for years.", kopEn:"Suddenly allergic" },
  { code:"AL3", theme:"AL", kop:"4 tot 24 uur later", nl:"Allergisch contacteczeem is pas 4 à 24 uur na het contact merkbaar en kan ook op andere plaatsen verschijnen, vooral op dunne huid zoals de oogleden.", en:"Allergic contact eczema only becomes noticeable 4 to 24 hours after contact and can also appear elsewhere, especially on thin skin such as the eyelids.", kopEn:"4 to 24 hours later" },
  { code:"AL4", theme:"AL", kop:"Bekende irritantia", nl:"Vaak voorkomende irritantia zijn zeep, vloeibare zeep, shampoo, badschuim, oogmake-up, geurstoffen, ontharingsproducten, anti-transpirant en zonneproducten.", en:"Common irritants include soap, liquid soap, shampoo, bubble bath, eye make-up, fragrances, hair removal products, antiperspirant and sun products.", kopEn:"Common irritants" },
  { code:"AL5", theme:"AL", kop:"Na het ontharen", nl:"Bultjes met een rood stipje rond de haarzakjes na ontharen zijn meestal een histaminereactie, geen allergie. Een koud kompres kalmeert de huid.", en:"Small bumps with a red dot around the hair follicles after hair removal are usually a histamine reaction, not an allergy. A cold compress soothes the skin.", kopEn:"After hair removal" },
  { code:"AL6", theme:"AL", kop:"Bij- of wespensteek", nl:"Bijen laten hun angel achter en sterven, wespen en hoornaars kunnen herhaaldelijk steken. Verwijder een angel met een pincet en knijp er niet in: dat geeft extra gif vrij.", en:"Bees leave their stinger behind and die; wasps and hornets can sting repeatedly. Remove a stinger with tweezers and don't squeeze it: that releases extra venom.", kopEn:"Bee or wasp sting" },
  { code:"AL7", theme:"AL", kop:"Zonneallergie", nl:"Een zonneallergie is geen echte allergie, want het immuunsysteem is er niet bij betrokken.", en:"A sun allergy is not a true allergy, as the immune system is not involved.", kopEn:"Sun allergy" },
  { code:"AL8", theme:"AL", kop:"Netelroos-triggers", nl:"Netelroos kan ontstaan door wrijven of krabben, druk, zweet, koude, warmte, licht of zelfs water.", en:"Hives can be triggered by rubbing or scratching, pressure, sweat, cold, heat, light or even water.", kopEn:"Hives triggers" },
  { code:"ZW1", theme:"ZW", kop:"Deo of zweetremmer?", nl:"Deodorants doden of remmen bacteriën en bedekken geur. Zweetremmende producten vernauwen de afvoerbuisjes van de zweetklieren.", en:"Deodorants kill or slow bacteria and mask odour. Antiperspirants narrow the ducts of the sweat glands.", kopEn:"Deodorant or antiperspirant?" },
  { code:"ZW2", theme:"ZW", kop:"Een familiekwestie", nl:"Bij 30 à 50% van de mensen met hyperhidrosis (overmatig zweten) komt het ook in de familie voor.", en:"In 30 to 50% of people with hyperhidrosis (excessive sweating), it also runs in the family.", kopEn:"A family matter" },
  { code:"ZW3", theme:"ZW", kop:"Helemaal geen zweet", nl:"Bij anhydrosis is er geen zweetproductie. De lichaamstemperatuur kan daardoor oplopen tot koorts.", en:"In anhidrosis there is no sweat production at all. Because of this, body temperature can rise to fever levels.", kopEn:"No sweat at all" }
];
/* Extra pools, added to the ones in SKIN_FACT_POOLS.byTreatment /
   .sun / .kids above. A treatment listed here gets these condition
   themes IN ADDITION to its existing skin-fact themes. */
const CONDITION_FACT_POOLS = {
  sun: ["SH"],
  byTreatment: {
    expressfacial:["PI","DR"], acnefacial:["AC","PI"], bridaltrial:["AL"], bridalpackage:["AL"], weddingguest:["AL"], browtint:["AL"], browshaping:["AL"], lashtint:["AL"], kin:["AL"], bovenlip:["AL"], wenkbrauwontharing:["AL"], schouders:["AL"], borstbuik:["AL"], volledigebenen:["AL","PE"], harmonizingback:["ZW"], teambeauty:["AC","PI"],
    pedicure:["PE","ZW"], pedicureexpress:["PE","ZW"], manipedispa:["PE"],
    hotstone:["ZW"], swedish:["ZW"], swedishbackneck:["ZW"], swedishlegs:["ZW","PE"],
    detoxback:["ZW"], slimmassage:["ZW"],
    hydrapeel:["PI","DR"], signaturefacial:["PI","DR"], fillme:["PI"],
    fruitacid:["PI","DR"], liftsummere:["PI"], antiagefacial:["PI","TU"],
    glammakeup:["AL"], facialworkshop:["AC","PI"], makeupworkshop:["AL"],
    hennabrows:["AL"], browlift:["AL"], lashlift:["AL"],
    oksel:["AL"], been:["AL","PE"], rug:["AL","TU"], buik:["AL"], borst:["AL"]
  }
};

/* ============================================================
   PRACTICE FACTS ("Weetjes: wellness, voeten en massage")
   Three more sources, kept separate from SKIN_FACTS/CONDITION_FACTS
   because they come from different course material:
   - WED/WEW/WEH/WEG/WEC: 39 wellness & SPA facts (Jansen, Wellness
     en verzorging, Syntra AB) — drinken · water&warmte · huid&lichaam
     · geur&kleur · cultuur.
   - PEDX: 14 extra pedicure facts (Simsons, Cosmetische
     voetverzorging, Syntra AB) — anatomy, foot conditions, folklore.
   - MA/MT/MV/MR: 28 massage facts, already delivered NL/EN/FR
     (Syntra AB, Basis Lichaamsmassage) — massage & lichaam · tijdens
     en na · veilig masseren · aromatherapie.
   French text lives in lang-fr.js (by code), same pattern as
   SKIN_FACTS/CONDITION_FACTS.
   ============================================================ */
const PRACTICE_FACTS = [
  { code:"WED1", theme:"WED", nl:"Waterverlies merk je vanaf ongeveer 1% (dorst); bij 2% daalt je werkkracht, bij 4% word je slaperig, lusteloos, humeurig en misselijk.", en:"You notice water loss from about 1% (thirst); at 2% your performance drops, at 4% you become drowsy, listless, irritable and nauseous." },
  { code:"WED2", theme:"WED", nl:"Symptomen van uitdroging (droge huid, donkere urine, minder concentratie) zijn er al vóórdat je dorst hebt.", en:"Symptoms of dehydration (dry skin, dark urine, less concentration) appear even before you feel thirsty." },
  { code:"WED3", theme:"WED", nl:"Je hebt ongeveer 2 liter water per dag nodig; op warme dagen best elk uur een glas.", en:"You need about 2 litres of water a day; on hot days, a glass every hour is a good idea." },
  { code:"WED4", theme:"WED", nl:"Voldoende drinken geeft volgens de cursus meer energie, een glanzendere huid en betere concentratie.", en:"According to the course, drinking enough gives you more energy, a glossier skin and better concentration." },
  { code:"WED5", theme:"WED", nl:"Thee en koffie werken vochtafdrijvend.", en:"Tea and coffee have a diuretic effect." },
  { code:"WED6", theme:"WED", nl:"Te veel zout en zoet prikkelt de weefsels om vocht vast te houden; zout helemaal schrappen mag niet.", en:"Too much salt and sugar stimulates the tissues to retain fluid; cutting out salt completely is not advised." },
  { code:"WED7", theme:"WED", nl:"Bij vochtophoping is minder drinken een fout idee: 1 liter water tussen de maaltijden helpt.", en:"With fluid retention, drinking less is the wrong idea: 1 litre of water between meals helps." },
  { code:"WED8", theme:"WED", nl:"Gedestilleerd water is af te raden als drinkwater: het bevat geen belangrijke zouten.", en:"Distilled water is not recommended as drinking water: it contains no important salts." },
  { code:"WEW1", theme:"WEW", nl:"Warm water van 35 tot 40 °C kalmeert en ontspant de spieren.", en:"Warm water of 35 to 40 °C calms and relaxes the muscles." },
  { code:"WEW2", theme:"WEW", nl:"Koud water van 10 tot 15 °C stimuleert, werkt pijnstillend en verbetert de immuniteit.", en:"Cold water of 10 to 15 °C stimulates, has a pain-relieving effect and improves immunity." },
  { code:"WEW3", theme:"WEW", nl:"Wisselbad: 5 minuten warm, dan 40 seconden koud; herhalen en eindigen met koud.", en:"Contrast bath: 5 minutes warm, then 40 seconds cold; repeat and finish with cold." },
  { code:"WEW4", theme:"WEW", nl:"Stoom laat de poriën openen en stimuleert de huid.", en:"Steam opens the pores and stimulates the skin." },
  { code:"WEW5", theme:"WEW", nl:"Een stoombad is 40 à 60 °C met ongeveer 98% luchtvochtigheid; verblijf 10 à 20 minuten.", en:"A steam bath is 40 to 60 °C with about 98% humidity; stay for 10 to 20 minutes." },
  { code:"WEW6", theme:"WEW", nl:"Een Finse sauna is 70 à 90 °C en droog (minder dan 35% vochtigheid); één gang duurt ongeveer 15 minuten.", en:"A Finnish sauna is 70 to 90 °C and dry (less than 35% humidity); one session lasts about 15 minutes." },
  { code:"WEW7", theme:"WEW", nl:"Word je in de sauna onwel, ga dan naar buiten: je kunt een flauwte krijgen.", en:"If you feel unwell in the sauna, step outside: you could faint." },
  { code:"WEW8", theme:"WEW", nl:"Een infraroodcabine werkt met stralingswarmte van 50 à 60 °C; opwarmen duurt 20 à 30 minuten en afkoelen is niet nodig.", en:"An infrared cabin uses radiant heat of 50 to 60 °C; warming up takes 20 to 30 minutes and no cooling down is needed." },
  { code:"WEW9", theme:"WEW", nl:"Zeewater verwarmd tot 33 °C wordt beschreven als gunstig: de huid neemt de werkzame stoffen dan makkelijker op.", en:"Seawater warmed to 33 °C is described as beneficial: the skin absorbs the active substances more easily." },
  { code:"WEW10", theme:"WEW", nl:"Watsu is een ontspanningsmethode in ongeveer 35 °C warm zoutwater, populair tijdens zwangerschap en bevalling.", en:"Watsu is a relaxation method in about 35 °C warm salt water, popular during pregnancy and childbirth." },
  { code:"WEW11", theme:"WEW", nl:"Hot stone gebruikt basaltstenen tot 60 °C, afgewisseld met koude marmeren stenen.", en:"Hot stone uses basalt stones up to 60 °C, alternated with cold marble stones." },
  { code:"WEH1", theme:"WEH", nl:"Cosmetische 'cellulitis' heet vakmatig panniculose; medische cellulitis is een ontsteking met roodheid, zwelling, pijn en koorts.", en:"Cosmetic 'cellulite' is technically called panniculopathy; medical cellulitis is an infection with redness, swelling, pain and fever." },
  { code:"WEH2", theme:"WEH", nl:"Een vetcel kan tot 30 keer zijn eigen volume opnemen.", en:"A fat cell can expand to up to 30 times its own volume." },
  { code:"WEH3", theme:"WEH", nl:"Bij vrouwen bestaat het vetweefsel uit 50 à 60 miljard vetcellen.", en:"In women, fat tissue consists of 50 to 60 billion fat cells." },
  { code:"WEH4", theme:"WEH", nl:"Cellulitis verdwijnt niet volledig; een kuur van 10 à 20 behandelingen maakt de huid wel gladder.", en:"Cellulite doesn't disappear completely; a course of 10 to 20 treatments does make the skin smoother." },
  { code:"WEH5", theme:"WEH", nl:"Striae bevatten geen haar en geen zweetklieren meer.", en:"Stretch marks no longer contain hair or sweat glands." },
  { code:"WEH6", theme:"WEH", nl:"Horizontale striae wijzen op snelle groei, verticale op gewichtstoename.", en:"Horizontal stretch marks point to rapid growth, vertical ones to weight gain." },
  { code:"WEH7", theme:"WEH", nl:"Een normale vrouwenborst weegt ongeveer 200 gram.", en:"A normal female breast weighs about 200 grams." },
  { code:"WEH8", theme:"WEH", nl:"Tijdens de zwangerschap groeit de tepelhof van 3 à 5 cm naar 7 à 8 cm.", en:"During pregnancy the areola grows from 3 to 5 cm to 7 to 8 cm." },
  { code:"WEH9", theme:"WEH", nl:"Ook bij kleine borsten is een beha nodig, zeker tijdens sport en menstruatie.", en:"Even with small breasts a bra is needed, especially during exercise and menstruation." },
  { code:"WEH10", theme:"WEH", nl:"Na ongeveer 10 minuten op de trilplaat ben je minder moe en bezweet dan na een gelijkaardige training op step of loopband.", en:"After about 10 minutes on a vibration plate you feel less tired and sweaty than after a similar workout on a step or treadmill." },
  { code:"WEG1", theme:"WEG", nl:"Etherische oliën (uit destillatie van planten) gebruik je in massageoliën, baden, pakkingen of om in te ademen, tegen stress en angst.", en:"Essential oils (distilled from plants) are used in massage oils, baths, wraps or for inhaling, against stress and anxiety." },
  { code:"WEG2", theme:"WEG", nl:"Bergamot, basilicum en jasmijn worden genoemd tegen een sombere stemming; cipres en sandelhout tegen nervositeit.", en:"Bergamot, basil and jasmine are mentioned for a low mood; cypress and sandalwood for nervousness." },
  { code:"WEG3", theme:"WEG", nl:"Etherische oliën voeg je pas op het laatst aan het badwater toe, omdat ze snel vervliegen.", en:"Add essential oils to bath water only at the very end, as they evaporate quickly." },
  { code:"WEG4", theme:"WEG", nl:"Aufguss: de saunakachel wordt opgegoten met water en etherische olie, bv. pepermunt, sinaasappel, jasmijn of lavendel.", en:"Aufguss: water and essential oil (e.g. peppermint, orange, jasmine or lavender) are poured over the sauna stove." },
  { code:"WEG5", theme:"WEG", nl:"Blauw werkt rustgevend, rood stimulerend, groen evenwichtsherstellend, geel opwekkend. De cursus zegt zelf dat de waarde van chromotherapie niet altijd op een stevig fundament rust.", en:"Blue is calming, red stimulating, green balancing, yellow uplifting. The course itself notes that the value of chromotherapy doesn't always rest on solid ground." },
  { code:"WEC1", theme:"WEC", nl:"SPA komt van het Latijn 'salus per aquam': gezondheid door water.", en:"SPA comes from the Latin 'salus per aquam': health through water." },
  { code:"WEC2", theme:"WEC", nl:"Wellness is een levensstijl waarbij je kiest voor een gezond lichaam en een gezonde geest.", en:"Wellness is a lifestyle in which you choose a healthy body and a healthy mind." },
  { code:"WEC3", theme:"WEC", nl:"Lulur was in Indonesië een traditioneel onderdeel van de verlovingsceremonie.", en:"Lulur was traditionally part of the engagement ceremony in Indonesia." },
  { code:"WEC4", theme:"WEC", nl:"Volgens de overlevering nam Cleopatra melkbaden met ezelinnenmelk.", en:"According to legend, Cleopatra took milk baths with donkey's milk." },
  { code:"WEC5", theme:"WEC", nl:"Een loofah-spons of -zeep wordt gemaakt van een pompoenachtige vrucht.", en:"A loofah sponge or soap is made from a gourd-like fruit." },
  { code:"PEDX1", theme:"PEDX", nl:"Elke voet heeft 26 beenderen; de stevigheid komt van bindweefselbanden (ligamenten) van collagene vezels.", en:"Each foot has 26 bones; its strength comes from connective-tissue bands (ligaments) made of collagen fibres." },
  { code:"PEDX2", theme:"PEDX", nl:"Een teen heeft 3 kootjes, behalve de grote teen (2).", en:"A toe has 3 bones (phalanges), except the big toe, which has 2." },
  { code:"PEDX3", theme:"PEDX", nl:"In de voetzolen zitten 72 000 zenuwuiteinden – vandaar dat kietelen zo gevoelig is.", en:"The soles of the feet contain 72,000 nerve endings — which is why they're so ticklish." },
  { code:"PEDX4", theme:"PEDX", nl:"Je zet ongeveer 8 000–10 000 stappen per dag: ca. 185 000 km in je leven.", en:"You take about 8,000 to 10,000 steps a day: roughly 185,000 km over a lifetime." },
  { code:"PEDX5", theme:"PEDX", nl:"Mensen worden geboren met platvoeten; door de ontwikkeling krijg je een normale voet.", en:"People are born with flat feet; a normal foot develops as they grow." },
  { code:"PEDX6", theme:"PEDX", nl:"Spreidvoet komt vaker voor bij vrouwen; spitse schoenen met hoge hak werken het in de hand.", en:"Splay foot is more common in women; pointed shoes with high heels contribute to it." },
  { code:"PEDX7", theme:"PEDX", nl:"Een likdoorn heet ook eksteroog en ontstaat uit eelt.", en:"A corn is also called a clavus and develops from callus." },
  { code:"PEDX8", theme:"PEDX", nl:"Voetschimmel = zwemmerseczeem = atleetvoeten; overdracht in warm, vochtig klimaat (douche, kleedkamer, zwembad).", en:"Athlete's foot = swimmer's eczema = tinea pedis; it spreads in warm, damp environments (showers, changing rooms, swimming pools)." },
  { code:"PEDX9", theme:"PEDX", nl:"Wratten: minstens 30 virussen bekend; 3–6 maanden (of langer) tussen besmetting en wrat; vaak spontane genezing binnen 2–3 jaar.", en:"Warts: at least 30 known viruses; 3 to 6 months (or longer) between infection and the wart appearing; often heal spontaneously within 2 to 3 years." },
  { code:"PEDX10", theme:"PEDX", nl:"Niet aan een wrat krabben: dat verspreidt het virus.", en:"Don't scratch a wart: that spreads the virus." },
  { code:"PEDX11", theme:"PEDX", nl:"Groene klei is steriel, bacteriewerend, hydraterend en regenererend.", en:"Green clay is sterile, antibacterial, hydrating and regenerating." },
  { code:"PEDX12", theme:"PEDX", nl:"Bij diabetes stroomt minder bloed naar de voeten en is er minder gevoel; kleine wondjes kunnen tot amputatie leiden.", en:"With diabetes, less blood flows to the feet and sensation is reduced; small wounds can lead to amputation." },
  { code:"PEDX13", theme:"PEDX", nl:"Fysiologisch eelt is beschermend en laat je gedeeltelijk zitten; enkel pathologisch eelt (hyperkeratose) is storend.", en:"Physiological callus is protective and is partly left in place; only pathological callus (hyperkeratosis) is a problem." },
  { code:"PEDX14", theme:"PEDX", nl:"Spreekwoorden: op goede/gespannen voet staan, voet bij stuk houden, een wit voetje halen…", en:"Feet even show up in language: to put your best foot forward, to stand your ground, to get in someone's good books…" },
  { code:"MA1", theme:"MA", nl:"Massage verbetert de doorbloeding, zodat spieren en huid beter van zuurstof en voedingsstoffen worden voorzien.", en:"Massage improves blood flow, so muscles and skin get more oxygen and nutrients." },
  { code:"MA2", theme:"MA", nl:"Het lymfestelsel heeft, anders dan de bloedsomloop, geen eigen pomp. Massage kan de doorstroming van de lymfe ondersteunen.", en:"Unlike the blood circulation, the lymphatic system has no pump of its own. Massage can help support lymph flow." },
  { code:"MA3", theme:"MA", nl:"Een ontspanningsmassage kan een hoge bloeddruk doen dalen dankzij het ontspannende effect op lichaam en geest.", en:"A relaxation massage can lower high blood pressure thanks to its calming effect on body and mind." },
  { code:"MA4", theme:"MA", nl:"Op een warme, veilige manier aangeraakt worden is een basisbehoefte van de mens.", en:"Being touched in a warm, safe way is a basic human need." },
  { code:"MA5", theme:"MA", nl:"Aan armen en benen strijkt de masseur naar het hart toe om bloed- en lymfestroom te ondersteunen.", en:"On the arms and legs, the masseur strokes towards the heart to support blood and lymph flow." },
  { code:"MA6", theme:"MA", nl:"Op termijn verbetert regelmatig masseren de soepelheid van je spieren en de elasticiteit van je huid.", en:"Over time, regular massage improves the flexibility of your muscles and the elasticity of your skin." },
  { code:"MA7", theme:"MA", nl:"Door het strijken en wrijven komen dode huidcellen sneller los, waardoor je huid er frisser uitziet.", en:"Stroking and rubbing help loosen dead skin cells faster, giving your skin a fresher look." },
  { code:"MA8", theme:"MA", nl:"Spierknopen ontstaan door een plaatselijk verminderde doorbloeding. Een gerichte, ontspannende massage kan helpen ze los te maken.", en:"Muscle knots form due to locally reduced blood flow. A targeted, relaxing massage can help release them." },
  { code:"MA9", theme:"MA", nl:"Lage rugpijn komt meestal door overbelasting, en ook stress of emoties spelen mee. Massage van de lage rugspieren geeft vaak diepe ontspanning.", en:"Low back pain is usually caused by overload, and stress or emotions can play a role too. Massaging the lower back muscles often brings deep relaxation." },
  { code:"MA10", theme:"MA", nl:"Massage kan je slaap en spijsvertering verbeteren.", en:"Massage can improve your sleep and digestion." },
  { code:"MA11", theme:"MA", nl:"Langzame, lange strijkingen ontspannen; meer druk, dieper werken en tapoteren stimuleren.", en:"Slow, long strokes are relaxing; more pressure, deeper work and tapping are stimulating." },
  { code:"MT1", theme:"MT", nl:"Handen blijven tijdens een massage in contact met je lichaam: loskomen haalt je uit de ontspanning.", en:"During a massage, the therapist's hands stay in contact with your body: breaking contact pulls you out of the relaxation." },
  { code:"MT2", theme:"MT", nl:"Na een massage kun je hoofdpijn, dorst, veel plassen of slaperigheid ervaren. Dat hoort bij de werking.", en:"After a massage you may feel headache, thirst, needing to urinate more, or drowsiness. This is a normal part of how it works." },
  { code:"MT3", theme:"MT", nl:"Drink na je massage veel water: dat helpt hoofdpijn voorkomen.", en:"Drink plenty of water after your massage: it helps prevent headaches." },
  { code:"MT4", theme:"MT", nl:"Massage bevordert de urineproductie, waardoor afvalstoffen en overtollig vocht makkelijker worden afgevoerd.", en:"Massage promotes urine production, making it easier to remove waste products and excess fluid." },
  { code:"MV1", theme:"MV", nl:"Koorts? Verplaats je afspraak: bij koorts wordt er niet gemasseerd.", en:"Have a fever? Reschedule your appointment: massage is not given when you have a fever." },
  { code:"MV2", theme:"MV", nl:"Bij een ontsteking van een ader (flebitis) wordt niet gemasseerd: er is gevaar voor trombose.", en:"If a vein is inflamed (phlebitis), massage is not given: there is a risk of thrombosis." },
  { code:"MV3", theme:"MV", nl:"Zwanger? Massage kan alleen na toestemming van je arts en bij een masseur die daarvoor is opgeleid.", en:"Pregnant? Massage is only possible with your doctor's approval and from a masseur trained for it." },
  { code:"MV4", theme:"MV", nl:"Psoriasis is niet besmettelijk en geen reden om massage te vermijden; een zachte massage kan juist deugd doen.", en:"Psoriasis is not contagious and no reason to avoid massage; a gentle massage can actually feel very good." },
  { code:"MV5", theme:"MV", nl:"Blauwe plekken, wondjes, zonnebrand of ontstoken huid blijven ongemoeid.", en:"Bruises, small wounds, sunburn or inflamed skin are left untouched." },
  { code:"MV6", theme:"MV", nl:"Verandert een moedervlek van vorm, kleur of grootte? Laat ze bekijken door de huisarts (ABCDE-regel).", en:"Has a mole changed shape, colour or size? Have it checked by your doctor (the ABCDE rule)." },
  { code:"MV7", theme:"MV", nl:"Fibromyalgie is een langdurige aandoening met pijn op veel plaatsen in het lichaam en vermoeidheid. Wie dat heeft, kiest best een zachte, rustgevende massage in plaats van een diepe. Dit weetje is algemeen en zegt niets over jou.", en:"Fibromyalgia is a long-term condition with pain in many parts of the body and tiredness. People who have it are better off with a gentle, calming massage than a deep one. This is general information and says nothing about you." },
  { code:"MV8", theme:"MV", nl:"Bij een acute reumatische aanval wordt niet gemasseerd; erna kan massage gewrichten en spieren soepel houden.", en:"During an acute rheumatic flare-up, massage is not given; afterwards it can help keep joints and muscles supple." },
  { code:"MR1", theme:"MR", nl:"Essentiële oliën worden altijd verdund: 2% is de gebruikelijke sterkte voor het lichaam, 1% voor het gezicht.", en:"Essential oils are always diluted: 2% is the usual strength for the body, 1% for the face." },
  { code:"MR2", theme:"MR", nl:"Geur is sterk verbonden met emotie en herinnering. Daarom kies je de geur samen met de cliënt.", en:"Scent is strongly linked to emotion and memory. That's why you choose the scent together with the client." },
  { code:"MR3", theme:"MR", nl:"Citrusoliën (citroen, sinaas, mandarijn, bergamot) kunnen huidverkleuring geven bij zon of zonnebank.", en:"Citrus oils (lemon, orange, mandarin, bergamot) can cause skin discolouration in sun or on a sunbed." },
  { code:"MR4", theme:"MR", nl:"Etherische oliën bewaar je donker, koel en droog, en niet in de badkamer.", en:"Store essential oils in a dark, cool, dry place, and not in the bathroom." },
  { code:"MR5", theme:"MR", nl:"Voor een volledige lichaamsmassage is gemiddeld 20 à 25 ml massageolie nodig.", en:"A full body massage typically needs about 20 to 25 ml of massage oil." }
];
const PRACTICE_FACT_POOLS = {
  byTreatment: {
    harmonizingback:["MA","MT","MV","MR","WEC"], cateye:["WEC","WEG"], teambeauty:["WEC","WEG"], teamcoffee:["WEC"],
    hotstone:["WEW","MA","MT","MV","MR"],
    cupping:["MA","MT","MV","MR"], cuppingpeeling:["MA","MT","MV","MR"],
    swedish:["MA","MT","MV","MR"], swedishbackneck:["MA","MT","MV","MR"], swedishlegs:["MA","MT","MV","MR"],
    backwrap:["MA","MT","MV","MR","WEH"], detoxback:["MA","MT","MV","MR","WEH"],
    harmonizingbody:["MA","MT","MV","MR","WEC"], fullbodywrap:["MA","MT","MV","MR","WEC"],
    slimmassage:["MA","MT","MV","MR","WEH"],
    pedicure:["PEDX"], pedicureexpress:["PEDX"], manipedispa:["PEDX","MA"],
    makeupworkshop:["WEC","WEG"], facialworkshop:["WEC","WEG","WEH"],
    tastingbasic:["WEC"], tastingadvanced:["WEC"], baristaworkshop:["WEC"]
  }
};

/* ============================================================
   MORE FACTS (added 22/9/2026): cell/tissue theory, nail anatomy,
   lash-styling client tips, and two facial/skin-knowledge sets.
   Kept as separate arrays, same pattern as PRACTICE_FACTS.
   - CELL_FACTS (CW): 12 facts, atoms to organism (e-learning C).
     Generic "intro" facts -- attached broadly.
   - NAIL_FACTS (NA/NB/NC/ND/NE/NF): 28 facts, nail anatomy
     (e-learning N) -- why/colour/composition/structure/growth/
     protective membranes.
   - LASH_FACTS (LL/LT): 14 client-facing lash lift and tint tips
     (Wimperstyling en lifting, Syntra AB).
   - FACIAL_FACTS (GV): 38 facts from the Gelaatsverzorging course
     (skin types, couperose, cleansing, massage, devices, diet).
   - SKINKNOW_FACTS (SK): 41 facts from the Dermatologie en
     Cosmetologie course (skin science, sun, ingredients, scent).
     5 near-duplicate facts with FACIAL_FACTS were left out (ideal
     pH, balanced-skin ratio, skin type vs condition, jojoba/sebum).
   French text lives in lang-fr.js (by code).
   ============================================================ */
const CELL_FACTS = [
  { code:"CW1", theme:"CW", nl:"Je lichaam is opgebouwd als een puzzel: kleine stukjes vormen samen telkens een groter geheel.", en:"Your body is built like a puzzle: small pieces combine to form an ever bigger whole." },
  { code:"CW2", theme:"CW", nl:"Er zijn 6 niveaus in je lichaam: atomen, moleculen, cellen, weefsels, organen en stelsels.", en:"There are 6 levels in your body: atoms, molecules, cells, tissues, organs and systems." },
  { code:"CW3", theme:"CW", nl:"Een atoom is de kleinste chemische bouwsteen waaruit alles bestaat wat je je kan inbeelden.", en:"An atom is the smallest chemical building block that everything you can imagine is made of." },
  { code:"CW4", theme:"CW", nl:"Een molecuul ontstaat wanneer atomen samen een verbinding aangaan.", en:"A molecule forms when atoms bond together." },
  { code:"CW5", theme:"CW", nl:"Een cel is de kleinste levende eenheid van je lichaam.", en:"A cell is the smallest living unit of your body." },
  { code:"CW6", theme:"CW", nl:"Je lichaam bestaat uit cellen in aantallen tot in de miljarden.", en:"Your body consists of cells numbering in the billions." },
  { code:"CW7", theme:"CW", nl:"Bijna elk celtype in je lichaam is gespecialiseerd naar vorm, grootte, functie en levenscyclus.", en:"Almost every cell type in your body is specialised in shape, size, function and life cycle." },
  { code:"CW8", theme:"CW", nl:"Een weefsel ontstaat wanneer cellen met dezelfde vorm en functie samenkomen.", en:"A tissue forms when cells with the same shape and function come together." },
  { code:"CW9", theme:"CW", nl:"Niet elk levend wezen heeft weefsels: sommige levensvormen bestaan uit slechts één cel.", en:"Not every living creature has tissues: some life forms consist of just a single cell." },
  { code:"CW10", theme:"CW", nl:"Een orgaan bestaat uit verschillende soorten weefsels die samen één specifiek doel dienen.", en:"An organ consists of several kinds of tissue that together serve one specific purpose." },
  { code:"CW11", theme:"CW", nl:"Een orgaanstelsel bestaat uit meerdere organen die samen een vitale functie van je lichaam waarmaken.", en:"An organ system consists of several organs that together carry out a vital function of your body." },
  { code:"CW12", theme:"CW", nl:"Verschillende orgaanstelsels samen vormen jou als organisme.", en:"Different organ systems together make up you as an organism." }
];
const NAIL_FACTS = [
  { code:"NA1", theme:"NA", nl:"Zonder nagels zou er eelt op je vingertoppen groeien – en dan zou je juist minder goed kunnen voelen.", en:"Without nails, calluses would form on your fingertips — and you'd actually feel less well, not more." },
  { code:"NA2", theme:"NA", nl:"Je nagels maken het makkelijker om vooral kleine voorwerpen vast te nemen.", en:"Your nails make it easier to pick up especially small objects." },
  { code:"NA3", theme:"NA", nl:"Je nagels beschermen je lichaam tegen het binnendringen van vreemde stoffen en bacteriën.", en:"Your nails protect your body against foreign substances and bacteria getting in." },
  { code:"NA4", theme:"NA", nl:"Verzorgde of onverzorgde nagels dragen bij aan hoe je overkomt op anderen.", en:"Well-groomed or neglected nails affect how you come across to others." },
  { code:"NB1", theme:"NB", nl:"Roze nagels wijzen op een gezonde, normale doorbloeding.", en:"Pink nails indicate healthy, normal blood flow." },
  { code:"NB2", theme:"NB", nl:"Blauwe nagels kunnen wijzen op een slechte doorbloeding of te weinig zuurstof.", en:"Blue nails can indicate poor circulation or too little oxygen." },
  { code:"NB3", theme:"NB", nl:"Witte nagels kunnen wijzen op een tekort aan vitaminen.", en:"White nails can indicate a vitamin deficiency." },
  { code:"NB4", theme:"NB", nl:"Rode nagels kunnen wijzen op hoge bloeddruk of bloedstoornissen.", en:"Red nails can indicate high blood pressure or blood disorders." },
  { code:"NC1", theme:"NC", nl:"Je nagel bestaat uit honderden laagjes keratinecellen – net als de hoornlaag van je huid, maar dan veel harder.", en:"Your nail consists of hundreds of layers of keratin cells — just like your skin's horny layer, but much harder." },
  { code:"NC2", theme:"NC", nl:"Anders dan huidcellen schilferen de dode keratinecellen van je nagel niet af.", en:"Unlike skin cells, the dead keratin cells of your nail don't flake off." },
  { code:"NC3", theme:"NC", nl:"Cystine, het hoofdbestanddeel van keratine, vormt zwavelbruggen die je nagel stevigheid geven.", en:"Cystine, the main component of keratin, forms sulphur bridges that give your nail its strength." },
  { code:"NC4", theme:"NC", nl:"Zink zit niet in je nagel zelf, maar helpt wel mee aan de aanmaak van keratine.", en:"Zinc isn't in your nail itself, but it does help with keratin production." },
  { code:"NC5", theme:"NC", nl:"Calcium en selenium dragen allebei bij aan de stevigheid van je nagels.", en:"Calcium and selenium both contribute to the strength of your nails." },
  { code:"ND1", theme:"ND", nl:"Je nagel rust met de nagelplaat op het nagelbed – zoals je lichaam op een bed rust.", en:"Your nail plate rests on the nail bed — the way your body rests on a bed." },
  { code:"ND2", theme:"ND", nl:"De rozige kleur van je nagel komt van de bloedvaten in het nagelbed eronder; de nagel zelf is doorzichtig.", en:"The pinkish colour of your nail comes from the blood vessels in the nail bed underneath; the nail itself is transparent." },
  { code:"ND3", theme:"ND", nl:"Je nagelplaat bestaat uit 3 lagen: de epitheellaag (hechting), de sponslaag (stevigheid) en de hoornlaag (bescherming).", en:"Your nail plate consists of 3 layers: the epithelial layer (attachment), the spongy layer (strength) and the horny layer (protection)." },
  { code:"ND4", theme:"ND", nl:"De sponslaag van je nagel bevat piepkleine poriën die voedingsstoffen, vocht en vet vasthouden.", en:"The spongy layer of your nail contains tiny pores that hold nutrients, moisture and fat." },
  { code:"ND5", theme:"ND", nl:"De lunula, het halve maantje aan de basis van je nagel, is nog niet volledig verhoornd en dus minder hard dan de rest.", en:"The lunula, the little half-moon at the base of your nail, isn't fully keratinised yet, so it's softer than the rest." },
  { code:"ND6", theme:"ND", nl:"De nagelriem (cuticula) beschermt je nagelwortel tegen vreemde stoffen en micro-organismen.", en:"The cuticle protects your nail root against foreign substances and micro-organisms." },
  { code:"NE1", theme:"NE", nl:"Nieuwe nagelcellen ontstaan in je nagelwortel, niet in je nagelbed.", en:"New nail cells form in your nail root, not in your nail bed." },
  { code:"NE2", theme:"NE", nl:"Je nagels groeien gemiddeld 3 mm per maand.", en:"Your nails grow about 3 mm a month on average." },
  { code:"NE3", theme:"NE", nl:"Je nagels groeien sneller in de zomer dan in de winter.", en:"Your nails grow faster in summer than in winter." },
  { code:"NE4", theme:"NE", nl:"Een vingernagel groeit 4x sneller dan een teennagel.", en:"A fingernail grows 4 times faster than a toenail." },
  { code:"NE5", theme:"NE", nl:"Een vingernagel vernieuwt zich gemiddeld in 4 tot 6 maanden; een teennagel kan daar tot 18 maanden over doen.", en:"A fingernail fully renews itself in about 4 to 6 months; a toenail can take up to 18 months." },
  { code:"NE6", theme:"NE", nl:"Nieuwe nagelcellen ontstaan door mitoseceldeling: uit 1 moedercel ontstaan 2 identieke dochtercellen.", en:"New nail cells form through mitosis: 1 mother cell produces 2 identical daughter cells." },
  { code:"NF1", theme:"NF", nl:"Drie dunne vliesjes houden je nagel op zijn plaats: het eponychium, het perionychium en het hyponychium.", en:"Three thin membranes hold your nail in place: the eponychium, the perionychium and the hyponychium." },
  { code:"NF2", theme:"NF", nl:"Het eponychium verbindt je proximale nagelwal met je nagelplaat.", en:"The eponychium connects your proximal nail fold to your nail plate." },
  { code:"NF3", theme:"NF", nl:"Het hyponychium verbindt de vrije rand van je nagel met je nagelbed.", en:"The hyponychium connects the free edge of your nail to your nail bed." }
];
const LASH_FACTS = [
  { code:"LL1", theme:"LL", nl:"Een lash lift geeft je eigen wimpers een natuurlijke krul en opent je blik – zonder extensions.", en:"A lash lift gives your own lashes a natural curl and opens up your eyes — no extensions needed." },
  { code:"LL2", theme:"LL", nl:"Het resultaat blijft ongeveer 8 weken mooi, afhankelijk van hoe snel je wimpers groeien.", en:"The result stays nice for about 8 weeks, depending on how fast your lashes grow." },
  { code:"LL3", theme:"LL", nl:"De eerste 24 uur na je lash lift: geen water op je wimpers, zo zet de krul zich goed vast.", en:"The first 24 hours after your lash lift: no water on your lashes, so the curl sets properly." },
  { code:"LL4", theme:"LL", nl:"Slaap je op je buik? Boek je lash lift dan liefst in de voormiddag. Een zijden kussensloop helpt ook.", en:"Do you sleep on your stomach? Book your lash lift in the morning if you can. A silk pillowcase helps too." },
  { code:"LL5", theme:"LL", nl:"Olie is de vijand van je krul: gebruik een olievrije make-up remover of zachte foamreiniger.", en:"Oil is the enemy of your curl: use an oil-free make-up remover or a gentle foam cleanser." },
  { code:"LL6", theme:"LL", nl:"Borstel je wimpers elke dag even in model met een wimperborsteltje.", en:"Brush your lashes into shape every day with a lash brush." },
  { code:"LL7", theme:"LL", nl:"Na een lift heb je eigenlijk geen mascara meer nodig.", en:"After a lift, you don't really need mascara any more." },
  { code:"LT1", theme:"LT", nl:"Lichte, blonde of grijze wimpers? Een tint geeft definitie zonder dagelijkse mascara.", en:"Light, blonde or grey lashes? A tint gives definition without daily mascara." },
  { code:"LT2", theme:"LT", nl:"Een wimpertint gaat meestal 4 tot 6 weken mee.", en:"A lash tint usually lasts 4 to 6 weeks." },
  { code:"LT3", theme:"LT", nl:"De eerste keer kiezen we een tint dicht bij je natuurlijke kleur – geen schrikeffect.", en:"The first time, we choose a shade close to your natural colour — no surprises." },
  { code:"LT4", theme:"LT", nl:"Nieuw bij ons? We doen 24–48 uur vooraf een kleine allergietest (patchtest).", en:"New to us? We do a small allergy test (patch test) 24 to 48 hours beforehand." },
  { code:"LT5", theme:"LT", nl:"Kom zonder mascara en zonder wimperextensions naar je afspraak.", en:"Come to your appointment without mascara and without lash extensions." },
  { code:"LT6", theme:"LT", nl:"Tussen twee lash lifts laten we minstens 8 weken.", en:"We leave at least 8 weeks between two lash lifts." },
  { code:"LT7", theme:"LT", nl:"Zwanger of borstvoeding? Dan wachten we uit voorzorg liever met lift en tint.", en:"Pregnant or breastfeeding? As a precaution, we prefer to wait with lift and tint." }
];
const FACIAL_FACTS = [
  { code:"GV1", theme:"GV", nl:"Een gezonde huid is licht zuur: de ideale pH ligt rond 5,5.", en:"Healthy skin is slightly acidic: the ideal pH is around 5.5." },
  { code:"GV2", theme:"GV", nl:"Een echt evenwichtige huid is zeldzaam – die stralende filterhuid op Instagram is eerder uitzondering dan realiteit.", en:"A truly balanced skin is rare — that glowing 'Instagram filter' skin is the exception rather than the rule." },
  { code:"GV3", theme:"GV", nl:"In een evenwichtige huid zijn talg en vocht in balans: ongeveer 25% talg en 75% vocht.", en:"In balanced skin, sebum and moisture are in balance: about 25% sebum and 75% moisture." },
  { code:"GV4", theme:"GV", nl:"Huidtype is aangeboren en vrij constant; een huidconditie (acné, uitdroging, gevoeligheid …) is tijdelijk en kun je wél verbeteren.", en:"Skin type is inborn and fairly constant; a skin condition (acne, dehydration, sensitivity...) is temporary and can be improved." },
  { code:"GV5", theme:"GV", nl:"Een droge huid kan een vettekort (sebostase) of een vochttekort (gedehydrateerd) zijn – de eerste moet je voeden, de tweede hydrateren.", en:"Dry skin can mean a lack of fat (sebostasis) or a lack of moisture (dehydrated) — the first needs nourishing, the second hydrating." },
  { code:"GV6", theme:"GV", nl:"Sebo-stase = te weinig talg, seborr-hee = te veel talg.", en:"Sebostasis = too little sebum, seborrhoea = too much sebum." },
  { code:"GV7", theme:"GV", nl:"Na de zomer of na de zonnebank wordt de huid vaak vetter.", en:"After summer or a sunbed, skin often becomes oilier." },
  { code:"GV8", theme:"GV", nl:"Een vette huid kan er droog uitzien: bij seborrhee sicca zit de talg vast in de porie en vormt met huidschilfers korstjes, vooral op neus en wenkbrauwen.", en:"Oily skin can look dry: with seborrhoea sicca the sebum gets stuck in the pore and forms little crusts with skin flakes, mainly on the nose and eyebrows." },
  { code:"GV9", theme:"GV", nl:"Een vette huid bruint goed en rimpelt minder snel.", en:"Oily skin tans well and wrinkles less quickly." },
  { code:"GV10", theme:"GV", nl:"Een “potje voor gemengde huid” is volgens de cursus nooit ideaal: het potje weet niet waar je huid vet of droog is. Verzorg elke zone apart.", en:"A 'one jar for combination skin' is never ideal: the jar doesn't know which zones of your skin are oily or dry. Treat each zone separately." },
  { code:"GV11", theme:"GV", nl:"Jojoba-olie (plantaardig) en lanoline (wolvet) lijken het meest op onze eigen huidtalg.", en:"Jojoba oil (plant-based) and lanolin (wool fat) most closely resemble our own skin sebum." },
  { code:"GV12", theme:"GV", nl:"Rond 45 jaar werken collageen- en elastinevezels minder optimaal en zit het vochttekort dieper in de huid.", en:"Around age 45, collagen and elastin fibres work less optimally and moisture loss sits deeper in the skin." },
  { code:"GV13", theme:"GV", nl:"Er zijn 6 fototypes: van type I (bleke huid, rood/blond haar, verbrandt zeer snel) tot type VI (bruint zeer goed, verbrandt nooit).", en:"There are 6 skin phototypes: from type I (pale skin, red/blond hair, burns very fast) to type VI (tans very well, never burns)." },
  { code:"GV14", theme:"GV", nl:"Couperose wordt ook wel “spataderen van het gezicht” genoemd.", en:"Couperose is sometimes called 'varicose veins of the face'." },
  { code:"GV15", theme:"GV", nl:"Hete dranken, pikante gerechten, wijn, kruiden en wisselen tussen warm en koud kunnen couperose uitlokken.", en:"Hot drinks, spicy food, wine, herbs and switching between hot and cold can trigger couperose." },
  { code:"GV16", theme:"GV", nl:"Actieve couperose is warm en rood, passieve couperose eerder violet en koud.", en:"Active couperose is warm and red, passive couperose is more violet and cold." },
  { code:"GV17", theme:"GV", nl:"Bij couperose: geen hete kompressen, geen alcohol en liefst geen sauna of stoombad. Lauw of koel is de boodschap.", en:"For couperose: no hot compresses, no alcohol, and preferably no sauna or steam bath. Lukewarm or cool is the way to go." },
  { code:"GV18", theme:"GV", nl:"Kalmerend bij couperose: linde, azuleen, kaolien en melkproducten. Vaatwandversterkend: hamamelis, muisdoorn en wilde wingerd.", en:"Calming for couperose: lime blossom, azulene, kaolin and milk-based products. Vein-strengthening: witch hazel, butcher's broom and Virginia creeper." },
  { code:"GV19", theme:"GV", nl:"Een toner herstelt de pH na het reinigen – vooral schuimende reinigers maken de huid basischer.", en:"A toner restores the pH after cleansing — foaming cleansers especially make the skin more alkaline." },
  { code:"GV20", theme:"GV", nl:"Een vochtige, verweekte huid neemt verzorging beter op; een enzympeeling werkt pas optimaal op een bevochtigde huid.", en:"Moist, softened skin absorbs skincare better; an enzyme peel only works optimally on damp skin." },
  { code:"GV21", theme:"GV", nl:"Hoeveel peeling of crème? Ongeveer zo groot als een okkernoot.", en:"How much peeling or cream? About the size of a walnut." },
  { code:"GV22", theme:"GV", nl:"Een kleimasker laat je niet volledig uitdrogen: blijf het bevochtigen.", en:"Don't let a clay mask dry out completely: keep it damp." },
  { code:"GV23", theme:"GV", nl:"Een professionele gelaatsverzorging plan je idealiter om de 5 weken.", en:"A professional facial is ideally planned every 5 weeks." },
  { code:"GV24", theme:"GV", nl:"Rijpe huid thuis: panthenol, hyaluronzuur en wijngistextract, en Q10 als antioxidant.", en:"For mature skin at home: panthenol, hyaluronic acid and wine yeast extract, plus Q10 as an antioxidant." },
  { code:"GV25", theme:"GV", nl:"Een drukpuntmassage is verwant aan shiatsu en acupressuur: gericht drukken op specifieke punten, zonder olie – fijn bij spanning, vermoeidheid en hoofdpijn.", en:"A pressure-point massage is related to shiatsu and acupressure: targeted pressure on specific points, without oil — great for tension, fatigue and headaches." },
  { code:"GV26", theme:"GV", nl:"Tijdens een gelaatsverzorging lig je op je rug met de knieën net iets hoger dan je heupen: dat ontspant en helpt het bloed terug naar het hart.", en:"During a facial you lie on your back with your knees slightly higher than your hips: this relaxes you and helps blood flow back to the heart." },
  { code:"GV27", theme:"GV", nl:"Een verzorging start met een welkomsmassage van nek, haargrens en hoofdhuid – het eerste contact met de klant.", en:"A treatment starts with a welcome massage of the neck, hairline and scalp — the first contact with the client." },
  { code:"GV28", theme:"GV", nl:"Bij lymfedrainage verschuif je de bovenhuid ten opzichte van de onderhuid om lymfe af te voeren.", en:"In lymphatic drainage, you shift the upper skin layer relative to the layer underneath to help move lymph." },
  { code:"GV29", theme:"GV", nl:"Een ultrasone spatel trilt aan 25.000 tot 30.000 hertz; de microscopisch kleine belletjes (cavitatie) maken de poriën schoon.", en:"An ultrasonic spatula vibrates at 25,000 to 30,000 hertz; microscopic bubbles (cavitation) clean out the pores." },
  { code:"GV30", theme:"GV", nl:"De ultrasone spatel is pijnloos en ook geschikt voor een gevoelige huid.", en:"The ultrasonic spatula is painless and also suitable for sensitive skin." },
  { code:"GV31", theme:"GV", nl:"Een vapozone gebruik je op ongeveer 20 cm van het gezicht, 10 à 15 minuten.", en:"A facial steamer is used about 20 cm from the face, for 10 to 15 minutes." },
  { code:"GV32", theme:"GV", nl:"Een huidanalysetoestel maakt 12 à 15 foto’s in verschillende lichtspectra en meet de hydratatie – huidveranderingen ontstaan diep en worden vaak pas later zichtbaar.", en:"A skin analysis device takes 12 to 15 photos in different light spectra and measures hydration — skin changes start deep down and often only become visible later." },
  { code:"GV33", theme:"GV", nl:"Drink voldoende water: een vochtarme huid heeft baat bij hydratatie van binnenuit.", en:"Drink enough water: dehydrated skin benefits from hydration from the inside out." },
  { code:"GV34", theme:"GV", nl:"De cursus noemt koffie en alcohol waterafdrijvend. Tip voor de app: drink bij je koffie een glaasje water.", en:"Coffee and alcohol are diuretics. Tip: have a glass of water alongside your coffee." },
  { code:"GV35", theme:"GV", nl:"Antioxidanten tegen vrije radicalen vind je onder meer in rode wijn, broccoli en fondantchocolade.", en:"Antioxidants against free radicals are found in, among others, red wine, broccoli and dark chocolate." },
  { code:"GV36", theme:"GV", nl:"Een te eiwitrijk dieet is volgens de cursus niet goed voor een vetarme huid.", en:"A diet too high in protein is not good for skin lacking in fat, according to the course." },
  { code:"GV37", theme:"GV", nl:"Geef een beautypas mee: uitgevoerde behandeling, aangeraden producten en wanneer de volgende afspraak best plaatsvindt.", en:"Give a beauty card: the treatment done, recommended products and when the next appointment is best." },
  { code:"GV38", theme:"GV", nl:"Brandwonde, bijvoorbeeld door stoom? Water, water, water … en de rest komt later.", en:"A burn, for example from steam? Water, water, water… everything else comes later." }
];
const SKINKNOW_FACTS = [
  { code:"SK1", theme:"SK", nl:"Na de vochtarme (gedehydrateerde) huid is de gemengde huid het meest voorkomende huidtype.", en:"After dehydrated skin, combination skin is the most common skin type." },
  { code:"SK2", theme:"SK", nl:"Je huid bestaat voor zo’n 70 tot 72% uit water.", en:"Your skin is made up of about 70 to 72% water." },
  { code:"SK3", theme:"SK", nl:"Op je huid leven samen zo’n 1,5 kilo micro-organismen, tien keer meer dan je eigen lichaamscellen.", en:"About 1.5 kg of micro-organisms live on your skin together — ten times more than your own body cells." },
  { code:"SK4", theme:"SK", nl:"Zweet ruikt op zich niet. De geur ontstaat pas als het in contact komt met huidbacteriën.", en:"Sweat itself doesn't smell. The odour only appears once it contacts skin bacteria." },
  { code:"SK5", theme:"SK", nl:"Je neus is het drukst bevolkte stukje van je gezicht; in je oksels leven zo’n 2,5 miljoen micro-organismen per cm².", en:"Your nose is the most densely populated spot on your face; about 2.5 million micro-organisms live per cm² in your armpits." },
  { code:"SK6", theme:"SK", nl:"De opperhuid heeft geen bloedvaten of zenuwen: ze wordt gevoed vanuit de lederhuid eronder.", en:"The epidermis has no blood vessels or nerves: it is nourished from the dermis underneath." },
  { code:"SK7", theme:"SK", nl:"Vochtverlies van de huid begint al ongeveer 15 minuten na de geboorte.", en:"Skin moisture loss already begins about 15 minutes after birth." },
  { code:"SK8", theme:"SK", nl:"Expressierimpels verschijnen vanaf ongeveer 35 jaar, diepere plooien zoals de neus-mondplooi vanaf ongeveer 45 jaar.", en:"Expression lines appear from about age 35, deeper folds like the nasolabial fold from about age 45." },
  { code:"SK9", theme:"SK", nl:"Rond de ogen is de huid dun en heeft ze weinig talgklieren. Daarom is een poedermasker daar geen goed idee.", en:"The skin around the eyes is thin and has few sebaceous glands. That's why a powder mask isn't a good idea there." },
  { code:"SK10", theme:"SK", nl:"Handpalmen en voetzolen nemen producten het minst op; gezicht en oksels het meest.", en:"Palms and soles absorb products the least; the face and armpits the most." },
  { code:"SK11", theme:"SK", nl:"Een warme, vochtige en goed doorbloede huid neemt verzorging beter op dan een koude, droge huid.", en:"Warm, moist, well-perfused skin absorbs skincare better than cold, dry skin." },
  { code:"SK12", theme:"SK", nl:"Meer crème is niet beter: als de hoornlaag verzadigd is, dringt de rest niet meer door.", en:"More cream isn't better: once the horny layer is saturated, the rest can't penetrate any further." },
  { code:"SK13", theme:"SK", nl:"Collageen in een crème is te groot om door te dringen. Gehydrolyseerd collageen (in stukjes) kan dat wel.", en:"Collagen in a cream is too large to penetrate. Hydrolysed collagen (broken into pieces) can." },
  { code:"SK14", theme:"SK", nl:"Hyaluronzuur kan tot zes liter water per gram vasthouden, maar voegt zelf geen vocht toe: het houdt het bestaande vocht vast.", en:"Hyaluronic acid can hold up to six litres of water per gram, but doesn't add moisture itself: it locks in existing moisture." },
  { code:"SK15", theme:"SK", nl:"Bij een droge huid zit er tot 50% minder ureum (een natuurlijke vochtvasthouder) in de huid.", en:"Dry skin can contain up to 50% less urea (a natural moisture-retaining substance)." },
  { code:"SK16", theme:"SK", nl:"UVA = A van Aging (veroudering), UVB = B van Branden, UVC = C van Catastrofe.", en:"UVA = A for Ageing, UVB = B for Burning, UVC = C for Catastrophe." },
  { code:"SK17", theme:"SK", nl:"UVA is 95% van de UV die ons bereikt, is er het hele jaar en gaat dwars door wolken en ramen.", en:"UVA makes up 95% of the UV that reaches us, is present all year round and passes straight through clouds and windows." },
  { code:"SK18", theme:"SK", nl:"SPF-klassen: laag 6-10, gemiddeld 15-25, hoog 30-50, zeer hoog 50+.", en:"SPF classes: low 6-10, medium 15-25, high 30-50, very high 50+." },
  { code:"SK19", theme:"SK", nl:"Het UVA-logo betekent dat de UVA-bescherming minstens een derde van de SPF bedraagt.", en:"The UVA logo means the UVA protection is at least a third of the SPF value." },
  { code:"SK20", theme:"SK", nl:"Voor kinderen: minimaal SPF 30 met UVA-bescherming. Een betaalbare crème die je royaal smeert, is beter dan een dure die je spaarzaam gebruikt.", en:"For children: at least SPF 30 with UVA protection. An affordable cream applied generously beats an expensive one used sparingly." },
  { code:"SK21", theme:"SK", nl:"Zelfbruiner en bruinversnellers geven kleur, maar géén bescherming tegen UV.", en:"Self-tanner and tan accelerators give colour, but no protection against UV." },
  { code:"SK22", theme:"SK", nl:"Kies een zonnebril met CE-keurmerk, liefst CE-3 voor kinderen. Donkere glazen zonder UV-filter maken je pupillen groter en laten zo meer UV binnen.", en:"Choose sunglasses with a CE mark, preferably CE-3 for children. Dark lenses without a UV filter make your pupils widen and let in more UV." },
  { code:"SK23", theme:"SK", nl:"Donkere, strak geweven kleding beschermt beter dan lichte. De UPF-waarde van kleding verdwijnt niet in de was.", en:"Dark, tightly woven clothing protects better than light clothing. The UPF value of clothing doesn't wash out." },
  { code:"SK24", theme:"SK", nl:"Parfum op huid die in de zon komt, kan pigmentvlekken geven.", en:"Perfume on skin that goes into the sun can cause pigmentation spots." },
  { code:"SK25", theme:"SK", nl:"Zon helpt je lichaam vitamine D aanmaken, maar te veel zon droogt de huid uit en kan couperose verergeren.", en:"Sun helps your body produce vitamin D, but too much sun dries out the skin and can worsen couperose." },
  { code:"SK26", theme:"SK", nl:"Vitamine C en E versterken elkaar in de strijd tegen vrije radicalen.", en:"Vitamin C and E reinforce each other in the fight against free radicals." },
  { code:"SK27", theme:"SK", nl:"Fruitzuren (AHA’s) werk je best als kuur: na 14 dagen een zachtere huid, maar niet langer dan 4 weken na elkaar.", en:"Fruit acids (AHAs) work best as a course: softer skin after 14 days, but not longer than 4 weeks in a row." },
  { code:"SK28", theme:"SK", nl:"Azuleen is het blauwe, kalmerende stofje uit kamille.", en:"Azulene is the blue, soothing compound from chamomile." },
  { code:"SK29", theme:"SK", nl:"Er bestaan meer dan 200 soorten aloë, maar maar één echte aloë vera (‘vera’ betekent ‘echt’).", en:"There are more than 200 species of aloe, but only one true aloe vera ('vera' means 'true')." },
  { code:"SK30", theme:"SK", nl:"Paraffine en vaseline geven meteen een zacht gevoel, maar te vaak gebruikt kunnen ze de natuurlijke vochtregeling van de huid verstoren.", en:"Paraffin and vaseline give an instant soft feeling, but used too often they can disrupt the skin's natural moisture regulation." },
  { code:"SK31", theme:"SK", nl:"Natuurlijk is niet altijd allergievrij: kamille, arnica, aloë vera en etherische oliën kunnen ook allergie geven.", en:"Natural doesn't always mean allergy-free: chamomile, arnica, aloe vera and essential oils can also cause allergies." },
  { code:"SK32", theme:"SK", nl:"Hypoallergeen betekent ‘minder kans op allergie’, geen garantie.", en:"Hypoallergenic means 'lower chance of allergy', not a guarantee." },
  { code:"SK33", theme:"SK", nl:"Op het etiket staan ingrediënten van meeste naar minste. Staat ‘aqua’ eerst, dan is het product vooral water.", en:"Ingredients are listed from most to least on the label. If 'aqua' comes first, the product is mostly water." },
  { code:"SK34", theme:"SK", nl:"‘Cruelty-free’ is niet hetzelfde als ‘vegan’: niet getest op dieren kan nog steeds honing bevatten.", en:"'Cruelty-free' isn't the same as 'vegan': not tested on animals can still mean it contains honey." },
  { code:"SK35", theme:"SK", nl:"Gooi een geopend product na een jaar weg, of eerder als geur of kleur verandert. Schep uit een pot met een spatel.", en:"Throw away an opened product after a year, or sooner if the smell or colour changes. Scoop from a jar with a spatula." },
  { code:"SK36", theme:"SK", nl:"Plastic scrubkorrels (microbeads) belanden in zee. Natuurlijke alternatieven: gemalen abrikozenpit, zout of suiker.", en:"Plastic scrub beads (microbeads) end up in the sea. Natural alternatives: ground apricot kernel, salt or sugar." },
  { code:"SK37", theme:"SK", nl:"Parfum bevat 20-40% geurconcentraat, eau de parfum 10-20%, eau de toilette 5-10%, eau de cologne 2-3%.", en:"Perfume contains 20-40% fragrance concentrate, eau de parfum 10-20%, eau de toilette 5-10%, eau de cologne 2-3%." },
  { code:"SK38", theme:"SK", nl:"Beoordeel een parfum pas na zo’n kwartier op je huid: dan komen de hartnoten naar boven.", en:"Only judge a perfume after about fifteen minutes on your skin: that's when the heart notes come through." },
  { code:"SK39", theme:"SK", nl:"Rozenwater is het ‘bijproduct’ van de distillatie van rozenolie: een hydrolaat.", en:"Rose water is the 'by-product' of distilling rose oil: a hydrosol." },
  { code:"SK40", theme:"SK", nl:"Etherische oliën zijn heel krachtig en gebruik je altijd verdund: een beetje gaat een lange weg.", en:"Essential oils are very potent and are always used diluted: a little goes a long way." },
  { code:"SK41", theme:"SK", nl:"Na bergamot- of sinaasappelolie op de huid minstens 12 uur uit de zon blijven, anders kunnen bruine vlekken ontstaan.", en:"After bergamot or orange oil on the skin, stay out of the sun for at least 12 hours, or brown spots can appear." }
];
const MORE_FACT_POOLS = {
  cellIntro: true,
  byTreatment: {
    expressfacial:["GV","SK"], acnefacial:["GV","SK"], lashtint:["LL","LT"], manicureexpress:["NA","NB","NC","ND","NE","NF"], cateye:["NA","NB","NC","ND","NE","NF"], harmonizingback:["GV","SK"], teambeauty:["GV"],
    manicure:["NA","NB","NC","ND","NE","NF"], manipedispa:["NA","NB","NC","ND","NE","NF"],
    pedicure:["NA","NB","NC","ND","NE","NF"], pedicureexpress:["NA","NB","NC","ND","NE","NF"],
    lashlift:["LL","LT"],
    hydrapeel:["GV","SK"], signaturefacial:["GV","SK"], fillme:["GV","SK"],
    fruitacid:["GV","SK"], liftsummere:["GV","SK"], antiagefacial:["GV","SK"],
    detoxback:["GV","SK"], harmonizingbody:["GV","SK"], fullbodywrap:["GV","SK"],
    facialworkshop:["GV","SK"], makeupworkshop:["GV"],
    hotstone:["GV"], swedish:["GV"], swedishbackneck:["GV"], swedishlegs:["GV"],
    backwrap:["GV"], slimmassage:["GV"], cupping:["GV"], cuppingpeeling:["GV"]
  }
};

/* ============================================================
   UPSELL SUGGESTIONS — small add-ons shown on the result screen.
   One suggestion per treatment id (optional — a treatment with
   none simply shows no upsell card). Keep it to genuinely cheap,
   quick add-ons; this is a nudge, not a hard sell.
   ============================================================ */
function U(nl, en, fr, price){ return { nl, en, fr, price }; }
const UPSELL_SUGGESTIONS = {
  expressfacial: U("Voeg een ampul / serum toe", "Add an ampoule / serum", "Ajoutez une ampoule / un sérum", "+€5"),
  acnefacial: U("Voeg LED-therapie toe", "Add LED therapy", "Ajoutez la luminothérapie LED", "+€10"),
  bridaltrial: U("Kies meteen het pakket proef- &amp; bruidsmake-up", "Go for the trial &amp; wedding-day package", "Optez pour le forfait essai &amp; mariage", "€135"),
  browtint: U("Combineer met Lash Tinting", "Combine with Lash Tinting", "Combinez avec la teinture des cils", "€20"),
  lashtint: U("Combineer met Brow Tinting", "Combine with Brow Tinting", "Combinez avec la teinture des sourcils", "€20"),
  browshaping: U("Voeg Brow Tinting toe", "Add Brow Tinting", "Ajoutez la teinture des sourcils", "+€20"),
  manicureexpress: U("Voeg gellak (soak-off) toe", "Add gel polish (soak-off)", "Ajoutez un vernis gel (soak-off)", "+€20"),
  kin: U("Combineer met bovenlip-ontharing", "Combine with upper-lip hair removal", "Combinez avec l'épilation de la lèvre supérieure", "+€10"),
  bovenlip: U("Combineer met kinontharing", "Combine with chin hair removal", "Combinez avec l'épilation du menton", "+€10"),
  schouders: U("Combineer met rugontharing", "Combine with back waxing", "Combinez avec l'épilation du dos", "€40"),
  volledigebenen: U("Voeg een harmoniserende verzorging toe voor een zachtere huid", "Add a harmonising treatment for softer skin", "Ajoutez un soin harmonisant pour une peau plus douce", "€35"),
  harmonizingback: U("Kies de full body-versie", "Choose the full body version", "Choisissez la version corps entier", "€70"),
  cateye: U("Kom met z'n tweeën: duo €75 p.p.", "Come as a pair: duo €75 p.p.", "Venez à deux : duo €75 p.p.", null),
  swedish: U("Voeg Hot Stone toe aan je massage", "Add Hot Stone to your massage", "Ajoutez le Hot Stone à votre massage", "+€20"),
  swedishbackneck: U("Voeg Hot Stone toe aan je massage", "Add Hot Stone to your massage", "Ajoutez le Hot Stone à votre massage", "+€20"),
  swedishlegs: U("Voeg een handpeeling toe", "Add a hand peeling", "Ajoutez un gommage des mains", "+€10"),
  detoxback: U("Voeg een Hot Stone gelaatsmassage toe", "Add a Hot Stone facial massage", "Ajoutez un massage du visage Hot Stone", "+€20"),
  harmonizingbody: U("Voeg een handpeeling &amp; -massage toe", "Add a hand peeling & massage", "Ajoutez un gommage et massage des mains", "+€10"),
  cupping: U("Vraag naar Cupping Body Renewal voor een volgende zone", "Ask about Cupping Body Renewal for another zone", "Demandez le Cupping Body Renewal pour une autre zone", "€120"),
  hotstone: U("Voeg LED-therapie toe aan je volgende gelaatsverzorging", "Add LED therapy to your next facial", "Ajoutez la luminothérapie LED à votre prochain soin du visage", "+€10"),
  hydrapeel: U("Voeg een collageenvliesmasker toe", "Add a collagen sheet mask", "Ajoutez un masque en tissu au collagène", "+€20"),
  signaturefacial: U("Voeg een Hot Stone gelaatsmassage toe", "Add a Hot Stone facial massage", "Ajoutez un massage du visage Hot Stone", "+€20"),
  fillme: U("Voeg LED-therapie toe", "Add LED therapy", "Ajoutez la luminothérapie LED", "+€10"),
  fruitacid: U("Voeg een anti-aging paraffinemasker toe", "Add an anti-aging paraffin mask", "Ajoutez un masque à la paraffine anti-âge", "+€20"),
  liftsummere: U("Voeg een peel-off masker toe", "Add a peel-off mask", "Ajoutez un masque peel-off", "+€15"),
  antiagefacial: U("Voeg een collageenvliesmasker toe", "Add a collagen sheet mask", "Ajoutez un masque en tissu au collagène", "+€20"),
  manicure: U("Voeg een SPA-supplement toe", "Add a SPA add-on", "Ajoutez un supplément SPA", "+€30"),
  pedicure: U("Voeg een SPA-supplement toe", "Add a SPA add-on", "Ajoutez un supplément SPA", "+€30"),
  pedicureexpress: U("Kies de uitgebreide pedicure voor eeltverzorging en massage", "Choose the full pedicure for callus care and massage", "Optez pour la pédicure complète (callosités et massage)", "€35"),
  glammakeup: U("Voeg valse wimpers toe (breng je eigen wimpers en lijm mee)", "Add false lashes (bring your own lashes and glue)", "Ajoutez des faux cils (apportez vos cils et colle)", null),
  browlift: U("Combineer met Lash Lift voor een complete look", "Combine with a Lash Lift for a complete look", "Combinez avec un Lash Lift pour un look complet", "€75"),
  lashlift: U("Combineer met Brow Lift voor een complete look", "Combine with a Brow Lift for a complete look", "Combinez avec un Brow Lift pour un look complet", "€75"),
  oksel: U("Combineer met bovenlip-ontharing", "Combine with upper-lip hair removal", "Combinez avec l'épilation de la lèvre supérieure", "+€10"),
  been: U("Voeg een harmoniserende verzorging toe voor een zachtere huid", "Add a harmonising treatment for softer skin", "Ajoutez un soin harmonisant pour une peau plus douce", "€35")
};
