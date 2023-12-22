import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

const AuthRoutes = () => {
  const uid = localStorage.getItem("uid");
  return uid ? <Navigate to={"/dashboard"} replace /> : <Outlet />;
};

export default AuthRoutes;
