import React, { useState } from "react";
import "./Announcement.css";
import AnnouncementCreate from "./AnnoucementCreate";
import AnnouncementView from "./AnnouncementView";

export default function Announcement({ role }) {
  const [showCreate, setShowCreate] = useState(false);

  // Role permissions
  const canCreate = role === "admin" || role === "teacher";

  return (
    <div className="announcement-container">
      <div className="announcement-header">
        <h2>📢 Announcements</h2>

        {canCreate && (
          <button
            className="primary-btn"
            onClick={() => setShowCreate(!showCreate)}
          >
            {showCreate ? "Close" : "Create Announcement"}
          </button>
        )}
      </div>

      {showCreate && canCreate && (
        <AnnouncementCreate />
      )}

      <AnnouncementView role={role} />
    </div>
  );
}
