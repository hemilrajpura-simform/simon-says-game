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

const CACHE_NAME_AND_VERSION = "cache-files-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/sounds/winSound.wav",
  "/sounds/clickSound.wav",
  "/sounds/wrongSound.wav",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME_AND_VERSION).then((cache) => {
      console.log("Caching audio file");
      cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activation..");
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (
            key !== CACHE_NAME_AND_VERSION &&
            key !== "images" &&
            key !== "workbox-precache"
          ) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log("Serving audio from cache:", event.request.url);
        return response;
      }

      return fetch(event.request).catch(() => {
        console.log(
          "Network unavailable, and no cache for:",
          event.request.url
        );
      });
    })
  );
});
