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
import { createSubTask } from "../../../../firebase/models/subTask";

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
      <Checkbox {...register("status")} mt={3}>
        Completed
      </Checkbox>
    </FormControl>
  );
};
const AddSubTask = ({ parentDocId,userId, setReload }) => {
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
        parentDocId,
      };
      await createSubTask(todo);
      setReload((r) => !r);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form>
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          title={"Add Sub Task"}
          modalBody={<ModalBody register={register} errors={errors} />}
          okText={"Add"}
          okFunction={handleSubmit(handleAddTask)}
        />
        <IconButton
          isDisabled={userDetails?.uid != userId}
          icon={<AddIcon />}
          onClick={onOpen}
          size={"sm"}
          bg={"text2"}
          isRound="true"
          mr={4}
        />
      </form>
    </>
  );
};

export default AddSubTask;
