import React from "react";
import { Card, Table, Tag } from "antd";

const PayrollChangeRequest = () => {
  const columns = [
    { title: "Teacher", dataIndex: "teacher" },
    { title: "Request Type", dataIndex: "type" },
    { title: "Requested Salary", dataIndex: "salary" },
    {
      title: "Status",
      render: () => <Tag color="blue">Pending</Tag>,
    },
  ];

  const data = [
    {
      key: 1,
      teacher: "Anita Verma",
      type: "Salary Increment",
      salary: "₹50,000",
    },
  ];

  return (
    <Card title="Payroll Change Requests">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default PayrollChangeRequest;