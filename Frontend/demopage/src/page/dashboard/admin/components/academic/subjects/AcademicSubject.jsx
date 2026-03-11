import React from "react";
import { Card, Tabs } from "antd";
import SubjectsCreate from "./SubjectsCreate";
import AssignSubject from "./AssignSubject";

const AcademicSubject = () => {

  const items = [
    {
      key: "1",
      label: "Create Subject",
      children: <SubjectsCreate />,
    },
    {
      key: "2",
      label: "Assign Subject",
      children: <AssignSubject />,
    },
  ];

  return (
    <Card title="Academic Subjects">
      <Tabs items={items} />
    </Card>
  );
};

export default AcademicSubject;