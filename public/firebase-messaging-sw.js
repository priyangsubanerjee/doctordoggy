// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: "AIzaSyBl5wGQfcCgdGkHa5hH9BweWTf3TU4XJRk",
  authDomain: "massive-boulder-394311.firebaseapp.com",
  projectId: "massive-boulder-394311",
  storageBucket: "massive-boulder-394311.appspot.com",
  messagingSenderId: "61426030462",
  appId: "1:61426030462:web:000c92171385846bf7452f",
  measurementId: "G-085VV3TNDS",
});
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./logoDark.png",
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
