import styles from "../../styles/Dashboard.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import icons

const EventCard = ({ event, toggleFavorite, handlePlan }) => {
  console.log(event,'11111111111111111111111111111111111111111111111111111')
    return (
      <div className={styles.eventCard}>
        <div className={styles.imageWrapper}>
          <img
            src={event.image ? `${process.env.REACT_APP_BASE_URL}/${event.image}` : `${process.env.PUBLIC_URL}/assets/ProfilDefaulticon.png`}
            alt={event.name}
            className={styles.eventImage}
          />
          <div className={styles.favoriteIcon} onClick={toggleFavorite}>
            {event.isFavorite ? <FaHeart className={styles.heartFilled} /> : <FaRegHeart className={styles.heartEmpty} />}
          </div>
        </div>
        <div className={styles.eventDetails}>
          <h3>{event.name}</h3>
          <p className={styles.date}>📅 {new Date(event.date).toLocaleDateString()}</p>
          <div className={styles.plnbox}>
            <button className={styles.planButton} onClick={handlePlan}>🎉 Plan Celebration</button>
            <span className={styles.relationTag}>{event.relation}</span>
          </div>
        </div>
      </div>
    );
  };

  export default EventCard