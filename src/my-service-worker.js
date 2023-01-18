self.addEventListener("fetch", function (event) {
  console.log("event.request.url", event.request.url);
  const url = new URL(event.request.url);
  if (url.host === "cache-fs") {
    event.respondWith(
      (async () => {
        const cache = await caches.open("cache-fs");
        return cache.match(url);
      })()
    );
  }
});

self.addEventListener("install", function () {
  console.log("install");
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("activate");
});

importScripts("/ngsw-worker.js");
