import React from "react";
import { Card, Table, Button } from "antd";

const PayrollApproval = () => {
  const columns = [
    { title: "Teacher", dataIndex: "teacher" },
    { title: "Month", dataIndex: "month" },
    { title: "Amount", dataIndex: "amount" },
    {
      title: "Action",
      render: () => (
        <>
          <Button type="primary" size="small">Approve</Button>{" "}
          <Button danger size="small">Reject</Button>
        </>
      ),
    },
  ];

  const data = [
    { key: 1, teacher: "Rohit Sharma", month: "March", amount: "₹40,000" },
  ];

  return (
    <Card title="Payroll Approval">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default PayrollApproval;