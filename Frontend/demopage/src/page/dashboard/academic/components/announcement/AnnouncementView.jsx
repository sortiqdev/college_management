import React from "react";

import { FileTextOutlined } from "@ant-design/icons";

export default function AnnouncementView({ role }) {

  // EMPTY DATA
  const announcements = [];

  // header and layout
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileTextOutlined className="text-3xl text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
        </div>
        <p className="text-gray-600">Stay updated with the latest news</p>
      </div>

      {/* CONTENT */}
      {announcements.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-12 text-center">
          <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Announcements Available</h3>
          <p className="text-gray-600">Announcements will appear here once published.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
