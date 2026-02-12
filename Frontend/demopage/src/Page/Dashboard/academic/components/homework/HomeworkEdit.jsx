import React, { useState } from "react";

export default function HomeworkEdit({ homework }) {

  const [form, setForm] = useState(homework || {});

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log("Update to empty API URL");

    // fetch("", { method: "PUT" })

    alert("Homework Updated (Frontend Only)");
  };

  return (
    <div className="homework-create-card">
      <h3>Edit Homework</h3>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={form.title || ""}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          value={form.description || ""}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="primary-btn">Update</button>
      </form>
    </div>
  );
}
