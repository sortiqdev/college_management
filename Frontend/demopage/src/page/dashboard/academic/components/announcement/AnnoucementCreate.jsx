import React, { useState, useEffect } from "react";
import API from "../../../../../services/api";

export default function AnnouncementCreate() {

  const [loading,setLoading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "all",
  });

  const [announcements,setAnnouncements] = useState([])
  const [filter,setFilter] = useState("all")

  const user = JSON.parse(localStorage.getItem("user"))

  /* FETCH ANNOUNCEMENTS */
  const fetchAnnouncements = async () => {
    try{
      const res = await API.get("org-messages")
      setAnnouncements(res.data.data || [])
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchAnnouncements()
  },[])

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      setLoading(true)

      const payload = {
        ...form,
        createdBy:{
          userId:user?._id,
          role:user?.role
        }
      }

      await API.post("org-messages",payload)

      alert("Announcement Published")

      setForm({
        title:"",
        description:"",
        target:"all"
      })

      fetchAnnouncements()

    }catch(error){

      console.error(error)
      alert("Failed to publish announcement")

    }finally{
      setLoading(false)
    }

  }

  const filteredAnnouncements =
    filter === "all"
      ? announcements
      : announcements.filter(a => a.target === filter)

  return (
    <div className="p-6 space-y-8">

      {/* ================= FORM ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-5xl">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Announcement
            </h2>
            <p className="text-sm text-gray-500">
              Publish important information to users
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>

        <form className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Announcement Title
            </label>

            <input
              type="text"
              placeholder="Enter announcement title"
              value={form.title}
              onChange={(e)=>setForm({ ...form, title:e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>

            <textarea
              rows="5"
              maxLength="500"
              placeholder="Write announcement details..."
              value={form.description}
              onChange={(e)=>setForm({ ...form, description:e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              required
            />

            <div className="text-right text-xs text-gray-400 mt-1">
              {form.description.length}/500 characters
            </div>
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audience
            </label>

            <select
              value={form.target}
              onChange={(e)=>setForm({ ...form, target:e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              <option value="all">All Users</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>

        </form>

      </div>

      {/* ================= ANNOUNCEMENT LIST ================= */}
      <div className="bg-white border rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h3 className="text-lg font-semibold text-gray-800">
            Published Announcements
          </h3>

          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="all">All</option>
            <option value="student">Students</option>
            <option value="parent">Parents</option>
            <option value="teacher">Teachers</option>
          </select>

        </div>

        {filteredAnnouncements.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No announcements available
          </p>
        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

            {filteredAnnouncements.map((item,index)=>(
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow transition"
              >

                <h4 className="font-semibold text-gray-800 mb-2">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-600 mb-3">
                  {item.description}
                </p>

                <div className="flex justify-between text-xs text-gray-500">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {item.target}
                  </span>

                  <span>
                    {item?.createdBy?.role || "Admin"}
                  </span>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}