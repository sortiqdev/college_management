import React, { useState } from "react";

export default function NoticeCreate() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    target: "all",
    description: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit to empty API URL");
    console.log(form);

    alert("Notice Published (Frontend Only)");
  };

  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-5xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Notice
            </h2>
            <p className="text-sm text-gray-500">
              Publish important information to users
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            Publish Notice
          </button>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Notice Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Title
            </label>

            <input
              type="text"
              placeholder="Notice Title"
              required
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <input
              type="text"
              placeholder="Category (Exam / Holiday / Event)"
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Target */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audience
            </label>

            <select
              onChange={(e) =>
                setForm({ ...form, target: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="all">All</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Description
            </label>

            <textarea
              rows="4"
              placeholder="Notice Description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>

            <input
              type="date"
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

        </form>
      </div>

    </div>
  );
}