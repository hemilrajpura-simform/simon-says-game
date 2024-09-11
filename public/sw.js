/* eslint-disable no-restricted-globals */

self.addEventListener("push", function (event) {
  const data = event.data ? event.data.text() : "New notification";

  const options = {
    body: data,
    // icon: "android-icon-192x192",
    // badge: "android-icon-192x192",
  };

  event.waitUntil(self.registration.showNotification("Simon Says", options));
});
