/* eslint-disable no-unused-vars */
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
  Form,
} from "antd";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import API from "../../../../../services/api";

const { Option } = Select;

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [editingKey, setEditingKey] = useState("");

  const [form] = Form.useForm();

  const isEditing = (record) => record.id === editingKey;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const res = await API.get("roles");

      const data = res.data?.data?.data || [];

      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // EDIT
  // ========================

  const edit = (record) => {
    form.setFieldsValue({
      phone: record.phone,
      role: record.role,
    });

    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  // ========================
  // SAVE (PATCH API)
  // ========================

  const save = async (id) => {
    try {
      const row = await form.validateFields();

      const index = users.findIndex((item) => item.id === id);

      if (index === -1) return;

      const user = users[index];

      const formData = new FormData();

      formData.append("role", row.role || user.role);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("email", user.email);
      formData.append("phone", row.phone || user.phone);

      await API.patch(`roles/${id}`, formData);

      const updatedUsers = [...users];

      updatedUsers[index] = {
        ...user,
        ...row,
      };

      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);

      setEditingKey("");

      message.success("User updated successfully");
    } catch (error) {
      console.log(error);
      message.error("Update failed");
    }
  };

  // ========================
  // DELETE API
  // ========================

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      okType: "danger",

      async onOk() {
        try {
          await API.delete(`roles/${id}`);

          const updatedUsers = users.filter((user) => user.id !== id);

          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);

          message.success("User deleted successfully");
        } catch (error) {
          console.log(error);
          message.error("Delete failed");
        }
      },
    });
  };

  // ========================
  // TABLE COLUMNS
  // ========================

  const columns = [
    {
      title: "User",
      key: "name",
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
            {record.firstName?.charAt(0)}
          </div>

          <div>
            <p className="font-semibold">
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
      width: 150,
      render: (text, record) =>
        isEditing(record) ? (
          <Form.Item name="phone" style={{ margin: 0 }}>
            <Input />
          </Form.Item>
        ) : (
          text
        ),
    },

    {
      title: "Role",
      dataIndex: "role",
      width: 150,
      render: (text, record) =>
        isEditing(record) ? (
          <Form.Item name="role" style={{ margin: 0 }}>
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="student">Student</Option>
              <Option value="staff">Staff</Option>
            </Select>
          </Form.Item>
        ) : (
          <Tag color="blue">{text}</Tag>
        ),
    },

    {
      title: "Status",
      dataIndex: "status",
      width: 150,
      render: (status) => (
        <Tag color={status === "active" ? "green" : "orange"}>
          {status === "active" ? "Active" : "Inactive"}
        </Tag>
      ),
    },

    {
      title: "Actions",
      width: 260,
      render: (_, record) => {
        const editable = isEditing(record);

        return editable ? (
          <Space>
            <Button type="primary" onClick={() => save(record.id)}>
              Save
            </Button>

            <Button onClick={cancel}>Cancel</Button>
          </Space>
        ) : (
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

            <Button icon={<EditOutlined />} onClick={() => edit(record)}>
              Edit
            </Button>

            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteUser(record.id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <TeamOutlined className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      <Spin spinning={loading}>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <Form form={form} component={false}>
            <Table
              columns={columns}
              dataSource={filteredUsers.map((u) => ({
                ...u,
                key: u.id,
              }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
              }}
              scroll={{ x: 900 }}
            />
          </Form>
        </div>
      </Spin>

      {/* ========================
         USER DETAILS DRAWER
      ======================== */}

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
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default UserList;