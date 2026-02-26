import React, { useEffect, useState } from "react";
import API from "../../../../../services/api";
import {
  Building2,
  Users,
  ClipboardList,
  MessageCircle,
  PlusCircle,
  X,
  Check,
} from "lucide-react";

export default function HostelCreate() {
  const [tab, setTab] = useState("rooms");
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [queries, setQueries] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newRoom, setNewRoom] = useState({ hostelName: "", block: "", roomNumber: "", capacity: 1 });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [rRes, cRes, qRes] = await Promise.all([
        API.get("/hostel/rooms"),
        API.get("/hostel/complaints"),
        API.get("/hostel/queries"),
      ]).catch(() => []);

      setRooms(rRes?.data || []);
      setComplaints(cRes?.data || []);
      setQueries(qRes?.data || []);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async () => {
    if (!newRoom.hostelName || !newRoom.block || !newRoom.roomNumber) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }
    try {
      const res = await API.post("/hostel/rooms", newRoom);
      setRooms((prev) => [...prev, res.data]);
      setNewRoom({ hostelName: "", block: "", roomNumber: "", capacity: 1 });
      setMessage({ type: "success", text: "Room added" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Unable to add room" });
    }
  };

  // simple UI no editing functionality yet

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            Hostel Management
          </h1>
          <p className="text-gray-600">Manage rooms, view complaints and queries</p>
        </header>

        {/* tabs */}
        <nav className="mb-6">
          <ul className="flex space-x-4">
            <li>
              <button
                onClick={() => setTab("rooms")}
                className={`px-4 py-2 rounded-lg font-medium focus:outline-none transition 
                  ${tab === "rooms" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                <ClipboardList className="inline w-4 h-4 mr-1" /> Rooms
              </button>
            </li>
            <li>
              <button
                onClick={() => setTab("complaints")}
                className={`px-4 py-2 rounded-lg font-medium focus:outline-none transition 
                  ${tab === "complaints" ? "bg-purple-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                <MessageCircle className="inline w-4 h-4 mr-1" /> Complaints
              </button>
            </li>
            <li>
              <button
                onClick={() => setTab("queries")}
                className={`px-4 py-2 rounded-lg font-medium focus:outline-none transition 
                  ${tab === "queries" ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              >
                <Users className="inline w-4 h-4 mr-1" /> Queries
              </button>
            </li>
          </ul>
        </nav>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border-l-4 flex items-center justify-between ${
              message.type === "error"
                ? "bg-red-50 border-red-500 text-red-700"
                : "bg-green-50 border-green-500 text-green-700"
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {/* tab content */}
        {!loading && (
          <div>
            {tab === "rooms" && (
              <section>
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Rooms</h2>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Hostel name"
                      value={newRoom.hostelName}
                      onChange={(e) => setNewRoom({ ...newRoom, hostelName: e.target.value })}
                      className="px-3 py-2 rounded-lg border w-full md:w-40"
                    />
                    <input
                      type="text"
                      placeholder="Block"
                      value={newRoom.block}
                      onChange={(e) => setNewRoom({ ...newRoom, block: e.target.value })}
                      className="px-3 py-2 rounded-lg border w-full md:w-32"
                    />
                    <input
                      type="text"
                      placeholder="Room no."
                      value={newRoom.roomNumber}
                      onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                      className="px-3 py-2 rounded-lg border w-full md:w-32"
                    />
                    <input
                      type="number"
                      placeholder="Capacity"
                      value={newRoom.capacity}
                      min={1}
                      onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
                      className="px-3 py-2 rounded-lg border w-full md:w-24"
                    />
                    <button
                      onClick={handleAddRoom}
                      className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      <PlusCircle className="w-5 h-5" /> Add
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rooms.length === 0 ? (
                    <p className="text-gray-500">No rooms created yet.</p>
                  ) : (
                    rooms.map((r) => (
                      <div
                        key={r.id || r._id}
                        className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600 hover:shadow-lg transition"
                      >
                        <h3 className="font-semibold text-lg">{r.hostelName} - {r.roomNumber}</h3>
                        <p className="text-sm text-gray-600">Block: {r.block}</p>
                        <p className="text-sm text-gray-600">Capacity: {r.capacity}</p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {tab === "complaints" && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
                {complaints.length === 0 ? (
                  <p className="text-gray-500">No complaints filed.</p>
                ) : (
                  <div className="space-y-4">
                    {complaints.map((c) => (
                      <div
                        key={c.id || c._id}
                        className="bg-white rounded-lg p-4 shadow hover:shadow-md transition border-l-4 border-purple-600"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{c.subject || "(no subject)"}</h3>
                          <span className="text-sm text-gray-500">{new Date(c.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700 mb-1">{c.message}</p>
                        <p className="text-sm text-gray-500">Room: {c.roomId || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {tab === "queries" && (
              <section>
                <h2 className="text-2xl font-semibold mb-4">Queries</h2>
                {queries.length === 0 ? (
                  <p className="text-gray-500">No queries submitted.</p>
                ) : (
                  <div className="space-y-4">
                    {queries.map((q) => (
                      <div
                        key={q.id || q._id}
                        className="bg-white rounded-lg p-4 shadow hover:shadow-md transition border-l-4 border-green-600"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{q.subject || "(no subject)"}</h3>
                          <span className="text-sm text-gray-500">{new Date(q.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-gray-700 mb-1">{q.message}</p>
                        <p className="text-sm text-gray-500">Asked by: {q.userName || q.user || "-"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
