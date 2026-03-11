import React from "react";
import { Tabs, Card } from "antd";

import TeacherAllocation from "./teacherAllocation/TeacherAllocation";

const AcademicPermission = () => {

  const items = [
    {
      key: "1",
      label: "Teacher Allocation",
      children: <TeacherAllocation />
    }
  ];

  return (
    <Card title="Academic Permissions">
      <Tabs items={items} />
    </Card>
  );

};

export default AcademicPermission;