import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/Header/DashboardHeader";

export default function OrgLayout() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
         <div
        style={{
         
          height: "100vh",
          overflowY: "auto",
          flexShrink: 0, // 🔥 VERY IMPORTANT
          background: "#0f172a",
         padding: "10px 10px",
        }}
      >
        <Sidebar />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
  
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden", // ✅ important
        }}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Main Scrollable Content */}
        <main
          style={{
            flex: 1,
            padding: "24px",
            overflowY: "auto", // ✅ only vertical scroll
            background: "#f5f7fa",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
