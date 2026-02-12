import React from "react";
import "./FeeLedger.css";
import FeesView from "./FeesView";
import FeesManage from "./FeesManage";

export default function FeeLedger({ role }) {

  const canManage =
    role === "admin" ||
    role === "superadmin";

  return (
    <div className="fee-page">

      <div className="fee-header">
        <h2>Fee & Transport Management</h2>
      </div>

      {canManage ? (
        <FeesManage />
      ) : (
        <FeesView role={role} />
      )}

    </div>
  );
}
