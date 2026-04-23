import { useEffect } from 'react';

const sections = [
  {
    title: 'Organisation',
    content: `Sigma Investments\nTongersestraat 43\n6211 LM Maastricht\nThe Netherlands`,
  },
  {
    title: 'Contact',
    content: `Email: info@sigma-investments.com\nPhone: +39 3923746278`,
  },
  {
    title: 'Registration',
    content: `KVK Number: 41078174`,
  },
  {
    title: 'Responsible',
    content: `Giovanni Fiorio`,
  },
];

export default function ImprintPage() {
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
              Imprint.
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', lineHeight: 1.7, margin: 0 }}>
              Legal disclosure · Sigma Investments, Maastricht University
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
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
