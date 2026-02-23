import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Tag, Space, Spin, message, Drawer, Descriptions, Modal } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ClearOutlined,
  TeamOutlined
} from '@ant-design/icons';

const UserList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock departments
  const departments = [
    { label: 'Computer Science', value: 'computer_science' },
    { label: 'Mathematics', value: 'mathematics' },
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'English', value: 'english' },
    { label: 'Biology', value: 'biology' },
  ];

  // Mock classes
  const classes = [
    { label: 'Class 10 A', value: 'class_10_a' },
    { label: 'Class 10 B', value: 'class_10_b' },
    { label: 'Class 12 A', value: 'class_12_a' },
    { label: 'Class 12 B', value: 'class_12_b' },
  ];

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Mock API call - Replace with actual API endpoint
      // const response = await fetch('/api/users/list');
      // const data = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Empty data - API ready to connect
      const apiData = [];
      console.log('Fetching users from API: /api/users/list');
      
      setUsers(apiData);
      setFilteredUsers(apiData);
    } catch (error) {
      message.error('Failed to load users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchText) {
      filtered = filtered.filter(user =>
        user.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Role filter
    if (selectedRole) {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    // Department filter
    if (selectedDepartment) {
      filtered = filtered.filter(user => user.department === selectedDepartment);
    }

    // Class filter
    if (selectedClass) {
      filtered = filtered.filter(user => user.class === selectedClass);
    }

    setFilteredUsers(filtered);
  }, [searchText, selectedRole, selectedDepartment, selectedClass, users]);

  // Table columns
  const columns = [
    {
      title: 'Name',
      key: 'name',
      width: 180,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
            {record.firstName?.charAt(0)}{record.lastName?.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{record.firstName} {record.lastName}</p>
          </div>
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text) => <span className="text-gray-700">{text}</span>
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 130,
      render: (text) => <span className="text-gray-700">{text}</span>
    },
    {
      title: 'Designation',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role) => {
        let color = 'blue';
        if (role === 'teacher') color = 'green';
        if (role === 'student') color = 'purple';
        if (role === 'admin') color = 'red';
        return <Tag color={color} className="uppercase font-semibold">{role}</Tag>;
      }
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 150,
      render: (text) => <span className="text-gray-700">{text}</span>
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      width: 120,
      render: (text) => text ? <span className="text-gray-700 font-medium">{text}</span> : <span className="text-gray-400">-</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'orange'} className="font-semibold">
          {status === 'active' ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setDrawerVisible(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            View
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            className="border-amber-500 text-amber-600 hover:border-amber-600"
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </Button>
        </Space>
      )
    }
  ];

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: 'Delete User',
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: { danger: true },
      onOk() {
        // Mock delete API call
        console.log('Deleting user from API: /api/users/delete', id);
        message.success('User deleted successfully');
      }
    });
  };

  const handleExport = () => {
    console.log('Exporting users to CSV');
    message.info('Export functionality will be implemented');
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedRole(null);
    setSelectedDepartment(null);
    setSelectedClass(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TeamOutlined className="text-4xl text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Users List</h1>
        </div>
        <p className="text-gray-600">Manage and view all students and teachers in your organization</p>
      </div>

      <Spin spinning={loading} size="large">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border-t-4 border-blue-500">
          <div className="flex items-center gap-2 mb-6">
            <FilterOutlined className="text-blue-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search by Name/Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <Input
                placeholder="Search by name, email, phone..."
                prefix={<SearchOutlined className="text-gray-400" />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                size="large"
                className="rounded-lg"
              />
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
              <Select
                placeholder="Select designation"
                size="large"
                allowClear
                value={selectedRole}
                onChange={setSelectedRole}
                options={[
                  { label: 'Teacher', value: 'teacher' },
                  { label: 'Student', value: 'student' },
                  { label: 'Admin', value: 'admin' },
                  { label: 'Staff', value: 'staff' }
                ]}
                className="w-full"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <Select
                placeholder="Select department"
                size="large"
                allowClear
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                options={departments}
                className="w-full"
              />
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
              <Select
                placeholder="Select class"
                size="large"
                allowClear
                value={selectedClass}
                onChange={setSelectedClass}
                options={classes}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              <Button
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
                className="flex-1 h-10 font-semibold"
              >
                Clear
              </Button>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={handleExport}
                className="flex-1 h-10 bg-green-600 hover:bg-green-700 font-semibold"
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-md border-t-4 border-green-500 overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <TeamOutlined className="text-6xl text-gray-300 mb-4" />
              <p className="text-2xl font-semibold text-gray-600 mb-2">No Users Found</p>
              {users.length === 0 ? (
                <p className="text-gray-500">Connect to API and load users to get started</p>
              ) : (
                <p className="text-gray-500">No users match your current filters</p>
              )}
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredUsers.map((user, index) => ({
                ...user,
                key: user.id || index
              }))}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} users`,
                pageSizeOptions: [5, 10, 20, 50]
              }}
              scroll={{ x: 1200 }}
              bordered={false}
              className="custom-table"
            />
          )}
        </div>
      </Spin>

      {/* User Detail Drawer */}
      <Drawer
        title="User Details"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
      >
        {selectedUser && (
          <Descriptions column={1} bordered size="small">
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
            <Descriptions.Item label="Designation">
              <Tag color="blue">{selectedUser.role}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {selectedUser.department}
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              {selectedUser.class || '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedUser.status === 'active' ? 'green' : 'orange'}>
                {selectedUser.status === 'active' ? 'Active' : 'Inactive'}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>

      {/* API Info Comment */}
      {/* <div className="mt-8 bg-gray-800 rounded-lg p-4 text-gray-300 text-sm font-mono">
        <p className="text-yellow-400 font-semibold mb-2">API Integration:</p>
        <p>// GET /api/users/list - Fetch all users</p>
        <p>// POST /api/users/delete/:id - Delete user</p>
        <p className="mt-2 text-gray-400">Replace empty data with API response:</p>
        <p className="text-cyan-400">const apiData = await response.json();</p>
      </div> */}
    </div>
  );
};

export default UserList;