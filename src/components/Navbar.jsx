import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

const links = [
  { to: '/about', label: 'About Us' },
  { to: '/fund', label: 'Fund' },
  { to: '/team', label: 'Our Team' },
  { to: '/events', label: 'Events' },
  { to: '/join', label: 'Join Us' },
  { to: '/publications', label: 'Publications' },
];

const mobileLinks = [
  { to: '/', label: 'Home' },
  ...links,
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div id="Nav" role="banner" className="navbar w-nav">
        <div className="container nav-container">
          <NavLink to="/" className={({ isActive }) => `brand w-nav-brand ${isActive ? 'w--current' : ''}`}>
            <img src="/brand-logo.png" alt="" className="brand-logo" />
          </NavLink>
          <div className="nav-right-wrap">
            {/* Desktop nav */}
            <nav role="navigation" className="nav-menu w-nav-menu">
              {links.map(({ to, label }) => (
                <NavLink key={to} to={to} className={({ isActive }) => `nav-link w-nav-link ${isActive ? 'w--current' : ''}`}>
                  {label}
                </NavLink>
              ))}
              <SearchBar />
            </nav>
            {/* Hamburger button */}
            <button
              className="menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <div className="nav-icon w-icon-nav-menu"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#09305c',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '0 2.5rem',
          overflow: 'hidden',
        }}>
          {/* Sigma watermark */}
          <span style={{
            position: 'absolute', right: '-0.15em', bottom: '-0.25em',
            fontSize: '85vw', fontFamily: 'Georgia, serif', fontWeight: 400,
            color: 'rgba(255,255,255,0.06)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none',
          }}>Σ</span>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              position: 'absolute', top: '1.2rem', right: '1.5rem',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.6)', fontSize: '2.2rem', lineHeight: 1,
            }}
          >
            ✕
          </button>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {mobileLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                style={({ isActive }) => ({
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.45)',
                  textDecoration: 'none',
                  fontSize: '13vw',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  transition: 'color 0.2s',
                })}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
