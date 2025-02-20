import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./PoolingPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

const PoolingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { item } = location.state || {};

  const [pool, setPool] = useState(null);
  const [contribution, setContribution] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pool/${item._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          const fetchedPool = response.data.data;
          setPool(fetchedPool);

          // ✅ Check if pool is completed & update status in backend
          if (fetchedPool.collectedAmount >= fetchedPool.totalAmount && fetchedPool.status !== "Completed") {
            await axios.put(
              `${process.env.REACT_APP_BASE_URL}/update-status/${item._id}`,
              { status: "Completed" },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            // ✅ Update pool state after marking as completed
            setPool((prev) => ({ ...prev, status: "Completed" }));
          }
        }
      } catch (error) {
        console.error("Error fetching pool data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, [item._id]);

  const handleContribute = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/pool/contribute`,
        { wishId: item._id, amount: parseFloat(contribution) },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setPool(response.data.data);
        setContribution("");
      }
    } catch (error) {
      console.error("Error contributing to pool:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaArrowLeft className={styles.backIcon} onClick={() => navigate(-1)} />
        <h2>Pooling Wish</h2>
      </div>

      {loading ? (
        <p className={styles.loadingText}>Loading...</p>
      ) : (
        <>
          <div className={styles.imageContainer}>
            <img src={`${process.env.REACT_APP_BASE_URL}/${item.imageUrl}`} alt={item.giftName} className={styles.poolImage} />
            <div className={styles.poolInfo}>
              <p>Pool Amount: ${pool.totalAmount}</p>
              {pool.status === "Completed" ? (
                <p className={styles.completedText}>✅ Pool Completed!</p>
              ) : (
                <p>Pending Amount: ${pool.totalAmount - pool.collectedAmount}</p>
              )}
            </div>
          </div>

          <div className={styles.details}>
            <p className={styles.amountText}>Total amount wish: <strong>${item.price}</strong></p>

            {/* ✅ Show Contribution Input if Pool is Not Completed */}
            {pool.status !== "Completed" && (
              <>
                <p className={styles.contributeText}>My Contribution</p>
                <input
                  type="number"
                  value={contribution}
                  onChange={(e) => setContribution(e.target.value)}
                  placeholder="Enter amount"
                  className={styles.inputBox}
                />
                <button className={styles.saveAmountButton} onClick={handleContribute}>
                  SAVE AMOUNT →
                </button>
              </>
            )}

            {/* ✅ Show Contributors List if Pool is Completed */}
            {pool.status === "Completed" && (
              <div className={styles.contributorsList}>
                <h3 className={styles.poolMembers}>Pool Members</h3>
                {pool.contributors.map((contributor, index) => (
                  <div key={index} className={styles.contributorItem}>
                    <img
                      src={contributor.profileImage && contributor.profileImage !== "assets/default-user.png"
                        ? `${process.env.REACT_APP_BASE_URL}${contributor.profileImage}`
                        : `${process.env.PUBLIC_URL}/assets/default-user.png`}
                      alt="User"
                      className={styles.contributorAvatar}
                    />
                    <p className={styles.contributorName}>{contributor.name}</p>
                    <span className={styles.contributorAmount}>${contributor.amount}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Invite More Members (Only if Not Completed) */}
          {pool.status !== "Completed" && (
            <button className={styles.inviteButton} onClick={() => navigate("/pool-invite", { state: { item } })}>
              INVITE MORE MEMBERS →
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PoolingPage;
