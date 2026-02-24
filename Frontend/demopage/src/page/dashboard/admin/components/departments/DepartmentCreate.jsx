import React, { useState } from 'react';
import { Input, Select, Button, message, Tag, Popconfirm } from 'antd';
import {
  PlusOutlined,

  FolderOutlined,
  SearchOutlined
} from '@ant-design/icons';

const DepartmentCreate = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: '',
    head: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateDepartment = () => {
    if (!formData.departmentName || !formData.head || !formData.description) {
      message.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      message.success(`Department "${formData.departmentName}" created successfully!`);
      setFormData({
        departmentName: '',
        head: '',
        description: ''
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOutlined className="text-4xl text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Department Management</h1>
        </div>
        <p className="text-gray-600">Create and manage departments within your organization</p>
      </div>

      {/* Create Department Form */}
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8 border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <PlusOutlined className="text-blue-600" />
          Create New Department
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Department Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Computer Science"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleInputChange}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Department Head */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department Head <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Dr. John Doe"
              name="head"
              value={formData.head}
              onChange={handleInputChange}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="e.g., Department of Computer Science and Engineering"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="py-2 px-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setFormData({ departmentName: '', head: '', description: '' })}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Clear
          </Button>
          <Button
            onClick={handleCreateDepartment}
            loading={loading}
            className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <PlusOutlined /> Create Department
          </Button>
        </div>
      </div>



    </div>
  );
};

export default DepartmentCreate;