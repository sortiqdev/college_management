import React from "react";
import { Card, Select, Button, Row, Col } from "antd";

const TeacherAllocationForm = () => {

  return (
    <Card title="Assign Teacher to Subject">

      <Row gutter={16}>

        <Col span={4}>
          <Select placeholder="Teacher" style={{ width: "100%" }} />
        </Col>

        <Col span={4}>
          <Select placeholder="Department" style={{ width: "100%" }} />
        </Col>

        <Col span={4}>
          <Select placeholder="Program" style={{ width: "100%" }} />
        </Col>

        <Col span={4}>
          <Select placeholder="Semester" style={{ width: "100%" }} />
        </Col>

        <Col span={4}>
          <Select placeholder="Section" style={{ width: "100%" }} />
        </Col>

        <Col span={4}>
          <Select placeholder="Subject" style={{ width: "100%" }} />
        </Col>

      </Row>

      <Button
        type="primary"
        style={{ marginTop: 15 }}
      >
        Allocate
      </Button>

    </Card>
  );

};

export default TeacherAllocationForm;