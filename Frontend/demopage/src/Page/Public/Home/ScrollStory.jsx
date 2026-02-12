import { motion } from "framer-motion";
import "./StorySection.css";

const stories = [
  {
    title: "Powerful Administrative Features",
    text: [
      "Role-based access & permissions",
      "Attendance & biometric integration",
      "Academic, HR & finance modules",
      "Complete operational control",
    ],
    image: "https://img.icons8.com/color/256/admin-settings-male.png",
  },
  {
    title: "Built for Schools & Colleges",
    text: [
      "Student lifecycle management",
      "Exams, attendance & fees",
      "Parent & staff portals",
      "Academic compliance",
    ],
    image: "https://img.icons8.com/color/256/school.png",
  },
  {
    title: "Government Institutions",
    text: [
      "Secure workflows",
      "Audit-ready reporting",
      "Document management",
      "Centralized control",
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UUxB5JFyVGf4BVa3MKEIEO184Gk2_HuJIw&s",
  },
];

export default function StorySection() {
  return (
    <section className="story-dark">
      <h2 className="story-heading">
        Why <span>Choose Us</span>
      </h2>
      <p className="story-subheading">
        Designed to simplify, scale, and secure your institution
      </p>

      {stories.map((item, index) => {
        const isLeft = index % 2 === 0;

        return (
          <motion.div
            key={index}
            className={`story-card ${isLeft ? "left" : "right"}`}
            initial={{ opacity: 0, x: isLeft ? -120 : 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLeft ? -120 : 120 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            viewport={{ amount: 0.6 }} // 🔥 reversible
          >
            <div className="story-content">
              <h3>{item.title}</h3>
              <ul>
                {item.text.map((point, i) => (
                  <li key={i}>✓ {point}</li>
                ))}
              </ul>
            </div>

            <div className="story-image">
              <img src={item.image} alt={item.title} />
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
