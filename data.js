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
/* ONLINE BOOKING — the link to your own booking page (for example a free
   Google Calendar "appointment schedule": Google Agenda → Maken → Afspraakschema
   → share the link of the booking page). Leave "" to hide the button; then
   clients book via WhatsApp or mail, as before. */
const ONLINE_BOOKING_URL = "https://calendar.app.google/TmLcen9zSQuZZjtEA";
/* Review reminder: shown in "Mijn afspraken" from this many hours after the
   start of a saved appointment (20 = the day after), for 14 days. */
const APPT_REVIEW_AFTER_HOURS = 20;

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
 "Express Gelaatsverzorging – Opgebruikactie": {
  "en": "Express facial – special offer",
  "fr": "Soin du visage express – offre spéciale"
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
 "Express Gelaatsverzorging – Opgebruikactie": {
  "nl": "Express gelaatsverzorging – opgebruikactie",
  "en": "Express facial – special offer",
  "fr": "Soin du visage express – offre spéciale"
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
    inStock: false,   // home-made soaps no longer offered (EU cosmetics rules) — never recommended
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
    benefits:{ nl:"Een intensieve massage waarbij cups lokaal worden ingezet in combinatie met manuele massagetechnieken, bijvoorbeeld op rug, schouders, armen of benen. Ook fijn bij een lichte of beginnende griep of verkoudheid (zonder koorts): cupping op de bovenrug en borst ondersteunt de ademhaling en geeft een warm, vrij gevoel.",
               en:"An intensive massage where cups are used locally in combination with manual massage techniques, for example on the back, shoulders, arms or legs. Also lovely with a mild or starting flu or cold (no fever): cupping on the upper back and chest supports breathing and gives a warm, open feeling." },
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
    caution:{ nl:"Bij een eerste brow lift doen we best 48 uur vooraf een huidtest. Niet als je minder dan 3 dagen geleden henna had, bij een geïrriteerde huid of tijdens zwangerschap of borstvoeding.",
              en:"For a first brow lift it’s best to do a patch test 48 hours beforehand. Not within 3 days after henna, on irritated skin, or during pregnancy or breastfeeding." },
    aftercare:{ nl:"Houd de wenkbrauwen 24 uur droog en vermijd de eerste 48 uur oliehoudende reinigers op de wenkbrauw.",
                en:"Keep the brows dry for 24 hours and avoid oil-based cleansers on the brow area for the first 48 hours." } },

  { id:"hennabrows", name:"Henna Brows", moods:["energetic"], genders:["vrouw"], sunSensitive:false, price:"€50 (60')",
    homecare:{ category:"eye" },
    benefits:{ nl:"Voller ogende wenkbrauwen met een natuurlijke kleurintensiteit die weken meegaat.",
               en:"Fuller-looking brows with a natural color intensity that lasts for weeks." },
    funfact:{ nl:"Henna kleurt niet alleen de haartjes maar ook de huid eronder, voor een extra vol effect.",
              en:"Henna colors not just the hairs but also the skin underneath, for an extra full effect." },
    caution:{ nl:"Bij een eerste henna doen we best 48 uur vooraf een huidtest, om een allergische reactie uit te sluiten.",
              en:"For a first henna it’s best to do a patch test 48 hours beforehand to rule out an allergic reaction." },
    aftercare:{ nl:"Houd de wenkbrauwen 24 uur droog en vermijd scrubs of peelings rond de wenkbrauw gedurende 3 dagen.",
                en:"Keep the brows dry for 24 hours and avoid scrubs or peels around the brow area for 3 days." } },

  { id:"lashlift", name:"Lash Lift with Tint", moods:["energetic"], genders:["vrouw"], sunSensitive:false, lensWarning:true, price:"€75 (75')",
    homecare:{ category:"eye" },
    benefits:{ nl:"Krullende, donkere wimpers zonder mascara — bespaart tijd in je ochtendroutine.",
               en:"Curled, darker lashes without mascara — saves time in your morning routine." },
    funfact:{ nl:"Het effect van een lash lift houdt gemiddeld één volledige wimpergroeicyclus aan, ongeveer 6 tot 8 weken.",
              en:"The effect of a lash lift lasts on average one full lash growth cycle, about 6 to 8 weeks." },
    caution:{ nl:"Bij een eerste lash lift doen we best 48 uur vooraf een huidtest. Contactlenzen gaan uit tijdens de behandeling.",
              en:"For a first lash lift it’s best to do a patch test 48 hours beforehand. Contact lenses come out during the treatment." },
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
    funfact:{ nl:"Je gaat naar huis met de exacte volgorde van producten die het beste bij jouw huid past, en met persoonlijk advies om je nieuwe routine thuis meteen te beginnen.",
              en:"You'll go home with the exact product order that suits your skin best, plus personal advice to start your new routine at home right away." },
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
  { id:"expressuseup", name:"Express Gelaatsverzorging – Opgebruikactie", moods:["energetic","focus"], genders:["vrouw","man"], sunSensitive:false, price:"€50 (30′)", stockAction:true,
    homecare:{ category:"facial" },
    benefits:{ nl:"Dezelfde snelle, grondige opfrisbeurt als de Express (reiniging, dieptereiniging, masker en dagcrème), aan een voordeelprijs, met kwaliteitsproducten uit mijn vorige assortiment: Bio Balance, Guinot, Dr. Renaud en Safety4You. Zolang de voorraad strekt.",
               en:"The same quick, thorough refresh as the Express (cleansing, deep cleansing, mask and day cream) at a special price, with quality products from my previous range: Bio Balance, Guinot, Dr. Renaud and Safety4You. While stocks last.",
               fr:"Le même coup d’éclat rapide et complet que l’Express (nettoyage, nettoyage en profondeur, masque et crème de jour) à prix doux, avec des produits de qualité de ma gamme précédente : Bio Balance, Guinot, Dr. Renaud et Safety4You. Jusqu’à épuisement du stock." },
    funfact:{ nl:"Ook een korte verzorging helpt: een propere huid neemt de actieve stoffen van een masker en dagcrème beter op.",
              en:"Even a short treatment helps: clean skin absorbs the active ingredients of a mask and day cream better.",
              fr:"Même un soin court aide : une peau propre absorbe mieux les actifs d’un masque et d’une crème de jour." },
    aftercare:{ nl:"Gebruik de komende dagen dagelijks een SPF, drink voldoende water en laat je huid de eerste 24 uur zoveel mogelijk rusten zonder zware make-up.",
                en:"Use SPF daily for the next few days, drink enough water and let your skin rest as much as possible for the first 24 hours without heavy make-up.",
                fr:"Utilisez un SPF chaque jour pendant les prochains jours, buvez suffisamment d’eau et laissez votre peau se reposer pendant les 24 premières heures, sans maquillage lourd." } },
  { id:"expressfacial", name:"Express Gelaatsverzorging", moods:["energetic","focus"], genders:["vrouw","man"], sunSensitive:false, price:"€60 (30′)",
    homecare:{ category:"facial" },
    benefits:{ nl:"Een snelle maar grondige opfrisbeurt: reiniging, dieptereiniging, een crèmemasker en dagcrème — ideaal als je weinig tijd hebt en toch een frisse huid wil.",
               en:"A quick yet thorough refresh: cleansing, deep cleansing, a cream mask and day cream — ideal when you're short on time but still want fresh skin." },
    funfact:{ nl:"Ook een korte verzorging helpt: een propere huid neemt de actieve stoffen van een masker en dagcrème beter op.",
              en:"Even a short treatment helps: clean skin absorbs the active ingredients of a mask and day cream better." },
    aftercare:{ nl:"Gebruik de komende dagen dagelijks een SPF, drink voldoende water en laat je huid de eerste 24 uur zoveel mogelijk rusten zonder zware make-up.",
                en:"Use SPF daily for the next few days, drink enough water and let your skin rest as much as possible for the first 24 hours without heavy make-up." } },

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
    benefits:{ nl:"Leer zelf een prachtig magnetisch ‘Cat Eye’-effect op je nagels maken, met alle professionele lakken, magneten en UV/LED-lampen — plus specialty coffee/thee en huisgemaakte zoetigheden. Kies uit 9 magnetische kleuren: de Pink Gellac Galactic Gemstones (Sunstone Gold, Majestic Amethyst, Starlit Silver, Ethereal Topaz, Divine Quartz — HEMA-vrij) en de Cobra Galaxy-reeks (Apollo, Galileo, Comet, Cupid).",
               en:"Learn to create a beautiful magnetic ‘cat eye’ effect on your nails, with all professional polishes, magnets and UV/LED lamps — plus specialty coffee/tea and homemade sweets. Choose from 9 magnetic shades: Pink Gellac Galactic Gemstones (Sunstone Gold, Majestic Amethyst, Starlit Silver, Ethereal Topaz, Divine Quartz — HEMA-free) and the Cobra Galaxy range (Apollo, Galileo, Comet, Cupid)." },
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
  { words:["griep","griepje","verkouden","verkoudheid","snotneus","neus verstopt","flu","a cold","grippe","rhume"], ids:["cupping","swedishbackneck"] },
  { words:["rimpels","veroudering","verouderen","huidveroudering","stevigheid"], ids:["antiagefacial","liftsummere"] },
  { words:["pigmentatie","pigmentvlekken","oneffen","dof","vale huid","vaal"], ids:["hydrapeel","fruitacid"] },
  { words:["onzuiverheden","puistjes","acne","vette huid"], ids:["signaturefacial","expressfacial","fruitacid"] },
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
  face:     ["hydrapeel","signaturefacial","fillme","fruitacid","liftsummere","antiagefacial","expressfacial","expressuseup"],
  makeup:   ["glammakeup","bridaltrial","bridalpackage","weddingguest"],
  browlash: ["browlift","hennabrows","lashlift","browtint","browshaping","lashtint","wenkbrauwontharing"],
  workshop: ["makeupworkshop","facialworkshop","tastingbasic","tastingadvanced","baristaworkshop","teambeauty","teamcoffee","cateye"]
};
const AVOID_ICONS = { feet:"🦶", hands:"💅", massage:"💆", waxing:"🪒", face:"🧖", makeup:"💄", browlash:"👁️", workshop:"☕" };


/* ============================================================
   GERICHTE MATCH (since v155)
   "Ik wil een gelaatsverzorging, maar weet niet welke" — the client picks
   a kind of treatment and answers 1–3 short questions. Every answer gives
   points to treatments (s:{id:points}); the app picks the highest score
   among the treatments that still pass all safety rules (age, gender, sun,
   pregnancy, season…). Options with `months` only count in those months
   (pigment: September–March); outside them `off` is used and `offNote`
   is shown. Add, change or remove options here — nothing else changes.
   ============================================================ */
const FOCUS_GUIDES = {
  face: { icon:"🌸", group:"face",
    label:{ nl:"Gelaatsverzorging", en:"Facial", fr:"Soin du visage" },
    sub:{ nl:"Ik weet niet welke het best past", en:"I don’t know which one suits me", fr:"Je ne sais pas lequel me convient" },
    questions:[
      { id:"wish", required:true, label:{ nl:"Waar wil je vooral aan werken?", en:"What would you like to work on most?", fr:"Sur quoi voulez-vous surtout travailler ?" },
        options:[
          { id:"clean", label:{ nl:"Onzuiverheden, mee-eters, grote poriën", en:"Blemishes, blackheads, large pores", fr:"Imperfections, points noirs, pores dilatés" }, s:{ hydrapeel:3, expressfacial:2, expressuseup:2, fruitacid:2, signaturefacial:1 } },
          { id:"hydra", label:{ nl:"Droge, trekkerige of vale huid", en:"Dry, tight or dull skin", fr:"Peau sèche, qui tiraille ou terne" }, s:{ fillme:3, hydrapeel:2, signaturefacial:2 } },
          { id:"pigment", label:{ nl:"Pigmentvlekken, een egalere teint", en:"Pigment spots, a more even tone", fr:"Taches pigmentaires, teint plus uniforme" }, months:[9,10,11,12,1,2,3], s:{ fruitacid:4, hydrapeel:2 }, off:{ fillme:3, signaturefacial:2 },
            offNote:{ nl:"Pigmentvlekken behandel ik enkel van september tot eind maart, als de zon minder sterk is: anders kunnen de vlekken net terugkomen. Daarom nu een verzorging die je huid voorbereidt; plan je pigmentbehandeling (fruitzuurpeeling) vanaf september.", en:"I only treat pigment spots from September to the end of March, when the sun is weaker; otherwise the spots can come back. So for now a treatment that prepares your skin; plan your pigment treatment (fruit acid peel) from September.", fr:"Je ne traite les taches pigmentaires que de septembre à fin mars, quand le soleil est plus faible ; sinon elles peuvent revenir. Pour l’instant, un soin qui prépare la peau ; prévoyez le soin anti-taches (peeling aux acides de fruits) dès septembre." } },
          { id:"age", label:{ nl:"Fijne lijntjes, rimpels, stevigheid", en:"Fine lines, wrinkles, firmness", fr:"Ridules, rides, fermeté" }, s:{ antiagefacial:4, liftsummere:3, fillme:2 },
            ageNote:{ nl:"Een echte anti-agingbehandeling raad ik aan vanaf 45 jaar (Botanische Anti-Age) en de Lift Summum vanaf 30 jaar. Voor jou nu is hydratatie de beste preventie.", en:"I recommend a real anti-ageing treatment from age 45 (Botanical Anti-Age) and the Lift Summum from 30. For you right now, hydration is the best prevention.", fr:"Je conseille un vrai soin anti-âge à partir de 45 ans (Anti-Âge Botanique) et le Lift Summum dès 30 ans. Pour vous, l’hydratation est la meilleure prévention." } },
          { id:"sensitive", label:{ nl:"Gevoelige of snel rode huid", en:"Sensitive or easily red skin", fr:"Peau sensible ou qui rougit vite" }, s:{ signaturefacial:4, expressfacial:1 } },
          { id:"glow", label:{ nl:"Snel opfrissen, een frisse glow", en:"A quick refresh, a fresh glow", fr:"Un coup d’éclat rapide" }, s:{ expressfacial:3, expressuseup:3, fillme:2 } },
          { id:"pamper", label:{ nl:"Vooral verwennen en ontspannen", en:"Mostly pampering and relaxing", fr:"Surtout me chouchouter et me détendre" }, s:{ signaturefacial:3, liftsummere:2, antiagefacial:2 } }
        ] },
      { id:"time", label:{ nl:"Hoeveel tijd heb je?", en:"How much time do you have?", fr:"Combien de temps avez-vous ?" },
        options:[
          { id:"t30", label:{ nl:"Ongeveer een halfuur", en:"About half an hour", fr:"Environ une demi-heure" }, s:{ expressfacial:3, expressuseup:3 } },
          { id:"t60", label:{ nl:"Ongeveer een uur", en:"About an hour", fr:"Environ une heure" }, s:{ fillme:1, signaturefacial:1, liftsummere:1, fruitacid:1 } },
          { id:"t90", label:{ nl:"Langer mag", en:"Longer is fine", fr:"Plus longtemps, c’est possible" }, s:{ hydrapeel:2, antiagefacial:2, signaturefacial:1 } }
        ] },
      { id:"budget", label:{ nl:"Wat wil je ongeveer uitgeven?", en:"Roughly what would you like to spend?", fr:"Quel budget environ ?" },
        options:[
          { id:"b60", label:{ nl:"Tot ongeveer €60", en:"Up to about €60", fr:"Jusqu’à environ 60 €" }, s:{ expressuseup:4, expressfacial:3 } },
          { id:"b85", label:{ nl:"Rond €85", en:"Around €85", fr:"Autour de 85 €" }, s:{ signaturefacial:4, fillme:1 } },
          { id:"b120", label:{ nl:"Het mag meer zijn (€100 tot €125)", en:"It can be more (€100 to €125)", fr:"Plus, c’est possible (100 à 125 €)" }, s:{ hydrapeel:2, fruitacid:2, antiagefacial:2, liftsummere:2, fillme:1 } }
        ] }
    ] },

  makeup: { icon:"💄", group:"makeup",
    label:{ nl:"Make-up", en:"Make-up", fr:"Maquillage" },
    sub:{ nl:"Ik weet niet welke look of welke make-up", en:"I don’t know which look or which make-up", fr:"Je ne sais pas quel look ni quel maquillage" },
    questions:[
      { id:"occasion", required:true, label:{ nl:"Waarvoor is het?", en:"What is it for?", fr:"C’est pour quelle occasion ?" },
        options:[
          { id:"party", label:{ nl:"Een avond, feest of etentje", en:"An evening, party or dinner", fr:"Une soirée, une fête ou un dîner" }, s:{ glammakeup:4 }, mu:{ hd:1 } },
          { id:"photo", label:{ nl:"Foto’s, video of film", en:"Photos, video or film", fr:"Photos, vidéo ou film" }, s:{ glammakeup:4 }, mu:{ hd:4 },
            tip:{ nl:"Foto’s in zwart-wit? Zeg het me vooraf: dan werk ik met meer contrast tussen licht en schaduw, poeder ik goed af en gebruik ik weinig glans, want glans slaat wit uit op de foto.", en:"Black-and-white photos? Tell me beforehand: then I work with more contrast between light and shadow, powder well and use little shine, as shine turns white on photos.", fr:"Photos en noir et blanc ? Dites-le-moi à l’avance : je travaille alors plus de contraste entre ombre et lumière, je poudre bien et j’évite la brillance, qui ressort blanche sur la photo." } },
          { id:"bride", label:{ nl:"Mijn eigen huwelijk", en:"My own wedding", fr:"Mon propre mariage" }, s:{ bridalpackage:4, bridaltrial:3 }, mu:{ hd:2 } },
          { id:"guest", label:{ nl:"Een huwelijk als gast", en:"A wedding, as a guest", fr:"Un mariage, en tant qu’invitée" }, s:{ weddingguest:4 }, mu:{ mineral:1 } },
          { id:"learn", label:{ nl:"Ik wil het zelf leren", en:"I want to learn it myself", fr:"Je veux apprendre moi-même" }, s:{ makeupworkshop:5 }, mu:{ mineral:1 } },
          { id:"business", label:{ nl:"Werk, een sollicitatie of een belangrijke afspraak", en:"Work, a job interview or an important meeting", fr:"Le travail, un entretien ou un rendez-vous important" }, s:{ glammakeup:5 }, mu:{ mineral:2 },
            tip:{ nl:"Zakelijke look: een egale, frisse huid (primer zodat alles de hele dag blijft zitten), kringen weggewerkt, ogen naturel in kleuren die bij je kleding passen en verzorgde lippen. Geen smoky eyes. Zelfde prijs als een avondmake-up.", en:"Business look: even, fresh skin (primer so it lasts all day), dark circles concealed, natural eyes in colours that match your outfit and neat lips. No smoky eyes. Same price as an evening make-up.", fr:"Look professionnel : un teint frais et uniforme (base pour tenir toute la journée), cernes camouflés, yeux naturels assortis à la tenue et lèvres soignées. Pas de smoky eyes. Même prix qu’un maquillage de soirée." } },
          { id:"theme", label:{ nl:"Een themafeest of retrolook (jaren ’20, ’50, ’60, ’80)", en:"A theme party or retro look (1920s, ’50s, ’60s, ’80s)", fr:"Une soirée à thème ou un look rétro (années 20, 50, 60, 80)" }, s:{ glammakeup:5 }, mu:{ hd:2 },
            tip:{ nl:"Retro kan: jaren ’20 met een bleke teint, donker omrande ogen en een kleine donkere mond; jaren ’50 met een dikke zwarte eyeliner en rode lippen; jaren ’60 met grote wimpers (ook onderaan) en lichte lippen; jaren ’80 met felle kleuren en veel blush. Breng gerust een foto van de look mee.", en:"Retro is possible: the ’20s with pale skin, dark-rimmed eyes and a small dark mouth; the ’50s with thick black eyeliner and red lips; the ’60s with big lashes (also below) and pale lips; the ’80s with bright colours and lots of blush. Feel free to bring a photo of the look.", fr:"Le rétro, c’est possible : années 20 avec teint pâle, yeux cernés de noir et petite bouche foncée ; années 50 avec eye-liner noir épais et lèvres rouges ; années 60 avec grands cils (aussi en bas) et lèvres claires ; années 80 avec couleurs vives et beaucoup de blush. Apportez une photo du look." } }
        ] },
      { id:"look", label:{ nl:"Welke look spreekt je aan?", en:"Which look appeals to you?", fr:"Quel look vous attire ?" },
        options:[
          { id:"natural", label:{ nl:"Naturel en fris", en:"Natural and fresh", fr:"Naturel et frais" }, mu:{ mineral:2 },
            tip:{ nl:"Naturel en fris: een stralende huid die nog als huid oogt, zachte tinten op ogen en wangen en verzorgde wenkbrauwen.", en:"Natural and fresh: glowing skin that still looks like skin, soft tones on eyes and cheeks and groomed brows.", fr:"Naturel et frais : une peau lumineuse qui reste naturelle, des tons doux sur les yeux et les joues, des sourcils soignés." } },
          { id:"glam", label:{ nl:"Sprekend en glamoureus", en:"Striking and glamorous", fr:"Intense et glamour" }, mu:{ hd:2 },
            tip:{ nl:"Sprekend en glamoureus: één blikvanger (smoky eyes óf opvallende lippen), contour en een vleugje glans. Valse wimpers kunnen, breng dan je eigen wimpers en lijm mee.", en:"Striking and glamorous: one focal point (smoky eyes or bold lips), contour and a touch of glow. False lashes are possible; bring your own lashes and glue.", fr:"Intense et glamour : un point fort (smoky eyes ou lèvres marquées), contouring et une touche d’éclat. Faux cils possibles : apportez vos cils et votre colle." } },
          { id:"grooming", genders:["man"], label:{ nl:"Onzichtbaar verzorgd (niemand ziet dat je make-up draagt)", en:"Invisible grooming (nobody sees you’re wearing make-up)", fr:"Soin invisible (personne ne voit que vous êtes maquillé)" }, mu:{ hd:1 },
            tip:{ nl:"Onzichtbare grooming-make-up: eerst hydrateren, dan alleen plaatselijk wegwerken (donkere kringen, roodheid, een puistje), heel dun uitgewerkt. Matterend poeder tegen glans, wenkbrauwen in model met een heldere gel en een kleurloze lippenbalsem. Wil je wat meer karakter, dan schaduw ik heel licht met een koel bruin.", en:"Invisible grooming make-up: hydrate first, then conceal only where needed (dark circles, redness, a blemish), blended very thinly. Mattifying powder against shine, brows set with a clear gel and a colourless lip balm. For a bit more character, I add a very light cool-brown shadow.", fr:"Maquillage « grooming » invisible : hydrater d’abord, puis corriger seulement là où il faut (cernes, rougeurs, un bouton), très finement estompé. Poudre matifiante, sourcils fixés au gel transparent et baume à lèvres incolore. Pour un peu plus de caractère, j’ombre très légèrement avec un brun froid." } },
          { id:"feminine", genders:["man"], label:{ nl:"Een vrouwelijke of volledig opgemaakte look", en:"A feminine or fully made-up look", fr:"Un look féminin ou entièrement maquillé" }, mu:{ hd:3 },
            tip:{ nl:"Een vrouwelijke of volledige look: iedereen is welkom, in alle rust en discretie. Ik werk met een sterk dekkende basis (HD of camouflage) en zachte contouren, en maak ogen en lippen zoals jij ze wil. Mooie hoge wenkbrauwbogen, ogen die ik ‘open’ met een licht potlood en eventueel valse wimpers (breng ze zelf mee) maken het geheel zachter. Vertel vooraf wat je in gedachten hebt (een foto helpt), dan bespreken we samen wat mogelijk is.", en:"A feminine or full look: everyone is welcome, calmly and discreetly. I use a high-coverage base (HD or camouflage) and soft contouring, and do eyes and lips the way you like. Tell me beforehand what you have in mind (a photo helps), and we’ll discuss together what is possible.", fr:"Un look féminin ou complet : tout le monde est bienvenu, en toute discrétion. Base très couvrante (HD ou camouflage), contouring doux, yeux et lèvres comme vous le souhaitez. Dites-moi à l’avance ce que vous imaginez (une photo aide), nous verrons ensemble ce qui est possible." } },
          { id:"unsure", label:{ nl:"Ik weet het nog niet", en:"I don’t know yet", fr:"Je ne sais pas encore" },
            tip:{ nl:"Nog geen idee? We kiezen samen, na een korte huidanalyse. Neem gerust een foto mee van een look die je mooi vindt, en van je outfit. Ik bekijk ook je kleurtype (winter, zomer, lente of herfst), zodat de kleuren je doen stralen.", en:"No idea yet? We’ll choose together after a short skin analysis. Feel free to bring a photo of a look you like, and of your outfit. I also look at your colour type (winter, summer, spring or autumn) so the colours make you glow.", fr:"Pas encore d’idée ? Nous choisirons ensemble après une courte analyse de peau. Apportez une photo d’un look qui vous plaît, et de votre tenue. Je regarde aussi votre type de couleurs (hiver, été, printemps ou automne) pour des teintes qui vous illuminent." } }
        ] },
      { id:"skin", label:{ nl:"Hoe is je huid?", en:"What is your skin like?", fr:"Comment est votre peau ?" },
        options:[
          { id:"normal", label:{ nl:"Normaal", en:"Normal", fr:"Normale" } },
          { id:"sensitive", label:{ nl:"Gevoelig of allergisch", en:"Sensitive or allergic", fr:"Sensible ou allergique" }, mu:{ mineral:6 } },
          { id:"oily", label:{ nl:"Snel glanzend of vet", en:"Quickly shiny or oily", fr:"Brille vite, grasse" }, mu:{ mineral:1 },
            tip:{ nl:"Glanzende huid: ik werk met een matterende basis en fixeer met poeder, zodat je make-up de hele avond mooi blijft.", en:"Shiny skin: I use a mattifying base and set with powder, so your make-up stays lovely all evening.", fr:"Peau brillante : base matifiante et fixation à la poudre, pour un maquillage impeccable toute la soirée." } },
          { id:"dry", label:{ nl:"Droog", en:"Dry", fr:"Sèche" }, mu:{ hd:1 },
            tip:{ nl:"Droge huid: eerst goed hydrateren, dan een romige foundation, zodat niets schilferig oogt.", en:"Dry skin: plenty of hydration first, then a creamy foundation so nothing looks flaky.", fr:"Peau sèche : bien hydrater d’abord, puis un fond de teint crémeux, pour éviter tout effet sec." } },
          { id:"cover", label:{ nl:"Vlekken, littekens of roodheid die ik wil wegwerken", en:"Spots, scars or redness I want to hide", fr:"Taches, cicatrices ou rougeurs à camoufler" }, mu:{ camouflage:9 } },
          { id:"mature", label:{ nl:"Rijpere huid, fijne lijntjes", en:"Mature skin, fine lines", fr:"Peau mature, ridules" }, mu:{ mineral:2 },
            tip:{ nl:"Rijpere huid: een luchtige make-up, zodat niets in de lijntjes kruipt. Een voedende dagcrème als basis, een romige foundation met een vochtig sponsje, matte oogschaduw, een crèmeblush en een lippenstift die niet vet is.", en:"Mature skin: a light make-up so nothing settles into the lines. A nourishing day cream as a base, a creamy foundation with a damp sponge, matte eyeshadow, a cream blush and a non-greasy lipstick.", fr:"Peau mature : un maquillage léger pour que rien ne se loge dans les ridules. Une crème de jour nourrissante, un fond de teint crémeux à l’éponge humide, des fards mats, un blush crème et un rouge à lèvres non gras." } }
        ] },
      { id:"glasses", label:{ nl:"Draag je een bril?", en:"Do you wear glasses?", fr:"Portez-vous des lunettes ?" },
        options:[
          { id:"no", label:{ nl:"Nee (of lenzen)", en:"No (or contact lenses)", fr:"Non (ou lentilles)" } },
          { id:"far", label:{ nl:"Ja, om van dichtbij te lezen (plusglazen)", en:"Yes, for reading up close (plus lenses)", fr:"Oui, pour lire de près (verres convexes)" },
            tip:{ nl:"Plusglazen vergroten je ogen: ik werk met mattere, iets donkerdere oogschaduw en een fijne eyeliner, en zorg voor heel nette wenkbrauwen, want de glazen vergroten alles.", en:"Plus lenses magnify your eyes: I use more matte, slightly darker eyeshadow and a fine eyeliner, and keep the brows very neat, as the lenses magnify everything.", fr:"Les verres convexes agrandissent les yeux : fards plus mats et un peu plus foncés, eye-liner fin et sourcils très nets, car les verres grossissent tout." } },
          { id:"near", label:{ nl:"Ja, om veraf te zien (minglazen)", en:"Yes, for seeing far (minus lenses)", fr:"Oui, pour voir de loin (verres concaves)" },
            tip:{ nl:"Minglazen verkleinen je ogen: ik werk met lichte oogschaduw op het ooglid, een licht potlood op de waterlijn, gekrulde wimpers en genoeg mascara, en houd de wenkbrauwen zacht.", en:"Minus lenses make your eyes look smaller: I use light eyeshadow on the lid, a light pencil on the waterline, curled lashes and enough mascara, and keep the brows soft.", fr:"Les verres concaves rapetissent les yeux : fard clair sur la paupière, crayon clair au ras de l’œil, cils recourbés et assez de mascara, sourcils doux." } },
          { id:"tinted", label:{ nl:"Ja, met getinte glazen", en:"Yes, with tinted lenses", fr:"Oui, avec des verres teintés" },
            tip:{ nl:"Getinte glazen: neem je bril mee, dan kies ik kleuren die goed uitkomen achter de tint van je glazen.", en:"Tinted lenses: bring your glasses, so I can choose colours that work behind the tint.", fr:"Verres teintés : apportez vos lunettes, je choisirai des couleurs qui ressortent derrière la teinte." } }
        ] }
    ] },

  nails: { icon:"💅", group:"nails",
    label:{ nl:"Handen & voeten", en:"Hands & feet", fr:"Mains & pieds" },
    sub:{ nl:"Ik wil een kleur, maar weet niet welke", en:"I want a colour but don’t know which", fr:"Je veux une couleur mais je ne sais pas laquelle" },
    questions:[
      { id:"where", required:true, label:{ nl:"Handen of voeten?", en:"Hands or feet?", fr:"Mains ou pieds ?" },
        options:[
          { id:"hands", label:{ nl:"Handen", en:"Hands", fr:"Mains" }, s:{ manicure:4 } },
          { id:"feet", label:{ nl:"Voeten", en:"Feet", fr:"Pieds" }, s:{ pedicure:4 } },
          { id:"both", label:{ nl:"Allebei", en:"Both", fr:"Les deux" }, s:{ pedicure:3, manicure:3, manipedispa:2 },
            tip:{ nl:"Handen én voeten in dezelfde kleur, of net in een andere tint die erbij past: allebei kan.", en:"Hands and feet in the same colour, or in a matching shade: both work.", fr:"Mains et pieds de la même couleur, ou dans une teinte assortie : les deux sont possibles." } }
        ] },
      { id:"last", label:{ nl:"Hoe lang moet het mooi blijven?", en:"How long should it last?", fr:"Combien de temps doit-il tenir ?" },
        options:[
          { id:"week", label:{ nl:"Ongeveer een week (nagellak)", en:"About a week (nail polish)", fr:"Environ une semaine (vernis)" },
            tip:{ nl:"Gewone nagellak (supplement €5): droogt vanzelf en gaat er thuis af met remover.", en:"Regular nail polish (add-on €5): dries by itself and comes off at home with remover.", fr:"Vernis classique (supplément 5 €) : sèche tout seul et s’enlève à la maison au dissolvant." } },
          { id:"gel", label:{ nl:"Twee à drie weken (gellak)", en:"Two to three weeks (gel polish)", fr:"Deux à trois semaines (gel)" },
            tip:{ nl:"Gellak (supplement €20): hard onder de lamp, glanst weken en schilfert niet. Laat hem in de salon verwijderen, niet zelf afpeuteren.", en:"Gel polish (add-on €20): cured under the lamp, shines for weeks and doesn’t chip. Have it removed in the salon, don’t peel it off.", fr:"Gel (supplément 20 €) : durci sous la lampe, brille des semaines sans s’écailler. À faire retirer au salon, ne pas le décoller." } },
          { id:"none", label:{ nl:"Geen kleur, enkel verzorgen", en:"No colour, just care", fr:"Pas de couleur, juste un soin" } }
        ] },
      { id:"style", label:{ nl:"Welke sfeer?", en:"Which mood?", fr:"Quelle ambiance ?" },
        options:[
          { id:"nude", label:{ nl:"Naturel en verzorgd (nude)", en:"Natural and neat (nude)", fr:"Naturel et soigné (nude)" }, family:"nude" },
          { id:"red", label:{ nl:"Klassiek rood", en:"Classic red", fr:"Rouge classique" }, family:"red" },
          { id:"soft", label:{ nl:"Zacht roze of pastel", en:"Soft pink or pastel", fr:"Rose doux ou pastel" }, family:"pink" },
          { id:"dark", label:{ nl:"Donker en chic", en:"Dark and chic", fr:"Foncé et chic" }, family:"dark" },
          { id:"party", label:{ nl:"Feestelijk, met glitter", en:"Festive, with glitter", fr:"Festif, à paillettes" }, family:"glitter" },
          { id:"french", label:{ nl:"French (witte rand)", en:"French (white tips)", fr:"French (bord blanc)" }, family:"french" },
          { id:"unsure", label:{ nl:"Verras me", en:"Surprise me", fr:"Surprenez-moi" }, family:"season" }
        ] },
      { id:"spa", label:{ nl:"Mag het wat meer verwennen zijn?", en:"Fancy a bit more pampering?", fr:"Envie d’un peu plus de douceur ?" },
        options:[
          { id:"no", label:{ nl:"Nee, gewoon mooi", en:"No, just lovely", fr:"Non, juste joli" } },
          { id:"yes", label:{ nl:"Ja, met SPA (peeling, masker, pakking en massage)", en:"Yes, with SPA (scrub, mask, wrap and massage)", fr:"Oui, avec SPA (gommage, masque, enveloppement et massage)" }, s:{ manipedispa:6 } }
        ] }
    ] },

  massage: { icon:"💆", group:"massage",
    label:{ nl:"Massage", en:"Massage", fr:"Massage" },
    sub:{ nl:"Ik weet niet welke massage", en:"I don’t know which massage", fr:"Je ne sais pas quel massage" },
    questions:[
      { id:"wish", required:true, label:{ nl:"Wat wil je vooral?", en:"What do you want most?", fr:"Que souhaitez-vous surtout ?" },
        options:[
          { id:"relax", label:{ nl:"Diep ontspannen, stress kwijt", en:"Deep relaxation, less stress", fr:"Me détendre profondément, évacuer le stress" }, s:{ hotstone:3, swedish:3, harmonizingbody:2, fullbodywrap:2, swedishbackneck:1 } },
          { id:"neck", label:{ nl:"Stijve nek, rug of schouders", en:"Stiff neck, back or shoulders", fr:"Nuque, dos ou épaules raides" }, s:{ swedishbackneck:3, harmonizingback:2, cupping:2, backwrap:1 } },
          { id:"muscle", label:{ nl:"Spierpijn of vastzittende spieren", en:"Sore or tight muscles", fr:"Courbatures ou muscles noués" }, s:{ cupping:4, swedishbackneck:1 } },
          { id:"legs", label:{ nl:"Zware, vermoeide benen", en:"Heavy, tired legs", fr:"Jambes lourdes et fatiguées" }, s:{ swedishlegs:4 } },
          { id:"skin", label:{ nl:"Een zachte huid, detox", en:"Soft skin, detox", fr:"Une peau douce, détox" }, s:{ cuppingpeeling:3, fullbodywrap:2, detoxback:2, backwrap:2 } },
          { id:"slim", label:{ nl:"Afslanken (samen met voeding en beweging)", en:"Slimming (with diet and exercise)", fr:"Minceur (avec alimentation et activité)" }, s:{ slimmassage:5 } }
        ] },
      { id:"time", label:{ nl:"Hoeveel tijd heb je?", en:"How much time do you have?", fr:"Combien de temps avez-vous ?" },
        options:[
          { id:"t30", label:{ nl:"Een halfuur", en:"Half an hour", fr:"Une demi-heure" }, s:{ swedishbackneck:2, swedishlegs:2, harmonizingback:2 } },
          { id:"t60", label:{ nl:"Een uur", en:"An hour", fr:"Une heure" }, s:{ swedish:1, cupping:1, backwrap:1, detoxback:1, slimmassage:1, harmonizingbody:1 } },
          { id:"t90", label:{ nl:"Anderhalf uur of meer", en:"An hour and a half or more", fr:"Une heure et demie ou plus" }, s:{ hotstone:2, cuppingpeeling:2, fullbodywrap:2 } }
        ] }
    ] },

  browlash: { icon:"👁️", group:"browlash",
    label:{ nl:"Wenkbrauwen & wimpers", en:"Brows & lashes", fr:"Sourcils & cils" },
    sub:{ nl:"Ik weet niet wat bij mij past", en:"I don’t know what suits me", fr:"Je ne sais pas ce qui me va" },
    questions:[
      { id:"wish", required:true, label:{ nl:"Wat wil je?", en:"What would you like?", fr:"Que souhaitez-vous ?" },
        options:[
          { id:"shape", label:{ nl:"Mooi gevormde wenkbrauwen", en:"Nicely shaped brows", fr:"Des sourcils bien dessinés" }, s:{ browshaping:4, wenkbrauwontharing:2 } },
          { id:"fuller", label:{ nl:"Vollere of donkerdere wenkbrauwen", en:"Fuller or darker brows", fr:"Des sourcils plus fournis ou plus foncés" }, s:{ hennabrows:4, browtint:2 } },
          { id:"lift", label:{ nl:"Wenkbrauwen die in model blijven", en:"Brows that stay in shape", fr:"Des sourcils qui restent en place" }, s:{ browlift:4 } },
          { id:"curl", label:{ nl:"Gekrulde wimpers", en:"Curled lashes", fr:"Des cils recourbés" }, s:{ lashlift:4 } },
          { id:"dark", label:{ nl:"Donkere wimpers zonder mascara", en:"Dark lashes without mascara", fr:"Des cils foncés sans mascara" }, s:{ lashtint:4, lashlift:1 } }
        ] }
    ] }
};
const FOCUS_ORDER = ["face","makeup","nails","massage","browlash"];

/* Make-up advice: the answers give points to a type; the highest wins
   (a tie goes to mineral make-up, the gentlest). */
const FOCUS_MAKEUP_TYPES = {
  mineral:{ nl:"Mijn aanrader voor jou: <b>minerale make-up</b> (Jane Iredale). Licht en ademend, met zonbescherming, ideaal voor een gevoelige huid en een natuurlijke look.", en:"My tip for you: <b>mineral make-up</b> (Jane Iredale). Light and breathable, with sun protection, ideal for sensitive skin and a natural look.", fr:"Mon conseil : <b>maquillage minéral</b> (Jane Iredale). Léger et respirant, avec protection solaire, idéal pour une peau sensible et un look naturel." },
  hd:{ nl:"Mijn aanrader voor jou: <b>High Definition make-up</b> (Kryolan HD). Fijn en sterk dekkend, oogt natuurlijk op foto en video en blijft de hele dag of avond zitten.", en:"My tip for you: <b>High Definition make-up</b> (Kryolan HD). Fine and well covering, looks natural in photos and on video and lasts all day or night.", fr:"Mon conseil : <b>maquillage High Definition</b> (Kryolan HD). Fin et couvrant, naturel en photo et en vidéo, tient toute la journée ou la soirée." },
  camouflage:{ nl:"Mijn aanrader voor jou: <b>camouflagemake-up</b> (Covermark). Sterk dekkend en waterproof, verbergt vlekken, littekens en roodheid en blijft tot 24 uur zitten.", en:"My tip for you: <b>camouflage make-up</b> (Covermark). Highly covering and waterproof, hides spots, scars and redness and lasts up to 24 hours.", fr:"Mon conseil : <b>maquillage correcteur</b> (Covermark). Très couvrant et waterproof, masque taches, cicatrices et rougeurs, tient jusqu’à 24 h." }
};

/* Colour tips per family (names from the gel polish ranges in the salon).
   "season" picks the family that suits the month. Sandra: adjust freely. */
const FOCUS_COLOURS = {
  nude:   { label:{ nl:"nude en natuurlijk", en:"nude and natural", fr:"nude et naturel" }, names:["Nude Seduction","Natural Delight"] },
  red:    { label:{ nl:"klassiek rood", en:"classic red", fr:"rouge classique" }, names:["Core Red","Blood Coral","Cherry on Ice"] },
  pink:   { label:{ nl:"zacht roze", en:"soft pink", fr:"rose doux" }, names:["Frosted Rose"] },
  dark:   { label:{ nl:"donker en chic", en:"dark and chic", fr:"foncé et chic" }, names:["Perfect Black","Italian Verde"] },
  glitter:{ label:{ nl:"feestelijk met glitter", en:"festive glitter", fr:"festif à paillettes" }, names:["Sparkling Vows","Glimmer","Happy New Year"] },
  french: { label:{ nl:"French", en:"French", fr:"French" }, names:["Ghost White"] },
  winter: { label:{ nl:"warm rood, groen of glitter (winter)", en:"warm red, green or glitter (winter)", fr:"rouge chaud, vert ou paillettes (hiver)" }, names:["Cherry on Ice","Christmas Tree","Sparkling Vows"] },
  spring: { label:{ nl:"zacht roze en fris (lente)", en:"soft pink and fresh (spring)", fr:"rose doux et frais (printemps)" }, names:["Frosted Rose","Nude Seduction"] },
  summer: { label:{ nl:"koraal en vrolijk (zomer)", en:"coral and cheerful (summer)", fr:"corail et gai (été)" }, names:["Blood Coral","Core Red"] },
  autumn: { label:{ nl:"warm en donker (herfst)", en:"warm and dark (autumn)", fr:"chaud et foncé (automne)" }, names:["Italian Verde","Perfect Black","Nude Seduction"] }
};

/* EXTRA HEALTH POINTS (v158, from Sandra's anamnesis form and protocols).
   Ticked in the health step; exclude = treatments the match then skips;
   massage:true = also skip every massage. Shown to the client: the note. */
const HEALTH_EXTRA = [
  { key:"bloodThinners", icon:"💉", exclude:["cupping","cuppingpeeling","slimmassage"],
    label:{ nl:"Ik neem bloedverdunners", en:"I take blood thinners", fr:"Je prends des anticoagulants" },
    note:{ nl:"Met bloedverdunners sla ik cupping en afslankingsmassage over: daar krijg je sneller blauwe plekken van.", en:"With blood thinners I skip cupping and slimming massage: they bruise more easily.", fr:"Avec des anticoagulants, je passe le cupping et le massage minceur : risque de bleus." } },
  { key:"bloodPressure", icon:"❤️", exclude:["hotstone","cupping","cuppingpeeling","slimmassage"],
    label:{ nl:"Hoge bloeddruk of een hartaandoening", en:"High blood pressure or a heart condition", fr:"Hypertension ou problème cardiaque" },
    note:{ nl:"Bij hoge bloeddruk of een hartaandoening sla ik hot stones, cupping en afslankingsmassage over.", en:"With high blood pressure or a heart condition I skip hot stones, cupping and slimming massage.", fr:"En cas d’hypertension ou de problème cardiaque, je passe les pierres chaudes, le cupping et le massage minceur." } },
  { key:"diabetes", icon:"🩺", exclude:[],
    label:{ nl:"Diabetes", en:"Diabetes", fr:"Diabète" },
    note:{ nl:"Met diabetes kan alles, ook hot stones en de SPA. Ik werk extra voorzichtig: niet knippen of snijden in de huid en geen wondjes maken, want die genezen minder goed. Vermeld je diabetes bij het boeken.", en:"With diabetes everything is possible, including hot stones and the SPA. I work extra carefully: no cutting into the skin and no small wounds, as they heal less well. Please mention your diabetes when booking.", fr:"Avec le diabète, tout est possible, y compris les pierres chaudes et le SPA. Je travaille avec encore plus de précaution : pas de coupure de la peau ni de petites plaies, qui guérissent moins bien. Signalez votre diabète en réservant." } },
  { key:"varicose", icon:"🦵", exclude:[],
    label:{ nl:"Spataders", en:"Varicose veins", fr:"Varices" },
    note:{ nl:"Met spataders kan een massage gewoon: ik sla enkel de plekken met spataders zelf over en masseer daar niet.", en:"With varicose veins a massage is fine: I simply skip the areas with the veins themselves.", fr:"Avec des varices, le massage reste possible : j’évite simplement les zones des varices." } },
  { key:"oncology", icon:"🎗️", exclude:["fruitacid","hydrapeel","cuppingpeeling","fillme","liftsummere","antiagefacial","expressuseup","facialworkshop"],
    label:{ nl:"Ik ben (of was kort geleden) in behandeling voor kanker", en:"I am (or recently was) being treated for cancer", fr:"Je suis (ou j’ai été récemment) traité(e) pour un cancer" },
    note:{ nl:"Tijdens of na een kankerbehandeling ben je zeker welkom, ook voor een massage. Voor je gezicht werk ik extra zacht, zonder peeling, met de kalmerende Janssen-lijn voor de gevoelige huid.", en:"During or after cancer treatment you are very welcome, massages included. For your face I work extra gently, without peels, with Janssen’s soothing line for sensitive skin.", fr:"Pendant ou après un traitement contre le cancer, vous êtes la bienvenue, massages compris. Pour le visage, je travaille tout en douceur, sans peeling, avec la gamme apaisante de Janssen pour peaux sensibles." },
    sandraNote:{ nl:"Alleen voor jou: gelaat enkel met de roze lijn van Janssen (Sensitive Skin: Soft Cleansing Mousse, Soft Soothing Tonic, Intense Calming Serum en Cream, Instant Soothing Oil en Mask, Comfort Eye Care; staan allemaal in je voorraad, zoek op “gevoelige huid”), volgens je oncologisch protocol. Geen peeling, geen ampullen met actieve zuren.", en:"Only for you: face only with Janssen’s pink line (Sensitive Skin), as in your oncology protocol. No peels.", fr:"Uniquement pour toi : visage uniquement avec la ligne rose Janssen (Sensitive Skin), selon ton protocole oncologique. Pas de peeling." } },
  { key:"epilepsy", icon:"🧠", exclude:[],
    label:{ nl:"Epilepsie", en:"Epilepsy", fr:"Épilepsie" },
    note:{ nl:"Met epilepsie ben je welkom voor elke verzorging. Ik kies dan een rustig geurtje, zonder rozemarijn, pepermunt of eucalyptus.", en:"With epilepsy you are welcome for every treatment. I then choose a calm scent, without rosemary, peppermint or eucalyptus.", fr:"Avec l’épilepsie, vous êtes bienvenu(e) pour tous les soins. Je choisis alors un parfum doux, sans romarin, menthe poivrée ni eucalyptus." },
    sandraNote:{ nl:"Alleen voor jou: geen rozemarijn, (peper)munt of eucalyptus, ook niet in de stomer of het kompres (de app verbergt ze in de geurkeuze). Bij LED-therapie: vraag of de epilepsie lichtgevoelig is; zo ja, geen LED.", en:"Only for you: no rosemary, (pepper)mint or eucalyptus, also not in the steamer or compress (the app hides them). LED therapy: ask whether the epilepsy is light-sensitive; if so, no LED.", fr:"Uniquement pour toi : pas de romarin, menthe ni eucalyptus, même pas dans le vaporisateur (l’app les masque). LED : demande si l’épilepsie est photosensible ; si oui, pas de LED." } },
];

/* ALLERGIES in the match (v156). The client ticks an allergy (optional, in
   the health step). groups = ALLERGEN_GROUPS ids in ingredients.js (to find
   the products and their substitutes per step, shown only in salon mode);
   exclude = treatments the app no longer suggests, because the allergen is
   the core of the treatment (there is no substitute). */
const ALLERGY_ASK = [
  { id:"fragrance", icon:"🌸", groups:["fragrance"], exclude:[], label:{ nl:"Parfum", en:"Fragrance", fr:"Parfum" } },
  { id:"nuts", icon:"🥜", groups:["nuts"], exclude:[], label:{ nl:"Noten (ook amandel, shea)", en:"Nuts (incl. almond, shea)", fr:"Fruits à coque (amande, karité)" } },
  { id:"latex", icon:"🧤", groups:["latex"], exclude:[], label:{ nl:"Latex", en:"Latex", fr:"Latex" } },
  { id:"asteraceae", icon:"🌼", groups:["asteraceae"], exclude:[], label:{ nl:"Kamille, arnica, calendula", en:"Chamomile, arnica, calendula", fr:"Camomille, arnica, calendula" } },
  { id:"ppd", icon:"🎨", groups:["ppd"], exclude:["browtint","lashtint","hennabrows","lashlift","browlift"], label:{ nl:"Haarverf of zwarte henna (PPD)", en:"Hair dye or black henna (PPD)", fr:"Teinture ou henné noir (PPD)" } },
  { id:"nailpolish", icon:"💅", groups:["formaldehyde","acrylates"], exclude:[], label:{ nl:"Nagellak of gellak", en:"Nail polish or gel polish", fr:"Vernis ou gel" } },
  { id:"lanolin", icon:"🐑", groups:["lanolin"], exclude:[], label:{ nl:"Wolvet (lanoline)", en:"Wool fat (lanolin)", fr:"Graisse de laine (lanoline)" } },
  { id:"bee", icon:"🐝", groups:["bee"], exclude:[], label:{ nl:"Bijenwas, propolis, honing", en:"Beeswax, propolis, honey", fr:"Cire d’abeille, propolis, miel" } }
];

function matchTreatment(mood, gender, sunExposed, healthFlags, complaintText, focusScores){
  healthFlags = healthFlags || {};
  const genderOk = (item) => item.genders.includes(gender);
  const sunOk = (item) => !sunExposed || !item.sunSensitive;
  const phlebitisOk = (item) => !healthFlags.phlebitis || !item.isMassage;
  const dietOk = (item) => !item.requiresDietExercise || healthFlags.dietExercise;
  const menstruationOk = (item) => !healthFlags.menstruation || !item.cuppingRelated;
  const pregnancyOk = (item) => !healthFlags.pregnant || (!item.pregnancyUnsafe && !(healthFlags.pregStage === "7-9" && item.isMassage));
  const roaccutaneOk = (item) => !healthFlags.roaccutane || !item.waxing;
  const ageOk = (item) => (!item.minAge45 || healthFlags.age45Plus) && (!item.minAge30 || healthFlags.age30Plus);

  const currentHour = new Date().getHours();
  const timeOk = (item) => !(currentHour < 12 && item.timeOfDay === "pm");

  const currentMonth = new Date().getMonth() + 1; // 1-12
  const isSummer = currentMonth >= 6 && currentMonth <= 8; // Jun-Aug
  const seasonOk = (item) => !item.excludeSummer || !isSummer;
  const monthRangeOk = (item) => !item.monthRange || item.monthRange.includes(currentMonth);

  const avoid = Array.isArray(healthFlags.avoid) ? healthFlags.avoid : [];
  const avoidOk = (item) => !avoid.some(g => (AVOID_GROUPS[g] || []).includes(item.id)) && !(healthFlags.allergyExclude || []).includes(item.id);
  const actionOk = (item) => !item.stockAction || actionIsOn(item.id);
  const allOk = (item) => actionOk(item) && avoidOk(item) && genderOk(item) && sunOk(item) && timeOk(item) && phlebitisOk(item) && dietOk(item) && menstruationOk(item) && pregnancyOk(item) && roaccutaneOk(item) && ageOk(item) && seasonOk(item) && monthRangeOk(item);

  // Gerichte match: highest score among the treatments that pass every rule
  if (focusScores && typeof focusScores === "object"){
    // an explicit wish: every gender may book it (make-up for men, a feminine look…)
    const ok = TREATMENTS_CATALOG.filter(item => (focusScores[item.id] || 0) > 0 && allOk(Object.assign({}, item, { genders:[gender] })));
    if (!ok.length) return null;
    const top = Math.max(...ok.map(item => focusScores[item.id]));
    return pickRandom(ok.filter(item => focusScores[item.id] === top));
  }
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
/* SECOND TREATMENT in the yearly actions (since v91): besides the one
   massage, every yearly action also gives 10% on ONE other treatment that
   has no discount of its own. It changes every year by itself (one by one
   from this list, starting at the action's "extra.offset"); to choose it
   yourself for a year: extra:{ offset:0, byYear:{ 2027:"lashlift" } }.
   The names include the article ("een", "a", "un/une"). */
const ACTION_EXTRA_TREATMENTS = [
  { id:"pedicure",       nl:"een uitgebreide pedicure",               en:"a full pedicure",                     fr:"une pédicure complète" },
  { id:"lashlift",       nl:"een lash lift met kleuring",             en:"a lash lift with tint",               fr:"un rehaussement de cils avec teinture" },
  { id:"manicure",       nl:"een uitgebreide manicure",               en:"a full manicure",                     fr:"une manucure complète" },
  { id:"browlift",       nl:"een brow lift",                          en:"a brow lift",                         fr:"un brow lift" },
  { id:"volledigebenen", nl:"een volledige beenontharing",            en:"a full leg wax",                      fr:"une épilation des jambes complètes" },
  { id:"hennabrows",     nl:"een henna brows-behandeling",            en:"a henna brows treatment",             fr:"un soin henna brows" },
  { id:"manipedispa",    nl:"een SPA-manicure of SPA-pedicure",       en:"a SPA manicure or SPA pedicure",      fr:"une manucure ou pédicure SPA" },
  { id:"glammakeup",     nl:"een avond- of partymake-up",             en:"an evening or party make-up",         fr:"un maquillage de soirée" },
  { id:"browshaping",    nl:"een brow shaping (mappen en ontharen)",  en:"a brow shaping (mapping and waxing)", fr:"un brow shaping (tracé et épilation)" },
  { id:"cateye",         nl:"een Cat Eye-gellakworkshop",             en:"a Cat Eye gel polish workshop",       fr:"un atelier vernis semi-permanent Cat Eye" }
];

const CURRENT_ACTIONS = [
  /* OPGEBRUIKACTIE (v156): Express with the previous range (Bio Balance,
     Guinot, Dr. Renaud, Safety4You) for €50 instead of €60, while stocks last.
     Stock gone? Delete this action, the "expressuseup" treatment in
     TREATMENTS_CATALOG and its price-list line. */
  /* soldOut:true = the action stops EVERYWHERE at once (banner, price list,
     match). until:"2027-03-31" = stops by itself on that date. products =
     what is being used up: in salon mode the stock tab warns when they are all
     finished, so you know it is time to set soldOut:true. */
  { id:"expressuseup", icon:"🌿", from:null, until:null, soldOut:false, dupWith:/express[\s\S]*\b50\b|\b50\b[\s\S]*express/i, priceItem:"Express gelaatsverzorging – opgebruikactie", treatment:"expressuseup",
    products:"usedIn:expressuseup",
    title:{ nl:"Express gelaatsverzorging voor €50", en:"Express facial for €50", fr:"Soin du visage express à 50 €" },
    text:{ nl:"Een frisse huid in 30 minuten, voor €50 in plaats van €60, met kwaliteitsproducten uit mijn vorige assortiment (Bio Balance, Guinot, Dr. Renaud en Safety4You). Vermeld “opgebruikactie” als je boekt. Zolang de voorraad strekt.",
           en:"Fresh skin in 30 minutes, for €50 instead of €60, with quality products from my previous range (Bio Balance, Guinot, Dr. Renaud and Safety4You). Mention “special offer” when you book. While stocks last.",
           fr:"Une peau fraîche en 30 minutes, 50 € au lieu de 60 €, avec des produits de qualité de ma gamme précédente (Bio Balance, Guinot, Dr. Renaud et Safety4You). Mentionnez « offre spéciale » en réservant. Jusqu’à épuisement du stock." } },
  { id:"grabbelton", icon:"🎁", from:null, until:null, soldOut:false,
    title:{ nl:"Grabbelton", en:"Lucky dip" },
    text:{ nl:"Besteed je €75 of meer tijdens dezelfde afspraak? Dan mag je één keer grabbelen in de grabbelton. Zolang de voorraad strekt.",
           en:"Spend €75 or more during the same appointment and you get one grab from the lucky dip. While stocks last." } },
  /* EVERY YEAR AGAIN — Valentine, Mother's Day and Father's Day: a discount
     on ONE named massage (and, since v91, on ONE other treatment, see
     ACTION_EXTRA_TREATMENTS), on the weekends around the day (Sandra works on
     Saturday and Sunday). The app works out the dates itself each year:
     weekendsBefore weekends before the weekend of the day, that weekend
     itself, and weekendsAfter weekends after it. The banner shows from
     showDaysBefore days before the first weekend until the last Sunday
     (= the deadline). No prices in the text.
     The massage changes every year by itself (one by one from
     ADVENT.autoFill.massages, starting at "offset"); to choose it yourself
     for a year: byYear:{ 2027:"hotstone" }.
     Mother's Day / Father's Day in Belgium: 2nd Sunday of May / of June.
     Preview: …/?voorproef=<your key>&datum=2027-01-20 (or 2027-05-01, 2027-06-01) */
  { id:"valentijn", icon:"💕", value:"10%", massage:{ offset:3, byYear:{} }, extra:{ offset:0, byYear:{} },
    yearly:{ anchorMD:"02-14", weekendsBefore:3, weekendsAfter:2, showDaysBefore:12 },
    title:{ nl:"Valentijnsactie: {value} korting op een {treat} of {treat2}",
            en:"Valentine’s offer: {value} off a {treat} or {treat2}",
            fr:"Action Saint-Valentin : {value} de réduction sur un {treat} ou {treat2}" },
    text:{ nl:"Verwen jezelf of je lief: {value} korting op een <b>{treat}</b> of op <b>{treat2}</b>. Geldig voor afspraken in de weekends van {from} <b>tot en met {until}</b>. Vermeld “Valentijn” als je boekt. Niet combineerbaar met andere acties of kortingen.",
           en:"Treat yourself or your love: {value} off a <b>{treat}</b> or <b>{treat2}</b>. Valid for appointments on the weekends from {from} <b>until {until}</b>. Mention “Valentine” when you book. Cannot be combined with other offers or discounts.",
           fr:"Faites-vous plaisir ou gâtez votre moitié : {value} de réduction sur un <b>{treat}</b> ou sur <b>{treat2}</b>. Valable pour les rendez-vous les week-ends du {from} <b>au {until} inclus</b>. Mentionnez « Saint-Valentin » en réservant. Non cumulable avec d’autres actions ou réductions." } },
  { id:"moederdag", icon:"💐", value:"10%", massage:{ offset:5, byYear:{} }, extra:{ offset:3, byYear:{} },
    yearly:{ anchor:"mothersday", weekendsBefore:3, weekendsAfter:1, showDaysBefore:12 },
    title:{ nl:"Moederdagactie: {value} korting op een {treat} of {treat2}",
            en:"Mother’s Day offer: {value} off a {treat} or {treat2}",
            fr:"Action fête des Mères : {value} de réduction sur un {treat} ou {treat2}" },
    text:{ nl:"Verwen je mama (of jezelf): {value} korting op een <b>{treat}</b> of op <b>{treat2}</b>. Geldig voor afspraken in de weekends van {from} <b>tot en met {until}</b>. Liever cadeau doen? Vraag naar een cadeaubon. Vermeld “Moederdag” als je boekt. Niet combineerbaar met andere acties of kortingen.",
           en:"Treat your mum (or yourself): {value} off a <b>{treat}</b> or <b>{treat2}</b>. Valid for appointments on the weekends from {from} <b>until {until}</b>. Rather give it as a present? Ask for a gift voucher. Mention “Mother’s Day” when you book. Cannot be combined with other offers or discounts.",
           fr:"Gâtez votre maman (ou vous-même) : {value} de réduction sur un <b>{treat}</b> ou sur <b>{treat2}</b>. Valable pour les rendez-vous les week-ends du {from} <b>au {until} inclus</b>. Plutôt l’offrir ? Demandez un bon cadeau. Mentionnez « fête des Mères » en réservant. Non cumulable avec d’autres actions ou réductions." } },
  /* Mother's Day on 15 August (Antwerp tradition): 2 weekends before and 2 after.
     */
  { id:"moederdag15aug", icon:"🌷", value:"10%", massage:{ offset:1, byYear:{} }, extra:{ offset:6, byYear:{} },
    yearly:{ anchorMD:"08-15", weekendsBefore:2, weekendsAfter:2, showDaysBefore:12 },
    title:{ nl:"Moederdag 15 augustus: {value} korting op een {treat} of {treat2}",
            en:"Mother’s Day 15 August: {value} off a {treat} or {treat2}",
            fr:"Fête des Mères du 15 août : {value} de réduction sur un {treat} ou {treat2}" },
    text:{ nl:"Vier je Moederdag op 15 augustus? Verwen je mama (of jezelf): {value} korting op een <b>{treat}</b> of op <b>{treat2}</b>. Geldig voor afspraken in de weekends van {from} <b>tot en met {until}</b>. Liever cadeau doen? Vraag naar een cadeaubon. Vermeld “Moederdag” als je boekt. Niet combineerbaar met andere acties of kortingen.",
           en:"Celebrating Mother’s Day on 15 August? Treat your mum (or yourself): {value} off a <b>{treat}</b> or <b>{treat2}</b>. Valid for appointments on the weekends from {from} <b>until {until}</b>. Rather give it as a present? Ask for a gift voucher. Mention “Mother’s Day” when you book. Cannot be combined with other offers or discounts.",
           fr:"Vous fêtez les mères le 15 août ? Gâtez votre maman (ou vous-même) : {value} de réduction sur un <b>{treat}</b> ou sur <b>{treat2}</b>. Valable pour les rendez-vous les week-ends du {from} <b>au {until} inclus</b>. Plutôt l’offrir ? Demandez un bon cadeau. Mentionnez « fête des Mères » en réservant. Non cumulable avec d’autres actions ou réductions." } },
  { id:"vaderdag", icon:"☕", value:"10%", massage:{ offset:8, byYear:{} }, extra:{ offset:8, byYear:{} },
    yearly:{ anchor:"fathersday", weekendsBefore:2, weekendsAfter:1, showDaysBefore:12 },
    title:{ nl:"Vaderdagactie: {value} korting op een {treat} of {treat2}",
            en:"Father’s Day offer: {value} off a {treat} or {treat2}",
            fr:"Action fête des Pères : {value} de réduction sur un {treat} ou {treat2}" },
    text:{ nl:"Verwen je papa (of jezelf): {value} korting op een <b>{treat}</b> of op <b>{treat2}</b>. Geldig voor afspraken in de weekends van {from} <b>tot en met {until}</b>. Liever cadeau doen? Vraag naar een cadeaubon. Vermeld “Vaderdag” als je boekt. Niet combineerbaar met andere acties of kortingen.",
           en:"Treat your dad (or yourself): {value} off a <b>{treat}</b> or <b>{treat2}</b>. Valid for appointments on the weekends from {from} <b>until {until}</b>. Rather give it as a present? Ask for a gift voucher. Mention “Father’s Day” when you book. Cannot be combined with other offers or discounts.",
           fr:"Gâtez votre papa (ou vous-même) : {value} de réduction sur un <b>{treat}</b> ou sur <b>{treat2}</b>. Valable pour les rendez-vous les week-ends du {from} <b>au {until} inclus</b>. Plutôt l’offrir ? Demandez un bon cadeau. Mentionnez « fête des Pères » en réservant. Non cumulable avec d’autres actions ou réductions." } }
];

/* ============================================================
   CLOSED DAYS — public holidays on which no appointments are possible.
   "MM-DD" = every year; "cny" = first day of Chinese New Year
   (LUNAR_DATES in seasons.js). Shown on the season card and above the
   booking buttons when such a day is coming up (within noticeDays days).
   Only general holidays belong here: this file is public.
   ============================================================ */
// Empty on purpose: a public notice "closed on …" also tells people when the
// house may be empty. Sandra tells clients herself when they book.
const CLOSED_DAYS = { days:[], noticeDays:28 };

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
const APP_VERSION = "v196 · 21/10/2026";
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
  count: 3,          // how many ordinary blog posts under "Leestips & blog"
  fetch: 12,         // how many posts the app reads to find actions among them
  allUrl: "https://sanmakeupstudio.wordpress.com/author/beautyglowbysandra/",
  /* ACTIONS & SPECIALS (since v93) — a post counts as an action when it has
     one of these categories or tags (name or slug, any case), OR when its
     title/intro contains words like "actie", "aanbod", "korting", "10%",
     "op = op". Only actions newer than maxAgeDays are shown, as ONE short
     line each, in the card "Lopende acties" just above the Grabbelton
     (start screen and result screen); older action posts go to the normal
     blog list. Tips: give every action post the category "Acties"; want to
     choose the line yourself? Fill in the WordPress field "Samenvatting"
     (excerpt) with max. 140 characters and a price, e.g.
     "Guinot Équilibre Pureté: €58,50 i.p.v. €65 · nog 7 plaatsen". */
  specials: {
    categories: ["acties", "actie", "tijdelijk aanbod", "tijdelijk-aanbod", "nieuwsbrief", "herfstactie"],
    words: /\b(actie|aanbod|korting|promo|special)\b|\d{1,2}\s?%|op\s*=\s*op/i,
    maxAgeDays: 45,
    max: 3
  }
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
     until liveFrom (15 November: then the announcement goes live by
     itself; the doors still only open from 1 December, each on its day)
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
   - photo: Sandra's pencil drawing (round medallion on cream paper,
     640×640 webp, transparent outside the circle) in assets/advent,
     shown in the voucher's square. Also add it to ASSETS in sw.js.
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
/* SHA-256 (synchronous, tiny) — used so the private preview key itself is NOT in this public file */
function bcSha256Hex(msg){
  const K=[],H=[];let p=0;
  const isP=n=>{for(let i=2;i*i<=n;i++)if(n%i===0)return false;return true};
  for(let c=2;p<64;c++)if(isP(c)){K[p]=(Math.cbrt(c)%1*4294967296)|0;if(p<8)H[p]=(Math.sqrt(c)%1*4294967296)|0;p++;}
  const b=unescape(encodeURIComponent(String(msg))),l=b.length*8,w=[];
  for(let i=0;i<(((l+64)>>9)<<4)+16;i++)w[i]=0;
  for(let i=0;i<b.length;i++)w[i>>2]|=b.charCodeAt(i)<<(24-(i%4)*8);
  w[l>>5]|=0x80<<(24-l%32);w[(((l+64)>>9)<<4)+15]=l;
  const rr=(x,n)=>(x>>>n)|(x<<(32-n));
  for(let o=0;o<w.length;o+=16){
    const x=w.slice(o,o+16),v=H.slice(0);
    for(let i=0;i<64;i++){
      if(i>=16){const s0=rr(x[i-15],7)^rr(x[i-15],18)^(x[i-15]>>>3),s1=rr(x[i-2],17)^rr(x[i-2],19)^(x[i-2]>>>10);x[i]=(x[i-16]+s0+x[i-7]+s1)|0;}
      const t1=(v[7]+(rr(v[4],6)^rr(v[4],11)^rr(v[4],25))+((v[4]&v[5])^(~v[4]&v[6]))+K[i]+x[i])|0;
      const t2=((rr(v[0],2)^rr(v[0],13)^rr(v[0],22))+((v[0]&v[1])^(v[0]&v[2])^(v[1]&v[2])))|0;
      v.pop();v.unshift((t1+t2)|0);v[4]=(v[4]+t1)|0;
    }
    for(let i=0;i<8;i++)H[i]=(H[i]+v[i])|0;
  }
  return H.map(n=>(n>>>0).toString(16).padStart(8,"0")).join("");
}
/* PRIVATE PREVIEW for the whole app, all year round (only Sandra knows the key):
     https://beautyandcoffeemechelen.github.io/?voorproef=<your key>
   add &datum=2027-06-01 to see the app as on that day (seasonal looks,
   advent, …); a yellow bar at the top lets you pick another date.
   Since v196 this PUBLIC file only holds a fingerprint (SHA-256) of the key,
   not the key itself. Want a new key? Ask Claude: it gives you a new key
   and the new fingerprint to put here. */
const PREVIEW_KEY_HASH = "2640ee55d235adb3ee52b367ff487017d24a11f42152ec737bc7fe70f283a995";
function previewMatch(k, h){ try { return !!k && !!(h || PREVIEW_KEY_HASH) && bcSha256Hex(String(k)) === (h || PREVIEW_KEY_HASH); } catch(e){ return false; } }
const PREVIEW_KEY = PREVIEW_KEY_HASH;   // kept as a name for the places that pass it on; it is a fingerprint, never the key

/* EVERY YEAR AGAIN: the calendar comes back by itself each year on the same
   dates (announcement 15/11, doors 1–25/12). What is behind the doors is set
   per year in doorsByYear below. A year without a list, or a door that is
   left out, is filled automatically with 15% off a massage — one by one from
   autoFill.massages. These vouchers name the massage and show no price
   (noMin: true). */
const ADVENT = {
  live: false,                  // true = public right away (e.g. on 15/11 for the announcement)
  liveFromMD: "11-15",          // public automatically from this day (announcement); doors only open from 1/12, each on its own day
  teaserFromMD: "11-15",        // from this day the start screen announces the calendar
  previewKey: PREVIEW_KEY,
  // year, liveFrom, teaserFrom and doors are filled in automatically (see the end of this block)
  bookWithinDays: 21,           // book the appointment with the code within 3 weeks after opening
  useWithinDays: 42,            // the appointment takes place at the latest 6 weeks after opening
  homemadeDays: 21,             // homemade products: the appointment within 3 weeks (shelf life)
  giftMinSpend: 20,             // gifts: only with a treatment of at least €20
  maxGiftsPerClient: 1,         // 1 gift per client for the whole calendar (null = no limit)
  discountMinSpend: 60,         // discounts: only on a treatment from €60
  maxDiscountsPerClient: null,  // discounts per client (null = no limit; they are never combinable)
  maxExtrasPerClient: null,     // free extras per client (null = no limit; 1 per treatment)
  showPhotos: true,             // true = show the drawings in assets/advent; false = icons only
  items: {
    buffer: { type:"gift", icon:"💅",
      photo:"assets/advent/buffer-ill.webp",
      nl:"Mini buffervijltje voor de nagels", en:"Mini nail buffer", fr:"Mini polissoir à ongles",
      use:{ nl:"Om je nagels glad te vijlen en te laten glanzen. Werk in één richting. Persoonlijk gebruik — niet delen.", en:"To smooth your nails and make them shine. Work in one direction. For personal use — do not share.", fr:"Pour lisser et faire briller les ongles. Travaillez dans un seul sens. Usage personnel — ne pas partager." },
      ingredients:"", noIngredients:true },
    eraser: { type:"gift", icon:"✏️",
      photo:"assets/advent/eraser-ill.webp",
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
    led: { type:"extra", photo:"assets/advent/led-ill.webp", icon:"💡", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      product:"LED-lichttunnel",
      highlights:{ nl:"10 minuten in de LED-lichttunnel, afgestemd op jouw huid. <b>Rood</b>: stimuleert collageen en celvernieuwing — anti-aging, minder rimpels. <b>Groen</b>: vermindert roodheid. <b>Blauw</b>: zuiverend bij onzuiverheden en acné. <b>Oranje</b>: revitaliserend, voor een elastischere huid.",
                   en:"10 minutes in the LED light tunnel, matched to your skin. <b>Red</b>: stimulates collagen and cell renewal — anti-ageing, fewer wrinkles. <b>Green</b>: reduces redness. <b>Blue</b>: purifying for blemishes and acne. <b>Orange</b>: revitalising, for more elastic skin.",
                   fr:"10 minutes dans le tunnel de lumière LED, adapté à votre peau. <b>Rouge</b> : stimule le collagène et le renouvellement cellulaire — anti-âge, moins de rides. <b>Vert</b> : atténue les rougeurs. <b>Bleu</b> : purifiant pour les imperfections et l'acné. <b>Orange</b> : revitalisant, pour une peau plus élastique." },
      nl:"Gratis 10 min LED-lichttherapie", en:"Free 10-min LED light therapy", fr:"10 min de luminothérapie LED offertes" },
    handspa: { type:"extra", icon:"🤲", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Een scrub met dode-zeezout, kelp en plantaardige oliën (saffloer, zonnebloem, druivenpit, abrikozenpit) maakt je handen zacht. Daarna een massage met een verzorgende lotion met aloë vera, jojoba en sheaboter. Bevat parfum.",
                   en:"A scrub with Dead Sea salt, kelp and plant oils (safflower, sunflower, grapeseed, apricot kernel) softens your hands, followed by a massage with a nourishing lotion with aloe vera, jojoba and shea butter. Contains fragrance.",
                   fr:"Un gommage au sel de la mer Morte, au varech et aux huiles végétales (carthame, tournesol, pépins de raisin, noyau d'abricot) adoucit vos mains, suivi d'un massage avec une lotion nourrissante à l'aloe vera, au jojoba et au beurre de karité. Contient du parfum." },
      product:"Indulge BuffingSeaSalt Oil Scrub + MellowMoist Lotion (daarna Gerlasan handcrème)",
      ingredients:"Scrub: Carthamus Tinctorius Seed Oil, Helianthus Annuus Seed Oil, Vitis Vinifera Seed Oil, Prunus Armeniaca Kernel Oil, Magnesium Sulfate, Sodium Chloride, Dead Sea Salts, Macrocystis Pyrifera Extract, Dextrose Monohydrate, Fragrance. — Lotion: Aloe Barbadensis Leaf Juice, Aqua, Helianthus Annuus Seed Oil, Isopropyl Palmitate, Glyceryl Stearate SE, Cetyl Alcohol, Stearic Acid, Simmondsia Chinensis Seed Oil, Panthenol, Tocopheryl Acetate, Camellia Sinensis Leaf Extract, Glycerin, Butyrospermum Parkii Butter, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin, Fragrance. (Volledige lijsten: zie Ingrediënten & allergieën.)",
      nl:"Gratis handpeeling & -massage", en:"Free hand peeling & massage", fr:"Gommage & massage des mains offerts" },
    paraffinmask: { type:"extra", photo:"assets/advent/paraffinmask-ill.webp", icon:"🕯️", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Eerst een verjongend serum met marien DNA en co-enzym Q10, daarna een warm paraffinemasker dat alles laat intrekken — voor een diep gehydrateerde, stralende huid. Bevat parfum en colofonium (hars).",
                   en:"First a rejuvenating serum with marine DNA and coenzyme Q10, then a warm paraffin mask that helps it all sink in — for deeply hydrated, radiant skin. Contains fragrance and colophony (rosin).",
                   fr:"D'abord un sérum rajeunissant à l'ADN marin et à la coenzyme Q10, puis un masque chaud à la paraffine qui fait tout pénétrer — pour une peau profondément hydratée et éclatante. Contient du parfum et de la colophane." },
      product:"Depilève Waxceutical DNA Rejuvenating Serum + DNA Thermo Mask (paraffine)",
      ingredients:"Zie Ingrediënten & allergieën: DNA Thermo Mask en DNA Rejuvenating Serum.",
      nl:"Gratis anti-aging paraffinemasker", en:"Free anti-ageing paraffin mask", fr:"Masque anti-âge à la paraffine offert" },
    hotstoneface: { type:"extra", photo:"assets/advent/hotstoneface-ill.webp", icon:"🪨", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      nl:"Gratis Hot Stone gelaatsmassage", en:"Free Hot Stone facial massage", fr:"Massage visage aux pierres chaudes offert" },
    facecupping: { type:"extra", photo:"assets/advent/facecupping-ill.webp", icon:"✨", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      nl:"Gratis liftende cuppingmassage voor het gelaat", en:"Free lifting cupping facial massage", fr:"Massage liftant aux ventouses du visage offert" },
    peelanti: { type:"extra", icon:"🌟", stock:6, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met kaviaarextract, hamamelis, lavendel en collageen — verstevigt en geeft de rijpere huid een frisse, gladde uitstraling. Vooraf een hyaluronzuurserum met komkommer voor extra vocht.", en:"With caviar extract, witch hazel, lavender and collagen — firms and gives mature skin a fresh, smooth look. First a hyaluronic acid serum with cucumber for extra moisture.", fr:"À l'extrait de caviar, à l'hamamélis, à la lavande et au collagène — raffermit et donne aux peaux matures un aspect frais et lisse. D'abord un sérum à l'acide hyaluronique et au concombre pour plus d'hydratation." },
      product:"Bio Balance Algoherbal Ageing (poedermasker + Essence Gel) + Hya-Lift+ serum",
      ingredients:"Poeder (Lavender): Zea Mays (Corn) Starch, Algin, Calcium Sulfate, Glucose, Magnesium Carbonate, Lavandula Angustifolia (Lavender) Flower, Sodium Phosphate, CI 42090, Lavandula Angustifolia (Lavender) Oil. — Essence Gel (Lavender & Caviar): Aqua, Butylene Glycol, Aloe Barbadensis Extract, Glycerin, Caviar Extract, Hamamelis Virginiana Extract, Lavandula Angustifolia Extract, Carbomer, Triethanolamine, Hyaluronic Acid, Hydrolyzed Collagen, Allantoin, PEG-40 Hydrogenated Castor Oil, Parfum, CI 42090, Phenoxyethanol, Limonene, Linalool, Geraniol, Alpha-Isomethyl Ionone, CI 16035",
      nl:"Gratis anti-aging peel-off masker", en:"Free anti-ageing peel-off mask", fr:"Masque peel-off anti-âge offert" },
    peelsens: { type:"extra", icon:"🌹", stock:1, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met rozenblaadjes, rozenolie, aloë vera, komkommer en hyaluronzuur — kalmeert, hydrateert en verzacht de gevoelige huid. Vooraf een mild hyaluronzuurserum zonder parfum.", en:"With rose petals, rose oil, aloe vera, cucumber and hyaluronic acid — calms, hydrates and softens sensitive skin. First a mild, fragrance-free hyaluronic acid serum.", fr:"Aux pétales de rose, à l'huile de rose, à l'aloe vera, au concombre et à l'acide hyaluronique — apaise, hydrate et adoucit les peaux sensibles. D'abord un sérum doux à l'acide hyaluronique, sans parfum." },
      product:"Bio Balance Algoherbal Sensitive – Rose (poedermasker + Essence Gel) + Hya-Lift+ serum",
      ingredients:"Poeder (Rose): Zea Mays (Corn) Starch, Algin, Calcium Sulfate, Glucose, Magnesium Carbonate, Rosa Centifolia Flower, Sodium Phosphate, CI 16035, Rosa Rugosa Flower Oil. — Essence Gel (Rose): Aqua, Butylene Glycol, Aloe Barbadensis Extract, Glycerin, Cucumis Sativus Fruit Extract, Hydrolyzed Collagen, Carbomer, Triethanolamine, PEG-40 Hydrogenated Castor Oil, Hyaluronic Acid, Parfum, Disodium EDTA, Phenoxyethanol, Limonene, Linalool, Alpha-Isomethyl Ionone, CI 16035",
      nl:"Gratis rozen peel-off masker voor de gevoelige huid", en:"Free rose peel-off mask for sensitive skin", fr:"Masque peel-off à la rose pour peaux sensibles offert" },
    collagen: { type:"extra", photo:"assets/advent/collagen-ill.webp", icon:"🫧", stock:4, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met marien collageen en haver — liftend en verstevigend, voor een zichtbaar gladdere huid.", en:"With marine collagen and oat — lifting and firming, for visibly smoother skin.", fr:"Au collagène marin et à l'avoine — liftant et raffermissant, pour une peau visiblement plus lisse." },
      product:"Bio Balance Super Collageen Gelmasker Lifting",
      ingredients:"Aqua, Soluble Collagen, Propanediol, Phenoxyethanol, Avena Sativa (Oat) Kernel Extract, Carbomer, Caprylyl Glycol, Sodium Hydroxide, Disodium EDTA, Sodium Benzoate",
      nl:"Gratis collageenvliesmasker", en:"Free collagen sheet mask", fr:"Masque en tissu au collagène offert" },
    goldmask: { type:"extra", photo:"assets/advent/goldmask-ill.webp", icon:"👑", stock:1, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met collageen, hyaluronzuur, centella en groene thee — hydrateert en geeft een stralende, frisse look. Volgens de verpakking niet voor de gevoelige huid.", en:"With collagen, hyaluronic acid, centella and green tea — hydrates and gives a radiant, fresh look. According to the pack, not for sensitive skin.", fr:"Au collagène, à l'acide hyaluronique, à la centella et au thé vert — hydrate et donne un teint frais et éclatant. Selon l'emballage, ne convient pas aux peaux sensibles." },
      product:"Gold Bio-Collagen Facial Mask",
      ingredients:"Aqua, Glycerin, Xanthan Gum, Mica, Chondrus Crispus Powder, Titanium Dioxide, Chlorphenesin, Glucomannan, Algin, Methylparaben, Potassium Chloride, Sodium Hyaluronate, Hydrolyzed Collagen, Butylene Glycol, Centella Asiatica Extract, Polygonum Cuspidatum Root Extract, Scutellaria Baicalensis Root Extract, Camellia Sinensis Leaf Extract, Glycyrrhiza Glabra (Licorice) Root Extract, Chamomilla Recutita (Matricaria) Flower Extract, Rosmarinus Officinalis (Rosemary) Leaf Extract, Iron Oxides, Citric Acid, Potassium Citrate, PEG-40 Hydrogenated Castor Oil, Fragrance",
      nl:"Gratis gouden collageenmasker", en:"Free gold collagen mask", fr:"Masque au collagène doré offert" },
    spamani: { type:"extra", icon:"💅", with:{ nl:"manicure", en:"manicure", fr:"manucure" },
      nl:"Gratis SPA manicure", en:"Free SPA manicure", fr:"Manucure SPA offerte" },
    spapedi: { type:"extra", icon:"🦶", with:{ nl:"pedicure", en:"pedicure", fr:"pédicure" },
      nl:"Gratis SPA pedicure", en:"Free SPA pedicure", fr:"Pédicure SPA offerte" },
    eyeflash: { type:"extra", photo:"assets/advent/eyeflash-ill.webp", icon:"👁️", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Een ampul oogserum met hyaluronzuur en peptiden, tijdens je gelaatsverzorging zacht rond de ogen ingeklopt — voor een frissere, minder vermoeide blik. Bevat parfum.",
                   en:"An ampoule of eye serum with hyaluronic acid and peptides, gently patted around the eyes during your facial — for a fresher, less tired look. Contains fragrance.",
                   fr:"Une ampoule de sérum contour des yeux à l'acide hyaluronique et aux peptides, appliquée en tapotant pendant votre soin du visage — pour un regard plus frais et moins fatigué. Contient du parfum." },
      product:"Janssen Cosmetics Eye Flash Fluid (ampul 1,5 ml)",
      ingredients:"Aqua (Water), Butylene Glycol, Glycerin, Pentylene Glycol, Xanthan Gum, Sodium Hyaluronate, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Carbomer, Coco-Glucoside, Trideceth-9, PEG-40 Hydrogenated Castor Oil, PEG-7 Glyceryl Cocoate, Tetrasodium Glutamate Diacetate, Propylene Glycol, Citric Acid, Sodium Hydroxide, Parfum (Fragrance), Phenoxyethanol, Sodium Benzoate, Sodium Lactate, CI 16035 (Red 40)",
      nl:"Gratis Eye Flash oogampul tijdens je gelaatsverzorging", en:"Free Eye Flash eye ampoule during your facial", fr:"Ampoule yeux Eye Flash offerte pendant votre soin du visage" },
    guinot: { type:"extra", photo:"assets/advent/guinot-ill.webp", icon:"🧴", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Een extra zachte scrub met microkorrels van shea, tijdens je gelaatsverzorging — voor een gladde, stralende huid. Bevat zoete-amandelolie (noten) en parfum.",
                   en:"An extra gentle scrub with shea microbeads during your facial — for smooth, radiant skin. Contains sweet almond oil (nuts) and fragrance.",
                   fr:"Un gommage extra doux aux micrograins de karité pendant votre soin du visage — pour une peau lisse et éclatante. Contient de l'huile d'amande douce (fruits à coque) et du parfum." },
      product:"Guinot Gommage Éclat Parfait",
      ingredients:"Water/Eau (Aqua), Isopropyl Palmitate, Glyceryl Stearate SE, Cetearyl Alcohol, C10-18 Triglycerides, Glycerin, Cellulose Acetate, Propanediol, Steareth-21, Pentylene Glycol, Decyl Glucoside, Butyrospermum Parkii (Shea) Butter Extract, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Cetearyl Glucoside, Tocopheryl Acetate, Fragrance (Parfum), Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Caprylyl Glycol, Xanthan Gum, Butylene Glycol, BHT, Disodium EDTA, Hexyl Cinnamal, Linalool, Benzyl Benzoate, Red 4 (CI 14700), Yellow 5 (CI 19140)",
      nl:"Gratis Guinot Éclat Parfait scrub tijdens je gelaatsverzorging", en:"Free Guinot Éclat Parfait scrub during your facial", fr:"Gommage Guinot Éclat Parfait offert pendant votre soin du visage" },
    neckcream: { type:"extra", icon:"🎀", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Als cadeau bij je gelaatsverzorging: een verstevigende verzorging voor hals en decolleté, met haverextract en hyaluronzuur, rustig ingemasseerd — voor een gladdere, stevigere huid. Bevat parfum.",
                   en:"As a gift with your facial: a firming treatment for neck and décolleté with oat extract and hyaluronic acid, gently massaged in — for smoother, firmer skin. Contains fragrance.",
                   fr:"En cadeau avec votre soin du visage : un soin raffermissant cou et décolleté à l’extrait d’avoine et à l’acide hyaluronique, massé tout en douceur — pour une peau plus lisse et ferme. Contient du parfum." },
      product:"Janssen Cosmetics Firming Neck & Décolleté Cream (ref. 0071P)",
      ingredients:"Aqua (Water), Butylene Glycol, Caprylic/Capric Triglyceride, Squalane, Isostearyl Isostearate, Decyl Oleate, Cetearyl Alcohol, Hydrogenated Coco-Glycerides, Methyl Glucose Sesquistearate, Glyceryl Stearate, Octyldodecanol, Pentylene Glycol, Avena Sativa (Oat) Kernel Extract, Yeast Extract, Sodium Hyaluronate, Lecithin, Ethylhexylglycerin, Glyceryl Caprylate, Hydrogenated Palm Glycerides Citrate, Dimethicone, Steareth-21, Citric Acid, Sodium Hydroxide, Ascorbyl Palmitate, Tocopherol, Tetrasodium Glutamate Diacetate, Parfum (Fragrance), Phenoxyethanol, Sodium Benzoate, CI 15985 (Yellow 6)",
      nl:"Gratis verstevigende hals- en decolletéverzorging bij je gelaatsverzorging", en:"Free firming neck & décolleté treatment with your facial", fr:"Soin raffermissant cou et décolleté offert avec votre soin du visage" },
    guasha: { type:"extra", icon:"🪨", with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Een rustgevende gua sha-gelaatsmassage met een gladde steen: ontspant, laat het vocht afvloeien en geeft een frisse, stralende huid. De steen glijdt over een hyaluronzuurserum zonder parfum.",
                   en:"A relaxing gua sha facial massage with a smooth stone: relaxes, drains fluid and gives fresh, radiant skin. The stone glides over a fragrance-free hyaluronic acid serum.",
                   fr:"Un massage du visage gua sha avec une pierre lisse : détend, draine et donne un teint frais et lumineux. La pierre glisse sur un sérum à l’acide hyaluronique, sans parfum." },
      product:"Gua sha + Bio Balance Hya-Lift+ hyaluronzuurserum",
      ingredients:"Aqua (Water), Cucumis Sativus (Cucumber) Fruit Extract, Sodium Hyaluronate, Alcohol, Phenoxyethanol",
      nl:"Gratis gua sha-gelaatsmassage bij je gelaatsverzorging", en:"Free gua sha facial massage with your facial", fr:"Massage du visage gua sha offert avec votre soin du visage" },
    // ---- more salon products ----
    luminoclear: { type:"extra", icon:"✨", stock:2, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met vitamine C, melkzuur (AHA), witte lelie en berendruif — voor een egalere, stralende teint bij pigmentvlekjes.", en:"With vitamin C, lactic acid (AHA), white lily and bearberry — for a more even, radiant complexion with pigment spots.", fr:"À la vitamine C, à l'acide lactique (AHA), au lys blanc et à la busserole — pour un teint plus uniforme et éclatant en cas de taches pigmentaires." },
      product:"Bio Balance LuminoClear BioCell Mask (Pigment, met AHA)",
      nl:"Gratis LuminoClear biocellulosemasker (pigmentvlekjes)", en:"Free LuminoClear biocellulose mask (pigmentation)", fr:"Masque biocellulose LuminoClear offert (taches pigmentaires)",
      ingredients:"Aqua (Water), Propylene Glycol, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, Sodium Ascorbyl Phosphate, Sodium Stearoyl Glutamate, Lactic Acid, Parfum (Fragrance), Sodium Benzoate, 1,2-Hexanediol, Caprylyl Glycol, Xanthan Gum, Lilium Candidum Leaf Cell Extract, Sodium Phytate, Helianthus Annuus (Sunflower) Seed Oil, Linalool, Arctostaphylos Uva Ursi Leaf Extract, Geraniol, Citronellol, Limonene" },
    peelblueberry: { type:"extra", icon:"🫐", stock:4, with:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" },
      highlights:{ nl:"Met bosbes, vitamine C en kamilleolie — een kalmerend algenmasker voor de gevoelige huid.", en:"With bilberry, vitamin C and chamomile oil — a soothing seaweed mask for sensitive skin.", fr:"À la myrtille, à la vitamine C et à l'huile de camomille — un masque aux algues apaisant pour les peaux sensibles." },
      product:"Bio Balance Peel-Off Algenmasker Bosbessen (Sensitive)",
      nl:"Gratis kalmerend bosbessen peel-off masker", en:"Free soothing blueberry peel-off mask", fr:"Masque peel-off apaisant à la myrtille offert",
      ingredients:"Diatomaceous Earth, Algin, Calcium Sulfate, Tetrasodium Pyrophosphate, Sodium Ascorbate, Maltodextrin, Vaccinium Myrtillus Fruit Extract, Ormenis Multicaulis Oil, Limonene" },
    facial10: { type:"discount", icon:"🧖", value:"10%",
      nl:"10% korting op een gelaatsverzorging", en:"10% off a facial", fr:"10 % de réduction sur un soin du visage",
      treat:{ nl:"gelaatsverzorging", en:"facial", fr:"soin du visage" } },
    massage15: { type:"discount", icon:"💆", value:"15%",
      nl:"15% korting op een massage", en:"15% off a massage", fr:"15 % de réduction sur un massage",
      treat:{ nl:"massage", en:"massage", fr:"massage" } },
    // gel polish: Sandra wants to use up all gel polish asap (15/10), above all the HEMA range and the less-chosen colours
    gelpromo25: { type:"discount", icon:"💅", value:"25%", noMin:true,
      nl:"25% korting op gellak in een van onze actiekleuren", en:"25% off gel polish in one of our featured colours", fr:"25 % de réduction sur le vernis semi-permanent dans une de nos couleurs du moment",
      treat:{ nl:"gellak in een actiekleur (bij een manicure of pedicure)", en:"gel polish in a featured colour (with a manicure or pedicure)", fr:"vernis semi-permanent dans une couleur du moment (avec une manucure ou pédicure)" } },
    gelpromo15: { type:"discount", icon:"💅", value:"15%", noMin:true,
      nl:"15% korting op gellak (alle kleuren)", en:"15% off gel polish (all colours)", fr:"15 % de réduction sur le vernis semi-permanent (toutes les couleurs)",
      treat:{ nl:"gellak (bij een manicure of pedicure)", en:"gel polish (with a manicure or pedicure)", fr:"vernis semi-permanent (avec une manucure ou pédicure)" } },
    // nail polish & workshops (Sandra, 15/10): use up polish, fill workshops
    nailpolishfree: { type:"extra", icon:"💅", with:{ nl:"manicure of pedicure", en:"manicure or pedicure", fr:"manucure ou pédicure" },
      highlights:{ nl:"Een frisse kleur op je nagels als afwerking van je manicure of pedicure: kies een gewone nagellak uit onze kleurenmand (normaal €5).", en:"A fresh colour on your nails to finish your manicure or pedicure: pick a regular nail polish from our colour basket (normally €5).", fr:"Une couleur fraîche sur vos ongles pour finir votre manucure ou pédicure : choisissez un vernis classique dans notre panier de couleurs (normalement 5 €)." },
      product:"Gewone nagellak (Yves Rocher, Only You, Rimmel, Bourjois, Max Factor, essence, Cien, Crisnail French)",
      ingredients:"Zie Ingrediënten & allergieën: gewone nagellak en Crisnail French Lacquer.",
      nl:"Gratis nagellak bij je manicure of pedicure", en:"Free nail polish with your manicure or pedicure", fr:"Vernis offert avec votre manucure ou pédicure" },
    workshop15: { type:"discount", icon:"🎓", value:"15%", noMin:true,
      nl:"15% korting op een beauty-workshop (Cat Eye-gellak, make-up of gelaatsverzorging)", en:"15% off a beauty workshop (Cat Eye gel polish, make-up or facial)", fr:"15 % de réduction sur un atelier beauté (vernis gel Cat Eye, maquillage ou soin du visage)",
      treat:{ nl:"beauty-workshop (Cat Eye-gellak, make-up of gelaatsverzorging)", en:"beauty workshop (Cat Eye gel polish, make-up or facial)", fr:"atelier beauté (vernis gel Cat Eye, maquillage ou soin du visage)" } },
    // Lift Summum: uses up the Guinot Lift Summum kits (Sandra, 15/10 — replaces the mascara wand)
    liftsummum15: { type:"discount", icon:"✨", value:"15%",
      nl:"15% korting op een Lift Summum gelaatsverzorging", en:"15% off a Lift Summum facial", fr:"15 % de réduction sur un soin du visage Lift Summum",
      treat:{ nl:"Lift Summum gelaatsverzorging", en:"Lift Summum facial", fr:"soin du visage Lift Summum" } }
  },
  // discount per door day (max. 15%, rising towards Christmas)
  discountByDay: [ { to:8, v:"5%" }, { to:16, v:"10%" }, { to:25, v:"15%" } ],
  // the massages for empty doors (in this order, then again from the top)
  autoFill: { value:"15%", massages:[
    { id:"hotstone",        nl:"Hot Stone massage",                      en:"Hot Stone massage",                   fr:"massage aux pierres chaudes" },
    { id:"cupping",         nl:"cuppingmassage",                         en:"cupping massage",                     fr:"massage aux ventouses" },
    { id:"swedish",         nl:"Zweedse massage (volledig lichaam)",     en:"full-body Swedish massage",           fr:"massage suédois complet" },
    { id:"slimmassage",     nl:"afslankingsmassage",                     en:"slimming massage",                    fr:"massage amincissant" },
    { id:"cuppingpeeling",  nl:"Cupping Body Renewal",                   en:"Cupping Body Renewal",                fr:"soin Cupping Body Renewal" },
    { id:"swedishbackneck", nl:"Zweedse rug-, nek- en schoudermassage",  en:"Swedish back, neck & shoulder massage", fr:"massage suédois dos, nuque et épaules" },
    { id:"backwrap",        nl:"Energetic Back Wrap",                    en:"back wrap (Energetic Back Wrap)",     fr:"soin Energetic Back Wrap" },
    { id:"harmonizingbody", nl:"harmoniserende full body verzorging",    en:"harmonising full-body treatment",     fr:"soin harmonisant complet du corps" },
    { id:"swedishlegs",     nl:"Zweedse benen- en voetenmassage",        en:"Swedish leg & foot massage",          fr:"massage suédois jambes et pieds" },
    { id:"fullbodywrap",    nl:"energetische full body pakking",         en:"energising full-body wrap",           fr:"enveloppement énergétique complet" }
  ]},
  doorsByYear: {
  2026: [
    { day:1,  item:"workshop15",    stock:null },   // workshops (Sandra, 15/10)
    { day:2,  item:"led",           stock:null },
    { day:3,  item:"gelpromo25",    stock:null },   // gellak opmaken: HEMA-reeks en minder gekozen kleuren (Sandra, 15/10)
    { day:4,  item:"handspa",       stock:null },
    { day:5,  item:"liftsummum15",  stock:null },   // i.p.v. mascaraborsteltje (Sandra, 15/10)
    { day:6,  item:"neckcream",     stock:null },   // Janssen Firming Neck & Décolleté als cadeau bij een gelaatsverzorging (Sandra, 17/10; i.p.v. 10% op een gelaatsverzorging)
    { day:7,  item:"eyeflash",      stock:null },   // in het salon, bij een gelaatsverzorging (Sandra, 13/10)
    { day:8,  item:"peelsens",      stock:null },
    { day:9,  item:"nailpolishfree", stock:null },  // gewone nagellak opmaken (Sandra, 15/10); gellak blijft op 3 en 17
    { day:10, item:"guasha",        stock:null },   // gua sha met Hya-Lift+ serum (Sandra, 18/10; i.p.v. Hot Stone gelaatsmassage)
    { day:11, item:"massage15",     stock:null },
    { day:12, item:"buffer",        stock:null },
    { day:13, item:"facecupping",   stock:null },
    { day:14, item:"guinot",        stock:null },   // in het salon, bij een gelaatsverzorging
    { day:15, item:"spamani",       stock:null },
    { day:16, item:"peelblueberry", stock:null },   // ongeopend, volgens Sandra en haar leerkracht nog bruikbaar (13/10)
    { day:17, item:"gelpromo25",    stock:null },   // gellak opmaken (2e keer)
    { day:18, item:"peelanti",      stock:null },
    { day:19, item:"eraser",        stock:null },
    { day:20, item:"handspa",       stock:null },   // extra hand peeling: uses up the MellowMoist lotion (Sandra, 09/10)
    { day:21, item:"collagen",      stock:null },
    { day:22, item:"spapedi",       stock:null },
    { day:23, item:"luminoclear",   stock:null },
    { day:24, item:"goldmask",      stock:null },
    { day:25, item:"paraffinmask",  stock:null }   // gratis anti-aging paraffinemasker (Sandra, 09/10)
  ],
  // 2027: [ { day:1, item:"facial10", stock:null }, … ]   ← keep or change doors; missing days = massage discount
  }
};
// Which calendar year is "on"? From March: this year's; in January/February
// still last year's (its vouchers run until February). Then fill the doors.
(function setupAdventYear(){
  let d = new Date();
  try {
    const q = new URLSearchParams(location.search), dt = q.get("datum");
    if (previewMatch(q.get("voorproef")) && dt && /^\d{4}-\d{2}-\d{2}$/.test(dt)) d = new Date(dt + "T12:00:00");
  } catch(e){ /* ignore */ }
  const y = d.getMonth() + 1 >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  ADVENT.year = y;
  ADVENT.liveFrom = `${y}-${ADVENT.liveFromMD}`;
  ADVENT.teaserFrom = `${y}-${ADVENT.teaserFromMD}`;
  const plan = (ADVENT.doorsByYear && ADVENT.doorsByYear[y]) || [];
  const list = ADVENT.autoFill.massages, v = ADVENT.autoFill.value;
  let k = 0;
  ADVENT.doors = [];
  for (let day = 1; day <= 25; day++){
    const own = plan.find(x => x && Number(x.day) === day && ADVENT.items[x.item]);
    if (own){ ADVENT.doors.push(own); continue; }
    const m = list[k++ % list.length], id = "auto_" + m.id;
    if (!ADVENT.items[id]) ADVENT.items[id] = { type:"discount", icon:"💆", value:v, auto:true,
      nl:`${v} korting op een ${m.nl}`, en:`${v} off a ${m.en}`, fr:`${v.replace("%", " %")} de réduction sur un ${m.fr}`,
      treat:{ nl:m.nl, en:m.en, fr:m.fr }, noMin:true };
    ADVENT.doors.push({ day, item:id, stock:null });
  }
  // discounts grow towards Christmas and never exceed 15% (Sandra, 18/10):
  // days 1–8: 5%, 9–16: 10%, 17–25: 15%. Each discount door gets its own copy of the item.
  const steps = ADVENT.discountByDay || [];
  ADVENT.doors = ADVENT.doors.map(dr => {
    const it = ADVENT.items[dr.item];
    const st = steps.find(s => dr.day <= s.to);
    if (!it || it.type !== "discount" || !st || it.value === st.v) return dr;
    const id = dr.item + "@" + st.v.replace("%", "");
    if (!ADVENT.items[id]){
      const rep = (s, fr) => typeof s === "string" ? s.replace(/\d{1,2}\s?%/g, fr ? st.v.replace("%", " %") : st.v) : s;
      ADVENT.items[id] = { ...it, value: st.v, nl: rep(it.nl), en: rep(it.en), fr: rep(it.fr, true) };
    }
    return { ...dr, item:id };
  });
})();

