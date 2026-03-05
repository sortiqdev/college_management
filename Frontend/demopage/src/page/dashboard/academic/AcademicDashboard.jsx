
import { Card, Tag, Spin } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
  SolutionOutlined,
  UserOutlined,
  BellOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import {useUser} from "../../../hooks/useUser"


export default function AcademicDashboard() {
  const { user} = useUser();
 

  const getDayOfWeek = (dateString) => {
    if (!dateString) return "Today";
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    return days[date.getDay()];
  };



  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      
      {/* ================= MAIN CARDS ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1: Student Profile */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-blue-500">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <UserOutlined className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800"> {user?.firstname} {user?.lastname}</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Roll Number</p>
              <p className="text-xl font-bold text-gray-900">{user?.rollnumber ?? "—"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Class</p>
              <p className="text-xl font-bold text-gray-900">{user?.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Student</p>
              <p className="text-lg font-semibold text-gray-700">{user?.firstname} {user?.lastname}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Attendance */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-green-500">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <CalendarOutlined className="text-2xl text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Attendance</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center py-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {user?.attendance ? `${user.attendance}%` : "—"}
              </div>
              <p className="text-xs text-gray-600 mt-1">Overall Attendance</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CheckCircleOutlined className="text-green-500 text-lg" />
                <span className="text-sm text-gray-700">{user?.presentDays ?? "0"} Present</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CloseCircleOutlined className="text-red-500 text-lg" />
                <span className="text-sm text-gray-700">{user?.absentDays ?? "0"} Absent</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <SolutionOutlined className="text-yellow-500 text-lg" />
                <span className="text-sm text-gray-700">{user?.leaveDays ?? "0"} Leave</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Assignments */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-purple-500">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FileTextOutlined className="text-2xl text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Assignments</h3>
          </div>
          <div className="space-y-4">
            <div className="text-center py-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">{user?.totalAssignments ?? "0"}</div>
              <p className="text-xs text-gray-600 mt-1">Total Assigned</p>
            </div>
            {user?.assignments?.length ? (
              <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-xs text-gray-500 uppercase font-semibold">Recent:</p>
                <p className="text-sm font-semibold text-gray-800 mt-1 truncate">{user.assignments[0]?.title}</p>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500">No assignments</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Notice */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-orange-500">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <BellOutlined className="text-2xl text-orange-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Notices</h3>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">📌 Check your announcements for important updates</p>
            <div className="flex items-center gap-2">
              <Tag color="blue">New</Tag>
              <span className="text-xs text-gray-500">Just now</span>
            </div>
            <button className="w-full mt-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-sm hover:shadow-md transition-all duration-300">
              View All
            </button>
          </div>
        </div>

      </div>

      {/* ================= TODAY'S CLASSES SECTION ================= */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <ClockCircleOutlined className="text-blue-600" />
            Today's Classes
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {user?.todayClasses?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.todayClasses.map((item, index) => (
              <div key={index} className="p-5 bg-gradient-to-br from-blue-50 to-blue-90 border-2 border-blue-200 rounded-xl hover:shadow-md hover:border-blue-400 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-blue-600 text-lg" />
                    <span className="font-semibold text-gray-800">{item.time}</span>
                  </div>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {getDayOfWeek(item.date)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{item.subject}</h4>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    👨‍🏫 <span>{item.teacher}</span>
                  </p>
                </div>

                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300">
                  View Details
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CalendarOutlined className="text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500 font-semibold">No classes scheduled for today</p>
          </div>
        )}
      </div>

    </div>
  );
}