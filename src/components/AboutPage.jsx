import { useEffect, useRef, useState } from 'react';
import MiniContact from './MiniContact';
import useHeroAutoScroll from '../hooks/useHeroAutoScroll';

export default function AboutPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
  useHeroAutoScroll('section-1', 1800);

  // Scroll animation observer
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    // Observe split layouts
    document.querySelectorAll('.section-split-layout').forEach(section => {
      observer.observe(section);
    });

    // Observe highlights
    const highlightsSection = document.querySelector('.section-quick-highlights');
    if (highlightsSection) observer.observe(highlightsSection);

    // Observe join us
    const joinUsSection = document.querySelector('#section-17');
    if (joinUsSection) observer.observe(joinUsSection);

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Testimonial pagination
  const testimonials = [
    {
      name: 'Sonja Kappeler',
      role: 'Treasury Sales Analyst at Bank of America',
      image: 'https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/c0fc2303-7e8d-4b4f-8a88-dcaa1556e0d0/DSC04320-Sonja-Beatrice-Kappeler-732x1024.jpg?format=300w',
      text: "Sigma is simply the best gateway for gaining essential investment basics and understanding the cornerstones of sustainable finance. Each member is always invited to think outside the box and contribute one's mite by developing innovative models to complement existing approaches such as integrating sustainability measures within the DCF or drawing up an ESG Engine."
    },
    {
      name: 'Johannes Fuss',
      role: 'Investment Analyst at Orange Capital Partners',
      image: 'https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/0a84eae2-bd70-4213-b844-9375a8426bfb/Johannes-Fuss.jpg?format=300w',
      text: "Sigma helped me establish my first network in finance and provided me with the tools needed to kickstart my career. Not only did I learn the building blocks of finance, but I also built lasting friendships. I don't think it's a coincidence that Maastricht University's most dedicated finance students end up at Sigma and excel in the financial world."
    },
    {
      name: 'Steyn Schouten',
      role: 'Audit Staff at EY',
      image: 'https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/db3f4339-0ef9-4b00-8e34-75cb869fdc57/Steyn-Schouten-370x370.jpg?format=300w',
      text: "Serving on the Sigma Investments board for a full year as treasurer and interacting with the other members has showed me that taking initiative in your role is crucial. Additionally, during my time at Sigma I made many new friends, learned about investing and diversification, and felt prouder to be an SBE student."
    },
    {
      name: 'Antonia Kemmerling',
      role: 'Markets Analyst at J.P. Morgan | Vice President Spring 2018',
      image: 'https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/8d2f6188-2f82-40e6-9dd9-059a6e9a5a2f/admin-ajax.php.jpg?format=300w',
      text: "Sigma allowed me to acquire the foundations of investing in an informal setting and helped me stay updated with the latest development in financial markets and politics. Through the rigorous analyses of the stock pitches, I also gained a valuable set of analyst skills, from which I can draw on now."
    },
  ];

  const getVisibleCards = () => {
    if (currentPage === 0) return [0, 1, 2];
    return [1, 2, 3];
  };

  const visibleCards = getVisibleCards();
  const centerIndex = currentPage === 0 ? 1 : 2;

  return (
    <>
      {/* Hero Banner */}
      <div className="section-group" style={{marginTop:'10px'}}>
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="banner banner-page images-on animation-scroll-trigger animation-multiple" id="section-1">
              <div className="banner-inner">
                <div className="banner-bg">
                  <div className="banner-bg-inner banner-bg-desktop">
                    <img className="animation-target-scale-in" loading="lazy" src="/about-hero.jpg" alt="" />
                  </div>
                  <div className="banner-bg-inner banner-bg-mobile">
                    <img className="animation-target-scale-in" loading="lazy" src="/about-hero.jpg" alt="" />
                  </div>
                </div>
                <div className="banner-main">
                  <div className="banner-main-inner">
                    <h1 className="banner-heading animation-target-slide-up animation-delay-0">About us</h1>
                  </div>
                </div>
              </div>
          
            </section>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-split-layout animation-scroll-trigger animation-multiple" id="section-3" data-aos="fade-up">
              <div className="section-split-title">
                <h2 className="animation-target-slide-up animation-delay-0">Our Story</h2>
              </div>
              <div className="section-split-content animation-target-slide-up animation-delay-1">
                <p>Sigma Investments was founded in 1976. We currently count 20 industry analysts, 9 specialised analysts and over 150 members. More than 1000 alumni are part of our diverse and long-standing community in Europe.</p>
                <p>Students established the investment club intending to create an interactive learning environment for fellow students passionate about financial markets and investing. Our goal is to bridge the gap between academia and practice.</p>
                <p>We aspire to achieve this objective by actively managing an equity portfolio, organising workshops, and hosting lectures by alumni and partners.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Our Commitment */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-split-layout reverse animation-scroll-trigger animation-multiple" id="section-5" data-aos="fade-up">
              <div className="section-split-content animation-target-slide-up animation-delay-1">
                <p>Aligned with Maastricht University's values, we strive for socially responsible investing. To date, all our investment decisions are supported by our in-house ESG engine, aligned with Maastricht University's code of conduct.</p>
                <p>Sigma has a position for everyone to grow. Analysts, Marketing or Social Committees and Club Members learn every semester through established workflows and recurring systems our organisation has developed over years. Internal hiring and promoting enables our club to have the most dedicated group functioning in Maastricht!</p>
              </div>
              <div className="section-split-title">
                <h2 className="animation-target-slide-up animation-delay-0">Our Commitment</h2>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* The Fund */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-split-layout animation-scroll-trigger animation-multiple" id="section-7" data-aos="fade-up">
              <div className="section-split-title">
                <h2 className="animation-target-slide-up animation-delay-0">The Fund</h2>
              </div>
              <div className="section-split-content animation-target-slide-up animation-delay-1">
                <p>Established in 1976, our fund has grown to become one of Europe's most respected student-run investment vehicles, with a track record built on disciplined research and long-term thinking.</p>
                <p>Every investment decision is backed by rigorous fundamental analysis, ESG screening, and peer review — ensuring our portfolio reflects both financial conviction and responsible stewardship.</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Fund Statement */}
      <div className="section-group">
        <div className="section-group-inner" style={{ background: '#09305c', position: 'relative', overflow: 'hidden' }}>
          {/* Sigma watermark */}
          <span style={{
            position: 'absolute', right: '-0.1em', bottom: '-0.2em',
            fontSize: '60vw', fontFamily: 'Georgia, serif', fontWeight: 400,
            color: 'rgba(255,255,255,0.04)', lineHeight: 1,
            userSelect: 'none', pointerEvents: 'none', zIndex: 0,
          }}>Σ</span>
          <div className="section-group-content" style={{ position: 'relative', zIndex: 1 }}>
            <section className="fund-statement-section" data-aos="fade-up">
              <p className="fund-statement-text">
                In Europe, we are one of the largest{' '}
                <span className="fund-statement-highlight">
                  student-managed
                  <svg className="fund-statement-arrow" viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 14 Q50 4 100 12 Q150 20 200 10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>{' '}
                investment funds by AUM. Sigma focuses on value investing — seeking undervalued companies with solid fundamentals. Our aim is to outperform both European and US equity markets while investing across 5 industries:{' '}
                <em>Consumer Goods, Industrials &amp; Energy, TMT, Health Care, Financial Services &amp; Real Estate.</em>
              </p>
              <div style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <a href="/fund" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  background: '#940a11', color: '#ffffff',
                  padding: '1rem 2.2rem', fontSize: '1rem',
                  fontWeight: 600, textDecoration: 'none',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  transition: 'background 0.2s',
                }}>
                  Fund
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Think-Cell Partnership */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section 
              className="animation-scroll-trigger animation-multiple partnership-section" 
              id="section-think-cell" 
              data-aos="fade-up"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', padding: '4rem 0' }}
            >
              <div>
                <h2 style={{ fontSize: '3rem', fontWeight: 600, color: '#11253e', marginBottom: '2rem', lineHeight: 1.1 }}>Our Partnership</h2>
                <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: '#475569', marginBottom: '1.5rem' }}>At Sigma Investments, we believe that the implementation of software used by professionals is imperative. This is why we partnered with think-cell, a PowerPoint integration to visualize complex data using charts.</p>
                <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: '#475569' }}>Commonly used by top-tier investment banks and consultancies, think-cell allows you to cut down the total time spent creating charts by up to 70% and making alterations by 90%. Create over 40 chart types, such as waterfall, Gantt, and Mekko charts, in just 2-3 minutes and advance your professional skills.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/3d1a81d1-6a73-4a36-91d3-a72674f545b8/think-cell-square.jpg" 
                  alt="think-cell Partnership" 
                  style={{ 
                    width: '100%', 
                    maxWidth: '420px', 
                    objectFit: 'cover',
                    mixBlendMode: 'multiply',
                  }} 
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* By The Numbers */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-heading has-underline animation-scroll-trigger animation-multiple" id="section-9" data-aos="fade-up">
              <h2 className="section-heading-heading animation-target-slide-up animation-delay-0">By The Numbers</h2>
            </section>
            <section className="section-statistics animation-scroll-trigger animation-multiple" id="section-10">
              <div className="section-statistics-list layout-1">
                <div className="section-statistics-item animation-scroll-trigger animation-increment animation-target-slide-up animation-delay-0">
                  <p className="section-statistics-item-stat">
                    <span></span>
                    <span className="animation-increment-target" data-value-start="0" data-value-end="20">20</span>
                    <span></span>
                  </p>
                  <div className="section-statistics-item-body body-small"><p>Industry Analysts</p></div>
                </div>
                <div className="section-statistics-item animation-scroll-trigger animation-increment animation-target-slide-up animation-delay-1">
                  <p className="section-statistics-item-stat">
                    <span></span>
                    <span className="animation-increment-target" data-value-start="0" data-value-end="9">9</span>
                    <span></span>
                  </p>
                  <div className="section-statistics-item-body body-small"><p>Specialised Analysts</p></div>
                </div>
                <div className="section-statistics-item animation-scroll-trigger animation-increment animation-target-slide-up animation-delay-2">
                  <p className="section-statistics-item-stat">
                    <span></span>
                    <span className="animation-increment-target" data-value-start="0" data-value-end="150">150</span>
                    <span>+</span>
                  </p>
                  <div className="section-statistics-item-body body-small"><p>Active Members</p></div>
                </div>
                <div className="section-statistics-item animation-scroll-trigger animation-increment animation-target-slide-up animation-delay-3">
                  <p className="section-statistics-item-stat">
                    <span></span>
                    <span className="animation-increment-target" data-value-start="0" data-value-end="1000">1000</span>
                    <span>+</span>
                  </p>
                  <div className="section-statistics-item-body body-small"><p>Alumni Network</p></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Our Events */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-heading has-underline animation-scroll-trigger animation-multiple" id="section-12" data-aos="fade-up">
              <h2 className="section-heading-heading animation-target-slide-up animation-delay-0">Sigma Events</h2>
            </section>
          </div>
        </div>
      </div>

      <section className="section-image outside animation-scroll-trigger animation-multiple" id="section-14">
        <div className="section-image-inner">
          <img className="desktop animation-target animation-target-scale-in" loading="lazy" src="/about-hero.png" alt="Social Gatherings" />
        </div>
      </section>

      {/* View All Events CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 1rem', }}>
        <a href="/events" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          background: '#940a11', color: '#ffffff',
          padding: '1.1rem 2.5rem',
          textDecoration: 'none', fontWeight: 600,
          fontSize: '0.95rem', letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', lineHeight: 1 }}>Σ</span>
          View All Upcomming Events
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Alumni Testimonials */}
      <div className="section-group" style={{ marginTop: '8rem', marginBottom: '8rem' }}>
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-heading has-underline animation-scroll-trigger animation-multiple" id="section-alumni" data-aos="fade-up">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                <h2 className="section-heading-heading animation-target-slide-up animation-delay-0" style={{ fontSize: '4rem', marginBottom: 0, fontWeight: 300, color: '#11253e' }}>What our Alumni say</h2>
              </div>
            </section>

            {/* Testimonials Grid */}
            <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', maxWidth: '1400px', margin: '0 auto 3rem', padding: '0 2rem', width: '100%' }}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="testimonial-card"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={i * 200}
                  style={{
                    display: isMobile || visibleCards.includes(i) ? 'block' : 'none',
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '2.5rem 2rem',
                    boxShadow: i === centerIndex ? '0 12px 35px rgba(9, 48, 92, 0.15)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    textAlign: 'center',
                    transform: i === centerIndex ? 'translateY(-8px)' : 'translateY(0)',
                  }}
                >
                  <div className="testimonial-image" style={{ width: '120px', height: '120px', borderRadius: '50%', margin: '0 auto 1.5rem', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}>
                    <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#11253e', marginBottom: '0.5rem' }}>{t.name}</h3>
                  <p style={{ fontSize: '1rem', color: '#3d5fa6', fontWeight: 600, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.role}</p>
                  <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#475569', textAlign: 'center' }}>{t.text}</p>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="testimonial-navigation" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', clear: 'both' }}>
              <button
                onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
                style={{
                  background: '#11253e', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, cursor: currentPage === 0 ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(9, 48, 92, 0.25)', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: currentPage === 0 ? 0.5 : 1
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Previous
              </button>
              <button
                onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                style={{
                  background: '#11253e', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '50px', fontSize: '1rem', fontWeight: 600, cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(9, 48, 92, 0.25)', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: currentPage === totalPages - 1 ? 0.5 : 1
                }}
              >
                Next
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MiniContact />
    </>
  );
}
