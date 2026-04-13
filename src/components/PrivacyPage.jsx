import { useEffect } from 'react';

const sections = [
  {
    title: 'Who We Are',
    content: `Sigma Investments is a student-managed investment fund affiliated with Maastricht University's School of Business and Economics. Our website address is sigma-investments.com. We are committed to protecting your personal data and respecting your privacy.`,
  },
  {
    title: 'What Data We Collect',
    content: `We may collect the following personal data when you interact with our website or contact us:\n\n• Name and email address (via contact forms)\n• Usage data such as pages visited, time spent, and browser type\n• Device and IP address information collected automatically\n\nWe do not collect sensitive personal data such as financial information, health data, or government identifiers.`,
  },
  {
    title: 'How We Use Your Data',
    content: `Your data is used solely for the following purposes:\n\n• Responding to enquiries submitted through our contact form\n• Improving the performance and content of our website\n• Sending relevant updates if you have opted in\n\nWe do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: 'Legal Basis for Processing',
    content: `We process your personal data on the following legal bases under the GDPR:\n\n• Consent — when you submit a contact form or subscribe to updates\n• Legitimate interests — for website analytics and security\n• Legal obligation — where required by applicable law`,
  },
  {
    title: 'Data Retention',
    content: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected. Contact form submissions are retained for a maximum of 12 months. Analytics data is retained in anonymised form.`,
  },
  {
    title: 'Your Rights',
    content: `Under the GDPR, you have the following rights:\n\n• Right to access your personal data\n• Right to rectification of inaccurate data\n• Right to erasure ("right to be forgotten")\n• Right to restrict processing\n• Right to data portability\n• Right to object to processing\n\nTo exercise any of these rights, please contact us at info@sigma-investments.com.`,
  },
  {
    title: 'Third-Party Services',
    content: `Our website may use third-party services including Google Analytics and embedded content from external platforms. These services may collect data in accordance with their own privacy policies. We encourage you to review those policies independently.`,
  },
  {
    title: 'Contact',
    content: `For any privacy-related questions or requests, please contact:\n\nSigma Investments\nMaastricht University, SBE\ninfo@sigma-investments.com`,
  },
];

export default function PrivacyPage() {
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
              Privacy &amp;<br /><span style={{ color: 'rgba(255,255,255,0.35)' }}>Data Protection.</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', lineHeight: 1.7, margin: 0 }}>
              Last updated: October 2025 · Sigma Investments, Maastricht University
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
