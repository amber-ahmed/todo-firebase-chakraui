import React, { useEffect } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
} from "@chakra-ui/react";
import CustomModal from "../../../components/CustomModal";
import { useDisclosure } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { updateTask } from "../../../../firebase/models/task";
import { updateSubTask } from "../../../../firebase/models/subTask";
import { useSelector } from "react-redux";

const ModalBody = ({ register, errors }) => {
  return (
    <FormControl isInvalid={errors.taskName}>
      <FormLabel htmlFor="taskName">Task Name</FormLabel>
      <Input
        id="taskName"
        placeholder="Task Name"
        {...register("taskName", {
          required: "This is required",
        })}
      />
      <FormErrorMessage>
        {errors.taskName && errors.taskName.message}
      </FormErrorMessage>
    </FormControl>
  );
};
const EditTask = ({ isParent, userId, setReload, todo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetails = useSelector((state) => state.account.userDetails);

  const {
    register,
    reset,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "all" });

  const handleUpdateTask = async () => {
    try {
      const data = {
        status: getValues("status"),
        taskName: getValues("taskName"),
      };
      if (isParent) await updateTask(data, todo.docId);
      else await updateSubTask(data, todo.docId);
      setReload((r) => !r);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setValue("status", todo.status);
    setValue("taskName", todo.taskName);
  }, [todo]);
  return (
    <>
      <form>
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title={"Update Task"}
          modalBody={<ModalBody register={register} errors={errors} />}
          okText={"Update"}
          okFunction={handleSubmit(handleUpdateTask)}
        />
        <IconButton
          isDisabled={userDetails?.uid != userId}
          onClick={onOpen}
          icon={<EditIcon />}
          size={"sm"}
          bg={"text2"}
          isRound="true"
        />
      </form>
    </>
  );
};

export default EditTask;
