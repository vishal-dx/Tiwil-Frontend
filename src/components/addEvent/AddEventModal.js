import React, { useState } from "react";
import styles from "./AddEventModal.module.css";

const AddEventModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    relationType: "",
    gender: "",
    eventType: "",
    image: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Add Event</h2>

        {/* Name Field */}
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        {/* Date Field */}
        <div className={styles.formGroup}>
          <label>Date of Birth</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>

        {/* Relation Type Dropdown */}
        <div className={styles.formGroup}>
          <label>Relation Type</label>
          <select
            value={formData.relationType}
            onChange={(e) => handleInputChange("relationType", e.target.value)}
          >
            <option value="">Select Relation</option>
            <option value="Friend">Friend</option>
            <option value="Cousins">Cousins</option>
            <option value="In-laws">In-laws</option>
            <option value="Colleague">Colleague</option>
            <option value="Sibling">Sibling</option>
          </select>
        </div>

        {/* Gender Dropdown */}
        <div className={styles.formGroup}>
          <label>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Event Type Dropdown */}
        <div className={styles.formGroup}>
          <label>Event Type</label>
          <select
            value={formData.eventType}
            onChange={(e) => handleInputChange("eventType", e.target.value)}
          >
            <option value="">Select Event Type</option>
            <option value="Birthday">Birthday</option>
            <option value="Parent Anniversary">Parent Anniversary</option>
            <option value="Marriage Anniversary">Marriage Anniversary</option>
            <option value="Festival">Festival</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className={styles.formGroup}>
          <label>Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {formData.image && (
            <p className={styles.uploadedFileName}>
              Selected File: {formData.image.name}
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className={styles.buttonGroup}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;
