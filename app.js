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
    healthFlags: { phlebitis:false, contactLenses:false, menstruation:false, pregnant:false, musclePain:false, roaccutane:false, dietExercise:false, sport:false, diet:false },
    kidsDrink: null,      // 'water' | 'chocolate'
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
    welcome:0, profile:8, age:16, sunCheck:24, healthCheck:30, kidsDrink:16, mood:38, category:48,
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
  function applyI18n(){
    $$("[data-i18n]").forEach(el => {
      const val = t(el.getAttribute("data-i18n"), state.lang);
      if (val != null) el.innerHTML = val;
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
    if (typeof PRICE_LIST !== "undefined" && $('[data-step="pricelist"]').classList.contains("is-active")) renderPriceList();
    renderSunFact();
    if (typeof HOUSE_RULES !== "undefined" && $('[data-step="houserules"]').classList.contains("is-active")) renderHouseRules();
    if ($('[data-step="findme"]') && $('[data-step="findme"]').classList.contains("is-active")) renderFindMe();
    if (typeof localData !== "undefined" && ($("#loyaltyBlock") || $("#loyaltyBlockStandalone"))) renderLoyaltyBlock();
    if ($('[data-step="photopick"]') && $('[data-step="photopick"]').classList.contains("is-active")) renderPhotoPick();
    if (state.quickPhoto && $('[data-step="photoshare"]') && $('[data-step="photoshare"]').classList.contains("is-active")) drawResultCanvas();
    if (typeof localData !== "undefined") renderReturningUserBlock();
    renderApptCard();
    if (season.theme) renderSeasonCard();
    if (typeof renderAdventCard === "function"){ renderAdventCard(); if ($('[data-step="advent"]') && $('[data-step="advent"]').classList.contains("is-active")) renderAdvent(); }
    if ($('[data-step="myappt"]') && $('[data-step="myappt"]').classList.contains("is-active")) renderApptForm();
    renderSocialLinks();
    renderActions();
    if (typeof news !== "undefined" && news.posts) renderNewsCard();
    renderReviewsCard();
  }

  function setLang(lang){
    state.lang = lang;
    applyI18n();
  }

  /* ---------------- step navigation ---------------- */
  function updateProgress(name){
    const w = STEP_WEIGHTS[name] ?? 0;
    $("#progressFill").style.width = w + "%";
    $(".progress").style.visibility = (name==="welcome" || name==="pricelist" || name==="houserules" || name==="stampcard" || name==="findme" || name==="myappt" || name==="photopick" || name==="photoshare" || name==="advent" || (name==="photo" && state.quickPhoto)) ? "hidden" : "visible";
  }

  function showStep(name){
    $$(".step").forEach(sec => sec.classList.toggle("is-active", sec.dataset.step === name));
    const topBack = $("#topbarBack"); if (topBack) topBack.hidden = (name === "welcome");
    updateProgress(name);

    if (name === "pricelist") {
      renderPriceList();
    }
    if (name === "houserules") {
      renderHouseRules();
    }
    if (name === "stampcard") {
      renderLoyaltyBlock();
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
    PROFILES.forEach(id => {
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
      items.forEach(([key, icon]) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip chip--check" + (state.healthFlags[key] ? " is-selected" : "");
        chip.innerHTML = `<span class="chip__icon">${icon}</span> ${t(`health_${key}`, state.lang)}`;
        chip.addEventListener("click", () => {
          state.healthFlags[key] = !state.healthFlags[key];
          renderHealthOptions();
        });
        checkWrap.appendChild(chip);
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

  async function openCamera(facing){
    if (facing) cameraFacing = facing;
    stopCamera();
    $("#photoEditor").hidden = true;
    $("#photoStage").hidden = false;
    placeholder().hidden = false;
    placeholder().querySelector("p").textContent = t("camera_starting", state.lang);
    video().hidden = true;
    preview().hidden = true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: cameraFacing },
          width: { ideal: 1080 },
          height: { ideal: 1350 }
        },
        audio: false
      });
      state.cameraStream = stream;
      const v = video();
      v.srcObject = stream;
      v.hidden = false;
      v.classList.toggle("is-mirrored", cameraFacing === "user");
      placeholder().hidden = true;
      applyGlowPreview();
      try { await v.play(); } catch(e){ /* some browsers auto-play once metadata loads */ }
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
      showToast(t("toast_camera_denied", state.lang));
    }
  }

  async function updateSwitchCameraVisibility(){
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cams = devices.filter(d => d.kind === "videoinput");
      $("#switchCameraBtn").hidden = cams.length < 2;
    } catch(e){
      $("#switchCameraBtn").hidden = false; // let the user try regardless if we can't enumerate
    }
  }

  function switchCamera(){
    openCamera(cameraFacing === "user" ? "environment" : "user");
  }

  function stopCamera(){
    if (state.cameraStream){
      state.cameraStream.getTracks().forEach(tr => tr.stop());
      state.cameraStream = null;
    }
    video().hidden = true;
    $("#switchCameraBtn").hidden = true;
  }

  function snapPhoto(){
    const v = video();
    const c = canvas();
    c.width = v.videoWidth; c.height = v.videoHeight;
    const ctx = c.getContext("2d");
    if (cameraFacing === "user"){
      ctx.translate(c.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(v, 0, 0, c.width, c.height);
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
      video().style.filter = liveCartoonCss;
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

  function generateMatch(){
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

    const treatmentObj = matchTreatment(state.mood, state.profile, !!state.sunExposed, {
      ...state.healthFlags,
      avoid: state.avoid || [],
      age30Plus: state.ageBracket === "30-44" || state.ageBracket === "45plus",
      age45Plus: state.ageBracket === "45plus"
    }, state.complaintText);
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
      why: { mood: state.mood, sun: !!state.sunExposed, complaint: complaintMatched(state.complaintText, treatment.id),
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
    if (w.complaint) parts.push(t("why_complaint", L));
    if (w.sun) parts.push(t("why_sun", L));
    let dk;
    if (w.category === "matcha") dk = "why_drink_matcha";
    else if (w.temperature === "iced") dk = "why_drink_iced";
    else if (w.category === "tea") dk = w.caffeine === "decaf" ? "why_drink_tea_decaf" : "why_drink_tea";
    else dk = w.caffeine === "decaf" ? "why_drink_decaf" : (drinkNotes ? "why_drink_coffee_notes" : "why_drink_coffee");
    parts.push(t(dk, L).replace("{drink}", drinkFull).replace("{notes}", (drinkNotes || "").toLowerCase()));
    return `<div class="match-why">
        <p class="match-why__title">💡 ${t("why_title", L)}</p>
        <p class="match-why__text">${parts.join(" ")}</p>
      </div>`;
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
      ${whyHtml(m, drinkFull, drinkNotes)}`;

    const titleEl = $("#resultTitle");
    if (titleEl) titleEl.textContent = t(state.context === "thuis" ? "result_saved_title" : "result_title", state.lang);

    updateBookingLink(m, drinkFull);
  }

  const BOOKING_EMAIL = "sandra.truong@ikmail.com";
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

  function updateBookingLink(m, drinkFull){
    if (!m) return;
    const slots = slotsText();
    const emailLink = $("#bookEmailCta");
    if (emailLink){
      const subject = t("book_email_subject", state.lang);
      const body = t("book_email_body", state.lang)
        .replace("{treatment}", trName(m.treatment.name, state.lang))
        .replace("{drink}", drinkFull || "")
        .replace("{slots}", slots);
      emailLink.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    const waLink = $("#bookWhatsappCta");
    if (waLink){
      const waText = t("book_whatsapp_text", state.lang)
        .replace("{treatment}", trName(m.treatment.name, state.lang))
        .replace("{drink}", drinkFull || "")
        .replace("{slots}", slots)
        .trim();
      waLink.href = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(waText)}`;
    }
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
      <p class="slot-picker__hint">${t("slots_hint", state.lang)}</p>`;
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
    .concat(typeof SKINKNOW_FACTS !== "undefined" ? SKINKNOW_FACTS : []);
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
        <summary><span class="price-section__icon" aria-hidden="true">${sec.icon}</span><span class="price-section__title">${sec.title[lang]}</span></summary>
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
        .concat(PRICE_LIST.map(sec => `<button type="button" class="price-cat${state.priceCat === sec.id ? " is-active" : ""}" data-price-cat="${sec.id}">${sec.icon} ${sec.title[lang]}</button>`)).join("");
      cats.querySelectorAll("[data-price-cat]").forEach(b => b.addEventListener("click", () => {
        state.priceCat = b.dataset.priceCat || ""; renderPriceList();
      }));
    }
    let html = "";
    PRICE_LIST.forEach(sec => {
      if (state.priceCat && sec.id !== state.priceCat) return;
      const items = sec.items.filter(it => {
        if (!q) return true;
        const hay = [it.n.nl, it.n.en, it.n.fr, it.d && it.d.nl, it.d && it.d.en, it.d && it.d.fr, sec.title.nl, sec.title.en, sec.title.fr].join(" ").toLowerCase();
        return hay.includes(q);
      });
      if (!items.length) return;
      const open = (q || state.priceCat === sec.id || openIds.has(sec.id)) ? " open" : "";
      html += `<details class="price-section" data-sec="${sec.id}"${open}>
        <summary><span class="price-section__icon" aria-hidden="true">${sec.icon}</span><span class="price-section__title">${sec.title[lang]}</span><span class="price-section__count">${items.length}</span></summary>
        ${sec.note ? `<p class="price-section__note">${sec.note[lang]}</p>` : ""}
        <ul class="price-items">
          ${items.map(it => `<li class="price-item">
            <div class="price-item__main"><span class="price-item__name">${it.n[lang]}</span><span class="price-item__price">${it.price}</span></div>
            <div class="price-item__meta">${[it.time, it.d && it.d[lang]].filter(Boolean).join(" · ")}</div>
            ${it.note ? `<div class="price-item__note">${it.note[lang]}</div>` : ""}
          </li>`).join("")}
        </ul>
      </details>`;
    });
    body.innerHTML = html || `<p class="price-empty">${t("pricelist_empty", lang)}</p>`;

    const wa = $("#priceWhatsapp");
    if (wa) wa.href = `https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(t("pricelist_wa_text", lang))}`;
    const mail = $("#priceMail");
    if (mail) mail.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(t("pricelist_mail_subject", lang))}&body=${encodeURIComponent(t("pricelist_mail_body", lang))}`;
  }

  /* Current actions (data.js → CURRENT_ACTIONS): date-windowed, bilingual */
  // Shown on the welcome screen (so everyone sees the promo before
  // starting) and again on the result screen, right before booking.
  function renderActions(){
    const wraps = [$("#actionsBlock"), $("#actionsBlockWelcome")].filter(Boolean);
    if (!wraps.length || typeof CURRENT_ACTIONS === "undefined") return;
    const wrap = { set innerHTML(html){ wraps.forEach(w => { w.innerHTML = html; w.hidden = !html.trim(); }); } };
    const d = new Date();
    const today = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
    const lang = state.lang;
    const active = CURRENT_ACTIONS.filter(a => (!a.from || today >= a.from) && (!a.until || today <= a.until));
    wrap.innerHTML = active.map(a => `
      <div class="action-card">
        <span class="action-card__icon" aria-hidden="true">${a.icon || "🎁"}</span>
        <div class="action-card__body">
          <p class="action-card__title">${a.title[lang] || a.title.nl}</p>
          <p class="action-card__text">${a.text[lang] || a.text.nl}</p>
        </div>
      </div>`).join("");
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
  const NEWS_CACHE_KEY = "bc_news_cache_v1";
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
      ${lang !== "nl" ? `<p class="reviews-card__note">${t("reviews_original_lang", lang)}</p>` : ""}
      <div class="reviews-card__buttons">
        <a class="btn btn--outline" href="${G.allUrl}" target="_blank" rel="noopener noreferrer" data-review="all">${t("reviews_all", lang)}</a>
        <a class="btn btn--primary" href="${GOOGLE_REVIEW_URL}" target="_blank" rel="noopener noreferrer" data-review="write">${t("reviews_write", lang)}</a>
      </div>`;
    card.hidden = false;
    body.querySelectorAll("[data-review]").forEach(a => a.addEventListener("click", () => trackEvent("reviews-" + a.dataset.review)));
  }

  function renderNewsCard(){
    const card = $("#newsCard"), list = $("#newsList");
    if (!card || !list) return;
    const posts = news.posts || [];
    if (!posts.length){ card.hidden = true; return; }
    const locale = { nl:"nl-BE", en:"en-GB", fr:"fr-BE" }[state.lang] || "nl-BE";
    list.textContent = "";
    posts.forEach(p => {
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
      const d = new Date(p.date);
      if (!isNaN(d)){
        const date = document.createElement("p"); date.className = "news-item__date";
        date.textContent = d.toLocaleDateString(locale, { day:"numeric", month:"long", year:"numeric" });
        body.appendChild(date);
      }
      const title = document.createElement("p"); title.className = "news-item__title"; title.textContent = p.title;
      body.appendChild(title);
      if (p.excerpt){
        const ex = document.createElement("p"); ex.className = "news-item__excerpt"; ex.textContent = p.excerpt;
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
    const cfg = (typeof NEWS_FEED === "object" && NEWS_FEED) ? NEWS_FEED : null;
    if (!cfg || !cfg.site || !$("#newsCard")) return;
    const site = String(cfg.site).replace(/^https?:\/\//, "").replace(/\/+$/, "");
    const count = Math.min(5, Math.max(1, parseInt(cfg.count, 10) || 3));
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
    const routes = [
      { name: "wpcom-v1.1",
        url: "https://public-api.wordpress.com/rest/v1.1/sites/" + encodeURIComponent(site) +
             "/posts/?number=" + count + (cat ? "&category=" + cat : ""),
        parse: data => (data && Array.isArray(data.posts) ? data.posts : []).map(p => ({
          title: p.title, url: p.URL, date: p.date, excerpt: p.excerpt, img: p.featured_image })) },
      { name: "site-wp-v2",
        url: "https://" + site + "/wp-json/wp/v2/posts?per_page=" + count +
             "&_fields=title,link,date,excerpt,jetpack_featured_media_url",
        parse: data => (Array.isArray(data) ? data : []).map(p => ({
          title: p.title && p.title.rendered, url: p.link, date: p.date,
          excerpt: p.excerpt && p.excerpt.rendered, img: p.jetpack_featured_media_url })) }
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
          return {
            title: newsText(p.title),
            url: newsSafeUrl(p.url),
            date: p.date || "",
            excerpt: newsShorten(newsText(p.excerpt), 140),
            img: img ? img.split("?")[0] + "?w=200&h=200&crop=1" : ""
          };
        }).filter(p => p.title && p.url).slice(0, count);
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
    const v = $("#appVersion"); if (v) v.textContent = `${t("app_version_label", state.lang)} ${APP_VERSION}`;
  }

  function resetApp(){
    stopCamera();
    cameraFacing = "user";
    state.profile = null; state.ageBracket = null; state.sunExposed = null; state.kidsDrink = null;
    state.healthFlags = { phlebitis:false, contactLenses:false, menstruation:false, pregnant:false, musclePain:false, roaccutane:false, dietExercise:false, sport:false, diet:false };
    state.mood = null; state.category = null; state.temperature = null; state.caffeine = null; state.complaintText = "";
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
    // Test-phase reset: when Sandra changes DATA_RESET_VERSION in data.js,
    // every phone wipes its stamps/discoveries/favourites once.
    if (typeof DATA_RESET_VERSION === "string"){
      if (!localData.resetVersion){ localData.resetVersion = DATA_RESET_VERSION; saveLocalData(); }
      else if (localData.resetVersion !== DATA_RESET_VERSION){
        wipeLocalData(); localData.resetVersion = DATA_RESET_VERSION; saveLocalData();
      }
    }
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
  function renderApptCard(){
    const card = $("#apptCard");
    if (!card || typeof localData === "undefined") return;
    const L = state.lang, loc = L === "en" ? "en-GB" : (L === "fr" ? "fr-BE" : "nl-BE");
    const now = Date.now();
    const list = apptList().map((a, i) => ({ a, i, s: apptStart(a) })).filter(x => x.s && !isNaN(x.s));
    const upcoming = list.filter(x => x.s.getTime() + 2*3600000 >= now).sort((x, y) => x.s - y.s);
    const recentPast = list.filter(x => x.s.getTime() + 2*3600000 < now && now - x.s.getTime() < 14*86400000).sort((x, y) => y.s - x.s)[0];
    if (!upcoming.length && !recentPast){ card.hidden = true; return; }
    const when = s => s.toLocaleDateString(loc, { weekday:"long", day:"numeric", month:"long" }) + " · " + s.toLocaleTimeString(loc, { hour:"2-digit", minute:"2-digit" });
    let html = "";
    if (recentPast) html += `
      <div class="appt-item appt-item--past">
        <p class="appt-card__title">✨ ${t("appt_after_title", L)}</p>
        <p class="appt-card__text">${apptTreatLabel(recentPast.a)}</p>
        <div class="appt-card__buttons"><button type="button" class="btn btn--primary" data-action="open-photomoment">${t("pm_button", L)}</button></div>
      </div>`;
    if (upcoming.length) html += `<p class="appt-card__title">📅 ${t(upcoming.length > 1 ? "appt_card_title_many" : "appt_card_title", L)}</p>`;
    upcoming.forEach(x => {
      html += `
      <div class="appt-item">
        <p class="appt-card__when">${when(x.s)}</p>
        <p class="appt-card__text">${apptTreatLabel(x.a)}</p>
        <p class="appt-card__label">${t("appt_add_to", L)}</p>
        <div class="appt-card__buttons">
          <a class="btn btn--outline" href="${apptGoogleUrl(x.a)}" target="_blank" rel="noopener noreferrer" data-cal="google">Google</a>
          <a class="btn btn--outline" href="${apptOutlookUrl(x.a)}" target="_blank" rel="noopener noreferrer" data-cal="outlook">Outlook</a>
          <button type="button" class="btn btn--outline" data-action="appt-ics" data-appt-index="${x.i}">${t("appt_other_calendar", L)}</button>
        </div>
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
    const totalTreatments = TREATMENTS_CATALOG.length;
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
        <span>✨ ${localData.discoveredTreatments.length}/${totalTreatments} ${t("treatments_discovered_label", state.lang)}</span>
        <span>🍵 ${localData.discoveredDrinks.length}/${totalDrinks} ${t("drinks_discovered_label", state.lang)}</span>
      </div>
      ${lastMomentButtonHtml()}
      ${favs.length ? `
      <p class="returning-user__title returning-user__title--fav">${t("fav_title", state.lang)}</p>
      <ul class="fav-list">
        ${favs.map((f, i) => `<li class="fav-item">
          <div class="fav-item__text"><strong>${esc(trName(f.tname, state.lang))}</strong><span>☕ ${esc(f.drink)}</span></div>
          <div class="fav-item__actions">
            <a class="fav-item__book" href="${favBookHref(f)}" target="_blank" rel="noopener noreferrer">${t("fav_book", state.lang)}</a>
            <button type="button" class="fav-item__remove" data-action="remove-fav" data-fav-index="${i}">${t("fav_remove", state.lang)}</button>
          </div>
        </li>`).join("")}
      </ul>` : ""}` : "");
  }

  // Rendered in two places: on the result screen and on the stand-alone
  // "Mijn stempelkaart" screen (welcome screen button / #stempelkaart link),
  // so a client never has to redo the questions just to scan a stamp.
  function renderLoyaltyBlock(){
    const blocks = [$("#loyaltyBlock"), $("#loyaltyBlockStandalone")].filter(Boolean);
    if (!blocks.length) return;
    const block = { set innerHTML(html){ blocks.forEach(b => { b.innerHTML = html; }); } };
    const totalTreatments = TREATMENTS_CATALOG.length;
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
        <div class="collection-card__row"><span>${t("treatments_discovered_label", state.lang)}</span><span>${localData.discoveredTreatments.length}/${totalTreatments}</span></div>
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
  const SALON_CODE_KINDS = ["STAMP","REDEEM","UNDO"];
  const SALON_KIND_LETTER = { STAMP:"S", REDEEM:"R", UNDO:"U" };
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
    const m = String(raw || "").trim().match(/^BCS1:([SRU])([0-9a-z]{1,10})\.([A-Za-z0-9_-]{80,90})$/);
    if (!m) return null;
    const kind = SALON_CODE_KINDS.find(k => SALON_KIND_LETTER[k] === m[1]);
    const counter = parseInt(m[2], 36), now = stampCounterNow();
    if (!(counter >= now - 3 && counter <= now + 1)) return null;
    try {
      const ok = await crypto.subtle.verify(ECDSA_SIGN, await getSalonPubKey(), unb64u(m[3]), new TextEncoder().encode("BC-" + kind + "|" + counter));
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
    const kind = await resolveSalonCode(raw);
    if (kind === "STAMP"){
      if (localData.lastStampDay === todayKey()){ closeStampScanner(); showToast(t("stamp_already_today", state.lang)); return; }
      localData.stamps++;
      localData.lastStampDay = todayKey();
      if (localData.stamps >= 10 && !localData.cardFullAt) localData.cardFullAt = new Date().toISOString();
      finishSalonCode(localData.stamps === 10 ? "stamp_card_full_toast" : "stamp_added_toast", "stamp-added");
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
          ${SALON_CODE_KINDS.concat(advVisible() ? ["ADVENT"] : []).map(k => `<button type="button" class="salon-mode${k === "ADVENT" ? " salon-mode--advent" : ""}${k === salonMode.kind ? " is-active" : ""}" data-salon-kind="${k}">${t("salon_mode_" + k.toLowerCase(), state.lang)}</button>`).join("")}
        </div>
        <p class="salon-mode-hint" id="salonModeHint">${t("salon_mode_hint_" + salonMode.kind.toLowerCase(), state.lang)}</p>
        <canvas id="salonQr" class="salon-qr salon-qr--${salonMode.kind.toLowerCase()}" width="600" height="600"></canvas>
        <p class="salon-code" id="salonCode" hidden></p>
        <div class="salon-timer"><div class="salon-timer__fill" id="salonTimerFill"></div></div>
        <p class="stamp-overlay__hint" id="salonHint">${t("salon_hint", state.lang)}</p>
        <div class="salon-adv" id="salonAdvent" hidden></div>
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
    const isAdv = salonMode.kind === "ADVENT";
    const hint = $("#salonModeHint"); if (hint) hint.textContent = t("salon_mode_hint_" + salonMode.kind.toLowerCase(), state.lang);
    const qr = $("#salonQr"); if (qr){ qr.className = "salon-qr salon-qr--" + salonMode.kind.toLowerCase(); qr.hidden = isAdv; }
    const hintEl = $("#salonHint"); if (hintEl) hintEl.hidden = isAdv;
    const timer = $("#salonOverlay .salon-timer"); if (timer) timer.hidden = isAdv;
    const box = $("#salonAdvent"); if (box){ box.hidden = !isAdv; if (isAdv) renderSalonAdvent(); }
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
    if (salonMode.kind === "ADVENT") return;
    const counter = stampCounterNow();
    const secs = Date.now() / 1000;
    const left = STAMP_STEP_SECONDS - (secs % STAMP_STEP_SECONDS);
    const fill = $("#salonTimerFill");
    if (fill) fill.style.width = `${(left / STAMP_STEP_SECONDS) * 100}%`;
    if (counter === salonMode.counter) return;
    salonMode.counter = counter;
    const kind = salonMode.kind;
    const code = await stampCodeFor(counter, kind);
    if (kind !== salonMode.kind || kind === "ADVENT") return;            // mode switched while computing
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
    if (location.hash === "#salon") openSalonMode();
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
    else if (location.hash === "#stempelkaart" || location.hash === "#stamps"){
      window.history.replaceState(null, "", location.pathname + location.search);
      goTo("stampcard");
    }
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
     Sandra opens ?voorproef=<ADVENT.previewKey> : a bar lets her choose
     the day, nothing is saved, codes start with T and only work on a
     salon phone that is in preview mode too. */
  const ADV_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";   // 32 signs, no 0/O/1/I
  const ADV_QR_PREFIX = "BCADV:";
  const ADV_LEDGER_KEY = "bc_advent_ledger_v1";
  const ADV_DOOR_ORDER = [12,3,19,7,24,1,15,9,21,5,17,11,25,2,14,20,6,10,23,4,16,8,22,13,18];
  const advPreview = (() => {
    try {
      const k = new URLSearchParams(location.search).get("voorproef");
      return !!(k && typeof ADVENT === "object" && ADVENT.previewKey && k === ADVENT.previewKey);
    } catch(e){ return false; }
  })();
  let advTest = null;                          // the simulated day in preview mode
  if (advPreview){
    let d = null;
    try { d = new URLSearchParams(location.search).get("dag"); } catch(e){ /* ignore */ }
    if (d && /^\d{1,2}$/.test(d)) d = `${ADVENT.year}-12-${String(Math.min(25, Math.max(1, Number(d)))).padStart(2,"0")}`;
    if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)){
      const now = todayKey();
      d = (now >= `${ADVENT.year}-12-01` && now <= `${ADVENT.year}-12-25`) ? now : `${ADVENT.year}-12-01`;
    }
    advTest = d;
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
  function advDoor(day){
    const d = ADVENT.doors.find(x => Number(x.day) === Number(day));
    if (!d) return null;
    const item = (ADVENT.items && ADVENT.items[d.item]) || d;
    return Object.assign({}, item, { day:Number(d.day), itemId:d.item || null,
      itemStock: item.stock == null || item === d ? null : Number(item.stock),
      stock: d.stock == null ? null : Number(d.stock) });
  }
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
    let s = String(txt || "")
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
    if (door.photo) return `<img class="${cls}" src="${door.photo}" alt="" loading="lazy">`;
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
    for (let d = 1; d <= 25; d++) opts.push([advKeyFor(y, 12, d), `${d} dec`]);
    opts.push([`${y}-12-28`, "28 dec"], [`${y + 1}-01-10`, "10 jan"], [`${y + 1}-01-20`, "20 jan"], [`${y + 1}-02-05`, "5 feb"], [`${y + 1}-03-01`, "1 mrt"]);
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
    if ($('[data-step="advent"]') && $('[data-step="advent"]').classList.contains("is-active")) renderAdvent();
    renderSalonAdvent();
  }
  document.addEventListener("change", e => {
    const sel = e.target.closest('[data-adv-preview="day"]');
    if (!sel || !advPreview) return;
    advTest = sel.value;
    advPreviewRerender();
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
        <p class="advent-card__text">${t("adv_card_teaser", state.lang)}</p>
        <button type="button" class="btn btn--primary btn--sm" data-action="open-advent">${t("adv_card_peek_btn", state.lang)}</button>`;
    } else if (phase === "live"){
      const d = advTodayDoor();
      const st = d ? advDoorState(d) : null;
      const line = st === "today" ? t("adv_card_today", state.lang).replace("{n}", d) : t("adv_card_done", state.lang).replace("{n}", d);
      html = `<p class="advent-card__title">🎄 ${t("adv_title", state.lang)}</p>
        <p class="advent-card__text">${line}</p>
        <button type="button" class="btn btn--primary btn--sm${st === "today" ? " advent-card__pulse" : ""}" data-action="open-advent">${t("adv_card_open_btn", state.lang)}</button>`;
    } else if (phase === "after" && openedCount){
      html = `<p class="advent-card__title">🎁 ${t("adv_mine_title", state.lang)}</p>
        <p class="advent-card__text">${t("adv_card_after", state.lang).replace("{n}", openedCount)}</p>
        <button type="button" class="btn btn--primary btn--sm" data-action="open-advent">${t("adv_card_mine_btn", state.lang)}</button>`;
    } else if (advPreview){
      html = `<p class="advent-card__title">🎄 ${t("adv_title", state.lang)}</p>
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
      const door = advDoor(day);
      const inner = st === "opened" ? (door.photo ? `<img class="advent-door__photo" src="${door.photo}" alt="">` : `<span class="advent-door__icon" aria-hidden="true">${door.type === "discount" ? (door.value || "%") : door.icon}</span>`)
        : st === "missed" ? `<span class="advent-door__tag">${t("adv_state_missed", state.lang)}</span>`
        : st === "today" ? `<span class="advent-door__tag">${t("adv_state_today", state.lang)}</span>` : "";
      const label = t("adv_door_label", state.lang).replace("{n}", day);
      return `<button type="button" class="advent-door advent-door--${st}" data-action="advent-door" data-day="${day}" aria-label="${label}${st === "missed" ? " — " + t("adv_state_missed", state.lang) : ""}">
          <span class="advent-door__num">${day}</span>${inner}</button>`;
    }).join("");
    const mine = Object.keys(store.opened).map(Number).sort((a, b) => a - b);
    const mineHtml = mine.length ? `<p class="advent-mine__title">${t("adv_mine_title", state.lang)}</p>
      ${ADVENT.maxGiftsPerClient ? `<p class="advent-mine__note">${advFill(t("adv_mine_note", state.lang))}</p>` : ""}
      <div class="advent-mine">${mine.map(day => { const door = advDoor(day); if (!door) return "";
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
    ADVENT.doors.forEach(d0 => {
      const door = advDoor(d0.day);
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
    if (st === "future"){ showToast(t("adv_future_toast", state.lang).replace("{n}", day)); return; }
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
    const item = door.photo ? `<img src="${door.photo}" alt="">`
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
      <button type="button" class="btn btn--primary adv-reveal__go" data-reveal="go">🎟️ ${t("adv_reveal_btn", state.lang)}</button>`;
    document.body.appendChild(ov);
    const go = () => { ov.remove(); showAdventVoucher(day); };
    ov.addEventListener("click", e => { if (e.target.closest('[data-reveal="go"]') || ov.classList.contains("is-done")) go(); });
    setTimeout(() => ov.classList.add("is-done"), 2300);
  }

  async function showAdventVoucher(day){
    const door = advDoor(day);
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
    const stockNote = door.soldOut ? `<p class="advent-voucher__soldout">😔 ${t("adv_soldout_banner", state.lang)}</p>`
      : (door.itemStock != null ? `<p class="advent-voucher__limited">${t("adv_limited", state.lang).replace("{n}", door.itemStock)}</p>` : "");
    const boxHtml = door.photo ? `<img class="bc-voucher__photo" src="${door.photo}" alt="">`
      : door.type === "discount" ? `<b>${door.value || ""}</b>`
      : door.type === "extra" ? `<i aria-hidden="true">${door.icon}</i><small>${t("adv_free", state.lang)}</small>`
      : `<i aria-hidden="true">${door.icon}</i>`;
    const use = advTxt(door.use);
    const ingr = advTxt(door.ingredients), ingrNote = advTxt(door.ingredientsNote);
    const hl = advTxt(door.highlights);
    const infoHtml = isGift ? `<div class="advent-voucher__info"><p>${t("adv_info_title", state.lang)}</p>
        ${use ? `<p class="advent-voucher__use">${use}</p>` : ""}
        <p class="advent-voucher__ingr">${ingr ? `<b>${t("adv_ingredients", state.lang)}</b> ${ingr}${ingrNote ? ` <i>(${ingrNote})</i>` : ""}` : t("adv_ingredients_label", state.lang)}</p>
        <p class="advent-voucher__ingr">${t("adv_ingredients_card", state.lang)}</p></div>`
      : hl ? `<div class="advent-voucher__info"><p>${t("adv_info_good", state.lang)}</p>
        <p class="advent-voucher__use">${hl}</p>
        ${door.ingredients ? `<p class="advent-voucher__ingr">${t("adv_allergy_ask", state.lang)}</p>` : ""}</div>` : "";
    const waText = advFill(t("adv_book_wa_text", state.lang), door).replace("{gift}", advDoorText(door, state.lang)).replace("{code}", rec.code);
    const bookHtml = expired ? "" : `<div class="advent-voucher__book">
        <a class="btn btn--primary btn--sm" href="https://wa.me/${BOOKING_WHATSAPP}?text=${encodeURIComponent(waText)}" target="_blank" rel="noopener noreferrer">💬 ${t("adv_book_wa", state.lang)}</a>
        <button type="button" class="btn btn--outline btn--sm" data-adv="copy">📋 ${t("adv_copy_code", state.lang)}</button>
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
      return `<tr class="${full ? "is-full" : ""}${n ? "" : " is-zero"}"><td>${door.day}</td><td>${door.type === "discount" ? "🎟️" : door.icon} ${advDoorText(door, state.lang)}${door.itemStock != null ? ` <small>(${advCountItem(l, door.itemId)}/${door.itemStock} ${t("salon_adv_total_item", state.lang)})</small>` : ""}${door.soldOut ? " — ❌" : ""}</td><td>${n} / ${stock}</td></tr>`;
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
    if (door.soldOut) return t("adv_res_soldout_flag", L);
    if (door.itemStock != null && advCountItem(l, door.itemId) >= door.itemStock) return t("adv_res_soldout_item", L).replace("{y}", door.itemStock);
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
    const door = advDoor(p.day);
    if (!door) return showAdventResult("bad", t("adv_res_invalid", L), p.code);
    const today = advTodayKey(), useBy = advUseBy(p.day);
    const l = advLedger();
    const x = l.codes[p.code];
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
    const maxAppt = useBy < today ? today : useBy;
    const reserve = `<label class="adv-result__date">${t("adv_appt_date", L)}
        <input type="date" id="advApptDate" min="${today}" max="${maxAppt}"></label>`;
    const info = `<p class="adv-result__extra">${advCondNote(door)}<br>${t(door.homemade ? "adv_res_rule_homemade" : "adv_res_rule_book", L)
      .replace("{book}", advFmt(advBookBy(p.day))).replace("{until}", advFmt(useBy))}</p>${reserve}`;
    showAdventResult("ok", t("adv_res_valid_choose", L), p.code, door, info,
      [["redeem", "✅ " + t("adv_btn_redeem_now", L)], ["book", "📅 " + t("adv_btn_book", L)]], p);
  }
  // write to the ledger after Sandra chose an action
  function advAction(action, p){
    const L = state.lang, door = advDoor(p.day), l = advLedger();
    // in the preview the "now" follows the simulated day
    const now = advPreview ? new Date(`${advTodayKey()}T${new Date().toTimeString().slice(0, 8)}`).toISOString() : new Date().toISOString();
    const x = l.codes[p.code];
    const fresh = !x;
    if (fresh){
      const refuse = advRefuseNew(p, door, l);            // re-check (e.g. two phones scanning at once)
      if (refuse) return showAdventResult("bad", refuse, p.code, door);
    }
    const base = x || { day:p.day, dev:p.dev, type:door.type, item:door.itemId, at:now };
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
    if (action === "void") return showAdventResult("bad", t("adv_res_voided", L), p.code, door);
    if (action === "book"){
      trackEvent("advent-booked");
      return showAdventResult("ok", t("adv_res_booked_ok", L).replace("{d}", advFmt(l.codes[p.code].appt)), p.code, door,
        `<p class="adv-result__extra">${t("adv_res_booked_hint", L)}</p>`);
    }
    trackEvent("advent-redeemed");
    const n = advCountFor(l, p.day), ni = door.itemId ? advCountItem(l, door.itemId) : 0;
    const count = door.itemStock != null ? t("adv_res_count_item", L).replace("{x}", ni).replace("{y}", door.itemStock)
      : door.stock != null ? t("adv_res_count_of", L).replace("{x}", n).replace("{y}", door.stock) : t("adv_res_count", L).replace("{x}", n);
    const title = door.type === "discount" ? "adv_res_ok_discount" : door.type === "extra" ? "adv_res_ok_extra" : "adv_res_ok_gift";
    return showAdventResult("ok", t(title, L), p.code, door, `<p class="adv-result__count">${count}</p><p class="adv-result__extra">${advCondNote(door)}</p>`);
  }

  // mood: "ok" (green), "info" (blue, a reserved voucher), "bad" (red)
  function showAdventResult(mood, message, code, door, extraHtml, actions, p){
    const old = $("#advResultOverlay"); if (old) old.remove();
    const ov = document.createElement("div");
    ov.className = "stamp-overlay adv-result-overlay"; ov.id = "advResultOverlay";
    ov.setAttribute("role", "alertdialog"); ov.setAttribute("aria-modal", "true");
    const mark = mood === "ok" ? "✅" : mood === "info" ? "📅" : "❌";
    const btns = actions && actions.length
      ? actions.map(([a, label]) => `<button type="button" class="btn ${a === "void" ? "btn--ghost adv-result__void" : "btn--primary"}" data-advres="${a}">${label}</button>`).join("")
        + `<button type="button" class="btn btn--ghost" data-advres="close">${t("stamp_close", state.lang)}</button>`
      : `<button type="button" class="btn btn--primary" data-advres="next">📷 ${t("adv_res_next", state.lang)}</button>
         <button type="button" class="btn btn--ghost" data-advres="close">${t("stamp_close", state.lang)}</button>`;
    ov.innerHTML = `
      <div class="stamp-overlay__panel adv-result adv-result--${mood}">
        <p class="adv-result__mark" aria-hidden="true">${mark}</p>
        <p class="adv-result__msg">${message}</p>
        ${door ? `${door.photo ? `<img class="adv-result__photo" src="${door.photo}" alt="">` : ""}<p class="adv-result__gift">${door.photo ? "" : (door.type === "discount" ? "🎟️ " : door.icon + " ")}${advDoorText(door, state.lang)}</p>
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
    return d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : todayKey();
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
    const icons = (th.deco || []).map(d => d.e).slice(0, 3).join(" ");
    card.className = "season-card season-card--" + th.id;
    card.innerHTML = `
      <p class="season-card__hello"><span aria-hidden="true">${icons}</span> ${seasonText(th.hello, season.year)}</p>
      ${fact ? `<p class="season-card__fact"><b>${t("season_did_you_know", L)}</b> ${fact}</p>` : ""}
      <div class="season-card__btns">
        ${facts.length > 1 ? `<button type="button" class="btn btn--text btn--sm" data-action="season-fact">🔄 ${t("season_next_fact", L)}</button>` : ""}
        <a class="season-card__shop" href="${SOAP_SHOP_URL}" target="_blank" rel="noopener noreferrer" data-action="season-shop">${promo}</a>
      </div>`;
    card.hidden = false;
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
  function addCalendarReminder(){
    const weeksStr = prompt(t("reminder_weeks_label", state.lang), "5");
    if (weeksStr === null) return;
    const weeks = parseInt(weeksStr, 10);
    if (!weeks || weeks <= 0) return;

    const start = new Date();
    start.setDate(start.getDate() + weeks * 7);
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const fmt = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const title = state.match && !state.match.isKid ? trName(state.match.treatment.name, state.lang) : t("reminder_ics_title", state.lang);

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
      `SUMMARY:${t("reminder_ics_title", state.lang)} — ${title}`,
      "DESCRIPTION:Beauty & Coffee",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "beauty-coffee-herinnering.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);   // revoking at once can break the download on some phones
    showToast(t("reminder_saved_toast", state.lang));
  }

  function init(){
    loadLocalData();
    importMigratedData();   // stamps etc. carried over from the old sbw888.github.io address
    applyI18n();
    renderReturningUserBlock();
    showStep("welcome");
    setupEditorDrag();
    const newsletterForm = $("#newsletterForm");
    if (newsletterForm) newsletterForm.addEventListener("submit", submitNewsletter);
    setupNewsletterCard();
    setupNewsCard();
    renderReviewsCard();
    applyI18n();
    setTimeout(maybeShowInstallBanner, 2500); // give the page a moment to settle first
    renderAdventCard();
    applySeason();
    // a phone left open overnight: refresh the doors when the app comes back
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") return;
      renderAdventCard();
      applySeason();
      if ($('[data-step="advent"]').classList.contains("is-active")) renderAdvent();
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
      if (action === "to-mood") goTo("mood");
      if (action === "to-context"){ state.context = "salon"; runGeneration(); }
      if (action === "open-camera") openCamera();
      if (action === "switch-camera") switchCamera();
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
      if (action === "open-stampcard") goTo("stampcard");
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
      if (action === "dismiss-review") dismissReviewPrompt();
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
