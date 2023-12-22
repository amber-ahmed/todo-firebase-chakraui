import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import { useDispatch } from "react-redux";
import { getUserAccount } from "../../redux/slices/accountSlilce";

const RootLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAccount());
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
