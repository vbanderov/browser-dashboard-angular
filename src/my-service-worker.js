self.addEventListener("fetch", function (event) {
  console.log("event.request.url", event.request.url);
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/cache-fs")) {
    console.log("true");
    event.respondWith(
      (async () => {
        const cache = await caches.open("v1");
        console.log(cache);
        const backgroundFileResponse = await cache.match("/user-background");
        console.log(backgroundFileResponse);
        return backgroundFileResponse;
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
