import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Tag,
  Space,
  Spin,
  message,
  Drawer,
  Descriptions,
  Modal,
} from "antd";

import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ClearOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const departments = [
    { label: "Computer Science", value: "computer_science" },
    { label: "Mathematics", value: "mathematics" },
    { label: "Physics", value: "physics" },
    { label: "Chemistry", value: "chemistry" },
  ];

  const classes = [
    { label: "Class 10 A", value: "10A" },
    { label: "Class 10 B", value: "10B" },
    { label: "Class 12 A", value: "12A" },
    { label: "Class 12 B", value: "12B" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const apiData = [];

      setUsers(apiData);
      setFilteredUsers(apiData);
    } catch (error) {
      message.error(`Failed to load user${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = users;

    if (searchText) {
      filtered = filtered.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    if (selectedDepartment) {
      filtered = filtered.filter(
        (user) => user.department === selectedDepartment
      );
    }

    if (selectedClass) {
      filtered = filtered.filter((user) => user.class === selectedClass);
    }

    setFilteredUsers(filtered);
  }, [searchText, selectedRole, selectedDepartment, selectedClass, users]);

  const columns = [
    {
      title: "User",
      key: "name",
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
            {record.firstName?.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              {record.firstName} {record.lastName}
            </p>
            <p className="text-xs text-gray-500">{record.email}</p>
          </div>
        </div>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      width: 140,
    },

    {
      title: "Role",
      dataIndex: "role",
      width: 120,
      render: (role) => {
        const colors = {
          admin: "red",
          teacher: "green",
          student: "purple",
          staff: "blue",
        };

        return <Tag color={colors[role]}>{role}</Tag>;
      },
    },

    {
      title: "Department",
      dataIndex: "department",
      width: 160,
    },

    {
      title: "Class",
      dataIndex: "class",
      width: 120,
      render: (text) => text || "-",
    },

    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "orange"}>
          {status === "active" ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setDrawerVisible(true);
            }}
          >
            View
          </Button>

          <Button icon={<EditOutlined />}>Edit</Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      okType: "danger",
      onOk() {
        message.success("User deleted");
      },
    });
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedRole(null);
    setSelectedDepartment(null);
    setSelectedClass(null);
  };

  const handleExport = () => {
    message.info("Export feature coming soon");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <TeamOutlined className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>

      <Spin spinning={loading}>
        {/* FILTERS */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <FilterOutlined className="text-blue-600" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Search */}

            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size="large"
              allowClear
            />

            {/* Role */}

            <Select
              placeholder="Select role"
              size="large"
              allowClear
              value={selectedRole}
              onChange={setSelectedRole}
            >
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="student">Student</Option>
              <Option value="staff">Staff</Option>
            </Select>

            {/* Department */}

            <Select
              placeholder="Department"
              size="large"
              allowClear
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              options={departments}
            />

            {/* Class */}

            <Select
              placeholder="Class"
              size="large"
              allowClear
              value={selectedClass}
              onChange={setSelectedClass}
              options={classes}
            />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 mt-6">
            <Button icon={<ClearOutlined />} onClick={handleClearFilters}>
              Clear
            </Button>

            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-xl shadow-sm p-4">
          {filteredUsers.length === 0 ? (
            <div className="py-16 text-center">
              <TeamOutlined className="text-5xl text-gray-300 mb-4" />

              <h2 className="text-xl font-semibold text-gray-600">
                No Users Found
              </h2>

              <p className="text-gray-400">
                Connect your API to load user data
              </p>
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredUsers.map((u, i) => ({
                ...u,
                key: i,
              }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
              }}
              scroll={{ x: 1100 }}
            />
          )}
        </div>
      </Spin>

      {/* DRAWER */}

      <Drawer
        title="User Details"
        placement="right"
        width={380}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedUser && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="First Name">
              {selectedUser.firstName}
            </Descriptions.Item>

            <Descriptions.Item label="Last Name">
              {selectedUser.lastName}
            </Descriptions.Item>

            <Descriptions.Item label="Email">
              {selectedUser.email}
            </Descriptions.Item>

            <Descriptions.Item label="Phone">
              {selectedUser.phone}
            </Descriptions.Item>

            <Descriptions.Item label="Role">
              {selectedUser.role}
            </Descriptions.Item>

            <Descriptions.Item label="Department">
              {selectedUser.department}
            </Descriptions.Item>

            <Descriptions.Item label="Class">
              {selectedUser.class || "-"}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default UserList;