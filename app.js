/* ============================================================
   BEAUTY & COFFEE — app logic
   100% client-side. No photo or personal data ever leaves the device.
   ============================================================ */
(function(){
  "use strict";

  const state = {
    lang: "nl",
    profile: null,        // 'kind' | 'man' | 'vrouw'
    ageBracket: null,     // '16-24' | '25-34' | '35-44' | '45plus'
    sunExposed: null,     // bool
    healthFlags: { phlebitis:false, contactLenses:false, menstruation:false, pregnant:false, pregStage:null, musclePain:false, roaccutane:false, dietExercise:false, sport:false, diet:false },
    kidsDrink: null,      // 'water' | 'chocolate'
    allergies: [],        // allergy ids from ALLERGY_ASK (session only)
    focus: null,          // gerichte match: { cat, ans:{questionId:optionId} } or null
    mood: null,
    complaintText: "",
    avoid: [],
    category: null,
    temperature: null,   // 'hot' | 'iced'
    caffeine: null,
    milk: "none",
    extras: [],
    context: null,        // 'salon' | 'thuis'
    slots: [],            // preferred weekend moments for the booking message
    skinFact: null,       // code of the skin fact shown on the result screen
    sunFact: null,        // code of the fact shown on the sun-check step
    photoDataUrl: null,
    filter: "none",       // 'none' | 'glow' | 'warm' | 'bw' | 'vintage'
    cameraStream: null,
    match: null
  };

  const STEP_WEIGHTS = {
    welcome:0, profile:8, age:16, sunCheck:24, healthCheck:30, kidsDrink:16, focus:34, focuswish:36, mood:38, category:48,
    temperature:56, caffeine:66, toppings:76, context:84, photo:92, loading:96, result:100
  };
  let history = ["welcome"];

  const FILTERS = {
    none:  "",
    glow:    "brightness(1.08) saturate(1.15) contrast(0.96)",
    warm:    "sepia(0.28) saturate(1.35) brightness(1.05)",
    bw:      "grayscale(1) contrast(1.08)",
    vintage: "sepia(0.35) contrast(0.9) brightness(1.05) saturate(0.8)"
  };
  const FILTER_IDS = ["none","glow","warm","bw","vintage","cartoon","mangacolor"];
  const cartoonCache = { sourceUrl: null, filterId: null, resultUrl: null };

  /* ---------------- helpers ---------------- */
  // Never run inside someone else's page (click-jacking): break out of frames.
  if (window.top !== window.self){
    // browsers often block that silently, so the app also hides itself
    document.documentElement.style.display = "none";
    try { window.top.location.replace(window.location.href); } catch(e){ /* stays hidden */ }
  }
  const $ = (sel, ctx) => (ctx||document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx||document).querySelectorAll(sel));
  // Anything a person typed or that came from outside the app goes through
  // esc() before it is put into the page, so it can never become code.
  const esc = v => String(v == null ? "" : v).replace(/[&<>"'`]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;", "`":"&#96;" }[c]));
  const cleanStr = (v, max) => typeof v === "string" ? v.replace(/[<>]/g, "").slice(0, max || 120) : "";

  function showToast(msg){
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=> el.classList.remove("is-visible"), 3200);
  }

  /* ---------------- i18n ---------------- */
  // v180: the welcome screen is kept quiet and high-end: no emoji at the start of its labels
  function stripLeadEmoji(v){ return String(v).replace(/^(?:[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]+\s*)+/u, ""); }
  function applyI18n(){
    $$("[data-i18n]").forEach(el => {
      const val = t(el.getAttribute("data-i18n"), state.lang);
      if (val != null) el.innerHTML = el.closest('section[data-step="welcome"], .reviews-card, .news-card, .newsletter-card') ? stripLeadEmoji(val) : val;
    });
    document.documentElement.lang = state.lang;
    $$(".lang-btn").forEach(b => {
      const active = b.dataset.lang === state.lang;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    renderProfileOptions();
    renderAgeOptions();
    renderSunOptions();
    renderHealthOptions();
    renderKidsDrinkOptions();
    renderMoodOptions();
    renderFocusOptions();
    if (state.focus) renderFocusWish();
    renderCategoryOptions();
    renderTemperatureOptions();
    renderCaffeineOptions();
    renderMilkOptions();
    renderExtrasOptions();
    renderContextOptions();
    renderFilterOptions();
    if (state.match && !state.match.quick) { renderResultDetails(); renderResultBlocks(); renderMatchTools(); renderLoyaltyBlock(); }
    renderSlotPicker();
    const ps = $("#priceSearch"); if (ps) ps.placeholder = t("pricelist_search", state.lang) || "";
    if (typeof PRICE_LIST !== "undefined" && $('section.step[data-step="pricelist"]').classList.contains("is-active")) renderPriceList();
    renderSunFact();
    if (typeof HOUSE_RULES !== "undefined" && $('section.step[data-step="houserules"]').classList.contains("is-active")) renderHouseRules();
    if ($('section.step[data-step="findme"]') && $('section.step[data-step="findme"]').classList.contains("is-active")) renderFindMe();
    if (typeof localData !== "undefined" && ($("#loyaltyBlock") || $("#loyaltyBlockStandalone"))) renderLoyaltyBlock();
    if ($('section.step[data-step="photopick"]') && $('section.step[data-step="photopick"]').classList.contains("is-active")) renderPhotoPick();
    if (state.quickPhoto && $('section.step[data-step="photoshare"]') && $('section.step[data-step="photoshare"]').classList.contains("is-active")) drawResultCanvas();
    if (typeof localData !== "undefined") renderReturningUserBlock();
    renderApptCard();
    if (season.theme) renderSeasonCard();
    if (typeof renderAdventCard === "function"){ renderAdventCard(); if ($('section.step[data-step="advent"]') && $('section.step[data-step="advent"]').classList.contains("is-active")) renderAdvent(); }
    if ($('section.step[data-step="myappt"]') && $('section.step[data-step="myappt"]').classList.contains("is-active")) renderApptForm();
    if ($('section.step[data-step="ingredients"]') && $('section.step[data-step="ingredients"]').classList.contains("is-active")) renderIngredients();
    if ($('section.step[data-step="giftcard"]') && $('section.step[data-step="giftcard"]').classList.contains("is-active")) renderGiftCard();
    renderSocialLinks();
    renderActions();
    if (typeof renderPreviewBar === "function") renderPreviewBar();
    if (typeof news !== "undefined" && news.posts) renderNewsCard();
    renderReviewsCard();
  }

  function setLang(lang){
    state.lang = lang;
    applyI18n();
    try { renderCopyName(); } catch(e){ /* not ready yet */ }
  }

  /* ---------------- step navigation ---------------- */
  function updateProgress(name){
    const w = STEP_WEIGHTS[name] ?? 0;
    $("#progressFill").style.width = w + "%";
    $(".progress").style.visibility = (name==="welcome" || name==="giftcard" || name==="pricelist" || name==="houserules" || name==="stampcard" || name==="findme" || name==="myappt" || name==="photopick" || name==="photoshare" || name==="advent" || name==="ingredients" || (name==="photo" && state.quickPhoto)) ? "hidden" : "visible";
  }

  function showStep(name){
    $$(".step").forEach(sec => sec.classList.toggle("is-active", sec.dataset.step === name));
    document.body.dataset.step = name;   // seasonal figures only on the start screen (calmer elsewhere)
    const topBack = $("#topbarBack"); if (topBack) topBack.hidden = (name === "welcome");
    updateProgress(name);

    if (name === "pricelist") {
      renderPriceList();
    }
    if (name === "focus") renderFocusOptions();
    if (name === "focuswish") renderFocusWish();
    if (name === "houserules") {
      renderHouseRules();
      const il = $("#rulesIngrLink"); if (il) il.hidden = !(typeof ingrIsLive === "function" && ingrIsLive());
    }
    if (name === "ingredients") {
      renderIngredients();
    }
    if (name === "stampcard") {
      renderLoyaltyBlock();
    }
    if (name === "giftcard") {
      renderGiftCard(); giftBind();
    }
    if (name === "findme") {
      renderFindMe();
    }
    if (name === "advent") {
      renderAdvent();
    }
    if (name === "sunCheck") {
      state.sunFact = randomFactCode(SKIN_FACT_POOLS.sun);
      renderSunFact();
    }
    if (name === "healthCheck") {
      renderHealthOptions();
    }
    if (name === "temperature") {
      renderTemperatureOptions();
    }
    if (name === "toppings") {
      renderMilkOptions();
      renderExtrasOptions();
    }
    if (name === "photo") {
      enterPhotoStep();
    } else if (state.cameraStream) {
      stopCamera();
    }

    window.scrollTo({top:0, behavior:"smooth"});
  }

  /* Every step is also an entry in the browser history, so the phone's own
     back button / back gesture works like the "Terug" button (feedback:
     people could not find the way back). NB: "history" (lower case) is the
     app's own step list; the browser's is window.history. */
  function goTo(name){
    history.push(name);
    try { window.history.pushState({ bcStep:name }, ""); } catch(e){ /* ignore */ }
    showStep(name);
  }
  function stepBack(){
    if (history.length > 1) history.pop();
    showStep(history[history.length-1]);
  }
  function back(){
    if (window.history.state && window.history.state.bcStep && history.length > 1) window.history.back();  // → popstate → stepBack()
    else stepBack();
  }
  window.addEventListener("popstate", () => {
    if (document.getElementById("stampScanOverlay")) { closeStampScanner(); return; }
    if (document.getElementById("adventVoucherOverlay")) { closeAdventVoucher(); }
    if (history.length > 1) stepBack();
  });
  // Result screen: go back to the first question with every answer kept,
  // so someone who clicked the wrong profile can simply change it.
  function editAnswers(){
    history = ["welcome"];
    goTo("profile");
  }

  /* ---------------- option rendering ---------------- */
  function renderProfileOptions(){
    const wrap = $("#profileOptions");
    wrap.innerHTML = "";
    PROFILES.filter(id => !(id === "kind" && BC_UNAVAILABLE.has("kindermanicure"))).forEach(id => {
      const data = t(`profiles.${id}`, state.lang);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "option-card" + (state.profile===id ? " is-selected" : "");
      card.innerHTML = `<span class="option-card__icon">${PROFILE_ICONS[id]}</span>
        <span class="option-card__text">
          <span class="option-card__title">${data.title}</span>
          <span class="option-card__sub">${data.sub}</span>
        </span>`;
      card.addEventListener("click", () => {
        state.profile = id; renderProfileOptions();
        localData.savedProfile = id;
        if (id === "kind"){ localData.savedAgeBracket = null; }
        saveLocalData();
        setTimeout(() => { goTo(id === "kind" ? "kidsDrink" : "age"); }, 200);
      });
      wrap.appendChild(card);
    });
  }

  function renderAgeOptions(){
    const wrap = $("#ageOptions");
    if (!wrap) return;
    wrap.innerHTML = "";
    AGE_BRACKETS.forEach(id => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "option-tile" + (state.ageBracket===id ? " is-selected" : "");
      tile.innerHTML = `<span class="option-tile__icon">${AGE_ICONS[id]}</span>
        <span class="option-tile__title">${t(`age.${id}`, state.lang)}</span>`;
      tile.addEventListener("click", () => { state.ageBracket = id; renderAgeOptions(); localData.savedAgeBracket = id; saveLocalData(); setTimeout(()=>goTo("sunCheck"), 200); });
      wrap.appendChild(tile);
    });
  }

  function renderSunOptions(){
    const wrap = $("#sunOptions");
    wrap.innerHTML = "";
    [["yes",true],["no",false]].forEach(([key,val]) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "option-tile" + (state.sunExposed===val ? " is-selected" : "");
      tile.innerHTML = `<span class="option-tile__icon">${key==="yes" ? "🌞" : "🌥️"}</span>
        <span class="option-tile__title">${t(`sun_${key}`, state.lang)}</span>`;
      tile.addEventListener("click", () => { state.sunExposed = val; renderSunOptions(); setTimeout(()=>goTo("healthCheck"), 200); });
      wrap.appendChild(tile);
    });
    let notice = wrap.parentElement.querySelector(".sun-notice");
    if (!notice){
      notice = document.createElement("div");
      notice.className = "sun-notice";
      wrap.insertAdjacentElement("afterend", notice);
    }
    notice.innerHTML = `<span class="sun-notice__icon">🧴</span><span>${t("sun_filtered_notice", state.lang)}</span>`;
  }

  function renderHealthOptions(){
    renderAllergyOptions();
    const checkWrap = $("#healthChecklist");
    if (checkWrap){
      checkWrap.innerHTML = "";
      const items = [
        ["phlebitis", "🩸"],
        ["contactLenses", "👓"],
        ["musclePain", "💪"],
        ["roaccutane", "💊"]
      ];
      if (state.profile === "vrouw") items.push(["menstruation", "🌙"], ["pregnant", "🤰"]);
      (typeof HEALTH_EXTRA !== "undefined" ? HEALTH_EXTRA : []).forEach(h => items.push([h.key, h.icon, h]));
      items.forEach(([key, icon, h]) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip chip--check" + (state.healthFlags[key] ? " is-selected" : "");
        chip.innerHTML = `<span class="chip__icon">${icon}</span> ${h ? esc(h.label[state.lang] || h.label.nl) : t(`health_${key}`, state.lang)}`;
        chip.addEventListener("click", () => {
          state.healthFlags[key] = !state.healthFlags[key];
          if (key === "pregnant" && !state.healthFlags.pregnant) state.healthFlags.pregStage = null;
          renderHealthOptions();
        });
        checkWrap.appendChild(chip);
      });
      // v172: pregnant → how far along (last 3 months = no ordinary massage)
      checkWrap.parentElement.querySelectorAll(".preg-stage").forEach(n => n.remove());
      if (state.healthFlags.pregnant && state.profile === "vrouw"){
        const ps = document.createElement("div"); ps.className = "preg-stage";
        const cur = state.healthFlags.pregStage;
        ps.innerHTML = `<p class="preg-stage__q">🤰 ${t("preg_q", state.lang)}</p><div class="options options--chip">${["1-3","4-6","7-9"].map(k => `<button type="button" class="chip chip--check${cur === k ? " is-selected" : ""}" data-preg="${k}" aria-pressed="${cur === k}">${t("preg_" + k.replace("-", "_"), state.lang)}</button>`).join("")}</div>${cur === "7-9" ? `<div class="sun-notice"><span class="sun-notice__icon">🤰</span><span>${t("preg_note_late", state.lang)}</span></div>` : ""}`;
        ps.querySelectorAll("[data-preg]").forEach(b => b.addEventListener("click", () => { state.healthFlags.pregStage = state.healthFlags.pregStage === b.dataset.preg ? null : b.dataset.preg; renderHealthOptions(); }));
        checkWrap.insertAdjacentElement("afterend", ps);
      }
      // notes for the extra health points
      checkWrap.parentElement.querySelectorAll(".health-extra-notice").forEach(n => n.remove());
      (typeof HEALTH_EXTRA !== "undefined" ? HEALTH_EXTRA : []).filter(h => state.healthFlags[h.key]).reverse().forEach(h => {
        const n = document.createElement("div"); n.className = "sun-notice health-extra-notice";
        n.innerHTML = `<span class="sun-notice__icon">${h.icon}</span><span>${esc(h.note[state.lang] || h.note.nl)}</span>`;
        checkWrap.insertAdjacentElement("afterend", n);
      });
      let rNotice = checkWrap.parentElement.querySelector(".roaccutane-notice");
      if (state.healthFlags.roaccutane){
        if (!rNotice){
          rNotice = document.createElement("div");
          rNotice.className = "sun-notice roaccutane-notice";
          checkWrap.insertAdjacentElement("afterend", rNotice);
        }
        rNotice.innerHTML = `<span class="sun-notice__icon">💊</span><span>${t("roaccutane_filtered_notice", state.lang)}</span>`;
      } else if (rNotice){
        rNotice.remove();
      }
    }

    // Sport and diet are two separate choices (both may be ticked);
    // "neither" clears them. The matching logic still only needs
    // dietExercise = sport OR diet (for the slimming massage).
    const dietWrap = $("#dietOptions");
    if (dietWrap){
      dietWrap.innerHTML = "";
      const hf = state.healthFlags;
      [["sport","🏃"],["diet","🥗"],["none","🙅"]].forEach(([key, icon]) => {
        const selected = key === "none" ? (!hf.sport && !hf.diet) : !!hf[key];
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = "option-tile" + (selected ? " is-selected" : "");
        tile.setAttribute("aria-pressed", selected ? "true" : "false");
        tile.innerHTML = `<span class="option-tile__icon">${icon}</span>
          <span class="option-tile__title">${t(`diet_opt_${key}`, state.lang)}</span>`;
        tile.addEventListener("click", () => {
          if (key === "none"){ hf.sport = false; hf.diet = false; }
          else hf[key] = !hf[key];
          hf.dietExercise = hf.sport || hf.diet;
          renderHealthOptions();
        });
        dietWrap.appendChild(tile);
      });
    }
  }

  function renderKidsDrinkOptions(){
    const wrap = $("#kidsDrinkOptions");
    wrap.innerHTML = "";
    KIDS_DRINKS.forEach(d => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "option-tile option-tile--kid" + (state.kidsDrink===d.id ? " is-selected" : "");
      tile.innerHTML = `<span class="option-tile__icon">${d.icon}</span>
        <span class="option-tile__title">${d.name[state.lang]}</span>`;
      tile.addEventListener("click", () => { state.kidsDrink = d.id; renderKidsDrinkOptions(); setTimeout(()=>{ state.context = "salon"; runGeneration(); }, 200); });
      wrap.appendChild(tile);
    });
  }

  /* ---------------- gerichte match (v155) ---------------- */
  function focusGuides(){
    if (typeof FOCUS_GUIDES === "undefined") return [];
    return FOCUS_ORDER.filter(id => FOCUS_GUIDES[id] && (!FOCUS_GUIDES[id].genders || FOCUS_GUIDES[id].genders.includes(state.profile)));
  }
  function fx(o){ return o ? (o[state.lang] || o.nl || "") : ""; }
  function renderFocusOptions(){
    const wrap = $("#focusOptions"); if (!wrap) return;
    wrap.innerHTML = "";
    const add = (id, icon, title, sub) => {
      const card = document.createElement("button");
      card.type = "button";
      const sel = id === "surprise" ? (state.focus === null && history.includes("mood")) : (state.focus && state.focus.cat === id);
      card.className = "option-card" + (sel ? " is-selected" : "");
      card.dataset.focus = id;
      card.innerHTML = `<span class="option-card__icon">${icon}</span><span class="option-card__text"><span class="option-card__title">${title}</span><span class="option-card__sub">${sub}</span></span>`;
      card.addEventListener("click", () => {
        if (id === "surprise"){ state.focus = null; setTimeout(() => goTo("mood"), 200); }
        else { if (!state.focus || state.focus.cat !== id) state.focus = { cat:id, ans:{} }; setTimeout(() => goTo("focuswish"), 200); }
        renderFocusOptions();
      });
      wrap.appendChild(card);
    };
    focusGuides().forEach(id => { const g = FOCUS_GUIDES[id]; add(id, g.icon, fx(g.label), fx(g.sub)); });
    add("surprise", "✨", t("focus_surprise_title", state.lang), t("focus_surprise_sub", state.lang));
  }
  function renderFocusWish(){
    const wrap = $("#focusQuestions"); if (!wrap || !state.focus) return;
    const g = FOCUS_GUIDES[state.focus.cat]; if (!g) return;
    const ttl = $("#focusWishTitle"); if (ttl) ttl.textContent = g.icon + " " + fx(g.label);
    wrap.innerHTML = g.questions.map(q => `
      <div class="focus-q">
        <p class="focus-q__label">${esc(fx(q.label))}${q.required ? "" : ` <span class="focus-q__opt">${t("focus_optional", state.lang)}</span>`}</p>
        <div class="options options--chip">${q.options.filter(o => !o.genders || o.genders.includes(state.profile)).map(o => {
          const on = state.focus.ans[q.id] === o.id;
          return `<button type="button" class="chip${on ? " is-selected" : ""}" data-fq="${q.id}" data-fo="${o.id}" aria-pressed="${on}">${esc(fx(o.label))}</button>`;
        }).join("")}</div>
      </div>`).join("");
    wrap.querySelectorAll("[data-fq]").forEach(b => b.addEventListener("click", () => {
      const q = b.dataset.fq, o = b.dataset.fo;
      if (state.focus.ans[q] === o) delete state.focus.ans[q]; else state.focus.ans[q] = o;
      renderFocusWish();
    }));
  }
  function focusNext(){
    const g = state.focus && FOCUS_GUIDES[state.focus.cat];
    if (!g) { goTo("mood"); return; }
    const missing = g.questions.find(q => q.required && !state.focus.ans[q.id]);
    if (missing){ showToast(t("focus_need", state.lang)); return; }
    goTo("category");
  }
  // scores + notes + advice from the answers (used by generateMatch)
  function focusEvaluate(){
    const f = state.focus, g = f && FOCUS_GUIDES[f.cat];
    if (!g) return null;
    const month = new Date().getMonth() + 1;
    const scores = {}, notes = [], tips = [], labels = [], mu = {};
    let family = null;
    const addS = obj => Object.entries(obj || {}).forEach(([k, v]) => { scores[k] = (scores[k] || 0) + v; });
    g.questions.forEach(q => {
      const o = q.options.find(x => x.id === f.ans[q.id] && (!x.genders || x.genders.includes(state.profile))); if (!o) return;
      labels.push(fx(o.label));
      if (o.months && !o.months.includes(month)){ addS(o.off); if (o.offNote) notes.push(fx(o.offNote)); }
      else addS(o.s);
      if (o.ageNote && state.ageBracket !== "45plus") notes.push(fx(o.ageNote));
      if (o.tip) tips.push(fx(o.tip));
      Object.entries(o.mu || {}).forEach(([k, v]) => { mu[k] = (mu[k] || 0) + v; });
      if (o.family) family = o.family;
    });
    // make-up: which type suits best
    if (f.cat === "makeup"){
      let best = "mineral", bv = mu.mineral || 0;
      ["hd","camouflage"].forEach(k => { if ((mu[k] || 0) > bv){ best = k; bv = mu[k]; } });
      if (typeof FOCUS_MAKEUP_TYPES !== "undefined") tips.unshift(fx(FOCUS_MAKEUP_TYPES[best]));
    }
    // nails: colour tips (not when "no colour")
    if (f.cat === "nails" && f.ans.last !== "none" && typeof FOCUS_COLOURS !== "undefined"){
      let fam = family || "season";
      if (fam === "season") fam = [12,1,2].includes(month) ? "winter" : [3,4,5].includes(month) ? "spring" : [6,7,8].includes(month) ? "summer" : "autumn";
      const c = FOCUS_COLOURS[fam];
      if (c) tips.push(t("focus_colours", state.lang).replace("{family}", fx(c.label)).replace("{names}", c.names.join(", ")));
    }
    return { cat:f.cat, scores, notes, tips, labels, group: g.group };
  }
  function focusGroupIds(group){
    if (group === "nails") return [...new Set([...(AVOID_GROUPS.hands || []), ...(AVOID_GROUPS.feet || [])])].filter(id => id !== "cateye");
    return AVOID_GROUPS[group] || [];
  }

  function renderMoodOptions(){
    renderAvoidOptions();
    const wrap = $("#moodOptions");
    wrap.innerHTML = "";
    MOODS.forEach(id => {
      const data = t(`moods.${id}`, state.lang);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "option-card" + (state.mood===id ? " is-selected" : "");
      card.innerHTML = `<span class="option-card__icon">${MOOD_ICONS[id]}</span>
        <span class="option-card__text">
          <span class="option-card__title">${data.title}</span>
          <span class="option-card__sub">${data.sub}</span>
        </span>`;
      card.addEventListener("click", () => { state.mood = id; renderMoodOptions(); setTimeout(()=>goTo("category"), 220); });
      wrap.appendChild(card);
    });
  }

  function renderCategoryOptions(){
    const wrap = $("#categoryOptions");
    wrap.innerHTML = "";
    CATEGORIES.forEach(id => {
      const data = t(`categories.${id}`, state.lang);
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "option-tile" + (state.category===id ? " is-selected" : "");
      tile.innerHTML = `<span class="option-tile__icon">${CATEGORY_ICONS[id]}</span>
        <span class="option-tile__title">${data.title}</span>
        <span class="option-tile__sub">${data.sub}</span>`;
      tile.addEventListener("click", () => {
        state.category = id; renderCategoryOptions();
        // Tea is always served hot: skip the "warm of koud" question
        if (id === "tea"){ state.temperature = "hot"; setTimeout(()=>goTo("caffeine"), 220); }
        else setTimeout(()=>goTo("temperature"), 220);
      });
      wrap.appendChild(tile);
    });
  }

  function renderTemperatureOptions(){
    const wrap = $("#temperatureOptions");
    if (!wrap) return;
    wrap.innerHTML = "";
    TEMPERATURE_OPTIONS.forEach(id => {
      const data = t(`temperature.${id}`, state.lang);
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "option-tile" + (state.temperature===id ? " is-selected" : "");
      tile.innerHTML = `<span class="option-tile__icon">${TEMPERATURE_ICONS[id]}</span>
        <span class="option-tile__title">${data.title}</span>
        <span class="option-tile__sub">${data.sub}</span>`;
      tile.addEventListener("click", () => {
        state.temperature = id; renderTemperatureOptions();
        setTimeout(() => {
          if (state.category === "matcha"){ state.caffeine = "caff"; goTo("toppings"); }
          else { goTo("caffeine"); }
        }, 220);
      });
      wrap.appendChild(tile);
    });

    const hint = $("#temperatureHint");
    if (hint){
      if (state.category === "tea"){
        hint.hidden = false;
        hint.textContent = t("temperature_tea_hint", state.lang);
      } else {
        hint.hidden = true;
      }
    }
  }

  function renderCaffeineOptions(){
    const wrap = $("#caffeineOptions");
    wrap.innerHTML = "";
    CAFFEINE_OPTIONS.forEach(id => {
      const data = t(`caffeine.${id}`, state.lang);
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "option-tile" + (state.caffeine===id ? " is-selected" : "");
      tile.innerHTML = `<span class="option-tile__icon">${CAFFEINE_ICONS[id]}</span>
        <span class="option-tile__title">${data.title}</span>
        <span class="option-tile__sub">${data.sub}</span>`;
      tile.addEventListener("click", () => { state.caffeine = id; renderCaffeineOptions(); setTimeout(()=>goTo("toppings"), 220); });
      wrap.appendChild(tile);
    });
  }

  function renderMilkOptions(){
    const group = $("#milkGroup");
    const wrap = $("#milkOptions");
    // Plain teas don't take milk — except Matcha, our only caffeinated tea
    // that comes with a milk option (choosing milk turns it into a Matcha
    // Latte). So: hidden for decaf tea, shown otherwise.
    const milkApplies = !(state.category === "tea" && state.caffeine === "decaf");
    if (group) group.hidden = !milkApplies;
    if (!milkApplies && state.milk !== "none") state.milk = "none";

    wrap.innerHTML = "";
    // Tea never comes with milk: hide the whole milk group
    const milkGroup = wrap.closest(".refine-group");
    if (milkGroup) milkGroup.hidden = state.category === "tea";
    if (state.category === "tea"){ state.milk = "none"; wrap.innerHTML = ""; return; }
    const milkChoices = state.category === "matcha" ? MILK_OPTIONS.filter(m => m !== "none") : MILK_OPTIONS;
    if (state.category === "matcha" && state.milk === "none") state.milk = "whole";
    milkChoices.forEach(id => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (state.milk===id ? " is-selected" : "");
      chip.textContent = t(`milk.${id}`, state.lang);
      chip.addEventListener("click", () => { state.milk = id; renderMilkOptions(); });
      wrap.appendChild(chip);
    });

    let hint = group ? group.querySelector(".milk-hint") : null;
    if (milkApplies && state.category === "tea"){
      if (!hint){
        hint = document.createElement("p");
        hint.className = "milk-hint";
        group.appendChild(hint);
      }
      hint.textContent = t("milk_tea_hint", state.lang);
    } else if (hint){
      hint.remove();
    }
  }

  function renderExtrasOptions(){
    const wrap = $("#extrasOptions");
    wrap.innerHTML = "";
    const options = state.category === "matcha" ? MATCHA_EXTRA_OPTIONS : (state.category === "tea" ? TEA_EXTRA_OPTIONS : EXTRA_OPTIONS);
    // drop any previously-picked extras that no longer apply (e.g. switched from coffee to tea)
    state.extras = state.extras.filter(id => options.includes(id));
    options.forEach(id => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (state.extras.includes(id) ? " is-selected" : "");
      chip.textContent = t(`extras.${id}`, state.lang);
      chip.addEventListener("click", () => {
        const i = state.extras.indexOf(id);
        if (i>-1) state.extras.splice(i,1); else state.extras.push(id);
        renderExtrasOptions();
      });
      wrap.appendChild(chip);
    });
    }

  // "Liever niet" chips on the last question: rule out treatment groups.
  // Remembered on this device, so a client only has to set it once.
  function renderAvoidOptions(){
    const wrap = $("#avoidOptions");
    if (!wrap || typeof AVOID_GROUPS === "undefined") return;
    if (!state.avoidLoaded && typeof localData !== "undefined"){ state.avoid = Array.isArray(localData.savedAvoid) ? [...localData.savedAvoid] : []; state.avoidLoaded = true; }
    wrap.innerHTML = "";
    Object.keys(AVOID_GROUPS).forEach(g => {
      const on = state.avoid.includes(g);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip chip--avoid" + (on ? " is-selected" : "");
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      chip.textContent = `${AVOID_ICONS[g]} ${t("avoid." + g, state.lang)}`;
      chip.addEventListener("click", () => {
        state.avoid = on ? state.avoid.filter(x => x !== g) : state.avoid.concat([g]);
        localData.savedAvoid = [...state.avoid]; saveLocalData();
        renderAvoidOptions();
      });
      wrap.appendChild(chip);
    });
  }
  function renderContextOptions(){
    renderAvoidOptions();
    const wrap = $("#contextOptions");
    wrap.innerHTML = "";
    [
      { id:"salon", icon:"🏢", key:"context_salon", sub:"context_salon_sub" },
      { id:"thuis", icon:"🏡", key:"context_home", sub:"context_home_sub" }
    ].forEach(opt => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "option-card" + (state.context===opt.id ? " is-selected" : "");
      card.innerHTML = `<span class="option-card__icon">${opt.icon}</span>
        <span class="option-card__text">
          <span class="option-card__title">${t(opt.key, state.lang)}</span>
          <span class="option-card__sub">${t(opt.sub, state.lang)}</span>
        </span>`;
      card.addEventListener("click", () => {
        state.context = opt.id; renderContextOptions();
        setTimeout(() => { runGeneration(); }, 200);
      });
      wrap.appendChild(card);
    });
  }

  /* ---------------- camera / photo ---------------- */
  const video = () => $("#cameraVideo");
  const canvas = () => $("#captureCanvas");
  const preview = () => $("#photoPreview");
  const placeholder = () => $("#photoPlaceholder");
  let cameraFacing = "user";

  /* Called every time the photo step becomes active. The camera/upload flow
     is available regardless of salon vs. thuis — thuis just adds a visible
     "skip this" hint since Generate never requires a photo either way. */
  function enterPhotoStep(){
    $("#photoEditor").hidden = true;
    $("#photoStage").hidden = false;
    $("#filterRow").hidden = false;
    $("#photoHomeBlock").hidden = state.context !== "thuis";
    $("#generateBtn").disabled = false;

    if (state.photoDataUrl){
      showPhotoPreview();
    } else {
      openCamera();
    }
  }

  /* Camera (since v92):
     - the back camera asks for its native 4:3 picture (asking for a portrait
       size made some phones crop the sensor = "zoomed in");
     - digital zoom with a slider (and pinch): 1 = the whole picture;
       the back camera starts at 1, the selfie camera as before (filled);
     - the switch button walks through ALL cameras (front, main, wide…)
       when the phone has more than two;
     - "Manga" and "Manga kleur" are shown live, with the same effect as
       on the result. The photo = exactly what you see in the frame. */
  const cam = { zoom:1, minZoom:1, maxZoom:4, deviceId:null, live:null, liveBusy:false };
  function camStageSize(){ const r = $("#photoStage").getBoundingClientRect(); return { w: r.width || 360, h: r.height || 450 }; }
  function camFit(){
    const v = video(), st = camStageSize();
    const vw = v.videoWidth || 4, vh = v.videoHeight || 3;
    const s0 = Math.min(st.w / vw, st.h / vh), s1 = Math.max(st.w / vw, st.h / vh);
    return { vw, vh, st, s0, cover: s1 / s0 };
  }
  // part of the video that is visible at the current zoom (video pixels)
  function camRegion(){
    const f = camFit(), s = f.s0 * cam.zoom;
    const sw = Math.min(f.vw, f.st.w / s), sh = Math.min(f.vh, f.st.h / s);
    return { sx:(f.vw - sw) / 2, sy:(f.vh - sh) / 2, sw, sh, f };
  }
  function setCamZoom(z, quiet){
    cam.zoom = Math.min(cam.maxZoom, Math.max(cam.minZoom, z || 1));
    video().style.setProperty("--cz", String(cam.zoom));
    const sl = $("#cameraZoom");
    if (sl && !quiet) sl.value = String(cam.zoom);
  }
  function camInitZoom(){
    const f = camFit();
    cam.minZoom = 1;
    cam.maxZoom = Math.max(4, f.cover * 3);
    const sl = $("#cameraZoom");
    if (sl){ sl.min = "1"; sl.max = String(cam.maxZoom.toFixed(2)); sl.step = "0.01"; }
    setCamZoom(cameraFacing === "user" ? f.cover : 1);
    $("#cameraZoomWrap").hidden = false;
  }

  async function openCamera(facing, deviceId){
    if (facing) cameraFacing = facing;
    stopCamera();
    $("#photoEditor").hidden = true;
    $("#photoStage").hidden = false;
    placeholder().hidden = false;
    placeholder().querySelector("p").textContent = t("camera_starting", state.lang);
    video().hidden = true;
    preview().hidden = true;
    try {
      const size = cameraFacing === "user"
        ? { width:{ ideal:1080 }, height:{ ideal:1350 } }
        : { width:{ ideal:1920 }, height:{ ideal:1440 } };
      const vc = deviceId ? Object.assign({ deviceId:{ exact:deviceId } }, size)
                          : Object.assign({ facingMode:{ ideal:cameraFacing } }, size);
      const stream = await navigator.mediaDevices.getUserMedia({ video: vc, audio: false });
      state.cameraStream = stream;
      const track = stream.getVideoTracks()[0];
      try {
        const set = track.getSettings ? track.getSettings() : {};
        cam.deviceId = set.deviceId || deviceId || null;
        if (set.facingMode === "user" || set.facingMode === "environment") cameraFacing = set.facingMode;
        // start the lens itself fully zoomed out
        const caps = track.getCapabilities ? track.getCapabilities() : {};
        if (caps.zoom && typeof caps.zoom.min === "number") await track.applyConstraints({ advanced:[{ zoom: caps.zoom.min }] });
      } catch(e){ /* not supported: fine */ }
      const v = video();
      v.srcObject = stream;
      v.hidden = false;
      v.classList.toggle("is-mirrored", cameraFacing === "user");
      placeholder().hidden = true;
      try { await v.play(); } catch(e){ /* some browsers auto-play once metadata loads */ }
      if (!v.videoWidth) await new Promise(r => { v.onloadedmetadata = () => r(); setTimeout(r, 1500); });
      camInitZoom();
      applyGlowPreview();
      $("#photoActionsIdle").hidden = true;
      $("#photoActionsCamera").hidden = false;
      $("#photoActionsRetake").hidden = true;
      $("#uploadInsteadBtn").hidden = false;
      updateSwitchCameraVisibility();
    } catch(err){
      placeholder().hidden = false;
      placeholder().querySelector("p").textContent = t("camera_denied_text", state.lang);
      $("#photoActionsCamera").hidden = true;
      $("#uploadInsteadBtn").hidden = true;
      $("#photoActionsIdle").hidden = false;
      $("#switchCameraBtn").hidden = true;
      $("#cameraZoomWrap").hidden = true;
      showToast(t("toast_camera_denied", state.lang));
    }
  }

  async function camList(){
    try { return (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === "videoinput"); }
    catch(e){ return []; }
  }
  async function updateSwitchCameraVisibility(){
    const cams = await camList();
    $("#switchCameraBtn").hidden = cams.length ? cams.length < 2 : false;
  }

  // front ↔ back; with 3+ cameras (main, wide, tele…) walk through all of them
  async function switchCamera(){
    const cams = await camList();
    if (cams.length > 2 && cams.every(c => c.deviceId)){
      const front = c => /front|user|voor|selfie/i.test(c.label || "");
      const ordered = cams.filter(front).concat(cams.filter(c => !front(c)));
      let i = ordered.findIndex(c => c.deviceId === cam.deviceId);
      const next = ordered[(i + 1) % ordered.length];
      await openCamera(front(next) ? "user" : "environment", next.deviceId);
      const pos = ordered.findIndex(c => c.deviceId === cam.deviceId);
      showToast(t("camera_lens", state.lang).replace("{n}", String((pos < 0 ? 0 : pos) + 1)).replace("{t}", String(ordered.length)));
      return;
    }
    openCamera(cameraFacing === "user" ? "environment" : "user");
  }

  function stopCamera(){
    stopLiveFilter();
    if (state.cameraStream){
      state.cameraStream.getTracks().forEach(tr => tr.stop());
      state.cameraStream = null;
    }
    video().hidden = true;
    $("#switchCameraBtn").hidden = true;
    const zw = $("#cameraZoomWrap"); if (zw) zw.hidden = true;
  }

  /* live manga preview: process small frames of the visible part, one at a time */
  function startLiveFilter(){
    const lc = $("#liveFilterCanvas");
    if (!lc || !state.cameraStream || !isMangaFilter(state.filter)){ stopLiveFilter(); return; }
    lc.hidden = false;
    video().classList.add("is-under-live");
    if (cam.live) return;
    cam.live = true;
    const off = document.createElement("canvas");
    const tick = () => {
      if (!cam.live) return;
      const v = video();
      if (!state.cameraStream || !v.videoWidth || !isMangaFilter(state.filter)){ cam.liveTimer = setTimeout(tick, 120); return; }
      const R = camRegion(), st = R.f.st;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const W = Math.round(st.w * dpr), H = Math.round(st.h * dpr);
      if (lc.width !== W || lc.height !== H){ lc.width = W; lc.height = H; }
      // destination of the visible region inside the frame (contain at zoom)
      const s = R.f.s0 * cam.zoom, dw = R.sw * s * dpr, dh = R.sh * s * dpr;
      const dx = (W - dw) / 2, dy = (H - dh) / 2;
      const MAX = 380, k = Math.min(1, MAX / Math.max(R.sw, R.sh));
      const ow = Math.max(8, Math.round(R.sw * k)), oh = Math.max(8, Math.round(R.sh * k));
      off.width = ow; off.height = oh;
      const octx = off.getContext("2d", { willReadFrequently:true });
      octx.save();
      if (cameraFacing === "user"){ octx.translate(ow, 0); octx.scale(-1, 1); }
      octx.drawImage(v, R.sx, R.sy, R.sw, R.sh, 0, 0, ow, oh);
      octx.restore();
      try {
        const d = octx.getImageData(0, 0, ow, oh).data;
        const px = state.filter === "mangacolor" ? mangaColorPixels(d, ow, oh) : mangaPixels(d, ow, oh);
        octx.putImageData(new ImageData(px, ow, oh), 0, 0);
      } catch(e){ /* keep the plain frame */ }
      const ctx = lc.getContext("2d");
      ctx.fillStyle = "#241A14"; ctx.fillRect(0, 0, W, H);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(off, dx, dy, dw, dh);
      cam.liveTimer = setTimeout(() => requestAnimationFrame(tick), 30);
    };
    tick();
  }
  function stopLiveFilter(){
    cam.live = null;
    clearTimeout(cam.liveTimer);
    const lc = $("#liveFilterCanvas"); if (lc) lc.hidden = true;
    const v = $("#cameraVideo"); if (v) v.classList.remove("is-under-live");
  }

  function setupCameraZoom(){
    const sl = $("#cameraZoom"), stage = $("#photoStage");
    if (sl) sl.addEventListener("input", e => setCamZoom(parseFloat(e.target.value), true));
    // pinch to zoom on the frame
    const pts = new Map(); let startDist = 0, startZoom = 1;
    const dist = () => { const a = [...pts.values()]; return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y); };
    stage.addEventListener("pointerdown", e => {
      if (!state.cameraStream) return;
      pts.set(e.pointerId, { x:e.clientX, y:e.clientY });
      if (pts.size === 2){ startDist = dist(); startZoom = cam.zoom; }
    });
    stage.addEventListener("pointermove", e => {
      if (!pts.has(e.pointerId)) return;
      pts.set(e.pointerId, { x:e.clientX, y:e.clientY });
      if (pts.size === 2 && startDist > 0) setCamZoom(startZoom * dist() / startDist);
    });
    const up = e => { pts.delete(e.pointerId); if (pts.size < 2) startDist = 0; };
    ["pointerup","pointercancel","pointerleave"].forEach(ev => stage.addEventListener(ev, up));
  }

  // the photo = exactly the part you see in the frame
  function snapPhoto(){
    const v = video();
    const c = canvas();
    const R = camRegion();
    c.width = Math.round(R.sw); c.height = Math.round(R.sh);
    const ctx = c.getContext("2d");
    if (cameraFacing === "user"){
      ctx.translate(c.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(v, R.sx, R.sy, R.sw, R.sh, 0, 0, c.width, c.height);
    const dataUrl = c.toDataURL("image/jpeg", 0.92);
    stopCamera();
    useTakenPhoto(dataUrl);
  }

  function cancelCamera(){
    stopCamera();
    $("#photoActionsCamera").hidden = true;
    $("#uploadInsteadBtn").hidden = true;
    $("#photoActionsIdle").hidden = false;
    placeholder().hidden = !!state.photoDataUrl;
    preview().hidden = !state.photoDataUrl;
  }

  function showPhotoPreview(){
    $("#photoEditor").hidden = true;
    $("#photoStage").hidden = false;
    $("#filterRow").hidden = false;   // fix v28: filters stayed hidden after the photo editor
    preview().src = state.photoDataUrl;
    preview().hidden = false;
    placeholder().hidden = true;
    $("#photoActionsCamera").hidden = true;
    $("#uploadInsteadBtn").hidden = true;
    $("#photoActionsIdle").hidden = true;
    $("#photoActionsRetake").hidden = false;
    $("#generateBtn").disabled = false;
    applyGlowPreview();
  }

  function retakePhoto(){
    state.photoDataUrl = null;
    preview().hidden = true;
    placeholder().hidden = false;
    $("#photoActionsRetake").hidden = true;
    $("#photoActionsIdle").hidden = false;
  }

  // The photo is used right away (no "Gebruik deze foto" step, no crop):
  // only scaled down to max. 1600 px. Cropping/rotating stays available
  // via the "Bewerken" button.
  function useTakenPhoto(dataUrl){
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      state.photoDataUrl = c.toDataURL("image/jpeg", 0.9);
      showPhotoPreview();
    };
    img.src = dataUrl;
  }

  function handleFileUpload(file){
    if (!file) return;
    stopCamera();
    const reader = new FileReader();
    reader.onload = e => useTakenPhoto(e.target.result);
    reader.readAsDataURL(file);
  }

  /* ---------------- photo editor: crop, zoom & rotate ---------------- */
  const editor = {
    img: null, rotation: 0, scale: 1, offsetX: 0, offsetY: 0,
    dragging: false, lastX: 0, lastY: 0, previousUrl: null
  };
  const editorCanvasEl = () => $("#editorCanvas");

  function openEditor(dataUrl, opts){
    opts = opts || {};
    editor.previousUrl = opts.previousUrl || null;
    editor.rotation = 0; editor.scale = 1; editor.offsetX = 0; editor.offsetY = 0;
    $("#editorZoom").value = 1;

    const img = new Image();
    img.onload = () => {
      editor.img = img;
      $("#photoStage").hidden = true;
      $("#filterRow").hidden = true;
      $("#photoActionsCamera").hidden = true;
      $("#uploadInsteadBtn").hidden = true;
      $("#photoActionsIdle").hidden = true;
      $("#photoActionsRetake").hidden = true;
      $("#photoEditor").hidden = false;
      drawEditor();
    };
    img.src = dataUrl;
  }

  function editorBaseScale(){
    const c = editorCanvasEl();
    const swapped = editor.rotation % 180 !== 0;
    const iw = swapped ? editor.img.height : editor.img.width;
    const ih = swapped ? editor.img.width : editor.img.height;
    return Math.max(c.width / iw, c.height / ih);
  }

  function clampEditorOffset(){
    const c = editorCanvasEl();
    const scale = editorBaseScale() * editor.scale;
    const swapped = editor.rotation % 180 !== 0;
    const dw = (swapped ? editor.img.height : editor.img.width) * scale;
    const dh = (swapped ? editor.img.width : editor.img.height) * scale;
    const maxX = Math.max(0, (dw - c.width) / 2);
    const maxY = Math.max(0, (dh - c.height) / 2);
    editor.offsetX = Math.min(maxX, Math.max(-maxX, editor.offsetX));
    editor.offsetY = Math.min(maxY, Math.max(-maxY, editor.offsetY));
  }

  // Cache the 2D context once instead of re-fetching it on every redraw
  // (getContext() is cheap but not free, and drawEditor can run dozens
  // of times per second while dragging).
  let editorCtx = null;
  function getEditorCtx(){
    if (!editorCtx) editorCtx = editorCanvasEl().getContext("2d", { alpha: false });
    return editorCtx;
  }

  // ctx.filter (the CSS-filter-on-canvas API used for the preview filters,
  // especially the "cartoon" SVG filter) forces a slow, software-rendered
  // path in several mobile browsers. Applying it on every pointermove while
  // dragging or zooming is the main source of jank on older/cheaper phones.
  // Fix: skip the filter entirely while actively dragging or zooming (show
  // the plain image, which stays fast), and only render the filtered
  // version once the gesture ends. Also coalesce rapid-fire events
  // (pointermove, the zoom slider's "input") into one draw per animation
  // frame instead of one draw per event.
  let editorDrawQueued = false;
  function drawEditor(skipFilter){
    if (!editor.img) return;
    clampEditorOffset();
    const c = editorCanvasEl();
    const ctx = getEditorCtx();
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#241A14";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.filter = skipFilter ? "none" : (isMangaFilter(state.filter)
      ? mangaLiveCss(state.filter)
      : (FILTERS[state.filter] || "none"));
    const scale = editorBaseScale() * editor.scale;
    ctx.save();
    ctx.translate(c.width/2 + editor.offsetX, c.height/2 + editor.offsetY);
    ctx.rotate(editor.rotation * Math.PI / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(editor.img, -editor.img.width/2, -editor.img.height/2);
    ctx.restore();
    ctx.filter = "none";
  }
  function requestEditorDraw(skipFilter){
    if (editorDrawQueued) return;
    editorDrawQueued = true;
    requestAnimationFrame(() => { editorDrawQueued = false; drawEditor(skipFilter); });
  }

  function editorRotate(){
    editor.rotation = (editor.rotation + 90) % 360;
    editor.offsetX = 0; editor.offsetY = 0;
    drawEditor();
  }

  function editorConfirm(){
    state.photoDataUrl = editorCanvasEl().toDataURL("image/jpeg", 0.92);
    showPhotoPreview();
  }

  function editorCancel(){
    $("#photoEditor").hidden = true;
    if (editor.previousUrl){
      state.photoDataUrl = editor.previousUrl;
      showPhotoPreview();
    } else {
      state.photoDataUrl = null;
      openCamera();
    }
  }

  function editExistingPhoto(){
    if (!state.photoDataUrl) return;
    openEditor(state.photoDataUrl, { previousUrl: state.photoDataUrl });
  }

  function setupEditorDrag(){
    const c = editorCanvasEl();
    const ratio = () => c.width / c.getBoundingClientRect().width;

    c.addEventListener("pointerdown", e => {
      editor.dragging = true;
      editor.lastX = e.clientX; editor.lastY = e.clientY;
      c.setPointerCapture(e.pointerId);
    });
    c.addEventListener("pointermove", e => {
      if (!editor.dragging) return;
      const r = ratio();
      editor.offsetX += (e.clientX - editor.lastX) * r;
      editor.offsetY += (e.clientY - editor.lastY) * r;
      editor.lastX = e.clientX; editor.lastY = e.clientY;
      requestEditorDraw(true); // skip the filter while dragging, for smoothness
    });
    const endDrag = () => {
      const wasDragging = editor.dragging;
      editor.dragging = false;
      if (wasDragging) requestEditorDraw(false); // one final draw, filter back on
    };
    c.addEventListener("pointerup", endDrag);
    c.addEventListener("pointercancel", endDrag);
    c.addEventListener("pointerleave", endDrag);

    let zoomEndTimer = null;
    $("#editorZoom").addEventListener("input", e => {
      editor.scale = parseFloat(e.target.value);
      requestEditorDraw(true); // skip the filter while the slider is moving
      clearTimeout(zoomEndTimer);
      zoomEndTimer = setTimeout(() => requestEditorDraw(false), 120);
    });
  }

  async function applyGlowPreview(){
    if (isMangaFilter(state.filter)){
      const liveCartoonCss = mangaLiveCss(state.filter);
      video().style.filter = "";
      if (state.cameraStream) startLiveFilter();
      if (!state.photoDataUrl){
        preview().style.filter = liveCartoonCss;
        return;
      }
      preview().style.filter = "";
      const cartoonUrl = await getCartoonDataUrl();
      if (isMangaFilter(state.filter) && cartoonUrl){
        preview().src = cartoonUrl;
      }
      return;
    }
    if (state.photoDataUrl && preview().src !== state.photoDataUrl){
      preview().src = state.photoDataUrl;
    }
    stopLiveFilter();
    const filterCss = FILTERS[state.filter] || "";
    preview().style.filter = filterCss;
    video().style.filter = filterCss;
  }

  function renderFilterOptions(){
    const wrap = $("#filterOptions");
    if (!wrap) return;
    wrap.innerHTML = "";
    FILTER_IDS.forEach(id => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (state.filter===id ? " is-selected" : "");
      chip.textContent = t(`filters.${id}`, state.lang);
      chip.addEventListener("click", () => { state.filter = id; renderFilterOptions(); applyGlowPreview(); });
      wrap.appendChild(chip);
    });
  }

  /* ---------------- matching engine ---------------- */
  const KID_CONTENT = {
    benefits: { nl:"Een veilige, kindvriendelijke verzorging van kleine handjes met een drankje erbij.",
                en:"Safe, kid-friendly care for little hands, paired with a drink." },
    funfact: { nl:"We gebruiken peel-off nagellak speciaal voor kinderen — na een paar dagen kunnen ze het laagje er zelf, in één stuk, afpellen.",
               en:"We use peel-off nail polish made for kids — after a few days they can peel the whole layer off themselves." },
    aftercare: { nl:"Geen aceton of remover nodig — laat het laklaagje eerst goed drogen, daarna is het gewoon zelf af te pellen.",
                 en:"No acetone or remover needed — just let the polish dry first, then it simply peels off by hand." }
  };
  // French text lives in lang-fr.js
  if (window.KID_CONTENT_FR){
    ["benefits","funfact","aftercare"].forEach(k => { KID_CONTENT[k].fr = window.KID_CONTENT_FR[k]; });
  }

  /* ---------------- scent of the essential oil (v163) ---------------- */
  function scentGroup(tid){
    if (typeof AVOID_GROUPS === "undefined") return null;
    for (const g of ["feet", "face", "massage"]) if ((AVOID_GROUPS[g] || []).includes(tid)) return g;
    return null;
  }
  /* v170: needs ("ergens last van?") → recommended oil. Auto-filled from the
     match, adjustable in the scent box (state.scentNeeds). */
  function scentNeedsAuto(){
    if (typeof SCENT_NEEDS === "undefined") return [];
    const out = new Set();
    const txt = " " + (state.complaintText || "").toLowerCase().replace(/[^a-zà-ÿ'’ -]+/g, " ").replace(/\s+/g, " ") + " ";
    SCENT_NEEDS.forEach(n => { if (n.words.some(w => txt.includes(" " + w + " ") || (w.length >= 6 && txt.includes(" " + w)))) out.add(n.id); });
    const wish = state.focus && state.focus.ans ? state.focus.ans.wish : null;
    if (state.mood === "relax" || wish === "relax") out.add("stress");
    if (wish === "legs") out.add("circulation");
    return SCENT_NEEDS.filter(n => out.has(n.id)).map(n => n.id);
  }
  function scentNeedList(){ return (typeof SCENT_NEEDS === "undefined" ? [] : SCENT_NEEDS).filter(n => (state.scentNeeds || []).includes(n.id)); }
  function scentRecFor(oid){ return scentNeedList().filter(n => n.oils.includes(oid)); }
  function scentChoices(m){
    if (!m || m.isKid || !m.treatment || typeof SCENT_OPTIONS === "undefined") return { list:[] };
    const g = scentGroup(m.treatment.id); if (!g) return { list:[] };
    const al = (state.allergies || []), hf = state.healthFlags || {};
    if (al.includes("fragrance")) return { list:[], noScent:true };
    let today; try { today = seasonTodayKey(); } catch(e){ today = todayKey(); }
    const month = Number(today.slice(5, 7)), tid = m.treatment.id;
    const needs = scentNeedList();
    const rank = id => { let r = 99; needs.forEach(n => { const i = n.oils.indexOf(id); if (i >= 0 && i < r) r = i; }); return r; };
    const safe = o => o.groups.includes(g) && !(o.notPregnant && hf.pregnant && !(o.pregLateOk && hf.pregStage === "7-9")) && !(o.notEpilepsy && hf.epilepsy) && !(o.allergy && al.includes(o.allergy));
    const pool = SCENT_OPTIONS.filter(o => safe(o) && (o.months.includes(month) || rank(o.id) < 99));
    const rec = pool.filter(o => rank(o.id) < 99).sort((a, b) => rank(a.id) - rank(b.id)).slice(0, 3);
    const def = pool.find(o => o.isDefault);
    const head = rec.slice(); if (def && !head.includes(def)) head.push(def);
    const rest = pool.filter(o => !head.includes(o) && (rank(o.id) === 99)).map((o, i) => ({ o, sc: ((o.boost || {})[tid] || 0) * 3 + (o.months.length < 12 ? 7 : 0) - i * 0.01 }))
      .sort((a, b) => b.sc - a.sc).slice(0, Math.max(0, 4 - head.length)).map(x => x.o);
    return { list: head.concat(rest), group: g };
  }
  function scentPicked(m){
    const c = scentChoices(m); if (!c.list.length) return null;
    if (state.scent === "none") return "none";
    return c.list.find(o => o.id === state.scent) || c.list[0];
  }
  function scentLabel(m, L){
    const p = scentPicked(m); if (!p) return "";
    if (p === "none") return t("scent_none", L);
    const r = scentRecFor(p.id);
    return (p.label[L] || p.label.nl) + (r.length ? " (" + r.map(n => (n.label[L] || n.label.nl).split(" (")[0].toLowerCase()).join(", ") + ")" : "");
  }
  function scentHtml(m){
    const L = state.lang, c = scentChoices(m);
    if (c.noScent) return `<div class="scent-box"><p class="scent-box__title">🌿 ${t("scent_title", L)}</p><p class="scent-box__hint">${t("scent_fragrance", L)}</p></div>`;
    if (!c.list.length) return "";
    const cur = scentPicked(m), curId = cur === "none" ? "none" : cur.id;
    const chip = (id, icon, label, text) => `<button type="button" class="scent-chip${curId === id ? " is-selected" : ""}" data-action="pick-scent" data-scent="${esc(id)}" aria-pressed="${curId === id}"><span class="scent-chip__name">${icon} ${esc(label)}</span>${text ? `<span class="scent-chip__text">${esc(text)}</span>` : ""}</button>`;
    const sel = state.scentNeeds || [];
    const needChips = (typeof SCENT_NEEDS === "undefined" ? [] : SCENT_NEEDS).map(n => `<button type="button" class="scent-need${sel.includes(n.id) ? " is-selected" : ""}" data-action="pick-scent-need" data-need="${esc(n.id)}" aria-pressed="${sel.includes(n.id)}">${n.icon} ${esc(n.label[L] || n.label.nl)}</button>`).join("");
    const needs = scentNeedList(), noFit = needs.filter(n => !c.list.some(o => n.oils.includes(o.id)));
    const txt = o => { const r = scentRecFor(o.id); return [r.length ? "⭐ " + t("scent_rec", L) + " " + r.map(n => (n.label[L] || n.label.nl).split(" (")[0].toLowerCase()).join(", ") : "", o.isDefault ? t("scent_usual", L) : "", o.text[L] || o.text.nl].filter(Boolean).join(" · "); };
    return `<div class="scent-box"><p class="scent-box__title">🌿 ${t("scent_title", L)}</p><p class="scent-box__hint">${t("scent_hint", L)}</p>
      <details class="scent-needs"${sel.length ? " open" : ""}><summary>${t("scent_need_q", L)}</summary><div class="scent-needs__chips">${needChips}</div><p class="scent-box__hint">${t("scent_need_note", L)}</p>${noFit.length ? `<p class="scent-box__hint">${esc(t("scent_need_nofit", L).replace("{n}", noFit.map(n => (n.label[L] || n.label.nl).split(" (")[0].toLowerCase()).join(", ")))}</p>` : ""}</details>
      <div class="scent-chips">${c.list.map(o => chip(o.id, o.icon, o.label[L] || o.label.nl, txt(o))).join("")}${chip("none", "○", t("scent_none", L), "")}</div></div>`;
  }
  function pickScent(id){
    state.scent = id;
    const b = $("#scentBlock"); if (b) b.innerHTML = scentHtml(state.match);
    updateBookingLink(state.match, drinkFullFor(state.match));
    try { renderCopyName(); } catch(e){}
  }
  function pickScentNeed(id){
    const a = new Set(state.scentNeeds || []);
    a.has(id) ? a.delete(id) : a.add(id);
    state.scentNeeds = (typeof SCENT_NEEDS === "undefined" ? [] : SCENT_NEEDS).filter(n => a.has(n.id)).map(n => n.id);
    state.scent = null;
    pickScent(null);
  }

  function generateMatch(){
    state.scent = null; state.scentNeeds = scentNeedsAuto();
    if (state.profile === "kind"){
      const drinkDef = KIDS_DRINKS.find(d => d.id === state.kidsDrink) || KIDS_DRINKS[0];
      const homecarePick = pickHomecareProduct("hand", null, "kind");
      const soapPick = pickSecondarySoap(homecarePick ? homecarePick.categoryId : null);
      state.match = {
        isKid: true,
        treatment: { name: KIDS_TREATMENT, benefits:KID_CONTENT.benefits, funfact:KID_CONTENT.funfact, aftercare:KID_CONTENT.aftercare },
        drinkId: drinkDef.id, drink: null,
        milkId: "none", extrasIds: [],
        homecarePick, soapPick
      };
      return;
    }

    const mFlags = {
      ...state.healthFlags,
      avoid: state.avoid || [],
      age30Plus: state.ageBracket === "30-44" || state.ageBracket === "45plus",
      age45Plus: state.ageBracket === "45plus",
      allergyExclude: allergyPicked().flatMap(a => a.exclude || []).concat(healthExtraExclude())
    };
    const focusEval = state.focus ? focusEvaluate() : null;
    let treatmentObj = null;
    if (focusEval){
      // the client's own wishes, then any treatment of that kind that is safe for her
      treatmentObj = matchTreatment(null, state.profile, !!state.sunExposed, { ...mFlags, avoid: [] }, "", focusEval.scores);
      if (!treatmentObj){
        const any = {}; focusGroupIds(focusEval.group).forEach(id => { any[id] = 1; });
        treatmentObj = matchTreatment(null, state.profile, !!state.sunExposed, { ...mFlags, avoid: [] }, "", any);
        if (treatmentObj) focusEval.fallback = true; else focusEval.none = true;
      }
    }
    if (!treatmentObj) treatmentObj = matchTreatment(state.mood || "relax", state.profile, !!state.sunExposed, mFlags, state.complaintText);
    let drink;
    const wantsMilk = state.milk !== "none";
    const isIced = state.temperature === "iced";

    if (state.category === "coffee"){
      if (isIced){
        const list = BEVERAGES.coffeeIced[state.caffeine];
        const bev = pickRandom(list);
        drink = { name: bev.name, origin:null, notes: bev.notes||null };
      } else {
        // "Geen melk" must only ever surface black/slow-brew coffees; a milk
        // choice must only ever surface milk-based coffees — no more mismatches.
        const fullList = BEVERAGES.coffee[state.caffeine];
        let list = fullList.filter(b => wantsMilk ? b.style === "milk" : b.style !== "milk");
        if (!list.length) list = fullList; // safety net if a filter ever empties the pool
        const bev = pickRandom(list);
        const pool = COFFEE_ORIGINS.filter(o => o.decaf === (state.caffeine==="decaf"));
        const origin = pool.length ? pickRandom(pool) : pickRandom(COFFEE_ORIGINS);
        drink = { name: bev.name, origin: origin.name, notes: origin.notes };
      }
    } else if (state.category === "matcha"){
      // Matcha is always a latte (with milk); hot (optionally with white
      // chocolate) or iced on request.
      const hotMatcha = Math.random() < 0.3 ? "Matcha Latte met witte choco" : "Matcha Latte";
      drink = { name: isIced ? "Iced Matcha Latte" : hotMatcha, origin:null, notes:null };
    } else { // tea — always served hot; no iced plain-tea option on the menu
      const pool = state.caffeine === "decaf" ? [...TEAS_DECAF, ...HOT_EXTRAS_DECAF] : TEAS_CAFF;
      drink = { name: pickRandom(pool), origin:null, notes:null };
    }

    const homecarePick = pickHomecareProduct(treatmentObj.homecare.category, treatmentObj.homecare.soapHint, state.profile);
    const soapPick = pickSecondarySoap(homecarePick ? homecarePick.categoryId : null);

    // build a copy of the treatment so we can safely append a lens warning
    // without mutating the shared catalog entry
    let treatment = treatmentObj;
    if (treatmentObj.lensWarning && state.healthFlags.contactLenses){
      treatment = {
        ...treatment,
        aftercare: {
          nl: treatment.aftercare.nl + " " + t("lens_warning_note", "nl"),
          en: treatment.aftercare.en + " " + t("lens_warning_note", "en"),
          fr: (treatment.aftercare.fr || treatment.aftercare.en) + " " + t("lens_warning_note", "fr")
        }
      };
    }

    state.match = {
      isKid:false, treatment, drink,
      milkId: state.milk, extrasIds: [...state.extras],
      homecarePick, soapPick,
      // the answers behind this match, for "Waarom deze match?"
      why: { mood: focusEval ? null : state.mood, focus: focusEval ? { fallback: !!focusEval.fallback, none: !!focusEval.none } : null, sun: !!state.sunExposed, complaint: complaintMatched(state.complaintText, treatment.id),
             category: state.category, caffeine: state.caffeine, temperature: state.temperature }
    };
  }

  /* ---------------- drink "jumps out of the screen" ----------------
     Free and 100% client-side: a CSS 3D animation of the real drink photo
     (from the website). With a cut-out the drink leaps over the edge of
     its frame towards the viewer (like the LinkedIn tiger); without one
     the photo zooms forward inside the frame. Tap to replay. */
  function drinkPhotoFor(m){
    const extras = m.extrasIds || [];
    for (const id of extras){
      const byName = DRINK_PHOTOS_BY_EXTRA[id];
      if (byName && byName[m.drink.name]) return pickRandom(byName[m.drink.name]);
    }
    const list = DRINK_PHOTOS[m.drink.name];
    return list ? pickRandom(list) : null;
  }
  function drinkPopHtml(m, alt){
    const photo = m.quick ? m.drinkPhoto : drinkPhotoFor(m);
    if (!photo) return "";
    const cut = DRINK_CUTOUTS[photo];
    const hot = state.temperature !== "iced";
    const alts = (m.quick ? [] : (DRINK_PHOTOS[m.drink.name] || [])).filter(p => p !== photo);
    return `
      <div class="drink-pop${cut ? "" : " drink-pop--flat"} is-playing" data-action="replay-drink-pop" role="img" aria-label="${alt}">
        <div class="drink-pop__floor" aria-hidden="true"></div>
        <div class="drink-pop__screen"><img class="drink-pop__bg" src="${photo}" alt="" data-alts="${esc(JSON.stringify(alts))}" data-fallback="drink"></div>
        ${cut ? `<img class="drink-pop__cut" src="${cut}" alt="" data-fallback="cut">` : ""}
        ${hot ? `<span class="drink-pop__steam" aria-hidden="true"><i></i><i></i><i></i></span>` : ""}
        <span class="drink-pop__hint">↻ ${t("drink_pop_replay", state.lang)}</span>
      </div>`;
  }
  // A photo that can't load (e.g. not uploaded yet) never shows as a black
  // box: try another photo of the same drink, otherwise hide the animation.
  window.bcDrinkFallback = function(img){
    const pop = img.closest(".drink-pop");
    let alts = []; try { alts = JSON.parse(img.dataset.alts || "[]"); } catch(e){}
    const cut = pop && pop.querySelector(".drink-pop__cut");
    if (cut) cut.remove();
    if (pop) pop.classList.add("drink-pop--flat");
    if (alts.length){ img.dataset.alts = JSON.stringify(alts.slice(1)); img.src = alts[0]; }
    else if (pop) pop.hidden = true;
  };
  window.bcCutFallback = function(cut){
    const pop = cut.closest(".drink-pop");
    cut.remove();
    if (pop) pop.classList.add("drink-pop--flat");
  };
  // no inline onerror="" (blocked by the security policy): one listener for all
  document.addEventListener("error", e => {
    const el = e.target;
    if (!el || !el.dataset) return;
    if (el.dataset.fallback === "drink") window.bcDrinkFallback(el);
    else if (el.dataset.fallback === "cut") window.bcCutFallback(el);
    // advent: a product photo that is missing (not uploaded yet) shows its icon, never an empty box
    else if (el.dataset.fallback === "adv"){
      const span = document.createElement("span");
      span.className = (el.className || "") + " adv-photo-missing";
      span.textContent = el.dataset.emoji || "🎁";
      el.replaceWith(span);
    }
  }, true);
  function replayDrinkPop(el){
    el.classList.remove("is-playing");
    void el.offsetWidth; // restart the CSS animation
    el.classList.add("is-playing");
  }

  // true only if the free-text complaint really steered this treatment choice
  function complaintMatched(text, tid){
    const words = (text || "").toLowerCase().split(/[^a-zà-ÿ'’-]+/).filter(Boolean);
    if (!words.length || typeof COMPLAINT_KEYWORDS === "undefined") return false;
    return COMPLAINT_KEYWORDS.some(k => k.ids.includes(tid) && k.words.some(w => words.includes(w)));
  }
  /* "Waarom deze match?" — a short, honest explanation built from the
     client's own answers (mood, sun, complaint, drink choices). */
  function whyHtml(m, drinkFull, drinkNotes){
    if (!m || m.isKid || !m.why) return "";
    const L = state.lang, w = m.why, tn = trName(m.treatment.name, L);
    const parts = [];
    if (w.mood) parts.push(t("why_mood_" + w.mood, L).replace("{treatment}", tn));
    const fe = w.focus && state.focus ? focusEvaluate() : null;   // re-evaluated so a language switch translates it
    if (fe && w.focus.fallback) fe.notes.push(t("focus_fallback", L));
    if (fe && w.focus.none) fe.notes.push(t("focus_none", L));
    if (fe) parts.push(t("why_focus", L).replace("{cat}", fx(FOCUS_GUIDES[fe.cat] && FOCUS_GUIDES[fe.cat].label).toLowerCase()).replace("{answers}", fe.labels.map(x => x.charAt(0).toLowerCase() + x.slice(1)).join(", ")).replace("{treatment}", tn));
    if (w.complaint) parts.push(t("why_complaint", L));
    if (w.sun) parts.push(t("why_sun", L));
    let dk;
    if (w.category === "matcha") dk = "why_drink_matcha";
    else if (w.temperature === "iced") dk = "why_drink_iced";
    else if (w.category === "tea") dk = w.caffeine === "decaf" ? "why_drink_tea_decaf" : "why_drink_tea";
    else dk = w.caffeine === "decaf" ? "why_drink_decaf" : (drinkNotes ? "why_drink_coffee_notes" : "why_drink_coffee");
    parts.push(t(dk, L).replace("{drink}", drinkFull).replace("{notes}", (drinkNotes || "").toLowerCase()));
    const fa = fe && (fe.notes.length || fe.tips.length) ? `<div class="match-focus">
        <p class="match-why__title">🎯 ${t("focus_advice_title", L)}</p>
        ${fe.notes.map(n => `<p class="match-focus__note">${n}</p>`).join("")}
        ${fe.tips.length ? `<ul class="match-focus__tips">${fe.tips.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}
      </div>` : "";
    return `<div class="match-why">
        <p class="match-why__title">💡 ${t("why_title", L)}</p>
        <p class="match-why__text">${parts.join(" ")}</p>
      </div>${fa}${allergyClientHtml(m, L)}${(() => { try { return ingrSandra() ? healthSandraHtml(L) + protoLinksHtml(m.treatment.id, L) : ""; } catch(e){ return ""; } })()}`;
  }

  function renderResultDetails(){
    const wrap = $("#resultDetails");
    const m = state.match;
    if (!wrap) return;
    if (!m) { wrap.innerHTML = ""; return; }

    let drinkFull, drinkNotes;
    if (m.isKid){
      const drinkDef = KIDS_DRINKS.find(d => d.id === m.drinkId) || KIDS_DRINKS[0];
      drinkFull = drinkDef.name[state.lang];
      drinkNotes = null;
    } else {
      drinkFull = m.drink.origin ? [m.drink.origin, trName(m.drink.name, state.lang)].join(" — ") : trName(m.drink.name, state.lang);
      drinkNotes = trName(m.drink.notes, state.lang);
    }

    const milkLabel = m.milkId && m.milkId !== "none" ? t(`milk.${m.milkId}`, state.lang) : null;
    const extrasLabel = (m.extrasIds || []).map(id => t(`extras.${id}`, state.lang));
    const customLine = [milkLabel, ...extrasLabel].filter(Boolean).join(" · ");

    const drinkPhotoHtml = !m.isKid && m.drink ? drinkPopHtml(m, drinkFull) : "";

    wrap.innerHTML = `
      <div class="result-row">
        <span class="result-row__icon">☕</span>
        <div>
          <div class="result-row__label">${t("drink_label", state.lang)}</div>
          <div class="result-row__value">${drinkFull}</div>
          ${drinkNotes ? `<div class="result-row__notes">${drinkNotes}</div>` : ""}
          ${customLine ? `<div class="result-row__notes">${t("with_label", state.lang)}${state.lang === "fr" ? "\u00a0:" : ":"} ${customLine}</div>` : ""}
          ${drinkPhotoHtml}
        </div>
      </div>
      <div class="result-row">
        <span class="result-row__icon">✨</span>
        <div>
          <div class="result-row__label">${t("treatment_label", state.lang)}</div>
          <div class="result-row__value">${trName(m.treatment.name, state.lang)}</div>
        </div>
      </div>
      <div id="scentBlock">${scentHtml(m)}</div>
      ${whyHtml(m, drinkFull, drinkNotes)}`;

    const titleEl = $("#resultTitle");
    if (titleEl) titleEl.textContent = t(state.context === "thuis" ? "result_saved_title" : "result_title", state.lang);

    updateBookingLink(m, drinkFull);
  }

  const BOOKING_EMAIL = "beautyandcoffeemechelen@gmail.com";
  const BOOKING_WHATSAPP = "32499221901"; // wa.me format: country code + number, no + or spaces
  function drinkFullFor(m){
    if (!m) return "";
    if (m.isKid){
      const d = KIDS_DRINKS.find(x => x.id === m.drinkId) || KIDS_DRINKS[0];
      return d.name[state.lang];
    }
    return m.drink.origin ? [m.drink.origin, trName(m.drink.name, state.lang)].join(" — ") : trName(m.drink.name, state.lang);
  }

  function slotsText(){
    if (typeof BOOKING_SLOTS === "undefined") return "";
    return state.slots
      .map(id => BOOKING_SLOTS.find(s => s.id === id))
      .filter(Boolean)
      .map(s => s[state.lang] || s.nl)
      .join(", ");
  }

  function pregLine(L){
    const hf = state.healthFlags || {}; if (!hf.pregnant || state.profile !== "vrouw") return "";
    return t("book_preg_line", L).replace("{s}", hf.pregStage ? t("preg_" + hf.pregStage.replace("-", "_"), L) : t("preg_unknown", L));
  }
  function updateBookingLink(m, drinkFull){
    if (!m) return;
    const slots = slotsText();
    const emailLink = $("#bookEmailCta");
    if (emailLink){
      const subject = t("book_email_subject", state.lang);
      const body = t("book_email_body", state.lang)
        .replace("{treatment}", trName(m.treatment.name, state.lang))
        .replace("{drink}", drinkFull || "")
        .replace("{slots}", slots) + (scentLabel(m, state.lang) ? "\n" + t("book_scent_line", state.lang).replace("{s}", scentLabel(m, state.lang)) : "") + (allergyPicked().length ? "\n" + t("book_allergy_line", state.lang).replace("{a}", allergyLabels(state.lang).join(", ")) : "") + (pregLine(state.lang) ? "\n" + pregLine(state.lang) : "");
      emailLink.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    const onl = $("#bookOnlineCta");
    if (onl){ const u = (typeof ONLINE_BOOKING_URL !== "undefined" && ONLINE_BOOKING_URL) || ""; onl.hidden = !u; if (u) onl.href = u; }
    const waLink = $("#bookWhatsappCta");
    if (waLink){
      const waText = t("book_whatsapp_text", state.lang)
        .replace("{treatment}", trName(m.treatment.name, state.lang))
        .replace("{drink}", drinkFull || "")
        .replace("{slots}", slots)
        .trim() + (scentLabel(m, state.lang) ? " " + t("book_scent_line", state.lang).replace("{s}", scentLabel(m, state.lang)) : "") + (allergyPicked().length ? " " + t("book_allergy_line", state.lang).replace("{a}", allergyLabels(state.lang).join(", ")) : "") + (pregLine(state.lang) ? " " + pregLine(state.lang) : "");
      waLink.href = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(waText)}`;
    }
    renderCopyName();
  }

  /* ---------------- slot picker (weekend preference) ---------------- */
  function renderSlotPicker(){
    const wrap = $("#slotPicker");
    if (!wrap) return;
    if (typeof BOOKING_SLOTS === "undefined" || !BOOKING_SLOTS.length){ wrap.innerHTML = ""; return; }
    wrap.innerHTML = `
      <p class="slot-picker__title">${t("slots_title", state.lang)}</p>
      <div class="slot-picker__chips">
        ${BOOKING_SLOTS.map(s => {
          const on = state.slots.includes(s.id);
          return `<button type="button" class="slot-chip${on ? " is-selected" : ""}" data-action="toggle-slot" data-slot="${s.id}" aria-pressed="${on}">${s[state.lang] || s.nl}</button>`;
        }).join("")}
      </div>
      <p class="slot-picker__hint">${t("slots_hint", state.lang)}</p>
      ${closedNoticeHtml()}`;
  }

  /* closed days (data.js → CLOSED_DAYS): 25/12, 31/12, 1/1, 1st day of Chinese New Year */
  function closedDaysAhead(fromKey, days){
    if (typeof CLOSED_DAYS !== "object" || !CLOSED_DAYS) return [];
    const y = Number(fromKey.slice(0, 4)), out = [];
    const k = dt => `${dt.getUTCFullYear()}-${String(dt.getUTCMonth()+1).padStart(2,"0")}-${String(dt.getUTCDate()).padStart(2,"0")}`;
    const add = (key, kind) => { const diff = seasonDays(fromKey, key); if (diff >= 0 && diff <= days && !out.some(o => o.key === key)) out.push({ key, kind }); };
    [y, y + 1].forEach(yy => (CLOSED_DAYS.days || []).forEach(md => {
      if (md === "cny"){ const c = typeof LUNAR_DATES === "object" && LUNAR_DATES.cny[yy]; if (c) add(`${yy}-${c}`, "cny"); return; }
      if (/^\d{2}-\d{2}$/.test(md)) add(`${yy}-${md}`, md);
    }));
    return out.sort((a, b) => a.key < b.key ? -1 : 1);
  }
  function closedNoticeHtml(){
    let today; try { today = seasonTodayKey(); } catch(e){ today = todayKey(); }
    const list = closedDaysAhead(today, (CLOSED_DAYS && CLOSED_DAYS.noticeDays) || 28);
    if (!list.length) return "";
    const L = state.lang;
    const names = { "12-25":"closed_xmas", "12-31":"closed_nye", "01-01":"closed_ny", "08-15":"closed_aug15", cny:"closed_cny" };
    // days next to each other → one period
    const groups = [];
    list.forEach(c => { const g = groups[groups.length - 1]; if (g && seasonDays(g.to, c.key) === 1){ g.to = c.key; g.kinds.push(c.kind); } else groups.push({ from:c.key, to:c.key, kinds:[c.kind] }); });
    const dates = groups.map(g => {
      const lbl = [...new Set(g.kinds.map(x => names[x]).filter(Boolean))].map(x => t(x, L)).join(", ");
      const when = g.from === g.to ? actionFmt(g.from, L, true) : `${actionFmt(g.from, L, false)} ${t("closed_until", L)} ${actionFmt(g.to, L, true)}`;
      return `<b>${when}</b>${lbl ? ` (${lbl})` : ""}`;
    }).join(", ");
    return `<p class="closed-note">🚫 ${t("closed_note", L).replace("{dates}", dates)}</p>`;
  }

  function toggleSlot(id){
    const i = state.slots.indexOf(id);
    if (i >= 0) state.slots.splice(i, 1); else state.slots.push(id);
    renderSlotPicker();
    if (state.match) updateBookingLink(state.match, drinkFullFor(state.match));
  }

  /* ---------------- favorites + "another match" ---------------- */
  function favKey(m){
    const tid = m.isKid ? "kindermanicure" : m.treatment.id;
    return tid + "|" + drinkFullFor(m);
  }
  function isFavorite(m){
    return (localData.favorites || []).some(f => f.key === favKey(m));
  }
  function favBookHref(f){
    const text = t("fav_book_text", state.lang).replace("{treatment}", trName(f.tname, state.lang)).replace("{drink}", f.drink).trim();
    return `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  function renderMatchTools(){
    const wrap = $("#matchTools");
    if (!wrap) return;
    const m = state.match;
    if (!m){ wrap.innerHTML = ""; return; }
    const fav = isFavorite(m);
    wrap.innerHTML = `
      ${m.isKid ? "" : `<button type="button" class="btn btn--outline" data-action="another-match">${t("another_match_button", state.lang)}</button>`}
      <button type="button" class="btn ${fav ? "btn--primary" : "btn--outline"}" data-action="toggle-fav" aria-pressed="${fav}">${t(fav ? "fav_saved" : "fav_add", state.lang)}</button>`;
  }

  function toggleFavorite(){
    const m = state.match;
    if (!m) return;
    const key = favKey(m);
    const list = localData.favorites || (localData.favorites = []);
    const i = list.findIndex(f => f.key === key);
    if (i >= 0){
      list.splice(i, 1);
      showToast(t("fav_removed_toast", state.lang));
    } else {
      list.unshift({ key, tname: m.treatment.name, drink: drinkFullFor(m) });
      localData.favorites = list.slice(0, 8);
      showToast(t("fav_added_toast", state.lang));
    }
    saveLocalData();
    renderMatchTools();
    renderReturningUserBlock();
  }

  function removeFavorite(index){
    if (!localData.favorites) return;
    localData.favorites.splice(index, 1);
    saveLocalData();
    renderReturningUserBlock();
    renderMatchTools();
  }

  let rerolling = false;
  async function rerollMatch(){
    const prev = state.match;
    if (!prev || prev.isKid || rerolling) return;
    rerolling = true;
    try {
      let tries = 0;
      do { generateMatch(); tries++; }
      while (state.match.treatment.id === prev.treatment.id && tries < 10);
      state.skinFact = chooseSkinFact();
      await drawResultCanvas();
      renderResultDetails();
      renderResultBlocks();
      renderMatchTools();
      const isNew = recordDiscovery();
      renderLoyaltyBlock();
      trackEvent("match-rerolled");
      if (isNew) trackEvent("new-discovery");
      const card = $("#resultCardWrap");
      if (card) card.scrollIntoView({ behavior:"smooth", block:"start" });
    } finally { rerolling = false; }
  }

  /* ---------------- skin facts ("Weetje: huid, haar en voeten") ---------------- */
  const ALL_FACTS = SKIN_FACTS
    .concat(typeof CONDITION_FACTS !== "undefined" ? CONDITION_FACTS : [])
    .concat(typeof PRACTICE_FACTS !== "undefined" ? PRACTICE_FACTS : [])
    .concat(typeof CELL_FACTS !== "undefined" ? CELL_FACTS : [])
    .concat(typeof NAIL_FACTS !== "undefined" ? NAIL_FACTS : [])
    .concat(typeof LASH_FACTS !== "undefined" ? LASH_FACTS : [])
    .concat(typeof FACIAL_FACTS !== "undefined" ? FACIAL_FACTS : [])
    .concat(typeof SKINKNOW_FACTS !== "undefined" ? SKINKNOW_FACTS : [])
    .concat(typeof EXTRA_FACTS !== "undefined" ? EXTRA_FACTS : []);
  function factPoolFor(m){
    if (m.isKid) return SKIN_FACTS.filter(f => SKIN_FACT_POOLS.kids.includes(f.theme));
    const skinThemes = SKIN_FACT_POOLS.byTreatment[m.treatment.id] || null;
    const condThemes = (typeof CONDITION_FACT_POOLS !== "undefined") ? (CONDITION_FACT_POOLS.byTreatment[m.treatment.id] || null) : null;
    const pracThemes = (typeof PRACTICE_FACT_POOLS !== "undefined") ? (PRACTICE_FACT_POOLS.byTreatment[m.treatment.id] || null) : null;
    const moreThemes = (typeof MORE_FACT_POOLS !== "undefined") ? (MORE_FACT_POOLS.byTreatment[m.treatment.id] || null) : null;
    if (!skinThemes && !condThemes && !pracThemes && !moreThemes) return SKIN_FACTS.slice();
    const pool = [];
    if (skinThemes) pool.push(...SKIN_FACTS.filter(f => skinThemes.includes(f.theme)));
    if (condThemes) pool.push(...CONDITION_FACTS.filter(f => condThemes.includes(f.theme)));
    if (pracThemes) pool.push(...PRACTICE_FACTS.filter(f => pracThemes.includes(f.theme)));
    if (moreThemes) {
      if (moreThemes.includes("NA")) pool.push(...NAIL_FACTS.filter(f => moreThemes.includes(f.theme)));
      if (moreThemes.includes("LL")) pool.push(...LASH_FACTS.filter(f => moreThemes.includes(f.theme)));
      if (moreThemes.includes("GV") || moreThemes.includes("SK")) {
        pool.push(...FACIAL_FACTS.filter(f => moreThemes.includes(f.theme)));
        pool.push(...SKINKNOW_FACTS.filter(f => moreThemes.includes(f.theme)));
      }
      if (typeof EXTRA_FACTS !== "undefined") pool.push(...EXTRA_FACTS.filter(f => moreThemes.includes(f.theme)));
    }
    if (typeof CELL_FACTS !== "undefined" && pool.length) pool.push(...CELL_FACTS);
    return pool.length ? pool : ALL_FACTS.slice();
  }
  function randomFrom(pool, avoidCode){
    let f, n = 0;
    do { f = pool[Math.floor(Math.random() * pool.length)]; n++; }
    while (f.code === avoidCode && pool.length > 1 && n < 20);
    return f.code;
  }
  function chooseSkinFact(){
    if (!state.match) return null;
    return randomFrom(factPoolFor(state.match), state.skinFact);
  }
  function randomFactCode(themes){
    const pool = SKIN_FACTS.filter(f => themes.includes(f.theme));
    if (typeof CONDITION_FACT_POOLS !== "undefined" && CONDITION_FACT_POOLS.sun) {
      pool.push(...CONDITION_FACTS.filter(f => CONDITION_FACT_POOLS.sun.includes(f.theme)));
    }
    return randomFrom(pool, state.sunFact);
  }
  function renderSkinFact(){
    const wrap = $("#skinFactCard");
    if (!wrap) return;
    const fact = ALL_FACTS.find(f => f.code === state.skinFact);
    if (!state.match || !fact){ wrap.innerHTML = ""; return; }
    const lang = state.lang;
    const canMore = factPoolFor(state.match).length > 1;
    wrap.innerHTML = `
      <p class="skinfact__title">${t("skinfact_title", lang)}</p>
      ${fact.kop ? `<p class="skinfact__kop">${lang === "nl" ? fact.kop : (lang === "en" ? (fact.kopEn || fact.kop) : (fact.kopFr || fact.kopEn || fact.kop))}</p>` : ""}
      <p class="skinfact__text">${fact[lang] || fact.nl}</p>
      ${canMore ? `<button type="button" class="skinfact__more" data-action="another-fact">${t("skinfact_more", lang)}</button>` : ""}
      <p class="skinfact__disclaimer">${t("skinfact_disclaimer", lang)}</p>`;
  }
  function anotherFact(){
    state.skinFact = chooseSkinFact();
    renderSkinFact();
  }
  function renderSunFact(){
    const el = $("#sunFact");
    if (!el) return;
    const fact = ALL_FACTS.find(f => f.code === state.sunFact);
    el.innerHTML = fact ? `💡 ${fact[state.lang] || fact.nl}` : "";
  }

  /* ---------------- house rules (screen "Huisregels") ---------------- */
  function renderHouseRulesTeaser(){
    const wrap = $("#houseRulesTeaser");
    if (!wrap) return;
    const lang = state.lang;
    wrap.innerHTML = `
      <p class="rules-teaser__title">${t("houserules_teaser_title", lang)}</p>
      <ul class="rules-teaser__list">
        <li>${t("houserules_teaser_1", lang)}</li>
        <li>${t("houserules_teaser_2", lang)}</li>
        <li>${t("houserules_teaser_3", lang)}</li>
      </ul>
      <button type="button" class="rules-teaser__more" data-action="open-houserules">${t("houserules_teaser_more", lang)}</button>`;
  }

  /* Parking + map, shown in three places: the "Zo vind je me" screen, the
     parking section of the house rules (map right under the explanation)
     and "Praktisch om te weten" on the result screen. */
  const ROUTE_URL = "https://www.google.com/maps/dir/?api=1&destination=Beauty%20%26%20Coffee%2C%20Barbarastraat";
  function routeMapHtml(lang){
    return `<a class="route-map" href="${ROUTE_URL}" target="_blank" rel="noopener noreferrer">
        <img src="assets/route-map.svg" alt="" width="789" height="658" loading="lazy">
        <span class="route-map__caption">${t("route_map_caption", lang)}</span>
      </a>`;
  }
  function renderFindMe(){
    const body = $("#findMeBody");
    if (!body || typeof HOUSE_RULES === "undefined") return;
    const lang = state.lang;
    const sec = HOUSE_RULES.find(s => s.id === "parking");
    const items = sec ? sec.groups[0].items.slice(0, -1) : [];   // last item points to the map itself
    body.innerHTML = `
      ${routeMapHtml(lang)}
      <a class="btn btn--primary btn--wide findme-route" href="${ROUTE_URL}" target="_blank" rel="noopener noreferrer">${t("practical_info_route", lang)}</a>
      <ul class="rules-list findme-list">${items.map(it => `<li>${it[lang]}</li>`).join("")}</ul>
      <div class="findme-contact">
        <p class="price-contact__title">${t("contact_title", lang)}</p>
        <p class="price-contact__hint">${t("contact_hint", lang)}</p>
        <div class="findme-contact__buttons">
          <a class="btn btn--primary" href="tel:+${BOOKING_WHATSAPP}" data-contact="call">${t("contact_call", lang)}</a>
          <a class="btn btn--outline" href="https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(t("contact_wa_text", lang))}" target="_blank" rel="noopener noreferrer" data-contact="whatsapp">${t("contact_whatsapp", lang)}</a>
          <a class="btn btn--outline" href="mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t("contact_mail_subject", lang))}" data-contact="mail">${t("contact_mail", lang)}</a>
        </div>
      </div>
      <div class="findme-voice" id="voice">
        <p class="price-contact__title">${t("voice_title", lang)}</p>
        <p class="price-contact__hint">${t("voice_text", lang)}</p>
        <ul class="findme-voice__list">
          <li>${t("voice_ex1", lang)}</li>
          <li>${t("voice_ex2", lang)}</li>
          <li>${t("voice_ex3", lang)}</li>
        </ul>
        <div class="findme-contact__buttons">
          <a class="btn btn--outline" href="assets/beauty-and-coffee.vcf" download="Beauty-and-Coffee.vcf" type="text/vcard" data-contact="vcard">${t("voice_save", lang)}</a>
          <a class="btn btn--text" href="ai.html">${t("voice_ai_link", lang)}</a>
        </div>
      </div>`;
    body.querySelectorAll("[data-contact]").forEach(a => a.addEventListener("click", () => trackEvent("contact-" + a.dataset.contact)));
  }

  function renderHouseRules(){
    const body = $("#houseRulesBody");
    if (!body || typeof HOUSE_RULES === "undefined") return;
    const lang = state.lang;
    const openIds = new Set($$("#houseRulesBody details[open]").map(d => d.dataset.sec));
    const first = openIds.size === 0 && !body.dataset.rendered;
    body.dataset.rendered = "1";
    body.innerHTML = HOUSE_RULES.map((sec, idx) => {
      const open = (openIds.has(sec.id) || (first && idx === 0)) ? " open" : "";
      return `<details class="price-section" data-sec="${sec.id}"${open}>
        <summary><span class="price-section__icon" aria-hidden="true"></span><span class="price-section__title">${sec.title[lang]}</span></summary>
        ${sec.intro ? `<p class="rules-intro">${sec.intro[lang]}</p>` : ""}
        ${sec.groups.map(g => `
          ${g.title ? `<h3 class="rules-group">${g.title[lang]}</h3>` : ""}
          <ul class="rules-list">${g.items.map(it => `<li>${it[lang]}</li>`).join("")}</ul>`).join("")}
        ${sec.outro ? `<p class="rules-intro rules-outro">${sec.outro[lang]}</p>` : ""}
        ${sec.id === "parking" ? routeMapHtml(lang) : ""}
      </details>`;
    }).join("");
  }

  /* ---------------- price list (tab "Prijslijst") ---------------- */
  function renderPriceList(){
    const body = $("#priceListBody");
    if (!body || typeof PRICE_LIST === "undefined") return;
    const lang = state.lang;
    const q = (($("#priceSearch") || {}).value || "").trim().toLowerCase();
    const openIds = new Set($$("#priceListBody details[open]").map(d => d.dataset.sec));
    // category chips (tabs) for quick filtering on a phone
    const cats = $("#priceCats");
    if (cats){
      cats.innerHTML = [`<button type="button" class="price-cat${!state.priceCat ? " is-active" : ""}" data-price-cat="">${t("pricelist_all", lang)}</button>`]
        .concat(PRICE_LIST.map(sec => `<button type="button" class="price-cat${state.priceCat === sec.id ? " is-active" : ""}" data-price-cat="${sec.id}">${sec.title[lang]}</button>`)).join("");
      cats.querySelectorAll("[data-price-cat]").forEach(b => b.addEventListener("click", () => {
        state.priceCat = b.dataset.priceCat || ""; renderPriceList();
      }));
    }
    let html = "";
    let today; try { today = seasonTodayKey(); } catch(e){ today = todayKey(); }
    const offItems = new Set((typeof CURRENT_ACTIONS !== "undefined" ? CURRENT_ACTIONS : []).filter(a => a.priceItem && !actionIsOn(a.id, today)).map(a => a.priceItem));
    if (!state.priceCat && !q) html += priceActionsHtml(today);
    PRICE_LIST.forEach(sec => {
      if (state.priceCat && sec.id !== state.priceCat) return;
      const items = bhItemsFor(sec).filter(it => {
        if (offItems.has(it.n.nl)) return false;
        if (!q) return true;
        const hay = [it.n.nl, it.n.en, it.n.fr, it.d && it.d.nl, it.d && it.d.en, it.d && it.d.fr, sec.title.nl, sec.title.en, sec.title.fr].join(" ").toLowerCase();
        return hay.includes(q);
      });
      if (!items.length) return;
      const open = (q || state.priceCat === sec.id || openIds.has(sec.id)) ? " open" : "";
      html += `<details class="price-section" data-sec="${sec.id}"${open}>
        <summary><span class="price-section__icon" aria-hidden="true"></span><span class="price-section__title">${sec.title[lang]}</span><span class="price-section__count">${items.length}</span></summary>
        ${sec.note ? `<p class="price-section__note">${sec.note[lang]}</p>` : ""}
        <ul class="price-items">
          ${items.map(it => `<li class="price-item">
            <div class="price-item__main"><span class="price-item__name">${it.n[lang]}</span><span class="price-item__price">${it.price}</span></div>
            <div class="price-item__meta">${[it.time, it.d && it.d[lang]].filter(Boolean).join(" · ")}</div>
            ${it.note ? `<div class="price-item__note">${it.note[lang]}</div>` : ""}
            ${bhEditRow(it)}
          </li>`).join("")}
        </ul>
      </details>`;
    });
    body.innerHTML = (BH && BH.view === "pop" && actSalon()) ? bhPanelHtml() : bhPanelHtml() + (html || `<p class="price-empty">${t("pricelist_empty", lang)}</p>`);

    const onl = $("#priceOnline");
    if (onl){ const u = (typeof ONLINE_BOOKING_URL !== "undefined" && ONLINE_BOOKING_URL) || ""; onl.hidden = !u; if (u) onl.href = u; }
    const wa = $("#priceWhatsapp");
    if (wa) wa.href = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(t("pricelist_wa_text", lang))}`;
    const mail = $("#priceMail");
    if (mail) mail.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t("pricelist_mail_subject", lang))}&body=${encodeURIComponent(t("pricelist_mail_body", lang))}`;
  }

  /* ---------------- BEHEER (v196): prijslijst, eigen acties en producten "op" ----------------
     Sandra changes things herself in the app (salon mode: key or preview link):
     - Prijslijst → "Prijslijst en acties beheren": change price / duration / description of
       a line, delete a line (restore it later), add a new line to a section.
       A linked treatment (PRICE_LINKS in data.js) follows the new price in the match result.
     - Eigen acties: add an action with title, text and optional end date; delete it again.
     - Ingrediënten → Gebruiksvolgorde: tap "Op" → the product disappears for everyone.
     Everything is published as beheer.json in the site repo (same GitHub key as the gift
     vouchers; file is made by the app, NOT in the zip, never delete it when uploading).
     Without key: the change stays on this phone only (and the app says so). */
  var BH = { pub:null, loc:null, edit:false, busy:false };
  const BH_CACHE = "bc_beheer_pub_v1";   // last published beheer.json: hides deleted treatments at once, also offline
  try { const c0 = localStorage.getItem(BH_CACHE); if (c0) BH.pub = bhClean(JSON.parse(c0)); } catch(e){ /* ignore */ }
  const BH_FILE = "beheer.json", BH_KEY = "bc_beheer_v1";
  const bhStr = (x, n) => String(x == null ? "" : x).replace(/[<>]/g, "").trim().slice(0, n);
  function bhClean(v){
    const o = { prices:{}, hide:[], add:[], acts:[], op:[], unused:{} };
    if (!v || typeof v !== "object") return o;
    if (v.prices && typeof v.prices === "object") Object.keys(v.prices).slice(0, 200).forEach(k => {
      const p = v.prices[k]; if (!p || typeof p !== "object") return;
      const e = {}; if (p.price) e.price = bhStr(p.price, 40); if (p.time) e.time = bhStr(p.time, 30); if (p.d) e.d = bhStr(p.d, 240);
      if (Object.keys(e).length) o.prices[bhStr(k, 140)] = e;
    });
    o.hide = (Array.isArray(v.hide) ? v.hide : []).map(x => bhStr(x, 140)).filter(Boolean).slice(0, 200);
    o.add = (Array.isArray(v.add) ? v.add : []).slice(0, 100).map(a => a && typeof a === "object" ? { id:bhStr(a.id, 30).replace(/[^a-z0-9_-]/gi, ""), sec:bhStr(a.sec, 30), nl:bhStr(a.nl, 120), en:bhStr(a.en, 120), fr:bhStr(a.fr, 120), time:bhStr(a.time, 30), price:bhStr(a.price, 40), d:bhStr(a.d, 240) } : null).filter(a => a && a.id && a.sec && a.nl && a.price);
    o.acts = (Array.isArray(v.acts) ? v.acts : []).slice(0, 30).map(a => a && typeof a === "object" ? { id:bhStr(a.id, 30).replace(/[^a-z0-9_-]/gi, ""), title:bhStr(a.title, 120), text:bhStr(a.text, 500), until:/^\d{4}-\d{2}-\d{2}$/.test(a.until || "") ? a.until : "" } : null).filter(a => a && a.id && a.title);
    o.op = (Array.isArray(v.op) ? v.op : []).map(x => bhStr(x, 60)).filter(Boolean).slice(0, 400);
    if (v.unused && typeof v.unused === "object") Object.keys(v.unused).slice(0, 120).forEach(k => {   // treatment id → products Sandra does NOT use there
      const l = (Array.isArray(v.unused[k]) ? v.unused[k] : []).map(x => bhStr(x, 60)).filter(Boolean).slice(0, 200);
      if (l.length) o.unused[bhStr(k, 60)] = l;
    });
    return o;
  }
  function bhLocal(){ try { const v = localStorage.getItem(BH_KEY); return v ? bhClean(JSON.parse(v)) : null; } catch(e){ return null; } }
  function bhSaveLocal(){ try { if (BH.loc) localStorage.setItem(BH_KEY, JSON.stringify(BH.loc)); else localStorage.removeItem(BH_KEY); } catch(e){ /* ignore */ } }
  function bhEff(){ return (BH && (BH.loc || BH.pub)) || bhClean(null); }
  function bhCopy(){ return bhClean(JSON.parse(JSON.stringify(bhEff()))); }
  function bhPrice(v){ v = bhStr(v, 40); return /^\d+([.,]\d{1,2})?$/.test(v) ? "€" + v.replace(".", ",") : v; }
  // linked treatments follow the price list (first euro amount in their price text)
  function bhApplyTreatPrices(){
    try {
      if (typeof PRICE_LINKS === "undefined" || typeof TREATMENTS_CATALOG === "undefined") return;
      const e = bhEff();
      // what is no longer on the price list is no longer offered (match, actions, repeat-last)
      const hid = new Set(e.hide), un = new Set();
      new Set(Object.keys(PRICE_LINKS).concat(Object.keys(PRICE_AVAIL_EXTRA))).forEach(id => { const nm = priceAvailNames(id); if (nm && nm.length && nm.every(n => hid.has(n))) un.add(id); });
      BC_UNAVAILABLE.clear(); un.forEach(x => BC_UNAVAILABLE.add(x));
      TREATMENTS_CATALOG.forEach(tr => {
        const link = PRICE_LINKS[tr.id]; if (!link) return;
        if (tr._basePrice == null) tr._basePrice = tr.price;
        const ov = e.prices[link], add = ov && ov.price;
        tr.price = add && /€\s?\d/.test(tr._basePrice) && /^€\d+([.,]\d{1,2})?$/.test(bhPrice(add)) ? tr._basePrice.replace(/€\s?\d+(?:[.,]\d+)?/, bhPrice(add)) : tr._basePrice;
      });
    } catch(err){ /* ignore */ }
  }
  function bhItemsFor(sec){
    const e = bhEff(), hid = new Set(e.hide);
    const base = sec.items.filter(it => !hid.has(it.n.nl)).map(it => {
      const o = Object.assign({}, it, { _key: it.n.nl }), ov = e.prices[it.n.nl];
      if (ov){ if (ov.price) o.price = bhPrice(ov.price); if (ov.time) o.time = ov.time; if (ov.d) o.d = { nl:ov.d, en:ov.d, fr:ov.d }; o._edited = true; }
      return o;
    });
    const add = e.add.filter(a => a.sec === sec.id).map(a => ({ n:{ nl:a.nl, en:a.en || a.nl, fr:a.fr || a.nl }, price:bhPrice(a.price), time:a.time, d:a.d ? { nl:a.d, en:a.d, fr:a.d } : null, note:null, _key:"add:" + a.id, _added:true }));
    return base.concat(add);
  }
  function bhActsActive(today){
    return bhEff().acts.filter(a => !a.until || today <= a.until).map(a => ({ icon:"✨", id:a.id, title:{ nl:esc(a.title) }, text:{ nl:esc(a.text) } }));
  }
  function bhEditRow(it){
    if (!(BH && BH.edit) || !actSalon()) return "";
    const L = state.lang, k = esc(it._key);
    return `<div class="bh-row">
      <label class="bh-lab">${t("bh_price", L)} <input type="text" class="pm-input bh-f" data-key="${k}" data-f="price" value="${esc(it.price)}" maxlength="40" size="9"></label>
      <label class="bh-lab">${t("bh_time", L)} <input type="text" class="pm-input bh-f" data-key="${k}" data-f="time" value="${esc(it.time || "")}" maxlength="30" size="8"></label>
      <label class="bh-lab bh-wide">${t("bh_desc", L)} <input type="text" class="pm-input bh-f" data-key="${k}" data-f="d" value="${esc((it.d && it.d.nl) || "")}" maxlength="240"></label>
      <button type="button" class="btn btn--sm btn--outline" data-bh="del" data-key="${k}">🗑 ${t("bh_delete", L)}</button>
      ${it._edited ? `<button type="button" class="btn btn--sm btn--text" data-bh="reset" data-key="${k}">↺ ${t("bh_reset", L)}</button>` : ""}
    </div>`;
  }
  function bhActsHtml(){
    const L = state.lang, e = bhEff();
    return `<p class="gift-block__title">${t("bh_acts_title", L)}</p>
      <ul class="act-list">${e.acts.map(a => `<li class="act-row"><span class="act-row__name">✨ ${esc(a.title)}${a.until ? ` <em>(${esc(a.until)})</em>` : ""}</span>
        <button type="button" class="btn btn--sm btn--outline" data-bh="actdel" data-id="${esc(a.id)}">🗑 ${t("bh_delete", L)}</button></li>`).join("")}</ul>
      <div class="bh-row"><input type="text" id="bhActTitle" class="pm-input bh-wide" maxlength="120" placeholder="${t("bh_act_title", L)}">
      <input type="text" id="bhActText" class="pm-input bh-wide" maxlength="500" placeholder="${t("bh_act_text", L)}">
      <label class="bh-lab">${t("bh_act_until", L)} <input type="date" id="bhActUntil" class="pm-input"></label>
      <button type="button" class="btn btn--sm btn--primary" data-bh="actadd">➕ ${t("bh_act_add", L)}</button></div>`;
  }
  function bhPanelHtml(){
    if (!actSalon() || typeof PRICE_LIST === "undefined") return "";
    const L = state.lang, e = bhEff();
    const popOn = !!(BH && BH.view === "pop");
    let h = `<div class="bh-panel"><div class="bh-row bh-row--top"><button type="button" class="btn btn--sm ${BH && BH.edit && !popOn ? "btn--primary" : "btn--outline"}" data-bh="toggle">⚙️ ${t(BH && BH.edit && !popOn ? "bh_done" : "bh_manage", L)}</button>
      <button type="button" class="btn btn--sm ${popOn ? "btn--primary" : "btn--outline"}" data-bh="pop">📊 ${t("pop_title", L)}</button></div>`;
    if (popOn) return h + popHtml() + `</div>`;
    if (BH && BH.edit){
      const hidden = e.hide.map(k => `<li class="act-row"><span class="act-row__name">${esc(k)}</span><button type="button" class="btn btn--sm btn--outline" data-bh="restore" data-key="${esc(k)}">↺ ${t("bh_restore", L)}</button></li>`).join("");
      h += `<p class="ingr-muted">${t("bh_intro", L)}</p>
        <p class="gift-block__title">➕ ${t("bh_new_title", L)}</p>
        <div class="bh-row"><select id="bhSec" class="pm-input">${PRICE_LIST.map(s => `<option value="${esc(s.id)}">${esc(s.title[L] || s.title.nl)}</option>`).join("")}</select>
        <input type="text" id="bhName" class="pm-input bh-wide" maxlength="120" placeholder="${t("bh_name", L)}">
        <input type="text" id="bhPrice" class="pm-input" maxlength="40" size="8" placeholder="${t("bh_price", L)}">
        <input type="text" id="bhTime" class="pm-input" maxlength="30" size="8" placeholder="${t("bh_time", L)}">
        <input type="text" id="bhDesc" class="pm-input bh-wide" maxlength="240" placeholder="${t("bh_desc", L)}">
        <button type="button" class="btn btn--sm btn--primary" data-bh="add">➕ ${t("bh_add", L)}</button></div>
        ${hidden ? `<p class="gift-block__title">${t("bh_hidden_title", L)}</p><ul class="act-list">${hidden}</ul>` : ""}
        ${bhActsHtml()}`;
    }
    return h + `</div>`;
  }
  async function bhPublish(silent){
    const L = state.lang, tok = (() => { try { return localStorage.getItem(GIFT_GH_KEY) || ""; } catch(e){ return ""; } })();
    if (!tok){ showToast(t("bh_pub_nokey", L)); return false; }
    const { owner, repo } = giftRepo();
    if (!owner || !repo){ if (!silent) showToast(t("gift_live_norepo", L)); return false; }
    if (BH.busy){ BH.again = true; return false; }
    BH.busy = true;
    const snap = bhCopy(), out = Object.assign({ v:1, u:new Date().toISOString() }, snap);
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${BH_FILE}`;
    const H = { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json" };
    let ok = false, err = "";
    for (let attempt = 0; attempt < 2 && !ok; attempt++){
      try {
        let sha;
        const g = await fetch(api, { headers: H, cache:"no-store" });
        if (g.ok) sha = (await g.json()).sha; else if (g.status !== 404){ err = "GET " + g.status; continue; }
        const p = await fetch(api, { method:"PUT", headers: { ...H, "Content-Type":"application/json" },
          body: JSON.stringify({ message: "Beheer bijgewerkt (app)", content: giftToken64(JSON.stringify(out, null, 1)), ...(sha ? { sha } : {}) }) });
        if (p.ok) ok = true; else err = "PUT " + p.status;
      } catch(e){ err = String(e && e.message || e); }
    }
    BH.busy = false;
    if (ok){ BH.pub = snap; try { localStorage.setItem(BH_CACHE, JSON.stringify(snap)); } catch(e){ /* ignore */ } if (!BH.again) { BH.loc = null; bhSaveLocal(); } }
    showToast(t(ok ? "act_pub_ok" : "act_pub_fail", L).replace("{e}", err));
    if (BH.again){ BH.again = false; return bhPublish(true); }
    return ok;
  }
  function bhRefresh(){
    bhApplyTreatPrices();
    try { renderPriceList(); } catch(e){}
    try { renderActions(); } catch(e){}
    try { renderProfileOptions(); } catch(e){}      // no kid profile when Kindermanicure is gone
    try { renderReturningUserBlock(); } catch(e){}  // favourites / last moment: "niet meer beschikbaar"
    try { renderCopyName(); } catch(e){}
    try { if (typeof renderIngredients === "function" && document.querySelector("#ingrBody")) renderIngredients(); } catch(e){}
  }
  function bhCommit(e2){ BH.loc = bhClean(e2); bhSaveLocal(); bhRefresh(); bhPublish(true); }
  function bhClick(ev){
    const b = ev.target.closest && ev.target.closest("[data-bh]"); if (!b) return;
    if (b.dataset.bh === "openall"){   // open / close every row of the list (everybody)
      ev.preventDefault();
      const ds = [...(b.closest("#ingrBody") || document).querySelectorAll("details.ingr-row")];
      const open = ds.some(d => !d.open); ds.forEach(d => { d.open = open; }); return;
    }
    if (!(actSalon() || ingrSandra())) return;
    const a = b.dataset.bh, L = state.lang, key = b.dataset.key || "", e2 = bhCopy();
    if (a === "unused" || a === "used"){   // "gebruik ik hier niet": product is not counted for that treatment
      ev.preventDefault(); ev.stopPropagation();
      const tid = b.dataset.treat, pid = b.dataset.prod; if (!tid || !pid) return;
      const l = e2.unused[tid] || (e2.unused[tid] = []), i = l.indexOf(pid);
      if (a === "unused" && i < 0) l.push(pid); if (a === "used" && i >= 0) l.splice(i, 1);
      if (!l.length) delete e2.unused[tid];
      return bhCommit(e2);
    }
    if (!actSalon()) return;
    if (a === "toggle"){ BH.view = ""; BH.edit = !BH.edit; bhRefresh(); return; }
    if (a === "pop"){ BH.view = BH.view === "pop" ? "" : "pop"; BH.edit = false; renderPriceList(); return; }
    if (a === "del"){
      if (!confirm(t("bh_confirm_del", L).replace("{p}", key.replace(/^add:/, "")))) return;
      if (key.startsWith("add:")) e2.add = e2.add.filter(x => "add:" + x.id !== key);
      else if (!e2.hide.includes(key)) e2.hide.push(key);
      return bhCommit(e2);
    }
    if (a === "restorefile"){ const fi = $("#popFile"); if (fi) fi.click(); return; }
    if (a === "restore"){ e2.hide = e2.hide.filter(x => x !== key); return bhCommit(e2); }
    if (a === "reset"){ delete e2.prices[key]; return bhCommit(e2); }
    if (a === "add"){
      const nm = bhStr(($("#bhName") || {}).value, 120), pr = bhStr(($("#bhPrice") || {}).value, 40);
      if (!nm || !pr){ showToast(t("bh_err", L)); return; }
      e2.add.push({ id:"n" + Date.now().toString(36), sec:($("#bhSec") || {}).value, nl:nm, en:"", fr:"", time:bhStr(($("#bhTime") || {}).value, 30), price:pr, d:bhStr(($("#bhDesc") || {}).value, 240) });
      return bhCommit(e2);
    }
    if (a === "actadd"){
      const ti = bhStr(($("#bhActTitle") || {}).value, 120); if (!ti){ showToast(t("bh_err", L)); return; }
      e2.acts.push({ id:"a" + Date.now().toString(36), title:ti, text:bhStr(($("#bhActText") || {}).value, 500), until:($("#bhActUntil") || {}).value || "" });
      return bhCommit(e2);
    }
    if (a === "actdel"){ e2.acts = e2.acts.filter(x => x.id !== b.dataset.id); return bhCommit(e2); }
  }
  function bhChange(ev){
    const el = ev.target; if (!el.classList || !el.classList.contains("bh-f") || !actSalon()) return;
    const key = el.dataset.key, f = el.dataset.f, val = bhStr(el.value, f === "d" ? 240 : 40), e2 = bhCopy();
    if (key.startsWith("add:")){ const x = e2.add.find(y => "add:" + y.id === key); if (!x) return; x[f] = val; if (f === "price" && !val) return; }
    else { const o = e2.prices[key] || (e2.prices[key] = {}); if (val) o[f] = val; else delete o[f]; if (!Object.keys(o).length) delete e2.prices[key]; }
    bhCommit(e2);
  }
  document.addEventListener("click", bhClick);

  /* ---------------- POPULARITEIT (v198): jouw teller, alleen op deze gsm ----------------
     Salonmodus → Prijslijst → "📊 Populariteit". You log what was done / chosen (treatments, massages,
     gel colours, drinks, other); the app ranks them. Stored ONLY in this phone's localStorage
     (bc_pop_v1): the repo is public, so it is deliberately NOT published. Use "Back-up kopiëren".
     Entry = {d:"YYYY-MM-DD", c:"beh"|"gel"|"drink"|"ov", k:name, n:count}. Massages are a filtered
     view of "beh". Gel colours and "overig" items are added by Sandra herself. */
  const POP_KEY = "bc_pop_v1";
  var POP = { data:null, cat:"beh", period:"all", mas:false };
  const popToday = () => new Date().toISOString().slice(0, 10);
  function popLoad(){
    if (POP.data) return POP.data;
    let d = null; try { d = JSON.parse(localStorage.getItem(POP_KEY) || "null"); } catch(e){ d = null; }
    POP.data = popClean(d); return POP.data;
  }
  function popClean(d){
    const o = { v:1, e:[], custom:{ gel:[], drink:[], ov:[] } };
    if (!d || typeof d !== "object") return o;
    (Array.isArray(d.e) ? d.e : []).slice(0, 20000).forEach(x => { if (x && /^\d{4}-\d{2}-\d{2}$/.test(x.d || "") && ["beh", "gel", "drink", "ov"].includes(x.c) && x.k && Number.isFinite(+x.n) && +x.n !== 0) o.e.push({ d:x.d, c:x.c, k:bhStr(x.k, 120), n:Math.round(+x.n) }); });
    ["gel", "drink", "ov"].forEach(c => { o.custom[c] = ((d.custom && Array.isArray(d.custom[c])) ? d.custom[c] : []).map(x => bhStr(x, 120)).filter(Boolean).slice(0, 300); });
    return o;
  }
  function popSave(){ try { localStorage.setItem(POP_KEY, JSON.stringify(popLoad())); } catch(e){ showToast(t("pop_save_fail", state.lang)); } }
  function popDrinkNames(){
    const out = new Set(), walk = v => { if (!v || typeof v !== "object") return; if (typeof v.name === "string") out.add(v.name); else if (v.name && v.name.nl) out.add(v.name.nl); Object.values(v).forEach(x => { if (x && typeof x === "object") walk(x); }); };
    try { walk(BEVERAGES); walk(TEAS_DECAF); walk(TEAS_CAFF); } catch(e){ /* ignore */ }
    return [...out];
  }
  function popItems(cat){
    const d = popLoad(), names = [];
    if (cat === "beh"){
      const e = bhEff(); PRICE_LIST.forEach(s => { s.items.forEach(it => names.push(it.n.nl)); e.add.filter(x => x.sec === s.id).forEach(x => names.push(x.nl)); });
    } else if (cat === "drink") popDrinkNames().forEach(n => names.push(n));
    (d.custom[cat] || []).forEach(n => names.push(n));
    d.e.filter(x => x.c === cat).forEach(x => names.push(x.k));   // keep history of things no longer on the list
    return [...new Set(names)];
  }
  const popIsMassage = n => /massage|cupping|hot stone/i.test(n);
  function popFrom(){
    const p = POP.period, now = new Date();
    if (p === "year") return now.getFullYear() + "-01-01";
    if (p === "month") return now.toISOString().slice(0, 7) + "-01";
    if (p === "90") return new Date(now.getTime() - 90 * 864e5).toISOString().slice(0, 10);
    return "0000-00-00";
  }
  function popCounts(cat){
    const from = popFrom(), m = {};
    popLoad().e.forEach(x => { if (x.c === cat && x.d >= from) m[x.k] = (m[x.k] || 0) + x.n; });
    return m;
  }
  function popAdd(c, k, n, d){
    const data = popLoad(); d = d || popToday();
    const ex = data.e.find(x => x.c === c && x.k === k && x.d === d);
    if (ex){ ex.n += n; if (ex.n === 0) data.e.splice(data.e.indexOf(ex), 1); } else data.e.push({ d, c, k, n });
    popSave();
  }
  function popDec(c, k){
    const data = popLoad(), mine = data.e.filter(x => x.c === c && x.k === k && x.n > 0).sort((p, q) => q.d.localeCompare(p.d));
    if (!mine.length) return;
    mine[0].n -= 1; if (mine[0].n <= 0) data.e.splice(data.e.indexOf(mine[0]), 1);
    popSave();
  }
  function popText(){
    const L = state.lang, cats = [["beh", false], ["beh", true], ["gel"], ["drink"], ["ov"]];
    return cats.map(([c, mas]) => { const cn = popCounts(c), rows = Object.entries(cn).filter(([k, v]) => v > 0 && (!mas || popIsMassage(k))).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])).slice(0, 15);
      return rows.length ? t("pop_cat_" + (mas ? "mas" : c), L) + ":\n" + rows.map(([k, v], i) => (i + 1) + ". " + k + " — " + v + "×").join("\n") : ""; }).filter(Boolean).join("\n\n") || t("pop_empty", L);
  }
  function popHtml(){
    const L = state.lang, cat = POP.cat, isMas = cat === "mas", store = isMas ? "beh" : cat, cn = popCounts(store);
    let items = popItems(store); if (isMas) items = items.filter(popIsMassage);
    const rows = items.map(k => ({ k, n:cn[k] || 0 })).sort((x, y) => y.n - x.n || x.k.localeCompare(y.k));
    const max = Math.max(1, ...rows.map(r => r.n)), total = rows.reduce((s, r) => s + r.n, 0);
    const row = r => `<li class="pop-row"><div class="pop-row__top"><span class="pop-row__name">${esc(r.k)}</span><b class="pop-row__n">${r.n}×</b></div>
        <div class="pop-bar"><i style="width:${Math.round(r.n / max * 100)}%"></i></div>
        <div class="pop-row__btns"><button type="button" class="btn btn--sm btn--primary" data-pop="inc" data-c="${store}" data-k="${esc(r.k)}">＋1</button>
        <button type="button" class="btn btn--sm btn--outline" data-pop="dec" data-c="${store}" data-k="${esc(r.k)}">−1</button></div></li>`;
    const top = rows.filter(r => r.n > 0), zero = rows.filter(r => r.n === 0);
    const chip = (id, label, on, attr) => `<button type="button" class="chip chip--sm${on ? " is-on" : ""}" data-pop="${attr}" data-v="${id}">${label}</button>`;
    return `<div class="pop-box">
      <div class="pop-chips">${["beh", "mas", "gel", "drink", "ov"].map(c => chip(c, t("pop_cat_" + c, L), POP.cat === c, "cat")).join("")}</div>
      <div class="pop-chips">${[["all", "pop_p_all"], ["year", "pop_p_year"], ["90", "pop_p_90"], ["month", "pop_p_month"]].map(([id, k]) => chip(id, t(k, L), POP.period === id, "period")).join("")}</div>
      <p class="ingr-muted">${t("pop_total", L).replace("{n}", total)}</p>
      ${top.length ? `<ol class="pop-list">${top.slice(0, 10).map(row).join("")}</ol>` : `<p class="ingr-muted">${t("pop_none", L)}</p>`}
      ${top.length > 10 ? `<details class="ingr-more"><summary>${t("pop_more", L).replace("{n}", top.length - 10)}</summary><ol class="pop-list">${top.slice(10).map(row).join("")}</ol></details>` : ""}
      <details class="ingr-more"><summary>${t("pop_log_title", L).replace("{n}", zero.length)}</summary><ol class="pop-list">${zero.map(row).join("") || `<li class="ingr-muted">—</li>`}</ol></details>
      <details class="ingr-more"><summary>${t("pop_backfill", L)}</summary>
        <div class="bh-row"><select id="popSel" class="pm-input bh-wide">${items.map(k => `<option>${esc(k)}</option>`).join("")}</select>
        <input type="number" id="popN" class="pm-input" min="1" max="999" value="1" size="4">
        <input type="date" id="popD" class="pm-input" value="${popToday()}" max="${popToday()}">
        <button type="button" class="btn btn--sm btn--primary" data-pop="addn" data-c="${store}">${t("pop_add", L)}</button></div></details>
      ${["gel", "drink", "ov"].includes(store) ? `<div class="bh-row"><input type="text" id="popNew" class="pm-input bh-wide" maxlength="120" placeholder="${t("pop_new_" + store, L)}"><button type="button" class="btn btn--sm btn--outline" data-pop="newitem" data-c="${store}">＋ ${t("pop_new_btn", L)}</button></div>` : ""}
      <div class="bh-row"><button type="button" class="btn btn--sm btn--outline" data-pop="copy">${t("pop_copy", L)}</button>
        <button type="button" class="btn btn--sm btn--outline" data-pop="backup">${t("pop_backup", L)}</button>
        <button type="button" class="btn btn--sm btn--text" data-pop="restore">${t("pop_restore", L)}</button><button type="button" class="btn btn--sm btn--text" data-pop="restorefile">${t("pop_restore_file", L)}</button><input type="file" id="popFile" accept=".txt,.json,text/plain,application/json" hidden></div>
      <p class="ingr-muted">${t("pop_note", L)}</p></div>`;
  }
  async function popClip(txt){ try { await navigator.clipboard.writeText(txt); showToast(t("pop_copied", state.lang)); } catch(e){ window.prompt(t("pop_copy_manual", state.lang), txt); } }
  function popClick(ev){
    const b = ev.target.closest && ev.target.closest("[data-pop]"); if (!b || !actSalon()) return;
    const a = b.dataset.pop, c = b.dataset.c, k = b.dataset.k, L = state.lang;
    if (a === "cat"){ POP.cat = b.dataset.v; return renderPriceList(); }
    if (a === "period"){ POP.period = b.dataset.v; return renderPriceList(); }
    if (a === "inc"){ popAdd(c, k, 1); return renderPriceList(); }
    if (a === "dec"){ popDec(c, k); return renderPriceList(); }
    if (a === "addn"){
      const kk = ($("#popSel") || {}).value, n = Math.max(1, Math.min(999, parseInt(($("#popN") || {}).value, 10) || 1)), d = ($("#popD") || {}).value || popToday();
      if (!kk) return; popAdd(c, kk, n, d > popToday() ? popToday() : d); return renderPriceList();
    }
    if (a === "newitem"){
      const v = bhStr(($("#popNew") || {}).value, 120); if (!v){ showToast(t("bh_err", L)); return; }
      const d = popLoad(); if (!d.custom[c].includes(v)) d.custom[c].push(v); popSave(); return renderPriceList();
    }
    if (a === "copy") return popClip(popText());
    if (a === "backup") return popClip(JSON.stringify(popLoad()));
    if (a === "restore"){
      const s = window.prompt(t("pop_restore_ask", L)); if (!s) return;
      try { const d = JSON.parse(s); if (!d || !Array.isArray(d.e)) throw new Error("x"); POP.data = popClean(d); popSave(); renderPriceList(); showToast(t("pop_restored", L)); }
      catch(e){ showToast(t("pop_restore_bad", L)); }
    }
  }
  document.addEventListener("click", popClick);
  document.addEventListener("change", ev => {   // v199: restore from a .txt/.json file (long backups are awkward to paste on a phone)
    const fi = ev.target; if (!fi || fi.id !== "popFile" || !actSalon() || !fi.files || !fi.files[0]) return;
    const rd = new FileReader(), L = state.lang, f0 = fi.files[0];
    if (f0.size > 2 * 1024 * 1024){ fi.value = ""; showToast(t("pop_restore_bad", L)); return; }   // v200: a backup is a few KB; refuse huge files
    rd.onload = () => { fi.value = "";   /* v200: allow picking the same file again */ try { const d = JSON.parse(String(rd.result || "")); if (!d || !Array.isArray(d.e)) throw new Error("x"); if (!window.confirm(t("pop_restore_ask2", L))) return; POP.data = popClean(d); popSave(); renderPriceList(); showToast(t("pop_restored", L)); } catch(e){ showToast(t("pop_restore_bad", L)); } };
    rd.readAsText(fi.files[0]);
  });
  document.addEventListener("change", bhChange);
  (async function bhLoadPublic(){
    try {
      BH.loc = bhLocal(); bhApplyTreatPrices();
      const res = await fetch(BH_FILE + "?t=" + Date.now(), { cache:"no-store" });
      if (res.ok){ const j = await res.json(); BH.pub = bhClean(j); try { localStorage.setItem(BH_CACHE, JSON.stringify(BH.pub)); } catch(e){ /* ignore */ } }
    } catch(e){ /* offline or no file yet */ }
    bhRefresh();
  })();

  /* the actions as ONE list (price list = home screen + the ones that are not active now, for Sandra) */
  function priceActionsHtml(today){
    const L = state.lang, hid = actHiddenSet();
    let offerTxt = ""; try { offerTxt = actOfferText(hid); } catch(e){}
    const row = (icon, name, text) => `<li class="price-item"><div class="price-item__main"><span class="price-item__name">${icon} ${name}</span></div>${text ? `<div class="price-item__note">${text}</div>` : ""}</li>`;
    const act = activeActionsNow(today).filter(a => !hid.has("a:" + a.id) && !(a.dupWith && offerTxt && a.dupWith.test(offerTxt)));
    const on = new Set(act.map(a => a.id)), rows = [];
    act.filter(a => a.yearly).forEach(a => rows.push(row(a.icon || "🎁", actionFill(a.title[L] || a.title.nl, a, L), actionFill(a.text[L] || a.text.nl, a, L))));
    try {
      newsSplit().specials.filter(p => !hid.has("p:" + p.url)).forEach(p => {
        const safe = newsSafeUrl(p.url); if (!safe) return;
        const ln = newsOfferLine(p);
        rows.push(row("🍂", esc(newsShortTitle(p.title)), (ln.html ? ln.rest : esc(ln.rest)) + ` <a class="offer-line__more" href="${esc(safe)}" target="_blank" rel="noopener noreferrer">${t("specials_more", L)}</a>`));
      });
    } catch(e){ /* no news yet */ }
    act.filter(a => !a.yearly).forEach(a => rows.push(row(a.icon || "🎁", actionFill(a.title[L] || a.title.nl, a, L), actionFill(a.text[L] || a.text.nl, a, L))));
    bhActsActive(today).forEach(a => rows.push(row(a.icon, a.title.nl, a.text.nl)));
    let off = "";
    if (actSalon()){
      const names = [];
      (typeof CURRENT_ACTIONS === "undefined" ? [] : CURRENT_ACTIONS).filter(a => !a.soldOut && !on.has(a.id)).forEach(a => {
        const raw = String((a.title && (a.title[L] || a.title.nl)) || a.id), nm = /\{(value|treat2?)\}/.test(raw) ? raw.split(":")[0].trim() : raw;
        const w = actionWindow(a, today), why = hid.has("a:" + a.id) ? t("act_hidden", L) : (w && w.dealFrom ? t("bh_from", L) + " " + actionFmt(w.dealFrom, L) : t("act_off_season", L));
        names.push(`<li>${esc(nm)} <em>(${esc(why)})</em></li>`);
      });
      try { newsSplit().specials.filter(p => hid.has("p:" + p.url)).forEach(p => names.push(`<li>🍂 ${esc(newsPlainTitle(p.title))} <em>(${esc(t("act_hidden", L))})</em></li>`)); } catch(e){}
      if (names.length) off = `<p class="price-section__note">${t("bh_inactive", L)}</p><ul class="bh-off">${names.join("")}</ul>`;
    }
    if (!rows.length && !off) return "";
    return `<details class="price-section price-section--actions" data-sec="_actions" open>
        <summary><span class="price-section__icon" aria-hidden="true"></span><span class="price-section__title">${t("pricelist_actions", L)}</span><span class="price-section__count">${rows.length}</span></summary>
        <ul class="price-items">${rows.join("")}</ul>${off}
      </details>`;
  }

  /* ---------------- ACTIES BEHEREN (v194) ----------------
     Sandra can hide an action card (or a WordPress offer line) herself, in
     the app: salon mode (key or preview link) shows "⚙️ Acties beheren" under
     the action cards. The hidden list is published as acties-beheer.json in
     the site repo (same GitHub key as the gift vouchers), so every visitor
     sees the change. Keys: "a:<action id>" and "p:<WordPress post url>".
     Extra: an action with dupWith (data.js) disappears by itself when a
     WordPress offer line already says the same (no double €50 action). */
  var ACT_ST = { pub:null, loc:null, open:false, busy:false };   // var: safe if renderActions runs before this line
  const ACT_FILE = "acties-beheer.json", ACT_KEY = "bc_act_hide_v1";
  function actCleanList(v){ return (Array.isArray(v) ? v : []).filter(k => typeof k === "string" && /^[ap]:/.test(k) && k.length <= 400).slice(0, 60); }
  function actLocal(){ try { const v = JSON.parse(localStorage.getItem(ACT_KEY) || "null"); return v ? actCleanList(v) : null; } catch(e){ return null; } }
  function actSaveLocal(){ try { if (ACT_ST.loc) localStorage.setItem(ACT_KEY, JSON.stringify(ACT_ST.loc)); else localStorage.removeItem(ACT_KEY); } catch(e){ /* ignore */ } }
  function actHiddenList(){ try { return (ACT_ST && (ACT_ST.loc || ACT_ST.pub)) || []; } catch(e){ return []; } }
  function actHiddenSet(){ return new Set(actHiddenList()); }
  function actSalon(){ try { return !!(hasSalonKey() || ingrSandra()); } catch(e){ return false; } }
  (async function actLoadPublic(){
    try {
      ACT_ST.loc = actLocal();
      const res = await fetch(ACT_FILE + "?t=" + Date.now(), { cache:"no-store" });
      if (!res.ok) return;
      const j = await res.json();
      ACT_ST.pub = actCleanList(j && j.hide);
      renderActions();
    } catch(e){ /* offline or no file yet */ }
  })();
  async function actPublish(silent){
    const L = state.lang, tok = (() => { try { return localStorage.getItem(GIFT_GH_KEY) || ""; } catch(e){ return ""; } })();
    if (!tok){ showToast(t("act_pub_nokey", L)); return false; }
    const { owner, repo } = giftRepo();
    if (!owner || !repo){ if (!silent) showToast(t("gift_live_norepo", L)); return false; }
    if (ACT_ST.busy) return false;
    ACT_ST.busy = true;
    const list = actHiddenList().slice(), out = { v:1, u: new Date().toISOString(), hide: list };
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${ACT_FILE}`;
    const H = { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json" };
    let ok = false, err = "";
    for (let attempt = 0; attempt < 2 && !ok; attempt++){
      try {
        let sha;
        const g = await fetch(api, { headers: H, cache:"no-store" });
        if (g.ok) sha = (await g.json()).sha; else if (g.status !== 404){ err = "GET " + g.status; continue; }
        const p = await fetch(api, { method:"PUT", headers: { ...H, "Content-Type":"application/json" },
          body: JSON.stringify({ message: "Acties beheerd (app)", content: giftToken64(JSON.stringify(out, null, 1)), ...(sha ? { sha } : {}) }) });
        if (p.ok) ok = true; else err = "PUT " + p.status;
      } catch(e){ err = String(e && e.message || e); }
    }
    ACT_ST.busy = false;
    if (ok){ ACT_ST.pub = list; ACT_ST.loc = null; actSaveLocal(); renderActions(); }
    showToast(t(ok ? "act_pub_ok" : "act_pub_fail", L).replace("{e}", err));
    return ok;
  }
  function actClick(e){
    const b = e.currentTarget, a = b.dataset.act;
    if (a === "panel"){ ACT_ST.open = !ACT_ST.open; renderActions(); return; }
    if (a === "toggle"){
      const key = b.dataset.key || ""; if (!/^[ap]:/.test(key)) return;
      const cur = new Set(actHiddenList());
      if (cur.has(key)) cur.delete(key); else cur.add(key);
      ACT_ST.loc = actCleanList([...cur]); actSaveLocal(); renderActions(); actPublish(true);
    }
  }
  // plain text of the WordPress offer lines that are visible now (to spot an action that is shown twice)
  function actOfferText(hid){
    try {
      if (typeof news === "undefined" || !news.posts) return "";
      return newsSplit().specials.filter(p => !hid.has("p:" + p.url)).map(p => newsPlainTitle(p.title) + " " + JSON.stringify(p.offer || {}) + " " + JSON.stringify(p.facts || {})).join(" ");
    } catch(e){ return ""; }
  }
  function actManageHtml(today){
    const L = state.lang, hid = actHiddenSet(), open = ACT_ST && ACT_ST.open;
    let html = `<div class="act-manage"><button type="button" class="btn btn--sm btn--outline" data-act="panel">⚙️ ${t("act_manage", L)}</button>`;
    if (open){
      const rows = [];
      (typeof CURRENT_ACTIONS === "undefined" ? [] : CURRENT_ACTIONS).filter(a => !a.soldOut).forEach(a => {
        const w = actionWindow(a, today), on = !!(w && (!w.from || today >= w.from) && (!w.until || today <= w.until));
        const raw = String((a.title && (a.title[L] || a.title.nl)) || a.id);
        const name = /\{(value|treat2?)\}/.test(raw) ? raw.split(":")[0].trim() : raw;   // e.g. "Vaderdagactie" instead of "Vaderdagactie: … korting op een … of …"
        rows.push({ key:"a:" + a.id, name, sub: on ? "" : t("act_off_season", L) });
      });
      try { newsSplit().specials.forEach(p => rows.push({ key:"p:" + p.url, name:"🍂 " + newsPlainTitle(p.title), sub:"" })); } catch(e){ /* no news yet */ }
      html += `<p class="ingr-muted">${t("act_manage_intro", L)}</p><ul class="act-list">` + rows.map(r => {
        const h = hid.has(r.key);
        return `<li class="act-row${h ? " is-hidden" : ""}"><span class="act-row__name">${esc(r.name)}${r.sub ? ` <em>(${esc(r.sub)})</em>` : ""}${h ? ` <b>— ${t("act_hidden", L)}</b>` : ""}</span>
          <button type="button" class="btn btn--sm ${h ? "btn--primary" : "btn--outline"}" data-act="toggle" data-key="${esc(r.key)}">${h ? t("act_show", L) : t("act_hide", L)}</button></li>`;
      }).join("") + `</ul>`;
    }
    return html + `</div>`;
  }

  /* Current actions (data.js → CURRENT_ACTIONS): date-windowed, bilingual */
  // Shown on the welcome screen (so everyone sees the promo before
  // starting) and again on the result screen, right before booking.
  function renderActions(){
    const wraps = [$("#actionsBlock"), $("#actionsBlockWelcome")].filter(Boolean);
    if (!wraps.length || typeof CURRENT_ACTIONS === "undefined") return;
    const wrap = { set innerHTML(html){ wraps.forEach(w => { w.innerHTML = html; w.hidden = !html.trim(); }); } };
    let today;
    try { today = seasonTodayKey(); } catch(e){ today = todayKey(); }   // preview: follows the chosen date
    const lang = state.lang;
    const hid = actHiddenSet();
    const offerTxt = actOfferText(hid);
    const active = activeActionsNow(today).filter(a => !hid.has("a:" + a.id) && !(a.dupWith && offerTxt && a.dupWith.test(offerTxt)));
    const fill = (txt, a) => actionFill(txt, a, lang);
    const card = a => `
      <div class="action-card${a.yearly ? " action-card--" + esc(a.id) : ""}">
        <span class="action-card__icon" aria-hidden="true">${a.icon || "🎁"}</span>
        <div class="action-card__body">
          <p class="action-card__title">${fill(a.title[lang] || a.title.nl, a)}</p>
          <p class="action-card__text">${fill(a.text[lang] || a.text.nl, a)}</p>
        </div>
      </div>`;
    let offers = "";
    try { offers = newsActionsCardHtml(); } catch(e){ offers = ""; }
    const inner = active.filter(a => a.yearly).map(card).join("") + offers + active.filter(a => !a.yearly).map(card).join("") + bhActsActive(today).map(card).join("");
    const manage = actSalon() ? actManageHtml(today) : "";
    wrap.innerHTML = (inner.trim() || manage) ? `<p class="actions-block__label">${t("actions_now_label", lang)}</p>` + inner + manage : "";
    wraps.forEach(w => w.querySelectorAll("[data-act]").forEach(b => b.addEventListener("click", actClick)));
    wraps.forEach(w => w.querySelectorAll("[data-offer-link]").forEach(x => x.addEventListener("click", () => trackEvent("offer-open"))));
    wraps.forEach(w => w.querySelectorAll("[data-offer-book]").forEach(x => x.addEventListener("click", () => trackEvent("offer-whatsapp"))));
  }
  // active actions today (yearly ones first); soldOut stops an action everywhere
  function activeActionsNow(today){
    if (typeof CURRENT_ACTIONS === "undefined") return [];
    return CURRENT_ACTIONS.filter(a => !a.soldOut).map(a => actionWindow(a, today)).filter(a => a && (!a.from || today >= a.from) && (!a.until || today <= a.until))
      .sort((x, y) => (y.yearly ? 1 : 0) - (x.yearly ? 1 : 0));
  }
  function actionFill(txt, a, lang){
    return String(txt || "").replace(/\{value\}/g, lang === "fr" ? String(a.value || "").replace("%", " %") : (a.value || ""))
      .replace(/\{treat\}/g, a.treat ? esc(a.treat[lang] || a.treat.nl) : "")
      .replace(/\{treat2\}/g, a.treat2 ? esc(a.treat2[lang] || a.treat2.nl) : "")
      .replace(/\{from\}/g, actionFmt(a.dealFrom, lang)).replace(/\{until\}/g, actionFmt(a.until, lang));
  }
  // yearly actions (e.g. Valentine): work out this year's weekends
  function actionWindow(a, today){
    if (!a.yearly) return a;
    const y = a.yearly, base = Number(today.slice(0, 4));
    const key = dt => `${dt.getUTCFullYear()}-${String(dt.getUTCMonth()+1).padStart(2,"0")}-${String(dt.getUTCDate()).padStart(2,"0")}`;
    const anchorMD = year => y.anchor === "mothersday" ? actionNthSunday(year, 5, 2)
      : y.anchor === "fathersday" ? actionNthSunday(year, 6, 2) : y.anchorMD;
    const win = year => {
      const [m, d] = anchorMD(year).split("-").map(Number);
      const anchor = new Date(Date.UTC(year, m - 1, d));
      const sat0 = new Date(anchor.getTime() - ((anchor.getUTCDay() + 1) % 7) * 864e5);   // Saturday of the Valentine weekend
      const first = new Date(sat0.getTime() - 7 * (y.weekendsBefore || 0) * 864e5);
      const last = new Date(sat0.getTime() + (7 * (y.weekendsAfter || 0) + 1) * 864e5);   // a Sunday
      return { from: key(new Date(first.getTime() - (y.showDaysBefore || 0) * 864e5)), dealFrom: key(first), until: key(last) };
    };
    let w = win(base), yr = base;
    if (today > w.until){ w = win(base + 1); yr = base + 1; }
    return Object.assign({}, a, w, { treat: actionMassage(a, yr), treat2: actionExtra(a, yr) });
  }
  function actionNthSunday(year, month, n){            // e.g. 2nd Sunday of May → "05-09"
    const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const day = 1 + ((7 - first) % 7) + 7 * (n - 1);
    return `${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  }
  // the one massage of this action for this year (changes every year by itself)
  function actionMassage(a, year){
    if (!a.massage || typeof ADVENT !== "object" || !ADVENT.autoFill) return null;
    const list = ADVENT.autoFill.massages.filter(x => !BC_UNAVAILABLE.has(x.id));
    if (!list.length) return null;
    const own = a.massage.byYear && a.massage.byYear[year];
    const m = (own && list.find(x => x.id === own)) || list[((year + (a.massage.offset || 0)) % list.length + list.length) % list.length];
    return m ? { nl:m.nl, en:m.en, fr:m.fr, id:m.id } : null;
  }
  // the one other (non-massage) treatment of this action for this year
  function actionExtra(a, year){
    if (!a.extra || typeof ACTION_EXTRA_TREATMENTS === "undefined" || !ACTION_EXTRA_TREATMENTS.length) return null;
    const list = ACTION_EXTRA_TREATMENTS.filter(x => !BC_UNAVAILABLE.has(x.id));
    if (!list.length) return null;
    const own = a.extra.byYear && a.extra.byYear[year];
    const x = (own && list.find(e => e.id === own)) || list[((year + (a.extra.offset || 0)) % list.length + list.length) % list.length];
    return x ? { nl:x.nl, en:x.en, fr:x.fr, id:x.id } : null;
  }
  function actionFmt(k, lang, withYear){
    if (!k) return "";
    const [y, m, d] = k.split("-").map(Number);
    const o = { weekday:"long", day:"numeric", month:"long" };
    if (withYear) o.year = "numeric";
    try { return new Date(y, m - 1, d).toLocaleDateString(lang === "fr" ? "fr-BE" : lang === "en" ? "en-GB" : "nl-BE", o); }
    catch(e){ return `${d}/${m}`; }
  }

  function renderResultBlocks(){
    renderSkinFact();
    renderActions();
    renderUpsell();
    renderHouseRulesTeaser();
    const wrap = $("#resultBlocks");
    const m = state.match;
    if (!m) { wrap.innerHTML = ""; return; }
    const lang = state.lang;
    const homecare = resolveHomecareText(m.homecarePick, lang);
    const soapTip = resolveHomecareText(m.soapPick, lang);
    let homecareBody = homecare
      ? `<p class="result-block__product">${homecare.productName}</p><p>${homecare.usage}</p>`
      : `<p>${t("homecare_generic_tip", lang)}</p>`;
    if (soapTip){
      homecareBody += `<p class="result-block__soaptip"><span class="result-block__product">${t("homecare_soap_tip_label", lang)} ${soapTip.productName}</span><br>${soapTip.usage}</p>`;
    }

    // extra sun-care reinforcement specifically for hair-removal treatments
    let aftercareText = m.treatment.aftercare[lang];
    const HAIR_REMOVAL_IDS = ["oksel","been","rug","buik","borst"];
    if (HAIR_REMOVAL_IDS.includes(m.treatment.id)) {
      const sunTip = lang === "nl"
        ? "<br><br>⚠️ <strong>Zonadvies:</strong> vermijd directe zon of het solarium 24 uur na het ontharen, en gebruik nadien een hoge SPF om roodheid en pigmentvlekken te voorkomen."
        : lang === "fr"
        ? window.SUN_TIP_FR
        : "<br><br>⚠️ <strong>Sun advice:</strong> avoid direct sun or a sunbed for 24 hours after hair removal, and use a high SPF afterwards to prevent redness and pigmentation.";
      aftercareText += sunTip;
    }

    const priceRow = m.treatment.price
      ? `<div class="result-block">
          <div class="result-block__head"><span class="result-block__icon">💶</span><span class="result-block__title">${t("block_price", lang)}</span></div>
          <div class="result-block__body"><p class="result-block__product">${m.treatment.price}</p></div>
        </div>`
      : "";

    const cautionRow = m.treatment.caution
      ? `<div class="result-block result-block--caution">
          <div class="result-block__head"><span class="result-block__icon">⚠️</span><span class="result-block__title">${t("block_caution", lang)}</span></div>
          <div class="result-block__body"><p>${m.treatment.caution[lang]}</p></div>
        </div>`
      : "";

    wrap.innerHTML = `
      ${cautionRow}
      <div class="result-block">
        <div class="result-block__head"><span class="result-block__icon">🌟</span><span class="result-block__title">${t("block_benefits", lang)}</span></div>
        <div class="result-block__body"><p>${m.treatment.benefits[lang]}</p></div>
      </div>
      <div class="result-block">
        <div class="result-block__head"><span class="result-block__icon">💡</span><span class="result-block__title">${t("block_funfact", lang)}</span></div>
        <div class="result-block__body"><p>${m.treatment.funfact[lang]}</p></div>
      </div>
      <div class="result-block">
        <div class="result-block__head"><span class="result-block__icon">📋</span><span class="result-block__title">${t("block_aftercare", lang)}</span></div>
        <div class="result-block__body"><p>${aftercareText}</p></div>
      </div>
      <div class="result-block${m.homecare ? "" : " result-block--muted"}">
        <div class="result-block__head"><span class="result-block__icon">🛍️</span><span class="result-block__title">${t("block_homecare", lang)}</span></div>
        <div class="result-block__body">${homecareBody}</div>
      </div>
      ${priceRow}`;
  }


  /* ---------------- canvas composite ---------------- */
  let logoImg = null;
  function loadLogo(){
    return new Promise(resolve => {
      if (logoImg) return resolve(logoImg);
      const img = new Image();
      img.onload = () => { logoImg = img; resolve(img); };
      img.src = "assets/logo-transparent.png";
    });
  }

  /* ---------------- manga filters (client-side only) ----------------
     "Manga" (black & white) and "Manga kleur" (colour). Both are computed
     in the browser: inked outlines, flat cel-shaded tones, dot screentone
     in the shadows, speed lines around the edges and a panel border.
     Nothing is uploaded. NB: a filter keeps the real face — it does not
     redraw it (no new anime eyes); that would need a generative AI model,
     i.e. an external, paid service. */
  function mangaBlur(input, w, h, sigma){
    const N = w * h, r = Math.max(1, Math.ceil(sigma * 2.5));
    const k = new Float32Array(2 * r + 1); let s = 0;
    for (let i = -r; i <= r; i++){ k[i + r] = Math.exp(-(i * i) / (2 * sigma * sigma)); s += k[i + r]; }
    for (let i = 0; i < k.length; i++) k[i] /= s;
    const tmp = new Float32Array(N), out = new Float32Array(N);
    for (let y = 0; y < h; y++){
      const row = y * w;
      for (let x = 0; x < w; x++){
        let v = 0;
        for (let i = -r; i <= r; i++){ const xx = x + i < 0 ? 0 : (x + i >= w ? w - 1 : x + i); v += input[row + xx] * k[i + r]; }
        tmp[row + x] = v;
      }
    }
    for (let y = 0; y < h; y++){
      for (let x = 0; x < w; x++){
        let v = 0;
        for (let i = -r; i <= r; i++){ const yy = y + i < 0 ? 0 : (y + i >= h ? h - 1 : y + i); v += tmp[yy * w + x] * k[i + r]; }
        out[y * w + x] = v;
      }
    }
    return out;
  }
  // box mean via an integral image: fast whatever the radius
  function mangaLocalMean(v, w, h, R){
    const integ = new Float64Array((w + 1) * (h + 1)), out = new Float32Array(w * h);
    for (let y = 0; y < h; y++){
      let rowSum = 0;
      for (let x = 0; x < w; x++){ rowSum += v[y * w + x]; integ[(y + 1) * (w + 1) + x + 1] = integ[y * (w + 1) + x + 1] + rowSum; }
    }
    for (let y = 0; y < h; y++){
      const y0 = Math.max(0, y - R), y1 = Math.min(h, y + R + 1);
      for (let x = 0; x < w; x++){
        const x0 = Math.max(0, x - R), x1 = Math.min(w, x + R + 1);
        out[y * w + x] = (integ[y1 * (w + 1) + x1] - integ[y0 * (w + 1) + x1] - integ[y1 * (w + 1) + x0] + integ[y0 * (w + 1) + x0]) / ((x1 - x0) * (y1 - y0));
      }
    }
    return out;
  }
  // shared analysis: luminance (auto-levelled), smoothed luminance, ink mask, local contrast
  function mangaAnalyse(src, w, h){
    const N = w * h, gray = new Float32Array(N);
    for (let i = 0, p = 0; p < N; i += 4, p++) gray[p] = (src[i] * 0.299 + src[i+1] * 0.587 + src[i+2] * 0.114) / 255;
    const hist = new Uint32Array(256);
    for (let p = 0; p < N; p++) hist[Math.min(255, (gray[p] * 255) | 0)]++;
    let lo = 0, hi = 255, acc = 0;
    for (let v = 0; v < 256; v++){ acc += hist[v]; if (acc > N * 0.01){ lo = v; break; } }
    acc = 0;
    for (let v = 255; v >= 0; v--){ acc += hist[v]; if (acc > N * 0.01){ hi = v; break; } }
    const range = Math.max(1, hi - lo) / 255, low = lo / 255;
    for (let p = 0; p < N; p++) gray[p] = Math.min(1, Math.max(0, (gray[p] - low) / range));
    const unit = Math.max(w, h) / 720;
    const smooth = mangaBlur(gray, w, h, 1.2 * unit);
    const g1 = mangaBlur(gray, w, h, 0.9 * unit), g2 = mangaBlur(gray, w, h, 1.44 * unit);
    const ink = new Uint8Array(N);
    for (let p = 0; p < N; p++) ink[p] = (g1[p] - 0.985 * g2[p]) < -0.009 ? 1 : 0;
    const local = mangaLocalMean(smooth, w, h, Math.round(22 * unit));
    const sorted = Float32Array.from(smooth).sort();
    return { gray, smooth, ink, local, unit, tBlack: sorted[Math.floor(N * 0.17)] };
  }
  // speed lines + panel border: returns true where the pixel must be ink-black
  function mangaDecorator(w, h, unit){
    const cx = w / 2, cy = h / 2, BUCKETS = 220, lines = [];
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    for (let b = 0; b < BUCKETS; b++){
      lines.push(rnd() < 0.55 ? { a:(b + rnd()) / BUCKETS * Math.PI * 2, w:0.0025 + rnd() * 0.006, r:0.78 + rnd() * 0.22 } : null);
    }
    const border = Math.max(3, Math.round(5 * unit)), margin = Math.max(3, Math.round(6 * unit));
    return function(x, y){
      const edge = Math.min(x, y, w - 1 - x, h - 1 - y);
      if (edge < margin) return "paper";
      if (edge < margin + border) return "ink";
      const nx = (x - cx) / cx, ny = (y - cy) / cy, rho = Math.sqrt(nx * nx + ny * ny);
      if (rho > 0.78){
        let ang = Math.atan2(ny, nx); if (ang < 0) ang += Math.PI * 2;
        const b = Math.floor(ang / (Math.PI * 2) * BUCKETS) % BUCKETS;
        for (let o = -1; o <= 1; o++){
          const L = lines[(b + o + BUCKETS) % BUCKETS];
          if (!L || rho <= L.r) continue;
          let da = Math.abs(ang - L.a); if (da > Math.PI) da = Math.PI * 2 - da;
          if (da < L.w * Math.min(1, (rho - L.r) / 0.35)) return "ink";
        }
      }
      return null;
    };
  }
  function screentoneDot(x, y, cell, radius){
    const c = Math.SQRT1_2, u = (x + y) * c / cell, t = (y - x) * c / cell;
    const du = u - Math.round(u), dt = t - Math.round(t);
    return Math.sqrt(du * du + dt * dt) < radius;
  }

  // black & white manga
  function mangaPixels(src, w, h){
    const A = mangaAnalyse(src, w, h), N = w * h, out = new Uint8ClampedArray(N * 4);
    const cell = Math.max(3, Math.round(4 * A.unit)), deco = mangaDecorator(w, h, A.unit);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){
      const p = y * w + x, v = A.smooth[p], dv = v - A.local[p];
      let black;
      if (A.ink[p] || v < A.tBlack) black = true;
      else if (dv > -0.035) black = false;
      else black = screentoneDot(x, y, cell, dv < -0.13 ? 0.52 : (dv < -0.07 ? 0.38 : 0.24));
      const d = deco(x, y);
      if (d === "ink") black = true; else if (d === "paper") black = false;
      const i = p * 4;
      out[i] = black ? 20 : 250; out[i+1] = black ? 20 : 250; out[i+2] = black ? 22 : 246; out[i+3] = 255;
    }
    return out;
  }

  // colour manga / anime look: flat cel-shaded colours + ink + screentone shadows
  function mangaColorPixels(src, w, h){
    const A = mangaAnalyse(src, w, h), N = w * h, out = new Uint8ClampedArray(N * 4);
    const cell = Math.max(3, Math.round(4 * A.unit)), deco = mangaDecorator(w, h, A.unit);
    // smooth each colour channel so skin and sky become flat areas
    const ch = [new Float32Array(N), new Float32Array(N), new Float32Array(N)];
    for (let p = 0, i = 0; p < N; p++, i += 4){ ch[0][p] = src[i]; ch[1][p] = src[i+1]; ch[2][p] = src[i+2]; }
    const sm = ch.map(c => mangaBlur(c, w, h, 2.4 * A.unit));
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++){
      const p = y * w + x, i = p * 4, v = A.smooth[p], dv = v - A.local[p];
      let r = sm[0][p], g = sm[1][p], b = sm[2][p];
      // clean, slightly brighter colours (anime look), gentle saturation boost
      const L = r * 0.299 + g * 0.587 + b * 0.114;
      r = L + (r - L) * 1.18; g = L + (g - L) * 1.18; b = L + (b - L) * 1.18;
      const lift = Math.pow(Math.max(0.02, L / 255), 0.78) / Math.max(0.02, L / 255);
      r *= lift; g *= lift; b *= lift;
      // flat colour areas: snap every channel to 10 steps
      r = Math.round(r / 25.5) * 25.5; g = Math.round(g / 25.5) * 25.5; b = Math.round(b / 25.5) * 25.5;
      // cel shadow: only where it is clearly darker than its surroundings
      if (dv < -0.05){ r *= 0.8; g *= 0.78; b *= 0.84; }
      // deepest shadows / hair → near-black ink with a hint of the colour
      if (v < A.tBlack * 0.8){ r = r * 0.15 + 14; g = g * 0.15 + 12; b = b * 0.15 + 16; }
      // screentone dots in the darker cast shadows
      else if (dv < -0.1 && screentoneDot(x, y, cell, dv < -0.16 ? 0.42 : 0.3)){ r *= 0.62; g *= 0.62; b *= 0.66; }
      let ink = A.ink[p] === 1;
      const d = deco(x, y);
      if (d === "ink") ink = true;
      if (d === "paper"){ out[i] = 250; out[i+1] = 250; out[i+2] = 246; out[i+3] = 255; continue; }
      if (ink){ r = 22; g = 18; b = 24; }
      out[i] = r; out[i+1] = g; out[i+2] = b; out[i+3] = 255;
    }
    return out;
  }

  // "cartoon" is the old id of the black & white manga filter (label "Manga");
  // "mangacolor" is the colour version (label "Manga kleur").
  function isMangaFilter(id){ return id === "cartoon" || id === "mangacolor"; }
  function mangaLiveCss(id){
    return id === "mangacolor" ? "saturate(1.3) contrast(1.25) brightness(1.05)" : "grayscale(1) contrast(1.7) brightness(1.05)";
  }
  function applyCartoonEffect(img, filterId){
    const MAX_DIM = 900;
    const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    const isColor = filterId === "mangacolor";
    const px = isColor ? mangaColorPixels(data, w, h) : mangaPixels(data, w, h);
    ctx.putImageData(new ImageData(px, w, h), 0, 0);
    return isColor ? c.toDataURL("image/jpeg", 0.92) : c.toDataURL("image/png");
  }

  function getCartoonDataUrl(){
    return new Promise(resolve => {
      if (!state.photoDataUrl || !isMangaFilter(state.filter)){ resolve(null); return; }
      const filterId = state.filter, src = state.photoDataUrl;
      if (cartoonCache.sourceUrl === src && cartoonCache.filterId === filterId){ resolve(cartoonCache.resultUrl); return; }
      const img = new Image();
      img.onload = () => {
        // let the browser paint first, then do the heavy pixel work
        setTimeout(() => {
          const result = applyCartoonEffect(img, filterId);
          cartoonCache.sourceUrl = src; cartoonCache.filterId = filterId; cartoonCache.resultUrl = result;
          resolve(result);
        }, 30);
      };
      img.src = src;
    });
  }

  function roundRect(ctx, x, y, w, h, r){
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.arcTo(x+w, y, x+w, y+h, r);
    ctx.arcTo(x+w, y+h, x, y+h, r);
    ctx.arcTo(x, y+h, x, y, r);
    ctx.arcTo(x, y, x+w, y, r);
    ctx.closePath();
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight){
    const words = text.split(" ");
    let line = "";
    let lines = [];
    words.forEach(w => {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line){
        lines.push(line); line = w;
      } else line = test;
    });
    if (line) lines.push(line);
    lines.forEach((l,i) => ctx.fillText(l, x, y + i*lineHeight));
    return lines.length;
  }

  // No selfie? Then the photo of the matched drink becomes the background.
  function drawDrinkBackground(ctx, W, H){
    const m = state.match;
    if (!m || m.isKid || (!m.drink && !m.drinkPhoto)) return Promise.resolve(false);
    const photo = drinkPhotoFor(m);
    if (!photo) return Promise.resolve(false);
    return new Promise(res => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.max(W/img.width, H/img.height);
        const dw = img.width*scale, dh = img.height*scale;
        ctx.drawImage(img, (W-dw)/2, (H-dh)/2, dw, dh);
        res(true);
      };
      img.onerror = () => res(false);
      img.src = photo;
    });
  }

  async function drawResultCanvas(){
    // 1080 x 1920 = 9:16, the exact size of an Instagram/Facebook/WhatsApp story
    const out = state.quickPhoto ? $("#quickCanvas") : $("#resultCanvas");
    const W = 1080, H = 1920;
    const TOP = 150, BOTTOM = 210;   // Instagram story safe zones (profile bar on top, reply bar below)
    out.width = W; out.height = H;
    const ctx = out.getContext("2d");

    if (state.photoDataUrl){
      const isCartoon = isMangaFilter(state.filter);
      const sourceUrl = isCartoon ? (await getCartoonDataUrl()) || state.photoDataUrl : state.photoDataUrl;
      await new Promise(res => {
        const img = new Image();
        img.onload = () => {
          // 1) background: the same photo, cover-scaled and softly blurred
          //    (tiny canvas scaled up = blur that works in every browser)
          const cover = Math.max(W/img.width, H/img.height);
          const tiny = document.createElement("canvas"); tiny.width = 27; tiny.height = 48;
          const tctx = tiny.getContext("2d");
          tctx.drawImage(img, (27 - img.width*cover*27/W)/2, (48 - img.height*cover*48/H)/2, img.width*cover*27/W, img.height*cover*48/H);
          // scale up in two smooth steps so it looks blurred, not blocky
          const mid = document.createElement("canvas"); mid.width = 216; mid.height = 384;
          const mctx = mid.getContext("2d"); mctx.imageSmoothingEnabled = true; mctx.imageSmoothingQuality = "high";
          mctx.drawImage(tiny, 0, 0, 216, 384);
          ctx.save(); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
          ctx.drawImage(mid, 0, 0, W, H);
          ctx.fillStyle = "rgba(20,14,10,0.25)"; ctx.fillRect(0, 0, W, H);
          // 2) the whole photo on top: no hard zoom/crop of the face
          const fit = Math.min(W/img.width, (H*0.82)/img.height);
          const dw = img.width*fit, dh = img.height*fit;
          if (!isCartoon && FILTERS[state.filter]){ ctx.filter = FILTERS[state.filter]; }
          ctx.drawImage(img, (W-dw)/2, Math.max(0, (H-dh)/2 - H*0.06), dw, dh);
          ctx.restore();
          res();
        };
        img.src = sourceUrl;
      });
    } else if (await drawDrinkBackground(ctx, W, H)){
      // the drink's own photo fills the card (no selfie taken)
    } else {
      const grad = ctx.createLinearGradient(0,0,0,H);
      grad.addColorStop(0,"#D8CEC0"); grad.addColorStop(1,"#C7BAA6");
      ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);
      // decorative bean pattern for the "saved for later" tile
      ctx.save();
      ctx.globalAlpha = 0.12;
      for (let i=0;i<10;i++){
        ctx.save();
        ctx.translate(90 + (i%4)*280, 220 + Math.floor(i/4)*380);
        ctx.rotate(0.35);
        ctx.fillStyle = "#241A14";
        ctx.beginPath();
        ctx.ellipse(0,0,55,80,0,0,Math.PI*2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }

    // dark fade at the bottom, strong enough to read white text on any photo
    const scrim = ctx.createLinearGradient(0,H*0.45,0,H);
    scrim.addColorStop(0,"rgba(20,14,10,0)");
    scrim.addColorStop(0.35,"rgba(20,14,10,0.72)");
    scrim.addColorStop(1,"rgba(20,14,10,0.92)");
    ctx.fillStyle = scrim; ctx.fillRect(0,H*0.45,W,H*0.55);

    // soft dark band behind the logo, so it stays readable on a bright photo
    const topScrim = ctx.createLinearGradient(0, 0, 0, TOP + 220);
    topScrim.addColorStop(0, "rgba(20,14,10,0.55)");
    topScrim.addColorStop(1, "rgba(20,14,10,0)");
    ctx.fillStyle = topScrim; ctx.fillRect(0, 0, W, TOP + 220);
    const logo = await loadLogo();
    const logoSize = 96;
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.drawImage(logo, 40, TOP, logoSize, logoSize);
    ctx.restore();
    ctx.fillStyle = "#F6F0E6";
    ctx.font = "600 34px 'Playfair Display', Georgia, serif";
    ctx.textBaseline = "middle";
    ctx.fillText("Beauty & Coffee", 40+logoSize+18, TOP+logoSize/2-10);
    ctx.font = "italic 20px 'Playfair Display', Georgia, serif";
    ctx.fillStyle = "rgba(246,240,230,0.85)";
    ctx.fillText(t("overlay_tagline", state.lang) + " · Mechelen", 40+logoSize+18, TOP+logoSize/2+22);

    const m = state.match;
    if (m){
      const ql = m.quick ? quickLabels(m) : null;
      const drinkFull = ql ? ql.drink : m.isKid
        ? (KIDS_DRINKS.find(d => d.id === m.drinkId) || KIDS_DRINKS[0]).name[state.lang]
        : (!m.drink ? "" : (m.drink.origin ? [m.drink.origin, trName(m.drink.name, state.lang)].join(" — ") : trName(m.drink.name, state.lang)));
      const pad = 44;
      let y = H - BOTTOM - 300;

      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "#D9AE6C";
      ctx.font = "600 30px 'Playfair Display', Georgia, serif";
      ctx.fillText(t(m.quick ? "overlay_moment_title" : "overlay_title", state.lang), pad, y);
      y += 52;

      ctx.fillStyle = "#F6F0E6";
      ctx.font = "500 30px Jost, Arial, sans-serif";
      if (drinkFull){
        const drinkLine = t("overlay_drink_prefix", state.lang) + drinkFull;
        y += (wrapText(ctx, drinkLine, pad, y, W-pad*2, 38) -1) * 38;
        y += 50;
      }

      ctx.font = "500 30px Jost, Arial, sans-serif";
       const treatName = ql ? ql.treat : typeof m.treatment.name === "object" 
  ? (m.treatment.name[state.lang] || m.treatment.name.nl) 
  : trName(m.treatment.name, state.lang);
       const treatLine = t("overlay_treatment_prefix", state.lang) + treatName;
       wrapText(ctx, treatLine, pad, y, W-pad*2, 38);
    }

    // thin, stylish gold frame
    ctx.save();
    ctx.strokeStyle = "rgba(217,174,108,0.85)"; ctx.lineWidth = 4;
    roundRect(ctx, 18, 18, W - 36, H - 36, 28); ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "rgba(246,240,230,0.7)";
    ctx.font = "italic 21px 'Playfair Display', Georgia, serif";
    ctx.fillText("Where Beauty Meets Coffee", 44, H - BOTTOM - 72);
    // Instagram handle on the image itself: Instagram (story/post) ignores any
    // caption sent along via the share menu, so the tag must be in the picture.
    const igHandle = socialHandle();
    if (igHandle){
      ctx.save();
      ctx.textAlign = "right"; ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(246,240,230,0.92)";
      ctx.font = "600 22px Jost, Arial, sans-serif";
      ctx.fillText("📸 " + igHandle, W - 44, H - BOTTOM - 72);
      ctx.restore();
    }

    // Site link — drawn in its own high-contrast pill so it always survives
    // sharing (WhatsApp and friends often strip any caption text you send).
    ctx.font = "600 24px Jost, Arial, sans-serif";
    const linkText = "🔗 " + SITE_URL_DISPLAY;
    const linkWidth = ctx.measureText(linkText).width;
    const pillPadX = 20, pillH = 44, pillY = H - BOTTOM - 56;
    roundRect(ctx, 44, pillY, linkWidth + pillPadX*2, pillH, pillH/2);
    ctx.fillStyle = "#D9AE6C";
    ctx.fill();
    ctx.fillStyle = "#241A14";
    ctx.textBaseline = "middle";
    ctx.fillText(linkText, 44 + pillPadX, pillY + pillH/2 + 1);
  }

  /* ---------------- share / download ---------------- */
  const SITE_URL = window.location.origin + window.location.pathname;
  const SITE_URL_DISPLAY = (window.location.hostname + window.location.pathname).replace(/\/index\.html$/, "").replace(/\/$/, "");

  function canvasToBlob(){
    return new Promise(res => (state.quickPhoto ? $("#quickCanvas") : $("#resultCanvas")).toBlob(res, "image/jpeg", 0.95));
  }

  async function downloadImage(){
    const blob = await canvasToBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "beauty-and-coffee-match.jpg";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);   // revoking at once can break the download on some phones
    showToast(t("toast_downloaded", state.lang));
    trackEvent("download");
  }

  async function shareImage(){
    const blob = await canvasToBlob();
    const file = new File([blob], "beauty-and-coffee-match.jpg", { type:"image/jpeg" });
    // The site link is drawn onto the image itself (see drawResultCanvas) because
    // several share targets, WhatsApp included, drop accompanying text when an
    // image file is shared — the caption text/url below is a bonus for apps that
    // do keep it (Telegram, Signal, Mail, ...), not the only way the link travels.
    const handle = socialHandle();
    const shareText = t("share_text", state.lang) + (handle ? ` ${handle} #beautyandcoffeemechelen` : "") + " " + SITE_URL;
    if (navigator.canShare && navigator.canShare({ files:[file] })){
      try { await navigator.share({ files:[file], title:"Beauty & Coffee", text: shareText, url: SITE_URL }); }
      catch(err){ /* user cancelled */ }
      trackEvent("share");
    } else if (navigator.share){
      try { await navigator.share({ title:"Beauty & Coffee", text: shareText, url: SITE_URL }); }
      catch(err){ /* user cancelled */ }
      trackEvent("share");
    } else {
      showToast(t("toast_share_unsupported", state.lang));
      downloadImage();
    }
  }

  /* ---------------- "Installeer als app" banner ---------------- */
  let deferredInstallPrompt = null;
  function isStandalone(){
    return window.matchMedia && window.matchMedia("(display-mode: standalone)").matches
      || window.navigator.standalone === true; // legacy iOS Safari flag
  }
  function daysSince(iso){
    if (!iso) return Infinity;
    return (Date.now() - new Date(iso).getTime()) / 86400000;
  }
  function maybeShowInstallBanner(){
    if (isStandalone()) return; // already installed / running as an app
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    if (deferredInstallPrompt){
      if (daysSince(localData.installDismissedAt) < 14) return;
      const el = $("#installBanner");
      if (el) el.hidden = false;
    } else if (isIos){
      // iOS never fires beforeinstallprompt — show manual "Add to Home Screen" instructions instead.
      if (daysSince(localData.installIosDismissedAt) < 14) return;
      const el = $("#installBannerIOS");
      if (el) el.hidden = false;
    }
  }
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    maybeShowInstallBanner();
  });
  window.addEventListener("appinstalled", () => {
    trackEvent("app-installed");
    const el = $("#installBanner"); if (el) el.hidden = true;
  });
  async function installApp(){
    const el = $("#installBanner");
    if (!deferredInstallPrompt){ if (el) el.hidden = true; return; }
    if (el) el.hidden = true;
    deferredInstallPrompt.prompt();
    try {
      const choice = await deferredInstallPrompt.userChoice;
      trackEvent(choice.outcome === "accepted" ? "install-accepted" : "install-dismissed");
    } catch(e){ /* ignore */ }
    deferredInstallPrompt = null;
  }
  function dismissInstallBanner(){
    localData.installDismissedAt = new Date().toISOString();
    saveLocalData();
    const el = $("#installBanner"); if (el) el.hidden = true;
  }
  function dismissInstallBannerIOS(){
    localData.installIosDismissedAt = new Date().toISOString();
    saveLocalData();
    const el = $("#installBannerIOS"); if (el) el.hidden = true;
  }

  /* ---------------- upsell card (result screen) ---------------- */
  function renderUpsell(){
    const wrap = $("#upsellCard");
    if (!wrap) return;
    const m = state.match;
    const sug = (m && !m.isKid && typeof UPSELL_SUGGESTIONS !== "undefined") ? UPSELL_SUGGESTIONS[m.treatment.id] : null;
    if (!sug){ wrap.innerHTML = ""; return; }
    const lang = state.lang;
    wrap.innerHTML = `
      <span class="upsell-card__icon" aria-hidden="true">✨</span>
      <span class="upsell-card__text">${sug[lang] || sug.nl}</span>
      ${sug.price ? `<span class="upsell-card__price">${sug.price}</span>` : ""}`;
  }

  /* ---------------- newsletter signup ----------------
     With NEWSLETTER_URL (data.js) filled in, the card shows one button to
     the WordPress newsletter page (proper list, double opt-in, unsubscribe
     link). Without it, the old ready-made-email fallback stays. */
  function setupNewsletterCard(){
    const url = (typeof NEWSLETTER_URL === "string") ? NEWSLETTER_URL.trim() : "";
    const link = $("#newsletterWebLink"), form = $("#newsletterForm");
    const note = document.querySelector('.newsletter-card__note');
    if (!url || !link) return;
    link.href = url; link.hidden = false;
    if (form) form.hidden = true;
    if (note) note.setAttribute("data-i18n", "newsletter_web_note");
    link.addEventListener("click", () => trackEvent("newsletter-web"));
  }
  /* ---------------- news card (latest WordPress posts) ----------------
     Reads the public WordPress.com REST API straight from the browser
     (no backend, no key). The last result is kept in localStorage so the
     card still shows something offline. Any error → card stays hidden. */
  const NEWS_CACHE_KEY = "bc_news_cache_v3";
  const news = { posts: null, offline: false };

  function newsText(html){
    // titles/excerpts come as HTML: turn them into plain text (no markup is ever injected)
    const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  }
  function newsShorten(txt, max){
    if (txt.length <= max) return txt;
    const cut = txt.slice(0, max);
    return cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 20)).replace(/[\s,.;:–-]+$/, "") + "…";
  }
  function newsSafeUrl(u){
    try { const url = new URL(u); return url.protocol === "https:" ? url.href : ""; } catch(e){ return ""; }
  }
  /* ---------------- Google reviews ("Wat klanten zeggen") ---------------- */
  function renderReviewsCard(){
    const card = $("#reviewsCard"), body = $("#reviewsBody");
    if (!card || !body || typeof GOOGLE_REVIEWS === "undefined" || !GOOGLE_REVIEWS.items.length){ if (card) card.hidden = true; return; }
    const lang = state.lang, G = GOOGLE_REVIEWS;
    const stars = n => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
    const rating = lang === "en" ? G.rating.toFixed(1) : G.rating.toFixed(1).replace(".", ",");
    body.innerHTML = `
      <p class="reviews-card__summary"><span class="reviews-card__stars" aria-hidden="true">${stars(Math.round(G.rating))}</span>
        ${t("reviews_summary", lang).replace("{rating}", rating).replace("{count}", G.count)}</p>
      <div class="reviews-card__list">
        ${G.items.map(r => `
          <figure class="review-quote">
            <div class="review-quote__stars" aria-label="${r.stars}/5">${stars(r.stars)}</div>
            <blockquote>“${r.text}”</blockquote>
            <figcaption>— ${r.name}${r.topic ? ` · <span>${r.topic}</span>` : ""}</figcaption>
          </figure>`).join("")}
      </div>
      <p class="reviews-card__note">${t("reviews_selection", lang)}${lang !== "nl" ? " " + t("reviews_original_lang", lang) : ""}</p>
      <div class="reviews-card__buttons">
        <a class="btn btn--outline" href="${G.allUrl}" target="_blank" rel="noopener noreferrer" data-review="all">${t("reviews_all", lang)}</a>
        <a class="btn btn--primary" href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener noreferrer" data-review="write">${t("reviews_write", lang)}</a>
      </div>`;
    card.hidden = false;
    body.querySelectorAll("[data-review]").forEach(a => a.addEventListener("click", () => trackEvent("reviews-" + a.dataset.review)));
  }

  /* ---- actions & specials from WordPress (since v93) ----
     Every post is classified once when it is loaded: an "action" (category
     or tag from NEWS_FEED.specials, or action words in the title/intro) and
     recent enough → shown at the top of the start screen with badges
     (discount, price, how many left, "Op = Op") and a clear booking button.
     Everything else → "Leestips & blog" at the bottom. */
  function newsCfg(){ return (typeof NEWS_FEED === "object" && NEWS_FEED) ? NEWS_FEED : {}; }
  function newsFacts(p){
    const text = [p.title, p.excerpt, p.body].join(" ");
    const f = {};
    const pct = text.match(/(\d{1,2})\s?%/); if (pct) f.pct = Number(pct[1]);
    const prices = [];
    const re = /€\s?(\d{1,4}(?:[.,]\d{2})?)|(\d{1,4}(?:[.,]\d{2})?)\s?€/g; let m;
    while ((m = re.exec(text)) && prices.length < 6){
      const v = parseFloat(String(m[1] || m[2]).replace(",", "."));
      if (v > 0 && !prices.includes(v)) prices.push(v);
    }
    if (prices.length){
      // "€65 → €58,50" when one price is the other minus the discount
      let pair = null;
      if (f.pct) for (const hi of prices) for (const lo of prices)
        if (lo < hi && Math.abs(hi * (1 - f.pct / 100) - lo) < 0.06) pair = [hi, lo];
      f.prices = pair || [Math.min(...prices)];
      f.pricePair = !!pair;
      f.manyPrices = !pair && prices.length > 1;
    }
    const left = text.match(/(?:nog|exact|laatste|slechts|maar|only|encore|derniers?)\s*:?\s*(\d{1,3})\b/i)
      || text.match(/\b(\d{1,3})\s+(?:plekjes|plaatsen|beschikbaar|spots|places)\b/i);
    if (left && Number(left[1]) > 0 && Number(left[1]) < 200) f.left = Number(left[1]);
    if (/op\s*=\s*op/i.test(text)) f.opop = true;
    return f;
  }
  function newsIsAction(p){
    const sp = newsCfg().specials || {};
    const cats = (sp.categories || []).map(c => String(c).toLowerCase());
    const labels = (p.labels || []).map(c => String(c).toLowerCase());
    if (labels.some(l => cats.includes(l))) return true;
    const words = sp.words instanceof RegExp ? sp.words : /\b(actie|aanbod|korting)\b|\d{1,2}\s?%|op\s*=\s*op/i;
    return words.test(String(p.title || "") + " " + String(p.excerpt || ""));
  }
  function newsSplit(){
    const sp = newsCfg().specials || {}, maxAge = (sp.maxAgeDays || 45) * 86400000;
    let now; try { now = new Date(seasonTodayKey() + "T12:00:00").getTime(); } catch(e){ now = Date.now(); }
    const posts = news.posts || [], specials = [], blog = [];
    posts.forEach(p => {
      const age = now - new Date(p.date).getTime();
      if (p.action && !(age > maxAge) && specials.length < (sp.max || 3)) specials.push(p); else blog.push(p);
    });
    return { specials, blog: blog.slice(0, Math.min(5, Math.max(1, parseInt(newsCfg().count, 10) || 3))) };
  }
  const newsPlainTitle = tt => String(tt || "").replace(/^[\p{Extended_Pictographic}️‍\s]+/u, "").trim();
  function newsDate(p){
    const d = new Date(p.date); if (isNaN(d)) return "";
    const locale = { nl:"nl-BE", en:"en-GB", fr:"fr-BE" }[state.lang] || "nl-BE";
    return d.toLocaleDateString(locale, { day:"numeric", month:"long", year:"numeric" });
  }
  /* One short line per action for the "Lopende acties" card:
     - your own WordPress "Samenvatting" (excerpt) if it is short (≤ 140
       characters) and has a price → shown exactly as you wrote it;
     - otherwise lines like "Hydraterende Herfstboost – € 69" in the post,
       or "Normale prijs: € 65" + "Actieprijs: € 58,50" → "€58,50 i.p.v. €65". */
  function newsOffer(html, excerptText, title){
    const o = { items:[], oldP:null, newP:null, own:"" };
    const ex = String(excerptText || "").trim();
    if (ex && ex.length <= 140 && /€|\d\s?€/.test(ex)) o.own = ex;
    let lines = [];
    try {
      const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
      lines = [...doc.querySelectorAll("p, li, h2, h3, h4")].map(e => (e.textContent || "").replace(/\s+/g, " ").trim()).filter(Boolean);
    } catch(e){}
    const num = v => parseFloat(String(v).replace(",", "."));
    lines.forEach(l => {
      const m = l.match(/^(.{3,70}?)\s*[–—:\-]\s*€\s?(\d{1,4}(?:[.,]\d{2})?)/) || l.match(/^(.{3,70}?)\s*[–—:\-]\s*(\d{1,4}(?:[.,]\d{2})?)\s?€/);
      if (!m) return;
      const label = m[1].replace(/[\p{Extended_Pictographic}️‍]/gu, "").replace(/^[\s•·\-–\d.]+/, "").trim();
      const v = num(m[2]);
      if (/^(normale|gewone|oude|reguliere)\s+prijs|^prijs\b|^normal price|^prix normal/i.test(label)) o.oldP = v;
      else if (/actieprijs|promoprijs|nu\b|action price|prix promo/i.test(label)) o.newP = v;
      else if (o.items.length < 4 && !o.items.some(x => x.n === label)) o.items.push({ n: label.replace(/\s*\(.*\)\s*$/, ""), p: v });
    });
    return o;
  }
  function newsShortTitle(tt){
    let x = newsPlainTitle(tt);
    x = x.replace(/^[^:]{2,28}:\s*/, "");            // "Eenmalig aanbod: …" → "…"
    x = x.replace(/\s*\([^)]*\)\s*!?$/, "");          // drop "(met 10% korting!)"
    x = x.replace(/^(laatste|nog|de laatste)\s+\d*\s*/i, "").replace(/\s+(behandelingen|behandeling)$/i, "");
    return x.trim();
  }
  function newsEur(v){
    const L = state.lang, n = Number.isInteger(v) ? String(v) : v.toFixed(2).replace(".", L === "en" ? "." : ",");
    return L === "fr" ? n + " €" : "€" + n;
  }
  function newsOfferLine(p){
    const L = state.lang, o = p.offer || {}, f = p.facts || {};
    if (o.own) return { name:"", rest: o.own };
    const extra = [];
    if (f.left) extra.push(t("specials_left_short", L).replace("{n}", f.left));
    if (f.opop && !f.left) extra.push("Op = Op");
    if (o.items && o.items.length){
      return { name:"", rest: o.items.map(x => `<b>${esc(x.n)}</b> ${newsEur(x.p)}`).join(" · ") + (extra.length ? " · " + extra.join(" · ") : ""), html:true };
    }
    let price = "";
    if (o.newP && o.oldP) price = t("specials_instead", L).replace("{new}", newsEur(o.newP)).replace("{old}", newsEur(o.oldP));
    else if (f.pricePair) price = t("specials_instead", L).replace("{new}", newsEur(f.prices[1])).replace("{old}", newsEur(f.prices[0]));
    else if (f.prices) price = f.manyPrices ? t("specials_from", L).replace("{p}", newsEur(f.prices[0])) : newsEur(f.prices[0]);
    else if (f.pct) price = "−" + f.pct + (L === "fr" ? " %" : "%");
    return { name: newsShortTitle(p.title), rest: [price].concat(extra).filter(Boolean).join(" · ") };
  }
  // the card itself (HTML), shown with the other action cards (welcome + result)
  function newsActionsCardHtml(){
    if (typeof news === "undefined" || !news.posts) return "";
    const hidP = actHiddenSet();
    const specials = newsSplit().specials.filter(p => !hidP.has("p:" + p.url));
    if (!specials.length) return "";
    const L = state.lang;
    const rows = specials.map(p => {
      const safe = newsSafeUrl(p.url); if (!safe) return "";
      const ln = newsOfferLine(p);
      const body = ln.html ? ln.rest : esc(ln.rest);
      return `<li class="offer-line">${ln.name ? `<b>${esc(ln.name)}</b>${body ? " — " : ""}` : ""}${body}
        <a class="offer-line__more" href="${esc(safe)}" target="_blank" rel="noopener noreferrer" data-offer-link>${t("specials_more", L)}</a></li>`;
    }).join("");
    if (!rows) return "";
    const wa = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(t("specials_wa_text_any", L))}`;
    return `
      <div class="action-card action-card--offers">
        <span class="action-card__icon" aria-hidden="true">🍂</span>
        <div class="action-card__body">
          <p class="action-card__title">${t("specials_title", L)}</p>
          <ul class="offer-lines">${rows}</ul>
          ${typeof ONLINE_BOOKING_URL !== "undefined" && ONLINE_BOOKING_URL ? `<a class="offer-book" href="${esc(ONLINE_BOOKING_URL)}" target="_blank" rel="noopener noreferrer" data-action="online-book" data-online-src="offers">${t("specials_book_online", L)}</a> · ` : ""}<a class="offer-book" href="${wa}" target="_blank" rel="noopener noreferrer" data-offer-book>${t("specials_book", L)}</a>
        </div>
      </div>`;
  }
  function renderNewsCard(){
    const { blog } = newsSplit();
    renderActions();   // the short "Lopende acties" summary lives with the other action cards
    try { if (typeof renderPriceList === "function" && document.querySelector("#priceListBody")) renderPriceList(); } catch(e){}   // price list shows the same offers (v196)
    const card = $("#newsCard"), list = $("#newsList");
    if (!card || !list) return;
    if (!blog.length){ card.hidden = true; return; }
    list.textContent = "";
    blog.forEach(p => {
      const a = document.createElement("a");
      const safe = newsSafeUrl(p.url); if (!safe) return;
      a.className = "news-item"; a.href = safe; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.addEventListener("click", () => trackEvent("news-open"));
      if (p.img){
        const img = document.createElement("img");
        img.className = "news-item__img"; img.src = newsSafeUrl(p.img); img.alt = ""; img.loading = "lazy";
        img.addEventListener("error", () => img.remove());
        a.appendChild(img);
      }
      const body = document.createElement("div"); body.className = "news-item__body";
      const date = newsDate(p);
      if (date){ const d = document.createElement("p"); d.className = "news-item__date"; d.textContent = date; body.appendChild(d); }
      const title = document.createElement("p"); title.className = "news-item__title"; title.textContent = p.title;
      body.appendChild(title);
      if (p.excerpt){
        const ex = document.createElement("p"); ex.className = "news-item__excerpt"; ex.textContent = newsShorten(p.excerpt, 140);
        body.appendChild(ex);
      }
      const more = document.createElement("span"); more.className = "news-item__more";
      more.textContent = (t("news_read_more", state.lang) || "Lees meer") + " →";
      body.appendChild(more);
      a.appendChild(body);
      list.appendChild(a);
    });
    if (news.offline){
      const n = document.createElement("p"); n.className = "news-card__note";
      n.textContent = t("news_offline", state.lang) || "";
      list.appendChild(n);
    }
    card.hidden = false;
  }
  function setupNewsCard(){
    const cfg = newsCfg();
    if (!cfg || !cfg.site || !$("#newsCard")) return;
    const site = String(cfg.site).replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const count = Math.min(20, Math.max(3, parseInt(cfg.fetch, 10) || 12));
    const all = $("#newsAllLink");
    if (all){
      const own = newsSafeUrl(cfg.allUrl || "");
      all.href = own || ("https://" + site + "/" + (cfg.category ? "category/" + encodeURIComponent(cfg.category) + "/" : ""));
      all.addEventListener("click", () => trackEvent("news-all"));
    }
    try {
      const cached = JSON.parse(localStorage.getItem(NEWS_CACHE_KEY) || "null");
      if (cached && Array.isArray(cached.posts)) { news.posts = cached.posts; renderNewsCard(); }
    } catch(e){}
    // Two routes to the same posts: if a browser/ad blocker stops the first,
    // the second (the site's own address) usually still gets through.
    const cat = cfg.category ? encodeURIComponent(cfg.category) : "";
    const names = o => o && typeof o === "object" ? Object.keys(o).concat(Object.values(o).map(v => v && v.slug).filter(Boolean)) : [];
    const routes = [
      { name: "wpcom-v1.1",
        url: "https://public-api.wordpress.com/rest/v1.1/sites/" + encodeURIComponent(site) +
             "/posts/?number=" + count + (cat ? "&category=" + cat : "") +
             "&fields=ID,title,URL,date,excerpt,content,featured_image,categories,tags",
        parse: data => (data && Array.isArray(data.posts) ? data.posts : []).map(p => ({
          title: p.title, url: p.URL, date: p.date, excerpt: p.excerpt, body: p.content, img: p.featured_image,
          labels: names(p.categories).concat(names(p.tags)) })) },
      { name: "site-wp-v2",
        url: "https://" + site + "/wp-json/wp/v2/posts?per_page=" + count +
             "&_fields=title,link,date,excerpt,content,jetpack_featured_media_url",
        parse: data => (Array.isArray(data) ? data : []).map(p => ({
          title: p.title && p.title.rendered, url: p.link, date: p.date,
          excerpt: p.excerpt && p.excerpt.rendered, body: p.content && p.content.rendered,
          img: p.jetpack_featured_media_url, labels: [] })) }
    ];
    if (cat) routes.pop();   // the second route can't filter by category name: then only use the first
    const errors = [];
    const tryRoute = i => {
      if (i >= routes.length) return Promise.reject(new Error(errors.join(" | ")));
      const r = routes[i];
      return fetch(r.url, { cache:"no-cache" })
        .then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); })
        .then(data => {
          const list = r.parse(data);
          if (!list.length) throw new Error("0 posts");
          return list;
        })
        .catch(err => { errors.push(r.name + ": " + (err && err.message || err)); return tryRoute(i + 1); });
    };
    tryRoute(0)
      .then(list => {
        const posts = list.map(p => {
          const img = newsSafeUrl(p.img);
          const q = {
            title: newsText(p.title),
            url: newsSafeUrl(p.url),
            date: p.date || "",
            excerpt: newsShorten(newsText(p.excerpt), 220),
            img: img ? img.split("?")[0] + "?w=400&h=400&crop=1" : "",
            labels: (p.labels || []).map(x => newsText(x)).slice(0, 40)
          };
          q.action = newsIsAction(q);
          if (q.action){
            q.facts = newsFacts({ title:q.title, excerpt:q.excerpt, body: newsShorten(newsText(p.body), 4000) });
            q.offer = newsOffer(p.body, newsText(p.excerpt), q.title);
          }
          return q;
        }).filter(p => p.title && p.url);
        news.posts = posts; news.offline = false;
        try { localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), posts })); } catch(e){}
        renderNewsCard();
      })
      .catch(err => {
        if (news.posts && news.posts.length){ news.offline = !navigator.onLine; renderNewsCard(); }
        // Diagnose: open the app with #newsdebug at the end of the address
        // to see why the posts could not be loaded.
        if (/newsdebug/.test(location.hash)){
          const card = $("#newsCard"), list = $("#newsList");
          if (card && list){
            const p = document.createElement("p"); p.className = "news-card__note";
            p.textContent = "News debug — " + (err && err.message || err);
            list.appendChild(p); card.hidden = false;
          }
        }
      });
  }

  /* ---------------- newsletter signup (mailto — no backend) ---------------- */
  function submitNewsletter(e){
    e.preventDefault();
    const input = $("#newsletterEmail");
    const email = (input && input.value || "").trim();
    if (!email) return;
    const lang = state.lang;
    const subject = t("newsletter_mail_subject", lang);
    const body = t("newsletter_mail_body", lang).replace("{email}", email);
    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    localData.newsletterSentAt = new Date().toISOString();
    saveLocalData();
    showToast(t("newsletter_sent_toast", lang));
    trackEvent("newsletter-signup");
    if (input) input.value = "";
  }

  /* ---------------- analytics (optional, privacy-friendly) ----------------
     No-ops until a GoatCounter (or similar) script is added in index.html —
     see the comment there for setup instructions. Nothing is tracked without it. */
  function trackEvent(name){
    try {
      if (window.goatcounter && typeof window.goatcounter.count === "function"){
        window.goatcounter.count({ path: name, event: true });
      }
    } catch(e){ /* analytics should never break the app */ }
  }

  /* ---------------- reset ---------------- */
  /* ---------------- social links + version ---------------- */
  // "@beauty_and_coffee_mechelen", taken from the Instagram link in data.js
  function socialHandle(){
    const m = (SOCIAL_LINKS.instagram || "").match(/instagram\.com\/([^/?#]+)/i);
    return m ? "@" + m[1] : "";
  }
  function renderSocialLinks(){
    const links = [];
    if (SOCIAL_LINKS.instagram) links.push(`<a class="social-link social-link--ig" href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener noreferrer">📷 Instagram</a>`);
    if (SOCIAL_LINKS.facebook)  links.push(`<a class="social-link social-link--fb" href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener noreferrer">👍 Facebook</a>`);
    const html = links.length ? `<p class="social-links__title">${t("social_follow", state.lang)}</p><div class="social-links__row">${links.join("")}</div>` : "";
    const foot = $("#socialLinks"); if (foot) foot.innerHTML = html;
    const res = $("#socialLinksResult");
    if (res){
      const h = socialHandle();
      res.innerHTML = html + (h ? `<p class="social-links__tag">${t("social_tag_hint", state.lang).replace("{handle}", `<strong>${h}</strong>`)}</p>` : "");
    }
    // the version is only shown on Sandra's phone (salon key) or with her private preview link
    const v = $("#appVersion");
    if (v){
      let own = false;
      try { const k = new URLSearchParams(location.search).get("voorproef"); own = hasSalonKey() || (!!k && ((typeof ADVENT === "object" && previewMatch(k, ADVENT.previewKey)) || (typeof INGREDIENTS_LIVE === "object" && previewMatch(k, INGREDIENTS_LIVE.previewKey)))); } catch(e){ own = false; }
      v.hidden = !own; v.textContent = own ? `${t("app_version_label", state.lang)} ${APP_VERSION}` : "";
    }
  }

  function resetApp(){
    stopCamera();
    cameraFacing = "user";
    state.profile = null; state.ageBracket = null; state.sunExposed = null; state.kidsDrink = null;
    state.healthFlags = { phlebitis:false, contactLenses:false, menstruation:false, pregnant:false, pregStage:null, musclePain:false, roaccutane:false, dietExercise:false, sport:false, diet:false };
    state.mood = null; state.focus = null; state.allergies = []; state.category = null; state.temperature = null; state.caffeine = null; state.complaintText = "";
    const complaintEl = $("#complaintInput"); if (complaintEl) complaintEl.value = "";
    state.milk = "none"; state.extras = []; state.context = null;
    state.photoDataUrl = null; state.filter = "none"; state.match = null; state.slots = []; state.skinFact = null; state.sunFact = null;
    retakePhoto();
    history = ["welcome"];
    applyI18n();
    showStep("welcome");
  }

  /* ---------------- wire up ---------------- */
  /* ---------------- local memory (localStorage) ----------------
     Everything below stays on this device only — no account, no
     server, nothing ever sent to Beauty & Coffee. A stamp is only
     added after scanning the rotating QR code in the salon (see
     "stamp card via QR" below). */
  const LOCAL_KEY = "beautyCoffeeLocal_v1";
  const localData = { version:1, stamps:0, discoveredTreatments:[], discoveredDrinks:[], favorites:[], lastMatchAt:null, reviewPromptShownFor:null, savedProfile:null, savedAgeBracket:null, installDismissedAt:null, installIosDismissedAt:null, newsletterSentAt:null, lastStampDay:null, cardFullAt:null, rewardsRedeemed:[], lastMoment:null, appointment:null, appointments:[], advent:null };

  function loadLocalData(){
    try {
      const saved = localStorage.getItem(LOCAL_KEY);
      if (saved){
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") Object.assign(localData, parsed);
      }
    } catch(e){ /* private browsing or storage disabled — app still works without memory */ }
    // No automatic reset any more (v154): stamps, appointments and favourites
    // of real clients must never disappear by an update. Only the client herself
    // can wipe her data (button "reset", with a confirmation).
    // Ask the browser to keep this storage (Safari/Chrome may otherwise clear
    // it after a while when space runs low or the site is not opened).
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(p => { if (!p) navigator.storage.persist(); }).catch(() => {}); } catch(e){}
    // treatments that were taken off the menu (e.g. acne facial, v91) no longer count
    try {
      const known = new Set(TREATMENTS_CATALOG.map(x => x.id).concat(["kindermanicure"]));
      const kept = (localData.discoveredTreatments || []).filter(id => known.has(id));
      if (kept.length !== (localData.discoveredTreatments || []).length){ localData.discoveredTreatments = kept; saveLocalData(); }
      if (localData.lastMoment && !known.has(localData.lastMoment.treatmentId)){ localData.lastMoment = null; saveLocalData(); }
    } catch(e){ /* ignore */ }
  }
  // Everything a client collected in the app (not the language or profile)
  function wipeLocalData(){
    Object.assign(localData, { stamps:0, discoveredTreatments:[], discoveredDrinks:[], favorites:[], lastMatchAt:null,
      reviewPromptShownFor:null, lastStampDay:null, cardFullAt:null, rewardsRedeemed:[], lastMoment:null, appointment:null, appointments:[] });
  }

  /* ---------------- moving to the new address ----------------
     The old address (sbw888.github.io/beauty_and_coffee_mechelen) now only
     redirects here. Browser storage belongs to one address, so the old page
     reads the client's stamp card etc. and passes it along once as
     ?migrate=…; here we merge it in (never lowering anything) and remove it
     from the address bar. */
  function importMigratedData(){
    try {
      const params = new URLSearchParams(location.search);
      const raw = params.get("migrate");
      if (!raw) return;
      params.delete("migrate");
      const rest = params.toString();
      window.history.replaceState(null, "", location.pathname + (rest ? "?" + rest : "") + location.hash);
      const json = decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/"))));
      const old = JSON.parse(json);
      if (!old || typeof old !== "object") return;
      // Only accept data handed over by the old address itself (its redirect
      // page), not from a link someone made up to get free stamps.
      if (!/^https:\/\/sbw888\.github\.io\//.test(document.referrer || "") || localData.migratedAt) return;
      localData.migratedAt = new Date().toISOString();
      const strs = a => (Array.isArray(a) ? a : []).filter(x => typeof x === "string").map(x => cleanStr(x, 80)).slice(0, 300);
      const union = (a, b) => Array.from(new Set([...strs(a), ...strs(b)]));
      const before = localData.stamps;
      localData.stamps = Math.max(Number(localData.stamps) || 0, Math.min(Math.floor(Number(old.stamps)) || 0, 10));
      localData.discoveredTreatments = union(localData.discoveredTreatments, old.discoveredTreatments);
      localData.discoveredDrinks = union(localData.discoveredDrinks, old.discoveredDrinks);
      if (Array.isArray(old.favorites)){
        const keys = new Set(localData.favorites.map(f => f && f.key));
        old.favorites.slice(0, 50).forEach(f => {
          if (!f || typeof f.key !== "string" || keys.has(f.key)) return;
          localData.favorites.push({ key:cleanStr(f.key, 200), tname:cleanStr(f.tname), drink:cleanStr(f.drink), at:cleanStr(f.at, 40) });
        });
      }
      ["savedProfile","savedAgeBracket","lastMatchAt","lastStampDay","newsletterSentAt"].forEach(k => {
        if (!localData[k] && old[k] && (typeof old[k] === "string" || typeof old[k] === "number")) localData[k] = typeof old[k] === "string" ? cleanStr(old[k], 40) : old[k];
      });
      saveLocalData();
      if (localData.stamps > before) setTimeout(() => showToast(t("migrate_done", state.lang)), 1200);
    } catch(e){ /* a broken link should never break the app */ }
  }

  function saveLocalData(){
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(localData)); }
    catch(e){ /* storage full/unavailable — fail silently, this is a non-critical extra */ }
  }

  function getAllDrinkNames(){
    const names = new Set();
    BEVERAGES.coffee.caff.forEach(b => names.add(b.name));
    BEVERAGES.coffee.decaf.forEach(b => names.add(b.name));
    BEVERAGES.coffeeIced.caff.forEach(b => names.add(b.name));
    BEVERAGES.coffeeIced.decaf.forEach(b => names.add(b.name));
    TEAS_CAFF.forEach(n => names.add(n));
    TEAS_DECAF.forEach(n => names.add(n));
    HOT_EXTRAS_DECAF.forEach(n => names.add(n));
    ["Matcha Latte","Matcha Latte met witte choco","Iced Matcha Latte"].forEach(n => names.add(n));
    KIDS_DRINKS.forEach(d => names.add(d.name.nl));
    return names;
  }

  /* What a full card gives, and — once full — the voucher. The voucher is
     handed in by scanning the salon's "Beloning inwisselen" code, which
     takes 10 stamps off: it can never be used twice. */
  function rewardExpiry(){
    if (!localData.cardFullAt || typeof STAMP_REWARD === "undefined") return null;
    const d = new Date(localData.cardFullAt);
    d.setMonth(d.getMonth() + (STAMP_REWARD.validMonths || 3));
    return d;
  }
  function rewardHtml(){
    if (typeof STAMP_REWARD === "undefined") return "";
    const lang = state.lang, text = STAMP_REWARD[lang] || STAMP_REWARD.nl;
    if (localData.stamps < 10){
      return `<p class="reward-teaser">🎁 ${t("reward_teaser", lang).replace("{reward}", text).replace("{months}", STAMP_REWARD.validMonths || 3)}</p>`;
    }
    if (!localData.cardFullAt){ localData.cardFullAt = new Date().toISOString(); saveLocalData(); }
    const exp = rewardExpiry(), expired = exp && exp < new Date();
    const dateStr = exp ? exp.toLocaleDateString(lang === "en" ? "en-GB" : (lang === "fr" ? "fr-BE" : "nl-BE"), { day:"numeric", month:"long", year:"numeric" }) : "";
    return `<div class="reward-voucher${expired ? " is-expired" : ""}">
        <p class="reward-voucher__title">🎉 ${t("reward_voucher_title", lang)}</p>
        <p class="reward-voucher__text">${text}</p>
        <p class="reward-voucher__date">${t(expired ? "reward_expired" : "reward_valid_until", lang).replace("{date}", dateStr)}</p>
        <p class="reward-voucher__how">${t("reward_how", lang)}</p>
      </div>`;
  }

  /* "Mijn ontdekkingen": which treatments and drinks were matched before
     (names in the client's language), shown as a fold-out list. */
  function discoveredTreatmentNames(){
    const lang = state.lang;
    return localData.discoveredTreatments.map(id => {
      if (id === "kindermanicure") return trName("Kindermanicure", lang);
      const tr = TREATMENTS_CATALOG.find(x => x.id === id);
      return tr ? trName(tr.name, lang) : null;
    }).filter(Boolean).sort((a, b) => a.localeCompare(b, lang));
  }
  function discoveredDrinkNames(){
    const lang = state.lang;
    return localData.discoveredDrinks.map(name => {
      const kid = KIDS_DRINKS.find(d => d.name && d.name.nl === name);
      if (kid) return kid.name[lang] || kid.name.nl;
      return trName(name, lang);
    }).sort((a, b) => a.localeCompare(b, lang));
  }
  function discoveryListHtml(names){
    if (!names.length) return `<p class="collection-card__empty">${t("collection_none", state.lang)}</p>`;
    return `<details class="collection-card__list">
        <summary>${t("collection_show", state.lang)} (${names.length})</summary>
        <ul>${names.map(n => `<li>${n}</li>`).join("")}</ul>
      </details>`;
  }

  function recordDiscovery(){
    if (!state.match) return false;
    let changed = false;
    const tid = state.match.isKid ? "kindermanicure" : state.match.treatment.id;
    if (tid && !localData.discoveredTreatments.includes(tid)){
      localData.discoveredTreatments.push(tid);
      changed = true;
    }
    const dname = state.match.isKid
      ? (KIDS_DRINKS.find(d => d.id === state.match.drinkId) || KIDS_DRINKS[0]).name.nl
      : state.match.drink.name;
    if (dname && !localData.discoveredDrinks.includes(dname)){
      localData.discoveredDrinks.push(dname);
      changed = true;
    }
    localData.lastMatchAt = new Date().toISOString();
    // remember the whole match so "Herhaal mijn laatste moment" can show it
    // again (and book it) without the questionnaire
    if (!state.match.isKid){
      const m = state.match;
      localData.lastMoment = { treatmentId: m.treatment.id, drink: m.drink, milkId: m.milkId, extrasIds: m.extrasIds,
        homecarePick: m.homecarePick, soapPick: m.soapPick, why: m.why || null, context: state.context || null };
    }
    saveLocalData();
    return changed;
  }

  /* ---------------- Google review prompt ----------------
     Shown on the welcome screen a few days after someone's last
     generated match — a reasonable proxy for "had their treatment
     by now" without any real appointment data. Shown once per visit
     cycle (never repeats for the same lastMatchAt timestamp). */
  const REVIEW_PROMPT_DELAY_DAYS = 3;
  const GOOGLE_REVIEW_URL = "https://g.page/r/CWswrSNuP25zEAE/review";

  function shouldShowReviewPrompt(){
    if (!localData.lastMatchAt) return false;
    if (localData.reviewPromptShownFor === localData.lastMatchAt) return false;
    const daysSince = (Date.now() - new Date(localData.lastMatchAt).getTime()) / 86400000;
    return daysSince >= REVIEW_PROMPT_DELAY_DAYS;
  }

  function dismissReviewPrompt(){
    localData.reviewPromptShownFor = localData.lastMatchAt;
    saveLocalData();
    renderReturningUserBlock();
  }

  /* "Herhaal mijn laatste Beauty & Coffee moment": straight back to the
     last match (with booking buttons and time slots), no questions. */
  function lastMomentButtonHtml(){
    const lm = localData.lastMoment;
    if (!lm) return "";
    const tr = TREATMENTS_CATALOG.find(x => x.id === lm.treatmentId);
    if (!tr || !lm.drink) return "";
    if (BC_UNAVAILABLE.has(tr.id)) return `<p class="repeat-last repeat-last--gone">⛔ ${trName(tr.name, state.lang)}: ${t("bh_gone", state.lang)}<span class="repeat-last__sub">${t("bh_gone_hint", state.lang)}</span></p>`;
    const drink = lm.drink.origin ? trName(lm.drink.name, state.lang) : trName(lm.drink.name, state.lang);
    return `<button type="button" class="btn btn--primary btn--wide repeat-last" data-action="repeat-last">
        🔁 ${t("repeat_last_button", state.lang)}
        <span class="repeat-last__sub">${trName(tr.name, state.lang)} + ${drink}</span>
      </button>`;
  }
  async function repeatLastMoment(){
    const lm = localData.lastMoment;
    const tr = lm && TREATMENTS_CATALOG.find(x => x.id === lm.treatmentId);
    if (!tr) return;
    if (BC_UNAVAILABLE.has(tr.id)){ showToast(t("bh_gone", state.lang)); return; }
    state.match = { isKid:false, treatment: tr, drink: lm.drink, milkId: lm.milkId || "none", extrasIds: lm.extrasIds || [],
      homecarePick: lm.homecarePick || pickHomecareProduct(tr.homecare.category, tr.homecare.soapHint, state.profile),
      soapPick: lm.soapPick || null, why: lm.why || null };
    if (lm.context) state.context = lm.context;
    if (lm.why && lm.why.temperature) state.temperature = lm.why.temperature;
    state.quickPhoto = false;
    state.skinFact = chooseSkinFact();
    await drawResultCanvas();
    renderResultDetails();
    renderResultBlocks();
    renderMatchTools();
    renderSlotPicker();
    renderLoyaltyBlock();
    goTo("result");
    trackEvent("repeat-last");
  }

  /* ---------------- "Mijn afspraken" ----------------
     Clients who booked by phone/WhatsApp enter their appointments here
     (as many as they like). They show on the start screen with one-tap
     buttons for Google Agenda and Outlook, an .ics file for other calendars
     (Apple, Infomaniak, Telenet…), and the route. After a visit the app
     invites them to the photo moment, prefilled. */
  /* ---- online booking → "Mijn afspraak" without double work ----
     Google's booking page sends nothing back to the app (and the app has no
     server, on purpose). So: when a client taps "book online" we remember the
     treatment; when she comes back, one tap opens "Mijn afspraak" with the
     treatment already filled in. She only copies day and time from Google's
     confirmation. That appointment is already in her calendar (Google's
     invitation), so the app doesn't offer to add it a second time. */
  const ONLINE_PENDING_HOURS = 72;
  function onlinePending(){
    const p = localData.pendingOnline;
    if (!p || !p.at) return null;
    if (Date.now() - p.at > ONLINE_PENDING_HOURS * 3600000){ localData.pendingOnline = null; saveLocalData(); return null; }
    return p;
  }
  function onlineBookClicked(src){
    let tid = null, ttext = "";
    if (src === "result" && state.match && state.match.treatment && !state.match.isKid){
      tid = state.match.treatment.id; ttext = trName(state.match.treatment.name, state.lang);
    } else if (src === "result" && state.match && state.match.isKid){ tid = "kindermanicure"; ttext = trName(state.match.treatment.name, state.lang); }
    if (!tid && src === "welcome"){ const lm = localData.lastMoment, at = localData.lastMatchAt; if (lm && lm.treatmentId && at && Date.now() - new Date(at).getTime() < 60 * 86400000) tid = lm.treatmentId; }   // v199: last match from the start screen
    if (tid) trackEvent("boek-" + String(tid).replace(/[^a-z0-9-]/gi, "-").slice(0, 60));   // anonymous: only the treatment id, no person
    let tcat = tid ? (Object.keys(AVOID_GROUPS).find(g => AVOID_GROUPS[g].includes(tid)) || null) : null;
    if (!tcat && tid === "kindermanicure") tcat = "hands";
    localData.pendingOnline = { at: Date.now(), tcat, ttext: String(ttext || "").slice(0, 40) };
    saveLocalData(); trackEvent("online-book-" + (src || "x"));
    setTimeout(renderOnlineTake, 400);
  }
  function applyOnlineLinks(){
    const u = (typeof ONLINE_BOOKING_URL !== "undefined" && ONLINE_BOOKING_URL) || "";
    document.querySelectorAll('[data-action="online-book"]').forEach(a => {
      a.hidden = !u || (a.id === "apptBookOnline" && !!state.apptFromOnline);
      if (u) a.href = u;
    });
    const alt = $("#bookAlt"); if (alt && !u) alt.open = true;
    document.querySelectorAll(".online-gmail-hint").forEach(h => { h.hidden = !u; });   // no booking page: WhatsApp/e-mail is the only way
    renderCopyName();
  }
  /* v160: clients forget the exact treatment name after the match. A copy
     button puts the name on the clipboard so they can paste it in the
     Google booking form ("result" = current match, "last" = last match on
     the start screen, only for 60 days). */
  function copyNameText(src){
    if (src === "result"){ const m = state.match; if (!(m && m.treatment)) return ""; const sc = scentLabel(m, state.lang); return trName(m.treatment.name, state.lang) + (sc ? " · " + t("book_scent_line", state.lang).replace("{s}", sc).replace(/\.$/, "") : ""); }
    const lm = localData.lastMoment, at = localData.lastMatchAt;
    if (!lm || !lm.treatmentId || !at || (Date.now() - new Date(at).getTime()) > 60 * 86400000) return "";
    const tr = TREATMENTS_CATALOG.find(x => x.id === lm.treatmentId);
    return tr && !BC_UNAVAILABLE.has(tr.id) ? trName(tr.name, state.lang) : "";
  }
  function renderCopyName(){
    document.querySelectorAll(".copy-name").forEach(b => {
      const txt = copyNameText(b.dataset.copySrc);
      b.dataset.text = txt; b.hidden = !txt;
      const s = b.querySelector(".copy-name__text"); if (s) s.textContent = txt;
    });
  }
  function copyName(el){
    const box = el.closest(".copy-name"), txt = box && box.dataset.text;
    if (!txt) return;
    const done = () => showToast(t("copy_name_toast", state.lang));
    try { navigator.clipboard.writeText(txt).then(done, () => window.prompt(t("copy_name_btn", state.lang), txt)); }
    catch(e){ window.prompt(t("copy_name_btn", state.lang), txt); }
  }
  function renderOnlineTake(){
    applyOnlineLinks();
    const on = !!onlinePending();
    document.querySelectorAll(".online-take").forEach(b => { b.hidden = !on; });
    renderApptCard();
  }
  function onlineTake(){
    const p = onlinePending();
    openMyAppt(null);
    if (!p) return;
    state.apptFromOnline = true;
    state.apptPick = { tcat: p.tcat || null };
    const tt = $("#apptTreatText"); if (tt) tt.value = p.ttext || "";
    const h = $("#apptOnlineHint"); if (h) h.hidden = false;
    { const g = $('section.step[data-step="myappt"] .step__hint'); if (g) g.style.display = "none"; }
    { const a = $("#apptBookOnline"); if (a) a.hidden = true; }
    renderApptForm();
    const d = $("#apptDate"); if (d) setTimeout(() => { try { d.focus(); } catch(e){} }, 300);
  }
  function onlineDismiss(){ localData.pendingOnline = null; saveLocalData(); renderOnlineTake(); }
  function apptList(){
    if (!Array.isArray(localData.appointments)) localData.appointments = [];
    if (localData.appointment){ localData.appointments.push(localData.appointment); localData.appointment = null; saveLocalData(); }
    return localData.appointments;
  }
  function apptStart(a){ return a && a.date ? new Date(`${a.date}T${a.time || "10:00"}:00`) : null; }
  function apptTreatLabel(a){
    if (!a) return "";
    const cat = a.tcat ? t("avoid." + a.tcat, state.lang) : "";
    const txt = a.ttext ? esc(a.ttext) : "";
    return txt ? (cat ? `${cat} – ${txt}` : txt) : cat;
  }
  function apptTitle(a){ return `Beauty & Coffee — ${apptTreatLabel(a) || t("appt_title", state.lang)}`; }
  const APPT_LOCATION = "Beauty & Coffee, Barbarastraat, Mechelen";
  function apptGoogleUrl(a){
    const s = apptStart(a), e = new Date(s.getTime() + 3600000);
    const f = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(apptTitle(a))}&dates=${f(s)}/${f(e)}` +
      `&location=${encodeURIComponent(APPT_LOCATION)}&details=${encodeURIComponent(SITE_URL)}`;
  }
  function apptOutlookUrl(a){
    const s = apptStart(a), e = new Date(s.getTime() + 3600000);
    return "https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent" +
      `&subject=${encodeURIComponent(apptTitle(a))}&startdt=${encodeURIComponent(s.toISOString())}&enddt=${encodeURIComponent(e.toISOString())}` +
      `&location=${encodeURIComponent(APPT_LOCATION)}`;
  }
  // review reminder the day after a saved appointment (once per appointment)
  function apptReviewKey(a){ return String(a.date || "") + "T" + String(a.time || ""); }
  function apptReviewHtml(x, now, L){
    const h = (typeof APPT_REVIEW_AFTER_HOURS !== "undefined") ? APPT_REVIEW_AFTER_HOURS : 20;
    if (!x || now - x.s.getTime() < h * 3600000) return "";
    const done = localData.apptReviewDone || [];
    if (done.includes(apptReviewKey(x.a))) return "";
    const tl = apptTreatLabel(x.a) || ({ nl:"behandeling", en:"treatment", fr:"soin" }[L] || "behandeling");
    return `<div class="review-prompt appt-review">
        <p>${t("appt_review_text", L).replace("{t}", tl)}</p>
        <a class="btn btn--primary" href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener noreferrer" data-action="appt-review-done" data-appt-key="${esc(apptReviewKey(x.a))}">${t("review_prompt_button", L)}</a>
        <button type="button" class="btn btn--text" data-action="appt-review-done" data-appt-key="${esc(apptReviewKey(x.a))}">${t("appt_review_later", L)}</button>
      </div>`;
  }
  function apptReviewDone(key){
    if (!key) return;
    localData.apptReviewDone = (localData.apptReviewDone || []).filter(k => k !== key).concat([key]).slice(-30);
    saveLocalData(); renderApptCard();
  }
  function apptPrepHtml(a, L){
    if (typeof APPT_PREP === "undefined" || !a) return "";
    const cats = new Set(); if (a.tcat) cats.add(a.tcat);
    const txt = String(a.ttext || "").toLowerCase();
    if (txt) Object.entries(APPT_PREP_WORDS).forEach(([c, ws]) => { if (ws.some(w => txt.includes(w))) cats.add(c); });
    const tips = [...cats].flatMap(c => APPT_PREP[c] || []).concat(APPT_PREP.all || []);
    return `<div class="appt-prep"><p class="appt-prep__title">💡 ${t("appt_prep_title", L)}</p><ul>${tips.map(x => `<li>${esc(x[L] || x.nl)}</li>`).join("")}</ul></div>`;
  }
  function renderApptCard(){
    const card = $("#apptCard");
    if (!card || typeof localData === "undefined") return;
    const L = state.lang, loc = L === "en" ? "en-GB" : (L === "fr" ? "fr-BE" : "nl-BE");
    const now = Date.now();
    const list = apptList().map((a, i) => ({ a, i, s: apptStart(a) })).filter(x => x.s && !isNaN(x.s));
    const upcoming = list.filter(x => x.s.getTime() + 2*3600000 >= now).sort((x, y) => x.s - y.s);
    const recentPast = list.filter(x => x.s.getTime() + 2*3600000 < now && now - x.s.getTime() < 14*86400000).sort((x, y) => y.s - x.s)[0];
    const pend = onlinePending();
    if (!upcoming.length && !recentPast && !pend){ card.hidden = true; return; }
    const when = s => s.toLocaleDateString(loc, { weekday:"long", day:"numeric", month:"long" }) + " · " + s.toLocaleTimeString(loc, { hour:"2-digit", minute:"2-digit" });
    let html = "";
    if (pend) html += `
      <div class="appt-item appt-item--online">
        <p class="appt-card__title">📅 ${t("online_take_q", L)}</p>
        <div class="appt-card__buttons">
          <button type="button" class="btn btn--primary" data-action="online-take">${t("online_take_btn", L)}</button>
          <button type="button" class="btn btn--text" data-action="online-dismiss">${t("online_take_no", L)}</button>
        </div>
      </div>`;
    if (recentPast) html += `
      <div class="appt-item appt-item--past">
        <p class="appt-card__title">✨ ${t("appt_after_title", L)}</p>
        <p class="appt-card__text">${apptTreatLabel(recentPast.a)}</p>
        <div class="appt-card__buttons"><button type="button" class="btn btn--primary" data-action="open-photomoment">${t("pm_button", L)}</button></div>
        ${apptReviewHtml(recentPast, now, L)}
        ${upcoming.length ? "" : reminderChipsHtml(recentPast.a.tcat || null, recentPast.a.ttext || (recentPast.a.tcat ? t("avoid." + recentPast.a.tcat, L) : ""))}
      </div>`;
    if (upcoming.length) html += `<p class="appt-card__title">📅 ${t(upcoming.length > 1 ? "appt_card_title_many" : "appt_card_title", L)}</p>`;
    upcoming.forEach(x => {
      html += `
      <div class="appt-item">
        <p class="appt-card__when">${when(x.s)}</p>
        <p class="appt-card__text">${apptTreatLabel(x.a)}</p>
        ${apptPrepHtml(x.a, L)}
        ${x.a.src === "online" ? `<p class="appt-card__label">✓ ${t("appt_online_incal", L)}</p>` : `<p class="appt-card__label">${t("appt_add_to", L)}</p>
        <div class="appt-card__buttons">
          <a class="btn btn--outline" href="${apptGoogleUrl(x.a)}" target="_blank" rel="noopener noreferrer" data-cal="google">Google</a>
          <a class="btn btn--outline" href="${apptOutlookUrl(x.a)}" target="_blank" rel="noopener noreferrer" data-cal="outlook">Outlook</a>
          <button type="button" class="btn btn--outline" data-action="appt-ics" data-appt-index="${x.i}">${t("appt_other_calendar", L)}</button>
        </div>`}
        <div class="appt-card__buttons appt-card__buttons--small">
          <button type="button" class="btn btn--text" data-action="open-findme">📍 ${t("appt_route", L)}</button>
          <button type="button" class="btn btn--text" data-action="edit-appt" data-appt-index="${x.i}">✏️ ${t("appt_edit", L)}</button>
        </div>
      </div>`;
    });
    html += `<button type="button" class="btn btn--text appt-add-more" data-action="new-appt">＋ ${t("appt_add_more", L)}</button>`;
    card.innerHTML = html;
    card.hidden = false;
    card.querySelectorAll("[data-cal]").forEach(el => el.addEventListener("click", () => trackEvent("appointment-" + el.dataset.cal)));
  }
  function renderApptForm(){
    state.apptPick = state.apptPick || { tcat:null };
    const tw = $("#apptTreatCats"); if (!tw) return;
    tw.innerHTML = Object.keys(AVOID_GROUPS).map(g =>
      `<button type="button" class="chip${state.apptPick.tcat === g ? " is-selected" : ""}" data-appt-t="${g}">${AVOID_ICONS[g]} ${t("avoid." + g, state.lang)}</button>`).join("");
    tw.querySelectorAll("[data-appt-t]").forEach(c => c.addEventListener("click", () => { state.apptPick.tcat = c.dataset.apptT; renderApptForm(); }));
    const tt = $("#apptTreatText"); if (tt) tt.placeholder = t("pm_text_placeholder_t", state.lang);
    const del = $("#apptDeleteBtn"); if (del) del.hidden = state.apptIndex == null;
  }
  function openMyAppt(index){
    const list = apptList();
    state.apptIndex = (index != null && list[index]) ? index : null;
    const a = state.apptIndex != null ? list[state.apptIndex] : {};
    state.apptPick = { tcat: a.tcat || null };
    state.apptFromOnline = !!a.src && a.src === "online";
    applyOnlineLinks();
    { const h = $("#apptOnlineHint"); if (h) h.hidden = !state.apptFromOnline; const g = $('section.step[data-step="myappt"] .step__hint'); if (g) g.style.display = state.apptFromOnline ? "none" : ""; }
    const d = $("#apptDate"), tm = $("#apptTime"), tt = $("#apptTreatText");
    if (d){ d.value = a.date || ""; d.min = todayKey(); }
    if (tm) tm.value = a.time || "";
    if (tt) tt.value = a.ttext || "";
    renderApptForm();
    goTo("myappt");
  }
  function saveAppt(){
    const date = ($("#apptDate") || {}).value, time = ($("#apptTime") || {}).value;
    const ttext = (($("#apptTreatText") || {}).value || "").trim();
    if (!date || !time){ showToast(t("appt_need_datetime", state.lang)); return; }
    const appt = { date, time, tcat: state.apptPick && state.apptPick.tcat || null, ttext };
    if (state.apptFromOnline){ appt.src = "online"; localData.pendingOnline = null; state.apptFromOnline = false; document.querySelectorAll(".online-take").forEach(b => { b.hidden = true; }); }
    const list = apptList();
    if (state.apptIndex != null && list[state.apptIndex]) list[state.apptIndex] = appt; else list.push(appt);
    // keep the list tidy: drop appointments older than 30 days
    localData.appointments = list.filter(a => { const s = apptStart(a); return s && Date.now() - s.getTime() < 30*86400000; });
    saveLocalData();
    renderApptCard();
    trackEvent("appointment-saved");
    showToast(t("appt_saved_toast", state.lang));
    goTo("welcome");
  }
  function deleteAppt(){
    const list = apptList();
    if (state.apptIndex != null) list.splice(state.apptIndex, 1);
    saveLocalData(); renderApptCard();
    showToast(t("appt_deleted_toast", state.lang)); goTo("welcome");
  }
  function apptToCalendar(index){
    const a = apptList()[index], start = apptStart(a);
    if (!start) return;
    const end = new Date(start.getTime() + 60*60*1000);
    const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const ics = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Beauty & Coffee//Match app//NL","BEGIN:VEVENT",
      `UID:${a.date}-${a.time}-${Math.random().toString(36).slice(2)}@beauty-coffee`, `DTSTAMP:${fmt(new Date())}`, `DTSTART:${fmt(start)}`, `DTEND:${fmt(end)}`,
      `SUMMARY:${apptTitle(a)}`, "LOCATION:Beauty & Coffee\\, Barbarastraat\\, Mechelen",
      "BEGIN:VALARM","TRIGGER:-PT2H","ACTION:DISPLAY","DESCRIPTION:Beauty & Coffee","END:VALARM",
      "END:VEVENT","END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type:"text/calendar;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = `beauty-coffee-afspraak-${a.date}.ics`;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast(t("appt_ics_toast", state.lang));
    trackEvent("appointment-ics");
  }

  function renderReturningUserBlock(){
    const block = $("#returningUserBlock");
    if (!block) return;
    const changeLink = $("#changeProfileLink");
    if (changeLink) changeLink.hidden = !localData.savedProfile;
    const favs = localData.favorites || [];
    const hasHistory = localData.stamps > 0 || localData.discoveredTreatments.length > 0 || favs.length > 0;
    const showReview = shouldShowReviewPrompt();
    block.hidden = !hasHistory && !showReview;
    if (!hasHistory && !showReview) return;
    const totalTreatments = TREATMENTS_CATALOG.filter(x => !BC_UNAVAILABLE.has(x.id)).length;
    const totalDrinks = getAllDrinkNames().size;
    const reviewHtml = showReview ? `
      <div class="review-prompt">
        <p>${t("review_prompt_text", state.lang)}</p>
        <a class="btn btn--primary" href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener noreferrer" data-action="dismiss-review">${t("review_prompt_button", state.lang)}</a>
        <button type="button" class="btn btn--text" data-action="dismiss-review">${t("review_prompt_dismiss", state.lang)}</button>
      </div>` : "";
    block.innerHTML = reviewHtml + (hasHistory ? `
      <p class="returning-user__title">${t("welcome_back_title", state.lang)}</p>
      <div class="returning-user__stats">
        <span>☕ ${Math.min(localData.stamps,10)}/10 ${t("stamps_label", state.lang)}</span>
        <span>✨ ${localData.discoveredTreatments.filter(i => !BC_UNAVAILABLE.has(i)).length}/${totalTreatments} ${t("treatments_discovered_label", state.lang)}</span>
        <span>🍵 ${localData.discoveredDrinks.length}/${totalDrinks} ${t("drinks_discovered_label", state.lang)}</span>
      </div>
      ${lastMomentButtonHtml()}
      ${favs.length ? `
      <p class="returning-user__title returning-user__title--fav">${t("fav_title", state.lang)}</p>
      <ul class="fav-list">
        ${favs.map((f, i) => { const gone = BC_UNAVAILABLE.has(String(f.key || "").split("|")[0]); return `<li class="fav-item${gone ? " fav-item--gone" : ""}">
          <div class="fav-item__text"><strong>${esc(trName(f.tname, state.lang))}</strong><span>☕ ${esc(f.drink)}</span>${gone ? `<span class="fav-item__gone">⛔ ${t("bh_gone", state.lang)}</span>` : ""}</div>
          <div class="fav-item__actions">
            ${gone ? "" : `<a class="fav-item__book" href="${favBookHref(f)}" target="_blank" rel="noopener noreferrer">${t("fav_book", state.lang)}</a>`}
            <button type="button" class="fav-item__remove" data-action="remove-fav" data-fav-index="${i}">${t("fav_remove", state.lang)}</button>
          </div>
        </li>`; }).join("")}
      </ul>` : ""}` : "");
  }

  // Rendered in two places: on the result screen and on the stand-alone
  // "Mijn stempelkaart" screen (welcome screen button / #stempelkaart link),
  // so a client never has to redo the questions just to scan a stamp.
  function renderLoyaltyBlock(){
    const blocks = [$("#loyaltyBlock"), $("#loyaltyBlockStandalone")].filter(Boolean);
    if (!blocks.length) return;
    const block = { set innerHTML(html){ blocks.forEach(b => { b.innerHTML = html; }); } };
    const totalTreatments = TREATMENTS_CATALOG.filter(x => !BC_UNAVAILABLE.has(x.id)).length;
    const totalDrinks = getAllDrinkNames().size;
    const stampsCapped = Math.min(localData.stamps, 10);
    const tPct = Math.round(localData.discoveredTreatments.length / totalTreatments * 100);
    const dPct = Math.round(localData.discoveredDrinks.length / totalDrinks * 100);
    block.innerHTML = `
      <div class="loyalty-card">
        <p class="loyalty-card__title">☕ ${t("stamp_card_title", state.lang)}</p>
        <div class="loyalty-card__stamps">
          ${Array.from({length:10}, (_,i) => `<span class="stamp${i < stampsCapped ? " is-filled" : ""}"></span>`).join("")}
        </div>
        ${rewardHtml()}
        <p class="loyalty-card__hint">${t("stamp_card_hint", state.lang)}</p>
        <button type="button" class="btn btn--outline" data-action="add-stamp">${t("stamp_card_button", state.lang)}</button>
        <p class="loyalty-card__small">${t("stamp_correct_hint", state.lang)}</p>
      </div>
      <div class="collection-card">
        <p class="collection-card__title">✨ ${t("collection_title", state.lang)}</p>
        <div class="collection-card__row"><span>${t("treatments_discovered_label", state.lang)}</span><span>${localData.discoveredTreatments.filter(i => !BC_UNAVAILABLE.has(i)).length}/${totalTreatments}</span></div>
        <div class="collection-card__bar"><div class="collection-card__fill" style="width:${tPct}%"></div></div>
        ${discoveryListHtml(discoveredTreatmentNames())}
        <div class="collection-card__row"><span>${t("drinks_discovered_label", state.lang)}</span><span>${localData.discoveredDrinks.length}/${totalDrinks}</span></div>
        <div class="collection-card__bar"><div class="collection-card__fill" style="width:${dPct}%"></div></div>
        ${discoveryListHtml(discoveredDrinkNames())}
      </div>
      <p class="loyalty-privacy">🔒 ${t("loyalty_privacy_note", state.lang)} ${t("stamp_backup_tip", state.lang)}</p>`;
  }

  /* ---------------- stamp card via QR (salon mode) ----------------
     Sandra opens the app with #salon on her own phone ("salon mode").
     It shows a QR code that changes every 30 seconds, digitally SIGNED
     with the salon's private key (only on Sandra's phone). The client's
     app checks the signature with the public key in data.js; only a
     fresh, genuine code gives a stamp. A photo of an old code is useless
     a minute later. Max 1 stamp per day. 100% client-side and free:
     Web Crypto (built into the browser), a bundled QR encoder
     (assets/lib/qr-encoder.js) and for scanning the browser's own
     BarcodeDetector or else the open-source jsQR. */
  const STAMP_STEP_SECONDS = 30;
  const STAMP_QR_PREFIX = "BCSTAMP:";
  const JSQR_SOURCES = ["assets/lib/jsQR.js", "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"];

  function todayKey(){
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  /* Salon codes are signed with ECDSA (P-256). The PRIVATE key lives only
     on Sandra's phone (installed once via her secret #salonkey= link);
     data.js holds only the PUBLIC key, which can check a code but cannot
     make one. So nobody can produce a stamp code at home by reading the
     source. QR payload: "BCS1:" + kind letter + counter (base 36) + "." + signature. */
  const SALON_CODE_KINDS = ["STAMP","EXTRA","REDEEM","UNDO"];
  const SALON_KIND_LETTER = { STAMP:"S", EXTRA:"X", REDEEM:"R", UNDO:"U" };
  let lastSalonCounter = null;   // counter of the last valid scanned code (EXTRA: each code only once)
  const SALON_KEY_STORE = "bc_salon_key_v1";
  const b64u = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const unb64u = str => { const s2 = str.replace(/-/g, "+").replace(/_/g, "/"); const bin = atob(s2 + "===".slice((s2.length + 3) % 4)); return Uint8Array.from(bin, c => c.charCodeAt(0)); };
  const ECDSA = { name:"ECDSA", namedCurve:"P-256" }, ECDSA_SIGN = { name:"ECDSA", hash:"SHA-256" };
  let salonPubKeyPromise = null, salonPrivKeyPromise = null;
  function getSalonPubKey(){
    if (!salonPubKeyPromise){
      const k = SALON_PUBLIC_KEY;
      salonPubKeyPromise = crypto.subtle.importKey("jwk", { kty:"EC", crv:"P-256", x:k.x, y:k.y, ext:true }, ECDSA, false, ["verify"]);
    }
    return salonPubKeyPromise;
  }
  function salonKeyD(){ try { const d = localStorage.getItem(SALON_KEY_STORE); return d && /^[A-Za-z0-9_-]{43}$/.test(d) ? d : null; } catch(e){ return null; } }
  function hasSalonKey(){ return !!salonKeyD(); }
  function getSalonPrivKey(){
    const d = salonKeyD();
    if (!d) return Promise.reject(new Error("no salon key"));
    if (!salonPrivKeyPromise){
      const k = SALON_PUBLIC_KEY;
      salonPrivKeyPromise = crypto.subtle.importKey("jwk", { kty:"EC", crv:"P-256", x:k.x, y:k.y, d, ext:false }, ECDSA, false, ["sign"]);
    }
    return salonPrivKeyPromise;
  }
  // #salonkey=<d> : check that the key belongs to SALON_PUBLIC_KEY, then keep it on this phone
  async function installSalonKey(d){
    try {
      if (!/^[A-Za-z0-9_-]{43}$/.test(d)) return false;
      const k = SALON_PUBLIC_KEY;
      const priv = await crypto.subtle.importKey("jwk", { kty:"EC", crv:"P-256", x:k.x, y:k.y, d, ext:false }, ECDSA, false, ["sign"]);
      const msg = new TextEncoder().encode("BC-KEYCHECK");
      const sig = await crypto.subtle.sign(ECDSA_SIGN, priv, msg);
      if (!(await crypto.subtle.verify(ECDSA_SIGN, await getSalonPubKey(), sig, msg))) return false;
      localStorage.setItem(SALON_KEY_STORE, d);
      salonPrivKeyPromise = null;
      return true;
    } catch(e){ return false; }
  }
  function stampCounterNow(){ return Math.floor(Date.now() / 1000 / STAMP_STEP_SECONDS); }
  async function stampCodeFor(counter, kind){
    const sig = await crypto.subtle.sign(ECDSA_SIGN, await getSalonPrivKey(), new TextEncoder().encode("BC-" + kind + "|" + counter));
    return "BCS1:" + SALON_KIND_LETTER[kind] + counter.toString(36) + "." + b64u(sig);
  }
  function stampCryptoAvailable(){
    return !!(window.crypto && crypto.subtle && typeof SALON_PUBLIC_KEY === "object" && SALON_PUBLIC_KEY && SALON_PUBLIC_KEY.x);
  }
  // Accepts the current code and the previous ~90 s (clock differences,
  // slow scanning) plus one step ahead (a phone clock running slow).
  async function resolveSalonCode(raw){
    const m = String(raw || "").trim().match(/^BCS1:([SXRU])([0-9a-z]{1,10})\.([A-Za-z0-9_-]{80,90})$/);
    if (!m) return null;
    const kind = SALON_CODE_KINDS.find(k => SALON_KIND_LETTER[k] === m[1]);
    const counter = parseInt(m[2], 36), now = stampCounterNow();
    if (!(counter >= now - 3 && counter <= now + 1)) return null;
    try {
      const ok = await crypto.subtle.verify(ECDSA_SIGN, await getSalonPubKey(), unb64u(m[3]), new TextEncoder().encode("BC-" + kind + "|" + counter));
      if (ok) lastSalonCounter = counter;
      return ok ? kind : null;
    } catch(e){ return null; }
  }
  // advent vouchers: HMAC check digits (see ADVENT_CODE_SECRET in data.js)
  let advKeyPromise = null;
  function getAdvKey(){
    if (!advKeyPromise){
      advKeyPromise = crypto.subtle.importKey("raw", new TextEncoder().encode(ADVENT_CODE_SECRET),
        { name:"HMAC", hash:"SHA-256" }, false, ["sign"]);
    }
    return advKeyPromise;
  }

  function loadScript(src){
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src; el.async = true;
      el.onload = () => resolve(); el.onerror = () => { el.remove(); reject(new Error(src)); };
      document.head.appendChild(el);
    });
  }
  async function loadFirstScript(sources, isReady){
    if (isReady()) return true;
    for (const src of sources){
      try { await loadScript(src); if (isReady()) return true; } catch(e){ /* try the next source */ }
    }
    return false;
  }

  /* ---- client side: scan the QR (or type the 6 digits) ---- */
  const stampScan = { stream:null, timer:null, busy:false, detector:null, lastInvalidAt:0, mode:"stamp" };

  function addStamp(){
    if (!stampCryptoAvailable()){ showToast(t("stamp_unsupported", state.lang)); return; }
    // Always open the scanner: the same scanner also handles "take a stamp
    // back" and "redeem reward" codes. The 1-stamp-per-day rule is checked
    // when a STAMP code is scanned.
    openStampScanner();
  }

  function openStampScanner(mode){
    closeStampScanner();
    const isAdv = mode === "advent";
    stampScan.mode = isAdv ? "advent" : "stamp";
    const ov = document.createElement("div");
    ov.className = "stamp-overlay"; ov.id = "stampScanOverlay";
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.innerHTML = `
      <div class="stamp-overlay__panel">
        <button type="button" class="stamp-overlay__close" data-stamp="close" aria-label="${t("stamp_close", state.lang)}">✕</button>
        <p class="stamp-overlay__title">${isAdv ? "🎄 " + t("adv_scan_title", state.lang) : "☕ " + t("stamp_scan_title", state.lang)}</p>
        <p class="stamp-overlay__hint" id="stampScanStatus">${t(isAdv ? "adv_scan_hint" : "stamp_scan_hint", state.lang)}</p>
        <div class="stamp-scan__viewport">
          <video id="stampScanVideo" playsinline autoplay muted></video>
          <span class="stamp-scan__frame" aria-hidden="true"></span>
        </div>
        ${isAdv ? `<label class="stamp-scan__label" for="stampCodeInput">${t("adv_manual_label", state.lang)}</label>
        <div class="stamp-scan__manual stamp-scan__manual--adv">
          <input id="stampCodeInput" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="20" placeholder="A07-XXXXX-XXXX">
          <button type="button" class="btn btn--primary btn--sm" data-stamp="manual">${t("stamp_manual_button", state.lang)}</button>
        </div>` : `<p class="stamp-scan__label">${t("stamp_qr_only", state.lang)}</p>`}
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => {
      const a = e.target.closest("[data-stamp]");
      if (e.target === ov || (a && a.dataset.stamp === "close")) closeStampScanner();
      else if (a && a.dataset.stamp === "manual") submitScannedCode($("#stampCodeInput").value, "manual");
    });
    const ci = $("#stampCodeInput"); if (ci) ci.addEventListener("keydown", e => { if (e.key === "Enter") submitScannedCode(e.target.value, "manual"); });
    startStampCamera();
  }

  function setStampStatus(key, isError){
    const el = $("#stampScanStatus");
    if (!el) return;
    el.textContent = t(key, state.lang);
    el.classList.toggle("is-error", !!isError);
  }

  async function startStampCamera(){
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("no camera API");
      stampScan.stream = await navigator.mediaDevices.getUserMedia({ video:{ facingMode:{ ideal:"environment" } }, audio:false });
      const v = $("#stampScanVideo");
      if (!v){ stopStampCamera(); return; }   // overlay closed meanwhile
      v.srcObject = stampScan.stream;
      await v.play().catch(()=>{});
    } catch(e){
      setStampStatus("stamp_camera_error", true);
      const vp = document.querySelector(".stamp-scan__viewport"); if (vp) vp.hidden = true;
      return;
    }
    // Prefer the browser's built-in QR reader; otherwise load jsQR.
    try {
      if ("BarcodeDetector" in window){
        const formats = await BarcodeDetector.getSupportedFormats();
        if (formats.includes("qr_code")) stampScan.detector = new BarcodeDetector({ formats:["qr_code"] });
      }
    } catch(e){ stampScan.detector = null; }
    if (!stampScan.detector){
      const ok = await loadFirstScript(JSQR_SOURCES, () => typeof window.jsQR === "function");
      if (!ok){ setStampStatus("stamp_camera_error", true); return; }
    }
    stampScan.timer = setInterval(scanStampFrame, 180);
  }

  const stampScanCanvas = document.createElement("canvas");
  async function scanStampFrame(){
    const v = $("#stampScanVideo");
    if (!v || stampScan.busy || v.readyState < 2 || !v.videoWidth) return;
    stampScan.busy = true;
    try {
      let text = null;
      if (stampScan.detector){
        const codes = await stampScan.detector.detect(v);
        if (codes && codes.length) text = codes[0].rawValue;
      } else {
        const scale = Math.min(1, 640 / Math.max(v.videoWidth, v.videoHeight));
        const w = Math.round(v.videoWidth * scale), h = Math.round(v.videoHeight * scale);
        stampScanCanvas.width = w; stampScanCanvas.height = h;
        const ctx = stampScanCanvas.getContext("2d", { willReadFrequently:true });
        ctx.drawImage(v, 0, 0, w, h);
        const res = window.jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts:"dontInvert" });
        if (res) text = res.data;
      }
      if (text) await submitScannedCode(text, "scan");
    } catch(e){ /* a bad frame — just try the next one */ }
    stampScan.busy = false;
  }

  function submitScannedCode(raw, source){
    return stampScan.mode === "advent" ? submitAdventCode(raw, source) : submitStampCode(raw, source);
  }
  async function submitStampCode(raw, source){
    if (/^BCR1:/.test(String(raw || "").trim())) return advAcceptReplacement(raw);
    const kind = await resolveSalonCode(raw);
    if (kind === "STAMP"){
      if (localData.lastStampDay === todayKey()){ closeStampScanner(); showToast(t("stamp_already_today", state.lang)); return; }
      localData.stamps++;
      localData.lastStampDay = todayKey();
      if (localData.stamps >= 10 && !localData.cardFullAt) localData.cardFullAt = new Date().toISOString();
      finishSalonCode(localData.stamps === 10 ? "stamp_card_full_toast" : "stamp_added_toast", "stamp-added");
      return;
    }
    if (kind === "EXTRA"){
      // v177: a missed or lost stamp (e.g. browser data wiped), given by Sandra on top of
      // today's stamp. Not bound to the 1-per-day rule, but every code works only once.
      if (localData.lastExtraCounter != null && lastSalonCounter <= localData.lastExtraCounter){ closeStampScanner(); showToast(t("stamp_extra_used", state.lang)); return; }
      localData.lastExtraCounter = lastSalonCounter;
      localData.stamps++;
      if (localData.stamps >= 10 && !localData.cardFullAt) localData.cardFullAt = new Date().toISOString();
      finishSalonCode(localData.stamps === 10 ? "stamp_card_full_toast" : "stamp_extra_toast", "stamp-extra");
      return;
    }
    if (kind === "UNDO"){
      if (localData.stamps > 0){
        localData.stamps--;
        localData.lastStampDay = null;           // the correct stamp can be given again today
        if (localData.stamps < 10) localData.cardFullAt = null;
        finishSalonCode("stamp_undone_toast", "stamp-undone");
      } else { closeStampScanner(); showToast(t("stamp_nothing_to_undo", state.lang)); }
      return;
    }
    if (kind === "REDEEM"){
      if (localData.stamps >= 10){
        localData.stamps -= 10;                  // the reward can only be handed in once
        localData.cardFullAt = localData.stamps >= 10 ? new Date().toISOString() : null;
        localData.rewardsRedeemed = (localData.rewardsRedeemed || []).concat([new Date().toISOString()]);
        finishSalonCode("reward_redeemed_toast", "reward-redeemed");
      } else { closeStampScanner(); showToast(t("reward_not_full", state.lang)); }
      return;
    }
    // Invalid: say so (not on every video frame), keep scanning.
    if (source === "manual" || Date.now() - stampScan.lastInvalidAt > 2500){
      stampScan.lastInvalidAt = Date.now();
      setStampStatus("stamp_invalid", true);
    }
  }
  function finishSalonCode(toastKey, eventName){
    saveLocalData();
    closeStampScanner();
    renderLoyaltyBlock();
    renderReturningUserBlock();
    if (navigator.vibrate) navigator.vibrate(60);
    showToast(t(toastKey, state.lang));
    trackEvent(eventName);
  }

  function stopStampCamera(){
    clearInterval(stampScan.timer); stampScan.timer = null;
    if (stampScan.stream){ stampScan.stream.getTracks().forEach(tr => tr.stop()); stampScan.stream = null; }
    stampScan.detector = null; stampScan.busy = false;
  }
  function closeStampScanner(){
    stopStampCamera();
    const ov = $("#stampScanOverlay"); if (ov) ov.remove();
  }

  /* ---- salon side: show the rotating QR code (open the app with #salon) ---- */
  const salonMode = { timer:null, counter:null, wakeLock:null, kind:"STAMP" };

  async function openSalonMode(){
    if (!stampCryptoAvailable()){ showToast(t("stamp_unsupported", state.lang)); return; }
    if (typeof SALON_MODE_PIN === "string" && SALON_MODE_PIN){
      const entered = prompt(t("salon_pin_prompt", state.lang));
      if (entered === null || entered.trim() !== SALON_MODE_PIN){
        if (entered !== null) showToast(t("salon_pin_wrong", state.lang));
        return;
      }
    }
    const ok = await loadFirstScript(["assets/lib/qr-encoder.js"], () => !!window.BCQRCode);
    if (!ok){ showToast(t("stamp_unsupported", state.lang)); return; }
    if (!hasSalonKey()){ showSalonNoKey(); return; }
    closeSalonMode();
    const ov = document.createElement("div");
    ov.className = "stamp-overlay stamp-overlay--salon"; ov.id = "salonOverlay";
    ov.innerHTML = `
      <div class="stamp-overlay__panel">
        <button type="button" class="stamp-overlay__close" data-salon="close" aria-label="${t("stamp_close", state.lang)}">✕</button>
        <p class="stamp-overlay__title">${t("salon_title", state.lang)}</p>
        <div class="salon-modes" role="tablist">
          ${SALON_CODE_KINDS.concat(advVisible() ? ["ADVENT"] : []).concat(stockItems().length ? ["STOCK"] : []).map(k => `<button type="button" class="salon-mode${k === "ADVENT" || k === "STOCK" ? " salon-mode--advent" : ""}${k === salonMode.kind ? " is-active" : ""}" data-salon-kind="${k}">${t("salon_mode_" + k.toLowerCase(), state.lang)}</button>`).join("")}
        </div>
        <p class="salon-mode-hint" id="salonModeHint">${t("salon_mode_hint_" + salonMode.kind.toLowerCase(), state.lang)}</p>
        <canvas id="salonQr" class="salon-qr salon-qr--${salonMode.kind.toLowerCase()}" width="600" height="600"></canvas>
        <p class="salon-code" id="salonCode" hidden></p>
        <div class="salon-timer"><div class="salon-timer__fill" id="salonTimerFill"></div></div>
        <p class="stamp-overlay__hint" id="salonHint">${t("salon_hint", state.lang)}</p>
        <div class="salon-adv" id="salonAdvent" hidden></div>
        <div class="salon-adv salon-stock" id="salonStock" hidden></div>
        <button type="button" class="btn btn--primary btn--sm salon-ingr salon-tht" data-salon-gift="1">🎁 ${t("gift_salon_btn", state.lang)}</button>
        <button type="button" class="btn btn--primary btn--sm salon-ingr salon-tht" data-salon-ingr="stock">📦 ${t("inv_btn", state.lang)}</button>
        <button type="button" class="btn btn--primary btn--sm salon-ingr salon-tht" data-salon-ingr="open">⏰ ${t("tht_btn", state.lang)}</button>
        <button type="button" class="btn btn--text btn--sm salon-ingr" data-salon-ingr="1">${t("ingr_open_btn", state.lang)}</button>
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => {
      const k = e.target.closest("[data-salon-kind]");
      if (k){
        salonMode.kind = k.dataset.salonKind; salonMode.counter = null;
        ov.querySelectorAll("[data-salon-kind]").forEach(b => b.classList.toggle("is-active", b === k));
        applySalonKindUi();
        tickSalonMode();
        return;
      }
      const sk = e.target.closest("[data-salon-stock]");
      if (sk){
        const a = sk.dataset.salonStock;
        if (a === "use") stockAdjust(sk.dataset.item, -1, "manual");
        if (a === "add") stockAdjust(sk.dataset.item, +1, "manual");
        if (a === "hooktest"){ const first = stockItems()[0]; showToast(first && stockWebhook(first[0], "test", true) ? t("stock_hook_tested", state.lang) : t("stock_hook_off", state.lang)); }
        if (a === "hookdel"){ try { localStorage.removeItem(STOCK_HOOK_KEY); } catch(err){ /* ignore */ } renderSalonStock(); }
        return;
      }
      if (e.target.closest("[data-salon-gift]")){ closeSalonMode(); goTo("giftcard"); return; }
      const si = e.target.closest("[data-salon-ingr]");
      if (si){ ingr.unlocked = true; if (si.dataset.salonIngr === "open" || si.dataset.salonIngr === "stock") ingr.tab = si.dataset.salonIngr; closeSalonMode(); goTo("ingredients"); return; }
      const adv = e.target.closest("[data-salon-adv]");
      if (adv){
        if (adv.dataset.salonAdv === "scan") openStampScanner("advent");
        if (adv.dataset.salonAdv === "reset") resetAdventLedger();
        if (adv.dataset.salonAdv === "open") advOpenFromList(adv.dataset.code);
        return;
      }
      const a = e.target.closest("[data-salon]"); if (a) closeSalonMode();
    });
    applySalonKindUi();
    try { if (navigator.wakeLock) salonMode.wakeLock = await navigator.wakeLock.request("screen"); } catch(e){ /* optional */ }
    salonMode.counter = null;
    await tickSalonMode();
    salonMode.timer = setInterval(tickSalonMode, 1000);
  }

  // Advent tab: no rotating code, but a scanner for the clients' vouchers
  function applySalonKindUi(){
    const isStock = salonMode.kind === "STOCK";
    const isAdv = salonMode.kind === "ADVENT" || isStock;
    const hint = $("#salonModeHint"); if (hint) hint.textContent = t("salon_mode_hint_" + salonMode.kind.toLowerCase(), state.lang);
    const qr = $("#salonQr"); if (qr){ qr.className = "salon-qr salon-qr--" + salonMode.kind.toLowerCase(); qr.hidden = isAdv; }
    const hintEl = $("#salonHint"); if (hintEl) hintEl.hidden = isAdv;
    const timer = $("#salonOverlay .salon-timer"); if (timer) timer.hidden = isAdv;
    const box = $("#salonAdvent"); if (box){ box.hidden = !isAdv || isStock; if (isAdv && !isStock) renderSalonAdvent(); }
    const sb = $("#salonStock"); if (sb){ sb.hidden = !isStock; if (isStock) renderSalonStock(); }
  }

  // salon mode on a phone without the private key: explain, show nothing usable
  function showSalonNoKey(){
    closeSalonMode();
    const ov = document.createElement("div");
    ov.className = "stamp-overlay stamp-overlay--salon"; ov.id = "salonOverlay";
    ov.innerHTML = `<div class="stamp-overlay__panel">
        <button type="button" class="stamp-overlay__close" data-salon="close" aria-label="${t("stamp_close", state.lang)}">✕</button>
        <p class="stamp-overlay__title">🔒 ${t("salon_nokey_title", state.lang)}</p>
        <p class="stamp-overlay__hint">${t("salon_nokey_text", state.lang)}</p>
        <label class="stamp-scan__label" for="salonKeyInput">${t("salon_key_paste", state.lang)}</label>
        <div class="stamp-scan__manual stamp-scan__manual--adv">
          <input id="salonKeyInput" type="password" autocomplete="off" spellcheck="false" maxlength="200">
          <button type="button" class="btn btn--primary btn--sm" data-salonkey="save">OK</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", async e => {
      if (e.target.closest('[data-salonkey="save"]')){
        const v = ($("#salonKeyInput").value || "").trim().replace(/^.*#salonkey=/, "");
        const ok = await installSalonKey(v);
        showToast(t(ok ? "salon_key_ok" : "salon_key_bad", state.lang));
        if (ok) openSalonMode();
        return;
      }
      if (e.target === ov || e.target.closest("[data-salon]")) closeSalonMode();
    });
  }

  async function tickSalonMode(){
    if (salonMode.kind === "ADVENT" || salonMode.kind === "STOCK") return;
    const counter = stampCounterNow();
    const secs = Date.now() / 1000;
    const left = STAMP_STEP_SECONDS - (secs % STAMP_STEP_SECONDS);
    const fill = $("#salonTimerFill");
    if (fill) fill.style.width = `${(left / STAMP_STEP_SECONDS) * 100}%`;
    if (counter === salonMode.counter) return;
    salonMode.counter = counter;
    const kind = salonMode.kind;
    const code = await stampCodeFor(counter, kind);
    if (kind !== salonMode.kind || kind === "ADVENT" || kind === "STOCK") return;            // mode switched while computing
    drawQrToCanvas($("#salonQr"), code);
  }

  function drawQrToCanvas(canvas, text){
    if (!canvas || !window.BCQRCode) return;
    const { QRCode, ECL } = window.BCQRCode;
    const qr = new QRCode(-1, ECL.M);
    qr.addData(text); qr.make();
    const n = qr.getModuleCount(), quiet = 4;
    const size = canvas.width, cellPx = Math.floor(size / (n + quiet * 2));
    const offset = Math.floor((size - cellPx * n) / 2);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#000000";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++){
      if (qr.isDark(r, c)) ctx.fillRect(offset + c * cellPx, offset + r * cellPx, cellPx, cellPx);
    }
  }

  function closeSalonMode(){
    clearInterval(salonMode.timer); salonMode.timer = null;
    if (salonMode.wakeLock){ salonMode.wakeLock.release().catch(()=>{}); salonMode.wakeLock = null; }
    const ov = $("#salonOverlay"); if (ov) ov.remove();
    if (location.hash === "#salon") window.history.replaceState(null, "", location.pathname + location.search);
  }
  document.addEventListener("click", e => {
    const r = e.target.closest(".route-map, .practical-info__route");
    if (r) trackEvent("route-maps");
  });
  function checkSalonHash(){
    const mk = location.hash.match(/^#salonkey=([A-Za-z0-9_-]{43})$/);
    if (mk){
      window.history.replaceState(null, "", location.pathname + location.search);   // don't leave the key in the address bar
      installSalonKey(mk[1]).then(ok => {
        showToast(t(ok ? "salon_key_ok" : "salon_key_bad", state.lang));
        if (ok) openSalonMode();
      });
      return;
    }
    const mh = location.hash.match(/^#voorraadalarm=([a-z0-9]{20,40})$/);
    if (mh){
      window.history.replaceState(null, "", location.pathname + location.search);   // don't leave it in the address bar
      showToast(t(installStockHook(mh[1]) ? "stock_hook_installed" : "stock_hook_bad", state.lang));
      return;
    }
    if (location.hash === "#salon") openSalonMode();
    // Sandra's direct link to the shelf-life list (works only on her phone, with the salon key)
    else if (location.hash === "#houdbaarheid" && ingrSandra()){
      window.history.replaceState(null, "", location.pathname + location.search);
      ingr.tab = "open"; goTo("ingredients");
    }
    else if (location.hash === "#voorraad" && ingrSandra()){
      window.history.replaceState(null, "", location.pathname + location.search);
      ingr.tab = "stock"; goTo("ingredients");
    }
    // direct link to the stamp card, e.g. a QR poster in the salon:
    // https://beautyandcoffeemechelen.github.io/#stempelkaart
    else if (location.hash === "#route" || location.hash === "#parkeren"){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("findme");
    }
    else if (location.hash === "#advent" || location.hash === "#adventskalender"){
      window.history.replaceState(null, "", location.pathname + location.search);
      if (advVisible()) goTo("advent");
    }
    else if (/^#(ingredienten|ingrediënten|ingredients|allergie|allergieen|allergies)$/i.test(decodeURIComponent(location.hash))){
      window.history.replaceState(null, "", location.pathname + location.search);
      ingrOpen();
    }
    else if (/^#(prijslijst|prijzen|prices|tarifs|boeken|book|afspraak)$/i.test(location.hash)){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("pricelist");
    }
    else if (/^#(huisregels|rules|regles)$/i.test(location.hash)){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("houserules");
    }
    else if (/^#(contact|stem|voice)$/i.test(location.hash)){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("findme");
    }
    else if (/^#bon=BCG2\./.test(location.hash)){
      const tok = location.hash.slice(5);
      window.history.replaceState(null, "", location.pathname + location.search);
      giftFromHash(tok);
    }
    else if (/^#(cadeaubon|cadeaubonnen|giftcard|bon)$/i.test(location.hash)){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("giftcard");
    }
    else if (location.hash === "#stempelkaart" || location.hash === "#stamps"){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("stampcard");
    }
  }

  /* ---------------- gift cards (v183, live saldo v184) ----------------
     Sandra keeps the register on her phone (salon key). Every voucher has
     a random secret; the voucher link/QR she gives (…/#bon=BCG2.<payload>.<sig>)
     is signed with the salon key, so nobody can make or raise a voucher.
     Live balance: after every change her phone publishes cadeaubonnen.json
     to the GitHub repo of this site (token only on her phone, never in the
     code). The file holds no numbers or names, only SHA-256(number|secret)
     → amount/balance/valid, so only someone with the voucher link can look
     up a balance. payload = number~secret~amountCents~balanceCents~validUntil~issued~rev~standDate */
  const GIFT_REG_KEY = "bc_gift_reg_v1", GIFT_MINE_KEY = "bc_gift_mine_v1", GIFT_BACKUP_KEY = "bc_gift_backup_v1", GIFT_GH_KEY = "bc_gift_gh_v1", GIFT_PUB_KEY = "bc_gift_pub_v1";
  const GIFT = (typeof GIFT_CARDS === "object" && GIFT_CARDS) ? GIFT_CARDS : { validityMonths:12, amounts:[25,50,75,100], minAmount:10, seed:[] };
  const gift = { open:"", buyAmount:0, buyPay:"transfer", live:null, liveAt:0, liveBusy:null, publishing:false };
  const giftEuro = c => { const v = (Number(c) || 0) / 100; return "€" + (Number.isInteger(v) ? String(v) : v.toFixed(2).replace(".", ",")); };
  const giftCents = s => { const m = String(s || "").replace(/[€\s]/g, "").replace(",", ".").match(/^\d+(\.\d{1,2})?$/); return m ? Math.round(parseFloat(m[0]) * 100) : NaN; };
  function giftAddMonths(key, months){
    const [y, m, d] = key.split("-").map(Number);
    const dt = new Date(y, m - 1 + months, d);
    if (dt.getDate() !== d) dt.setDate(0);   // 31/01 + 1 month → end of February
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  }
  // validity: GIFT.validityMonths, or longer from a given date (Belgium: 2 years for vouchers sold from 1/4/2027)
  function giftMonthsFor(issued){
    let m = GIFT.validityMonths || 12;
    (GIFT.validityRules || []).forEach(r => { if (issued >= r.from && r.months > m) m = r.months; });
    return m;
  }
  function giftLoad(k, def){ try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v && typeof v === "object" ? v : def; } catch(e){ return def; } }
  function giftSave(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(e){ return false; } }
  function giftSecret(){ const a = "abcdefghjkmnpqrstuvwxyz23456789", r = crypto.getRandomValues(new Uint8Array(10)); return Array.from(r, x => a[x % a.length]).join(""); }
  async function giftHash(n, s){
    const h = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("BCG|" + n + "|" + s)));
    return Array.from(h.slice(0, 12), x => x.toString(16).padStart(2, "0")).join("");
  }

  /* ---- Sandra's register ---- */
  function giftReg(){
    const r = giftLoad(GIFT_REG_KEY, { v:{} });
    if (!r.v) r.v = {};
    let ch = false;
    if (!r.seeded){   // the paper vouchers sold before the app (data.js), added once
      (GIFT.seed || []).forEach(s => { if (!r.v[s.n]) r.v[s.n] = { a: Math.round(s.a * 100), issued: s.issued, valid: s.valid, paper: !!s.paper, buyer:"", to:"", pay: s.pay || "", note:"", rev:1, uses:[] }; });
      r.seeded = 1; ch = true;
    }
    if ((r.seedRev || 1) < (GIFT.seedRev || 1)){   // data.js changed the paper vouchers (e.g. validity 1 → 2 years)
      (GIFT.seed || []).forEach(s => { const v = r.v[s.n]; if (v && s.valid > v.valid){ v.valid = s.valid; v.rev = (v.rev || 1) + 1; } });
      r.seedRev = GIFT.seedRev; ch = true;
    }
    Object.values(r.v).forEach(v => { if (!v.s){ v.s = giftSecret(); ch = true; } });
    if (ch) giftSave(GIFT_REG_KEY, r);
    return r;
  }
  const giftBal = v => v.a - (v.uses || []).reduce((s, u) => s + (u.c || 0), 0);
  function giftStatus(v, bal){
    if (bal <= 0) return "used";
    if (v.valid < todayKey()) return "expired";
    return "open";
  }
  function giftNextNumber(r){
    const y = todayKey().slice(0, 4);
    const nums = Object.keys(r.v).filter(n => n.startsWith(y)).map(n => parseInt(n.slice(4), 10)).filter(Number.isFinite);
    return y + String((nums.length ? Math.max(...nums) : 0) + 1).padStart(2, "0");
  }
  async function giftToken(n, v){
    const p = [n, v.s, v.a, Math.max(0, giftBal(v)), v.valid, v.issued, v.rev || 1, todayKey()].join("~");
    const sig = await crypto.subtle.sign(ECDSA_SIGN, await getSalonPrivKey(), new TextEncoder().encode("BC-GIFT|" + p));
    return "BCG2." + b64u(new TextEncoder().encode(p)) + "." + b64u(sig);
  }
  const giftLink = tok => location.origin + location.pathname + "#bon=" + tok;
  async function giftVerify(tok){
    const m = String(tok || "").trim().match(/(?:#bon=)?(BCG2\.([A-Za-z0-9_-]{8,240})\.([A-Za-z0-9_-]{80,90}))\s*$/);
    if (!m) return null;
    try {
      const p = new TextDecoder().decode(unb64u(m[2]));
      const ok = await crypto.subtle.verify(ECDSA_SIGN, await getSalonPubKey(), unb64u(m[3]), new TextEncoder().encode("BC-GIFT|" + p));
      if (!ok) return null;
      const [n, s, a, b, valid, issued, rev, stand] = p.split("~");
      if (!/^\d{4,10}$/.test(n) || !/^[a-z0-9]{6,20}$/.test(s)) return null;
      return { n, s, a:+a, b:+b, valid, issued, rev:+rev || 1, stand, tok:m[1] };
    } catch(e){ return null; }
  }

  /* ---- live balances (GitHub) ---- */
  function giftRepo(){
    const L = GIFT.live || {}, host = location.hostname || "";
    const owner = L.owner || (/\.github\.io$/.test(host) ? host.split(".")[0] : "");
    const repo = L.repo || (/\.github\.io$/.test(host) ? host : "");
    return { owner, repo, file: L.file || "cadeaubonnen.json" };
  }
  async function giftLiveFetch(force){
    if (!force && gift.live && Date.now() - gift.liveAt < 60000) return gift.live;
    if (gift.liveBusy) return gift.liveBusy;
    const { owner, repo, file } = giftRepo();
    gift.liveBusy = (async () => {
      const tries = [];
      if (owner && repo) tries.push([`https://api.github.com/repos/${owner}/${repo}/contents/${file}`, { headers:{ Accept:"application/vnd.github.raw+json" }, cache:"no-store" }]);
      tries.push([`${file}?t=${Date.now()}`, { cache:"no-store" }]);
      for (const [u, o] of tries){
        try {
          const res = await fetch(u, o);
          if (!res.ok) continue;
          const j = JSON.parse(await res.text());
          if (j && j.b){ gift.live = j; gift.liveAt = Date.now(); return j; }
        } catch(e){ /* next */ }
      }
      return null;
    })();
    try { return await gift.liveBusy; } finally { gift.liveBusy = null; }
  }
  function giftToken64(str){ return btoa(unescape(encodeURIComponent(str))); }
  async function giftPublish(silent){
    const L = state.lang, tok = (() => { try { return localStorage.getItem(GIFT_GH_KEY) || ""; } catch(e){ return ""; } })();
    if (!tok) return false;
    const { owner, repo, file } = giftRepo();
    if (!owner || !repo){ if (!silent) showToast(t("gift_live_norepo", L)); return false; }
    if (gift.publishing) return false;
    gift.publishing = true;
    const r = giftReg(), out = { v:1, u: new Date().toISOString(), b:{} };
    for (const [n, v] of Object.entries(r.v)) out.b[await giftHash(n, v.s)] = { a: v.a, b: Math.max(0, giftBal(v)), valid: v.valid, rev: v.rev || 1 };
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${file}`;
    const H = { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json" };
    let ok = false, err = "";
    for (let attempt = 0; attempt < 2 && !ok; attempt++){
      try {
        let sha;
        const g = await fetch(api, { headers: H, cache:"no-store" });
        if (g.ok) sha = (await g.json()).sha; else if (g.status !== 404){ err = "GET " + g.status; continue; }
        const p = await fetch(api, { method:"PUT", headers: { ...H, "Content-Type":"application/json" },
          body: JSON.stringify({ message: "Cadeaubonnen bijgewerkt (app)", content: giftToken64(JSON.stringify(out)), ...(sha ? { sha } : {}) }) });
        if (p.ok) ok = true; else err = "PUT " + p.status;
      } catch(e){ err = String(e && e.message || e); }
    }
    gift.publishing = false;
    giftSave(GIFT_PUB_KEY, { d: new Date().toISOString(), ok, err });
    if (ok){ gift.live = out; gift.liveAt = Date.now(); }
    if (!silent || !ok) showToast(t(ok ? "gift_live_ok" : "gift_live_fail", L).replace("{e}", err));
    return ok;
  }

  // client: keep the newest signed state of every voucher on this phone
  function giftMine(){ return giftLoad(GIFT_MINE_KEY, {}); }
  function giftKeep(g){
    const mine = giftMine(), old = mine[g.n];
    if (old && old.rev > g.rev) return "older";
    mine[g.n] = { s:g.s, a:g.a, b:g.b, valid:g.valid, issued:g.issued, rev:g.rev, stand:g.stand, tok:g.tok };
    giftSave(GIFT_MINE_KEY, mine);
    return old ? "updated" : "added";
  }
  async function giftFromHash(tok){
    const g = await giftVerify(tok);
    if (!g){ showToast(t("gift_bad_code", state.lang)); return; }
    const r = giftKeep(g);
    showToast(t(r === "older" ? "gift_older" : "gift_saved", state.lang));
    goTo("giftcard");
  }
  // live state for the vouchers on this phone (newer than the link → shown and kept)
  async function giftApplyLive(){
    const mine = giftMine(), nums = Object.keys(mine).filter(n => mine[n].s);
    if (!nums.length) return false;
    const live = await giftLiveFetch();
    if (!live) return false;
    let ch = false;
    for (const n of nums){
      const x = mine[n], rec = live.b[await giftHash(n, x.s)];
      if (rec && (rec.rev || 0) >= (x.rev || 0)){ Object.assign(x, { a:rec.a, b:rec.b, valid:rec.valid, rev:rec.rev, stand:todayKey(), live:true }); ch = true; }
      else if (!rec && x.live){ x.live = false; ch = true; }
    }
    if (ch) giftSave(GIFT_MINE_KEY, mine);
    return ch;
  }

  function giftCardHtml(n, x, L){
    const st = x.b <= 0 ? "used" : (x.valid < todayKey() ? "expired" : "open");
    return `<div class="gift-card gift-card--${st}">
        <div class="gift-card__top"><span class="gift-card__brand">BEAUTY &amp; COFFEE</span><span class="gift-card__nr">${t("gift_nr", L)} ${esc(n)}</span></div>
        <p class="gift-card__label">${t("gift_balance", L)}</p>
        <p class="gift-card__amount">${giftEuro(x.b)}</p>
        <p class="gift-card__of">${t("gift_of", L).replace("{a}", giftEuro(x.a))}</p>
        <p class="gift-card__valid">${st === "used" ? t("gift_st_used", L) : st === "expired" ? t("gift_st_expired", L).replace("{d}", advFmt(x.valid)) : t("gift_valid_until", L).replace("{d}", advFmt(x.valid))}</p>
        <p class="gift-card__stand">${x.live ? `<span class="gift-live-dot"></span> ${t("gift_live", L)}` : t("gift_stand", L).replace("{d}", advFmt(x.stand || todayKey()))}</p>
        <p class="gift-card__terms">${t("gift_terms", L)}</p>
        <div class="gift-card__foot">Beauty &amp; Coffee · Barbarastraat 25, 2800 Mechelen · 0499 22 19 01 · ${esc(BOOKING_EMAIL)}</div>
      </div>
      <div class="gift-card__actions">
        ${st === "open" && typeof ONLINE_BOOKING_URL !== "undefined" && ONLINE_BOOKING_URL ? `<a class="btn btn--outline btn--sm" href="${esc(ONLINE_BOOKING_URL)}" target="_blank" rel="noopener noreferrer" data-action="online-book" data-online-src="gift">📅 ${t("gift_book_online", L)}</a>` : ""}
        <a class="btn btn--text btn--sm" target="_blank" rel="noopener noreferrer" href="https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(t("gift_ask_text", L).replace("{n}", n))}">💬 ${t("gift_ask_btn", L)}</a>
      </div>`;
  }

  function renderGiftCard(){
    const L = state.lang, body = $("#giftBody"); if (!body) return;
    const mine = giftMine(), nums = Object.keys(mine).sort();
    const months = giftMonthsFor(todayKey());
    const amounts = (GIFT.amounts || [25, 50, 75, 100]).map(a => `<button type="button" class="chip${gift.buyAmount === a * 100 ? " is-selected" : ""}" data-gift-amt="${a}">€${a}</button>`).join("");
    const iban = GIFT.iban ? `<div class="gift-bank"><p><b>${t("gift_bank_title", L)}</b></p>
          <p>${t("gift_bank_to", L)} <b>${esc(GIFT.beneficiary || "Beauty & Coffee")}</b></p>
          <p>IBAN <b class="gift-copy" data-gift-copy="${esc(GIFT.iban.replace(/\s/g, ""))}">${esc(GIFT.iban)}</b> <span class="ingr-muted">(${t("gift_tap_copy", L)})</span></p>
          <p>${t("gift_bank_amount", L)} <b id="giftAmtRef">…</b></p>
          <p>${t("gift_bank_msg", L)} <b id="giftMsgRef"></b></p>
          <canvas id="giftEpc" class="gift-qr" width="420" height="420" hidden></canvas>
          <p class="ingr-muted" id="giftEpcHint" hidden>${t("gift_epc_hint", L)}</p></div>` : `<p class="ingr-muted">${t("gift_bank_ask", L)}</p>`;
    let html = "";
    if (hasSalonKey()) html += `<div class="gift-salon" id="giftSalon">${giftSalonHtml()}</div>`;
    html += `<div class="gift-block">
        <p class="gift-block__title">🎁 ${t("gift_mine_title", L)}</p>
        ${nums.length ? nums.map(n => giftCardHtml(n, mine[n], L)).join("") : `<p class="ingr-muted">${t("gift_mine_none", L)}</p>`}
        <label class="pm-label" for="giftCodeIn">${t("gift_code_label", L)}</label>
        <input type="text" id="giftCodeIn" class="pm-input" autocomplete="off" placeholder="${t("gift_code_ph", L)}">
        <button type="button" class="btn btn--outline btn--sm" data-action="gift-check">${t("gift_check_btn", L)}</button>
        <p class="ingr-muted" id="giftCheckOut"></p>
      </div>
      <div class="gift-block">
        <p class="gift-block__title">💝 ${t("gift_buy_title", L)}</p>
        <p class="ingr-note">${t("gift_buy_intro", L).replace("{m}", months)}</p>
        <p class="gift-terms">${t("gift_terms_full", L)}</p>
        <div class="ingr-chips">${amounts}</div>
        <input type="text" inputmode="decimal" id="giftOwnAmt" class="pm-input" placeholder="${t("gift_own_amount", L).replace("{min}", GIFT.minAmount || 10)}">
        <input type="text" id="giftFor" class="pm-input" maxlength="40" placeholder="${t("gift_for_ph", L)}">
        <input type="text" id="giftFrom" class="pm-input" maxlength="40" placeholder="${t("gift_from_ph", L)}">
        <input type="text" id="giftNote" class="pm-input" maxlength="140" placeholder="${t("gift_note_ph", L)}">
        <div class="ingr-chips">
          <button type="button" class="chip${gift.buyPay === "transfer" ? " is-selected" : ""}" data-gift-pay="transfer">🏦 ${t("gift_pay_transfer", L)}</button>
          <button type="button" class="chip${gift.buyPay === "salon" ? " is-selected" : ""}" data-gift-pay="salon">💳 ${t("gift_pay_salon", L)}</button>
        </div>
        <div id="giftPayInfo">${gift.buyPay === "transfer" ? iban : `<p class="ingr-muted">${t("gift_pay_salon_info", L)}</p>`}</div>
        <a class="btn btn--primary btn--wide" id="giftWa" target="_blank" rel="noopener noreferrer" href="#">💬 ${t("gift_send_wa", L)}</a>
        <a class="btn btn--text btn--sm" id="giftMail" href="#">✉️ ${t("gift_send_mail", L)}</a>
        <p class="ingr-muted">${t("gift_how", L)}</p>
      </div>`;
    body.innerHTML = html;
    giftBuyUpdate();
    if (hasSalonKey()) giftSalonAfter();
    // live balances: update the cards once the file is in
    if (nums.some(n => mine[n].s)) giftApplyLive().then(ch => { if (ch && $('section.step[data-step="giftcard"]').classList.contains("is-active")) giftRerenderMine(); });
  }
  function giftRerenderMine(){
    const L = state.lang, mine = giftMine(), blk = $("#giftBody .gift-block"); if (!blk) return;
    $$("#giftBody .gift-block .gift-card, #giftBody .gift-block .gift-card__actions").forEach(e => e.remove());
    const title = blk.querySelector(".gift-block__title");
    const none = blk.querySelector(".gift-block__title + .ingr-muted"); if (none) none.remove();
    title.insertAdjacentHTML("afterend", Object.keys(mine).sort().map(n => giftCardHtml(n, mine[n], L)).join(""));
  }
  function giftEpcText(cents, ref){
    const ib = String(GIFT.iban || "").replace(/\s/g, "");
    return ["BCD", "002", "1", "SCT", GIFT.bic || "", (GIFT.beneficiary || "Beauty & Coffee").slice(0, 70), ib, "EUR" + (cents / 100).toFixed(2), "", "", ref.slice(0, 140), ""].join("\n");
  }
  function giftBuyUpdate(){
    const L = state.lang;
    const own = giftCents(($("#giftOwnAmt") || {}).value);
    const amt = Number.isFinite(own) && own > 0 ? own : gift.buyAmount;
    const forN = (($("#giftFor") || {}).value || "").trim(), fromN = (($("#giftFrom") || {}).value || "").trim(), note = (($("#giftNote") || {}).value || "").trim();
    const ref = (t("gift_ref", L) + (forN ? " " + forN : "") + (fromN ? " – " + fromN : "")).slice(0, 140);
    const okAmt = amt >= (GIFT.minAmount || 10) * 100;
    const r = $("#giftMsgRef"); if (r) r.textContent = ref;
    const ar = $("#giftAmtRef"); if (ar) ar.textContent = okAmt ? giftEuro(amt) : "…";
    const cv = $("#giftEpc"), hint = $("#giftEpcHint");
    if (cv){
      cv.hidden = !okAmt; if (hint) hint.hidden = !okAmt;
      if (okAmt) loadFirstScript(["assets/lib/qr-encoder.js"], () => !!window.BCQRCode).then(ok => { if (ok) drawQrToCanvas(cv, giftEpcText(amt, ref)); });
    }
    const text = t("gift_wa_text", L).replace("{a}", okAmt ? giftEuro(amt) : "…").replace("{for}", forN || "…").replace("{from}", fromN || "…")
      .replace("{pay}", t(gift.buyPay === "transfer" ? "gift_pay_transfer" : "gift_pay_salon", L)) + (note ? "\n" + t("gift_note_line", L) + " " + note : "");
    const wa = $("#giftWa"), ml = $("#giftMail");
    if (wa){ wa.href = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(text)}`; wa.classList.toggle("is-disabled", !okAmt); }
    if (ml) ml.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t("gift_mail_subject", L))}&body=${encodeURIComponent(text)}`;
  }
  async function giftCheck(){
    const L = state.lang, v = (($("#giftCodeIn") || {}).value || "").trim(), out = $("#giftCheckOut");
    if (!v) return;
    const g = await giftVerify(v);
    if (g){ const r = giftKeep(g); showToast(t(r === "older" ? "gift_older" : "gift_saved", L)); renderGiftCard(); return; }
    const nr = v.replace(/\D/g, "");
    if (out) out.innerHTML = /^\d{4,10}$/.test(nr)
      ? `${t("gift_paper_info", L).replace("{n}", esc(nr))} <a target="_blank" rel="noopener noreferrer" href="https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(t("gift_ask_text", L).replace("{n}", nr))}">💬 ${t("gift_ask_btn", L)}</a>`
      : t("gift_bad_code", L);
  }

  /* ---- salon side ---- */
  function giftHasToken(){ try { return !!localStorage.getItem(GIFT_GH_KEY); } catch(e){ return false; } }
  function giftSalonHtml(){
    const L = state.lang, r = giftReg(), today = todayKey();
    const rows = Object.entries(r.v).map(([n, v]) => ({ n, v, bal: giftBal(v) })).map(x => ({ ...x, st: giftStatus(x.v, x.bal) }));
    const open = rows.filter(x => x.st === "open"), totalOpen = open.reduce((s, x) => s + x.bal, 0);
    const soon = open.filter(x => x.v.valid <= giftAddMonths(today, 1));
    const order = { open:0, expired:1, used:2 };
    rows.sort((a, b) => order[a.st] - order[b.st] || a.n.localeCompare(b.n));
    const bk = giftLoad(GIFT_BACKUP_KEY, {}).d || "";
    const bkOld = !bk || (new Date(today) - new Date(bk)) / 86400000 > 14;
    const pub = giftLoad(GIFT_PUB_KEY, {});
    const liveHtml = giftHasToken()
      ? `<p class="gift-live-status${pub.ok === false ? " is-bad" : ""}">${pub.ok === false ? "⚠️ " + t("gift_live_last_fail", L).replace("{e}", esc(pub.err || "")) : pub.d ? `<span class="gift-live-dot"></span> ${t("gift_live_last", L).replace("{d}", new Date(pub.d).toLocaleString(L === "en" ? "en-GB" : L === "fr" ? "fr-BE" : "nl-BE", { dateStyle:"short", timeStyle:"short" }))}` : t("gift_live_never", L)}</p>
         <button type="button" class="btn btn--outline btn--sm" data-action="gift-publish">🔄 ${t("gift_live_publish", L)}</button>
         <button type="button" class="btn btn--text btn--sm" data-action="gift-token-del">${t("gift_live_token_del", L)}</button>`
      : `<p class="gift-warn">🌐 ${t("gift_live_off", L)}</p>
         <button type="button" class="btn btn--outline btn--sm" data-action="gift-token">🔑 ${t("gift_live_token_btn", L)}</button>`;
    const list = rows.map(x => `<li class="gift-row gift-row--${x.st}${gift.open === x.n ? " is-open" : ""}">
        <button type="button" class="gift-row__head" data-gift-open="${esc(x.n)}">
          <span><b>${esc(x.n)}</b>${x.v.paper ? " 📄" : ""}${x.v.to ? " · " + esc(x.v.to) : ""}</span>
          <span>${giftEuro(x.bal)} / ${giftEuro(x.v.a)} · ${t("gift_st_" + x.st + "_short", L)} ${x.st === "used" ? "" : advFmt(x.v.valid)}</span>
        </button>
        ${gift.open === x.n ? giftDetailHtml(x.n, x.v, x.bal, x.st) : ""}
      </li>`).join("");
    return `<p class="gift-block__title">🔒 ${t("gift_salon_title", L)}</p>
      <p class="ingr-note">${t("gift_salon_sum", L).replace("{n}", open.length).replace("{t}", giftEuro(totalOpen))}${soon.length ? ` · ⚠️ ${t("gift_salon_soon", L).replace("{n}", soon.length)}` : ""}</p>
      <div class="gift-live">${liveHtml}</div>
      ${bkOld ? `<p class="gift-warn">💾 ${t(bk ? "gift_backup_old" : "gift_backup_never", L).replace("{d}", bk ? advFmt(bk) : "")}</p>` : ""}
      <input type="search" id="giftFind" class="price-search" placeholder="🔎 ${t("gift_find_ph", L)}" autocomplete="off">
      <ul class="gift-list">${list}</ul>
      <details class="gift-new"${Object.keys(r.v).length ? "" : " open"}><summary>➕ ${t("gift_new_title", L)}</summary>
        <label class="pm-label">${t("gift_new_nr", L)}</label><input type="text" id="giftNewNr" class="pm-input" value="${giftNextNumber(r)}" inputmode="numeric">
        <label class="pm-label">${t("gift_new_amt", L)}</label><input type="text" id="giftNewAmt" class="pm-input" inputmode="decimal" placeholder="100">
        <label class="pm-label">${t("gift_new_date", L).replace("{m}", giftMonthsFor(today))}</label><input type="date" id="giftNewDate" class="pm-input" value="${today}">
        <input type="text" id="giftNewBuyer" class="pm-input" maxlength="40" placeholder="${t("gift_new_buyer", L)}">
        <input type="text" id="giftNewTo" class="pm-input" maxlength="40" placeholder="${t("gift_new_to", L)}">
        <select id="giftNewPay" class="pm-input">${["transfer", "cash", "payconiq", "card"].map(p => `<option value="${p}">${t("gift_paid_" + p, L)}</option>`).join("")}</select>
        <label class="chip chip--check"><input type="checkbox" id="giftNewPaper"> ${t("gift_new_paper", L)}</label>
        <button type="button" class="btn btn--primary btn--sm" data-action="gift-create">${t("gift_new_save", L)}</button>
      </details>
      <div class="gift-backup">
        <button type="button" class="btn btn--outline btn--sm" data-action="gift-backup">💾 ${t("gift_backup_btn", L)}</button>
        <label class="btn btn--text btn--sm">📂 ${t("gift_restore_btn", L)}<input type="file" id="giftRestore" accept="application/json,.json" hidden></label>
      </div>`;
  }
  function giftDetailHtml(n, v, bal, st){
    const L = state.lang;
    const uses = (v.uses || []).map((u, i) => `<li>${advFmt(u.d)} · −${giftEuro(u.c)}${u.w ? " · " + esc(u.w) : ""} <button type="button" class="btn btn--text btn--sm" data-gift-undo="${i}">↩︎</button></li>`).join("");
    return `<div class="gift-detail">
        <p>${t("gift_d_issued", L)} ${advFmt(v.issued)} · ${t("gift_d_valid", L)} ${advFmt(v.valid)}${v.pay ? " · " + t("gift_paid_" + v.pay, L) : ""}</p>
        ${v.buyer ? `<p>${t("gift_d_buyer", L)} ${esc(v.buyer)}</p>` : ""}
        ${uses ? `<ul class="gift-uses">${uses}</ul>` : `<p class="ingr-muted">${t("gift_d_nouse", L)}</p>`}
        ${st === "open" ? `<div class="gift-use">
          <input type="text" inputmode="decimal" id="giftUseAmt" class="pm-input" placeholder="${t("gift_use_amt", L).replace("{b}", giftEuro(bal))}">
          <input type="text" id="giftUseWhat" class="pm-input" maxlength="60" placeholder="${t("gift_use_what", L)}">
          <button type="button" class="btn btn--primary btn--sm" data-action="gift-use">${t("gift_use_btn", L)}</button></div>` : ""}
        ${st === "expired" ? `<p class="gift-warn">${t("gift_d_expired_note", L)}</p>
          <button type="button" class="btn btn--outline btn--sm" data-action="gift-extend">${t("gift_extend_btn", L)}</button>` : ""}
        <div class="gift-share">
          <button type="button" class="btn btn--outline btn--sm" data-action="gift-share">📲 ${t("gift_share_btn", L)}</button>
          <canvas id="giftQr" class="gift-qr" width="480" height="480" hidden></canvas>
          <p class="ingr-muted" id="giftShareOut"></p>
        </div>
        <button type="button" class="btn btn--text btn--sm gift-del" data-action="gift-delete">🗑 ${t("gift_delete_btn", L)}</button>
      </div>`;
  }
  function giftSalonRefresh(){ const s = $("#giftSalon"); if (s){ s.innerHTML = giftSalonHtml(); giftSalonAfter(); } }
  function giftSalonAfter(){
    const f = $("#giftFind");
    if (f) f.addEventListener("input", () => {
      const q = f.value.trim().toLowerCase();
      $$(".gift-row").forEach(li => { li.hidden = !!q && !li.textContent.toLowerCase().includes(q); });
    });
    const rs = $("#giftRestore");
    if (rs) rs.addEventListener("change", () => {
      const file = rs.files && rs.files[0]; if (!file) return;
      file.text().then(txt => {
        const d = JSON.parse(txt);
        if (!d || !d.v) throw new Error("bad");
        const r = giftReg(); let n = 0;
        Object.entries(d.v).forEach(([k, v]) => { if (!r.v[k] || (v.rev || 0) >= (r.v[k].rev || 0)){ r.v[k] = v; n++; } });
        giftSave(GIFT_REG_KEY, r); showToast(t("gift_restored", state.lang).replace("{n}", n)); giftSalonRefresh(); giftPublish(true);
      }).catch(() => showToast(t("gift_restore_bad", state.lang)));
    });
  }
  // every change: save, refresh, publish the live balances (silent unless it fails)
  function giftCommit(r){ giftSave(GIFT_REG_KEY, r); giftSalonRefresh(); giftPublish(true).then(() => giftSalonRefresh()); }
  function giftChange(fn){ const r = giftReg(), v = r.v[gift.open]; if (!v) return; fn(v, r); v.rev = (v.rev || 1) + 1; giftCommit(r); }
  function giftCreate(){
    const L = state.lang, r = giftReg();
    const n = (($("#giftNewNr") || {}).value || "").replace(/\D/g, ""), a = giftCents(($("#giftNewAmt") || {}).value), d = ($("#giftNewDate") || {}).value || todayKey();
    if (!/^\d{4,10}$/.test(n)){ showToast(t("gift_err_nr", L)); return; }
    if (r.v[n]){ showToast(t("gift_err_exists", L).replace("{n}", n)); return; }
    if (!(a > 0)){ showToast(t("gift_err_amt", L)); return; }
    r.v[n] = { a, issued:d, valid: giftAddMonths(d, giftMonthsFor(d)), paper: !!($("#giftNewPaper") || {}).checked, s: giftSecret(),
      buyer: (($("#giftNewBuyer") || {}).value || "").trim(), to: (($("#giftNewTo") || {}).value || "").trim(), pay: ($("#giftNewPay") || {}).value || "", note:"", rev:1, uses:[] };
    gift.open = n; showToast(t("gift_created", L).replace("{n}", n)); giftCommit(r);
  }
  function giftUse(){
    const L = state.lang, c = giftCents(($("#giftUseAmt") || {}).value), w = (($("#giftUseWhat") || {}).value || "").trim();
    const r = giftReg(), v = r.v[gift.open]; if (!v) return;
    const bal = giftBal(v);
    if (!(c > 0)){ showToast(t("gift_err_amt", L)); return; }
    if (c > bal){ showToast(t("gift_err_over", L).replace("{b}", giftEuro(bal))); return; }
    if (!confirm(t("gift_use_confirm", L).replace("{a}", giftEuro(c)).replace("{n}", gift.open).replace("{b}", giftEuro(bal - c)))) return;
    giftChange(v2 => { v2.uses = (v2.uses || []).concat([{ d: todayKey(), c, w }]); });
    showToast(t("gift_used_ok", L).replace("{b}", giftEuro(bal - c)));
  }
  async function giftShare(){
    const L = state.lang, r = giftReg(), v = r.v[gift.open]; if (!v) return;
    let tok;
    try { tok = await giftToken(gift.open, v); } catch(e){ showToast(t("stamp_unsupported", L)); return; }
    const link = giftLink(tok), out = $("#giftShareOut"), cv = $("#giftQr");
    const msg = t("gift_share_text", L).replace("{n}", gift.open).replace("{b}", giftEuro(giftBal(v))).replace("{d}", advFmt(v.valid)) + "\n" + link;
    if (await loadFirstScript(["assets/lib/qr-encoder.js"], () => !!window.BCQRCode) && cv){ cv.hidden = false; drawQrToCanvas(cv, link); }
    if (out) out.innerHTML = `${t("gift_share_hint", L)}<br>
      <a class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer" href="https://wa.me/?text=${encodeURIComponent(msg)}">💬 WhatsApp</a>
      <a class="btn btn--outline btn--sm" href="mailto:?subject=${encodeURIComponent(t("gift_mail_subject_salon", L).replace("{n}", gift.open))}&body=${encodeURIComponent(msg)}">✉️ E-mail</a>
      <button type="button" class="btn btn--text btn--sm" data-gift-copy="${esc(link)}">📋 ${t("gift_copy_link", L)}</button>`;
  }
  function giftBackup(){
    const r = giftReg(), blob = new Blob([JSON.stringify(r, null, 1)], { type:"application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `cadeaubonnen-${todayKey()}.json`;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    giftSave(GIFT_BACKUP_KEY, { d: todayKey() }); giftSalonRefresh();
  }
  function giftBind(){
    const body = $("#giftBody"); if (!body || body.dataset.giftBound) return;
    body.dataset.giftBound = "1";
    body.addEventListener("input", e => { if (e.target.closest("#giftOwnAmt, #giftFor, #giftFrom, #giftNote")){ if (e.target.id === "giftOwnAmt" && e.target.value){ gift.buyAmount = 0; $$("[data-gift-amt]").forEach(b => b.classList.remove("is-selected")); } giftBuyUpdate(); } });
    body.addEventListener("click", e => {
      const L = state.lang;
      const am = e.target.closest("[data-gift-amt]");
      if (am){ gift.buyAmount = Number(am.dataset.giftAmt) * 100; const o = $("#giftOwnAmt"); if (o) o.value = ""; $$("[data-gift-amt]").forEach(b => b.classList.toggle("is-selected", b === am)); giftBuyUpdate(); return; }
      const pay = e.target.closest("[data-gift-pay]");
      if (pay){ const keep = ["giftOwnAmt", "giftFor", "giftFrom", "giftNote"].map(id => (($("#" + id) || {}).value || "")); gift.buyPay = pay.dataset.giftPay; renderGiftCard();
        ["giftOwnAmt", "giftFor", "giftFrom", "giftNote"].forEach((id, i) => { const x = $("#" + id); if (x) x.value = keep[i]; }); giftBuyUpdate(); return; }
      const wa = e.target.closest("#giftWa");
      if (wa && wa.classList.contains("is-disabled")){ e.preventDefault(); showToast(t("gift_err_min", L).replace("{min}", GIFT.minAmount || 10)); return; }
      const cp = e.target.closest("[data-gift-copy]");
      if (cp){ const c = cp.dataset.giftCopy; try { navigator.clipboard.writeText(c).then(() => showToast(t("gift_copied", L)), () => showToast(c)); } catch(err){ showToast(c); } return; }
      const op = e.target.closest("[data-gift-open]");
      if (op){ gift.open = gift.open === op.dataset.giftOpen ? "" : op.dataset.giftOpen; giftSalonRefresh(); return; }
      const un = e.target.closest("[data-gift-undo]");
      if (un){ if (confirm(t("gift_undo_confirm", L))) giftChange(v => { v.uses.splice(Number(un.dataset.giftUndo), 1); }); return; }
      const act = e.target.closest("[data-action]"); if (!act) return;
      const a = act.dataset.action;
      if (a === "gift-check") giftCheck();
      if (a === "gift-create") giftCreate();
      if (a === "gift-use") giftUse();
      if (a === "gift-share") giftShare();
      if (a === "gift-backup") giftBackup();
      if (a === "gift-publish") giftPublish(false).then(() => giftSalonRefresh());
      if (a === "gift-token"){
        const k = (prompt(t("gift_live_token_prompt", L)) || "").trim();
        if (k){ if (!/^(github_pat_|ghp_)[A-Za-z0-9_]{20,}$/.test(k)){ showToast(t("gift_live_token_bad", L)); return; }
          try { localStorage.setItem(GIFT_GH_KEY, k); } catch(err){ /* ignore */ }
          giftPublish(false).then(() => giftSalonRefresh()); }
      }
      if (a === "gift-token-del"){ if (confirm(t("gift_live_token_del_confirm", L))){ try { localStorage.removeItem(GIFT_GH_KEY); } catch(err){ /* ignore */ } giftSalonRefresh(); } }
      if (a === "gift-extend"){ const nd = prompt(t("gift_extend_prompt", L), giftAddMonths(todayKey(), 1)); if (nd && /^\d{4}-\d{2}-\d{2}$/.test(nd)) giftChange(v => { v.valid = nd; }); }
      if (a === "gift-delete"){ if (confirm(t("gift_delete_confirm", L).replace("{n}", gift.open))){ const r = giftReg(); delete r.v[gift.open]; gift.open = ""; giftCommit(r); } }
    });
  }

  /* ---------------- own products (v186) ----------------
     Sandra adds a product she bought in the app itself (name, INCI,
     treatments, best-before, months after opening, date of first use).
     Kept on her phone (bc_own_products_v1) and — with the GitHub key of the
     gift vouchers — published as producten-eigen.json in the site repo, so
     every visitor's allergy search includes it. Merged into SALON_PRODUCTS. */
  const OWN_KEY = "bc_own_products_v1", OWN_FILE = "producten-eigen.json";
  const own = { edit:"", publishing:false };
  function ownLocal(){ try { const v = JSON.parse(localStorage.getItem(OWN_KEY) || "{}"); return v && typeof v === "object" ? v : {}; } catch(e){ return {}; } }
  function ownSaveLocal(v){ try { localStorage.setItem(OWN_KEY, JSON.stringify(v)); } catch(e){ /* ignore */ } }
  function ownClean(p){
    const s = x => String(x == null ? "" : x).slice(0, 4000);
    const nm = s(p.name && (p.name.nl || p.name) || "").slice(0, 120);
    return { name:{ nl:nm, en:nm, fr:nm }, usedIn: (Array.isArray(p.usedIn) ? p.usedIn : []).filter(x => /^[a-z0-9-]{2,40}$/.test(x)).slice(0, 80),
      slot: /^[a-z]{2,30}$/.test(p.slot || "") ? p.slot : "own", inci: s(p.inci),
      note:{ nl:s(p.note && p.note.nl), en:s(p.note && p.note.nl), fr:s(p.note && p.note.nl) },
      sandraNote: p.sandraNote && p.sandraNote.nl ? { nl:s(p.sandraNote.nl), en:s(p.sandraNote.nl), fr:s(p.sandraNote.nl) } : undefined,
      own:true, u: s(p.u).slice(0, 30) };
  }
  function ownMerge(list){
    if (typeof SALON_PRODUCTS !== "object") return;
    Object.entries(list || {}).forEach(([id, p]) => {
      if (!/^own_[a-z0-9_]{2,60}$/.test(id)) return;
      if (p === null){ delete SALON_PRODUCTS[id]; return; }
      SALON_PRODUCTS[id] = ownClean(p);
    });
  }
  // public list first, then this phone's own edits on top
  ownMerge(ownLocal());
  (async function ownLoadPublic(){
    try {
      const res = await fetch(OWN_FILE + "?t=" + Date.now(), { cache:"no-store" });
      if (!res.ok) return;
      const j = await res.json();
      if (!j || !j.p) return;
      const loc = ownLocal();
      ownMerge(Object.fromEntries(Object.entries(j.p).filter(([id]) => !(id in loc))));
      const sec = $('section.step[data-step="ingredients"]');
      if (sec && sec.classList.contains("is-active")) renderIngredients();
    } catch(e){ /* offline or no file yet */ }
  })();
  async function ownPublish(silent){
    const L = state.lang, tok = (() => { try { return localStorage.getItem(GIFT_GH_KEY) || ""; } catch(e){ return ""; } })();
    if (!tok){ if (!silent) showToast(t("own_pub_nokey", L)); return false; }
    const { owner, repo } = giftRepo();
    if (!owner || !repo){ if (!silent) showToast(t("gift_live_norepo", L)); return false; }
    if (own.publishing) return false;
    own.publishing = true;
    const all = {};
    Object.entries(SALON_PRODUCTS).forEach(([id, p]) => { if (p && p.own) all[id] = ownClean(p); });
    Object.entries(ownLocal()).forEach(([id, p]) => { if (p === null) delete all[id]; });
    const out = { v:1, u: new Date().toISOString(), p: all };
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${OWN_FILE}`;
    const H = { Authorization: "Bearer " + tok, Accept: "application/vnd.github+json" };
    let ok = false, err = "";
    for (let attempt = 0; attempt < 2 && !ok; attempt++){
      try {
        let sha;
        const g = await fetch(api, { headers: H, cache:"no-store" });
        if (g.ok) sha = (await g.json()).sha; else if (g.status !== 404){ err = "GET " + g.status; continue; }
        const p = await fetch(api, { method:"PUT", headers: { ...H, "Content-Type":"application/json" },
          body: JSON.stringify({ message: "Eigen producten bijgewerkt (app)", content: giftToken64(JSON.stringify(out, null, 1)), ...(sha ? { sha } : {}) }) });
        if (p.ok) ok = true; else err = "PUT " + p.status;
      } catch(e){ err = String(e && e.message || e); }
    }
    own.publishing = false;
    if (!silent || !ok) showToast(t(ok ? "own_pub_ok" : "own_pub_fail", L).replace("{e}", err));
    return ok;
  }
  function ownSlots(){ return [...new Set(Object.values(SALON_PRODUCTS).map(p => p && p.slot).filter(Boolean))].sort(); }
  function ownHtml(){
    const L = state.lang, cats = openCats();
    const p = own.edit ? SALON_PRODUCTS[own.edit] : null;
    const rec = own.edit ? (openAll()[own.edit] || {}) : {};
    const used = new Set(p ? p.usedIn || [] : []);
    const groups = Object.keys(cats).map(g => {
      const on = cats[g].length && cats[g].every(x => used.has(x));
      return `<label class="chip chip--check"><input type="checkbox" data-own-group="${g}"${on ? " checked" : ""}> ${AVOID_ICONS[g] || ""} ${t("avoid." + g, L)}</label>`;
    }).join("");
    const treats = ingrTreatments().filter(id => !ingrIsAdventUse(id)).map(id => [id, ingrTreatName(id)]).sort((a, b) => a[1].localeCompare(b[1]));
    const mine = Object.entries(SALON_PRODUCTS).filter(([, x]) => x && x.own).sort((a, b) => ingrName(a[1]).localeCompare(ingrName(b[1])));
    return `<p class="ingr-note">${t("own_intro", L)}</p>
      <div class="own-form">
        <p class="gift-block__title">${own.edit ? "✏️ " + t("own_edit_title", L) : "➕ " + t("own_new_title", L)}</p>
        <label class="pm-label" for="ownName">${t("own_name", L)}</label>
        <input type="text" id="ownName" class="pm-input" maxlength="120" placeholder="${t("own_name_ph", L)}" value="${esc(p ? ingrName(p) : "")}">
        <label class="pm-label" for="ownInci">${t("own_inci", L)}</label>
        <textarea id="ownInci" class="pm-input own-inci" rows="5" placeholder="${t("own_inci_ph", L)}">${esc(p ? p.inci || "" : "")}</textarea>
        <p class="pm-label">${t("own_groups", L)}</p>
        <div class="ingr-chips">${groups}</div>
        <label class="pm-label" for="ownTreats">${t("own_treats", L)}</label>
        <select id="ownTreats" class="pm-input own-treats" multiple size="6">${treats.map(([id, n]) => `<option value="${esc(id)}"${used.has(id) ? " selected" : ""}>${esc(n)}</option>`).join("")}</select>
        <label class="pm-label" for="ownSlot">${t("own_slot", L)}</label>
        <select id="ownSlot" class="pm-input"><option value="own">—</option>${ownSlots().filter(s => s !== "own").map(s => `<option value="${s}"${p && p.slot === s ? " selected" : ""}>${s}</option>`).join("")}</select>
        <div class="own-dates">
          <label class="pm-label">${t("own_tht", L)}<input type="date" id="ownTht" class="pm-input" value="${esc(rec.t || "")}"></label>
          <label class="pm-label">${t("own_pao", L)}<input type="number" id="ownPao" class="pm-input" min="0" max="60" step="1" placeholder="12" value="${rec.m != null && rec.m !== "" ? esc(rec.m) : ""}"></label>
          <label class="pm-label">${t("own_opened", L)}<input type="date" id="ownOpened" class="pm-input" value="${esc(rec.d || "")}"></label>
        </div>
        <label class="pm-label" for="ownNote">${t("own_note", L)}</label>
        <input type="text" id="ownNote" class="pm-input" maxlength="300" placeholder="${t("own_note_ph", L)}" value="${esc(p && p.note ? p.note.nl || "" : "")}">
        <label class="pm-label" for="ownPriv">🔒 ${t("own_priv", L)}</label>
        <input type="text" id="ownPriv" class="pm-input" maxlength="300" value="${esc(p && p.sandraNote ? p.sandraNote.nl || "" : "")}">
        <button type="button" class="btn btn--primary btn--sm" data-own="save">💾 ${t("own_save", L)}</button>
        ${own.edit ? `<button type="button" class="btn btn--text btn--sm" data-own="cancel">${t("own_cancel", L)}</button>` : ""}
        <p class="ingr-muted">${t(giftHasToken() ? "own_pub_auto" : "own_pub_local", L)}</p>
      </div>
      <h3 class="ingr-h">${t("own_list", L)} (${mine.length})</h3>
      <ul class="own-list">${mine.map(([id, x]) => `<li><b>${esc(ingrName(x))}</b><br><span class="ingr-muted">${esc((x.usedIn || []).map(ingrTreatName).slice(0, 6).join(", ") || "—")}</span>
        <span class="own-acts"><button type="button" class="btn btn--text btn--sm" data-own="edit" data-id="${id}">✏️</button><button type="button" class="btn btn--text btn--sm" data-own="del" data-id="${id}">🗑</button></span></li>`).join("") || `<li class="ingr-muted">${t("own_none", L)}</li>`}</ul>
      ${mine.length && giftHasToken() ? `<button type="button" class="btn btn--outline btn--sm" data-own="publish">🔄 ${t("own_publish", L)}</button>` : ""}`;
  }
  function ownBind(){
    const body = $("#ingrBody") || document;
    $$("[data-own-group]").forEach(cb => cb.addEventListener("change", () => {
      const ids = openCats()[cb.dataset.ownGroup] || [], sel = $("#ownTreats");
      if (sel) [...sel.options].forEach(o => { if (ids.includes(o.value)) o.selected = cb.checked; });
    }));
    $$("[data-own]").forEach(b => b.addEventListener("click", () => {
      const L = state.lang, a = b.dataset.own;
      if (a === "cancel"){ own.edit = ""; renderIngredients(); return; }
      if (a === "edit"){ own.edit = b.dataset.id; renderIngredients(); window.scrollTo(0, 0); return; }
      if (a === "publish"){ ownPublish(false); return; }
      if (a === "del"){
        if (!confirm(t("own_del_confirm", L).replace("{p}", ingrName(SALON_PRODUCTS[b.dataset.id] || { name:"" })))) return;
        const loc = ownLocal(); loc[b.dataset.id] = null; ownSaveLocal(loc); delete SALON_PRODUCTS[b.dataset.id];
        openSave(b.dataset.id, null); own.edit = ""; renderIngredients(); ownPublish(true); return;
      }
      if (a === "save"){
        const name = ($("#ownName").value || "").trim();
        if (name.length < 2){ showToast(t("own_err_name", L)); return; }
        const usedIn = [...$("#ownTreats").selectedOptions].map(o => o.value);
        const inci = ($("#ownInci").value || "").replace(/\s+/g, " ").replace(/^\s*(ingredi[eë]nts?|inci)\s*:\s*/i, "").trim();
        const id = own.edit || ("own_" + name.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 30) + "_" + Math.random().toString(36).slice(2, 6));
        const p = { name:{ nl:name }, usedIn, slot: $("#ownSlot").value, inci, note:{ nl:($("#ownNote").value || "").trim() },
          sandraNote: ($("#ownPriv").value || "").trim() ? { nl: "Alleen voor jou: " + $("#ownPriv").value.trim().replace(/^Alleen voor jou:\s*/i, "") } : undefined, u: todayKey() };
        const loc = ownLocal(); loc[id] = ownClean(p); ownSaveLocal(loc); SALON_PRODUCTS[id] = ownClean(p);
        const tht = $("#ownTht").value, m = $("#ownPao").value, d = $("#ownOpened").value;
        if (tht || m || d) openSave(id, { t: tht || "", m: m === "" ? "" : Number(m), d: d || "" });
        own.edit = ""; showToast(t("own_saved", L).replace("{p}", name)); renderIngredients(); ownPublish(true);
      }
    }));
  }

  /* ---------------- ingredients & allergies (ingredients.js) ----------------
     Search an allergy → which products contain it, in which treatments,
     what to skip or swap. Also: full lists per treatment, and what is still
     missing. Opened via #ingredienten, a button in salon mode, and (if
     live, see INGREDIENTS_LIVE) a link on the house-rules screen.
     Test phase: before liveFrom only Sandra (private link or salon mode). */
  const ingr = { tab:"search", q:"", treat:"", unlocked:false };
  function ingrIsLive(){
    const L = typeof INGREDIENTS_LIVE === "object" && INGREDIENTS_LIVE;
    return !L || !L.liveFrom || ((advPreview && advTest) ? advTest : todayKey()) >= L.liveFrom;
  }
  const ingrPreview = (() => {
    try {
      const k = new URLSearchParams(location.search).get("voorproef");
      return !!(k && typeof INGREDIENTS_LIVE === "object" && INGREDIENTS_LIVE.previewKey && previewMatch(k, INGREDIENTS_LIVE.previewKey));
    } catch(e){ return false; }
  })();
  // may this phone see the screen? (live, private link, or opened from salon mode)
  function ingrAllowed(){ return ingrIsLive() || ingrPreview || ingr.unlocked; }
  function ingrOpen(){ if (ingrAllowed()) goTo("ingredients"); }
  const ingrName = p => p.name && typeof p.name === "object" ? (p.name[state.lang] || p.name.nl) : (p.name || "");
  function ingrHasConfig(){ return typeof SALON_PRODUCTS === "object" && SALON_PRODUCTS && typeof ALLERGEN_GROUPS !== "undefined"; }
  const ingrNorm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function ingrStrip(s){ return String(s || "").replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim(); }
  // full INCI text of a product (own list, or taken from the advent item)
  function ingrInci(p){
    if (p.fromAdvent && typeof ADVENT === "object" && ADVENT.items && ADVENT.items[p.fromAdvent]){
      const v = ADVENT.items[p.fromAdvent].ingredients;
      return ingrStrip(v && typeof v === "object" ? (v.nl || v.en || "") : v);
    }
    return ingrStrip(p.inci);
  }
  // one ingredient per piece, without "Poeder (Lavender)" style headers
  function ingrParts(txt){ return txt.split(/,(?!\d)|[;·—:]/).map(x => x.replace(/\*/g, "").trim()).filter(Boolean); }
  function ingrHit(part, keys){
    const n = " " + ingrNorm(part) + " ";
    // "=word" = the whole ingredient must be that word (e.g. "=alcohol", not "Cetyl Alcohol")
    return keys.some(k => { if (k[0] === "=") return n.trim() === ingrNorm(k.slice(1)); if (k[0] === "*") return n.includes(ingrNorm(k.slice(1))); const kk = ingrNorm(k); const i = n.indexOf(kk); return i > 0 && !/[a-z0-9]/.test(n[i - 1]); });
  }
  function ingrTreatName(id){
    const L = state.lang;
    if (id === "advent") return t("ingr_use_advent", L);
    if (id === "extra-facial") return t("ingr_use_extra_facial", L);
    const tr = (typeof TREATMENTS_CATALOG !== "undefined") && TREATMENTS_CATALOG.find(x => x.id === id);
    if (tr) return tr.name;
    const a = typeof ADVENT === "object" && ADVENT.items && ADVENT.items[id];
    if (a) return (a[L] || a.nl) + " (" + t("ingr_extra_short", L) + ")";
    return id;
  }
  function ingrTreatments(){
    const ids = (typeof TREATMENTS_CATALOG !== "undefined" ? TREATMENTS_CATALOG : []).map(x => x.id)
      .filter(id => !(typeof INGREDIENTS_SKIP_TREATMENTS !== "undefined" && INGREDIENTS_SKIP_TREATMENTS.includes(id)));
    ingrCatalog().forEach(([, p]) => (p.usedIn || []).forEach(id => { if (!ids.includes(id)) ids.push(id); }));
    return ids;
  }
  const ingrProductsFor = id => ingrCatalog().filter(([, p]) => (p.usedIn || []).includes(id));
  /* Sandra = private link, opened from salon mode, or a phone with the salon key */
  function ingrSandra(){ try { return ingrPreview || ingr.unlocked || hasSalonKey(); } catch(e){ return ingrPreview || ingr.unlocked; } }
  /* finished products ("op"): PRODUCTS_OP in ingredients.js + marked on this phone */
  const PROD_OP_KEY = "bc_prod_op_v1";
  function ingrOpLocal(){ try { return JSON.parse(localStorage.getItem(PROD_OP_KEY) || "[]") || []; } catch(e){ return []; } }
  function ingrOpSet(){ return new Set([...(typeof PRODUCTS_OP !== "undefined" ? PRODUCTS_OP : []), ...ingrOpLocal(), ...bhEff().op]); }
  function ingrToggleOp(id){
    if (typeof PRODUCTS_OP !== "undefined" && PRODUCTS_OP.includes(id)){ showToast(t("ingr_op_in_file", state.lang)); return; }
    const l = ingrOpLocal(), i = l.indexOf(id), e2 = bhCopy(), bi = e2.op.indexOf(id);
    if (i >= 0 || bi >= 0){ if (i >= 0) l.splice(i, 1); if (bi >= 0) e2.op.splice(bi, 1); }
    else e2.op.push(id);
    try { localStorage.setItem(PROD_OP_KEY, JSON.stringify(l)); } catch(e){ /* ignore */ }
    bhCommit(e2);   // saves, re-renders and publishes (beheer.json) so the product is gone for everyone
  }
  // advent usages stay hidden for clients (otherwise the surprise is gone)
  function ingrIsAdventUse(u){ return u === "advent" || /^extra-/.test(u) || !!(typeof ADVENT === "object" && ADVENT.items && ADVENT.items[u]); }
  // the products this phone may see: without finished ones; clients without advent usages
  function ingrCatalog(){
    const op = ingrOpSet(), sandra = ingrSandra(), un = bhEff().unused || {};
    return Object.entries(SALON_PRODUCTS).filter(([id]) => !op.has(id)).map(([id, p0]) => {
      // v197: "gebruik ik hier niet" → the product is not counted for that treatment
      let p = p0;
      if ((p0.usedIn || []).some(u => un[u] && un[u].includes(id))) p = Object.assign({}, p0, { usedIn: p0.usedIn.filter(u => !(un[u] && un[u].includes(id))), _unusedSome: true });
      if (sandra) return [id, p];
      const used = (p.usedIn || []).filter(u => !ingrIsAdventUse(u));
      return used.length ? [id, Object.assign({}, p, { usedIn: used })] : null;   // not linked yet → only Sandra sees it
    }).filter(Boolean);
  }
  // which allergy groups does the query point to? → INCI keys to look for
  function ingrLev(x, y){
    const m = x.length, n = y.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++){
      const cur = [i];
      for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (x[i - 1] === y[j - 1] ? 0 : 1));
      prev = cur;
    }
    return prev[n];
  }
  // typo / singular-plural tolerant: "parabeen" → Parabenen
  function ingrFuzzyGroups(nq){
    if (nq.length < 5) return [];
    let best = 9, out = [];
    ALLERGEN_GROUPS.forEach(g => {
      let dist = 9;
      [g.id].concat(g.terms, Object.values(g.label)).map(ingrNorm).forEach(w => { if (Math.abs(w.length - nq.length) <= 2) dist = Math.min(dist, ingrLev(w, nq)); });
      if (dist < best){ best = dist; out = [g]; } else if (dist === best) out.push(g);
    });
    return best <= (nq.length >= 8 ? 2 : 1) ? out : [];
  }
  // which allergy groups does the query point to? → INCI keys to look for
  function ingrQuery(q){
    const nq = ingrNorm(q).trim();
    if (nq.length < 2) return null;
    const byLabel = ALLERGEN_GROUPS.filter(g => Object.values(g.label).some(l => ingrNorm(l) === nq));
    let groups = byLabel.length ? byLabel : ALLERGEN_GROUPS.filter(g => g.id === nq || g.terms.some(tm => { const nt = ingrNorm(tm); return nt === nq || (nq.length >= 3 && (nt.startsWith(nq) || nq.startsWith(nt) && nt.length >= 4)); }));
    let fuzzy = false;
    if (!groups.length){ groups = ingrFuzzyGroups(nq); fuzzy = groups.length > 0; }
    const keys = groups.length ? [...new Set(groups.flatMap(g => g.match))] : (nq.length >= 3 ? ["*" + nq] : [nq]);
    return { groups, keys, fuzzy };
  }
  function renderIngredients(){
    const body = $("#ingrBody");
    if (!body) return;
    const L = state.lang;
    if (!ingrHasConfig()){ body.innerHTML = `<p class="ingr-note">${t("ingr_none_config", L)}</p>`; return; }
    if (!ingrAllowed()){ body.innerHTML = `<p class="ingr-note">${t("ingr_not_yet", L)}</p>`; return; }
    const sandra = ingrSandra();
    if (!sandra && (ingr.tab === "todo" || ingr.tab === "order" || ingr.tab === "open" || ingr.tab === "useup" || ingr.tab === "stock" || ingr.tab === "protocol" || ingr.tab === "own")) ingr.tab = "search";
    const tabs = (sandra ? ["search", "treat", "own", "stock", "protocol", "order", "open", "useup", "todo"] : ["search", "treat"]).map(k => `<button type="button" class="chip${ingr.tab === k ? " is-selected" : ""}" data-action="ingr-tab" data-tab="${k}" aria-pressed="${ingr.tab === k}">${t("ingr_tab_" + k, L)}</button>`).join("");
    let html = ingrIsLive() ? "" : `<div class="advent-preview ingr-preview"><p>🧪 <b>${t("ingr_pv_title", L)}</b> — ${t("ingr_pv_text", L).replace("{d}", advFmt(INGREDIENTS_LIVE.liveFrom))}</p></div>`;
    html += `<div class="ingr-tabs" role="tablist">${tabs}</div>`;
    if (ingr.tab === "search"){
      html += `<label class="ingr-label" for="ingrSearch">${t("ingr_search_label", L)}</label>
        <input type="search" id="ingrSearch" class="price-search" autocomplete="off" value="${esc(ingr.q)}" placeholder="${esc(t("ingr_search_ph", L))}">
        <div id="ingrResults" aria-live="polite"></div>
        <details class="ingr-more ingr-chipsbox"${ingr.q.trim() ? "" : " open"}><summary>${t("ingr_pick_list", L).replace("{n}", ALLERGEN_GROUPS.length)}</summary>
          <div class="ingr-chips">${ALLERGEN_GROUPS.map(g => `<button type="button" class="chip chip--sm" data-action="ingr-chip" data-group="${esc(g.id)}">${esc(g.label[L] || g.label.nl)}</button>`).join("")}</div></details>`;
    } else if (ingr.tab === "treat"){
      const opts = ingrTreatments().filter(id => !BC_UNAVAILABLE.has(id)).map(id => [id, ingrTreatName(id)]).sort((a, b) => a[1].localeCompare(b[1]));
      html += `<label class="ingr-label" for="ingrTreat">${t("ingr_choose_treat", L)}</label>
        <select id="ingrTreat" class="ingr-select"><option value="">—</option>${opts.map(o => `<option value="${esc(o[0])}"${o[0] === ingr.treat ? " selected" : ""}>${esc(o[1])}</option>`).join("")}</select>
        <div id="ingrTreatBody"></div>`;
    } else if (ingr.tab === "order"){
      html += ingrOrderHtml();
    } else if (ingr.tab === "open"){
      html += ingrOpenHtml();
    } else if (ingr.tab === "stock"){
      html += invHtml();
    } else if (ingr.tab === "protocol"){
      html += protoHtml();
    } else if (ingr.tab === "own"){
      html += ownHtml();
    } else if (ingr.tab === "useup"){
      html += useupHtml();
    } else {
      const noInci = ingrCatalog().map(([, p]) => p).filter(p => !ingrInci(p));
      const noProd = ingrTreatments().filter(id => !ingrProductsFor(id).length);
      const unlinked = ingrCatalog().filter(([, p]) => !(p.usedIn || []).length && !p._unusedSome).map(([, p]) => p);
      html += `<p class="ingr-note">${t("ingr_todo_intro", L)}</p>
        ${unlinked.length ? `<h3 class="ingr-h">${t("ingr_todo_unlinked", L)} (${unlinked.length})</h3><ul class="ingr-list">${unlinked.map(p => `<li>${esc(ingrName(p))}</li>`).join("")}</ul>` : ""}
        <h3 class="ingr-h">${t("ingr_todo_noinci", L)} (${noInci.length})</h3>
        <ul class="ingr-list">${noInci.map(p => `<li>${esc(ingrName(p))} — <span class="ingr-muted">${esc((p.usedIn || []).map(ingrTreatName).join(", "))}</span></li>`).join("") || `<li>✓</li>`}</ul>
        <h3 class="ingr-h">${t("ingr_todo_noprod", L)} (${noProd.length})</h3>
        <ul class="ingr-list ingr-list--cols">${noProd.map(id => `<li>${esc(ingrTreatName(id))}</li>`).join("") || `<li>✓</li>`}</ul>`;
    }
    html += `<p class="ingr-disclaimer">${t("ingr_disclaimer", L)}</p>`;
    body.innerHTML = html;
    if (ingr.tab === "search"){
      const inp = $("#ingrSearch");
      inp.addEventListener("input", () => { ingr.q = inp.value; renderIngrResults(); });
      renderIngrResults();
    }
    if (ingr.tab === "open") ingrOpenBind();
    if (ingr.tab === "stock") invBind();
    if (ingr.tab === "protocol") protoBind();
    if (ingr.tab === "own") ownBind();
    if (ingr.tab === "treat"){
      const sel = $("#ingrTreat");
      sel.addEventListener("change", () => { ingr.treat = sel.value; renderIngrTreat(); });
      renderIngrTreat();
    }
  }
  /* tab "Openingsdata" (only Sandra, since v97): when was a jar/tube opened?
     The app adds the period after opening (the open-jar symbol, e.g. 6M)
     and warns 7 days before. Stored on Sandra's phone (bc_prod_open_v1);
     copy the line to Claude to keep it in ingredients.js (PRODUCTS_OPENED).
     "Agenda" makes an all-day event in Google Calendar on the day of the
     warning, so her own calendar notifies/mails her. */
  const PROD_OPEN_KEY = "bc_prod_open_v1";
  function openLocal(){ try { const x = JSON.parse(localStorage.getItem(PROD_OPEN_KEY) || "{}"); return x && typeof x === "object" ? x : {}; } catch(e){ return {}; } }
  function openAll(){ return Object.assign({}, typeof PRODUCTS_OPENED === "object" && PRODUCTS_OPENED ? PRODUCTS_OPENED : {}, openLocal()); }
  function openSave(id, rec){
    const x = openLocal();
    if (rec) x[id] = rec; else x[id] = null;   // null = cleared on this phone (also hides a value from the file)
    try { localStorage.setItem(PROD_OPEN_KEY, JSON.stringify(x)); } catch(e){}
  }
  // period after opening, only when the label says so ("na openen X maanden"); no guessing
  function openPao(p){
    const m = String(p && p.note && p.note.nl || "").match(/na openen (\d{1,2}) maand/i);
    return m ? Number(m[1]) : 0;
  }
  function openThtOnly(id){ return typeof PRODUCTS_THT_ONLY !== "undefined" && PRODUCTS_THT_ONLY.includes(id); }
  const okDate = v => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
  // expiry = the earliest of: best-before date (THT) and opened + months after opening
  function openInfo(id){
    const r = openAll()[id];
    if (!r) return null;
    const cands = [];
    if (okDate(r.t)){ const [y, mo, d] = r.t.split("-").map(Number); cands.push({ exp:new Date(y, mo - 1, d), by:"tht" }); }
    const months = r.m === undefined || r.m === null || r.m === "" ? openPao(SALON_PRODUCTS[id]) : Number(r.m);
    if (!openThtOnly(id) && okDate(r.d) && months > 0){ const [y, mo, d] = r.d.split("-").map(Number); cands.push({ exp:new Date(y, mo - 1 + months, d), by:"pao" }); }
    if (!cands.length) return okDate(r.d) && !openThtOnly(id) ? { incomplete:true } : null;
    const best = cands.sort((x, y) => x.exp - y.exp)[0];
    const today = new Date(todayKey() + "T00:00:00");
    const key = dt => `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`;
    return { opened: okDate(r.d) ? r.d : "", months, tht: okDate(r.t) ? r.t : "", by: best.by, exp: best.exp, expKey: key(best.exp), days: Math.round((best.exp - today) / 86400000) };
  }
  function openDue(){ return ingrCatalog().filter(([id]) => { const i = openInfo(id); return i && !i.incomplete && i.days <= 7; }); }
  function openCalUrl(id, info){
    const L = state.lang, name = ingrName(SALON_PRODUCTS[id]);
    const warn = new Date(info.exp.getTime() - 7 * 86400000), next = new Date(warn.getTime() + 86400000);
    const f = dt => `${dt.getFullYear()}${String(dt.getMonth()+1).padStart(2,"0")}${String(dt.getDate()).padStart(2,"0")}`;
    const title = t("ingr_open_cal_title", L).replace("{p}", name).replace("{d}", advFmt(info.expKey));
    const det = info.by === "tht" ? t("ingr_open_cal_text_tht", L).replace("{t}", advFmt(info.tht))
      : t("ingr_open_cal_text", L).replace("{o}", advFmt(info.opened)).replace("{m}", info.months);
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(title)}&dates=${f(warn)}/${f(next)}&details=${encodeURIComponent(det)}`;
  }
  function ingrOpenHtml(){
    const L = state.lang, all = openAll(), months = [3, 6, 9, 12, 18, 24, 36];
    const rows = ingrCatalog().map(([id, p]) => ({ id, p, info: openInfo(id) }));
    const rank = i => !i ? 2 : (i.incomplete ? 1 : 0);
    rows.sort((a, b) => rank(a.info) - rank(b.info) || (rank(a.info) === 0 ? a.info.days - b.info.days : ingrName(a.p).localeCompare(ingrName(b.p))));
    const cats = openCats();
    const catsOf = p => { if (DIY_SLOTS.includes(p.slot)) return ["diy"]; const u = p.usedIn || []; const c = Object.keys(cats).filter(g => u.some(x => cats[g].includes(x) || (g === "face" && /^extra-facial/.test(x)))); return c.length ? c : ["other"]; };
    const chips = ["all"].concat(Object.keys(cats), ["diy", "other", "filled"]).map(g => `<button type="button" class="chip${(ingr.openCat || "all") === g ? " is-selected" : ""}" data-open-cat="${g}">${g === "all" ? t("tht_all", L) : g === "other" ? t("tht_other", L) : g === "diy" ? "🧼 " + t("tht_diy", L) : g === "filled" ? "📅 " + t("tht_filled", L) : (AVOID_ICONS[g] || "") + " " + t("avoid." + g, L)}</button>`).join("");
    let html = `<p class="ingr-note">${t("ingr_open_intro", L)}</p>
      <div class="open-filter">
        <input type="search" id="openSearch" class="price-search" placeholder="🔎 ${t("tht_search", L)}" value="${esc(ingr.openQ || "")}" autocomplete="off">
        <div class="ingr-chips open-chips">${chips}</div>
        <p class="ingr-muted" id="openCount"></p>
      </div><ul class="open-list">`;
    rows.forEach(({ id, p, info }) => {
      const rec = all[id] || {}, thtOnly = openThtOnly(id);
      const m = rec.m === undefined || rec.m === null || rec.m === "" ? openPao(p) : Number(rec.m);
      let status = `<span class="ingr-muted">${t("ingr_open_none", L)}</span>`, cls = "";
      if (info && info.incomplete) status = `<span class="ingr-muted">${t("ingr_open_incomplete", L)}</span>`;
      else if (info){
        const how = info.by === "tht" ? t("ingr_open_by_tht", L) : t("ingr_open_by_pao", L);
        if (info.days < 0){ status = t("ingr_open_expired", L).replace("{d}", advFmt(info.expKey)); cls = " is-expired";
          const ru = p.reuse || ((typeof EXPIRED_REUSE !== "undefined") ? (EXPIRED_REUSE[p.slot] || EXPIRED_REUSE.default) : null);
          if (ru) status += `<span class="open-row__reuse">♻️ ${esc(t("ingr_open_reuse", L))} ${esc(ru[L] || ru.nl)}</span>`; }
        else if (info.days <= 7){ status = t("ingr_open_soon", L).replace("{n}", info.days).replace("{d}", advFmt(info.expKey)); cls = " is-soon"; }
        else status = t("ingr_open_left", L).replace("{n}", info.days).replace("{d}", advFmt(info.expKey));
        status += ` <span class="ingr-muted">(${how})</span>`;
      }
      const opt = n => `<option value="${n}"${n === m ? " selected" : ""}>${n ? t("ingr_open_m", L).replace("{n}", n) : "—"}</option>`;
      html += `<li class="open-row${cls}" data-cats="${catsOf(p).join(" ")}" data-filled="${info ? 1 : 0}" data-name="${esc(ingrNorm(ingrName(p) + " " + id))}">
          <p class="open-row__name">${esc(ingrName(p))}</p>
          ${thtOnly ? `<p class="ingr-muted open-row__hint">${t("ingr_open_tht_only", L)}</p>` : ""}
          <div class="open-row__fields">
            <label>${t("ingr_open_tht", L)} <input type="date" class="pm-input open-tht" data-open-id="${esc(id)}" value="${esc(rec.t || "")}"></label>
            ${thtOnly ? "" : `<label>${t("ingr_open_date", L)} <input type="date" class="pm-input open-date" data-open-id="${esc(id)}" value="${esc(rec.d || "")}" max="${todayKey()}"></label>
            <label>${t("ingr_open_months", L)} <select class="ingr-select open-months" data-open-id="${esc(id)}">${[0].concat(months, months.includes(m) || !m ? [] : [m]).sort((a, b) => a - b).map(opt).join("")}</select></label>`}
          </div>
          <p class="open-row__status">${status}</p>
          ${info && !info.incomplete ? `<div class="open-row__btns"><a class="btn btn--sm btn--outline" href="${esc(openCalUrl(id, info))}" target="_blank" rel="noopener noreferrer">${t("ingr_open_cal", L)}</a>
            <button type="button" class="btn btn--sm btn--text" data-action="open-clear" data-id="${esc(id)}">${t("ingr_open_clear", L)}</button></div>` : ""}
        </li>`;
    });
    html += `</ul>`;
    if (Object.keys(openLocal()).length){
      const merged = {};
      Object.entries(openAll()).forEach(([id, r]) => {
        if (!r) return;
        const o = {};
        if (okDate(r.d) && !openThtOnly(id)) o.d = r.d;
        if (r.m !== undefined && r.m !== null && r.m !== "" && !openThtOnly(id)) o.m = Number(r.m);
        if (okDate(r.t)) o.t = r.t;
        if (Object.keys(o).length) merged[id] = o;
      });
      const code = `const PRODUCTS_OPENED = ${JSON.stringify(merged)};`;
      html += `<div class="ingr-oppending"><p>📌 ${t("ingr_open_pending", L)}</p><code>${esc(code)}</code>
        <button type="button" class="btn btn--sm btn--ghost" data-action="ingr-op-copy" data-code="${esc(code)}">📋 ${t("ingr_op_copy", L)}</button></div>`;
    }
    return html;
  }
  // v182: soap / homemade-cosmetics raw materials get their own filter chip
  const DIY_SLOTS = ["diy","plantoil","fragranceoil"];
  function openCats(){
    const g = typeof AVOID_GROUPS !== "undefined" ? AVOID_GROUPS : {};
    const order = ["face","hands","feet","massage","waxing","browlash","makeup"];
    const out = {}; order.forEach(k => { if (g[k]) out[k] = g[k]; }); return out;
  }
  function openFilter(){
    const q = ingrNorm(ingr.openQ || "").trim(), cat = ingr.openCat || "all";
    let n = 0, total = 0;
    $$(".open-list .open-row").forEach(li => {
      total++;
      const okQ = !q || li.dataset.name.includes(q);
      const okC = cat === "all" || (cat === "filled" ? li.dataset.filled === "1" : li.dataset.cats.split(" ").includes(cat));
      li.hidden = !(okQ && okC); if (!li.hidden) n++;
    });
    const c = $("#openCount"); if (c) c.textContent = t("tht_count", state.lang).replace("{n}", n).replace("{t}", total);
  }
  function ingrOpenBind(){
    const s = $("#openSearch");
    if (s) s.addEventListener("input", () => { ingr.openQ = s.value; openFilter(); });
    $$("[data-open-cat]").forEach(b => b.addEventListener("click", () => {
      ingr.openCat = b.dataset.openCat;
      $$("[data-open-cat]").forEach(x => x.classList.toggle("is-selected", x === b));
      openFilter();
    }));
    openFilter();
    $$(".open-date, .open-months, .open-tht").forEach(el => el.addEventListener("change", () => {
      const id = el.dataset.openId;
      const d = ($(`.open-date[data-open-id="${id}"]`) || {}).value || "";
      const mEl = $(`.open-months[data-open-id="${id}"]`);
      const tt = ($(`.open-tht[data-open-id="${id}"]`) || {}).value || "";
      const rec = {};
      if (d) rec.d = d;
      if (mEl) rec.m = Number(mEl.value) || 0;
      if (tt) rec.t = tt;
      openSave(id, (d || tt) ? rec : null);
      renderIngredients();
    }));
  }
  /* ---------------- VOORRAAD & VERKOOP (v156) ----------------
     Only on Sandra's phone. Per product: unopened packages (n), uses per
     package (per, a guess from the name until she changes it), uses left in
     the open package (left), sale price and number sold. "−1 gebruikt"
     counts down; at ±3 uses left it warns: start the next package, or order.
     Stored in this phone's browser (bc_inv_v1) — hence the back-up button. */
  const INV_KEY = "bc_inv_v1", INV_WARN = 3;
  // ml (or g) per use: face products from Sandra's course (les 2: cleanser 5, tonic 5, peeling 10,
  // mask 10, massage cream 10, serum 3, eye cream 2, day cream 3); powder masks 30 g (protocols)
  const INV_DOSE = { facecleanse:5, facetoner:5, facemassage:10, facescrub:10, mask:10, daycream:3, nightcream:3, serum:3, eyeserum:2, eyecleanse:3, spf:2, lipbalm:0.2, tint:0.5, oxidant:0.3,
    bodyscrub:30, bodylotion:15, bodyfirming:5, massageoil:20, essentialoil:0.3, handcream:3, footcream:4, footscrub:10, footmask:15, handscrub:10, handmask:10,
    waxpost:10, waxpre:5, waxsoothe:5, cuticle:1, nailoil:0.5, cuticleoil:0.5, gelcolour:0.3, nailpolish:0.3, topcoat:0.3, basecoat:0.3, foundation:0.5, powder:0.5, concealer:0.3 };
  function invData(){
    try { const x = JSON.parse(localStorage.getItem(INV_KEY) || "null"); if (x && x.p) return Object.assign({ log:[], sets:{} }, x); } catch(e){ /* ignore */ }
    return { p:{}, log:[], sets:{} };
  }
  function invSave(x){ try { localStorage.setItem(INV_KEY, JSON.stringify(x)); return true; } catch(e){ showToast(t("inv_toast_nosave", state.lang)); return false; } }
  const INV_DOSE_ID = { renaudhydra:30, renaudiris:30, renaudcamomile:4, s4ychamomile:30, s4ygold:30, janssenacerola:30, janssenaloe:30, janssendeadsea:30 };
  function invGuess(p, id){
    const n = String((p.name && (p.name.nl || p.name)) || "") + " " + String((p.note && p.note.nl) || "");
    let m = n.match(/doos (\d+) stuks/i) || n.match(/(\d+) doekjes/i) || n.match(/(\d+)\s*[×x]\s*\d/);
    if (m) return { per: Number(m[1]), guess: false };
    if (/per stuk/i.test(n)) return { per: 1, guess: false };
    // the package = the biggest amount on the label (not the 30 g per mask)
    const all = [...n.matchAll(/(\d+(?:[.,]\d+)?)\s*(ml|g)\b/gi)].map(x => [Number(x[1].replace(",", ".")), x[2]]).sort((a, b) => b[0] - a[0]);
    m = all.length ? [null, String(all[0][0]), all[0][1]] : null;
    if (m){ const v = Number(m[1]), d = INV_DOSE_ID[id] || INV_DOSE[p.slot] || 3; return { per: Math.max(1, Math.round(v / d)), guess: true, dose: d, unit: m[2].toLowerCase() }; }
    return { per: 0, guess: true };
  }
  function invRec(x, id){ return x.p[id] || null; }
  function invState(r){
    if (!r || !r.per) return "untracked";
    const left = r.left == null ? 0 : r.left;
    if ((r.n || 0) <= 0 && left <= INV_WARN) return "order";
    if (r.left != null && r.left <= INV_WARN) return "low";
    return "ok";
  }
  function invLog(x, id, k, q, price){
    x.log.push({ d: todayKey(), id, k, q: q || 1, p: price || null });
    if (x.log.length > 3000) x.log = x.log.slice(-3000);
  }
  function invUse(id, silent){
    const x = invData(), r = x.p[id];
    if (!r || !r.per){ if (!silent) showToast(t("inv_toast_setup", state.lang)); return false; }
    if (r.left == null || r.left <= 0){
      if ((r.n || 0) > 0){ r.n -= 1; r.left = r.per; }
      else { if (!silent) showToast(t("inv_toast_empty", state.lang).replace("{p}", ingrName(SALON_PRODUCTS[id]))); return false; }
    }
    r.left -= 1; invLog(x, id, "use", 1); invSave(x);
    if (r.left <= INV_WARN){
      const msg = t((r.n || 0) > 0 ? "inv_toast_low_next" : "inv_toast_low_order", state.lang).replace("{p}", ingrName(SALON_PRODUCTS[id])).replace("{n}", r.left);
      if (silent) return msg; showToast(msg);
    }
    return true;
  }
  function invSell(id){
    const x = invData(), r = x.p[id];
    if (!r || (r.n || 0) <= 0){ showToast(t("inv_toast_nosale", state.lang)); return; }
    r.n -= 1; r.sold = (r.sold || 0) + 1; invLog(x, id, "sale", 1, r.price || null); invSave(x);
    showToast(t("inv_toast_sold", state.lang).replace("{p}", ingrName(SALON_PRODUCTS[id])));
    if (invState(r) === "order") setTimeout(() => showToast(t("inv_toast_low_order", state.lang).replace("{p}", ingrName(SALON_PRODUCTS[id])).replace("{n}", r.left || 0)), 2600);
  }
  function invIn(id){
    const x = invData(), g = invGuess(SALON_PRODUCTS[id], id);
    const r = x.p[id] || (x.p[id] = { n:0, per:g.per || 1, left:null, sold:0 });
    r.n = (r.n || 0) + 1; invLog(x, id, "in", 1); invSave(x);
  }
  function invPrice(v){ const n = Number(String(v || "").replace(",", ".").replace(/[^\d.]/g, "")); return isFinite(n) && n > 0 ? n : null; }
  function invHtml(){
    const L = state.lang, x = invData();
    const rows = ingrCatalog().map(([id, p]) => ({ id, p, r: x.p[id] || null, st: invState(x.p[id]) }));
    const rank = { order:0, low:1, ok:2, untracked:3 };
    rows.sort((a, b) => rank[a.st] - rank[b.st] || ingrName(a.p).localeCompare(ingrName(b.p)));
    const order = rows.filter(r => r.st === "order"), low = rows.filter(r => r.st === "low");
    const ym = todayKey().slice(0, 7);
    const sales = x.log.filter(l => l.k === "sale" && String(l.d).slice(0, 7) === ym);
    const total = sales.reduce((s, l) => s + (l.p || 0), 0);
    const nm = id => esc(ingrName(SALON_PRODUCTS[id] || { name:id }));
    const cats = openCats();
    const catsOf = p => { if (DIY_SLOTS.includes(p.slot)) return ["diy"]; const u = p.usedIn || []; const c = Object.keys(cats).filter(g => u.some(v => cats[g].includes(v))); return c.length ? c : ["other"]; };
    const chips = ["all"].concat(Object.keys(cats), ["diy", "other", "tracked"]).map(g => `<button type="button" class="chip${(ingr.invCat || "all") === g ? " is-selected" : ""}" data-inv-cat="${g}">${g === "all" ? t("tht_all", L) : g === "other" ? t("tht_other", L) : g === "diy" ? "🧼 " + t("tht_diy", L) : g === "tracked" ? t("inv_tracked", L) : t("avoid." + g, L)}</button>`).join("");
    const treats = ingrTreatments().filter(id => !ingrIsAdventUse(id)).map(id => [id, ingrTreatName(id)]).sort((a, b) => a[1].localeCompare(b[1]));
    // use-up actions: are their products finished? (then switch the action off)
    const actWarn = (typeof CURRENT_ACTIONS !== "undefined" ? CURRENT_ACTIONS : []).filter(a => a.products && !a.soldOut).map(a => {
      const tag = String(a.products).replace(/^usedIn:/, "");
      const ids = Object.keys(SALON_PRODUCTS).filter(id => (SALON_PRODUCTS[id].usedIn || []).includes(tag) && !/^Janssen/i.test(ingrName(SALON_PRODUCTS[id])));
      const tracked = ids.filter(id => x.p[id] && x.p[id].per);
      const empty = tracked.filter(id => invState(x.p[id]) === "order");
      if (!tracked.length) return "";
      const all = empty.length === tracked.length;
      return `<div class="inv-action${all ? " inv-action--done" : ""}"><p class="inv-summary__title">${all ? "🛑" : "🌿"} ${esc(a.title[L] || a.title.nl)}</p><p>${t(all ? "inv_action_done" : "inv_action_count", L).replace("{n}", empty.length).replace("{m}", tracked.length)}</p></div>`;
    }).join("");
    let html = `<p class="ingr-note">${t("inv_intro", L)}</p>${actWarn}
      <div class="inv-summary">
        <p class="inv-summary__title">🛒 ${t("inv_reorder_title", L)} (${order.length})</p>
        ${order.length ? `<ul class="inv-list">${order.map(r => `<li>${nm(r.id)}</li>`).join("")}</ul>` : `<p class="ingr-muted">✓ ${t("inv_nothing", L)}</p>`}
        <p class="inv-summary__title">⚠️ ${t("inv_low_title", L)} (${low.length})</p>
        ${low.length ? `<ul class="inv-list">${low.map(r => `<li>${nm(r.id)} — ${t("inv_left_short", L).replace("{n}", r.r.left).replace("{u}", r.r.n || 0)}</li>`).join("")}</ul>` : `<p class="ingr-muted">✓ ${t("inv_nothing", L)}</p>`}
        ${sales.length ? `<p class="inv-summary__title">💶 ${t("inv_sales_title", L)}</p>
        <p>${t("inv_sales_line", L).replace("{n}", sales.length).replace("{e}", total.toFixed(2).replace(".", ","))}</p>` : ""}
        ${sales.length ? `<ul class="inv-list">${sales.slice(-10).reverse().map(l => `<li>${advFmt(l.d)} · ${nm(l.id)}${l.p ? " · €" + l.p.toFixed(2).replace(".", ",") : ""}</li>`).join("")}</ul>` : ""}
      </div>
      <div class="inv-quick">
        <p class="inv-summary__title">✅ ${t("inv_quick_title", L)}</p>
        <select id="invTreat" class="ingr-select"><option value="">${t("inv_quick_choose", L)}</option>${treats.map(([id, n]) => `<option value="${esc(id)}"${ingr.invTreat === id ? " selected" : ""}>${esc(n)}</option>`).join("")}</select>
        <div id="invQuickList"></div>
      </div>
      <div class="open-filter">
        <input type="search" id="invSearch" class="price-search" placeholder="🔎 ${t("tht_search", L)}" value="${esc(ingr.invQ || "")}" autocomplete="off">
        <div class="ingr-chips open-chips">${chips}</div>
        <p class="ingr-muted" id="invCount"></p>
      </div><ul class="open-list inv-rows">`;
    rows.forEach(({ id, p, r, st }) => {
      const g = invGuess(p, id);
      const status = !r || !r.per ? `<span class="ingr-muted">${t("inv_untracked", L)}</span>`
        : t("inv_status", L).replace("{u}", r.n || 0).replace("{l}", r.left == null ? "—" : r.left).replace("{p}", r.per) + (r.sold ? ` · ${t("inv_sold_n", L).replace("{n}", r.sold)}` : "");
      const cls = st === "order" ? " is-expired" : st === "low" ? " is-soon" : "";
      const sellOn = !!(r && (r.sell || r.sold || r.price));   // v194: cabine products have no sale button or price
      html += `<li class="open-row inv-row${cls}" data-cats="${catsOf(p).join(" ")}" data-tracked="${r && r.per ? 1 : 0}" data-name="${esc(ingrNorm(ingrName(p) + " " + id))}">
          <p class="open-row__name">${esc(ingrName(p))}</p>
          <p class="open-row__status">${status}</p>
          <div class="open-row__btns">
            <button type="button" class="btn btn--sm btn--primary" data-inv="use" data-id="${esc(id)}">−1 ${t("inv_use", L)}</button>
            ${sellOn ? `<button type="button" class="btn btn--sm btn--outline" data-inv="sale" data-id="${esc(id)}">💶 ${t("inv_sale", L)}</button>` : ""}
            <button type="button" class="btn btn--sm btn--outline" data-inv="in" data-id="${esc(id)}">＋1 ${t("inv_in", L)}</button>
          </div>
          <details class="inv-edit"${ingr.invOpen === id ? " open" : ""}><summary>⚙️ ${t("inv_edit", L)}</summary>
            <div class="open-row__fields">
              <label>${t("inv_n", L)} <input type="number" min="0" step="1" class="pm-input inv-f" data-f="n" data-id="${esc(id)}" value="${r ? (r.n || 0) : 0}"></label>
              <label>${t("inv_per", L)} <input type="number" min="1" step="1" class="pm-input inv-f" data-f="per" data-id="${esc(id)}" value="${r && r.per ? r.per : (g.per || "")}"></label>
              <label>${t("inv_left", L)} <input type="number" min="0" step="1" class="pm-input inv-f" data-f="left" data-id="${esc(id)}" value="${r && r.left != null ? r.left : ""}" placeholder="—"></label>
              ${sellOn ? `<label>${t("inv_price", L)} <input type="text" inputmode="decimal" class="pm-input inv-f" data-f="price" data-id="${esc(id)}" value="${r && r.price ? String(r.price).replace(".", ",") : ""}" placeholder="€"></label>` : ""}
            </div>
            <label class="chip chip--check"><input type="checkbox" class="inv-f" data-f="sell" data-id="${esc(id)}"${sellOn ? " checked" : ""}> ${t("inv_sell_flag", L)}</label>
            ${g.guess && g.per && !(r && r.per) ? `<p class="ingr-muted">${t("inv_guess", L).replace("{n}", g.per).replace("{d}", String(g.dose).replace(".", ",") + " " + (g.unit || "ml"))}</p>` : ""}
            <button type="button" class="btn btn--sm btn--primary" data-inv="save" data-id="${esc(id)}">${t("inv_save", L)}</button>
          </details>
        </li>`;
    });
    html += `</ul>
      <div class="inv-backup">
        <p class="ingr-muted">${t("inv_backup_hint", L)}</p>
        <button type="button" class="btn btn--sm btn--outline" data-inv="backup">💾 ${t("inv_backup", L)}</button>
        <label class="btn btn--sm btn--ghost inv-restore">↩️ ${t("inv_restore", L)}<input type="file" accept="application/json,.json" id="invRestore" hidden></label>
      </div>`;
    return html;
  }
  function invQuickRender(){
    const wrap = $("#invQuickList"); if (!wrap) return;
    const tid = ingr.invTreat, L = state.lang;
    if (!tid){ wrap.innerHTML = ""; return; }
    const x = invData(), prev = x.sets[tid] || [];
    const list = ingrProductsFor(tid).sort((a, b) => ingrName(a[1]).localeCompare(ingrName(b[1])));
    wrap.innerHTML = `<p class="ingr-muted">${t("inv_quick_hint", L)}</p>
      <div class="inv-checks">${list.map(([id, p]) => `<label class="inv-check"><input type="checkbox" value="${esc(id)}"${prev.includes(id) ? " checked" : ""}> ${esc(ingrName(p))}${x.p[id] && x.p[id].per ? "" : ` <span class="ingr-muted">(${t("inv_untracked_short", L)})</span>`}</label>`).join("")}</div>
      <button type="button" class="btn btn--sm btn--primary" data-inv="quick">${t("inv_quick_btn", L)}</button>`;
  }
  function invFilter(){
    const q = ingrNorm(ingr.invQ || "").trim(), cat = ingr.invCat || "all";
    let n = 0, total = 0;
    $$(".inv-rows .inv-row").forEach(li => {
      total++;
      const okQ = !q || li.dataset.name.includes(q);
      const okC = cat === "all" || (cat === "tracked" ? li.dataset.tracked === "1" : li.dataset.cats.split(" ").includes(cat));
      li.hidden = !(okQ && okC); if (!li.hidden) n++;
    });
    const c = $("#invCount"); if (c) c.textContent = t("tht_count", state.lang).replace("{n}", n).replace("{t}", total);
  }
  function invBind(){
    const body = $("#ingrBody");
    if (body && !body.dataset.invBound){ body.dataset.invBound = "1"; body.addEventListener("click", e => { const el = e.target.closest("[data-inv]"); if (el && ingr.tab === "stock") invAction(el); }); }
    const s = $("#invSearch");
    if (s) s.addEventListener("input", () => { ingr.invQ = s.value; invFilter(); });
    $$("[data-inv-cat]").forEach(b => b.addEventListener("click", () => {
      ingr.invCat = b.dataset.invCat; $$("[data-inv-cat]").forEach(x => x.classList.toggle("is-selected", x === b)); invFilter();
    }));
    invFilter();
    const sel = $("#invTreat"); if (sel) sel.addEventListener("change", () => { ingr.invTreat = sel.value; invQuickRender(); });
    invQuickRender();
    const rf = $("#invRestore"); if (rf) rf.addEventListener("change", () => {
      const f = rf.files && rf.files[0]; if (!f) return;
      const rd = new FileReader();
      rd.onload = () => {
        try {
          const b = JSON.parse(rd.result);
          if (!b || b.app !== "beauty-coffee") throw new Error("bad");
          if (b.inv && b.inv.p) localStorage.setItem(INV_KEY, JSON.stringify(b.inv));
          if (b.open) localStorage.setItem(PROD_OPEN_KEY, JSON.stringify(b.open));
          if (b.op) localStorage.setItem(PROD_OP_KEY, JSON.stringify(b.op));
          showToast(t("inv_restored", state.lang)); renderIngredients();
        } catch(e){ showToast(t("inv_bad", state.lang)); }
      };
      rd.readAsText(f);
    });
  }
  function invAction(el){
    const a = el.dataset.inv, id = el.dataset.id;
    if (a === "use"){ invUse(id); renderIngredients(); return; }
    if (a === "sale"){ invSell(id); renderIngredients(); return; }
    if (a === "in"){ invIn(id); showToast(t("inv_toast_in", state.lang).replace("{p}", ingrName(SALON_PRODUCTS[id]))); renderIngredients(); return; }
    if (a === "save"){
      const x = invData(), r = x.p[id] || (x.p[id] = { n:0, per:1, left:null, sold:0 });
      const v = f => (($(`.inv-f[data-f="${f}"][data-id="${id}"]`) || {}).value || "").trim();
      r.n = Math.max(0, parseInt(v("n"), 10) || 0);
      r.per = Math.max(1, parseInt(v("per"), 10) || 1);
      r.left = v("left") === "" ? null : Math.max(0, parseInt(v("left"), 10) || 0);
      const pe = $(`.inv-f[data-f="price"][data-id="${id}"]`); if (pe) r.price = invPrice(v("price"));
      const se = $(`.inv-f[data-f="sell"][data-id="${id}"]`); if (se) r.sell = !!se.checked;
      invSave(x); ingr.invOpen = null; showToast(t("inv_toast_saved", state.lang)); renderIngredients(); return;
    }
    if (a === "quick"){
      const tid = ingr.invTreat; if (!tid) return;
      const ids = $$("#invQuickList input:checked").map(c => c.value);
      const x = invData(); x.sets[tid] = ids; invSave(x);
      const warns = []; let done = 0;
      ids.forEach(pid => { const r = invUse(pid, true); if (r) done++; if (typeof r === "string") warns.push(r); });
      showToast(t("inv_quick_done", state.lang).replace("{n}", done));
      warns.forEach((w, i) => setTimeout(() => showToast(w), 2600 * (i + 1)));
      renderIngredients(); return;
    }
    if (a === "backup"){
      let open = {}, op = [];
      try { open = JSON.parse(localStorage.getItem(PROD_OPEN_KEY) || "{}"); op = JSON.parse(localStorage.getItem(PROD_OP_KEY) || "[]"); } catch(e){ /* ignore */ }
      const blob = new Blob([JSON.stringify({ app:"beauty-coffee", made: new Date().toISOString(), inv: invData(), open, op }, null, 1)], { type:"application/json" });
      const aEl = document.createElement("a"); aEl.href = URL.createObjectURL(blob); aEl.download = `beauty-coffee-voorraad-${todayKey()}.json`;
      document.body.appendChild(aEl); aEl.click(); setTimeout(() => { URL.revokeObjectURL(aEl.href); aEl.remove(); }, 1000);
      return;
    }
  }
  // once a day on Sandra's phone: how many products to order
  function invDailyNote(){
    try {
      if (!ingrSandra() || !ingrHasConfig()) return;
      const k = "bc_inv_note_day"; if (localStorage.getItem(k) === todayKey()) return;
      const x = invData(), n = Object.keys(x.p).filter(id => SALON_PRODUCTS[id] && invState(x.p[id]) === "order").length;
      if (!n) return;
      localStorage.setItem(k, todayKey());
      setTimeout(() => showToast(t("inv_daily", state.lang).replace("{n}", n)), 6000);
    } catch(e){ /* ignore */ }
  }

  /* ---------------- PROTOCOLLEN (v156, protocols.js) — only on Sandra's phone ---------------- */
  function protoList(){ return typeof PROTOCOLS !== "undefined" && Array.isArray(PROTOCOLS) ? PROTOCOLS : []; }
  function protoHtml(){
    const L = state.lang, list = protoList();
    if (!ingr.proto && list.length) ingr.proto = list[0].id;
    const pr = list.find(x => x.id === ingr.proto);
    let html = `<p class="ingr-note">${t("proto_intro", L)}</p>
      <select id="protoSel" class="ingr-select">${list.map(x => `<option value="${esc(x.id)}"${x.id === ingr.proto ? " selected" : ""}>${esc(x.title)}</option>`).join("")}</select>`;
    if (!pr) return html;
    html += `<p class="ingr-muted">${pr.treat.length ? t("proto_for", L) + " " + esc(pr.treat.map(ingrTreatName).join(", ")) : t("proto_unlinked", L)}</p>`;
    if (pr.intro.length) html += `<div class="proto-intro">${pr.intro.map(x => `<p>${esc(x)}</p>`).join("")}</div>`;
    html += `<ol class="proto-steps">${pr.rows.map(r => `<li><p class="proto-step">${esc(r[0])}</p>${r[1] ? `<p class="proto-prod">🧴 ${esc(r[1])}</p>` : ""}${r[2] ? `<p class="proto-mat">🧰 ${esc(r[2])}</p>` : ""}</li>`).join("")}</ol>`;
    return html;
  }
  function protoBind(){ const sel = $("#protoSel"); if (sel) sel.addEventListener("change", () => { ingr.proto = sel.value; renderIngredients(); }); }
  function protoLinksHtml(tid, L){
    const list = protoList().filter(x => x.treat.includes(tid));
    if (!list.length) return "";
    return `<div class="proto-links"><p class="match-why__title">📋 ${t("proto_result_title", L)}</p>${list.map(x => `<button type="button" class="btn btn--sm btn--outline" data-action="open-proto" data-proto="${esc(x.id)}">${esc(x.title)}</button>`).join(" ")}</div>`;
  }

  function healthSandraHtml(L){
    const hs = (typeof HEALTH_EXTRA !== "undefined" ? HEALTH_EXTRA : []).filter(h => state.healthFlags[h.key] && h.sandraNote);
    const pg = pregLine(L) ? `<p class="proto-sandra">🔒 ${esc(pregLine(L))} ${esc(t("preg_sandra", L))}</p>` : "";
    return pg + hs.map(h => `<p class="proto-sandra">🔒 ${esc(h.sandraNote[L] || h.sandraNote.nl)}</p>`).join("");
  }
  function healthExtraExclude(){
    const hs = (typeof HEALTH_EXTRA !== "undefined" ? HEALTH_EXTRA : []).filter(h => state.healthFlags[h.key]);
    const ids = hs.flatMap(h => h.exclude || []);
    if (hs.some(h => h.massage)) TREATMENTS_CATALOG.filter(x => x.isMassage).forEach(x => ids.push(x.id));
    return ids;
  }
  /* ---------------- allergies in the match (v156) ---------------- */
  function allergyPicked(){ return (typeof ALLERGY_ASK !== "undefined" ? ALLERGY_ASK : []).filter(a => (state.allergies || []).includes(a.id)); }
  function allergyLabels(L){ return allergyPicked().map(a => a.label[L] || a.label.nl); }
  function renderAllergyOptions(){
    const wrap = $("#allergyOptions"); if (!wrap || typeof ALLERGY_ASK === "undefined") return;
    state.allergies = state.allergies || [];
    wrap.innerHTML = ALLERGY_ASK.map(a => {
      const on = state.allergies.includes(a.id);
      return `<button type="button" class="chip chip--check${on ? " is-selected" : ""}" data-allergy="${a.id}" aria-pressed="${on}"><span class="chip__icon">${a.icon}</span> ${esc(a.label[state.lang] || a.label.nl)}</button>`;
    }).join("");
    wrap.querySelectorAll("[data-allergy]").forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.allergy, l = state.allergies, i = l.indexOf(id);
      if (i >= 0) l.splice(i, 1); else l.push(id);
      renderAllergyOptions();
    }));
  }
  // per step of the chosen treatment: which product to swap, and for what (salon mode only)
  function allergySwapHtml(tid, L){
    const picked = allergyPicked(); if (!picked.length || !ingrHasConfig()) return "";
    const keys = [...new Set(picked.flatMap(a => a.groups).flatMap(g => { const gr = ALLERGEN_GROUPS.find(x => x.id === g); return gr ? gr.match : []; }))];
    const hit = p => { const inci = ingrInci(p); return inci ? ingrParts(inci).some(part => ingrHit(part, keys)) : null; };
    const bySlot = {};
    ingrProductsFor(tid).forEach(([id, p]) => { (bySlot[p.slot || id] = bySlot[p.slot || id] || []).push([id, p, hit(p)]); });
    const lines = [];
    Object.values(bySlot).forEach(list => {
      const bad = list.filter(x => x[2] === true), safe = list.filter(x => x[2] === false), unk = list.filter(x => x[2] === null);
      if (!bad.length) return;
      // v169: nothing safe within this treatment? Look in the whole salon for the same kind of product
      const inT = new Set(list.map(x => x[0])), slot = list[0][1].slot;
      const other = safe.length || !slot ? [] : ingrCatalog().filter(([id, p]) => !inT.has(id) && p.slot === slot && hit(p) === false);
      const alt = safe.length ? `→ ${t("allergy_use", L)} <b>${safe.map(x => esc(ingrName(x[1]))).join(" / ")}</b>`
        : other.length ? `→ ${t("allergy_use", L)} <b>${other.map(([id, p]) => esc(ingrName(p))).join(" / ")}</b> <span class="ingr-muted">(${t("allergy_other", L)})</span>`
        : `→ <b>${t("allergy_noalt", L)}</b>`;
      lines.push(`<li>❌ ${bad.map(x => esc(ingrName(x[1]))).join(" / ")} ${alt}${unk.length ? ` <span class="ingr-muted">(${t("allergy_unknown", L)}: ${unk.map(x => esc(ingrName(x[1]))).join(", ")})</span>` : ""}</li>`);
    });
    return `<div class="allergy-swap"><p class="match-why__title">🔒 ${t("allergy_swap_title", L).replace("{a}", esc(allergyLabels(L).join(", ")))}</p>
      ${lines.length ? `<ul>${lines.join("")}</ul>` : `<p>✓ ${t("allergy_swap_none", L)}</p>`}</div>`;
  }
  function allergyClientHtml(m, L){
    if (!m || m.isKid || !allergyPicked().length) return "";
    let html = `<div class="match-allergy"><p>🌿 ${t("allergy_client", L).replace("{a}", esc(allergyLabels(L).join(", ")))}</p></div>`;
    try { if (ingrSandra()) html += allergySwapHtml(m.treatment.id, L); } catch(e){ /* ignore */ }
    return html;
  }

  // once a day on Sandra's phone: a gentle note when something expires within 7 days
  function openDueToast(){
    try {
      if (!ingrSandra()) return;
      const due = openDue(); if (!due.length) return;
      const k = "bc_prod_open_toast", today = todayKey();
      if (localStorage.getItem(k) === today) return;
      localStorage.setItem(k, today);
      setTimeout(() => showToast(t("ingr_open_toast", state.lang).replace("{n}", due.length)), 1800);
    } catch(e){}
  }

  /* tab "Opgebruiken" (only Sandra, v111): a product with a date (THT or opened +
     months) gets a use-up action of ~2 months, ending a week before the date.
     Actions are spread out: a new one starts at least 3 weeks after the previous
     one, so never everything at once. Per action: which treatments, 10% off
     (or a free extra for masks), and ready-made texts for the WordPress
     newsletter/blog (with SEO) and for Instagram/Facebook. The texts never say
     that a product expires. */
  const USEUP_WEEKS = 8, USEUP_GAP_DAYS = 21, USEUP_PREP_DAYS = 7, USEUP_HORIZON = 150;
  const USEUP_DONE_KEY = "bc_useup_done_v1", USEUP_SEEN_KEY = "bc_useup_seen_v1";
  function useupGet(k){ try { const x = JSON.parse(localStorage.getItem(k) || "{}"); return x && typeof x === "object" ? x : {}; } catch(e){ return {}; } }
  function useupSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  const dKey = dt => `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`;
  const dAdd = (dt, n) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);
  function useupTreats(p){
    const cat = typeof TREATMENTS_CATALOG !== "undefined" ? TREATMENTS_CATALOG : [];
    const ids = (p.usedIn || []);
    if (ids.includes("extra-facial")) return { extra:true, list: cat.filter(x => ["signaturefacial","antiagefacial","expressfacial"].includes(x.id)).slice(0, 2) };
    const list = ids.map(id => cat.find(x => x.id === id)).filter(Boolean);
    list.sort((a, b) => (b.promoted ? 1 : 0) - (a.promoted ? 1 : 0));
    return { extra:false, list: list.slice(0, 2) };
  }
  const USEUP_SKIP_SLOTS = ["tooldisinfect","toolclean","disinfect","handdisinfect","nailclean","naildegrease","waxtalc","spf","antiseptic","cuticle","footrefresh","firstaid","nailrepair"];
  function useupPlan(){
    const done = useupGet(USEUP_DONE_KEY), today = new Date(todayKey() + "T00:00:00");
    const items = ingrCatalog().map(([id, p]) => ({ id, p, info: openInfo(id) }))
      .filter(x => x.info && !x.info.incomplete && x.info.days >= 14 && x.info.days <= USEUP_HORIZON && !done[x.id] && !USEUP_SKIP_SLOTS.includes(x.p.slot))
      .map(x => ({ ...x, tr: useupTreats(x.p) })).filter(x => x.tr.list.length)
      .sort((a, b) => a.info.exp - b.info.exp);
    // ideal: start 8 weeks before the end; when two start too close together,
    // the earlier one starts sooner (more time), never later
    items.forEach(x => { x.end = dAdd(x.info.exp, -7); x.start = dAdd(x.end, -USEUP_WEEKS * 7); });
    for (let i = items.length - 2; i >= 0; i--){
      const lim = dAdd(items[i + 1].start, -USEUP_GAP_DAYS);
      if (items[i].start > lim) items[i].start = lim;
    }
    // not in the past; then keep the gap going forward
    let prev = null;
    items.forEach(x => {
      if (x.start < today) x.start = today;
      if (prev && x.start < dAdd(prev, USEUP_GAP_DAYS)) x.start = dAdd(prev, USEUP_GAP_DAYS);
      if (x.start > dAdd(x.end, -14)) x.start = dAdd(x.end, -14);
      prev = x.start;
    });
    const soon = dAdd(today, USEUP_PREP_DAYS);
    return items.map(x => {
      const weeks = Math.max(1, Math.round((x.end - x.start) / (7 * 86400000)));
      return { ...x, prep: dAdd(x.start, -USEUP_PREP_DAYS), weeks, short: weeks < 6 && x.start <= soon };
    });
  }
  function useupEur(price){ const m = String(price || "").match(/€\s*(\d+(?:[.,]\d+)?)/); return m ? Number(m[1].replace(",", ".")) : 0; }
  function useupTexts(a, L){
    const tx = k => t(k, L), f = d => advFmt(dKey(d)), tn = tr => trName(tr.name, L);
    const prod = ingrName(a.p).replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+–\s+.*$/, m => m).trim();
    const lines = a.tr.list.map(tr => {
      const eur = useupEur(tr.price), nm = tn(tr);
      if (a.tr.extra) return tx("useup_line_extra").replace("{t}", nm);
      return eur ? tx("useup_line_disc").replace("{t}", nm).replace("{new}", "€" + (Math.round(eur * 0.9 * 2) / 2).toString().replace(".", ",")).replace("{old}", "€" + eur) : tx("useup_line_disc_noprice").replace("{t}", nm);
    });
    const first = a.tr.list[0] ? tn(a.tr.list[0]) : "";
    const offer = a.tr.extra ? tx("useup_offer_extra").replace("{p}", prod) : tx("useup_offer_disc").replace("{t}", first);
    const period = tx("useup_period").replace("{s}", f(a.start)).replace("{e}", f(a.end));
    const why = (ingrSplitNote(a.p.note ? (a.p.note[L] || a.p.note.nl) : "", L).pub || "").split(/(?<=[.!?])\s/)[0] || "";
    const cut = (v, n) => v.length <= n ? v : v.slice(0, n).replace(/\s+\S*$/, "");
    const seoTitle = (offer + " | Beauty & Coffee Mechelen").length <= 60 ? offer + " | Beauty & Coffee Mechelen" : cut(offer + " | Beauty & Coffee", 60);
    const slug = (first + "-actie-mechelen").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const news = [
      tx("useup_news_title_lbl") + " " + offer,
      tx("useup_seo_title_lbl") + " " + seoTitle,
      tx("useup_seo_meta_lbl") + " " + cut(offer + ". " + period + " " + tx("useup_seo_meta_tail"), 155),
      tx("useup_seo_slug_lbl") + " " + slug,
      tx("useup_seo_kw_lbl") + " " + [first, "Mechelen", tx("useup_kw_extra")].filter(Boolean).join(", "),
      "",
      tx("useup_news_intro").replace("{p}", prod) + (why ? " " + why : ""),
      "",
      lines.map(l => "• " + l).join("\n"),
      "",
      period + " " + tx("useup_terms"),
      tx("useup_cta")
    ].join("\n");
    const social = [
      offer,
      "",
      tx("useup_social_intro").replace("{p}", prod),
      lines.map(l => "• " + l).join("\n"),
      "",
      period + " " + tx("useup_terms_short"),
      tx("useup_cta_social"),
      "",
      tx("useup_hashtags")
    ].join("\n");
    return { offer, news, social };
  }
  function useupCalUrl(a, L){
    const f = dt => dKey(dt).replace(/-/g, ""), name = ingrName(a.p);
    const title = t("useup_cal_title", L).replace("{p}", name);
    const det = t("useup_cal_text", L).replace("{s}", advFmt(dKey(a.start))).replace("{e}", advFmt(dKey(a.end)));
    return "https://calendar.google.com/calendar/render?action=TEMPLATE" + `&text=${encodeURIComponent(title)}&dates=${f(a.prep)}/${f(dAdd(a.prep, 1))}&details=${encodeURIComponent(det)}`;
  }
  function useupHtml(){
    const L = state.lang, plan = useupPlan(), today = todayKey();
    let html = `<p class="ingr-note">${t("useup_intro", L)}</p>`;
    if (!plan.length) return html + `<p class="ingr-muted">${t("useup_none", L)}</p>`;
    plan.forEach(a => {
      const tx = useupTexts(a, L), now = dKey(a.prep) <= today;
      const mail = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t("useup_mail_subject", L).replace("{o}", tx.offer))}&body=${encodeURIComponent(t("useup_news_head", L) + "\n\n" + tx.news + "\n\n— — —\n\n" + t("useup_social_head", L) + "\n\n" + tx.social)}`;
      html += `<div class="useup${now ? " is-now" : ""}">
        <p class="useup__name">${esc(ingrName(a.p))}</p>
        <p class="ingr-muted">${t("useup_dates", L).replace("{s}", advFmt(dKey(a.start))).replace("{e}", advFmt(dKey(a.end))).replace("{x}", advFmt(a.info.expKey)).replace("{w}", a.weeks)}${a.short ? " · " + t("useup_short", L) : ""}</p>
        <p class="useup__offer">${esc(tx.offer)}</p>
        <details class="useup__txt"><summary>${t("useup_news_head", L)}</summary><pre>${esc(tx.news)}</pre>
          <button type="button" class="btn btn--sm btn--ghost" data-action="ingr-op-copy" data-code="${esc(tx.news)}">${t("ingr_op_copy", L)}</button></details>
        <details class="useup__txt"><summary>${t("useup_social_head", L)}</summary><pre>${esc(tx.social)}</pre>
          <button type="button" class="btn btn--sm btn--ghost" data-action="ingr-op-copy" data-code="${esc(tx.social)}">${t("ingr_op_copy", L)}</button></details>
        <div class="useup__btns">
          <a class="btn btn--sm btn--outline" href="${esc(mail)}">${t("useup_mail", L)}</a>
          <a class="btn btn--sm btn--outline" href="${esc(useupCalUrl(a, L))}" target="_blank" rel="noopener">${t("ingr_open_cal", L)}</a>
          <button type="button" class="btn btn--sm btn--ghost" data-action="useup-done" data-id="${esc(a.id)}">${t("useup_done", L)}</button>
        </div></div>`;
    });
    const done = Object.keys(useupGet(USEUP_DONE_KEY));
    if (done.length) html += `<p class="ingr-muted">${t("useup_done_count", L).replace("{n}", done.length)} <button type="button" class="btn btn--sm btn--ghost" data-action="useup-reset">${t("useup_reset", L)}</button></p>`;
    return html;
  }
  // once per action on Sandra's phone: a week before the start, a gentle note
  function useupToast(){
    try {
      if (!ingrSandra()) return;
      const seen = useupGet(USEUP_SEEN_KEY), today = todayKey();
      const due = useupPlan().filter(a => dKey(a.prep) <= today && !seen[a.id]);
      if (!due.length) return;
      due.forEach(a => { seen[a.id] = today; }); useupSet(USEUP_SEEN_KEY, seen);
      setTimeout(() => showToast(t("useup_toast", state.lang).replace("{p}", ingrName(due[0].p)).replace("{n}", due.length)), 4200);
    } catch(e){}
  }

  /* tab "Gebruiksvolgorde" (only Sandra): what is used up first, what stays; tap "Op" when finished */
  function ingrOrderHtml(){
    const L = state.lang, op = ingrOpSet(), local = ingrOpLocal(), file = typeof PRODUCTS_OP !== "undefined" ? PRODUCTS_OP : [];
    const tx = v => v && typeof v === "object" ? (v[L] || v.nl) : (v || "");
    let html = `<p class="ingr-note">${t("ingr_order_intro", L)}</p>`;
    (typeof PRODUCT_ORDER !== "undefined" ? PRODUCT_ORDER : []).forEach(g => {
      const nowIdx = g.phases.findIndex(ph => ph.ids.some(id => SALON_PRODUCTS[id] && !op.has(id)));
      html += `<h3 class="ingr-h">${esc(tx(g.label))}</h3>`;
      g.phases.forEach((ph, i) => {
        const last = i === g.phases.length - 1;
        html += `<div class="ingr-phase${i === nowIdx ? " is-now" : ""}"><p class="ingr-phase__title">${i + 1}. ${esc(tx(ph.label))}${i === nowIdx ? ` <span class="ingr-phase__now">${t("ingr_order_now", L)}</span>` : ""}</p>`;
        const ids = ph.ids.filter(id => SALON_PRODUCTS[id]);
        html += ids.length ? `<ul class="ingr-order">${ids.map(id => {
          const isOp = op.has(id);
          return `<li class="${isOp ? "is-op" : ""}"><span>${esc(ingrName(SALON_PRODUCTS[id]))}</span>
            <button type="button" class="btn btn--sm ${isOp ? "btn--ghost" : "btn--text"}" data-action="ingr-op" data-id="${esc(id)}">${isOp ? (file.includes(id) ? "✓ " + t("ingr_op_done", L) : t("ingr_op_back", L)) : t("ingr_op_mark", L)}</button></li>`;
        }).join("")}</ul>` : `<p class="ingr-muted">${t(last ? "ingr_order_none_last" : "ingr_order_none", L)}</p>`;
        html += `</div>`;
      });
    });
    const pending = local.filter(id => !file.includes(id));
    if (pending.length){
      const code = `PRODUCTS_OP = ${JSON.stringify([...new Set([...file, ...pending])])};`;
      html += `<div class="ingr-oppending"><p>📌 ${t("ingr_op_pending", L)}</p><code>${esc(code)}</code>
        <button type="button" class="btn btn--sm btn--ghost" data-action="ingr-op-copy" data-code="${esc(code)}">📋 ${t("ingr_op_copy", L)}</button></div>`;
    }
    return html;
  }
  /* client-facing notes stay neutral (Sandra, 13/10): sentences with warnings,
     regulations, dates or "contains …" go to Sandra's private 🔒 note.
     Clients still see allergens when THEY search for them (⚠️ line). */
  const NOTE_PRIV = {
    nl:/^(bevat|met alcohol)|formaldehyde|paraben|ontvlamba|irrit|allerg|\bniet (bij|op|in|tijdens|rond|voor|meer|bewaren)\b|zwanger|borstvoeding|epilep|astma|fototox|\bzon(nebank|nebrand)?\b|geen zon|kankerverw|\bCMR\b|\bD5\b|\bEXP\b|\bTHT\b|houdbaar tot|na openen|\bbatch\b|\bref\.|vervallen|biocide|ernstig|gevaar|vermijd|let op|wondjes|diabetes|temperatuur|patchtest|\bheet\b|chloorhexidine|alkalisch|dierlijk|\bnoten\b|etiket|welk merk|foto|ppd|toluyleen|bijsluiter|doosje|lees ik|nog niet|ingrediëntenlijst|\d{2}\/\d{4}/i,
    en:/^(contains|with alcohol)|formaldehyde|paraben|flammable|irritat|allerg|^not\b|\bnot (with|on|in|during|around|for|to)\b|pregnan|breastfeed|epilep|asthma|phototox|no sun|sunbed|sunburn|cancer|\bCMR\b|\bD5\b|\bEXP\b|best before|after opening|\bbatch\b|\bref\.|expired|biocide|serious|danger|avoid|note:|no longer|wounds|diabet|temperature|patch test|very hot|chlorhexidine|alkaline|animal|\bnuts\b|label|which brand|photo|ppd|toluene|leaflet|box|ingredient list|not yet|\d{2}\/\d{4}/i,
    fr:/^(contient)|formald|parab|inflamm|irrit|allerg|\bpas (en cas|sur|pendant|autour|chez|dans|de soleil)\b|^pas\b|grossesse|allaitement|épilep|asthme|phototox|soleil|cancér|\bCMR\b|\bD5\b|\bEXP\b|à utiliser avant|après ouverture|\blot\b|\bréf\.|périm|biocide|grave|danger|éviter|à noter|plus utilisé|plaies|diabét|température|test préalable|très chaude|chlorhexidine|alcalin|animal|fruits à coque|étiquette|quelle marque|lue sur|en cas de doute|photo|ppd|toluyl|notice|boîte|liste des ingrédients|pas encore|\d{2}\/\d{4}/i
  };
  function ingrSplitNote(text, L){
    const re = NOTE_PRIV[L] || NOTE_PRIV.nl, pub = [], priv = [];
    String(text || "").split(/(?<!\b(?:[Rr][eé]f|[Nn]r|[Bb]v|[Cc]a|[Nn]o|prod|[Aa]rt|e\.g|p\. ?ex)\.)(?<=[.!?])\s+(?=[A-ZÀ-Ý*0-9“"(])/).forEach(s => { if (s.trim()) (re.test(s) ? priv : pub).push(s.trim()); });
    return { pub: pub.join(" "), priv: priv.join(" ") };
  }
  function oilUseHtml(id, L){
    const u = (typeof OIL_USE !== "undefined" ? OIL_USE : {})[id]; if (!u) return "";
    const lines = [t("oil_steam_" + u.steam, L), t("oil_massage", L).replace("{d}", u.drops) + (u.sun ? " " + t("oil_sun", L) : ""), t("oil_foot_" + u.foot, L), t("oil_diffuser", L)];
    return `<div class="ingr-card__note ingr-card__note--sandra oil-use"><b>🧴 ${t("oil_use_title", L)}</b><ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
  }
  function tipsHtml(id, L){
    const tp = (typeof PRODUCT_TIPS !== "undefined" ? PRODUCT_TIPS : {})[id]; if (!tp) return "";
    const lines = tp[L] || tp.nl || [];
    return `<div class="ingr-card__note ingr-card__note--sandra oil-use"><b>💡 ${t("tips_title", L)}</b><ul>${lines.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
  }
  function ingrProductCard(id, p, keys){
    const L = state.lang, inci = ingrInci(p);
    const hits = keys ? ingrParts(inci).filter(x => ingrHit(x, keys)) : [];
    const note = ingrSplitNote(p.note ? (p.note[L] || p.note.nl) : "", L);
    const priv = [note.priv, p.sandraNote ? (p.sandraNote[L] || p.sandraNote.nl) : ""].filter(Boolean).join(" ");
    return `<div class="ingr-card">
        <p class="ingr-card__name">${esc(ingrName(p))}</p>
        ${hits.length ? `<p class="ingr-card__hit">⚠️ ${t("ingr_contains", L)} <b>${esc([...new Set(hits)].join(", "))}</b></p>` : ""}
        ${note.pub ? `<p class="ingr-card__note">${esc(note.pub)}</p>` : ""}
        ${priv && ingrSandra() ? `<p class="ingr-card__note ingr-card__note--sandra">🔒 ${esc(priv)}</p>` : ""}
        ${ingrSandra() ? oilUseHtml(id, L) : ""}
        ${ingrSandra() ? tipsHtml(id, L) : ""}
        <p class="ingr-muted">${t("ingr_used_in", L)} ${esc((p.usedIn || []).map(ingrTreatName).join(", ") || "—")}</p>
        <details class="ingr-inci"><summary>${t("ingr_full_list", L)}</summary><p>${inci ? esc(inci) : t("ingr_inci_missing", L)}</p>${p.inciSrc && ingrSandra() ? `<p class="ingr-muted">${t("ingr_src", L)} ${esc(p.inciSrc)}</p>` : ""}</details>
      </div>`;
  }
  // product finder (skin type / complaint in name or public note) — only when the query is NOT an allergy group
  function ingrFinderHtml(all, hitIds){
    const L = state.lang;
    // v173: product finder — skin type or complaint in the name or public note
    let out = "";
    const fq = ingrNorm(ingr.q).trim();
    if (fq.length >= 3){
      const syn = (typeof PRODUCT_FINDER_SYN !== "undefined" ? PRODUCT_FINDER_SYN : {});
      const terms = [...new Set([fq].concat(syn[fq] || [], ...fq.split(/\s+/).filter(w => w.length >= 4 && w !== "huid" && w !== "skin" && w !== "peau").map(w => syn[w] || [])))].map(ingrNorm);
      const neg = /\b(niet|geen|not|no|pas|sans|vermijd|avoid|zonder|without)\b[^.;]{0,30}$/;
      const has = (txt) => terms.some(tm => { let k = txt.indexOf(tm); while (k >= 0){ if ((k === 0 || !/[a-z0-9à-ÿ]/.test(txt[k - 1])) && !neg.test(txt.slice(Math.max(0, k - 40), k))) return true; k = txt.indexOf(tm, k + 1); } return false; });
      const txtOf = x => ingrNorm(typeof x === "string" ? x : Object.values(x || {}).join(" | "));
      const fit = all.filter(([id]) => !hitIds.has(id)).map(([id, p]) => [id, p, has(txtOf(p.name)) ? 2 : ((has(txtOf(p.note)) || (ingrSandra() && typeof PRODUCT_TIPS !== "undefined" && PRODUCT_TIPS[id] && has(txtOf(PRODUCT_TIPS[id].nl.concat(PRODUCT_TIPS[id].en || []))))) ? 1 : 0)]).filter(x => x[2] > 0).sort((a, b) => b[2] - a[2]);
      if (fit.length) out += `<h3 class="ingr-h">🔎 ${t("ingr_fit_found", L).replace("{n}", fit.length)}</h3>` + fit.slice(0, 30).map(([id, p]) => ingrProductCard(id, p, null)).join("");
    }
    return out;
  }
  function ingrCoreSlot(p){ return typeof ALLERGY_CORE_SLOTS !== "undefined" && ALLERGY_CORE_SLOTS.includes(p.slot); }
  const ingrUnusedBtn = (tid, pid) => ingrSandra() ? ` <button type="button" class="btn btn--text btn--sm ingr-x" data-bh="unused" data-treat="${esc(tid)}" data-prod="${esc(pid)}">✕ ${t("bh_unused", state.lang)}</button>` : "";
  function renderIngrResults(){
    const box = $("#ingrResults");
    if (!box) return;
    const L = state.lang, Q = ingrQuery(ingr.q);
    if (!Q){ box.innerHTML = `<p class="ingr-muted">${t("ingr_search_hint", L)}</p>`; return; }
    const all = ingrCatalog();
    const hit = all.filter(([, p]) => ingrParts(ingrInci(p)).some(x => ingrHit(x, Q.keys)));
    const hitIds = new Set(hit.map(([id]) => id));
    const withList = all.filter(([, p]) => ingrInci(p));
    const unknown = all.filter(([, p]) => !ingrInci(p));
    const gname = Q.groups.length ? Q.groups.map(g => g.label[L] || g.label.nl).join(", ") : "“" + ingr.q.trim() + "”";
    let html = Q.fuzzy ? `<p class="ingr-muted">${t("ingr_did_you_mean", L).replace("{g}", `<b>${esc(gname)}</b>`)}</p>` : "";
    const unkTxt = unknown.length ? `<p class="ingr-warn ingr-warn--small">❓ ${t("ingr_ans_unknown", L).replace("{n}", unknown.length)}</p>` : "";
    if (!hit.length){
      const fit = !Q.groups.length ? ingrFinderHtml(all, hitIds) : "";
      if (fit) html += fit;
      else if (!Q.groups.length) html += `<div class="ingr-answer ingr-answer--unk"><p class="ingr-answer__title">❔ ${t("ingr_unknown_term", L).replace("{q}", esc(ingr.q.trim()))}</p></div>`;
      else html += `<div class="ingr-answer ingr-answer--ok"><p class="ingr-answer__title">✅ ${t("ingr_ans_none", L).replace("{g}", esc(gname)).replace("{n}", withList.length)}</p>${unkTxt}</div>`;
      box.innerHTML = html + (fit ? unkTxt : ""); return;
    }
    // per treatment: no / skip a step / swap a product (treatments that are no longer offered are left out)
    const treat = {};
    hit.forEach(([id, p]) => (p.usedIn || []).forEach(tid => { if (!BC_UNAVAILABLE.has(tid)) (treat[tid] = treat[tid] || []).push(id); }));
    const rows = Object.entries(treat).map(([tid, pids]) => {
      const steps = pids.map(pid => {
        const p = all.find(([x]) => x === pid)[1];
        const alts = p.slot ? all.filter(([aid, a]) => a.slot === p.slot && !hitIds.has(aid) && ingrInci(a) && (a.usedIn || []).includes(tid)).map(([, a]) => ingrName(a)) : [];
        const hits = [...new Set(ingrParts(ingrInci(p)).filter(x => ingrHit(x, Q.keys)))];
        return { pid, p, alts, hits, core: ingrCoreSlot(p) };
      });
      const verdict = steps.some(s => !s.alts.length && s.core) ? "no" : steps.some(s => !s.alts.length) ? "skip" : "swap";
      const miss = ingrProductsFor(tid).filter(([, a]) => !ingrInci(a)).map(([, a]) => ingrName(a));
      return { tid, steps, verdict, miss };
    }).sort((x, y) => ["no", "skip", "swap"].indexOf(x.verdict) - ["no", "skip", "swap"].indexOf(y.verdict) || ingrTreatName(x.tid).localeCompare(ingrTreatName(y.tid)));
    const cnt = v => rows.filter(r => r.verdict === v).length;
    html += `<div class="ingr-answer ingr-answer--warn">
        <p class="ingr-answer__title">⚠️ ${t("ingr_ans_found", L).replace("{g}", esc(gname)).replace("{n}", hit.length)}</p>
        <p class="ingr-answer__sum">${[["no", "⛔"], ["skip", "⏭️"], ["swap", "🔁"]].filter(([v]) => cnt(v)).map(([v, ic]) => `${ic} ${t("ingr_sum_" + v, L).replace("{n}", cnt(v))}`).join(" · ") || "—"}</p>
        ${unkTxt}
        <button type="button" class="btn btn--text btn--sm" data-bh="openall">${t("ingr_open_all", L)} / ${t("ingr_close_all", L)}</button>
      </div>`;
    html += rows.map(r => `<details class="ingr-row ingr-row--${r.verdict}"><summary><span class="ingr-verdict ingr-verdict--${r.verdict}">${{ no: "⛔", skip: "⏭️", swap: "🔁" }[r.verdict]} ${t("ingr_verdict_" + r.verdict, L)}</span> <span class="ingr-row__name">${esc(ingrTreatName(r.tid))}</span></summary>
        <ul class="ingr-list">${r.steps.map(s => `<li><b>${esc(ingrName(s.p))}</b> <span class="ingr-muted">⚠️ ${esc(s.hits.join(", "))}</span><br>${s.alts.length ? `<span class="ingr-alt">🔁 ${t("ingr_replace", L)} ${esc(s.alts.join(" / "))}</span>` : `<span class="ingr-warn">${s.core ? "⛔ " + t("ingr_core_hint", L) : "⏭️ " + t("ingr_skip_step", L)}</span>`}${ingrUnusedBtn(r.tid, s.pid)}</li>`).join("")}</ul>
        ${r.miss.length ? `<p class="ingr-warn ingr-warn--small">❓ ${t("ingr_check_too", L)} ${esc(r.miss.join(", "))}</p>` : ""}
      </details>`).join("");
    html += `<details class="ingr-more"><summary>${t("ingr_all_products", L).replace("{n}", hit.length)}</summary>${hit.map(([id, p]) => ingrProductCard(id, p, Q.keys)).join("")}</details>`;
    box.innerHTML = html;
  }
  function renderIngrTreat(){
    const box = $("#ingrTreatBody");
    if (!box) return;
    const L = state.lang, sandra = ingrSandra();
    if (!ingr.treat){ box.innerHTML = ""; return; }
    const prods = ingrProductsFor(ingr.treat).sort((x, y) => ingrName(x[1]).localeCompare(ingrName(y[1])));
    const un = (bhEff().unused || {})[ingr.treat] || [];
    let html = prods.length ? `<p class="ingr-muted">${t("ingr_treat_count", L).replace("{n}", prods.length)} <button type="button" class="btn btn--text btn--sm" data-bh="openall">${t("ingr_open_all", L)} / ${t("ingr_close_all", L)}</button></p>`
      + prods.map(([id, p]) => `<details class="ingr-row"><summary><span class="ingr-row__name">${esc(ingrName(p))}</span>${ingrUnusedBtn(ingr.treat, id)}</summary>${ingrProductCard(id, p, null)}</details>`).join("")
      : `<p class="ingr-warn">❓ ${t("ingr_no_products", L)}</p>`;
    if (sandra && un.length) html += `<details class="ingr-more"><summary>${t("bh_unused_list", L).replace("{n}", un.length)}</summary><ul class="act-list">${un.map(pid => `<li class="act-row"><span class="act-row__name">${esc(SALON_PRODUCTS[pid] ? ingrName(SALON_PRODUCTS[pid]) : pid)}</span><button type="button" class="btn btn--sm btn--outline" data-bh="used" data-treat="${esc(ingr.treat)}" data-prod="${esc(pid)}">↺ ${t("bh_unused_back", L)}</button></li>`).join("")}</ul></details>`;
    box.innerHTML = html;
  }

  /* ---------------- advent calendar (1–25 December) ----------------
     Client: one door per day, and ONLY on that day itself — a missed day
     stays closed for good. Opening a door plays a little "gift box"
     animation and creates a personal voucher with a one-time code + QR
     (no server: the code carries its own HMAC check, so made-up codes
     are refused).
     Salon: #salon → "Advent" → scan. Sandra's phone keeps a ledger of
     every code: reserved (appointment booked with the code), redeemed,
     or lapsed (appointment moved/cancelled). Each code works only once,
     and stock / "1 gift per client" are counted on that phone.
     Private preview: ADVENT.live = false hides everything from the public.
     Sandra opens ?voorproef=<your key> : a bar lets her choose
     the day, nothing is saved, codes start with T and only work on a
     salon phone that is in preview mode too. */
  const ADV_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // 32 signs, no 0/O/1/I
  const ADV_QR_PREFIX = "BCADV:";
  // one ledger per calendar year (2026 keeps its original name)
  const ADV_LEDGER_KEY = (typeof ADVENT === "object" && ADVENT.year && ADVENT.year !== 2026) ? "bc_advent_ledger_v1_" + ADVENT.year : "bc_advent_ledger_v1";
  const ADV_DOOR_ORDER = [12,3,19,7,24,1,15,9,21,5,17,11,25,2,14,20,6,10,23,4,16,8,22,13,18];
  const advPreview = (() => {
    try {
      const k = new URLSearchParams(location.search).get("voorproef");
      return !!(k && typeof ADVENT === "object" && ADVENT.previewKey && previewMatch(k, ADVENT.previewKey));
    } catch(e){ return false; }
  })();
  let advTest = null;                          // the simulated day in preview mode
  if (advPreview){
    // &datum=JJJJ-MM-DD = the app as on that day (all year round); &dag=7 = 7 December; else today
    let d = null, dt = null;
    try { const q = new URLSearchParams(location.search); d = q.get("dag"); dt = q.get("datum"); } catch(e){ /* ignore */ }
    if (dt && /^\d{4}-\d{2}-\d{2}$/.test(dt)) d = dt;
    else if (d && /^\d{1,2}$/.test(d)) d = `${ADVENT.year}-12-${String(Math.min(25, Math.max(1, Number(d)))).padStart(2,"0")}`;
    if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) d = todayKey();
    advTest = d;
  }
  // yellow bar on every screen in preview: pick the date the app should behave as
  function renderPreviewBar(){
    if (!advPreview) return;
    let bar = $("#previewBar");
    if (!bar){
      bar = document.createElement("div"); bar.id = "previewBar"; bar.className = "advent-preview preview-bar";
      const app = $("#app"); if (app) app.insertBefore(bar, app.firstChild); else document.body.prepend(bar);
      bar.addEventListener("change", e => {
        const inp = e.target.closest("#previewDate"); if (!inp || !/^\d{4}-\d{2}-\d{2}$/.test(inp.value)) return;
        try { const q = new URLSearchParams(location.search); q.delete("dag"); q.set("datum", inp.value); location.search = q.toString(); } catch(err){ /* ignore */ }
      });
      bar.addEventListener("click", e => {
        if (!e.target.closest("[data-preview-today]")) return;
        try { const q = new URLSearchParams(location.search); q.delete("dag"); q.delete("datum"); location.search = q.toString(); } catch(err){ /* ignore */ }
      });
    }
    bar.innerHTML = `<p>🧪 <b>${t("pv_bar_title", state.lang)}</b> — ${t("pv_bar_text", state.lang)}</p>
      <label>${t("pv_bar_date", state.lang)} <input type="date" id="previewDate" value="${advTest}"></label>
      <button type="button" class="btn btn--text btn--sm" data-preview-today="1">${t("pv_bar_today", state.lang)}</button>`;
  }
  const advMemory = { opened:{} };              // preview: kept in memory only
  const advMemLedger = { codes:{} };

  function advHasConfig(){ return typeof ADVENT === "object" && ADVENT && Array.isArray(ADVENT.doors); }
  function advIsLive(){ return ADVENT.live === true || (!!ADVENT.liveFrom && todayKey() >= ADVENT.liveFrom); }
  function advVisible(){ return advHasConfig() && (advIsLive() || advPreview); }
  function advTodayKey(){ return advTest || todayKey(); }
  function advParts(key){ const [y, m, d] = key.split("-").map(Number); return { y, m, d }; }
  function advKeyFor(y, m, d){ return `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`; }
  function advAddDays(key, n){
    const { y, m, d } = advParts(key);
    const dt = new Date(y, m - 1, d + n);
    return advKeyFor(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
  }
  function advFmt(key){ const { y, m, d } = advParts(key); return `${String(d).padStart(2,"0")}/${String(m).padStart(2,"0")}/${y}`; }
  function advDoorDate(day){ return advKeyFor(ADVENT.year, 12, day); }
  // a door + the item behind it (ADVENT.items), as one object
  // overrideId: a replacement item (mask out of stock → Sandra gave another one)
  function advDoor(day, overrideId){
    const d = ADVENT.doors.find(x => Number(x.day) === Number(day));
    if (!d) return null;
    const ov = overrideId && overrideId !== d.item && ADVENT.items && ADVENT.items[overrideId] ? overrideId : null;
    const item = (ADVENT.items && ADVENT.items[ov || d.item]) || d;
    return Object.assign({}, item, { day:Number(d.day), itemId:ov || d.item || null, replacedFrom: ov ? d.item : null,
      itemStock: item.stock == null || item === d ? null : Number(item.stock),
      stock: d.stock == null ? null : Number(d.stock),
      photo: ADVENT.showPhotos === true ? (item.photo || null) : null });
  }
  // the client's own view: with the replacement Sandra gave (scanned BCR1 code)
  function advDoorClient(day){ const r = advStore().repl; return advDoor(day, r && r[day]); }
  function advDoorText(door, lang){ return (door && (door[lang] || door.nl)) || ""; }
  function advTxt(v){ return v && typeof v === "object" ? (v[state.lang] || v.nl || "") : (v || ""); }
  // book the appointment (with the code) at the latest on …
  // deadlines always end on the Sunday (evening) of the week they fall in:
  // Sandra works on Saturday and Sunday
  function advToSunday(key){
    const { y, m, d } = advParts(key);
    const wd = new Date(y, m - 1, d).getDay();             // 0 = Sunday
    return wd === 0 ? key : advAddDays(key, 7 - wd);
  }
  function advBookBy(day){ return advToSunday(advAddDays(advDoorDate(day), ADVENT.bookWithinDays || 21)); }
  // … and the appointment itself takes place at the latest on …
  function advUseBy(day){
    const door = advDoor(day);
    return advToSunday(advAddDays(advDoorDate(day), door && door.homemade ? (ADVENT.homemadeDays || 21) : (ADVENT.useWithinDays || 42)));
  }
  function advLastDay(){ return advToSunday(advAddDays(advDoorDate(25), Math.max(ADVENT.useWithinDays || 42, ADVENT.homemadeDays || 21))); }
  // "zondag 27/12/2026" — deadlines show the weekday
  function advFmtDay(key){
    const { y, m, d } = advParts(key);
    const loc = { nl:"nl-BE", en:"en-GB", fr:"fr-BE" }[state.lang] || "nl-BE";
    return new Date(y, m - 1, d).toLocaleDateString(loc, { weekday:"long" }) + " " + advFmt(key);
  }
  // "before" | "teaser" | "live" | "after" | "over"
  function advPhase(){
    if (!advHasConfig()) return "over";
    const today = advTodayKey();
    if (today < ADVENT.teaserFrom) return "before";
    if (today < advDoorDate(1)) return "teaser";
    if (today <= advDoorDate(25)) return "live";
    if (today <= advLastDay()) return "after";
    return "over";
  }
  function advTodayDoor(){
    const { y, m, d } = advParts(advTodayKey());
    return (y === ADVENT.year && m === 12 && d >= 1 && d <= 25) ? d : null;
  }
  function advStore(){
    if (advPreview) return advMemory;
    if (!localData.advent || typeof localData.advent !== "object" || !localData.advent.opened) localData.advent = { opened:{} };
    if (localData.advent.year && localData.advent.year !== ADVENT.year) localData.advent = { opened:{} };   // a new year starts fresh
    localData.advent.year = ADVENT.year;
    return localData.advent;
  }
  // One random id per phone, part of every voucher code: the salon phone
  // can then see that two vouchers come from the same client.
  function advDeviceId(){
    const st = advStore();
    if (!st.dev || !/^[A-HJ-NP-Z2-9]{5}$/.test(st.dev)){
      const rnd = new Uint8Array(5); crypto.getRandomValues(rnd);
      st.dev = Array.from(rnd).map(b => ADV_ALPHABET[b % 32]).join("");
      if (!advPreview) saveLocalData();
    }
    return st.dev;
  }
  // "opened" | "today" | "missed" | "future"
  function advDoorState(day){
    if (advStore().opened[day]) return "opened";
    const key = advDoorDate(day), today = advTodayKey();
    if (key === today) return "today";
    return key < today ? "missed" : "future";
  }
  // fills {gmin} {dmin} {treat} {with} {max} {book} {until} in a text
  function advFill(txt, door){
    const L = state.lang;
    let s = String(txt || "");
    // vouchers for one named massage: no price in the text
    if (door && door.noMin) s = s.replace(/ (?:van minstens €|of at least €|vanaf €|from €)\{dmin\}| (?:d'au moins|à partir de) \{dmin\} €/g, "");
    s = s
      .replace(/\{cond\}/g, door && door.cond ? (door.cond[L] || door.cond.nl) : t("adv_cond_default", L))
      .replace(/\{gmin\}/g, ADVENT.giftMinSpend || 0)
      .replace(/\{dmin\}/g, ADVENT.discountMinSpend || 0)
      .replace(/\{max\}/g, ADVENT.maxGiftsPerClient || 1)
      .replace(/\{treat\}/g, door && door.treat ? (door.treat[L] || door.treat.nl) : "")
      .replace(/\{with\}/g, door && door.with ? (door.with[L] || door.with.nl) : "");
    if (door && door.day){ s = s.replace(/\{book\}/g, advFmtDay(advBookBy(door.day))).replace(/\{until\}/g, advFmtDay(advUseBy(door.day))); }
    return s;
  }
  // "gift" | "homemade" | "extra" | "discount" — picks the right texts
  function advKind(door){ return door.type === "gift" ? (door.homemade ? "homemade" : "gift") : door.type; }
  // icon for lists: product photo, %-value or emoji
  function advThumb(door, cls){
    if (door.photo) return `<img class="${cls}" src="${door.photo}" data-fallback="adv" data-emoji="${door.type === "discount" ? (door.value || "%") : door.icon}" alt="" loading="lazy">`;
    return `<span class="${cls}">${door.type === "discount" ? (door.value || "%") : door.icon}</span>`;
  }

  async function advCheck(prefix, day, id){
    const key = await getAdvKey();
    const sig = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`BC-ADVENT|${prefix}|${ADVENT.year}|${day}|${id}`)));
    return Array.from(sig.slice(0, 4)).map(b => ADV_ALPHABET[b % 32]).join("");
  }
  async function advMakeCode(day){
    const prefix = advPreview ? "T" : "A";
    const id = advDeviceId();
    return `${prefix}${String(day).padStart(2,"0")}-${id}-${await advCheck(prefix, day, id)}`;
  }
  // accepts "BCADV:A07-K3MZQ-8HTR", "a07k3mzq8htr", spaces etc.
  async function advParseCode(raw){
    if (!raw) return null;
    let s = String(raw).trim().toUpperCase();
    if (s.startsWith(ADV_QR_PREFIX)) s = s.slice(ADV_QR_PREFIX.length);
    s = s.replace(/[\s\-–_.]/g, "");
    const m = s.match(/^([AT])(\d{2})([A-HJ-NP-Z2-9]{5})([A-HJ-NP-Z2-9]{4})$/);
    if (!m) return null;
    const prefix = m[1], day = Number(m[2]), id = m[3], chk = m[4];
    const code = `${prefix}${m[2]}-${id}-${chk}`;
    if (day < 1 || day > 25) return { code, valid:false };
    return { code, prefix, day, dev:id, valid: (await advCheck(prefix, day, id)) === chk };
  }

  /* ---- preview bar: pick the simulated day ---- */
  function advPreviewBar(where){
    if (!advPreview) return "";
    const y = ADVENT.year;
    const opts = [[`${y}-11-20`, t("adv_pv_teaser", state.lang)]];
    // short date in the chosen language ("7 dec" / "7 Dec" / "7 déc.")
    const loc = { nl:"nl-BE", en:"en-GB", fr:"fr-BE" }[state.lang] || "nl-BE";
    const lbl = key => { const { y:yy, m, d } = advParts(key); return new Date(yy, m - 1, d).toLocaleDateString(loc, { day:"numeric", month:"short" }); };
    for (let d = 1; d <= 25; d++) opts.push([advKeyFor(y, 12, d), lbl(advKeyFor(y, 12, d))]);
    const after = " (" + t("adv_pv_after", state.lang) + ")";
    [`${y}-12-28`, `${y + 1}-01-10`, `${y + 1}-01-20`, `${y + 1}-02-05`, `${y + 1}-03-01`].forEach(k => opts.push([k, lbl(k) + after]));
    if (!opts.some(o => o[0] === advTest)) opts.push([advTest, advFmt(advTest)]);
    opts.sort((a, b) => a[0] < b[0] ? -1 : 1);
    return `<div class="advent-preview" data-where="${where}">
      <p>🧪 <b>${t("adv_pv_title", state.lang)}</b> — ${(advIsLive() ? t("adv_pv_live", state.lang) : t("adv_pv_hidden", state.lang).replace("{d}", advFmt(ADVENT.liveFrom || ADVENT.teaserFrom)))}</p>
      <label>${t("adv_pv_day", state.lang)}
        <select class="advent-preview__day" data-adv-preview="day">${opts.map(o => `<option value="${o[0]}"${o[0] === advTest ? " selected" : ""}>${o[1]}</option>`).join("")}</select>
      </label>
      <button type="button" class="btn btn--text btn--sm" data-adv-preview="wipe">${t("adv_pv_wipe", state.lang)}</button>
    </div>`;
  }
  function advPreviewRerender(){
    renderAdventCard();
    if ($('section.step[data-step="advent"]') && $('section.step[data-step="advent"]').classList.contains("is-active")) renderAdvent();
    renderSalonAdvent();
  }
  document.addEventListener("change", e => {
    const sel = e.target.closest('[data-adv-preview="day"]');
    if (!sel || !advPreview) return;
    advTest = sel.value;
    advPreviewRerender();
    applySeason();
    renderPreviewBar();
  });
  document.addEventListener("click", e => {
    const b = e.target.closest('[data-adv-preview="wipe"]');
    if (!b || !advPreview) return;
    advMemory.opened = {}; advMemory.dev = null; advMemLedger.codes = {};
    advPreviewRerender();
    showToast(t("adv_pv_wiped", state.lang));
  });

  /* ---- client: welcome card ---- */
  function renderAdventCard(){
    const card = $("#adventCard");
    if (!card) return;
    if (!advVisible()){ card.hidden = true; card.innerHTML = ""; return; }
    const phase = advPhase();
    const openedCount = Object.keys(advStore().opened).length;
    let html = "";
    if (phase === "teaser"){
      html = `<p class="advent-card__title">🎄 ${t("adv_title", state.lang)}</p>
        <p class="advent-card__tagline">${t("adv_tagline", state.lang)}</p>
        <p class="advent-card__text">${t("adv_card_teaser", state.lang)}</p>
        <button type="button" class="btn btn--primary btn--sm" data-action="open-advent">${t("adv_card_peek_btn", state.lang)}</button>`;
    } else if (phase === "live"){
      const d = advTodayDoor();
      const st = d ? advDoorState(d) : null;
      const line = st === "today" ? t("adv_card_today", state.lang).replace("{n}", d) : t("adv_card_done", state.lang).replace("{n}", d);
      html = `<p class="advent-card__title">🎄 ${t("adv_title", state.lang)}</p>
        <p class="advent-card__tagline">${t("adv_tagline", state.lang)}</p>
        <p class="advent-card__text">${line}</p>
        <button type="button" class="btn btn--primary btn--sm${st === "today" ? " advent-card__pulse" : ""}" data-action="open-advent">${t("adv_card_open_btn", state.lang)}</button>`;
    } else if (phase === "after" && openedCount){
      html = `<p class="advent-card__title">🎁 ${t("adv_mine_title", state.lang)}</p>
        <p class="advent-card__text">${t("adv_card_after", state.lang).replace("{n}", openedCount)}</p>
        <button type="button" class="btn btn--primary btn--sm" data-action="open-advent">${t("adv_card_mine_btn", state.lang)}</button>`;
    } else if (advPreview){
      html = `<p class="advent-card__title">🎄 ${t("adv_title", state.lang)}</p>
        <p class="advent-card__tagline">${t("adv_tagline", state.lang)}</p>
        <button type="button" class="btn btn--primary btn--sm" data-action="open-advent">${t("adv_card_peek_btn", state.lang)}</button>`;
    }
    card.hidden = !html;
    card.innerHTML = advPreviewBar("card") + html;
  }

  /* ---- client: the 25 doors ---- */
  function renderAdvent(){
    const wrap = $("#adventBody");
    if (!wrap || !advHasConfig()) return;
    if (!advVisible()){ wrap.innerHTML = `<p class="advent-note">${t("adv_not_yet", state.lang)}</p>`; return; }
    const phase = advPhase();
    const store = advStore();
    let note = "";
    if (phase === "before" || phase === "teaser") note = t("adv_note_teaser", state.lang);
    else if (phase === "after" || phase === "over") note = t("adv_note_over", state.lang);
    const doors = ADV_DOOR_ORDER.filter(d => advDoor(d)).map(day => {
      const st = advDoorState(day);
      const door = advDoorClient(day);
      const inner = st === "opened" ? (door.photo ? `<img class="advent-door__photo" src="${door.photo}" data-fallback="adv" data-emoji="${door.type === "discount" ? (door.value || "%") : door.icon}" alt="">` : `<span class="advent-door__icon" aria-hidden="true">${door.type === "discount" ? (door.value || "%") : door.icon}</span>`)
        : st === "missed" ? `<span class="advent-door__tag">${t("adv_state_missed", state.lang)}</span>`
        : st === "today" ? `<span class="advent-door__tag">${t("adv_state_today", state.lang)}</span>` : "";
      const label = t("adv_door_label", state.lang).replace("{n}", day);
      return `<button type="button" class="advent-door advent-door--${st}" data-action="advent-door" data-day="${day}" aria-label="${label}${st === "missed" ? " — " + t("adv_state_missed", state.lang) : ""}">
          <span class="advent-door__num">${day}</span>${inner}</button>`;
    }).join("");
    const mine = Object.keys(store.opened).map(Number).sort((a, b) => a - b);
    const mineHtml = mine.length ? `<p class="advent-mine__title">${t("adv_mine_title", state.lang)}</p>
      ${ADVENT.maxGiftsPerClient ? `<p class="advent-mine__note">${advFill(t("adv_mine_note", state.lang))}</p>` : ""}
      <div class="advent-mine">${mine.map(day => { const door = advDoorClient(day); if (!door) return "";
        const until = advUseBy(day), expired = advTodayKey() > until;
        return `<button type="button" class="advent-mine__item${expired ? " is-expired" : ""}" data-action="advent-door" data-day="${day}">
        ${advThumb(door, "advent-mine__thumb")}<span>${t("adv_door_label", state.lang).replace("{n}", day)} · ${advDoorText(door, state.lang)}<small>${expired ? t("adv_expired_short", state.lang) : advFill(t("adv_book_short", state.lang), door)}</small></span></button>`; }).join("")}</div>` : "";
    wrap.innerHTML = `${advPreviewBar("advent")}${note ? `<p class="advent-note">${note}</p>` : ""}
      <div class="advent-grid" id="adventGrid">${doors}</div>
      <p class="advent-legend">${t("adv_legend", state.lang)}</p>
      ${mineHtml}
      ${advIngredientsHtml()}`;
  }
  // every product behind a door, with its ingredients (also printed on the card with the gift)
  function advIngredientsHtml(){
    const seen = new Set(), rows = [];
    // only the gifts behind doors this client has already opened (no spoilers);
    // Sandra's preview shows all of them
    const opened = (advStore() && advStore().opened) || {};
    ADVENT.doors.forEach(d0 => {
      if (!advPreview && !opened[d0.day]) return;
      const door = advDoorClient(d0.day);
      if (!door || seen.has(door.itemId) || !door.ingredients || door.type !== "gift") return;
      seen.add(door.itemId);
      const note = advTxt(door.ingredientsNote);
      rows.push(`<li><b>${door.product || advDoorText(door, state.lang)}</b>: ${advTxt(door.ingredients)}${note ? ` <i>(${note})</i>` : ""}</li>`);
    });
    if (!rows.length) return "";
    return `<details class="advent-ingr"><summary>🧾 ${t("adv_ingr_all", state.lang)}</summary>
      <p>${t("adv_ingr_all_hint", state.lang)}</p><ul>${rows.join("")}</ul></details>`;
  }

  async function adventDoorClick(day, btn){
    const st = advDoorState(day);
    if (st === "opened"){ showAdventVoucher(day); return; }
    if (st === "missed"){ showToast(t("adv_missed_toast", state.lang)); return; }
    if (st === "future"){ showToast(t("adv_future_toast", state.lang).replace("{n}", state.lang === "fr" && day === 1 ? "1er" : day)); return; }   // FR: "le 1er décembre"
    if (!stampCryptoAvailable()){ showToast(t("stamp_unsupported", state.lang)); return; }
    // st === "today": the client really tapped today's door
    const code = await advMakeCode(day);
    if (advDoorState(day) !== "today") return;          // double tap
    advStore().opened[day] = { code, at:new Date().toISOString() };
    if (!advPreview) saveLocalData();
    trackEvent("advent-open");
    if (btn) btn.classList.add("is-opening");
    if (navigator.vibrate) navigator.vibrate([40, 40, 80]);
    setTimeout(() => { renderAdvent(); renderAdventCard(); showAdventReveal(day); }, btn ? 600 : 0);
  }

  /* ---- the gift box: lid pops off, the gift jumps out ---- */
  function showAdventReveal(day){
    const door = advDoor(day);
    if (!door) return;
    const old = $("#advReveal"); if (old) old.remove();
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce){ showAdventVoucher(day); return; }
    const item = door.photo ? `<img src="${door.photo}" data-fallback="adv" data-emoji="${door.type === "discount" ? (door.value || "%") : door.icon}" alt="">`
      : door.type === "discount" ? `<span class="adv-reveal__ticket"><b>${door.value || "%"}</b><small>${t("adv_side_discount", state.lang)}</small></span>`
      : `<span class="adv-reveal__emoji">${door.icon}</span>${door.type === "extra" ? `<small class="adv-reveal__free">${t("adv_free", state.lang)}</small>` : ""}`;
    const ov = document.createElement("div");
    ov.className = "adv-reveal"; ov.id = "advReveal";
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.innerHTML = `
      <div class="adv-reveal__stage" aria-hidden="true">
        <span class="adv-reveal__burst"></span>
        <span class="adv-reveal__sparks"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <div class="adv-reveal__item">${item}</div>
        <div class="adv-reveal__box">
          <span class="adv-reveal__lid"><span class="adv-reveal__bow"></span></span>
          <span class="adv-reveal__body"><span class="adv-reveal__num">${day}</span></span>
        </div>
      </div>
      <p class="adv-reveal__title">${t("adv_reveal_title", state.lang)}</p>
      <p class="adv-reveal__name">${advDoorText(door, state.lang)}</p>
      <button type="button" class="btn btn--primary adv-reveal__go" data-reveal="go">🎟️ ${t("adv_reveal_btn", state.lang)}</button>
      <button type="button" class="btn btn--text adv-reveal__later" data-reveal="close">${t("adv_reveal_later", state.lang)}</button>
      <button type="button" class="adv-reveal__x" data-reveal="close" aria-label="${t("adv_reveal_later", state.lang)}">✕</button>`;
    document.body.appendChild(ov);
    // the door stays opened: the voucher can be shown later via "Mijn bonnen"
    const close = () => { ov.remove(); document.removeEventListener("keydown", onKey); if (typeof renderAdvent === "function") renderAdvent(); };
    const go = () => { ov.remove(); document.removeEventListener("keydown", onKey); showAdventVoucher(day); };
    const onKey = e => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    ov.addEventListener("click", e => {
      if (e.target.closest('[data-reveal="close"]')) return close();
      if (e.target.closest('[data-reveal="go"]')) go();
    });
    setTimeout(() => ov.classList.add("is-done"), 2300);
  }

  async function showAdventVoucher(day){
    const door = advDoorClient(day);
    const rec = advStore().opened[day];
    if (!door || !rec) return;
    closeAdventVoucher();
    const kind = advKind(door), isGift = door.type === "gift";
    const until = advUseBy(day), book = advBookBy(day), today = advTodayKey();
    const expired = today > until;
    const rulesKey = `adv_rules_${kind}`;
    let rules = advFill(t(rulesKey, state.lang), door);
    if (isGift && ADVENT.maxGiftsPerClient) rules = rules.replace("</ul>", `<li>${advFill(t("adv_rule_max", state.lang))}</li></ul>`);
    const dates = advFill(t(`adv_dates_${kind}`, state.lang), door);
    const late = !expired && kind !== "homemade" && today > book ? `<p class="advent-voucher__late">${advFill(t("adv_late_note", state.lang), door)}</p>` : "";
    const stockNote = door.replacedFrom ? `<p class="advent-voucher__limited">🔄 ${t("adv_repl_note", state.lang).replace("{item}", advDoorText(ADVENT.items[door.replacedFrom] || {}, state.lang))}</p>`
      : door.soldOut ? `<p class="advent-voucher__soldout">😔 ${t("adv_soldout_banner", state.lang)}</p>`
      : (door.itemStock != null ? `<p class="advent-voucher__limited">${t("adv_limited", state.lang).replace("{n}", door.itemStock)}</p>` : "");
    const boxHtml = door.photo ? `<img class="bc-voucher__photo" src="${door.photo}" data-fallback="adv" data-emoji="${door.type === "discount" ? (door.value || "%") : door.icon}" alt="">`
      : door.type === "discount" ? `<b>${door.value || ""}</b>`
      : door.type === "extra" ? `<i aria-hidden="true">${door.icon}</i><small>${t("adv_free", state.lang)}</small>`
      : `<i aria-hidden="true">${door.icon}</i>`;
    const use = advTxt(door.use);
    const ingr = advTxt(door.ingredients), ingrNote = advTxt(door.ingredientsNote);
    const hl = advTxt(door.highlights);
    const infoHtml = isGift ? `<div class="advent-voucher__info"><p>${t("adv_info_title", state.lang)}</p>
        ${use ? `<p class="advent-voucher__use">${use}</p>` : ""}
        ${door.noIngredients ? "" : door.ingrOnPack ? `<p class="advent-voucher__ingr">${t("adv_ingredients_pack", state.lang)}</p>`
          : `<p class="advent-voucher__ingr">${ingr ? `<b>${t("adv_ingredients", state.lang)}</b> ${ingr}${ingrNote ? ` <i>(${ingrNote})</i>` : ""}` : t("adv_ingredients_label", state.lang)}</p>
        <p class="advent-voucher__ingr">${t("adv_ingredients_card", state.lang)}</p>`}</div>`
      : hl ? `<div class="advent-voucher__info"><p>${t("adv_info_good", state.lang)}</p>
        <p class="advent-voucher__use">${hl}</p>
        ${door.ingredients ? `<p class="advent-voucher__ingr">${t("adv_allergy_ask", state.lang)}</p>` : ""}</div>` : "";
    const waText = advFill(t("adv_book_wa_text", state.lang), door).replace("{gift}", advDoorText(door, state.lang)).replace("{code}", rec.code);
    const bookHtml = expired ? "" : `<div class="advent-voucher__book">
        ${typeof ONLINE_BOOKING_URL !== "undefined" && ONLINE_BOOKING_URL ? `<a class="btn btn--primary btn--sm" href="${esc(ONLINE_BOOKING_URL)}" target="_blank" rel="noopener noreferrer" data-action="online-book" data-online-src="advent">📅 ${t("adv_book_online", state.lang)}</a>` : ""}
        <a class="btn btn--outline btn--sm" href="https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener noreferrer">💬 ${t("adv_book_wa", state.lang)}</a>
        <button type="button" class="btn btn--outline btn--sm" data-adv="copy">📋 ${t("adv_copy_code", state.lang)}</button>
        <p class="advent-voucher__online">${t("adv_book_online_hint", state.lang)}</p>
        ${door.itemStock != null || door.replacedFrom ? `<button type="button" class="btn btn--text btn--sm" data-adv="scanrepl">🔄 ${t("adv_repl_scan_btn", state.lang)}</button>` : ""}
      </div>`;
    const ov = document.createElement("div");
    ov.className = "stamp-overlay advent-overlay"; ov.id = "adventVoucherOverlay";
    ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
    ov.innerHTML = `
      <div class="stamp-overlay__panel advent-voucher">
        <button type="button" class="stamp-overlay__close" data-adv="close" aria-label="${t("stamp_close", state.lang)}">✕</button>
        <p class="advent-voucher__door">🎄 ${t("adv_door_label", state.lang).replace("{n}", day)} · ${advFmt(advDoorDate(day))}</p>
        <div class="bc-voucher${isGift ? "" : " bc-voucher--discount"}">
          <span class="bc-voucher__side bc-voucher__side--l">BEAUTY &amp; COFFEE<br>${t(isGift ? "adv_side_gift" : "adv_side_discount", state.lang)}</span>
          <span class="bc-voucher__box${door.photo ? " bc-voucher__box--photo" : ""}">${boxHtml}</span>
          <span class="bc-voucher__side bc-voucher__side--r">${t("adv_valid_until", state.lang)} ${advFmt(until)}<br>${t("adv_code_nr", state.lang)} ${rec.code}</span>
          <img class="bc-voucher__logo" src="assets/icon-192.png" alt="">
        </div>
        <p class="advent-voucher__name">${advDoorText(door, state.lang)}</p>
        ${stockNote}
        <p class="advent-voucher__dates${expired ? " is-expired" : ""}">${expired ? "⌛ " + t("adv_expired_long", state.lang).replace("{d}", advFmt(until)) : dates}</p>
        ${late}
        <p class="advent-voucher__show">${t("adv_show_hint", state.lang)}</p>
        <canvas class="advent-voucher__qr" id="adventQr" width="480" height="480"></canvas>
        <p class="advent-voucher__code">${rec.code}</p>
        ${bookHtml}
        ${infoHtml}
        <div class="advent-voucher__rules"><p>${t("adv_rules_title", state.lang)}</p>${rules}</div>
        ${advPreview ? `<p class="advent-test">🧪 ${t("adv_test_code", state.lang)}</p>` : ""}
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => {
      const a = e.target.closest("[data-adv]");
      if (a && a.dataset.adv === "copy"){
        const done = () => showToast(t("adv_copied", state.lang));
        try { navigator.clipboard.writeText(rec.code).then(done, () => window.prompt(t("adv_copy_code", state.lang), rec.code)); }
        catch(err){ window.prompt(t("adv_copy_code", state.lang), rec.code); }
        return;
      }
      if (a && a.dataset.adv === "scanrepl"){ closeAdventVoucher(); openStampScanner(); return; }
      if (e.target === ov || (a && a.dataset.adv === "close")) closeAdventVoucher();
    });
    const ok = await loadFirstScript(["assets/lib/qr-encoder.js"], () => !!window.BCQRCode);
    if (ok) drawQrToCanvas($("#adventQr"), ADV_QR_PREFIX + rec.code);
  }
  function closeAdventVoucher(){ const ov = $("#adventVoucherOverlay"); if (ov) ov.remove(); }

  /* ---- salon: ledger of vouchers (on Sandra's phone only) ----
     codes[code] = { day, dev, type, item, at, status:"booked"|"used"|"void", appt, usedAt, voidAt } */
  function advLedger(){
    if (advPreview) return advMemLedger;
    try {
      const l = JSON.parse(localStorage.getItem(ADV_LEDGER_KEY) || "null");
      if (l && l.codes) return l;
    } catch(e){ /* ignore */ }
    return { codes:{} };
  }
  function advSaveLedger(l){
    if (advPreview) return true;
    try { localStorage.setItem(ADV_LEDGER_KEY, JSON.stringify(l)); return true; } catch(e){ return false; }
  }
  function advStatus(x){ return (x && x.status) || "used"; }          // older entries = redeemed
  function advActive(l){ return Object.values(l.codes).filter(x => advStatus(x) !== "void"); }
  function advCountFor(l, day){ return advActive(l).filter(x => Number(x.day) === Number(day)).length; }
  function advCountItem(l, itemId){ return advActive(l).filter(x => (x.item || (advDoor(x.day) || {}).itemId) === itemId).length; }
  /* ---- salon: stock of products that have a "stock" in data.js (the masks) ----
     Kept on Sandra's phone. left = stock + refilled − used by hand (e.g. in the
     promo treatments) − advent vouchers that are booked or redeemed.
     Out of stock: no refusal, but a pop-up with masks that ARE still there
     (+ a QR so the client's voucher shows the new mask), an e-mail to
     herself (mail app, and via Make if installed on this phone). */
  const STOCK_KEY = "bc_stock_v1", STOCK_HOOK_KEY = "bc_stock_hook_v1";
  const stockMem = { adj:{}, log:[], alerted:{} };
  function stockData(){
    if (advPreview) return stockMem;
    try { const x = JSON.parse(localStorage.getItem(STOCK_KEY) || "null"); if (x && x.adj) return Object.assign({ log:[], alerted:{} }, x); } catch(e){ /* ignore */ }
    return { adj:{}, log:[], alerted:{} };
  }
  function stockSave(x){ if (advPreview) return true; try { localStorage.setItem(STOCK_KEY, JSON.stringify(x)); return true; } catch(e){ return false; } }
  function stockItems(){ return typeof ADVENT === "object" && ADVENT.items ? Object.entries(ADVENT.items).filter(([, it]) => typeof it.stock === "number") : []; }
  function stockTotal(id, x){ const it = ADVENT.items[id]; const a = ((x || stockData()).adj[id]) || {}; return it.stock + (a.added || 0); }
  function stockLeft(id, l, x){
    const it = ADVENT.items && ADVENT.items[id];
    if (!it || typeof it.stock !== "number") return null;
    x = x || stockData(); l = l || advLedger();
    const a = x.adj[id] || {};
    return stockTotal(id, x) - (a.used || 0) - advCountItem(l, id);
  }
  function stockName(id){
    const it = ADVENT.items[id]; if (!it) return id;
    const n = advDoorText(it, state.lang).replace(/^(Gratis|Free)\s+/i, "").replace(/\s+offerte?s?(?=\s*\(|$)/i, "");
    return n.charAt(0).toUpperCase() + n.slice(1);
  }
  function stockAlternatives(id){
    const it = ADVENT.items[id]; if (!it) return [];
    const l = advLedger(), x = stockData(), w = (it.with || {}).nl;
    return stockItems().filter(([aid, a]) => aid !== id && a.type === it.type && !a.soldOut && (a.with || {}).nl === w && stockLeft(aid, l, x) > 0).map(([aid]) => aid);
  }
  function stockHook(){ try { const u = localStorage.getItem(STOCK_HOOK_KEY); return u && /^[a-z0-9]{20,40}$/.test(u) ? u : null; } catch(e){ return null; } }
  // e-mail via Make (only if this phone holds the webhook; nothing secret is in the code)
  function stockWebhook(id, reason, test){
    const u = stockHook(); if (!u) return false;
    const alts = stockAlternatives(id).map(a => `${stockName(a)} (${stockLeft(a)})`).join(", ") || "—";
    const it = ADVENT.items[id] || {};
    const body = new URLSearchParams({ item: it.product || stockName(id), status: test ? "TEST" : (stockLeft(id) <= 0 ? "op" : "bijna op"),
      left: String(stockLeft(id)), total: String(stockTotal(id)), reason: reason || "", alternatives: alts,
      date: new Date().toLocaleString("nl-BE") });
    try { fetch("https://hook.eu1.make.com/" + u, { method:"POST", mode:"no-cors", body }).catch(() => {}); } catch(e){ return false; }
    return true;
  }
  function stockMailto(id){
    const it = ADVENT.items[id] || {}, name = it.product || stockName(id);
    const alts = stockAlternatives(id).map(stockName).join(", ") || "een gelijkwaardig masker";
    const subj = `Voorraad: ${name} is op`;
    const body = `Hoi Sandra,\n\n${name} is op (${new Date().toLocaleDateString("nl-BE")}).\nNog in voorraad: ${alts}.\n\nTe doen: soldOut: true in data.js (of vraag het aan Claude), bijbestellen, en je klanten verwittigen.\n\n----- VOORBEELD NIEUWSBRIEF -----\nOnderwerp: Adventskalender: ${name} is de deur uit 🎄\n\nLieve klant,\n\nWat gaat het snel! Het ${name} uit onze adventskalender is helemaal op — bedankt aan iedereen die al kwam genieten.\n\nHeb jij een bon voor dit masker die je nog niet hebt ingeruild? Geen zorgen: je krijgt in het salon een gelijkwaardig masker in de plaats (${alts}). Je bon blijft gewoon geldig tot de datum die erop staat.\n\nNog geen afspraak? Boek via WhatsApp of bel +32 499 22 19 01 en vermeld je code.\n\nTot snel in het salon,\nSandra\nBeauty & Coffee — Barbarastraat 25, 2800 Mechelen`;
    return `mailto:?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  }
  // after every change: warn at the last one, alert (once) when it runs out
  function stockAfterChange(id, reason){
    const left = stockLeft(id); if (left == null) return "";
    const x = stockData(), L = state.lang;
    if (left > 0){
      if (x.alerted[id]){ delete x.alerted[id]; stockSave(x); }
      return left === 1 ? `<p class="stock-warn">⚠️ ${t("stock_last_one", L).replace("{item}", esc(stockName(id)))}</p>` : "";
    }
    let sent = false;
    if (!x.alerted[id]){ x.alerted[id] = new Date().toISOString(); stockSave(x); if (!advPreview) sent = stockWebhook(id, reason); }
    return stockAlertHtml(id, sent);
  }
  function stockAlertHtml(id, sent){
    const L = state.lang, alts = stockAlternatives(id).map(a => `${esc(stockName(a))} (${stockLeft(a)})`).join(", ");
    return `<div class="stock-alert"><p>📦 <b>${t("stock_out_title", L).replace("{item}", esc(stockName(id)))}</b></p>
      <p>${alts ? t("stock_out_alts", L).replace("{alts}", alts) : t("stock_out_noalts", L)}</p>
      <p class="stock-alert__todo">${t("stock_out_todo", L)}</p>
      ${sent ? `<p class="stock-alert__sent">✉️ ${t("stock_mail_sent", L)}</p>` : ""}
      <a class="btn btn--primary btn--sm" href="${stockMailto(id)}">📧 ${t("stock_mail_btn", L)}</a></div>`;
  }
  function stockAdjust(id, delta, reason){
    const x = stockData();
    const a = x.adj[id] = x.adj[id] || { used:0, added:0 };
    if (delta < 0) a.used = (a.used || 0) + 1; else a.added = (a.added || 0) + 1;
    x.log = (x.log || []).concat([{ at:new Date().toISOString(), id, d:delta, r:reason || "" }]).slice(-60);
    stockSave(x);
    const html = stockAfterChange(id, reason);
    renderSalonStock();
    if (navigator.vibrate) navigator.vibrate(40);
    if (html) showStockPopup(html); else showToast(t("stock_saved", state.lang).replace("{item}", stockName(id)).replace("{n}", stockLeft(id)));
  }
  function showStockPopup(html){
    const old = $("#stockPopup"); if (old) old.remove();
    const ov = document.createElement("div");
    ov.className = "stamp-overlay adv-result-overlay"; ov.id = "stockPopup";
    ov.setAttribute("role", "alertdialog"); ov.setAttribute("aria-modal", "true");
    ov.innerHTML = `<div class="stamp-overlay__panel adv-result adv-result--bad">${html}
      <div class="adv-result__btns"><button type="button" class="btn btn--ghost" data-stockpop="close">${t("stamp_close", state.lang)}</button></div></div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => { if (e.target === ov || e.target.closest("[data-stockpop]")) ov.remove(); });
  }
  function renderSalonStock(){
    const box = $("#salonStock");
    if (!box) return;
    const L = state.lang, l = advLedger(), x = stockData();
    const rows = stockItems().map(([id]) => {
      const left = stockLeft(id, l, x), tot = stockTotal(id, x), adv = advCountItem(l, id), used = ((x.adj[id] || {}).used) || 0;
      return `<div class="salon-stock__row${left <= 0 ? " is-out" : left === 1 ? " is-low" : ""}">
          <div class="salon-stock__name"><b>${esc(stockName(id))}</b><small>${t("stock_row_detail", L).replace("{adv}", adv).replace("{used}", used).replace("{tot}", tot)}</small></div>
          <div class="salon-stock__left" aria-label="${t("stock_left_aria", L)}">${left}<small>/${tot}</small></div>
          <div class="salon-stock__btns">
            <button type="button" class="btn btn--primary btn--sm" data-salon-stock="use" data-item="${id}"${left <= 0 ? " disabled" : ""}>− ${t("stock_btn_use", L)}</button>
            <button type="button" class="btn btn--outline btn--sm" data-salon-stock="add" data-item="${id}">＋ ${t("stock_btn_add", L)}</button>
          </div></div>`;
    }).join("");
    const log = (x.log || []).slice(-8).reverse().map(e => `<li>${advFmtStamp(e.at)} · ${e.d < 0 ? "−1" : "+1"} ${esc(stockName(e.id))}</li>`).join("");
    const hook = stockHook();
    box.innerHTML = `${advPreview ? `<p class="advent-test">🧪 ${t("stock_test_note", L)}</p>` : ""}
      <p class="salon-stock__intro">${t("stock_intro", L)}</p>
      ${rows}
      ${log ? `<details class="salon-adv__stats"><summary>${t("stock_log_title", L)}</summary><ul class="salon-stock__log">${log}</ul></details>` : ""}
      <details class="salon-adv__stats"><summary>✉️ ${t("stock_hook_title", L)}</summary>
        <p class="salon-stock__intro">${hook ? t("stock_hook_on", L) : t("stock_hook_off", L)}</p>
        ${hook ? `<button type="button" class="btn btn--outline btn--sm" data-salon-stock="hooktest">${t("stock_hook_test", L)}</button>
          <button type="button" class="btn btn--text btn--sm" data-salon-stock="hookdel">${t("stock_hook_del", L)}</button>` : ""}
      </details>`;
  }
  // #voorraadalarm=<Make webhook id>: keep it on this phone only
  function installStockHook(id){
    if (!/^[a-z0-9]{20,40}$/.test(id)) return false;
    try { localStorage.setItem(STOCK_HOOK_KEY, id); return true; } catch(e){ return false; }
  }
  // replacement voucher: signed with the salon key, scanned by the client
  async function advReplCode(code, itemId){
    const c = String(code).replace(/-/g, "");
    const sig = await crypto.subtle.sign(ECDSA_SIGN, await getSalonPrivKey(), new TextEncoder().encode("BC-REPL|" + c + "|" + itemId));
    return "BCR1:" + c + "." + itemId + "." + b64u(sig);
  }
  async function advAcceptReplacement(raw){
    const L = state.lang;
    const m = String(raw || "").trim().match(/^BCR1:([AT])(\d{2})([A-HJ-NP-Z2-9]{5})([A-HJ-NP-Z2-9]{4})\.([A-Za-z0-9]{2,30})\.([A-Za-z0-9_-]{80,90})$/);
    closeStampScanner();
    if (!m){ showToast(t("stamp_invalid", L)); return; }
    const c = m[1] + m[2] + m[3] + m[4], itemId = m[5], day = Number(m[2]);
    let ok = false;
    try { ok = await crypto.subtle.verify(ECDSA_SIGN, await getSalonPubKey(), unb64u(m[6]), new TextEncoder().encode("BC-REPL|" + c + "|" + itemId)); } catch(e){ ok = false; }
    const st = advStore(), rec = st.opened[day];
    if (!ok || !ADVENT.items[itemId]){ showToast(t("stamp_invalid", L)); return; }
    if (!rec || String(rec.code).replace(/-/g, "") !== c){ showToast(t("adv_repl_not_yours", L)); return; }
    st.repl = st.repl || {}; st.repl[day] = itemId;
    if (!advPreview) saveLocalData();
    if (navigator.vibrate) navigator.vibrate(60);
    renderAdvent();
    showToast(t("adv_repl_ok", L).replace("{item}", advDoorText(ADVENT.items[itemId], L)));
  }

  function advFmtStamp(iso){
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
  }

  function renderSalonAdvent(){
    const box = $("#salonAdvent");
    if (!box || !advHasConfig()) return;
    const l = advLedger();
    const all = Object.entries(l.codes);
    const nUsed = all.filter(([, x]) => advStatus(x) === "used").length;
    const booked = all.filter(([, x]) => advStatus(x) === "booked").sort((a, b) => (a[1].appt || "") < (b[1].appt || "") ? -1 : 1);
    const rows = ADVENT.doors.map(d0 => advDoor(d0.day)).filter(Boolean).map(door => {
      const n = advCountFor(l, door.day);
      const stock = door.stock == null ? "∞" : door.stock;
      const full = door.stock != null && n >= door.stock;
      return `<tr class="${full ? "is-full" : ""}${n ? "" : " is-zero"}"><td>${door.day}</td><td>${door.type === "discount" ? "🎟️" : door.icon} ${advDoorText(door, state.lang)}${door.itemStock != null ? ` <small>(${t("stock_left_short", state.lang).replace("{n}", stockLeft(door.itemId, l))})</small>` : ""}${door.soldOut ? " — ❌" : ""}</td><td>${n} / ${stock}</td></tr>`;
    }).join("");
    const bookedHtml = booked.length ? `<div class="salon-adv__booked"><p>📅 ${t("salon_adv_booked_title", state.lang)}</p>
      ${booked.map(([code, x]) => { const door = advDoor(x.day); return `<button type="button" class="salon-adv__bk" data-salon-adv="open" data-code="${code}">
        <b>${x.appt ? advFmt(x.appt) : "?"}</b> · ${door ? advDoorText(door, state.lang) : ""} <small>${code}</small></button>`; }).join("")}</div>` : "";
    box.innerHTML = `
      ${advPreview ? `${advPreviewBar("salon")}<p class="advent-test">🧪 ${t("adv_test_salon", state.lang)}</p>` : ""}
      <button type="button" class="btn btn--primary btn--wide" data-salon-adv="scan">📷 ${t("salon_adv_scan_btn", state.lang)}</button>
      <p class="salon-adv__total">${t("salon_adv_total2", state.lang).replace("{u}", nUsed).replace("{b}", booked.length)}</p>
      ${bookedHtml}
      <details class="salon-adv__stats"><summary>${t("salon_adv_stats_title", state.lang)}</summary>
        <table><tbody>${rows}</tbody></table>
        <button type="button" class="btn btn--text" data-salon-adv="reset">${t("salon_adv_reset_btn", state.lang)}</button>
      </details>`;
  }

  // checks that do not depend on the ledger entry of this code
  function advRefuseNew(p, door, l){
    const L = state.lang, today = advTodayKey();
    if (advDoorDate(p.day) > today) return t("adv_res_future", L).replace("{n}", p.day);
    const bookBy = door.homemade ? advUseBy(p.day) : advBookBy(p.day);
    if (today > bookBy) return t(door.homemade ? "adv_res_expired" : "adv_res_late", L).replace("{d}", advFmt(bookBy));
    // out of stock / soldOut: no refusal — advHandleCode offers a replacement
    if (door.stock != null && advCountFor(l, p.day) >= door.stock) return t("adv_res_soldout", L).replace("{y}", door.stock);
    const max = door.type === "discount" ? ADVENT.maxDiscountsPerClient : door.type === "extra" ? ADVENT.maxExtrasPerClient : ADVENT.maxGiftsPerClient;
    if (max){
      const prev = advActive(l).filter(x => x.dev === p.dev && x.type === door.type).sort((a, b) => a.at < b.at ? -1 : 1);
      if (prev.length >= max){
        const last = prev[prev.length - 1];
        return t(door.type === "gift" ? "adv_res_client_gift" : "adv_res_client_discount", L).replace("{n}", last.day).replace("{d}", advFmtStamp(last.at));
      }
    }
    return null;
  }
  function advCondNote(door){
    const L = state.lang;
    return door.type === "gift" ? advFill(t("adv_res_gift_note", L), door)
      : advFill(t(door.type === "extra" ? "adv_res_extra_note" : "adv_res_discount_note", L), door);
  }

  async function submitAdventCode(raw, source){
    const p = await advParseCode(raw);
    if (!p){
      // not an advent code at all (e.g. a stamp QR): say so, keep scanning
      if (source === "manual" || Date.now() - stampScan.lastInvalidAt > 2500){
        stampScan.lastInvalidAt = Date.now();
        setStampStatus("adv_res_invalid", true);
      }
      return;
    }
    closeStampScanner();
    advHandleCode(p);
  }
  function advHandleCode(p){
    const L = state.lang;
    if (!p.valid) return showAdventResult("bad", t("adv_res_invalid", L), p.code);
    if (p.prefix === "T" && !advPreview) return showAdventResult("bad", t("adv_res_test", L), p.code);
    if (p.prefix === "A" && advPreview) return showAdventResult("bad", t("adv_res_real_in_test", L), p.code);
    if (!advDoor(p.day)) return showAdventResult("bad", t("adv_res_invalid", L), p.code);
    const today = advTodayKey(), useBy = advUseBy(p.day);
    const l = advLedger();
    const x = l.codes[p.code];
    const door = advDoor(p.day, p.replaceWith || (x && x.item));
    if (x && advStatus(x) === "used") return showAdventResult("bad", t("adv_res_used", L).replace("{d}", advFmtStamp(x.usedAt || x.at)), p.code, door);
    if (x && advStatus(x) === "void") return showAdventResult("bad", t("adv_res_void", L).replace("{d}", advFmtStamp(x.voidAt || x.at)), p.code, door);
    if (x && advStatus(x) === "booked"){
      const info = `<p class="adv-result__extra">📅 ${t("adv_res_booked_for", L).replace("{d}", x.appt ? advFmt(x.appt) : "?")}<br>${advCondNote(door)}</p>`;
      if (today > useBy){
        return showAdventResult("bad", t("adv_res_expired", L).replace("{d}", advFmt(useBy)), p.code, door, info, [["void", "❌ " + t("adv_btn_void", L)]], p);
      }
      return showAdventResult("info", t("adv_res_booked", L), p.code, door, info,
        [["redeem", "✅ " + t("adv_btn_redeem", L)], ["void", "❌ " + t("adv_btn_void", L)]], p);
    }
    const refuse = advRefuseNew(p, door, l);
    if (refuse) return showAdventResult("bad", refuse, p.code, door);
    if (!p.force && door.itemStock != null && (door.soldOut || stockLeft(door.itemId, l) <= 0)) return advOfferReplacement(p, door);
    const maxAppt = useBy < today ? today : useBy;
    const reserve = `<label class="adv-result__date">${t("adv_appt_date", L)}
        <input type="date" id="advApptDate" min="${today}" max="${maxAppt}"></label>`;
    const info = `<p class="adv-result__extra">${advCondNote(door)}<br>${t(door.homemade ? "adv_res_rule_homemade" : "adv_res_rule_book", L)
      .replace("{book}", advFmt(advBookBy(p.day))).replace("{until}", advFmt(useBy))}</p>${reserve}`;
    showAdventResult("ok", t("adv_res_valid_choose", L), p.code, door, info,
      [["redeem", "✅ " + t("adv_btn_redeem_now", L)], ["book", "📅 " + t("adv_btn_book", L)]], p);
  }
  // the mask behind this voucher is gone: pick one that is still in stock
  function advOfferReplacement(p, door){
    const L = state.lang, alts = stockAlternatives(door.itemId);
    const acts = alts.map(a => ["repl:" + a, `🔄 ${stockName(a)} (${t("stock_left_short", L).replace("{n}", stockLeft(a))})`]);
    if (!alts.length) acts.push(["force", t("stock_btn_force", L)]);
    const info = `<p class="adv-result__extra">${alts.length ? t("stock_res_choose", L) : t("stock_out_noalts", L)}</p>`;
    return showAdventResult("bad", t("stock_res_out", L).replace("{item}", esc(stockName(door.itemId))), p.code, door, info, acts, p);
  }
  // write to the ledger after Sandra chose an action
  function advAction(action, p){
    const L = state.lang, l = advLedger();
    const door = advDoor(p.day, p.replaceWith || (l.codes[p.code] && l.codes[p.code].item));
    // in the preview the "now" follows the simulated day
    const now = advPreview ? new Date(`${advTodayKey()}T${new Date().toTimeString().slice(0, 8)}`).toISOString() : new Date().toISOString();
    const x = l.codes[p.code];
    const fresh = !x;
    if (fresh){
      const refuse = advRefuseNew(p, door, l);            // re-check (e.g. two phones scanning at once)
      if (refuse) return showAdventResult("bad", refuse, p.code, door);
    }
    const base = x || { day:p.day, dev:p.dev, type:door.type, item:door.itemId, at:now };
    if (p.replaceWith && door.replacedFrom){ base.item = door.itemId; base.replacedFrom = door.replacedFrom; }
    if (action === "book"){
      const inp = $("#advApptDate"); const appt = inp ? inp.value : "";
      const max = advUseBy(p.day);
      if (!appt){ showToast(t("adv_appt_need", L)); if (inp) inp.focus(); return false; }
      if (appt > max){ showToast(t("adv_appt_too_late", L).replace("{d}", advFmt(max))); return false; }
      l.codes[p.code] = Object.assign(base, { status:"booked", appt });
    } else if (action === "redeem"){
      l.codes[p.code] = Object.assign(base, { status:"used", usedAt:now });
    } else if (action === "void"){
      if (!confirm(t("adv_void_confirm", L))) return false;
      l.codes[p.code] = Object.assign(base, { status:"void", voidAt:now });
    }
    if (!advSaveLedger(l)) return showAdventResult("bad", t("adv_res_storage", L), p.code, door);
    if (navigator.vibrate) navigator.vibrate(80);
    renderSalonAdvent();
    if (action === "void"){ if (door.itemStock != null) stockAfterChange(door.itemId, "void"); return showAdventResult("bad", t("adv_res_voided", L), p.code, door); }
    const stockHtml = door.itemStock != null ? stockAfterChange(door.itemId, "advent " + action + " " + p.code) : "";
    const replHtml = p.replaceWith && door.replacedFrom ? `<div class="adv-repl"><p>🔄 ${t("adv_repl_show", L)}</p><canvas id="advReplQr" class="adv-repl__qr" width="420" height="420"></canvas></div>` : "";
    if (replHtml) setTimeout(async () => { try { await loadFirstScript(["assets/lib/qr-encoder.js"], () => !!window.BCQRCode); drawQrToCanvas($("#advReplQr"), await advReplCode(p.code, door.itemId)); } catch(e){ /* no key */ } }, 50);
    if (action === "book"){
      trackEvent("advent-booked");
      return showAdventResult("ok", t("adv_res_booked_ok", L).replace("{d}", advFmt(l.codes[p.code].appt)), p.code, door,
        `<p class="adv-result__extra">${t("adv_res_booked_hint", L)}</p>${replHtml}${stockHtml}`);
    }
    trackEvent("advent-redeemed");
    const n = advCountFor(l, p.day), ni = door.itemId ? advCountItem(l, door.itemId) : 0;
    const count = door.itemStock != null ? t("stock_left_short", L).replace("{n}", stockLeft(door.itemId, l))
      : door.stock != null ? t("adv_res_count_of", L).replace("{x}", n).replace("{y}", door.stock) : t("adv_res_count", L).replace("{x}", n);
    const title = door.type === "discount" ? "adv_res_ok_discount" : door.type === "extra" ? "adv_res_ok_extra" : "adv_res_ok_gift";
    return showAdventResult("ok", t(title, L), p.code, door, `<p class="adv-result__count">${count}</p><p class="adv-result__extra">${advCondNote(door)}</p>${replHtml}${stockHtml}`);
  }

  // mood: "ok" (green), "info" (blue, a reserved voucher), "bad" (red)
  function showAdventResult(mood, message, code, door, extraHtml, actions, p){
    const old = $("#advResultOverlay"); if (old) old.remove();
    const ov = document.createElement("div");
    ov.className = "stamp-overlay adv-result-overlay"; ov.id = "advResultOverlay";
    ov.setAttribute("role", "alertdialog"); ov.setAttribute("aria-modal", "true");
    const mark = mood === "ok" ? "✅" : mood === "info" ? "📅" : "❌";
    const btns = actions && actions.length
      ? actions.map(([a, label]) => `<button type="button" class="btn ${a === "void" || a === "force" ? "btn--ghost adv-result__void" : "btn--primary"}" data-advres="${a}">${label}</button>`).join("")
        + `<button type="button" class="btn btn--ghost" data-advres="close">${t("stamp_close", state.lang)}</button>`
      : `<button type="button" class="btn btn--primary" data-advres="next">📷 ${t("adv_res_next", state.lang)}</button>
         <button type="button" class="btn btn--ghost" data-advres="close">${t("stamp_close", state.lang)}</button>`;
    ov.innerHTML = `
      <div class="stamp-overlay__panel adv-result adv-result--${mood}">
        <p class="adv-result__mark" aria-hidden="true">${mark}</p>
        <p class="adv-result__msg">${message}</p>
        ${door ? `${door.photo ? `<img class="adv-result__photo" src="${door.photo}" data-fallback="adv" data-emoji="${door.type === "discount" ? (door.value || "%") : door.icon}" alt="">` : ""}<p class="adv-result__gift">${door.photo ? "" : (door.type === "discount" ? "🎟️ " : door.icon + " ")}${advDoorText(door, state.lang)}</p>
          <p class="adv-result__door">${t("adv_door_label", state.lang).replace("{n}", door.day)} · ${advFmt(advDoorDate(door.day))}</p>` : ""}
        ${extraHtml || ""}
        <p class="adv-result__code">${code || ""}</p>
        <div class="adv-result__btns">${btns}</div>
      </div>`;
    document.body.appendChild(ov);
    ov.addEventListener("click", e => {
      const a = e.target.closest("[data-advres]");
      if (!a) return;
      const act = a.dataset.advres;
      if (act === "close"){ ov.remove(); return; }
      if (act === "next"){ ov.remove(); openStampScanner("advent"); return; }
      if (p && act.startsWith("repl:")){ ov.remove(); advHandleCode(Object.assign({}, p, { replaceWith: act.slice(5) })); return; }
      if (p && act === "force"){ ov.remove(); advHandleCode(Object.assign({}, p, { force:true })); return; }
      if (p && (act === "redeem" || act === "book" || act === "void")) advAction(act, p);
    });
  }
  async function advOpenFromList(code){
    const p = await advParseCode(code);
    if (p) advHandleCode(p);
  }

  function resetAdventLedger(){
    if (!confirm(t("salon_adv_reset_confirm", state.lang))) return;
    if (advPreview) advMemLedger.codes = {};
    else { try { localStorage.removeItem(ADV_LEDGER_KEY); } catch(e){ /* ignore */ } }
    renderSalonAdvent();
    showToast(t("salon_adv_reset_done", state.lang));
  }

  /* ---------------- seasonal looks (see seasons.js) ----------------
     Picks today's holiday look (or else the season) and decorates the
     app: a welcome card with a greeting + fun fact + soap-shop link,
     little figures in the corners and a gentle falling effect. */
  const season = { theme:null, factIndex:0 };
  function seasonParam(name){ try { return new URLSearchParams(location.search).get(name); } catch(e){ return null; } }
  function seasonTodayKey(){
    const d = seasonParam("themadag");
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    return advPreview && advTest ? advTest : todayKey();     // advent preview: the look follows the chosen day
  }
  function seasonDays(a, b){                       // b - a in days (keys "YYYY-MM-DD")
    const p = k => { const [y, m, d] = k.split("-").map(Number); return Date.UTC(y, m - 1, d); };
    return Math.round((p(b) - p(a)) / 86400000);
  }
  function seasonFor(key){
    if (typeof SEASON_THEMES === "undefined") return null;
    const forced = seasonParam("thema");
    if (forced){ const f = SEASON_THEMES.find(x => x.id === forced); if (f) return { theme:f, year:Number(key.slice(0, 4)) }; }
    const y = Number(key.slice(0, 4));
    let best = null;
    SEASON_THEMES.filter(x => !x.season).forEach(th => {
      [y - 1, y, y + 1].forEach(yy => {
        const md = typeof th.date === "function" ? th.date(yy) : th.date;
        if (!md) return;
        const diff = seasonDays(key, `${yy}-${md}`);                     // > 0: still to come
        if (diff > (th.from || 0) || -diff > (th.to || 0)) return;
        const score = Math.abs(diff) + (diff >= 0 ? 0 : 0.5);              // a tie goes to the upcoming one
        if (!best || score < best.score) best = { theme:th, year:yy, score };
      });
    });
    if (best) return best;
    const md = key.slice(5);
    const id = md >= "12-21" || md < "03-20" ? "winter" : md < "06-21" ? "lente" : md < "09-22" ? "zomer" : "herfst";
    return { theme:SEASON_THEMES.find(x => x.id === id), year:y };
  }
  function seasonText(obj, year){
    const L = state.lang;
    let s = (obj && (obj[L] || obj.nl)) || "";
    if (s.includes("{animal}")){
      const list = CHINESE_ZODIAC[L] || CHINESE_ZODIAC.nl;
      s = s.replace(/\{animal\}/g, list[((year - 2020) % 12 + 12) % 12]);
    }
    return s;
  }
  function applySeason(){
    if (typeof SEASONS_ON === "undefined" || !SEASONS_ON) return;
    const pick = seasonFor(seasonTodayKey());
    if (!pick || !pick.theme) return;
    const changed = !season.theme || season.theme.id !== pick.theme.id;
    season.theme = pick.theme; season.year = pick.year;
    document.body.dataset.theme = pick.theme.id;
    if (changed){ season.factIndex = Math.floor(Math.random() * 3); buildSeasonDeco(); }
    renderSeasonCard();
  }
  function renderSeasonCard(){
    const card = $("#seasonCard");
    if (!card || !season.theme) return;
    const th = season.theme, L = state.lang;
    const facts = (th.facts && (th.facts[L] || th.facts.nl)) || [];
    const fact = facts.length ? seasonText({ [L]:facts[season.factIndex % facts.length] }, season.year) : "";
    const promo = seasonText(th.promo || SEASON_DEFAULT_PROMO, season.year);
    const icons = (th.deco || []).map(d => d.e).slice(0, 1).join(" ");
    card.className = "season-card season-card--" + th.id;
    card.innerHTML = `
      <p class="season-card__hello"><span aria-hidden="true">${icons}</span> ${seasonText(th.hello, season.year)}</p>
      ${seasonDateHtml(th, season.year)}
      ${fact ? `<p class="season-card__fact"><b>${t("season_did_you_know", L)}</b> ${fact}</p>` : ""}
      ${closedNoticeHtml()}
      <div class="season-card__btns">
        ${facts.length > 1 ? `<button type="button" class="btn btn--text btn--sm" data-action="season-fact">${t("season_next_fact", L)} ›</button>` : ""}
        <p class="season-card__shop">${promo}</p>
      </div>`;
    card.hidden = false;
  }
  // the exact date of the holiday (moves every year for e.g. Easter or Chinese New Year)
  function seasonDateHtml(th, year){
    if (!th || th.season || !th.date) return "";
    const md = typeof th.date === "function" ? th.date(year) : th.date;
    if (!md) return "";
    const L = state.lang;
    let txt = actionFmt(`${year}-${md}`, L, true);
    if (th.id === "pasen"){          // + Easter Monday
      const [m, d] = md.split("-").map(Number), mon = new Date(Date.UTC(year, m - 1, d + 1));
      txt += ` ${t("season_and", L)} ${actionFmt(`${year}-${String(mon.getUTCMonth()+1).padStart(2,"0")}-${String(mon.getUTCDate()).padStart(2,"0")}`, L, false)}`;
    }
    return `<p class="season-card__date">${txt}</p>`;
  }
  function nextSeasonFact(){ season.factIndex++; renderSeasonCard(); trackEvent("season-fact"); }
  function buildSeasonDeco(){
    let layer = $("#seasonDeco");
    if (!layer){ layer = document.createElement("div"); layer.id = "seasonDeco"; layer.className = "season-deco"; layer.setAttribute("aria-hidden", "true"); document.body.appendChild(layer); }
    let fig = $("#seasonFigures");
    if (!fig){ fig = document.createElement("div"); fig.id = "seasonFigures"; fig.className = "season-figures"; fig.setAttribute("aria-hidden", "true"); document.body.appendChild(fig); }
    const th = season.theme;
    const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // falling / rising effect
    let fx = "";
    const items = th.fxItems || [];
    if (!calm && items.length && th.fx !== "flags"){
      const n = window.innerWidth < 600 ? 10 : 16;
      const dir = ["lanterns", "hearts", "waves"].includes(th.fx) ? "rise" : (th.fx === "bats" ? "flutter" : "fall");
      for (let i = 0; i < n; i++){
        const e = items[i % items.length];
        const left = Math.round(Math.random() * 96), size = 12 + Math.round(Math.random() * 12);
        const dur = 10 + Math.random() * 10, delay = -Math.random() * dur;
        fx += `<span class="season-p season-p--${dir}" style="left:${left}%;font-size:${size}px;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s">${e}</span>`;
      }
    }
    if (th.fx === "flags") fx += `<div class="season-bunting">${"<i></i><i></i><i></i>".repeat(8)}</div>`;
    layer.innerHTML = fx;
    fig.innerHTML = (th.deco || []).map(d => d.at === "spider"
      ? `<span class="season-fig season-fig--spider"><i class="season-fig__thread"></i>${d.e}</span>`
      : `<span class="season-fig season-fig--${d.at}">${d.e}</span>`).join("");
    fig.classList.toggle("is-calm", !!calm);
  }

  function resetLocalData(){
    if (!confirm(t("reset_confirm_text", state.lang))) return;
    wipeLocalData();
    localData.savedAvoid = []; state.avoid = [];
    saveLocalData();
    renderReturningUserBlock();
    renderMatchTools();
    renderLoyaltyBlock();
    showToast(t("reset_done_toast", state.lang));
  }

  /* ---------------- calendar reminder (.ics download) ----------------
     No backend means no reliable push notifications on every device —
     a downloaded .ics file is the one reminder mechanism that genuinely
     works everywhere, because the phone's own calendar app takes over
     from there and handles the actual notification. */
  // how many weeks until a next moment, per kind of treatment (AVOID_GROUPS in data.js)
  const REMINDER_WEEKS = { feet:[4,5,6], hands:[3,4,6], face:[4,6,8], browlash:[6,7,8], massage:[2,4,6], waxing:[4,5,6], makeup:[4,8,12], workshop:[4,8,12] };
  function reminderCat(treatId){
    if (!treatId || typeof AVOID_GROUPS === "undefined") return null;
    for (const g in AVOID_GROUPS) if ((AVOID_GROUPS[g] || []).includes(treatId)) return g;
    return null;
  }
  function reminderChipsHtml(cat, title){
    const L = state.lang, weeks = REMINDER_WEEKS[cat] || [4, 6, 8];
    return `<div class="reminder-pick">
        <p class="reminder-pick__q">${t("reminder_q", L)}</p>
        <div class="reminder-pick__chips">${weeks.map(w => `<button type="button" class="chip" data-action="reminder-weeks" data-weeks="${w}" data-title="${esc(title || "")}">${t("reminder_in_weeks", L).replace("{n}", w)}</button>`).join("")}</div>
      </div>`;
  }
  // result screen: the button now opens three calm choices (no grey browser box)
  function addCalendarReminder(){
    const btn = $('[data-action="add-reminder"]');
    let box = $("#reminderPick");
    if (!box && btn){ box = document.createElement("div"); box.id = "reminderPick"; btn.insertAdjacentElement("afterend", box); }
    if (!box) return;
    if (!box.hidden && box.innerHTML){ box.hidden = true; return; }
    const m = state.match, tr = m && !m.isKid && m.treatment;
    const title = tr && tr.name ? trName(tr.name, state.lang) : "";
    box.innerHTML = reminderChipsHtml(reminderCat(tr && tr.id), title);
    box.hidden = false;
  }
  function downloadReminder(weeks, titleTxt){
    weeks = parseInt(weeks, 10);
    if (!weeks || weeks <= 0) return;
    const start = new Date();
    start.setDate(start.getDate() + weeks * 7);
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const icsEsc = v => String(v || "").replace(/\\/g, "\\\\").replace(/[,;]/g, m => "\\" + m).replace(/\n/g, "\\n");
    const title = titleTxt ? `${t("reminder_ics_title", state.lang)} — ${titleTxt}` : t("reminder_ics_title", state.lang);
    // UID, DTSTAMP and PRODID are required by the calendar standard (RFC 5545);
    // without them some calendar apps (e.g. Outlook, older iPhones) refuse the file.
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Beauty & Coffee//Match app//NL",
      "BEGIN:VEVENT",
      `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@beauty-coffee`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${icsEsc(title)}`,
      `DESCRIPTION:${icsEsc(t("reminder_ics_desc", state.lang))}`,
      "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${icsEsc(title)}`, "TRIGGER:-PT0M", "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "beauty-coffee-herinnering.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);   // revoking at once can break the download on some phones
    trackEvent("reminder-" + weeks + "w");
    showToast(t("reminder_saved_toast", state.lang));
    const box = $("#reminderPick"); if (box) box.hidden = true;
  }

  /* ---------------- AI assistants (WebMCP, since v93) ----------------
     Browsers with built-in AI agents (Chrome with Gemini, and others that
     support the WebMCP proposal) can call these tools instead of guessing
     where to tap. Nothing is sent by the app itself: booking messages are
     returned as links the person opens and sends. Feature-detected: on
     browsers without WebMCP nothing happens. Plain info for every
     assistant: llms.txt and ai.html (built by tools/aiinfo.js). */
  function setupAgentTools(){
    const mc = (typeof document !== "undefined" && document.modelContext) || (typeof navigator !== "undefined" && navigator.modelContext);
    if (!mc || typeof mc.registerTool !== "function") return;
    const L = () => state.lang;
    const txt = text => ({ content:[{ type:"text", text }] });
    const strip = h => String(h || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    const slots = () => BOOKING_SLOTS.map(b => b[L()] || b.nl).join(", ");
    const tools = [
      { name:"beauty_coffee_info",
        description:"Contact details, address, opening moments (weekends, by appointment only) and how to book at Beauty & Coffee, a beauty salon in Mechelen (Belgium). Booking is never automatic: Sandra confirms every appointment herself.",
        inputSchema:{ type:"object", properties:{} },
        async execute(){ return txt([
          "Beauty & Coffee · Barbarastraat 25, 2800 Mechelen, Belgium",
          "Phone / WhatsApp: +32 499 22 19 01 · Email: " + BOOKING_EMAIL,
          "By appointment only. Possible moments: " + slots() + ".",
          "To book: use the tool beauty_coffee_prepare_booking and let the person send the message. Sandra confirms personally.",
          "Full info (prices, rules): " + SITE_URL.replace(/index\.html$/, "") + "llms.txt"].join("\n")); } },
      { name:"beauty_coffee_price_list",
        description:"The full price list (treatments, duration, price in euro; final prices, VAT-exempt). Optional: a category such as facial, massage, manicure, pedicure, waxing, brows, lashes, makeup, workshops.",
        inputSchema:{ type:"object", properties:{ category:{ type:"string", description:"Optional category id or word" } } },
        async execute(args){
          const q = String(args && args.category || "").toLowerCase(), lang = L();
          const secs = PRICE_LIST.filter(sec => !q || sec.id.includes(q) || strip(sec.title[lang]).toLowerCase().includes(q) || strip(sec.title.nl).toLowerCase().includes(q));
          return txt((secs.length ? secs : PRICE_LIST).map(sec => "## " + strip(sec.title[lang]) + "\n" +
            bhItemsFor(sec).map(it => "- " + strip(it.n[lang]) + " — " + it.price + (it.time ? " — " + it.time : "") + (it.d ? " — " + strip(it.d[lang]) : "")).join("\n")).join("\n\n"));
        } },
      { name:"beauty_coffee_prepare_booking",
        description:"Prepares an appointment request for Beauty & Coffee. Returns a WhatsApp link and an email link with the message filled in. It does NOT book or send anything: show the text to the person, and only open the link after they agree. Sandra confirms the appointment herself.",
        inputSchema:{ type:"object", properties:{
          treatment:{ type:"string", description:"Treatment, e.g. 'uitgebreide pedicure' or 'Hot Stone massage'" },
          preferred_moment:{ type:"string", description:"Preferred day and part of the day, e.g. 'zaterdag voormiddag 17 oktober'" },
          name:{ type:"string", description:"Name of the client" },
          note:{ type:"string", description:"Optional extra info (allergy, first visit…)" } }, required:["treatment"] },
        async execute(a){
          a = a || {};
          const lang = L();
          const lines = {
            nl:["Hallo Sandra, ik wil graag een afspraak maken.", "Behandeling: ", "Voorkeur: ", "Naam: ", "Opmerking: "],
            en:["Hello Sandra, I would like to make an appointment.", "Treatment: ", "Preference: ", "Name: ", "Note: "],
            fr:["Bonjour Sandra, je voudrais prendre rendez-vous.", "Soin : ", "Préférence : ", "Nom : ", "Remarque : "] }[lang] || [];
          const clean = v => cleanStr(String(v || ""), 200);
          const msg = [lines[0], lines[1] + clean(a.treatment), a.preferred_moment ? lines[2] + clean(a.preferred_moment) : "", a.name ? lines[3] + clean(a.name) : "", a.note ? lines[4] + clean(a.note) : ""].filter(Boolean).join("\n");
          return txt("Message (let the person check it first):\n" + msg +
            "\n\nWhatsApp: https://wa.me/" + BOOKING_WHATSAPP + "?text=" + encodeURIComponent(msg) +
            "\nEmail: mailto:" + BOOKING_EMAIL + "?subject=" + encodeURIComponent(t("contact_mail_subject", lang)) + "&body=" + encodeURIComponent(msg) +
            "\nPhone: tel:+" + BOOKING_WHATSAPP);
        } },
      { name:"beauty_coffee_save_appointment",
        description:"After Sandra has CONFIRMED an appointment: saves it in this app under 'My appointments' on this phone and returns a Google Calendar link to add it to the person's calendar.",
        inputSchema:{ type:"object", properties:{
          date:{ type:"string", description:"Date as YYYY-MM-DD" }, time:{ type:"string", description:"Time as HH:MM (24 h)" },
          treatment:{ type:"string", description:"Treatment" } }, required:["date","time"] },
        async execute(a){
          a = a || {};
          if (!/^\d{4}-\d{2}-\d{2}$/.test(String(a.date || "")) || !/^\d{2}:\d{2}$/.test(String(a.time || ""))) return txt("Please give date as YYYY-MM-DD and time as HH:MM.");
          const appt = { date:a.date, time:a.time, tcat:null, ttext: cleanStr(String(a.treatment || ""), 120) };
          const list = apptList(); list.push(appt);
          localData.appointments = list.filter(x => { const st = apptStart(x); return st && Date.now() - st.getTime() < 30*86400000; });
          saveLocalData(); renderApptCard(); trackEvent("appointment-saved-agent");
          return txt("Saved in the app (My appointments). Add to Google Calendar: " + apptGoogleUrl(appt));
        } },
      { name:"beauty_coffee_open",
        description:"Opens a screen of the app for the person: pricelist, houserules, findme (route, parking, contact), stampcard, myappt (my appointments).",
        inputSchema:{ type:"object", properties:{ screen:{ type:"string", enum:["pricelist","houserules","findme","stampcard","myappt"] } }, required:["screen"] },
        async execute(a){
          const sc = a && a.screen;
          if (!["pricelist","houserules","findme","stampcard","myappt"].includes(sc)) return txt("Unknown screen.");
          goTo(sc); return txt("Opened: " + sc);
        } }
    ];
    tools.forEach(tool => { try { const r = mc.registerTool(tool); if (r && typeof r.catch === "function") r.catch(() => {}); } catch(e){ /* ignore */ } });
  }

  function init(){
    loadLocalData();
    importMigratedData();   // stamps etc. carried over from the old sbw888.github.io address
    applyI18n();
    renderReturningUserBlock();
    showStep("welcome");
    setupEditorDrag();
    setupCameraZoom();
    try { setupAgentTools(); } catch(e){ /* AI tools are optional */ }
    openDueToast();
    invDailyNote();
    useupToast();
    const newsletterForm = $("#newsletterForm");
    if (newsletterForm) newsletterForm.addEventListener("submit", submitNewsletter);
    setupNewsletterCard();
    setupNewsCard();
    renderReviewsCard();
    applyI18n();
    setTimeout(maybeShowInstallBanner, 2500); // give the page a moment to settle first
    renderAdventCard();
    applySeason();
    renderOnlineTake();
    // a phone left open overnight: refresh the doors when the app comes back
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      renderOnlineTake();
      renderAdventCard();
      applySeason();
      if ($('section.step[data-step="advent"]').classList.contains("is-active")) renderAdvent();
    });
    checkSalonHash();                                   // salon mode: open the app with #salon
    window.addEventListener("hashchange", checkSalonHash);

    $$(".lang-btn").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

    document.body.addEventListener("click", e => {
      const el = e.target.closest("[data-action]");
      if (!el) return;
      const action = el.dataset.action;
      if (action === "start"){
        state.quickPhoto = false;
        if (localData.savedProfile && (localData.savedProfile === "kind" || localData.savedAgeBracket)){
          state.profile = localData.savedProfile;
          state.ageBracket = localData.savedAgeBracket;
          goTo(state.profile === "kind" ? "kidsDrink" : "sunCheck");
        } else {
          goTo("profile");
        }
      }
      if (action === "change-profile"){
        localData.savedProfile = null; localData.savedAgeBracket = null; saveLocalData();
        state.profile = null; state.ageBracket = null;
        goTo("profile");
      }
      if (action === "back") back();
      if (action === "to-mood") goTo("focus");
      if (action === "focus-next") focusNext();
      if (action === "to-context"){ state.context = "salon"; runGeneration(); }
      if (action === "open-camera") openCamera();
      if (action === "switch-camera") switchCamera();
      if (action === "cam-zoom-in") setCamZoom(cam.zoom * 1.25);
      if (action === "cam-zoom-out") setCamZoom(cam.zoom / 1.25);
      if (action === "snap-photo") snapPhoto();
      if (action === "cancel-camera") cancelCamera();
      if (action === "retake") retakePhoto();
      if (action === "edit-photo") editExistingPhoto();
      if (action === "editor-rotate") editorRotate();
      if (action === "editor-confirm") editorConfirm();
      if (action === "editor-cancel") editorCancel();
      if (action === "upload-photo") $("#fileInput").click();
      if (action === "finish-photo") finishPhotoShare();
      if (action === "open-photo-share") goTo("photo");
      if (action === "share") shareImage();
      if (action === "download") downloadImage();
      if (action === "restart") resetApp();
      if (action === "edit-answers") editAnswers();
      if (action === "reload-app") window.location.reload();
      if (action === "open-pricelist") goTo("pricelist");
      if (action === "open-houserules") goTo("houserules");
      if (action === "open-ingredients") ingrOpen();
      if (action === "ingr-tab"){ ingr.tab = el.dataset.tab; renderIngredients(); }
      if (action === "useup-done"){ const d = useupGet(USEUP_DONE_KEY); d[el.dataset.id] = todayKey(); useupSet(USEUP_DONE_KEY, d); renderIngredients(); }
      if (action === "useup-reset"){ useupSet(USEUP_DONE_KEY, {}); renderIngredients(); }
      if (action === "ingr-op") ingrToggleOp(el.dataset.id);
      if (action === "open-clear"){ openSave(el.dataset.id, null); renderIngredients(); }
      if (action === "ingr-op-copy"){ const c = el.dataset.code; try { navigator.clipboard.writeText(c).then(() => showToast(t("ingr_op_copied", state.lang)), () => showToast(c)); } catch(e){ showToast(c); } }
      if (action === "ingr-chip"){ const g = ALLERGEN_GROUPS.find(x => x.id === el.dataset.group); ingr.q = g ? (g.label[state.lang] || g.label.nl) : ""; const inp = $("#ingrSearch"); if (inp) inp.value = ingr.q; renderIngrResults(); }
      if (action === "open-stampcard") goTo("stampcard");
      if (action === "open-giftcard") goTo("giftcard");
      if (action === "open-advent") goTo("advent");
      if (action === "season-fact") nextSeasonFact();
      if (action === "season-shop") trackEvent("season-shop");
      if (action === "advent-door") adventDoorClick(Number(el.dataset.day), el);
      if (action === "open-findme") goTo("findme");
      if (action === "open-myappt" || action === "new-appt") openMyAppt(null);
      if (action === "edit-appt") openMyAppt(Number(el.dataset.apptIndex));
      if (action === "save-appt") saveAppt();
      if (action === "delete-appt") deleteAppt();
      if (action === "appt-ics") apptToCalendar(Number(el.dataset.apptIndex));
      if (action === "repeat-last") repeatLastMoment();
      if (action === "open-photomoment"){
        const a = apptList().filter(x => { const st = apptStart(x); return st && st.getTime() < Date.now() + 86400000; })
          .sort((x, y) => apptStart(y) - apptStart(x))[0];
        if (a && (a.tcat || a.ttext)){ state.pm = state.pm || { dcat:"none" }; state.pm.tcat = a.tcat || state.pm.tcat; const tt = $("#pmTreatText"); if (tt && !tt.value) tt.value = a.ttext || ""; }
        renderPhotoPick(); goTo("photopick");
      }
      if (action === "to-photo-quick") startQuickPhoto();
      if (action === "another-fact") anotherFact();
      if (action === "install-app") installApp();
      if (action === "dismiss-install") dismissInstallBanner();
      if (action === "dismiss-install-ios") dismissInstallBannerIOS();
      if (action === "toggle-slot") toggleSlot(el.dataset.slot);
      if (action === "another-match") rerollMatch();
      if (action === "toggle-fav") toggleFavorite();
      if (action === "remove-fav") removeFavorite(Number(el.dataset.favIndex));
      if (action === "add-stamp") addStamp();
      if (action === "replay-drink-pop") replayDrinkPop(el);
      if (action === "reset-local-data") resetLocalData();
      if (action === "add-reminder") addCalendarReminder();
      if (action === "reminder-weeks") downloadReminder(el.dataset.weeks, el.dataset.title);
      if (action === "dismiss-review") dismissReviewPrompt();
      if (action === "appt-review-done") apptReviewDone(el.getAttribute("data-appt-key"));
      if (action === "online-book") onlineBookClicked(el.getAttribute("data-online-src"));
      if (action === "online-take") onlineTake();
      if (action === "copy-name") copyName(el);
      if (action === "pick-scent") pickScent(el.dataset.scent);
      if (action === "pick-scent-need") pickScentNeed(el.dataset.need);
      if (action === "open-proto"){ ingr.unlocked = true; ingr.tab = "protocol"; ingr.proto = el.dataset.proto; goTo("ingredients"); }
      if (action === "online-dismiss") onlineDismiss();
    });

    $("#fileInput").addEventListener("change", e => handleFileUpload(e.target.files[0]));

    const priceSearch = $("#priceSearch");
    if (priceSearch) priceSearch.addEventListener("input", renderPriceList);

    const complaintEl = $("#complaintInput");
    if (complaintEl){
      complaintEl.addEventListener("input", () => { state.complaintText = complaintEl.value; });
    }
  }

  async function runGeneration(){
    goTo("loading");
    generateMatch();
    state.skinFact = chooseSkinFact();
    await new Promise(r => setTimeout(r, 1600));
    await drawResultCanvas();
    renderResultDetails();
    renderResultBlocks();
    renderMatchTools();
    renderSlotPicker();
    const isNewDiscovery = recordDiscovery();
    renderLoyaltyBlock();
    goTo("result");
    trackEvent("match-generated");
    try { const mt = state.match && state.match.treatment; if (mt && mt.id) trackEvent("match-" + String(mt.id).replace(/[^a-z0-9-]/gi, "-").slice(0, 60)); } catch(e){ /* analytics only */ }
    if (isNewDiscovery) trackEvent("new-discovery");
    if (state.context === "thuis") showToast(t("toast_saved_home", state.lang));
  }

  async function finishPhotoShare(){
    if (state.cameraStream) stopCamera();
    await drawResultCanvas(); // re-bakes the share card with state.photoDataUrl if one was added
    goTo(state.quickPhoto ? "photoshare" : "result");
  }

  /* ---------------- "Fotomoment" without the questionnaire ----------------
     Most clients come for a booked treatment and never make a match. They
     pick their treatment (and optionally their drink), take a photo, and
     get the same branded 9:16 story card to share. */
  // Short choices instead of long dropdowns: a main category as a chip,
  // plus an optional free text ("Welke precies?").
  const PM_DRINK_CATS = { coffee:"☕", milkcoffee:"🥛", tea:"🍵", matcha:"🍵", choco:"🍫", iced:"🧊", none:"🚫" };
  function renderPhotoPick(){
    const L = state.lang;
    state.pm = state.pm || { tcat:null, dcat:"none" };
    const tw = $("#pmTreatCats"), dw = $("#pmDrinkCats");
    if (!tw || !dw) return;
    tw.innerHTML = Object.keys(AVOID_GROUPS).map(g =>
      `<button type="button" class="chip${state.pm.tcat === g ? " is-selected" : ""}" data-pm-t="${g}">${AVOID_ICONS[g]} ${t("avoid." + g, L)}</button>`).join("");
    dw.innerHTML = Object.keys(PM_DRINK_CATS).map(k =>
      `<button type="button" class="chip${state.pm.dcat === k ? " is-selected" : ""}" data-pm-d="${k}">${PM_DRINK_CATS[k]} ${t("pm_drink." + k, L)}</button>`).join("");
    tw.querySelectorAll("[data-pm-t]").forEach(c => c.addEventListener("click", () => { state.pm.tcat = c.dataset.pmT; renderPhotoPick(); }));
    dw.querySelectorAll("[data-pm-d]").forEach(c => c.addEventListener("click", () => { state.pm.dcat = c.dataset.pmD; renderPhotoPick(); }));
    const tt = $("#pmTreatText"), dt = $("#pmDrinkText");
    if (tt) tt.placeholder = t("pm_text_placeholder_t", L);
    if (dt){ dt.placeholder = t("pm_text_placeholder_d", L); dt.hidden = state.pm.dcat === "none"; }
  }
  // labels for the share card, always in the current language
  function quickLabels(m){
    const L = state.lang, q = m.quickPick || {};
    const tcat = q.tcat ? t("avoid." + q.tcat, L) : "";
    const treat = q.ttext ? (tcat ? `${tcat} – ${q.ttext}` : q.ttext) : tcat;
    const drink = q.dcat === "none" ? "" : (q.dtext || t("pm_drink." + q.dcat, L));
    return { treat, drink };
  }
  function quickDrinkPhoto(q){
    const typed = (q.dtext || "").trim().toLowerCase();
    const key = Object.keys(DRINK_PHOTOS).find(k => k.toLowerCase() === typed || trName(k, state.lang).toLowerCase() === typed);
    if (key) return pickRandom(DRINK_PHOTOS[key]);
    if (q.dcat === "milkcoffee") return pickRandom(DRINK_PHOTOS["Latte"].concat(DRINK_PHOTOS["Cappuccino"], DRINK_PHOTOS["Latte Macchiato"]));
    if (q.dcat === "coffee") return pickRandom(DRINK_PHOTOS["Long Black"].concat(DRINK_PHOTOS["Moka Pot"], DRINK_PHOTOS["Vietnamese Phin Coffee"]));
    if (q.dcat === "matcha") return pickRandom(DRINK_PHOTOS["Matcha Latte"]);
    if (q.dcat === "tea") return "assets/drinks/thee.jpg";
    if (q.dcat === "choco") return "assets/drinks/chocomelk.jpg";
    return null;
  }
  function startQuickPhoto(){
    const pm = state.pm || {};
    const ttext = (($("#pmTreatText") || {}).value || "").trim(), dtext = (($("#pmDrinkText") || {}).value || "").trim();
    if (!pm.tcat && !ttext){ showToast(t("pm_pick_first", state.lang)); return; }
    state.quickPhoto = true;
    const quickPick = { tcat: pm.tcat, ttext, dcat: pm.dcat || "none", dtext: pm.dcat === "none" ? "" : dtext };
    state.match = { isKid:false, quick:true, quickPick, treatment:{ name:"" }, drink: quickPick.dcat === "none" ? null : { name:"", origin:null, notes:null } };
    state.match.drinkPhoto = quickDrinkPhoto(quickPick);
    trackEvent("photo-moment");
    goTo("photo");
  }


  document.addEventListener("DOMContentLoaded", init);

  /* ---------------- PWA service worker ---------------- */
  /* Updates without clearing the cache (feedback: people kept seeing old
     prices and did not know how to clear their cache). The browser checks
     for a new sw.js on every start and whenever the app comes back to the
     foreground. When a new version takes over: on the welcome screen the
     page simply reloads; in the middle of a match a small banner offers
     "Vernieuwen", so nobody loses their answers. */
  if ("serviceWorker" in navigator){
    window.addEventListener("load", () => {
      let hadController = !!navigator.serviceWorker.controller;
      navigator.serviceWorker.register("sw.js", { updateViaCache:"none" }).then(reg => {
        reg.update().catch(()=>{});
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") reg.update().catch(()=>{});
        });
      }).catch(()=>{});
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!hadController){ hadController = true; return; }   // very first install: nothing old to replace
        const current = history[history.length - 1];
        if (current === "welcome") window.location.reload();
        else { const b = $("#updateBanner"); if (b) b.hidden = false; }
      });
    });
  }
})();
