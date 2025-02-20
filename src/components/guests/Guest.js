import React, { useState, useEffect } from "react";
import axios from "axios";
import InviteModal from "./InviteModal";
import styles from "./Guest.module.css";

const Guest = ({ eventId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/guests/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success && Array.isArray(response.data.data)) {
          setGuests(response.data.data); // ✅ Directly set the guest array
        }
      } catch (error) {
        console.error("❌ Error fetching guests:", error);
        setGuests([]);
      }
    };

    if (eventId) {
      fetchGuests();
    }
  }, [eventId]);

  const handleInvite = async (selectedGuests) => {
    if (!eventId || !Array.isArray(selectedGuests) || selectedGuests.length === 0) {
      console.error("❌ Invalid eventId or empty guest list.");
      return;
    }

    try {
      console.log("🚀 Sending invite data:", { eventId, guests: selectedGuests });
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/guests/invite`,
        { eventId, guests: selectedGuests },
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setGuests([...guests, ...selectedGuests]); // ✅ Add new guests to the list
        setIsModalOpen(false);
      } else {
        console.error("❌ API error:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Error inviting guests:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Guest List</h3>
      {guests.length === 0 ? (
        <p className={styles.noGuestText}>No guests invited yet.</p>
      ) : (
        <ul className={styles.guestList}>
          {guests.map((guest) => (
            <li key={guest._id} className={styles.guestItem}>
              <img
                src={guest.profileImage ? `${process.env.REACT_APP_BASE_URL}${guest.profileImage}` : `${process.env.PUBLIC_URL}/assets/ProfilDefaulticon.png`}
                alt="guest"
                className={styles.avatar}
              />
              <span className={styles.guestName}>{guest.name}</span>
              <span className={styles.guestStatus}>{guest.status}</span>
            </li>
          ))}
        </ul>
      )}
      
      <div className={styles.buttonContainer}>
        <button className={styles.inviteButton} onClick={() => setIsModalOpen(true)}>
          Add More
        </button>
        {guests.length > 0 && (
          <button className={styles.chatButton}>
            Start Chat
          </button>
        )}
      </div>

      {isModalOpen && <InviteModal eventId={eventId} onInvite={handleInvite} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Guest;
