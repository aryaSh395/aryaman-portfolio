import React from 'react';

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const EXPERIENCES = [
  {
    company: 'Print Factory', role: 'Shopify Developer',
    location: 'Remote · Jaipur, India', date: 'Nov 2023 — Present', current: true,
    bullets: [
      'Designed, developed, and maintained Shopify apps using the Shopify App Platform and API.',
      'Integrated third-party services and APIs into the Shopify store.',
      'Built custom themes and templates for a unique, visually appealing storefront.',
      'Optimized app performance and cross-browser/device compatibility, plus troubleshooting.',
      'Took the Shopify store to the Play Store as a Flutter merchant app.',
    ],
  },
  {
    company: 'DFCCIL', role: '.NET Developer',
    location: 'On-site · Delhi, India', date: 'Sept 2023 — Nov 2023',
    bullets: [
      'Developed a secure login system using ASP.NET Identity with restricted access to employee data.',
      'Implemented role-based access control for HR administrators and employees.',
      'Designed an intuitive interface that streamlined employee registration and data management.',
      'Built an HR dashboard that cut administrative time by 20%.',
      'Ensured data accuracy through robust validation, reducing input errors by 15%.',
    ],
  },
  {
    company: 'Compucom Software Limited', role: 'Full Stack Developer',
    location: 'On-site · Jaipur, India', date: 'Jun 2022 — Aug 2022',
    bullets: [
      "Led development of a preference-based web app recommending restaurants via Yelp's API, boosting engagement by 25%.",
      'Engineered backend logic with Node.js and Express to process user preferences.',
      'Designed a user-centric interface with HTML, CSS, and JavaScript.',
      'Collaborated with a team to ship features aligned with user needs.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-inner" style={{ maxWidth: 860 }}>
        <div className="section-head reveal">
          <div className="section-kicker">03 — experience</div>
          <h2 className="section-title"><span className="tmask"><span className="tmask-inner">Where I've <span className="grad-text">worked</span></span></span></h2>
        </div>

        <div className="exp-list">
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.company} className="exp-item">
              <div className="exp-dot" />
              <div className={`exp-card glass-card reveal delay-${i + 1}`}>
                <div className="exp-card-header">
                  <div>
                    <span className="exp-role">{exp.role}</span>
                    {exp.current && <span className="exp-current-badge">Current</span>}
                    <div className="exp-company-name">{exp.company}</div>
                  </div>
                  <span className="date-badge">{exp.date}</span>
                </div>
                <div className="exp-location"><PinIcon /> {exp.location}</div>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
