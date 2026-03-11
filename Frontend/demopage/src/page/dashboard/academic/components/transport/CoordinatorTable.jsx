import React from "react";
import { Table, Select, Button } from "antd";

const CoordinatorTable = () => {

  const data = [
    { route: "Route 5", bus: "Bus 1" }
  ];

  const columns = [
    {
      title: "Route",
      dataIndex: "route"
    },
    {
      title: "Bus",
      dataIndex: "bus"
    },
    {
      title: "Coordinator",
      render: () => (
        <Select style={{ width: 150 }}>
          <Select.Option>John</Select.Option>
          <Select.Option>Smith</Select.Option>
        </Select>
      )
    },
    {
      title: "Action",
      render: () => <Button type="primary">Assign</Button>
    }
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default CoordinatorTable;