import React from "react";

export default function NoticeView({ role }) {

  const noticeData = []; // EMPTY DATA

  if (noticeData.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Notices Available</h3>
        <p>
          {role === "student"
            ? "School notices will appear here."
            : role === "parent"
            ? "Important notices for your child will appear here."
            : "Published notices will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="notice-list">
      {noticeData.map((notice, index) => (
        <div key={index} className="notice-card">

          <div className="notice-top">
            <h4>{notice.title}</h4>
            <span className="notice-category">
              {notice.category}
            </span>
          </div>

          <p>{notice.description}</p>

          <div className="notice-footer">
            <span>{notice.date}</span>

            {(role === "teacher" || role === "admin") && (
              <div className="notice-actions">
                <button className="edit-btn">
                  Edit
                </button>
                <button className="delete-btn">
                  Delete
                </button>
              </div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
