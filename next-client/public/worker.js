console.log("Service Worker Loaded...");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Notified by Web Push Service!",
    icon: "/favicon.ico",
  });
});

self.addEventListener("notificationclick", (e) => {
  var notification = e.notification;
  var action = e.action;

  if (action === "close") {
    notification.close();
  } else {
    clients.openWindow("http://www.google.com");
    notification.close();
  }
});
