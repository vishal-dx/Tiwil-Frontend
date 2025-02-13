import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Fixed import for jwtDecode
import { CgProfile } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for hamburger and close
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const storedFullName = localStorage.getItem("fullname");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log(decoded);
          setUser(decoded);
          if (storedFullName) setFullName(storedFullName);
        } catch (error) {
          console.error("Error decoding token:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        setUser(null);
        setFullName("");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    localStorage.clear()
    setUser(null);
    setFullName("");
    setIsSidePanelOpen(false); // Close the side panel on logout
    navigate("/signin");
    window.dispatchEvent(new Event("storage"));
  };

  // const handleNavigateToProfile = () => {
  //   setShowDropdown(false);
  //   setIsSidePanelOpen(false); // Close side panel if open
  //   navigate("/profile");
  // };

  const handleAccountSetting = () => {
    navigate("/account-setting");
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <img
        className={styles.navLogo}
        src={`${process.env.PUBLIC_URL}/assets/TiwilLOGO 1.png`}
        alt="Tiwil Logo"
        onClick={() => navigate("/dashboard")}
      />

      {/* Desktop Buttons */}
      <div className={styles.navButtons}>
        {user ? (
          <div className={styles.profileContainer}>
            <div
              className={styles.profileInfo}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Link to="/notification">
                <img src={`${process.env.PUBLIC_URL}/assets/Vector.png`} alt="Notification" />
              </Link>
              <CgProfile className={styles.profileIcon} />
              <span className={styles.profileName}>{fullName}</span>
            </div>
            {showDropdown && (
              <div className={styles.dropdownMenu}>
                {/* <p onClick={handleNavigateToProfile}>Profile</p> */}
                <p onClick={handleAccountSetting}>Account Setting</p>
                <p onClick={()=>navigate("/dashboard")}>Dashboard</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.btns}>
            <div className={styles.signInbtn}>
              <button onClick={() => navigate("/signin")}>Signin</button>
            </div>
            <div className={styles.signUpbtn}>
              <button onClick={() => navigate("/signup")}>Signup</button>
            </div>
          </div>
        )}
      </div>

      {/* Hamburger Menu */}
      <div
        className={styles.hamburger}
        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
      >
        {isSidePanelOpen ? <HiX size={30} /> : <HiMenu size={30} />}
      </div>

      {/* Overlay and Side Panel */}
      {isSidePanelOpen && (
        <>
          <div className={styles.overlay} onClick={closeSidePanel}></div>
          <div className={styles.sidePanel}>
            {user ? (
              <>
                {/* <p onClick={handleNavigateToProfile}>Profile</p> */}
                <p onClick={handleAccountSetting}>Account</p>
                <p onClick={()=>navigate("/notification")}>Notifications</p>
                <p onClick={()=>navigate("/dashboard")}>Dashboard</p>

                <p onClick={handleLogout}>Logout</p>
              </>
            ) : (
              <>
                <p onClick={() => navigate("/signin")}>Signin</p>
                <p onClick={() => navigate("/signup")}>Signup</p>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;
