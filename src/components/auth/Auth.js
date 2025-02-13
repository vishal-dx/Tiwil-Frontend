import React, { useState } from "react";
import styles from "../../styles/Auth.module.css";
import axios from "axios";

function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    otp: "",
  });
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setMessage("");
  };

  const handleSendOTP = async () => {
    setMessage("Sending OTP...");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/send-otp`, {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        type: isSignup ? "signup" : "signin", // Differentiate signup and signin
      });

      if (response.data.success) {
        setConfirmationResult(true);
        setMessage("OTP Sent Successfully! Check your email.");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error sending OTP.");
    }
  };

  const handleVerifyOTP = async () => {
    setMessage("Verifying OTP...");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/verify-otp`, formData);
      console.log(response,'22222222222222')
      if (response.data.success) {
        setMessage("Authentication Successful!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          otp: "",
        })
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error verifying OTP.");
    }
  };

  // Resend OTP function
  const handleResendOTP = async () => {
    setMessage("Resending OTP...");
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/send-otp`, {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        type: isSignup ? "signup" : "signin", // Maintain the signup/signin type
      });

      if (response.data.success) {
        setMessage("OTP Resent Successfully! Check your email.");
        startResendTimer();
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Error resending OTP.");
    }
  };

  // Start Resend OTP Timer
  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.welcomeText}>{isSignup ? "Signup" : "Sign in"}</h1>

      <div className={styles.toggleContainer}>
        <div className={`${styles.toggleButton} ${!isSignup ? styles.active : ""}`} onClick={() => setIsSignup(false)}>
          Sign in
        </div>
        <div className={`${styles.toggleButton} ${isSignup ? styles.active : ""}`} onClick={() => setIsSignup(true)}>
          Signup
        </div>
      </div>

      {isSignup && (
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className={styles.input}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
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

      {confirmationResult && (
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          className={styles.input}
        />
      )}

      {!confirmationResult ? (
        <button className={styles.button} onClick={handleSendOTP}>
          Send OTP
        </button>
      ) : (
        <>
          <button className={styles.button} onClick={handleVerifyOTP}>
            Verify OTP
          </button>
          <button className={styles.button} onClick={handleResendOTP} disabled={isResendDisabled}>
            Resend OTP {isResendDisabled ? `(${resendTimer}s)` : ""}
          </button>
        </>
      )}

      <p className={styles.message}>{message}</p>

      <p className={styles.toggleText} onClick={handleToggle}>
        {isSignup ? "Already have an account? Sign in" : "New On Tiwil? Create Account"}
      </p>
    </div>
  );
}

export default Auth;
