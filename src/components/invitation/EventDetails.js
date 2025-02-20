import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./EventDetails.module.css";
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaCommentDots } from "react-icons/fa";
import Wishlist from "./Wishlist";  // ✅ Import Wishlist Component
import GuestSection from "./GuestSection"; // ✅ Import GuestSection Component

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invite } = location.state || {};
  const eventData = invite?.eventDetails || {};
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("details");
  const [invitationStatus, setInvitationStatus] = useState(invite.invitations[0]?.status);

  const handleAccept = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/invitations/${invite.invitations[0]._id}`,
        { status: "Accepted" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setInvitationStatus("Accepted");
        Swal.fire("Success", "You have accepted the invitation!", "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  const handleDecline = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once declined, you won't be able to change this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff4d6d",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, Decline",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/invitations/${invite.invitations[0]._id}`,
            { status: "Declined" },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            setInvitationStatus("Declined");
            Swal.fire("Declined", "You have declined the invitation.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message || "Something went wrong", "error");
        }
      }
    });
  };

  // ✅ Calculate Days Left
  const eventDate = eventData.date ? new Date(eventData.date) : null;
  const today = new Date();
  const daysLeft = eventDate ? Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24)) : "N/A";

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
        <h2>Event Details</h2>
      </div>

      {/* Event Image & Days Left */}
      <div className={styles.eventImageContainer}>
        <img
          src={eventData.image ? `${process.env.REACT_APP_BASE_URL}/${eventData.image}` : "/assets/default-event.jpg"}
          alt="Event"
          className={styles.eventImage}
        />
        {daysLeft !== "N/A" && <div className={styles.daysLeft}>{daysLeft} Days Left</div>}
      </div>

      {/* Event Title */}
      <h3 className={styles.eventTitle}>{eventData.name}</h3>

      {/* Tabs Navigation */}
      <div className={styles.tabs}>
        <span className={activeTab === "details" ? styles.activeTab : ""} onClick={() => setActiveTab("details")}>
          Details
        </span>

        {/* ✅ Show Wishlist and Guests tabs ONLY IF the user has accepted the invite */}
        {invitationStatus === "Accepted" && (
          <>
            <span className={activeTab === "wishlist" ? styles.activeTab : ""} onClick={() => setActiveTab("wishlist")}>
              Wishlist
            </span>
            <span className={activeTab === "guests" ? styles.activeTab : ""} onClick={() => setActiveTab("guests")}>
              Guests
            </span>
          </>
        )}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "details" && (
          <>
            <p className={styles.detailItem}>
              <FaCalendarAlt className={styles.icon} /> {eventDate ? eventDate.toDateString() : "Invalid Date"}
            </p>
            <p className={styles.detailItem}>
              <FaMapMarkerAlt className={styles.icon} /> {eventData.location || "Unknown Location"}
            </p>
            <h4>About Event</h4>
            <p className={styles.aboutEvent}>{eventData.aboutEvent || "No details provided."}</p>
          </>
        )}

        {activeTab === "wishlist" && <Wishlist eventId={eventData.eventId} />} {/* ✅ Render Wishlist when accepted */}

        {activeTab === "guests" && <GuestSection eventId={eventData.eventId} />} {/* ✅ Render Guests List when accepted */}
      </div>

      {/* Accept/Decline Buttons or Start Chat */}
      <div className={styles.actions}>
        {invitationStatus === "Pending" && (
          <>
            <button className={styles.accept} onClick={handleAccept}>
              Accept
            </button>
            <button className={styles.decline} onClick={handleDecline}>
              Decline
            </button>
          </>
        )}
        {invitationStatus === "Accepted" && (
          <button className={styles.chatButton}>
            <FaCommentDots className={styles.chatIcon} /> Start Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
