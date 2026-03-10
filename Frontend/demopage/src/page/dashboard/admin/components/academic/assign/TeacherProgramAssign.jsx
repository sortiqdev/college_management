import React, { useState } from "react";
import { Card, Select, Button, Table, Tag, Space } from "antd";

const { Option } = Select;

const TeacherProgramAssign = () => {
  const [data, setData] = useState([]);
  const [teacher, setTeacher] = useState();
  const [program, setProgram] = useState();

  const assignHandler = () => {
    if (!teacher || !program) return;

    const newItem = {
      key: Date.now(),
      teacher,
      program,
    };

    setData([...data, newItem]);
  };

  const columns = [
    {
      title: "Teacher",
      dataIndex: "teacher",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Program",
      dataIndex: "program",
      render: (text) => <Tag color="gold">{text}</Tag>,
    },
  ];

  return (
    <Card title="Assign Teacher to Program">
      <Space style={{ marginBottom: 20 }}>
        <Select
          placeholder="Select Teacher"
          style={{ width: 200 }}
          onChange={setTeacher}
        >
          <Option value="John">John</Option>
          <Option value="Alice">Alice</Option>
        </Select>

        <Select
          placeholder="Select Program"
          style={{ width: 200 }}
          onChange={setProgram}
        >
          <Option value="B.Tech">B.Tech</Option>
          <Option value="MBA">MBA</Option>
        </Select>

        <Button type="primary" onClick={assignHandler}>
          Assign
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default TeacherProgramAssign;