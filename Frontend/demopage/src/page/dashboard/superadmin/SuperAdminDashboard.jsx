import React, { useEffect, useState } from "react";
import { Spin, Card, Tag } from "antd";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  CreditCardOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  BuildOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

export default function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState(null);

  useEffect(() => {
    // Simulate API call for single organization
    const fetchOrgData = async () => {
      try {
        setLoading(true);
        // const res = await API.get("/organization/dashboard");
        // setOrgData(res.data);

        // Mock data - single organization
        const mockData = {
          organizationName: "Tech Academy India",
          organizationEmail: "admin@techacademy.in",
          subscriptionPlan: "Premium",
          subscriptionStatus: "Active",
          subscriptionExpiry: "2026-12-31",
          daysRemaining: 312,
          totalStudents: 850,
          totalTeachers: 32,
          totalStaff: 15,
          monthlyBill: 5000,
          totalFunded: 45000,
          amountUsed: 32500,
          amountRemaining: 12500,
          features: {
            maxStudents: 1000,
            maxTeachers: 50,
            storage: "500GB",
            apiCalls: "Unlimited"
          },
          billingHistory: [
            { month: "Jan 2026", amount: 5000, status: "Paid" },
            { month: "Feb 2026", amount: 5000, status: "Paid" },
            { month: "Mar 2026", amount: 5000, status: "Pending" }
          ],
          usageData: [
            { month: "Jan", students: 600, teachers: 24, staff: 10 },
            { month: "Feb", students: 700, teachers: 28, staff: 12 },
            { month: "Mar", students: 750, teachers: 30, staff: 14 },
            { month: "Apr", students: 800, teachers: 31, staff: 14 },
            { month: "May", students: 820, teachers: 32, staff: 15 },
            { month: "Jun", students: 850, teachers: 32, staff: 15 }
          ],
          expenditureData: [
            { month: "Jan", amount: 5000 },
            { month: "Feb", amount: 5000 },
            { month: "Mar", amount: 5000 },
            { month: "Apr", amount: 5000 },
            { month: "May", amount: 5000 },
            { month: "Jun", amount: 5000 }
          ]
        };

        // Simulate delay
        setTimeout(() => {
          setOrgData(mockData);
          setLoading(false);
        }, 1000);
      } catch {
        console.log("Organization Dashboard API not ready");
        setLoading(false);
      }
    };

    fetchOrgData();
  }, []);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      
      {/* Header with Organization Info */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 mb-2">
            <BuildOutlined className="text-4xl text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{orgData?.organizationName}</h1>
              <p className="text-gray-600">{orgData?.organizationEmail}</p>
            </div>
          </div>
          <Tag color={orgData?.subscriptionStatus === "Active" ? "green" : "orange"} className="text-base px-3 py-1">
            {orgData?.subscriptionStatus}
          </Tag>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Subscription Plan Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CreditCardOutlined className="text-2xl text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-semibold">Subscription Plan</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{orgData?.subscriptionPlan}</h3>
              <p className="text-xs text-blue-600 mt-2">Expires: {orgData?.subscriptionExpiry}</p>
            </div>
          </div>
        </div>

        {/* Budget Status Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-green-500">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarOutlined className="text-2xl text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-semibold">Budget Status</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">${(orgData?.amountRemaining / 1000).toFixed(1)}K</h3>
              <p className="text-xs text-green-600 mt-2">Remaining of ${(orgData?.totalFunded / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>

        {/* Monthly Bill Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-purple-500">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <ShoppingCartOutlined className="text-2xl text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-semibold">Monthly Bill</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">${orgData?.monthlyBill}</h3>
              <p className="text-xs text-purple-600 mt-2">Per Month</p>
            </div>
          </div>
        </div>

        {/* Days Remaining Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-orange-500">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <CalendarOutlined className="text-2xl text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase font-semibold">Days Remaining</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{orgData?.daysRemaining}</h3>
              <p className="text-xs text-orange-600 mt-2">Days until expiry</p>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Left Side - Charts & Billing */}
        <div className="lg:col-span-2 space-y-6">

          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TeamOutlined className="text-green-600" />
              User Growth Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={orgData?.usageData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTeachers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="students" stroke="#3B82F6" fillOpacity={1} fill="url(#colorStudents)" />
                <Area type="monotone" dataKey="teachers" stroke="#10B981" fillOpacity={1} fill="url(#colorTeachers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Expenditure Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarOutlined className="text-blue-600" />
              Monthly Expenditure
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={orgData?.expenditureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileTextOutlined className="text-orange-600" />
              Billing History
            </h2>
            
            <div className="space-y-3">
              {orgData?.billingHistory.map((bill, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{bill.month}</p>
                    <p className="text-sm text-gray-600">${bill.amount}</p>
                  </div>
                  <Tag color={bill.status === "Paid" ? "green" : "orange"}>
                    {bill.status === "Paid" ? <CheckCircleOutlined /> : null} {bill.status}
                  </Tag>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side - Organization Stats & Features */}
        <div className="space-y-6">

          {/* Organization Users Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TeamOutlined className="text-blue-600" />
              Organization Users
            </h2>

            {/* Total Users Count */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-900">
                {orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff}
              </p>
              <p className="text-sm text-blue-700 mt-2">Total Active Users</p>
            </div>

            {/* Students */}
            <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-blue-90 rounded-lg border-2 border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                    <UserOutlined />
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 uppercase font-semibold">Students</p>
                    <p className="text-2xl font-bold text-blue-900">{orgData?.totalStudents}</p>
                  </div>
                </div>
                <p className="text-xs text-blue-600 font-semibold">{Math.round((orgData?.totalStudents / (orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff)) * 100)}%</p>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(orgData?.totalStudents / (orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Teachers */}
            <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-green-90 rounded-lg border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-600 text-white p-2 rounded-lg">
                    <UserOutlined />
                  </div>
                  <div>
                    <p className="text-xs text-green-700 uppercase font-semibold">Teachers</p>
                    <p className="text-2xl font-bold text-green-900">{orgData?.totalTeachers}</p>
                  </div>
                </div>
                <p className="text-xs text-green-600 font-semibold">{Math.round((orgData?.totalTeachers / (orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff)) * 100)}%</p>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(orgData?.totalTeachers / (orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Staff */}
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-90 rounded-lg border-2 border-orange-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-600 text-white p-2 rounded-lg">
                    <UserOutlined />
                  </div>
                  <div>
                    <p className="text-xs text-orange-700 uppercase font-semibold">Staff</p>
                    <p className="text-2xl font-bold text-orange-900">{orgData?.totalStaff}</p>
                  </div>
                </div>
                <p className="text-xs text-orange-600 font-semibold">{Math.round((orgData?.totalStaff / (orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff)) * 100)}%</p>
              </div>
              <div className="w-full bg-orange-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full"
                  style={{ width: `${(orgData?.totalStaff / (orgData?.totalStudents + orgData?.totalTeachers + orgData?.totalStaff)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Budget Allocation */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Budget Allocation</h2>

            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-900">${(orgData?.totalFunded / 1000).toFixed(1)}K</p>
              <p className="text-sm text-blue-700 mt-2">Total Budget</p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Used</span>
                  <span className="text-sm font-bold text-gray-900">${(orgData?.amountUsed / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-full"
                    style={{ width: `${(orgData?.amountUsed / orgData?.totalFunded) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Remaining</span>
                  <span className="text-sm font-bold text-gray-900">${(orgData?.amountRemaining / 1000).toFixed(1)}K</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-600 h-full"
                    style={{ width: `${(orgData?.amountRemaining / orgData?.totalFunded) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-xs text-yellow-700 font-semibold">Usage Rate: {((orgData?.amountUsed / orgData?.totalFunded) * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-purple-500">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Plan Features</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Max Students</span>
                <span className="text-lg font-bold text-purple-600">{orgData?.features.maxStudents}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Max Teachers</span>
                <span className="text-lg font-bold text-purple-600">{orgData?.features.maxTeachers}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-semibold">Storage</span>
                <span className="text-lg font-bold text-purple-600">{orgData?.features.storage}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-semibold">API Calls</span>
                <span className="text-lg font-bold text-purple-600">{orgData?.features.apiCalls}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
