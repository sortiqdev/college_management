// LibraryCreate.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Table,
  Card,
  message,
  Modal,
  Select,
  Empty,
  Tabs
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserAddOutlined
} from "@ant-design/icons";

import API from "../../../../../services/api";
import "./libraryCreate.css";

export default function LibraryCreate() {

  const [form] = Form.useForm();
  const [studentForm] = Form.useForm();
  const [issueForm] = Form.useForm();

  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [issueRecords, setIssueRecords] = useState([]);

  const [studentSearchText, setStudentSearchText] = useState("");
  const [bookSearchText, setBookSearchText] = useState("");

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  /* ================= FETCH DATA ================= */

const fetchBooks = useCallback(async () => {
  try {
    const res = await API.get("/books");
    setBooks(res.data.books || []);
  } catch {
    message.error("Failed to fetch books");
  }
}, []);

 const fetchStudents = useCallback(async () => {
  try {
    const res = await API.get("/students");
    setStudents(res.data.students || []);
  } catch {
    message.error("Failed to fetch students");
  }
}, []);
const fetchIssues = useCallback(async () => {
  try {
    const res = await API.get("/issues");
    setIssueRecords(res.data.issues || []);
  } catch {
    message.error("Failed to fetch issue records");
  }
}, []);

 useEffect(() => {
  fetchBooks();
  fetchStudents();
  fetchIssues();
}, [fetchBooks, fetchStudents, fetchIssues]);

  /* ================= ADD BOOK ================= */

  const onFinishBook = async (values) => {
    try {

      const payload = {
        ...values,
        available: values.quantity
      };

      await API.post("/books", payload);

      message.success("Book Added Successfully");

      fetchBooks();

      form.resetFields();

    } catch {
      message.error("Failed to add book");
    }
  };

  /* ================= ADD STUDENT ================= */

  const onFinishStudent = async (values) => {
    try {

      await API.post("/students", values);

      message.success("Student Added Successfully");

      fetchStudents();

      studentForm.resetFields();

      setIsStudentModalOpen(false);

    } catch {
      message.error("Failed to add student");
    }
  };

  /* ================= ISSUE BOOK ================= */

  const onFinishIssue = async (values) => {
    try {

      await API.post("/issues", values);

      message.success("Book Issued Successfully");

      fetchIssues();
      fetchBooks();

      issueForm.resetFields();

      setIsIssueModalOpen(false);

    } catch {
      message.error("Failed to issue book");
    }
  };

  /* ================= DELETE BOOK ================= */

  const deleteBook = async (id) => {
    try {

      await API.delete(`/books/${id}`);

      message.success("Book Deleted");

      fetchBooks();

    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= DELETE STUDENT ================= */

  const deleteStudent = async (id) => {
    try {

      await API.delete(`/students/${id}`);

      message.success("Student Deleted");

      fetchStudents();

    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= FILTER ================= */

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(bookSearchText.toLowerCase()) ||
    book.bookCode?.toLowerCase().includes(bookSearchText.toLowerCase())
  );

  const filteredRecords = issueRecords.filter((record) =>
    record.studentName?.toLowerCase().includes(studentSearchText.toLowerCase())
  );

  /* ================= BOOK TABLE ================= */

  const bookColumns = [
    {
      title: "Book Code",
      dataIndex: "bookCode",
      width: 50
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 50
    },
    {
      title: "Author",
      dataIndex: "author",
      width: 50
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 50
    },
    {
      title: "Total",
      dataIndex: "quantity",
      width: 50
    },
    {
      title: "Available",
      dataIndex: "available",
      width: 50
    },
    {
      title: "Action",
      width: 50,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteBook(record.id)}
        />
      )
    }
  ];

  /* ================= STUDENT TABLE ================= */

  const studentColumns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      width: 120
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 200
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: 130
    },
    {
      title: "Class",
      dataIndex: "class",
      width: 80
    },
    {
      title: "Library ID",
      dataIndex: "libraryId",
      width: 150
    },
    {
      title: "Action",
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteStudent(record.id)}
        />
      )
    }
  ];

  /* ================= ISSUE TABLE ================= */

  const issueColumns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      width: 150
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      width: 120
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      width: 220
    },
    {
      title: "Book Code",
      dataIndex: "bookCode",
      width: 120
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      width: 120
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      width: 120
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100
    }
  ];

  /* ================= TABS ================= */

  const tabItems = [

    {
      key: "1",
      label: "📚 Book Management",
      children: (
        <>
          <Card title="Add New Book" style={{ marginBottom: 20 }}>
            <Form layout="vertical" form={form} onFinish={onFinishBook}>

              <Form.Item name="title" label="Book Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="author" label="Author" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>

              <Button type="primary" htmlType="submit" block icon={<PlusOutlined />}>
                Add Book
              </Button>

            </Form>
          </Card>

          <Card title="Books List">

            <Input
              placeholder="Search by book title or code..."
              prefix={<SearchOutlined />}
              style={{ marginBottom: 20 }}
              onChange={(e) => setBookSearchText(e.target.value)}
            />

            <Table
              columns={bookColumns}
              dataSource={filteredBooks}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />

          </Card>
        </>
      )
    },

    {
      key: "2",
      label: "👥 Student Management",
      children: (
        <>
          <Card
            title="Students"
            extra={
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => setIsStudentModalOpen(true)}
              >
                Add Student
              </Button>
            }
          >

            <Table
              columns={studentColumns}
              dataSource={students}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />

          </Card>

          <Modal
            title="Add Student"
            open={isStudentModalOpen}
            onCancel={() => setIsStudentModalOpen(false)}
            footer={null}
          >

            <Form layout="vertical" form={studentForm} onFinish={onFinishStudent}>

              <Form.Item name="name" label="Student Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item name="class" label="Class" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Add Student
              </Button>

            </Form>

          </Modal>
        </>
      )
    },

    {
      key: "3",
      label: "📖 Issue Books",
      children: (
        <>
          <Card
            title="Book Issuance"
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsIssueModalOpen(true)}
              >
                Issue Book
              </Button>
            }
          >

            <Input
              placeholder="Search by student name..."
              prefix={<SearchOutlined />}
              style={{ marginBottom: 20 }}
              onChange={(e) => setStudentSearchText(e.target.value)}
            />

            <Table
              columns={issueColumns}
              dataSource={filteredRecords}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />

          </Card>

          <Modal
            title="Issue Book"
            open={isIssueModalOpen}
            onCancel={() => setIsIssueModalOpen(false)}
            footer={null}
          >

            <Form layout="vertical" form={issueForm} onFinish={onFinishIssue}>

              <Form.Item name="studentId" label="Select Student" rules={[{ required: true }]}>
                <Select>
                  {students.map((s) => (
                    <Select.Option key={s.id} value={s.studentId}>
                      {s.name} ({s.studentId})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="bookCode" label="Select Book" rules={[{ required: true }]}>
                <Select>
                  {books.map((b) => (
                    <Select.Option key={b.id} value={b.bookCode}>
                      {b.title} ({b.bookCode})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="issueDate" label="Issue Date" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>

              <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
                <Input type="date" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Issue Book
              </Button>

            </Form>

          </Modal>

        </>
      )
    }

  ];

  return (
    <div className="library-create-container">

      <Card className="header-card">
        <h2>📚 Teacher Library Management System</h2>
        <p>Manage books, students, and book issuance records</p>
      </Card>

      <Tabs items={tabItems} defaultActiveKey="1" />

    </div>
  );
}