import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
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
        department: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="bg-gray-100">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white py-20 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">Get in Touch</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          We'd love to hear from you. Reach out for admissions,
          collaborations, or general inquiries.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Visit */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="bg-blue-600 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4">
              <MapPin />
            </div>
            <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
            <p className="text-gray-600 text-sm">
              E-51, Phase 8<br />
              Industrial Area<br />
              Mohali, Punjab - 160072
            </p>
            <button className="text-teal-600 mt-4 text-sm font-medium">
              View on Map →
            </button>
          </div>

          {/* Call */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="bg-teal-600 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4">
              <Phone />
            </div>
            <h3 className="font-semibold text-lg mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm">
              Admissions: +91 98765 43210<br />
              General: +91 98765 43211
            </p>
            <button className="text-teal-600 mt-4 text-sm font-medium">
              Call Now →
            </button>
          </div>

          {/* Email */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="bg-yellow-500 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4">
              <Mail />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-gray-600 text-sm">
              info@academia.edu<br />
              admissions@academia.edu
            </p>
            <button className="text-teal-600 mt-4 text-sm font-medium">
              Send Email →
            </button>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <div className="bg-purple-500 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4">
              <Clock />
            </div>
            <h3 className="font-semibold text-lg mb-2">Office Hours</h3>
            <p className="text-gray-600 text-sm">
              Mon - Fri: 8AM - 6PM<br />
              Saturday: 9AM - 2PM<br />
              Sunday: Closed
            </p>
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12">

          <div className="text-center mb-8">
            <p className="text-gray-500">Send Message</p>
            <h2 className="text-3xl font-serif font-bold text-blue-900">
              Let's Start a Conversation
            </h2>
            <p className="text-gray-500 mt-2">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 text-center">
              ✔ Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Select Department</option>
              <option>Admissions</option>
              <option>Support</option>
              <option>General Inquiry</option>
            </select>

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="md:col-span-2 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-blue-700 to-teal-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Send Message <Send size={18} />
            </button>

          </form>
        </div>
      </section>

      {/* MAP */}
      <section className="h-96">
        <iframe
          title="map"
          className="w-full h-full"
          src="https://maps.google.com/maps?q=Mohali%20Punjab&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
        />
      </section>

      {/* SOCIAL CONNECT */}
      <section className="py-16 text-center bg-gray-100">
        <h2 className="text-2xl font-serif font-bold text-blue-900 mb-6">
          Connect With Us
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full">
            Facebook
          </button>
          <button className="px-6 py-3 bg-sky-100 text-sky-600 rounded-full">
            Twitter
          </button>
          <button className="px-6 py-3 bg-blue-50 text-blue-900 rounded-full">
            LinkedIn
          </button>
          <button className="px-6 py-3 bg-pink-100 text-pink-600 rounded-full">
            Instagram
          </button>
          <button className="px-6 py-3 bg-red-100 text-red-600 rounded-full">
            YouTube
          </button>
        </div>
      </section>

    </div>
  );
}