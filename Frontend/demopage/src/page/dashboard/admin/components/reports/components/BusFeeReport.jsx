import React from "react";
import { Table } from "antd";

const BusFeeReport = () => {

  const columns = [
    {
      title: "Student",
      dataIndex: "name"
    },
    {
      title: "Route",
      dataIndex: "route"
    },
    {
      title: "Bus Number",
      dataIndex: "bus"
    },
    {
      title: "Fees",
      dataIndex: "fees"
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={[]}
      bordered
    />
  );
};

export default BusFeeReport;