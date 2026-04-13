import { useEffect } from 'react';
import FundCharts from './FundCharts';
import MiniContact from './MiniContact';
import useHeroAutoScroll from '../hooks/useHeroAutoScroll';

export default function FundPage() {
  useHeroAutoScroll('section-fund-hero', 1800);

  // Scroll animation observer
  useEffect(() => {
    window.scrollTo(0, 0);
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, observerOptions);

    // Observe split layouts and other sections
    document.querySelectorAll('.section-split-layout, .animation-scroll-trigger').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero Banner with Video Background */}
      <div className="section-group" style={{marginTop:'10px'}}>
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="banner banner-page images-on animation-scroll-trigger animation-multiple" id="section-fund-hero">
              <div className="banner-inner">
                {/* Video Background */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                  }}
                >
                  <source src="/stock-market.mp4" type="video/mp4" />
                </video>
                {/* Blue Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(9, 36, 61, 0.85) 0%, rgba(16, 36, 61, 0.80) 50%, rgba(30, 58, 95, 0.75) 100%)',
                  zIndex: 1,
                }} />
                <div className="banner-main">
                  <div className="banner-main-inner" style={{ textAlign: 'center' }}>
                    <h1 className="banner-heading animation-target-slide-up animation-delay-0" style={{ fontSize: '5rem', marginBottom: '2rem', color: '#ffffff' }}>
                      Long-Term Value<br/>Investing
                    </h1>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Intro Sec */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-split-layout animation-scroll-trigger animation-multiple" id="section-fund-intro" data-aos="fade-up">
              <div className="section-split-title">
                <h2 className="animation-target-slide-up animation-delay-0" style={{ fontSize: '3rem', color: '#11253e' }}>It all begins with an idea.</h2>
              </div>
              <div className="section-split-content animation-target-slide-up animation-delay-1" style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#475569' }}>
                <p>Maybe you want to launch a business. Maybe you want to turn a hobby into something more. Or maybe you have a creative project to share with the world. Whatever it is, during your studies your investment is best secured at Sigma.</p>
                <div style={{ marginTop: '2rem' }}>
                  <a href="mailto:fund@sigma-investments.com" style={{ color: '#3d5fa6', fontWeight: '600', textDecoration: 'none', borderBottom: '2px solid' }}>fund@sigma-investments.com</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-split-layout reverse animation-scroll-trigger animation-multiple" id="section-fund-philosophy" data-aos="fade-up">
              <div className="section-split-content animation-target-slide-up animation-delay-1" style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#475569' }}>
                <p>Sigma Investments employs strong emphasis on Diversification, Quality and Solvency.</p>
                <p>Robust Risk-Management minimizes our funds variability from leading indexes, focusing our Strategy on finding Alpha in the individual equity selection.</p>
                <p>While every Analyst class ensures Flexibility through cost-free Active Management.</p>
              </div>
              <div className="section-split-title">
                <h2 className="animation-target-slide-up animation-delay-0" style={{ fontSize: '3rem', color: '#11253e', lineHeight: 1.2 }}>Theory, from Lecture into Practice.</h2>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Diversification & Assets */}
      <FundCharts 
        footerText="Simplified allocation of individual equities, excludes ETF positions. Managed by the fund manager, industry-, risk-, technical-, and sustainability team. 2023."
      />

      {/* FAQ Motivation */}
      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-split-layout animation-scroll-trigger animation-multiple" style={{ alignItems: 'center' }} id="section-fund-motivation" data-aos="fade-up">
              <div className="section-split-title" style={{ paddingRight: '4rem' }}>
                <h2 className="animation-target-slide-up animation-delay-0" style={{ fontSize: '3rem', color: '#11253e', lineHeight: 1.2 }}>More than financial gain.</h2>
              </div>
              <div className="section-split-content animation-target-slide-up animation-delay-1" style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#475569' }}>
                <p>Trusting the University's Investment Club is about more than financial gain. Your commitment ensures long-term education beyond the class room, while solidifying the School of Business and Economics extra-curricular organisations as leading accelerators into a career in financial services.</p>
                <p style={{ fontWeight: 600, marginTop: '1.5rem', color: '#11253e' }}>Here are our most Frequently Asked Questions:</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="section-group" style={{ marginBottom: '8rem' }}>
        <style>
          {`
            .faq-details {
              margin-bottom: 0;
              background: #ffffff;
              border-bottom: 1px solid rgba(9, 48, 92, 0.1);
              padding: 2.5rem 0;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .faq-details:first-child {
              border-top: 1px solid rgba(9, 48, 92, 0.1);
            }
            .faq-details summary {
              list-style: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 1.75rem;
              font-weight: 600;
              color: #11253e;
            }
            .faq-details summary::-webkit-details-marker {
              display: none;
            }
            .faq-icon::before {
              content: '+';
            }
            .faq-details[open] .faq-icon::before {
              content: '-';
            }
            .faq-answer {
              font-size: 1.35rem;
              margin-top: 1.5rem;
              color: #475569;
              line-height: 1.8;
              max-width: 900px;
            }
          `}
        </style>
        <div className="section-group-inner bg-white">
          <div className="section-group-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div className="faq-container" data-aos="fade-up">
              {[
                "I am new to Maastricht and UM, how can I participate?",
                "What is your primary language of communication?",
                "How would you describe Sigma's investment philosophy?"
              ].map((question, index) => (
                <details key={index} className="faq-details">
                  <summary>
                    {question}
                    <span className="faq-icon" style={{ color: '#3d5fa6', fontSize: '2rem', fontWeight: 300 }}></span>
                  </summary>
                  <p className="faq-answer">
                    This is a placeholder answer for the question. We provide a fantastic environment for new members to get up to speed quickly and contribute to our investments through established workflows and specialized teams.
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-group" style={{ background: '#ffffff', padding: '10rem 0' }}>
        <div className="section-group-inner">
          <div className="section-group-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h2 
              data-aos="fade-up" 
              style={{ 
                color: '#11253e', 
                fontSize: '4.5rem', 
                marginBottom: '2.5rem', 
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
            >
              Become a Member
            </h2>
            <p 
              data-aos="fade-up" 
              data-aos-delay="100"
              style={{ 
                fontSize: '1.4rem', 
                color: '#475569', 
                maxWidth: '600px', 
                marginBottom: '3.5rem',
                lineHeight: 1.6
              }}
            >
              Join Europe's leading student-managed investment club and kickstart your career in finance.
            </p>
            <a 
              href="#" 
              data-aos="fade-up"
              data-aos-delay="200"
              style={{
                display: 'inline-block',
                background: '#11253e',
                color: 'white',
                padding: '1.2rem 3.5rem',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(9, 48, 92, 0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = '#3d5fa6';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(61, 95, 166, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#11253e';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(9, 48, 92, 0.1)';
              }}
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </div>

      <MiniContact />
    </>
  );
}
