import { useEffect, useState } from "react";
import { Card, Tag, Spin } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  StarOutlined,

} from "@ant-design/icons";
import API from "../../../services/api";
import { getStudentDashboard } from "../../../services/dataProvider";


export default function AcademicDashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
          // const res = await API.get("/student/dashboard");
          // setData(res.data);
      // } catch (error) {
      //   console.log("Backend not ready — showing empty dashboard");
      //   setData(null);
        const result = await getStudentDashboard();
    setData(result);
      } catch{
        console.log()
      }
    };

    fetchDashboard();
  }, []);



  return (
    <div className="space-y-6">

      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {data?.name || "Student"} 👋
        </h1>
        <p className="text-gray-500">
          Here's your dashboard overview for today
        </p>
      </div>

      {/* Top Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card className="shadow-md rounded-xl">
          <div className="flex items-center gap-4">
            <BookOutlined className="text-3xl text-blue-500" />
            <div>
              <p className="text-gray-500 text-sm">Roll Number</p>
              <h3 className="font-semibold">
                {data?.rollNumber || "—"}
              </h3>
            </div>
          </div>
        </Card>

        <Card className="shadow-md rounded-xl">
          <div className="flex items-center gap-4">
            <CalendarOutlined className="text-3xl text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Class</p>
              <h3 className="font-semibold">
                {data?.class || "—"}
              </h3>
            </div>
          </div>
        </Card>



        <Card className="shadow-md rounded-xl">
          <div className="flex items-center gap-4">
            <CalendarOutlined className="text-3xl text-purple-500" />
            <div>
              <p className="text-gray-500 text-sm">Attendance</p>
              <h3 className="font-semibold">
                {data?.attendance ? `${data.attendance}%` : "—"}
              </h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Today's Classes */}
        <Card title="📚 Today's Classes" className="shadow-md rounded-xl">
          {data?.todayClasses?.length ? (
            data.todayClasses.map((item, index) => (
              <div
                key={index}
                className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-md mb-3"
              >
                <h4 className="font-semibold">{item.subject}</h4>
                <p className="text-sm text-gray-500">
                  ⏰ {item.time}
                </p>
                <p className="text-sm text-gray-500">
                  👨‍🏫 {item.teacher}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No classes today</p>
          )}
        </Card>

        {/* Recent Assignments */}
        <Card title="📝 Recent Assignments" className="shadow-md rounded-xl">
          {data?.assignments?.length ? (
            data.assignments.map((item, index) => (
              <div
                key={index}
                className="p-4 border-l-4 border-red-500 bg-gray-50 rounded-md mb-3"
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
