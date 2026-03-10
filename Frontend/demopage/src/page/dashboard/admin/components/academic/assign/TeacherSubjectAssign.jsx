import React, { useState } from "react";
import { Card, Select, Button, Table, Tag, Space } from "antd";

const { Option } = Select;

const TeacherSubjectAssign = () => {
  const [data, setData] = useState([]);
  const [teacher, setTeacher] = useState();
  const [subject, setSubject] = useState();

  const assignHandler = () => {
    if (!teacher || !subject) return;

    const newItem = {
      key: Date.now(),
      teacher,
      subject,
    };

    setData([...data, newItem]);
  };

  const columns = [
    {
      title: "Teacher",
      dataIndex: "teacher",
      render: (text) => <Tag color="cyan">{text}</Tag>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text) => <Tag color="magenta">{text}</Tag>,
    },
  ];

  return (
    <Card title="Assign Teacher to Subject">
      <Space style={{ marginBottom: 20 }}>
        <Select
          placeholder="Select Teacher"
          style={{ width: 200 }}
          onChange={setTeacher}
        >
          <Option value="John">John</Option>
        </Select>

        <Select
          placeholder="Select Subject"
          style={{ width: 200 }}
          onChange={setSubject}
        >
          <Option value="Physics">Physics</Option>
          <Option value="Math">Math</Option>
        </Select>

        <Button type="primary" onClick={assignHandler}>
          Assign
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default TeacherSubjectAssign;