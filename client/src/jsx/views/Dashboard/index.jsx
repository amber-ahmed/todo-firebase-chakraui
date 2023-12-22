import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TodoList from "./TodoList";
import { getOfflineData, getTasks } from "../../../firebase/models/task";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, app, messaging } from "../../../firebase/firebase";
import Header from "./Header";
import { onMessage } from "firebase/messaging";

const Dashboard = () => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log(payload);
    });
    return ()=>unsubscribe()
  }, []);

  // useEffect(() => {
  //   const tasksCollection = todoColRef;
  //   const unSubscribe = onSnapshot(
  //     query(tasksCollection),
  //     (snapshot) => {
  //       const tasks = snapshot.docs.map((doc) => {
  //         console.log({ id: doc.id, ...doc.data() });
  //         return { id: doc.id, ...doc.data() };
  //       });
  //       // Use 'tasks' as needed, for example, set it in the component state
  //     }
  //   );

  //   return unSubscribe;
  // }, []);
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [sort, setSort] = useState("sequence");

  useEffect(() => {
    getTasks(statusFilter, userFilter, sort)
      .then((tasks) => {
        console.log(tasks);
        setTodos(tasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [reload, statusFilter, userFilter, sort]);
  return (
    <>
      <Header
        setStatusFilter={setStatusFilter}
        setUserFilter={setUserFilter}
        setSort={setSort}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        reload={reload}
        setReload={setReload}
      />
      <AddTask setReload={setReload} />
    </>
  );
};

export default Dashboard;