/* There is NO automatic data reset any more (since v154): clients' stamps,
   appointments and favourites always stay on their phone. */

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
/* SCENT (v163): after a match the client picks the scent of the drop of
   essential oil in the steam/compress (facial, back) or the massage oil.
   Lavender is Sandra's usual scent and is always offered first; the app adds
   up to 3 others that suit the time of year (months) and the treatment
   (boost). groups: face / massage / feet (= AVOID_GROUPS). Tea tree only for
   the feet. notPregnant / notKids / allergy hide an oil when that applies.
   A fragrance allergy = no scent. The choice goes into the WhatsApp/e-mail
   message and the copied name for the online booking. */
const SCENT_OPTIONS = [
  { id:"lavender", product:"eolavender", icon:"💜", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["face","massage","feet"], isDefault:true,
    label:{ nl:"Lavendel", en:"Lavender", fr:"Lavande" },
    text:{ nl:"rustgevend en zacht", en:"calming and soft", fr:"apaisante et douce" } },
  { id:"eucalyptus", product:"eoeucalyptus", icon:"🌿", months:[10,11,12,1,2,3], groups:["face","massage"], boost:{ detoxback:2, swedishbackneck:1, cupping:1, harmonizingback:1 }, notKids:true, notEpilepsy:true,
    label:{ nl:"Eucalyptus", en:"Eucalyptus", fr:"Eucalyptus" },
    text:{ nl:"fris en vrij ademen, fijn in het verkoudheidsseizoen", en:"fresh, easy breathing, lovely in cold season", fr:"frais, respiration libre, idéal en saison des rhumes" } },
  { id:"pine", product:"eopine", icon:"🌲", months:[11,12,1,2], groups:["massage"], boost:{ swedishbackneck:1, backwrap:1, detoxback:1 },
    label:{ nl:"Grove den", en:"Scots pine", fr:"Pin sylvestre" },
    text:{ nl:"een winterse boswandeling", en:"a winter walk in the woods", fr:"une balade en forêt l’hiver" } },
  { id:"blackpepper", product:"eoblackpepper", icon:"🔥", months:[10,11,12,1,2,3], groups:["massage"], boost:{ cupping:3, swedishbackneck:2, harmonizingback:1, hotstone:1 },
    label:{ nl:"Zwarte peper", en:"Black pepper", fr:"Poivre noir" },
    text:{ nl:"verwarmend, voor stijve spieren", en:"warming, for stiff muscles", fr:"réchauffant, pour les muscles raides" } },
  { id:"cedar", product:"eocedar", icon:"🪵", months:[10,11,12,1,2,3], groups:["massage"], boost:{ detoxback:2, hotstone:1 },
    label:{ nl:"Atlasceder", en:"Atlas cedarwood", fr:"Cèdre de l’Atlas" },
    text:{ nl:"houtig, aardend en rustig", en:"woody, grounding and calm", fr:"boisé, apaisant et ancrant" } },
  { id:"bergamot", product:"eobergamot", icon:"🍊", months:[11,12,1,2], groups:["massage"], boost:{ swedish:1, harmonizingbody:1 },
    label:{ nl:"Bergamot", en:"Bergamot", fr:"Bergamote" },
    text:{ nl:"een zonnig, opgewekt geurtje in de donkere maanden", en:"a sunny, uplifting scent in the dark months", fr:"un parfum ensoleillé pendant les mois sombres" } },
  { id:"staranise", product:"eostaranise", icon:"⭐", months:[11,12], groups:["massage"], boost:{ hotstone:2, swedish:1 }, notPregnant:true,
    label:{ nl:"Steranijs", en:"Star anise", fr:"Badiane" },
    text:{ nl:"warm en kruidig, een kerstgevoel", en:"warm and spicy, a Christmas feeling", fr:"chaude et épicée, un air de Noël" } },
  { id:"patchouli", product:"eopatchouli", icon:"🍂", months:[9,10,11], groups:["massage"], boost:{ hotstone:1, backwrap:1 },
    label:{ nl:"Patchoeli", en:"Patchouli", fr:"Patchouli" },
    text:{ nl:"aards en warm, echt herfst", en:"earthy and warm, pure autumn", fr:"terreux et chaud, l’automne" } },
  { id:"grapefruit", product:"eograpefruit", icon:"🍋", months:[1,2,3,4], groups:["massage"], boost:{ slimmassage:3, cuppingpeeling:1 },
    label:{ nl:"Grapefruit", en:"Grapefruit", fr:"Pamplemousse" },
    text:{ nl:"fris en opwekkend", en:"fresh and invigorating", fr:"frais et tonifiant" } },
  { id:"peppermint", product:"eopeppermint", icon:"🌱", months:[5,6,7,8,9], groups:["massage","feet"], boost:{ swedishlegs:3, pedicure:1, pedicureexpress:1, manipedispa:1 }, notPregnant:true, notKids:true, notEpilepsy:true,
    label:{ nl:"Pepermunt", en:"Peppermint", fr:"Menthe poivrée" },
    text:{ nl:"verkoelend voor warme, zware benen en voeten", en:"cooling for warm, heavy legs and feet", fr:"rafraîchissante pour jambes et pieds lourds" } },
  { id:"lemongrass", product:"eolemongrass", icon:"🍃", months:[5,6,7,8,9], groups:["massage","feet"], boost:{ swedishlegs:1, pedicure:1 }, notPregnant:true,
    label:{ nl:"Citroengras", en:"Lemongrass", fr:"Lemongrass" },
    text:{ nl:"zomers fris en opwekkend", en:"summery fresh and uplifting", fr:"frais et estival" } },
  { id:"chamomile", product:"eochamomile", icon:"🌼", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["face","massage"], boost:{ signaturefacial:2, expressfacial:1 }, allergy:"asteraceae",
    label:{ nl:"Echte kamille", en:"German chamomile", fr:"Camomille" },
    text:{ nl:"zacht en kalmerend, ook voor een gevoelige huid", en:"soft and soothing, also for sensitive skin", fr:"douce et apaisante, aussi pour peau sensible" } },
  { id:"rose", product:"eorose", icon:"🌹", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["face","massage"], boost:{ antiagefacial:2, signaturefacial:1, liftsummere:1 },
    label:{ nl:"Damascusroos", en:"Damask rose", fr:"Rose de Damas" },
    text:{ nl:"bloemig en verwennend", en:"floral and pampering", fr:"florale et cocooning" } },
  { id:"palmarosa", product:"eopalmarosa", icon:"🌸", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["face","feet"], boost:{ hydrapeel:1, fruitacid:1, expressuseup:1 },
    label:{ nl:"Palmarosa", en:"Palmarosa", fr:"Palmarosa" },
    text:{ nl:"zacht bloemig, in balans voor de huid", en:"softly floral, balancing for the skin", fr:"florale et équilibrante pour la peau" } },
  { id:"ylang", product:"eoylang", icon:"🌺", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["massage"], boost:{ swedish:1, hotstone:1, harmonizingbody:1 },
    label:{ nl:"Ylang-ylang", en:"Ylang-ylang", fr:"Ylang-ylang" },
    text:{ nl:"exotisch, diep ontspannend", en:"exotic, deeply relaxing", fr:"exotique, profondément relaxant" } },
  { id:"rosemary", product:"eorosemary", icon:"🌱", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["face","massage"], boost:{}, notPregnant:true, notKids:true, notEpilepsy:true,
    label:{ nl:"Rozemarijn", en:"Rosemary", fr:"Romarin" },
    text:{ nl:"kruidig en helder, fijn voor het herstel van de huid", en:"herbal and clear, lovely for skin recovery", fr:"herbacé et clair, agréable pour la récupération de la peau" } },
  { id:"mandarin", product:"eomandarin", icon:"🍊", months:[11,12,1,2], groups:["massage"], boost:{ hotstone:1, swedish:1 }, notPregnant:true, pregLateOk:true,
    label:{ nl:"Mandarijn", en:"Mandarin", fr:"Mandarine" },
    text:{ nl:"zoet en vrolijk, een gezellig wintergeurtje", en:"sweet and cheerful, a cosy winter scent", fr:"douce et joyeuse, un parfum d’hiver chaleureux" } },
  { id:"teatree", product:"teatree", icon:"🌿", months:[1,2,3,4,5,6,7,8,9,10,11,12], groups:["feet"], boost:{ pedicure:2, pedicureexpress:2 },
    label:{ nl:"Tea tree", en:"Tea tree", fr:"Tea tree" },
    text:{ nl:"fris en zuiverend voor de voeten", en:"fresh and purifying for the feet", fr:"frais et purifiant pour les pieds" } },
];

