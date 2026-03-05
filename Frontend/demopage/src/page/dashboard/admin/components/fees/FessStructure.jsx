import React from "react";
import { Card, Table, Button } from "antd";

const FessStructure = () => {
  const columns = [
    { title: "Program", dataIndex: "program" },
    { title: "Tuition Fee", dataIndex: "tuition" },
    { title: "Library Fee", dataIndex: "library" },
    { title: "Lab Fee", dataIndex: "lab" },
    { title: "Total", dataIndex: "total" },
  ];

  const data = [
    {
      key: 1,
      program: "B.Tech CSE",
      tuition: "₹50,000",
      library: "₹3,000",
      lab: "₹5,000",
      total: "₹58,000",
    },
  ];

  return (
    <Card
      title="Fee Structure"
      extra={<Button type="primary">Add Structure</Button>}
    >
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default FessStructure;