import { useEffect } from 'react';
import MiniContact from './MiniContact';

import boardImg from '../assets/team/board.jpg';
import marketingImg from '../assets/team/marketing.jpg';
import industrialsImg from '../assets/team/industrials.jpg';
import consumerGoodsImg from '../assets/team/consumer-goods.jpg';
import tmtImg from '../assets/team/tmt.jpg';
import healthcareImg from '../assets/team/healthcare.jpg';
import fsreImg from '../assets/team/fsre.jpg';
import fundImg from '../assets/team/fund.jpg';
import technicalAnalysisImg from '../assets/team/technical-analysis.jpg';
import riskImg from '../assets/team/risk.jpg';
import sustainabilityImg from '../assets/team/sustainability.jpg';
import internalImg from '../assets/team/internal.jpg';
import externalImg from '../assets/team/external.jpg';

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teams = [
    {
      title: "Our Board",
      members: "Giovanni, Paul, Kerem, Nelle, Vansh, Alva",
      image: boardImg
    },
    {
      title: "Marketing Committee",
      members: "Alva, Antonia, Blanca, Margherita, Wiktoria, Caroline",
      image: marketingImg
    },
    {
      title: "Industrials & Energy",
      members: "Francisca, Max, Isabelle, Jonathan, Nick",
      image: industrialsImg
    },
    {
      title: "Consumer Goods",
      members: "Lucas, Max, Giada, Ignacio, Konstancja",
      image: consumerGoodsImg
    },
    {
      title: "Technology, Media & Telecommunications",
      members: "Eva, Elias, Finn, Conrad, Paul",
      image: tmtImg
    },
    {
      title: "Healthcare",
      members: "Camilla, Giuseppe, Florian, Jan, Carmen",
      image: healthcareImg
    },
    {
      title: "Financial Services & Real Estate",
      members: "Falko, Jiline, Moritz, Leonard, Manuel",
      image: fsreImg
    },
    {
      title: "Fund Administration",
      members: "Kerem, Paul, Rebecca, Igor, Gregorio, Luise",
      image: fundImg
    },
    {
      title: "Technical Analysis",
      members: "Valère, Mobin, Alicia, Ole, Nils",
      image: technicalAnalysisImg
    },
    {
      title: "Quant Team",
      members: "Sergejs, Igor, Maria, Artur, Ana, Sara",
      image: riskImg
    },
    {
      title: "Sustainability",
      members: "Nina, Joséphine, Valentine, Nadine",
      image: sustainabilityImg
    },
    {
      title: "Internal",
      members: "Ben, Manuel, Paul",
      image: internalImg
    },
    {
      title: "External",
      members: "Nelle, Margherita, Wiktoria, Alva, Wojciech",
      image: externalImg
    }
  ];

  return (
    <div id="swup">
      

      <div className="section-group">
        <div className="section-group-inner bg-white">
          <div className="section-group-content">
            <section className="section-heading has-underline" id="section-10" data-aos="fade-up" data-aos-duration="1000">
              <h2 className="section-heading-heading">Departments & Committees</h2>
            </section>

            {teams.map((team, index) => {
              const isEven = index % 2 === 0;

              return (
                <section 
                  key={index}
                  className="section-halves body-small mobile-normal" 
                  id={`section-team-${index}`}
                  style={{ overflow: 'hidden' }}
                >
                  {!isEven ? (
                    <>
                      <div className="section-halves-image-half" data-aos="fade-right" data-aos-duration="1200">
                        {team.image ? (
                          <>
                            <img className="desktop" loading="lazy" src={team.image} alt={team.title} />
                            <img className="mobile" loading="lazy" src={team.image} alt={team.title} />
                          </>
                        ) : (
                          <div style={{ width: '100%', aspectRatio: '4/3', background: '#e8edf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2.5rem', color: '#3d5fa6', opacity: 0.4 }}>📷</span>
                            <span style={{ color: '#3d5fa6', fontWeight: 600, opacity: 0.5, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Photo Coming Soon</span>
                          </div>
                        )}
                      </div>
                      <div className="section-halves-text-half" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
                        <h3 className="section-halves-text-heading">{team.title}</h3>
                        <div className="section-halves-text-lower">
                          <div className="section-halves-text-body wysiwyg">
                             <p style={{ 
                               fontSize: '1rem', 
                               color: '#3d5fa6', 
                               fontWeight: 700, 
                               textTransform: 'uppercase', 
                               letterSpacing: '0.1em',
                               marginBottom: '0.75rem'
                             }}>
                               Team Members
                             </p>
                             <p style={{
                               fontSize: '1.4rem',
                               lineHeight: 1.6,
                               color: '#475569'
                             }}>
                               {team.members}
                             </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="section-halves-text-half" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="200">
                        <h3 className="section-halves-text-heading">{team.title}</h3>
                        <div className="section-halves-text-lower">
                          <div className="section-halves-text-body wysiwyg">
                             <p style={{ 
                               fontSize: '1rem', 
                               color: '#3d5fa6', 
                               fontWeight: 700, 
                               textTransform: 'uppercase', 
                               letterSpacing: '0.1em',
                               marginBottom: '0.75rem'
                             }}>
                               Team Members
                             </p>
                             <p style={{
                               fontSize: '1.4rem',
                               lineHeight: 1.6,
                               color: '#475569'
                             }}>
                               {team.members}
                             </p>
                          </div>
                        </div>
                      </div>
                      <div className="section-halves-image-half" data-aos="fade-left" data-aos-duration="1200">
                        {team.image ? (
                          <>
                            <img className="desktop" loading="lazy" src={team.image} alt={team.title} />
                            <img className="mobile" loading="lazy" src={team.image} alt={team.title} />
                          </>
                        ) : (
                          <div style={{ width: '100%', aspectRatio: '4/3', background: '#e8edf5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ fontSize: '2.5rem', color: '#3d5fa6', opacity: 0.4 }}>📷</span>
                            <span style={{ color: '#3d5fa6', fontWeight: 600, opacity: 0.5, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Photo Coming Soon</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>

      <MiniContact />
    </div>
  );
}
