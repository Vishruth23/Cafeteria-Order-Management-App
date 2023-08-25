self.addEventListener('fetch', event => {
    // Cache-first strategy for resources
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  });

  self.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: 'path/to/icon.png', // Icon to display in the notification
      // Other options like title, badge, etc.
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

  self.addEventListener('notificationclick', event => {
    event.notification.close(); // Close the notification
    // Add your custom logic here, e.g., open a specific page
    // or execute an action when the user clicks the notification
  });