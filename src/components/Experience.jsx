import React from 'react';

const EXPERIENCES = [
  {
    company: 'Print Factory', role: 'Shopify Developer',
    location: 'Remote (Jaipur, India)', date: 'Nov 2023 – Present', logo: 'PRINT\nFACTORY',
    bullets: [
      'Designed, developed, and maintained Shopify apps using the Shopify App Platform and API.',
      'Integrated third-party services and APIs into Shopify store.',
      'Developed custom themes and templates to create unique and visually appealing online store.',
      'Optimized app performance and ensure compatibility with different browsers and devices as well as troubleshooting.',
      'Integrated shopify store into shopify merchant app taking further to playstore using flutter.',
    ],
  },
  {
    company: 'DFCCIL', role: '.Net Developer',
    location: 'On-Site (Delhi, India)', date: 'Sept 2023 – Nov 2023', logo: 'DFCCIL',
    bullets: [
      'Developed a secure login system using ASP.NET Identity, ensuring restricted access to employee data.',
      'Implemented role-based access control, enhancing security by providing different levels of access to HR administrators and employees.',
      'Designed an intuitive interface that streamlined employee registration and data management.',
      'Created a comprehensive dashboard that enabled HR administrators to efficiently manage employee records, reducing administrative time by 20%.',
      'Ensured data accuracy through robust validation mechanisms, minimizing input errors by 15%.',
    ],
  },
  {
    company: 'Compucom Software Limited', role: 'Full Stack Developer',
    location: 'On-Site (Jaipur, India)', date: 'Jun 2022 – Aug 2022', logo: 'COMPUCOM\nSOFTWARE\nLIMITED',
    bullets: [
      "Led the development of a preference-based web application that recommended restaurants using Yelp's API, increasing user engagement by 25%.",
      'Engineered backend logic using Node.js and Express to process user preferences, delivering tailored restaurant recommendations.',
      'Designed a user-centric interface with HTML, CSS, and JavaScript, improving the user experience and satisfaction.',
      'Collaborated with a team to implement features that aligned with user needs, demonstrating strong problem-solving and teamwork skills.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-inner">
        <div className="exp-header-grid">
          <div className="reveal">
            <div className="section-tag">Experience</div>
            <h2 className="section-title">Work<br /><span className="grad-text">History</span></h2>
          </div>
          <div>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="exp-item">
                <div className="exp-dot-col">
                  <div className="exp-dot" />
                  {i < EXPERIENCES.length - 1 && <div className="exp-vline" />}
                </div>
                <div className={`exp-card glass-card reveal delay-${i + 1}`}>
                  <div className="exp-card-header">
                    <div className="exp-logo-badge" style={{ whiteSpace: 'pre-line' }}>{exp.logo}</div>
                    <span className="date-badge">{exp.date}</span>
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <span className="exp-company-name">{exp.company}</span>
                    <span className="exp-role">, {exp.role}</span>
                  </div>
                  <div className="exp-location">{exp.location}</div>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
