import React from "react";
import { Navigate } from "react-router-dom";

const CheckStatus = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for authentication token

  return token ? children : <Navigate to="/signin" />;
};

export default CheckStatus;
// const token = localStorage.getItem("token"); // Check for authentication token

// return token ? children : <Navigate to="/signin" />;