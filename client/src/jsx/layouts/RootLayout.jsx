import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import { useDispatch } from "react-redux";
import { getUserAccount } from "../../redux/slices/accountSlilce";
import { onMessage } from "firebase/messaging";
import { messaging } from "../../firebase/firebase";
import { useToast } from "@chakra-ui/react";

const RootLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const toast = useToast();
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (uid) dispatch(getUserAccount());
  }, [location.pathname]);
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log(payload)
      toast({
        title: payload.notification.title,
        description: payload.notification.body,
        position: 'top',
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default RootLayout;
