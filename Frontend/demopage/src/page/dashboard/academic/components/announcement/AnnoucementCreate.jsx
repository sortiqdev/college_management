import React, { useState } from "react";
import axios from "axios";

export default function AnnouncementCreate() {

  const [loading,setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "all",
  });

  // Example user data (normally from JWT / Context / Redux)
  const user = JSON.parse(localStorage.getItem("user"))

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true)

      const payload = {
        ...form,
        createdBy:{
          userId:user?._id,
          role:user?.role
        }
      }

      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        "http://localhost:5000/api/announcements/create",
        payload
      );

      console.log("Payload Sent:",payload)

      alert("Announcement Published")

      setForm({
        title:"",
        description:"",
        target:"all"
      })

    } catch (error) {

      console.error(error)
      alert("Failed to publish announcement")

    } finally{
      setLoading(false)
    }

  };

  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Announcement
            </h2>
            <p className="text-sm text-gray-500">
              Publish important information to users
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Announcement Title
            </label>

            <input
              type="text"
              placeholder="Enter announcement title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <textarea
              rows="5"
              maxLength="500"
              placeholder="Write announcement details..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />

            <div className="text-right text-xs text-gray-400 mt-1">
              {form.description.length}/500 characters
            </div>
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audience
            </label>

            <select
              value={form.target}
              onChange={(e) =>
                setForm({ ...form, target: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              <option value="all">All Users</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>

        </form>
      </div>

    </div>
  );
}1