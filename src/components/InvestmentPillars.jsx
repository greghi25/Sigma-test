import { useState } from 'react';

const faqs = [
  {
    question: "I am new to Maastricht and UM, how can I participate?",
    answer: "We highly encourage you to join as a general member and attend our weekly pitches and events. This is possible throughout the year. Furthermore, analyst applications open twice a year."
  },
  {
    question: "What is your primary language of communication?",
    answer: "Due to the fact that we have highly diverse members and analysts our communication is in English."
  },
  {
    question: "How would you describe Sigma's investment philosophy?",
    answer: "At Sigma Investments, our investment philosophy centers on sustainable growth and risk diversification. We believe in achieving long-term, responsible growth that aligns with both financial goals and societal values. Our approach features a strong emphasis on maintaining a well-balanced portfolio, essential for navigating market complexities and achieving sustainable returns. Integral to our strategy is our specialized Risk Team, consisting of skilled professionals who diligently manage investment risks and ensure the stability and growth of our portfolio."
  }
];

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <li className="section-list-item">
      <div className="section-list-item-inner text-left-aligned">
        <div className={`title-wrapper${isOpen ? ' opened' : ''}`} onClick={onToggle}>
          <p className="title">{question}</p>
          <span className="action-icon">
            <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
              <line x1="6" y1="16" x2="26" y2="16" stroke="#01A3B5" strokeWidth="2.5" strokeLinecap="round"/>
              <line
                x1="16" y1="6" x2="16" y2="26"
                stroke="#01A3B5" strokeWidth="2.5" strokeLinecap="round"
                style={{ transition: 'transform 0.25s ease, opacity 0.25s ease', transformOrigin: '16px 16px', transform: isOpen ? 'scaleY(0)' : 'scaleY(1)', opacity: isOpen ? 0 : 1 }}
              />
            </svg>
          </span>
        </div>
        <div className="text-wrapper" style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.28s ease' }}>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ marginTop: '0.5rem' }}>{answer}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section className="section-list colour-light animation-scroll-trigger animation-multiple style-accordeon-react" id="section-13">
      <ul className="section-list-list">
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </ul>
    </section>
  );
}

export default function InvestmentPillars() {
  const [activeIndex, setActiveIndex] = useState(2); // Default to Sector Diversification (3rd item)

  const pillars = [
    {
      title: "Fundamental Analysis",
      description: "Every investment decision begins with deep, bottom-up research. Our analysts evaluate financial statements, competitive positioning, and intrinsic value to identify equities trading below their true worth building conviction through rigorous due diligence rather than market sentiment.",
      delay: 0
    },
    {
      title: "Risk-Adjusted Returns",
      description: "Capital preservation is the foundation of long-term outperformance. We employ systematic risk management frameworks including position sizing, stop-loss discipline, and correlation analysis to minimize portfolio variability while maximizing alpha generation.",
      delay: 1
    },
    {
      title: "Sector Diversification",
      description: "Our portfolio spans industrials, technology, healthcare, financial services, and beyond. By maintaining strategic allocation across uncorrelated sectors, we reduce concentration risk and capture growth opportunities wherever the strongest fundamentals emerge.",
      delay: 2
    },
    {
      title: "Academic Integration",
      description: "As Maastricht University's premier student-managed fund, we bridge classroom theory with real-world practice. Our members apply academic research in quantitative finance, behavioural economics, and portfolio theory to enhance investment decision-making and develop the next generation of financial professionals.",
      delay: 3
    }
  ];

  return (
    <div className="section-group">
      <div className="section-group-inner bg-white">
        <div className="section-group-content">
          <section className="section-rows heading-large body-clamp-on has-underline" id="section-9">
            <div className="section-rows-item animation-scroll-trigger animation-multiple">
              <h3 className="section-rows-heading animation-target-slide-up animation-delay-0" style={{ fontFamily: "'Outfit', sans-serif", color: '#11253e' }}>Our Investment Pillars</h3>
              <div className="section-rows-body wysiwyg animation-target-slide-up animation-delay-1">
                <p style={{ fontFamily: "'Outfit', sans-serif" }}>Our disciplined approach to equity investing is rooted in fundamental analysis and value-driven conviction. Through rigorous research and active portfolio management, Sigma's student analysts identify mispriced opportunities across global equity markets while maintaining robust risk controls.</p>
              </div>
            </div>
          </section>
          <section className="section-expander images-off items-4 animation-scroll-trigger animation-multiple" id="section-10">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className={`section-expander-item ${activeIndex === index ? 'active' : ''} animation-target-slide-up animation-delay-${pillar.delay}`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="section-expander-item-main">
                  <h3 className="section-expander-item-heading" style={{ fontFamily: "'Outfit', sans-serif" }}>{pillar.title}</h3>
                  <div className="section-expander-item-lower">
                    <div className="section-expander-item-body wysiwyg">
                      <p style={{ fontFamily: "'Outfit', sans-serif" }}>{pillar.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className="section-image inside animation-scroll-trigger animation-multiple" id="section-11">
            <div className="section-image-inner">
              <img className="desktop animation-target animation-target-scale-in" loading="lazy" src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/7d2f2407-1625-4e02-97c6-e913e288febc/pexels-david-besh-879356.jpg" alt="" />
              <img className="mobile animation-target animation-target-scale-in" loading="lazy" src="https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/7d2f2407-1625-4e02-97c6-e913e288febc/pexels-david-besh-879356.jpg" alt="" />
            </div>
          </section>

          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
