import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SplashScreen.module.css";
import { FiArrowRight } from "react-icons/fi";

function SplashScreen() {
  const navigate = useNavigate();
  const [showInitialScreen, setShowInitialScreen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const slides = [
    {
      image: "/assets/Group 38375.png",
      message: "Add & Organize Events and Celebrate Moments, gather.",
    },
    {
      image: "/assets/Group 38375 (1).png",
      message:
        "Join forces with friends to pool money for expensive gifts and make someone's day even more special.",
    },
    {
      image: "/assets/Group 38375 (2).png",
      message: "Create wishlists, view friends' wishes, and mark gifts for purchase.",
    },
    {
      image: "/assets/Group 38375 (3).png",
      message: "Send invites to friends and family, making every celebration more meaningful.",
    },
  ];

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/signin");
    }
  };

  const handleSkip = () => {
    navigate("/signin");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialScreen(false);
    }, 1000); // Logo splash duration
    return () => clearTimeout(timer);
  }, []);

  if (showInitialScreen) {
    return (
      <div className={styles.gradientBackground}>
        <div className={styles.logoWrapper}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/TiwilLOGO 1.png`}
            className={styles.logoImage}
            alt="Tiwil Logo"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* ✅ Tiwil Logo at the top */}
      <div className={styles.logoWrapper}>
        <img src={`${process.env.PUBLIC_URL}/assets/TiwilLOGO 1.png`} alt="Tiwil Logo" className={styles.logoImage} />
      </div>

      {/* ✅ Slide Image */}
      <div className={styles.imageWrapper}>
        <img src={slides[currentStep].image} alt="Splash Slide" className={styles.splashImage} />
      </div>

      {/* ✅ Message */}
      <p className={styles.message}>{slides[currentStep].message}</p>

      {/* ✅ Pagination Dots */}
      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentStep ? styles.activeDot : ""}`}
            onClick={() => setCurrentStep(index)}
          ></div>
        ))}
      </div>

      {/* ✅ Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.nextButton} onClick={handleNext}>
          Next
          <span className={styles.arrowWrapper}>
            <FiArrowRight />
          </span>
        </button>
        <button className={styles.skipButton} onClick={handleSkip}>
          Skip
        </button>
      </div>

    </div>
  );
}

export default SplashScreen;
