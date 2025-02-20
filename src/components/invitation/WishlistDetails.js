import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./WishlistDetails.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

const WishlistDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  const [status, setStatus] = useState(item.status || "Unmark");
  const [loading, setLoading] = useState(false);
  const [markedBy, setMarkedBy] = useState(item.markedBy || null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // ✅ Fetch latest wish data (in case someone else marks/purchases it)
    const fetchWishData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wishlist/item/${item._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setStatus(response.data.data.status);
          setMarkedBy(response.data.data.markedBy);
        }
      } catch (error) {
        console.error("Error fetching updated wishlist data:", error);
      }
    };

    fetchWishData();
  }, [item._id]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setLoading(true);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/update-status/${item._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setStatus(newStatus);

        if (newStatus === "Mark") {
          setMarkedBy({
            userId,
            name: localStorage.getItem("fullName"),
            profileImage: localStorage.getItem("profileImage") || "/assets/default-user.png",
          });
        } else {
          setMarkedBy(null);
        }
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePool = async () => {
    if (status === "Pooling" || status === "Completed") return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pool/create`,
        { wishId: item._id, totalAmount: item.price },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        navigate("/pooling", { state: { item } });
      }
    } catch (error) {
      console.error("❌ Error creating pool:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
        <h2>Wishes</h2>
      </div>

      {/* Wishlist Image */}
      <div className={styles.imageContainer}>
        <img src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`} alt={item.giftName} className={styles.image} />
        {status === "Completed" && <div className={styles.completedBadge}>Completed</div>}
      </div>

      {/* User Info & Status Dropdown */}
      <div className={styles.userSection}>
        <img src="/assets/user-profile.jpg" alt="User" className={styles.userAvatar} />
        <div className={styles.userInfo}>
          <h4>{item.userName || "Organizer"}</h4>
          <p className={styles.userRole}>Organizer</p>
        </div>

        {/* ✅ Hide dropdown if pooling or completed */}
        {status !== "Pooling" && status !== "Completed" && (
          <select className={styles.statusSelect} value={status} onChange={handleStatusChange} disabled={loading}>
            <option value="Unmark">Unmark</option>
            <option value="Mark">Mark</option>
            <option value="Purchased">Purchased</option>
          </select>
        )}
      </div>

      {/* Show marking details if marked */}
      {status === "Mark" && markedBy && (
        <div className={styles.markedBySection}>
          <p>This wish is marked by:</p>
          <div className={styles.markedUser}>
            <img src={markedBy.profileImage} alt={markedBy.name} className={styles.markedUserAvatar} />
            <span>{markedBy.name}</span>
          </div>
        </div>
      )}

      {/* Wish Title & Time */}
      <h3 className={styles.wishTitle}>{item.giftName}</h3>
      <p className={styles.wishTime}>Saturday, March 18, 9:30PM</p>

      {/* ✅ Show "Create Pool" button only for marking user */}
      {status === "Mark" && markedBy?.userId === userId && (
        <button className={styles.createPoolButton} onClick={handleCreatePool} disabled={loading}>
          {loading ? "Creating..." : "Create Pool"}
        </button>
      )}

      {/* About Wishlist */}
      <h4 className={styles.aboutTitle}>About Wishlist</h4>
      <p className={styles.aboutText}>{item.description}</p>

      {/* Help To Complete This Wish */}
      <p className={styles.helpText}>Help To Complete This Wish</p>

      {/* See All Wishes Button */}
      <button className={styles.allWishesButton} onClick={() => navigate("/wishlist")}>
        SEE ALL WISHES →
      </button>
    </div>
  );
};

export default WishlistDetails;
