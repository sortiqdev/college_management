import React, { useState, useEffect } from "react";
import API from "../../../../../services/api";

export default function NoticeCreate() {

  const [form, setForm] = useState({
    title: "",
    category: "",
    target: "all",
    description: "",
    date: "",
  });

  const [notices, setNotices] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  /* FETCH NOTICES */
  const fetchNotices = async () => {
    try {
      const res = await API.get("org-notices");
      setNotices(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...form,
        createdBy: {
          userId: user?._id,
          role: user?.role
        }
      };

      await API.post("org-notices", payload);

      alert("Notice Published");

      setForm({
        title: "",
        category: "",
        target: "all",
        description: "",
        date: "",
      });

      fetchNotices();

    } catch (error) {

      console.error(error);
      alert("Failed to publish notice");

    } finally {

      setLoading(false);

    }
  };

  const filteredNotices =
    filter === "all"
      ? notices
      : notices.filter((n) => n.target === filter);

  return (
    <div className="p-6 space-y-8">

      {/* ================= FORM ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-6 max-w-5xl">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Notice
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
            {loading ? "Publishing..." : "Publish Notice"}
          </button>
        </div>

        <form className="space-y-6">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Title
            </label>

            <input
              type="text"
              value={form.title}
              placeholder="Notice Title"
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <input
              type="text"
              value={form.category}
              placeholder="Exam / Holiday / Event"
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Audience
            </label>

            <select
              value={form.target}
              onChange={(e) =>
                setForm({ ...form, target: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="student">Students</option>
              <option value="parent">Parents</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notice Description
            </label>

            <textarea
              rows="4"
              value={form.description}
              placeholder="Notice Description"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            />
          </div>

        </form>
      </div>

      {/* ================= NOTICE LIST ================= */}
      <div className="bg-white border rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h3 className="text-lg font-semibold text-gray-800">
            Published Notices
          </h3>

          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="all">All</option>
            <option value="student">Students</option>
            <option value="parent">Parents</option>
          </select>

        </div>

        {filteredNotices.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No notices available
          </p>
        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

            {filteredNotices.map((item,index)=>(
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

                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                    {item.category}
                  </span>

                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {item.target}
                  </span>

                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {item.date}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}