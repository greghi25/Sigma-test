export default function LogoCarousel() {
  const logos = [
    { height: 28, alt: 'Altamar', src: '/AltamarCAM-Logo_RGB_COLOR-LOGO-1024x232.png' },
    { height: 26, alt: 'Bank of America', src: '/Bank_of_America_logo.svg.png' },
    { height: 32, alt: 'Jane Street', src: '/Jane_Street.png' },
  ];

  const renderLogos = () =>
    logos.map((logo, i) => (
      <img
        key={i}
        loading="eager"
        alt={logo.alt}
        src={logo.src}
        className="sliding-logo"
        style={{ height: `${logo.height}px`, width: 'auto' }}
      />
    ));

  return (
    <section className="section logo-infinite anim-slidefade-speed-4" data-aos="fade-up" data-aos-duration="1000">
      <div className="container-large text-align-center">
        <div className="logo-headline">Connected to the world's most prestigious financial institutions</div>
      </div>
      <div className="logos-wrapper">
        <div className="all-logos">{renderLogos()}</div>
        <div className="all-logos">{renderLogos()}</div>
      </div>
    </section>
  );
}
