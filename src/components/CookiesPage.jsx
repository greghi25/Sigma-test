import { useEffect } from 'react';

const cookieTypes = [
  {
    type: 'Essential',
    color: '#09305c',
    required: true,
    description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take such as setting your privacy preferences or filling in forms.',
    examples: ['Session management', 'Security tokens', 'Load balancing'],
  },
  {
    type: 'Analytics',
    color: '#3d5fa6',
    required: false,
    description: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information these cookies collect is aggregated and anonymous.',
    examples: ['Google Analytics (_ga, _gid)', 'Page view tracking', 'User journey analysis'],
  },
  {
    type: 'Functional',
    color: '#2d6a4f',
    required: false,
    description: 'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third-party providers whose services we have added to our pages.',
    examples: ['Language preferences', 'Embedded video players', 'Font loaders'],
  },
];

const sections = [
  {
    title: 'What Are Cookies?',
    content: `Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences and understand how you interact with it. Cookies do not contain personally identifiable information on their own.`,
  },
  {
    title: 'How We Use Cookies',
    content: `Sigma Investments uses cookies to ensure our website functions correctly, to analyse how visitors use our site, and to improve your experience. We do not use cookies for advertising or to track you across other websites.`,
  },
  {
    title: 'Managing Your Preferences',
    content: `You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, or be notified when a cookie is set. Please note that disabling certain cookies may affect the functionality of our website.\n\nFor more information on managing cookies, visit www.allaboutcookies.org.`,
  },
  {
    title: 'Third-Party Cookies',
    content: `Some pages on our site may include content from third-party services such as YouTube or LinkedIn. These services may set their own cookies. We have no control over these cookies and recommend reviewing the respective privacy policies of those services.`,
  },
  {
    title: 'Updates to This Policy',
    content: `We may update this Cookie Policy from time to time to reflect changes in technology or legislation. The date at the top of this page indicates when it was last revised. Continued use of our website constitutes acceptance of any changes.`,
  },
  {
    title: 'Contact',
    content: `If you have questions about our use of cookies, please contact us at info@sigma-investments.com.`,
  },
];

export default function CookiesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Hero */}
      <div className="section-group">
        <div className="section-group-inner" style={{ background: '#09305c', position: 'relative', overflow: 'hidden', paddingTop: '9rem', paddingBottom: '5rem' }}>
          <span style={{ position: 'absolute', right: '-0.05em', bottom: '-0.2em', fontSize: '60vw', fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>Σ</span>
          <div className="section-group-content" style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '1.5rem' }}>Legal</span>
            <h1 style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 1, margin: '0 0 1.5rem', fontFamily: "'Outfit', sans-serif" }}>
              Cookie<br /><span style={{ color: 'rgba(255,255,255,0.35)' }}>Policy.</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', lineHeight: 1.7, margin: 0 }}>
              Last updated: October 2025 · Sigma Investments, Maastricht University
            </p>
          </div>
        </div>
      </div>

      {/* Cookie types */}
      <div className="section-group">
        <div className="section-group-inner" style={{ background: '#f8fafc' }}>
          <div className="section-group-content" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 300, color: '#09305c', letterSpacing: '-0.03em', marginBottom: '2rem' }}>Types of Cookies We Use</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {cookieTypes.map((c, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 100} style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#ffffff', background: c.color, padding: '0.3rem 0.8rem' }}>{c.type}</span>
                    {c.required
                      ? <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Always Active</span>
                      : <span style={{ fontSize: '0.7rem', color: '#940a11', fontWeight: 600 }}>Optional</span>
                    }
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, margin: '0 0 1.25rem' }}>{c.description}</p>
                  <ul style={{ margin: 0, padding: '0 0 0 1rem' }}>
                    {c.examples.map((ex, j) => (
                      <li key={j} style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '0.3rem' }}>{ex}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              {sections.map((s, i) => (
                <div key={i} data-aos="fade-up" style={{ marginBottom: '3.5rem', paddingBottom: '3.5rem', borderBottom: i < sections.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#940a11', fontFamily: 'Georgia, serif', minWidth: '1.5rem' }}>{String(i + 1).padStart(2, '0')}</span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#09305c', margin: 0, letterSpacing: '-0.02em' }}>{s.title}</h2>
                  </div>
                  <div style={{ paddingLeft: '2.5rem' }}>
                    {s.content.split('\n').map((line, j) => (
                      line.trim() === '' ? null :
                      <p key={j} style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.8, margin: '0 0 0.75rem' }}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
