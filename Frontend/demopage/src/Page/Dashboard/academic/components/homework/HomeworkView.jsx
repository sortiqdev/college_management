import React, { useEffect, useState } from "react";
import API from "../../../../../services/api"; // adjust path
import HomeworkEdit from "./HomeworkEdit";
import { getStudentHomework } from "../../../../../services/dataProvider";

export default function HomeworkView({ role }) {

  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        // 🔥 Backend API (when ready)
        // const res = await API.get("/student/homework");
        // setHomeworkData(Array.isArray(res.data) ? res.data : []);

        // TEMP: empty fallback
        // setHomeworkData([]);  // keep empty until backend ready
        
            const result = await getStudentHomework();
setHomeworkData(Array.isArray(result) ? result : []);




      } catch  {
        console.log("Homework API not ready - showing empty state");
        setHomeworkData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, []);

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="empty-state">
        <h3>Loading homework...</h3>
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!homeworkData.length) {
    return (
      <div className="empty-state">
        <h3>No Homework Assigned</h3>
        <p>Homework assignments will appear here.</p>
      </div>
    );
  }

  // ---------------- RENDER DATA ----------------
  return (
    <div className="homework-list">

      {homeworkData.map((item, index) => (
        <div key={index} className="homework-card">

          <h4>{item.title}</h4>
          <p>{item.description}</p>

          <div className="homework-meta">
            <span>Subject: {item.subject}</span>
            <span>Class: {item.className}</span>
            <span>Due: {item.dueDate}</span>
          </div>

          {/* STUDENT UI */}
          {role === "student" && (
            <div className="student-actions">
              <input type="file" />
              <button className="primary-btn">
                Upload Submission
              </button>
            </div>
          )}

          {/* TEACHER UI */}
          {role === "teacher" && (
            <div className="teacher-actions">
              <button
                className="edit-btn"
                onClick={() => setEditMode(true)}
              >
                Edit
              </button>
            </div>
          )}

        </div>
      ))}

      {editMode && <HomeworkEdit />}
    </div>
  );
}
