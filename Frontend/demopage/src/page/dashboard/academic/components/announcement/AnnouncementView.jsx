import React from "react";
import { useState, useEffect } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import API from "../../../../../services/api";

export default function AnnouncementView({ role }) {

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get("org-messages");
        console.log("Announcements:", res.data);
        setAnnouncements(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <FileTextOutlined className="text-3xl text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Announcements
          </h1>
          <p className="text-sm text-gray-500">
            Latest updates from your organization
          </p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {announcements.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
          <FileTextOutlined className="text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">
            No Announcements Yet
          </h3>
          <p className="text-gray-500 text-sm">
            Announcements will appear here when published.
          </p>
        </div>
      ) : (

        /* ANNOUNCEMENT GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {announcements.map((item, index) => (

            <div
              key={index}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* TARGET + CREATOR */}
              <div className="flex items-center justify-between text-xs mb-4">

                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                  {item.target}
                </span>

                <span className="text-gray-400">
                  {item?.createdBy?.role || "Admin"}
                </span>

              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between border-t pt-3">

                <span className="text-xs text-gray-400">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "Today"}
                </span>

                {(role === "admin") && (
                  <div className="flex gap-2">

                    <button className="text-xs px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                      Edit
                    </button>

                    <button className="text-xs px-3 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200">
                      Delete
                    </button>

                  </div>
                )}

              </div>

            </div>

          ))}

        </div>
      )}
    </div>
  );
}