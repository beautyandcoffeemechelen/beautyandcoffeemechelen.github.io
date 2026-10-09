/* ============================================================
   BEAUTY & COFFEE — ingredients & allergies
   Loaded after data.js. One place with the full ingredient list (INCI)
   of every product used in the salon, and which treatments use it.
   The screen "Ingrediënten & allergieën" (link: …/#ingredienten, and a
   button in salon mode) searches this list: type an allergy (e.g.
   "lavendel", "noten", "parfum", "linalool") and it shows which
   products contain it, in which treatments, and what to skip or swap.

   HOW TO ADD A PRODUCT (copy a block below):
     id: { name:"Brand – product",   ← or { nl:"…", en:"…", fr:"…" }
           inci:"Aqua, …",   ← exactly as on the pack
           usedIn:["pedicure","manicure"],          ← ids from TREATMENTS_CATALOG
           slot:"handcream",                        ← products with the same slot can replace each other
           note:{ nl:"…", en:"…", fr:"…" } }        ← optional
   - inci:"" = list not known yet → shown under "Nog aan te vullen".
   - fromAdvent:"lipbalm" = take the list from ADVENT.items (no double work).
   - usedIn may also hold "advent" (gift to take home) or "extra-facial"
     (free extra with a facial, advent calendar).

   TEST PHASE (INGREDIENTS_LIVE): until liveFrom NOBODY sees the screen,
   except Sandra:
     - with the private link  …/?voorproef=<previewKey>#ingredienten
     - or with the button in her salon mode (#salon, only on her phone).
   A yellow bar then says "Testfase". From liveFrom the #ingredienten link
   works for everyone and the house-rules screen gets a button for clients.
   Not ready yet on 1/12? Simply move liveFrom to a later date.
   NB: this file is on the public website, so the lists are not secret;
   the test phase only keeps clients from relying on an unfinished screen.
   ============================================================ */
const INGREDIENTS_LIVE = {
  liveFrom: "2026-12-01",        // public from this day
  previewKey: "BC-XMAS-7Q4K"     // same private key as the advent preview
};

// Treatments without cosmetic products (not listed on the screen)
const INGREDIENTS_SKIP_TREATMENTS = ["tastingbasic","tastingadvanced","baristaworkshop","teamcoffee"];

