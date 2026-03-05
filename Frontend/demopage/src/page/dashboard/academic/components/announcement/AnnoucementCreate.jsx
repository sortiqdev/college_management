import React, { useState } from "react";

export default function AnnouncementCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "all",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Announcement Published");
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Publish
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
}