import React, { useEffect, useState } from "react";
import API from "../../../../../services/api";
import { getStudentFees } from "../../../../../services/dataProvider";


export default function FeesView({ role }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      try {
        // Backend should return:
            // const res = await API.get("/fees"); 
        // setData(res.data || null);

        const result = await getStudentFees();
        setData(result);
      } catch  {
        console.log("Fees API not ready — showing empty state");
        setData(null); // keep empty for now
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  if (loading) {
    return (
      <div className="fee-view-container">
        <div className="empty-state">
          <p>Loading fee data...</p>
        </div>
      </div>
    );
  }

 return (
  <div className="fee-view-container">

    {/* ---------------- TRANSPORT SECTION ---------------- */}
    <div className="transport-card">
      <h3>Transport Details</h3>

      {!data?.transport ? (
        <div className="empty-state">
          <p>No Bus / Hostel Information Available</p>
        </div>
      ) : (
        <div className="transport-info">
          <p><strong>Route:</strong> {data.transport.route}</p>
          <p><strong>Pickup Point:</strong> {data.transport.pickupPoint}</p>
          <p><strong>Timing:</strong> {data.transport.timing}</p>
          <p><strong>Monthly Fare:</strong> ₹{data.transport.monthlyFare}</p>
        </div>
      )}
    </div>

    {/* ---------------- SUMMARY SECTION ---------------- */}
    <div className="fee-summary-grid">

      <div className="summary-card paid">
        <h3>{data?.summary?.paid ?? 0}</h3>
        <p>Total Paid</p>
      </div>

      <div className="summary-card due">
        <h3>{data?.summary?.due ?? 0}</h3>
        <p>Total Due</p>
      </div>

      <div className="summary-card fine">
        <h3>{data?.summary?.fine ?? 0}</h3>
        <p>Fine</p>
      </div>

    </div>

    {/* ---------------- TEACHER VIEW ---------------- */}
    {role === "teacher" && (
      <div className="class-fee-table">
        <h3>Class Fee Overview</h3>

        {!data?.classOverview?.length ? (
          <div className="empty-state">
            <p>No Fee Data Available</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Bus</th>
                <th>Hostel</th>
                <th>Total Due</th>
              </tr>
            </thead>
            <tbody>
              {data.classOverview.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.className}</td>
                  <td>{item.bus ? "Yes" : "No"}</td>
                  <td>{item.hostel ? "Yes" : "No"}</td>
                  <td>₹{item.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    )}

  </div>
);

}
