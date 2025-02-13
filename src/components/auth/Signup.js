import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import styles from "../../styles/Auth.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
  });

  const [otpGenerated, setOtpGenerated] = useState(""); // Store generated OTP for display
  const [isOtpSent, setIsOtpSent] = useState(false); // To show OTP field
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Send OTP
  const handleSendOTP = async () => {
    try {
      // Swal.fire({
      //   title: "Sending OTP...",
      //   allowOutsideClick: false,
      //   didOpen: () => Swal.showLoading(),
      // });

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/send-otp`, {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      if (response.data.success) {
        setOtpGenerated(response.data.otp); // Display OTP for demo
        setIsOtpSent(true);
        Swal.fire("Success", "OTP Sent Successfully!", "success");
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Swal.fire("Error", error.response?.data?.message || "Error sending OTP.", "error");
    }
  };

  // Handle Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup/verify-otp`, {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
      });
  
      if (response.data.success) {
        Swal.fire("Success", "Signup Successful!", "success");
  
        localStorage.setItem("fullName", response.data.user.fullName);
        localStorage.setItem("phoneNumber", response.data.user.phoneNumber);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("profileStatus", false);
        localStorage.setItem("onboardingStatus", false);
  
        navigate("/profile"); // Force profile setup first
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire("Error", error.response?.data?.message || "Error verifying OTP.", "error");
    }
  };
  
  

  return (
    <div className={styles.authContainer}>
      <img src={`${process.env.PUBLIC_URL}/assets/TiwilLOGO 1.png`} alt="Tiwil Logo" className={styles.logo} />
      <h1 className={styles.welcomeText}>Welcome</h1>
      <p className={styles.subText}>Connect with your friends today!</p>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${styles.activeTab}`} // Active state
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
        <button
          className={styles.tabButton}
          onClick={() => navigate("/signin")} // Navigate to Sign In
        >
          Sign In
        </button>
      </div>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className={styles.input}
      />

      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className={styles.input}
      />

      {isOtpSent && (
        <>
          <p className={styles.otpPopup}>
            Your OTP is: <strong>{otpGenerated}</strong>
          </p>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            className={styles.input}
          />
        </>
      )}

      {!isOtpSent ? (
        <button className={styles.button} onClick={handleSendOTP}>
          Send OTP
        </button>
      ) : (
        <button className={styles.button} onClick={handleVerifyOTP}>
          Verify OTP
        </button>
      )}
      <p>By creating an account, I accept the Terms & Conditions & Privacy Policy</p>
      <p>Aready have an account <Link to="/signin">Signin</Link></p>
    </div>
  );
};

export default Signup;
