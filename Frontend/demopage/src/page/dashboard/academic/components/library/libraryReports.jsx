
import React from "react";
import { Card, Row, Col, Statistic, Table } from "antd";

export default function LibraryReports() {
  const stats = {
    totalBooks: 120,
    issued: 45,
    available: 75,
    overdue: 6,
  };

  const reportData = [
    {
      key: 1,
      student: "Rahul Verma",
      book: "Physics Fundamentals",
      issueDate: "2026-02-01",
      status: "Issued",
    },
    {
      key: 2,
      student: "Anita Sharma",
      book: "Advanced Mathematics",
      issueDate: "2026-01-28",
      status: "Overdue",
    },
  ];

  const columns = [
    { title: "Student", dataIndex: "student" },
    { title: "Book", dataIndex: "book" },
    { title: "Issue Date", dataIndex: "issueDate" },
    { title: "Status", dataIndex: "status" },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Books" value={stats.totalBooks} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Issued Books" value={stats.issued} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Available" value={stats.available} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Overdue" value={stats.overdue} />
          </Card>
        </Col>
      </Row>

      <Card title="Issue Reports">
        <Table columns={columns} dataSource={reportData} />
      </Card>
    </div>
  );
}