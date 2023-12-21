import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db, usersColRef } from "../firebase";
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(usersColRef, where("uid", "==", user.uid));
    const docs = await getDocs(q);
    let userData;
    if (docs.docs.length === 0) {
      userData = await addDoc(usersColRef, {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    localStorage.setItem("uid", user.uid);
    return userData?.id;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res);
    const user = res.user;
    localStorage.setItem("uid", user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerName = async (name, docId) => {
  try {
    console.log(docId);
    const userDocref = doc(db, "users", docId);
    await updateDoc(userDocref, {
      name,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(usersColRef, {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    localStorage.setItem("uid", user.uid);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
  localStorage.clear();
};
const userData = async () => {
  try {
    const uid = localStorage.getItem("uid");
    console.log(uid);
    const q = query(usersColRef, where("uid", "==", uid));
    const docs = await getDocs(q);
    console.log(docs.docs);
    let userData = docs?.docs[0]?.data();
    if (userData) return userData;
    return Promise.reject('user not found')
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export {
  userData,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  registerName,
  sendPasswordReset,
  logout,
};
