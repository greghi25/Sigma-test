import { useEffect } from 'react';
import MiniContact from './MiniContact';

export default function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teams = [
    {
      title: "Our Board",
      members: "Ben, Lauri, Milan, Tom, Jakob, Zuzanna, Irene, Milan",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/77ee5583-893e-42e6-b04b-837af3193d4b/Board.jpg?format=1000w"
    },
    {
      title: "Marketing Committee",
      members: "Sarah, Marie-Julie, Zuzanna, Giulia, Lucas",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/c0beac80-3fb0-40f2-8d07-afe0cdfad3b6/Commitee.jpeg?format=1500w"
    },
    {
      title: "Industrials & Energy",
      members: "Johannes, Alexander, Jacopo, Leif",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/41068ccb-5ca3-4388-b99d-13fc4e86e202/I%26E.JPG?format=1500w"
    },
    {
      title: "Consumer Goods",
      members: "Jasper, Domenico, Anna, Maximilian",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/67283690-e0fe-45f8-bc7a-b1d964e510d1/ConsumerGoods.JPG?format=1500w"
    },
    {
      title: "Technology, Media & Telecommunications",
      members: "Mats, Constantin, Bruno, Rieke",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/d8a67050-ec08-47b0-a198-db97edfeb9b9/TMT.JPG?format=1500w"
    },
    {
      title: "Healthcare",
      members: "Conrad, Marina, Theo, Nico",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/f528bd7b-fffa-4a2f-9f6c-18ee71b47e0d/Healthcare.JPG?format=1000w"
    },
    {
      title: "Financial Services & Real Estate",
      members: "Fritz, Beatriz, Maxime, Bendix",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/81ef33fc-539e-4d16-ab76-6a02ff1d3c40/FSRE.JPG?format=1000w"
    },
    {
      title: "Fund Administration",
      members: "Jakob, Milkias, Henry, Niccolò, Lauri",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/2387d434-e0b8-4e63-ba97-621e007053d6/Fund.JPG?format=1000w"
    },
    {
      title: "Technical Analysis",
      members: "Julian, Emanuele, Paul, Moritz, Quentin",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/8001f316-6398-44bb-8bbf-bc9a8a570500/TA.JPG?format=1000w"
    },
    {
      title: "Risk",
      members: "Maximilian, Max, Giovanni, Nathan",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/0433cc4c-3c0f-4731-bf2e-dd3566f54e79/Risk.JPG?format=1000w"
    },
    {
      title: "Sustainability",
      members: "Vadim, Rebecca, Margherita, Federico",
      image: "https://images.squarespace-cdn.com/content/v1/65229dc1d74b6e6f6d36dfb0/ba8f7ced-a047-4f69-9daf-624296f675fb/Sustainability.JPG?format=1500w"
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
                        <img className="desktop" loading="lazy" src={team.image} alt={team.title} />
                        <img className="mobile" loading="lazy" src={team.image} alt={team.title} />
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
                        <img className="desktop" loading="lazy" src={team.image} alt={team.title} />
                        <img className="mobile" loading="lazy" src={team.image} alt={team.title} />
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
