import React, { useState, useEffect } from "react";
import API from "../../../../../services/api"; // adjust path if needed
import { getStudentAttendance } from "../../../../../services/dataProvider";
export default function AttendanceView() {
  const [activeTab, setActiveTab] = useState("overall");
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // const res = await API.get("/student/attendance"); 
        // backend will return:
        // {
        //   overall: { total, present, percentage },
        //   monthly: [ { month, total, present, percentage } ]
        // }
  
        // setAttendanceData(res.data);
  const result = await getStudentAttendance();
        setAttendanceData(result)
      } catch (error) {
        console.log("Attendance API not ready");
        setAttendanceData(null); // keep empty for now
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="attendance-wrapper">
        <div className="attendance-card">
          <div className="empty-state">
            <h3>Loading attendance...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance-wrapper">

      {/* Tabs */}
      <div className="attendance-tabs">
        <button
          className={`tab-btn ${activeTab === "overall" ? "active" : ""}`}
          onClick={() => setActiveTab("overall")}
        >
          Overall Attendance
        </button>

        <button
          className={`tab-btn ${activeTab === "monthly" ? "active" : ""}`}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly Attendance
        </button>
      </div>

      <div className="attendance-card">

        {/* OVERALL TAB */}
        {activeTab === "overall" && (
          <>
            {!attendanceData?.overall ? (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <h3>No Attendance Data Available</h3>
                <p>Your overall attendance will appear here.</p>
              </div>
            ) : (
              <div className="summary-grid">
                <div className="summary-box">
                  <h4>Total Classes</h4>
                  <p>{attendanceData.overall.total}</p>
                </div>
                <div className="summary-box present">
                  <h4>Present</h4>
                  <p>{attendanceData.overall.present}</p>
                </div>
                <div className="summary-box percentage">
                  <h4>Attendance %</h4>
                  <p>{attendanceData.overall.percentage}%</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* MONTHLY TAB */}
        {activeTab === "monthly" && (
          <>
            {!attendanceData?.monthly?.length ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>No Monthly Attendance</h3>
                <p>Monthly attendance records will appear here.</p>
              </div>
            ) : (
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Total Classes</th>
                    <th>Present</th>
                    <th>Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.monthly.map((item, index) => (
                    <tr key={index}>
                      <td>{item.month}</td>
                      <td>{item.total}</td>
                      <td>{item.present}</td>
                      <td>{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}

      </div>
    </div>
  );
}
