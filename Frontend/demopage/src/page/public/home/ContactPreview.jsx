import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContactPreview() {
  const navigate = useNavigate();

  return (
    <section style={{
      padding: "80px 5%",
         background: "linear-gradient(120deg, #e5f0ff 0%, #f2e5ff 100%)",
      color: "white",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "32px", marginBottom: "20px", color :"blue" }}>
        Have Questions?
      </h2>

      <p style={{ maxWidth: "600px", margin: "0 auto 30px", color: "#333" }}>
        We are here to help you build the best management system.
        Contact us for demo or partnership.
      </p>

      <button
        onClick={() => navigate("/contact")}
        style={{
          cursor: "pointer"
        }} className="bg-gradient-to-br from-[#76efff] to-[#00ccff] px-4 py-4 rounded-full text-s font-medium w-36 m-4"
      >
        Contact Us
      </button>
    </section>
  );
}
