import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "./WishlistCard.module.css";
import { FaArrowRight } from "react-icons/fa";

const WishlistCard = ({ item }) => {
  const navigate = useNavigate();

  // ✅ Define status colors and labels
  const statusLabels = {
    Completed: { label: "Completed", className: styles.completedBadge },
    Purchased: { label: "Purchased", className: styles.purchasedBadge },
    Mark: { label: "Marked", className: styles.markedBadge },
    Unmark: { label: "Unmarked", className: styles.unmarkedBadge },
  };

  const handleNavigate = () => {
    if (item.status === "Completed") {
      Swal.fire({
        title: "Wish Fulfilled",
        text: "This wish has already been completed and is no longer available for pooling.",
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      navigate(`/wishlist/${item._id}`, { state: { item } });
    }
  };

  return (
    <div 
      className={`${styles.card} ${item.status === "Completed" ? styles.completedCard : ""}`} 
      style={{ backgroundImage: `url(${process.env.REACT_APP_BASE_URL}/${item.imageUrl})` }}
      onClick={handleNavigate}
    >
      <div className={styles.overlay}>
        <img src="/assets/user-profile.jpg" alt="User" className={styles.userImage} />

        <div className={styles.textContent}>
          <h3 className={styles.giftName}>{item.giftName}</h3>
          <p className={styles.userName}>{item.userName || "Guest"}</p>  
          <p className={styles.description}>{item.description}</p>
        </div>

        <FaArrowRight className={styles.arrowIcon} />

        {/* ✅ Show Badge for Each Status */}
        {item.status && statusLabels[item.status] && (
          <div className={statusLabels[item.status].className}>
            {statusLabels[item.status].label}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;
