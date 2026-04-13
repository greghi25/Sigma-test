import { useState, useEffect } from 'react';

export default function MissionGallery() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <section
      className="section-hero text-image animation-scroll-trigger animation-multiple"
      id="section-14"
      style={isMobile ? { display: 'flex', flexDirection: 'column', width: 'calc(100% - 16px)', margin: '0 8px', padding: 0, borderRadius: '12px', overflow: 'hidden' } : {}}
    >
      <div className="section-hero-image" style={{ position: 'relative', overflow: 'visible', ...(isMobile ? { width: '100%' } : {}) }}>
        <div className="hover-gallery-container">
          <img className="gallery-layer gallery-layer-1" loading="lazy" src="Board-1.png" alt="Base Image" />
          <img className="gallery-layer gallery-layer-2" loading="lazy" src="Commitee-1.png" alt="Hover Image" />
          {/* <img className="gallery-layer gallery-layer-3" loading="lazy" src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/41068ccb-5ca3-4388-b99d-13fc4e86e202/I%26E.JPG?format=1000w" alt="Hover Image" />
          <img className="gallery-layer gallery-layer-4" loading="lazy" src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/67283690-e0fe-45f8-bc7a-b1d964e510d1/ConsumerGoods.JPG?format=1500w" alt="Hover Image" />
          <img className="gallery-layer gallery-layer-5" loading="lazy" src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/d8a67050-ec08-47b0-a198-db97edfeb9b9/TMT.JPG?format=1000w" alt="Hover Image" /> */}
        </div>
      </div>
      <div 
        className="section-hero-main" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(18, 37, 63, 0.85), rgba(18, 37, 63, 0.85)), url("newteam_img-hero-home.webp")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', 
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          ...(isMobile ? { width: '100%', minHeight: '400px' } : {})
        }}
      >
        {/* Sigma Symbol Watermark */}
        <div style={{ position: 'absolute', right: '-5%', bottom: '-10%', fontFamily: "'Georgia', serif", fontSize: '45vw', color: 'rgba(255, 255, 255, 0.05)', fontWeight: 'normal', lineHeight: 0.8, zIndex: 1, pointerEvents: 'none', userSelect: 'none' }}>Σ</div>

        <div className="section-hero-main-content" style={{ zIndex: 2, position: 'relative' }}>
          <h2 className="section-hero-main-heading animation-target-slide-up animation-delay-0" style={{ fontFamily: "'Outfit', sans-serif", fontSize: '5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '2rem', color: '#ffffff', textShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>Our Mission</h2>
          <div className="section-hero-main-standfirst text-large animation-target-slide-up animation-delay-1">
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 400, lineHeight: 1.45, marginBottom: '1.5rem', color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '850px' }}>Our Mission is to create the best extracurricular opportunities in Maastricht, with a reputable Alumni-Network throughout Europe.</p>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 400, lineHeight: 1.45, color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.1)', maxWidth: '850px' }}>The strong emphasis on bridging the gap between academia and practice equips our Analysts with practical experience and strong ties in the Financial Industry.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
