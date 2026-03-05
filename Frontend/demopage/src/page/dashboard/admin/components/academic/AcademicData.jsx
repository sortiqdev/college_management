import { Outlet } from "react-router-dom";

export default function AcademicData() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">Academic Data Management</h1>
        <Outlet />
      </div>
    </div>
  );
}