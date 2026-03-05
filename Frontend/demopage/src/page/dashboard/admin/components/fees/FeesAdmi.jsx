import React from "react";
import { Card, Table, Tag } from "antd";

const FeesAdmin = () => {
  const columns = [
    { title: "Student", dataIndex: "student" },
    { title: "Program", dataIndex: "program" },
    { title: "Total Fee", dataIndex: "total" },
    { title: "Paid", dataIndex: "paid" },
    { title: "Pending", dataIndex: "pending" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "Paid" ? <Tag color="green">Paid</Tag> : <Tag color="red">Pending</Tag>,
    },
  ];

  const data = [
    {
      key: 1,
      student: "Aman Kumar",
      program: "B.Tech CSE",
      total: "₹58,000",
      paid: "₹40,000",
      pending: "₹18,000",
      status: "Pending",
    },
  ];

  return (
    <Card title="Student Fee Collection">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default FeesAdmin;