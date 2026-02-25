import React from "react";
import { useNavigate } from "react-router-dom";
import "./BlogPreview.css";

export default function HomeBlogSection() {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "Introducing Version 2.0: Major Update Released",
      category: "announcement",
      date: "Feb 8, 2026",
      image: "Feature Release",
      excerpt:
        "We're thrilled to announce the release of AdminPro 2.0 with revolutionary features including AI-powered automation, enhanced security protocols, and improved performance optimization.",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "How We Built Our AI-Powered Analytics Engine",
      category: "technology",
      date: "Feb 5, 2026",
      image: "Technology",
      excerpt:
        "Deep dive into the architecture and algorithms behind our new AI analytics engine.",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Security Best Practices: Protecting Your Data",
      category: "security",
      date: "Feb 1, 2026",
      image: "Security",
      excerpt:
        "Comprehensive guide on implementing enterprise-grade security measures.",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "Case Study: 500% Productivity Increase",
      category: "success",
      date: "Jan 28, 2026",
      image: "Case Study",
      excerpt:
        "How a Fortune 500 company transformed their operations using AdminPro.",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Mobile App Launch: Manage on the Go",
      category: "announcement",
      date: "Jan 25, 2026",
      image: "Mobile",
      excerpt:
        "Our new mobile application brings full functionality to your smartphone.",
      readTime: "4 min read",
    },
    {
      id: 6,
      title: "Integration Spotlight: Connect with Your Favorites",
      category: "integration",
      date: "Jan 20, 2026",
      image: "Integration",
      excerpt:
        "Seamlessly integrate with 100+ third-party applications.",
      readTime: "5 min read",
    },
  ];

  return (
    <section className="home-blog">
      <div className="home-blog-header">
        <h2>Latest Insights & Updates</h2>
        <p>Stay updated with our newest features and success stories</p>
      </div>

      <div className="home-blog-grid">
        {blogs.slice(0, 6).map((blog) => (
          <div
            key={blog.id}
            className="home-blog-card"
            onClick={() => navigate("/blog")}
          >
            <div className="bg-gradient-to-br from-[#76efff] to-[#00ccff] px-4 py-1 rounded-full text-s font-medium w-36 m-4">{blog.category}</div>

            <h3>{blog.title}</h3>

            <p>{blog.excerpt}</p>

            <div className="blog-meta">
              <span>{blog.date}</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="home-blog-btn ">
        <button className="bg-gradient-to-br from-[#76efff] to-[#00ccff] px-6 py-3 rounded-full text-white font-medium hover:opacity-90 transition-opacity" onClick={() => navigate("/blog")}>
          View All Blogs
        </button>
      </div>
    </section>
  );
}
