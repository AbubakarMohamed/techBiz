const CACHE_NAME = "techbiz-v1.0.1";
const STATIC_CACHE_NAME = "techbiz-static-v1";
const CRITICAL_ASSETS = [
  "/",
  "/favicon.ico",
  "/opt/artboard-opt.webp",
  "/opt/certificates/ISO2015-640w.webp",
  "/opt/certificates/ISO2022-640w.webp",
  "/opt/certificates/CTA-640w.webp",
  "/opt/certificates/ODPC-640w.webp",
  "/opt/calligraphy-640w.webp",
  "/opt/noise-640w.webp",
  "/company-profile.pdf",
];

// Install event - cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .open(STATIC_CACHE_NAME)
        .then((cache) => {
          return cache.addAll(CRITICAL_ASSETS);
        })
        .catch((error) => {
          // Don't fail installation if some assets fail
          return Promise.resolve();
        }),
    ]),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Skip API routes
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache if not a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Cache successful responses for static assets
          const responseToCache = response.clone();
          const url = event.request.url;

          // Cache Next.js static assets and pages
          if (
            url.includes("/_next/static/") ||
            url.includes(".css") ||
            url.includes(".js") ||
            url.includes(".woff") ||
            url.includes(".woff2") ||
            url.endsWith("/") ||
            url.includes("/about") ||
            url.includes("/contact")
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        })
        .catch(() => {
          // Return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return (
              caches.match("/offline.html") ||
              new Response("Offline", {
                status: 503,
                statusText: "Service Unavailable",
              })
            );
          }
        });
    }),
  );
});
