import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./GuestSection.module.css";

const GuestSection = ({ eventId }) => {
  const [guests, setGuests] = useState([]);  // Initialize guests as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/guests/${eventId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setGuests(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching guests:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchGuests();
    }
  }, [eventId]);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading guests...</p>
      ) : (
        <>
          {guests.length === 0 ? (
            <p>No guests invited yet.</p>
          ) : (
            <div className={styles.guestsList}>
              {guests.map((guest, index) => (
                <div key={index} className={styles.guestItem}>
                  {/* Display guest profile image */}
                  <img
                    src={guest.profileImage ? `${process.env.REACT_APP_BASE_URL}${guest.profileImage}` : "/assets/default-user.png"}
                    alt={guest.name}
                    className={styles.guestAvatar}
                  />
                  <p className={styles.guestName}>{guest.name}</p>
                  <p className={styles.guestStatus}>{"Invited"}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GuestSection;
