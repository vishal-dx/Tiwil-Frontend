import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SplashScreen.module.css";

function SplashScreen() {
  const navigate = useNavigate();
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const images = [
    "/assets/Group 38375.png",
    "/assets/Group 38375 (1).png",
    "/assets/Group 38375 (2).png",
    "/assets/Group 38375 (3).png",
  ];

  const messages = [
    "Join forces with friends to pool money for expensive gifts and make someone's day even more special.",
    "Create wishlists, view friends' wishes, and mark gifts for purchase.",
    "Send invites to friends and family, making every celebration more meaningful.",
    "Add & Organize Events and Celebrate Moments, Together.",
  ];

  const handleRectangleClick = (index) => {
    setCurrentStep(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 1000); // Show the logo for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showInitialScreen) {
    return (
      <div className={styles.gradientBackground}>
        <div className={styles.logo}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/TiwilLOGO 1.png`}
            className={styles.image}
            alt="Logo"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.simpleBackground}>
      <div className={styles.imageContainer}>
        <img
          src={images[currentStep]}
          alt={`Step ${currentStep + 1}`}
          className={styles.splashImage}
        />
      </div>
      <div className={styles.rectanglesContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.rectangle} ${
              currentStep === index ? styles.activeRectangle : ""
            }`}
            onClick={() => handleRectangleClick(index)}
          ></div>
        ))}
      </div>
      <p className={styles.message}>{messages[currentStep]}</p>
      <div className={styles.buttonContainer}>
        <button
          onClick={() =>
            currentStep < images.length - 1
              ? setCurrentStep(currentStep + 1)
              : navigate("/signin")
          }
          className={styles.nextButton}
        >
          {currentStep < images.length - 1 ? "Next" : "Next"}
        </button>
        {currentStep < images.length - 1 && (
          <button onClick={() => navigate("/signin")} className={styles.skipButton}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
