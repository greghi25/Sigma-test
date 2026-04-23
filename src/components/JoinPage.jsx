import { useEffect } from 'react';

export default function JoinPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      const element = document.getElementById('signup-options');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="section-group" style={{marginTop:'10px'}}>
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="banner banner-page images-on animation-scroll-trigger animation-multiple" id="section-join-hero">
              <div className="banner-inner">
                <div className="banner-bg">
                  <div className="banner-bg-inner banner-bg-desktop">
                    <img className="animation-target-scale-in" loading="lazy" src="team-join.jpg" alt="Hero background" style={{ filter: 'brightness(0.6)' }} />
                  </div>
                  <div className="banner-bg-inner banner-bg-mobile">
                    <img className="animation-target-scale-in" loading="lazy" src="team-join.jpg" alt="Hero background" style={{ filter: 'brightness(0.6)' }} />
                  </div>
                </div>
                <div className="banner-main">
                  <div className="banner-main-inner" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="banner-heading animation-target-slide-up animation-delay-0" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                      Join Sigma<br/>Investments
                    </h1>
                    
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Pathways Section */}
      <div id="signup-options" className="section-group" style={{ background: '#ffffff', padding: '4rem 0 8rem' }}>
        <div className="section-group-inner">
          <div className="section-group-content" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>

            {/* Club Member Sign-Up */}
            <div 
              data-aos="fade-up"
              style={{
                padding: '4rem 0',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '4rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 600, color: '#11253e', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  Club Member Sign-Up
                </h3>
              </div>
                  <div style={{ flex: '2 1 400px' }}>
                <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.7, margin: '0 0 2.5rem 0' }}>
                  Join our vibrant community of students passionate about finance and investing. Get access to exclusive events and networking opportunities.
                </p>
                {/* Apply for Membership button — hidden until backend is ready */}
                {/* <a
                  href="#"
                  style={{
                    display: 'inline-block',
                    background: '#940a11',
                    color: 'white',
                    padding: '1.1rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Apply for Membership
                </a> */}
                <p style={{
                  fontSize: '1.1rem',
                  color: '#94a3b8',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  Applications are currently paused. Please check back soon.
                </p>
              </div>
            </div>

            {/* Analyst Application */}
            <div 
              data-aos="fade-up"
              style={{
                padding: '4rem 0',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '4rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 600, color: '#11253e', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  Analyst Application
                </h3>
              </div>
              <div style={{ flex: '2 1 400px' }}>
                <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.7, margin: '0 0 2.5rem 0' }}>
                  Take an active role in managing our investment portfolio. Learn through practice in a highly professional environment.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#94a3b8',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  We are currently not recruiting new analysts.
                </p>
              </div>
            </div>

            {/* Investor Sign-up */}
            <div 
              data-aos="fade-up"
              style={{
                padding: '4rem 0',
                borderTop: '1px solid #e2e8f0',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '4rem',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 600, color: '#11253e', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  Investor Sign-up
                </h3>
              </div>
              <div style={{ flex: '2 1 400px' }}>
                <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: 1.7, margin: '0 0 2.5rem 0' }}>
                  Please find the sign-up document below to join us as a fund member. If you have any further questions please do not hesitate to reach out to our fund administration team!
                </p>
                {/* Register as Investor button — hidden until backend is ready */}
                {/* <a
                  href="#"
                  style={{
                    display: 'inline-block',
                    background: '#940a11',
                    color: 'white',
                    padding: '1.1rem 2.5rem',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Register as Investor
                </a> */}
                <p style={{
                  fontSize: '1.1rem',
                  color: '#94a3b8',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  Investor sign-ups are currently paused. Please check back soon.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
