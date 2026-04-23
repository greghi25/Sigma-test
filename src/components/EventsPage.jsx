import { useEffect, useState } from 'react';
import MiniContact from './MiniContact';

const upcomingEvents = [
  {
    id: 1,
    date: { day: '20', month: 'APR', year: '2026' },
    title: 'Pitch',
    type: 'Analyst Session',
    subtitle: 'FS&RE · Healthcare',
    description: 'Pitch presentations from the Financial Services & Real Estate and Healthcare sector teams, followed by group discussion and Q&A.',
    location: 'Maastricht University, SBE Building',
    time: '19:00 – 21:00',
    tag: 'Members Only',
  },
  {
    id: 2,
    date: { day: '21', month: 'APR', year: '2026' },
    title: 'Consulting & Finance X MSC',
    type: 'Ext. Workshop',
    subtitle: 'Drinks',
    description: 'A cross-society event with the Maastricht Consulting Club. Drinks and networking for students interested in consulting and finance.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:00',
    tag: 'Open to All',
  },
  {
    id: 3,
    date: { day: '22', month: 'APR', year: '2026' },
    title: 'WIF Panel + Drinks',
    type: 'Ext. Workshop',
    subtitle: 'Sigma x Women in Business',
    description: 'A panel discussion hosted in collaboration with Women in Business Maastricht, exploring careers in finance and investing.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:00',
    tag: 'Members Only',
  },
  {
    id: 4,
    date: { day: '24', month: 'APR', year: '2026' },
    title: 'CVC Brussels Day Trip',
    type: 'Ext. Workshop',
    subtitle: 'Hosted by CVC Credit Team',
    description: 'A day trip to Brussels hosted by the CVC Credit Team, offering insight into private credit and the European PE landscape.',
    location: 'Brussels, Belgium',
    time: 'All Day',
    tag: 'Open to All',
  },
  {
    id: 5,
    date: { day: '25', month: 'APR', year: '2026' },
    title: 'Cross Team Dinner',
    type: 'Social',
    subtitle: '',
    description: 'An informal cross-team social dinner — a great chance to connect with members from across all departments.',
    location: 'Maastricht',
    time: '19:30 – 23:00',
    tag: 'Open to All',
  },
  {
    id: 6,
    date: { day: '30', month: 'APR', year: '2026' },
    title: 'Panel Discussion + Drinks',
    type: 'Ext. Workshop',
    subtitle: 'Presented by BoFA',
    description: 'Panel discussion hosted by Bank of America, covering markets, investment banking, and career pathways, followed by networking drinks.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:30',
    tag: 'Members Only',
  },
  {
    id: 7,
    date: { day: '06', month: 'MAY', year: '2026' },
    title: 'Pitch',
    type: 'Analyst Session',
    subtitle: 'CG · I&E',
    description: 'Pitch presentations from the Consumer Goods and Industrials & Energy sector teams.',
    location: 'Maastricht University, SBE Building',
    time: '19:00 – 21:00',
    tag: 'Members Only',
  },
  {
    id: 8,
    date: { day: '07', month: 'MAY', year: '2026' },
    title: 'IB Workshop',
    type: 'Ext. Workshop',
    subtitle: 'Company TBC',
    description: 'An investment banking workshop hosted by an industry guest. Company to be confirmed.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:00',
    tag: 'Open to All',
  },
  {
    id: 9,
    date: { day: '11', month: 'MAY', year: '2026' },
    title: 'Pitch',
    type: 'Analyst Session',
    subtitle: 'Healthcare · Specialized',
    description: 'Pitch presentations from the Healthcare and Specialized sector teams.',
    location: 'Maastricht University, SBE Building',
    time: '19:00 – 21:00',
    tag: 'Members Only',
  },
  {
    id: 10,
    date: { day: '12', month: 'MAY', year: '2026' },
    title: 'Programming Workshop',
    type: 'Int. Workshop',
    subtitle: '',
    description: 'An internal workshop covering programming tools and data analysis relevant to equity research and portfolio management.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:00',
    tag: 'Members Only',
  },
  {
    id: 11,
    date: { day: '18', month: 'MAY', year: '2026' },
    title: 'Pitch',
    type: 'Analyst Session',
    subtitle: 'TMT · FS&RE',
    description: 'Pitch presentations from the Technology, Media & Telecoms and Financial Services & Real Estate teams.',
    location: 'Maastricht University, SBE Building',
    time: '19:00 – 21:00',
    tag: 'Members Only',
  },
  {
    id: 12,
    date: { day: '22', month: 'MAY', year: '2026' },
    title: 'Alumni Panel + Drinks',
    type: 'Ext. Workshop',
    subtitle: '',
    description: 'A panel featuring Sigma alumni now working across finance and consulting, sharing their career journeys and advice.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:30',
    tag: 'Members Only',
  },
  {
    id: 13,
    date: { day: '26', month: 'MAY', year: '2026' },
    title: 'Industry Updates',
    type: 'Analyst Session',
    subtitle: 'All Teams',
    description: 'All-team industry update session — each sector team presents the latest developments in their coverage universe.',
    location: 'Maastricht University, SBE Building',
    time: '19:00 – 21:00',
    tag: 'Members Only',
  },
  {
    id: 14,
    date: { day: '27', month: 'MAY', year: '2026' },
    title: 'Understanding Recruitment',
    type: 'Int. Workshop',
    subtitle: '',
    description: 'An internal session focused on demystifying finance recruitment — timelines, applications, and what firms look for.',
    location: 'Maastricht University, SBE Building',
    time: '18:00 – 20:00',
    tag: 'Members Only',
  },
  {
    id: 15,
    date: { day: '29', month: 'MAY', year: '2026' },
    title: 'Frankfurt Trip',
    type: 'Ext. Workshop',
    subtitle: 'Barclays IB, Moody\'s, Others · 29–30 May',
    description: 'A two-day company visit trip to Frankfurt, with visits to Barclays IB, Moody\'s, and other leading financial institutions.',
    location: 'Frankfurt, Germany',
    time: '29–30 May · All Day',
    tag: 'Open to All',
  },
  {
    id: 16,
    date: { day: '03', month: 'JUN', year: '2026' },
    title: 'MFS x Flossbach Von Storch',
    type: 'Ext. Workshop',
    subtitle: 'Drinks & Bites at Pruev',
    description: 'A joint event with MFS Investment Management and Flossbach von Storch. Drinks and bites hosted at Pruev.',
    location: 'Pruev, Maastricht',
    time: '18:00 – 20:30',
    tag: 'Open to All',
  },
];

const pastEvents = [
  { title: 'Industry Updates', type: 'Analyst Session', date: '13 Apr 2026', note: 'All Teams' },
  { title: 'Options in Practice', type: 'Ext. Workshop', date: '14 Apr 2026', note: 'Dr. Rodrigues' },
  { title: 'Private Equity Workshop', type: 'Ext. Workshop', date: '15 Apr 2026', note: 'Presented by Altamar CAM' },
  { title: 'LBO Workshop', type: 'Int. Workshop', date: '16 Apr 2026', note: '' },
];

const typeColors = {
  'Analyst Session': '#09305c',
  'Ext. Workshop': '#2d6a4f',
  'Int. Workshop': '#940a11',
  'Social': '#6b3fa0',
};

export default function EventsPage() {
  const [filter, setFilter] = useState('All');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const types = ['All', 'Analyst Session', 'Ext. Workshop', 'Int. Workshop', 'Social'];

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
      <div className="section-group" style={{ marginTop: '18px' }}>
        <div className="section-group-inner" style={{
          position: 'relative', overflow: 'hidden',
          minHeight: '75vh', display: 'flex', alignItems: 'flex-end',
          background: '#09305c',
          borderRadius: '16px',
          marginTop: isMobile ? '10px' : 0,
        }}>
          <img
            src="/Board-1.png"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.25 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #09305c 30%, rgba(9,48,92,0.5) 100%)' }} />
          <span style={{ position: 'absolute', right: '-0.05em', top: '-0.15em', fontSize: isMobile ? '120vw' : '65vw', fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>Σ</span>

          <div className="section-group-content" style={{ position: 'relative', zIndex: 1, paddingTop: '10rem', paddingBottom: '5rem', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <span style={{ width: '2.5rem', height: '1px', background: '#940a11', display: 'inline-block' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.5)' }}>Sigma Events · Spring 2026</span>
            </div>

            <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', fontWeight: 300, color: '#ffffff', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 2.5rem', fontFamily: "'Outfit', sans-serif" }}>
              What's<br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>happening.</span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                Analyst sessions, corporate workshops, company trips and social gatherings — everything Sigma, in one place.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '1rem 1.5rem', backdropFilter: 'blur(8px)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#940a11', flexShrink: 0, boxShadow: '0 0 8px #940a11' }} />
                <div>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>Next Event</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>20 APR — Pitch · FS&RE · Healthcare</div>
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#09305c', letterSpacing: '-0.03em', margin: 0 }}>Upcoming Events</h2>
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {filtered.map((event, i) => (
                <div key={event.id} data-aos="fade-up" data-aos-delay={i * 60} style={{
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
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.1em', padding: '0.25rem 0.75rem',
                        background: event.tag === 'Members Only' ? '#09305c' : 'transparent',
                        color: event.tag === 'Members Only' ? '#ffffff' : '#64748b',
                        border: event.tag === 'Members Only' ? 'none' : '1px solid #cbd5e1',
                      }}>{event.tag}</span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 600, color: '#09305c', margin: '0 0 0.3rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{event.title}</h3>
                    {event.subtitle && (
                      <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500, margin: '0 0 0.75rem', fontStyle: 'italic' }}>{event.subtitle}</p>
                    )}
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
                    {/* Register button hidden until backend is ready */}
                  </div>

                  {/* Register button hidden until backend is ready */}
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
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#09305c', margin: '0.5rem 0 0.3rem', lineHeight: 1.3 }}>{e.title}</h4>
                  {e.note && <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0 0 0.3rem', fontStyle: 'italic' }}>{e.note}</p>}
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
