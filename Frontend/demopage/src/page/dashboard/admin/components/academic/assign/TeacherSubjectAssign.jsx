// src/components/admin/academic/TeacherSubjectAssign.jsx

import { useState } from "react";

export default function TeachersubjectAssign () {
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [records, setRecords] = useState([]);

  const handleAdd = () => {
    if (!teacher || !subject) return;

    setRecords([...records, { teacher, subject }]);
    setTeacher("");
    setSubject("");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Assign Teacher to Subject
      </h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Teacher"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-purple-600 text-white px-4 rounded"
        >
          Assign
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Teacher</th>
            <th className="p-2 border">Subject</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.teacher}</td>
              <td className="border p-2">{item.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}