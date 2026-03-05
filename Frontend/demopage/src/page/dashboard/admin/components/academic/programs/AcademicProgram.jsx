import React, { useState, useEffect } from "react";
import { Card, Input, Select, Button, message, Form } from "antd";
import axios from "axios";

const { Option } = Select;
const { TextArea } = Input;

const AcademicProgram = () => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  // Fetch Departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {

    try {

      const res = await axios.get("/api/departments");

      setDepartments(res.data.data || []);

    } catch (error) {

      message.error(`Failed to load department${error.message}`);

    }

  };

  // Submit Program
  const handleSubmit = async (values) => {

    try {

      setLoading(true);

      await axios.post("/api/programs", values);

      message.success("Program created successfully");

      form.resetFields();

    } catch (error) {

      message.error(`Failed to create program${error.message}`);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 bg-gray-50 min-h-screen">

      <Card
        title="Create Academic Program"
        className="max-w-3xl mx-auto shadow-sm"
      >

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >

          {/* Program Name */}

          <Form.Item
            label="Program Name"
            name="name"
            rules={[{ required: true, message: "Program name is required" }]}
          >
            <Input placeholder="Example: B.Tech Computer Science" />
          </Form.Item>


          {/* Program Code */}

          <Form.Item
            label="Program Code"
            name="code"
            rules={[{ required: true, message: "Program code required" }]}
          >
            <Input placeholder="Example: BTECH-CSE" />
          </Form.Item>


          {/* Department */}

          <Form.Item
            label="Department"
            name="departmentId"
            rules={[{ required: true, message: "Select department" }]}
          >
            <Select placeholder="Select Department">

              {departments.map((dept) => (
                <Option key={dept._id} value={dept._id}>
                  {dept.name}
                </Option>
              ))}

            </Select>
          </Form.Item>


          {/* Duration */}

          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Example: 4" />
          </Form.Item>


          {/* Duration Type */}

          <Form.Item
            label="Duration Type"
            name="durationType"
            initialValue="years"
          >
            <Select>

              <Option value="years">Years</Option>
              <Option value="months">Months</Option>
              <Option value="semesters">Semesters</Option>

            </Select>
          </Form.Item>


          {/* Total Semesters */}

          <Form.Item
            label="Total Semesters"
            name="totalSemesters"
          >
            <Input type="number" placeholder="Example: 8" />
          </Form.Item>


          {/* Description */}

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={3} placeholder="Program details..." />
          </Form.Item>


          {/* Status */}

          <Form.Item
            label="Status"
            name="status"
            initialValue="active"
          >
            <Select>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>


          {/* Submit */}

          <Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Create Program
            </Button>

          </Form.Item>

        </Form>

      </Card>

    </div>
  );
};

export default AcademicProgram;