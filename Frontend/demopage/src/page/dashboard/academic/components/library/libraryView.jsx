// LibraryView.jsx
import React, { useState } from "react";
import { Table, Input, Card } from "antd";

export default function LibraryView() {
  const [searchText, setSearchText] = useState("");

  const books = [
    {
      key: 1,
      title: "Physics Fundamentals",
      author: "John Smith",
      category: "Science",
      available: 5,
    },
    {
      key: 2,
      title: "Advanced Mathematics",
      author: "R.K. Sharma",
      category: "Math",
      available: 2,
    },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Author", dataIndex: "author" },
    { title: "Category", dataIndex: "category" },
    { title: "Available", dataIndex: "available" },
  ];

  return (
    <Card title="Library Books">
      <Input
        placeholder="Search Books..."
        style={{ marginBottom: 20 }}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Table columns={columns} dataSource={filteredBooks} />
    </Card>
  );
}