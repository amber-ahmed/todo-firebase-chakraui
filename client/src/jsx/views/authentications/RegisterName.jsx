import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  registerName,
} from "../../../firebase/models/auth";
import { auth } from "../../../firebase/firebase";
import { Button, Card, CardBody, Flex, Input, Link, Text } from "@chakra-ui/react";
function RegisterName() {
  const [name, setName] = useState("");
  const location = useParams()
  console.log(location)
  const navigate = useNavigate();
  const handleRegisterName = () => {
    registerName(name);
    navigate('/dashboard')
  };
  return (
    <Card
      bg={"secondary"}
      borderRadius={5}
      sx={{ width: "70%", marginX: "auto" }}
    >
      <CardBody>
        <Flex direction={"column"} gap={5}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            _placeholder={{ color: "primary" }}
            placeholder="Name"
          />
        </Flex>
        <Flex justifyContent={"center"} my={5}>
          <Button
            color="text2"
            sx={{ _hover: { bg: "text", color: "text2" } }}
            bg={"primary"}
            onClick={handleRegisterName}
          >
            Submit
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
export default RegisterName;
