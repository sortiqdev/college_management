import React, { useEffect, useState } from "react";
import API from "../../../../../services/api";
import { Building2, Users, MessageSquare, Phone, Mail, Send, X } from "lucide-react";

export default function HostelView() {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  const [roommates, setRoommates] = useState([]);
  const [complaint, setComplaint] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);
  

  useEffect(() => {
  const fetchRoom = async () => {
    setLoading(true);

    try {
      const res = await API.get("/hostel/myroom");

      const data = res.data || {};

      // If backend returns valid room
      if (data.room) {
        setRoom(data.room);
        setRoommates(data.roommates || []);
      } else {
        // No data from backend → use mock
        console.log("No backend data → using mock data");
        setMockData();
      }

    } catch (err) {
      console.error("Backend failed → using mock data", err);
      setMockData();
    } finally {
      setLoading(false);
    }
  };

  const setMockData = () => {
    const mockRoom = {
      id: "ROOM-101",
      hostelName: "Boys Hostel A",
      block: "Block B",
      roomNumber: "B-203",
      bed: "2",
      capacity: 4,
    };

    const mockRoommates = [
      {
        id: "STU-001",
        name: "Aman Verma",
        email: "aman@example.com",
        phone: "9876543210",
      },
      {
        id: "STU-002",
        name: "Rahul Singh",
        email: "rahul@example.com",
        phone: "9123456780",
      },
    ];

    setRoom(mockRoom);
    setRoommates(mockRoommates);
  };

  fetchRoom();
}, []);

  const handleSendComplaint = async () => {
    if (!subject.trim() && !complaint.trim()) {
      setMessage({ type: "error", text: "Please add a subject or complaint message." });
      return;
    }

    const payload = {
      subject,
      message: complaint,
      roomId: room?.id || room?._id || null,
      timestamp: new Date().toISOString(),
    };

    console.log("==== Complaint Payload ====");
    console.log(JSON.stringify(payload, null, 2));

    try {
      setSending(true);
      // Example endpoint — adapt to your backend
      await API.post("/hostel/complaints", payload);
      setMessage({ type: "success", text: "Complaint sent to warden." });
      setSubject("");
      setComplaint("");
    } catch (err) {
      console.error("Failed to send complaint", err);
      setMessage({ type: "error", text: "Failed to send complaint." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Hostel Room</h1>
          </div>
          <p className="text-gray-600">View your room details and communicate with your roommates</p>
        </div>

        {/* Alert Messages */}
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading room information...</p>
          </div>
        ) : (
          <>
            {/* Room Details & Roommates Grid */}
            {room ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Room Details Card */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-blue-600">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Room Details</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hostel Name</p>
                      <p className="text-lg font-medium text-gray-900">{room.hostelName || "N/A"}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Block</p>
                        <p className="text-lg font-medium text-gray-900">{room.block || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Room No</p>
                        <p className="text-lg font-medium text-gray-900">{room.roomNumber || room.number || "-"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bed</p>
                        <p className="text-lg font-medium text-gray-900">{room.bed || "-"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Capacity</p>
                        <p className="text-lg font-medium text-gray-900">{room.capacity || "-"} Persons</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roommates Card */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-purple-600">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Roommates</h2>
                  </div>

                  {roommates.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No roommates assigned yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {roommates.map((r) => (
                        <div
                          key={r.id || r._id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-shadow border border-purple-100"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{r.name || r.fullName || "Unknown"}</h3>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <p className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {r.email || "N/A"}
                              </p>
                              <a
                                href={`tel:${r.phone}`}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                              >
                                <Phone className="w-4 h-4" />
                                {r.phone || "-"}
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">You are not assigned to any room yet.</p>
              </div>
            )}

            {/* Complaint/Feedback Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 border-t-4 border-orange-600">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Send Feedback & Complaints</h2>
                  <p className="text-sm text-gray-600 mt-1">Communicate directly with your hostel warden</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-gray-50 hover:bg-white"
                    placeholder="e.g. Broken bed, noisy roommate, maintenance issue"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition bg-gray-50 hover:bg-white resize-none"
                    placeholder="Describe the issue in detail. Let us know how we can help you..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={handleSendComplaint}
                    disabled={sending}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="w-5 h-5" />
                    {sending ? "Sending..." : "Send Complaint"}
                  </button>

                  <button
                    onClick={() => {
                      setSubject("");
                      setComplaint("");
                      setMessage(null);
                    }}
                    type="button"
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Clear
                  </button>
                </div>

                <p className="text-xs text-gray-500 pt-2">Your complaint will be forwarded to the hostel warden. Response time: 24-48 hours.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
