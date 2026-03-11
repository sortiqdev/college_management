/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Space, Modal, Form, Input, InputNumber, message } from "antd";
import API from "../../../../../../services/api";

const SubjectsCreate = () => {

  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // GET SUBJECTS
  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects");
      setSubjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // CREATE SUBJECT
  const handleAdd = async (values) => {
    try {
      await API.post("/subjects/create", values);

      message.success("Subject created successfully");

      form.resetFields();
      setOpen(false);

      fetchSubjects(); // refresh table
    } catch (error) {
      message.error(`$"failed to create subject"${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/subjects/${id}`);
      message.success("Subject deleted");
      fetchSubjects();
    } catch (error) {
      message.error(`$"Delete failed"${error.message}`);
    }
  };

  const columns = [
    {
      title: "Subject Code",
      dataIndex: "subjectCode",
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button type="link">Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Subjects"
      extra={
        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Subject
        </Button>
      }
    >

      <Table
        columns={columns}
        dataSource={subjects}
        rowKey="id"
      />

      <Modal
        title="Create Subject"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical" form={form} onFinish={handleAdd}>

          <Form.Item
            label="Subject Code"
            name="subjectCode"
            rules={[{ required: true }]}
          >
            <Input placeholder="CSE101" />
          </Form.Item>

          <Form.Item
            label="Subject Name"
            name="subjectName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Data Structures" />
          </Form.Item>

          <Form.Item
            label="Credits"
            name="credits"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Save Subject
          </Button>

        </Form>
      </Modal>
    </Card>
  );
};

export default SubjectsCreate;