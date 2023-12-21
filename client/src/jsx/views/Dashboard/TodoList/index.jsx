import { ListItem, List, Card } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {reArrangeTodos } from "../../../../firebase/models/task";
import Todo from "./Todo";

const TodoList = ({todos,setTodos,reload, setReload }) => {
  const reorder = useMemo(
    () => (startIndex, endIndex) => {
      let result = Array.from(todos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      result = result.map((ele, index) => {
        return { ...ele, order: index };
      });
      return result;
    },
    [todos]
  );
  const onDragEnd = async (result) => {
    let source = result.source?.index;
    let destination = result.destination?.index;
    console.log(source,destination)
    if ((!destination && !source )|| source === destination) return;
    await reArrangeTodos(source + 1, destination + 1);
    const reorderedItems = reorder(source, destination);
    setTodos(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <List>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className=""
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable
                  key={todo.sequence}
                  draggableId={todo.sequence.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        width={"75%"}
                        marginX="auto"
                        sx={{ marginY: 2, bg: "secondary", boxShadow: "lg" }}
                      >
                        <ListItem>
                          <Todo reload={reload} setReload={setReload} todo={todo} />
                        </ListItem>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </List>
    </DragDropContext>
  );
};

export default TodoList;
