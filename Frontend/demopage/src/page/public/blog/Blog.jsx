import React, { useEffect, useState } from "react";
import { getAllBlogs } from "../../../services/blogservices";
import {message} from "antd";
export default function Blog() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
const [selectedBlog, setSelectedBlog] = useState(null);
const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("all");

  const categories = ["all", "backend", "technology", "security","education"];

  // API CALL

// API CALL
const fetchBlogs = async (page = 1, sortType = sort, cat = category) => {
  try {

    const res = await getAllBlogs(page, sortType, cat);

    console.log("API RESPONSE:", res.data);

    const apiData = res?.data;

    const blogs = apiData?.blogs || [];
    const pagination = apiData?.pagination || {};

    setBlogPosts(blogs);
    setLastPage(pagination?.last_page || 1);

  } catch (error) {
    console.error("Error fetching blogs:", error);
    message.error("Failed to load notifications");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchBlogs(currentPage, sort, category);
  }, [currentPage, sort, category]);

  // CHECK LATEST BLOG
  const isLatest = (date) => {
    const blogDate = new Date(date);
    const now = new Date();
    const diff = (now - blogDate) / (1000 * 60 * 60);
    return diff < 24;
  };

  if (loading) {
    return (
      <div className="text-center text-lg py-20">
        Loading blogs...
      </div>
    );
  }

  const formatDate = (date) => {
  if (!date) return "";

  const d = new Date(date);

  const month = d.toLocaleString("en-US", { month: "long" });
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} / ${day} / ${year}`;
};

const openBlog = (blog) => {
  setSelectedBlog(blog);
  setOpenModal(true);
};
return (
  <div className="max-w-7xl mx-auto px-6 py-12">

    {/* HERO */}
    <div className="text-center mb-10">
      <h1 className="text-5xl font-bold mt-[40px]">
        Blog & Resources
      </h1>
      <p className="text-gray-500 mt-3">
        Latest updates, insights, and success stories
      </p>
    </div>

    {/* FILTER + SORT */}
    <div className="flex flex-wrap justify-between items-center mb-8">

      {/* CATEGORY FILTER */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setCategory(filter);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              category === filter
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setCurrentPage(1);
        }}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>

    </div>

    {/* BLOG GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

      {blogPosts.length > 0 ? (

        blogPosts.map((post) => (

          <div
            key={post.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-[350px]"
          >

            {/* IMAGE */}
            <div className="relative h-52 overflow-hidden">

              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />

              {isLatest(post.created_at) && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Latest
                </span>
              )}

            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">

              <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-3 py-1 rounded-full font-medium">
  {post.category}
</span>

              <h3 className="text-lg font-semibold mt-2">
                {post.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">

                {post.description.length > 120
                  ? `${post.description.substring(0, 120)}... `
                  : post.description}

                {post.description.length > 120 && (
                  <button
                    onClick={() => openBlog(post)}
                    className="text-indigo-600 hover:underline ml-1"
                  >
                    Read More
                  </button>
                )}

              </p>

              <div className="text-xs text-gray-400 mt-auto text-right">
                {formatDate(post.created_at)}
              </div>

            </div>

          </div>

        ))

      ) : (

        <div className="col-span-3 text-center text-gray-500 text-lg">
          No blogs available
        </div>

      )}

    </div>

    {/* PAGINATION */}
    <div className="flex justify-center items-center gap-2 mt-12">

      {/* PREVIOUS */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`px-3 py-2 rounded border
        ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        ←
      </button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded-md text-sm
          ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* NEXT */}
      <button
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`px-3 py-2 rounded border
        ${
          currentPage === lastPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        →
      </button>

    </div>

    {/* MODAL */}
    {openModal && selectedBlog && (

      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white w-[600px] rounded-lg shadow-lg p-6 relative">

          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-3 right-4 text-xl"
          >
            ×
          </button>

          <img
            src={selectedBlog.image_url}
            alt={selectedBlog.title}
            className="w-full h-60 object-cover rounded"
          />

          <span className="text-indigo-600 text-sm font-semibold mt-4 block">
            {selectedBlog.category}
          </span>

          <h2 className="text-xl font-bold mt-2">
            {selectedBlog.title}
          </h2>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {selectedBlog.description}
          </p>

          <div className="text-xs text-gray-400 mt-4">
            {formatDate(selectedBlog.created_at)}
          </div>

        </div>

      </div>

    )}

  </div>
);
}