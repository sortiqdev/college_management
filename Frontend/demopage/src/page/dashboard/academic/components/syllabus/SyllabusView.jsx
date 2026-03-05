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

} from "../../../../../services/dataProvider";

export default function SyllabusView() {

  const [loading, setLoading] = useState(true);
  const [syllabusList, setSyllabusList] = useState([]);
  const [alertMsg, setAlertMsg] = useState(null);

  /* ================================
     FETCH STUDENT SYLLABUS DATA
  ================================= */
  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      setLoading(true);
      const data = await getStudentSyllabus();
      setSyllabusList(data || []);
    } catch (error) {
      console.error("Error fetching syllabus:", error);
      setAlertMsg({
        type: "error",
        text: "Failed to load syllabus. Please try again later.",
      });
      setSyllabusList([]);
    } finally {
      setLoading(false);
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
        <p className="text-gray-600">Access syllabus and manage assignments</p>
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
};