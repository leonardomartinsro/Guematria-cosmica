const CACHE_NAME = "guematria-cosmica-v1";

const ARQUIVOS_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./imagens/alfabeto.png"
];


self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(function(cache) {

                return cache.addAll(ARQUIVOS_CACHE);

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys()
            .then(function(cacheNames) {

                return Promise.all(

                    cacheNames.map(function(cacheName) {

                        if (cacheName !== CACHE_NAME) {

                            return caches.delete(cacheName);

                        }

                    })

                );

            })

    );

    self.clients.claim();

});


self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)
            .then(function(resposta) {

                if (resposta) {

                    return resposta;

                }

                return fetch(event.request);

            })

    );

});