import React from "react";
import { Row, Col } from "antd";

import TeacherAllocationForm from "./TeacherAllocationForm";
import TeacherAllocationTable from "./TeacherAllocationTable";
import TeacherWorkloadCard from "./TeacherWorkloadCard";

const TeacherAllocation = () => {

  return (
    <div>

      <TeacherWorkloadCard />

      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={24}>
          <TeacherAllocationForm />
        </Col>
      </Row>

      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={24}>
          <TeacherAllocationTable />
        </Col>
      </Row>

    </div>
  );

};

export default TeacherAllocation;