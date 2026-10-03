/* Beauty & Coffee — service worker
   Network-first for the app's own files: online users always get the
   latest version right after a deploy (no cache clearing needed); offline
   users fall back to what was cached last, so the app keeps working.
   Requests to other sites (GoatCounter statistics, Google Fonts, the
   WordPress.com news feed) are left
   alone: they go straight to the network and are never cached here. */
const CACHE_NAME = "beauty-coffee-v47";
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
  "./assets/route-map.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS.map(u => new Request(u, { cache:"reload" }))))
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