/* SCENT_NEEDS (v170): "ergens last van?" → the right essential oil is
   recommended (and pre-selected) in the scent box. Filled in automatically
   from the match (relax/stress wish, legs wish, free-text complaint words);
   the client can tick or untick needs in the scent box. oils = SCENT_OPTIONS
   ids in order of preference; a recommended oil is shown even outside its
   season, but the safety rules (pregnancy, epilepsy, allergy, kids, body
   area) still apply. Sandra's list (Oct 2026): lavender = stress, blood
   circulation, arthritis; lemongrass = nerve pain, headache, wounds;
   rosemary = healing (not pregnant/epilepsy); mandarin = not in the first
   6 months of pregnancy; mint = flu (not pregnant); chamomile = relaxation,
   breathing, burns. */
const SCENT_NEEDS = [
  { id:"stress", icon:"😮‍💨", oils:["lavender","chamomile"], words:["stress","gestrest","spanning","gespannen","onrust","onrustig","nerveus","piekeren","slapen","slaap","slapeloos","ontspannen","ontspanning","relax","relaxen","tension","anxious","sleep","relaxation","stressé","stressée","détente","sommeil","angoisse"],
    label:{ nl:"Stress of ontspanning", en:"Stress or relaxation", fr:"Stress ou détente" } },
  { id:"headache", icon:"🤕", oils:["lemongrass"], words:["hoofdpijn","migraine","headache","céphalée"],
    label:{ nl:"Hoofdpijn", en:"Headache", fr:"Maux de tête" } },
  { id:"nervepain", icon:"⚡", oils:["lemongrass"], words:["zenuwpijn","zenuw","zenuwen","ischias","hernia","nerve","sciatica","névralgie","nerf","sciatique"],
    label:{ nl:"Zenuwpijn", en:"Nerve pain", fr:"Douleur nerveuse" } },
  { id:"joints", icon:"🦴", oils:["lavender"], words:["artritis","artrose","reuma","gewricht","gewrichten","gewrichtspijn","arthritis","joint","joints","arthrite","arthrose","rhumatisme","articulation"],
    label:{ nl:"Gewrichtspijn of artritis", en:"Joint pain or arthritis", fr:"Douleurs articulaires ou arthrite" } },
  { id:"circulation", icon:"🩸", oils:["lavender"], words:["bloedsomloop","doorbloeding","circulatie","koude handen","koude voeten","zware benen","circulation","cold hands","cold feet","heavy legs","jambes lourdes","mains froides","pieds froids"],
    label:{ nl:"Bloedcirculatie (koude handen of voeten, zware benen)", en:"Blood circulation (cold hands or feet, heavy legs)", fr:"Circulation (mains ou pieds froids, jambes lourdes)" } },
  { id:"flu", icon:"🤧", oils:["peppermint","eucalyptus"], words:["griep","verkouden","verkoudheid","snotneus","neus verstopt","flu","a cold","blocked nose","grippe","rhume","nez bouché"],
    label:{ nl:"Lichte of beginnende griep of verkoudheid (zonder koorts)", en:"Mild or starting flu or cold (no fever)", fr:"Grippe ou rhume léger ou débutant (sans fièvre)" } },
  { id:"breathing", icon:"🌬️", oils:["chamomile"], words:["ademhaling","ademen","benauwd","kortademig","breathing","breathe","short of breath","respiration","respirer","essoufflé"],
    label:{ nl:"Ademhaling", en:"Breathing", fr:"Respiration" } },
  { id:"healing", icon:"🩹", oils:["rosemary","lemongrass"], words:["wonde","wondje","wondjes","wonden","genezing","genezen","litteken","herstel","wound","healing","scar","plaie","cicatrice","cicatrisation"],
    label:{ nl:"Huidherstel, wondjes", en:"Skin recovery, small wounds", fr:"Réparation de la peau, petites plaies" } },
  { id:"burn", icon:"🔥", oils:["chamomile"], words:["brandwonde","brandwond","verbrand","zonnebrand","verbrande","burn","sunburn","burnt","brûlure","coup de soleil"],
    label:{ nl:"Verbrande of geïrriteerde huid (ook door de zon)", en:"Burnt or irritated skin (also from the sun)", fr:"Peau brûlée ou irritée (aussi par le soleil)" } },
];

