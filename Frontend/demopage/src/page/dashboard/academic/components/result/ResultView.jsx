import React from "react";

export default function ResultView() {

  const resultData = []; // EMPTY DATA

  if (resultData.length === 0) {
    return (
      <div className="result-card">
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No Results Available</h3>
          <p>Your academic results will appear here once published.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="result-card">

      <table className="result-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Marks</th>
            <th>Obtained</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {resultData.map((item, index) => (
            <tr key={index}>
              <td>{item.subject}</td>
              <td>{item.total}</td>
              <td>{item.obtained}</td>
              <td>
                <span className="grade-badge">
                  {item.grade}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
