import React, { useEffect, useState } from "react";
import axios from "axios";
import InvitationCard from "./InvitationCard";
import styles from "./Invitations.module.css";

const Invitations = () => {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/invitations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setInvitations(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching invitations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Invitations</h2>

      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : invitations.length > 0 ? (
        <div className={styles.invitationGrid}>
          {invitations.map((invite, index) => (
            <InvitationCard key={index} invite={invite} />
          ))}
        </div>
      ) : (
        <p className={styles.noInvites}>No invitations found.</p>
      )}
    </div>
  );
};

export default Invitations;
