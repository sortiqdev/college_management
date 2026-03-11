/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { Card, Select, Button, Table, message } from "antd";
import API from "../../../../../../services/api";

const { Option } = Select;

const AssignSubject = () => {

  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  const [departmentId, setDepartmentId] = useState(null);
  const [programId, setProgramId] = useState(null);
  const [semester, setSemester] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  // ---------------- FETCH DEPARTMENTS ----------------
  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      setDepartments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FETCH PROGRAMS ----------------

  const fetchPrograms = async (deptId) => {
    try {
      const res = await API.get(`/programs?departmentId=${deptId}`);
      setPrograms(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- FETCH SUBJECTS ----------------
  const fetchSubjects = async () => {
    try {
      const res = await API.get("/subjects");
      setSubjects(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchSubjects();
    fetchPrograms();
  }, []);

  // ---------------- ASSIGN SUBJECT ----------------
  const handleAssign = async () => {

    if (!departmentId || !programId || !semester) {
      return message.warning("Please select all fields");
    }

    try {
      const res = await API.post("/program-subjects/assign", {
        departmentId,
        programId,
        semester,
        subjectIds: selectedSubjects,
      });

      setAssignedSubjects(res.data.data);

      message.success("Subjects Assigned Successfully");

    } catch (error) {
      message.error(`$"Delete failed"${error.message}`);
    }
  };

  // ---------------- TABLE ----------------
  const columns = [
    {
      title: "Subject Code",
      dataIndex: "subjectCode",
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },
    {
      title: "Action",
      render: () => <Button danger>Remove</Button>,
    },
  ];

  return (
    <Card title="Assign Subject">

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

        {/* Department */}
        <Select
  placeholder="Department"
  style={{ width: 200 }}
  onChange={(value) => setDepartmentId(value)}
>
  {departments.map((dept) => (
    <Option key={dept.id} value={dept.id}>
      {dept.departmentName}
    </Option>
  ))}
</Select>

        {/* Program */}
        <Select
          placeholder="Program"
          style={{ width: 200 }}
          onChange={(value) => setProgramId(value)}
        >
          {programs.map((prog) => (
            <Option key={prog.id} value={prog.id}>
              {prog.programName}
            </Option>
          ))}
        </Select>

        {/* Semester */}
        <Select
          placeholder="Semester"
          style={{ width: 150 }}
          onChange={(value) => setSemester(value)}
        >
          {[1,2,3,4,5,6,7,8].map((sem)=>(
            <Option key={sem} value={sem}>
              Semester {sem}
            </Option>
          ))}
        </Select>

        {/* Subjects */}
        <Select
          mode="multiple"
          placeholder="Select Subjects"
          style={{ width: 300 }}
          onChange={(value) => setSelectedSubjects(value)}
        >
          {subjects.map((sub) => (
            <Option key={sub.id} value={sub.id}>
              {sub.subjectName}
            </Option>
          ))}
        </Select>

        <Button type="primary" onClick={handleAssign}>
          Assign
        </Button>

      </div>

      <Table
        columns={columns}
        dataSource={assignedSubjects}
        rowKey="id"
      />

    </Card>
  );
};

export default AssignSubject;