/* APPT_PREP (v178): "denk eraan" tips shown with every upcoming appointment the
   client saved in the app (per category of AVOID_GROUPS). Sandra's own points:
   facials = lenses out + bring the case, beard: shave the day before, not the
   same day; lash lift / tinting = lenses out + bring glasses for the way home.
   Edit freely: one line = one tip. */
const APPT_PREP = {
  face: [
    { nl:"Draag je contactlenzen? Doe ze uit voor de verzorging en neem je lenzendoosje (en eventueel je bril) mee.", en:"Do you wear contact lenses? Take them out for the facial and bring your lens case (and glasses if needed).", fr:"Vous portez des lentilles ? Retirez-les pour le soin et apportez votre étui (et vos lunettes si besoin)." },
    { nl:"Heb je een baard of snor en wil je die scheren? Doe dat de dag ervoor, niet op de dag zelf: zo is je huid niet geïrriteerd.", en:"Have a beard or moustache you want to shave? Do it the day before, not on the day itself, so your skin isn’t irritated.", fr:"Vous voulez raser votre barbe ou moustache ? Faites-le la veille, pas le jour même : votre peau ne sera pas irritée." },
    { nl:"Kom gerust zonder make-up, dan kunnen we meteen beginnen.", en:"Feel free to come without make-up, so we can start right away.", fr:"Venez de préférence sans maquillage, nous pourrons commencer tout de suite." }
  ],
  browlash: [
    { nl:"Draag je contactlenzen? Doe ze uit vóór de behandeling en neem je bril mee om veilig thuis te geraken.", en:"Do you wear contact lenses? Take them out before the treatment and bring your glasses to get home safely.", fr:"Vous portez des lentilles ? Retirez-les avant le soin et apportez vos lunettes pour rentrer en toute sécurité." },
    { nl:"Kom zonder mascara en oogmake-up.", en:"Come without mascara and eye make-up.", fr:"Venez sans mascara ni maquillage des yeux." }
  ],
  makeup: [
    { nl:"Kom met een gereinigde huid zonder make-up. Draag je lenzen? Doe ze vooraf in.", en:"Come with clean skin and no make-up. Wear lenses? Put them in beforehand.", fr:"Venez la peau propre, sans maquillage. Des lentilles ? Mettez-les avant." },
    { nl:"Valse wimpers? Breng je eigen wimpers en wimperlijm mee.", en:"False lashes? Bring your own lashes and lash glue.", fr:"Faux cils ? Apportez vos cils et votre colle." }
  ],
  waxing: [
    { nl:"Laat het haar minstens een halve centimeter groeien en smeer de dag zelf geen bodylotion of olie op die plek.", en:"Let the hair grow at least half a centimetre and don’t apply body lotion or oil there on the day.", fr:"Laissez pousser les poils d’au moins un demi-centimètre et n’appliquez pas de lotion ni d’huile le jour même." }
  ],
  feet: [
    { nl:"Kom met sokken aan. Kies je nagellak of gellak? Neem dan teenslippers mee, zodat de lak mooi blijft.", en:"Come wearing socks. Choosing nail polish or gel polish? Bring flip-flops so the polish stays perfect.", fr:"Venez avec des chaussettes. Vous choisissez du vernis ou du vernis gel ? Apportez des tongs pour que le vernis reste impeccable." }
  ],
  all: [
    { nl:"De behandelruimte is op de 1e verdieping: je gaat een trap op. Bij de inkom doe je je schoenen uit, dus doe liefst sokken aan. Stap je liever niet zonder schoenen? Breng dan pantoffels of binnenschoenen mee.", en:"The treatment room is on the 1st floor: you go up a flight of stairs. You take your shoes off at the entrance, so please wear socks. Prefer not to walk without shoes? Bring slippers or indoor shoes.", fr:"La cabine se trouve au 1er étage : il faut monter un escalier. On retire ses chaussures à l’entrée, mettez donc de préférence des chaussettes. Vous préférez ne pas marcher sans chaussures ? Apportez des pantoufles ou des chaussures d’intérieur." }
  ],
  hands: [
    { nl:"Heb je nog gellak van ergens anders? Zeg het bij het boeken, dan plan ik tijd om het te verwijderen.", en:"Still wearing gel polish from elsewhere? Mention it when booking, so I plan time to remove it.", fr:"Encore du vernis gel d’ailleurs ? Signalez-le à la réservation, je prévois le temps pour le retirer." }
  ],
  massage: [
    { nl:"Eet licht in het uur vóór je massage, en drink erna voldoende water.", en:"Eat lightly in the hour before your massage, and drink plenty of water afterwards.", fr:"Mangez léger dans l’heure qui précède le massage et buvez bien de l’eau après." }
  ]
};
/* free text in the appointment ("lash lift", "kleuren"…) → category */
const APPT_PREP_WORDS = { browlash:["lash","wimper","wenkbrauw","brow","henna","tint","kleur","cils","sourcil"], face:["gelaat","facial","soin du visage","peeling","fill me","lift summum","anti-age"], makeup:["make-up","makeup","visagie","bruid","bridal","maquillage"], waxing:["ontharen","wax","harsen","épilation"], feet:["pedicure","pédicure","voet"], hands:["manicure","manucure","nagel","gellak"], massage:["massage","cupping","hot stone"] };

