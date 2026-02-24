import React, { useState } from "react";

const DemoModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("demoRequest", JSON.stringify(form));
    alert("Demo scheduled successfully!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal light">
        <button className="close" onClick={onClose}>×</button>
        <h3>Schedule a Demo</h3>

        <form onSubmit={handleSubmit}>
          <input placeholder="Full Name" required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input type="email" placeholder="Email" required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input placeholder="Phone Number" required
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button type="submit" className="btn primary full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DemoModal;