const SALON_PRODUCTS = {
  /* ---- gifts to take home (advent calendar) ---- */
  lipbalm:      { name:{ nl:"Homemade kokoslippenbalsem", en:"Home-made coconut lip balm", fr:"Baume à lèvres coco fait maison" }, fromAdvent:"lipbalm", usedIn:["advent"] },
  lipscrub:     { name:{ nl:"Homemade lipscrub", en:"Home-made lip scrub", fr:"Gommage lèvres fait maison" }, fromAdvent:"lipscrub", usedIn:["advent"] },
  bathsaltlav:  { name:{ nl:"Homemade badzout lavendel", en:"Home-made lavender bath salts", fr:"Sels de bain lavande faits maison" }, usedIn:["advent"], slot:"bathsalt",
    inci:"Sodium Bicarbonate, Magnesium Sulfate, Cocos Nucifera (Coconut) Oil, Lavandula Angustifolia (Lavender) Oil, Linalool, Limonene, CI 42090" },
  bathsaltmand: { name:{ nl:"Homemade badzout mandarijn & lavendel", en:"Home-made mandarin & lavender bath salts", fr:"Sels de bain mandarine & lavande faits maison" }, fromAdvent:"bathsalt2", usedIn:["advent"], slot:"bathsalt" },
  eyeflash:     { name:{ nl:"Janssen Cosmetics – Eye Flash Fluid (ampul)", en:"Janssen Cosmetics – Eye Flash Fluid (ampoule)", fr:"Janssen Cosmetics – Eye Flash Fluid (ampoule)" }, fromAdvent:"eyeflash", usedIn:["advent"] },
  guinotscrub:  { name:{ nl:"Guinot – Éclat Parfait scrub (staaltje)", en:"Guinot – Éclat Parfait scrub (sample)", fr:"Guinot – Gommage Éclat Parfait (échantillon)" }, fromAdvent:"guinot", usedIn:["advent"] },

  /* ---- masks: free extra with a facial (advent calendar) ---- */
  algoageing:   { name:{ nl:"Bio Balance – Algoherbal Ageing (poedermasker + Essence Gel)", en:"Bio Balance – Algoherbal Ageing (powder mask + Essence Gel)", fr:"Bio Balance – Algoherbal Ageing (masque poudre + Essence Gel)" }, fromAdvent:"peelanti", usedIn:["extra-facial"], slot:"mask" },
  algorose:     { name:{ nl:"Bio Balance – Algoherbal Sensitive Rose (poedermasker + Essence Gel)", en:"Bio Balance – Algoherbal Sensitive Rose (powder mask + Essence Gel)", fr:"Bio Balance – Algoherbal Sensitive Rose (masque poudre + Essence Gel)" }, fromAdvent:"peelsens", usedIn:["extra-facial"], slot:"mask" },
  blueberry:    { name:{ nl:"Bio Balance – Peel-off algenmasker bosbessen (Sensitive)", en:"Bio Balance – Blueberry peel-off seaweed mask (Sensitive)", fr:"Bio Balance – Masque peel-off aux algues à la myrtille (Sensitive)" }, fromAdvent:"peelblueberry", usedIn:["extra-facial"], slot:"mask" },
  collagenmask: { name:{ nl:"Bio Balance – Super Collageen gelmasker Lifting", en:"Bio Balance – Super Collagen gel mask Lifting", fr:"Bio Balance – Masque gel Super Collagène Lifting" }, fromAdvent:"collagen", usedIn:["extra-facial"], slot:"mask" },
  luminoclear:  { name:"Bio Balance – LuminoClear BioCell Mask (pigment, AHA)", fromAdvent:"luminoclear", usedIn:["extra-facial"], slot:"mask" },
  goldmask:     { name:"Gold Bio-Collagen Facial Mask (Crystal Collagen Gold)", fromAdvent:"goldmask", usedIn:["extra-facial"], slot:"mask",
    note:{ nl:"Volgens de verpakking: niet op gevoelige huid, zonnebrand of wondjes.", en:"According to the pack: not on sensitive skin, sunburn or broken skin.", fr:"Selon l'emballage : pas sur peau sensible, coup de soleil ou peau abîmée." } },

  /* ---- hands ---- */
  gerlasan:     { name:{ nl:"Gerlasan – Handcrème met ureum", en:"Gerlasan – Hand cream with urea", fr:"Gerlasan – Crème pour les mains à l'urée" }, usedIn:["manicure","manicureexpress","manipedispa","handspa"], slot:"handcream",
    inci:"Aqua (Water), Urea, Paraffinum Liquidum (Mineral Oil), Polyglyceryl-3 Methylglucose Distearate, Isopropyl Palmitate, Octyldodecanol, Glyceryl Stearate, Simmondsia Chinensis (Jojoba) Seed Oil, Cetyl Alcohol, Glycerin, Dimethicone, Tapioca Starch, Panthenol, Aloe Barbadensis Leaf Juice Powder, Bisabolol, Triethyl Citrate, Xanthan Gum, Parfum (Fragrance), Methylparaben, Ethylparaben, Phenoxyethanol, Caprylyl Glycol, Caprylhydroxamic Acid, Ethylhexylglycerin, Methylpropanediol, Benzyl Salicylate, Citronellol, Hexyl Cinnamal, Limonene, Linalool, Alpha-Isomethyl Ionone",
    note:{ nl:"Ook geschikt voor diabetici (volgens de verpakking).", en:"Also suitable for people with diabetes (according to the pack).", fr:"Convient également aux diabétiques (selon l'emballage)." } },
  handpeeling:  { name:{ nl:"Handpeeling (welk product?)", en:"Hand scrub (which product?)", fr:"Gommage mains (quel produit ?)" }, usedIn:["handspa","manipedispa"], inci:"" },

  /* ---- massage: essential oils + base oil ---- */
  eoorange:     { name:{ nl:"Physalis – Sinaasappel, etherische olie (bio)", en:"Physalis – Sweet orange essential oil (organic)", fr:"Physalis – Huile essentielle d'orange douce (bio)" }, usedIn:["hotstone","cupping","cuppingpeeling","hotstoneface","facecupping"], slot:"essentialoil",
    inci:"Citrus Sinensis (Orange) Peel Oil, Limonene*, Linalool*, Citral*, Geraniol*, Citronellol*",
    note:{ nl:"* van nature aanwezig in de olie. Koude persing van de schil. Citrusolie: kan de huid gevoeliger maken voor de zon.", en:"* naturally present in the oil. Cold-pressed from the peel. Citrus oil: may make skin more sensitive to the sun.", fr:"* naturellement présent dans l'huile. Pression à froid du zeste. Huile d'agrumes : peut rendre la peau plus sensible au soleil." } },
  eorosemary:   { name:{ nl:"Physalis – Rozemarijn ct. cineol, etherische olie (bio)", en:"Physalis – Rosemary ct. cineole essential oil (organic)", fr:"Physalis – Huile essentielle de romarin à cinéole (bio)" }, usedIn:["hotstone","cupping","cuppingpeeling","hotstoneface","facecupping"], slot:"essentialoil",
    inci:"Rosmarinus Officinalis (Rosemary) Leaf Oil, Limonene*, Linalool*, Citronellol*, Geraniol*",
    note:{ nl:"* van nature aanwezig in de olie. Chemotype 1,8-cineol; bevat ook kamfer: niet bij zwangerschap of epilepsie.", en:"* naturally present in the oil. Chemotype 1,8-cineole; also contains camphor: not during pregnancy or with epilepsy.", fr:"* naturellement présent dans l'huile. Chémotype 1,8-cinéole ; contient aussi du camphre : pas pendant la grossesse ni en cas d'épilepsie." } },
  eomandarin:   { name:{ nl:"Marion Maakt – Mandarijn, etherische olie (bio)", en:"Marion Maakt – Mandarin essential oil (organic)", fr:"Marion Maakt – Huile essentielle de mandarine (bio)" }, usedIn:["hotstone","cupping","cuppingpeeling","hotstoneface","facecupping"], slot:"essentialoil",
    inci:"Citrus Reticulata (Mandarin Orange) Peel Oil, Limonene*",
    note:{ nl:"* van nature aanwezig (chemotype: limoneen, gamma-terpineen). Ook gebruikt in het badzout mandarijn & lavendel.", en:"* naturally present (chemotype: limonene, gamma-terpinene). Also used in the mandarin & lavender bath salts.", fr:"* naturellement présent (chémotype : limonène, gamma-terpinène). Également utilisée dans les sels de bain mandarine & lavande." } },
  baseoil:      { name:{ nl:"Basisolie voor massage (welke?)", en:"Massage base oil (which one?)", fr:"Huile de base pour massage (laquelle ?)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"baseoil", inci:"" }
};

/* Allergy groups for the search. "terms" = what people type (nl/en/fr),
   "match" = pieces of INCI names that belong to the group. */
const ALLERGEN_GROUPS = [
  { id:"fragrance", label:{ nl:"Parfum & geurstoffen", en:"Fragrance", fr:"Parfum" },
    terms:["parfum","geur","fragrance","perfume","geurstof","allergeen"],
    match:["parfum","fragrance","linalool","limonene","citronellol","geraniol","citral","hexyl cinnamal","benzyl salicylate","alpha-isomethyl ionone","eugenol","coumarin","benzyl benzoate","benzyl alcohol","farnesol","cinnamal","hydroxycitronellal","isoeugenol","amyl cinnamal"] },
  { id:"essential", label:{ nl:"Etherische oliën", en:"Essential oils", fr:"Huiles essentielles" },
    terms:["etherisch","essentieel","essential","essentielle","aromatherapie"],
    match:["peel oil","leaf oil","flower oil","lavandula angustifolia (lavender) oil","lavandula angustifolia oil","ormenis multicaulis oil","rosa rugosa flower oil"] },
  { id:"citrus", label:{ nl:"Citrus (sinaasappel, mandarijn, citroen)", en:"Citrus", fr:"Agrumes" },
    terms:["citrus","sinaasappel","appelsien","mandarijn","citroen","limoen","orange","mandarin","lemon","agrume","mandarine","citron"],
    match:["citrus","limonene","citral"] },
  { id:"lavender", label:{ nl:"Lavendel", en:"Lavender", fr:"Lavande" }, terms:["lavendel","lavender","lavande"], match:["lavandula"] },
  { id:"rosemary", label:{ nl:"Rozemarijn", en:"Rosemary", fr:"Romarin" }, terms:["rozemarijn","rosemary","romarin"], match:["rosmarinus"] },
  { id:"rose", label:{ nl:"Roos", en:"Rose", fr:"Rose" }, terms:["roos","rozen","rose"], match:["rosa "] },
  { id:"asteraceae", label:{ nl:"Kamille & composieten (arnica, calendula)", en:"Chamomile & daisy family", fr:"Camomille & astéracées" },
    terms:["kamille","composiet","arnica","calendula","goudsbloem","chamomile","camomille","asteraceae","bisabolol"],
    match:["chamomilla","matricaria","bisabolol","ormenis","anthemis","calendula","arnica"] },
  { id:"nuts", label:{ nl:"Noten (amandel, shea, macadamia, argan…)", en:"Nuts (almond, shea, macadamia…)", fr:"Fruits à coque (amande, karité…)" },
    terms:["noot","noten","amandel","shea","karite","karité","macadamia","hazelnoot","argan","walnoot","nut","nuts","almond","noix","amande","noisette"],
    match:["prunus amygdalus","almond","butyrospermum","shea","macadamia","corylus","argania","juglans","anacardium","pistacia","bertholletia"] },
  { id:"coconut", label:{ nl:"Kokos", en:"Coconut", fr:"Coco" }, terms:["kokos","coconut","coco"], match:["cocos","coco","cocoate","cocamid","cocoyl"] },
  { id:"bee", label:{ nl:"Bijenwas, honing & propolis", en:"Beeswax, honey & propolis", fr:"Cire d'abeille, miel & propolis" },
    terms:["bij","bijen","bijenwas","honing","propolis","bee","beeswax","honey","abeille","miel","cire"], match:["cera alba","beeswax","propolis","mel ","honey","royal jelly"] },
  { id:"lanolin", label:{ nl:"Lanoline (wolvet)", en:"Lanolin", fr:"Lanoline" }, terms:["lanoline","wolvet","lanolin"], match:["lanolin"] },
  { id:"parabens", label:{ nl:"Parabenen", en:"Parabens", fr:"Parabènes" }, terms:["paraben","parabenen","parabène"], match:["paraben"] },
  { id:"preservatives", label:{ nl:"Andere bewaarmiddelen", en:"Other preservatives", fr:"Autres conservateurs" },
    terms:["bewaarmiddel","conserveermiddel","preservative","conservateur","phenoxyethanol","methylisothiazolinone"],
    match:["phenoxyethanol","chlorphenesin","sodium benzoate","methylisothiazolinone","methylchloroisothiazolinone","dmdm hydantoin","formaldehyde","caprylhydroxamic"] },
  { id:"colorants", label:{ nl:"Kleurstoffen & pigmenten", en:"Colourants & pigments", fr:"Colorants & pigments" },
    terms:["kleurstof","kleur","pigment","colorant","colour","color"], match:["ci ","iron oxide","titanium dioxide","mica","red 4","red 40","yellow 5"] },
  { id:"acids", label:{ nl:"Fruitzuren & zuren (AHA)", en:"Fruit acids & acids (AHA)", fr:"Acides de fruits (AHA)" },
    terms:["zuur","zuren","aha","fruitzuur","acid","acide","melkzuur","citroenzuur"], match:["lactic acid","glycolic acid","citric acid","salicylic acid","mandelic acid","malic acid","tartaric acid"] },
  { id:"urea", label:{ nl:"Ureum", en:"Urea", fr:"Urée" }, terms:["ureum","urea","urée"], match:["urea"] },
  { id:"mineraloil", label:{ nl:"Minerale olie & paraffine", en:"Mineral oil & paraffin", fr:"Huile minérale & paraffine" },
    terms:["minerale olie","paraffine","vaseline","mineral oil","paraffin","petrolatum"], match:["paraffinum","mineral oil","petrolatum"] },
  { id:"silicones", label:{ nl:"Siliconen", en:"Silicones", fr:"Silicones" }, terms:["silicone","siliconen"], match:["dimethicone","siloxane","methicone"] },
  { id:"peg", label:{ nl:"PEG & ricinusolie", en:"PEG & castor oil", fr:"PEG & huile de ricin" }, terms:["peg","ricinus","castor","ricin"], match:["peg-","ricinus","castor"] },
  { id:"collagen", label:{ nl:"Collageen (dierlijk)", en:"Collagen (animal)", fr:"Collagène (animal)" }, terms:["collageen","collagen","collagène","vis","dierlijk"], match:["collagen"] },
  { id:"aloe", label:{ nl:"Aloë vera", en:"Aloe vera", fr:"Aloe vera" }, terms:["aloe","aloë"], match:["aloe"] },
  { id:"cereals", label:{ nl:"Granen (haver, tarwe, maïs)", en:"Cereals (oat, wheat, corn)", fr:"Céréales (avoine, blé, maïs)" },
    terms:["haver","tarwe","gluten","mais","maïs","graan","oat","wheat","corn","avoine","ble","blé"], match:["avena","triticum","hordeum","zea mays","corn","oat","wheat"] },
  { id:"soy", label:{ nl:"Soja", en:"Soy", fr:"Soja" }, terms:["soja","soy","soya"], match:["glycine soja","soybean","soy"] },
  { id:"licorice", label:{ nl:"Zoethout", en:"Licorice", fr:"Réglisse" }, terms:["zoethout","licorice","réglisse","reglisse"], match:["glycyrrhiza"] },
  { id:"jojoba", label:{ nl:"Jojoba", en:"Jojoba", fr:"Jojoba" }, terms:["jojoba"], match:["simmondsia"] },
  { id:"algae", label:{ nl:"Algen & zeewier", en:"Algae & seaweed", fr:"Algues" }, terms:["alg","algen","zeewier","jodium","seaweed","algae","algue","iode"], match:["algin","chondrus","fucus","laminaria","spirulina","algae"] }
];
