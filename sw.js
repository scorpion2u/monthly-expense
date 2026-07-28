const CACHE_NAME = 'ledger-pwa-v10'; // ⚠️ 每次发布新版本，一定要把这个版本号加一，否则浏览器不会发现sw.js变了，也就不会更新缓存

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // 新版本安装后立刻生效，不用等用户关闭所有页面
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) return caches.delete(cache); // 清掉所有旧版本缓存
        })
      );
    }).then(() => self.clients.claim()) // 立刻接管当前打开的页面
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
        })
      );
    })
  );
});
