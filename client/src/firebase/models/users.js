import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, usersColRef } from "../firebase";

export const getUsers = async () => {
  try {
    const usersCol = query(usersColRef, orderBy("name", "asc"));
    const userSnapshot = await getDocs(usersCol);
    const userList = userSnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    return userList;
  } catch (error) {
    console.error("Error getting users", error);
    return [];
  }
};
