import React from "react";
import "./DashboardHeader.css";
import { MenuOutlined } from "@ant-design/icons";
import { User } from "lucide-react";

export default function DashboardHeader() {

  return (
    <div className="main-header">

      {/* Left Section */}
      <div className="header-left">
        

        <select className="session-dropdown">
          <option>Date </option>
        </select>
      </div>

      {/* Right Section */}
      <div className="header-right">

        <div className="header-icon">🔔</div>

        {/* Empty Profile Placeholder */}
        <div className="user-profile">
         <div className="avatar-placeholder">
    <User size={40} />
  </div>

          <span className="user-name-placeholder">
            {/* No Name Until Backend */}
             user name placeholder 
          </span>
        </div>

      </div>

    </div>
  );
}
