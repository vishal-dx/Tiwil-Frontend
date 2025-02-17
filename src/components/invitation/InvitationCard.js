import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./InvitationCard.module.css"; // Make sure this CSS file exists

const InvitationCard = ({ invite }) => {
  const token = localStorage.getItem("token");

  const handleResponse = async (status) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/invitations/${invite._id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        Swal.fire("Success", `Invitation ${status}!`, "success").then(() => window.location.reload());
      }
    } catch (error) {
      console.error("❌ Error updating invitation status:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <div className={styles.card}>
      <img src={invite.eventId?.image || `${process.env.PUBLIC_URL}/assets/ProfilDefaulticon.png`} alt="Event" className={styles.eventImage} />
      <div className={styles.cardContent}>
        <h3>{invite.eventId?.name}</h3>
        <p>📅 {new Date(invite.invitedAt).toDateString()}</p>
        <p><strong>Status:</strong> {invite.status}</p>

        {invite.status === "Pending" && (
          <div className={styles.actions}>
            <button className={styles.accept} onClick={() => handleResponse("Accepted")}>Accept</button>
            <button className={styles.decline} onClick={() => handleResponse("Declined")}>Decline</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationCard;
