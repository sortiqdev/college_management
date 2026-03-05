import React from "react";
import { Card, Table, Tag } from "antd";

const TeacherPayroll = () => {
  const columns = [
    { title: "Teacher Name", dataIndex: "name" },
    { title: "Department", dataIndex: "department" },
    { title: "Basic Salary", dataIndex: "salary" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) =>
        status === "Paid" ? <Tag color="green">Paid</Tag> : <Tag color="orange">Pending</Tag>,
    },
  ];

  const data = [
    { key: 1, name: "Rohit Sharma", department: "Mathematics", salary: "₹40,000", status: "Paid" },
    { key: 2, name: "Anita Verma", department: "Physics", salary: "₹45,000", status: "Pending" },
  ];

  return (
    <Card title="Teacher Payroll">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default TeacherPayroll;