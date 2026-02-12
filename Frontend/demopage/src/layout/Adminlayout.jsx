import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/Header/DashboardHeader";

export default function AdminLayout() {

  const user = {
    name: "Tanav",   // Later get from context or JWT
    role: "admin"
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* LEFT SIDEBAR */}
      <Sidebar role={user.role} />

      {/* RIGHT SIDE */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <DashboardHeader name={user.name} />

        {/* PAGE CONTENT */}
        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
