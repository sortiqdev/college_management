import React from "react";
import { Card, Table, Tag } from "antd";

const StudentFees = () => {
  const columns = [
    { title: "Student Name", dataIndex: "name" },
    { title: "Class", dataIndex: "class" },
    { title: "Total Fees", dataIndex: "fees" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "Paid" ? <Tag color="green">Paid</Tag> : <Tag color="red">Due</Tag>,
    },
  ];

  const data = [
    { key: 1, name: "Aman Singh", class: "10th", fees: "₹25,000", status: "Paid" },
    { key: 2, name: "Priya Gupta", class: "9th", fees: "₹22,000", status: "Due" },
  ];

  return (
    <Card title="Student Fees Management">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default StudentFees;