/* ==================================================================
   service-worker.js — le MODE HORS LIGNE
   ------------------------------------------------------------------
   Un "service worker" est un petit script que le navigateur garde en
   mémoire. Il intercepte les demandes de fichiers et peut les servir
   depuis un cache local -> l'app s'ouvre même sans connexion.

   ⚠️ Si tu modifies l'app plus tard, change le numéro de version
   ci-dessous (CACHE = "apero-games-v2", etc.) pour forcer la mise à
   jour sur les téléphones.
   ================================================================== */

const CACHE = "apero-games-v8";

// La liste des fichiers à garder pour le hors-ligne (chemins relatifs)
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./js/storage.js",
  "./js/data.js",
  "./js/ui.js",
  "./js/ai.js",
  "./js/games/basics.js",
  "./js/games/party.js",
  "./js/games/content.js",
  "./js/games/amongus.js",
  "./js/games/loupgarou.js",
  "./js/main.js",
];

// À l'installation : on met tous les fichiers en cache
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

// À l'activation : on supprime les anciens caches (autres versions)
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// À chaque requête : on répond depuis le cache si possible, sinon le réseau
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
