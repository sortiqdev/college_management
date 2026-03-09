import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import API from "../../../services/api";

export default function Contact() {

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: ""
  });

  // CONTACT INFO (key-value camelCase)
  const contactInfo = [
    {
      title: "Visit Us",
      icon: <MapPin />,
      value: "E-51 Phase 8 Industrial Area Mohali Punjab 160072",
      action: "View Map"
    },
    {
      title: "Call Us",
      icon: <Phone />,
      value: "+91 9876543210 / +91 9876543211",
      action: "Call Now"
    },
    {
      title: "Email Us",
      icon: <Mail />,
      value: "info@academia.edu",
      action: "Send Email"
    },
    {
      title: "Office Hours",
      icon: <Clock />,
      value: "Mon–Fri 8AM–6PM | Sat 9AM–2PM",
      action: ""
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/contact", formData);
      console.log(res);

      setSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: ""
      });

      setTimeout(() => setSubmitted(false), 3000);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">

      {/* HERO */}
      <section className="bg-white py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>

        <p className="max-w-xl mx-auto text-gray-600">
          Have questions about admissions, programs, or collaboration?
          Our team is here to help.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-3xl shadow-xl">

          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 hover:shadow-lg transition rounded-2xl p-6 text-center"
            >
              <div className="bg-blue-600 w-14 h-14 mx-auto flex items-center justify-center rounded-xl text-white mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.value}
              </p>

              {item.action && (
                <button className="text-blue-600 text-sm mt-3 font-medium">
                  {item.action}
                </button>
              )}
            </div>
          ))}

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Send a Message
            </h2>

            <p className="text-gray-500 mt-2">
              Fill out the form and we will respond within 24 hours.
            </p>
          </div>

          {submitted && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center mb-6">
              Message sent successfully ✔
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="md:col-span-2 border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full flex items-center justify-center gap-2 transition"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} />
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

    </div>
  );
}