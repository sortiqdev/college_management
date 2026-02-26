"use client";

import { useEffect, useState } from "react";
import {
  FileTextOutlined,
  FilePdfOutlined,
  BookOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import {
  getStudentSyllabus,
  getStudentAssignments,
} from "../../../../../services/dataProvider";

export default function SyllabusView() {
  const [syllabusList, setSyllabusList] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  /* ================================
     FETCH DATA
  ================================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const syllabus = await getStudentSyllabus();
        setSyllabusList(syllabus || []);

        try {
          const assignmentData = await getStudentAssignments();
          setAssignments(assignmentData || []);
        } catch {
          console.log("Assignments API not ready");
          setAssignments([]);
        }
      } catch {
        console.log("Syllabus API not ready");
        setSyllabusList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================================
     UPLOAD HANDLER (Mock Upload)
  ================================= */
  const handleUpload = async () => {
    if (!assignmentFile) {
      setAlertMsg({ type: "error", text: "Please select a PDF file." });
      return;
    }

    setUploading(true);

    try {
      // Mock upload (frontend only)
      const newAssignment = {
        id: Date.now(),
        title: assignmentTitle || assignmentFile.name,
        fileUrl: URL.createObjectURL(assignmentFile),
        timestamp: Date.now(),
      };

      setAssignments((prev) => [newAssignment, ...prev]);

      setAlertMsg({ type: "success", text: "Assignment uploaded successfully!" });
      setAssignmentTitle("");
      setAssignmentFile(null);
    } catch (err) {
      console.error(err);
      setAlertMsg({ type: "error", text: "Upload failed." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOutlined className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Syllabus</h1>
        </div>
        <p className="text-gray-600">
          Access syllabus and manage assignments
        </p>
      </div>

      {/* ALERT */}
      {alertMsg && (
        <div
          className={`mb-6 p-3 rounded-lg ${
            alertMsg.type === "error"
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{alertMsg.text}</span>
            <button
              onClick={() => setAlertMsg(null)}
              className="font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}

      {/* ================================
          ASSIGNMENTS SECTION
      ================================= */}
      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        {/* Assignment List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md border-t-4 border-indigo-500">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileTextOutlined /> Assignments
          </h2>

          {assignments.length === 0 ? (
            <p className="text-gray-500">No assignments available.</p>
          ) : (
            <ul className="space-y-3">
              {assignments.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                >
                  <div>
                    <p className="font-semibold">{a.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(a.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <a
                    href={a.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:underline flex items-center gap-2"
                  >
                    <FilePdfOutlined /> Open
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Upload Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-orange-500">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <UploadOutlined /> Upload Assignment
          </h3>

          <input
            type="text"
            placeholder="Assignment Title"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded mb-3"
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setAssignmentFile(e.target.files[0])}
            className="w-full mb-4"
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

      {/* ================================
          SYLLABUS SECTION
      ================================= */}
      {syllabusList.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-md text-center">
          <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-bold">No Syllabus Available</h3>
          <p className="text-gray-500">
            Syllabus will appear here once published.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Class</th>
                <th className="px-6 py-4 text-left">Subject</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {syllabusList.map((item, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="px-6 py-4">{item.class}</td>
                  <td className="px-6 py-4">{item.subject}</td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <DownloadOutlined /> View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}