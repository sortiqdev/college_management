import React, { useState } from "react";
import "./Syllabus.css";

export default function SyllabusUpload() {

  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    // EMPTY URL (backend later)
    // fetch("", { method: "POST", body: formData })

    alert("Upload functionality will work after backend integration.");
  };

  return (
    <div className="syllabus-container">

      {/* Upload Form */}
      <div className="syllabus-card">

        <h3>Upload Syllabus PDF</h3>

        <form onSubmit={handleUpload} className="upload-form">

          <select required>
            <option>Select Class</option>
          </select>

          <select required>
            <option>Select Subject</option>
          </select>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit">Upload PDF</button>

        </form>

      </div>

      {/* Uploaded List */}
      <div className="syllabus-card">

        <h3>Uploaded Syllabus</h3>

        <div className="empty-state">
          No Syllabus Uploaded Yet
        </div>

      </div>

    </div>
  );
}
