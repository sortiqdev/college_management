import { Tabs } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey = location.pathname.split("/").pop();

  const items = [
    {
      key: "",
      label: "Academic Reports",
    },
    {
      key: "fees",
      label: "Fee Reports",
    },
    {
      key: "payroll",
      label: "Payroll Reports",
    },
  ];

  const handleChange = (key) => {
    navigate(`/dashboard/admin/reports/${key}`);
  };

  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow-sm border p-6">

        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Reports
        </h1>

        <Tabs
          activeKey={activeKey}
          items={items}
          onChange={handleChange}
          className="mb-6"
        />

        {/* Child Pages */}
        <div className="mt-4">
          <Outlet />
        </div>

      </div>

    </div>
  );
}