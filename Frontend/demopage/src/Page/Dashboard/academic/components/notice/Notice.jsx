import React from "react";
import "./Notice.css";
import NoticeCreate from "./NoticeCreate";
import NoticeView from "./NoticeView";

export default function Notice({ role }) {
  return (
    <div className="notice-container">
      <div className="notice-header">
        <h2>📢 Notice Board</h2>
      </div>

      {(role === "teacher" || role === "admin") && (
        <NoticeCreate />
      )}

      <NoticeView role={role} />
    </div>
  );
}
