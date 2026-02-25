// LibraryCreate.jsx
import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Table, Card, message } from "antd";

export default function LibraryCreate() {
  const [form] = Form.useForm();
  const [books, setBooks] = useState([]);

  const onFinish = (values) => {
    const newBook = {
      key: Date.now(),
      ...values,
      available: values.quantity,
    };

    setBooks([...books, newBook]);
    message.success("Book Added Successfully");
    form.resetFields();
  };

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Author", dataIndex: "author" },
    { title: "Category", dataIndex: "category" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Available", dataIndex: "available" },
  ];

  return (
    <div style={{ marginBottom: 40 }}>
      <Card title="Add New Book" style={{ marginBottom: 20 }}>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="title" label="Book Title" rules={[{ required: true }]}>
            <Input placeholder="Enter Book Title" />
          </Form.Item>

          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input placeholder="Enter Author Name" />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Input placeholder="e.g. Science, Math, Literature" />
          </Form.Item>

          <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Add Book
          </Button>
        </Form>
      </Card>

      <Card title="Book List">
        <Table columns={columns} dataSource={books} pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  );
}