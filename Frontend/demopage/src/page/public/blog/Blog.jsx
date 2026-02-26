import React, { useEffect, useState } from "react";
import "./Blog.css";
import { getAllBlogs } from "../../../services/blogservices";

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();

        
        setBlogPosts(data.data || []);
      } catch (error) {
        console.error("❌ Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // 🔥 Filter
  const filteredPosts =
    activeFilter === "all"
      ? blogPosts
      : blogPosts.filter(
          (post) =>
            post.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading blogs...</div>;
  }

  return (
    <div className="blog-container">
      {/* Hero */}
      <section className="blog-hero">
        <h1>Blog & Resources</h1>
        <p>Latest updates, insights, and success stories</p>
      </section>

      {/* Filters */}
      <div className="filter-container">
        {["all", "backend", "technology", "security"].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${
              activeFilter === filter ? "active" : ""
            }`}
            onClick={() => {
              setActiveFilter(filter);
              setVisibleCount(9);
            }}
          >
            {filter.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {visiblePosts.map((post) => (
          <article className="blog-card" key={post.id}>
            <div className="blog-image ">
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>

            <div className="blog-content">
              <span className={`category-badge ${post.category}`}>
                {post.category}
              </span>

              <h3 className="blog-title">{post.title}</h3>

              <p className="blog-excerpt">
                {post.description || "Click to read more..."}
              </p>

              <div className="blog-meta">
                <span>{post.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="load-more-container">
          <button className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 9)} >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}