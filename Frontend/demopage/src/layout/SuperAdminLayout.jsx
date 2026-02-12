import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

export default function SuperAdminLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
