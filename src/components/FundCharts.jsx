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

  // Many connection arcs representing 86+ nationalities
  const arcsData = [
    // From Maastricht (home base) to all continents
    { startLat: 50.8, startLng: 4.3, endLat: 40.7, endLng: -74.0, color: '#01A3B5' },    // NYC
    { startLat: 50.8, startLng: 4.3, endLat: 34.0, endLng: -118.2, color: '#01A3B5' },  // LA
    { startLat: 50.8, startLng: 4.3, endLat: 35.7, endLng: 139.7, color: '#01A3B5' },   // Tokyo
    { startLat: 50.8, startLng: 4.3, endLat: 31.2, endLng: 121.5, color: '#01A3B5' },   // Shanghai
    { startLat: 50.8, startLng: 4.3, endLat: 1.3, endLng: 103.8, color: '#01A3B5' },    // Singapore
    { startLat: 50.8, startLng: 4.3, endLat: -33.9, endLng: 151.2, color: '#01A3B5' },  // Sydney
    { startLat: 50.8, startLng: 4.3, endLat: -23.5, endLng: -46.6, color: '#01A3B5' },  // São Paulo
    { startLat: 50.8, startLng: 4.3, endLat: 19.4, endLng: -99.1, color: '#01A3B5' },   // Mexico City
    { startLat: 50.8, startLng: 4.3, endLat: 28.6, endLng: 77.2, color: '#01A3B5' },    // Delhi
    { startLat: 50.8, startLng: 4.3, endLat: -33.9, endLng: 18.4, color: '#01A3B5' },   // Cape Town
    { startLat: 50.8, startLng: 4.3, endLat: 55.8, endLng: 37.6, color: '#01A3B5' },    // Moscow
    { startLat: 50.8, startLng: 4.3, endLat: -1.3, endLng: 36.8, color: '#01A3B5' },    // Nairobi
    { startLat: 50.8, startLng: 4.3, endLat: 25.3, endLng: 55.3, color: '#01A3B5' },    // Dubai
    { startLat: 50.8, startLng: 4.3, endLat: -34.6, endLng: -58.4, color: '#01A3B5' },  // Buenos Aires
    
    // Inter-continental connections
    { startLat: 40.7, startLng: -74.0, endLat: 51.5, endLng: -0.1, color: '#11253e' },  // NYC-London
    { startLat: 40.7, startLng: -74.0, endLat: 35.7, endLng: 139.7, color: '#11253e' }, // NYC-Tokyo
    { startLat: 51.5, startLng: -0.1, endLat: 1.3, endLng: 103.8, color: '#11253e' },   // London-Singapore
    { startLat: 35.7, startLng: 139.7, endLat: 1.3, endLng: 103.8, color: '#3d5fa6' },  // Tokyo-Singapore
    { startLat: 31.2, startLng: 121.5, endLat: 22.3, endLng: 114.2, color: '#3d5fa6' }, // Shanghai-HK
    { startLat: 28.6, startLng: 77.2, endLat: 25.3, endLng: 55.3, color: '#3d5fa6' },   // Delhi-Dubai
    { startLat: -23.5, startLng: -46.6, endLat: -34.6, endLng: -58.4, color: '#3d5fa6' }, // São Paulo-Buenos Aires
    { startLat: 34.0, startLng: -118.2, endLat: 19.4, endLng: -99.1, color: '#3d5fa6' }, // LA-Mexico City
  ];

  // Major cities as points
  const pointsData = [
    { lat: 50.8, lng: 4.3, size: 0.6, color: '#940a11' },   // Maastricht (home)
    { lat: 40.7, lng: -74.0, size: 0.4, color: '#01A3B5' }, // NYC
    { lat: 51.5, lng: -0.1, size: 0.4, color: '#01A3B5' },  // London
    { lat: 35.7, lng: 139.7, size: 0.4, color: '#01A3B5' }, // Tokyo
    { lat: 1.3, lng: 103.8, size: 0.4, color: '#01A3B5' },  // Singapore
    { lat: 31.2, lng: 121.5, size: 0.3, color: '#3d5fa6' }, // Shanghai
    { lat: -33.9, lng: 151.2, size: 0.3, color: '#3d5fa6' }, // Sydney
    { lat: 28.6, lng: 77.2, size: 0.3, color: '#3d5fa6' },  // Delhi
    { lat: 25.3, lng: 55.3, size: 0.3, color: '#3d5fa6' },  // Dubai
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
