/* Beauty & Coffee — service worker
   Network-first for the app's own files: online users always get the
   latest version right after a deploy (no cache clearing needed); offline
   users fall back to what was cached last, so the app keeps working.
   Requests to other sites (GoatCounter statistics, Google Fonts, the
   WordPress.com news feed) are left
   alone: they go straight to the network and are never cached here. */
const CACHE_NAME = "beauty-coffee-v62";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./i18n.js",
  "./data.js",
  "./lang-fr.js",
  "./app.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/logo-transparent.png",
  "./assets/lib/qr-encoder.js",
  "./assets/route-map.svg",
  "./assets/drinks/cappuccino-2-cut.webp",
  "./assets/drinks/cappuccino-2.jpg",
  "./assets/drinks/cappuccino-3-cut.webp",
  "./assets/drinks/cappuccino-3.jpg",
  "./assets/drinks/cappuccino-4-cut.webp",
  "./assets/drinks/cappuccino-4.jpg",
  "./assets/drinks/doppio.jpg",
  "./assets/drinks/doppio-cut.webp",
  "./assets/drinks/doppio-2.jpg",
  "./assets/drinks/doppio-2-cut.webp",
  "./assets/advent/algo-sens.webp",
  "./assets/advent/algo-age.webp",
  "./assets/advent/luminoclear.webp",
  "./assets/advent/goldmask.webp",
  "./assets/advent/collagen.webp",
  "./assets/advent/guinot.webp",
  "./assets/advent/eyeflash.webp",
  "./assets/advent/bathsalt.webp",
  "./assets/advent/bathsalt2.webp",
  "./assets/advent/spoolie.webp",
  "./assets/advent/buffer.webp",
  "./assets/advent/eraser.webp",
  "./assets/drinks/cappuccino-dubbel-2.jpg",
  "./assets/drinks/cappuccino-dubbel-2-cut.webp",
  "./assets/drinks/cappuccino-dubbel-3.jpg",
  "./assets/drinks/cappuccino-dubbel-3-cut.webp",
  "./assets/drinks/espresso.jpg",
  "./assets/drinks/espresso-cut.webp",
  "./assets/drinks/espresso-2.jpg",
  "./assets/drinks/espresso-2-cut.webp",
  "./assets/drinks/cappuccino-cut.webp",
  "./assets/drinks/cappuccino-dubbel.jpg",
  "./assets/drinks/cappuccino.jpg",
  "./assets/drinks/chocomelk.jpg",
  "./assets/drinks/latte-2-cut.webp",
  "./assets/drinks/latte-2.jpg",
  "./assets/drinks/latte-cut.webp",
  "./assets/drinks/latte-macchiato-2-cut.webp",
  "./assets/drinks/latte-macchiato-2.jpg",
  "./assets/drinks/latte-macchiato-cut.webp",
  "./assets/drinks/latte-macchiato.jpg",
  "./assets/drinks/latte.jpg",
  "./assets/drinks/long-black-2-cut.webp",
  "./assets/drinks/long-black-2.jpg",
  "./assets/drinks/long-black-cut.webp",
  "./assets/drinks/long-black.jpg",
  "./assets/drinks/matcha-latte-1-cut.webp",
  "./assets/drinks/matcha-latte-1.jpg",
  "./assets/drinks/matcha-latte-2-cut.webp",
  "./assets/drinks/matcha-latte-2.jpg",
  "./assets/drinks/matcha-latte-3-cut.webp",
  "./assets/drinks/matcha-latte-3.jpg",
  "./assets/drinks/matcha-latte-4-cut.webp",
  "./assets/drinks/matcha-latte-4.jpg",
  "./assets/drinks/matcha-latte-5-cut.webp",
  "./assets/drinks/matcha-latte-5.jpg",
  "./assets/drinks/mokkapot.jpg",
  "./assets/drinks/phin-2.jpg",
  "./assets/drinks/phin-3.jpg",
  "./assets/drinks/phin-4.jpg",
  "./assets/drinks/pumpkin-spice-latte-cut.webp",
  "./assets/drinks/pumpkin-spice-latte.jpg",
  "./assets/drinks/thee.jpg",
  "./assets/drinks/vietnamese-phin-cut.webp",
  "./assets/drinks/vietnamese-phin.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // one by one: a single missing file must not stop the rest from being saved
      .then(cache => Promise.allSettled(ASSETS.map(u => cache.add(new Request(u, { cache:"reload" })))))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // jsQR (QR scanner for iPhone) from the CDN: keep a copy so scanning a
  // stamp also works without signal in the salon.
  if (url.hostname === "cdn.jsdelivr.net" && url.pathname.includes("/jsqr@")){
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && res.ok){ const copy = res.clone(); caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(() => {}); }
        return res;
      }))
    );
    return;
  }
  if (url.origin !== self.location.origin) return;   // statistics, fonts, news feed: not ours
  event.respondWith(
    fetch(req, { cache:"no-cache" })
      .then(res => {
        if (res && res.ok){
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(cached => cached || caches.match("./index.html"))
      )
  );
});
