import React from "react";
import styles from "./Card.module.css";


const Card = ({ item, type }) => {
    const getImageSrc = () => {
      if (item.image.startsWith("http")) {
        return item.image; // Use full URL for API-provided images
      }
      return `${process.env.PUBLIC_URL}${item.image}`; // Use public folder path for local assets
    };
  
    return (
      <div className={styles.card}>
        <div className={styles.cardImageWrapper}>
          <img
            src={getImageSrc()}
            alt={item.name}
            onError={(e) => (e.target.src = `${process.env.PUBLIC_URL}/assets/ProfilDefaulticon.png`)} // Fallback image
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardDetails}>
          <h3>{item.name}</h3>
          {type === "event" && <p className={styles.cardDate}>📅 {new Date(item.date).toLocaleDateString()}</p>}
          {type === "friend" && <button className={styles.inviteButton}>Invite to Join</button>}
        </div>
      </div>
    );
  };
  
  export default Card;
  