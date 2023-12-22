import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

export const requestPermission = () => {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        return getToken(messaging, {
          vapidKey:
            "BBCnoep3iGoa4OP9QWm1h1-a3xtV3DUXe7AdxSAv_Uex9ni7mlfZZrSmqKd8qF3IMvBwfa0KQuRRL3rAxtBjA94",
        }).then((fcmToken) => {
          if (fcmToken) {
            console.log(fcmToken);
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onNotifcation = (payload) => {
  console.log(payload);
};
