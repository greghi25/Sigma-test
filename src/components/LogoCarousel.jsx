export default function LogoCarousel() {
  const logos = [
    { height: 38, alt: 'Salesforce', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/6928923a1fba7f9312eaeec0_sfdc.svg' },
    { height: 20, alt: 'Atlassian', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/6320fba733a864f6629cb830_atlassian_min.svg' },
    { height: 26, alt: 'Pennylane', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/64afea23d0afdf170f434ae3_pennylane_logo.svg' },
    { height: 32, alt: 'Carta', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/6320fba79298aa73f31735e5_carta_min.svg' },
    { height: 38, alt: 'Salesforce', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/6928923a1fba7f9312eaeec0_sfdc.svg' },
    { height: 36, alt: 'AngelList', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/6320fba731f65442e4a93329_angellist_min.svg' },
    { height: 26, alt: 'Pennylane', src: 'https://cdn.prod.website-files.com/61d72a2cda50bc679e28766b/64afea23d0afdf170f434ae3_pennylane_logo.svg' },
  ];

  const renderLogos = () =>
    logos.map((logo, i) => (
      <img
        key={i}
        loading="eager"
        height={logo.height}
        alt={logo.alt}
        src={logo.src}
        className="sliding-logo"
      />
    ));

  return (
    <section className="section logo-infinite anim-slidefade-speed-4" data-aos="fade-up" data-aos-duration="1000">
      <div className="container-large text-align-center">
        <div className="logo-headline">Empowering exceptional talent across a global network of industry leaders</div>
      </div>
      <div className="logos-wrapper">
        <div className="all-logos">{renderLogos()}</div>
        <div className="all-logos">{renderLogos()}</div>
      </div>
    </section>
  );
}
