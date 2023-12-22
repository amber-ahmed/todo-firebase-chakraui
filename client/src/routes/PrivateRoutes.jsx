import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const error = useSelector((state) => state.account.error);
  const navigate = useNavigate();
  useEffect(() => {
    if (error == "user not found") {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [error]);
  return <Outlet />;
};

export default PrivateRoutes;
