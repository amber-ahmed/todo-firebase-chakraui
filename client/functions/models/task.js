import { onDocumentUpdated } from "firebase-functions/v2/firestore";

export const taskUpdate = onDocumentUpdated("todo/{docId}", (event) => {
  console.log(event.data);
  const newValues = event.data.after.data();

  // access a particular field as you would any JS property
  const status = newValues.status;
  if (status) {
  }

  // perform more operations ...
});
