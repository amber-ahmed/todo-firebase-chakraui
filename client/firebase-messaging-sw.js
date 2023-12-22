importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCPAmRGxpskctljXtODbsvy_LXxL508g-w",
  authDomain: "todo-6a299.firebaseapp.com",
  projectId: "todo-6a299",
  storageBucket: "todo-6a299.appspot.com",
  messagingSenderId: "256200278284",
  appId: "1:256200278284:web:f362afc533ca897fc04929",
  measurementId: "G-9Z27QT7L1T",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});