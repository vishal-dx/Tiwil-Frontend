import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profileStatus = JSON.parse(localStorage.getItem("profileStatus"));
    const onboardingStatus = JSON.parse(localStorage.getItem("onboardingStatus"));

    console.log("🔍 Checking Protected Route:", location.pathname);
    console.log("Token:", token);
    console.log("Profile Status:", profileStatus);
    console.log("Onboarding Status:", onboardingStatus);

    if (!token) {
      console.log("🚨 Redirecting to /signin");
      setRedirectTo("/signin");
    } else if (!profileStatus && location.pathname !== "/profile") {
      console.log("🚨 Redirecting to /profile");
      setRedirectTo("/profile");
    } else if (profileStatus && !onboardingStatus && location.pathname !== "/add-information") {
      console.log("🚨 Redirecting to /add-information");
      setRedirectTo("/add-information");
    } else {
      console.log("✅ Access Granted");
      setRedirectTo(null);
    }

    setLoading(false);
  }, [location.pathname]); // ✅ Add location.pathname to prevent infinite loop

  if (loading) {
    return <div>Loading...</div>;
  }

  return redirectTo ? <Navigate to={redirectTo} /> : children;
};

export default ProtectedRoute;
