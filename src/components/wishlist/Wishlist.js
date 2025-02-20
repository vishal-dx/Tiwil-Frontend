import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Wishlist.module.css";
import WishlistModal from "./WishlistModal";

const Wishlist = ({ eventId,imgUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  console.log(eventId,'get id from eventdetail page')

  // Function to fetch wishlist items for the event
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wishlist/event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setWishlistItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
}, [eventId]); // ✅ Re-fetch when eventId changes
console.log(wishlistItems)

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.wishlistTitle}>Wishlist <span className={styles.showAll}>Show all</span></h2> */}
      <div className={styles.wishlistTitle}>
        <h2>
          Show All
        </h2>
        <h2>
          :
        </h2>
        </div>
      {/* Wishlist Items List */}
      <div className={styles.wishlistItems}>
        {wishlistItems.length === 0 ? (
          <p>No Wishlist</p>
        ) : (
          wishlistItems.map((item, index) => (
            <div key={index} className={styles.wishlistItem}>
              <div className={styles.wishlistImageContainer}>
                {/* <img src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`} alt={item.giftName} className={styles.itemImage} /> */}
                {item.imageUrl ? (
            <img src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`} alt={item.giftName} className={styles.itemImage} />
          ) : (
            <img src={`${process.env.PUBLIC_URL}/assets/ProfilDefaulticon.png`} alt={item.giftName} className={styles.itemImage} />
          )}
              </div>
              <div className={styles.wishlistContent}>
                <div className={styles.wishlistHeader}>
                  <div className={styles.userInfo}>
                    <img src={imgUrl} alt="User" className={styles.userImage} />
                    <span className={styles.userName}>{item.userName}</span>
                  </div>
                  <span className={styles.price}>${item.price}</span>
                </div>
                <p className={styles.wishlistText}><strong>{item.giftName}</strong></p>
                <p className={styles.wishlistDescription}>{item.description}</p>
              </div>
              {/* <button className={styles.viewButton}>→</button> */}
            </div>
          ))
        )}
      </div>

      {/* Add Wishlist Button */}
      <div className={styles.buttonContainer}>
        <button className={styles.addWishlist} onClick={() => setShowModal(true)}>
          ADD WISHLIST →
        </button>
      </div>

      {/* Wishlist Modal - Pass fetchWishlist function to refresh list */}
      {showModal && <WishlistModal closeModal={() => setShowModal(false)} eventId={eventId} refreshWishlist={fetchWishlist} />}
    </div>
  );
};

export default Wishlist;
