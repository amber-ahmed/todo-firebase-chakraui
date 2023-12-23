import { logger } from "firebase-functions";
import { onRequest } from "firebase-functions/v2/https";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";
import pkg from "firebase-admin";
const { firestore } = pkg;

const app = initializeApp();
const db = firestore(); // Initialize firestore
const usersColRef = db.collection("users"); // Use db.collection() instead of collection()
const todoColRef = db.collection("todo"); // Use db.collection() instead of collection()
const subTodoColRef = db.collection("sub_tasks"); // Use db.collection() instead of collection()
const messaging = getMessaging(app);

export const addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

export const makeuppercase = onDocumentCreated(
  "/messages/{documentId}",
  (event) => {
    // Grab the current value of what was written to Firestore.
    const original = event.data.data().original;

    // Access the parameter `{documentId}` with `event.params`
    logger.log("Uppercasing", event.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing
    // asynchronous tasks inside a function
    // such as writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return event.data.ref.set({ uppercase }, { merge: true });
  }
);

export const taskUpdate = onDocumentUpdated("todo/{docId}", async (event) => {
  const newValues = event.data.after.data();
  const docId = event.data.after.id;
  console.log(docId);

  const status = newValues.status;
  if (status) {
    const payload = {
      notification: {
        title: "Task Deleted",
        body: "Recenlty Status Updated Task Deleted",
      },
    };
    const usersColRef = db.collection("users");
    const querySnapshot = await usersColRef
      .where("uid", "==", newValues.userId)
      .limit(1)
      .get();

    console.log(querySnapshot.docs[0].data());
    let userData = querySnapshot.docs[0].data();

    setTimeout(async () => {
      //   const todoDocref = doc(db, "todo", docId);
      //   await deleteDoc(todoDocref);
      //   let subTasksCol = query(subTodoColRef, where("parentDocId", "==", docId));
      //   const subTaskSnapshot = await getDocs(subTasksCol);
      //   subTaskSnapshot.docs.forEach(async (doc) => {
      //     const subTodoDocref = doc(db, "sub_tasks", doc.id);
      //     await deleteDoc(subTodoDocref);
      //   });

      const todoDocRef = db.collection("todo").doc(docId);
      await db.runTransaction(async (transaction) => {
        const todoDoc = await transaction.get(todoDocRef);
        if (!todoDoc.exists) {
          throw new Error("Todo document does not exist!");
        }
        transaction.delete(todoDocRef);
        const subTasksQuerySnapshot = await db
          .collection("sub_tasks")
          .where("parentDocId", "==", docId)
          .get();
        subTasksQuerySnapshot.forEach((subTaskDoc) => {
          const subTaskDocRef = db.collection("sub_tasks").doc(subTaskDoc.id);
          transaction.delete(subTaskDocRef);
        });
      });

      await messaging.send({
        token: userData.notificationToken,
        notification: payload.notification,
      });
    }, 2000);
  }
});
