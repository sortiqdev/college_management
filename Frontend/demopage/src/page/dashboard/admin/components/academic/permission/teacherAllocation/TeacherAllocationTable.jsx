import React from "react";
import { Table } from "antd";

const TeacherAllocationTable = () => {

  const columns = [
    {
      title: "Teacher",
      dataIndex: "teacher"
    },
    {
      title: "Subject",
      dataIndex: "subject"
    },
    {
      title: "Program",
      dataIndex: "program"
    },
    {
      title: "Semester",
      dataIndex: "semester"
    },
    {
      title: "Section",
      dataIndex: "section"
    }
  ];

  const dataSource = [];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );

};

export default TeacherAllocationTable;