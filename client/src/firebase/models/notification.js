import { getToken } from "firebase/messaging";
import { db, messaging, usersColRef } from "../firebase";
import { doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";

export const requestPermission = () => {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        return getToken(messaging, {
          vapidKey:
            "BBCnoep3iGoa4OP9QWm1h1-a3xtV3DUXe7AdxSAv_Uex9ni7mlfZZrSmqKd8qF3IMvBwfa0KQuRRL3rAxtBjA94",
        }).then(async (fcmToken) => {
          const uid = localStorage.getItem("uid");
          if (fcmToken && uid) {
            localStorage.setItem("notificationToken", fcmToken);
            const q = query(
              usersColRef,
              where("uid", "==", uid),
              limit(1)
            );
            const querySnapshot = await getDocs(q);
            const docId = querySnapshot.docs[0].id;
            const userDocRef = doc(db, "users", docId);
            await updateDoc(userDocRef, { notificationToken: fcmToken });
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
