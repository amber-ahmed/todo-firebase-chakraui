import { Flex, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../../firebase/models/users";
import { useSelector } from "react-redux";

const Header = ({ setStatusFilter, setUserFilter, setSort }) => {
  const [users, setUsers] = useState([]);
  const userDetails = useSelector((state) => state.account.userDetails);

  useEffect(() => {
    getUsers()
      .then((users) => {
        console.log(users);
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <Flex
      bg={"text2"}
      paddingY={5}
      alignItems={"center"}
      justifyContent={"space-around"}
      wrap={"wrap"}
      gap={2}
    >
      <Select
        bg={"text"}
        color={"text2"}
        defaultValue={"all"}
        width={200}
        onChange={(e) => setUserFilter(e.target.value)}
      >
        <option value="all">All Users</option>
        <option key={userDetails?.uid} value={userDetails?.uid}>
          {"Me"}
        </option>
        {users.map((user) => {
          if (userDetails?.uid != user.uid)
            return (
              <option key={user.uid} value={user.uid}>
                {user.name}
              </option>
            );
        })}
      </Select>
      <Select
        bg={"text"}
        color={"text2"}
        width={200}
        defaultValue={"all"}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value={"all"}>All</option>
        <option value={"completed"}>Completed</option>
        <option value={"incomplete"}>Incomplete</option>
      </Select>
      <Select
        bg={"text"}
        color={"text2"}
        width={200}
        defaultValue="sortby"
        onChange={(e) => setSort(e.target.value)}
      >
        <option disabled value={"sortby"}>
          Sort By
        </option>
        <option value={"sequence"}>Sequence</option>
        <option value={"nameAsc"}>{"Task Name(asc)"}</option>
        <option value={"nameDesc"}>{"Task Name(desc)"}</option>
        <option value={"createdFirst"}>{"Created First"}</option>
        <option value={"createdLast"}>{"Created Last"}</option>
      </Select>
    </Flex>
  );
};

export default Header;
