import React, { useState } from 'react';
import { Card, Button, Tag, Badge, Spin, message, Modal } from 'antd';
import {
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  PlusOutlined,
  EyeOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const AdminDashboard = () => {
  // Mock Data
  const [dashboardData] = useState({
    totalTeachers: 48,
    presentTeachers: 42,
    totalLeaves: 6,
    upcomingMeetings: 4
  });

  const [teacherAttendance] = useState([
    { id: 1, name: 'Dr. Rajesh Kumar', status: 'present', time: '08:30 AM', subject: 'Computer Science' },
    { id: 2, name: 'Prof. Anita Sharma', status: 'present', time: '08:45 AM', subject: 'Mathematics' },
    { id: 3, name: 'Dr. Vikram Singh', status: 'absent', time: '-', subject: 'Physics' },
    { id: 4, name: 'Ms. Priya Gupta', status: 'present', time: '09:00 AM', subject: 'English' },
    { id: 5, name: 'Mr. Ajay Patel', status: 'present', time: '08:50 AM', subject: 'Chemistry' },
    { id: 6, name: 'Mrs. Nisha Verma', status: 'leave', time: '-', subject: 'Biology' }
  ]);

  const [leaveRequests] = useState([
    { id: 1, name: 'Dr. Vikram Singh', reason: 'Medical Appointment', from: '2026-02-24', to: '2026-02-24', status: 'pending' },
    { id: 2, name: 'Mrs. Nisha Verma', reason: 'Family Emergency', from: '2026-02-23', to: '2026-02-25', status: 'pending' },
    { id: 3, name: 'Mr. Rohit Kumar', reason: 'Casual Leave', from: '2026-03-01', to: '2026-03-03', status: 'pending' },
    { id: 4, name: 'Ms. Deepali Singh', reason: 'Sick Leave', from: '2026-02-20', to: '2026-02-22', status: 'approved' },
    { id: 5, name: 'Prof. Suresh Patel', reason: 'Conference', from: '2026-02-28', to: '2026-03-05', status: 'pending' },
    { id: 6, name: 'Dr. Meena Mishra', reason: 'Personal', from: '2026-03-10', to: '2026-03-10', status: 'rejected' }
  ]);

  const [meetings] = useState([
    { id: 1, title: 'Staff Meeting', time: '10:30 AM', date: 'Today', location: 'Conference Hall A', attendees: 25 },
    { id: 2, title: 'Department Review', time: '02:00 PM', date: 'Today', location: 'Office Room 101', attendees: 8 },
    { id: 3, title: 'Budget Planning', time: '11:00 AM', date: 'Tomorrow', location: 'Board Room', attendees: 12 },
    { id: 4, title: 'Parent-Teacher Meet', time: '03:30 PM', date: 'Feb 26', location: 'Main Hall', attendees: 40 }
  ]);

  const handleApproveLeave = () => {
    message.success('Leave approved successfully');
  };

  const handleRejectLeave = () => {
    message.error('Leave rejected');
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 text-lg">Monitor teacher attendance, manage leaves, and view upcoming meetings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Teachers Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-1">Total Teachers</p>
              <p className="text-4xl font-bold text-blue-600">{dashboardData.totalTeachers}</p>
            </div>
            <TeamOutlined className="text-5xl text-blue-200" />
          </div>
          <p className="text-gray-500 text-sm mt-4 flex items-center gap-1">
            <span className="text-blue-600 font-semibold">Active</span> All departments
          </p>
        </div>

        {/* Teachers Present Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-1">Present Today</p>
              <p className="text-4xl font-bold text-green-600">{dashboardData.presentTeachers}</p>
            </div>
            <CheckCircleOutlined className="text-5xl text-green-200" />
          </div>
          <p className="text-gray-500 text-sm mt-4">
            <span className="text-green-600 font-semibold">{Math.round((dashboardData.presentTeachers / dashboardData.totalTeachers) * 100)}%</span> Attendance Rate
          </p>
        </div>

        {/* Leave Requests Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-600 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-1">On Leave</p>
              <p className="text-4xl font-bold text-orange-600">{dashboardData.totalLeaves}</p>
            </div>
            <ClockCircleOutlined className="text-5xl text-orange-200" />
          </div>
          <p className="text-gray-500 text-sm mt-4 flex items-center gap-1">
            <span className="text-orange-600 font-semibold">{leaveRequests.filter(l => l.status === 'pending').length}</span> Pending approvals
          </p>
        </div>

        {/* Upcoming Meetings Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-600 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 font-semibold text-sm uppercase tracking-wide mb-1">Upcoming Meetings</p>
              <p className="text-4xl font-bold text-purple-600">{dashboardData.upcomingMeetings}</p>
            </div>
            <CalendarOutlined className="text-5xl text-purple-200" />
          </div>
          <p className="text-gray-500 text-sm mt-4">
            <span className="text-purple-600 font-semibold">2</span> Today, 2 This Week
          </p>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Left Column - Teacher Attendance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <UserOutlined className="text-blue-600" />
                Teacher Attendance
              </h2>
              <Button type="primary" icon={<PlusOutlined />} className="bg-blue-600 hover:bg-blue-700">
                Mark Attendance
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Subject</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 uppercase">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {teacherAttendance.map((teacher, index) => (
                    <tr
                      key={teacher.id}
                      className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <p className="font-semibold text-gray-900">{teacher.name}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-gray-700">{teacher.subject}</p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {teacher.status === 'present' && (
                          <Badge status="success" text={<span className="font-semibold text-green-600">Present</span>} />
                        )}
                        {teacher.status === 'absent' && (
                          <Badge status="error" text={<span className="font-semibold text-red-600">Absent</span>} />
                        )}
                        {teacher.status === 'leave' && (
                          <Badge status="warning" text={<span className="font-semibold text-orange-600">On Leave</span>} />
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm text-gray-600 font-medium">{teacher.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{teacherAttendance.length}</span> teachers
              </p>
              <Button type="link" className="text-blue-600">View All →</Button>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Info Cards */}
        <div className="space-y-6">
          {/* Attendance Summary */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-md p-6 border-t-4 border-green-500">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Attendance Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-green-200">
                <span className="text-gray-700 font-semibold">Present</span>
                <span className="text-2xl font-bold text-green-600">{dashboardData.presentTeachers}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-green-200">
                <span className="text-gray-700 font-semibold">Absent</span>
                <span className="text-2xl font-bold text-red-600">{dashboardData.totalTeachers - dashboardData.presentTeachers - dashboardData.totalLeaves}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 font-semibold">On Leave</span>
                <span className="text-2xl font-bold text-orange-600">{dashboardData.totalLeaves}</span>
              </div>
            </div>
          </div>

          {/* Next Meeting Card */}
          {meetings.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-md p-6 border-t-4 border-purple-500">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Meeting</h3>
              <div className="bg-white rounded-xl p-4">
                <p className="font-bold text-purple-600 text-lg">{meetings[0].title}</p>
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <CalendarOutlined className="text-purple-600" />
                    {meetings[0].date} at {meetings[0].time}
                  </p>
                  <p className="flex items-center gap-2">
                    <TeamOutlined className="text-purple-600" />
                    {meetings[0].attendees} Attendees Expected
                  </p>
                </div>
                <Button type="primary" block className="mt-4 bg-purple-600 hover:bg-purple-700">
                  View Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Leave Requests Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-orange-500 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ClockCircleOutlined className="text-orange-600" />
            Leave Requests
          </h2>
          <Tag color="orange">
            {leaveRequests.filter(l => l.status === 'pending').length} Pending
          </Tag>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaveRequests.map(leave => (
            <div key={leave.id} className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-gray-900">{leave.name}</p>
                  <p className="text-sm text-gray-600">{leave.reason}</p>
                </div>
                {leave.status === 'pending' && <Tag color="orange">Pending</Tag>}
                {leave.status === 'approved' && <Tag color="green">Approved</Tag>}
                {leave.status === 'rejected' && <Tag color="red">Rejected</Tag>}
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm text-gray-700">
                <p className="font-semibold mb-1">Duration</p>
                <p>{leave.from} to {leave.to}</p>
              </div>

              {leave.status === 'pending' && (
                <div className="flex gap-2">
                  <Button
                    type="primary"
                    size="small"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApproveLeave(leave.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    danger
                    size="small"
                    className="flex-1"
                    onClick={() => handleRejectLeave(leave.id)}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Meetings Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-purple-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarOutlined className="text-purple-600" />
            Upcoming Meetings
          </h2>
          <Button type="primary" icon={<PlusOutlined />} className="bg-purple-600 hover:bg-purple-700">
            Schedule Meeting
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetings.map(meeting => (
            <div key={meeting.id} className="border-2 border-purple-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-purple-50 to-transparent">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-gray-900 text-lg">{meeting.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{meeting.date} at {meeting.time}</p>
                </div>
                <Tag color="purple">{meeting.attendees}</Tag>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="flex items-center gap-2">
                  <TeamOutlined className="text-purple-600" />
                  {meeting.attendees} attendees expected
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="primary" size="small" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <EyeOutlined /> View
                </Button>
                <Button danger size="small" className="flex-1">
                  <DeleteOutlined /> Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
          <p className="text-sm text-gray-600">
            Total <span className="font-semibold">{meetings.length}</span> upcoming meetings
          </p>
          <Button type="link" className="text-purple-600">View Calendar →</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
