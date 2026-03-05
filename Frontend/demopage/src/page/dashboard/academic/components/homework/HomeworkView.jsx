import React, { useEffect, useState } from "react";
import { Spin, message, Modal, Upload, Tag } from "antd";
import {
  FileTextOutlined,
  UploadOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { getStudentHomework } from "../../../../../services/dataProvider";
import HomeworkEdit from "./HomeworkEdit";

export default function HomeworkView() {

  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [editMode, setEditMode] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [submittedHomework, setSubmittedHomework] = useState({});

  useEffect(() => {

    const fetchHomework = async () => {
      try {
        const result = await getStudentHomework();
        setHomeworkData(Array.isArray(result) ? result : []);
      } catch {
        console.log("Homework API not ready");
        setHomeworkData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();

  }, []);

  // =========================
  // OPEN UPLOAD MODAL
  // =========================
  const handleUploadClick = (homework) => {
    setSelectedHomework(homework);
    setIsModalVisible(true);
  };

  // =========================
  // FILE SELECT
  // =========================
  const handleUploadFiles = ({ file }) => {

  const realFile = file.originFileObj || file;

  setUploadedFiles((prev) => ({
    ...prev,
    [selectedHomework.id]: realFile
  }));

  message.success(`${file.name} ready to submit`);

};

  // =========================
  // SUBMIT HOMEWORK
  // =========================
  const handleSubmitHomework = async () => {

    const file = uploadedFiles[selectedHomework.id];

    if (!file) {
      message.error("Please upload a file first");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("homeworkId", selectedHomework.id);
      formData.append("file", file);

      // Example API
      // await API.post("/homework/submit", formData);

      setSubmittedHomework({
        ...submittedHomework,
        [selectedHomework.id]: true
      });

      message.success("Homework submitted successfully");

      setIsModalVisible(false);
      setSelectedHomework(null);

    } catch {
      message.error("Submission failed");
    }

  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedHomework(null);
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" tip="Loading homework..." />
      </div>
    );
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!homeworkData.length) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-12 text-center">
          <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Homework Assigned
          </h3>
          <p className="text-gray-600">
            Homework assignments will appear here once your teacher assigns them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileTextOutlined className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Homework & Assignments</h1>
        </div>
        <p className="text-gray-600">View and manage your homework assignments</p>
      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">

              <tr>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-left">Class</th>
                <th className="px-6 py-4 text-left">Due Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Submission</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>

            </thead>

            <tbody>

              {homeworkData.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >

                  {/* TITLE */}

                  <td className="px-6 py-4">

                    <p className="font-semibold text-gray-900">
                      {item.title}
                    </p>

                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>

                  </td>

                  {/* SUBJECT */}

                  <td className="px-6 py-4">
                    <Tag color="blue">{item.subject}</Tag>
                  </td>

                  {/* CLASS */}

                  <td className="px-6 py-4">
                    <Tag color="green">{item.className}</Tag>
                  </td>

                  {/* DUE DATE */}

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ClockCircleOutlined />
                      {item.dueDate}
                    </div>
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4 text-center">

                    {submittedHomework[item.id] ? (
                      <Tag color="green">Completed</Tag>
                    ) : uploadedFiles[item.id] ? (
                      <Tag color="blue">File Ready</Tag>
                    ) : (
                      <Tag color="orange">Pending</Tag>
                    )}

                  </td>

                  {/* SUBMISSION */}

                  <td className="px-6 py-4 text-center">

                    {submittedHomework[item.id] ? (

                      <span className="text-green-600 font-semibold">
                        Submitted
                      </span>

                    ) : uploadedFiles[item.id] ? (

                      <span className="text-blue-600 font-semibold">
                        📄 {uploadedFiles[item.id]?.name}
                      </span>

                    ) : (

                      <span className="text-gray-500">
                        No file uploaded
                      </span>

                    )}

                  </td>

                  {/* ACTION */}

                  <td className="px-6 py-4">

                   

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => handleUploadClick(item)}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg"
                        >
                          Upload
                        </button>

                      </div>

                    

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* UPLOAD MODAL */}

      <Modal
        title={`Upload Assignment: ${selectedHomework?.title}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >

        <Upload.Dragger
          name="file"
          multiple={false}
          accept=".pdf,.doc,.docx"
          beforeUpload={(file) => {

            const isAllowed =
              file.type === "application/pdf" ||
              file.type === "application/msword" ||
              file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

            if (!isAllowed) {
              message.error("Only PDF or DOC files allowed!");
              return Upload.LIST_IGNORE;
            }

            const isLt10M = file.size / 1024 / 1024 < 100;

            if (!isLt10M) {
              message.error("File must be smaller than 100MB!");
              return Upload.LIST_IGNORE;
            }

            return false;

          }}
          onChange={handleUploadFiles}
        >

          <p className="text-lg font-semibold">
            Drag file here or click to upload
          </p>

          <p className="text-gray-500 text-sm">
            Supported: PDF, DOC, DOCX (Max 10MB)
          </p>

        </Upload.Dragger>

        <div className="flex gap-3 mt-4">

          <button
            onClick={handleModalClose}
            className="flex-1 bg-gray-500 text-white py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmitHomework}
            className="flex-1 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <UploadOutlined />
            Submit Homework
          </button>

        </div>

      </Modal>

      {editMode && <HomeworkEdit />}

    </div>
  );
}