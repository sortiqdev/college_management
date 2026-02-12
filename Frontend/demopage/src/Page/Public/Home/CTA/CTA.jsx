import React, { useState } from "react";
import DemoModal from "./Demo";
import RegisterModal from "./Register";
import "./CTA.css";

const CTASection = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <section className="cta-section">
        <h2>Ready to Transform Your Operations?</h2>
        <p>
          Join hundreds of companies already using our platform to streamline
          their administration
        </p>

        <div className="cta-buttons">
          <button className="btn primary" onClick={() => setRegisterOpen(true)}>
            Get Started Today
          </button>
          <button className="btn outline" onClick={() => setDemoOpen(true)}>
            Schedule a Demo
          </button>
        </div>

        <div className="cta-note">
          ✓ 14-day free trial • No credit card required • Full feature access
        </div>
      </section>

      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
      {registerOpen && (
        <RegisterModal onClose={() => setRegisterOpen(false)} />
      )}
    </>
  );
};

export default CTASection;
