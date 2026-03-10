import React, { useState } from "react";
import { Table, Select, Row, Col, Button } from "antd";

const { Option } = Select;

const StudentFeeReport = () => {

  const [data] = useState([]);

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name"
    },
    {
      title: "Course",
      dataIndex: "course"
    },
    {
      title: "Semester",
      dataIndex: "semester"
    },
    {
      title: "Total Fees",
      dataIndex: "totalFees"
    },
    {
      title: "Paid",
      dataIndex: "paid"
    },
    {
      title: "Pending",
      dataIndex: "pending"
    }
  ];

  return (
    <div>

      <Row gutter={16} style={{ marginBottom: 20 }}>

        <Col span={6}>
          <Select placeholder="Select Course" style={{ width: "100%" }}>
            <Option value="btech">B.Tech</Option>
            <Option value="bba">BBA</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select placeholder="Semester" style={{ width: "100%" }}>
            <Option value="1">Semester 1</Option>
            <Option value="2">Semester 2</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Button type="primary">Search</Button>
        </Col>

      </Row>

      <Table
        columns={columns}
        dataSource={data}
        bordered
      />

    </div>
  );
};

export default StudentFeeReport;