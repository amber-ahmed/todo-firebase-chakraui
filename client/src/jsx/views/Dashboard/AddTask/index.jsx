import React from "react";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
} from "@chakra-ui/react";
import CustomModal from "../../../components/CustomModal";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { createTask } from "../../../../firebase/models/task";
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
      <Checkbox {...register("status")} mt={3}>Completed</Checkbox>
    </FormControl>
  );
};
const AddTask = ({setReload}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDetails = useSelector((state) => state.account.userDetails);

  const {
    register,
    reset,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({ criteriaMode: "all", mode: "all" });

  const handleAddTask = async () => {
    try {
      const todo = {
        status: getValues("status"),
        taskName: getValues("taskName"),
        userId: userDetails.uid,
        userName: userDetails.name,
      };
      await createTask(todo);
      setReload(r=>!r)
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  const addStyle = {
    _hover: { bg: "text2" },
    bg: "secondary",
    position: "fixed",
    bottom: "20px",
    right: "30px",
    zIndex: 99,
    padding: "0px 15px",
  };
  return (
    <>
      <form>
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title={"Add Task"}
          modalBody={<ModalBody register={register} errors={errors} />}
          okText={"Add"}
          okFunction={handleSubmit(handleAddTask)}
        />
        <IconButton
          onClick={onOpen}
          sx={addStyle}
          aria-label="Call Segun"
          size="lg"
          icon={<AddIcon color={"primary"} />}
        />
      </form>
    </>
  );
};

export default AddTask;
