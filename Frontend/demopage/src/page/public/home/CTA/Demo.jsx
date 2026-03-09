import React, { useState } from "react";
import API from "../../../../services/api";

const DemoModal = ({ onClose }) => {

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...formData,
        requestType: "demo"
      };

      const res = await API.post("/demos", payload);

      console.log(res);

      setSuccessMsg("🎉 Demo request submitted successfully!");

      setTimeout(() => {
        setSuccessMsg("");
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

      <div className="bg-white w-[420px] rounded-3xl shadow-2xl p-8 relative">

        {/* Close Button */}
        <button
          className="absolute right-5 top-4 text-gray-500 text-xl hover:text-black"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-6">
          Schedule a Demo
        </h2>

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="fullName"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default DemoModal;