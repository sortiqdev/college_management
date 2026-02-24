import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About AdminPro</h1>
        <p>Revolutionizing Administrative Management</p>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, AdminPro emerged from a simple problem: businesses were spending too much time on administrative tasks and not enough on strategic work. Our team of experienced professionals set out to build a solution that could transform how organizations manage their operations.
            </p>
            <p>
              Today, AdminPro is trusted by over 500 companies worldwide, helping them streamline their processes and boost productivity.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To empower organizations of all sizes by providing intuitive, powerful administrative management tools that free teams from tedious manual work and enable them to focus on what truly matters.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>🎯 User-Centric</h3>
                <p>We design every feature with our users in mind, ensuring simplicity and efficiency.</p>
              </div>
              <div className="value-card">
                <h3>🔒 Trust & Security</h3>
                <p>Your data security is paramount. We implement enterprise-grade protection.</p>
              </div>
              <div className="value-card">
                <h3>🚀 Innovation</h3>
                <p>We continuously evolve to meet the changing needs of modern businesses.</p>
              </div>
              <div className="value-card">
                <h3>🤝 Support</h3>
                <p>Our dedicated team is always ready to help you succeed.</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Our Team</h2>
            <p>
              We're a diverse team of developers, designers, and business strategists united by the passion to create exceptional products.
            </p>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">👨‍💼</div>
                <h4>John Smith</h4>
                <p className="role">CEO & Founder</p>
                <p className="bio">20+ years in enterprise software</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">👩‍💻</div>
                <h4>Sarah Chen</h4>
                <p className="role">CTO</p>
                <p className="bio">Full-stack architect & innovator</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">👨‍🎨</div>
                <h4>Michael Davis</h4>
                <p className="role">Head of Design</p>
                <p className="bio">UX/UI specialist with 15 years experience</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">👩‍💼</div>
                <h4>Emma Wilson</h4>
                <p className="role">VP of Operations</p>
                <p className="bio">Business operations expert</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Key Milestones</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker">2020</div>
                <h4>Founded AdminPro</h4>
                <p>Started with a vision to transform administrative management</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">2021</div>
                <h4>Reached 100 Customers</h4>
                <p>Expanded features based on user feedback</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">2022</div>
                <h4>Series A Funding</h4>
                <p>Raised $5M to accelerate growth</p>
              </div>
              <div className="timeline-item">
                <div className="timeline-marker">2024</div>
                <h4>500+ Companies Trust Us</h4>
                <p>Expanded to international markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Join Us?</h2>
        <p>Experience the difference AdminPro can make for your organization</p>
        <button className="cta-button">Get Started Today</button>
      </section>
    </div>
  );
}
