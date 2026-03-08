import React, { useEffect, useState } from "react";
import API from "../../../../../services/api";

export default function NoticeView({ role }) {
  const [noticeData, setNoticeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await API.get("org-notices");
      setNoticeData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching notices", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading Notices...</p>
      </div>
    );
  }

  if (noticeData.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500">
        <h3 className="text-lg font-semibold mb-2">No Notices Available</h3>
        <p>
          {role === "student"
            ? "School notices will appear here."
            : role === "parent"
            ? "Important notices for your child will appear here."
            : "Published notices will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {noticeData.map((notice, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-100 p-5"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800 max-w-[220px] truncate">
  {notice.title}
</h3>

            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              {notice.category || "Notice"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            {notice.description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>
              {new Date(notice.date || notice.created_at).toLocaleDateString()}
            </span>

            {(role === "teacher" || role === "admin") && (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}