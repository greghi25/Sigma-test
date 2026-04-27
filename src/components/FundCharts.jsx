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

  // Connection arcs reflecting portfolio country exposure
  const arcsData = [
    { startLat: 52.3, startLng: 5.3, endLat: 38, endLng: -97, color: '#01A3B5' },    // NL → US
    { startLat: 51.2, startLng: 10.4, endLat: 38, endLng: -97, color: '#01A3B5' },   // DE → US
    { startLat: 46.8, startLng: 8.2, endLat: 38, endLng: -97, color: '#3d5fa6' },    // CH → US
    { startLat: 52.3, startLng: 5.3, endLat: 36.2, endLng: 138.3, color: '#3d5fa6' }, // NL → JP
    { startLat: 38, startLng: -97, endLat: 36.2, endLng: 138.3, color: '#3d5fa6' },  // US → JP
  ];

  // Country markers matching portfolio holdings
  const pointsData = [
    { lat: 38, lng: -97, size: 0.6, color: '#11253e' },   // United States
    { lat: 52.3, lng: 5.3, size: 0.4, color: '#2a4476' }, // Netherlands
    { lat: 51.2, lng: 10.4, size: 0.3, color: '#3d5fa6' }, // Germany
    { lat: 53.3, lng: -8.2, size: 0.3, color: '#5d85d7' }, // Ireland
    { lat: 40.4, lng: -3.7, size: 0.3, color: '#7ba3e8' }, // Spain
    { lat: 46.8, lng: 8.2, size: 0.3, color: '#475569' },  // Switzerland
    { lat: 46.2, lng: 2.2, size: 0.3, color: '#94a3b8' },  // France
    { lat: 36.2, lng: 138.3, size: 0.3, color: '#cbd5e1' }, // Japan
    { lat: 56.3, lng: 9.5, size: 0.2, color: '#e2e8f0' },  // Denmark
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
          labels: ['Technology, Media & Telecom', 'Financial Services', 'Healthcare', 'Cash', 'Consumer Goods', 'Industrials', 'Real Estate'],
          datasets: [{
            data: [24.29, 14.88, 14.60, 13.75, 13.03, 12.46, 6.98],
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
                        <p style={{ margin: 0, fontWeight: 600, color: '#11253e', fontSize: '0.95rem', marginBottom: '0.2rem' }}>Portfolio by country</p>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>Drag to explore</p>
                      </div>

                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#11253e' }}></span> United States</div>
                        <span className="assets-legend-pct">71.1%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#2a4476' }}></span> Netherlands</div>
                        <span className="assets-legend-pct">8.7%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#3d5fa6' }}></span> Germany</div>
                        <span className="assets-legend-pct">4.5%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#5d85d7' }}></span> Ireland</div>
                        <span className="assets-legend-pct">4.3%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#7ba3e8' }}></span> Spain</div>
                        <span className="assets-legend-pct">4.2%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#475569' }}></span> Switzerland</div>
                        <span className="assets-legend-pct">2.6%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#94a3b8' }}></span> France</div>
                        <span className="assets-legend-pct">2.0%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#cbd5e1' }}></span> Japan</div>
                        <span className="assets-legend-pct">1.8%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#e2e8f0' }}></span> Denmark</div>
                        <span className="assets-legend-pct">0.9%</span>
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
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#11253e' }}></span> Technology, Media & Telecom</div>
                        <span className="assets-legend-pct">24.29%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#2a4476' }}></span> Financial Services</div>
                        <span className="assets-legend-pct">14.88%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#3d5fa6' }}></span> Healthcare</div>
                        <span className="assets-legend-pct">14.60%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#5d85d7' }}></span> Cash</div>
                        <span className="assets-legend-pct">13.75%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#475569' }}></span> Consumer Goods</div>
                        <span className="assets-legend-pct">13.03%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#94a3b8' }}></span> Industrials</div>
                        <span className="assets-legend-pct">12.46%</span>
                      </div>
                      <div className="assets-legend-item">
                        <div className="assets-legend-left"><span className="assets-dot" style={{ background: '#cbd5e1' }}></span> Real Estate</div>
                        <span className="assets-legend-pct">6.98%</span>
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
