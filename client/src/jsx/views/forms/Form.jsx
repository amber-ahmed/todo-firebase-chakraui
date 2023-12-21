import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Link,
  Select,
  Text,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const Form = () => {
  const {
    register,
    reset,
    formState: { errors },
    control,
    getValues,
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      familyMembers: [{ name: "", relation: "" }],
    },
  });
  const submit = () => {
    console.log("form submitted");
    console.log(getValues());
    alert("form submitted");
    reset();
  };
  const addFamilyMember = () => {
    append({ name: "", relation: "" });
  };
  const deleteFamilyMember = (index) => {
    remove(index);
  };
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control,
      rules: {
        minLength: 1,
      },
      name: "familyMembers",
    });
  return (
    <Card
      bg={"secondary"}
      borderRadius={5}
      sx={{ width: "70%", marginX: "auto" }}
    >
      <CardBody>
        <form>
          <Flex direction={"column"} gap={5}>
            <FormControl isInvalid={errors.name} isRequired>
              <Input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: 2,
                  maxLength: 150,
                })}
                _placeholder={{ color: "primary" }}
                placeholder="Name"
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.age}>
              <Input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  pattern: {
                    value: /^(?:150|[0-9]|[1-9][0-9]|1[0-4][0-9])$/,
                    message: "Please enter age between 0 to 150",
                  },
                })}
                _placeholder={{ color: "primary" }}
                placeholder="Age"
              />
              <FormErrorMessage>
                {errors.age && errors.age.message}
              </FormErrorMessage>
            </FormControl>

            <Card bg={"text2"}>
              <CardHeader>School Details</CardHeader>
              <CardBody>
                <Flex gap={2}>
                  <FormControl isInvalid={errors.school?.name} isRequired>
                    <Input
                      type="text"
                      {...register("school.name", {
                        required: "School Name is required",
                        minLength: 1,
                        maxLength: 150,
                      })}
                      _placeholder={{ color: "primary" }}
                      placeholder="School Name"
                    />
                    <FormErrorMessage>
                      {errors.school?.name && errors.school?.name.message}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors.school?.standard} isRequired>
                    <Select
                      {...register("school.standard", {
                        required: "Please select standard",
                      })}
                      placeholder="Select standard"
                    >
                      <option value={"lkg"}>lkg</option>
                      <option value={"ukg"}>ukg</option>
                      <option value={"1"}>1 standard</option>
                      <option value={"2"}>2 standard</option>
                      <option value={"3"}>3 standard</option>
                      <option value={"4"}>4 standard</option>
                      <option value={"5"}>5 standard</option>
                      <option value={"6"}>6 standard</option>
                      <option value={"7"}>7 standard</option>
                      <option value={"8"}>8 standard</option>
                      <option value={"9"}>9 standard</option>
                      <option value={"10"}>10 standard</option>
                      <option value={"11"}>11 standard</option>
                      <option value={"12"}>12 standard</option>
                    </Select>
                    <FormErrorMessage>
                      {errors.school?.standard &&
                        errors.school?.standard.message}
                    </FormErrorMessage>
                  </FormControl>
                </Flex>
              </CardBody>
            </Card>
            {fields.map((item, index) => (
              <Flex
                key={item.id}
                alignItems={"center"}
                justifyContent={"space-around"}
              >
                <FormControl
                  isInvalid={errors.familyMembers?.[index]?.name}
                  isRequired
                >
                  <Input
                    type="text"
                    {...register(`familyMembers.${index}.name`, {
                      required: "Family Member Name is required",
                      minLength: 2,
                      max: 150,
                    })}
                    _placeholder={{ color: "primary" }}
                    placeholder="Family member Name"
                  />
                  <FormErrorMessage>
                    {errors.familyMembers?.[index]?.name &&
                      errors.familyMembers?.[index]?.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={errors.familyMembers?.[index]?.relation}
                  isRequired
                >
                  <Input
                    type="text"
                    ml={2}
                    {...register(`familyMembers.${index}.relation`, {
                      required: "Relation is required",
                      minLength: 2,
                      maxLength: 25,
                    })}
                    _placeholder={{ color: "primary" }}
                    placeholder="Relation"
                  />
                  <FormErrorMessage>
                    {errors.familyMembers?.[index]?.relation &&
                      errors.familyMembers?.[index]?.relation.message}
                  </FormErrorMessage>
                </FormControl>
                {index != 0 && (
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={() => deleteFamilyMember(index)}
                    size={"sm"}
                    bg={"text2"}
                    isRound="true"
                    ml={4}
                  />
                )}
              </Flex>
            ))}
            <Flex justifyContent={"end"}>
              <IconButton
                width={30}
                icon={<AddIcon />}
                onClick={addFamilyMember}
                size={"sm"}
                bg={"text2"}
                isRound="true"
                ml={4}
              />
            </Flex>
          </Flex>
          <Flex justifyContent={"center"} my={5} gap={4}>
            <Button
              type="submit"
              color="primary"
              sx={{ _hover: { bg: "text", color: "text2" } }}
              bg={"text2"}
              onClick={reset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              color="text2"
              sx={{ _hover: { bg: "text", color: "text2" } }}
              bg={"primary"}
              onClick={handleSubmit(submit)}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
};

export default Form;
