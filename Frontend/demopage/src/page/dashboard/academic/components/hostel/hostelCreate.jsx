/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import API from "../../../../../services/api";
import RoomTable from "./roomtable";
import {
  Building2,
  Users,
  ClipboardList,
  MessageCircle,
  PlusCircle,
  BedDouble,
  Home
} from "lucide-react";

export default function HostelCreate() {

  const [tab, setTab] = useState("rooms");
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [queries, setQueries] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [filterBlock, setFilterBlock] = useState("");
  const [searchRoom, setSearchRoom] = useState("");

  const [newRoom, setNewRoom] = useState({
    block: "",
    floor: "",
    roomNumber: "",
    capacity: 4,
    students: []
  });

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
      ]);

      setRooms(rRes?.data || []);
      setComplaints(cRes?.data || []);
      setQueries(qRes?.data || []);

    } catch (err) {
      setMessage({ type: "error", text: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async () => {

    if (!newRoom.block || !newRoom.floor || !newRoom.roomNumber) {
      setMessage({ type: "error", text: "Please fill all fields" });
      return;
    }

    try {

      const res = await API.post("/hostel/rooms", newRoom);

      setRooms((prev) => [...prev, res.data]);

      setNewRoom({
        block: "",
        floor: "",
        roomNumber: "",
        capacity: 4,
        students: []
      });

      setMessage({ type: "success", text: "Room Added Successfully" });

    } catch (err) {
      setMessage({ type: "error", text: "Failed to add room" });
    }
  };

  const filteredRooms = rooms.filter((r) => {

    return (
      (!filterBlock || r.block === filterBlock) &&
      (!searchRoom || r.roomNumber?.toString().includes(searchRoom))
    );

  });

  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((a, b) => a + (b.capacity || 0), 0);
  const occupiedBeds = rooms.reduce((a, b) => a + ((b.students || []).length), 0);
  const availableBeds = totalCapacity - occupiedBeds;

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="text-blue-600"/>
            Hostel Management
          </h1>
          <p className="text-gray-500">Manage rooms, complaints and queries</p>
        </div>

        {/* Stats */}

        {tab === "rooms" && (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
              <Home className="text-blue-600"/>
              <div>
                <p className="text-sm text-gray-500">Total Rooms</p>
                <p className="text-xl font-semibold">{totalRooms}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
              <BedDouble className="text-green-600"/>
              <div>
                <p className="text-sm text-gray-500">Total Capacity</p>
                <p className="text-xl font-semibold">{totalCapacity}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
              <Users className="text-purple-600"/>
              <div>
                <p className="text-sm text-gray-500">Occupied Beds</p>
                <p className="text-xl font-semibold">{occupiedBeds}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
              <BedDouble className="text-orange-600"/>
              <div>
                <p className="text-sm text-gray-500">Available Beds</p>
                <p className="text-xl font-semibold">{availableBeds}</p>
              </div>
            </div>

          </div>

        )}

        {/* Tabs */}

        <div className="flex gap-4 mb-6">

          <button
            onClick={() => setTab("rooms")}
            className={`px-4 py-2 rounded-lg ${
              tab === "rooms"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Rooms
          </button>

          <button
            onClick={() => setTab("complaints")}
            className={`px-4 py-2 rounded-lg ${
              tab === "complaints"
                ? "bg-purple-600 text-white"
                : "bg-white border"
            }`}
          >
            Complaints
          </button>

          <button
            onClick={() => setTab("queries")}
            className={`px-4 py-2 rounded-lg ${
              tab === "queries"
                ? "bg-green-600 text-white"
                : "bg-white border"
            }`}
          >
            Queries
          </button>

        </div>

        {/* ROOMS TAB */}

        {tab === "rooms" && (

          <>

            {/* Filters */}

            <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3">

              <input
                placeholder="Search Room"
                value={searchRoom}
                onChange={(e)=>setSearchRoom(e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />

              <input
                placeholder="Filter Block"
                value={filterBlock}
                onChange={(e)=>setFilterBlock(e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />

            </div>

            {/* CREATE ROOM */}

            <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-3">

              <input
                placeholder="Block"
                value={newRoom.block}
                onChange={(e)=>setNewRoom({...newRoom, block:e.target.value})}
                className="border px-3 py-2 rounded-lg"
              />

              <input
                placeholder="Floor"
                value={newRoom.floor}
                onChange={(e)=>setNewRoom({...newRoom, floor:e.target.value})}
                className="border px-3 py-2 rounded-lg"
              />

              <input
                placeholder="Room Number"
                value={newRoom.roomNumber}
                onChange={(e)=>setNewRoom({...newRoom, roomNumber:e.target.value})}
                className="border px-3 py-2 rounded-lg"
              />

              <select
                value={newRoom.capacity}
                onChange={(e)=>setNewRoom({...newRoom, capacity:Number(e.target.value)})}
                className="border px-3 py-2 rounded-lg"
              >

                <option value={1}>1 Student</option>
                <option value={2}>2 Students</option>
                <option value={3}>3 Students</option>
                <option value={4}>4 Students (Max)</option>

              </select>

              <button
                onClick={handleAddRoom}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
              >
                <PlusCircle size={18}/>
                Add Room
              </button>
               
            </div>

            {/* ROOMS GRID */}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

              {filteredRooms.map((room)=>{

                const students = room.students || [];

                return(

                  <div
                    key={room._id}
                    className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600"
                  >

                    <h3 className="font-semibold text-lg">
                      Room {room.roomNumber}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Block {room.block} | Floor {room.floor}
                    </p>

                    <div className="mt-3 space-y-2">

                      {Array.from({length: room.capacity}).map((_,i)=>{

                        const student = students[i];

                        return(

                          <div
                            key={i}
                            className="flex justify-between bg-gray-100 px-3 py-2 rounded"
                          >

                            <span>Bed {i+1}</span>

                            <span className="text-sm">

                              {student
                                ? student.name
                                : <span className="text-gray-400">Empty</span>
                              }

                            </span>

                          </div>

                        )

                      })}

                    </div>

                    <button
                      className="mt-4 w-full bg-blue-500 text-white py-1 rounded"
                    >
                      Assign Student
                    </button>

                  </div>

                )

              })}

            </div>
             {/* ROOM TABLE */}

         <RoomTable
           rooms={filteredRooms}
           onAssign={(room) => {
           console.log("Assign student to room:", room); }}/>
          </>

        )}

      </div>

    </div>

  );
}