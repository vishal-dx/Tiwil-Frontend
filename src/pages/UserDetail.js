// import React, { useState } from "react";
// import styles from "../styles/UserDetail.module.css"
// function UserDetails() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     gender: "",
//     dateOfBirth: "",
//     location: "",
//     maritalStatus: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     console.log("Saved Data:", formData);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.avatarContainer}>
//         <img
//           src="https://via.placeholder.com/80"
//           alt="User Avatar"
//           className={styles.avatar}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Name</label>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Enter your name"
//           value={formData.fullName}
//           onChange={handleChange}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Phone Number</label>
//         <input
//           type="tel"
//           name="phoneNumber"
//           placeholder="+91 1234567890"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//         />
//         <span className={styles.callIcon}>📞</span>
//       </div>

//       <div className={styles.formGroup}>
//         <label>Gender</label>
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//         >
//           <option value="" disabled>
//             Select Gender
//           </option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//       </div>

//       <div className={styles.formGroup}>
//         <label>Date of Birth</label>
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Location</label>
//         <input
//           type="text"
//           name="location"
//           placeholder="Enter your location"
//           value={formData.location}
//           onChange={handleChange}
//         />
//       </div>

//       <div className={styles.formGroup}>
//         <label>Marital Status</label>
//         <select
//           name="maritalStatus"
//           value={formData.maritalStatus}
//           onChange={handleChange}
//         >
//           <option value="" disabled>
//             Select Status
//           </option>
//           <option value="Unmarried">Unmarried</option>
//           <option value="Married">Married</option>
//         </select>
//       </div>

//       <button className={styles.saveButton} onClick={handleSave}>
//         Save
//       </button>
//     </div>
//   );
// }

// export default UserDetails;
