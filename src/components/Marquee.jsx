import React from 'react';

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
  </svg>
);

const TECH = [
  'Shopify', 'React.js', 'Node.js', 'Flutter', '.NET', 'Python',
  'JavaScript', 'MongoDB', 'Express', 'AWS', 'Google Cloud', 'Docker',
];

export default function Marquee() {
  const Track = ({ hidden }) => (
    <div className="marquee-track" aria-hidden={hidden || undefined}>
      {TECH.map(t => (
        <span key={t} className="marquee-item">
          <SparkIcon /> {t}
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee-section" role="presentation">
      <div className="marquee">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
