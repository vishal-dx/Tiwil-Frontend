import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WishlistModal.module.css";
import Swal from "sweetalert2";

const WishlistModal = ({ closeModal, eventId, refreshWishlist }) => {
  const [giftName, setGiftName] = useState("");
  const [price, setPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [desireRate, setDesireRate] = useState(40);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  console.log(eventId,'id from wishlist')

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    if (!eventId) {
        alert("Event ID is missing.");
        return;
    }

    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("giftName", giftName);
    formData.append("price", price);
    formData.append("productLink", productLink);
    formData.append("desireRate", desireRate);
    formData.append("description", description);

    if (imageFile) {
        formData.append("image", imageFile);
    } else {
        console.log("⚠️ No image selected.");
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/wishlist`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            Swal.fire("Success", "Wishlist item added successfully!", "success");

            // ✅ Call fetchWishlist to refresh the wishlist after saving
            refreshWishlist(); 

            // ✅ Close modal after adding
            closeModal();
        }
    } catch (error) {
        console.error("❌ Error saving wishlist item:", error);
        Swal.fire("Error", "Failed to add wishlist item.", "error");
    }
};



  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={closeModal}>×</button>
        <h2>Add Wishlist Item</h2>
        
        <div className={styles.imageContainer}>
          {imageFile ? (
            <img src={imageFile} alt="Wishlist Item" className={styles.wishlistImage} />
          ) : (
            <img src={`${process.env.PUBLIC_URL}/assets/ProfilDefaulticon.png`} alt="Wishlist Item" className={styles.wishlistImage} />
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.fileInput} id="fileUpload" />
          <label htmlFor="fileUpload" className={styles.cameraButton}>📷</label>
        </div>
        
        <div className={styles.form}>
          <input type="text" placeholder="Gift Name" value={giftName} onChange={(e) => setGiftName(e.target.value)} />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          
          <div className={styles.productLink}>
            <input type="text" placeholder="Product link" value={productLink} onChange={(e) => setProductLink(e.target.value)} />
            <button className={styles.addLinkButton}>ADD</button>
          </div>
          
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
