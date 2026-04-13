import { useEffect, useRef } from 'react';

export default function Activities() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.activity-item');
    if (!items) return;

    const handlers = [];

    items.forEach(item => {
      const wrapper = item.querySelector('.activity-image-wrapper');
      let rafId = null;
      let cachedRect = null;

      const enterHandler = () => {
        // Cache rect once on enter instead of every mousemove
        cachedRect = item.getBoundingClientRect();
        const anims = ['showFirst', 'showSecond', 'showThird'];
        anims.sort(() => Math.random() - 0.5);
        item.style.setProperty('--anim-1', anims[0]);
        item.style.setProperty('--anim-2', anims[1]);
        item.style.setProperty('--anim-3', anims[2]);
      };

      const leaveHandler = () => {
        cachedRect = null;
        if (rafId) cancelAnimationFrame(rafId);
      };

      const moveHandler = (e) => {
        if (window.innerWidth < 1024 || !cachedRect) return;
        if (rafId) return; // throttle to one frame
        rafId = requestAnimationFrame(() => {
          rafId = null;
          wrapper.style.setProperty('--x', (e.clientX - cachedRect.left) + 'px');
          wrapper.style.setProperty('--y', (e.clientY - cachedRect.top) + 'px');
        });
      };

      item.addEventListener('mouseenter', enterHandler);
      item.addEventListener('mouseleave', leaveHandler);
      item.addEventListener('mousemove', moveHandler);
      handlers.push({ item, enterHandler, leaveHandler, moveHandler });
    });

    return () => {
      handlers.forEach(({ item, enterHandler, leaveHandler, moveHandler }) => {
        item.removeEventListener('mouseenter', enterHandler);
        item.removeEventListener('mouseleave', leaveHandler);
        item.removeEventListener('mousemove', moveHandler);
      });
    };
  }, []);

  return (
    <div className="section-group">
      <div 
        className="section-group-inner" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(18, 37, 63, 0.85), rgba(18, 37, 63, 0.85)), url("/newteam_img-hero-home.webp")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          overflow: 'visible', 
          zIndex: 5, 
          position: 'relative' 
        }}
      >
        <div className="section-group-content" style={{ overflow: 'visible' }}>
          <section className="activities-section animation-scroll-trigger animation-multiple" ref={sectionRef}>
            <div className="activities-left animation-target-slide-up animation-delay-0">
              <span className="activities-left-sub">02 / What We Do</span>
              <h2 className="activities-left-title">Our<br />Activities.</h2>
            </div>

            <div className="activities-right">
              {/* Project Item 1 */}
              <a href="/events" className="activity-item animation-target-slide-up animation-delay-1">
                <div className="activity-info">
                  <h3 className="activity-title">Weekly Meetings</h3>
                  <p className="activity-desc">Every Monday from 7pm, meetings are held consisting of market news, portfolio updates and stock pitches. Our industry- and specialized teams get to present their current equity research and valuations to a knowledgeable audience.</p>
                </div>
                <div className="activity-image-wrapper">
                  <img src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/68012072-74c7-4ba3-9db7-6e74fabef8d0/tempImageXlhXr5.jpg" alt="Activity Image 1" className="activity-image img-1" />
                  <img src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/a9f8cce4-35f8-4750-a99f-87f1385c97f7/348678308_986669812373124_310555175138703267_n.jpg" alt="Activity Image 2" className="activity-image img-2" />
                  <img src="weekly-meeting.jpg" alt="Activity Image 3" className="activity-image img-3" />
                  
                </div>
                <svg className="activity-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>

              {/* Project Item 2 */}
              <a href="/events" className="activity-item animation-target-slide-up animation-delay-2">
                <div className="activity-info">
                  <h3 className="activity-title">Corporate Events</h3>
                  <p className="activity-desc">Our skilled Analyst Teams create a unique value proposition for our corporate partners. Guest-talks, workshops and recruitment days accelerate our members start into a career in financial services &amp; banking, while giving companies unique access to Maastricht's top talent!</p>
                </div>
                <div className="activity-image-wrapper">
                  <img src="weekly-meetings-1.jpg" alt="Activity Image 1" className="activity-image img-1" />
                  <img src="corprate-event-1.jpg" alt="Activity Image 2" className="activity-image img-2" />
                  <img src="corprate-event-2.jpg" alt="Activity Image 3" className="activity-image img-3" />
                </div>
                <svg className="activity-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>

              {/* Project Item 3 */}
              <a href="/about" className="activity-item animation-target-slide-up animation-delay-3">
                <div className="activity-info">
                  <h3 className="activity-title">Social Gatherings</h3>
                  <p className="activity-desc">Collaborations with other student associations, dinners and networking drinks create a lasting friendship among our members. Every semester we organize informal activities for both club-members and analysts to enjoy!</p>
                </div>
                <div className="activity-image-wrapper">
                  <img src="social-1.jpg" alt="Activity Image 1" className="activity-image img-1" />
                  <img src="social-4.jpg" alt="Activity Image 2" className="activity-image img-2" />
                  <img src="social-3.jpg" alt="Activity Image 3" className="activity-image img-3" />
                </div>
                <svg className="activity-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
