import React, { useEffect, useState } from "react";
import axios from "axios";
import WishlistCard from "./WishlistCard";
import styles from "./Wishlist.module.css";

const Wishlist = ({ eventId }) => {  
  const token = localStorage.getItem("token");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wishlist/event/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setWishlistItems(response.data.data); // ✅ Do not filter completed wishes
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchWishlist();
    }
  }, [eventId, token]);

  return (
    <div className={styles.wishlistContainer}>
      {loading ? (
        <p className={styles.loadingText}>Loading wishlist...</p>
      ) : wishlistItems.length > 0 ? (
        wishlistItems.map((item) => <WishlistCard key={item._id} item={item} />)
      ) : (
        <p className={styles.noItemsText}>No items in the wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
