import React from "react";
import TimetableCreate from "./TimetableCreate";
import TimetableView from "./TimetableView";
import "./Timetable.css";

export default function Timetable({ role }) {

  const isTeacher = role === "teacher";

  return (
    <div className="timetable-page">

      <div className="timetable-header">
        <h2>Class Timetable</h2>
      </div>

      {isTeacher ? <TimetableCreate /> : <TimetableView />}

    </div>
  );
}
