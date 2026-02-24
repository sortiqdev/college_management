import React from "react";
import SyllabusUpload from "./SyllabusUpload";
import SyllabusView from "./SyllabusView";

export default function Syllabus({ role }) {

  const isTeacher = role === "teacher";

  return (
    <div className="syllabus-page">

     

      {isTeacher ? <SyllabusUpload /> : <SyllabusView />}

    </div>
  );
}
