/* Carnet de jeux — service worker. VERSION changes on every release. Only Cache Storage is managed here; localStorage (game data) is never touched. */
const VERSION = 'v36';
const APP = 'carnet-app-' + VERSION, FONTS = 'carnet-fonts';
/* v36 : les polices sont servies par le site et mises en cache avec l'app (plus d'appel à Google au démarrage). */
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './firebase-13.1.0.js',
  './figtree.woff2', './instrument-serif.woff2', './instrument-serif-italic.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(APP).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'}))))); });
self.addEventListener('message', e => { if(e.data === 'skip') self.skipWaiting(); });
self.addEventListener('activate', e => {
  /* Seulement nos propres caches (préfixe carnet-) : l'app cinémas partage l'origine. carnet-fonts (anciennes polices Google) ne sert plus. */
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => (k.startsWith('carnet-app-') && k !== APP) || k === FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin === location.origin){
    if(req.mode === 'navigate'){ e.respondWith(caches.match('./index.html', {cacheName: APP}).then(r => r || caches.match('./index.html')).then(r => r || fetch(req))); return; }
    /* ignoreSearch : icon-180.png?v=10 sert la copie en cache au lieu d'attendre le réseau. */
    e.respondWith(caches.match(req, {cacheName: APP, ignoreSearch: true}).then(r => r || fetch(req)));
    return;
  }
});
