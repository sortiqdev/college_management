import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import "./Hero.css";

const slides = [
  {
    title: "Smart College Management",
    desc: "Automate academics, attendance, fees, and administration with ease.",
    button: "Get Started",
  },
  {
    title: "Real-Time Analytics",
    desc: "Track students, staff, and performance in real time.",
    button: "View Dashboard",
  },
  {
    title: "All-in-One ERP Solution",
    desc: "One platform for academics, hostel, transport & finance.",
    button: "Explore Features",
  },
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    },3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-wrapper">
      {/* Floating background objects */}
      <motion.div className="blob blob1" />
      <motion.div className="blob blob2" />
      <motion.div className="blob blob3" />

      {/* Hero Card */}
      <div className="hero-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="hero-content"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{slides[index].title}</h1>
            <p>{slides[index].desc}</p>
            <button>{slides[index].button}</button>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
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