/* Is a (non-yearly) action on today? soldOut, from and until are checked.
   Used by the banner, the price list and the match, so one switch stops all. */
function actionIsOn(id, today){
  const a = (typeof CURRENT_ACTIONS !== "undefined" ? CURRENT_ACTIONS : []).find(x => x.id === id);
  if (!a) return false;
  if (a.soldOut) return false;
  if (!today){ const d = new Date(); today = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
  return (!a.from || today >= a.from) && (!a.until || today <= a.until);
}
/* PRICE_LINKS (v196): which price-list line sets the price of which treatment
   in the match result. When Sandra changes a price in the app (Prijslijst →
   Beheren), the linked treatment follows. Treatments with several prices
   (Extended Manicure/Pedicure with SPA, Beenontharing, koffieproeverijen) are
   not linked: their text stays as written in TREATMENTS_CATALOG. */
const PRICE_LINKS = {
  hotstone:"Hot Stone Massage", cupping:"Cuppingmassage", cuppingpeeling:"Cupping Body Renewal",
  swedish:"Zweedse full body massage", swedishbackneck:"Zweedse rug-nek-schouder massage", swedishlegs:"Zweedse benen-voeten massage",
  backwrap:"Energetische rugpakking", browlift:"Brow Lift", hennabrows:"Henna Brows", lashlift:"Lash Lift met kleuring",
  glammakeup:"Avondmake-up / Party / Glam", hydrapeel:"Huidvernieuwende Hydra Peeling pH", signaturefacial:"Signature gelaatsverzorging",
  fillme:"Fill Me Micro Infusie Treatment", fruitacid:"Fruitzurenpeeling 4/26 Dr. Renaud", liftsummere:"Lift Summum",
  detoxback:"Zuiverende rugbehandeling", antiagefacial:"Botanische Anti-Age", harmonizingbody:"Harmoniserende verzorging full body",
  fullbodywrap:"Energetische lichaamspakking full body", makeupworkshop:"Beauty & Skincare Workshop", facialworkshop:"Beauty & Skincare Workshop",
  baristaworkshop:"Barista Privéworkshop", manicure:"Uitgebreide manicure", pedicureexpress:"Express pedicure", pedicure:"Uitgebreide pedicure",
  slimmassage:"Afslankingsmassage", oksel:"Oksels", rug:"Rug", buik:"Buik", borst:"Borst",
  expressuseup:"Express gelaatsverzorging – opgebruikactie", expressfacial:"Express gelaatsverzorging",
  bridaltrial:"Bridal proefmake-up", bridalpackage:"Bridal proefmake-up & bruidsmake-up", weddingguest:"Huwelijksdag make-up, per persoon",
  browtint:"Brow Tinting (kleuren haar)", browshaping:"Shaping (mappen en ontharen)", lashtint:"Lash Tinting (kleuren wimpers)",
  manicureexpress:"Express manicure", kin:"Kin", bovenlip:"Bovenlip", wenkbrauwontharing:"Wenkbrauwen (zonder mapping / opschonen)",
  schouders:"Schouders", borstbuik:"Borst & buik", volledigebenen:"Volledige benen", harmonizingback:"Harmoniserende verzorging rug",
  teambeauty:"Teambuilding Beauty & Pamper Experience", teamcoffee:"Teambuilding Specialty Coffee Experience",
  cateye:"Cat Eye & Magnetische Gellak Manicure Workshop"
};

const PRICE_LIST = [
  { id:"facial", icon:"🌿", title:{ nl:"Gelaatsverzorging", en:"Facials" }, items:[
    PI("Express gelaatsverzorging","Express facial","30′","€60","Reiniging, dieptereiniging, crèmemasker & dagcrème.","Cleansing, deep cleansing, cream mask & day cream."),
    PI("Express gelaatsverzorging – opgebruikactie","Express facial – special offer","30′","€50","Zoals de Express, met producten van Bio Balance, Guinot, Dr. Renaud of Safety4You. Zolang de voorraad strekt.","Like the Express, with Bio Balance, Guinot, Dr. Renaud or Safety4You products. While stocks last."),
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
    PI("Uitgebreide pedicure","Full pedicure","60′","€35","Knippen, vijlen, nagelwalreiniging, nagelriemen, normale eeltverwijdering & korte voetenmassage.","Trimming, filing, nail-fold cleaning, cuticles, standard hard-skin removal & short foot massage.","+ €10 per extra 15′ bij overmatige eeltbehandeling. Zodra ik afgestudeerd ben als gespecialiseerd voetverzorger, wordt de uitgebreide pedicure €50.","+ €10 per extra 15′ for heavy hard-skin treatment. Once I graduate as a specialised foot care practitioner, the full pedicure will be €50."),
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
       "Leer zelf een prachtig magnetisch ‘Cat Eye’-effect op je nagels maken. Inclusief alle professionele lakken, magneten en UV/LED-lampen, plus specialty coffee/thee en huisgemaakte zoetigheden. Kies uit 9 magnetische kleuren: de Pink Gellac Galactic Gemstones (Sunstone Gold, Majestic Amethyst, Starlit Silver, Ethereal Topaz, Divine Quartz — HEMA-vrij) en de Cobra Galaxy-reeks (Apollo, Galileo, Comet, Cupid).",
       "Learn to create a beautiful magnetic ‘cat eye’ effect on your nails. Includes all professional polishes, magnets and UV/LED lamps, plus specialty coffee/tea and homemade sweets. Choose from 9 magnetic shades: Pink Gellac Galactic Gemstones (Sunstone Gold, Majestic Amethyst, Starlit Silver, Ethereal Topaz, Divine Quartz — HEMA-free) and the Cobra Galaxy range (Apollo, Galileo, Comet, Cupid).",
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
      R("Bij wanbetaling is het niet meer mogelijk om een afspraak te maken bij Beauty & Coffee.","In case of non-payment it is no longer possible to make an appointment at Beauty & Coffee."),
      R("De behandelruimte is op de 1e verdieping (trap op). Bij de inkom doe je je schoenen uit: doe liefst sokken aan of breng pantoffels of binnenschoenen mee.","The treatment room is on the 1st floor (up a flight of stairs). You take your shoes off at the entrance: please wear socks or bring slippers or indoor shoes.")
    ]}] },
  { id:"parking", icon:"🚗", title:R("Bereikbaarheid en parkeren","Getting here and parking"), intro:null, outro:null,
    groups:[{ title:null, items:[
      R("Kom je met de auto? Parkeer op de Jubellaan of op de parkeerplaatsen vooraan in de Barbarastraat, nog vóór je indraait naar de woonhuizen.","Coming by car? Park on the Jubellaan or in the parking spaces at the front of the Barbarastraat, before you turn in toward the houses."),
      R("Rij niet door tot aan de woonhuizen: in dat doodlopende stukje is geen parkeerplaats voor bezoekers.","Please don't drive on to the houses: there is no visitor parking in that dead-end stretch."),
      R("Vanaf de parkeerstrook in de Barbarastraat is het maar 2 minuten stappen tot bij mij; vanaf de Jubellaan ongeveer 5 minuten.","From the parking strip in the Barbarastraat it's only a 2-minute walk to my place; from the Jubellaan about 5 minutes."),
      R("Kom je met de fiets of bakfiets? Die mag je vastzetten bij de fietsen.","Coming by bike or cargo bike? You can lock it up with the bikes."),
      R("Route nodig? Tik op het kaartje hieronder: Google Maps opent met de route naar mij.","Need directions? Tap the map below: Google Maps opens with directions to me.")
    ]}] },
  { id:"promise", icon:"✨", title:R("Mijn hygiëne-belofte","My hygiene promise"),
    intro:R("Jouw gezondheid en comfort komen eerst. Zo werk ik:","Your health and comfort come first. This is how I work:"), outro:null,
    groups:[{ title:null, items:[
      R("Ik ontsmet mijn handen bij de start van elke behandeling. Werktafels en schalen worden grondig ontsmet.","I disinfect my hands at the start of every treatment. Work tables and bowls are thoroughly disinfected."),
      R("Instrumenten die ik gebruik, worden vooraf én achteraf ontsmet.","The instruments I use are disinfected before and after use."),
      R("Na elke klant doorlopen mijn instrumenten een vaste volgorde: reinigen, een ultrasoon bad, een alcoholbad van minstens 10 minuten en tot slot de kogelsterilisator.","After every client my instruments go through a fixed routine: cleaning, an ultrasonic bath, an alcohol bath of at least 10 minutes and finally the glass bead steriliser."),
      R("Voor elke klant gebruik ik nieuw, proper (geplastificeerd) papier of dental towels.","For every client I use new, clean (plastic-coated) paper or dental towels."),
      R("Wegwerpmateriaal gooi ik meteen na gebruik weg. Vijlen en buffers zijn persoonlijk: ik gebruik ze alleen voor jou.","Disposable materials are thrown away right after use. Files and buffers are personal: I only use them for you."),
      R("Handdoeken, herbruikbare watjes en haarbanden worden altijd op kookwas (90 °C) gewassen.","Towels, reusable cotton pads and headbands are always washed on a hot boil wash (90 °C)."),
      R("Bij harsen met een houten spatel gaat elke kant maar één keer in de pot; daarna neem ik een nieuwe spatel. Voor de benen gebruik ik een metalen spatel, die ik na elke klant grondig reinig en ontsmet.","When waxing with a wooden spatula, each side goes into the pot only once; then I take a new spatula. For legs I use a metal spatula, which I thoroughly clean and disinfect after every client."),
      R("Al mijn producten zijn goed gesloten en binnen hun houdbaarheid, en op potten en tubes noteer ik de datum van opening.","All my products are properly closed and within their shelf life, and I note the opening date on jars and tubes.")
    ]}] },
  { id:"hygiene", icon:"🧼", title:R("Hygiëne en verzorging","Hygiene and care"),
    intro:R("Zo genieten we samen van een verzorgd en ontspannen moment:","This way we both enjoy a well-cared-for, relaxed moment:"), outro:null,
    groups:[
      { title:R("Handen","Hands"), items:[
        R("Kom met frisgewassen handen, dan kunnen we meteen beginnen.","Come with freshly washed hands, then we can start right away."),
        R("Liefst geen crème of olie vlak voor de manicure: zo hecht de lak mooier.","Preferably no cream or oil just before the manicure: the polish then adheres more beautifully."),
        R("Heb je een ontsteking of een open wondje? Laat het me gerust vooraf weten. Soms is het beter om de afspraak even te verplaatsen, zodat het rustig kan genezen.","Do you have an inflammation or an open wound? Just let me know beforehand. Sometimes it’s better to move the appointment so it can heal in peace.")
      ]},
      { title:R("Voeten (bij voetverzorging)","Feet (for foot care)"), items:[
        R("Kom bij voorkeur met frisgewassen voeten, dan kunnen we meteen genieten.","Preferably come with freshly washed feet, then we can enjoy straight away."),
        R("Tip: een frisse voetspray na het douchen doet wonderen.","Tip: a refreshing foot spray after showering works wonders."),
        R("Draag gerust makkelijke schoenen, zodat je voeten na de verzorging kunnen ademen.","Feel free to wear comfortable shoes, so your feet can breathe after the treatment."),
        R("Neem teenslippers mee als je nagellak of gellak wilt bij de pedicure.","Bring flip-flops if you would like nail polish or gel polish with your pedicure."),
        R("Heb je een ontsteking of een open wondje? Laat het me gerust vooraf weten. Soms is het beter om de afspraak even te verplaatsen, zodat het rustig kan genezen.","Do you have an inflammation or an open wound? Just let me know beforehand. Sometimes it’s better to move the appointment so it can heal in peace."),
        R("Heb je een aandoening aan je voeten, zoals een schimmelinfectie? Meld het vooraf, dan stem ik de verzorging en mijn hygiënemaatregelen erop af.","Do you have a foot condition, such as a fungal infection? Mention it beforehand, then I’ll adapt the treatment and my hygiene measures.")
      ]},
      { title:R("Lichaamsbehandelingen (ontharing en massage)","Body treatments (hair removal and massage)"), items:[
        R("Kom fris gewassen naar je behandeling, dan voel je je meteen op je gemak.","Come freshly washed to your treatment, so you feel at ease right away."),
        R("Een warme douche vooraf maakt de huid soepel, ideaal voor ontharing of massage.","A warm shower beforehand makes the skin supple, ideal for hair removal or massage."),
        R("Om iedereen een verzorgde behandeling te garanderen, kan ik bij onvoldoende hygiëne de behandeling helaas niet uitvoeren. De afspraak telt dan als annulering.","To guarantee everyone a well-cared-for treatment, I unfortunately cannot carry out a treatment when hygiene is insufficient. The appointment then counts as a cancellation."),
        R("Draag losse, comfortabele kledij voor de lichaamsontharing.","Wear loose, comfortable clothing for body hair removal."),
        R("Heb je een ontsteking of een open wondje? Laat het me gerust vooraf weten voor de lichaamsmassage.","Do you have an inflammation or an open wound? Just let me know before the body massage.")
      ]},
      { title:R("Een rustige, frisse ruimte","A calm, fresh space"), items:[
        R("Liefst niet roken vlak voor je behandeling: zo blijft de ruimte fris voor iedereen.","Preferably don’t smoke just before your treatment: that keeps the room fresh for everyone."),
        R("Een sterke tabaks- of cannabisgeur is storend bij een behandeling van dichtbij. In dat geval kan ik de behandeling helaas niet uitvoeren.","A strong smell of tobacco or cannabis is disturbing during a close-up treatment. In that case I unfortunately cannot carry out the treatment."),
        R("Laat parfum en sterk geparfumeerde crèmes die dag liever thuis: zo geniet je volop van de geuren van de verzorging zelf.","Leave perfume and strongly scented creams at home that day: then you can fully enjoy the scents of the treatment itself."),
        R("Gevoelige neus of een allergie voor geurstoffen? Zeg het gerust, dan werk ik met parfumvrije producten.","Sensitive nose or an allergy to fragrances? Just tell me, then I’ll work with fragrance-free products.")
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
    expressuseup:["A","B","C","D"], expressfacial:["A","B","C","D"], bridaltrial:["A","B"], bridalpackage:["A","B"], weddingguest:["A","B"], browtint:["G"], browshaping:["G"], lashtint:["G"], manicureexpress:["F","H","C"], cateye:["F","H","C"], kin:["G"], bovenlip:["G"], wenkbrauwontharing:["G"], schouders:["G"], borstbuik:["G"], volledigebenen:["G"], harmonizingback:["A","D","E"], teambeauty:["A","B","C"],
    pedicure:["F","C"], pedicureexpress:["F","C"],
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
  { code:"PE7", theme:"PE", kop:"Frisse voeten", nl:"Voor frisse, comfortabele voeten helpen dagelijks schone (katoenen) kousen, schoenen meermaals per dag wisselen en lederen schoenen die de voet niet afsluiten. Minder koffie, alcohol en scherpe kruiden helpt ook.", en:"For fresh, comfortable feet, clean (cotton) socks every day, changing shoes several times a day, and leather shoes that let the foot breathe all help. Less coffee, alcohol and spicy food helps too.", kopEn:"Fresh feet" },
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
    expressuseup:["PI","DR"], expressfacial:["PI","DR"], bridaltrial:["AL"], bridalpackage:["AL"], weddingguest:["AL"], browtint:["AL"], browshaping:["AL"], lashtint:["AL"], kin:["AL"], bovenlip:["AL"], wenkbrauwontharing:["AL"], schouders:["AL"], borstbuik:["AL"], volledigebenen:["AL","PE"], harmonizingback:["ZW"], teambeauty:["AC","PI"],
    pedicure:["PE"], pedicureexpress:["PE"], manipedispa:["PE"],
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
  // HYG (hygiëne & microbiologie) and ERG (rug & houding): Syntra Leuven, GVV 'Elementaire voetverzorgingstechnieken' hfdst 4-7 (2026)
  { code:"HYG1", theme:"HYG", nl:"Hygiëne in de salon gaat in drie stappen, altijd in deze volgorde: reinigen, desinfecteren en steriliseren.", en:"Hygiene in the salon follows three steps, always in this order: cleaning, disinfecting and sterilising." },
  { code:"HYG2", theme:"HYG", nl:"Eerst reinigen is essentieel: zichtbaar vuil zoals huidschilfers of nagelresten hindert de werking van een desinfectiemiddel.", en:"Cleaning first is essential: visible dirt such as skin flakes or nail clippings stops a disinfectant from working properly." },
  { code:"HYG3", theme:"HYG", nl:"Desinfecteren doodt een groot deel van de micro-organismen. Steriliseren gaat verder: dan worden álle levende micro-organismen gedood of verwijderd.", en:"Disinfecting kills a large share of micro-organisms. Sterilising goes further: it kills or removes all living micro-organisms." },
  { code:"HYG4", theme:"HYG", nl:"Een desinfectiemiddel werkt pas goed met de juiste concentratie én inwerkingstijd. Even snel afvegen met alcohol is dus niet genoeg.", en:"A disinfectant only works properly at the right concentration and contact time. A quick wipe with alcohol is not enough." },
  { code:"HYG5", theme:"HYG", nl:"Besmetting is nog geen infectie. Bij een besmetting komen kiemen op je huid of op een voorwerp terecht; pas bij een infectie dringen ze binnen, vermenigvuldigen ze zich en word je ziek.", en:"Contamination is not yet infection. With contamination, germs land on your skin or on an object; only with infection do they get in, multiply and make you ill." },
  { code:"HYG6", theme:"HYG", nl:"Of een besmetting tot een infectie leidt, hangt af van vier dingen: het soort micro-organisme, hoeveel het er zijn, waar ze binnenkomen en hoe sterk je weerstand is.", en:"Whether contamination leads to infection depends on four things: the type of micro-organism, how many there are, where they get in and how strong your resistance is." },
  { code:"HYG7", theme:"HYG", nl:"Kiemen verspreiden zich direct, van huid op huid, of indirect, via handdoeken, vloeren of instrumenten. Daarom zijn verse handdoeken en propere instrumenten voor elke klant zo belangrijk.", en:"Germs spread directly, from skin to skin, or indirectly, via towels, floors or instruments. That's why fresh towels and clean instruments for every client matter so much." },
  { code:"HYG8", theme:"HYG", nl:"Je huid en slijmvliezen zijn de eerste barrière tegen micro-organismen. Een klein wondje is dus een opening: vertel het daarom gerust vóór je verzorging.", en:"Your skin and mucous membranes are the first barrier against micro-organisms. Even a small wound is an opening, so do mention it before your treatment." },
  { code:"HYG9", theme:"HYG", nl:"Een ontsteking herken je aan vijf klassieke tekens met Latijnse namen: rubor (roodheid), calor (warmte), tumor (zwelling), dolor (pijn) en functio laesa (minder goed werken).", en:"You recognise inflammation by five classic signs with Latin names: rubor (redness), calor (warmth), tumor (swelling), dolor (pain) and functio laesa (loss of function)." },
  { code:"HYG10", theme:"HYG", nl:"Handhygiëne heeft een vaste volgorde: handen wassen, goed afdrogen, ontsmetten en pas dan handschoenen aan. Na het uittrekken: eerst ontsmetten, dan wassen.", en:"Hand hygiene has a fixed order: wash, dry well, disinfect and only then put on gloves. After taking them off: disinfect first, then wash." },
  { code:"HYG11", theme:"HYG", nl:"Tijdens een voetverzorging draagt de verzorger geen ringen of armbanden en zijn de nagels kort: zo kunnen de handen goed gereinigd en ontsmet worden.", en:"During a foot treatment, the practitioner wears no rings or bracelets and keeps the nails short, so the hands can be cleaned and disinfected properly." },
  { code:"HYG12", theme:"HYG", nl:"De tetanusbacterie leeft in aarde en straatvuil en kan binnendringen via een wondje. Goede wondverzorging en een tijdige vaccinatie beschermen je, ook in de tuin.", en:"The tetanus bacterium lives in soil and street dirt and can enter through a wound. Good wound care and up-to-date vaccination protect you, in the garden too." },
  { code:"HYG13", theme:"HYG", nl:"Niet alle micro-organismen zijn schadelijk. Men onderscheidt apathogene (niet-ziekmakende) en pathogene (ziekmakende) kiemen; hoe ziekmakend ze zijn, heet pathogeniteit.", en:"Not all micro-organisms are harmful. A distinction is made between apathogenic (harmless) and pathogenic (disease-causing) germs; how disease-causing they are is called pathogenicity." },
  { code:"ERG1", theme:"ERG", nl:"Rugklachten ontstaan zelden door één verkeerde beweging. Meestal komen ze van langdurige, herhaalde belasting en te weinig beweging.", en:"Back complaints rarely come from one wrong movement. Usually they come from prolonged, repeated strain and too little movement." },
  { code:"ERG2", theme:"ERG", nl:"Til vanuit je benen, niet vanuit je rug, en hou de last dicht bij je lichaam.", en:"Lift with your legs, not your back, and keep the load close to your body." },
  { code:"ERG3", theme:"ERG", nl:"Lang in dezelfde houding zitten of staan? Beweeg minstens elk halfuur even en rek je regelmatig uit.", en:"Sitting or standing in the same position for a long time? Move at least every half hour and stretch regularly." },
  { code:"ERG4", theme:"ERG", nl:"Goed zitten: bekken achteraan op de zitting, rug tegen de leuning, voeten plat op de grond en knieën in een hoek van ongeveer 90°. Zo behoudt je wervelkolom zijn natuurlijke S-vorm.", en:"Sitting well: pelvis at the back of the seat, back against the backrest, feet flat on the floor and knees at about 90°. That keeps the natural S-shape of your spine." },
  { code:"ERG5", theme:"ERG", nl:"Vermijd schroefbewegingen, waarbij je tegelijk draait en buigt: die belasten je rug extra.", en:"Avoid twisting movements where you turn and bend at the same time: they put extra strain on your back." },
  { code:"ERG6", theme:"ERG", nl:"Aan je bureau: stel stoel en werkhoogte zo in dat je schouders niet optrekken en je nek niet voortdurend voorover buigt. Voldoende licht, liefst daglicht, helpt ook.", en:"At your desk: set your chair and working height so your shoulders don't hunch up and your neck isn't constantly bent forward. Enough light, preferably daylight, helps too." },
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
    harmonizingback:["MA","MT","MV","MR","WEC","ERG"], teambeauty:["WEC","WEG"], teamcoffee:["WEC"],
    hotstone:["WEW","MA","MT","MV","MR","ERG"],
    cupping:["MA","MT","MV","MR","ERG"], cuppingpeeling:["MA","MT","MV","MR","ERG"],
    swedish:["MA","MT","MV","MR","ERG"], swedishbackneck:["MA","MT","MV","MR","ERG"], swedishlegs:["MA","MT","MV","MR"],
    backwrap:["MA","MT","MV","MR","WEH","ERG"], detoxback:["MA","MT","MV","MR","WEH","ERG"],
    harmonizingbody:["MA","MT","MV","MR","WEC"], fullbodywrap:["MA","MT","MV","MR","WEC"],
    slimmassage:["MA","MT","MV","MR","WEH","ERG"],
    pedicure:["PEDX","HYG"], pedicureexpress:["PEDX","HYG"], manipedispa:["PEDX","MA","HYG"],
    manicure:["HYG"], manicureexpress:["HYG"], cateye:["WEC","WEG","HYG"],
    oksel:["HYG"], been:["HYG"], rug:["HYG"], buik:["HYG"], borst:["HYG"], kin:["HYG"], bovenlip:["HYG"], wenkbrauwontharing:["HYG"], schouders:["HYG"], borstbuik:["HYG"], volledigebenen:["HYG"],
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
    expressuseup:["GV", "SK", "HV"], expressfacial:["GV", "SK", "HV"], lashtint:["LL", "LT", "LS"], manicureexpress:["NA", "NB", "NC", "ND", "NE", "NF", "MC"], cateye:["NA", "NB", "NC", "ND", "NE", "NF", "MC"], harmonizingback:["GV", "SK", "MU"], teambeauty:["GV"],
    manicure:["NA", "NB", "NC", "ND", "NE", "NF", "MC"], manipedispa:["NA", "NB", "NC", "ND", "NE", "NF", "MC"],
    pedicure:["NA","NB","NC","ND","NE","NF"], pedicureexpress:["NA","NB","NC","ND","NE","NF"],
    lashlift:["LL", "LT", "BR", "LS"],
    hydrapeel:["GV", "SK", "HV"], signaturefacial:["GV", "SK", "HV"], fillme:["GV", "SK", "HV"],
    fruitacid:["GV", "SK", "HV"], liftsummere:["GV", "SK", "HV"], antiagefacial:["GV", "SK", "HV"],
    detoxback:["GV", "SK", "BS"], harmonizingbody:["GV", "SK", "BS", "MU"], fullbodywrap:["GV", "SK", "BS"],
    facialworkshop:["GV", "SK", "HV"], makeupworkshop:["GV"],
    hotstone:["GV", "HS", "MU"], swedish:["GV", "MU"], swedishbackneck:["GV", "MU"], swedishlegs:["GV", "MU"],
    backwrap:["GV", "BS"], slimmassage:["GV", "MU"], cupping:["GV", "MU"], cuppingpeeling:["GV", "BS", "MU"], browtint:["BR"], browlift:["BR"], hennabrows:["BR"], browshaping:["BR"], rug:["MN", "WX"], borst:["MN", "WX"], borstbuik:["MN", "WX"], schouders:["MN", "WX"], oksel:["WX"], been:["WX"], buik:["WX"], kin:["WX"], bovenlip:["WX"], wenkbrauwontharing:["WX"], volledigebenen:["WX"]
  }
};


/* ============================================================
   EXTRA FACTS (v126, 14/10/2026) from the Syntra courses:
   BR brow lamination/henna, MN herenverzorging, HV huidveroudering,
   HS hot stone. Client-facing, neutral. FR in lang-fr.js moreFacts.
   ============================================================ */
const EXTRA_FACTS = [
  { code:"LS1", theme:"LS", nl:"Een lash lift laat je wimpers langer lijken, niet voller. Wil je ook meer volume, dan doet een laagje mascara de rest.", en:"A lash lift makes your lashes look longer, not fuller. Want more volume too? A coat of mascara does the rest." },
  { code:"LS2", theme:"LS", nl:"Voor een lash lift moeten je wimpers minstens zo’n 4 millimeter lang zijn.", en:"For a lash lift your lashes need to be at least about 4 millimetres long." },
  { code:"LS3", theme:"LS", nl:"Een haar bestaat uit drie lagen: de kern (merg), de cortex met kleur en kracht, en de doorschijnende cuticula die alles beschermt.", en:"A hair has three layers: the core (medulla), the cortex with colour and strength, and the transparent cuticle that protects it all." },
  { code:"LS4", theme:"LS", nl:"Na een lash lift neemt je wimper de verf sneller op. Daarom werkt de tint dan korter in dan bij een gewone wimperverf.", en:"After a lash lift your lashes take up tint faster, so the tint is left on for a shorter time than usual." },
  { code:"WX1", theme:"WX", nl:"Om goed te kunnen waxen moeten de haartjes minstens zo’n halve centimeter lang zijn.", en:"For a good wax the hairs should be at least about half a centimetre long." },
  { code:"WX2", theme:"WX", nl:"Bij waxen wordt het haar met wortel en al verwijderd. Het groeit daardoor trager terug, en na verloop van tijd vaak ook fijner.", en:"Waxing removes the hair including the root, so it grows back more slowly and over time often finer." },
  { code:"WX3", theme:"WX", nl:"Warme hars mag nooit warmer zijn dan zo’n 40 °C. De temperatuur wordt altijd eerst getest op de binnenkant van de pols.", en:"Warm wax should never be hotter than about 40 °C. The temperature is always tested first on the inside of the wrist." },
  { code:"WX4", theme:"WX", nl:"Wat jeuk een paar weken na het waxen? Dat zijn de nieuwe haartjes die teruggroeien. Een zachte peeling helpt ze vlot door de huid.", en:"A little itch a few weeks after waxing? That’s the new hairs growing back. A gentle scrub helps them through the skin." },
  { code:"WX5", theme:"WX", nl:"Na het waxen van je oksels gun je je huid even rust: wacht een paar uur met deodorant.", en:"After an underarm wax, give your skin a break: wait a few hours before using deodorant." },
  { code:"WX6", theme:"WX", nl:"Donshaartjes (vellushaar) zijn zacht, kleurloos en zelden langer dan 1 centimeter.", en:"Vellus hairs are soft, colourless and rarely longer than 1 centimetre." },
  { code:"WX7", theme:"WX", nl:"Een hoofdhaar groeit ongeveer 0,3 mm per dag, en elke dag verlies je er gewoon 60 tot 100.", en:"A scalp hair grows about 0.3 mm a day, and losing 60 to 100 hairs a day is perfectly normal." },
  { code:"WX8", theme:"WX", nl:"Een klamme huid op een warme dag? Een vleugje talk zorgt dat de hars alleen de haartjes meeneemt.", en:"Clammy skin on a warm day? A touch of talc makes sure the wax only takes the hairs." },
  { code:"MC1", theme:"MC", nl:"Je hand telt 27 beenderen: 8 in de handwortel, 5 in de middenhand en 14 vingerkootjes.", en:"Your hand has 27 bones: 8 in the wrist, 5 in the palm and 14 finger bones." },
  { code:"MC2", theme:"MC", nl:"Bij een nagelvijl geldt: hoe lager het getal (grit), hoe grover. Voor natuurlijke nagels gebruik je een fijne vijl, rond 180, en om te polijsten 600 of meer.", en:"With a nail file: the lower the number (grit), the coarser. Natural nails get a fine file around 180, and 600 or more for buffing." },
  { code:"MC3", theme:"MC", nl:"Een klein wit vlekje op je nagel komt meestal van een stootje en groeit vanzelf weg.", en:"A small white spot on your nail usually comes from a little knock and grows out by itself." },
  { code:"MC4", theme:"MC", nl:"Fijne ribbeltjes in de lengte van je nagel zijn meestal onschuldig en komen vaker voor naarmate je ouder wordt.", en:"Fine lengthwise ridges on your nail are usually harmless and become more common with age." },
  { code:"MC5", theme:"MC", nl:"Tussen 5 en 30 jaar groeien je nagels het snelst. Daarna gaat het rustiger aan.", en:"Between 5 and 30 your nails grow fastest. After that they slow down." },
  { code:"MC6", theme:"MC", nl:"Je handen zijn je visitekaartje: vaak het eerste wat iemand van je ziet.", en:"Your hands are your business card: often the first thing people notice about you." },
  { code:"BS1", theme:"BS", nl:"Een lichaamsscrub met zeezout maakt je huid zacht en stralend, en zet de celvernieuwing en de doorbloeding in gang.", en:"A sea-salt body scrub makes your skin soft and radiant and boosts cell renewal and circulation." },
  { code:"BS2", theme:"BS", nl:"Na een scrub neemt je huid de volgende verzorging, zoals een pakking of olie, veel beter op.", en:"After a scrub your skin absorbs the next care, like a wrap or oil, much better." },
  { code:"BS3", theme:"BS", nl:"De beste momenten voor een lichaamsscrub: aan het einde van de winter, vóór de zomer en een paar dagen vóór het waxen.", en:"Best moments for a body scrub: at the end of winter, before summer and a few days before waxing." },
  { code:"BS4", theme:"BS", nl:"Bij een volledige scrub begint men aan de achterkant van het lichaam en pas daarna aan de voorkant.", en:"A full-body scrub starts on the back of the body and only then moves to the front." },
  { code:"MU1", theme:"MU", nl:"De kleermakersspier (sartorius) dankt haar naam aan de kleermakerszit: ze helpt je knie buigen en je dij naar buiten draaien.", en:"The tailor’s muscle (sartorius) is named after the cross-legged ‘tailor’s’ sitting position: it helps bend your knee and turn your thigh outward." },
  { code:"MU2", theme:"MU", nl:"Je kauwspier (masseter) zit vaak gespannen bij stress. Een zachte massage van de kaak kan dan heerlijk ontspannen.", en:"Your chewing muscle (masseter) often tenses up with stress. A gentle jaw massage can be wonderfully relaxing." },
  { code:"MU3", theme:"MU", nl:"Dankzij de lange halsspier (sternocleidomastoideus) kun je je hoofd draaien en knikken.", en:"Thanks to the long neck muscle (sternocleidomastoid) you can turn and nod your head." },
  { code:"BR1", theme:"BR", nl:"Een wenkbrauwhaar groeit actief ongeveer 1 tot 2 maanden. Daarna volgen een korte overgangsfase en een rustfase van 2 tot 4 maanden.", en:"A brow hair grows actively for about 1 to 2 months, followed by a short transition phase and a resting phase of 2 to 4 months." },
  { code:"BR2", theme:"BR", nl:"Op elk moment zit maar ongeveer 40% van je wenkbrauwharen in de groeifase. Daarom gun je je wenkbrauwen even rust tussen twee behandelingen.", en:"At any moment only about 40% of your brow hairs are in the growth phase. That is why your brows get a little rest between two treatments." },
  { code:"BR3", theme:"BR", nl:"Een brow lamination geeft een mooi ‘brushed-up’ effect dat ongeveer 4 tot 6 weken blijft.", en:"A brow lamination gives a lovely ‘brushed-up’ effect that lasts about 4 to 6 weeks." },
  { code:"BR4", theme:"BR", nl:"Een lamination werkt in twee stappen: eerst worden de bruggetjes in de keratine van het haar losgemaakt, daarna worden ze in de nieuwe vorm weer vastgezet.", en:"A lamination works in two steps: first the small bonds in the hair’s keratin are loosened, then they are set again in the new shape." },
  { code:"BR5", theme:"BR", nl:"Henna en brow lamination combineer je niet op dezelfde dag: het is het één of het ander. Klassieke verf na een lamination kan wel.", en:"Henna and brow lamination are not combined on the same day: it’s one or the other. Classic tint after a lamination is fine." },
  { code:"BR6", theme:"BR", nl:"Een eerste keer henna brows? Dan start je met een iets lichtere kleur of een kortere inwerktijd. Zo kan je rustig wennen aan je nieuwe look.", en:"First time henna brows? Then you start with a slightly lighter colour or a shorter processing time, so you can get used to your new look." },
  { code:"BR7", theme:"BR", nl:"Een ombre-effect: de aanzet van de wenkbrauw wordt iets vroeger afgenomen. Zo begint hij zacht en wordt hij naar de staart toe intenser.", en:"An ombré effect: the start of the brow is removed a little earlier, so it begins soft and becomes more intense towards the tail." },
  { code:"BR8", theme:"BR", nl:"Klassieke wenkbrauwverf kleurt enkel de haartjes. Henna kleurt ook de huid er licht onder, voor een voller effect.", en:"Classic brow tint only colours the hairs. Henna also lightly tints the skin underneath, for a fuller effect." },
  { code:"BR9", theme:"BR", nl:"Eiwitrijke voeding, vitamine C en B en een zachte massage ondersteunen een sterke haargroei, ook van je wenkbrauwen.", en:"Protein-rich food, vitamins C and B and a gentle massage support strong hair growth, your brows included." },
  { code:"BR10", theme:"BR", nl:"Henna wordt vooraf even getest op een klein plekje huid. Na 48 uur weet je dat je huid het goed verdraagt.", en:"Henna is first tested on a small patch of skin. After 48 hours you know your skin tolerates it well." },
  { code:"MN1", theme:"MN", nl:"Mannen gebruiken al sinds de oertijd ‘make-up’: jagers kleurden hun gezicht als camouflage om dichter bij het wild te komen.", en:"Men have used ‘make-up’ since prehistoric times: hunters coloured their faces as camouflage to get closer to their prey." },
  { code:"MN2", theme:"MN", nl:"Een mannenhuid is meestal dikker en heeft meer en grotere talgklieren. Een wat vettere huid is bij mannen dus heel normaal.", en:"Men’s skin is usually thicker, with more and larger sebaceous glands, so slightly oilier skin is perfectly normal for men." },
  { code:"MN3", theme:"MN", nl:"De pH van een mannenhuid ligt iets hoger (ongeveer 5,6 tot 6,3) dan die van een vrouwenhuid (ongeveer 5,1 tot 5,8).", en:"The pH of men’s skin is slightly higher (about 5.6 to 6.3) than that of women’s skin (about 5.1 to 5.8)." },
  { code:"MN7", theme:"MN", nl:"Scheren maakt de bovenste huidlaag na verloop van tijd dikker en kan ingegroeide haartjes geven. Een zachte peeling helpt.", en:"Shaving gradually thickens the top layer of the skin and can cause ingrown hairs. A gentle peel helps." },
  { code:"MN8", theme:"MN", nl:"Mannenhaar op rug of borst is sterker. Daarom wordt er met kleine stroken gewaxt, met een kalmerende verzorging achteraf.", en:"Men’s hair on the back or chest is stronger, so waxing is done in small strips, with soothing care afterwards." },
  { code:"MN9", theme:"MN", nl:"Neusharen verschijnen vaak rond 40 jaar, oorharen rond 50. Netjes en voorzichtig verwijderen kan gewoon in het salon.", en:"Nose hair often appears around 40, ear hair around 50. Neat, careful removal can simply be done in the salon." },
  { code:"HV1", theme:"HV", nl:"Je opperhuid vernieuwt zich ongeveer elke 28 dagen: van de onderste laag schuiven nieuwe cellen naar boven.", en:"Your outer skin renews itself about every 28 days: new cells move up from the lowest layer." },
  { code:"HV2", theme:"HV", nl:"Met de jaren vertraagt die vernieuwing tot zo’n 5 à 6 weken. Een regelmatige zachte peeling geeft de huid dan een frisse boost.", en:"Over the years that renewal slows to about 5 to 6 weeks. A regular gentle peel then gives the skin a fresh boost." },
  { code:"HV3", theme:"HV", nl:"Je huidbarrière lijkt op een bakstenen muur: de huidcellen zijn de stenen, de huidvetten het cement dat alles samenhoudt.", en:"Your skin barrier is like a brick wall: the skin cells are the bricks, the skin lipids the mortar holding it together." },
  { code:"HV4", theme:"HV", nl:"Dynamische rimpels zie je alleen als je beweegt, zoals lachen of fronsen. Statische rimpels blijven ook in rust zichtbaar.", en:"Dynamic wrinkles only show when you move, like smiling or frowning. Static wrinkles stay visible at rest too." },
  { code:"HV5", theme:"HV", nl:"Kraaienpootjes ontstaan ook door veel lezen of naar een scherm kijken. De huid rond de ogen is dun: verwen ze met een oogverzorging.", en:"Crow’s feet also come from lots of reading or screen time. The skin around the eyes is thin: treat it to an eye care." },
  { code:"HV6", theme:"HV", nl:"Zonlicht bestaat voor ongeveer 50% uit infrarood (die je als warmte voelt), 45% zichtbaar licht en maar zo’n 5% UV.", en:"Sunlight is about 50% infrared (felt as warmth), 45% visible light and only about 5% UV." },
  { code:"HV7", theme:"HV", nl:"Hoe je huid ouder wordt, hangt af van je genen én van je levensstijl: zon, slaap, voeding en ontspanning maken een groot verschil.", en:"How your skin ages depends on your genes and on your lifestyle: sun, sleep, food and relaxation make a big difference." },
  { code:"HV8", theme:"HV", nl:"Een ouderdomsvlek heeft ook mooiere namen: zonnevlek of zelfs ‘ervaringsvlek’.", en:"An age spot has nicer names too: sun spot or even ‘experience spot’." },
  { code:"HS1", theme:"HS", nl:"Tijdens een hot stone massage zijn de stenen ongeveer 50 °C: heerlijk warm, maar altijd aangenaam voor de huid.", en:"During a hot stone massage the stones are about 50 °C: wonderfully warm, yet always comfortable on the skin." },
  { code:"HS2", theme:"HS", nl:"De stenen worden na elke behandeling gereinigd en met tea tree-olie ingewreven. Zo krijgen ze na verloop van tijd hun mooie diepzwarte kleur.", en:"After every treatment the stones are cleaned and rubbed with tea tree oil, which gradually gives them their beautiful deep black colour." },
  { code:"HS3", theme:"HS", nl:"Een hot stone massage gaat bewust langzaam: de stenen hebben tijd nodig om hun warmte aan je spieren af te geven.", en:"A hot stone massage is deliberately slow: the stones need time to pass their warmth on to your muscles." },
  { code:"HS4", theme:"HS", nl:"Bij hot stone gebruik ik een zachte, ontspannende olie zoals zoete amandelolie, en nooit een verwarmende olie: de stenen zorgen al voor de warmte.", en:"Hot stone uses a soft, relaxing oil such as sweet almond oil, never a warming oil: the stones already provide the warmth." },
  { code:"HS5", theme:"HS", nl:"Een steen te warm of net niet warm genoeg? Zeg het gerust, dan wordt hij meteen aangepast.", en:"A stone too warm or not quite warm enough? Just say so and it’s adjusted straight away." },
];

/* ============================================================
   UPSELL SUGGESTIONS — small add-ons shown on the result screen.
   One suggestion per treatment id (optional — a treatment with
   none simply shows no upsell card). Keep it to genuinely cheap,
   quick add-ons; this is a nudge, not a hard sell.
   ============================================================ */
function U(nl, en, fr, price){ return { nl, en, fr, price }; }
const UPSELL_SUGGESTIONS = {
  expressfacial: U("Voeg een ampul / serum toe", "Add an ampoule / serum", "Ajoutez une ampoule / un sérum", "+€5"),
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

/* GIFT_CARDS (v183): digital gift vouchers (#cadeaubon). Sandra keeps the
   register on her own phone (salon key); a client sees the balance through
   a voucher link signed with the salon key (see app.js, "gift cards").
   iban/bic: fill in to show bank-transfer details to buyers (leave "" to
   let buyers ask for them via WhatsApp). seed = paper vouchers sold before
   the app; added once to Sandra's register (amount in euro). */
const GIFT_CARDS = {
  validityMonths: 24,   // Sandra (18/10/2026): always 2 years, the voucher is paid anyway
  amounts: [25, 50, 75, 100, 150],
  minAmount: 10,
  iban: "BE10 7310 7473 1704",
  bic: "",
  beneficiary: "Beauty & Coffee",
  // Belgium: vouchers sold from 1/4/2027 must stay valid at least 2 years (approved by the federal government, 08/2026)
  validityRules: [ { from:"2027-04-01", months:24 } ],
  // live balance: cadeaubonnen.json in this site's GitHub repo (owner/repo found from the address; token only on Sandra's phone)
  live: { owner:"", repo:"", file:"cadeaubonnen.json" },
  seedRev: 2,           // raise when the seed list below changes (updates Sandra's register once)
  seed: [
    { n:"202601", a:100, issued:"2026-09-19", valid:"2028-09-19", paper:true },
    { n:"202602", a:100, issued:"2026-10-18", valid:"2028-10-18", paper:true }
  ]
};
