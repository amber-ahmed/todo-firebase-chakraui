import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const [isLogged, setIsLogged] = useState(true);
  const error = useSelector((state) => state.account.error);

  useEffect(() => {
    if (error == "user not found") {
      localStorage.clear()
      setIsLogged(false)
    }
  }, [error]);
  return isLogged ? <Navigate to={"/dashboard"} /> :  <Outlet /> ;
};

export default PublicRoutes;
