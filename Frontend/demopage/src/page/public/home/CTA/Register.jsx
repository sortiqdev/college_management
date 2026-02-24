import React, { useState } from "react";

const RegisterModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    feature: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("productEnquiry", JSON.stringify(form));
    alert("Enquiry submitted!");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal dark">
        <button className="close" onClick={onClose}>×</button>
        <h3>Get Started</h3>

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
          <input placeholder="Organization Name"
            onChange={(e) =>
              setForm({ ...form, organization: e.target.value })
            }
          />
          <select required
            onChange={(e) => setForm({ ...form, feature: e.target.value })}
          >
            <option value="">Select Feature Required</option>
            <option>Attendance Management</option>
            <option>Payroll</option>
            <option>Analytics</option>
            <option>Full Suite</option>
          </select>

          <button type="submit" className="btn primary full">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
