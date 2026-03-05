import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css";
import { User } from "lucide-react";
import authService from "../../services/auth.service";

export default function DashboardHeader({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [today, setToday] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(formatted);
  }, []);

  // Handle logout with backend invalidation and session cleanup
  const handleLogout = async () => {
    try {
      // Call logout service to invalidate token and clear session
      await authService.logout();

      // Call parent component's onLogout if provided
      if (onLogout) {
        onLogout();
      }

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect to login even if logout failed
      navigate("/login", { replace: true });
    }
  };

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
              <div className="dropdown-item logout" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}