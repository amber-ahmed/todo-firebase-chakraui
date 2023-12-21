import { Box, Collapse } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TodoCom from "./TodoCom";
import { getSubTasks } from "../../../../../firebase/models/subTask";

const SubTodos = ({ show, reload, setReload, parentTodoDocId }) => {
  const [subTodos, setSubTodos] = useState([]);

  useEffect(() => {
    getSubTasks(parentTodoDocId)
      .then((subTodos) => {
        console.log(subTodos);
        setSubTodos(subTodos);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [reload]);
  return (
    <Collapse mt={4} in={show} animateOpacity>
      <Box bg="text2">
        {subTodos.map((subTodo) => (
          <TodoCom
            setReload={setReload}
            key={subTodo.docId}
            reload
            todo={subTodo}
          />
        ))}
      </Box>
    </Collapse>
  );
};

export default SubTodos;
