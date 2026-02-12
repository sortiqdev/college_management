import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/Header/DashboardHeader";

export default function MasterLayout() {
  return (
    <div className="master-layout">
      <Sidebar />

      <div className="master-content">
        <DashboardHeader name="SaaS Owner" />

        <main className="master-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
