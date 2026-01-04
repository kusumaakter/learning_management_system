import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import Navbar from "./student/Navbar";

const AppLayout = () => {
  const isAuthRoute = useMatch("/login") || useMatch("/signup");

  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Outlet />
    </>
  );
};

export default AppLayout;
