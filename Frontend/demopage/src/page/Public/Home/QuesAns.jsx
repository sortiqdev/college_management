import React, { useState } from 'react';
import './QuesAns.css';

export default function QuesAns() {
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'Administrative Management',
      question: 'What is AdminPro and how does it help manage administrative tasks?',
      answer: 'AdminPro is a comprehensive administrative management system designed to streamline and automate all organizational operations. It handles employee management, department coordination, task tracking, document management, and reporting. Our platform eliminates manual administrative work, reduces errors by 95%, and helps teams focus on strategic initiatives. With intuitive dashboards and real-time insights, organizations can manage complex operations with ease.'
    },
    {
      id: 2,
      category: 'How It Works',
      question: 'How do I get started with AdminPro? What is the implementation process?',
      answer: 'Getting started with AdminPro is simple: 1) Sign up for a free account on our platform, 2) Complete your profile and organization setup (5-10 minutes), 3) Invite team members via email, 4) Configure departments and roles, 5) Migrate your existing data (our team assists if needed), 6) Access training materials and live onboarding sessions. Most organizations are fully operational within 48 hours. We offer dedicated support throughout the implementation process.'
    },
    {
      id: 3,
      category: 'Product Features',
      question: 'What key features does AdminPro offer?',
      answer: 'AdminPro includes 50+ features: Employee Management (profiles, skills, certifications), Department Organization (structure, hierarchy, collaboration), Task Management (assignments, deadlines, tracking), Document Management (storage, sharing, versioning), Leave & Attendance (automated tracking, reports), Payroll Integration (salary management, deductions), Analytics & Reporting (real-time dashboards, custom reports), Communication Hub (internal messaging, announcements), Project Tracking, Expense Management, and much more. All features are accessible from desktop and mobile apps.'
    },
    {
      id: 4,
      category: 'Product Benefits',
      question: 'What are the main benefits of using AdminPro?',
      answer: 'AdminPro delivers significant business value: Increase productivity by 40-50%, reduce administrative costs by 35%, improve decision-making with real-time data, enhance employee satisfaction through self-service portals, ensure regulatory compliance, reduce data entry errors by 95%, and save 10+ hours per employee weekly. Our clients see average ROI of 300% within the first year. The system integrates seamlessly with existing tools like Slack, GitHub, Salesforce, and HubSpot.'
    },
    {
      id: 5,
      category: 'Pricing',
      question: 'What is AdminPro pricing model and which plan should I choose?',
      answer: 'AdminPro offers flexible pricing: Starter Plan ($29/month for up to 10 users) - perfect for small teams with basic features, Professional Plan ($79/month for up to 50 users) - includes advanced analytics and integrations, Enterprise Plan (Custom pricing) - unlimited users with dedicated support and custom features. All plans include mobile access, 24/7 support, and 30-day free trial. Discounts available for annual subscriptions (20% off) and non-profits (50% off). No setup fees, cancel anytime.'
    },
    {
      id: 6,
      category: 'Pricing',
      question: 'Is there a free trial? What payment methods do you accept?',
      answer: 'Yes! We offer a 30-day free trial with full access to all features - no credit card required. After the trial, you can upgrade anytime. We accept all major payment methods: credit cards (Visa, MasterCard, American Express), bank transfers, PayPal, and Stripe. For Enterprise customers, we offer flexible payment terms and invoicing options. All payments are processed securely through encrypted channels with PCI DSS compliance.'
    },
    {
      id: 7,
      category: 'Security Management',
      question: 'How does AdminPro ensure data security and compliance?',
      answer: 'Security is our top priority. AdminPro implements: 256-bit AES encryption for all data at rest and in transit, Multi-Factor Authentication (MFA) for account protection, Role-Based Access Control (RBAC) to restrict unauthorized access, Regular security audits by third-party firms, SOC 2 Type II certification, GDPR compliance, CCPA compliance, HIPAA readiness, and automated backup systems with 99.99% uptime SLA. All data is stored in secure, geographically distributed data centers with redundancy. We conduct penetration testing quarterly.'
    },
    {
      id: 8,
      category: 'Security Management',
      question: 'What data privacy practices does AdminPro follow?',
      answer: 'Your data privacy is protected by: Your data belongs entirely to you - we never sell or share it with third parties, Transparent privacy policies explaining how data is used, User consent requirements before any data processing, Right to access, modify, or delete your data anytime, Data residency options (US, EU, APAC), Secure deletion protocols when accounts are closed, Limited access to your data by AdminPro staff only for support purposes with your approval. We maintain detailed audit logs of all data access and modifications for complete transparency and compliance.'
    },
    {
      id: 9,
      category: 'Administrative Management',
      question: 'Can AdminPro scale as my organization grows?',
      answer: 'Absolutely! AdminPro is built for scalability. The system supports organizations from 5 to 100000 plus employees without performance degradation. You can add unlimited users, departments, and projects anytime. Our cloud infrastructure automatically scales based on demand. Enterprise clients have custom configurations for specific needs. Migration between plans is seamless with no downtime. Our team assists with scaling strategies, and APIs allow custom integrations as your needs evolve.'
    },
    {
      id: 10,
      category: 'Product Features',
      question: 'What support and training does AdminPro provide?',
      answer: 'AdminPro provides comprehensive support with 24/7 customer support via chat, email, and phone. We offer live onboarding sessions with your team, video tutorials and documentation, weekly webinars on features and best practices, dedicated account manager for Enterprise clients, community forum for peer support, custom training programs for large organizations, API documentation for developers, and 99.9% platform uptime SLA. All support is included in your subscription with no additional fees.'
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="quesans-container">
      {/* Header Section */}
      <section className="quesans-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about AdminPro and how it can transform your organization</p>
      </section>

      {/* Main Content */}
      <div className="container">
        <section className="quesans-content">
          <div className="faq-accordion">
            {faqs.map(faq => (
              <div key={faq.id} className="accordion-item">
                <button
                  className={`accordion-button ${expandedId === faq.id ? 'active' : ''}`}
                  onClick={() => toggleExpand(faq.id)}
                >
                  <span className="question-number">Q{faq.id}</span>
                  <span className="question-text">{faq.question}</span>
                  <span className="toggle-icon">
                    {expandedId === faq.id ? '−' : '+'}
                  </span>
                </button>
                
                {expandedId === faq.id && (
                  <div className="accordion-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Side Benefits Section */}
        <section className="quick-benefits">
          <h3>Quick Facts About AdminPro</h3>
          <div className="benefits-list">
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <p><strong>99.9%</strong> Uptime Guarantee</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <p><strong>256-bit</strong> AES Encryption</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <p><strong>50+</strong> Powerful Features</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <p><strong>5000+</strong> Active Organizations</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <p><strong>24/7</strong> Expert Support</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <p><strong>30-day</strong> Free Trial</p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="quesans-cta">
        <h2>Still have questions?</h2>
        <p>Can't find the answer you're looking for? Our dedicated support team is here to help.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Contact Sales Team</button>
          <button className="btn-secondary">Schedule Demo</button>
        </div>
        <p className="support-email">Email us at support@adminpro.com or chat with us in the corner</p>
      </section>
    </div>
  );
}
