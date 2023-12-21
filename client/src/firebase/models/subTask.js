import { db, subTodoColRef } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  arrayRemove,
  updateDoc,
  where,
  writeBatch,
  runTransaction,
} from "firebase/firestore";
export const createSubTask = async (todo) => {
  try {
    await runTransaction(db, async (transaction) => {
      console.log(todo);
      const snapshot = await getCountFromServer(subTodoColRef);
      const count = snapshot.data().count;
      const addDocRef = await addDoc(subTodoColRef, {
        createdAt: serverTimestamp(),
        sequence: count + 1,
        status: todo.status,
        taskName: todo.taskName,
        userId: todo.userId,
        userName: todo.userName,
        parentDocId: todo.parentDocId,
      });

      const todoColRef = doc(db, "todo", todo.parentDocId);
    });
  } catch (error) {
    console.error("Error creating todo", error);
  }
};

export const getSubTasks = async (parentDocId) => {
  try {
    console.log(parentDocId);
    let subTasksCol = query(
      subTodoColRef,
      where("parentDocId", "==", parentDocId),
      orderBy("sequence", "asc")
    );
    const subTaskSnapshot = await getDocs(subTasksCol);
    const subTaskList = subTaskSnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    return subTaskList;
  } catch (error) {
    console.error("Error getting subTasks", error);
    return [];
  }
};
export const updateSubTask = async (data, docId) => {
  try {
    const subTodoColRef = doc(db, "sub_tasks", docId);
    await updateDoc(subTodoColRef, data);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export const deleteSubTask = async (docId, parentDocId) => {
  try {
    await runTransaction(db, async (transaction) => {
      const subTodoColRef = doc(db, "sub_tasks", docId);
      await deleteDoc(subTodoColRef);
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
