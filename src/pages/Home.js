// import React, { useEffect, useState } from "react";
// import Navbar from "../components/navbar/Navbar";
// import Footer from "../components/footer/Footer";
// import Card from "../components/card/Card"; // Reusable Card Component
// import styles from "../styles/Home.module.css";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";

// function Home() {
//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
//   const [events, setEvents] = useState([]);
//   const [invitations, setInvitations] = useState([]);
//   const [friendRequests, setFriendRequests] = useState([]);
//   const navigate = useNavigate(); // Initialize the navigate function

//   const messages = [
//     "Add & Organize Events and Celebrate Moments, Together.",
//     "Send invites to friends and family, making every celebration more meaningful.",
//     "Create wishlists, view friends' wishes, and mark gifts for purchase.",
//     "Join forces with friends to pool money for expensive gifts and make someone's day even more special.",
//   ];

//   const images = [
//     `${process.env.PUBLIC_URL}/assets/Group 38375.png`,
//     `${process.env.PUBLIC_URL}/assets/Group 38375 (1).png`,
//     `${process.env.PUBLIC_URL}/assets/Group 38375 (2).png`,
//     `${process.env.PUBLIC_URL}/assets/Group 38375 (3).png`,
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     fetchEvents();
//     fetchInvitations();
//     fetchFriendRequests();
//   }, []);

//   const fetchEvents = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/events`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.success && response.data.data) {
//         const eventsArray = Object.values(response.data.data)
//           .flat()
//           .map((event) => ({
//             ...event,
//             image: event.image
//               ? (event.image.startsWith("http") ? event.image : `${process.env.REACT_APP_BASE_URL}/${event.image}`)
//               : "/assets/default-event.png",
//           }));

//         setEvents(eventsArray);
//       } else {
//         setEvents([]); // Reset state if no data
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setEvents([]); // Handle errors gracefully
//     }
//   };

//   const fetchFriendRequests = async () => {
//     setFriendRequests([
//       { id: 1, name: "Rahul Sharma", image: "/assets/user.png" },
//       { id: 2, name: "Emily Watson", image: "/assets/user.png" },
//       { id: 3, name: "Amit Singh", image: "/assets/user.png" },
//     ]);
//   };

//   const fetchInvitations = async () => {
//     setInvitations([
//       { id: 1, name: "John's Birthday Party", date: "2025-03-15", image: "/assets/invite.png" },
//       { id: 2, name: "Alice's Wedding", date: "2025-04-20", image: "/assets/invite.png" },
//     ]);
//   };

//   const handleProgressClick = (index) => {
//     setCurrentMessageIndex(index);
//   };

//   const handleSeeMoreClick = () => {
//     navigate('/dashboard'); // Navigate to dashboard when "See More" is clicked
//   };

//   return (
//     <div className={styles.container}>
//       <Navbar />

//       {/* Carousel Section */}
//       <div className={styles.carousel}>
//         <div className={styles.carouselSlide} style={{ transform: `translateX(-${currentMessageIndex * 100}%)` }}>
//           {images.map((image, index) => (
//             <div key={index} className={styles.slide}>
//               <img src={image} alt={`Slide ${index + 1}`} className={styles.carouselImage} />
//               <p className={styles.message}>{messages[index]}</p>
//             </div>
//           ))}
//         </div>
//         <div className={styles.progressBoxContainer}>
//           {messages.map((_, index) => (
//             <div
//               key={index}
//               className={`${styles.progressBox} ${currentMessageIndex === index ? styles.active : ""}`}
//               onClick={() => handleProgressClick(index)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Events Section */}
//       <div className={styles.section}>
//         <h2>Upcoming Events</h2>
//         <div className={styles.grid}>
//           {events.length > 0 ? (
//             events.slice(0,8).map((event, index) => <Card key={index} item={event} type="event" />) // Show only 6 events
//           ) : (
//             <p className={styles.emptyText}>Loading Upcoming events.</p>
//           )}
//         </div>

//         {/* See More Button */}
//         {events.length > 6 && (
//           <button className={styles.seeMoreButton} onClick={handleSeeMoreClick}>
//             See More
//           </button>
//         )}
//       </div>

//       {/* Invitations Section */}
//       <div className={styles.section}>
//         <h2>Invitations</h2>
//         <div className={styles.grid}>
//           {invitations.length > 0 ? (
//             invitations.map((invite) => <Card key={invite.id} item={invite} type="invitation" />)
//           ) : (
//             <p className={styles.emptyText}>No invitations at the moment.</p>
//           )}
//         </div>
//       </div>

//       {/* Invite Friends Section */}
//       <div className={styles.section}>
//         <h2>Invite Friends to Join</h2>
//         <div className={styles.grid}>
//           {friendRequests.map((friend) => (
//             <Card key={friend.id} item={friend} type="friend" />
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Home;
