import React, { useState } from "react";

export default function AnnouncementCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "all",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting to empty API URL...");
    console.log(form);

    // API CALL PLACEHOLDER
    // fetch("", { method: "POST", body: JSON.stringify(form) })

    alert("Announcement Created (Frontend Only)");
  };

  return (
    <div className="announcement-create-card">
      <h3>Create Announcement</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Announcement Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          rows="4"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <select
          value={form.target}
          onChange={(e) =>
            setForm({ ...form, target: e.target.value })
          }
        >
          <option value="all">All</option>
          <option value="student">Students</option>
          <option value="parent">Parents</option>
          <option value="teacher">Teachers</option>
        </select>

        <button type="submit" className="primary-btn">
          Publish
        </button>
      </form>
    </div>
  );
}
