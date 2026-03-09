import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import LoginModel from "./CTA/LoginModel";

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

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-row lg:flex-row items-center justify-around
     px-[8%]  gap-16">

      {/* LEFT SIDE */}
      <div className="flex-1 max-w-[600px] px-[20px]">

        <p className="text-blue-700 font-semibold mb-4">
          College Management System
        </p>

        <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Simple, secure and <br />
          professional campus <br />
          operations
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Manage admissions, academics, attendance, and communication
          in one platform. Built for administrators, faculty and students.
        </p>

        <div className="flex gap-5 mb-8">
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
            Get Started
          </button>

          <button
            onClick={() => setLoginOpen(true)}
            className="border border-blue-500 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-50 transition"
          >
            Sign In
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
            🔒 Secure Records
          </span>

          <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
            ⚡ Fast Access
          </span>

          <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
            👥 Role Based
          </span>
        </div>
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="flex-1 w-full max-w-[650px]">

        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-10">

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >

              <h2 className="text-3xl font-bold text-center mb-6">
                {slides[index].title}
              </h2>

              <p className="text-center text-gray-600 mb-8">
                {slides[index].desc}
              </p>

              {/* IMAGE */}
              <motion.div
                className="flex justify-center mb-8"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <img
                  src={slides[index].image}
                  alt="feature"
                  className="w-[260px]"
                />
              </motion.div>

              {/* BUTTON */}
              <div className="flex justify-center">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full shadow hover:scale-105 transition">
                  {slides[index].button}
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* DOTS */}
          <div className="flex justify-center mt-8 gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  i === index ? "bg-cyan-400 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {loginOpen && <LoginModel onClose={() => setLoginOpen(false)} />}
    </section>
  );
}