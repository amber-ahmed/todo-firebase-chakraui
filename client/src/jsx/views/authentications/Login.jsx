import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
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
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = async () => {
    await logInWithEmailAndPassword(email, password);
    navigate("/dashboard");
  };
  const loginWithGoogle = async () => {
    try {
      const docId = await signInWithGoogle();
      if (docId) navigate(`/register_name/${docId}`);
      else navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (loading) return;
  //   if (user)
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 500);
  // }, [user, loading]);
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
            Login
          </Button>
        </Flex>
        <Flex justifyContent={"center"} my={5}>
          <Button
            sx={{
              bg: "blue",
              color: "white",
              _hover: { bg: "blue", color: "white" },
            }}
            onClick={loginWithGoogle}
          >
            Login with Google
          </Button>
        </Flex>
        <Flex justifyContent={"center"} my={5}>
          <Text as="span" color={"text"}>
            {"Dont have an account?"}
          </Text>
          <Link href="/register" color={"primary"}>
            Sign Up
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
}
export default Login;
