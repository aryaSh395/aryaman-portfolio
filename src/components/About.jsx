import React from 'react';

const icons = {
  Location: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Email:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
  Degree:   () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  Phone:    () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/></svg>,
  CGPA:     () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  LinkedIn: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
};

const INFO = [
  { label: 'Location', value: 'Jaipur, India' },
  { label: 'Email',    value: 'aryamansharma.it24@gmail.com' },
  { label: 'Degree',   value: 'B.Tech Information Technology' },
  { label: 'Phone',    value: '+91 7891039292' },
  { label: 'CGPA',     value: '9.0 / 10.0' },
  { label: 'LinkedIn', value: 'linkedin.com/in/aryaman-sharma-807562107/' },
];

export default function About() {
  return (
    <section id="about">
      <div className="section-inner about-grid">
        <div className="reveal-left">
          <div className="section-tag">About Me</div>
          <h2 className="section-title">About <span className="grad-text">Me</span></h2>
          <p className="about-text" style={{ marginTop: 24 }}>
            A passionate Shopify Developer with experience in Shopify development,
            .Net development, Full Stack development and cross-platform applications.
          </p>
        </div>
        <div className="info-grid reveal delay-1">
          {INFO.map(({ label, value }, i) => {
            const Icon = icons[label];
            return (
              <div key={label} className={`info-item glass-card reveal delay-${i % 3 + 1}`}>
                <div className="info-icon"><Icon /></div>
                <div>
                  <div className="info-label">{label}</div>
                  <div className="info-value">{value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
