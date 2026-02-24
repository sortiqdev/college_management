import React, { useState } from "react";
import { Input, Button, message, Tag, Popconfirm } from "antd";

// ✅ Material UI Icons
import GroupsIcon from "@mui/icons-material/Groups";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DepartmentList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Computer Science",
      head: "Dr. Rajesh Kumar",
      description: "Department of Computer Science and Engineering",
      staff: 12,
      teachers: 8,
      students: 150,
      personCount: 170,
    },
    {
      id: 2,
      name: "Mathematics",
      head: "Prof. Anita Sharma",
      description: "Department of Mathematics",
      staff: 5,
      teachers: 6,
      students: 120,
      personCount: 131,
    },
    {
      id: 3,
      name: "Physics",
      head: "Dr. Vikram Singh",
      description: "Department of Physics",
      staff: 4,
      teachers: 5,
      students: 100,
      personCount: 109,
    },
    {
      id: 4,
      name: "English",
      head: "Ms. Priya Gupta",
      description: "Department of English Literature",
      staff: 3,
      teachers: 4,
      students: 80,
      personCount: 87,
    },
  ]);

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dept) => dept.id !== id));
    message.success("Department deleted successfully");
  };

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <GroupsIcon sx={{ fontSize: 40, color: "#16a34a" }} />
          <h1 className="text-4xl font-bold text-gray-900">
            Departments List
          </h1>
        </div>
        <p className="text-gray-600">
          View and manage all departments in your organization
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-green-500">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FolderIcon sx={{ color: "#16a34a" }} />
            All Departments
          </h2>
          <Tag color="blue" className="text-base px-3 py-1">
            Total: {departments.length}
          </Tag>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search by department name or head..."
            prefix={<SearchIcon style={{ color: "#9ca3af" }} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="large"
          />
        </div>

        {/* Table */}
        {filteredDepartments.length === 0 ? (
          <div className="text-center py-16">
            <FolderIcon sx={{ fontSize: 60, color: "#d1d5db" }} />
            <p className="text-xl text-gray-600 font-semibold mt-4">
              No Departments Found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-6 py-3 text-left">Department</th>
                  <th className="px-6 py-3 text-left">Head</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-center">Staff</th>
                  <th className="px-6 py-3 text-center">Teachers</th>
                  <th className="px-6 py-3 text-center">Students</th>
                  <th className="px-6 py-3 text-center">Total</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDepartments.map((dept, index) => (
                  <tr
                    key={dept.id}
                    className={`border-b hover:bg-blue-50 transition ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-blue-700">
                      {dept.name}
                    </td>

                    <td className="px-6 py-4">{dept.head}</td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {dept.description}
                    </td>

                    <td className="px-6 py-4 text-center text-purple-600 font-bold">
                      {dept.staff}
                    </td>

                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                      {dept.teachers}
                    </td>

                    <td className="px-6 py-4 text-center text-blue-600 font-bold">
                      {dept.students}
                    </td>

                    <td className="px-6 py-4 text-center text-orange-600 font-bold">
                      {dept.personCount}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          type="primary"
                          icon={<EditIcon />}
                          size="small"
                        />
                        <Popconfirm
                          title="Delete Department?"
                          onConfirm={() =>
                            handleDeleteDepartment(dept.id)
                          }
                        >
                          <Button
                            danger
                            icon={<DeleteIcon />}
                            size="small"
                          />
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats Section */}
        {filteredDepartments.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-600">
                {filteredDepartments.reduce(
                  (sum, d) => sum + d.staff,
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total Staff</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">
                {filteredDepartments.reduce(
                  (sum, d) => sum + d.teachers,
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total Teachers</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">
                {filteredDepartments.reduce(
                  (sum, d) => sum + d.students,
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>

            <div className="bg-orange-100 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-orange-600">
                {filteredDepartments.reduce(
                  (sum, d) => sum + d.personCount,
                  0
                )}
              </p>
              <p className="text-sm text-gray-600">Total People</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentList;