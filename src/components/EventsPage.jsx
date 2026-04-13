import { useEffect, useState } from 'react';
import MiniContact from './MiniContact';

const upcomingEvents = [
  {
    id: 1,
    date: { day: '14', month: 'OCT', year: '2025' },
    title: 'Weekly Investment Meeting',
    type: 'Weekly Meeting',
    description: 'Join us for our weekly market update, portfolio review, and stock pitches from our industry analyst teams.',
    location: 'Maastricht University, SBE Building',
    time: '19:00 – 21:00',
    tag: 'Members Only',
    color: '#09305c',
  },
  {
    id: 2,
    date: { day: '22', month: 'OCT', year: '2025' },
    title: 'Guest Lecture: Private Equity',
    type: 'Corporate Event',
    description: 'An exclusive talk by a senior partner from a leading European PE firm on deal sourcing, valuation, and portfolio management.',
    location: 'Maastricht University, Room 1.014',
    time: '18:00 – 20:00',
    tag: 'Open to All',
    color: '#940a11',
  },
  {
    id: 3,
    date: { day: '05', month: 'NOV', year: '2025' },
    title: 'Autumn Networking Dinner',
    type: 'Social',
    description: 'An evening of networking with fellow members, alumni, and corporate partners in an informal setting.',
    location: 'Restaurant Toine Hermsen, Maastricht',
    time: '19:30 – 23:00',
    tag: 'Members Only',
    color: '#09305c',
  },
  {
    id: 4,
    date: { day: '18', month: 'NOV', year: '2025' },
    title: 'think-cell Workshop',
    type: 'Workshop',
    description: 'Hands-on training with think-cell — the industry-standard PowerPoint tool used by top investment banks and consultancies.',
    location: 'Online (Zoom)',
    time: '17:00 – 19:00',
    tag: 'Members Only',
    color: '#1a3a5c',
  },
];

const pastEvents = [
  { title: 'Spring Recruitment Day 2025', type: 'Recruitment', date: 'March 2025' },
  { title: 'Annual Alumni Gala', type: 'Social', date: 'February 2025' },
  { title: 'ESG Investing Panel', type: 'Corporate Event', date: 'January 2025' },
  { title: 'Bloomberg Terminal Training', type: 'Workshop', date: 'December 2024' },
  { title: 'Year-End Portfolio Review', type: 'Weekly Meeting', date: 'November 2024' },
  { title: 'ING Bank Guest Lecture', type: 'Corporate Event', date: 'October 2024' },
];

const typeColors = {
  'Weekly Meeting': '#09305c',
  'Corporate Event': '#940a11',
  'Social': '#2d6a4f',
  'Workshop': '#7b4f12',
  'Recruitment': '#3d5fa6',
};

export default function EventsPage() {
  const [filter, setFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const types = ['All', 'Weekly Meeting', 'Corporate Event', 'Social', 'Workshop'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const handler = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const filtered = filter === 'All' ? upcomingEvents : upcomingEvents.filter(e => e.type === filter);

  return (
    <>
      {/* Hero */}
      <div className="section-group" style={{marginTop:'18px'}}>
        <div className="section-group-inner" style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '75vh', display: 'flex', alignItems: 'flex-end',
          background: '#09305c',
          borderRadius: '16px',
          marginTop: isMobile ? '10px' : 0,
        }}>
          {/* Background image with overlay */}
          <img
            src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/19508b10-9f27-4a32-9d48-c4eb48a87229/Board.jpeg"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.25 }}
          />
          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #09305c 30%, rgba(9,48,92,0.5) 100%)' }} />
          {/* Sigma watermark */}
          <span style={{ position: 'absolute', right: '-0.05em', top: '-0.15em', fontSize: isMobile ? '120vw' : '65vw', fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>Σ</span>

          <div className="section-group-content" style={{ position: 'relative', zIndex: 1, paddingTop: '10rem', paddingBottom: '5rem', width: '100%' }}>
            {/* Top label row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ width: '2.5rem', height: '1px', background: '#940a11', display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>Sigma Events</span>
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', fontWeight: 300, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 2.5rem', fontFamily: "'Outfit', sans-serif" }}>
              What's<br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>happening.</span>
            </h1>

            {/* Bottom row — description + next event pill */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                Weekly meetings, corporate guest lectures, workshops and social gatherings — everything Sigma, in one place.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#940a11', flexShrink: 0, boxShadow: '0 0 8px #940a11' }} />
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>Next Event</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>14 OCT — Weekly Meeting</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter + Upcoming */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

            {/* Section label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#09305c', letterSpacing: '-0.03em', margin: 0 }}>Upcoming Events</h2>
              {/* Filter pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {types.map(t => (
                  <button key={t} onClick={() => setFilter(t)} style={{
                    padding: '0.45rem 1.1rem', fontSize: '0.8rem', fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.08em', border: '1px solid',
                    cursor: 'pointer', transition: 'all 0.2s',
                    background: filter === t ? '#09305c' : 'transparent',
                    color: filter === t ? '#ffffff' : '#09305c',
                    borderColor: '#09305c',
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* Events list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {filtered.map((event, i) => (
                <div key={event.id} data-aos="fade-up" data-aos-delay={i * 80} style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '70px 1fr' : '120px 1fr auto',
                  gap: isMobile ? '1rem' : '2.5rem',
                  alignItems: 'start',
                  padding: isMobile ? '1.8rem 0' : '2.5rem 0',
                  borderTop: '1px solid #e2e8f0',
                  ...(i === filtered.length - 1 ? { borderBottom: '1px solid #e2e8f0' } : {}),
                }}>
                  {/* Date block */}
                  <div style={{ textAlign: 'center', paddingTop: '0.25rem' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 700, color: '#09305c', lineHeight: 1, letterSpacing: '-0.04em' }}>{event.date.day}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#940a11', marginTop: '0.2rem' }}>{event.date.month}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem' }}>{event.date.year}</div>
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', padding: '0.25rem 0.75rem',
                        background: typeColors[event.type] || '#09305c',
                        color: '#ffffff',
                      }}>{event.type}</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{event.tag}</span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#09305c', margin: '0 0 0.75rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{event.title}</h3>
                    <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.7, margin: '0 0 1rem', maxWidth: '600px' }}>{event.description}</p>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: isMobile ? '1rem' : 0 }}>
                      <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                        {event.location}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {event.time}
                      </span>
                    </div>
                    {isMobile && (
                      <a href="#" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: '#940a11', color: '#ffffff',
                        padding: '0.65rem 1.3rem', fontSize: '0.8rem',
                        fontWeight: 600, textDecoration: 'none',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        marginTop: '0.75rem',
                      }}>
                        Register
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </a>
                    )}
                  </div>

                  {/* CTA */}
                  {!isMobile && (
                  <div style={{ paddingTop: '0.5rem' }}>
                    <a href="#" style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      background: '#940a11', color: '#ffffff',
                      padding: '0.8rem 1.6rem', fontSize: '0.85rem',
                      fontWeight: 600, textDecoration: 'none',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      whiteSpace: 'nowrap', transition: 'background 0.2s',
                    }}>
                      Register
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Past Events */}
      <div className="section-group">
        <div className="section-group-inner" style={{ background: '#f8fafc' }}>
          <div className="section-group-content" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, color: '#09305c', letterSpacing: '-0.03em', marginBottom: '2.5rem' }}>Past Events</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', background: '#e2e8f0' }}>
              {pastEvents.map((e, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 60} style={{ background: '#f8fafc', padding: '1.8rem 2rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: typeColors[e.type] || '#09305c' }}>{e.type}</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#09305c', margin: '0.5rem 0 0.4rem', lineHeight: 1.3 }}>{e.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>{e.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MiniContact />
    </>
  );
}
