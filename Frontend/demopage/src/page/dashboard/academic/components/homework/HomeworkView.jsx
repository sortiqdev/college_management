import React, { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { FileTextOutlined, CalendarOutlined, BookOutlined, UploadOutlined, EditOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { getStudentHomework } from "../../../../../services/dataProvider";
import HomeworkEdit from "./HomeworkEdit";

export default function HomeworkView({ role }) {

  const [homeworkData, setHomeworkData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        // 🔥 Backend API (when ready)
        // const res = await API.get("/student/homework");
        // setHomeworkData(Array.isArray(res.data) ? res.data : []);

        // TEMP: empty fallback
        // setHomeworkData([]);  // keep empty until backend ready
        
        const result = await getStudentHomework();
        setHomeworkData(Array.isArray(result) ? result : []);

      } catch {
        console.log("Homework API not ready - showing empty state");
        setHomeworkData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, []);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFiles({ ...selectedFiles, [index]: file });
    }
  };

  const handleUpload = (index) => {
    const file = selectedFiles[index];
    if (!file) {
      message.error("Please select a file first");
      return;
    }

    // Simulate upload
    setUploadingIndex(index);
    setTimeout(() => {
      message.success(`${file.name} submitted successfully!`);
      setUploadingIndex(null);
      setSelectedFiles({ ...selectedFiles, [index]: null });
    }, 1500);
  };

  // ============ LOADING ============
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" tip="Loading homework..." />
      </div>
    );
  }

  // ============ EMPTY STATE ============
  if (!homeworkData.length) {
    return (
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-12 text-center">
          <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Homework Assigned</h3>
          <p className="text-gray-600">Homework assignments will appear here once your teacher assigns them.</p>
        </div>
      </div>
    );
  }
console.log("HomeworkView Role:", role);
  // ============ RENDER DATA ============
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FileTextOutlined className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Homework</h1>
        </div>
        <p className="text-gray-600">View and submit your homework assignments</p>
      </div>

      {/* Homework List */}
      <div className="space-y-6">
        {homeworkData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-blue-500"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-4 py-2 rounded-full">
                    <BookOutlined className="text-blue-600" />
                    {item.subject}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm text-gray-700 bg-green-50 px-4 py-2 rounded-full">
                    <CalendarOutlined className="text-green-600" />
                    {item.className}
                  </span>
                </div>
              </div>

              {/* Quick Upload Button for Students */}
              {role === "student" && (
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-md flex items-center gap-2 whitespace-nowrap">
                  <UploadOutlined className="text-lg" />
                  Upload Now
                </button>
              )}
            </div>

            {/* Description */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-800 leading-relaxed">{item.description}</p>
            </div>

            {/* Due Date */}
            <div className="mb-6 flex items-center gap-3 text-lg">
              <ClockCircleOutlined className="text-orange-500 text-xl" />
              <span className="font-semibold text-gray-800">Due Date:</span>
              <span className="bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 px-4 py-2 rounded-lg font-bold">
                {item.dueDate}
              </span>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Subject</p>
                <p className="font-bold text-gray-900">{item.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Class</p>
                <p className="font-bold text-gray-900">{item.className}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                <p className="font-bold text-orange-600">Pending</p>
              </div>
            </div>

            {/* STUDENT UI */}
            {role === "student" && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-90 border-2 border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">📤 Submit Your Homework</h4>
                
                <div className="space-y-4">
                  {/* File Input */}
                  <div className="relative group">
                    <input 
                      type="file" 
                      id={`file-${index}`}
                      onChange={(e) => handleFileChange(index, e)}
                      className="hidden"
                      disabled={uploadingIndex === index}
                    />
                    <label 
                      htmlFor={`file-${index}`}
                      className="block border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-100 transition-all duration-300"
                    >
                      <UploadOutlined className="text-3xl text-blue-600 mb-2" />
                      <p className="text-sm text-gray-700 font-semibold">
                        {selectedFiles[index] ? selectedFiles[index].name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PNG, JPG (Max 10MB)</p>
                    </label>
                  </div>

                  {/* Upload Button */}
                  <button
                    onClick={() => handleUpload(index)}
                    disabled={uploadingIndex === index || !selectedFiles[index]}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                  >
                    {uploadingIndex === index ? (
                      <>
                        <Spin size="small" style={{ color: 'white' }} />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadOutlined />
                        Upload Submission
                      </>
                    )}
                  </button>

                  {selectedFiles[index] && (
                    <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                      ✓ File selected: <span className="font-bold">{selectedFiles[index].name}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TEACHER UI */}
            {role === "teacher" && (
              <div className="flex gap-3 border-t pt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <EditOutlined />
                  Edit Homework
                </button>
                <button className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  View Submissions
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {editMode && <HomeworkEdit />}
    </div>
  );
}
