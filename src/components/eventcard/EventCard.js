import React from "react";
import styles from "./EventCard.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

const EventCard = ({ event, handlePlan }) => {
  return (
    <div className={styles.eventCard}>
      {/* Days Left Badge */}
      {event.daysLeft > 0 && (
        <div className={styles.daysLeftBadge}>{event.daysLeft} Days Left</div>
      )}

      <div className={styles.imageWrapper}>
        <img src={`${process.env.REACT_APP_BASE_URL}/${event.image}`} alt="Event" className={styles.eventImage} />
        <div className={styles.favoriteIcon}>
          <FaRegHeart />
        </div>
      </div>

      <div className={styles.eventDetails}>
        <h3>{event.name}</h3>
        <div className={styles.dateNrelation}>
        <p className={styles.date}>
          <FiCalendar className={styles.calendarIcon} />  {new Date(event.date).toLocaleDateString()}
        </p>

        <div className={styles.relationTag}>{event.relation}</div>
        </div>
        <button className={styles.planButton} onClick={() => handlePlan(event.eventId)}>
          🎉 Plan And Celebrate
        </button>
      </div>
    </div>
  );
};

export default EventCard;
