import React from 'react';

const EmailIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const PhoneIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z"/></svg>;
const LocationIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const LinkedInIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const GithubIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const SendIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="reveal">
          <div className="contact-tag">Let's Connect</div>
          <div className="contact-title">Get In Touch</div>
          <p className="contact-sub">I'm always open to discussing new opportunities, exciting projects or collaborations.</p>
        </div>
        <div className="contact-row">
          <div className="contact-items reveal delay-1">
            {[
              { icon: <EmailIcon />, text: 'aryamansharma.it24@gmail.com' },
              { icon: <PhoneIcon />, text: '+91 7891039292' },
              { icon: <LocationIcon />, text: 'Jaipur, India' },
            ].map(({ icon, text }) => (
              <div key={text} className="contact-item">
                <div className="contact-item-icon">{icon}</div>
                <span className="contact-item-text">{text}</span>
              </div>
            ))}
          </div>
          <div className="contact-right reveal delay-2">
            <div className="send-glow"><SendIcon /></div>
          </div>
        </div>
        <div className="contact-footer">
          <div className="footer-socials">
            {[
              { href: 'https://linkedin.com/in/aryaman-sharma-807562107/', icon: <LinkedInIcon /> },
              { href: 'https://github.com/', icon: <GithubIcon /> },
              { href: 'mailto:aryamansharma.it24@gmail.com', icon: <EmailIcon /> },
            ].map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="footer-social">{icon}</a>
            ))}
          </div>
          <div className="footer-copy">© 2024 Aryaman Sharma. All Rights Reserved.</div>
        </div>
      </div>
    </section>
  );
}
