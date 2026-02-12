import React from "react";
import "./WhoItsFor.css";

const audiences = [
  {
    icon: "🏢",
    title: "Enterprise Organizations",
    description:
      "Scale your operations with a robust system designed for large teams and complex workflows",
  },
  {
    icon: "🚀",
    title: "Growing Startups",
    description:
      "Establish efficient processes from day one with flexible and affordable solutions",
  },
  {
    icon: "🏭",
    title: "Mid-Size Companies",
    description:
      "Optimize your operations with features tailored for teams of 50–500+ employees",
  },
  {
    icon: "🌍",
    title: "Remote Teams",
    description:
      "Collaborate seamlessly across time zones with cloud-based administration tools",
  },
];

const WhoItsFor = () => {
  return (
    <section className="who-section">
      <h2 className="who-title">Who It's For</h2>

      <div className="who-grid">
        {audiences.map((item, index) => (
          <div className="who-card" key={index}>
            <div className="who-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhoItsFor;
