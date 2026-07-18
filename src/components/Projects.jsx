import React, { useRef } from 'react';

const HeartIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const FoodIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const ShieldIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const BookIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;

const PROJECTS = [
  {
    icon: <HeartIcon />, title: 'Mental Health Care App', subtitle: 'mood tracking · mindfulness · Flutter',
    bullets: [
      'Cross-platform mental health app built with Flutter — mood tracking, mindfulness exercises, and curated resources.',
      'Advanced to the regional level of the Google + AMD Hackathon on the strength of its user-centered design.',
      'Deployed on Android with a seamless, responsive experience across devices.',
    ],
    tags: [{ label: 'Flutter', bg: 'rgba(109,112,246,0.14)', color: '#b3bcff', border: 'rgba(109,112,246,0.3)' }],
  },
  {
    icon: <FoodIcon />, title: 'AROMA', subtitle: 'preference-based food delivery',
    bullets: [
      'Preference-based food delivery web app using Node.js, Express, JavaScript, HTML, and CSS.',
      "Integrated Yelp's API to recommend restaurants, lifting satisfaction and engagement.",
      'Designed an intuitive, responsive front end that adapts to user inputs.',
    ],
    tags: [
      { label: 'Node.js',  bg: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: 'rgba(52,211,153,0.3)' },
      { label: 'Express',  bg: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: 'rgba(52,211,153,0.3)' },
      { label: 'Yelp API', bg: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: 'rgba(52,211,153,0.3)' },
    ],
  },
  {
    icon: <ShieldIcon />, title: 'Port Scanner Tool', subtitle: 'cyber security · networking',
    bullets: [
      'Python port scanner that identifies open ports on a target IP address or hostname.',
      "Built on Python's socket module for efficient handling of IPs and network connections.",
      'Sped up cybersecurity audits with quick, accurate scans.',
    ],
    tags: [{ label: 'Python', bg: 'rgba(251,191,36,0.12)', color: '#fde68a', border: 'rgba(251,191,36,0.3)' }],
  },
  {
    icon: <BookIcon />, title: 'Book Store Web App', subtitle: 'MERN stack · full CRUD',
    bullets: [
      'Comprehensive bookstore management app on the MERN stack (MongoDB, Express, React, Node).',
      'Secure authentication and authorization gating access to critical features.',
      'Responsive front end with seamless navigation via React Router.',
    ],
    tags: [
      { label: 'MERN Stack',   bg: 'rgba(167,139,250,0.12)', color: '#c4b5fd', border: 'rgba(167,139,250,0.3)' },
      { label: 'React Router', bg: 'rgba(167,139,250,0.12)', color: '#c4b5fd', border: 'rgba(167,139,250,0.3)' },
    ],
  },
];

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-8px)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <div ref={ref} className={className}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.3s, border-color 0.3s' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="ghost" data-ghost="1" aria-hidden>WORK</div>
      <div className="section-inner">
        <div className="section-head reveal" style={{ textAlign: 'center' }}>
          <div className="section-kicker" style={{ justifyContent: 'center' }} data-scramble>05 — projects</div>
          <h2 className="section-title"><span className="tmask"><span className="tmask-inner">Featured <span className="grad-text">work</span></span></span></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <TiltCard key={p.title} className={`project-card glass-card reveal delay-${i % 2 + 1}`}>
              <div className="project-top">
                <div className="project-icon pop">{p.icon}</div>
                <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="project-body">
                <div className="project-title">{p.title}</div>
                <div className="project-subtitle">{p.subtitle}</div>
                <ul className="project-bullets">
                  {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t.label} className="project-tag"
                      style={{ background: t.bg, color: t.color, borderColor: t.border }}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
