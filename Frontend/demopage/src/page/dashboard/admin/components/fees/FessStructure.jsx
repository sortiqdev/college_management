import React, { useState } from "react";
import { Card, Table, Button, Modal, Form, Input, InputNumber, Select, message } from "antd";
import API from "../../../../../services/api"; // your axios instance

const { Option } = Select;

const FessStructure = () => {

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const columns = [
    { title: "Department", dataIndex: "department" },
    { title: "Program", dataIndex: "program" },
    { title: "Tuition Fee", dataIndex: "tuition" },
    { title: "Library Fee", dataIndex: "library" },
    { title: "Lab Fee", dataIndex: "lab" },
    { title: "Total", dataIndex: "total" },
  ];

  // submit data
  const handleSubmit = async (values) => {
    try {

      const total =
        Number(values.tuition) +
        Number(values.library) +
        Number(values.lab);

      const payload = {
        department: values.department,
        program: values.program,
        tuition: values.tuition,
        library: values.library,
        lab: values.lab,
        total
      };

      await API.post("/fees/create-structure", payload);

      message.success("Fee structure created");

      setData([
        ...data,
        {
          key: Date.now(),
          ...payload
        },
      ]);

      setOpen(false);
      form.resetFields();

    } catch (error) {
      message.error(`"Failed to create structure"${error.message}`);
    }
  };

  return (
    <>
      <Card
        title="Fee Structure"
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            Add Structure
          </Button>
        }
      >
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      </Card>

      {/* Modal */}
      <Modal
        title="Add Fee Structure"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >

        <Form layout="vertical" form={form} onFinish={handleSubmit}>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Department">
              <Option value="Engineering">Engineering</Option>
              <Option value="Management">Management</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="program"
            label="Program / Course"
            rules={[{ required: true }]}
          >
            <Input placeholder="Example: B.Tech CSE" />
          </Form.Item>

          <Form.Item
            name="tuition"
            label="Tuition Fee"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder="Enter tuition fee" />
          </Form.Item>

          <Form.Item
            name="library"
            label="Library Fee"
          >
            <InputNumber style={{ width: "100%" }} placeholder="Enter library fee" />
          </Form.Item>

          <Form.Item
            name="lab"
            label="Lab Fee"
          >
            <InputNumber style={{ width: "100%" }} placeholder="Enter lab fee" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Structure
          </Button>

        </Form>

      </Modal>
    </>
  );
};

export default FessStructure;