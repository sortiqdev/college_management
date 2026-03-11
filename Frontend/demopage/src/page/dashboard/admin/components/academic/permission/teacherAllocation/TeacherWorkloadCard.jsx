import React from "react";
import { Card, Row, Col, Statistic } from "antd";

const TeacherWorkloadCard = () => {

  return (
    <Card title="Teacher Workload">

      <Row gutter={20}>

        <Col span={6}>
          <Statistic title="Total Teachers" value={12} />
        </Col>

        <Col span={6}>
          <Statistic title="Subjects Assigned" value={32} />
        </Col>

        <Col span={6}>
          <Statistic title="Max Load (Teacher)" value={5} />
        </Col>

      </Row>

    </Card>
  );

};

export default TeacherWorkloadCard;