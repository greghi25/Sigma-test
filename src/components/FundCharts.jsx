import { useEffect, useRef, useState } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import Globe from 'react-globe.gl';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

export default function FundCharts({ footerText = null }) {
  const assetsCanvasRef = useRef(null);
  const sectionRef = useRef(null);
  const globeEl = useRef();
  const globeContainerRef = useRef(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [globeSize, setGlobeSize] = useState({ width: 400, height: 400 });
  const [hexData, setHexData] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(countries => {
        setHexData(countries.features);
      })
      .catch(err => console.error("Could not load globe data", err));
  }, []);

  // Connection arcs representing 86+ nationalities across all continents
  const arcsData = [
    { startLat: 50, startLng: 10, endLat: 40, endLng: -100, color: '#01A3B5' },   // Europe → North America
    { startLat: 50, startLng: 10, endLat: 30, endLng: 105, color: '#01A3B5' },    // Europe → Asia
    { startLat: 40, startLng: -100, endLat: 30, endLng: 105, color: '#01A3B5' },  // North America → Asia
    { startLat: 50, startLng: 10, endLat: -15, endLng: 25, color: '#3d5fa6' },    // Europe → Africa
    { startLat: 50, startLng: 10, endLat: -25, endLng: -55, color: '#3d5fa6' },   // Europe → South America
    { startLat: 30, startLng: 105, endLat: -25, endLng: 135, color: '#3d5fa6' },  // Asia → Australia
    { startLat: 40, startLng: -100, endLat: -25, endLng: -55, color: '#3d5fa6' }, // North America → South America
    { startLat: 30, startLng: 105, endLat: -15, endLng: 25, color: '#3d5fa6' },   // Asia → Africa
  ];

  // Region markers
  const pointsData = [
    { lat: 50, lng: 10, size: 0.5, color: '#940a11' },    // Europe
    { lat: 40, lng: -100, size: 0.4, color: '#01A3B5' },  // North America
    { lat: 30, lng: 105, size: 0.4, color: '#01A3B5' },   // Asia
    { lat: -15, lng: 25, size: 0.4, color: '#3d5fa6' },   // Africa
    { lat: -25, lng: -55, size: 0.4, color: '#3d5fa6' },  // South America
    { lat: -25, lng: 135, size: 0.4, color: '#3d5fa6' },  // Australia
  ];

  useEffect(() => {
    if (globeEl.current && globeReady) {
      const controls = globeEl.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
      controls.minDistance = 300;
      controls.maxDistance = 300;
      
      // Set initial view with matching distance
      globeEl.current.pointOfView({ lat: 20, lng: 10, altitude: 2 }, 0);
    }
  }, [globeReady]);

  useEffect(() => {
    let lastWidth = 0;
    const updateGlobeSize = () => {
      if (globeContainerRef.current) {
        const rect = globeContainerRef.current.getBoundingClientRect();
        if (Math.abs(rect.width - lastWidth) > 5 || lastWidth === 0) {
          lastWidth = rect.width;
          setGlobeSize({ width: rect.width, height: rect.height });
        }
      }
    };

    updateGlobeSize();
    window.addEventListener('resize', updateGlobeSize);
    return () => window.removeEventListener('resize', updateGlobeSize);
  }, []);

  useEffect(() => {
    let assetsChart = null;

    if (assetsCanvasRef.current) {
      const assetsCtx = assetsCanvasRef.current.getContext('2d');
      assetsChart = new Chart(assetsCtx, {
        type: 'doughnut',
        data: {
          labels: ['Industrials', 'Technology', 'Healthcare', 'Financial Services', 'Real Estate', 'Consumer Goods', 'Cash'],
          datasets: [{
            data: [28, 22, 16, 14, 10, 6, 4],
            backgroundColor: ['#11253e', '#2a4476', '#3d5fa6', '#5d85d7', '#475569', '#94a3b8', '#cbd5e1'],
            borderColor: '#ffffff',
            borderWidth: 2,
            borderRadius: 3
          }]
        },
        options: {
          cutout: '75%',
          responsive: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          animation: { animateRotate: true, duration: 1800 }
        }
      });
    }

    return () => {
      if (assetsChart) assetsChart.destroy();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animTargets = section.querySelectorAll('.geo-card.anim-left, .geo-card.anim-right');

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animTargets.forEach(function (el) {
            el.classList.add('is-visible');
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-group">
      <div className="section-group-inner bg-white">
        <div className="section-group-content">
          <section className="geo-section" id="fund-strategy-section" ref={sectionRef}>
            <div className="geo-inner">
              <div className="geo-grid">
                
                {/* LEFT: Geographical Globe */}
                <div className="geo-card anim-right">
                  <h3 className="geo-card-title">Geographical Diversification</h3>
                  <div className="assets-donut-wrap">
                    <div ref={globeContainerRef} style={{ width: '400px', height: '400px', maxWidth: '100%', position: 'relative', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, touchAction: 'pan-y' }}>
                      <Globe
                        ref={globeEl}
                        backgroundColor="rgba(255,255,255,1)"
                        showGlobe={true}
                        globeColor="#ffffff"
                        
                        hexPolygonsData={hexData}
                        hexPolygonResolution={3}
                        hexPolygonMargin={0.3}
                        hexPolygonColor={() => '#e2e8f0'}
                        
                        arcsData={arcsData}
                        arcColor="color"
                        arcDashLength={0.6}
                        arcDashGap={0.3}
                        arcDashAnimateTime={2500}
                        arcStroke={0.8}
                        
                        pointsData={pointsData}
                        pointAltitude={0.01}
                        pointRadius="size"
                        pointColor="color"
                        
                        atmosphereColor="#01A3B5"
                        atmosphereAltitude={0.12}
                        
                        onGlobeReady={() => setGlobeReady(true)}
                        
                        width={globeSize.width}
                        height={globeSize.height}
                      />
                    </div>
                    
                    <div className="assets-legend" style={{ marginLeft: '0.5rem' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ margin: 0, fontWeight: 600, color: '#11253e', fontSize: '0.95rem', marginBottom: '0.2rem' }}>86+ nationalities</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>Drag to explore</p>
                      </div>
                      
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#11253e' }}></span> North America</div>
                        <span className="assets-legend-pct">55%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#3d5fa6' }}></span> Europe</div>
                        <span className="assets-legend-pct">37%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#cbd5e1' }}></span> Asia</div>
                        <span className="assets-legend-pct">9%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Strategic Assets */}
                <div className="geo-card anim-left">
                  <h3 className="geo-card-title">Strategic Assets</h3>
                  <div className="assets-donut-wrap">
                    <canvas id="assetsDonut" width="220" height="220" className="assets-donut-canvas" ref={assetsCanvasRef}></canvas>
                    <div className="assets-legend" style={{ marginLeft: '1rem' }}>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#11253e' }}></span> Industrials</div>
                        <span className="assets-legend-pct">28%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#2a4476' }}></span> Technology</div>
                        <span className="assets-legend-pct">22%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#3d5fa6' }}></span> Healthcare</div>
                        <span className="assets-legend-pct">16%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#5d85d7' }}></span> Financial Services</div>
                        <span className="assets-legend-pct">14%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#475569' }}></span> Real Estate</div>
                        <span className="assets-legend-pct">10%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#94a3b8' }}></span> Consumer Goods</div>
                        <span className="assets-legend-pct">6%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#cbd5e1' }}></span> Cash</div>
                        <span className="assets-legend-pct">4%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              {footerText && (
                <div data-aos="fade-up" data-aos-delay="200" style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center', fontStyle: 'italic', maxWidth: '800px', margin: '3rem auto 0' }}>
                  {footerText}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
