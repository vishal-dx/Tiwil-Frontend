import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "../styles/EventDetail.module.css";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Wishlist from "../components/wishlist/Wishlist";
import EventHistory from "../components/eventHistory/EventHistory";
import Swal from "sweetalert2";
import Guest from "../components/guests/Guest";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Details");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchEventDetail = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      console.log("Fetching event with ID:", eventId); // Debug log
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/events/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.success) {
          setEvent(response.data.data);
          setDescription(response.data.data.aboutEvent || "");
          setLocation(response.data.data.location || "");
        } else {
          console.error("Event fetch failed:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching event details:", error.response?.data || error.message);
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
        Swal.fire({
          icon: "success",
          title: "Event details updated successfully!",
          timer: 1000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to update event details.",
          text: response.data.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating event:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error verifying OTP.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading event details...</div>;
  }

  if (!event) {
    return <div className={styles.error}>Event not found!</div>;
  }
console.log(eventId,'id from eventdetail page')
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>← Event Details</button>
            <div className={styles.menuContainer}>
              <button onClick={() => setShowMenu(!showMenu)} className={styles.menuButton}>
                <FiMoreVertical />
              </button>
              {showMenu && (
                <div className={styles.dropdownMenu}>
                  <button onClick={handleEdit} className={styles.menuItem}>Edit Event</button>
                  <button onClick={handleCancel} className={styles.menuItem}>Cancel Event</button>
                </div>
              )}
            </div>
          </div>

          <img src={`${process.env.REACT_APP_BASE_URL}/${event.image}`} alt="Event" className={styles.eventImage} />

          <div className={styles.content}>
            <h1 className={styles.eventTitle}>{event.name}</h1>
            <div className={styles.tabs}>
              {["Details", "Wishlist", "Guests", "History"].map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? styles.activeTab : styles.tab}
                >
                  {tab}
                </span>
              ))}
            </div>

            {activeTab === "Details" && (
              <div className={styles.details}>
                <p className={styles.eventDate}>📅 {new Date(event.date).toLocaleDateString()}</p>
                <p className={styles.eventLocation}>📍 {isEditing ? <input className={styles.input} value={location} onChange={(e) => setLocation(e.target.value)} /> : location}</p>
                <h4 className={styles.aboutTitle}>About Event</h4>
                {isEditing ? (
                  <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
                ) : (
                  <p>{description}</p>
                )}
              </div>
            )}
{activeTab === "Wishlist" && <Wishlist eventId={eventId} imgUrl={`${process.env.REACT_APP_BASE_URL}/${event.image}`}/>}
{activeTab === "History" && <EventHistory />}
{activeTab === "Guests" && <Guest eventId={eventId} />}

          </div>

          {activeTab === "Details" && (
            <div className={styles.buttonContainer}>
              <button className={styles.saveButton} onClick={handleSave}>SAVE →</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;
