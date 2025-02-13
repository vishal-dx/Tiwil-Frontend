import React, { useState } from "react";
import styles from "./Wishlist.module.css";
import WishlistModal from "./WishlistModal";

const Wishlist = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      {/* Header */}
     

      {/* No Wishlist Message */}
      <div className={styles.noWishlist}>
        <p>No Wishlist</p>
      </div>

      {/* Add Wishlist Button */}
      <div className={styles.buttonContainer}>
        <button className={styles.addWishlist} onClick={() => setShowModal(true)}>
          ADD WISHLIST →
        </button>
      </div>

      {/* Wishlist Modal */}
      {showModal && <WishlistModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default Wishlist;
