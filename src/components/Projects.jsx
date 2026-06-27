import React, { useRef } from 'react';

const HeartIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const FoodIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>;
const ShieldIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const BookIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;

const PROJECTS = [
  {
    icon: <HeartIcon />, title: 'Mental Health Care App – Mental Health Tracker',
    bullets: [
      'Cross-platform mental health care app using Flutter with mood tracking, mindfulness exercises, and mental health resources.',
      'Advanced to the regional level in the Google AMD Hackathon showcasing strong problem-solving and user-centered design skills.',
      'Deployed on Android, ensuring a seamless and responsive user experience across devices.',
    ],
    tags: [{ label: 'Flutter', bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' }],
  },
  {
    icon: <FoodIcon />, title: 'AROMA – Food Delivery Application',
    bullets: [
      "Preference-based food delivery web app using Node.js, Express, JavaScript, HTML, and CSS.",
      "Integrated Yelp's API to recommend restaurants, enhancing user satisfaction and engagement.",
      "Designed intuitive and responsive front-end adapting to various user inputs.",
    ],
    tags: [
      { label: 'Node.js',  bg: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: 'rgba(52,211,153,0.3)' },
      { label: 'Express',  bg: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: 'rgba(52,211,153,0.3)' },
      { label: 'Yelp API', bg: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: 'rgba(52,211,153,0.3)' },
    ],
  },
  {
    icon: <ShieldIcon />, title: 'PORT SCANNER TOOL – Cyber Security Tool',
    bullets: [
      'Port scanner using Python enabling users to identify open ports on a target IP address or hostname.',
      "Utilized Python's socket module and Py library for efficient handling of IP addresses and network connections.",
      'Increased efficiency of cybersecurity audits by providing quick and accurate scans.',
    ],
    tags: [{ label: 'Python', bg: 'rgba(251,191,36,0.12)', color: '#fde68a', border: 'rgba(251,191,36,0.3)' }],
  },
  {
    icon: <BookIcon />, title: 'BOOK STORE WEB APPLICATION – Bookstore Management',
    bullets: [
      'Comprehensive bookstore management app using the MERN stack (MongoDB, Express.js, React.js, Node.js).',
      'Implemented secure user authentication and authorization, ensuring restricted access to critical features.',
      'Developed responsive front-end with seamless navigation using React Router.',
    ],
    tags: [
      { label: 'MERN Stack',   bg: 'rgba(167,139,250,0.12)', color: '#c4b5fd', border: 'rgba(167,139,250,0.3)' },
      { label: 'React Router', bg: 'rgba(167,139,250,0.12)', color: '#c4b5fd', border: 'rgba(167,139,250,0.3)' },
    ],
  },
];

function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r  = ref.current.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - 0.5;
    const y  = (e.clientY - r.top)  / r.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
  };
  const onLeave = () => { ref.current.style.transform = ''; };
  return (
    <div ref={ref} className={className} style={{ ...style, transition: 'transform 0.15s ease, box-shadow 0.3s, border-color 0.3s' }}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Projects</div>
          <h2 className="section-title">Featured <span className="grad-text">Work</span></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <TiltCard key={i} className={`project-card glass-card reveal delay-${i % 2 + 1}`}>
              <div className="project-icon">{p.icon}</div>
              <div className="project-title">{p.title}</div>
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
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
