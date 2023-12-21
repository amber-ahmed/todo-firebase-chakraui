import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TodoList from "./TodoList";
import { getTasks } from "../../../firebase/models/task";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db,app } from "../../../firebase/firebase";
import Header from "./Header";
import {
  onBackgroundMessageListener,
  onMessageListener,
  requestForToken,
} from "../../../firebase/models/firebase-messaging-sw";
import { Text } from "@chakra-ui/react";
import { getMessaging, onMessage } from "firebase/messaging";

const Dashboard = () => {
  const [reload, setReload] = useState(false);

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
  const [message, setMessage] = useState("");

  useEffect(() => {
    requestForToken();

    onMessageListener()
      .then((payload) => {
        console.lgo({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        });
        setMessage("hi");
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  const messaging = getMessaging(app);
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
  });

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

  // onBackgroundMessageListener()
  // .then((payload) => {
  //   console.lgo({
  //     title: payload?.notification?.title,
  //     body: payload?.notification?.body,
  //   });
  //   alert('hi')
  // })
  // .catch((err) => console.log("failed: ", err));
  return (
    <>
      <Header
        setStatusFilter={setStatusFilter}
        setUserFilter={setUserFilter}
        setSort={setSort}
      />
      <Text color={"white"}>{message}</Text>
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
