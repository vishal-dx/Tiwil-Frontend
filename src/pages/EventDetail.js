import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/EventDetail.module.css";
import { FiShare2, FiMoreVertical } from "react-icons/fi";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import EventHistory from "../components/eventHistory/EventHistory";
import Wishlist from "../components/wishlist/Wishlist";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Details");

  useEffect(() => {
    const fetchEventDetail = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/events/${eventId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          setEvent(response.data.data);
          console.log(response.data)
          setDescription(response.data.data.aboutEvent || "");
          setLocation(response.data.data.location || "");
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetail();
    }
  }, [eventId]);

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete-event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event canceled successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error canceling the event:", error);
    }
    setShowMenu(false);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedEvent = { description, location };

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/events/${eventId}`,
        updatedEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setEvent((prevEvent) => ({
          ...prevEvent,
          aboutEvent: description,
          location,
        }));
        setIsEditing(false);
        alert("Event details updated successfully!");
      } else {
        alert("Failed to update event details.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading event details...</div>;
  }

  if (!event) {
    return <div className={styles.error}>Event not found!</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => navigate("/dashboard")} className={styles.backButton}>
            ← Dashboard
          </button>
          <div className={styles.actions}>
            <button className={styles.shareButton}>
              <FiShare2 />
            </button>
            <button className={styles.menuButton} onClick={() => setShowMenu((prev) => !prev)}>
              <FiMoreVertical />
            </button>
            {showMenu && (
              <div className={styles.menu}>
                <button onClick={handleEdit}>Edit Event</button>
                <button onClick={handleCancel}>Cancel Event</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.eventImage}>
          <img src={`${process.env.REACT_APP_BASE_URL}/${event.image}`} alt="Event" />
        </div>

        <div className={styles.eventContent}>
          <h1>{event.name}</h1>
          <div className={styles.eventTabs}>
            <span className={activeTab === "Details" ? styles.active : ""} onClick={() => setActiveTab("Details")}>
              Details
            </span>
            <span className={activeTab === "Wishlist" ? styles.active : ""} onClick={() => setActiveTab("Wishlist")}>
              Wishlist
            </span>
            <span className={activeTab === "Guests" ? styles.active : ""} onClick={() => setActiveTab("Guests")}>
              Guests
            </span>
            <span className={activeTab === "History" ? styles.active : ""} onClick={() => setActiveTab("History")}>
              History
            </span>
          </div>

          {activeTab === "Details" && (
            <>
              <div className={styles.eventInfo}>
                <div className={styles.eventDate}>📅 {new Date(event.date).toLocaleDateString()}</div>
                <div className={styles.eventLocation}>
                  📍 {isEditing ? (
                    <input
                      className={styles.editInput}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter event location..."
                    />
                  ) : (
                    <span>{location || "No location provided"}</span>
                  )}
                </div>
              </div>

              <p className={styles.eventDescription}>
                <h4>About Event</h4>
                {isEditing ? (
                  <textarea
                    className={styles.editDescription}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter event description..."
                  />
                ) : (
                  description || "No description available."
                )}
              </p>
            </>
          )}

          {activeTab === "Wishlist" && <Wishlist />}
          {activeTab === "Guests" && <p>Guests Section</p>}
          {activeTab === "History" && <EventHistory />} {/* ✅ Show history when clicked */}

          {/* ✅ Hide Save button when History is active */}
          {activeTab !== "History" && activeTab !== "Guests" && activeTab !== "Wishlist" && (
            <button className={styles.saveButton} onClick={handleSave}>
              Save →
            </button>
          )}


        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;
