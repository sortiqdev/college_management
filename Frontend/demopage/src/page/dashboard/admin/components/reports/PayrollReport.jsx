export default function PayrollReport() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border">

      <h2 className="text-lg font-semibold mb-4">
        Payroll Reports
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <input
          className="border p-2 rounded-lg"
          placeholder="Employee ID"
        />

        <input
          className="border p-2 rounded-lg"
          placeholder="Department"
        />

        <input
          className="border p-2 rounded-lg"
          placeholder="Month"
        />

        <button className="bg-purple-600 text-white rounded-lg px-4">
          Generate
        </button>

      </div>

    </div>
  );
}