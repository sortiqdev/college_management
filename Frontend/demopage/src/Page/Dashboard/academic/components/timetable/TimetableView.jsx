import React, { useEffect, useState } from "react";
import API from "../../../../../services/api"; // adjust path
import { getStudentTimetable } from "../../../../../services/dataProvider";
export default function TimetableView() {

  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTimetable = async () => {
    try {
      const result = await getStudentTimetable();

      // ✅ Make sure it's always array
      setTimetable(Array.isArray(result) ? result : []);
    } catch {
      console.log("Timetable API not ready — showing empty state");
      setTimetable([]); // NEVER set null
    } finally {
      setLoading(false);
    }
  };

  fetchTimetable();
}, []);



  return (
    <div className="timetable-container">

      <div className="timetable-card">
        <h3>Your Class Timetable</h3>

        {loading ? (
          <div className="empty-state">
            Loading timetable...
          </div>
        ) : timetable.length === 0 ? (
          <div className="empty-state">
            No Timetable Available
          </div>
        ) : (
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.subject}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </div>
  );
}
