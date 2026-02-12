import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Feature.css";

const features = [
  {
    title: "Real Time Analytics",
    description:
      "Task performance metrics and KPI in real time with comprehensive dashboards and reports",
    icon: "https://img.icons8.com/ios-filled/100/combo-chart--v1.png",
  },
  {
    title: "User Friendly Interface",
    description:
      "Intuitive and user-friendly interface designed for easy navigation and seamless experience",
    icon: "https://img.icons8.com/ios-filled/100/user.png",
  },
  {
    title: "Schedule Management",
    description:
      "Efficiently manage and schedule tasks with built-in calendar tools",
    icon: "https://img.icons8.com/ios-filled/100/calendar.png",
  },
  {
    title: "Performance Tracking",
    description:
      "Track and monitor task performance with detailed analytics",
    icon: "https://img.icons8.com/ios-filled/100/combo-chart.png",
  },
  {
    title: "Security & Compliance",
    description:
      "Robust security and compliance with industry standards",
    icon: "https://img.icons8.com/ios-filled/100/lock--v1.png",
  },
  {
    title: "Customization & Integration",
    description:
      "Easily integrate with your existing tools and workflows",
    icon: "https://img.icons8.com/ios-filled/100/settings.png",
  },
  {
    title: "Collaboration & Communication",
    description:
      "Built-in messaging and collaboration features for teams",
    icon: "https://img.icons8.com/ios-filled/100/collaborator.png",
  },
  {
    title: "Mobile Accessibility",
    description:
      "Access tasks anywhere with a fully mobile-responsive design",
    icon: "https://img.icons8.com/ios-filled/100/smartphone.png",
  },
];

const HomeFeature = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 5,
        repeat: -1,
        ease: "linear",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="feature-section">
      <div className="feature-header">
        <h2>Powerful Features</h2>
        <p>Everything you need to run your institution smarter</p>
      </div>

      <div className="slider">
        <div className="slider-track" ref={trackRef}>
          {[...features, ...features].map((item, index) => (
            <div className="feature-card" key={index}>
              <div className="icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeature;
