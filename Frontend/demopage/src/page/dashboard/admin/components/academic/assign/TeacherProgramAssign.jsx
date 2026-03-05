// src/components/admin/academic/TeacherProgramAssign.jsx

import { useState } from "react";

export default function TeacherProgramAssign() {
  const [teacher, setTeacher] = useState("");
  const [program, setProgram] = useState("");
  const [list, setList] = useState([]);

  const handleAdd = () => {
    if (!teacher || !program) return;

    setList([...list, { teacher, program }]);
    setTeacher("");
    setProgram("");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Assign Teacher to Program
      </h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Teacher Name"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Program"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 rounded"
        >
          Assign
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Teacher</th>
            <th className="p-2 border">Program</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <td className="border p-2">{item.teacher}</td>
              <td className="border p-2">{item.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}