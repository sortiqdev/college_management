import React from "react";
import "./Homework.css";
import HomeworkCreate from "./HomeworkCreate";
import HomeworkView from "./HomeworkView";

export default function Homework({ role }) {
  return (
    <div className="homework-container">
      <div className="homework-header">
        <h2>📘 Homework Assignment</h2>
      </div>

      {role === "teacher" && <HomeworkCreate />}

      <HomeworkView role={role} />
    </div>
  );
}
