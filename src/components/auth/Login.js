import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import styles from "../../styles/Auth.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: "",
  });

  const [otpGenerated, setOtpGenerated] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Send OTP
  const handleSendOTP = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login/send-otp`, {
        phoneNumber: formData.phoneNumber,
      });
  
      if (response.data.success) {
        setOtpGenerated(response.data.otp);
        setIsOtpSent(true);
        setMessage(response.data.message);
        Swal.fire({
          icon: "success",
          title: "OTP Sent Successfully!",
          timer: 1000,  // Auto close in 3 seconds
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error sending OTP.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  

  // Handle Verify OTP
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login/verify-otp`, {
        phoneNumber: formData.phoneNumber,
        otp: formData.otp,
      });
  
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1000,
          showConfirmButton: false,
        });
  
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("profileStatus", JSON.stringify(response.data.profileStatus));
        localStorage.setItem("onboardingStatus", JSON.stringify(response.data.onboardingStatus));
  
        if (!response.data.profileStatus) {
          navigate("/profile");
        } else if (!response.data.onboardingStatus) {
          navigate("/add-information");
        } else {
          navigate("/dashboard");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error verifying OTP.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  


  return (
    <div className={styles.authContainer}>
      <img src={`${process.env.PUBLIC_URL}/assets/TiwilLOGO 1.png`} alt="Tiwil Logo" className={styles.logo} />
      <h1 className={styles.welcomeText}>Welcome</h1>
      <p className={styles.subText}>Connect with your friends today!</p>
      <div className={styles.tabContainer}>
        <button className={styles.tabButton} onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button className={`${styles.tabButton} ${styles.activeTab}`}>
          Sign In
        </button>
      </div>

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
     <p>{message}</p> 
      <p>New on Tiwil? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default SignIn;
