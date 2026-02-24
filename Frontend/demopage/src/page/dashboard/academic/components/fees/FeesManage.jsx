import React from "react";

export default function FeesManage() {

  const manageData = []; // EMPTY

  return (
    <div className="fee-manage-container">

      {/* Filter Section */}
      <div className="filter-section">

        <select>
          <option>Select Class</option>
        </select>

        <select>
          <option>Select Route</option>
        </select>

        <select>
          <option>Select Pickup Point</option>
        </select>

        <input type="text" placeholder="Search Student Name" />

      </div>

      {/* Manage Table */}
      <div className="manage-table">

        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class</th>
              <th>Location</th>
              <th>Pickup Point</th>
              <th>Bus Route</th>
              <th>Bus Fare</th>
              <th>Hostel Fee</th>
              <th>Fine</th>
            </tr>
          </thead>

          <tbody>
            {manageData.length === 0 && (
              <tr>
                <td colSpan="8" className="empty-row">
                  No Student Fee Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}
