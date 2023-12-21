import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const LoginRoutes = () => {
  const [isLogged, setIsLogged] = useState(true);
  const userDetails = useSelector((state) => state.account);

  useEffect(() => {
    if (userDetails.error == "user not found") {
      localStorage.clear()
      setIsLogged(false)
    }
  }, []);
  return isLogged ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default LoginRoutes;
