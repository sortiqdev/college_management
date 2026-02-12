import React from "react";
import SyllabusUpload from "./SyllabusUpload";
import SyllabusView from "./SyllabusView";

export default function Syllabus({ role }) {

  const isTeacher = role === "teacher";

  return (
    <div className="syllabus-page">

      <div className="syllabus-header">
        <h2>Syllabus</h2>
      </div>

      {isTeacher ? <SyllabusUpload /> : <SyllabusView />}

    </div>
  );
}
