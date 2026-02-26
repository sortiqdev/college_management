// LibraryCreate.jsx
import React, { useState } from "react";
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
  Tabs,
  Divider,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import "./libraryCreate.css";

export default function LibraryCreate() {
  const [form] = Form.useForm();
  const [studentForm] = Form.useForm();
  const [issueForm] = Form.useForm();

  // Books state
  const [books, setBooks] = useState([
    {
      key: 1,
      bookCode: "BOOK-005",
      title: "Web Development Basics",
      author: "Jon Duckett",
      category: "Technology",
      quantity: 5,
      available: 3,
    },
    {
      key: 2,
      bookCode: "BOOK-006",
      title: "Python Programming",
      author: "Mark Lutz",
      category: "Technology",
      quantity: 4,
      available: 2,
    },
  ]);

  // Students state
  const [students, setStudents] = useState([
    {
      key: 1,
      studentId: "STU-001",
      name: "Amit Patel",
      email: "amit@college.com",
      phone: "9876543210",
      class: "12A",
      libraryId: "LIB-2025-00451",
    },
    {
      key: 2,
      studentId: "STU-002",
      name: "Priya Singh",
      email: "priya@college.com",
      phone: "9876543211",
      class: "12B",
      libraryId: "LIB-2025-00452",
    },
  ]);

  // Book issuance records state
  const [issueRecords, setIssueRecords] = useState([
    {
      key: 1,
      studentName: "Rajesh Kumar",
      studentId: "STU-001",
      bookTitle: "Physics Fundamentals",
      bookCode: "BOOK-001",
      issueDate: "2025-01-15",
      dueDate: "2025-02-15",
      status: "Issued",
    },
    {
      key: 2,
      studentName: "Priya Sharma",
      studentId: "STU-002",
      bookTitle: "Advanced Mathematics",
      bookCode: "BOOK-002",
      issueDate: "2025-02-01",
      dueDate: "2025-03-01",
      status: "Issued",
    },
    {
      key: 3,
      studentName: "Amit Patel",
      studentId: "STU-003",
      bookTitle: "Database Management Systems",
      bookCode: "BOOK-003",
      issueDate: "2024-12-20",
      dueDate: "2025-01-20",
      status: "Returned",
    },
  ]);

  const [studentSearchText, setStudentSearchText] = useState("");
  const [bookSearchText, setBookSearchText] = useState("");
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  // Add Book Handler
  const onFinishBook = (values) => {
    const newBook = {
      key: Date.now(),
      bookCode: `BOOK-${Math.floor(Math.random() * 10000)}`,
      ...values,
      available: values.quantity,
    };

    setBooks([...books, newBook]);
    message.success("Book Added Successfully");
    console.log("New Book:", newBook);
    console.log("All Books:", [...books, newBook]);
    console.log("newstudents:", students);
    console.log("issueRecords:", issueRecords);
    form.resetFields();
  };

  // Add Student Handler
  const onFinishStudent = (values) => {
    const newStudent = {
      key: Date.now(),
      studentId: `STU-${students.length + 1}`,
      libraryId: `LIB-2025-${String(450 + students.length + 1).padStart(5, "0")}`,
      ...values,
    };

    setStudents([...students, newStudent]);
    message.success("Student Added Successfully");
    studentForm.resetFields();
    setIsStudentModalOpen(false);
  };

  // Issue Book Handler
  const onFinishIssue = (values) => {
    const student = students.find((s) => s.studentId === values.studentId);
    const book = books.find((b) => b.bookCode === values.bookCode);

    if (!student || !book) {
      message.error("Invalid student or book");
      return;
    }

    const newRecord = {
      key: Date.now(),
      studentName: student.name,
      studentId: student.studentId,
      bookTitle: book.title,
      bookCode: book.bookCode,
      issueDate: values.issueDate,
      dueDate: values.dueDate,
      status: "Issued",
    };

    setIssueRecords([...issueRecords, newRecord]);

    // Update available books
    setBooks(
      books.map((b) =>
        b.bookCode === values.bookCode
          ? { ...b, available: b.available - 1 }
          : b
      )
    );

    message.success("Book Issued Successfully");
    issueForm.resetFields();
    setIsIssueModalOpen(false);
  };

  // Delete Book Handler
  const deleteBook = (key) => {
    setBooks(books.filter((book) => book.key !== key));
    message.success("Book Deleted");
  };

  // Delete Student Handler
  const deleteStudent = (key) => {
    setStudents(students.filter((student) => student.key !== key));
    message.success("Student Deleted");
  };

  // Filter data
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(bookSearchText.toLowerCase()) ||
      book.bookCode.toLowerCase().includes(bookSearchText.toLowerCase())
  );

  const filteredRecords = issueRecords.filter((record) =>
    record.studentName.toLowerCase().includes(studentSearchText.toLowerCase())
  );

  // Book Columns
  const bookColumns = [
    {
      title: "Book Code",
      dataIndex: "bookCode",
      key: "bookCode",
      width: 120,
      render: (text) => <span style={{ fontWeight: "600" }}>{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 220,
      render: (text) => <span style={{ color: "#1890ff" }}>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 160,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
    },
    {
      title: "Total",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
      width: 100,
      render: (text) => (
        <span style={{ color: text > 0 ? "#52c41a" : "#ff7875", fontWeight: "600" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => deleteBook(record.key)}
        />
      ),
    },
  ];

  // Student Columns
  const studentColumns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: 110,
      render: (text) => <span style={{ fontWeight: "600" }}>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text) => <span style={{ color: "#1890ff" }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 130,
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      width: 80,
      render: (text) => <span style={{ fontWeight: "500" }}>{text}</span>,
    },
    {
      title: "Library ID",
      dataIndex: "libraryId",
      key: "libraryId",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => deleteStudent(record.key)}
        />
      ),
    },
  ];

  // Issue Records Columns
  const issueColumns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      width: 150,
      render: (text) => <span style={{ fontWeight: "500" }}>{text}</span>,
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      width: 110,
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      key: "bookTitle",
      width: 220,
      render: (text) => <span style={{ color: "#1890ff" }}>{text}</span>,
    },
    {
      title: "Book Code",
      dataIndex: "bookCode",
      key: "bookCode",
      width: 120,
    },
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      key: "issueDate",
      width: 130,
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 130,
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        const color = status === "Issued" ? "blue" : "green";
        return <span style={{ color, fontWeight: "600" }}>{status}</span>;
      },
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: "📚 Book Management",
      children: (
        <div className="library-create-section">
          <Card title="Add New Book" style={{ marginBottom: 20 }}>
            <Form layout="vertical" form={form} onFinish={onFinishBook}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Form.Item
                  name="title"
                  label="Book Title"
                  rules={[{ required: true, message: "Please enter book title" }]}
                >
                  <Input placeholder="Enter Book Title" />
                </Form.Item>

                <Form.Item
                  name="author"
                  label="Author"
                  rules={[{ required: true, message: "Please enter author name" }]}
                >
                  <Input placeholder="Enter Author Name" />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: "Please select category" }]}
                >
                  <Input placeholder="e.g. Science, Math, Literature" />
                </Form.Item>

                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[{ required: true, message: "Please enter quantity" }]}
                >
                  <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
              </div>

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
              allowClear
            />
            {filteredBooks.length > 0 ? (
              <Table
                columns={bookColumns}
                dataSource={filteredBooks}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1200 }}
              />
            ) : (
              <Empty
                description={
                  books.length === 0 ? "No Books Added" : "No books found"
                }
                style={{ marginTop: 30 }}
              />
            )}
          </Card>
        </div>
      ),
    },
    {
      key: "2",
      label: "👥 Student Management",
      children: (
        <div className="library-create-section">
          <Card
            title="Students in System"
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
            {students.length > 0 ? (
              <Table
                columns={studentColumns}
                dataSource={students}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1200 }}
              />
            ) : (
              <Empty
                description="No Students Added"
                style={{ marginTop: 30 }}
              />
            )}
          </Card>

          {/* Add Student Modal */}
          <Modal
            title="Add New Student"
            open={isStudentModalOpen}
            onCancel={() => setIsStudentModalOpen(false)}
            footer={null}
            width={600}
          >
            <Form layout="vertical" form={studentForm} onFinish={onFinishStudent}>
              <Form.Item
                name="name"
                label="Student Name"
                rules={[{ required: true, message: "Please enter student name" }]}
              >
                <Input placeholder="Enter Full Name" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Invalid email format" },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  { required: true, message: "Please enter phone number" },
                ]}
              >
                <Input placeholder="Enter Phone Number" />
              </Form.Item>

              <Form.Item
                name="class"
                label="Class"
                rules={[{ required: true, message: "Please enter class" }]}
              >
                <Input placeholder="e.g. 12A, 12B" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Add Student
              </Button>
            </Form>
          </Modal>
        </div>
      ),
    },
    {
      key: "3",
      label: "📖 Issue Books",
      children: (
        <div className="library-create-section">
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
            {issueRecords.length > 0 ? (
              <>
                <Input
                  placeholder="Search by student name..."
                  prefix={<SearchOutlined />}
                  style={{ marginBottom: 20 }}
                  onChange={(e) => setStudentSearchText(e.target.value)}
                  allowClear
                />
                {filteredRecords.length > 0 ? (
                  <Table
                    columns={issueColumns}
                    dataSource={filteredRecords}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1400 }}
                  />
                ) : (
                  <Empty
                    description="No records found"
                    style={{ marginTop: 30 }}
                  />
                )}
              </>
            ) : (
              <Empty
                description="No Book Issuance Records"
                style={{ marginTop: 30 }}
              />
            )}
          </Card>

          {/* Issue Book Modal */}
          <Modal
            title="Issue Book to Student"
            open={isIssueModalOpen}
            onCancel={() => setIsIssueModalOpen(false)}
            footer={null}
            width={500}
          >
            <Form layout="vertical" form={issueForm} onFinish={onFinishIssue}>
              <Form.Item
                name="studentId"
                label="Select Student"
                rules={[{ required: true, message: "Please select student" }]}
              >
                <Select placeholder="Choose Student">
                  {students.map((student) => (
                    <Select.Option key={student.key} value={student.studentId}>
                      {student.name} ({student.studentId})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="bookCode"
                label="Select Book"
                rules={[{ required: true, message: "Please select book" }]}
              >
                <Select placeholder="Choose Book">
                  {books
                    .filter((book) => book.available > 0)
                    .map((book) => (
                      <Select.Option key={book.key} value={book.bookCode}>
                        {book.title} ({book.bookCode}) - {book.available} available
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="issueDate"
                label="Issue Date"
                rules={[{ required: true, message: "Please select issue date" }]}
              >
                <Input type="date" />
              </Form.Item>

              <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: "Please select due date" }]}
              >
                <Input type="date" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Issue Book
              </Button>
            </Form>
          </Modal>
        </div>
      ),
    },
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