import { useState, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
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

    const section = document.querySelector('#contact-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="section-group">
      <div className="section-group-inner bg-white">
        <div className="section-group-content">
          <section className="section-split-layout animation-scroll-trigger animation-multiple" id="contact-section">
            
            {/* Title Side */}
            <div className="section-split-title">
              <span style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#3d5fa6', marginBottom: '1.5rem', display: 'block' }}>Get in Touch</span>
              <h2 className="animation-target-slide-up animation-delay-0" style={{ fontSize: '4.5rem', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#11253e', marginBottom: '2rem' }}>Let's talk.</h2>
              <p style={{ fontSize: '1.35rem', lineHeight: 1.6, color: '#475569', maxWidth: '450px', fontWeight: 300 }}>
                Whether you're a prospective analyst looking to join our ranks, an alumni wanting to reconnect, or a corporate partner exploring collaboration.
              </p>
              <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '1rem', color: '#11253e', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Direct Inquiries</p>
                <a href="mailto:info@sigma-investments.com" style={{ fontSize: '1.25rem', color: '#3d5fa6', textDecoration: 'none', fontWeight: 500 }}>info@sigma-investments.com</a>
              </div>
            </div>

            {/* Form Side (Content) */}
            <div className="section-split-content animation-target-slide-up animation-delay-1" style={{ paddingTop: '1rem' }}>
              {isSuccess ? (
                <div className="contact-success-state" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1.5rem' }}>
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8v4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="16" r="0.5" fill="#94a3b8" stroke="#94a3b8" strokeWidth="1.5"/>
                  </svg>
                  <h3 style={{ fontSize: '2.5rem', color: '#11253e', marginBottom: '1rem', fontWeight: 300, letterSpacing: '-0.02em' }}>Currently Unavailable</h3>
                  <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: 1.6 }}>We're not receiving messages through this form at the moment. Please reach out to us directly at <a href="mailto:info@sigma-investments.com" style={{ color: '#3d5fa6' }}>info@sigma-investments.com</a>.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sigma-contact-form">
                  <div className="form-grid">
                    <div className="input-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-group full-width">
                      <label htmlFor="role">I am a...</label>
                      <div className="select-wrapper">
                        <select 
                          id="role" 
                          name="role" 
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="student">UM Student</option>
                          <option value="alumni">Sigma Alumni</option>
                          <option value="corporate">Corporate Partner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group full-width">
                      <label htmlFor="message">Your Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        required 
                        placeholder="How can we help you?"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="input-group full-width" style={{ marginTop: '2rem' }}>
                      <button 
                        type="submit" 
                        className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontSize: '1.25rem', padding: '1.5rem', background: '#11253e', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, transition: 'background-color 0.3s ease' }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '4px' }}>
                            <path d="M2 12L22 2L15 22L11 16L17 7L8 13L2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}
