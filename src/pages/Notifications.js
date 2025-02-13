import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import styles from '../styles/Notification.module.css'; // Importing custom styles

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      user: "David Silbia",
      message: "Invite Jo Malone London’s Mother’s",
      time: "Just now",
      img: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      user: "Adnan Safi",
      message: "Started following you",
      time: "5 min ago",
      img: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      user: "Joan Baker",
      message: "Invite A virtual Evening of Smooth Jazz",
      time: "20 min ago",
      img: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      id: 4,
      user: "Ronald C. Kinch",
      message: "Like you events",
      time: "1 hr ago",
      img: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      id: 5,
      user: "Clara Tolson",
      message: "Join your Event Gala Music Festival",
      time: "9 hr ago",
      img: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      id: 6,
      user: "Jennifer Fritz",
      message: "Invite you International Kids Safe",
      time: "Tue, 5:10 pm",
      img: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      id: 7,
      user: "Eric G. Prickett",
      message: "Started following you",
      time: "Wed, 3:30 pm",
      img: "https://randomuser.me/api/portraits/men/7.jpg"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.header}>Notifications</h1>
        <div className={styles.notificationList}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.notificationItem}>
              <div className={styles.notificationText}>
                <div className={styles.imageWrapper}>
                  <img
                    src={notification.img}
                    alt={notification.user}
                    className={styles.profileImage}
                  />
                </div>
                <div className={styles.textWrapper}>
                  <strong>{notification.user}</strong> {notification.message}
                  <p className={styles.time}>{notification.time}</p>
                </div>
              </div>
              <div className={styles.buttons}>
                <button className={styles.rejectButton}>Reject</button>
                <button className={styles.acceptButton}>Accept</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
