import React from "react";
import Alert from "../../../components/Alert";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTask } from "../../../../firebase/models/task";
import { deleteSubTask } from "../../../../firebase/models/subTask";
import { useSelector } from "react-redux";

const DeleteTask = ({  docId,parentDocId,userId, setReload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetails = useSelector((state) => state.account.userDetails);

  const handleDeleteTask = async () => {
    try {
      if (!parentDocId) await deleteTask(docId);
      else await deleteSubTask(docId,parentDocId);
      setReload((r) => !r);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Alert
        title="Delete Task"
        description="Are you sure"
        okFun={handleDeleteTask}
        isOpen={isOpen}
        onClose={onClose}
        okText="Delete"
        buttonColor="red"
      />
      <IconButton
          isDisabled={userDetails?.uid != userId}
        icon={<DeleteIcon />}
        onClick={onOpen}
        size={"sm"}
        bg={"text2"}
        isRound="true"
        mr={4}
      />
    </>
  );
};

export default DeleteTask;
