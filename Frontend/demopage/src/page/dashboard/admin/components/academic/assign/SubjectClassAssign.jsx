// src/components/admin/academic/SubjectClassAssign.jsx

import { useState } from "react";

export default function SubjectClassAssign() {
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [data, setData] = useState([]);

  const handleAdd = () => {
    if (!subject || !className) return;

    setData([...data, { subject, className }]);
    setSubject("");
    setClassName("");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Assign Subject to Class</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Assign
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Class</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.subject}</td>
              <td className="border p-2">{item.className}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}