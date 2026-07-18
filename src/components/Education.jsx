import React from 'react';

const GradIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const TrophyIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>;
const UsersIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const StarIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

export default function Education() {
  return (
    <section id="education">
      <div className="ghost" data-ghost="-1" aria-hidden>EDUCATION</div>
      <div className="section-inner" style={{ maxWidth: 860 }}>
        <div className="section-head reveal">
          <div className="section-kicker" data-scramble>02 — education</div>
          <h2 className="section-title"><span className="tmask"><span className="tmask-inner">Where I <span className="grad-text">studied</span></span></span></h2>
        </div>

        <div className="edu-card glass-card reveal delay-1">
          <div className="edu-top">
            <div className="edu-icon-circle pop"><GradIcon /></div>
            <div className="edu-head-text">
              <div className="edu-school">Jaipur Engineering College &amp; Research Centre</div>
              <div className="edu-degree">B.Tech in Information Technology · Rajasthan, India</div>
            </div>
            <span className="date-badge">2020 — 2024</span>
          </div>

          <div className="edu-gpa-bar">
            <span className="edu-gpa-label">CGPA</span>
            <div className="edu-gpa-track"><div className="edu-gpa-fill" /></div>
            <span className="edu-gpa-num">9.0 / 10</span>
          </div>

          <div className="edu-achievements">
            <div className="achievement-item"><TrophyIcon /><span><strong style={{ color: 'var(--text)' }}>1st place</strong> — Solving for India Hackathon by AMD, GeeksforGeeks &amp; Google Cloud (Institute Level Winner)</span></div>
            <div className="achievement-item"><UsersIcon /><span>Tech volunteer — JECRC Cloud Summit 2022</span></div>
            <div className="achievement-item"><StarIcon /><span>College SDE Society enthusiast, 2021 – 2024</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
