import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";
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
// let a = 10 ;
// alert ("a"+ a++)
const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className= "w-full min-h-screen flex items-center justify-center px-[8%] gap-[70px]">

      {/* LEFT STATIC SIDE */}
      <div className="flex-1 max-w-[600px]">
        <p className="text-lg font-serif text-blue-900 mb-8">College Management System</p>

        <h1 className="text-5xl font-black text-black font-serif mb-6">
          Simple, secure, and <br />
          professional campus <br />
          operations
        </h1>

        <p className="font-serif text-blue-900 text-[22px] mb-[35px] leading-[1.6] ">
          Manage admissions, academics, attendance, and communication in one place.
          Built for administrators, faculty, and students.
        </p>

        <div className="hero-buttons flex gap-10 mb-20">
          <button  className="bg-gradient-to-br from-[#76efff] to-[#00ccff] hover:from-indigo-600 hover:via-sky-600 hover:to-emerald-600 text-white rounded-[50px] px-6 py-3 shadow-lg transition-all duration-300" >Get Started</button>
             <button className="bg-gradient-to-br from-[#76efff] to-[#00ccff] hover:from-indigo-600 hover:via-sky-600 hover:to-emerald-600 text-white rounded-[50px] px-6 py-3 shadow-lg transition-all duration-300" onClick={()=>setLoginOpen(true)}>Sign In</button>
        </div>
       
        <div className="flex gap-[15px] flex-wrap">
          <span className="bg-white/20 px-4 py-2 rounded-[20px] text-sm text-blue-700 shadow-md ">🔒 Secure Records</span>
          <span className="bg-white/20 px-4 py-2 rounded-[20px] text-sm text-blue-700 shadow-md">⚡ Fast Access</span>
          <span className="bg-white/20 px-4 py-2 rounded-[20px] text-sm text-blue-700 shadow-md">👥 Role-Based</span>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="flex-1 max-w-[700px] bg-white/25 backdrop-blur-[25px] rounded-[30px] p-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.25)] font-serif">
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
            <h2 className="text-[60px] font-bold text-center mb-[30px]">{slides[index].title}</h2>

            {/* TEXT + IMAGE ROW */}
            <div className="flex justify-between items-center gap-5 mb-8">
              <div className="text-[1.4rem] leading-[1.8]">
                <p>{slides[index].desc}</p>
              </div>

              {slides[index].image && (
                <div className="flex justify-center flex-1">
                  <img src={slides[index].image} alt="feature" />
                </div>
              )}
            </div>

            {/* BUTTON CENTER */}
            <div className="bg-gradient-to-br from-[#76efff] to-[#00ccff] px-10 py-4 rounded-[30px] text-white font-semibold hover:-translate-y-1 transition shadow-lg">
              <button>{slides[index].button}</button>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* DOTS CENTER */}
        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${ i === index ? "bg-cyan-400" : "bg-gray-500"
                
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
       {loginOpen && <LoginModel onClose={() => setLoginOpen(false)} />}
    </section>
  );
};

export default HeroSection;