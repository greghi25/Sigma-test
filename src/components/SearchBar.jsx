import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const searchIndex = [
  { title: 'About Us', subtitle: 'Our story, history & commitment', path: '/about', keywords: ['about', 'story', 'history', '1976', 'founded', 'mission', 'commitment', 'sigma'] },
  { title: 'The Fund', subtitle: 'Portfolio, AUM & investment strategy', path: '/fund', keywords: ['fund', 'portfolio', 'aum', 'invest', 'equity', 'stock', 'value', 'return', 'strategy', 'asset'] },
  { title: 'Our Team', subtitle: 'Board members & analyst teams', path: '/team', keywords: ['team', 'board', 'analyst', 'member', 'people', 'president', 'director'] },
  { title: 'Join Us', subtitle: 'Apply as analyst or club member', path: '/join', keywords: ['join', 'apply', 'application', 'recruit', 'signup', 'membership', 'analyst', 'club'] },
  { title: 'Publications', subtitle: 'Research reports & stock pitches', path: '/publications', keywords: ['publication', 'report', 'pitch', 'research', 'paper', 'monthly', 'annual'] },
  { title: 'Events', subtitle: 'Upcoming meetings, lectures & socials', path: '/events', keywords: ['event', 'meeting', 'lecture', 'workshop', 'social', 'gathering', 'dinner', 'weekly'] },
  { title: 'Weekly Meetings', subtitle: 'Every Monday from 7pm — market updates & pitches', path: '/events', keywords: ['weekly', 'monday', 'meeting', 'pitch', 'market', 'update'] },
  { title: 'Corporate Events', subtitle: 'Guest talks, workshops & recruitment days', path: '/events', keywords: ['corporate', 'guest', 'talk', 'workshop', 'recruitment', 'partner'] },
  { title: 'ESG Investing', subtitle: 'Our in-house ESG engine & responsible investing', path: '/fund', keywords: ['esg', 'sustainable', 'responsible', 'environment', 'social', 'governance'] },
  { title: 'Value Investing', subtitle: 'Sigma\'s core investment philosophy', path: '/fund', keywords: ['value', 'fundamental', 'undervalued', 'dcf', 'valuation', 'philosophy'] },
  { title: 'Alumni Network', subtitle: 'Over 1000 alumni across Europe', path: '/about', keywords: ['alumni', 'network', 'graduate', 'europe', '1000'] },
  { title: 'Contact Us', subtitle: 'Get in touch with Sigma Investments', path: '/about', keywords: ['contact', 'email', 'reach', 'touch', 'info'] },
  { title: 'Maastricht University', subtitle: 'SBE — School of Business and Economics', path: '/about', keywords: ['maastricht', 'university', 'um', 'sbe', 'school', 'business'] },
  { title: 'think-cell Partnership', subtitle: 'PowerPoint charting tool used by top banks', path: '/about', keywords: ['think', 'cell', 'thinkcell', 'powerpoint', 'chart', 'partnership'] },
];

function highlight(text, query) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(148,10,17,0.15)', color: '#940a11', padding: 0 }}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef(null);

  const results = query.trim().length < 2 ? [] : searchIndex.filter(item => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    );
  }).slice(0, 6);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (path) => {
    navigate(path);
    setQuery('');
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (results.length > 0) go(results[0].path);
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <form className="search w-form" onSubmit={handleSubmit}>
        <input
          className="search-input w-input"
          maxLength="256"
          placeholder="Search"
          type="search"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
        <input type="submit" className="search-button w-button" value="" />
      </form>

      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: '320px', background: '#ffffff',
          boxShadow: '0 20px 60px rgba(9,48,92,0.15)',
          border: '1px solid #e2e8f0',
          zIndex: 10000, overflow: 'hidden',
        }}>
          {results.map((r, i) => (
            <button key={i} onClick={() => go(r.path)} style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
              width: '100%', padding: '0.9rem 1rem',
              background: 'none', border: 'none', borderBottom: '1px solid #f1f5f9',
              cursor: 'pointer', textAlign: 'left',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <span style={{ color: '#940a11', fontFamily: 'Georgia, serif', fontSize: '1rem', marginTop: '2px', flexShrink: 0 }}>Σ</span>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#09305c', marginBottom: '0.15rem' }}>
                  {highlight(r.title, query)}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {highlight(r.subtitle, query)}
                </div>
              </div>
              <svg style={{ marginLeft: 'auto', flexShrink: 0, marginTop: '4px', color: '#cbd5e1' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          ))}
          <div style={{ padding: '0.6rem 1rem', fontSize: '0.72rem', color: '#94a3b8', background: '#f8fafc', textAlign: 'right' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </div>
        </div>
      )}

      {open && query.trim().length >= 2 && results.length === 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: '280px', background: '#ffffff',
          boxShadow: '0 20px 60px rgba(9,48,92,0.15)',
          border: '1px solid #e2e8f0', padding: '1.2rem',
          zIndex: 10000, textAlign: 'center',
        }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No results for "<strong>{query}</strong>"</span>
        </div>
      )}
    </div>
  );
}
