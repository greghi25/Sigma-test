import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer">
      <div id="footer-upper">
        <img id="footer-upper-bg" loading="lazy" src="bg-11.jpg" alt="" />
        <div id="footer-upper-inner">
          <div className="footer-column">
            <div className="logo">
              <a href="https://www.sigma-investments.com/" target="_blank" rel="noopener noreferrer">
                <img src="/logo-sigma.png" alt="Sigma Logo" />
              </a>
              <a href="/">
                <img src="/maastricht-logo.png" alt="Maastricht University Logo" />
              </a>
            </div>
            <p className="logo-text"></p>
          </div>
          <nav className="footer-column">
            <h3 className="footer-heading">Menu</h3>
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/fund">Fund</Link>
              </li>
              <li>
                <Link to="/team">Our Team</Link>
              </li>
              <li>
                <Link to="/join">Join Us</Link>
              </li>
              <li>
                <Link to="/publications">Publications</Link>
              </li>
            </ul>
          </nav>
          <nav className="footer-column">
            <h3 className="footer-heading">Legal</h3>
            <ul className="menu">
              <li>
                <Link to="/privacy">Privacy &amp; data protection</Link>
              </li>
              <li>
                <Link to="/imprint">Cookies</Link>
              </li>
            </ul>
          </nav>
        </div>
        <ul id="footer-social">
          <li>
            <a className="button-social" href="https://www.linkedin.com/company/sigma-investments/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14.13" height="14.13" viewBox="0 0 14.13 14.13">
                <path d="M3.163,14.13H.233V4.7H3.163ZM1.7,3.41A1.7,1.7,0,1,1,3.393,1.7,1.711,1.711,0,0,1,1.7,3.41Zm12.43,10.72H11.2V9.538c0-1.094-.022-2.5-1.523-2.5-1.523,0-1.756,1.189-1.756,2.419V14.13H5V4.7h2.81V5.983h.041A3.078,3.078,0,0,1,10.62,4.46c2.965,0,3.51,1.952,3.51,4.488V14.13Z" />
              </svg>
            </a>
          </li>
          <li>
            <a className="button-social" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14.13" height="14.13" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </li>
        </ul>

        <div className="footer-bottom-bar" style={{
          position: 'relative', zIndex: 2,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '2rem 2.5rem',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          {/* Left — contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="mailto:info@sigma-investments.com" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontWeight: 500 }}>
              info@sigma-investments.com
            </a>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}>
              Tongersestraat 43, 6211 LM Maastricht
            </span>
          </div>

          {/* Right — copyright + credit */}
          <div className="footer-bottom-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)' }}>
              Sigma Investments © 2026 · All rights reserved.
            </span>
            <a
              href="https://www.byvoxis.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
            >
              Designed &amp; built by <span style={{ fontWeight: 700 }}>Voxis</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
