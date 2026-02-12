import React, { useState } from 'react';
import './Blog.css';

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const blogPosts = [
    {
      id: 1,
      title: 'Introducing Version 2.0: Major Update Released',
      category: 'announcement',
      date: 'Feb 8, 2026',
      image: 'Feature Release',
      excerpt:
        "We're thrilled to announce the release of AdminPro 2.0 with revolutionary features including AI-powered automation, enhanced security protocols, and improved performance optimization.",
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'How We Built Our AI-Powered Analytics Engine',
      category: 'technology',
      date: 'Feb 5, 2026',
      image: 'Technology',
      excerpt:
        'Deep dive into the architecture and algorithms behind our new AI analytics engine. Learn how machine learning helps businesses make smarter decisions.',
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Security Best Practices: Protecting Your Data',
      category: 'security',
      date: 'Feb 1, 2026',
      image: 'Security',
      excerpt:
        'Comprehensive guide on implementing enterprise-grade security measures. Discover how encryption, MFA, and regular audits protect your valuable information.',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Case Study: 500% Productivity Increase',
      category: 'success',
      date: 'Jan 28, 2026',
      image: 'Case Study',
      excerpt:
        'How a Fortune 500 company transformed their operations using AdminPro. See real numbers and measurable results from their implementation.',
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Mobile App Launch: Manage on the Go',
      category: 'announcement',
      date: 'Jan 25, 2026',
      image: 'Mobile',
      excerpt:
        'Our new mobile application brings full functionality to your smartphone. Manage your organization anytime, anywhere.',
      readTime: '4 min read',
    },
    {
      id: 6,
      title: 'Integration Spotlight: Connect with Your Favorites',
      category: 'integration',
      date: 'Jan 20, 2026',
      image: 'Integration',
      excerpt:
        'Seamlessly integrate with 100+ third-party applications including Slack, Salesforce, and HubSpot.',
      readTime: '5 min read',
    },
    {
      id: 7,
      title: 'Scaling Admin Systems for 1M+ Users',
      category: 'technology',
      date: 'Jan 15, 2026',
      image: 'Scalability',
      excerpt:
        'Learn how we designed AdminPro to handle millions of users without compromising performance.',
      readTime: '9 min read',
    },
    {
      id: 8,
      title: 'Why Role-Based Access Control Matters',
      category: 'security',
      date: 'Jan 12, 2026',
      image: 'Access Control',
      excerpt:
        'A detailed look at RBAC and how fine-grained permissions improve security.',
      readTime: '6 min read',
    },
    {
      id: 9,
      title: 'Customer Story: Automating Operations End-to-End',
      category: 'success',
      date: 'Jan 8, 2026',
      image: 'Customer Success',
      excerpt:
        'How a startup automated HR, finance, and operations using AdminPro.',
      readTime: '7 min read',
    },
    {
      id: 10,
      title: 'Behind the Scenes: Our Product Design Process',
      category: 'design',
      date: 'Jan 5, 2026',
      image: 'Product Design',
      excerpt:
        'From wireframes to production—explore how our design team works.',
      readTime: '5 min read',
    },
    {
      id: 11,
      title: 'Reducing Operational Costs with Smart Automation',
      category: 'business',
      date: 'Dec 30, 2025',
      image: 'Automation',
      excerpt:
        'Discover how automation reduces cost and improves efficiency.',
      readTime: '6 min read',
    },
    {
      id: 12,
      title: 'Improving Team Productivity with Smart Dashboards',
      category: 'productivity',
      date: 'Dec 10, 2025',
      image: 'Dashboard',
      excerpt:
        'Real-time dashboards that empower data-driven decisions.',
      readTime: '5 min read',
    },
  ];

  const filteredPosts =
    activeFilter === 'all'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeFilter);

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="blog-container">
      {/* Hero */}
      <section className="blog-hero">
        <h1>Blog & Resources</h1>
        <p>Latest updates, insights, and success stories</p>
      </section>

      {/* Filters */}
      <div className="filter-container">
        {['all', 'announcement', 'technology', 'security'].map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${
              activeFilter === filter ? 'active' : ''
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
  {/* Blog Grid */}
<div className="blog-grid">
  {visiblePosts.map((post) => (
    <article className="blog-card" key={post.id}>
      
      {/* Image / Header */}
      <div className="blog-image">
        <span className="image-title">{post.image}</span>
      </div>

      {/* Content */}
      <div className="blog-content">
        <span className={`category-badge ${post.category}`}>
          {post.category}
        </span>

        <h3 className="blog-title">{post.title}</h3>

        <p className="blog-excerpt">{post.excerpt}</p>

        <div className="blog-meta">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  ))}
</div>


      {/* Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="load-more-container">
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount((prev) => prev + 9)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
