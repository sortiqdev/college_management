export default function FeeReport() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border">

      <h2 className="text-lg font-semibold mb-4">
        Fee Reports
      </h2>

      <div className="grid grid-cols-4 gap-4">

        <input
          className="border p-2 rounded-lg"
          placeholder="Student ID"
        />

        <input
          className="border p-2 rounded-lg"
          placeholder="Program"
        />

        <input
          className="border p-2 rounded-lg"
          placeholder="Year"
        />

        <button className="bg-green-600 text-white rounded-lg px-4">
          Generate
        </button>

      </div>

    </div>
  );
}