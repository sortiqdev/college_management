import React from "react";
import { Table } from "antd";

const HostelFeeReport = () => {

  const columns = [
    {
      title: "Student",
      dataIndex: "name"
    },
    {
      title: "Room No",
      dataIndex: "room"
    },
    {
      title: "Hostel Block",
      dataIndex: "block"
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

export default HostelFeeReport;