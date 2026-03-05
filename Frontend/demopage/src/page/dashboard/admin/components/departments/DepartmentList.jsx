import React, { useEffect, useState } from "react";
import { Input, Button, message, Popconfirm, Spin, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import GroupsIcon from "@mui/icons-material/Groups";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DepartmentCreate from "./DepartmentCreate";

const { Option } = Select;

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  /* ---------------- Fetch Departments ---------------- */

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/departments");

      setDepartments(res.data.data || []);
    } catch (error) {
      message.error(`Failed to fetch department${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  /* ---------------- Delete Department ---------------- */

  const handleDeleteDepartment = async (id) => {
    try {
      await axios.delete(`/api/departments/${id}`);

      message.success("Department deleted");

      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      message.error(`Failed to fetch department${error.message}`);
    }
  };

  /* ---------------- Filters ---------------- */

  const filteredDepartments = departments.filter((dept) => {
    const searchMatch =
      dept.departmentName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) || false;

    const programMatch =
      !programFilter || dept.program === programFilter;

    const statusMatch =
      !statusFilter || dept.status === statusFilter;

    return searchMatch && programMatch && statusMatch;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <GroupsIcon sx={{ fontSize: 36 }} />
        <div>
          <h1 className="text-2xl font-semibold">Departments</h1>
          <p className="text-gray-500 text-sm">
            Manage organization departments
          </p>
        </div>
      </div>

      {/* Container */}
      <div className="bg-white border rounded-lg p-6">

        {/* Top Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-5">

          <div className="flex gap-3">

            <Input
              placeholder="Search Department"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 220 }}
            />

            <Select
              placeholder="Program"
              allowClear
              style={{ width: 160 }}
              onChange={(v) => setProgramFilter(v)}
            >
              <Option value="B.Tech">B.Tech</Option>
              <Option value="MBA">MBA</Option>
            </Select>

            <Select
              placeholder="Status"
              allowClear
              style={{ width: 140 }}
              onChange={(v) => setStatusFilter(v)}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>

          </div>

          <Button type="primary" onClick={()=>navigate("add")}>
            + Create Department
          </Button>

        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">

          {loading ? (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          ) : (
            <table className="w-full text-sm">

              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left">Department</th>
                  <th className="px-5 py-3 text-left">Code</th>
                  <th className="px-5 py-3 text-left">Head</th>
                  <th className="px-5 py-3 text-center">Teachers</th>
                  <th className="px-5 py-3 text-center">Students</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredDepartments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-10 text-gray-400"
                    >
                      No departments found
                    </td>
                  </tr>
                ) : (
                  filteredDepartments.map((dept) => (
                    <tr
                      key={dept.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-5 py-4 font-medium">
                        {dept.departmentName}
                      </td>

                      <td className="px-5 py-4">
                        {dept.departmentCode || "-"}
                      </td>

                      <td className="px-5 py-4">
                        {dept.departmentHead || "-"}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {dept.teachers || 0}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {dept.students || 0}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {dept.status || "active"}
                      </td>

                      <td className="px-5 py-4 text-center">

                        <div className="flex justify-center gap-2">

                          <Button
                            icon={<EditIcon />}
                            size="small"
                          />

                          <Popconfirm
                            title="Delete department?"
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
                  ))
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
  );
};

export default DepartmentList;