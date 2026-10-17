/* PROTOCOLLEN — Sandra's own treatment protocols from school, per
   treatment: step, product, material. Shown only on Sandra's phone
   (salon mode → Ingrediënten → 📋 Protocollen, and under a match result).
   treat: the treatments in data.js it belongs to (empty = learned at
   school, not offered yet). */
const PROTOCOLS = [
{
"id": "droog",
"title": "Janssen – droge huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"Mild Creamy Cleanser",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Radiant Firming Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Diepe reiniging /peeling",
"Mild Face Rub",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Ev. extra reiniging (comedonen)\nPlaatselijk inmasseren",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue + comedonenring"
],
[
"Complex met actieve bestanddelen\nof Concentraat in ampul",
"Deep Xpress Moist Serum\n\nHyaluron Fluid",
""
],
[
"Massage: 20’",
"Hyaluron Replenisch Cream",
""
],
[
"Masker gelaat + hals: 15’",
"Deep Xpress Hydro Mask",
"Penseel + glazen schaaltje"
],
[
"Verwijderen masker",
"",
"Lamellen, vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Bescherming overdag/nacht",
"Super Hydrating Cream\nHydro Active Gel",
""
]
]
},
{
"id": "gemengd",
"title": "Janssen – gemengde huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen\nStrooi in de hand & mengen met water",
"Gentle Cleaning Powder",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Grondige reiniging /peeling",
"AHA + BHA Exfoliator",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Ev. extra reiniging (comedonen)\nPlaatselijk inmasseren",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue, comedonenring"
],
[
"Complex met actieve bestanddelen",
"Deep Xpress Moist Serum",
""
],
[
"Concentraat in ampul",
"Refining Retinol fluid (droge huid)",
""
],
[
"Massage: 20’",
"Massagecrème: Balancing Cream",
""
],
[
"Masker gelaat + hals: 15’",
"Intense Clearing Mask (T-zone) + Deep Xpress Hydro Mask\nPeel Off Dead Sea Black Mask + 90 mL water",
"Penseel + glazen schaaltje of maatbeker + spatel + mengkom"
],
[
"Verwijderen masker & drogen",
"",
"Lamellen, vochtige kompressen + tissues"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Bescherming overdag/nacht",
"Tinted Balancing Cream\nBalancing Cream",
""
]
]
},
{
"id": "gevoelig",
"title": "Janssen – gevoelige huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Micellair water",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"Soft Cleaning Mousse",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Soft Soothing Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Comfort Eye Care",
""
],
[
"Grondige reiniging /peeling \nIndien conditie van de huid het toelaat",
"Skin Refining Enzyme Peel",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Ev. extra reiniging (comedonen)\nPlaatselijk inmasseren",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue + comedonenring"
],
[
"Complex met actieve bestanddelen\nof Concentraat in ampul",
"Intense Calming Serum\n\nInstant Soothing Oil\nCouperose Fluid",
""
],
[
"Massage: 20’\nof Concentraat in ampul",
"Intense Calming Cream\nInstant Soothing Oil",
""
],
[
"Masker gelaat + hals: 15’",
"Instant Soothing Mask\nPeel Off Mask Aloe De-Stress",
"Penseel + glazen schaaltje of maatbeker + spatel + mengkom"
],
[
"Verwijderen masker",
"",
"Lamellen, vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Comfort Eye Care",
""
],
[
"Bescherming overdag/nacht",
"Intense Calming Cream",
""
]
]
},
{
"id": "vetterijp",
"title": "Janssen – vette, rijpe huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"Purifying Cleansing Gel",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Diepe reiniging /peeling",
"Enzyme Peeling Powder",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Na reiniging (comedonen)",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue + comedonenring"
],
[
"Concentraat in ampul",
"Refining Retinol Fluid",
""
],
[
"Massage: 20’",
"Balancing Cream",
""
],
[
"Masker gelaat + hals: 15’",
"Peel Off Dead Sea Black Mask",
"Maatbeker + spatel + mengkom"
],
[
"Verwijderen masker",
"",
"Lamellen, vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Bescherming overdag/nacht",
"Microsilver Serum\nRegulating Retinol Cream\nAHA Face Cream (niet in zomer)",
""
]
]
},
{
"id": "vet",
"title": "Janssen – vette huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"AHA + BHA Cleanser",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Diepe reiniging /peeling",
"AHA + BHA Exfoliator",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Ev. extra reiniging (comedonen)",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue + comedonenring"
],
[
"Complex met actieve bestanddelen\nof Concentraat in ampul",
"Purifying BHA Serum\n\nRefining Retinol Fluid",
""
],
[
"Masker gelaat + hals: 15’",
"Intense Clearing Mask\nPeel Off Dead Sea Black Mask",
"Penseel + glazen schaaltje of maatbeker + spatel + mengkom"
],
[
"Verwijderen masker",
"",
"Lamellen, vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Bescherming overdag/nacht",
"Microsilver Serum\nLight Mattifying Cream\nAHA Face Cream (niet in zomer)",
""
]
]
},
{
"id": "rijp",
"title": "Janssen – rijpe huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"Purifying Cleansing Gel",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Diepe reiniging /peeling",
"Enzyme Peeling Powder",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Na reiniging (comedonen)",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue + comedonenring"
],
[
"Concentraat in ampul",
"Refining Retinol Fluid",
""
],
[
"Massage: 20’",
"Balancing Cream",
""
],
[
"Masker gelaat + hals: 15’",
"Peel Off Dead Sea Black Mask",
"Maatbeker + spatel + mengkom"
],
[
"Verwijderen masker",
"",
"Lamellen, vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Bescherming overdag/nacht",
"Microsilver Serum\nRegulating Retinol Cream\nAHA Face Cream (niet in zomer)",
""
]
]
},
{
"id": "oncologisch",
"title": "Janssen – oncologische huid",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Micellair water",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"Soft Cleaning Mousse",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Soft Soothing Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Comfort Eye Care",
""
],
[
"Ev. extra reiniging (comedonen)\nPlaatselijk inmasseren",
"Purifying BHA Serum",
""
],
[
"Epileren/waxen + onzuiverheden verwijderen",
"Filmhars: Monoï",
"Pincet / hars + loupelamp + handschoenen + tissue + comedonenring"
],
[
"Complex met actieve bestanddelen",
"Intense Calming Serum",
""
],
[
"Concentraat in ampul + Massage: 20’",
"Instant Soothing Oil",
""
],
[
"Masker gelaat + hals: 15’",
"Instant Soothing Mask",
"Penseel + glazen schaaltje of maatbeker + spatel + mengkom"
],
[
"Verwijderen masker & drogen",
"",
"Lamellen, vochtige kompressen + tissues"
],
[
"Verfrissing & drogen",
"Tonic/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Comfort Eye Care",
""
],
[
"Bescherming overdag/nacht",
"Intense Calming Cream",
""
]
]
},
{
"id": "heren",
"title": "Janssen – herenverzorging",
"treat": [
"signaturefacial",
"expressfacial"
],
"intro": [
"Belangrijk:",
"Niet te veel dekens – mannen produceren zelf warmte!",
"Verhoorningsproblemen door veelvuldig scheren.",
"Wallen en kringen door vochtophoping: maskers, ontspannende behandelingen, oogkompressen",
"Niet op de dag zelf scheren – ongeschoren huid!",
"Massage niet tegen de haren/stoppels in strijken, altijd aanpassen aan de haargroeirichting.",
"Geen haarnet/bandeau",
"Vertel concreet wat hem te wachten staat",
"Hogere pijngevoeligheid"
],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Katoenenschijfjes"
],
[
"Reiniging & afnemen",
"Gel/ mousse/ hydrofiele olie: AHA + BHA Cleanser",
"Vochtige kompressen"
],
[
"Verfrissing & drogen",
"Toni/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Grondige reiniging /peeling",
"Enzymatische peeling/zuren",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"Epileren + onzuiverheden verwijderen + neusharen/ oorharen knippen",
"Filmhars: Monoï",
"Pincet / hars + schaartje + loupelamp + handschoenen + tissue"
],
[
"Concentraat in ampul",
"Refining Retinol fluid",
""
],
[
"Massage: 20’",
"Massagecrème: Relaxing Massage Cream 20’",
""
],
[
"Masker gelaat + hals: 15’",
"Deep Xpress Hydro Mask",
"Penseel + glazen schaaltje"
],
[
"Verfrissing & drogen",
"Toni/Lotion: Purifying Tonic",
"Katoenenschijfjes + tissues"
],
[
"Verwijderen masker & drogen",
"",
"Vochtige kompressen + tissues"
],
[
"UV-bescherming",
"UV-bescherming: Face Guard Advanced",
""
],
[
"Afronding oogzone",
"Ooggel: Aqualift Eye Gel",
""
],
[
"Bescherming overdag/nacht",
"Dagcrème / Nachtcrème",
""
]
]
},
{
"id": "botanisch",
"title": "Botanische intensieve verzorging Dr. Renaud",
"treat": [
"antiagefacial"
],
"intro": [
"Indicaties:",
"Tekenen van veroudering",
"Vale uitstraling",
"Pigmentatiestoornissen"
],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen",
"Reinigingsmelk",
"Lamellen sponzen + vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Oogcrème",
""
],
[
"Lipverzorging",
"Lippenbalsem",
""
],
[
"Bescherming kwetsbare delen: ogen",
"Reinigingslotion / Rozenwater",
"2 dubbelgeplooide wattenschijfjes"
],
[
"Grondige reiniging /peeling > dun laagje: 5’ + gedurende 2’ bewerken (doeltreffendheid verhogen)  dikkere huidtype: handen bevochtigen + 2’ extra bewerken",
"Désincrustation végétale intensive: 5’ + 2’",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling",
"",
"Lamellen sponzen + vochtige kompres"
],
[
"Stimuleren & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Epileren + onzuiverheden verwijderen",
"",
"Pincet + loupelamp + handschoenen + tissue"
],
[
"Concentraat in ampul volgens huidbehoefte (schudden + oogcontouren vermijden)\nDroog & vetarm: Hydraterend – beschermend – hertelt lipiden – regenererend \nAnti-age: Beschermend – regenererend – glans\nGevoelig/Couperose: Tolerantie verhogend – vermindert roodheid – beschermt haarvaten\nAcné / vette huid: Mattifiërend - eclat – hydraterend – kalmerend\nPigmentatie: Eclat, zuurstof – regenererend – verhelderend – anti-oxidant",
"Halve ampul :\nSoin Hydratant aux cellules souches de fleur pavot (droge, vetarme huid)\nSoin Anti-age aux cellules souches de fleur Jasmin (anti-age)\nSoin Apaisant aux cellules souches de centella asiatica (gevoelige en Couperose)\nSoin Purrifiant aux cellules souches de pivoin (zuiverend, vette huid, acné)\nSoin parfait aux cellules souches de lotus des neige (pigmentatie, ontgiftend)",
"Penseel + glazen schaaltje"
],
[
"Massage: 10’",
"Massagecrème: modelage intensive",
"Penseel + glazen schaaltje"
],
[
"Verwijderen massagecrème",
"",
"Lamellen sponzen + vochtige kompres"
],
[
"Stimuleren & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Concentraat in ampul volgens huidbehoefte (schudden + oogcontouren vermijden)",
"Halve ampul",
"Penseel + glazen schaaltje"
],
[
"Masker gelaat + hals: 20’ > randen niet te dik",
"90 mL water\n30g (90 mL) Masque pro hydratant intensive: 20’",
"Tissues nek + Spatel + flexibele mengkom + maatbeker"
],
[
"Verwijderen masker & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"UV-bescherming",
"",
""
],
[
"Bescherming overdag: hydrateren – gevoelige huid",
"Aangepaste hydraterende crème: prescription végétales intensive crème jeunesse apaisante & rééquilibrante",
""
]
]
},
{
"id": "fruitzuren",
"title": "Fruitzurenpeeling 4/26 Dr. Renaud",
"treat": [
"fruitacid"
],
"intro": [
"Vanaf september tot begin maart.",
"Belangrijk:",
"- Elke fruitzurenpeeling heeft een eigen gebruiksaanwijzing!   aanbevelingen van de leverancier!",
"- Laat de klant NOOIT alleen achter met de peeling!",
"- Vooraf informeren dat een prikkend/kriebelend gevoel volledig normaal is.",
"- Vraag tussendoor geregeld even naar het gevoel van de klant!",
"- Wijk nooit af van het protocol!",
"- Peeling 4/26 (boven: fruitzuur) altijd in combinatie met Solution Hydro-Neutralisante (onder: lotion)"
],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen (vermijd ogen)",
"Reinigingsgel",
"Lamellen sponzen + vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Epileren",
"Ontsmettingsmiddel 80% (pincet)\nEv. filmhars: Monoï",
"Pincet/harsverwarmer + wattenschijf + loupelamp"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Bescherming kwetsbare delen: ogen",
"Reinigingslotion / Rozenwater",
"2 dubbelgeplooide wattenschijfjes"
],
[
"Fruitzurenpeeling op gelaat: 2’ – max. 5’ hals > voorhoofd > wangen > neus > kraaienpootjes ooghoek + even aandrukken rimpels >\nWattenschijfjes omdraaien en herhalen",
"5 porties Peeling 4/26: 2’ laten rusten – max 5’",
"2 wattenschijfjes in glazen schaaltje"
],
[
"Verwijderen peeling met wattenschijfjes: wangen > neus > kraaienpootjes ooghoek > voorhoofd > hals\nWattenschijfjes omdraaien en herhalen",
"Lotion: SOLLUTION HYDRO-NEUTRALISANTE",
"2 wattenschijfjes in glazen schaaltje met lotion (tot kriebel weg is)"
],
[
"Reiniging huid",
"Lotion: SOLLUTION HYDRO-NEUTRALISANTE",
"3 x met vochtige warmtekompressen en watjes met lotion"
],
[
"Tonifieer & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Onzuiverheden verwijderen",
"",
"Loupelamp + handschoenen + tissue comedonenring"
],
[
"Masker semi-dikke laag op gelaat: 20’ – 25’",
"2,5 mL / kleine koffielepel serum lift & lumière\n30g (90 mL) maskerpoeder: Masque Jeunesse Lift Fermeté\n90 mL warm water (40°C)",
"Tissues nek + Spatel + flexibele mengkom + maatbeker"
],
[
"Verwijderen masker, tonifieer & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Massage: 15’ – 20’",
"Massagecrème modelage intensive",
""
],
[
"Verwijderen massagecrème",
"",
"Lamellen sponzen + vochtige kompres"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"UV-bescherming SFP50",
"UV-bescherming",
""
],
[
"Afronding - oogzone",
"Contour yeux lift & lumière",
""
],
[
"Serum",
"Serum lift & lumière",
""
],
[
"Bescherming overdag",
"Crème raffermissante lift & lumière",
""
]
]
},
{
"id": "hydrapeel",
"title": "Hydra Peeling Guinot",
"treat": [
"hydrapeel"
],
"intro": [
"Indicaties:",
"Tekenen van veroudering",
"Vale uitstraling",
"Pigmentatiestoornissen"
],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen",
"Reinigingsmelk",
"Lamellen sponzen + vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Oogverzorging (contouren)",
"Oogcrème: Longue Vie Yeux",
""
],
[
"Lipverzorging",
"Lippenbalsem",
""
],
[
"Bescherming kwetsbare delen: ogen",
"Lotion / Rozenwater",
"Wattenschijfje"
],
[
"Grondige reiniging /peeling > dun laagje: 7’ > om de 2’ over gelaat gaan (doeltreffendheid verhogen)  ev. prikkend en verwarmend effect > Regelmatig vragen of het nog gaat",
"HYDRA PH PEELING: 7’",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen  Brand? Afnemen met koude kompressen (afkoelen huid)",
"",
"Spatel + 3x vochtige kompressen + tissues"
],
[
"Epileren + onzuiverheden verwijderen",
"",
"Pincet + loupelamp + handschoenen + tissue"
],
[
"Massage: 10’",
"HYDRA NEUVE MASSAGE: 10’",
"Penseel + glazen schaaltje"
],
[
"Masker gelaat + hals: 10’",
"HYDRA BEAUTE MASK: 10’",
"Penseel + glazen schaaltje"
],
[
"Verwijderen masker & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"UV-bescherming",
"",
""
],
[
"Bescherming overdag/nacht",
"Dagcrème / Nachtcrème",
""
],
[
"Resultaten & advies: 24u geen zonblootstelling",
"",
""
]
]
},
{
"id": "liftsummum",
"title": "Lift Summum Guinot",
"treat": [
"liftsummere"
],
"intro": [
"Indicaties:",
"Tekenen van veroudering"
],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen",
"Reinigingsmelk",
"Lamellen sponzen + vochtige kompressen"
],
[
"Lotion & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Epilatie wenkbrauwen, bovenlip, kin",
"",
"Filmwax, spatel, waxheater, loupelamp, pincet."
],
[
"Oogverzorging (contouren)",
"Oogcrème: Longue Vie Yeux",
""
],
[
"Lipverzorging",
"Lippenbalsem",
""
],
[
"Bescherming kwetsbare delen: ogen",
"Lotion / Rozenwater",
"Wattenschijfje"
],
[
"Grondige reiniging /peeling: 5’",
"LIFT SMMUM EXFOLIATION: Double exfoliation",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling  2x afnemen met kompresdoeken Brand? Afnemen met koude kompressen (afkoelen huid)",
"",
"Spatel + 2x vochtige kompressen"
],
[
"Lotion & drogen",
"Tonic / Reinigingslotion",
"Tissues"
],
[
"Massage: 10’",
"LIFT SUMMUM MASSAGE: 10’",
"Penseel + glazen schaaltje"
],
[
"Rimpels vullen met ronddraaiende bewegingen en terug over elke rimpel strijken (4x herhalen) > knijpbewegingen en strijk terug op elke rimpel (2x herhalen)",
"LIFT SUMMUM FILLER: anti-wrinkle eraser",
"Applicatorbal"
],
[
"Masker gelaat + hals: 15’\nOgen > neus > mond (zacht aandrukken) > decolleté",
"LIFT SUMMUM FACE MASK : 15’\nLIFT SUMMUM DECOLLETE MASK : 15’",
"Penseel + glazen schaaltje"
],
[
"Verwijderen gezichtmasker & inmasseren",
"",
""
],
[
"Verwijderen decolletémasker & afnemen met kompressen",
"",
"Kompresdoeken (warm)"
],
[
"Lotion & drogen",
"Tonic / Reinigingslotion",
"Tissues"
],
[
"UV-bescherming",
"",
""
],
[
"Bescherming overdag/nacht",
"Dagcrème / Nachtcrème",
""
]
]
},
{
"id": "guinotzuiverend",
"title": "Zuiverende behandeling Équilibre Pureté Guinot (onzuiverheden, acne)",
"treat": ["expressuseup"],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen (vermijd ogen)",
"Reinigingsgel/-schuim: GEL NETTOYANT CITRON VERT (Dr. Renaud) / MICROBIOTIC CLEANSING FOAM (Guinot)",
"Lamellen sponzen + vochtige kompressen"
],
[
"Verfrissing & drogen igv. Dr Renaud producten, anders niet drogen/lotion",
"Tonic / Reinigingslotion: LOTION TONIQUE ASTRINGENTE CITRON VERT (Dr. Renaud)",
"Wattenschijfjes + tissues"
],
[
"Epileren",
"Ev. filmhars: Monoï",
"Pincet/harsverwarmer + loupelamp"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Grondige reiniging /peeling > T-zone > volledige gelaat: 3’ (vermijd ogen)",
"HEATING EXFOLIATER (Guinot): 3’",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling zonder drogen",
"",
"2x warmte kompressen"
],
[
"Masker gelaat (dun op gaas vanaf voorhoofd): 10’",
"PURIFYING MASK (Guinot): 10’",
"Gaas + penseel + glazen schaaltje"
],
[
"Verwijderen masker zonder drogen",
"",
"2x warmte kompressen"
],
[
"Acné + comedo’s verwijderen + vapozone (max 5’ bij couperose)",
"",
"Vapozone met Ozon + (ev. vochtige wattenschijfjes op rode huid) + loupelamp + handschoenen + tissue"
],
[
"Milia verwijderen (na vapo)",
"",
"Naald + tissue + comedonenring"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion: LOTION TONIQUE ASTRINGENTE CITRON VERT – Dr. Renaud",
"Wattenschijfjes + tissues"
],
[
"- Massage (geen act. acné): 10’ \n- Hoogfrequentie-apparaat: 5’ (actieve acné/rosacea)",
"Indien geen actieve acné: massagecrème modelage intensive",
"Acné: Gaas + hoogfrequentie-apparaat"
],
[
"Verwijderen massagecrème",
"",
"Lamellen sponzen + vochtige kompres"
],
[
"UV-bescherming",
"",
""
],
[
"Serum (vermijd ogen)",
"ACNILOGIC CREAM SERUM (Guinot)",
"Penseel + glazen schaaltje"
],
[
"Naverzorging",
"ACNILOGIQUE GEL\nDag-/nachtcrème",
""
]
]
},
{
"id": "bbpeeloff",
"title": "Peel-off maskers Bio Balance",
"treat": [
"expressuseup"
],
"intro": [],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen",
"Reinigingsmelk",
"Lamellen sponzen + vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Grondige reiniging /peeling",
"Enzymatische peeling",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Lamellen sponzen + vochtige kompressen + tissues"
],
[
"Epileren + onzuiverheden verwijderen",
"",
"Pincet + loupelamp + handschoenen + tissue"
],
[
"Massage: 20’",
"Massagecrème: 20’",
""
],
[
"Poriën openen + serum",
"Hyluronzuurserum: Hya-lift Plus",
"Warm vochtig kompres + pipet serum"
],
[
"Oogverzorging (contouren)",
"Oogcrème",
""
],
[
"Lipverzorging",
"Lippenbalsem",
""
],
[
"Masker gelaat + hals: 20’\n- Kamille: gevoelige, droge huid\n- Lavendel: rijpe vochtarme huid\n- Roos: normale – gemengde huid",
"40g poedermasker\n120 mL Essence Gel",
"Mengkom + spatel"
],
[
"Verwijderen masker & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Serum",
"Hyluronzuurserum: Hya-lift Plus",
"Pipet serum"
],
[
"UV-bescherming",
"",
""
],
[
"Bescherming overdag/nacht",
"Dagcrème / Nachtcrème",
""
],
[
"Resultaten & advies: dagelijks aanbrengen op gereinigde huid (onder dagcrème)",
"",
""
]
]
},
{
"id": "bbparaffine",
"title": "Paraffinemaskers Bio Balance",
"treat": [
"expressuseup"
],
"intro": [
"Paraffine smelten."
],
"rows": [
[
"Reiniging ogen + lippen",
"Eye make-up remover",
"Wattenschijfjes"
],
[
"Reiniging & afnemen",
"Reinigingsmelk",
"Lamellen sponzen + vochtige kompressen"
],
[
"Verfrissing & drogen",
"Tonic / Reinigingslotion",
"Wattenschijfjes + tissues"
],
[
"Huidanalyse",
"",
"Spatel + loupelamp + ev. woodlight"
],
[
"Grondige reiniging /peeling",
"Enzymatische peeling",
"Penseel + glazen schaaltje"
],
[
"Verwijderen peeling & drogen",
"",
"Lamellen sponzen + vochtige kompressen + tissues"
],
[
"Epileren + onzuiverheden verwijderen",
"",
"Pincet + loupelamp + handschoenen + tissue"
],
[
"Serum / Ampoule aanbrengen en inmasseren",
"DNA Rejuvenating Serum\nAmpoule met actieve ingrediënten",
"Potje + maskerkwast"
],
[
"Lipverzorging",
"Lippenbalsem",
""
],
[
"Masker gelaat: 15’ - 20’\nTest temperatuur pols > aanbrengen met houten spatel (afgelijnde randen & 1-2 mm dikte)",
"Paraffinemasker DNA Thermo Mask",
"Houten spatel"
],
[
"Verwijderen masker mbv spatel",
"",
"Houten spatel"
],
[
"Bescherming overdag/nacht  lichtjes inmasseren",
"Dagcrème / Nachtcrème\nCollageen Elastine Plus",
""
]
]
},
{
"id": "henna",
"title": "Henna Brows",
"treat": [
"hennabrows"
],
"intro": [
"Intake + patchtest min. 48u op voorhand > allergie = zeep + water",
"HENNA wenkbrauwverf – Kleurkeuze wenkbrauwen afstemmen met kleurtoon hoofdhaar.",
"Contra’s:",
"Blond, dun haar, lichte huid",
"<16j",
"Heel vette huid",
"Zwanger",
"Heel donkere/volle wenkbrauwen",
"Net voor zonvakantie",
"Eczeem",
"Allergie"
],
"rows": [
[
"Aanmaak henna > 15 min indikken",
"Henna poeder: 1 schep\nTreatment Enhancer: 8-12 druppels",
"Cosmetic Dish/mengpotje + angled brow brush"
],
[
"Reiniging wenkbrauwen & afdrogen",
"Skin Prep Lotion",
"Wattenschijfjes + tissues"
],
[
"Brow mapping: neus - browbasis > hoogste punt = iris > browstaart > dikte brow > hoogste punt + aftekenen & bespreken met klant",
"",
"Nitril handschoenen, mapping touw, browpotlood, spiegel"
],
[
"Brow shaping: afstrijken wax, test warmte pols, waxen. Opspannen huid, afstrijken met haargroeirichting mee, aftrekken in een paar keren, hand erop leggen. Onder brow > boven brow > tussen brows + ev. bovenlip (v neus naar mondhoek). Resten met pincet weghalen.",
"Monoï filmhars: stand 5",
"Houten spatel, loepelamp, pincet."
],
[
"Contouren brows: rond brows aanbrengen voor strak resultaat",
"Contour paste",
"Vochtige, platte, rechthoekige penseel"
],
[
"Inkleuren brows: laagje midden naar staart > laagje basis naar midden > 2e dikke laag + stempelen midden naar staart > > 2e dikke laag + stempelen basis naar midden \nTimer aanzet: 5-7 min (ombré)\nVette huid: max 7 min\nDroge huid: max 6 min\nTimer rest: 15 min\nAFDROGEN brows",
"Aangemaakte hennakleurstof",
"Angled brow brush + vochtig wattenstaaf aanzet (water) ; vochtig wattenschijf rest (tint remover + water) + tissue"
],
[
"Contouren",
"Tint remover",
"Wattenstaafje"
],
[
"Adviseer klant: 24u droog +  niet in direct zonlicht + bespreek resultaat: felheid vervaagt na paar dagen + afspraak na 6 weken",
"",
"Spiegel"
],
[
"Kleur",
"Honey",
"Taupe"
],
[
"Aanwijzing",
"Zeer lichte brows",
"Blond > donker blond"
]
]
},
{
"id": "browlift",
"title": "Brow Lift / Lamination",
"treat": [
"browlift"
],
"intro": [
"RefectoCil wenkbrauw en wimperverf – Kleurkeuze wenkbrauwen afstemmen met kleurtoon hoofdhaar. Lichte wenkbrauwen zichtbaar maken."
],
"rows": [
[
"Reiniging wenkbrauwen & afdrogen",
"Olievrij product /\nSkin Prep Lotion",
"Wattenschijfjes + handschoenen"
],
[
"Kam brows in gewenste richting met dun laagje adhesive",
"Adhesive",
"Spoolie / lifting tool (Y-comb)"
],
[
"Stap 1: Liften en afdekken met folie. 4 – 10 min (fijn > stug haar)",
"Step 1 Lifting Lotion",
"Applicator / microbrush + folie"
],
[
"Verwijder folie & lifting lotion van onder naar boven volgens haargroeirichting",
"",
"Wattenstaaf"
],
[
"Stap 2: Fixeren en afdekken met folie. 6 – 12 min (fijn > stug haar)",
"Step 2 Fixing Lotion",
"Applicator / microbrush + folie"
],
[
"Verwijder folie & fixing lotion van onder naar boven volgens haargroeirichting",
"",
"Wattenstaaf"
],
[
"Ev. kleuren: treatment enhancer & afdrogen",
"Treatment enhancer",
"Wattenschijfje + tissue"
],
[
"Shapen: mappen, epileren / waxen, bijknippen > na aftekenen navragen bij klant",
"Filmwax",
"Mapping aftekentouw +  wenkbrauwpotlood + mappingsticker+ pincet + schaar + spiegel"
],
[
"Ev. kleuren: hybrid dye of max 3% oxidatiemiddel: 1 dunne laag > 2e dikke laag + stempelen > aanzet: 3 min; rest: 5 min (ombré)",
"Hybrid dye developer: 1 deel (grootte: erwt)\nVerf hybdrid dye: 2 delen (tenzij subtieler -> 1 deel)",
"Cosmetic Dish/mengpotje + angled brow brush + vochtig wattenstaaf aanzet; vochtig wattenschijf rest"
],
[
"Ev. kleuren: verf strakker maken & foutjes corrigeren",
"Tint remover",
"Wattenstaafje"
],
[
"Verwijder verf & ev. naspoelen",
"",
"Droog wattenschijf + naspoelen met vochtig wattenschijf"
],
[
"Verzorgende gel: voeden en hydrateren > laten opdrogen",
"Step 3 Nourishing Gel",
"Lip brush"
],
[
"Adviseer klant: 24u droog +  niet in direct zonlicht + kammen + toon resultaat + afspraak na 8 weken",
"",
"Spiegel + spoolie"
],
[
"Nr.",
"1",
"1.1"
],
[
"Kleur",
"Diepzwart",
"Grafiet"
],
[
"Aanwijzing",
"Bij iedereen.",
"Bij grijs-gemêleerd/wit haar."
],
[
"Minuten",
"5-10",
""
],
[
"Nr.",
"3.1",
"4"
],
[
"Kleur",
"Lichtbruin",
"Kastanje"
],
[
"Aanwijzing",
"Ideaal bij lichtblond tot lichtbruin haar",
"Kastanjeachtige glans vanaf middelbruin haar. Intensief bij lichtblond tot lichtbruin haar."
],
[
"Minuten",
"5-10",
"10"
]
]
},
{
"id": "lashlift",
"title": "Lash Lift",
"treat": [
"lashlift"
],
"intro": [
"RefectoCil wenkbrauw en wimperverf – Kleurkeuze wenkbrauwen afstemmen met kleurtoon hoofdhaar. Lichte wimpers zichtbaar maken."
],
"rows": [
[
"Reiniging huid rond de ogen & afdrogen",
"Olievrij make-upremover /\nMicellair water",
"Wattenschijfjes + handschoenen"
],
[
"Optrekken hangende oogleden (ev.)",
"",
"Microporeuze tape"
],
[
"Oogbescherming onder ogen op de onderwimpers, tenzij meekleuren onderwimpers",
"Skin Protection Cream",
"Eye Pads / Protection Papers + microporeuze tape"
],
[
"Rods maatbepaling & vastzettten",
"Adhesive",
"Lifting Rods / Lash Lift Shields"
],
[
"Breng dun laagje lijm op Shields/rods. Wimpers kammen en fixeren.",
"Adhesive / Glue Balm",
"Y-comb / Lash Elevation Brush / Applicator"
],
[
"Stap 1: Liften van wortel tot 2/3e wimpers > 6’ (5-8 min)",
"Lotion 1 Lifting Cream",
"Micro brush + Lash Lift Compensators"
],
[
"Verwijder Lotion 1: droog > nat > droog",
"",
"Lip brush + vochtig wattenschijf/-staaf + tissue"
],
[
"Stap 2: Setten van wortel tot 2/3e wimpers > 6’ (5-8 min)",
"Lotion 2 Setting Cream",
"Micro brush + Lash Lift Compensators"
],
[
"Verwijder Lotion 2: droog > nat > droog",
"",
"Lip brush + vochtig wattenschijf/-staaf + tissue"
],
[
"Kleuren met zwart/ donker bruin in een dikke laag wimpers volledig bedekken > 6’ (5-6 min)",
"Tint ontwikkelaar: 5 druppels Oxidant vloeibaar /10 druppels Oxidant crème\n1 cm tintpasta",
"Cosmetic Dish / mengpotje + houtenspatel + angled brow brush"
],
[
"Verwijder verf van wortel naar wimperpunt (niet in ogen)",
"Prikken = spoelen > buiten naar binnen",
"Lip brush / vochtig wattenstaaf"
],
[
"Verzorgende olie: voeden en neutraliseren > zigzaggend over rods/shields + eronder (lijm verwijderen) > 1 min of langer",
"Lotion 3 Conditioning Oil",
"Lip brush"
],
[
"Reinig huid en wimpers + drogen",
"",
"Vochtig wattenschijf + tissue"
],
[
"Wimpers borstelen",
"",
"Spoolie"
],
[
"Onderzijde wimpers ontvetten en verven indien voldoende haren > 8 - 10 min",
"Olievrij make-upremover / Micellair water\nTint ontwikkelaar: 5 druppels Oxidant vloeibaar /10 druppels Oxidant crème\n1 cm tintpasta",
"Wattenschijfjes + Cosmetic Dish/mengpotje + houtenspatel + angled brow brush"
],
[
"Verwijder verf van wortel naar wimperpunt (niet in ogen)",
"Prikken = spoelen > buiten naar binnen",
"Lip brush / vochtig wattenstaaf"
],
[
"Adviseer: 24u droog + borstelen + toon resultaat + afspraak na 6 weken",
"",
"Spiegel + spoolie"
],
[
"Nr.",
"1",
"1.1"
],
[
"Kleur",
"Diepzwart",
"Grafiet"
],
[
"Aanwijzing",
"Bij iedereen.",
"Bij grijs-gemêleerd/wit haar."
],
[
"Minuten",
"5-10",
""
],
[
"Nr.",
"3.1",
"4"
],
[
"Kleur",
"Lichtbruin",
"Kastanje"
],
[
"Aanwijzing",
"Ideaal bij lichtblond tot lichtbruin haar",
"Kastanjeachtige glans vanaf middelbruin haar. Intensief bij lichtblond tot lichtbruin haar."
],
[
"Minuten",
"5-10",
"10"
]
]
},
{
"id": "hotstone",
"title": "Hot Stones massage",
"treat": [
"hotstone"
],
"intro": [
"1 grote handdoek onder het lichaam, 1 kleine handdoek onder het hoofd, 1 grote handdoek in de lengte over het zichtvlak + benen (ondergoed/broek goed bedekken), 1 kleine in lengte over buik + ev  1 handdoek onder de knieën oprollen + gastendoek in verwarmer + 4 kleine handdoeken om stenen vast te houden rond voeten en handen",
"Warmte ok? + Nooit op knieën!",
"Contra: spataders, hoge bloeddruk, diabetes, koorts, wondes, anti-depressiva, zwangere vrouwen.",
"Heater op 55 graden max 10 min > 45 – 50 graden (behandeling) > doekje ernaast voor te warme stenen even te laten afkoelen"
],
"rows": [
[
"3 grote stenen op buik (op handdoek, onder deken): thv borst, navel en onderbuik",
"",
"3 maxi stenen (buik) + 1 kleine handdoek + deken"
],
[
"Voeten – enkel – voorzijde benen\nVolledige been: effleurage (olie)\n2 grote stenen: 4x Effleurage simultaan lengte zijkanten > 4x cirkelvormig op dijen > 4x kruiselings  stenenwissel\nVoet: 1 grote steen op en 1 grote steen onder de voet van hiel naar tenen (kleine steen tss vliezen)  stenenwissel\nVoetmassage: uitwringen voet (duim op hiel naar tenen) > rotatie voet > tegenduwen + trekken > cirkels rond enkels \n1 grote steen voetzool + 4 kleine steentjes tussen tenen en voet inwikkelen in kleine handdoek",
"Massageolie",
"2x 2 grote stenen benen + voeten (+ 8 kleine stenen tussen tenen); 1 kleine handdoek"
],
[
"Armen: effleurage (olie)\n2 middelgrote stenen: 4x Effleurage simultaan lengte > 4x cirkelvormig> 4x simultaan lengte\nHand: 1 middelgrote steen in handpalm en 1 middelgrote steen op handrug (naar vingertoppen)\nHandmassage: 1 middelgrote steen in handpalm + 1 kleine steen tss vliezen van pink naar duim (4x)\nZonder stenen:\nDruk en trekbeweging op handpalm en vingers (draaien en trekken aan kootje)\nMet stenen:\n1 middelgrote steen in handpalm + 1 kleine steen cirkels op pols (4x)\nZonder stenen:\nhandpalm (cirkels en uitwrijven en trekken aan vingers van duim naar pink)\n1 middelgrote steen in handpalm + inwikkelen in kleine handdoek",
"Massageolie",
"2x 2 middelgrote stenen armen en handen; 1 kleine steen tussen vliezen; 1 kleine handdoek"
],
[
"Gelaat: stenen rechtop houden, dan platte zijde op de huid\nVoorhoofd: tss wenkbrauwen naar haarlijn (naar buiten)\nWenkbrauwen: onder aanzet brows en naar slapen\nOgen: slapen > wallen > neusbrug > neusvleugels\nMond: Boven lippen (net onder neus) > jukbeen naar oor >  mondhoeken > onder de lippen > kin > onderkaak naar slapen > cirkels\n4x de stappen voor gelaat \nEindigen: 1 steen tss brows + 1 steen op kin (eventueel ook even over decolleté richting schouders)",
"",
"2 kleine stenen gelaat"
],
[
"3 grote stenen op rug (op handdoek, onder deken): tss schouderbladen, midden vd rug, onderrug",
"",
"3 maxi stenen (buik) + 1 kleine handdoek + deken"
],
[
"Achterzijde benen\nVolledige been: effleurage (olie)\n2 grote stenen: 4x Effleurage simultaan lengte > 4x cirkelvormig > 4x kruiselings  stenenwissel\n- 1 steen thv enkel + 1 steen thv heup en naar elkaar toe en steek over de knie > terugglijden > terug naar elkaar toe en oversteken (4x)\n- 4x lengte effleurage met stenen > 1 steen boven de voet en 1 aan voetzool om stenen weg te nemen  stenenwissel",
"Massageolie",
"4 grote stenen benen + voeten"
],
[
"Rug – nek – schouders: \nVolledige rug: T-zone > dwarse effleurages > cirkelvormige effleurages (olie)\nSchouders: \n2 Kleine stenen: 1 kleine steen voorzijde schouder (wijsvinger) en 1 kleine steen monnikapspier (duim)> naar boven en buiten afrollen (schouder per schouder)\n- 1 kleine steen nek thv 7e nekwervel + 1 kleine steen met duim van schouder naar schouderblad afrollen (plat) en naar buiten\n- 1 kleine steen nek thv 7e nekwervel + van binnen dwarse effleurage naar buitenzijde schouder\n- 2 kleine stenen onderaan naast wervelkolom cirkels (rechtop op de huid) naar boven en terug (4x)\nVolledige rug: \n2 Middelgrote stenen: \n4x lengte effleurage > 4x cirkels (3 grote verdeeld over schouderblad, ribbenkast en lende) van boven naar beneden > 4x kerstboom > 4x 8-jes (lemniscaat beide zijden om beurten) 1 doet de 8, de andere steen onderaan andere zijde leggen > 4x taille trekken simultaan en afwisselend omhoog + omlaag met steen > 4x dwars over lengte vd rug > 4x effleurage T-schirt\nEinde: stenen verwijderen en lichaam afdrogen",
"Massageolie",
"2 middelgrote stenen rug; 2 kleine stenen rug"
]
]
},
{
"id": "rugmassage",
"title": "Rugmassage 30′ / lichaamsmassage 60′",
"treat": [
"swedishbackneck",
"swedish"
],
"intro": [
"1 grote handdoek onder het lichaam, 1 kleine handdoek onder het hoofd, 1 grote handdoek in de lengte over het zichtvlak + benen (ondergoed/broek goed bedekken), 1 kleine in lengte over buste + ev  1 handdoek onder de knieën."
],
"rows": [
[
"Lichaam afdekken (persoon ligt met rugzijde omhoog)",
"",
""
],
[
"1ste contact: wrijving schouder naar schouder",
"",
""
],
[
"Intermitterende druk van schouder tot voet: schouder > zijkant onderrug > bips > bovenbeen > onderbeen > voetzool > hielen > andere voetzool > andere onderbeen > andere bovenbeen > andere bips > andere onderrugzijde > andere schouder > schouderbladen tegelijk",
"",
""
],
[
"Wrijvingen over handdoek over de rug naar hoofd > hoofd (onder-achterzijde schedel)",
"",
""
],
[
"Hoofdmassage: plaatselijke drukdraaibeweging over gehele hoofd (in stukjes van onder naar boven) en dan draaiend over gehele hoofd -> even halt bij slapen",
"",
""
],
[
"Effleurage nek en schouders: Schouderbladen, bovenarm meenemen",
"",
""
],
[
"Petrissage/kneden hals met volledige platte hand (stukje van hoofd en stukje van 7e nekwerkvel naar hals gaan om het goed te kunnen kneden in de hals) > petrissage bovenkant schouder (rechts) \nDuimstrijken schouder en van zone tss ruggenwervel schouderblad naar bovenkant schouder (rechts) en terug > van ruggenwervel over schouderblad van boven in stroken naar beneden gaan (tot onderzijde schouderblad) en terug > wrijven met hand over de rug -> houdt contact met 1 hand en wissel van kant (herhaal aan andere zijde)",
"",
""
],
[
"Aan hoofduiteinde staan – frictie opwaarts naast de ruggenwervel en naar buiten richting de schouderkop 3x (eindigen met duimen even duwen bovenzijde schouder in putje) (L-vorm maken, schouderbladen volgen) > eindeffleurage hals + schouder(deel bovenarm meenemen)",
"",
""
],
[
"Bovenarm en schouder effleurage (arm naast de tafel laten hangen): boven elleboog naar schouder en schouderblad en terug 3x > arm omhoog tillen zodat je onderkant van de bovenzijde kunt effleureren  > schouder meenemen > van elleboog naar vingers effleureren \nPetrissage van elleboog naar schouder en terug in kleine zones 3x > effleureren van schouder naar elleboog 2x > duimstrijken van elleboog naar schouder en strijk met vlakke hand terug in 6 zones > losschudden arm \nPols en elleboog op de onderrug van de klant > schouderblad omhoog doen komen, met jouw linker onderarm onder bovenarm klant leggen en hand onder schouderkop > rechterhand in gleuf van schouderblad duwen en 2-3 vingers strijken van onder naar boven (gleuf schouderblad) tot schouderkop en zak terug via buitenzijde naar onder en terug in de gleuf van het schouderblad 3x > snijbeweging met pinkzijde van de hand over de gleuf van het schouderblad (zo diep mogelijk) 3x > arm naast lichaam plaatsen zodat je drukdraaibeweging met 2 handen op schouderblad kunt uitvoeren en dan via schouder naar arm en vingers effleureren. \nEindeffleurage arm (arm naast tafel laten hangen): 3x lange strijkingen van elleboog naar schouder en terug > sandwich greep bovenarm en naar vingertoppen toe > arm terug naast lichaam van de klant plaatsen -> afdekken, houdt contact met 1 hand en wissel van kant (herhaal aan andere zijde)",
"",
""
],
[
"Handdoek net onder onderbroek -> sta aan hoofduiteinde > effleurage gehele rug: effleurage T-shirt > onderrug paar cirkels maken en terug omhoog > zigzag met 2 handen en onderarm op 1 zijde van de rug 3x en dan andere zijde > T-shirt effleurage schouders erbij nemen > met 2 handen naast elkaar over wervelkolom van nek naar romp (rechterheup)",
"",
""
],
[
"Kneden/petrissage via romp naar oksel en schouderblad 3x > dwars huid afrollen van ruggenwervel naar zijkant en van bekkenrand naar oksel en schouderblad toe > 2 handen op elkaar en schouderbladen cirkelvormig effleurages > stevige strijking  met muisvan de hand over boven- en onderarm en terug over schouderbladen richting romp > 1 hand van romp naar boven -> houdt contact met 1 hand en wissel van kant (herhaal aan andere zijde)",
"",
""
],
[
"Sta aan hoofduiteinde en maak 2 vlakke vuisten over de rug van nek naar heupen en met vlakke hand terugkomen (in 3 stroken steeds meer naar buiten toe en terug) > fricties via ruggenwervel van nek naar beneden (met duimen cirkels maken) en terugkomen met kattenkrab en kerstboom effleurage (aan zijkant staan) > dwarse effleurages onderrug naar boven en terug en extra effleurage T-shirt > afdekken bovenlichaam",
"",
""
],
[
"Rug – nek – schouders: \nVolledige rug: Cirkels [schouderbladen > ribbenkast > lende (net boven heupen)] > effleurage T-shirt > effleurage tot oksels > duim omhoog + vlakke hand omlaag \nLinkerzijde: effleurage (lengte + dwars) > cirkels > kneden (lengte + dwars) > afrollen (lengte + dwars) > monnikapspier kneden + afrollen + draineren > schouderblad snijden > taille afslanking > afrollen/duim-over-duim langs wervelkolom\nRechterzijde: effleurage (lengte + dwars) > cirkels > kneden (lengte + dwars) > afrollen (lengte + dwars) > monnikapspier kneden + afrollen + draineren > schouderblad snijden > taille afslanking > afrollen/duim-over-duim langs wervelkolom\nVolledige rug: \nEffleurage duim tss wervels > vibratie langs ruggengraat> effleurage T-shirt > kneden 7e halswervel + schouders R+L > effleurage T-shirt > schouderblad schouders: lichte druk",
"",
""
],
[
"Bil: effleurage > petrissage/kneden > afstrijken richting bilnaad ev met kattenkrab > tappoteren > eindeffleurage\nGehele been en bil effleureren > petrissage van enkel naar bil en terug > achillespees > duimstrijken van enkel naar bil en met vlakke hand terugkomen (onderbeen 2-lingspier simultane v-tjes) 2x > tappoteren gehele been > optillen onderbeen en losschudden > zit op tafel + voet op schouder > enkel naar knieholte en roteren beweging terug 3x > losschudden en terugplaatsen > eindeffleurage > lichte strekking been > afdekken en herhalen op andere zijde",
"",
""
],
[
"Afsluiten: handdoek heel lichaam bedekken, wrijven over gehele lichaam > optillen handdoek en vragen een klant om om te draaien met hoofd op de tafel > toedekken klant",
"",
""
],
[
"Effleurage gelaat: voorhoofd naar slapen 3x > over wenkbrauw naar slapen 3x > tss brows over neus (rechter zijde neus linkerduim en andersom) 3x > duim in holte naast neusvleugels en cirkels naar buiten toe maken > vingers over wangen cirkelen naar buiten toe > bovenlip tot kaaklijn 3x > kin tot hoek kaaklijn 3x > plukken wenkbrauwen van binnen naar buiten 3x beide zijden > plukken wangen beide zijden > plukken kaaklijn oor tot oor > masseren van de oren en eindigen met snijbeweging achter de oren > handen rusten op oorschelpen > hoofd op handdoek leggen (verhogen)",
"",
""
],
[
"Effleurage hals en schouders 3-5x/beweging: decolleté van schouder naar schouder met olie inwrijven > van schouder naar nek > achterzijde nek > ene schouder naar andere en dan nek tot boven oren en omgekeerd > optillen hoofd en langzaam opzij draaien > hoofd blijven ondersteunen + petrissage hals van schedelrand naar schouder > strijkingen met vingertoppen van schouder tot borstbeen (voor en achterzijde sleutelbeen) > circulatie op schouderkop met handpalm > petrissage trapezius (tussen schouderkop en nek achterzijde) > doorstrijken naar schedelrand > hoofd rechtdraaien voor paar tellen en naar andere zijde > hoofd blijven ondersteunen + petrissage hals van schedelrand naar schouder > strijkingen met vingertoppen van schouder tot borstbeen (voor en achterzijde sleutelbeen) > circulatie op schouderkop met handpalm > petrissage trapezius (tussen schouderkop en nek achterzijde) > doorstrijken naar schedelrand > hoofd rechtdraaien > eindeffleurage van linkerschouder naar rechterschouder + hals en andere zijde > lichte druk op beide schouders.",
"",
""
],
[
"Effleurage arm: onderarm naar schouder > petrissage pols naar schouder en terug > duimstrijken van pols naar schouder en met vlakke hand terugkomen en herhalen > met 2 handen eindeffleurage > handen in elkaar en pols rotatie in beide richtingen > hand buigen naar achter en voren > duimstrijken over rug van de hand > met duim snijbewegingen tss middenhandsbeentjes van duim naar pink > trekken en draaien van de vingers tussen wijs- en middelvinger > hand omdraaien voor duimstrijkingen pols en handpalm > met de handen tussen klant’s pink en duim en drukken op de kussentjes > eindeffleurage met 2 handen 3x omhoog en omlaag van pols naar schouder en terug > (handshake) arm zachtjes schudden tot gelijk met schouders > strek arm en voer lichte strekking van de schouder door over jouw arm te plaatsen > petrissage borstspier van oksel tot oksel > naar andere zijde > begin opnieuw met effleurage andere arm.\nBeide armen naast het hoofd -> vraag om diep in te ademen en bij uitademing lichte strekking van armen (3x).",
"",
""
],
[
"Effleurage gehele romp (buikzijde): effleurage van borstkas naar buik aan hoofdzijde met gespreide vingers > petrissage zijkant romp van heup tot oksel en terug (herhaal paar keren) aan zijkant staan & wanneer naar oksel, de andere hand op schouderkop laten glijden > huidrollen van heup tot net onder de ribben van de zijkant van de romp naar het centrum van de buik > dwarse effleurage van gehele breedte van de romp tot schouder > herhaal andere zijde.",
"",
""
],
[
"Massage dikke darm: kloksgewijs draaiende effleurages met 2 handen op elkaar van onder rechter rib door naar de linker heup 3x herhalen >",
"",
""
],
[
"Massage dunne darm: vanuit alle richtingen met ‘kommetjes’ van jouw handen uitstrijken naar de navel > eindeffleurage met zonnetje en maantje (halve draai met linker hand en volledige cirkels met rechter hand) > van onder navel naar borstkas effleureren en dan naar oksels en naar de heupen > van heupen naar oksels effleureren > afdekken bovenlichaam.",
"",
""
],
[
"Effleurage gehele been (lengte + kruiselings)> petrissage/knedingen van enkel naar lies en terug > achillespees > duimstrijken van enkel naar lies en met vlakke handstrijking terugkomen (onderbeen 2-lingspier simultane v-tjes) 2x > tappoteren (klakken) bovenbeen > petrissage knie > frictie (cirkels) rond kniegewricht tegen klokrichting in met 2 vingers > zachtjes losschudden knieschijf met hand boven en onder knieschijf en dan naar links en rechts bewegen met 2 vingers per hand > kommetje maken met hand en kloksgewijs draaien op kniegewricht met 2 handen op elkaar > eindeffleurage been (1 hand naar lies en ander naar enkel) > effleureren volledige been tot over de voet > lichte strekking been > voetrotatie beide richtingen terwijl je 1 hand onder achillespees plaatst > buig voet naar achteren en naar voren > losschudden voet (door handen links en rechts op de enkels te plaatsen en naar boven en beneden te bewegen) > wringen van de voet van enkels naar tenen > strijk met duim tussen middenvoetsbeentjes van kleine teen naar grote teen > trekken en draaien van de tenen met duim, wijsvinger en ringvinger > vlakken vuist langs onderzijde van de voet strijken van tenen naar hiel > eindeffleurage voet en naar lies en terug > afdekken en herhalen op andere zijde.",
"",
""
],
[
"Afsluiten door van boven naar onder handdoek plat te strijken langs weerszijden.",
"",
""
]
]
},
{
"id": "lichaamsmassage",
"title": "Lichaamsmassage (ontspanning)",
"treat": [
"swedish",
"swedishlegs"
],
"intro": [
"1 grote handdoek onder het lichaam, 1 kleine handdoek onder het hoofd, 1 grote handdoek in de lengte over het zichtvlak + benen (ondergoed/broek goed bedekken), 1 kleine in lengte over buste + ev  1 handdoek onder de knieën."
],
"rows": [
[
"Voeten – enkel – voorzijde benen\nVolledige been: 3x Effleurage\nVoet: volle hand > duimmuisspier voetwortelbeentjes > vingers vliezen (klein > groot) > effleurage hallux valgus > uitdraaien tenen > vuist voet > losdraaien voet\nOnderbeen: effleurage (lengte + dwars) > kneden (cirkels) > afrollen (lengte + dwars) > fricties > bidhouding > effleurage\nBovenbeen: effleurage (simultaan + lengte over /naast + dwars) > cirkels > kneden (lengte + dwars) > walken> afrollen (lengte + dwars) > hakken & klakken >  bidhouding > effleurage simultaan\nVolledige been: effleurage binnen naar buiten",
"Massageolie",
""
],
[
"Buik: 4x kleine cirkels > grote cirkel > kneden rechte buikspier\nRechterzijde: kneden\nschuine buikspier + laterale zaagspier > afrollen \nLinkerzijde: kneden\nschuine buikspier + laterale zaagspier > afrollen > fricties darmen > grote cirkel darmen> afslanking taille (opheffen) > maag > ev. BH-bandje afrollen",
"Massageolie",
""
],
[
"Armen – decolleté:\nArm: effleurage \nHand: handrug effleurage > pols > handpalm\nArm: effleurage > kneden \nBovenarm: afrollen > fricties\nPols: draaien\nArm: effleurage\nDecolleté: effleurage zoals gelaat > monnikapspier & 7e halswervel\nSchouders: lichte druk",
"Massageolie",
""
],
[
"Voeten – achillespees – achterzijde benen\nVolledige been: 3x Effleurage\nVoetzool: volle hand/vuisten \nOnderbeen: effleurage tweelingkuitspier \nAchillespees: kneden\nOnderbeen: \nkneden (lengte + dwars) > afrollen slang \nVolledige been: effleurage simultaan \nBovenbeen: effleurage (simultaan hand + vuisten) > kneden (lengte binnen/buiten/midden) > afrollen (lengte + dwars) > hakken & klakken >  bidhouding > walken\nVolledige been: effleurage simultaan",
"Massageolie",
""
],
[
"Rug – nek – schouders: \nVolledige rug: Cirkels [schouderbladen > ribbenkast > lende (net boven heupen)] > effleurage T-shirt > effleurage tot oksels > duim omhoog + vlakke hand omlaag \nLinkerzijde: effleurage (lengte + dwars) > cirkels > kneden (lengte + dwars) > afrollen (lengte + dwars) > monnikapspier kneden + afrollen + draineren > schouderblad snijden > taille afslanking > afrollen/duim-over-duim langs wervelkolom\nRechterzijde: effleurage (lengte + dwars) > cirkels > kneden (lengte + dwars) > afrollen (lengte + dwars) > monnikapspier kneden + afrollen + draineren > schouderblad snijden > taille afslanking > afrollen/duim-over-duim langs wervelkolom\nVolledige rug: \nEffleurage duim tss wervels > vibratie langs ruggengraat> effleurage T-shirt > kneden 7e halswervel + schouders R+L > effleurage T-shirt > schouderblad Schouders: lichte druk",
"Massageolie",
""
]
]
},
{
"id": "chocolade",
"title": "Lichaamspakking chocoladetherapie (Sperience, Germaine de Capuccini)",
"treat": [],
"intro": [
"1 grote handdoek onder het lichaam, 1 kleine handdoek onder het hoofd, 1 grote handdoek in de lengte over het zichtvlak + benen (ondergoed/broek goed bedekken), 1 kleine in lengte onder buste + 1 handdoek onder de benen + 1 plastiek folie onder de bustehanddoek + benenhanddoek + 1 deken over benen + 1 kleine handdoek oprollen als hoofdsteun + 1 kleine handdoek over de rug als de aluminiumfolie erop ligt.",
"Waarom?",
"Hydraterend",
"Regenererend: dode huidcellen verwijderen + huid intens verzachten",
"Afslankend: cacao werkt in op lypolise > vrijmaken van vetten",
"Silhouette verbeteren: cafeïne + polyfenolen",
"Sinaasappelhuid verzachten (cellulite): endrofine + extracten cacaoboom",
"Relaxerend"
],
"rows": [
[
"Peeling rug (geen druk igv hernia): \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 > vingertoppen nat maken\nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: : Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"3/4e eetlepel Cocoa Body exfoliator – chocoscrub Sperience",
"Water, eetlepel"
],
[
"Bodywrap 20’: meng poeder met water tot chocomousse > kappen over wervelkolom > onder naar boven (naar zijkanten van wervelkolom verdelen) -> volledige rug->\n2 stroken aluminiumfolie (onderrug + bovenrug)\nPlastiek folie toedekken\nHanddoek over folie\nDeken over lichaam",
"150 mL lauw water\n120 mL / 1 volledige maatbeker Cocoa Bodywrap chocoladepoeder Sperience",
"2 Stroken aluminium folie, mengkom"
],
[
"Verwijderen pakking: open folie, verwijder onderste aluminium folie, schraap met lepel langs de wervelkolom naar buiten toe, verwijder bovenste folie en schraap weg > kompres van schouder tot schouder en wegvegen restanten",
"",
"Verwarmde eetlepel, kom, donkere, warme vochtige kompres"
],
[
"Lichaamsmassage 15-20’ (rug)\n(geen druk igv hernia): \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 \nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: : Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"Massageolie",
""
]
]
},
{
"id": "zeezout",
"title": "Lichaamsscrub zeezout, Perfect Forms (Germaine de Capuccini)",
"treat": [],
"intro": [
"Sensuele en verzorgende peeling op basis van zeezout uit Mallorca. (24 behandelingen)",
"1 grote handdoek onder het lichaam, 1 kleine handdoek onder het hoofd, 1 grote handdoek in de lengte over het zichtvlak + benen, 1 kleine handdoek over het zichtvlak + 1 deken over benen + 1 kleine handdoek oprollen als hoofdsteun.",
"Indicaties:",
"Bij onregelmatige huidkorrel, ruwe huid, droge huid",
"Bij ingroeiende haren",
"Slecht bruinende huid",
"Wanneer producten niet goed in de huid dringen",
"Contra-indicaties:",
"Zeer gevoelige huid",
"Wanneer?",
"Voor de zomer",
"Voor een ontharing om ingroeiende haren te vermijden",
"Op het einde van de winter voor een zachtere, gladdere huid",
"Na het zonnen",
"Ter voorbereiding van een lichaamspakking",
"Op elk moment van het jaar om de celvernieuwing te stimuleren",
"Waarom?",
"Betere zuurstofvoorziening en afvalverwijdering",
"Betere opname van navolgende werkstoffen",
"Gladmaken van de huid, zelfs de zeer ruwe zones",
"Verwijdert dode huidcellen",
"Stimuleert de celvernieuwing en micro-circulatie",
"Geeft de huid vitaliteit en laat haar stralen",
"Stimuleert de bruining"
],
"rows": [
[
"Voorbereiding peeling rug: Hoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2",
"Olie",
""
],
[
"Peeling rug (geen druk igv hernia): \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 \nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: : Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Voorbereiding achterzijde benen & voeten\nRechts/voetuiteinde: Effleurage [onderbeen > bovenbeen]x2 Cirkels hiel + afstrijken hiel > tenen",
"Olie",
""
],
[
"Peeling achterzijde rechterbeen & -voet\nRechts/voetuiteinde: Effleurage [onderbeen > bovenbeen]x 2 Cirkels hiel + glijbeweging hiel > tenen\nV-fricties enkel tot knie\nZigzag/heen-en-weer boven knieholte > dijbeen \nEffleurage dijbeen > enkel\nPetrissage achillespees\nDuimspierkneding kuiten tot knieholte\nEffleurage achillespees > dijbeen\nGolfbewegingen dijbeen > enkel\nGlijbeweging hiel > tenen",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Peeling achterzijde linkerbeen & -voet\nLinks/voetuiteinde: Effleurage [onderbeen > bovenbeen]x 2 Cirkels hiel + glijbeweging hiel > tenen\nV-fricties enkel tot knie\nZigzag/heen-en-weer boven knieholte > dijbeen \nEffleurage dijbeen > enkel\nPetrissage achillespees\nDuimspierkneding kuiten tot knieholte\nEffleurage achillespees > dijbeen\nGolfbewegingen dijbeen > enkel\nGlijbeweging hiel > tenen",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Voorbereiding voorzijde benen & voeten\nRechts/voetuiteinde: Effleurage [onderbeen > bovenbeen]x2 + tenen > hiel",
"Olie",
""
],
[
"Peeling voorzijde rechterbeen & -voet\nRechts/voetuiteinde: Effleurage [onderbeen > bovenbeen]x2 + tenen > hiel\nLissage (duimmuisspieren) tenen + voorkant voet \nCirkels enkel tot knie\nZigzag/heen-en-weer boven knieholte > dijbeen \nEffleurage dijbeen > enkel\nPetrissage achillespees\nDuimspierkneding kuiten tot knieholte\nEffleurage achillespees > dijbeen\nGolfbewegingen dijbeen > enkel\nGlijbeweging hiel > tenen",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Peeling buik (niet igv navelpiercing)",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Peeling armen & decolleté",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Massage / lichaamspakking\nVoorzijde: \nBenen > Buik > Armen > Decolleté\nAchterzijde: Benen > Rug",
"",
""
]
]
},
{
"id": "cryoslim",
"title": "Cryoslim cellulitebehandeling",
"treat": [],
"intro": [
"Benodigdheden : 2 natte kompressen, 1 droog kompres, 1 kleine handdoek op de folie om op te zitten, maandverband voor in slip, 1 grote handdoek, folie, 1 kleine handdoek voor het hoofd, kom met water, maatbeker, windels/kompressiekousen, mengkom, lepel, Maderomassagestokken.",
"Max 2/3e van het lichaam met cryo behandelen per keer en niet in contact met slijmvliezen brengen.",
"Voordelen:",
"Stimulatie bloedcirculatie",
"Lymfedrainage",
"Verlichting en ontzwelling benen",
"Cellulite en figuurcorrectie",
"Contra-indicaties:",
"Opliggende spataders",
"Open wonden -> vooral cryo",
"Zwanger",
"Kankerbehandeling op het moment zelf",
"Nierziekte",
"Roaccutane",
"Cortisone",
"Brandwonden",
"Zeer dunne benen",
"Relatieve contra-indicaties:",
"Hoge bloeddruk > bloedcirculatie stimuleren geeft nog hogere bloeddruk",
"Diabetes > gevoelsverlies",
"Bloedverdunners > rollers geven blauwe plekken"
],
"rows": [
[
"Opmeten bovenbenen voor behandeling",
"",
"Lintmeter"
],
[
"Diepte reiniging /peeling \nCirkelvormige effleurages op benen tot alles verdampt is en korrels op de folie vallen",
"Germaine De Capuccini Perfect Forms Lipo-draining peel-massage system + 50mL water\nBio Balance Body Line Easy Body Peeling",
"Folie, glazen mengkom + lepel"
],
[
"Verwijderen peeling: alle korrels verwijderen + nieuwe folie leggen",
"",
"Folie"
],
[
"Maderomassage op benen (niet scheenbeen): \nRoze tool – langwerpig: lange rolbeweging van onder naar boven > korte rolbeweging > glijdende halve cirkels, zig-zagbeweging\nGele tool – 3 ballen: lange rolbeweging van onder naar boven > korte rolbeweging > glijdende halve cirkels, zig-zagbeweging\nHakken, klakken en bobijnen.",
"",
""
],
[
"Cryopakking: windel/compressiekous goed doordrenken met cyrolotion (50% per zijde) en uitwringen. Windel de benen van knie tot en met de dijen. Dek toe met folie: 20’. Dek de niet behandelde delen af met een handdoek.",
"Cryolotion 90ml + 90 ml koud water",
"Windels/compressiekousen, maandverband/handdoek om vagina te beschermen, folie"
],
[
"Verwijderen windels",
"",
""
],
[
"Massage benen:\neffleurages",
"Heavy legs cooling gel (zware/gezwollen benen)\nBody & Bust firming cream (verstevigend)\nSlimming en Draining Cream (afslankend)",
""
],
[
"Opmeten bovenbenen na behandeling",
"",
"Lintmeter"
],
[
"Bescherming",
"24h Body Moisturizer",
""
]
]
},
{
"id": "energizing",
"title": "Lichaamsverzorging Energizing Janssen",
"treat": [],
"intro": [],
"rows": [
[
"Diepte reiniging /peeling \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 > vingertoppen nat maken\nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: : Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"Oxygenating Body Scrub",
""
],
[
"Verwijderen peeling & drogen",
"",
"Vochtige kompressen + handdoek"
],
[
"Body Pack: 20’\n2 stroken aluminiumfolie (onderrug + bovenrug)\nPlastiek folie toedekken\nHanddoek over folie\nDeken over lichaam",
"Thermo Body Pack (verwarmend)\nCrygeniic Alginate ‘ARCTIC’ (verkoelend)",
"Folie wrap + aluminium folie + lepel + pot + handdoek"
],
[
"Verwijderen pakking: open folie, verwijder onderste aluminium folie, schraap met lepel langs de wervelkolom naar buiten toe, verwijder bovenste folie en schraap weg > kompres van schouder tot schouder en wegvegen restanten",
"",
"Verwarmde eetlepel, kom, donkere, warme vochtige kompres"
],
[
"Massage: 15’-20’ (rug)\nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 \nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: : Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"Stimulating Massage Balm",
""
],
[
"Optionele verzorging",
"Perfect Bust Formula",
""
],
[
"Bescherming",
"24h Body Moisturizer",
""
]
]
},
{
"id": "wellness",
"title": "Wellness",
"treat": [],
"intro": [
"Benodigdheden: 4 natte kompressen, 2 droge washandjes, 1 grote handdoek, deken, folie, 1 kleine handdoek voor het hoofd, maatbeker, mengkom, lepel."
],
"rows": [
[
"Voorbereiding peeling rug: Hoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2",
"Olie",
""
],
[
"Peeling rug (geen druk igv hernia): \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 \nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling: oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Voorbereiding achterzijde benen & voeten\nRechts/voetuiteinde: Effleurage [onderbeen > bovenbeen]x2 Cirkels hiel + afstrijken hiel > tenen",
"Olie",
""
],
[
"Peeling achterzijde rechter-/linkerbeen & -voet\nRechts/Links/voetuiteinde: Effleurage [onderbeen > bovenbeen]x 2 Cirkels hiel + glijbeweging hiel > tenen\nV-fricties enkel tot knie\nZigzag/heen-en-weer boven knieholte > dijbeen \nEffleurage dijbeen > enkel\nPetrissage achillespees\nDuimspierkneding kuiten tot knieholte\nEffleurage achillespees > dijbeen\nGolfbewegingen dijbeen > enkel\nGlijbeweging hiel > tenen",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling: oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Voorbereiding voorzijde benen & voeten\nRechts/voetuiteinde: Effleurage [onderbeen > bovenbeen]x2 + tenen > hiel",
"Olie",
""
],
[
"Peeling voorzijde rechter-/linkerbeen & -voet\nRechts/links/voetuiteinde: Effleurage [onderbeen > bovenbeen]x2 + tenen > hiel\nLissage (duimmuisspieren) tenen + voorkant voet \nCirkels enkel tot knie\nZigzag/heen-en-weer boven knie > dijbeen \nEffleurage dijbeen > enkel\nDuimspierkneding kuiten tot knie\nEffleurage enkels > dijbeen\nGolfbewegingen dijbeen > enkel\nGlijbeweging hiel > tenen",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Peeling buik (niet igv navelpiercing)",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Peeling armen & decolleté",
"Zeezout: 1 theelepel",
""
],
[
"Verwijderen peeling : oplossen zeezout (peelingbewegingen) + afkuisen",
"Melk",
"Droog kompres"
],
[
"Massage / lichaamspakking\nVoorzijde: \nBenen > Buik > Armen > Decolleté\nAchterzijde: Benen > Rug",
"",
""
],
[
"Peeling rug (geen druk igv hernia): \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 > vingertoppen nat maken\nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"3/4e eetlepel Cocoa Body exfoliator – chocoscrub Sperience",
"Water, eetlepel"
],
[
"Bodywrap 20’: meng poeder met water tot chocomousse > kappen over wervelkolom > onder naar boven (naar zijkanten van wervelkolom verdelen) -> volledige rug->\n2 stroken aluminiumfolie (onderrug + bovenrug)\nPlastiek folie toedekken\nHanddoek over folie\nDeken over lichaam",
"150 mL lauw water\n120 mL / 1 volledige maatbeker Cocoa Bodywrap chocoladepoeder Sperience",
"2 Stroken aluminium folie, mengkom"
],
[
"Verwijderen pakking: open folie, verwijder onderste aluminium folie, schraap met lepel langs de wervelkolom naar buiten toe, verwijder bovenste folie en schraap weg > kompres van schouder tot schouder en wegvegen restanten",
"",
"Verwarmde eetlepel, kom, donkere, warme vochtige kompres"
],
[
"Lichaamsmassage 15-20’ (rug)\n(geen druk igv hernia): \nHoofdzijde: Effleurage [schouders > wervelkolom > heupen]x2 \nRechts: Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nLinks: : Zigzag/flappen [schouderbladen > ribbenkast > lende (net boven heupen)] \nCirkels [schouderbladen > ribbenkast > lende (net boven heupen)]\nHoofdzijde: Zigzag 2 handen op elkaar (puntdruk) [lende > ribbenkast > schouderbladen]\nOmgekeerde uitrekking + golven langs wervelkolom: sacrum – nek\nEffleurage [schouders > wervelkolom > heupen]x2",
"Massageolie",
""
],
[
"Opmeten bovenbenen voor behandeling",
"",
"Lintmeter"
],
[
"Diepte reiniging /peeling \nCirkelvormige effleurages op benen tot alles verdampt is en korrels op de folie vallen",
"Germaine De Capuccini Perfect Forms Lipo-draining peel-massage system + 50mL water\nBio Balance Body Line Easy Body Peeling",
"Folie, glazen mengkom + lepel"
],
[
"Verwijderen peeling: alle korrels verwijderen + nieuwe folie leggen",
"",
"Folie"
],
[
"Maderomassage op benen (niet scheenbeen): \nRoze tool – langwerpig: lange rolbeweging van onder naar boven > korte rolbeweging > glijdende halve cirkels, zig-zagbeweging\nGele tool – 3 ballen: lange rolbeweging van onder naar boven > korte rolbeweging > glijdende halve cirkels, zig-zagbeweging\nHakken, klakken en bobijnen.",
"",
""
],
[
"Cryopakking: windel/compressiekous goed doordrenken met cyrolotion (50% per zijde) en uitwringen. Windel de benen van knie tot en met de dijen. Dek toe met folie: 20’. Dek de niet behandelde delen af met een handdoek.",
"Cryolotion 90ml + 90 ml koud water",
"Windels/compressiekousen, maandverband/handdoek om vagina te beschermen, folie"
],
[
"Verwijderen windels",
"",
""
],
[
"Massage benen:\neffleurages",
"Heavy legs cooling gel (zware/gezwollen benen)\nBody & Bust firming cream (verstevigend)\nSlimming en Draining Cream (afslankend)",
""
],
[
"Opmeten bovenbenen na behandeling",
"",
"Lintmeter"
],
[
"Bescherming",
"Moisturizer",
""
],
[
"Openen poriën, bevochtigen rug, verzachten talgophoping: 10’",
"",
"Folie + vapozone"
],
[
"Diepte reiniging /peeling \nEffleurages op rug tot korrels op de folie vallen. Vermijd agressief scrubben bij actieve ontstekingen.",
"SPA Exfoliating scrub SPERIENCE (gladmakend)",
""
],
[
"Verwijderen peeling: alle korrels verwijderen",
"",
""
],
[
"Verwijderen onzuiverheden: 10’-15’ -> niet foreceren!",
"",
"Tissues, handschoenen, comedonendrukker."
],
[
"Pakking 2-3 mm dikte, niet te ver op de rand -> inpakken en handdoek erover: 10’-15’",
"SPERIENCE Marine Body Mud 80-120g + 80-100 ml warm water\nThermo Relax 12 druppels",
"Maatbeker, mengkom, lepel, folie, 1 grote handdoek, deken"
],
[
"Verwijderen modderpakking",
"",
"Lepel, warmtekompressen"
],
[
"Massage effleurages: 10’ (niet masseren bij actieve acné)",
"Neutral Body Cream: Bio Balance Moisturizing Body Lotion",
""
],
[
"Diepte reiniging /peeling \nEffleurages op rug tot korrels op de folie vallen.",
"SPERIENCE Bamboo scrub",
""
],
[
"Verwijderen peeling: alle korrels verwijderen",
"",
"1 droge washand"
],
[
"Hydraterende lotion: verstuif op lichaam > inmasseren",
"SPERIENCE JEJU volcanic source – Hydrating body water",
"Verstuiver"
],
[
"Massage:\nEffleurages",
"Green Tea Jelly: ontgiftend & ontstekingsremmend \nBlack Tea Jelly: spanning & verkrampte spieren",
""
],
[
"3 grote stenen op buik (op handdoek, onder deken): thv borst, navel en onderbuik",
"",
"3 maxi stenen (buik) + 1 kleine handdoek + deken"
],
[
"Voeten – enkel – voorzijde benen\nVolledige been: effleurage (olie)\n2 grote stenen: 4x Effleurage simultaan lengte zijkanten > 4x cirkelvormig op dijen > 4x kruiselings  stenenwissel\nVoet: 1 grote steen op en 1 grote steen onder de voet van hiel naar tenen (kleine steen tss vliezen)  stenenwissel\nVoetmassage: uitwringen voet (duim op hiel naar tenen) > rotatie voet > tegenduwen + trekken > cirkels rond enkels \n1 grote steen voetzool + 4 kleine steentjes tussen tenen en voet inwikkelen in kleine handdoek",
"Massageolie",
"2x 2 grote stenen benen + voeten (+ 8 kleine stenen tussen tenen), 1 kleine handdoek"
],
[
"Armen: effleurage (olie)\n2 middelgrote stenen: 4x Effleurage simultaan lengte > 4x cirkelvormig > 4x simultaan lengte\nHand: 1 middelgrote steen in handpalm en 1 middelgrote steen op handrug (naar vingertoppen)\nHandmassage: 1 middelgrote steen in handpalm + 1 kleine steen tss vliezen van pink naar duim (4x)\nZonder stenen:\nDruk en trekbeweging op handpalm en vingers (draaien en trekken aan kootje)\nMet stenen:\n1 middelgrote steen in handpalm + 1 kleine steen cirkels op pols (4x)\nZonder stenen:\nhandpalm (cirkels en uitwrijven en trekken aan vingers van duim naar pink)\n1 middelgrote steen in handpalm + inwikkelen in kleine handdoek",
"Massageolie",
"2x 2 middelgrote stenen armen en handen, 1 kleine steen tussen vliezen, 1 kleine handdoek"
],
[
"Gelaat: stenen rechtop houden, dan platte zijde op de huid\nVoorhoofd: tss wenkbrauwen naar haarlijn (naar buiten)\nWenkbrauwen: onder aanzet brows en naar slapen\nOgen: slapen > wallen > neusbrug > neusvleugels\nMond: Boven lippen (net onder neus) > jukbeen naar oor >  mondhoeken > onder de lippen > kin > onderkaak naar slapen > cirkels\n4x de stappen voor gelaat \nEindigen: 1 steen tss brows + 1 steen op kin (eventueel ook even over decolleté richting schouders)",
"",
"2 kleine stenen gelaat"
],
[
"3 grote stenen op rug (op handdoek, onder deken): tss schouderbladen, midden vd rug, onderrug",
"",
"3 maxi stenen (buik) + 1 kleine handdoek + deken"
],
[
"Achterzijde benen\nVolledige been: effleurage (olie)\n2 grote stenen: 4x Effleurage simultaan lengte > 4x cirkelvormig > 4x kruiselings  stenenwissel\n- 1 steen thv enkel + 1 steen thv heup en naar elkaar toe en steek over de knie > terugglijden > terug naar elkaar toe en oversteken (4x)\n- 4x lengte effleurage met stenen > 1 steen boven de voet en 1 aan voetzool om stenen weg te nemen  stenenwissel",
"Massageolie",
"4 grote stenen benen + voeten"
],
[
"Rug – nek – schouders: \nVolledige rug: T-zone > dwarse effleurages > cirkelvormige effleurages (olie)\nSchouders: \n2 Kleine stenen: 1 kleine steen voorzijde schouder (wijsvinger) en 1 kleine steen monnikapspier (duim)> naar boven en buiten afrollen (schouder per schouder)\n- 1 kleine steen nek thv 7e nekwervel + 1 kleine steen met duim van schouder naar schouderblad afrollen (plat) en naar buiten\n- 1 kleine steen nek thv 7e nekwervel + van binnen dwarse effleurage naar buitenzijde schouder\n- 2 kleine stenen onderaan naast wervelkolom cirkels (rechtop op de huid) naar boven en terug (4x)\nVolledige rug: \n2 Middelgrote stenen: \n4x lengte effleurage > 4x cirkels (3 grote verdeeld over schouderblad, ribbenkast en lende) van boven naar beneden > 4x kerstboom > 4x 8-jes (lemniscaat beide zijden om beurten) 1 doet de 8, de andere steen onderaan andere zijde leggen > 4x taille trekken simultaan en afwisselend omhoog + omlaag met steen > 4x dwars over lengte vd rug > 4x effleurage T-shirt\nEinde: stenen verwijderen en lichaam afdrogen",
"Massageolie",
"2 middelgrote stenen rug, 2 kleine stenen rug"
]
]
},
{
"id": "manicure",
"title": "Manicure basis",
"treat": [
"manicure",
"manicureexpress"
],
"intro": [],
"rows": [
[
"Desinfectie materiaal",
"Alcohol 90%",
"Wattenschijfjes of ontsmettingsdoekjes"
],
[
"Desinfectie handen",
"Alcohol 70%",
""
],
[
"Verwijder nagellak",
"Dissolvent",
"Wattenschijfjes"
],
[
"Knippen + vijlen nagels",
"",
"Lamp, nagelknipper, diamantvijl"
],
[
"Nagelriemverzorging",
"Nagelriemolie / vaseline",
""
],
[
"Weken nagels > werk aan andere hand",
"Douchegel",
"Waterbadje"
],
[
"Afdrogen hand",
"",
"Handdoek"
],
[
"Nagelriemen weken",
"Cutticle remover",
""
],
[
"Nagels reinigen",
"Zuurstofwater 3%",
"Citroenstok met watje"
],
[
"Verwijderen nagelriemen",
"",
"Bokkenpoot + kniptang"
],
[
"Limeren (niet bij te dunne nagels, dwarse ribbels, zeer dikke nagels)",
"",
"Bufferblok"
],
[
"Nagelriemverzorging",
"Nagelriemolie / vaseline",
""
],
[
"Polieren nagels",
"",
"Poliervijl"
],
[
"Eelt verwijderen",
"",
"Puimsteen"
],
[
"Nagelriemverzorging > werk aan andere hand",
"Nagelriemolie / vaseline",
""
],
[
"Handmassage: \nEffleurage rug 3-6x\n> effleurage handpalm > vingertoppen > pols > vingertoppen > \nMasseren vingers: vingers masseren van pink naar duim: knijp vingertop > korte slagen omhoog naar knokkel > hele vinger\nMasseren rug: vingerbeen naar pols + losse huid tussen duim en wijsvinger (cirkels)\nMasseren achterkant pols: cirkels > midden naar buiten\nMassage handpalm: cirkels > midden naar zijkanten > naar boven > naar pols\nStrekken vingers: handen in elkaar > bidden > pols strekken : naar achteren duwen + rechts naar links + links naar rechts\nEffleurage handpalm > pols  > rug\nWissel van hand",
"Handcrème / olie / lotion",
""
],
[
"Ontvet nagels om te lakken",
"Dissolvant",
""
],
[
"Basecoat aanbrengen",
"Basis laag",
""
],
[
"Kleurlak (2x) – rollen fles -> 1 mm van nagelriem blijven",
"Nagellak",
""
],
[
"French tip smile (eventueel)",
"Witte nagellak",
"Potje, penseeltje/stempel"
],
[
"Topcoat aanbrengen",
"Top laag",
""
]
]
},
{
"id": "gellak",
"title": "Manicure gellak",
"treat": [
"manicure",
"cateye"
],
"intro": [],
"rows": [
[
"Desinfectie materiaal",
"Alcohol 90%",
"Wattenschijfjes of ontsmettingsdoekjes"
],
[
"Desinfectie handen",
"Alcohol 70%",
""
],
[
"Verwijder nagellak (indien van toepassing)",
"Dissolvent",
"Wattenschijfjes"
],
[
"Verwijder gellak (indien van toepassing)\n- vijlen toplaag\n- wikkelen nagels in folie (luchtvrij): 15’ – 20’\n- afschrapen gellak met houten bokkenpoot -> nog lak? +10’",
"Aceton\nGellakremover",
"180 grit vijl / 80 grit buffer, aluminiumfolie met wattenschijfjes/-bolletjes, houten bokkenpoot"
],
[
"PREP nagels: Perform manicure\n- nagelriemen losmaken en omhoog zetten\n- proper maken onder nagelriem: verhoornde delen verwijderen + mat zetten\n- knippen nagelriemen\n- vijlen/knippen nagels op lengte en model",
"",
"Bokkenpoot, kniptang, diamantvijl, 180 grit vijl / 80 grit buffer"
],
[
"PREP nagels: Remove shine\nMatteren nagelplaat",
"",
"180 grit vijl / 80 grit buffer"
],
[
"PREP nagels: Eliminate surface contamination\nAfborstelen stof richting nagelriem",
"",
"Nagelborstel"
],
[
"PREP nagels: Purify the natural nailplate\n- vet + olie verwijderen met dehydrator\n- ontvochten",
"Dehydrator = soak off cleaners\nOntvochtiger = prep bond",
"Pluisvrije wattenschijfje"
],
[
"Indien geen gellak/nagellak:\nNagelriemolie + handmassage",
"Nagelriemolie\nHandcrème / olie / lotion",
""
],
[
"Indien gellak:\n- preppen: primer\n- hechtingslaag: stay base - 60” of 30” per 2 vingers + 60” per hand of roze stay base – 30” per vinger + 60” per hand (BIAB -> penseel voor randjes en hand ondersteboven houden + vinger per vinger)\n- kleurlak 2x – 60” of 30” per 2 vingers + 60” per hand: verzegel vrije rand + corrigeren met fine liner\n- topcoatlakborstel afkuisen met pluisvrije wattenschijfje na elke vinger > 30” per vinger + 60” per hand\n- plaklaag topcoat verwijderen met soak-off cleanser\n- nagelriemolie",
"Primer\nStay base / roze BIAB stay base\nKleurgellak\nTop coat \nSoak-off cleanser\nNagelriemolie",
"Fine liner, UV-lamp, pluisvrije wattenschijfje"
],
[
"Handmassage: \nEffleurage rug 3-6x\n> effleurage handpalm > vingertoppen > pols > vingertoppen > \nMasseren vingers: vingers masseren van pink naar duim: knijp vingertop > korte slagen omhoog naar knokkel > hele vinger\nMasseren rug: vingerbeen naar pols + losse huid tussen duim en wijsvinger (cirkels)\nMasseren achterkant pols: cirkels > midden naar buiten\nMassage handpalm: cirkels > midden naar zijkanten > naar boven > naar pols\nStrekken vingers: handen in elkaar > bidden > pols strekken : naar achteren duwen + rechts naar links + links naar rechts\nEffleurage handpalm > pols  > rug\nWissel van hand",
"Handcrème / olie / lotion",
""
]
]
},
{
"id": "spamaniparaffine",
"title": "SPA-manicure met paraffine",
"treat": [
"manipedispa"
],
"intro": [],
"rows": [
[
"Desinfectie materiaal",
"Alcohol 90%",
"Wattenschijfjes of ontsmettingsdoekjes"
],
[
"Desinfectie handen",
"Alcohol 70%",
""
],
[
"Verwijder nagellak",
"Dissolvent",
"Wattenschijfjes"
],
[
"Knippen + vijlen nagels",
"",
"Lamp, nagelknipper, diamantvijl"
],
[
"Nagelriemverzorging",
"Nagelriemolie / vaseline",
""
],
[
"Weken nagels > werk aan andere hand",
"Douchegel",
"Waterbadje"
],
[
"Afdrogen hand",
"",
"Handdoek"
],
[
"Nagelriemen weken",
"Cutticle remover",
""
],
[
"Nagels reinigen",
"Zuurstofwater 3%",
"Citroenstok met watje"
],
[
"Verwijderen nagelriemen",
"",
"Bokkenpoot + kniptang"
],
[
"Limeren (niet bij te dunne nagels, dwarse ribbels, zeer dikke nagels)",
"",
"Bufferblok"
],
[
"Nagelriemverzorging",
"Nagelriemolie / vaseline",
""
],
[
"Polieren nagels",
"",
"Poliervijl"
],
[
"Eelt verwijderen",
"",
"Puimsteen"
],
[
"Nagelriemverzorging > werk aan andere hand",
"Nagelriemolie / vaseline",
""
],
[
"Reiniging handen & drogen \nThermische handschoenen opzetten",
"Dermospray (desinfectie)",
"Tissues"
],
[
"Peeling inmasseren tot korrels verdwenen zijn en overtollige afkuisen",
"Dermopeel (korrelpeeling)",
"Tissues"
],
[
"Collageen aanbrengen",
"Collageen Elastin Plus",
""
],
[
"Praffinecrème aanbrengen met borstel > in zak/folie wikkelen > thermische handschoen stand 1: 10’ – 15’\nHerhaal op andere hand.",
"Paraffinecrème",
"Paraffineborstel, folie, thermische handschoen"
],
[
"Verwijderen handschoen en paraffine mbv folie eraf te trekken > overtollige inmasseren > resten afkuisen",
"",
"Tissues/kompres"
],
[
"Handmassage: Verwarmen\nEffleurage rug 3-6x\n> effleurage handpalm > vingertoppen > pols > vingertoppen > \nMasseren vingers: vingers masseren van pink naar duim: knijp vingertop > korte slagen omhoog naar knokkel > hele vinger\nMasseren rug: vingerbeen naar pols + losse huid tussen duim en wijsvinger (cirkels)\nMasseren achterkant pols: cirkels > midden naar buiten\nMassage handpalm: cirkels > midden naar zijkanten > naar boven > naar pols\nStrekken vingers: handen in elkaar > bidden > pols strekken : naar achteren duwen + rechts naar links + links naar rechts\nEffleurage handpalm > pols  > rug\n Wissel van hand",
"Handcrème / olie / lotion",
""
],
[
"Bescherming (indien geen handmassage)",
"AHA Hydraterende handcrème\nCamomille Handcrème",
""
],
[
"Nagels lakken (eerst ontvetten)",
"Ontvetter: dissolvant\nNagellak",
"Vijl, watje"
],
[
"Basecoat aanbrengen",
"Basis laag",
""
],
[
"Kleurlak (2x) – rollen fles -> 1 mm van nagelriem blijven",
"Nagellak",
""
],
[
"French tip smile (eventueel)",
"Witte nagellak",
"Potje, penseeltje/stempel"
],
[
"Topcoat aanbrengen",
"Top laag",
""
],
[
"Advies: AHA hydraterende handcrème of camomille",
"",
""
]
]
},
{
"id": "spamaniwax",
"title": "SPA-manicure met paraffinewax",
"treat": [
"manipedispa"
],
"intro": [
"Geen sieraden! Paraffine smelten in paraffinebad en om de 10 behandelingen bijvullen."
],
"rows": [
[
"Desinfectie materiaal",
"Alcohol 90%",
"Wattenschijfjes of ontsmettingsdoekjes"
],
[
"Desinfectie handen",
"Alcohol 70%",
""
],
[
"Verwijder nagellak",
"Dissolvent",
"Wattenschijfjes"
],
[
"Knippen + vijlen nagels",
"",
"Lamp, nagelknipper, diamantvijl"
],
[
"Nagelriemverzorging",
"Nagelriemolie / vaseline",
""
],
[
"Weken nagels > werk aan andere hand",
"Douchegel",
"Waterbadje"
],
[
"Afdrogen hand",
"",
"Handdoek"
],
[
"Nagelriemen weken",
"Cutticle remover",
""
],
[
"Nagels reinigen",
"Zuurstofwater 3%",
"Citroenstok met watje"
],
[
"Verwijderen nagelriemen",
"",
"Bokkenpoot + kniptang"
],
[
"Limeren (niet bij te dunne nagels, dwarse ribbels, zeer dikke nagels)",
"",
"Bufferblok"
],
[
"Nagelriemverzorging",
"Nagelriemolie / vaseline",
""
],
[
"Polieren nagels",
"",
"Poliervijl"
],
[
"Eelt verwijderen",
"",
"Puimsteen"
],
[
"Nagelriemverzorging > werk aan andere hand",
"Nagelriemolie / vaseline",
""
],
[
"Reiniging handen & drogen \nThermische handschoenen opzetten",
"Dermospray (desinfectie)",
"Tissues"
],
[
"Peeling inmasseren tot korrels verdwenen zijn en overtollige verwijderen",
"Dermopeel (korrelpeeling)",
"Tissues"
],
[
"Collageen aanbrengen",
"Collageen Elastin Plus",
""
],
[
"Praffinebad: hand 4-5x indompelen tot pols (snel in & uit, handen gespreid, dan 3-4 in & uit) en in folie/zak wikkelen, dan in handschoenen/-doek: 15’-20’\nHerhaal op andere hand.",
"Paraffinecrème",
"Paraffinebad, folie, handschoenen/-doek."
],
[
"Verwijderen handschoen en paraffine mbv folie eraf te trekken > resten afkuisen (ev. met wat en waterstofperoxide)",
"Waterstofperoxide (ev)",
"Tissues/kompres"
],
[
"Handmassage: Verwarmen\nEffleurage rug 3-6x\n> effleurage handpalm > vingertoppen > pols > vingertoppen > \nMasseren vingers: vingers masseren van pink naar duim: knijp vingertop > korte slagen omhoog naar knokkel > hele vinger\nMasseren rug: vingerbeen naar pols + losse huid tussen duim en wijsvinger (cirkels)\nMasseren achterkant pols: cirkels > midden naar buiten\nMassage handpalm: cirkels > midden naar zijkanten > naar boven > naar pols\nStrekken vingers: handen in elkaar > bidden > pols strekken : naar achteren duwen + rechts naar links + links naar rechts\nEffleurage handpalm > pols  > rug\n Wissel van hand",
"Handcrème / olie / lotion",
""
],
[
"Bescherming (indien geen handmassage)",
"AHA Hydraterende handcrème\nCamomille Handcrème",
""
],
[
"Nagels lakken (eerst ontvetten)",
"Ontvetter: dissolvant\nNagellak",
"Vijl, watje"
],
[
"Basecoat aanbrengen",
"Basis laag",
""
],
[
"Kleurlak (2x) – rollen fles -> 1 mm van nagelriem blijven",
"Nagellak",
""
],
[
"French tip smile (eventueel)",
"Witte nagellak",
"Potje, penseeltje/stempel"
],
[
"Topcoat aanbrengen",
"Top laag",
""
],
[
"Advies: AHA hydraterende handcrème of camomille",
"",
""
]
]
},
{
"id": "pedicure",
"title": "Pedicure basis",
"treat": [
"pedicure",
"pedicureexpress"
],
"intro": [
"Indien veel eelt -> eerst voetbad -> snijden met mes -> weken -> snijden met mes -> knippen, reinigen en weken -> snijden met mes.",
"Ingegroeide nagel: copoline ertussen steken (niet op wonden) en om de 4 weken met tang eruit halen en nieuwe ertussen steken.",
"Frezen:",
"Busch Diamant bolletje: eeltpit onder tenen, likdoorn tussen tenen, schimmel",
"Busch Diamant Fijn Fissuur: nagelriemen proper maken, nagelwal, ingegroeide nagel",
"Busch Diamant Mini-Peer: nagelriem (90°), velletjes, eelt, kunstnagels",
"Busch Diamant Fijn Kegel 8mm: Eelt (niet te veel druk!)",
"Busch T-Speed Kegel: gelnagels, verdikte nagels <-> T-Speed Plus Kegel: acrylnagels",
"Siliconen orthese: druk ontlasten bij likdoorn, vorm boetseren rond tenen, digitubes"
],
"rows": [
[
"Desinfectie materiaal",
"Alcohol 90%",
"Wattenschijfjes of ontsmettingsdoekjes"
],
[
"Desinfectie voeten",
"Podiskin in sprayfles",
"Wattenschijfjes"
],
[
"Verwijder nagellak",
"Dissolvent",
"Wattenschijfjes"
],
[
"Eelt en nagelriemen weken",
"Podinail Nagelriem- en Eeltweker",
"Watjes"
],
[
"Knippen (recht) + vijlen nagels",
"",
"Lamp, nagelkniptang, diamantvijl"
],
[
"Afplatten dikke nagels",
"",
"Vijl om af te platten"
],
[
"Vrije boord en nagelwallen kuisen",
"Zuurstofwater 3%",
"Watjes, holle bijtel"
],
[
"Nagelriemen naar achteren duwen & knippen",
"",
"Excavator, velletjeskniptang"
],
[
"Eelt verwijderen en  afkuisen voeten",
"Podiskin in sprayfles",
"Scalpelmes, voetvijl (grit 80 > grit 150), vochtige doekjes"
],
[
"Voetmassage: effleurage benen > voet > naar voetzool > naar wreef > rond enkels > achillespees > scheenbeen naar hart & terug > voetreflexologie (R> L):\n- zonnevlek/Plexus solaris\n- Effleurage boven, onder, zijkant 3x\nGewrichten\n- buigen/trekken voet 3x\n- rotatie/wiegen voet 2x \n- buigen/trekken voet 2x\n- rotatie tenen 2x\n- trekken & druk op tenen\nZijkant - bovenkant\n- druk buitenzijde zijkant voet (boven > beneden: sinus, schouder, knie)\n- druk binnenzijde zijkant voet (boven > beneden: neus, bijschildklier, pancreas, duodenum, blaas, staartbeen, sacrum)\n- drukpunten hiel (testikels, ovarium)\n- 4 drukpunten achillespees (omhoog kruipend: ovarium, testikels, hitte opwellingen, pijnlijke maandstonden)\n- bovenzijde voet fricties boven tenen 2x (borst)\n- vliezen tussen tenen (energiekanalen)\n- enkels simultaan duimfricties (buitenzijde: lymfeklieren, thorax – binnenzijde: lymfeklieren, abdomen onderbuik)\nVoetzool\n- druk op uiteinde tenen (sinus)\n- druk dikke teen afwisselende duimen (hersenen, neus, kleine hersenen)\n- druk tussen tenen + naast kleine teen van binnen naar buiten: nek, trapezium, linkeroog 2x, rechteroor 2x, schouder)\n- bal van de voet drukpunten (boven naar beneden: schouders, schildklier, longen/longpijpen, trapezium)\n- drukpunten omhoog kruipend van baan onder dikke teen naar tussen dikke teen en 2e teen > glijden naar beginpunt (schildklier)\n- 1 lange drukpunt op zonnevlek \n- neerdalen nier drukpunt 3x\n- neerdalen met 6 drukpunten van uretus naar blaas (binnenzijde boven hielzone)\n- 1 drukpunt simultaan maag (rechtsboven zonnevlek) & lever/hart (linksboven zonnevlek)\n- neerdalen drukpunt pancreas (rechtsonder maag) & galblaas/milt (rechtsonder lever/hart)\n- linkervoet: in 4 opwaartse drukpunten buitenzijde voet boven hielzone (stijgende darm/ascending colon) en naar binnenzijde onder pancreas (transversale darm) + 1 drukpunt binnenzijde voet \n- rechtervoet: drukpunten van binnenzijde voet onder pancreas (dalende darm/descending colon) en naar buitenzijde voet en naar onder in 3 drukbewegingslijnen en terug naar binnenzijde voet net boven hielzone (rectum)\n- simmultane drukpunten zone boven hielzone (dunne darm)\n- zijwaartse drukpunten van binnen naar buiten net boven hielzone (heup)\n- simultane drukpunten hielzone \n- midden hiel 3x\n effleurage en wissel voet\nEindeffleurage beide voeten: R>L \n- 3 effleurages\n- enkels 1x\n- over voet > onder voet waaier\n- voetwelving 3 drukpunten\n effleurage en wissel voet\n- zonnevlek (duur: 3x in en uitademen -> handen naar de grond)",
"Heavy legs cooling gel / Voetencrème\nEssence relaxante (enkele druppels handen)",
"zonnevlek"
],
[
"Nagels lakken (eerst ontvetten)",
"Ontvetter: dissolvant\nNagellak",
"Vijl, watje"
],
[
"Basecoat aanbrengen",
"Basis laag",
""
],
[
"Kleurlak (2x) – rollen fles -> 1 mm van nagelriem blijven  tissue tussen tenen rollen",
"Nagellak",
"Tissue"
],
[
"French tip smile (eventueel)",
"Witte nagellak",
"Potje, penseeltje/stempel"
],
[
"Topcoat aanbrengen",
"Top laag",
""
],
[
"Advies: Avocado voetencrème",
"",
""
]
]
},
{
"id": "spapediparaffine",
"title": "SPA-pedicure met paraffine",
"treat": [
"manipedispa"
],
"intro": [],
"rows": [
[
"Reiniging voeten & drogen \nThermische sloffen opzetten",
"Dermospray",
"Tissues"
],
[
"Peeling tot volledig ingetrokken en korrels van de huid vallen",
"Voetpeeling",
""
],
[
"Masker aanbrengen en lichtjes inmasseren",
"Voetmasker",
""
],
[
"Praffinecrème aanbrengen met borstel > in zak/folie wikkelen > thermische slof stand 1: 10’\nHerhaal op andere voet.",
"Paraffinecrème",
"Paraffineborstel, folie, thermische slof"
],
[
"Verwijderen slof en paraffine mbv folie eraf te trekken > overtollige resten inmasseren",
"",
""
],
[
"Bescherming",
"Avocado voetencrème",
""
]
]
},
{
"id": "spapedi",
"title": "SPA-pedicure",
"treat": [
"manipedispa"
],
"intro": [
"Geen sieraden! Paraffine smelten in paraffinebad en om de 10 behandelingen bijvullen."
],
"rows": [
[
"Desinfectie materiaal",
"Alcohol 90%",
"Wattenschijfjes of ontsmettingsdoekjes"
],
[
"Desinfectie voeten",
"Podiskin in sprayfles",
"Wattenschijfjes"
],
[
"Verwijder nagellak",
"Dissolvent",
"Wattenschijfjes"
],
[
"Eelt en nagelriemen weken",
"Podinail Nagelriem- en Eeltweker",
"Watjes"
],
[
"Knippen (recht) + vijlen nagels",
"",
"Lamp, nagelkniptang, diamantvijl"
],
[
"Afplatten dikke nagels",
"",
"Vijl om af te platten"
],
[
"Vrije boord en nagelwallen kuisen",
"Zuurstofwater 3%",
"Watjes, holle bijtel"
],
[
"Nagelriemen naar achteren duwen & knippen",
"",
"Excavator, velletjeskniptang"
],
[
"Eelt verwijderen",
"Podiskin in sprayfles",
"Scalpelmes, voetvijl (grit 80 > grit 150)"
],
[
"Reiniging voeten & drogen \nThermische slof opzetten",
"Dermospray",
"Tissues"
],
[
"Peeling voeten: effleurage naar hart toe en onderbenen tot volledig ingetrokken en korrels van de huid vallen + 2x afkuisen met kompres -> servietten onder voeten leggen",
"Voetpeeling: Easy body peeling /Dermopeeling",
"Tissues/kompres, warm water kom, servietten"
],
[
"Masker aanbrengen + inpakken met folie bovenbeen > voet en in handdoeken/thermische slof: 10’",
"Collageen Elastin Plus/voetenmasker Belmasque",
"Maskerkwast (eventueel), folie, 2x kleine handdoeken, slof/handdoek."
],
[
"Verwijderen slof en masker mbv folie eraf te trekken > resten afkuisen",
"",
"Tissues/kompres"
],
[
"Voetmassage: effleurage benen > voet > naar voetzool > naar wreef > rond enkels > achillespees > scheenbeen naar hart & terug > voetreflexologie (R> L):\n- zonnevlek/Plexus solaris\n- Effleurage boven, onder, zijkant 3x\nGewrichten\n- buigen/trekken voet 3x\n- rotatie/wiegen voet 2x \n- buigen/trekken voet 2x\n- rotatie tenen 2x\n- trekken & druk op tenen\nZijkant - bovenkant\n- druk buitenzijde zijkant voet (boven > beneden: sinus, schouder, knie)\n- druk binnenzijde zijkant voet (boven > beneden: neus, bijschildklier, pancreas, duodenum, blaas, staartbeen, sacrum)\n- drukpunten hiel (testikels, ovarium)\n- 4 drukpunten achillespees (omhoog kruipend: ovarium, testikels, hitte opwellingen, pijnlijke maandstonden)\n- bovenzijde voet fricties boven tenen 2x (borst)\n- vliezen tussen tenen (energiekanalen)\n- enkels simultaan duimfricties (buitenzijde: lymfeklieren, thorax – binnenzijde: lymfeklieren, abdomen onderbuik)\nVoetzool\n- druk op uiteinde tenen (sinus)\n- druk dikke teen afwisselende duimen (hersenen, neus, kleine hersenen)\n- druk tussen tenen + naast kleine teen van binnen naar buiten: nek, trapezium, linkeroog 2x, rechteroor 2x, schouder)\n- bal van de voet drukpunten (boven naar beneden: schouders, schildklier, longen/longpijpen, trapezium)\n- drukpunten omhoog kruipend van baan onder dikke teen naar tussen dikke teen en 2e teen > glijden naar beginpunt (schildklier)\n- 1 lange drukpunt op zonnevlek \n- neerdalen nier drukpunt 3x\n- neerdalen met 6 drukpunten van uretus naar blaas (binnenzijde boven hielzone)\n- 1 drukpunt simultaan maag (rechtsboven zonnevlek) & lever/hart (linksboven zonnevlek)\n- neerdalen drukpunt pancreas (rechtsonder maag) & galblaas/milt (rechtsonder lever/hart)\n- linkervoet: in 4 opwaartse drukpunten buitenzijde voet boven hielzone (stijgende darm/ascending colon) en naar binnenzijde onder pancreas (transversale darm) + 1 drukpunt binnenzijde voet \n- rechtervoet: drukpunten van binnenzijde voet onder pancreas (dalende darm/descending colon) en naar buitenzijde voet en naar onder in 3 drukbewegingslijnen en terug naar binnenzijde voet net boven hielzone (rectum)\n- simmultane drukpunten zone boven hielzone (dunne darm)\n- zijwaartse drukpunten van binnen naar buiten net boven hielzone (heup)\n- simultane drukpunten hielzone \n- midden hiel 3x\n effleurage en wissel voet\nEindeffleurage beide voeten: R>L \n- 3 effleurages\n- enkels 1x\n- over voet > onder voet waaier\n- voetwelving 3 drukpunten\n effleurage en wissel voet\n- zonnevlek (duur: 3x in en uitademen -> handen naar de grond)",
"Heavy legs cooling gel / Voetencrème\nEssence relaxante (enkele druppels handen)",
"zonnevlek"
],
[
"Nagels lakken (eerst ontvetten)",
"Ontvetter: dissolvant\nNagellak",
"Vijl, watje"
],
[
"Basecoat aanbrengen",
"Basis laag",
""
],
[
"Kleurlak (2x) – rollen fles -> 1 mm van nagelriem blijven",
"Nagellak",
""
],
[
"French tip smile (eventueel)",
"Witte nagellak",
"Potje, penseeltje/stempel"
],
[
"Topcoat aanbrengen",
"Top laag",
""
],
[
"Advies: Avocado voetencrème",
"",
""
]
]
}
];
