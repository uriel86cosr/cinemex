// Define el nombre de la caché
const CACHE_NAME = "Boveda1";
const CACHE_NAME2 = "Imagenes";



// Archivos requeridos para que la aplicación funcione fuera de línea
self.addEventListener("install", (event) => {
  const recursos = caches.open(CACHE_NAME).then((cache) => {
    console.log("Caching files");
    cache.add("/");
    cache.add("index.html");
    cache.add("js/app.js");
    cache.add("css/style.css");
    cache.add("manifest.json");
    cache.add(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    );
  });

  const imagenes = caches.open(CACHE_NAME2).then((cache) => {
    console.log("Caching images");
    cache.add("/");
    cache.add("assets/imgs/default.jpg");
    cache.add("assets/imgs/presagio.jpg");
    cache.add("assets/imgs/pokemon.jpg");
    cache.add("assets/imgs/llamas.jpg");
    cache.add("assets/imgs/Norbit.jpg");
    cache.add("assets/imgs/dragonball.jpg");
  });

  event.waitUntil(recursos, imagenes);
});

self.addEventListener('fetch',(event)  => {

  //estrategia 0 only net
  // estrategia 1 only cache 
  // estrategia 2 first cache, then network
  // estrategia 3 first network then cache

  // estrategia 3

  const respuesta = fetch(event.request).then((newResp)=>{
      caches.open(CACHE_NAME).then((cache) => {

          cache.put(event.request, newResp);
      });

      return newResp.clone();
  }).catch(err=>{
      return caches.match(event.request);
  })
  event.respondWith(respuesta);
});

  /*const respuesta2 = caches.match(event.request).then((res2) => {
    if (res2) return res2;

    return fetch(event.request).then((newResp2) => {
      caches.open(CACHE_NAME2).then((cache) => {
        cache.put(event.request, newResp2);
      });

      return newResp2.clone();
    });
  });

  event.respondWith(respuesta, respuesta2);
});
*/


