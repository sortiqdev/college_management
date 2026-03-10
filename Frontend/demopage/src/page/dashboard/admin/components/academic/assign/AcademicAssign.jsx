import React from "react";
import { Tabs, Card } from "antd";
import SubjectClassAssign from "./SubjectClassAssign";
import TeacherProgramAssign from "./TeacherProgramAssign";
import TeacherSubjectAssign from "./TeacherSubjectAssign";

const AcademicAssign = () => {
  const items = [
    {
      key: "1",
      label: "Subject → Class",
      children: <SubjectClassAssign />,
    },
    {
      key: "2",
      label: "Teacher → Program",
      children: <TeacherProgramAssign />,
    },
    {
      key: "3",
      label: "Teacher → Subject",
      children: <TeacherSubjectAssign />,
    },
  ];

  return (
    <Card title="Academic Data Management">
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default AcademicAssign;