const cacheName = 'cs1.0.8';

self.addEventListener('install', e => {
 console.log('Service Worker Installed');
});

self.addEventListener('activate', e => {
 e.waitUntil(
   caches.keys().then(cacheNames=> {
      return Promise.all(
        cacheNames.map(cache=>{
          if(cache != cacheName){
            return caches.delete(cache);
          }
        })
      )
    })
 )
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        const resClone = res.clone();
        caches
      .open(cacheName)
      .then(cache=>{        
       if(e.request.url.includes('socket.io/socket.io'))
          cache.put(e.request,resClone)
       else if(!e.request.url.includes('socket.io'))
          cache.put(e.request,resClone)
       });
       return res;
     }).catch(err=>caches.match(e.request).then(res=>res))
  );
});