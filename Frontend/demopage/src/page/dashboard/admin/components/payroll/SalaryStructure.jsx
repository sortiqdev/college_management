import React from "react";
import { Card, Table } from "antd";

const SalaryStructure = () => {
  const columns = [
    { title: "Component", dataIndex: "component" },
    { title: "Amount", dataIndex: "amount" },
  ];

  const data = [
    { key: 1, component: "Basic Salary", amount: "₹30,000" },
    { key: 2, component: "HRA", amount: "₹5,000" },
    { key: 3, component: "Allowance", amount: "₹3,000" },
  ];

  return (
    <Card title="Salary Structure">
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default SalaryStructure;