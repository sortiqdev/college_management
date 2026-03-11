import React from "react";
import { Table, Button, Select } from "antd";

const StudentsTable = () => {

  const data = [
    {
      name: "Student 1",
      roll: "2023100"
    },
    {
      name: "Student 2",
      roll: "2023101"
    }
  ];

  const columns = [
    {
      title: "Student",
      dataIndex: "name"
    },
    {
      title: "Roll",
      dataIndex: "roll"
    },
    {
      title: "Route",
      render: () => (
        <Select style={{ width: 150 }}>
          <Select.Option>Route 5</Select.Option>
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

export default StudentsTable;