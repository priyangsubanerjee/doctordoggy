importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBl5wGQfcCgdGkHa5hH9BweWTf3TU4XJRk",
  authDomain: "massive-boulder-394311.firebaseapp.com",
  projectId: "massive-boulder-394311",
  storageBucket: "massive-boulder-394311.appspot.com",
  messagingSenderId: "61426030462",
  appId: "1:61426030462:web:000c92171385846bf7452f",
  measurementId: "G-085VV3TNDS",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "./logoDark.png",
    tag: "notification-1",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
