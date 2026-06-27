import React from 'react';

const CodeIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const LayersIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const WrenchIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;

const SKILLS = [
  { icon: <CodeIcon />, title: 'Languages', tags: ['C/C++', 'HTML', 'CSS', 'JavaScript', 'C Sharp', 'Python', 'Java', 'SQL'] },
  { icon: <LayersIcon />, title: 'Frameworks / Technologies', tags: ['React.js', 'Angular', 'Node.js', 'Docker', 'Bootstrap', 'Git'] },
  { icon: <WrenchIcon />, title: 'Tools', tags: ['Shopify', 'Linux', 'Google Cloud', 'AWS', 'REST APIs', 'Android Studio', 'Flutter', 'Postman'] },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Skills</div>
          <h2 className="section-title">My <span className="grad-text">Skills</span></h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map(({ icon, title, tags }, i) => (
            <div key={title} className={`skill-card glass-card reveal delay-${i + 1}`}>
              <div className="skill-card-header">
                <div className="skill-card-icon">{icon}</div>
                <span className="skill-card-title">{title}</span>
              </div>
              <div className="skill-tags">
                {tags.map(tag => <span key={tag} className="skill-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
