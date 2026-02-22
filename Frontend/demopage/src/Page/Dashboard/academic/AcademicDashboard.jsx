import { useEffect, useState } from "react";
import { Card, Tag, Spin } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  SolutionOutlined
} from "@ant-design/icons";

import { getStudentDashboard } from "../../../services/dataProvider";

export default function AcademicDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result = await getStudentDashboard();
        setData(result);
      } catch {
        console.log("Dashboard API not ready");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ================= TOP INFO CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="rounded-2xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <BookOutlined className="text-3xl text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Roll Number</p>
              <h2 className="text-xl font-bold">
                {data?.rollNumber ?? "—"}
              </h2>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center gap-4">
            <CalendarOutlined className="text-3xl text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Class</p>
              <h2 className="text-xl font-bold">
                {data?.class ?? "—"}
              </h2>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center gap-4">
            <CalendarOutlined className="text-3xl text-purple-500" />
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <h2 className="text-xl font-bold">
                {data?.attendance ? `${data.attendance}%` : "—"}
              </h2>
            </div>
          </div>
        </Card>

      </div>

      {/* ================= DYNAMIC STAT CARDS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card className="rounded-2xl shadow-md border-l-4 border-emerald-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Days Present</p>
              <h1 className="text-3xl font-bold text-emerald-600">
                {data?.presentDays ?? "—"}
              </h1>
            </div>
            <CheckCircleOutlined className="text-3xl text-emerald-500" />
          </div>
        </Card>

        <Card className="rounded-2xl shadow-md border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Days Absent</p>
              <h1 className="text-3xl font-bold text-red-600">
                {data?.absentDays ?? "—"}
              </h1>
            </div>
            <CloseCircleOutlined className="text-3xl text-red-500" />
          </div>
        </Card>

        <Card className="rounded-2xl shadow-md border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Leave Taken</p>
              <h1 className="text-3xl font-bold text-yellow-600">
                {data?.leaveDays ?? "—"}
              </h1>
            </div>
            <SolutionOutlined className="text-3xl text-yellow-500" />
          </div>
        </Card>

        <Card className="rounded-2xl shadow-md border-l-4 border-indigo-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Assignments</p>
              <h1 className="text-3xl font-bold text-indigo-600">
                {data?.totalAssignments ?? "—"}
              </h1>
            </div>
            <FileTextOutlined className="text-3xl text-indigo-500" />
          </div>
        </Card>

      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Today's Classes */}
        <Card
          className="rounded-2xl shadow-md"
          title={
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg">
              Today's Classes
            </div>
          }
        >
          {data?.todayClasses?.length ? (
            data.todayClasses.map((item, index) => (
              <div
                key={index}
                className="p-4 mb-3 bg-gray-50 border-l-4 border-blue-500 rounded-lg"
              >
                <h4 className="font-semibold">{item.subject}</h4>
                <p className="text-sm text-gray-500">⏰ {item.time}</p>
                <p className="text-sm text-gray-500">👨‍🏫 {item.teacher}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No classes available</p>
          )}
        </Card>

        {/* Recent Assignments */}
        <Card
          className="rounded-2xl shadow-md"
          title={
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
              Recent Assignments
            </div>
          }
        >
          {data?.assignments?.length ? (
            data.assignments.map((item, index) => (
              <div
                key={index}
                className="p-4 mb-3 bg-gray-50 border-l-4 border-red-500 rounded-lg"
              >
                <h4 className="font-semibold">{item.title}</h4>
                <Tag color={item.status === "Pending" ? "red" : "green"}>
                  {item.status}
                </Tag>
                <p className="text-sm text-gray-500">
                  Due: {item.dueDate}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No assignments available</p>
          )}
        </Card>

      </div>

    </div>
  );
}