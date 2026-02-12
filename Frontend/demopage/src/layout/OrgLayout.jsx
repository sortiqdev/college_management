import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/Header/DashboardHeader";

export default function OrgLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <DashboardHeader name="Student" />

        <main
          style={{
            flex: 1,
            padding: "24px",
            overflow: "auto",
            minWidth: 0,
            background: "#f5f7fa",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
