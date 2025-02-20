import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./InviteUsersPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

const InviteUsersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};  // Wish details from previous screen

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.data) {
          setUsers(response.data.data); // ✅ Fixed Data Mapping
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleInvite = async () => {
    if (selectedUsers.length === 0) {
      alert("⚠️ Please select at least one user to invite.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pool/invite`,
        { wishId: item._id, invitedUserIds: selectedUsers },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        alert("✅ Pool invitations sent successfully!");
        navigate(-1);
      }
    } catch (error) {
      console.error("❌ Error inviting users:", error);
      alert("⚠️ Failed to send invites.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
        <h2>Invite Users to Pool</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* User List */}
          <div className={styles.userList}>
            {users.map((user) => (
              <div key={user._id} className={styles.userItem} onClick={() => toggleSelectUser(user._id)}>
                <img src="/assets/user-profile.jpg" alt={user.fullName} className={styles.userAvatar} />
                <div className={styles.userDetails}>
                  <p className={styles.userName}>{user.fullName}</p>
                  <p className={styles.userPhone}>{user.phoneNumber}</p>
                </div>
                <input type="checkbox" checked={selectedUsers.includes(user._id)} readOnly />
              </div>
            ))}
          </div>

          {/* Invite Button */}
          <button className={styles.inviteButton} onClick={handleInvite}>
            SEND INVITE →
          </button>
        </>
      )}
    </div>
  );
};

export default InviteUsersPage;
