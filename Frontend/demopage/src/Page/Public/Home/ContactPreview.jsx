import React from "react";
import { useNavigate } from "react-router-dom";

export default function ContactPreview() {
  const navigate = useNavigate();

  return (
    <section style={{
      padding: "80px 5%",
          background: "rgb(78, 76, 130)",
      color: "white",
      textAlign: "center"
    }}>
      <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Have Questions?
      </h2>

      <p style={{ maxWidth: "600px", margin: "0 auto 30px" }}>
        We are here to help you build the best management system.
        Contact us for demo or partnership.
      </p>

      <button
        onClick={() => navigate("/contact")}
        style={{
          padding: "12px 30px",
          background: "white",
          color: "black",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Contact Us
      </button>
    </section>
  );
}
