"use-client";

import  { useEffect, useState } from "react";
import { FileTextOutlined, FilePdfOutlined, BookOutlined, DownloadOutlined } from "@ant-design/icons";
import { getStudentSyllabus } from "../../../../../services/dataProvider";

export default function SyllabusView() {

  const [syllabusList, setSyllabusList] = useState([]);
  const [setLoading] = useState(true);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        // const res = await API.get("/student/syllabus"); 
        // setSyllabusList(res.data || []);
        const result = await getStudentSyllabus();
        setSyllabusList(result || []);
      } catch {
        console.log("Syllabus API not ready");
        setSyllabusList([]); // fallback empty
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, [setLoading]);



  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <BookOutlined className="text-3xl text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Syllabus</h1>
        </div>
        <p className="text-gray-600">Access and download syllabus for all your subjects</p>
      </div>

      {syllabusList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="flex justify-center mb-4">
            <FileTextOutlined className="text-6xl text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Syllabus Available</h3>
          <p className="text-gray-600">Syllabus documents will appear here once they are published by your instructors.</p>
        </div>
      ) : (
        /* Syllabus Grid/Table View */
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-blue-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Class</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800 uppercase tracking-wide">Subject</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {syllabusList.map((item, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {item.class}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOutlined className="text-blue-600 text-lg" />
                        <span className="font-semibold text-gray-900">{item.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a 
                        href={item.pdfUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-md flex items-center gap-2"
                      >
                        <FilePdfOutlined className="text-lg" />
                        View PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
            {syllabusList.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-t-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {item.class}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <BookOutlined className="text-blue-600" />
                      {item.subject}
                    </h3>
                  </div>
                  <FilePdfOutlined className="text-3xl text-red-500" />
                </div>

                <p className="text-sm text-gray-600 mb-4">Click below to view and download the syllabus for {item.subject}</p>

                <a 
                  href={item.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
                >
                  <DownloadOutlined className="text-lg" />
                  View PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
