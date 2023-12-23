import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  runTransaction,
  writeBatch,
} from "firebase/firestore";
import { db, subTodoColRef, todoColRef } from "../firebase";

export const createTask = async (todo) => {
  try {
    const snapshot = await getCountFromServer(todoColRef);
    const count = snapshot.data().count;
    const res = await addDoc(todoColRef, {
      createdAt: serverTimestamp(),
      sequence: count + 1,
      status: todo.status,
      taskName: todo.taskName,
      userId: todo.userId,
      userName: todo.userName,
    });
  } catch (error) {
    console.error("Error creating todo", error);
  }
};

export const updateTask = async (data, docId) => {
  try {
    const todoDocref = doc(db, "todo", docId);
    await updateDoc(todoDocref, data);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const deleteTask = async (docId) => {
  try {
    // const todoDocref = doc(db, "todo", docId);
    // await deleteDoc(todoDocref);

    // let subTasksCol = query(subTodoColRef, where("parentDocId", "==", docId));
    // const subTaskSnapshot = await getDocs(subTasksCol);
    // subTaskSnapshot.docs.forEach(async (doc) => {
    //   const subTodoDocref = doc(db, "sub_tasks", doc.id);
    //   await deleteDoc(subTodoDocref);
    // });

    await runTransaction(db, async (transaction) => {
      const todoDocref = doc(db, "todo", docId);
      const todoDoc = await transaction.get(todoDocref);
      if (!todoDoc.exists) {
        throw new Error("Todo document does not exist!");
      }
      transaction.delete(todoDocref);
      const subTasksCol = query(
        subTodoColRef,
        where("parentDocId", "==", docId)
      );
      const subTaskSnapshot = await getDocs(subTasksCol);

      subTaskSnapshot.forEach((subTaskDoc) => {
        const subTaskDocRef = doc(db, "sub_tasks", subTaskDoc.id);
        transaction.delete(subTaskDocRef);
      });
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const getTasks = async (statusFilter, userFilter, sort) => {
  let sortField, sortMethod;
  if (sort == "nameAsc") {
    sortField = "taskName";
    sortMethod = "asc";
  } else if (sort == "nameDesc") {
    sortField = "taskName";
    sortMethod = "desc";
  }
  if (sort == "createdFirst") {
    sortField = "createdAt";
    sortMethod = "asc";
  }
  if (sort == "createdLast") {
    sortField = "createdAt";
    sortMethod = "desc";
  }
  try {
    console.log(userFilter);
    let tasksCol = query(todoColRef, orderBy("sequence", "asc"));

    if (statusFilter != "all" && userFilter == "all" && sort == "sequence") {
      tasksCol = query(
        todoColRef,
        where("status", "==", statusFilter == "completed" ? true : false),
        orderBy("sequence", "asc")
      );
    } else if (
      userFilter != "all" &&
      sort == "sequence" &&
      statusFilter == "all"
    ) {
      tasksCol = query(
        todoColRef,
        where("userId", "==", userFilter),
        orderBy("sequence", "asc")
      );
    } else if (
      sort != "sequence" &&
      statusFilter == "all" &&
      userFilter == "all"
    ) {
      tasksCol = query(todoColRef, orderBy(sortField, sortMethod));
    } else if (
      statusFilter != "all" &&
      userFilter != "all" &&
      sort == "sequence"
    ) {
      tasksCol = query(
        todoColRef,
        where("status", "==", statusFilter == "completed" ? true : false),
        where("userId", "==", userFilter),
        orderBy("sequence", "asc")
      );
    } else if (
      statusFilter != "all" &&
      sort != "sequence" &&
      userFilter == "all"
    ) {
      tasksCol = query(
        todoColRef,
        where("status", "==", statusFilter == "completed" ? true : false),
        orderBy(sortField, sortMethod)
      );
    } else if (
      userFilter != "all" &&
      sort != "sequence" &&
      statusFilter == "all"
    ) {
      let { sortField, sortMethod } = getSortFieldnMethod(sort);
      tasksCol = query(
        todoColRef,
        where("userId", "==", userFilter),
        orderBy(sortField, sortMethod)
      );
    } else if (
      statusFilter != "all" &&
      userFilter != "all" &&
      sort != "sequence"
    ) {
      tasksCol = query(
        todoColRef,
        where("status", "==", statusFilter == "completed" ? true : false),
        where("userId", "==", userFilter),
        orderBy(sortField, sortMethod)
      );
    }

    const taskSnapshot = await getDocs(tasksCol);
    const taskList = taskSnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    return taskList;
  } catch (error) {
    console.error("Error getting tasks", error);
    return [];
  }
};
export const reArrangeTodos = async (source, destination) => {
  try {
    let tasksCol = query(
      todoColRef,
      where("sequence", ">", source),
      where("sequence", "<=", destination),
      orderBy("sequence", "asc")
    );
    if (destination < source)
      tasksCol = query(
        todoColRef,
        where("sequence", ">=", destination),
        where("sequence", "<", source),
        orderBy("sequence", "asc")
      );

    const effectedTodoCol = query(todoColRef, where("sequence", "==", source));
    const effectTodoSnapshot = await getDocs(effectedTodoCol);
    const effectedTodoId = effectTodoSnapshot.docs[0].id;
    const effectedTodoDocref = doc(db, "todo", effectedTodoId);

    const taskSnapshot = await getDocs(tasksCol);
    const batch = writeBatch(db);
    taskSnapshot.docs.forEach(async (ele) => {
      const todoDocref = doc(db, "todo", ele.id);
      const sequence = ele.data().sequence;
      let action = -1;
      if (destination < source) action = 1;
      await batch.update(todoDocref, { sequence: sequence + action });
    });
    await batch.update(effectedTodoDocref, { sequence: destination });
    return batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const getOfflineData = async (setTasksCount) => {
  try {
    const q = query(todoColRef);
    const initialSnapshot = await getDocs(q);
    const initialCount = initialSnapshot.docs.length;
    console.log("Initial count:", initialCount);

    setTasksCount(initialCount); // Set initial count

    onSnapshot(q, (snapshot) => {
      const updatedCount = snapshot.docs.length;
      setTasksCount(updatedCount);
      console.log("Offline count:", updatedCount);
    });

    // Return the initial count
    return initialCount;
  } catch (error) {
    console.error("Error getting documents: ", error);
    // Handle errors appropriately
    return null;
  }
};
