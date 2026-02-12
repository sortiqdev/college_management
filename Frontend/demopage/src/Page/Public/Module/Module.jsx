import React, { useEffect } from 'react';
import './Module.css';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sections = [
  {
    id: 'academic',
    title: 'Academics & Students',
    desc: 'Manage students, courses, timetables and assessments.',
    items: [
      { title: 'Student Profiles', desc: 'Admissions, records & profiles', icon: '🎓' },
      { title: 'Courses', desc: 'Create & manage curricula', icon: '📚' },
      { title: 'Timetable', desc: 'Schedule classes and rooms', icon: '🗓️' },
    ],
  },
  {
    id: 'administration',
    title: 'Administration & HR',
    desc: 'Staff management, payroll and permissions.',
    items: [
      { title: 'Staff Directory', desc: 'Contacts & roles', icon: '👩‍💼' },
      { title: 'Attendance', desc: 'Track presence & leaves', icon: '✅' },
      { title: 'Payroll', desc: 'Salaries & reimbursements', icon: '💰' },
    ],
  },
  {
    id: 'operations',
    title: 'Operations & Facilities',
    desc: 'Library, transport, inventory and visitors.',
    items: [
      { title: 'Library', desc: 'Catalog & borrowing', icon: '📖' },
      { title: 'Transport', desc: 'Routes & vehicles', icon: '🚌' },
      { title: 'Inventory', desc: 'Assets & stock', icon: '📦' },
    ],
  },
  {
    id: 'insights',
    title: 'Analytics & Reports',
    desc: 'Attendance, performance and finance insights.',
    items: [
      { title: 'Reports', desc: 'Custom reports & exports', icon: '📊' },
      { title: 'Dashboards', desc: 'KPIs & trends', icon: '📈' },
      { title: 'Notifications', desc: 'Alerts & messaging', icon: '🔔' },
    ],
  },
];

export default function Module() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.module-section').forEach((section) => {
      gsap.from(section.querySelectorAll('.feature-card'), {
        y: 40,
        opacity: 1,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });

      gsap.from(section.querySelector('.section-heading'), {
        x: -50,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
        },
      });
    });

    // Try to load animejs dynamically (optional). If it's not installed, the page still works.
    (async () => {
      try {
        const animeModule = await import('animejs');
        const anime = animeModule.default || animeModule;
        anime({
          targets: '.pulse',
          scale: [1, 1.06],
          direction: 'alternate',
          easing: 'easeInOutSine',
          duration: 1200,
          loop: true,
        });
      } catch (err) {
        // animejs not installed — not critical
        // eslint-disable-next-line no-console
        console.warn('animejs not installed. Run `npm i animejs` to enable subtle pulse animations.');
      }
    })();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="module-page">
      <header className="module-hero">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Campus & Office Modules
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          A set of modular features for schools, colleges and offices — from admissions to payroll and analytics.
        </motion.p>
        <div className="scroll-hint">Scroll to explore ↓</div>
      </header>

      <main className="module-content">
        {sections.map((sec) => (
          <motion.section
            key={sec.id}
            className={`module-section ${sec.id}`}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="section-heading">
              <h2>{sec.title}</h2>
              <p>{sec.desc}</p>
            </div>

            <div className="feature-grid">
              {sec.items.map((it) => (
                <motion.article
                  key={it.title}
                  className="feature-card pulse"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="feature-icon" aria-hidden>
                    {it.icon}
                  </div>
                  <div className="feature-body">
                    <h3>{it.title}</h3>
                    <p>{it.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        ))}
      </main>

      <footer className="module-footer">
        <p>Built for institutions & offices — modular, extendable and accessible.</p>
      </footer>
    </div>
  );
}
