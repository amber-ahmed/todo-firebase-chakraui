import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase/models/auth";
import { auth } from "../../../firebase/firebase";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register =async () => {
    try {
      if (!name) alert("Please enter name");
    await registerWithEmailAndPassword(name, email, password);
    navigate(`/dashboard`);
    } catch (error) {
      console.log(error)
    }
  };

  const registerWithGoogle = async () => {
    try {
      const docId = await signInWithGoogle();
      if (docId) navigate(`/register_name/${docId}`);
      else navigate(`/dashboard`);
    } catch (error) {
      alert("something went wrong try later");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
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
            placeholder="Full Name"
          />
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ color: "primary" }}
            placeholder="E-mail Address"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _placeholder={{ color: "primary" }}
            placeholder="Password"
          />
        </Flex>
        <Flex justifyContent={"center"} my={5}>
          <Button
            color="text2"
            sx={{ _hover: { bg: "text", color: "text2" } }}
            bg={"primary"}
            onClick={register}
          >
            Register
          </Button>
        </Flex>
        <Flex justifyContent={"center"} my={5}>
          <Button
            sx={{
              bg: "blue",
              color: "white",
              _hover: { bg: "blue", color: "white" },
            }}
            onClick={registerWithGoogle}
          >
            Register with Google
          </Button>
        </Flex>
        <Flex justifyContent={"center"} my={5}>
          <Text as="span" color={"text"}>
            {"Already have an account?"}
          </Text>
          <Link href="/login" color={"primary"}>
            Login
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
}
export default Register;
