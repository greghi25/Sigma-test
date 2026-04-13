import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles.css';

import Navbar from './components/Navbar';

import HeroBanner from './components/HeroBanner';
import LogoCarousel from './components/LogoCarousel';
import ScrollReveal from './components/ScrollReveal';
import Activities from './components/Activities';
import InvestmentStrategy from './components/InvestmentStrategy';
import ExpertiseFill from './components/ExpertiseFill';
import InvestmentPillars from './components/InvestmentPillars';
import ContactForm from './components/ContactForm';
import MissionGallery from './components/MissionGallery';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import FundPage from './components/FundPage';
import JoinPage from './components/JoinPage';
import PublicationsPage from './components/PublicationsPage';
import TeamPage from './components/TeamPage';
import EventsPage from './components/EventsPage';
import PrivacyPage from './components/PrivacyPage';
import CookiesPage from './components/CookiesPage';

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeroBanner />
      <LogoCarousel />
      <ScrollReveal />
      <Activities />
      <InvestmentPillars />
      <InvestmentStrategy />
      <ContactForm />
      <MissionGallery />
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <BrowserRouter>
      <div id="swup">

        <div id="Top" className="top-pg-link"></div>
        <Navbar />
        <a id="top"></a>
        <div id="container" className="transition-fade">
          <main id="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/fund" element={<FundPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/imprint" element={<CookiesPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
