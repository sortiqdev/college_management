import React from "react";
import "./Profile.css";
import ProfileView from "./ProfileView";

export default function Profile({ role }) {

  return (
    <div className="profile-page">

      <div className="profile-header">
        <h2>Profile Details</h2>
      </div>

      <ProfileView role={role} />

    </div>
  );
}
