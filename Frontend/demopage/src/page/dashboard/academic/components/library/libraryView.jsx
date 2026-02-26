// LibraryView.jsx
import React, { useState } from "react";
import { Table, Input, Card, Tag, Empty, Divider } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import "./libraryView.css";

export default function LibraryView() {
  const [searchText, setSearchText] = useState("");

  // Static user library data
  const userLibraryCode = "LIB-2025-00456";
  const userName = "Rajesh Kumar";

  // Static borrowed books data (mock data from backend)
  const borrowedBooks = [
    {
      key: 1,
      bookCode: "BOOK-001",
      title: "Physics Fundamentals",
      author: "John Smith",
      category: "Science",
      dateTaken: "2025-01-15",
      dueDate: "2025-02-15",
      returnDate: null,
      reissueDate: null,
      status: "Active",
    },
    {
      key: 2,
      bookCode: "BOOK-002",
      title: "Advanced Mathematics",
      author: "R.K. Sharma",
      category: "Math",
      dateTaken: "2025-02-01",
      dueDate: "2025-03-01",
      returnDate: null,
      reissueDate: null,
      status: "Active",
    },
    {
      key: 3,
      bookCode: "BOOK-003",
      title: "Database Management Systems",
      author: "Elmasri & Navathe",
      category: "Technology",
      dateTaken: "2024-12-20",
      dueDate: "2025-01-20",
      returnDate: "2025-01-28",
      reissueDate: "2025-02-10",
      status: "Reissued",
    },
    {
      key: 4,
      bookCode: "BOOK-004",
      title: "Organic Chemistry",
      author: "Paula Bruice",
      category: "Science",
      dateTaken: "2025-01-25",
      dueDate: "2025-02-25",
      returnDate: null,
      reissueDate: null,
      status: "Active",
    },
  ];

  const filteredBooks = borrowedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase()) ||
    book.bookCode.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Book Code",
      dataIndex: "bookCode",
      key: "bookCode",
      width: 120,
      render: (text) => <span style={{ fontWeight: "500" }}>{text}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
      render: (text) => <span style={{ color: "#1890ff" }}>{text}</span>,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: 180,
    },
    {
      title: "Date Taken",
      dataIndex: "dateTaken",
      key: "dateTaken",
      width: 120,
      render: (text) => new Date(text).toLocaleDateString(),
    },
   
    
    {
      title: "Reissue Date",
      dataIndex: "reissueDate",
      key: "reissueDate",
      width: 130,
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
    },
     {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      width: 120,
      render: (text) => new Date(text).toLocaleDateString(),
    },
      {
      title: "Return Date",
      dataIndex: "returnDate",
      key: "returnDate",
      width: 130,
      render: (text) => (text ? new Date(text).toLocaleDateString() : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status) => {
        const color = status === "Active" ? "blue" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div className="library-view-container">
      {/* User Library Code Header */}
      <Card className="user-info-card">
        <div className="user-info-content">
          <div className="user-info-item">
            <UserOutlined className="info-icon" />
            <div>
              <p className="info-label">User Name</p>
              <p className="info-value">{userName}</p>
            </div>
          </div>
          <Divider type="vertical" style={{ height: 60 }} />
          <div className="user-info-item">
            <BookOutlined className="info-icon" />
            <div>
              <p className="info-label">Library Code Number</p>
              <p className="info-value">{userLibraryCode}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Borrowed Books Table */}
      <Card title="My Borrowed Books" className="books-table-card">
        <Input
          placeholder="Search by book title or code..."
          style={{ marginBottom: 20 }}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
        />

        {filteredBooks.length > 0 ? (
          <Table 
            columns={columns} 
            dataSource={filteredBooks} 
            pagination={{ pageSize: 5 }}
            scroll={{ x: 1200 }}
          />
        ) : (
          <Empty
            description={
              borrowedBooks.length === 0
                ? "No Books Borrowed"
                : "No books found matching your search"
            }
            style={{ marginTop: 50 }}
          />
        )}
      </Card>
    </div>
  );
}