import React from "react";
import "./Attendance.css";
import AttendanceView from "./AttendanceView";
import AttendanceCreate from "./AttendanceCreate";

export default function Attendance({ role }) {

  const getTitle = () => {
    if (role === "student") return "My Attendance";
    if (role === "parent") return "Child Attendance";
    if (role === "teacher") return "Manage Attendance";
    return "Attendance";
  };

  return (
    <div className="attendance-page">
      
      {/* Header */}
      <div className="attendance-header">
        <h2>{getTitle()}</h2>
      </div>

      {/* Teacher Mark Section */}
      {role === "teacher" && (
        <div className="attendance-create-section">
          <AttendanceCreate />
        </div>
      )}

      {/* View Section (All Roles) */}
      <AttendanceView role={role} />

    </div>
  );
}
