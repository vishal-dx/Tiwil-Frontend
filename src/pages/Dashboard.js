import React, { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa"; // Import icons
import Footer from "../components/footer/Footer";
import EventCard from "../components/eventcard/EventCard";
// import InvitationCard from "../components/invitation/InvitationCard"; // Import InvitationCard
import AddEventModal from "../components/addEvent/AddEventModal";
import { useNavigate } from "react-router-dom";
import InvitationCard from "../components/invitation/Invitaions";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [invitations, setInvitations] = useState([]); // Store invitations
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Events"); // Manage active tab

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setEvents(response.data.data);
          setFilteredEvents(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (activeTab === "Invitations") {
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
    }
  }, [activeTab]); // Fetch invitations only when "Invitations" tab is active

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(query) || event.date.includes(query)
    );
    setFilteredEvents(filtered);
  };

  const handlePlan = (eventId) => {
    if (!eventId) {
      console.error("Error: Event ID is missing");
      return;
    }
    navigate(`/event-detail/${eventId}`); // Navigate to the event detail page
  };

  const toggleAddOptions = () => {
    setShowAddOptions((prev) => !prev);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      const formData = new FormData();

      formData.append("userId", localStorage.getItem("userId"));
      formData.append("fullName", eventData.name);
      formData.append("dob", eventData.date);
      formData.append("relationType", eventData.relationType);
      formData.append("eventType", eventData.eventType);

      if (eventData.image) {
        formData.append("image", eventData.image);
      }

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create-event`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setEvents([...events, response.data.data]);
        setFilteredEvents([...events, response.data.data]);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsAddEventOpen(false);
    }
  };

  return (
    <div className={styles.dashboard}>
      <Navbar />
      <div className={styles.container}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search events by name or date..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <FaFilter
            className={styles.filterIcon}
            onClick={() => alert("Filter feature coming soon!")}
          />
        </div>

        {/* Tab Switching for Events & Invitations */}
        <div className={styles.tabContainer}>
          <button
            className={activeTab === "Events" ? styles.activeTab : ""}
            onClick={() => setActiveTab("Events")}
          >
            Events
          </button>
          <button
            className={activeTab === "Invitations" ? styles.activeTab : ""}
            onClick={() => setActiveTab("Invitations")}
          >
            Invitations
          </button>
        </div>

        {/* Content Based on Active Tab */}
        {loading ? (
          <div className={styles.loader}>Loading...</div>
        ) : activeTab === "Events" ? (
          <div className={styles.eventGrid}>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventCard
                  key={index}
                  event={event}
                  handlePlan={() => handlePlan(event.eventId)}
                />
              ))
            ) : (
              <p className={styles.noEvents}>No events found.</p>
            )}
          </div>
        ) : (
          <div className={styles.invitationGrid}>
            {invitations.length > 0 ? (
              invitations.map((invite, index) => (
                <InvitationCard key={index} invite={invite} />
              ))
            ) : (
              <p className={styles.noEvents}>No invitations found.</p>
            )}
          </div>
        )}
      </div>

      {/* Floating Add Button & Menu */}
      <div className={styles.floatingContainer}>
        {showAddOptions && (
          <div className={styles.addOptions}>
            <button onClick={() => setIsAddEventOpen(true)}>🎉 Add Event</button>
            <button onClick={() => setIsAddEventOpen(true)}>🎉 Add Member</button>
          </div>
        )}
        <button className={styles.floatingButton} onClick={toggleAddOptions}>
          <FaPlus />
        </button>
      </div>

      {/* Add Event Modal */}
      {isAddEventOpen && (
        <AddEventModal
          isOpen={isAddEventOpen}
          onClose={() => setIsAddEventOpen(false)}
          onSave={handleSaveEvent}
        />
      )}

      <Footer />
    </div>
  );
}

export default Dashboard;
