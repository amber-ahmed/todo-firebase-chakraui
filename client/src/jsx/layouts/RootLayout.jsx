import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import { useDispatch } from "react-redux";
import { getUserAccount } from "../../redux/slices/accountSlilce";

const RootLayout = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(params);
    dispatch(getUserAccount());
  }, [params]);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
