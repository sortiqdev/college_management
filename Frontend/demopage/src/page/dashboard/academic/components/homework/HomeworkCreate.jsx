import React, { useState } from "react";
import "./Homework.css";

export default function HomeworkCreate() {
  const [form, setForm] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    dueDate: "",
    assignmentFile: null,
    filePreview: null
  });

  const [assignments, setAssignments] = useState([]);
  const [studentSubmissions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit to API endpoint: /api/homework/create");
    console.log(form);

    // API Call Structure (ready to connect)
    // fetch("/api/homework/create", { 
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form)
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.error(err))

    // Add to assignments table
    const newAssignment = {
      id: Date.now(),
      ...form,
      createdDate: new Date().toLocaleDateString()
    };
    setAssignments([newAssignment, ...assignments]);

    // Reset form
    setForm({
      title: "",
      subject: "",
      class: "",
      description: "",
      dueDate: "",
      assignmentFile: null,
      filePreview: null
    });

    alert("Homework Created Successfully");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm({ ...form, assignmentFile: file, filePreview: preview });
    }
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  return (
    <div className="homework-container">
      {/* Create Homework Section */}
      <div className="homework-section">
        <div className="section-header">
          <h2>📝 Create Homework Assignment</h2>
          <span className="section-badge">New Assignment</span>
        </div>

        <form onSubmit={handleSubmit} className="homework-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Homework Title *</label>
              <input
                type="text"
                placeholder="Enter homework title"
                required
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                placeholder="e.g., Mathematics, English"
                required
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Class/Grade *</label>
              <input
                type="text"
                placeholder="e.g., Class 10, Grade A"
                required
                value={form.class}
                onChange={(e) =>
                  setForm({ ...form, class: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Due Date *</label>
              <input
                type="date"
                required
                value={form.dueDate}
                onChange={(e) =>
                  setForm({ ...form, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter assignment details, instructions, and requirements..."
              rows="4"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* File Upload Section */}
          <div className="file-upload-section">
            <div className="file-upload-area">
              <input
                type="file"
                id="assignmentFile"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="assignmentFile" className="file-upload-label">
                <div className="upload-icon">📎</div>
                <span className="upload-text">
                  {form.assignmentFile
                    ? form.assignmentFile.name
                    : "Click to upload or drag and drop (PDF, DOC, PNG, JPG)"}
                </span>
              </label>
            </div>

            {form.filePreview && (
              <div className="file-preview">
                <p>File Selected: {form.assignmentFile.name}</p>
                <button
                  type="button"
                  className="btn-remove-file"
                  onClick={() =>
                    setForm({ ...form, assignmentFile: null, filePreview: null })
                  }
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              ✓ Create Assignment
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setForm({
                  title: "",
                  subject: "",
                  class: "",
                  description: "",
                  dueDate: "",
                  assignmentFile: null,
                  filePreview: null
                })
              }
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Assignments Table Section */}
      <div className="homework-section">
        <div className="section-header">
          <h2>📋 Active Assignments</h2>
          <span className="badge-count">{assignments.length}</span>
        </div>

        {assignments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Assignments Yet</h3>
            <p>Create your first homework assignment above to get started</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="assignments-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Due Date</th>
                  <th>Created Date</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td className="title-cell">
                      <strong>{assignment.title}</strong>
                    </td>
                    <td>{assignment.subject}</td>
                    <td>{assignment.class}</td>
                    <td>
                      <span className="date-badge">{assignment.dueDate}</span>
                    </td>
                    <td>{assignment.createdDate}</td>
                    <td>
                      {assignment.assignmentFile ? (
                        <span className="file-indicator">✓ Attached</span>
                      ) : (
                        <span className="no-file">-</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit" title="Edit">
                          ✏️
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tests/Quizzes Section */}
      <div className="homework-section">
        <div className="section-header">
          <h2>🧪 Tests & Quizzes</h2>
          <span className="section-badge">New Test</span>
        </div>

        <div className="test-creation-area">
          <div className="test-card">
            <h3>Quick Test Creation</h3>
            <div className="test-options text-center">
              <button className="test-option-btn">
                <span className="icon">📝</span>
                <span>Create Multiple Choice Test</span>
              </button>
              <button className="test-option-btn">
                <span className="icon">✍️</span>
                <span>Create Short Answer Test</span>
              </button>
             
            </div>
          </div>
        </div>
      </div>

      {/* Student Submissions Table */}
      <div className="homework-section">
        <div className="section-header">
          <h2>📥 Student Submissions</h2>
          <span className="badge-count">{studentSubmissions.length}</span>
        </div>

        {studentSubmissions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Submissions Yet</h3>
            <p>Student submissions will appear here once they submit their assignments</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="submissions-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Assignment</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Submission File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentSubmissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.studentName}</td>
                    <td>{submission.assignmentTitle}</td>
                    <td>{submission.submittedDate}</td>
                    <td>
                      <span className={`status-badge status-${submission.status}`}>
                        {submission.status}
                      </span>
                    </td>
                    <td>{submission.grade || "-"}</td>
                    <td>
                      <a href="#" className="download-link">
                        📥 Download
                      </a>
                    </td>
                    <td>
                      <button className="btn-grade">Grade</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
