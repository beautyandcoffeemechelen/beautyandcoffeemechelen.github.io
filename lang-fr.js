/* ============================================================
   BEAUTY & COFFEE — French translations (FR)
   Loaded after i18n.js and data.js, before app.js.
   All French text lives in this one file. It is attached to the
   existing NL/EN data as an extra ".fr" value, so data.js and
   i18n.js keep working exactly as before.
   Register: formal "vous". To switch to informal "tu", edit the
   strings below.
   ============================================================ */
(function(){
  "use strict";
  const FR = {
 "i18n": {
  "welcome_eyebrow": "Bienvenue",
  "welcome_title": "Where Beauty Meets Coffee",
  "welcome_lede": "Répondez à quelques questions rapides. Nous vous associerons à une boisson, ainsi qu'au soin ou à l'atelier qui lui correspond parfaitement.",
  "start_button": "Découvrir mon match",
  "change_profile_link": "Ce n'est pas vous ? Modifier votre profil",
  "step_profile_eyebrow": "Étape 1 · Profil",
  "step_profile_title": "Pour qui est ce match ?",
  "step_age_eyebrow": "Étape 2 · Âge",
  "step_age_title": "Quel est votre âge ?",
  "step_sun_eyebrow": "Étape 3 · Contrôle solaire",
  "step_sun_title": "Partez-vous en vacances au soleil dans les 14 jours, ou avez-vous été exposé(e) à un soleil intense ces 14 derniers jours ?",
  "step_sun_hint": "Cela permet de garder l'épilation et les peelings profonds sans danger pour votre peau.",
  "sun_yes": "Oui, exposition au soleil",
  "sun_no": "Aucun soleil prévu",
  "sun_filtered_notice": "Nous écartons l'épilation et les peelings profonds et choisissons à la place des soins doux et hydratants.",
  "step_health_eyebrow": "Étape 4 · À savoir",
  "step_health_title": "Autre chose à nous signaler ?",
  "step_health_hint": "Entièrement facultatif — cela nous aide à choisir un match sûr pour vous.",
  "health_phlebitis": "Phlébite (inflammation des veines)",
  "health_contactLenses": "Je porte des lentilles de contact",
  "health_menstruation": "J'ai mes règles",
  "health_pregnant": "Je suis enceinte",
  "health_musclePain": "Douleurs musculaires / beaucoup de stress",
  "health_roaccutane": "Je prends du Roaccutane (ou j'ai arrêté il y a moins de 2 mois)",
  "roaccutane_filtered_notice": "Nous laissons de côté l'épilation à la cire : ce n'est pas conseillé pendant et jusqu'à 2 mois après le Roaccutane. Vous souhaitez tout de même une épilation ? Parlez-en d'abord avec Sandra.",
  "diet_title": "Faites-vous régulièrement du sport et/ou suivez-vous un régime ? (Vous pouvez cocher les deux)",
  "diet_opt_sport": "Je fais du sport régulièrement",
  "diet_opt_diet": "Je suis un régime",
  "diet_opt_none": "Ni l'un ni l'autre",
  "diet_yes": "Oui",
  "diet_no": "Non",
  "lens_warning_note": "Vous portez des lentilles ? Apportez des lunettes : les lentilles doivent être retirées pendant et après le soin.",
  "step1_eyebrow": "Étape 5 · Humeur",
  "step1_title": "Quelle est votre humeur du jour ?",
  "complaint_label": "Quelque chose que vous souhaitez partager sur ce qui vous gêne ou sur ce que vous aimeriez travailler ? (facultatif)",
  "complaint_placeholder": "Ex. : mon dos est complètement bloqué, ou j'ai vraiment besoin de me détendre…",
  "step2_eyebrow": "Étape 6 · Catégorie de boisson",
  "step2_title": "Choisissez votre direction",
  "step_temp_eyebrow": "Étape 7 · Chaud ou glacé",
  "step_temp_title": "Chaud ou glacé ?",
  "temperature_tea_hint": "Le thé reste chaud : la seule option de thé froid est un Iced Matcha Latte (avec caféine et lait).",
  "step3_eyebrow": "Étape 8 · Caféine",
  "step3_title": "Avec ou sans coup de fouet ?",
  "step4_eyebrow": "Étape 9 · Personnalisation",
  "step4_title": "Faites-en votre boisson",
  "step4_hint": "Facultatif — choisissez-en autant que vous voulez.",
  "step_kidsdrink_eyebrow": "Étape 2 · Boisson",
  "step_kidsdrink_title": "Quelle boisson pour l'accompagner ?",
  "step_context_eyebrow": "Presque terminé",
  "step_context_title": "Où êtes-vous en ce moment ?",
  "context_salon": "Je suis au salon en ce moment",
  "context_salon_sub": "Prenez tout de suite une photo avec le cadre Beauty & Coffee.",
  "context_home": "Je le fais depuis chez moi",
  "context_home_sub": "Enregistrez votre match pour votre prochain rendez-vous ou partagez-le dès maintenant.",
  "step5_eyebrow": "Partagez votre moment",
  "step5_title": "Ajoutez une photo à votre moment partagé",
  "step5_hint": "Facultatif — ajoutez une photo de vous et de votre moment Beauty & Coffee. Tout reste sur votre appareil.",
  "milk_title": "Lait",
  "milk_tea_hint": "Ne concerne que le matcha : choisissez un lait et nous vous servirons un Matcha Latte.",
  "extras_title": "Édulcorants et extras",
  "back_button": "Retour",
  "continue_button": "Suivant",
  "camera_button": "📷 Ouvrir l'appareil photo",
  "upload_button": "📁 Importer une photo",
  "snap_button": "📸 Prendre la photo",
  "cancel_button": "Annuler",
  "retake_button": "🔄 Choisir une autre photo",
  "generate_button": "Générer mon match",
  "finish_photo_button": "Terminé",
  "add_photo_button": "📸 Ajouter une photo à votre moment",
  "filter_title": "Filtre",
  "skip_photo_button": "Passer cette étape",
  "photo_placeholder": "Aucune photo sélectionnée",
  "camera_starting": "Démarrage de l'appareil photo…",
  "camera_denied_text": "Appareil photo indisponible. Choisissez une photo ci-dessous.",
  "upload_instead_button": "Ou importez plutôt une photo",
  "rotate_button": "Pivoter",
  "edit_photo_button": "Recadrer",
  "editor_hint": "Faites glisser pour repositionner, utilisez le curseur pour zoomer.",
  "editor_confirm_button": "Utiliser cette photo",
  "editor_cancel_button": "Annuler",
  "home_no_photo_text": "Pas de photo nécessaire — nous enregistrons votre match pour votre prochaine visite au salon.",
  "brewing_text": "Votre match personnel est en préparation…",
  "result_title": "Votre match Beauty & Coffee",
  "result_saved_title": "Votre match, gardé pour plus tard",
  "share_button": "Partager votre match",
  "download_button": "Télécharger l'image",
  "menu_cta": "Voir la carte et les tarifs",
  "pricelist_button": "💶 Voir les tarifs",
  "pricelist_title": "Tarifs",
  "pricelist_intro": "Tarifs en vigueur depuis le 1/06/2026. Soins uniquement sur rendez-vous.",
  "pricelist_search": "Rechercher un soin…",
  "pricelist_empty": "Aucun résultat. Essayez un autre mot.",
  "pricelist_contact_title": "Prendre rendez-vous ?",
  "pricelist_wa_button": "💬 Envoyer un WhatsApp",
  "pricelist_mail_button": "📩 Envoyer un e-mail",
  "pricelist_wa_text": "Bonjour Sandra ! Je voudrais prendre rendez-vous. Mes jour et heure préférés sont :",
  "pricelist_mail_subject": "Rendez-vous Beauty & Coffee",
  "pricelist_mail_body": "Bonjour Sandra,\n\nJe voudrais prendre rendez-vous pour :\n\nMes jour et heure préférés :\n\nCordialement,",
  "pricelist_website_link": "Toutes les infos sur le site web",
  "another_match_button": "🔄 Autre match",
  "fav_add": "♡ Ajouter aux favoris",
  "fav_saved": "♥ Favori",
  "fav_added_toast": "Ajouté à vos favoris.",
  "fav_removed_toast": "Retiré de vos favoris.",
  "fav_title": "♥ Mes favoris",
  "fav_book": "Réserver via WhatsApp",
  "fav_remove": "Retirer",
  "fav_book_text": "Bonjour Sandra ! Je voudrais réserver un rendez-vous pour ✨ {treatment} avec ☕ {drink}. Mes jour et heure préférés sont :",
  "slots_title": "📅 Quand cela vous convient-il ? (facultatif)",
  "slots_hint": "Je suis actuellement disponible uniquement le week-end, y compris en soirée. Vous pouvez choisir plusieurs moments.",
  "stamp_pin_prompt": "Réservé à Beauty & Coffee : entrez le code du salon.",
  "stamp_pin_wrong": "Code incorrect. Demandez à Sandra d'ajouter un tampon.",
  "stamp_backup_tip": "Astuce : faites une capture d'écran de votre carte de fidélité comme sauvegarde.",
  "stamp_scan_title": "Scannez le code du tampon",
  "stamp_scan_hint": "Dirigez votre caméra vers le code QR sur le téléphone de Sandra.",
  "stamp_manual_label": "Le scan ne fonctionne pas ? Tapez les 6 chiffres sous le code QR :",
  "stamp_manual_button": "Confirmer",
  "stamp_invalid": "Ce code est invalide ou expiré. Utilisez le code affiché en ce moment.",
  "stamp_added_toast": "☕ Tampon ajouté — merci pour votre visite !",
  "stamp_already_today": "Vous avez déjà reçu un tampon aujourd'hui. À la prochaine !",
  "stamp_camera_error": "Caméra indisponible — tapez les 6 chiffres ci-dessous.",
  "stamp_unsupported": "Ce navigateur ne peut pas vérifier le code du tampon. Essayez une version récente de Chrome ou Safari.",
  "stamp_close": "Fermer",
  "stampcard_button": "☕ Ma carte de fidélité",
  "stampcard_title": "Ma carte de fidélité",
  "stampcard_intro": "Au salon, scannez le code QR sur le téléphone de Sandra pour recevoir un tampon. Vous pouvez toujours le faire ici, sans refaire de match.",
  "drink_pop_replay": "Touchez pour rejouer",
  "edit_answers_button": "✏️ Modifier mes réponses",
  "social_follow": "Suivez Beauty & Coffee",
  "social_tag_hint": "Vous partagez votre match sur Instagram ou Facebook ? Identifiez-nous avec {handle}, pour que nous le voyions aussi ! 💛",
  "app_version_label": "Version",
  "update_banner_text": "Une nouvelle version de l'app est disponible (p. ex. nouveaux prix).",
  "update_banner_button": "Actualiser",
  "salon_title": "Mode salon · code du tampon",
  "salon_hint": "Laissez la cliente scanner ce code QR dans l'app. Le code change toutes les 30 secondes.",
  "salon_pin_prompt": "Mode salon : entrez votre PIN du salon.",
  "salon_pin_wrong": "PIN incorrect.",
  "privacy_title": "🔒 Confidentialité en bref",
  "privacy_p1": "Vos photos et vos réponses au contrôle de santé restent sur votre appareil. Elles ne sont envoyées ni à Beauty & Coffee ni à un serveur.",
  "privacy_p2": "Si vous envoyez un message de réservation par e-mail ou WhatsApp, il contient uniquement le soin, la boisson et les disponibilités choisis, ainsi que ce que vous y ajoutez vous-même.",
  "privacy_p3": "Les tampons, favoris et découvertes sont conservés uniquement sur cet appareil. Si vous effacez les données de votre navigateur, ils disparaissent. Vous pouvez aussi les effacer vous-même avec le bouton ci-dessous.",
  "privacy_p4": "Le contrôle de santé sert uniquement à vous proposer un match sûr et ne constitue pas un avis médical.",
  "privacy_p5": "Pour améliorer l'app, nous comptons de façon anonyme sa fréquence d'utilisation (p. ex. nombre de visites et de matchs) via GoatCounter. Sans cookies et sans données permettant de vous identifier.",
  "houserules_button": "📋 Consulter le règlement du salon",
  "houserules_title": "Règlement du salon",
  "houserules_intro": "Pour que votre rendez-vous se déroule de façon agréable et professionnelle.",
  "houserules_teaser_title": "📋 À savoir avant votre rendez-vous",
  "houserules_teaser_1": "Annulation ou report possible jusqu'à 1 heure à l'avance. Ensuite, 50 % du soin est facturé.",
  "houserules_teaser_2": "Venez à l'heure, propre et sans parfum. En cas de plus de 15 minutes de retard, le soin peut être raccourci.",
  "houserules_teaser_3": "Venez seul(e), sauf si vous êtes mineur(e).",
  "houserules_teaser_more": "Lire tout le règlement →",
  "houserules_cancel_title": "Annuler ou reporter ?",
  "houserules_cancel_text": "Appelez ou envoyez un SMS au plus tard 1 heure avant votre rendez-vous :",
  "houserules_thanks": "Merci pour votre compréhension et votre collaboration ! Grâce à ces règles, Beauty & Coffee veille à ce que chaque client soit accueilli dans un environnement hygiénique, détendu et professionnel.",
  "skinfact_title": "💡 Le saviez-vous : peau, cheveux et pieds",
  "skinfact_more": "🔄 Un autre fait",
  "skinfact_disclaimer": "Information éducative, pas un avis médical. En cas de doute, consultez votre médecin ou un dermatologue.",
  "install_banner_title": "Installez Beauty & Coffee",
  "install_banner_sub": "Ajoutez l'app à votre écran d'accueil — pas besoin d'App Store.",
  "install_banner_ios_sub": "Appuyez sur ⬆️ Partager, puis « Sur l'écran d'accueil ».",
  "install_banner_button": "Installer",
  "news_title": "📰 Nouveau sur le blog",
  "news_read_more": "Lire la suite",
  "news_all": "Tous les articles sur le site",
  "news_offline": "Vous êtes hors ligne — voici les articles de votre dernière visite.",
  "privacy_p6": "La rubrique actualités charge les derniers articles du blog depuis WordPress.com, qui héberge mon site. Comme tout site web, WordPress.com voit votre adresse IP. Aucune de vos réponses ni photo n'est envoyée.",
  "newsletter_title": "☕ Restez informé·e",
  "newsletter_sub": "Nouveaux soins, promotions comme le tonneau à surprises, et dates d'ateliers — un e-mail de temps en temps, jamais de spam.",
  "newsletter_placeholder": "vous@exemple.be",
  "newsletter_button": "S'inscrire",
  "newsletter_note": "Ouvre votre application e-mail avec un message prêt à l'emploi — vous l'envoyez vous-même.",
  "newsletter_web_button": "S'inscrire via mon site",
  "newsletter_web_note": "Vous vous inscrivez sur mon site et confirmez d'un clic dans votre boîte mail. Désinscription possible à tout moment en bas de chaque e-mail.",
  "newsletter_mail_subject": "Inscription newsletter Beauty & Coffee",
  "newsletter_mail_body": "Bonjour Sandra,\n\nJe voudrais rester informé(e) des nouveaux soins et promotions chez Beauty & Coffee.\n\nMon adresse e-mail : {email}\n\nCordialement,",
  "newsletter_sent_toast": "Presque fini — envoyez l'e-mail qui vient de s'ouvrir.",
  "practical_info_title": "📍 Bon à savoir",
  "practical_info_hours": "Actuellement disponible uniquement le week-end, y compris en soirée — pas de rendez-vous en semaine et (temporairement) pas de visites à domicile, en raison de cours du soir.",
  "practical_info_parking": "🚗 En voiture ? Garez-vous sur la Jubellaan ou sur les places à l'entrée de la Barbarastraat, avant de tourner vers les maisons — pas jusqu'aux maisons, il n'y a pas de place pour les visiteurs. De là, 2 minutes à pied (depuis la Jubellaan, environ 5 minutes). Vélo ou vélo cargo ? Attachez-le avec les vélos.",
  "practical_info_route": "🗺️ Itinéraire dans Google Maps",
  "route_map_title": "📍 Comment me trouver",
  "findme_button": "📍 Accès & stationnement",
  "findme_title": "Comment me trouver",
  "migrate_done": "☕ Bienvenue à la nouvelle adresse ! Votre carte de fidélité a déménagé avec vous.",
  "contact_title": "Des questions ou un retard en route ?",
  "contact_hint": "N'hésitez pas à me contacter — par téléphone, WhatsApp ou e-mail.",
  "contact_call": "📞 Appeler",
  "contact_whatsapp": "💬 WhatsApp",
  "contact_mail": "✉️ E-mail",
  "contact_wa_text": "Bonjour Sandra, j'ai une question concernant mon rendez-vous chez Beauty & Coffee :",
  "contact_mail_subject": "Question concernant mon rendez-vous chez Beauty & Coffee",
  "route_map_caption": "🅿️ Garez-vous sur la Jubellaan ou à l'entrée de la Barbarastraat, pas près des maisons (en rouge). Touchez la carte pour l'itinéraire dans Google Maps.",
  "restart_button": "Recommencer",
  "footer_privacy": "Vos photos restent toujours sur votre appareil — 100 % privé.",
  "footer_reset_button": "Effacer mes données locales",
  "reminder_button": "📅 Ajouter un rappel à mon agenda",
  "book_email_button": "📩 Réserver ce rendez-vous par e-mail",
  "book_email_subject": "Réservation - Beauty & Coffee",
  "book_email_body": "Bonjour Sandra,\n\nJe voudrais réserver un rendez-vous pour :\n✨ Soin : {treatment}\n☕ Boisson : {drink}\n\nMes jour et heure préférés : {slots}\n\nCordialement,",
  "book_whatsapp_button": "💬 Réserver ce rendez-vous via WhatsApp",
  "book_whatsapp_text": "Bonjour Sandra ! Je voudrais réserver un rendez-vous pour ✨ {treatment} avec ☕ {drink}. Mes jour et heure préférés sont : {slots}",
  "reminder_ics_title": "Beauty & Coffee — prochain moment",
  "reminder_weeks_label": "Dans combien de semaines souhaitez-vous un rappel ?",
  "reminder_saved_toast": "Rappel téléchargé — ouvrez le fichier pour l'ajouter à votre agenda.",
  "welcome_back_title": "Bon retour ☕ — voici ce que vous avez découvert jusqu'ici :",
  "review_prompt_text": "❤️ Nous espérons que votre moment Beauty & Coffee vous a fait du bien ! Voulez-vous le partager avec d'autres via un avis Google ?",
  "review_prompt_button": "⭐ Écrire un avis",
  "review_prompt_dismiss": "Pas maintenant",
  "stamps_label": "tampons",
  "treatments_discovered_label": "soins découverts",
  "drinks_discovered_label": "boissons découvertes",
  "stamp_card_title": "Ma carte de fidélité",
  "stamp_card_hint": "Au salon, scannez le code QR sur le téléphone de Sandra pour recevoir un tampon.",
  "stamp_card_button": "📷 Scanner le QR du tampon",
  "stamp_confirm_text": "Ajouter un tampon pour cette visite ? Idéalement à faire avec Beauty & Coffee au salon.",
  "stamp_card_full_toast": "🎉 Carte complète ! Parlez de votre récompense avec Beauty & Coffee.",
  "collection_title": "Mes découvertes",
  "loyalty_privacy_note": "Ces données sont conservées uniquement sur cet appareil.",
  "reset_confirm_text": "Voulez-vous vraiment effacer tous vos tampons, favoris et découvertes locaux ? Cette action est irréversible.",
  "reset_done_toast": "Vos données locales ont été effacées.",
  "drink_label": "Boisson",
  "treatment_label": "Soin / atelier",
  "with_label": "Avec",
  "block_benefits": "Les bienfaits",
  "block_funfact": "Le saviez-vous ?",
  "block_aftercare": "Consignes précises après le soin",
  "block_homecare": "Soins à domicile recommandés",
  "block_caution": "À noter",
  "block_price": "Tarif au salon",
  "homecare_generic_tip": "Cette catégorie est actuellement épuisée dans notre boutique — n'hésitez pas à demander une alternative adaptée au salon.",
  "homecare_soap_tip_label": "🧼 Savon assorti :",
  "overlay_title": "Mon match Beauty & Coffee ☕✨",
  "overlay_drink_prefix": "Boisson : ",
  "overlay_treatment_prefix": "Soin : ",
  "overlay_tagline": "Where Beauty Meets Coffee",
  "share_text": "Découvrez mon match Beauty & Coffee !",
  "toast_downloaded": "Image téléchargée",
  "toast_share_unsupported": "Le partage n'est pas pris en charge sur cet appareil — l'image a été téléchargée à la place.",
  "toast_camera_denied": "Appareil photo indisponible. Essayez plutôt d'importer une photo.",
  "toast_saved_home": "Match enregistré — à bientôt au salon !",
  "moods": {
   "relax": {
    "title": "Détente et moment pour soi",
    "sub": "Calme, chaleur, vous-même."
   },
   "energetic": {
    "title": "Énergie et mine fraîche",
    "sub": "Net, frais, prêt pour la journée."
   },
   "focus": {
    "title": "Concentration et soin profond",
    "sub": "Du calme pour la peau, du temps pour vous."
   },
   "luxury": {
    "title": "Chouchoutage de luxe et éclat",
    "sub": "Le moment de bien-être complet."
   },
   "group": {
    "title": "En groupe et pédagogique (ateliers)",
    "sub": "Apprendre, déguster, partager."
   }
  },
  "categories": {
   "coffee": {
    "title": "Café",
    "sub": "Origines et mélanges"
   },
   "tea": {
    "title": "Thé et infusions",
    "sub": "En vrac ou en sachet"
   },
   "matcha": {
    "title": "Matcha",
    "sub": "Nature, latte ou glacé"
   }
  },
  "temperature": {
   "hot": {
    "title": "Chaud",
    "sub": "Préparé de façon classique"
   },
   "iced": {
    "title": "Glacé",
    "sub": "Frais et rafraîchissant"
   }
  },
  "caffeine": {
   "caff": {
    "title": "Avec caféine",
    "sub": "À pleine puissance"
   },
   "decaf": {
    "title": "Décaféiné / sans caféine",
    "sub": "En douceur"
   }
  },
  "profiles": {
   "kind": {
    "title": "Enfant (jusqu'à 15 ans)",
    "sub": "Manucure enfant + boisson enfant"
   },
   "man": {
    "title": "Homme (16+)",
    "sub": "Soins du visage, des mains, des pieds et épilation"
   },
   "vrouw": {
    "title": "Femme (16+)",
    "sub": "Toute la carte Beauty & Coffee"
   }
  },
  "age": {
   "16-29": "16 – 29 ans",
   "30-44": "30 – 44 ans",
   "45plus": "45 ans et plus"
  },
  "milk": {
   "none": "Sans lait",
   "whole": "Lait entier",
   "oat": "Lait d'avoine",
   "extra": "Lait supplémentaire"
  },
  "extras": {
   "honey": "Miel d'acacia",
   "sugar": "Sucre",
   "cream": "Chantilly",
   "icecream": "Boule de glace à la vanille",
   "biscoff": "Miettes de Biscoff",
   "pumpkin": "Sirop d'épices à la citrouille"
  },
  "kidsdrinks": {
   "water": "Eau plate",
   "chocolate": "Chocolat chaud"
  },
  "filters": {
   "none": "Aucun",
   "glow": "Éclat",
   "warm": "Chaud",
   "bw": "Noir et blanc",
   "vintage": "Vintage",
   "cartoon": "Manga",
   "mangacolor": "Manga couleur"
  }
 },
 "treatments": {
  "expressfacial": {
   "benefits": "Un rafraîchissement rapide mais complet : nettoyage, nettoyage en profondeur, masque crème et crème de jour — idéal quand vous manquez de temps mais voulez une peau fraîche.",
   "funfact": "Même un soin court aide : une peau propre absorbe mieux les actifs d'un masque et d'une crème de jour.",
   "aftercare": "Utilisez un SPF chaque jour pendant les prochains jours, buvez suffisamment d'eau et laissez votre peau se reposer autant que possible pendant les 24 premières heures, sans maquillage lourd."
  },
  "acnefacial": {
   "benefits": "Un soin du visage purifiant pour les peaux à imperfections ou grasses, avec une analyse de peau lors du premier soin pour l'adapter vraiment à votre peau.",
   "funfact": "Les imperfections apparaissent souvent quand le sébum et les cellules mortes bouchent ensemble un pore — un nettoyage doux et régulier aide à l'éviter.",
   "aftercare": "Touchez votre visage le moins possible, évitez le maquillage lourd pendant les 24 premières heures et protégez votre peau chaque jour avec un SPF léger et non gras.",
   "caution": "Vous prenez un médicament contre l'acné (p. ex. Roaccutane) ou un traitement prescrit par un dermatologue ? Prévenez-nous à l'avance pour que nous adaptions le soin."
  },
  "bridaltrial": {
   "benefits": "Une séance d'essai détendue pour créer ensemble votre look de mariée : nous testons les couleurs, la tenue et le style, pour être sûre du résultat le grand jour.",
   "funfact": "Il vaut mieux prévoir l'essai quelques semaines avant le mariage — vous pouvez ainsi voir le look en photo et à la lumière du jour.",
   "aftercare": "Démaquillez-vous soigneusement le soir avec un nettoyant doux, puis appliquez une crème hydratante."
  },
  "bridalpackage": {
   "benefits": "Le forfait complet : une séance d'essai pour créer votre look et le maquillage le jour même du mariage, pour que chaque détail soit parfait.",
   "funfact": "Le maquillage minéral est léger et respirant, il reste donc confortable même pendant une longue journée de mariage.",
   "aftercare": "Démaquillez-vous soigneusement le soir avec un nettoyant doux, puis appliquez une crème hydratante."
  },
  "weddingguest": {
   "benefits": "Un maquillage soigné pour la maman, le témoin, la demoiselle d'honneur ou l'invitée le jour du mariage — harmonisé avec le look de la mariée.",
   "funfact": "Pour un petit groupe le même jour, nous faisons un planning pour que chacune soit prête à temps et détendue.",
   "aftercare": "Démaquillez-vous soigneusement le soir avec un nettoyant doux, puis appliquez une crème hydratante."
  },
  "browtint": {
   "benefits": "La coloration des poils de sourcils pour un regard plus fourni et mieux défini — sans crayon tous les jours.",
   "funfact": "Les poils de sourcils clairs ou gris deviennent visibles grâce à la teinture, ce qui donne des sourcils plus fournis.",
   "aftercare": "Ne mouillez pas vos sourcils pendant les 24 premières heures, évitez sauna et vapeur, et n'utilisez pas de gommage sur cette zone.",
   "caution": "Pour une première coloration, il est préférable de faire un test cutané 48 heures avant pour exclure une réaction allergique."
  },
  "browshaping": {
   "benefits": "Nous mesurons vos sourcils selon votre visage (mapping), puis nous les mettons joliment en forme par épilation.",
   "funfact": "Avec le brow mapping, nous déterminons le début, le point le plus haut et la fin du sourcil à partir du nez, de la pupille et du coin de l'œil.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "lashtint": {
   "benefits": "La teinture des cils pour un regard plus intense, même sans mascara — pratique en vacances, pour le sport ou une semaine chargée.",
   "funfact": "Les pointes des cils sont souvent plus claires que la base ; la teinture les fait paraître soudain plus longs.",
   "aftercare": "Ne mouillez pas vos cils pendant les 24 premières heures, ne vous frottez pas les yeux et évitez sauna et vapeur.",
   "caution": "Pour une première coloration, il est préférable de faire un test cutané 48 heures avant pour exclure une réaction allergique."
  },
  "manicureexpress": {
   "benefits": "Des mains soignées en peu de temps : coupe, limage, soin des cuticules et crème nourrissante pour les mains.",
   "funfact": "Un ongle pousse en moyenne d'environ 3 millimètres par mois — le renouvellement complet d'un ongle prend donc plusieurs mois.",
   "aftercare": "Hydratez vos mains et vos cuticules chaque jour et portez des gants pour la vaisselle ou le ménage."
  },
  "kin": {
   "benefits": "Un menton lisse, rapidement et proprement — sans rasoir ni pince.",
   "funfact": "Les poils du menton peuvent devenir plus visibles avec les variations hormonales ; une épilation régulière permet de les maîtriser.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "bovenlip": {
   "benefits": "Une lèvre supérieure lisse avec un résultat qui dure des semaines.",
   "funfact": "La peau au-dessus de la lèvre est fine et sensible ; c'est pourquoi nous utilisons ici une cire douce ou le threading.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "wenkbrauwontharing": {
   "benefits": "Votre forme de sourcils actuelle nettoyée avec soin — pour un regard soigné sans changer la forme.",
   "funfact": "Le threading est une technique d'épilation ancestrale avec un fil de coton torsadé, sans cire sur la peau.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "schouders": {
   "benefits": "Des épaules lisses et soignées — pratique en combinaison avec une épilation du dos.",
   "funfact": "Après des séances répétées, les poils des épaules repoussent souvent plus fins.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "borstbuik": {
   "benefits": "Le torse et le ventre lisses et soignés en une seule séance, avec un résultat qui dure des semaines.",
   "funfact": "Traiter les deux ensemble revient moins cher que séparément, et votre peau n'a besoin de récupérer qu'une seule fois.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "volledigebenen": {
   "benefits": "Des jambes lisses pendant des semaines, de la cheville à la cuisse.",
   "funfact": "Après plusieurs séances d'épilation, les poils repoussent souvent plus fins et plus clairsemés.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "harmonizingback": {
   "benefits": "Un court moment de soin pour votre dos : un gommage et un massage pour une peau douce et lisse et des muscles détendus.",
   "funfact": "Le dos est une zone difficile à atteindre soi-même — c'est pourquoi la peau y reçoit souvent le moins de soins.",
   "aftercare": "Buvez suffisamment d'eau et appliquez une lotion nourrissante sur votre dos les jours suivants."
  },
  "teambeauty": {
   "benefits": "Un forfait exclusif pour votre équipe ou groupe d'amis : un atelier approfondi au choix (soin du visage avec retouche maquillage, maquillage beauté ou threading), un bar à specialty coffee, une boisson de bienvenue, des bouchées sucrées et salées, un affogato et une attention luxueuse pour chacun.",
   "funfact": "Affogato signifie « noyé » en italien : une boule de glace vanille arrosée d'un espresso chaud — ou chez nous aussi de matcha.",
   "aftercare": "Inscrivez-vous au moins 1 semaine à l'avance. Après un soin du visage, utilisez de préférence un SPF chaque jour."
  },
  "teamcoffee": {
   "benefits": "Un forfait exclusif autour du café : un atelier café approfondi au choix (Dégustation Specialty Coffee Base ou Approfondie), un bar à specialty coffee, une boisson de bienvenue, des bouchées sucrées et salées et un affogato.",
   "funfact": "Le specialty coffee est un café noté au moins 80 sur 100 par des dégustateurs certifiés.",
   "aftercare": "Inscrivez-vous au moins 1 semaine à l'avance. Ensuite, notez votre café et votre méthode préférés pour la maison."
  },
  "cateye": {
   "benefits": "Apprenez à créer vous-même un superbe effet magnétique « Cat Eye » sur vos ongles, avec tous les vernis professionnels, aimants et lampes UV/LED — ainsi que specialty coffee/thé et douceurs maison.",
   "funfact": "Le vernis gel cat eye contient de fines particules métalliques ; un aimant les aligne, ce qui crée ce reflet lumineux typique.",
   "aftercare": "Appliquez chaque jour de l'huile pour cuticules et faites toujours retirer le vernis gel par un professionnel (soak-off) — ne l'arrachez jamais.",
   "caution": "Max. 2 participantes. Vos ongles doivent être totalement libres de vernis, vernis gel ou ongles en gel au début."
  },
  "hotstone": {
   "benefits": "Un massage du corps profondément relaxant avec des pierres chaudes qui glissent sur la peau, combiné à des techniques de massage manuelles — un moment pour vous relâcher complètement.",
   "funfact": "Les pierres sont généralement en basalte, une roche volcanique qui garde longtemps la chaleur — c'est pourquoi le massage reste agréablement chaud.",
   "aftercare": "Buvez davantage d'eau pendant les premières 24 heures, évitez une douche chaude ou le sauna juste après, et prenez le temps de vous reposer."
  },
  "cupping": {
   "benefits": "Un massage intensif où des ventouses sont utilisées localement en combinaison avec des techniques de massage manuelles, par exemple sur le dos, les épaules, les bras ou les jambes.",
   "funfact": "Les célèbres « marques de ventouses » sont dues à l'aspiration que les ventouses exercent sur la peau — plus la marque est foncée, plus la réaction locale a été intense. C'est pourquoi nous traitons toujours des zones ciblées, jamais le corps entier en une seule fois.",
   "caution": "Les ventouses ne conviennent pas en cas de fièvre, de maladie de peau contagieuse, d'ulcère à l'estomac ou à l'intestin, de maladie cardiaque ou d'insuffisance pondérale — prévenez-nous à l'avance si l'un de ces cas vous concerne. L'exposition au soleil est possible après un massage aux ventouses localisé.",
   "aftercare": "Certaines personnes se sentent assez fatiguées et un peu sensibles après les ventouses — comme après un entraînement intense. Il vaut mieux ne rien prévoir ensuite : rentrez directement chez vous, évitez le travail et les courses, et accordez-vous du repos. N'exposez pas non plus tout de suite la peau traitée à une douche ou un bain chaud ou froid. Buvez suffisamment d'eau, utilisez éventuellement de l'huile d'arnica contre les bleus, et sachez que les marques peuvent rester visibles environ 7 jours — bon à savoir avant un moment en maillot de bain, un mariage ou une séance photo. Pour un entretien durable, une séance toutes les 3 à 6 semaines est recommandée."
  },
  "cuppingpeeling": {
   "benefits": "Un soin complet pour une zone du corps choisie : un peeling corporel et un Thermo Body Pack, suivis d'un massage intensif aux ventouses. Peel → Wrap → Cup → Coffee.",
   "funfact": "Comme les ventouses constituent un soin intensif, le corps entier n'est pas traité en une seule séance. Une autre zone du corps peut, si cela convient, être traitée lors d'un rendez-vous ultérieur — le choix de la zone et du parcours est discuté lors de l'entretien préalable.",
   "caution": "Les ventouses ne conviennent pas en cas de fièvre, de maladie de peau contagieuse, d'ulcère à l'estomac ou à l'intestin, de maladie cardiaque ou d'insuffisance pondérale — prévenez-nous à l'avance si l'un de ces cas vous concerne. Vous prévoyez une exposition au soleil après ce soin ? Nous vous déconseillons alors le peeling en raison de la sensibilité accrue de la peau.",
   "aftercare": "Certaines personnes se sentent assez fatiguées et un peu sensibles après les ventouses — comme après un entraînement intense. Il vaut mieux ne rien prévoir ensuite : rentrez directement chez vous, évitez le travail et les courses, et accordez-vous du repos. N'exposez pas non plus tout de suite la peau traitée à une douche ou un bain chaud ou froid. Évitez en outre, pendant les 24 à 48 premières heures, le soleil direct, les bancs solaires et les saunas sur la zone traitée — utilisez ensuite un SPF élevé. Buvez suffisamment d'eau, utilisez éventuellement de l'huile d'arnica contre les bleus, et sachez que les marques peuvent rester visibles environ 7 jours — bon à savoir avant un moment en maillot de bain, un mariage ou une séance photo."
  },
  "swedish": {
   "benefits": "Un massage complet et relaxant de tout le corps, avec de l'attention pour chaque zone — l'intensité s'adapte à votre préférence.",
   "funfact": "Le massage suédois combine cinq mouvements classiques et constitue la base de la plupart des techniques de massage occidentales.",
   "aftercare": "Buvez beaucoup d'eau pendant les premières 24 heures, évitez les repas copieux juste après le massage et prévoyez des moments de repos."
  },
  "swedishbackneck": {
   "benefits": "Un massage relaxant avec une attention particulière pour le dos, la nuque et les épaules — idéal dès que vous avez besoin d'un moment de calme.",
   "funfact": "Ce massage plus court se concentre volontairement sur les zones où s'accumulent le plus de tensions — idéal quand un massage complet n'est pas (encore) envisageable, par exemple pendant la grossesse.",
   "aftercare": "Buvez suffisamment d'eau après le massage et prenez le temps de bouger doucement ensuite."
  },
  "swedishlegs": {
   "benefits": "Un massage relaxant pour des jambes et des pieds fatigués ou lourds.",
   "funfact": "Rester longtemps debout ou assis favorise l'accumulation de liquide dans le bas des jambes — un massage ciblé aide à relancer la circulation.",
   "aftercare": "Si possible, gardez les jambes légèrement surélevées un moment après le massage et buvez suffisamment d'eau."
  },
  "backwrap": {
   "benefits": "Un enveloppement du dos soignant avec un peeling rafraîchissant, un enveloppement aux algues revitalisant et un massage.",
   "funfact": "Un enveloppement corporel associe la chaleur à des actifs, ce qui aide la peau à mieux les absorber.",
   "aftercare": "Vous pouvez vous doucher normalement une fois de retour chez vous — buvez simplement assez d'eau et hydratez la peau chaque jour."
  },
  "manipedispa": {
   "benefits": "Des mains et des pieds soignés en une seule séance, avec une touche SPA extra relaxante.",
   "funfact": "Des manucures et pédicures régulières améliorent non seulement l'aspect, mais aussi la santé des ongles à long terme.",
   "aftercare": "Vous choisissez un vernis gel ou du gel de construction (BIAB) ? Vos ongles sont secs et à l'épreuve des traces immédiatement ! Pour un vernis classique, comptez 2 heures (mains) ou 4 heures (pieds dans des chaussures fermées) de séchage complet. Appliquez chaque jour de l'huile pour cuticules pour un résultat optimal."
  },
  "browlift": {
   "benefits": "Un regard ouvert et éveillé sans coiffage quotidien — les poils des sourcils restent en place pendant des semaines.",
   "funfact": "Un brow lift utilise la même technique qu'un lash lift, mais appliquée aux sourcils.",
   "aftercare": "Gardez les sourcils secs pendant 24 heures et évitez les démaquillants à base d'huile sur la zone des sourcils pendant les 48 premières heures."
  },
  "hennabrows": {
   "benefits": "Des sourcils à l'aspect plus fourni, avec une intensité de couleur naturelle qui dure des semaines.",
   "funfact": "Le henné colore non seulement les poils, mais aussi la peau en dessous, pour un effet encore plus dense.",
   "aftercare": "Gardez les sourcils secs pendant 24 heures et évitez les gommages ou peelings autour des sourcils pendant 3 jours."
  },
  "lashlift": {
   "benefits": "Des cils recourbés et plus foncés sans mascara — un gain de temps dans votre routine matinale.",
   "funfact": "L'effet d'un lash lift dure en moyenne un cycle complet de pousse des cils, soit environ 6 à 8 semaines.",
   "aftercare": "Gardez les cils complètement secs pendant les 24 premières heures et évitez le démaquillant à base d'huile."
  },
  "glammakeup": {
   "benefits": "Un look prêt pour les photos et la fête, adapté à votre occasion et à votre type de peau.",
   "funfact": "Le maquillage glamour professionnel utilise des techniques de superposition pour que le look tienne toute la soirée.",
   "aftercare": "Démaquillez-vous soigneusement le soir avec un nettoyant doux et hydratez la peau avant de dormir."
  },
  "hydrapeel": {
   "benefits": "Un peeling soignant pour un teint terne ou fatigué et un teint irrégulier.",
   "funfact": "Votre peau a une véritable fonction de barrière : elle limite au minimum la perte d'humidité et empêche les substances nocives de pénétrer.",
   "aftercare": "Utilisez un SPF 50 chaque jour pendant 7 jours, évitez l'exposition au soleil pendant 14 jours et n'utilisez pas de gommage pendant 48 heures."
  },
  "signaturefacial": {
   "benefits": "Un soin du visage complet, avec attention pour le nettoyage, l'état de la peau, les soins et la détente.",
   "funfact": "Saviez-vous que votre peau se renouvelle en permanence ? Environ toutes les 4 semaines, vous avez un épiderme entièrement neuf.",
   "aftercare": "Utilisez un SPF 50 chaque jour pendant 7 jours et buvez suffisamment d'eau pour soutenir l'effet purifiant."
  },
  "fillme": {
   "benefits": "Apporte l'acide hyaluronique en profondeur dans la peau pour un effet repulpant et rajeunissant.",
   "funfact": "Le soin utilise des micro-aiguilles plus fines qu'un cheveu pour administrer le sérum efficacement.",
   "aftercare": "Évitez de vous maquiller pendant les 24 premières heures et restez à l'écart du soleil et du sauna pendant 48 heures. L'application quotidienne d'une crème solaire SPF 50 est essentielle pour bien protéger votre peau tout juste rafraîchie."
  },
  "fruitacid": {
   "benefits": "Un peeling professionnel aux acides de fruits, visant un teint plus frais et plus uniforme.",
   "funfact": "L'épiderme se compose de pas moins de 4 à 5 fines sous-couches — les zones très sollicitées, comme la paume des mains, ont même une couche supplémentaire.",
   "aftercare": "Utilisez un SPF 50 chaque jour pendant 7 jours, évitez l'exposition au soleil pendant 14 jours et n'utilisez pas de produits actifs pendant 48 heures."
  },
  "liftsummere": {
   "benefits": "Un soin complet pour une peau présentant des signes visibles de vieillissement et une perte de fermeté.",
   "funfact": "Sous votre peau se trouve l'hypoderme, qui agit comme un véritable « amortisseur » — cette couche de graisse absorbe les chocs extérieurs et donne de la structure.",
   "aftercare": "Utilisez un SPF chaque jour, buvez suffisamment d'eau et évitez un maquillage épais pendant les 24 premières heures."
  },
  "detoxback": {
   "benefits": "Un soin complet du dos avec nettoyage en profondeur, soin des imperfections, un enveloppement nourrissant et un massage relaxant.",
   "funfact": "Le dos est l'une des zones les plus difficiles à soigner soi-même — une raison de plus pour un soin en salon.",
   "aftercare": "Portez de préférence des vêtements amples pendant les 24 premières heures. Vous pouvez vous doucher normalement une fois de retour chez vous."
  },
  "antiagefacial": {
   "benefits": "Un soin botanique complet du visage pour une peau présentant des signes visibles de vieillissement.",
   "funfact": "La couche basale contient aussi des mélanocytes — les cellules pigmentaires qui déterminent la couleur de votre peau et jouent un rôle dans son évolution au fil du temps.",
   "aftercare": "Utilisez un SPF 50 chaque jour pendant 7 jours et démaquillez-vous soigneusement le soir."
  },
  "harmonizingbody": {
   "benefits": "Un soin du corps soignant avec peeling et massage pour une peau rugueuse, sèche ou irrégulière — également agréable comme soin supplémentaire après l'épilation.",
   "funfact": "Ce soin combine exfoliation, massage et masque en une seule séance continue.",
   "aftercare": "Buvez beaucoup d'eau pendant les premières 24 heures et hydratez la peau chaque jour avec une lotion pour le corps."
  },
  "fullbodywrap": {
   "benefits": "Un rituel complet pour le corps avec un peeling rafraîchissant, un enveloppement aux algues revitalisant et un massage — un moment pour ralentir complètement.",
   "funfact": "Un enveloppement corps entier est souvent combiné à de la chaleur pour aider les actifs à pénétrer plus profondément.",
   "aftercare": "Vous pouvez vous doucher normalement une fois de retour chez vous — buvez simplement davantage d'eau le premier jour."
  },
  "makeupworkshop": {
   "benefits": "Un atelier privé amusant où vous apprenez à vous maquiller joliment et pratiquement — avec un copieux assortiment de douceurs fraîches Beauty & Coffee et, pour finir, un affogato à la glace vanille.",
   "funfact": "Les participants repartent avec une liste de produits personnelle adaptée à leur type de peau.",
   "aftercare": "Aucun soin particulier nécessaire — nettoyez la peau comme d'habitude en fin de journée."
  },
  "facialworkshop": {
   "benefits": "Découvrez une routine de soin simple et apprenez à finaliser ensuite votre look avec une jolie retouche maquillage.",
   "funfact": "Vous repartez avec l'ordre exact des produits qui convient le mieux à votre peau — ainsi qu'une pochette cadeau remplie de miniatures pour essayer tout de suite votre nouvelle routine à la maison.",
   "aftercare": "Utilisez un SPF chaque jour après un soin du visage et hydratez bien votre peau le soir."
  },
  "tastingbasic": {
   "benefits": "Apprenez les bases de la dégustation de café : reconnaître l'arôme, l'acidité et l'arrière-goût.",
   "funfact": "Notre Peru Single Origin et notre House Blend figurent tous deux dans cette dégustation.",
   "aftercare": "Aucun soin nécessaire — n'hésitez pas à savourer une autre tasse ensuite."
  },
  "tastingadvanced": {
   "benefits": "Plongez plus profondément dans la comparaison des origines et les méthodes d'extraction, comme un vrai barista.",
   "funfact": "Vous goûterez les mêmes grains préparés en V60, en French Press et à la cafetière moka pour sentir la différence.",
   "aftercare": "Aucun soin nécessaire — notez votre méthode d'extraction préférée pour chez vous."
  },
  "baristaworkshop": {
   "benefits": "Apprenez à préparer de délicieux espressos, boissons à base d'espresso et cafés lents à la maison, avec notamment un V60, une French Press, un Phin et une cafetière moka.",
   "funfact": "Un latte art parfait commence par un lait vapeur à la texture de microfoam exacte.",
   "aftercare": "Aucun soin nécessaire — n'hésitez pas à vous entraîner chez vous sur votre propre machine à espresso."
  },
  "manicure": {
   "benefits": "Coupe, limage, soin des cuticules, polissage, soin du pourtour des ongles et massage des mains.",
   "funfact": "Un soin régulier des cuticules prévient à terme les envies et les cuticules sèches.",
   "aftercare": "Vous choisissez un vernis gel ou du gel de construction (BIAB) ? Vos ongles sont secs et à l'épreuve des traces immédiatement ! Pour un vernis classique, comptez 2 heures (mains) de séchage complet. Appliquez chaque jour de l'huile pour cuticules pour un résultat optimal."
  },
  "pedicureexpress": {
   "benefits": "Une pédicure de base pour des ongles et un pourtour d'ongles soignés — coupe, limage, nettoyage du pourtour des ongles et crème pour les pieds.",
   "funfact": "Cette version omet volontairement l'élimination des callosités et le massage — idéale quand vous voulez des pieds présentables rapidement, sans soin complet.",
   "aftercare": "Hydratez régulièrement vos pieds et vos cuticules, surtout que cette version ne comprend pas le traitement des callosités."
  },
  "pedicure": {
   "benefits": "Une pédicure complète avec attention pour les ongles, le pourtour des ongles, les cuticules, les callosités et la détente.",
   "funfact": "Éliminer les callosités n'est pas qu'esthétique — cela prévient aussi les points de pression en marchant.",
   "aftercare": "Vous choisissez un vernis gel ou du gel de construction (BIAB) ? Vos ongles sont secs et à l'épreuve des traces immédiatement ! Pour un vernis classique, comptez 4 heures (pieds dans des chaussures fermées) de séchage complet. Appliquez chaque jour de l'huile pour cuticules pour un résultat optimal."
  },
  "slimmassage": {
   "benefits": "Un massage ferme du corps qui travaille d'abord autour des zones ganglionnaires puis applique des techniques de massage plus profondes sur les zones du corps souhaitées — axé sur le soin de la peau et les contours du corps dans le cadre du protocole de massage enseigné.",
   "funfact": "Cette technique de massage combine des prises fermes et des directions de mouvement spécifiques pour un effet raffermissant.",
   "aftercare": "Buvez davantage d'eau pendant les premières 24 heures pour favoriser l'élimination des déchets."
  },
  "oksel": {
   "benefits": "Des semaines d'aisselles douces et lisses sans rasage quotidien.",
   "funfact": "La cire arrache le poil à la racine : la repousse est donc plus lente et plus douce qu'avec le rasage.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, le déodorant, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "been": {
   "benefits": "Des semaines de jambes lisses, avec une repousse plus fine et plus lente qu'avec le rasage.",
   "funfact": "Après plusieurs séances d'épilation à la cire, les poils repoussent souvent plus fins et plus clairsemés.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "rug": {
   "benefits": "Un dos lisse et soigné, sans la corvée de raser soi-même une zone difficile d'accès.",
   "funfact": "Le dos est l'une des zones d'épilation à la cire les plus demandées par les hommes avant l'été.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "buik": {
   "benefits": "Un ventre lisse aux résultats durables et à la repousse plus fine.",
   "funfact": "La peau du ventre est plus sensible, c'est pourquoi nous utilisons ici une cire extra douce.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  },
  "borst": {
   "benefits": "Un torse soigné et lisse, avec des résultats qui durent des semaines.",
   "funfact": "Comme pour le dos, les poils repoussent souvent plus fins après des soins répétés.",
   "aftercare": "Évitez l'exposition directe au soleil, les bancs solaires, les vêtements serrés, les douches chaudes et les saunas pendant les 24 à 48 premières heures. Appliquez toujours une crème solaire à haute protection (SPF 50) sur les zones exposées pour prévenir les rougeurs et l'hyperpigmentation."
  }
 },
 "kid": {
  "benefits": "Un soin sûr et adapté aux enfants pour les petites mains, accompagné d'une boisson.",
  "funfact": "Nous utilisons un vernis peel-off spécialement conçu pour les enfants — après quelques jours, ils peuvent retirer eux-mêmes la couche d'un seul morceau.",
  "aftercare": "Pas besoin d'acétone ni de dissolvant — laissez d'abord bien sécher le vernis, ensuite il se retire simplement à la main."
 },
 "sunTip": "<br><br>⚠️ <strong>Conseil solaire :</strong> évitez le soleil direct ou le solarium pendant 24 heures après l'épilation, puis utilisez un SPF élevé pour prévenir les rougeurs et les taches pigmentaires.",
 "products": {
  "facial": {
   "label": "Soins du visage",
   "usage": {
    "cleanser": "Matin et soir, répartissez sur le visage, le cou et le décolleté. Massez et rincez à l'eau tiède.",
    "tonic": "Après le nettoyage, appliquez sur un disque de coton et passez sur le visage, le cou et le décolleté. Ne pas rincer.",
    "facerub": "1 à 2 fois par semaine, massez sur une peau propre et humide (en évitant le contour des yeux) puis rincez.",
    "serum": "Matin et/ou soir, appliquez quelques gouttes sous votre crème de jour ou de nuit.",
    "hydracream": "Matin et/ou soir, appliquez sur le visage, le cou et le décolleté après le sérum.",
    "mask": "1 à 2 fois par semaine, appliquez généreusement, laissez poser 10 à 15 minutes puis rincez.",
    "fillme": "Une fois toutes les 2 semaines. Remplissez l'applicateur à micro-aiguilles avec l'ampoule d'acide hyaluronique et tamponnez délicatement sur le visage.",
    "hyalift": "Chaque jour, matin et/ou soir, appliquez quelques gouttes avant votre crème de jour ou de nuit."
   }
  },
  "eye": {
   "label": "Soins des yeux",
   "usage": {
    "eyegel": "Matin et soir, tapotez délicatement une petite quantité autour du contour des yeux avec l'annulaire."
   }
  },
  "body": {
   "label": "Soins du corps",
   "usage": {
    "bodymoist": "Chaque jour après la douche, appliquez sur le corps et massez.",
    "bust": "Chaque jour, appliquez sur la poitrine et le décolleté avec des mouvements circulaires vers le haut."
   }
  },
  "hand": {
   "label": "Mains et ongles",
   "usage": {
    "handcream": "Plusieurs fois par jour, surtout après le lavage, massez — également sur les cuticules.",
    "gerlasan": "Appliquez chaque jour et après chaque contact avec l'eau, en faisant bien pénétrer."
   }
  },
  "foot": {
   "label": "Soins des pieds",
   "usage": {
    "gehwol": "1 à 2 fois par jour, massez les pieds et entre les orteils, idéalement après un bain de pieds."
   }
  },
  "sun": {
   "label": "Protection solaire",
   "usage": {
    "spf50": "Appliquez généreusement sur le visage et la peau exposée 20 minutes avant l'exposition au soleil. Renouvelez régulièrement."
   }
  },
  "soap": {
   "label": "Savons artisanaux",
   "usage": {
    "geitenmelk": "Savon nourrissant pour peau sèche — à utiliser chaque jour sous la douche ou pour la toilette.",
    "aloevera": "Savon apaisant, idéal après l'épilation ou pour les peaux sensibles.",
    "syndet": "Variante sans savon et sans parfum, spécialement formulée pour les peaux sensibles.",
    "komkommer": "Rafraîchissant et apaisant, parfait pour la peau après l'exposition au soleil ou l'épilation.",
    "amandelmelk": "Savon nourrissant qui adoucit la peau sèche — convient à un usage quotidien.",
    "paleale": "Savon nettoyant artisanal aux antioxydants issus des ingrédients de brassage de la bière.",
    "koffie": "Savon légèrement exfoliant — un accord parfait avec votre moment Beauty & Coffee.",
    "matcha": "Gommage exfoliant qui illumine la peau — à utiliser 1 à 2 fois par semaine."
   }
  }
 },
 "kidsDrinks": {
  "water": "Eau plate",
  "chocolate": "Chocolat chaud"
 },
 "slots": {
  "za-vm": "Samedi matin",
  "za-nm": "Samedi après-midi",
  "za-av": "Samedi soir",
  "zo-vm": "Dimanche matin",
  "zo-nm": "Dimanche après-midi",
  "zo-av": "Dimanche soir"
 },
 "actions": {
  "grabbelton": {
   "title": "Tonneau à surprises",
   "text": "Vous dépensez 75 € ou plus lors du même rendez-vous ? Vous pouvez alors piocher une fois dans le tonneau à surprises. Dans la limite des stocks disponibles."
  }
 },
 "price": {
  "facial": {
   "title": "Soins du visage",
   "items": [
    [
     "Express gelaatsverzorging",
     "Soin du visage express",
     "Nettoyage, nettoyage en profondeur, masque crème & crème de jour.",
     null
    ],
    [
     "Acnécontrole – Équilibre Pureté Citron Vert",
     "Contrôle acné – Équilibre Pureté Citron Vert",
     "Soin purifiant, avec analyse de la peau lors du premier soin.",
     null
    ],
    [
     "Signature gelaatsverzorging",
     "Soin du visage Signature",
     "Soin complet avec massage ; convient aussi aux peaux sensibles.",
     null
    ],
    [
     "Fill Me Micro Infusie Treatment",
     "Fill Me Micro Infusion Treatment",
     "Nettoyant, tonique, Fill Me Serum, masque, masque LED & protection UV.",
     null
    ],
    [
     "Fruitzurenpeeling 4/26 Dr. Renaud",
     "Peeling aux acides de fruits 4/26 Dr. Renaud",
     "Pour un teint plus uniforme. Uniquement de septembre à mars.",
     null
    ],
    [
     "Huidvernieuwende Hydra Peeling pH",
     "Hydra Peeling pH régénérant",
     "Pour un teint éclatant et plus uniforme.",
     null
    ],
    [
     "Lift Summum",
     "Lift Summum",
     "Pour une peau à l'aspect plus ferme, avec massage et masque visage.",
     null
    ],
    [
     "Botanische Anti-Age",
     "Anti-âge botanique",
     "Soin anti-âge avec ampoule, massage et masque.",
     null
    ]
   ]
  },
  "facial-extra": {
   "title": "Suppléments pour votre soin du visage",
   "items": [
    [
     "Handpeeling & -massage",
     "Gommage & massage des mains",
     null,
     null
    ],
    [
     "LED-therapie",
     "Thérapie LED",
     null,
     null
    ],
    [
     "Ontharing wenkbrauwen",
     "Épilation des sourcils",
     null,
     null
    ],
    [
     "Ampul / serum",
     "Ampoule / sérum",
     null,
     null
    ],
    [
     "Peel-off masker",
     "Masque peel-off",
     null,
     null
    ],
    [
     "Collageenvliesmasker",
     "Masque en tissu au collagène",
     null,
     null
    ],
    [
     "Anti-aging paraffinemasker",
     "Masque à la paraffine anti-âge",
     null,
     null
    ],
    [
     "Hot Stone gelaatsmassage",
     "Massage du visage aux pierres chaudes",
     null,
     null
    ],
    [
     "Touch-up dagmake-up na gelaatsverzorging",
     "Retouche maquillage de jour après soin du visage",
     null,
     null
    ]
   ]
  },
  "makeup": {
   "title": "Maquillage (minéral / HD)",
   "items": [
    [
     "Touch-up dagmake-up na gelaatsverzorging",
     "Retouche maquillage de jour après soin du visage",
     null,
     null
    ],
    [
     "Avondmake-up / Party / Glam",
     "Maquillage de soirée / Party / Glam",
     null,
     "Faux cils ? Apportez vos propres cils et colle à cils ; je les pose."
    ],
    [
     "Bridal proefmake-up",
     "Essai maquillage de mariée",
     null,
     null
    ],
    [
     "Bridal proefmake-up & bruidsmake-up",
     "Essai & maquillage de mariée",
     null,
     null
    ],
    [
     "Huwelijksdag make-up, per persoon",
     "Maquillage du jour J, par personne",
     null,
     null
    ]
   ]
  },
  "brows": {
   "title": "Sourcils",
   "items": [
    [
     "Brow Tinting (kleuren haar)",
     "Teinture des sourcils (coloration des poils)",
     null,
     null
    ],
    [
     "Shaping (mappen en ontharen)",
     "Shaping (cartographie & épilation)",
     null,
     null
    ],
    [
     "Henna Brows",
     "Henna Brows",
     "Cartographie, mise en forme, coloration des poils et de la peau ; jusqu'à 6 semaines.",
     null
    ],
    [
     "Brow Lift",
     "Brow Lift",
     "Cartographie, mise en forme, laminage, coloration des poils et de la peau ; jusqu'à 6 semaines.",
     null
    ]
   ]
  },
  "lashes": {
   "title": "Cils",
   "items": [
    [
     "Lash Tinting (kleuren wimpers)",
     "Teinture des cils",
     null,
     null
    ],
    [
     "Lash Lift met kleuring",
     "Lash Lift avec teinture",
     null,
     "Jusqu'à 6 semaines."
    ]
   ]
  },
  "manicure": {
   "title": "Manucure",
   "items": [
    [
     "Express manicure",
     "Manucure express",
     "Coupe, limage, cuticules & crème mains nourrissante.",
     null
    ],
    [
     "Uitgebreide manicure",
     "Manucure complète",
     "Coupe, limage, cuticules, polissage, callosités & massage.",
     null
    ],
    [
     "Kindermanicure",
     "Manucure enfant",
     "Limage et vernis pour enfants ou peel-off.",
     null
    ],
    [
     "Supplement SPA manicure",
     "Supplément : manucure SPA",
     "Peeling, masque, enveloppement, massage & soin.",
     null
    ],
    [
     "Supplement verwijderen nagellak / gellak / BIAB",
     "Supplément : dépose vernis / gel / BIAB",
     null,
     null
    ],
    [
     "Supplement nagellak",
     "Supplément : vernis",
     null,
     null
    ],
    [
     "Supplement gellak (soak-off)",
     "Supplément : vernis gel (dépose)",
     null,
     null
    ],
    [
     "Supplement BIAB (soak-off)",
     "Supplément : BIAB (dépose)",
     null,
     null
    ]
   ]
  },
  "pedicure": {
   "title": "Pédicure",
   "items": [
    [
     "Express pedicure",
     "Pédicure express",
     "Coupe, limage, nettoyage du pourtour des ongles & crème pieds (sans élimination des callosités, sans massage).",
     null
    ],
    [
     "Uitgebreide pedicure",
     "Pédicure complète",
     "Coupe, limage, nettoyage du pourtour des ongles, cuticules, élimination standard des callosités & court massage des pieds.",
     "+ €10 par tranche de 15′ supplémentaire en cas de traitement important des callosités."
    ],
    [
     "Supplement ingegroeide nagel / copoline, per nagel",
     "Supplément : ongle incarné / copoline, par ongle",
     "Pose d'un bandage copoline dans le pourtour de l'ongle.",
     null
    ],
    [
     "Supplement drukvrij leggen / foambescherming, per teen",
     "Supplément : protection anti-pression / mousse, par orteil",
     "Un petit tube de protection en mousse pour soulager la friction et la pression de la chaussure.",
     null
    ],
    [
     "Supplement SPA pedicure",
     "Supplément : pédicure SPA",
     "Peeling, masque, enveloppement, massage prolongé.",
     null
    ],
    [
     "Supplement nagellak",
     "Supplément : vernis",
     null,
     null
    ],
    [
     "Supplement gellak (soak-off)",
     "Supplément : vernis gel (dépose)",
     null,
     null
    ],
    [
     "Supplement verwijderen nagellak / gellak",
     "Supplément : dépose vernis / gel",
     null,
     null
    ]
   ]
  },
  "waxing": {
   "title": "Épilation (cire / fil / pince)",
   "items": [
    [
     "Kin",
     "Menton",
     null,
     null
    ],
    [
     "Bovenlip",
     "Lèvre supérieure",
     null,
     null
    ],
    [
     "Wenkbrauwen (zonder mapping / opschonen)",
     "Sourcils (sans cartographie / nettoyage)",
     null,
     null
    ],
    [
     "Oksels",
     "Aisselles",
     null,
     null
    ],
    [
     "Schouders",
     "Épaules",
     null,
     null
    ],
    [
     "Buik",
     "Ventre",
     null,
     null
    ],
    [
     "Borst",
     "Torse",
     null,
     null
    ],
    [
     "Onderbenen",
     "Bas des jambes",
     null,
     null
    ],
    [
     "Onderbenen & knieën",
     "Bas des jambes & genoux",
     null,
     null
    ],
    [
     "Rug",
     "Dos",
     null,
     null
    ],
    [
     "Borst & buik",
     "Torse & ventre",
     null,
     null
    ],
    [
     "Volledige benen",
     "Jambes complètes",
     null,
     null
    ]
   ]
  },
  "body": {
   "title": "Soins du corps & massages",
   "items": [
    [
     "Cuppingmassage",
     "Massage aux ventouses (cupping)",
     "Massage ciblé aux ventouses sur des zones spécifiques.",
     null
    ],
    [
     "Cupping Body Renewal",
     "Cupping Body Renewal",
     "Peeling, Thermo Body Pack et ventouses pour une zone du corps par séance.",
     null
    ],
    [
     "Zweedse full body massage",
     "Massage suédois corps entier",
     "Relaxant et assouplissant pour les muscles.",
     null
    ],
    [
     "Zweedse rug-nek-schouder massage",
     "Massage suédois dos-nuque-épaules",
     "En cas de stress et de muscles tendus.",
     null
    ],
    [
     "Zweedse benen-voeten massage",
     "Massage suédois jambes-pieds",
     "Pour des jambes fatiguées.",
     null
    ],
    [
     "Hot Stone Massage",
     "Massage aux pierres chaudes (Hot Stone)",
     "Relaxation profonde avec des pierres chaudes.",
     null
    ],
    [
     "Afslankingsmassage",
     "Massage minceur",
     "Massage stimulant, complémentaire à une alimentation saine et à l'activité physique (hommes bienvenus aussi).",
     null
    ],
    [
     "Zuiverende rugbehandeling",
     "Soin purifiant du dos",
     "Nettoyage en profondeur, enveloppement et massage anti-stress.",
     null
    ],
    [
     "Harmoniserende verzorging rug",
     "Soin harmonisant du dos",
     "Peeling et massage pour une peau douce et lisse.",
     null
    ],
    [
     "Harmoniserende verzorging full body",
     "Soin harmonisant corps entier",
     "Peeling et massage pour une peau douce et lisse.",
     null
    ],
    [
     "Energetische rugpakking",
     "Enveloppement énergisant du dos",
     "Peeling rafraîchissant, enveloppement aux algues et massage.",
     null
    ],
    [
     "Energetische lichaamspakking full body",
     "Enveloppement énergisant corps entier",
     "Peeling rafraîchissant, enveloppement aux algues et massage.",
     null
    ]
   ]
  },
  "workshops": {
   "title": "Ateliers Beauty & Café",
   "note": "Inscription au moins 1 semaine à l'avance. Utilisation de tout le matériel professionnel, specialty coffee/thé/matcha & douceurs fraîches incluses.",
   "items": [
    [
     "Teambuilding Beauty & Pamper Experience",
     "Team building Beauty & Pamper Experience",
     "Atelier approfondi au choix (soin du visage avec retouche maquillage, maquillage beauté ou threading), bar à specialty coffee, boisson de bienvenue, bouchées sucrées et salées, affogato (glace vanille avec espresso ou matcha) et une attention luxueuse pour chaque participant.",
     "Par groupe, max. 4 participants"
    ],
    [
     "Teambuilding Specialty Coffee Experience",
     "Team building Specialty Coffee Experience",
     "Atelier café approfondi au choix (Dégustation Specialty Coffee Base ou Approfondie), bar à specialty coffee, boisson de bienvenue, bouchées sucrées et salées et affogato (glace vanille avec espresso ou matcha).",
     "Par groupe, max. 4 participants"
    ],
    [
     "Beauty & Skincare Workshop",
     "Atelier Beauty & Skincare",
     "Soin du visage, maquillage beauté ou threading. Découvrez les techniques et produits qui font rayonner votre peau, avec conseils personnalisés, tout le matériel, specialty coffee, thé et douceurs.",
     "Privé 1 à 1 : €75 · Duo : €65 p.p. · 3–4 personnes : €55 p.p."
    ],
    [
     "Cat Eye & Magnetische Gellak Manicure Workshop",
     "Atelier manucure Cat Eye & vernis gel magnétique",
     "Apprenez à créer vous-même un superbe effet magnétique « Cat Eye » sur vos ongles. Tous les vernis professionnels, aimants et lampes UV/LED inclus, ainsi que specialty coffee/thé et douceurs maison.",
     "Privé 1 à 1 : €85 · Duo : €75 p.p. · Max. 2 participants. Vos ongles doivent être totalement libres de vernis, vernis gel ou ongles en gel au début."
    ],
    [
     "Koffieproeverij Basis",
     "Dégustation de café – Base",
     "Découvrez les arômes du café, l'histoire de la graine au specialty coffee, et comparez et évaluez plusieurs cafés. Café/thé ou eau inclus.",
     "Duo : €85 p.p. · 3–4 personnes : €60 p.p."
    ],
    [
     "Koffieproeverij Verdiepend",
     "Dégustation de café – Approfondie",
     "En savoir plus sur les procédés de traitement, les variétés, les facteurs environnementaux, les profils de torréfaction et les saveurs. Café/thé ou eau inclus.",
     "Duo : €95 p.p. · 3–4 personnes : €65 p.p."
    ],
    [
     "Barista Privéworkshop",
     "Atelier privé barista",
     "Préparez chez vous espressos, boissons à base d'espresso et cafés lents avec un V60, French Press, Phin ou cafetière moka. Café/thé ou eau et une petite attention inclus.",
     "Privé 1 à 1"
    ]
   ]
  }
 },
 "houseRules": {
  "parking": {
   "title": "Accès et stationnement",
   "intro": null,
   "outro": null,
   "groups": [
    {
     "title": null,
     "items": [
      "Vous venez en voiture ? Garez-vous sur la Jubellaan ou sur les places à l'entrée de la Barbarastraat, avant de tourner vers les maisons.",
      "Merci de ne pas rouler jusqu'aux maisons : il n'y a pas de stationnement pour les visiteurs dans ce cul-de-sac.",
      "Depuis le parking de la Barbarastraat, il n'y a que 2 minutes à pied jusqu'à chez moi ; depuis la Jubellaan, environ 5 minutes.",
      "Vous venez à vélo ou en vélo cargo ? Vous pouvez l'attacher avec les vélos.",
      "Besoin de l'itinéraire ? Touchez la carte ci-dessous : Google Maps s'ouvre avec l'itinéraire jusqu'à chez moi."
     ]
    }
   ]
  },
  "appointments": {
   "title": "Rendez-vous et annulations",
   "intro": null,
   "outro": null,
   "groups": [
    {
     "title": null,
     "items": [
      "Les rendez-vous se prennent uniquement par téléphone, en personne ou par e-mail.",
      "Annulation ou report possible jusqu'à 1 heure à l'avance au 0499 22 19 01.",
      "En cas d'annulation moins d'1 heure à l'avance, 50 % du soin est facturé, sauf en cas de maladie (voir ci-dessous).",
      "Après 3 rendez-vous manqués, il n'est plus possible de prendre rendez-vous chez Beauty & Coffee.",
      "En cas de maladie : prévenez le plus vite possible. Si vous annulez au moins 1 heure avant le rendez-vous, aucun frais n'est facturé. En cas d'annulation tardive, la règle des 50 % s'applique.",
      "Soyez à l'heure. En retard ? Prévenez immédiatement par téléphone ou SMS. En cas de plus de 15 minutes de retard, le soin peut être raccourci ou annulé aux conditions d'annulation.",
      "En cas de non-paiement, il n'est plus possible de prendre rendez-vous chez Beauty & Coffee."
     ]
    }
   ]
  },
  "hygiene": {
   "title": "Hygiène et soins",
   "intro": "Pour un soin agréable et professionnel, j'attends de chaque personne ce qui suit :",
   "outro": null,
   "groups": [
    {
     "title": "Hygiène des mains",
     "items": [
      "Mains et ongles propres : pas de saleté visible sous les ongles ni de décoloration foncée sur la peau.",
      "Pas de mains collantes ou grasses (par exemple à cause de nourriture, d'huile ou de pommade).",
      "Vous avez une infection ou des plaies ouvertes ? Signalez-le à l'avance pour la manucure. Il se peut que nous déplacions le rendez-vous à une autre date afin de ne pas aggraver la plaie."
     ]
    },
    {
     "title": "Hygiène des pieds (pour les soins des pieds)",
     "items": [
      "Les pieds sont lavés avant le rendez-vous.",
      "Pas de saleté visible ni de forte odeur due à un manque d'hygiène.",
      "En cas de transpiration excessive : l'usage d'une poudre pour pieds ou d'un déodorant est vivement conseillé.",
      "Apportez des tongs si vous souhaitez un vernis ou un vernis gel lors de la pédicure.",
      "Vous avez une infection ou des plaies ouvertes ? Signalez-le à l'avance pour la pédicure. Il se peut que nous déplacions le rendez-vous à une autre date afin de ne pas aggraver la plaie.",
      "Les affections médicales comme l'hyperhidrose (transpiration excessive) ou les mycoses doivent être signalées à l'avance."
     ]
    },
    {
     "title": "Hygiène intime (pour les soins du corps comme l'épilation et le massage)",
     "items": [
      "La peau est propre et fraîchement lavée le jour du soin.",
      "Pas d'odeurs désagréables dues à un manque d'hygiène.",
      "En cas d'hygiène insuffisante, le soin peut être refusé sans remboursement.",
      "Portez des vêtements amples pour l'épilation du corps.",
      "Vous avez une infection ou des plaies ouvertes ? Signalez-le à l'avance pour le massage du corps."
     ]
    },
    {
     "title": "Politique des odeurs (tabac, cannabis, fortes odeurs corporelles)",
     "items": [
      "Fumer et consommer du cannabis juste avant le soin est déconseillé.",
      "Si une forte odeur de tabac, de cannabis ou autre est perçue comme gênante, le soin peut être refusé sans remboursement.",
      "Transpirer normalement n'est pas un problème, mais si l'odeur est gênante en raison d'un manque d'hygiène, le soin peut être raccourci ou refusé.",
      "Le parfum et les crèmes fortement parfumées ne sont pas souhaités, car ils peuvent gêner la praticienne et les autres clients."
     ]
    },
    {
     "title": "Soin du visage, lash lift et brow styling",
     "items": [
      "Venez de préférence sans maquillage.",
      "N'utilisez pas de crème pour le visage épaisse ni d'huile juste avant le soin.",
      "Lentilles de contact : pour le lash lift et le soin du visage, évitez de porter des lentilles, ou apportez un étui et du liquide pour lentilles. N'oubliez surtout pas vos lunettes.",
      "Portez de préférence un haut à fines bretelles."
     ]
    }
   ]
  },
  "contra": {
   "title": "Contre-indications",
   "intro": "Pour des raisons médicales et d'hygiène, un soin ne peut pas avoir lieu en cas de :",
   "outro": "En cas de doute, consultez d'abord un médecin.",
   "groups": [
    {
     "title": null,
     "items": [
      "Plaies ouvertes, inflammations sévères ou cicatrices récentes dans la zone à traiter.",
      "Peau récemment fortement brûlée par le soleil dans la zone à traiter.",
      "Fièvre, grippe ou autres infections virales (voir « en cas de maladie » à la rubrique annulation)."
     ]
    }
   ]
  },
  "practical": {
   "title": "Modalités pratiques",
   "intro": null,
   "outro": null,
   "groups": [
    {
     "title": null,
     "items": [
      "Venez seul(e) pour les soins, sauf si vous êtes mineur(e). Un atelier a lieu dans la cuisine ouverte et la salle à manger. Si vous êtes mineur(e), vous devez être accompagné(e) d'un parent.",
      "Il est interdit de fumer dans le bâtiment pour des raisons d'hygiène et de sécurité incendie.",
      "Laissez de préférence bijoux et accessoires à la maison pour éviter toute perte ou détérioration.",
      "Mettez votre GSM en mode silencieux pendant le soin.",
      "Tous les soins ont un caractère esthétique."
     ]
    }
   ]
  }
 },
 "facts": {
  "A1": "Votre peau est le plus grand organe de votre corps.",
  "A2": "En moyenne, vous avez un épiderme entièrement neuf toutes les 4 semaines : votre peau se renouvelle en permanence.",
  "A3": "Votre peau remplit 9 fonctions, de la barrière protectrice et de la régulation de la chaleur à la production de vitamine D, à la réserve de graisse et au toucher.",
  "A4": "Votre peau est aussi un moyen de communication : vous rougissez de honte, pâlissez à cause d'une maladie et avez la chair de poule quand vous avez froid ou peur.",
  "A5": "Par votre peau, vous percevez des stimuli comme la température, le toucher, la position de vos membres et la douleur. C'est ainsi que vous reconnaissez des objets les yeux fermés.",
  "B1": "La majeure partie de votre vitamine D est produite par votre corps lui-même sous l'effet de la lumière du soleil. L'alimentation, comme le poisson gras, les œufs, le lait ou le beurre, apporte le reste.",
  "B2": "La mélanine de votre épiderme absorbe les rayons UV.",
  "B3": "La couleur de votre peau est surtout déterminée par la taille et le nombre des grains de pigment dans la couche basale de votre épiderme.",
  "B4": "Un grain de beauté est un amas bénin de mélanocytes (cellules pigmentaires).",
  "C1": "Votre couche cornée se compose de nombreuses couches de cellules mortes, et ce sont justement ces cellules mortes qui constituent l'une des meilleures protections contre les intrus.",
  "C2": "Un durillon se forme quand votre couche cornée subit énormément de frottements.",
  "C3": "Les cellules de votre couche épineuse se tiennent entre elles grâce à de minuscules « épines » (desmosomes). Cela rend votre peau souple et solide.",
  "C4": "Les cellules de Langerhans de votre peau sont des cellules ramifiées qui participent à vos défenses immunitaires.",
  "D1": "Le collagène assure la fermeté de votre peau, l'élastine son élasticité et sa résilience.",
  "D2": "Votre hypoderme est à la fois une réserve d'énergie, une couche d'isolation et un amortisseur.",
  "D3": "Les mammifères ont une épaisse fourrure. Chez l'être humain, elle a disparu et c'est la graisse sous la peau qui a pris le relais de l'isolation.",
  "E1": "La sueur apocrine est inodore tant qu'elle n'est pas arrivée sur votre peau. L'odeur typique de transpiration n'apparaît que lorsque des bactéries la transforment.",
  "E2": "Vous avez de 2 à 5 millions de glandes sudoripares.",
  "E3": "Le sébum forme avec la sueur votre film hydrolipidique acide, qui protège votre peau contre les bactéries et les agents pathogènes.",
  "E4": "La quantité de sébum que vous produisez dépend de vos hormones et de votre âge, pas de votre système nerveux.",
  "F1": "Vos plantes de pieds comptent parmi les zones du corps où la densité de glandes sudoripares est la plus élevée.",
  "F2": "Aucun poil ne pousse sur la paume des mains et la plante des pieds, et il n'y a pas de glandes sébacées.",
  "F3": "Sous la plante des pieds (et la paume des mains et les fesses), la graisse sert presque exclusivement d'amortisseur.",
  "F4": "La paume des mains et la plante des pieds ont une couche de peau supplémentaire : la couche claire, qui n'existe que dans la peau épaisse.",
  "G1": "La chair de poule : un petit muscle près du follicule pileux se contracte et redresse le poil. Ainsi, de l'air chaud reste piégé entre les poils comme isolant.",
  "G2": "Chaque poil a son propre muscle érecteur, le muscle horripilateur.",
  "G3": "Les poils ne sont pas que décoratifs : tous les follicules pileux sont reliés à des nerfs qui réagissent à la pression ou à la flexion de la tige du poil.",
  "G4": "À partir du milieu de la tige, votre cheveu est constitué de matière morte : les cellules se remplissent de kératine et meurent.",
  "G5": "La couleur de vos cheveux vient des mélanocytes de la racine, qui libèrent des grains de pigment.",
  "G6": "La couche externe de votre cheveu (cuticule) est faite d'écailles qui se chevauchent comme des tuiles. Ces écailles gardent le cheveu lisse et le protègent contre les produits chimiques, les UV et la chaleur.",
  "G7": "La couche fibreuse (cortex) détermine si vos cheveux sont raides ou bouclés.",
  "G8": "On ne sait pas encore exactement à quoi sert la moelle (médulla) du cheveu. Tous les types de cheveux n'en ont pas.",
  "G9": "2 à 3 glandes sébacées débouchent dans chaque follicule pileux.",
  "G10": "Votre racine de cheveu est sensible aux hormones et peut être influencée par l'alimentation, le stress et la génétique.",
  "H1": "On ne peut jamais rendre votre peau totalement stérile : des micro-organismes utiles y vivent en permanence et forment une première barrière contre les infections.",
  "H2": "La flore cutanée transitoire s'élimine facilement en se lavant ou en se désinfectant les mains."
 },
 "conditionFacts": {
  "SH1": "Sur tous les cancers de la peau, 80 % sont des carcinomes basocellulaires, 15 % des carcinomes épidermoïdes et 5 % des mélanomes. Le mélanome est le plus rare, mais aussi la forme la plus agressive.",
  "SH2": "Surveillez vos grains de beauté selon la règle ABCDE : Asymétrie, Bordure irrégulière, Couleur (2 teintes ou plus), Diamètre (plus de 6 mm) et Évolution (qui change, démange ou saigne).",
  "SH3": "Un coup de soleil sévère chez un enfant de moins de 5 ans peut favoriser un mélanome plus tard. Le bronzage régulier et le solarium augmentent aussi le risque.",
  "SH4": "La kératose actinique est un stade précurseur du cancer de la peau : des plaques rugueuses et squameuses dues à un excès d'UV (soleil ou solarium), surtout sur le dos des mains, les avant-bras, le visage et le cuir chevelu. On les sent souvent avant de les voir.",
  "SH5": "Le carcinome basocellulaire touche des personnes de plus en plus jeunes, dès environ 30 ans. Un phototype clair (type 1 ou 2) présente le risque le plus élevé.",
  "SH6": "Une petite plaie qui ne guérit pas et reste en permanence croûteuse peut être un signe de carcinome basocellulaire. Il évolue lentement et ne métastase (quasi) jamais.",
  "SH7": "Une tache qui change, est asymétrique, a un bord irrégulier ou plusieurs teintes, mesure plus de 6 mm, ou qui démange, s'enflamme ou saigne : une raison de consulter un médecin.",
  "TU1": "Les angiomes stellaires (petits vaisseaux sanguins rayonnant comme une araignée) apparaissent souvent sur les zones exposées au soleil : visage, cou et jambes. Les petits exemplaires superficiels peuvent être traités par électrocoagulation ou fulguration.",
  "TU2": "Presque tout le monde à partir de 30 ans a un ou plusieurs fibromes (acrochordons). Ils ne disparaissent pas d'eux-mêmes, mais peuvent être retirés facilement et en toute sécurité en cas de gêne esthétique.",
  "TU3": "Les verrues séborrhéiques sont des taches brunes ou noires en relief, souvent rugueuses, qui apparaissent surtout chez les personnes âgées. Elles sont bénignes.",
  "TU4": "La dermatosis papulosa nigra se manifeste par de petites papules foncées, qui touchent surtout les personnes à peau foncée, en général sur le visage.",
  "TU5": "Un hémangiome (amas de vaisseaux sanguins en relief) est une formation bénigne qui ressemble à un petit nodule rouge ou bleu. Il est fréquent chez les bébés et les jeunes enfants.",
  "PI1": "La dermite des berlocques : un parfum, une lotion corporelle ou un déodorant (souvent à la bergamote), combiné au soleil, peut laisser des taches ou traînées foncées, classiquement en forme de coulures. Cela disparaît souvent tout seul ; la protection solaire est importante.",
  "PI2": "Les grains de beauté peuvent être présents avant la naissance ou apparaître plus tard. L'hérédité et les coups de soleil pendant l'enfance jouent un rôle.",
  "PI3": "Les taches de vieillesse (lentigos séniles) sont bénignes et apparaissent presque toujours après 50 à 60 ans, surtout sur le visage, le décolleté et le dos des mains.",
  "PI4": "Dans le vitiligo, les cellules pigmentaires disparaissent de la peau. Cela peut débuter soudainement à tout âge ; chez 70 à 80 % des personnes, cela commence avant 30 ans. Une protection solaire renforcée est nécessaire.",
  "PI5": "L'albinisme est congénital : la mélanine est partiellement ou totalement absente, ce qui donne une peau (partiellement) blanche et des yeux souvent rougeâtres.",
  "PI6": "Après l'acné, les marques rouges peuvent rester visibles 3 à 9 mois, et les marques foncées jusqu'à 3 ans, surtout sur une peau mate et en cas d'exposition au soleil.",
  "AC1": "Selon le cours, une mauvaise hygiène, une carence en vitamines, des allergies alimentaires, le chocolat et la mayonnaise ne causent pas l'acné. En revanche : le sébum, les hormones, les follicules bouchés, les bactéries et l'hérédité.",
  "AC2": "Ce sont surtout les hormones masculines (androgènes) qui stimulent les glandes sébacées, chez les garçons comme chez les filles. Ce n'est pas la quantité d'hormones qui compte, mais le déséquilibre et la sensibilité des glandes.",
  "AC3": "L'acné réagit lentement : peu d'amélioration le premier mois en général, mais après six mois de traitement, au moins 80 % d'amélioration des lésions.",
  "AC4": "Frotter stimule la production de sébum. Nettoyez une peau à tendance acnéique avec un savon doux et tamponnez-la pour la sécher. Des produits très dégraissants peuvent au contraire stimuler la production de sébum.",
  "AC5": "Le maquillage n'est pas interdit en cas d'acné, mais il aggrave l'obstruction des pores si vous ne le démaquillez pas bien. Une taie d'oreiller en coton absorbe mieux.",
  "AC6": "Le soleil associé à une crème solaire ou des cosmétiques à ingrédients comédogènes peut provoquer de petits boutons rouges et qui démangent. Choisissez une protection solaire non comédogène et sans huile.",
  "AC7": "La « rosacée », malgré les boutons, n'a rien à voir avec l'acné. C'est une rougeur chronique du visage, surtout sur une peau claire.",
  "AC8": "Pendant un traitement au Roaccutane et les deux mois qui suivent, il ne faut pas épiler à la cire : des morceaux de peau peuvent partir avec. La peau est aussi sensible au soleil.",
  "AC9": "L'acné du nourrisson disparaît généralement d'elle-même. Ne pas presser ni manipuler !",
  "PE1": "Avec un cor, les lignes de la peau traversent la lésion normalement. Avec une verrue plantaire, les lignes de la peau contournent la verrue.",
  "PE2": "Le HPV peut survivre longtemps dans un environnement humide comme les douches communes, le sol des piscines et les serviettes mouillées. Portez-y vos propres tongs.",
  "PE3": "Les verrues disparaissent souvent d'elles-mêmes après environ 2 ans. La cryothérapie à l'azote liquide demande généralement plusieurs séances, espacées d'environ 3 semaines.",
  "PE4": "Les champignons aiment les endroits chauds et humides, comme les pieds et entre les orteils. Séchez bien entre les orteils, portez des chaussettes en coton ou en laine et des chaussures amples, de préférence en cuir.",
  "PE5": "Les mycoses sont tenaces et reviennent souvent. Un traitement prolongé, de plusieurs semaines à plusieurs mois, est souvent nécessaire.",
  "PE6": "De petites cloques sur la paume des mains ou la plante des pieds sont généralement une réaction d'hypersensibilité à une mycose ailleurs sur le corps.",
  "PE7": "Contre les pieds qui transpirent : des chaussettes propres (en coton) chaque jour, changer de chaussures plusieurs fois par jour et des chaussures en cuir qui laissent respirer le pied. Moins de café, d'alcool et d'épices aide aussi.",
  "PE8": "En cas de diabète, le risque de mycoses (résistance diminuée) et de fibromes (acrochordons) est plus élevé.",
  "PE9": "Les furoncles n'apparaissent jamais sur la plante du pied ou la paume de la main : il n'y a pas de follicules pileux à ces endroits.",
  "PE10": "Saisissez une tique avec une pince à épiler au niveau de la tête et tirez-la lentement et bien droit vers le haut. Assurez-vous que les pièces buccales sortent aussi.",
  "DR1": "Une peau déshydratée produit elle-même des lipides supplémentaires. Avec du repos et une crème grasse protectrice, la barrière est généralement rétablie après environ 1 semaine.",
  "DR2": "Les crèmes à base de vaseline sont très efficaces pour une peau sèche, mais pénètrent lentement. Elles sont donc surtout pratiques au coucher.",
  "DR3": "Portez de préférence des gants de coton sous des gants en caoutchouc ou en PVC. Vous protégez ainsi vos mains du dessèchement.",
  "DR4": "Une peau normale se renouvelle tous les 28 jours, une peau atteinte de psoriasis en seulement 4 à 6 jours. Le psoriasis n'est pas contagieux.",
  "DR5": "Le psoriasis est sensible au stress : il peut s'aggraver en période de stress. Chez environ 30 % des patients, un parent ou un enfant en est également atteint.",
  "DR6": "Le mot ichtyose vient du grec « ichthys », poisson, en raison de la peau squameuse. Il s'agit d'un groupe de maladies héréditaires.",
  "DR7": "Dans la kératose pilaire, une accumulation de kératine bouche les follicules pileux, formant de petites bosses dures. Les symptômes s'améliorent souvent avec le temps, surtout à l'âge adulte.",
  "AL1": "L'irritation endommage directement la barrière cutanée et peut arriver à tout le monde. Dans une allergie, le système immunitaire est impliqué et tout le monde n'y réagit pas.",
  "AL2": "Une allergie de contact peut n'apparaître qu'après une longue période d'utilisation sans problème du même produit, par exemple chez une personne qui a porté des ongles en résine pendant des années.",
  "AL3": "L'eczéma de contact allergique n'est perceptible que 4 à 24 heures après le contact et peut aussi apparaître ailleurs, surtout sur une peau fine comme les paupières.",
  "AL4": "Les irritants courants sont le savon, le savon liquide, le shampooing, le bain moussant, le maquillage des yeux, les parfums, les produits d'épilation, les antitranspirants et les produits solaires.",
  "AL5": "De petits boutons avec un point rouge autour des follicules après l'épilation sont généralement une réaction histaminique, pas une allergie. Une compresse froide apaise la peau.",
  "AL6": "Les abeilles laissent leur dard et meurent ; les guêpes et les frelons peuvent piquer plusieurs fois. Retirez un dard avec une pince à épiler sans le presser : cela libère davantage de venin.",
  "AL7": "Une allergie au soleil n'est pas une vraie allergie, car le système immunitaire n'y est pas impliqué.",
  "AL8": "L'urticaire peut être déclenchée par le frottement ou le grattage, la pression, la sueur, le froid, la chaleur, la lumière ou même l'eau.",
  "ZW1": "Les déodorants tuent ou ralentissent les bactéries et masquent l'odeur. Les antitranspirants rétrécissent les canaux d'évacuation des glandes sudoripares.",
  "ZW2": "Chez 30 à 50 % des personnes atteintes d'hyperhidrose (transpiration excessive), cela touche aussi d'autres membres de la famille.",
  "ZW3": "Dans l'anhidrose, il n'y a aucune production de sueur. La température corporelle peut de ce fait monter jusqu'à la fièvre."
 },
 "conditionKop": {
  "SH1": "80 – 15 – 5",
  "SH2": "La règle ABCDE",
  "SH3": "Peau d'enfant et soleil",
  "SH4": "Kératose actinique",
  "SH5": "De plus en plus jeune",
  "SH6": "Une petite plaie qui persiste",
  "SH7": "Tache suspecte",
  "TU1": "Angiomes stellaires",
  "TU2": "Acrochordons",
  "TU3": "Verrues séborrhéiques",
  "TU4": "Papules noires",
  "TU5": "Hémangiome du bébé",
  "PI1": "Parfum + soleil = taches",
  "PI2": "Grains de beauté",
  "PI3": "Taches de vieillesse",
  "PI4": "Vitiligo",
  "PI5": "Albinisme",
  "PI6": "Après le bouton",
  "AC1": "Mythe : le chocolat",
  "AC2": "Hormones",
  "AC3": "La patience paie",
  "AC4": "Tamponner, pas frotter",
  "AC5": "Bien démaquiller",
  "AC6": "Acné de Majorque",
  "AC7": "La rosacée n'est pas de l'acné",
  "AC8": "Roaccutane et épilation à la cire",
  "AC9": "Acné du nourrisson",
  "PE1": "Verrue ou cor ?",
  "PE2": "Les verrues survivent hors du corps",
  "PE3": "Les verrues partent souvent seules",
  "PE4": "Le champignon aime la chaleur et l'humidité",
  "PE5": "Tenace",
  "PE6": "Cloques sous la plante du pied",
  "PE7": "Pieds qui transpirent",
  "PE8": "Diabète et peau",
  "PE9": "Pas de furoncle sous le pied",
  "PE10": "Retirer une tique",
  "DR1": "Réparée en une semaine",
  "DR2": "Crème grasse pour la nuit",
  "DR3": "Coton sous le caoutchouc",
  "DR4": "Psoriasis : une peau rapide",
  "DR5": "Stress et psoriasis",
  "DR6": "Peau écailleuse",
  "DR7": "Petites bosses rugueuses",
  "AL1": "Irritation ou allergie ?",
  "AL2": "Allergique du jour au lendemain",
  "AL3": "4 à 24 heures plus tard",
  "AL4": "Irritants connus",
  "AL5": "Après l'épilation",
  "AL6": "Piqûre d'abeille ou de guêpe",
  "AL7": "Allergie au soleil",
  "AL8": "Déclencheurs de l'urticaire",
  "ZW1": "Déodorant ou antitranspirant ?",
  "ZW2": "Une affaire de famille",
  "ZW3": "Pas de sueur du tout"
 },
 "practiceFacts": {
  "WED1": "On remarque la perte d'eau dès environ 1 % (soif) ; à 2 %, la capacité de travail baisse ; à 4 %, on devient somnolent, apathique, irritable et nauséeux.",
  "WED2": "Les symptômes de déshydratation (peau sèche, urine foncée, moins de concentration) apparaissent déjà avant que vous ayez soif.",
  "WED3": "Vous avez besoin d'environ 2 litres d'eau par jour ; les jours chauds, un verre toutes les heures est une bonne idée.",
  "WED4": "Selon le cours, bien s'hydrater donne plus d'énergie, une peau plus éclatante et une meilleure concentration.",
  "WED5": "Le thé et le café ont un effet diurétique.",
  "WED6": "Trop de sel et de sucre incite les tissus à retenir l'eau ; supprimer totalement le sel n'est pas conseillé.",
  "WED7": "En cas de rétention d'eau, boire moins est une mauvaise idée : 1 litre d'eau entre les repas aide.",
  "WED8": "L'eau distillée est déconseillée comme eau de boisson : elle ne contient pas de sels importants.",
  "WEW1": "L'eau chaude de 35 à 40 °C calme et détend les muscles.",
  "WEW2": "L'eau froide de 10 à 15 °C stimule, soulage la douleur et améliore l'immunité.",
  "WEW3": "Bain contrasté : 5 minutes chaud, puis 40 secondes froid ; répéter et terminer par le froid.",
  "WEW4": "La vapeur ouvre les pores et stimule la peau.",
  "WEW5": "Un bain de vapeur est à 40–60 °C avec environ 98 % d'humidité ; on y reste 10 à 20 minutes.",
  "WEW6": "Un sauna finlandais est à 70–90 °C et sec (moins de 35 % d'humidité) ; une séance dure environ 15 minutes.",
  "WEW7": "Si vous vous sentez mal dans le sauna, sortez : vous pourriez vous évanouir.",
  "WEW8": "Une cabine infrarouge utilise une chaleur rayonnante de 50–60 °C ; la montée en température prend 20 à 30 minutes, sans besoin de refroidir ensuite.",
  "WEW9": "L'eau de mer chauffée à 33 °C est décrite comme bénéfique : la peau absorbe alors plus facilement les substances actives.",
  "WEW10": "Le watsu est une méthode de relaxation dans une eau salée chaude d'environ 35 °C, populaire pendant la grossesse et l'accouchement.",
  "WEW11": "Le hot stone utilise des pierres de basalte jusqu'à 60 °C, alternées avec des pierres de marbre froides.",
  "WEH1": "La « cellulite » cosmétique s'appelle techniquement panniculose ; la cellulite médicale est une infection avec rougeur, gonflement, douleur et fièvre.",
  "WEH2": "Une cellule graisseuse peut se dilater jusqu'à 30 fois son propre volume.",
  "WEH3": "Chez la femme, le tissu adipeux est constitué de 50 à 60 milliards de cellules graisseuses.",
  "WEH4": "La cellulite ne disparaît pas complètement ; une cure de 10 à 20 séances rend toutefois la peau plus lisse.",
  "WEH5": "Les vergetures ne contiennent plus ni poils ni glandes sudoripares.",
  "WEH6": "Les vergetures horizontales indiquent une croissance rapide, les verticales une prise de poids.",
  "WEH7": "Un sein féminin normal pèse environ 200 grammes.",
  "WEH8": "Pendant la grossesse, l'aréole passe de 3–5 cm à 7–8 cm.",
  "WEH9": "Même avec une petite poitrine, un soutien-gorge est nécessaire, surtout pendant le sport et les règles.",
  "WEH10": "Après environ 10 minutes sur une plateforme vibrante, on est moins fatigué et moins en sueur qu'après un entraînement similaire sur step ou tapis de course.",
  "WEG1": "Les huiles essentielles (issues de la distillation de plantes) s'utilisent dans les huiles de massage, les bains, les enveloppements ou en inhalation, contre le stress et l'anxiété.",
  "WEG2": "La bergamote, le basilic et le jasmin sont cités contre les baisses de moral ; le cyprès et le santal contre la nervosité.",
  "WEG3": "On n'ajoute les huiles essentielles à l'eau du bain qu'à la toute fin, car elles s'évaporent vite.",
  "WEG4": "L'Aufguss : de l'eau et une huile essentielle (menthe poivrée, orange, jasmin ou lavande, par exemple) sont versées sur le poêle du sauna.",
  "WEG5": "Le bleu apaise, le rouge stimule, le vert rééquilibre, le jaune tonifie. Le cours précise lui-même que la valeur de la chromothérapie ne repose pas toujours sur des bases solides.",
  "WEC1": "SPA vient du latin « salus per aquam » : la santé par l'eau.",
  "WEC2": "Le bien-être est un mode de vie qui privilégie un corps sain et un esprit sain.",
  "WEC3": "Le lulur faisait traditionnellement partie de la cérémonie de fiançailles en Indonésie.",
  "WEC4": "Selon la légende, Cléopâtre prenait des bains de lait d'ânesse.",
  "WEC5": "Une éponge ou un savon loofah est fabriqué à partir d'un fruit apparenté à la courge.",
  "PEDX1": "Chaque pied compte 26 os ; sa solidité vient des ligaments, des bandes de tissu conjonctif en fibres de collagène.",
  "PEDX2": "Un orteil compte 3 phalanges, sauf le gros orteil, qui en a 2.",
  "PEDX3": "La plante des pieds compte 72 000 terminaisons nerveuses — d'où leur grande sensibilité aux chatouilles.",
  "PEDX4": "Vous faites environ 8 000 à 10 000 pas par jour : soit environ 185 000 km au cours d'une vie.",
  "PEDX5": "On naît avec des pieds plats ; le pied normal se développe au fil de la croissance.",
  "PEDX6": "Le pied élargi (transverse) est plus fréquent chez les femmes ; les chaussures pointues à talons hauts favorisent son apparition.",
  "PEDX7": "Un cor s'appelle aussi un œil-de-perdrix et se forme à partir d'un durillon.",
  "PEDX8": "Le pied d'athlète = l'eczéma du nageur = la mycose des pieds ; il se transmet dans un environnement chaud et humide (douches, vestiaires, piscines).",
  "PEDX9": "Verrues : au moins 30 virus connus ; 3 à 6 mois (voire plus) entre la contamination et l'apparition de la verrue ; guérison spontanée fréquente en 2 à 3 ans.",
  "PEDX10": "Ne grattez pas une verrue : cela propage le virus.",
  "PEDX11": "L'argile verte est stérile, antibactérienne, hydratante et régénérante.",
  "PEDX12": "En cas de diabète, moins de sang circule vers les pieds et la sensibilité est réduite ; de petites plaies peuvent mener à une amputation.",
  "PEDX13": "Le durillon physiologique est protecteur et on en laisse une partie en place ; seul le durillon pathologique (hyperkératose) pose problème.",
  "PEDX14": "Les expressions ne manquent pas non plus : « être sur pied », « mettre les pieds dans le plat », « faire du pied »…",
  "MA1": "Le massage améliore la circulation sanguine, ce qui apporte plus d'oxygène et de nutriments aux muscles et à la peau.",
  "MA2": "Contrairement à la circulation sanguine, le système lymphatique n'a pas de pompe propre. Le massage peut aider à soutenir la circulation de la lymphe.",
  "MA3": "Un massage de relaxation peut faire baisser une tension artérielle élevée grâce à son effet apaisant sur le corps et l'esprit.",
  "MA4": "Être touché d'une manière chaleureuse et sûre est un besoin humain fondamental.",
  "MA5": "Sur les bras et les jambes, le masseur effectue des mouvements vers le cœur pour soutenir la circulation sanguine et lymphatique.",
  "MA6": "À long terme, un massage régulier améliore la souplesse des muscles et l'élasticité de la peau.",
  "MA7": "Les frictions et les effleurages détachent plus vite les cellules mortes de la peau, ce qui lui donne un aspect plus frais.",
  "MA8": "Les nœuds musculaires apparaissent à cause d'une circulation sanguine localement réduite. Un massage ciblé et relaxant peut aider à les dénouer.",
  "MA9": "Le mal de dos lombaire est le plus souvent dû à une surcharge, et le stress ou les émotions y jouent aussi un rôle. Masser les muscles du bas du dos procure souvent une relaxation profonde.",
  "MA10": "Le massage peut améliorer le sommeil et la digestion.",
  "MA11": "Des mouvements lents et longs relaxent ; plus de pression, un travail en profondeur et des tapotements stimulent.",
  "MT1": "Pendant un massage, les mains restent en contact avec le corps : les retirer vous sort de la relaxation.",
  "MT2": "Après un massage, vous pouvez ressentir des maux de tête, de la soif, une envie fréquente d'uriner ou de la somnolence. Cela fait partie de son fonctionnement.",
  "MT3": "Buvez beaucoup d'eau après votre massage : cela aide à prévenir les maux de tête.",
  "MT4": "Le massage stimule la production d'urine, ce qui facilite l'élimination des déchets et de l'excès de liquide.",
  "MV1": "De la fièvre ? Reportez votre rendez-vous : on ne masse pas en cas de fièvre.",
  "MV2": "En cas d'inflammation d'une veine (phlébite), on ne masse pas : il y a un risque de thrombose.",
  "MV3": "Enceinte ? Le massage n'est possible qu'avec l'accord de votre médecin et auprès d'un masseur formé à cet effet.",
  "MV4": "Le psoriasis n'est pas contagieux et n'est pas une raison d'éviter le massage ; un massage doux peut même faire beaucoup de bien.",
  "MV5": "Les bleus, petites plaies, coups de soleil ou peau enflammée ne sont pas massés.",
  "MV6": "Un grain de beauté a changé de forme, de couleur ou de taille ? Faites-le examiner par votre médecin (règle ABCDE).",
  "MV7": "En cas de fibromyalgie, un massage apaisant convient mieux qu'un massage profond.",
  "MV8": "Lors d'une crise rhumatismale aiguë, on ne masse pas ; par la suite, le massage peut aider à garder les articulations et les muscles souples.",
  "MR1": "Les huiles essentielles sont toujours diluées : 2 % est la concentration habituelle pour le corps, 1 % pour le visage.",
  "MR2": "L'odorat est fortement lié aux émotions et aux souvenirs. C'est pourquoi le parfum se choisit avec la cliente ou le client.",
  "MR3": "Les huiles d'agrumes (citron, orange, mandarine, bergamote) peuvent provoquer une décoloration de la peau au soleil ou au solarium.",
  "MR4": "Conservez les huiles essentielles à l'abri de la lumière, au frais et au sec, et pas dans la salle de bain.",
  "MR5": "Un massage du corps entier nécessite en moyenne 20 à 25 ml d'huile de massage."
 },
 "moreFacts": {
  "CW1": "Votre corps est construit comme un puzzle : de petits éléments s'assemblent pour former un tout de plus en plus grand.",
  "CW2": "Votre corps compte 6 niveaux : atomes, molécules, cellules, tissus, organes et systèmes.",
  "CW3": "Un atome est le plus petit composant chimique dont tout ce que vous pouvez imaginer est constitué.",
  "CW4": "Une molécule se forme quand des atomes se lient entre eux.",
  "CW5": "Une cellule est la plus petite unité vivante de votre corps.",
  "CW6": "Votre corps est constitué de cellules qui se comptent en milliards.",
  "CW7": "Presque chaque type de cellule de votre corps est spécialisé selon sa forme, sa taille, sa fonction et son cycle de vie.",
  "CW8": "Un tissu se forme quand des cellules de même forme et de même fonction se rassemblent.",
  "CW9": "Tous les êtres vivants n'ont pas de tissus : certaines formes de vie ne comptent qu'une seule cellule.",
  "CW10": "Un organe est constitué de plusieurs types de tissus qui servent ensemble un but précis.",
  "CW11": "Un système d'organes regroupe plusieurs organes qui assurent ensemble une fonction vitale de votre corps.",
  "CW12": "L'ensemble des systèmes d'organes vous constitue en tant qu'organisme.",
  "NA1": "Sans ongles, des callosités se formeraient sur le bout de vos doigts — et vous sentiriez alors moins bien, pas mieux.",
  "NA2": "Vos ongles facilitent la préhension, surtout des petits objets.",
  "NA3": "Vos ongles protègent votre corps contre l'intrusion de substances étrangères et de bactéries.",
  "NA4": "Des ongles soignés ou négligés influencent l'image que vous donnez aux autres.",
  "NB1": "Des ongles roses indiquent une circulation sanguine saine et normale.",
  "NB2": "Des ongles bleutés peuvent indiquer une mauvaise circulation ou un manque d'oxygène.",
  "NB3": "Des ongles blancs peuvent indiquer une carence en vitamines.",
  "NB4": "Des ongles rouges peuvent indiquer une tension artérielle élevée ou des troubles sanguins.",
  "NC1": "Votre ongle est composé de centaines de couches de cellules kératinisées — comme la couche cornée de votre peau, mais bien plus dure.",
  "NC2": "Contrairement aux cellules de la peau, les cellules mortes kératinisées de votre ongle ne se détachent pas en pellicules.",
  "NC3": "La cystine, principal composant de la kératine, forme des ponts soufrés qui donnent sa solidité à votre ongle.",
  "NC4": "Le zinc n'est pas présent dans l'ongle lui-même, mais il contribue à la production de kératine.",
  "NC5": "Le calcium et le sélénium contribuent tous deux à la solidité de vos ongles.",
  "ND1": "Votre ongle repose avec sa plaque sur le lit unguéal — comme votre corps repose sur un lit.",
  "ND2": "La couleur rosée de votre ongle vient des vaisseaux sanguins du lit unguéal en dessous ; l'ongle lui-même est transparent.",
  "ND3": "Votre plaque unguéale comporte 3 couches : la couche épithéliale (adhérence), la couche spongieuse (solidité) et la couche cornée (protection).",
  "ND4": "La couche spongieuse de votre ongle contient de minuscules pores qui retiennent nutriments, hydratation et graisses.",
  "ND5": "La lunule, ce petit croissant à la base de l'ongle, n'est pas encore entièrement kératinisée et donc plus tendre que le reste.",
  "ND6": "La cuticule protège la racine de votre ongle contre les substances étrangères et les micro-organismes.",
  "NE1": "Les nouvelles cellules de l'ongle se forment dans la racine, pas dans le lit unguéal.",
  "NE2": "Vos ongles poussent en moyenne de 3 mm par mois.",
  "NE3": "Vos ongles poussent plus vite en été qu'en hiver.",
  "NE4": "Un ongle de main pousse 4 fois plus vite qu'un ongle de pied.",
  "NE5": "Un ongle de main se renouvelle en moyenne en 4 à 6 mois ; un ongle de pied peut mettre jusqu'à 18 mois.",
  "NE6": "Les nouvelles cellules de l'ongle naissent par mitose : 1 cellule mère donne 2 cellules filles identiques.",
  "NF1": "Trois fines membranes maintiennent votre ongle en place : l'éponychium, le périonychium et l'hyponychium.",
  "NF2": "L'éponychium relie le repli unguéal proximal à la plaque de l'ongle.",
  "NF3": "L'hyponychium relie le bord libre de l'ongle au lit unguéal.",
  "LL1": "Un lash lift donne à vos propres cils une courbe naturelle et ouvre le regard — sans extensions.",
  "LL2": "Le résultat reste joli environ 8 semaines, selon la vitesse de pousse de vos cils.",
  "LL3": "Les premières 24 heures après votre lash lift : pas d'eau sur les cils, pour que la courbe se fixe bien.",
  "LL4": "Vous dormez sur le ventre ? Réservez plutôt votre lash lift le matin. Une taie d'oreiller en soie aide aussi.",
  "LL5": "L'huile est l'ennemie de votre courbe : utilisez un démaquillant sans huile ou une mousse nettoyante douce.",
  "LL6": "Brossez vos cils chaque jour pour garder la forme, avec une brosse à cils.",
  "LL7": "Après un lift, vous n'avez plus vraiment besoin de mascara.",
  "LT1": "Des cils clairs, blonds ou gris ? Une coloration donne du caractère sans mascara quotidien.",
  "LT2": "Une coloration des cils tient généralement 4 à 6 semaines.",
  "LT3": "La première fois, on choisit une teinte proche de votre couleur naturelle — pas de surprise.",
  "LT4": "Nouvelle cliente chez nous ? Nous faisons un petit test allergique 24 à 48 heures avant.",
  "LT5": "Venez à votre rendez-vous sans mascara et sans extensions de cils.",
  "LT6": "Nous laissons au moins 8 semaines entre deux lash lifts.",
  "LT7": "Enceinte ou allaitante ? Par précaution, nous préférons attendre pour le lift et la coloration.",
  "GV1": "Une peau saine est légèrement acide : le pH idéal se situe autour de 5,5.",
  "GV2": "Une peau vraiment équilibrée est rare — cette peau éclatante « filtrée » d'Instagram est plutôt l'exception que la règle.",
  "GV3": "Dans une peau équilibrée, sébum et hydratation sont en équilibre : environ 25 % de sébum et 75 % d'hydratation.",
  "GV4": "Le type de peau est inné et reste assez stable ; un état de peau (acné, déshydratation, sensibilité...) est temporaire et peut s'améliorer.",
  "GV5": "Une peau sèche peut manquer de lipides (sébostase) ou d'eau (déshydratée) — la première a besoin de nourriture, la seconde d'hydratation.",
  "GV6": "Séborstase = trop peu de sébum, séborrhée = trop de sébum.",
  "GV7": "Après l'été ou le solarium, la peau devient souvent plus grasse.",
  "GV8": "Une peau grasse peut sembler sèche : dans la séborrhée sèche, le sébum reste coincé dans le pore et forme de petites croûtes avec des squames, surtout sur le nez et les sourcils.",
  "GV9": "Une peau grasse bronze bien et se ride moins vite.",
  "GV10": "Un « pot unique pour peau mixte » n'est jamais idéal : le pot ne sait pas où votre peau est grasse ou sèche. Traitez chaque zone séparément.",
  "GV11": "L'huile de jojoba (végétale) et la lanoline (graisse de laine) ressemblent le plus à notre propre sébum.",
  "GV12": "Vers 45 ans, les fibres de collagène et d'élastine fonctionnent moins bien et le manque d'hydratation touche des couches plus profondes.",
  "GV13": "Il existe 6 phototypes : du type I (peau claire, cheveux roux/blonds, brûle très vite) au type VI (bronze très bien, ne brûle jamais).",
  "GV14": "La couperose est parfois appelée « varices du visage ».",
  "GV15": "Les boissons chaudes, les plats épicés, le vin, les épices et le passage du chaud au froid peuvent déclencher la couperose.",
  "GV16": "La couperose active est chaude et rouge, la couperose passive plutôt violette et froide.",
  "GV17": "En cas de couperose : pas de compresses chaudes, pas d'alcool, et de préférence pas de sauna ni de bain de vapeur. Tiède ou frais, voilà le mot d'ordre.",
  "GV18": "Apaisant pour la couperose : tilleul, azulène, kaolin et produits lactés. Renforçant pour les vaisseaux : hamamélis, petit-houx et vigne vierge.",
  "GV19": "Une lotion tonique restaure le pH après le nettoyage — les nettoyants moussants rendent surtout la peau plus alcaline.",
  "GV20": "Une peau humide et assouplie absorbe mieux les soins ; un peeling enzymatique n'est optimal que sur une peau humidifiée.",
  "GV21": "Quelle quantité de peeling ou de crème ? Environ la taille d'une noix.",
  "GV22": "Ne laissez pas un masque à l'argile sécher complètement : gardez-le humide.",
  "GV23": "Un soin du visage professionnel se planifie idéalement toutes les 5 semaines.",
  "GV24": "Pour une peau mature à la maison : panthénol, acide hyaluronique et extrait de levure de vin, et le Q10 comme antioxydant.",
  "GV25": "Un massage par points de pression est apparenté au shiatsu et à l'acupression : pression ciblée sur des points précis, sans huile — agréable contre la tension, la fatigue et les maux de tête.",
  "GV26": "Pendant un soin du visage, vous êtes allongée sur le dos, genoux légèrement plus hauts que les hanches : cela détend et aide le retour du sang vers le cœur.",
  "GV27": "Un soin commence par un massage d'accueil de la nuque, de la racine des cheveux et du cuir chevelu — le premier contact avec la cliente.",
  "GV28": "Dans le drainage lymphatique, on déplace la couche superficielle de la peau par rapport à la couche sous-jacente pour évacuer la lymphe.",
  "GV29": "Une spatule ultrasonique vibre à 25 000–30 000 hertz ; de minuscules bulles microscopiques (cavitation) nettoient les pores.",
  "GV30": "La spatule ultrasonique est indolore et convient aussi aux peaux sensibles.",
  "GV31": "Un vaporisateur facial s'utilise à environ 20 cm du visage, pendant 10 à 15 minutes.",
  "GV32": "Un appareil d'analyse de la peau prend 12 à 15 photos dans différents spectres lumineux et mesure l'hydratation — les changements cutanés naissent en profondeur et ne deviennent souvent visibles que plus tard.",
  "GV33": "Buvez suffisamment d'eau : une peau déshydratée profite d'une hydratation venue de l'intérieur.",
  "GV34": "Le café et l'alcool sont diurétiques. Astuce : buvez un verre d'eau en même temps que votre café.",
  "GV35": "On trouve des antioxydants contre les radicaux libres notamment dans le vin rouge, le brocoli et le chocolat noir.",
  "GV36": "Selon le cours, une alimentation trop riche en protéines n'est pas bonne pour une peau manquant de lipides.",
  "GV37": "Remettez une carte beauté : le soin effectué, les produits recommandés et la date idéale du prochain rendez-vous.",
  "GV38": "Une brûlure, par exemple due à la vapeur ? De l'eau, de l'eau, de l'eau… le reste vient après.",
  "SK1": "Après la peau déshydratée, la peau mixte est le type de peau le plus fréquent.",
  "SK2": "Votre peau est composée d'environ 70 à 72 % d'eau.",
  "SK3": "Environ 1,5 kg de micro-organismes vivent sur votre peau — dix fois plus que vos propres cellules corporelles.",
  "SK4": "La sueur en elle-même ne sent rien. L'odeur n'apparaît qu'au contact des bactéries de la peau.",
  "SK5": "Votre nez est l'endroit le plus densément peuplé de votre visage ; environ 2,5 millions de micro-organismes vivent par cm² sous vos aisselles.",
  "SK6": "L'épiderme n'a ni vaisseaux sanguins ni nerfs : il est nourri par le derme en dessous.",
  "SK7": "La perte d'hydratation de la peau commence déjà environ 15 minutes après la naissance.",
  "SK8": "Les rides d'expression apparaissent vers 35 ans, les sillons plus profonds comme le sillon nasogénien vers 45 ans.",
  "SK9": "La peau autour des yeux est fine et compte peu de glandes sébacées. Un masque en poudre n'y est donc pas une bonne idée.",
  "SK10": "La paume des mains et la plante des pieds absorbent le moins les produits ; le visage et les aisselles, le plus.",
  "SK11": "Une peau chaude, humide et bien irriguée absorbe mieux les soins qu'une peau froide et sèche.",
  "SK12": "Plus de crème n'est pas mieux : une fois la couche cornée saturée, le reste ne pénètre plus.",
  "SK13": "Le collagène d'une crème est trop volumineux pour pénétrer. Le collagène hydrolysé (fragmenté), lui, le peut.",
  "SK14": "L'acide hyaluronique peut retenir jusqu'à six litres d'eau par gramme, mais n'ajoute pas d'hydratation lui-même : il retient celle déjà présente.",
  "SK15": "Une peau sèche peut contenir jusqu'à 50 % de moins d'urée (un hydratant naturel).",
  "SK16": "UVA = A pour « Aging » (vieillissement), UVB = B pour « Burning » (brûlure), UVC = C pour « Catastrophe ».",
  "SK17": "Les UVA représentent 95 % des UV qui nous atteignent, sont présents toute l'année et traversent nuages et vitres.",
  "SK18": "Classes de FPS : faible 6-10, moyenne 15-25, élevée 30-50, très élevée 50+.",
  "SK19": "Le logo UVA signifie que la protection UVA atteint au moins un tiers du FPS.",
  "SK20": "Pour les enfants : au moins un FPS 30 avec protection UVA. Une crème abordable appliquée généreusement vaut mieux qu'une chère utilisée avec parcimonie.",
  "SK21": "L'autobronzant et les accélérateurs de bronzage donnent de la couleur, mais aucune protection contre les UV.",
  "SK22": "Choisissez des lunettes de soleil avec marquage CE, de préférence CE-3 pour les enfants. Des verres foncés sans filtre UV dilatent les pupilles et laissent entrer plus d'UV.",
  "SK23": "Les vêtements foncés et tissés serré protègent mieux que les vêtements clairs. La valeur UPF d'un vêtement ne disparaît pas au lavage.",
  "SK24": "Du parfum sur une peau exposée au soleil peut provoquer des taches pigmentaires.",
  "SK25": "Le soleil aide votre corps à produire de la vitamine D, mais trop de soleil dessèche la peau et peut aggraver la couperose.",
  "SK26": "Les vitamines C et E se renforcent mutuellement dans la lutte contre les radicaux libres.",
  "SK27": "Les acides de fruits (AHA) fonctionnent mieux en cure : une peau plus douce après 14 jours, mais pas plus de 4 semaines d'affilée.",
  "SK28": "L'azulène est le composé bleu et apaisant extrait de la camomille.",
  "SK29": "Il existe plus de 200 espèces d'aloès, mais un seul véritable aloe vera (« vera » signifie « vrai »).",
  "SK30": "La paraffine et la vaseline donnent une sensation de douceur immédiate, mais utilisées trop souvent, elles peuvent perturber la régulation naturelle de l'hydratation de la peau.",
  "SK31": "Naturel ne veut pas toujours dire sans risque d'allergie : camomille, arnica, aloe vera et huiles essentielles peuvent aussi provoquer des allergies.",
  "SK32": "Hypoallergénique signifie « moins de risque d'allergie », pas une garantie.",
  "SK33": "Sur l'étiquette, les ingrédients sont listés du plus au moins présent. Si « aqua » arrive en premier, le produit est surtout de l'eau.",
  "SK34": "« Cruelty-free » n'est pas la même chose que « vegan » : non testé sur les animaux peut quand même contenir du miel.",
  "SK35": "Jetez un produit ouvert après un an, ou plus tôt si l'odeur ou la couleur change. Prélevez dans un pot avec une spatule.",
  "SK36": "Les microbilles de gommage en plastique finissent dans la mer. Alternatives naturelles : noyau d'abricot broyé, sel ou sucre.",
  "SK37": "Le parfum contient 20 à 40 % de concentré, l'eau de parfum 10 à 20 %, l'eau de toilette 5 à 10 %, l'eau de cologne 2 à 3 %.",
  "SK38": "Ne jugez un parfum qu'après un quart d'heure sur la peau : c'est là que les notes de cœur ressortent.",
  "SK39": "L'eau de rose est le « sous-produit » de la distillation de l'huile de rose : un hydrolat.",
  "SK40": "Les huiles essentielles sont très puissantes et s'utilisent toujours diluées : un peu suffit amplement.",
  "SK41": "Après de l'huile de bergamote ou d'orange sur la peau, restez hors du soleil au moins 12 heures, sinon des taches brunes peuvent apparaître."
 }
};

  I18N.fr = FR.i18n;
  window.KID_CONTENT_FR = FR.kid;
  window.SUN_TIP_FR = FR.sunTip;

  const setFr = (obj, val) => { if (obj && typeof val === "string") obj.fr = val; };

  TREATMENTS_CATALOG.forEach(tr => {
    const src = FR.treatments[tr.id];
    if (!src) { console.warn("FR: no translation for treatment", tr.id); return; }
    ["benefits","funfact","aftercare","caution"].forEach(f => { if (tr[f]) setFr(tr[f], src[f]); });
  });

  Object.keys(PRODUCT_CATEGORIES).forEach(cid => {
    const cat = PRODUCT_CATEGORIES[cid], src = FR.products[cid];
    if (!src) { console.warn("FR: no translation for product category", cid); return; }
    setFr(cat.label, src.label);
    cat.products.forEach(p => setFr(p.usage, src.usage[p.id]));
  });

  KIDS_DRINKS.forEach(d => setFr(d.name, FR.kidsDrinks[d.id]));
  BOOKING_SLOTS.forEach(s => setFr(s, FR.slots[s.id]));
  CURRENT_ACTIONS.forEach(a => {
    const src = FR.actions[a.id]; if (!src) return;
    setFr(a.title, src.title); setFr(a.text, src.text);
  });

  PRICE_LIST.forEach(sec => {
    const src = FR.price[sec.id];
    if (!src) { console.warn("FR: no translation for price section", sec.id); return; }
    setFr(sec.title, src.title);
    if (sec.note) setFr(sec.note, src.note);
    sec.items.forEach((it, i) => {
      const row = src.items[i];
      if (!row || row[0] !== it.n.nl) { console.warn("FR: price item mismatch", sec.id, i, it.n.nl); return; }
      setFr(it.n, row[1]);
      if (it.d) setFr(it.d, row[2]);
      if (it.note) setFr(it.note, row[3]);
    });
  });

  HOUSE_RULES.forEach(sec => {
    const src = FR.houseRules[sec.id];
    if (!src) { console.warn("FR: no translation for house rules section", sec.id); return; }
    setFr(sec.title, src.title);
    if (sec.intro) setFr(sec.intro, src.intro);
    if (sec.outro) setFr(sec.outro, src.outro);
    sec.groups.forEach((g, gi) => {
      const sg = src.groups[gi];
      if (!sg || sg.items.length !== g.items.length) { console.warn("FR: house rules group mismatch", sec.id, gi); return; }
      if (g.title) setFr(g.title, sg.title);
      g.items.forEach((it, ii) => setFr(it, sg.items[ii]));
    });
  });

  SKIN_FACTS.forEach(f => setFr(f, FR.facts[f.code]));
  if (typeof PRACTICE_FACTS !== "undefined") {
    PRACTICE_FACTS.forEach(f => setFr(f, FR.practiceFacts[f.code]));
  }
  [CELL_FACTS, NAIL_FACTS, LASH_FACTS, FACIAL_FACTS, SKINKNOW_FACTS].forEach(arr => {
    if (typeof arr !== "undefined") arr.forEach(f => setFr(f, FR.moreFacts[f.code]));
  });

  if (typeof CONDITION_FACTS !== "undefined") {
    CONDITION_FACTS.forEach(f => {
      setFr(f, FR.conditionFacts[f.code]);
      const kopFr = FR.conditionKop[f.code];
      if (kopFr) f.kopFr = kopFr;
    });
  }

  /* Fail-safe: anything still without French falls back to English,
     so the app never shows "undefined". */
  (function fill(o){
    if (!o || typeof o !== "object") return;
    if (!Array.isArray(o) && typeof o.nl === "string" && typeof o.en === "string"){
      if (typeof o.fr !== "string") o.fr = o.en;
      return;
    }
    Object.keys(o).forEach(k => fill(o[k]));
  })([TREATMENTS_CATALOG, PRODUCT_CATEGORIES, KIDS_DRINKS, PRICE_LIST, BOOKING_SLOTS, CURRENT_ACTIONS, HOUSE_RULES, SKIN_FACTS, CONDITION_FACTS, PRACTICE_FACTS, CELL_FACTS, NAIL_FACTS, LASH_FACTS, FACIAL_FACTS, SKINKNOW_FACTS]);
})();
