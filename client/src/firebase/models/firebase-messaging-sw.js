import { getToken, onMessage, getMessaging } from "firebase/messaging";
import { messaging } from "../firebase";
import { onBackgroundMessage } from "firebase/messaging/sw";

export const requestForToken = async () => {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return getToken(messaging, {
    vapidKey:
      "BBCnoep3iGoa4OP9QWm1h1-a3xtV3DUXe7AdxSAv_Uex9ni7mlfZZrSmqKd8qF3IMvBwfa0KQuRRL3rAxtBjA94",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("token", currentToken);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

export const onBackgroundMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging();
    onBackgroundMessage(messaging, (payload) => {
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

      self.registration.showNotification(
        notificationTitle,
        notificationOptions
      );
    });
  });
