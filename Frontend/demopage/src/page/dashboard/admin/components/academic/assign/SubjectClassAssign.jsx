import React, { useState } from "react";
import { Card, Select, Button, Table, Tag, Space } from "antd";

const { Option } = Select;

const SubjectClassAssign = () => {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState();
  const [className, setClassName] = useState();

  const assignHandler = () => {
    if (!subject || !className) return;

    const newItem = {
      key: Date.now(),
      subject,
      className,
    };

    setData([...data, newItem]);
  };

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Class",
      dataIndex: "className",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
  ];

  return (
    <Card title="Assign Subject to Class">
      <Space style={{ marginBottom: 20 }}>
        <Select
          placeholder="Select Subject"
          style={{ width: 200 }}
          onChange={setSubject}
        >
          <Option value="Math">Math</Option>
          <Option value="Physics">Physics</Option>
        </Select>

        <Select
          placeholder="Select Class"
          style={{ width: 200 }}
          onChange={setClassName}
        >
          <Option value="Class 10">Class 10</Option>
          <Option value="Class 11">Class 11</Option>
        </Select>

        <Button type="primary" onClick={assignHandler}>
          Assign
        </Button>
      </Space>

      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default SubjectClassAssign;