import React from "react";
import { Card, Table } from "antd";

const FeeProgramMap = () => {
  const columns = [
    { title: "Program", dataIndex: "program" },
    { title: "Department", dataIndex: "department" },
    { title: "Academic Year", dataIndex: "year" },
    { title: "Fee Structure", dataIndex: "structure" },
  ];

  const data = [
    {
      key: 1,
      program: "B.Tech",
      department: "Computer Science",
      year: "2026",
      structure: "Standard Structure",
    },
  ];

  return (
    <Card title="Fee Program Mapping">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default FeeProgramMap;