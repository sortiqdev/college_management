import React from "react";

export default function RoomTable({ rooms, onAssign }) {

  const getStatus = (room) => {
    const occupied = room.students?.length || 0;

    if (occupied === 0) return "Empty";
    if (occupied < room.capacity) return "Partial";
    return "Full";
  };

  return (
    <div className="bg-white rounded-xl shadow mt-10 p-4">

      <h2 className="text-xl font-semibold mb-4">
        Room Management Table
      </h2>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 border">Block</th>
            <th className="p-3 border">Floor</th>
            <th className="p-3 border">Room</th>
            <th className="p-3 border">Capacity</th>
            <th className="p-3 border">Occupied</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Action</th>
          </tr>

        </thead>

        <tbody>

          {rooms.length === 0 ? (

            <tr>
              <td colSpan="7" className="text-center p-6 text-gray-500">
                No rooms created
              </td>
            </tr>

          ) : (

            rooms.map((room) => {

              const occupied = room.students?.length || 0;
              const status = getStatus(room);

              return (

                <tr key={room._id} className="border-t">

                  <td className="p-3 border">{room.block}</td>

                  <td className="p-3 border">{room.floor}</td>

                  <td className="p-3 border font-semibold">
                    {room.roomNumber}
                  </td>

                  <td className="p-3 border">
                    {room.capacity}
                  </td>

                  <td className="p-3 border">
                    {occupied}
                  </td>

                  <td className="p-3 border">

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                      ${status === "Empty" && "bg-green-100 text-green-700"}
                      ${status === "Partial" && "bg-yellow-100 text-yellow-700"}
                      ${status === "Full" && "bg-red-100 text-red-700"}
                      `}
                    >
                      {status}
                    </span>

                  </td>

                  <td className="p-3 border">

                    <button
                      onClick={() => onAssign(room)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Assign
                    </button>

                  </td>

                </tr>

              );

            })

          )}

        </tbody>

      </table>

    </div>
  );
}