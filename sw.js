/* Carnet de jeux — service worker. VERSION changes on every release. Only Cache Storage is managed here; localStorage (game data) is never touched. */
const VERSION = 'v10';
const APP = 'carnet-app-' + VERSION, FONTS = 'carnet-fonts';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png', './firebase-13.1.0.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(APP).then(c => c.addAll(ASSETS.map(u => new Request(u, {cache: 'reload'}))))); });
self.addEventListener('message', e => { if(e.data === 'skip') self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('carnet-app-') && k !== APP).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin === location.origin){
    if(req.mode === 'navigate'){ e.respondWith(caches.match('./index.html').then(r => r || fetch(req))); return; }
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
    return;
  }
  if(url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(c => c.match(req).then(hit => hit || fetch(req).then(res => { c.put(req, res.clone()); return res; }))));
  }
});
