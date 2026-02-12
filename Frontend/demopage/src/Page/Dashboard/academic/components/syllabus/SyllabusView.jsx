import React, { useEffect, useState } from "react";
import "./Syllabus.css";
import { getStudentSyllabus } from "../../../../../services/dataProvider";
export default function SyllabusView() {

  const [syllabusList, setSyllabusList] = useState([]);
useEffect(() => {
  const fetchSyllabus = async () => {
    try {
      // const res = await API.get("/student/syllabus"); 
      // setSyllabusList(res.data || []);
      const result = await getStudentSyllabus();
      setSyllabusList(result);
    } catch (error) {
      console.log("Syllabus API not ready");
      setSyllabusList(null); // fallback empty
    }
  };

  fetchSyllabus();
}, []);

  return (
    <div className="syllabus-container">

      <div className="syllabus-card">

        <h3>Available Syllabus</h3>

        {syllabusList.length === 0 ? (
          <div className="empty-state">
            No Syllabus Available
          </div>
        ) : (
          <table className="syllabus-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {syllabusList.map((item, index) => (
                <tr key={index}>
                  <td>{item.class}</td>
                  <td>{item.subject}</td>
                  <td>
                    <a href={item.pdfUrl} target="_blank" rel="noreferrer">
                      View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </div>
  );
}
