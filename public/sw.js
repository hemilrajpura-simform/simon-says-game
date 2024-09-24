/* eslint-disable no-restricted-globals */

self.addEventListener("push", function (event) {
  const data = event.data ? event.data.text() : "New notification";

  const options = {
    body: data,
    icon: "android-icon-192x192",
    badge: "android-icon-192x192",
  };

  event.waitUntil(self.registration.showNotification("Simon Says", options));
});

const CACHE_NAME = "cache-files";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/sounds/winSound.wav",
  "/sounds/clickSound.wav",
  "/sounds/wrongSound.wav",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching audio file");
      cache.add("/");
      cache.add("/static/js/bundle.js");
      cache.add("/index.html");
      cache.add("/static/css/main.css");
      cache.add("/sounds/winSound.wav");
      cache.add("/sounds/clickSound.wav");
      cache.add("/sounds/wrongSound.wav");
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        // Serve from cache if available, otherwise fetch from network
        return (
          cachedResponse ||
          fetch(event.request).then((networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              // Cache JS/CSS files dynamically only for files from /static/ path
              if (event.request.url.includes("/static/")) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          })
        );
      })
      .catch(() => {
        // Fallback for offline (optional)
        if (event.request.url.endsWith(".wav")) {
          return caches.match("/sounds/winSound.wav");
        }
        return caches.match("/");
      })
  );
});
