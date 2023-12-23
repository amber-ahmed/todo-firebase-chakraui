import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const error = useSelector((state) => state.account);
  const navigate = useNavigate();
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (error.error == "user not found" || !uid) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [error]);
  return <Outlet />;
};

export default PrivateRoutes;
