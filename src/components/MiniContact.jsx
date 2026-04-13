import { useState } from 'react';

export default function MiniContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', role: 'student', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="section-group">
      <div className="section-group-inner bg-white">
        <div className="section-group-content" style={{ padding: '5rem 0' }}>
          <div
            data-aos="fade-up"
            className="mini-contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'stretch',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
            }}
          >
            {/* Left — Form */}
            <div style={{ padding: '3rem 3rem' }}>
              {isSuccess ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1.5rem' }}>
                    <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="#3d5fa6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="#3d5fa6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 style={{ fontSize: '2rem', color: '#11253e', marginBottom: '1rem', fontWeight: 300 }}>Message Sent!</h3>
                  <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.6 }}>Thank you for reaching out. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sigma-contact-form">
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#3d5fa6',
                    marginBottom: '0.5rem',
                    display: 'block',
                  }}>Get in Touch</span>
                  <h3 style={{ fontSize: '2rem', fontWeight: 300, color: '#11253e', marginBottom: '2rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    Contact Us
                  </h3>
                  <div className="form-grid">
                    <div className="input-group">
                      <label htmlFor="mini-name">Full Name</label>
                      <input type="text" id="mini-name" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="mini-email">Email Address</label>
                      <input type="email" id="mini-email" name="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="input-group full-width">
                      <label htmlFor="mini-role">I am a...</label>
                      <div className="select-wrapper">
                        <select id="mini-role" name="role" value={formData.role} onChange={handleChange}>
                          <option value="student">UM Student</option>
                          <option value="alumni">Sigma Alumni</option>
                          <option value="corporate">Corporate Partner</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group full-width">
                      <label htmlFor="mini-message">Your Message</label>
                      <textarea id="mini-message" name="message" required placeholder="How can we help you?" rows="3" value={formData.message} onChange={handleChange}></textarea>
                    </div>
                    <div className="input-group full-width" style={{ marginTop: '1rem' }}>
                      <button
                        type="submit"
                        className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                          width: '100%', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          fontSize: '1rem', padding: '1.1rem', background: '#11253e', color: '#ffffff',
                          textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
                          transition: 'background-color 0.3s ease',
                        }}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12L22 2L15 22L11 16L17 7L8 13L2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right — Image */}
            <div className="mini-contact-image" style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/19508b10-9f27-4a32-9d48-c4eb48a87229/Board.jpeg"
                alt="Sigma Investments team"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
