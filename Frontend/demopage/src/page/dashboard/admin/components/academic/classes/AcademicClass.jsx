import React, { useState } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Table,
  Row,
  Col,
  message
} from "antd";
import API from "../../../../../../services/api";

const { Option } = Select;

const AcademicClass =  () => {

  const [classes, setClasses] = useState([]);

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {

    const newClass = {
      key: Date.now(),
      ...values
    };

    setClasses([...classes, newClass]);
      await API.post("class-created", values);
    message.success("Class Created Successfully");

    form.resetFields();
  };

  const columns = [
    {
      title: "Department",
      dataIndex: "department"
    },
    {
      title: "Course",
      dataIndex: "course"
    },
    {
      title: "Semester",
      dataIndex: "semester"
    },
    {
      title: "Section",
      dataIndex: "section"
    },
    {
      title: "Block",
      dataIndex: "block"
    },
    {
      title: "Room",
      dataIndex: "room"
    },
    {
      title: "Capacity",
      dataIndex: "capacity"
    }
  ];

  return (
    <div style={{ padding: 20 }}>

      <h2>Class Management</h2>

      <Card title="Create Class" style={{ marginBottom: 20 }}>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >

          <Row gutter={16}>

            <Col span={6}>
              <Form.Item
                label="Department"
                name="department"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Department">
                  <Option value="CSE">Computer Science</Option>
                  <Option value="ME">Mechanical</Option>
                  <Option value="CE">Civil</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Course"
                name="course"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select Course">
                  <Option value="BTech">BTech</Option>
                  <Option value="MTech">MTech</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Semester"
                name="semester"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="1">1</Option>
                  <Option value="3">3</Option>
                  <Option value="5">5</Option>
                  <Option value="7">7</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Section"
                name="section"
                rules={[{ required: true }]}
              >
                <Input placeholder="A / B / C"/>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={16}>

            <Col span={6}>
              <Form.Item
                label="Block"
                name="block"
              >
                <Select placeholder="Block">
                  <Option value="A">Block A</Option>
                  <Option value="B">Block B</Option>
                  <Option value="C">Block C</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Room Number"
                name="room"
              >
                <Input placeholder="203"/>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Capacity"
                name="capacity"
              >
                <Input type="number" placeholder="60"/>
              </Form.Item>
            </Col>

          </Row>

          <Button type="primary" htmlType="submit">
            Create Class
          </Button>

        </Form>

      </Card>

      <Card title="All Classes">

        <Table
          columns={columns}
          dataSource={classes}
          pagination={{ pageSize: 6 }}
        />

      </Card>

    </div>
  );
};

export default AcademicClass;