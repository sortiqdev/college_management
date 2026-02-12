import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [chatOpen, setChatOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="contact-container">
      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help. Reach out and our team will respond shortly.</p>
      </section>

      {/* MAIN */}
      <section className="contact-content container">
        <div className="contact-grid">
          {/* FORM */}
          <div className="contact-card">
            <h2>Send us a Message</h2>

            {submitted && (
              <div className="success-message">
                ✔ Your message has been sent successfully.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
              <input name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
              <textarea name="message" rows="5" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
              <button type="submit">Send Message</button>
            </form>
          </div>

          {/* INFO */}
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-box">
              <h4>📍 Address</h4>
              <p>123 Business Avenue<br />Tech City, USA</p>
            </div>

            <div className="info-box">
              <h4>📞 Phone</h4>
              <p>+1 (555) 000-0000</p>
              <span>Mon–Fri, 9AM–6PM</span>
            </div>

            <div className="info-box">
              <h4>✉ Email</h4>
              <p>support@adminpro.com</p>
              <p>hello@adminpro.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <h2>Ready to Get Started?</h2>
        <p>Join hundreds of businesses using AdminPro</p>
        <button className="bg-primary">Start Free Trial</button>
      </section>

      {/* CHAT */}
      <button className="chat-float" onClick={() => setChatOpen(true)}>💬</button>

      {chatOpen && (
        <div className="chat-popup">
          <header>
            Live Support
            <span onClick={() => setChatOpen(false)}>✕</span>
          </header>
          <div className="chat-body">👋 Hi! How can we help?</div>
          <footer>
            <input placeholder="Type message..." />
            <button>Send</button>
          </footer>
        </div>
      )}
    </div>
  );
}
