import React, { useState } from "react";

export default function NoticeCreate() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    target: "all",
    description: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit to empty API URL");
    console.log(form);

    // fetch("", { method: "POST" })

    alert("Notice Published (Frontend Only)");
  };

  return (
    <div className="notice-create-card">
      <h3>Create Notice</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Notice Title"
          required
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Category (Exam / Holiday / Event)"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setForm({ ...form, target: e.target.value })
          }
        >
          <option value="all">All</option>
          <option value="student">Students</option>
          <option value="parent">Parents</option>
        </select>

        <textarea
          placeholder="Notice Description"
          rows="4"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <button className="primary-btn">
          Publish Notice
        </button>
      </form>
    </div>
  );
}
