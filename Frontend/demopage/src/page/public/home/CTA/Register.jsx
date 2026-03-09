import React, { useState } from "react";
import API from "../../../../services/api";

const RegisterModal = ({ onClose }) => {

  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    organizationName: "",
    featureRequired: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleApiSubmit = async (type) => {
    try {

      setLoading(true);

      const payload = {
        ...form,
        type
      };

      const res = await API.post("/enquiries", payload);
      console.log("show response: ", res);
      if (type === "trial") {
        setPopupMessage("🎉 Your 14 Day Trial has Started!");
      } else {
        setPopupMessage("✅ Your enquiry has been submitted!");
      }

      setTimeout(() => {
        setPopupMessage("");
        onClose();
      }, 2500);

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-black text-white w-[420px] rounded-3xl shadow-2xl p-8 relative">

        {/* Close Button */}
        <button
          className="absolute right-5 top-4 text-gray-400 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Get Started
        </h2>

        {popupMessage && (
          <div className="bg-green-500 text-white text-center p-3 rounded-lg mb-4">
            {popupMessage}
          </div>
        )}

        <div className="space-y-4">

          <input
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="organizationName"
            placeholder="Organization Name"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-blue-500 outline-none"
            onChange={handleChange}
          />

          <select
            name="featureRequired"
            className="w-full p-3 rounded-lg bg-black border border-gray-600 focus:border-blue-500 outline-none"
            onChange={handleChange}
          >
            <option value="">Select Feature Required</option>
            <option value="attendance">Attendance Management</option>
            <option value="payroll">Payroll</option>
            <option value="analytics">Analytics</option>
            <option value="fullSuite">Full Suite</option>
          </select>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              onClick={() => handleApiSubmit("trial")}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-3 rounded-xl hover:opacity-90"
            >
              {loading ? "Processing..." : "Start 14 Day Trial"}
            </button>

            <button
              onClick={() => handleApiSubmit("enquiry")}
              disabled={loading}
              className="flex-1 bg-white text-black py-3 rounded-xl hover:bg-gray-200"
            >
              {loading ? "Processing..." : "Submit Enquiry"}
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default RegisterModal;