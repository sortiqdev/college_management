import React, { useState } from "react";
import { Input, Select, Button, Form, message } from "antd";
import { PlusOutlined, FolderOutlined } from "@ant-design/icons";
import API from "../../../../../services/api";

const { Option } = Select;

const DepartmentCreate = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const createdBy = user.role; // get role from localStorage

  const handleCreateDepartment = async (values) => {
    const payload = {
      departmentName: values.departmentName,
      departmentCode: values.departmentCode,
      departmentHeadId: values.departmentHeadId,
      departmentEmail: values.departmentEmail,
      phoneNumber: values.phoneNumber,
      location: values.location,
      status: values.status,
      description: values.description,
      createdBy: createdBy,
    };

    try {
      setLoading(true);

      const res = await API.post("departments",
        payload
      );

      
message.success(res.data.message || "Department created successfully");      

      form.resetFields();
    } catch (error) {
      message.error(`Failed to create department${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOutlined className="text-4xl text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">
            Department Management
          </h1>
        </div>
        <p className="text-gray-600">
          Create and manage departments within your organization
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-md p-8 border-t-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <PlusOutlined className="text-blue-600" />
          Create New Department
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateDepartment}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Department Name */}
            <Form.Item
              label="Department Name"
              name="departmentName"
              rules={[{ required: true, message: "Department name required" }]}
            >
              <Input placeholder="Computer Science" />
            </Form.Item>

            {/* Department Code */}
            <Form.Item
              label="Department Code"
              name="departmentCode"
              rules={[{ required: true, message: "Department code required" }]}
            >
              <Input placeholder="CSE" />
            </Form.Item>

            {/* Department Head */}
            <Form.Item
              label="Department Head"
              name="departmentHeadId"
              rules={[{  message: "Select department head" }]}
            >
              <Select placeholder="Select Faculty">
                <Option value="1">Dr John Doe</Option>
                <Option value="2">Dr Jane Smith</Option>
              </Select>
            </Form.Item>

            {/* Email */}
            <Form.Item
              label="Department Email"
              name="departmentEmail"
              rules={[
                { type: "email", message: "Enter valid email" },
              ]}
            >
              <Input placeholder="cse@university.edu" />
            </Form.Item>

            {/* Phone */}
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input placeholder="+91 XXXXXXXX" />
            </Form.Item>

            {/* Location */}
            <Form.Item label="Office Location" name="location">
              <Input placeholder="Building A - Room 302" />
            </Form.Item>

            {/* Status */}
            <Form.Item label="Status" name="status" initialValue="active">
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>

            {/* Description */}
            <Form.Item
              label="Description"
              name="description"
              className="md:col-span-2 lg:col-span-3"
            >
              <Input.TextArea rows={3} placeholder="Department description" />
            </Form.Item>

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              onClick={() => form.resetFields()}
            >
              Clear
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<PlusOutlined />}
            >
              Create Department
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DepartmentCreate;