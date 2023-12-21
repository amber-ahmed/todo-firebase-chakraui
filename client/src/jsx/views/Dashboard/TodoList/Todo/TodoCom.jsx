import {
  Checkbox,
  Flex,
  Text,
  IconButton,
  Box,
  Avatar,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DeleteTask from "../../DeleteTask";
import EditTask from "../../EditTask";
import { updateTask } from "../../../../../firebase/models/task";
import { updateSubTask } from "../../../../../firebase/models/subTask";
import AddSubTask from "../../AddTask/AddSubTask";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";

const TodoCom = ({ show, setShow, isParent, todo, setReload }) => {
  const [status, setStatus] = useState(todo.status);
  const userDetails = useSelector((state) => state.account.userDetails);

  const updateStatus = async (e) => {
    try {
      const data = {
        status: e.target.checked,
      };
      if (isParent) await updateTask(data, todo.docId);
      else await updateSubTask(data, todo.docId);
      setStatus((s) => !s);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex justifyContent={"space-between"}>
      <Flex padding={2} justifyContent={"space-around"}>
        <Checkbox onChange={updateStatus} isChecked={status} />
        <Text
          as={status ? "s" : ""}
          sx={{ color: "primary", padding: 2, textDecorationColor: "text2" }}
        >
          {todo.taskName}
        </Text>
      </Flex>
      <Flex direction={"column"}>
        <Flex padding={2} justifyContent={"space-around"}>
          {isParent && (
            <>
              <IconButton
                icon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
                onClick={() => setShow((s) => !s)}
                size={"sm"}
                bg="transparent"
                _hover={{
                  bg: "text2",
                }}
                mr={2}
              />
              <AddSubTask
                setReload={setReload}
                userId={todo.userId}
                parentDocId={todo.docId}
              />
            </>
          )}
          <DeleteTask
            parentDocId={todo.parentDocId}
            userId={todo.userId}
            setReload={setReload}
            docId={todo.docId}
          />
          <EditTask
            isParent={isParent}
            userId={todo.userId}
            setReload={setReload}
            todo={todo}
          />
        </Flex>
        {isParent && <Flex justifyContent={"end"} alignItems={"center"}>
          <Avatar size={"2xs"} mr={2} />
          <Text textAlign={"right"} mr={4}>
            {todo.userId == userDetails?.uid ? "Me" : todo.userName}
          </Text>
        </Flex>}
      </Flex>
    </Flex>
  );
};

export default TodoCom;
