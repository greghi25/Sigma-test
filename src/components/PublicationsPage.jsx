import { useEffect } from 'react';
import MiniContact from './MiniContact';
import useHeroAutoScroll from '../hooks/useHeroAutoScroll';

export default function PublicationsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useHeroAutoScroll('section-publications-hero', 1800);

  const pitches = [
    {
      title: "Industrials & Energy and Healthcare Pitch",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/8cda97e1-f958-4f2f-b7bd-8ed5012c815c/Screenshot+2024-04-29+at+4.55.02%E2%80%AFPM.png"
    },
    {
      title: "Portfolio & Industry Update",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/870cc7ce-f17b-4b40-a385-aa4781cbb60c/Screenshot+2024-04-29+at+5.06.41%E2%80%AFPM.png"
    },
    {
      title: "Consumer Goods & TMT Pitch",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/f10cce9b-516b-443d-b4c1-80e47187ced9/Screenshot+2024-04-29+at+5.00.32%E2%80%AFPM.png"
    },
    {
      title: "Macro Update & Financial Services and Real Estate Pitch",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/9f791d1a-797d-4a48-94e0-efec06e1a4db/Screenshot+2024-04-29+at+5.01.56%E2%80%AFPM.png"
    },
    {
      title: "Specialized Teams Pitch",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/627fda9d-ac85-4839-a416-4ae6df856f6c/Screenshot+2024-04-29+at+4.59.20%E2%80%AFPM.png"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="section-group" style={{marginTop:'10px'}}>
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="banner banner-page images-on animation-scroll-trigger animation-multiple" id="section-publications-hero">
              <div className="banner-inner">
                <div className="banner-bg">
                  <div className="banner-bg-inner banner-bg-desktop">
                    <img className="animation-target-scale-in" loading="lazy" src="/Stadhuis_Maastricht-panoramio.jpg" alt="Hero background" style={{ filter: 'brightness(0.6)' }} />
                  </div>
                  <div className="banner-bg-inner banner-bg-mobile">
                    <img className="animation-target-scale-in" loading="lazy" src="/Stadhuis_Maastricht-panoramio.jpg" alt="Hero background" style={{ filter: 'brightness(0.6)' }} />
                  </div>
                </div>
                <div className="banner-main">
                  <div className="banner-main-inner" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="banner-heading animation-target-slide-up animation-delay-0" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                      Publications
                    </h1>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Monthly Reports (Split Layout style like About Page) */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content" style={{ padding: '6rem 2rem' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 600, color: '#11253e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Check Out Our Monthly Reports
              </h2>
            </div>

            <section 
              className="animation-scroll-trigger animation-multiple" 
              data-aos="fade-up"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}
            >
              <div>
                <h3 style={{ fontSize: '3.5rem', fontWeight: 600, color: '#11253e', marginBottom: '1.5rem', lineHeight: 1.1 }}>February 2024</h3>
                <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: '#475569', marginBottom: '2.5rem' }}>
                  Explore our comprehensive portfolio review, market commentary, and sector-by-sector performance analysis for February.
                </p>
                <a 
                  href="#" 
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: '#11253e',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#3d5fa6'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#11253e'}
                >
                  Download Report
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/e176ddd3-30d0-4447-9d37-557b2a879f0f/Screen+Shot+2024-03-24+at+1.35.07+PM.png" 
                  alt="Monthly Report February 2024" 
                  style={{ 
                    width: '100%',
                    maxWidth: '420px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    transition: 'transform 0.5s ease',
                  }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Pitches Section (Clean Corporate Grid) */}
      <div className="section-group">
        <div className="section-group-inner" style={{ background: '#f8fafc' }}>
          <div className="section-group-content" style={{ padding: '8rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 600, color: '#11253e', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                Check Out Our Pitches
              </h2>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '4rem 3rem' 
            }}>
              {pitches.map((pitch, index) => (
                <div 
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={(index % 2) * 100}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <img 
                      src={pitch.image} 
                      alt={pitch.title}
                      style={{ 
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }} 
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)' }
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)' }
                    />
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 600, 
                    color: '#11253e', 
                    marginBottom: '1rem',
                    lineHeight: 1.3
                  }}>
                    {pitch.title}
                  </h3>
                  <a 
                    href="#" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      color: '#3d5fa6',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      marginTop: 'auto'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#11253e'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#3d5fa6'}
                  >
                    Download PDF <span style={{ marginLeft: '0.5rem' }}>&rarr;</span>
                  </a>
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
