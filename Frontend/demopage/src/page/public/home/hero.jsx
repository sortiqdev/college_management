import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

import image1 from "../../../assets/image/image1.png";
import image2 from "../../../assets/image/image2.png";
import image3 from "../../../assets/image/image3.png";
import image4 from "../../../assets/image/image4.png";
import image5 from "../../../assets/image/image5.png";
const slides = [
  {
    title: "Smart College Management",
    desc: "Automate academics, attendance, fees, and administration with ease.",
    button: "Get Started",
    image: image1,
  },
  {
    title: "Real-Time Analytics",
    desc: "Track students, staff, and performance in real time.",
    button: "View Dashboard",
    image: image2,
  },
  {
    title: "All-in-One ERP Solution",
    desc: "One platform for academics, hostel, transport & finance.",
    button: "Explore Features",
    image: image3,
  },
  {
    title: "Secure & Scalable",
    desc: "Built on a secure cloud platform that grows with you.",
    button: "Learn More",
    image: image4,
  },
  {
    title: "Join Thousands of Institutions",
    desc: "Trusted by colleges worldwide for seamless campus management.",
    button: "Request Demo",
    image: image5,
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-wrapper">

      {/* LEFT STATIC SIDE */}
      <div className="hero-left">
        <p className="hero-subtitle">College Management System</p>

        <h1>
          Simple, secure, and <br />
          professional campus <br />
          operations
        </h1>

        <p className="hero-description">
          Manage admissions, academics, attendance, and communication in one place.
          Built for administrators, faculty, and students.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Sign In</button>
        </div>

        <div className="hero-tags">
          <span>🔒 Secure Records</span>
          <span>⚡ Fast Access</span>
          <span>👥 Role-Based</span>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="hero-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="hero-content"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            {/* TITLE CENTER */}
            <h2 className="card-title">{slides[index].title}</h2>

            {/* TEXT + IMAGE ROW */}
            <div className="card-body">
              <div className="card-text">
                <p>{slides[index].desc}</p>
              </div>

              {slides[index].image && (
                <div className="card-image">
                  <img src={slides[index].image} alt="feature" />
                </div>
              )}
            </div>

            {/* BUTTON CENTER */}
            <div className="card-button">
              <button>{slides[index].button}</button>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* DOTS CENTER */}
        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={i === index ? "dot active" : "dot"}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;