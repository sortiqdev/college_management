import React, { useState } from "react";
import { Table, Tag, Button } from "antd";

const AttendanceTable = () => {

  const [data, setData] = useState([
    { name: "Student 1", status: "Boarded" },
    { name: "Student 2", status: "Not Boarded" }
  ]);

  const toggle = (index) => {

    const updated = [...data];

    updated[index].status =
      updated[index].status === "Boarded"
        ? "Not Boarded"
        : "Boarded";

    setData(updated);
  };

  const columns = [
    {
      title: "Student",
      dataIndex: "name"
    },
    {
      title: "Status",
      render: (record) => (
        <Tag color={record.status === "Boarded" ? "green" : "red"}>
          {record.status}
        </Tag>
      )
    },
    {
      title: "Action",
      render: (_, record, index) => (
        <Button onClick={() => toggle(index)}>
          Toggle
        </Button>
      )
    }
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default AttendanceTable;