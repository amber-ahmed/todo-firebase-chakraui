import React from "react";
import TodoCom from "./TodoCom";
import SubTodos from "./SubTodos";

const Todo = ({ reload, setReload, todo }) => {
  const [show, setShow] = React.useState(false);

  console.log(todo.docId);
  return (
    <>
      <TodoCom
        isParent={true}
        show={show}
        setShow={setShow}
        setReload={setReload}
        todo={todo}
      />
      <SubTodos
        show={show}
        reload={reload}
        setReload={setReload}
        parentTodoDocId={todo.docId}
      />
    </>
  );
};

export default Todo;
