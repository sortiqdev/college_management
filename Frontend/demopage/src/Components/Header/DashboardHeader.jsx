import React, { useState, useEffect } from "react";
import "./DashboardHeader.css";
import { User } from "lucide-react";

export default function DashboardHeader({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => async () => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setToday(formatted);
  }, []);

  return (
    <div className="main-header">
      
      {/* LEFT SIDE (Welcome + Date) */}
      <div className="header-left">
        <h2 className="welcome-text">
          Welcome, {user?.name || "User"} 👋
        </h2>
        <span className="header-date">{today}</span>
      </div>

      {/* RIGHT SIDE (Bell + Profile) */}
      <div className="header-right">
        <div className="header-icon">🔔</div>

        <div
          className="user-profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="avatar-placeholder">
            <User size={24} />
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item logout" onClick={onLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}