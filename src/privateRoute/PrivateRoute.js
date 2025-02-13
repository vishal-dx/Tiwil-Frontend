import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check for authentication token

  return token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;












// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const profileStatus = localStorage.getItem("profileStatus") === "true";
//   const onboardingStatus = localStorage.getItem("onboardingStatus") === "true";

//   console.log("Auth Check:", { token, profileStatus, onboardingStatus });

//   if (!token) {
//     return <Navigate to="/signin" />;
//   }

//   if (!profileStatus && window.location.pathname !== "/profile") {
//     return <Navigate to="/profile" />;
//   }

//   if (!onboardingStatus && window.location.pathname !== "/add-information") {  
//     return <Navigate to="/add-information" />;
//   }

//   return children;
// };

// export default PrivateRoute;
