import React, { useState } from "react";

export default function HomeworkCreate() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    dueDate: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit to empty API URL");
    console.log(form);

    // fetch("", { method: "POST" })

    alert("Homework Created (Frontend Only)");
  };

  return (
    <div className="homework-create-card">
      <h3>Create Homework</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Homework Title"
          required
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Subject"
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Class"
          onChange={(e) =>
            setForm({ ...form, class: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          rows="4"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        <button className="primary-btn">Assign Homework</button>
      </form>
    </div>
  );
}
