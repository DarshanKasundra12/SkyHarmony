import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LocomotiveScroll from "locomotive-scroll";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import CustomCursor from "./components/CustomCursor";
import "./styles/global.css";
import "./styles/components.css";

const AppContent = () => {
  const location = useLocation();
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    // Initializing Locomotive Scroll
    const scrollInstance = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      lerp: 0.1,
      multiplier: 1,
      touchMultiplier: 2,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    setScroll(scrollInstance);

    // Refresh scroll on route change
    setTimeout(() => {
      scrollInstance.update();
      window.scrollTo(0, 0);
    }, 500);

    return () => {
      if (scrollInstance) scrollInstance.destroy();
    };
  }, [location.pathname]);

  return (
    <div data-scroll-container>
      <CustomCursor />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>

      <footer className="footer-ultra">
        {/* Animated Aurora Glow Background (Totally new visual effect) */}
        <div className="footer-aurora-bg" />

        {/* Native CSS Infinite Horizontal Scroll Marquee */}
        <div className="marquee-wrapper">
          <div className="marquee-content">
            <span>BALAJI SKY HARMONY</span>
            <span className="marquee-dot">•</span>
            <span>ULTRA LUXURY LIVING</span>
            <span className="marquee-dot">•</span>
            <span>ARCHITECTURAL BRILLIANCE</span>
            <span className="marquee-dot">•</span>
            <span>BALAJI SKY HARMONY</span>
            <span className="marquee-dot">•</span>
            <span>ULTRA LUXURY LIVING</span>
            <span className="marquee-dot">•</span>
            {/* Duplicated for seamless infinite loop */}
            <span>BALAJI SKY HARMONY</span>
            <span className="marquee-dot">•</span>
            <span>ULTRA LUXURY LIVING</span>
            <span className="marquee-dot">•</span>
            <span>ARCHITECTURAL BRILLIANCE</span>
            <span className="marquee-dot">•</span>
          </div>
        </div>

        <div className="container footer-content-grid">
          {/* Added Newsletter Subscription Content */}
          <div className="f-exclusive-club">
            <h3 className="f-sub-title">JOIN THE ELITE CIRCLE</h3>
            <p className="f-sub-desc">
              Subscribe for private pre-launch events and high-end real estate
              insights.
            </p>
            <div className="f-sub-form">
              <input
                type="email"
                placeholder="Enter your private email"
                className="f-sub-input"
              />
              <motion.button
                className="f-sub-btn"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#fff",
                  color: "#000",
                }}
                whileTap={{ scale: 0.95 }}
              >
                PLEDGE
              </motion.button>
            </div>
          </div>

          <div className="f-links-grid">
            {/* <div className="f-link-column">
              <h4 className="f-col-header">PROPERTIES</h4>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Ongoing Projects
              </motion.a>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Completed Projects
              </motion.a>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Future Visions
              </motion.a>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Commercial Spaces
              </motion.a>
            </div>

            <div className="f-link-column">
              <h4 className="f-col-header">ENTERPRISE</h4>
              <motion.a
                href="/about"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                The Legacy
              </motion.a>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Leadership Team
              </motion.a>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Investor Relations
              </motion.a>
              <motion.a
                href="#"
                className="f-link-item"
                whileHover={{ x: 10, color: "#d4af37" }}
              >
                Careers
              </motion.a>
            </div> */}

            <div className="f-link-column">
              <h4 className="f-col-header">HEADQUARTERS</h4>
              <p className="f-address-text">
                Balaji Hub, SP Ring Road,
                <br />
                Vastral, Ahmedabad 382418 
                <br />
                Gujarat, India.
              </p>
              <motion.a
                href="tel:+919876543210"
                className="f-link-item f-bold"
                whileHover={{ x: -10, color: "#d4af37" }}
              >
                +91 98765 43210
              </motion.a>
              <motion.a
                href="mailto:info@balajiconstruction.com"
                className="f-link-item"
                whileHover={{ x: -10, color: "#d4af37" }}
              >
                info@balajiconstruction.com
              </motion.a>
            </div>
          </div>
        </div>

        <div className="f-bottom-bar">
          <div className="container f-bottom-flex">
            <div className="f-logo-mark">
              BALAJI{" "}
              <span style={{ color: "var(--primary-gold)" }}>CONSTRUCTION</span>
            </div>
            <div className="f-social-magnetic">
              <motion.a href="#" whileHover={{ y: -5, color: "#d4af37" }}>
                IG
              </motion.a>
              <motion.a href="#" whileHover={{ y: -5, color: "#d4af37" }}>
                FB
              </motion.a>
              <motion.a href="#" whileHover={{ y: -5, color: "#d4af37" }}>
                IN
              </motion.a>
              <motion.a href="#" whileHover={{ y: -5, color: "#25D366" }}>
                WA
              </motion.a>
            </div>
            <div className="f-copyright">
              © 2026. SECURING THE HORIZON.
              <a href="#">LEGAL</a> • <a href="#">PRIVACY</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* --- BRAND NEW FOOTER VISUALS --- */
        .footer-ultra {
            position: relative;
            background: #000 !important;
            overflow: hidden;
            margin-top: 8rem; /* Removed margin to stick directly under sections */
            color: #fff;
            font-family: var(--sans);
        }

        /* Ambient Aurora Gradient Glow Effect */
        .footer-aurora-bg {
            position: absolute;
            bottom: -20vh;
            left: 50%;
            transform: translateX(-50%);
            width: 80vw;
            height: 50vh;
            background: radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%);
            filter: blur(60px);
            z-index: 0;
            pointer-events: none;
            animation: breatheAurora 8s ease-in-out infinite alternate;
        }

        @keyframes breatheAurora {
            0% { transform: translateX(-50%) scale(1); opacity: 0.5; }
            100% { transform: translateX(-50%) scale(1.2); opacity: 1; }
        }

        /* Native Infinite Scrolling Marquee */
        .marquee-wrapper {
            position: relative;
            padding: 1.5rem 0; /* Reduced padding to kiss the image directly */
            border-bottom: 1px solid rgba(255,255,255,0.05);
            overflow: hidden;
            z-index: 10;
        }

        .marquee-content {
            display: inline-flex;
            white-space: nowrap;
            align-items: center;
            font-size: clamp(2rem, 5vw, 4rem); /* Significantly smaller */
            font-family: 'Noto Serif', serif;
            font-weight: 900;
            line-height: 1;
            color: #fff !important;
            -webkit-text-stroke: 1px rgba(255,255,255,0.15);
            letter-spacing: 0.15rem;
            text-transform: uppercase;
            animation: scrollMarquee 30s linear infinite;
        }

        @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
        }

        .marquee-content span:not(.marquee-dot) {
            transition: color 0.5s ease, text-shadow 0.5s ease;
        }

        .marquee-content span:hover {
            color: var(--primary-gold) !important;
            text-shadow: 0 0 20px rgba(212,175,55,0.3);
            cursor: default;
        }

        .marquee-dot {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            color: var(--primary-gold) !important;
            margin: 0 3rem;
            -webkit-text-stroke: 0px;
        }

        /* Content Layout */
        .footer-content-grid {
            position: relative;
            z-index: 10;
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 8rem;
            padding: 8rem 0;
        }

        /* Newsletter Block */
        .f-exclusive-club {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .f-sub-title {
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: 0.2rem;
            margin-bottom: 1.5rem;
            color: #fff !important;
        }

        .f-sub-desc {
            font-size: 1rem;
            line-height: 1.8;
            color: rgba(255,255,255,0.5) !important;
            margin-bottom: 2.5rem;
        }

        .f-sub-form {
            display: flex;
            border-bottom: 2px solid rgba(255,255,255,0.2);
            padding-bottom: 0.5rem;
            transition: border-color 0.4s;
        }

        .f-sub-form:focus-within {
            border-color: var(--primary-gold);
        }

        .f-sub-input {
            flex: 1;
            background: transparent;
            border: none;
            color: #fff !important;
            font-size: 1.1rem;
            outline: none;
        }

        .f-sub-input::placeholder {
            color: rgba(255,255,255,0.3) !important;
            letter-spacing: 0.1rem;
        }

        .f-sub-btn {
            background: transparent;
            color: var(--primary-gold) !important;
            border: none;
            font-weight: 800;
            letter-spacing: 0.15rem;
            cursor: pointer;
            padding: 0 1rem;
        }

        /* Links Grid */
        .f-links-grid {
            display: flex;
            justify-content: flex-end; /* Starts right to left */
            gap: 4rem;
            text-align: right; /* Aligns text to the right */
        }

        .f-col-header {
            font-size: 0.8rem;
            color: var(--primary-gold) !important;
            letter-spacing: 0.2rem;
            font-weight: 800;
            margin-bottom: 2.5rem;
            text-transform: uppercase;
        }

        .f-link-item {
            display: block;
            color: rgba(255,255,255,0.6) !important;
            text-decoration: none;
            margin-bottom: 1.5rem;
            font-size: 1rem;
            letter-spacing: 0.05rem;
            cursor: pointer;
            position: relative;
            width: fit-content;
            margin-left: auto; /* Required for right-alignment to work with fit-content */
        }

        .f-link-item.f-bold {
            font-weight: 700;
            color: #fff !important;
            margin-top: 1rem;
        }

        .f-link-item::after {
            content: '';
            position: absolute;
            bottom: -5px;
            right: 0; /* Grow from right to left */
            width: 0%;
            height: 1px;
            background: var(--primary-gold);
            transition: width 0.3s ease;
        }

        .f-link-item:hover::after {
            width: 100%;
        }

        .f-address-text {
            color: rgba(255,255,255,0.5) !important;
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }

        /* Bottom Bar */
        .f-bottom-bar {
            position: relative;
            z-index: 10;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding: 3rem 0;
            background: rgba(0,0,0,0.5); /* Slight darkening */
            backdrop-filter: blur(10px);
        }

        .f-bottom-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 2rem;
        }

        .f-logo-mark {
            font-family: 'Noto Serif', serif;
            font-weight: 900;
            letter-spacing: 0.15rem;
            font-size: 1.2rem;
        }

        .f-social-magnetic {
            display: flex;
            gap: 3rem;
        }

        .f-social-magnetic a {
            color: #fff !important;
            text-decoration: none;
            font-weight: 800;
            font-size: 0.9rem;
            letter-spacing: 0.15rem;
        }

        .f-copyright {
            font-size: 0.75rem;
            color: rgba(255,255,255,0.4) !important;
            letter-spacing: 0.15rem;
        }

        .f-copyright a {
            color: rgba(255,255,255,0.6) !important;
            text-decoration: none;
            margin-left: 0.5rem;
            transition: color 0.3s;
        }
        
        .f-copyright a:hover {
            color: var(--primary-gold) !important;
        }

        @media (max-width: 1024px) {
            .footer-content-grid { grid-template-columns: 1fr; gap: 5rem; padding: 6rem 5%; }
            .f-links-grid { grid-template-columns: 1fr 1fr; }
            .f-bottom-flex { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
