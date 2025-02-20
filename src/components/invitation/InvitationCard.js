import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { FaRegHeart } from "react-icons/fa";
import styles from "./InvitationCard.module.css";

const InvitationCard = ({ invite }) => {
  const navigate = useNavigate();
  const eventData = invite.eventDetails || {};

  // ✅ Calculate Days Left
  const eventDate = eventData.date ? new Date(eventData.date) : null;
  const today = new Date();
  const daysLeft = eventDate ? Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24)) : "N/A";

  const handleNavigate = () => {
    navigate(`/event/${eventData.eventId}`, { state: { invite } }); // ✅ Pass invite data to EventDetail page
  };

  return (
    <div className={styles.card}>
      {/* Days Left */}
      {daysLeft !== "N/A" && <div className={styles.daysLeft}>{daysLeft} Days Left</div>}

      {/* Event Image */}
      <img
        src={eventData.image ? `${process.env.REACT_APP_BASE_URL}/${eventData.image}` : "/assets/default-event.jpg"}
        alt="Event"
        className={styles.eventImage}
      />

      {/* Event Details */}
      <div className={styles.cardContent}>
        <h3>{eventData.name || "Event Name"}</h3>
        
        <div className={styles.dateNrelation}>
          <p className={styles.date}>📅 {eventDate ? eventDate.toDateString() : "Invalid Date"}</p>
          <span className={styles.relationTag}>{eventData.relation || "Friend"}</span>
        </div>

        {/* Plan and Celebrate Button */}
        <button className={styles.planButton} onClick={handleNavigate}>
          Plan And Celebrate
        </button>

        {/* Heart Icon for Favorites */}
        <FaRegHeart className={styles.favoriteIcon} />
      </div>
    </div>
  );
};

export default InvitationCard;
