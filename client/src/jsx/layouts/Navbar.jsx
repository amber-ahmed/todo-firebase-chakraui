import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Image,
  chakra,
  ButtonGroup,
} from "@chakra-ui/react";

import logo from "../../assets/todo.png";
import ThemeContext from "../../contexts/ThemeContext";
import { logout } from "../../firebase/models/auth";
import { useSelector } from "react-redux";
import { getOfflineData } from "../../firebase/models/task";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const userDetails = useSelector((state) => state.account.userDetails);

  return (
    <NavBarContainer {...props}>
      <Image src={logo} alt="logo" width={30} height={35} />
      {userDetails && (
        <Text color={"text2"}>
          {"Welome back "}
          {userDetails?.name}
        </Text>
      )}
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => {
  const Svg = chakra("svg", {
    baseStyle: {
      fill: "secondary", // Replace with the Chakra UI color you want to use
    },
  });

  return (
    <Svg width="10" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>Close</title>
      <path d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z" />
    </Svg>
  );
};

const MenuIcon = () => {
  const Svg = chakra("svg", {
    baseStyle: {
      fill: "secondary", // Replace with the Chakra UI color you want to use
    },
  });

  return (
    <Svg width="24px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </Svg>
  );
};

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  const setUserTheme = useContext(ThemeContext);
  const userDetails = useSelector((state) => state.account.userDetails);
  const handleThemeChange = (theme) => {
    localStorage.setItem("theme", theme);
    setUserTheme(theme);
  };
  const [tasksCount, setTasksCount] = useState(null);
  useEffect(() => {
    getOfflineData(setTasksCount).then((data) => console.log(data));
  }, [tasksCount]);
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <Text color={'text2'}>{tasksCount}</Text>
        {/* <MenuItem to="/">Minha Conta</MenuItem> */}
        {!userDetails && (
          <MenuItem to="register">
            <Button
              size="sm"
              rounded="md"
              color={"primary"}
              bg="secondary"
              _hover={{
                bg: "text2",
              }}
            >
              Sign Up
            </Button>
          </MenuItem>
        )}
        {!userDetails && (
          <MenuItem to="login">
            <Button
              size="sm"
              rounded="md"
              color={"primary"}
              bg="secondary"
              _hover={{
                bg: "text2",
              }}
            >
              Sign In
            </Button>
          </MenuItem>
        )}
        {userDetails && (
          <MenuItem>
            <Button
              size="sm"
              rounded="md"
              color={"primary"}
              bg="secondary"
              _hover={{
                bg: "text2",
              }}
              onClick={logout}
            >
              Logout
            </Button>
          </MenuItem>
        )}
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          colorScheme="primary"
        >
          <Button
            color="primary"
            bg={"text2"}
            onClick={() => handleThemeChange("light")}
          >
            light
          </Button>
          <Button
            color="primary"
            bg={"text2"}
            onClick={() => handleThemeChange("dark")}
          >
            dark
          </Button>
          <Button
            color="primary"
            bg={"text2"}
            onClick={() => handleThemeChange("rainbow")}
          >
            rainbow
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={4}
      p={4}
      bg={"text"}
      color={"primary"}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
