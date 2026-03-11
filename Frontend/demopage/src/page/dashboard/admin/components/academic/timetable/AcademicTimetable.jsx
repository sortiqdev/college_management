/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Card,
  Select,
  Row,
  Col,
  Table,
  Modal,
  Form,
  Button,
  Input,
  Upload,
  message
} from "antd";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const { Option } = Select;

const AcademicTimetable = () => {

  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const [timetableData, setTimetableData] = useState([]);

  const [isEditMode, setIsEditMode] = useState(true);

  const [form] = Form.useForm();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const timeSlots = [
    "9-10",
    "10-11",
    "11-12",
    "12-1",
    "1-2",
    "2-3",
    "3-4"
  ];

  const openModal = (day, slot) => {

    if (!isEditMode) return;

    if (slot === "12-1") return;

    setSelectedCell({ day, slot });

    setIsModalOpen(true);

  };

  const handleSaveLecture = (values) => {

    const newEntry = {
      ...selectedCell,
      subjectName: values.subjectName,
      teacherName: values.teacherName,
      roomName: values.roomName
    };

    const updated = timetableData.filter(
      (item) =>
        !(item.day === selectedCell.day && item.slot === selectedCell.slot)
    );

    setTimetableData([...updated, newEntry]);

    setIsModalOpen(false);

    form.resetFields();

  };

  const renderCell = (day, slot) => {

    const lecture = timetableData.find(
      (item) => item.day === day && item.slot === slot
    );

    if (slot === "12-1") {
      return <b>Lunch</b>;
    }

    return (
      <div
        style={{ cursor: isEditMode ? "pointer" : "default" }}
        onClick={() => openModal(day, slot)}
      >
        {lecture ? (
          <>
            <div>{lecture.subjectName}</div>
            <small>{lecture.teacherName}</small>
          </>
        ) : (
          <span style={{ color: "#aaa" }}>Add</span>
        )}
      </div>
    );

  };

  const handleSaveTimetable = () => {

    console.log("Timetable Saved:", timetableData);

    message.success("Timetable Saved Successfully");

  };

  const toggleEditMode = () => {

    setIsEditMode(!isEditMode);

    message.info(isEditMode ? "Edit Disabled" : "Edit Enabled");

  };

  const handleImportFile = (file) => {

    const reader = new FileReader();

    reader.onload = (event) => {

      const data = new Uint8Array(event.target.result);

      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formatted = jsonData.map((row) => ({
        day: row.day,
        slot: row.timeSlot,
        subjectName: row.subjectName,
        teacherName: row.teacherName,
        roomName: row.roomName
      }));

      setTimetableData(formatted);

      message.success("Timetable Imported Successfully");

    };

    reader.readAsArrayBuffer(file);

    return false;

  };

  const handleDownloadTimetable = () => {

    const doc = new jsPDF();

    doc.text("Academic Timetable", 20, 20);

    let y = 40;

    timetableData.forEach((item) => {

      doc.text(
        `${item.day} | ${item.slot} | ${item.subjectName} | ${item.teacherName} | ${item.roomName}`,
        20,
        y
      );

      y += 10;

    });

    doc.save("academicTimetable.pdf");

  };

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day"
    },
    ...timeSlots.map((slot) => ({
      title: slot,
      key: slot,
      render: (_, record) => renderCell(record.day, slot)
    }))
  ];

  const dataSource = days.map((day) => ({
    key: day,
    day
  }));

  return (
    <Card title="Academic Timetable">

      {/* Filters */}

      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Select
            placeholder="Program"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedProgram(value)}
          >
            <Option value="btech">BTech</Option>
            <Option value="mtech">MTech</Option>
            <Option value="bca">BCA</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select
            placeholder="Department"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedDepartment(value)}
          >
            <Option value="cse">CSE</Option>
            <Option value="me">ME</Option>
            <Option value="eee">EEE</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select
            placeholder="Semester"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedSemester(value)}
          >
            <Option value="1">Sem 1</Option>
            <Option value="3">Sem 3</Option>
            <Option value="5">Sem 5</Option>
            <Option value="7">Sem 7</Option>
          </Select>
        </Col>

        <Col span={6}>
          <Select
            placeholder="Section"
            style={{ width: "100%" }}
            onChange={(value) => setSelectedSection(value)}
          >
            <Option value="A">Section A</Option>
            <Option value="B">Section B</Option>
          </Select>
        </Col>
      </Row>

      {/* Action Buttons */}

      <Row justify="space-between" style={{ marginBottom: 16 }}>

        <Col>

          <Button
            type="primary"
            onClick={handleSaveTimetable}
          >
            Save Timetable
          </Button>

          <Button
            style={{ marginLeft: 10 }}
            onClick={toggleEditMode}
          >
            {isEditMode ? "Disable Edit" : "Enable Edit"}
          </Button>

        </Col>

        <Col>

          <Upload
            accept=".xlsx,.xls,.pdf,.doc,.docx"
            beforeUpload={handleImportFile}
            showUploadList={false}
          >
            <Button>
              Import
            </Button>
          </Upload>

          <Button
            style={{ marginLeft: 10 }}
            onClick={handleDownloadTimetable}
          >
            Download
          </Button>

        </Col>

      </Row>

      {/* Timetable Grid */}

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />

      {/* Add Lecture Modal */}

      <Modal
        title="Add Lecture"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >

        <Form
          layout="vertical"
          form={form}
          onFinish={handleSaveLecture}
        >

          <Form.Item
            name="subjectName"
            label="Subject"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="teacherName"
            label="Teacher"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="roomName"
            label="Room"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
          >
            Save Lecture
          </Button>

        </Form>

      </Modal>

    </Card>
  );

};

export default AcademicTimetable;