self.addEventListener('fetch', event => {

    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  });

  self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: 'path/to/icon.png', 
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

  self.addEventListener('notificationclick', event => {
    event.notification.close(); // Close the notification

  });