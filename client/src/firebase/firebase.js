import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getMessaging, getToken} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCPAmRGxpskctljXtODbsvy_LXxL508g-w",
  authDomain: "todo-6a299.firebaseapp.com",
  projectId: "todo-6a299",
  storageBucket: "todo-6a299.appspot.com",
  messagingSenderId: "256200278284",
  appId: "1:256200278284:web:f362afc533ca897fc04929",
  measurementId: "G-9Z27QT7L1T",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const usersColRef = collection(db, "users")
const todoColRef = collection(db, "todo")
const subTodoColRef = collection(db, "sub_tasks")
const messaging = getMessaging(app);



export {app, auth, db,usersColRef,todoColRef,subTodoColRef,messaging };
