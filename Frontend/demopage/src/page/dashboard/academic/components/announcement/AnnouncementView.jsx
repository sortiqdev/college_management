import React from "react";

export default function AnnouncementView({ role }) {

  // EMPTY DATA
  const announcements = [];

  if (announcements.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Announcements Available</h3>
        <p>Announcements will appear here once published.</p>
      </div>
    );
  }

  return (
    <div className="announcement-grid">
      {announcements.map((item, index) => (
        <div key={index} className="announcement-card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <span className="tag">{item.target}</span>

          {(role === "admin") && (
            <div className="card-actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
