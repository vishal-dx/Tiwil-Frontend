import React, { useState } from "react";
import styles from "./WishlistModal.module.css";

const WishlistModal = ({ closeModal }) => {
  const [giftName, setGiftName] = useState("");
  const [price, setPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [desireRate, setDesireRate] = useState(40);
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const wishlistItem = {
      giftName,
      price,
      productLink,
      desireRate,
      description,
    };
    console.log("Wishlist Item:", wishlistItem);
    closeModal();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>×</button>

        <h2>Add Wishlist Item</h2>

        {/* Image Placeholder */}
        <div className={styles.imageContainer}>
          <img src={`${process.env.PUBLIC_URL}/assets/ps5.png`} alt="Wishlist Item" className={styles.wishlistImage} />
          <button className={styles.cameraButton} >📷</button>
        </div>

        {/* Wishlist Form */}
        <div className={styles.form}>
          <input type="text" placeholder="Gift Name" value={giftName} onChange={(e) => setGiftName(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          
          <div className={styles.productLink}>
            <input type="text" placeholder="Product link" value={productLink} onChange={(e) => setProductLink(e.target.value)} />
            <button className={styles.addLinkButton}>ADD</button>
          </div>

          {/* Desire Rate Slider */}
          <label className={styles.sliderLabel}>Desire Rate: {desireRate}%</label>
          <input type="range" min="0" max="100" value={desireRate} onChange={(e) => setDesireRate(e.target.value)} className={styles.slider} />

          <textarea placeholder="Describe it..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          
          <button className={styles.saveButton} onClick={handleSave}>Save +</button>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;
