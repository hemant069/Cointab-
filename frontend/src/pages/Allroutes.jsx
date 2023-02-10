import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/users" element={<Users />}></Route>
    </Routes>
  );
};

export default Allroutes;
