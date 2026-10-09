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
  previewKey: PREVIEW_KEY          // the same private preview key as the rest of the app (data.js)
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
  gerlasan:     { name:{ nl:"Gerlasan – Handcrème met ureum", en:"Gerlasan – Hand cream with urea", fr:"Gerlasan – Crème pour les mains à l'urée" }, usedIn:["handspa","manicure","manicureexpress","manipedispa"], slot:"handcream",
    inci:"Aqua (Water), Urea, Paraffinum Liquidum (Mineral Oil), Polyglyceryl-3 Methylglucose Distearate, Isopropyl Palmitate, Octyldodecanol, Glyceryl Stearate, Simmondsia Chinensis (Jojoba) Seed Oil, Cetyl Alcohol, Glycerin, Dimethicone, Tapioca Starch, Panthenol, Aloe Barbadensis Leaf Juice Powder, Bisabolol, Triethyl Citrate, Xanthan Gum, Parfum (Fragrance), Methylparaben, Ethylparaben, Phenoxyethanol, Caprylyl Glycol, Caprylhydroxamic Acid, Ethylhexylglycerin, Methylpropanediol, Benzyl Salicylate, Citronellol, Hexyl Cinnamal, Limonene, Linalool, Alpha-Isomethyl Ionone",
    note:{ nl:"Ook geschikt voor diabetici (volgens de verpakking).", en:"Also suitable for people with diabetes (according to the pack).", fr:"Convient également aux diabétiques (selon l'emballage)." } },
  indulgescrub: { name:"Indulge (Nailit Products) – BuffingSeaSalt Oil Scrub, tender lily & red rose", usedIn:["handspa","manipedispa"], slot:"handscrub",
    inci:"Carthamus Tinctorius Seed Oil (Safflower Oil), Helianthus Annuus Seed Oil (Organic Sunflower), Vitis Vinifera Seed Oil (Grapeseed), Prunus Armeniaca Kernel Oil (Apricot Kernel Oil), Magnesium Sulfate, Sodium Chloride, Dead Sea Salts, Macrocystis Pyrifera Extract (Sea Kelp), Dextrose Monohydrate, Fragrance (Acapulco Lily)",
    note:{ nl:"Abrikozenpitolie: let op bij amandel- of notenallergie (verwante familie).", en:"Apricot kernel oil: take care with almond or nut allergy (related family).", fr:"Huile de noyau d'abricot : prudence en cas d'allergie aux amandes ou aux noix (famille proche)." } },
  mellowmoist:  { name:"Indulge (Nailit Products) – MellowMoist Lotion, tender lily & red rose", usedIn:["handspa","manipedispa"], slot:"handcream",
    inci:"Aloe Barbadensis Leaf Juice (Organic Aloe), Aqua (Water), Helianthus Annuus Seed Oil (Organic Sunflower), Isopropyl Palmitate, Glyceryl Stearate SE, Cetyl Alcohol, Stearic Acid, Simmondsia Chinensis Seed Oil (Organic Jojoba), Panthenol (Vitamin B5), Tocopheryl Acetate (Vitamin E), Camellia Sinensis Leaf Extract (Green Tea), Glycerin (Kosher Vegetable), Butyrospermum Parkii Butter (Organic Shea), Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin, Fragrance (Acapulco Lily)",
    note:{ nl:"Eerst deze lotion opgebruiken, daarna Gerlasan. De volgorde op het etiket staat licht door elkaar; alle ingrediënten staan hier.", en:"Use this lotion up first, then Gerlasan. The order on the label is slightly jumbled; all ingredients are listed here.", fr:"Finir d'abord cette lotion, puis Gerlasan. L'ordre sur l'étiquette est un peu mélangé ; tous les ingrédients sont repris ici." } },
  thermomask:   { name:"Depilève Waxceutical – DNA Thermo Mask (paraffinemasker, Districos)", usedIn:["paraffinmask"], slot:"thermomask",
    inci:"Paraffin, Glyceryl Rosinate, Paraffinum Liquidum (Mineral Oil), Hydrogenated Styrene/Butadiene Copolymer, Ethylene/VA Copolymer, Sodium DNA, Glycerin, Glucose, Allantoin, Calcium Gluconate, Glutamic Acid, Lysine, Glycine, Lactic Acid, Urea, Helianthus Annuus (Sunflower) Seed Wax, Jojoba Esters, Acacia Decurrens Flower Wax, Sodium PCA, Polyglycerin-3, Aqua (Water), Tris(2,4-di-tert-butylphenyl) Phosphite, Parfum (Fragrance), Phenoxyethanol, Potassium Sorbate, Gluconolactone, Sodium Benzoate, Tris-BHT Mesitylene, Mica, Hexyl Cinnamal, CI 77891 (Titanium Dioxide), CI 45410 (Red 27 Lake)",
    note:{ nl:"Bevat colofonium (Glyceryl Rosinate), een bekend contactallergeen, en marien DNA (Sodium DNA). Warm masker: temperatuur testen op de pols, niet op geïrriteerde huid of bij de ogen. Houdbaar tot 03/2028 (lot 2303091).", en:"Contains colophony (Glyceryl Rosinate), a known contact allergen, and marine DNA (Sodium DNA). Warm mask: test the temperature on the wrist, not on irritated skin or near the eyes. Best before 03/2028.", fr:"Contient de la colophane (Glyceryl Rosinate), un allergène de contact connu, et de l'ADN marin (Sodium DNA). Masque chaud : tester la température sur le poignet, pas sur peau irritée ni près des yeux. À utiliser avant 03/2028." } },
  dnaserum:     { name:"Depilève Waxceutical – DNA Rejuvenating Serum 2 (met Q10)", usedIn:["paraffinmask"], slot:"serum",
    inci:"Aqua (Water), Coco-Caprylate/Caprate, Pentylene Glycol, Isostearyl Alcohol, Methylpropanediol, Butylene Glycol Cocoate, Bisabolol, Ubiquinone, Lysine, Glycine, Lactic Acid, Gluconolactone, Allantoin, Sodium PCA, Urea, Sodium DNA, Helianthus Annuus (Sunflower) Seed Oil, Chamomilla Recutita (Matricaria) Flower Extract, Hydrogenated Ethylhexyl Olivate, Hydrogenated Olive Oil Unsaponifiables, Glycerin, Glucose, Tocopheryl Acetate, Isohexadecane, Caprylyl Glycol, C12-15 Alkyl Benzoate, Calcium Gluconate, Glutamic Acid, Aminomethyl Propanol, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Ethylcellulose, Parfum (Fragrance), Sodium Benzoate, Potassium Sorbate, Phenoxyethanol, Ascorbyl Palmitate, BHT, Citronellol, Geraniol, Hexyl Cinnamal, Limonene, Linalool, Mica, CI 77891 (Titanium Dioxide), CI 77491 (Iron Oxides)",
    note:{ nl:"Marien DNA en co-enzym Q10. Bevat kokosderivaten, kamille en parfum. Niet op gevoelige of beschadigde zones.", en:"Marine DNA and coenzyme Q10. Contains coconut derivatives, chamomile and fragrance. Not on sensitive or damaged areas.", fr:"ADN marin et coenzyme Q10. Contient des dérivés de coco, de la camomille et du parfum. Pas sur zones sensibles ou abîmées." } },
  hyalift:      { name:"Bio Balance – Hya-Lift+ hyaluronzuurserum", usedIn:["peelanti","peelsens"], slot:"hyaserum",
    inci:"Aqua (Water), Cucumis Sativus (Cucumber) Fruit Extract, Sodium Hyaluronate, Alcohol, Phenoxyethanol",
    note:{ nl:"Gebruikt bij de Algoherbal peel-off maskers. Kort en mild: geen parfum. Bevat wel alcohol.", en:"Used with the Algoherbal peel-off masks. Short and mild: no fragrance. Does contain alcohol.", fr:"Utilisé avec les masques peel-off Algoherbal. Court et doux : sans parfum. Contient de l'alcool." } },

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
  /* MASSAGE OILS — order of use: 1) Breezy Blossom until the bottle is empty,
     2) then the coconut-scented oil, 3) then the others, alternating. For some
     massages (e.g. cupping) Sandra mixes pure sweet almond or grapeseed oil
     with a few drops of lavender or lemongrass essential oil. */
  breezyblossom: { name:{ nl:"Bio Balance – Massage Oil Breezy Blossom (jojoba & amandel)", en:"Bio Balance – Massage Oil Breezy Blossom (jojoba & almond)", fr:"Bio Balance – Huile de massage Breezy Blossom (jojoba & amande)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Paraffinum Liquidum (Mineral Oil), Cyclopentasiloxane, Cyclohexasiloxane, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Parfum (Fragrance), Simmondsia Chinensis (Jojoba Seed) Oil, Citral, Citronellol, Hydroxyisohexyl 3-Cyclohexene Carboxaldehyde, Limonene, Linalool",
    note:{ nl:"Eerste keuze: wordt gebruikt tot de fles op is. Bevat amandel (noten), parfum, minerale olie en siliconen. 250 ml, Districos nv.", en:"First choice: used until the bottle is empty. Contains almond (nuts), fragrance, mineral oil and silicones. 250 ml, Districos nv.", fr:"Premier choix : utilisée jusqu’à ce que le flacon soit vide. Contient de l’amande (fruits à coque), du parfum, de l’huile minérale et des silicones. 250 ml, Districos nv." } },
  coconutoil:   { name:{ nl:"Massage Oil Coconut Scent (Oriental Body Oil)", en:"Massage Oil Coconut Scent (Oriental Body Oil)", fr:"Huile de massage parfum coco (Oriental Body Oil)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Paraffinum Liquidum, Parfum, Coumarin",
    note:{ nl:"Daarna, als Breezy Blossom op is. Alleen een kokosgeur: er zit géén kokosolie in. Coumarin is een geurallergeen. 600 ml, J.P. International B.V.", en:"Next, once Breezy Blossom is finished. Only a coconut scent: it contains no coconut oil. Coumarin is a fragrance allergen. 600 ml, J.P. International B.V.", fr:"Ensuite, quand Breezy Blossom est terminée. Seulement un parfum coco : elle ne contient pas d’huile de coco. La coumarine est un allergène parfumant. 600 ml, J.P. International B.V." } },
  almondoil:    { name:{ nl:"ZenGrowth – Zoete amandelolie (100% puur)", en:"ZenGrowth – Sweet almond oil (100% pure)", fr:"ZenGrowth – Huile d’amande douce (100 % pure)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Prunus Amygdalus Dulcis (Sweet Almond) Oil",
    note:{ nl:"Zonder parfum. Basis voor de eigen mengsels met lavendel of citroengras (bv. cuppingmassage). Niet bij een notenallergie.", en:"Fragrance-free. Base for Sandra’s own blends with lavender or lemongrass (e.g. cupping massage). Not with a nut allergy.", fr:"Sans parfum. Base des mélanges maison à la lavande ou à la citronnelle (p. ex. massage aux ventouses). Pas en cas d’allergie aux fruits à coque." } },
  grapeseedoil: { name:{ nl:"ZenGrowth – Druivenpitolie (100% puur)", en:"ZenGrowth – Grapeseed oil (100% pure)", fr:"ZenGrowth – Huile de pépins de raisin (100 % pure)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Vitis Vinifera (Grape) Seed Oil",
    note:{ nl:"Zonder parfum en zonder noten: een goed alternatief bij een noten- of geurallergie. Ook basis voor de mengsels met lavendel of citroengras.", en:"Fragrance-free and nut-free: a good alternative with a nut or fragrance allergy. Also a base for the lavender or lemongrass blends.", fr:"Sans parfum et sans fruits à coque : une bonne alternative en cas d’allergie aux fruits à coque ou au parfum. Aussi base des mélanges lavande ou citronnelle." } },
  jojobaoil:    { name:{ nl:"ZenGrowth – Jojobaolie (100% puur)", en:"ZenGrowth – Jojoba oil (100% pure)", fr:"ZenGrowth – Huile de jojoba (100 % pure)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Simmondsia Chinensis (Jojoba) Seed Oil",
    note:{ nl:"Zonder parfum en zonder noten (jojoba is een zaadwas, geen noot).", en:"Fragrance-free and nut-free (jojoba is a seed wax, not a nut).", fr:"Sans parfum et sans fruits à coque (le jojoba est une cire de graine, pas une noix)." } },
  avocadooil:   { name:{ nl:"De Tuinen – Avocado-olie (100% puur)", en:"De Tuinen – Avocado oil (100% pure)", fr:"De Tuinen – Huile d’avocat (100 % pure)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Persea Gratissima Oil",
    note:{ nl:"Parfumvrij. Rijke olie, fijn voor een droge huid. Niet bij een avocado- of latex-fruitallergie.", en:"Fragrance-free. Rich oil, nice for dry skin. Not with an avocado or latex-fruit allergy.", fr:"Sans parfum. Huile riche, idéale pour la peau sèche. Pas en cas d’allergie à l’avocat ou au latex-fruits." } },
  castoroil:    { name:{ nl:"De Tuinen – Wonderolie / ricinusolie (100% puur)", en:"De Tuinen – Castor oil (100% pure)", fr:"De Tuinen – Huile de ricin (100 % pure)" }, usedIn:["hotstone","cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage","hotstoneface","facecupping"], slot:"massageoil",
    inci:"Ricinus Communis Seed Oil",
    note:{ nl:"Parfumvrij. Heel dikke olie: meestal gemengd met een andere olie.", en:"Fragrance-free. Very thick oil: usually mixed with another oil.", fr:"Sans parfum. Huile très épaisse : généralement mélangée à une autre huile." } },
  eolavender:   { name:{ nl:"Lavendel, etherische olie (in eigen massagemengsel)", en:"Lavender essential oil (in Sandra’s own massage blend)", fr:"Huile essentielle de lavande (dans le mélange de massage maison)" }, usedIn:["cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage"], slot:"essentialoil",
    inci:"Lavandula Angustifolia (Lavender) Oil, Linalool*, Limonene*, Geraniol*, Coumarin*",
    note:{ nl:"* van nature aanwezig in de olie. Een paar druppels in amandel- of druivenpitolie, afhankelijk van de massage. Merk en etiket nog aan te vullen (foto sturen).", en:"* naturally present in the oil. A few drops in almond or grapeseed oil, depending on the massage. Brand and label still to be added (send a photo).", fr:"* naturellement présent dans l’huile. Quelques gouttes dans l’huile d’amande ou de pépins de raisin, selon le massage. Marque et étiquette à compléter (envoyer une photo)." } },
  eolemongrass: { name:{ nl:"Citroengras, etherische olie (in eigen massagemengsel)", en:"Lemongrass essential oil (in Sandra’s own massage blend)", fr:"Huile essentielle de citronnelle / lemongrass (dans le mélange de massage maison)" }, usedIn:["cupping","cuppingpeeling","swedish","swedishbackneck","swedishlegs","slimmassage"], slot:"essentialoil",
    inci:"Cymbopogon Flexuosus Oil, Citral*, Geraniol*, Limonene*, Linalool*",
    note:{ nl:"* van nature aanwezig; citral is een sterk geurallergeen. Een paar druppels in amandel- of druivenpitolie (bv. bij cupping). Niet bij zwangerschap en altijd goed verdund. Merk en etiket nog aan te vullen (foto sturen).", en:"* naturally present; citral is a strong fragrance allergen. A few drops in almond or grapeseed oil (e.g. for cupping). Not during pregnancy, always well diluted. Brand and label still to be added (send a photo).", fr:"* naturellement présent ; le citral est un allergène parfumant puissant. Quelques gouttes dans l’huile d’amande ou de pépins de raisin (p. ex. ventouses). Pas pendant la grossesse, toujours bien diluée. Marque et étiquette à compléter (envoyer une photo)." } },
  /* FACIAL MASSAGE CREAM — for the face massage during a facial (not with an oncological facial) */
  janssenmassage: { name:{ nl:"Janssen Cosmetics – Relaxing Massage Cream (gelaatsmassage)", en:"Janssen Cosmetics – Relaxing Massage Cream (facial massage)", fr:"Janssen Cosmetics – Crème de massage relaxante (massage du visage)" }, usedIn:["signaturefacial","antiagefacial","expressfacial","acnefacial","hydrapeel","fillme","fruitacid","liftsummere","facialworkshop"], slot:"facemassage",
    inci:"Aqua (Water), Persea Gratissima (Avocado) Oil, Ethylhexyl Stearate, Octyldodecanol, Butylene Glycol, Polyglyceryl-2 Dipolyhydroxystearate, Polyglyceryl-3 Diisostearate, Glycerin, Cera Alba (Beeswax), Hydrogenated Castor Oil, Cera Microcristallina (Microcrystalline Wax), Sodium Levulinate, Bisabolol, Lecithin, Sodium Chloride, Citric Acid, Ascorbyl Palmitate, Tocopherol, Disodium EDTA, Sodium Anisate, Citrus Aurantium Dulcis (Orange) Peel Oil, Limonene, Linalool, Phenoxyethanol, Sodium Benzoate",
    note:{ nl:"Voor de gelaatsmassage bij een gelaatsverzorging, niet bij een oncologische gelaatsverzorging. Bevat avocado, bijenwas, ricinus en sinaasappelolie. 200 ml, ref. 5580P.", en:"For the face massage during a facial, not with an oncological facial. Contains avocado, beeswax, castor and orange oil. 200 ml, ref. 5580P.", fr:"Pour le massage du visage pendant un soin du visage, pas lors d’un soin oncologique. Contient de l’avocat, de la cire d’abeille, du ricin et de l’huile d’orange. 200 ml, réf. 5580P." } },
  /* LASHES & BROWS — RefectoCil (GW Cosmetics) */
  refectoremover: { name:{ nl:"RefectoCil – Eye make-up remover (niet vettend)", en:"RefectoCil – Eye make-up remover (non-oily)", fr:"RefectoCil – Démaquillant yeux (non gras)" }, usedIn:["browtint","lashtint","lashlift","browlift"], slot:"eyeremover",
    inci:"Aqua, PEG-40 Hydrogenated Castor Oil, Cocamidopropyl Betaine, Chloroacetamide, Parfum, Sodium Benzoate, Citric Acid, Hydroxycitronellal, PPG-2 Methyl Ether, CI 16035, CI 16185",
    note:{ nl:"Om oogmake-up te verwijderen vóór het verven. Bevat parfum, kokosderivaat en chlooracetamide (het etiket vermeldt dit apart). 100 ml.", en:"To remove eye make-up before tinting. Contains fragrance, a coconut derivative and chloroacetamide (stated separately on the label). 100 ml.", fr:"Pour démaquiller les yeux avant la teinture. Contient du parfum, un dérivé de coco et du chloroacétamide (mentionné à part sur l’étiquette). 100 ml." } },
  refectooxliquid: { name:{ nl:"RefectoCil – Oxidant 3% vloeibaar", en:"RefectoCil – Oxidant 3% liquid", fr:"RefectoCil – Oxydant 3 % liquide" }, usedIn:["browtint","lashtint","lashlift","browlift"], slot:"oxidant",
    inci:"Aqua, Hydrogen Peroxide, Triethanolamine, Phosphoric Acid, C12-13 Pareth-9",
    note:{ nl:"Ontwikkelaar, wordt 1:1 gemengd met de verf. Bevat waterstofperoxide: niet in de ogen.", en:"Developer, mixed 1:1 with the tint. Contains hydrogen peroxide: keep out of the eyes.", fr:"Révélateur, mélangé 1:1 à la teinture. Contient du peroxyde d’hydrogène : éviter les yeux." } },
  refectooxcreme: { name:{ nl:"RefectoCil – Oxidant 3% crème", en:"RefectoCil – Oxidant 3% cream", fr:"RefectoCil – Oxydant 3 % crème" }, usedIn:["browtint","lashtint","lashlift","browlift"], slot:"oxidant",
    inci:"Aqua, Hydrogen Peroxide, Cetearyl Alcohol, Triethanolamine, Ceteareth-20, Phosphoric Acid, Sodium Cetearyl Sulfate",
    note:{ nl:"Ontwikkelaar in crèmevorm. Bevat waterstofperoxide: niet in de ogen.", en:"Developer in cream form. Contains hydrogen peroxide: keep out of the eyes.", fr:"Révélateur en crème. Contient du peroxyde d’hydrogène : éviter les yeux." } },
  refectotintremover: { name:{ nl:"RefectoCil – Tint remover (verfvlekken)", en:"RefectoCil – Tint remover (stains)", fr:"RefectoCil – Tint remover (taches de teinture)" }, usedIn:["browtint","lashtint","lashlift","browlift"], slot:"tintremover",
    inci:"Aqua, Isopropyl Alcohol, Polysorbate 80, Citrus Limon Peel Oil, Limonene, Litsea Cubeba Fruit Oil, Citral, Linalool, Citronellol, Geraniol",
    note:{ nl:"Verwijdert verfvlekken op de huid. Bevat alcohol, citroenolie en geurallergenen.", en:"Removes tint stains from the skin. Contains alcohol, lemon oil and fragrance allergens.", fr:"Enlève les taches de teinture sur la peau. Contient de l’alcool, de l’huile de citron et des allergènes parfumants." } },
  refectoprotect: { name:{ nl:"RefectoCil – Skin Protection Cream", en:"RefectoCil – Skin Protection Cream", fr:"RefectoCil – Crème protectrice" }, usedIn:["browtint","lashtint","lashlift","browlift"], slot:"skinprotect",
    inci:"Aqua, Glycine Soja Oil, Glyceryl Stearate SE, Cetearyl Alcohol, Decyl Oleate, Glycerin, Prunus Amygdalus Dulcis Oil, Phenoxyethanol, Sodium Cetearyl Sulfate, Butyrospermum Parkii Butter, Parfum, Methylparaben, Propylene Glycol, Chamomilla Recutita Extract, Tocopherol, Panthenol, Tocopheryl Acetate, Citric Acid, Ethylparaben, Butylparaben, Propylparaben, Disodium Phosphate, Potassium Phosphate",
    note:{ nl:"Beschermt de huid rond het te verven gebied. Bevat soja, amandel, shea, kamille, parfum en parabenen. 75 ml.", en:"Protects the skin around the area to be tinted. Contains soy, almond, shea, chamomile, fragrance and parabens. 75 ml.", fr:"Protège la peau autour de la zone à teinter. Contient du soja, de l’amande, du karité, de la camomille, du parfum et des parabènes. 75 ml." } },
  refectotint:  { name:{ nl:"RefectoCil – Wimper- en wenkbrauwverf (welke kleuren?)", en:"RefectoCil – Lash & brow tint (which colours?)", fr:"RefectoCil – Teinture cils & sourcils (quelles couleurs ?)" }, usedIn:["browtint","lashtint","lashlift","browlift"], slot:"tint", inci:"" },
  mrshighbrow:  { name:{ nl:"Mrs. Highbrow – producten voor wenkbrauwen (welke?)", en:"Mrs. Highbrow – brow products (which ones?)", fr:"Mrs. Highbrow – produits sourcils (lesquels ?)" }, usedIn:["browlift","hennabrows","browshaping"], slot:"browproduct", inci:"" }
};

/* Allergy groups for the search. "terms" = what people type (nl/en/fr),
   "match" = pieces of INCI names that belong to the group. */
const ALLERGEN_GROUPS = [
  { id:"fragrance", label:{ nl:"Parfum & geurstoffen", en:"Fragrance", fr:"Parfum" },
    terms:["parfum","geur","fragrance","perfume","geurstof","allergeen"],
    match:["parfum","fragrance","linalool","limonene","citronellol","geraniol","citral","hexyl cinnamal","benzyl salicylate","alpha-isomethyl ionone","eugenol","coumarin","benzyl benzoate","benzyl alcohol","farnesol","cinnamal","hydroxycitronellal","isoeugenol","amyl cinnamal","hydroxyisohexyl 3-cyclohexene carboxaldehyde","litsea cubeba"] },
  { id:"essential", label:{ nl:"Etherische oliën", en:"Essential oils", fr:"Huiles essentielles" },
    terms:["etherisch","essentieel","essential","essentielle","aromatherapie"],
    match:["peel oil","leaf oil","flower oil","lavandula angustifolia (lavender) oil","lavandula angustifolia oil","ormenis multicaulis oil","rosa rugosa flower oil","cymbopogon"] },
  { id:"citrus", label:{ nl:"Citrus (sinaasappel, mandarijn, citroen)", en:"Citrus", fr:"Agrumes" },
    terms:["citrus","sinaasappel","appelsien","mandarijn","citroen","limoen","orange","mandarin","lemon","agrume","mandarine","citron"],
    match:["citrus","limonene","citral"] },
  { id:"lavender", label:{ nl:"Lavendel", en:"Lavender", fr:"Lavande" }, terms:["lavendel","lavender","lavande"], match:["lavandula"] },
  { id:"lemongrass", label:{ nl:"Citroengras", en:"Lemongrass", fr:"Citronnelle (lemongrass)" }, terms:["citroengras","lemongrass","citronnelle","verveine des indes"], match:["cymbopogon"] },
  { id:"avocado", label:{ nl:"Avocado", en:"Avocado", fr:"Avocat" }, terms:["avocado","avocat","latex"], match:["persea"] },
  { id:"peroxide", label:{ nl:"Waterstofperoxide (ontwikkelaar)", en:"Hydrogen peroxide (developer)", fr:"Peroxyde d’hydrogène (révélateur)" }, terms:["waterstofperoxide","peroxide","oxidant","ontwikkelaar","hydrogen peroxide","peroxyde","oxydant"], match:["hydrogen peroxide"] },
  { id:"rosemary", label:{ nl:"Rozemarijn", en:"Rosemary", fr:"Romarin" }, terms:["rozemarijn","rosemary","romarin"], match:["rosmarinus"] },
  { id:"rose", label:{ nl:"Roos", en:"Rose", fr:"Rose" }, terms:["roos","rozen","rose"], match:["rosa "] },
  { id:"asteraceae", label:{ nl:"Kamille & composieten (arnica, calendula)", en:"Chamomile & daisy family", fr:"Camomille & astéracées" },
    terms:["kamille","composiet","arnica","calendula","goudsbloem","chamomile","camomille","asteraceae","bisabolol"],
    match:["chamomilla","matricaria","bisabolol","ormenis","anthemis","calendula","arnica","carthamus"] },
  { id:"nuts", label:{ nl:"Noten (amandel, shea, macadamia, argan…)", en:"Nuts (almond, shea, macadamia…)", fr:"Fruits à coque (amande, karité…)" },
    terms:["noot","noten","amandel","abrikoos","abrikozenpit","apricot","abricot","shea","karite","karité","macadamia","hazelnoot","argan","walnoot","nut","nuts","almond","noix","amande","noisette"],
    match:["prunus amygdalus","almond","prunus armeniaca","apricot kernel","butyrospermum","shea","macadamia","corylus","argania","juglans","anacardium","pistacia","bertholletia"] },
  { id:"coconut", label:{ nl:"Kokos", en:"Coconut", fr:"Coco" }, terms:["kokos","coconut","coco"], match:["cocos","coco","cocoate","cocamid","cocoyl"] },
  { id:"bee", label:{ nl:"Bijenwas, honing & propolis", en:"Beeswax, honey & propolis", fr:"Cire d'abeille, miel & propolis" },
    terms:["bij","bijen","bijenwas","honing","propolis","bee","beeswax","honey","abeille","miel","cire"], match:["cera alba","beeswax","propolis","mel ","honey","royal jelly"] },
  { id:"lanolin", label:{ nl:"Lanoline (wolvet)", en:"Lanolin", fr:"Lanoline" }, terms:["lanoline","wolvet","lanolin"], match:["lanolin"] },
  { id:"parabens", label:{ nl:"Parabenen", en:"Parabens", fr:"Parabènes" }, terms:["paraben","parabenen","parabène"], match:["paraben"] },
  { id:"preservatives", label:{ nl:"Andere bewaarmiddelen", en:"Other preservatives", fr:"Autres conservateurs" },
    terms:["bewaarmiddel","conserveermiddel","preservative","conservateur","phenoxyethanol","methylisothiazolinone"],
    match:["phenoxyethanol","chlorphenesin","sodium benzoate","methylisothiazolinone","methylchloroisothiazolinone","dmdm hydantoin","formaldehyde","caprylhydroxamic","chloroacetamide"] },
  { id:"colorants", label:{ nl:"Kleurstoffen & pigmenten", en:"Colourants & pigments", fr:"Colorants & pigments" },
    terms:["kleurstof","kleur","pigment","colorant","colour","color"], match:["ci ","iron oxide","titanium dioxide","mica","red 4","red 40","yellow 5"] },
  { id:"acids", label:{ nl:"Fruitzuren & zuren (AHA)", en:"Fruit acids & acids (AHA)", fr:"Acides de fruits (AHA)" },
    terms:["zuur","zuren","aha","fruitzuur","acid","acide","melkzuur","citroenzuur"], match:["lactic acid","glycolic acid","citric acid","salicylic acid","mandelic acid","malic acid","tartaric acid"] },
  { id:"urea", label:{ nl:"Ureum", en:"Urea", fr:"Urée" }, terms:["ureum","urea","urée"], match:["urea"] },
  { id:"mineraloil", label:{ nl:"Minerale olie & paraffine", en:"Mineral oil & paraffin", fr:"Huile minérale & paraffine" },
    terms:["minerale olie","paraffine","vaseline","mineral oil","paraffin","petrolatum"], match:["paraffinum","mineral oil","petrolatum"] },
  { id:"silicones", label:{ nl:"Siliconen", en:"Silicones", fr:"Silicones" }, terms:["silicone","siliconen"], match:["dimethicone","siloxane","methicone"] },
  { id:"peg", label:{ nl:"PEG & ricinusolie", en:"PEG & castor oil", fr:"PEG & huile de ricin" }, terms:["peg","ricinus","castor","ricin"], match:["peg-","ricinus","castor"] },
  { id:"collagen", label:{ nl:"Dierlijk: collageen & DNA (vaak van vis)", en:"Animal: collagen & DNA (often fish)", fr:"Animal : collagène & ADN (souvent poisson)" }, terms:["collageen","collagen","collagène","vis","fish","poisson","dierlijk","animal","dna","adn","vegan"], match:["collagen","sodium dna"] },
  { id:"rosin", label:{ nl:"Colofonium (hars)", en:"Colophony (rosin)", fr:"Colophane" }, terms:["colofonium","colophonium","colophony","colophane","hars","rosin","resin"], match:["rosinate","colophonium","rosin","abietic"] },
  { id:"alcohol", label:{ nl:"Alcohol (ethanol, isopropyl)", en:"Alcohol (ethanol, isopropyl)", fr:"Alcool (éthanol, isopropylique)" }, terms:["alcohol","ethanol","alcool","éthanol","isopropyl"], match:["=alcohol","alcohol denat","ethanol","sd alcohol","isopropyl alcohol"] },
  { id:"seeds", label:{ nl:"Zaad- & olijfolie (zonnebloem, saffloer, druivenpit, olijf)", en:"Seed & olive oils (sunflower, safflower, grapeseed, olive)", fr:"Huiles de graines & d'olive (tournesol, carthame, raisin, olive)" }, terms:["zonnebloem","saffloer","druivenpit","olijf","olive","olive oil","zaad","sesam","sunflower","safflower","grapeseed","seed","tournesol","carthame","pepin","sesame"], match:["helianthus","carthamus","vitis vinifera","sesamum","olea europaea","olive","olivate"] },
  { id:"aloe", label:{ nl:"Aloë vera", en:"Aloe vera", fr:"Aloe vera" }, terms:["aloe","aloë"], match:["aloe"] },
  { id:"cereals", label:{ nl:"Granen (haver, tarwe, maïs)", en:"Cereals (oat, wheat, corn)", fr:"Céréales (avoine, blé, maïs)" },
    terms:["haver","tarwe","gluten","mais","maïs","graan","oat","wheat","corn","avoine","ble","blé"], match:["avena","triticum","hordeum","zea mays","corn","oat","wheat"] },
  { id:"soy", label:{ nl:"Soja", en:"Soy", fr:"Soja" }, terms:["soja","soy","soya"], match:["glycine soja","soybean","soy"] },
  { id:"licorice", label:{ nl:"Zoethout", en:"Licorice", fr:"Réglisse" }, terms:["zoethout","licorice","réglisse","reglisse"], match:["glycyrrhiza"] },
  { id:"jojoba", label:{ nl:"Jojoba", en:"Jojoba", fr:"Jojoba" }, terms:["jojoba"], match:["simmondsia"] },
  { id:"algae", label:{ nl:"Algen & zeewier", en:"Algae & seaweed", fr:"Algues" }, terms:["alg","algen","zeewier","jodium","seaweed","algae","algue","iode"], match:["algin","chondrus","fucus","laminaria","spirulina","algae","macrocystis","kelp"] }
];

/* ORDER OF USE — which products are used up first, and which stay.
   Each group lists its phases in order: phase 1 is used up first, the last
   phase is what stays in the salon for good. A product id may appear in
   one phase only. Add new products to the right phase when you buy them.
   In the app (your private link or salon mode → Ingrediënten → tab
   "Gebruiksvolgorde") you tap "Op" when a product is finished. That is
   saved on your phone. Then send the list to Claude, or put the ids in
   PRODUCTS_OP below and upload this file, so clients' phones know too.
   A product that is "op" is left out of the allergy search for everyone. */
const PRODUCT_ORDER = [
  { id:"facial", label:{ nl:"Gelaatsverzorging", en:"Facials", fr:"Soins du visage" }, phases:[
    { label:{ nl:"Eerst opgebruiken: Bio Balance, Safety 4 You (en de rest)", en:"Use up first: Bio Balance, Safety 4 You (and the rest)", fr:"À finir d’abord : Bio Balance, Safety 4 You (et le reste)" },
      ids:["algoageing","algorose","blueberry","collagenmask","luminoclear","goldmask","hyalift","thermomask","dnaserum"] },
    { label:{ nl:"Daarna: Dr. Renaud en Guinot", en:"Then: Dr. Renaud and Guinot", fr:"Ensuite : Dr. Renaud et Guinot" }, ids:[] },
    { label:{ nl:"Blijvend: Janssen Cosmetics", en:"To stay: Janssen Cosmetics", fr:"Définitif : Janssen Cosmetics" }, ids:["janssenmassage"] } ] },
  { id:"nails", label:{ nl:"Manicure & pedicure", en:"Manicure & pedicure", fr:"Manucure & pédicure" }, phases:[
    { label:{ nl:"Eerst opgebruiken: Bio Balance (en de rest)", en:"Use up first: Bio Balance (and the rest)", fr:"À finir d’abord : Bio Balance (et le reste)" }, ids:["indulgescrub","mellowmoist"] },
    { label:{ nl:"Blijvend: Gehwol en Gerlasan", en:"To stay: Gehwol and Gerlasan", fr:"Définitif : Gehwol et Gerlasan" }, ids:["gerlasan"] } ] },
  { id:"browlash", label:{ nl:"Wenkbrauwen & wimpers", en:"Brows & lashes", fr:"Sourcils & cils" }, phases:[
    { label:{ nl:"Blijvend: Mrs. Highbrow en RefectoCil", en:"To stay: Mrs. Highbrow and RefectoCil", fr:"Définitif : Mrs. Highbrow et RefectoCil" },
      ids:["refectoremover","refectooxliquid","refectooxcreme","refectotintremover","refectoprotect","refectotint","mrshighbrow"] } ] },
  { id:"massage", label:{ nl:"Massage", en:"Massage", fr:"Massage" }, phases:[
    { label:{ nl:"Eerst opgebruiken: Breezy Blossom, dan de kokosgeur-olie, dan De Tuinen", en:"Use up first: Breezy Blossom, then the coconut-scented oil, then De Tuinen", fr:"À finir d’abord : Breezy Blossom, puis l’huile parfum coco, puis De Tuinen" },
      ids:["breezyblossom","coconutoil","avocadooil","castoroil"] },
    { label:{ nl:"Blijvend: ZenGrowth-oliën", en:"To stay: ZenGrowth oils", fr:"Définitif : huiles ZenGrowth" }, ids:["almondoil","grapeseedoil","jojobaoil"] } ] }
];
// finished products (ids), for everyone — e.g. ["breezyblossom"]
const PRODUCTS_OP = [];
