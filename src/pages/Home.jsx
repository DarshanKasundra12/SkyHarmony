import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();
    
    // 1. Image Cinematic Scale-Down
    tl.fromTo(
      ".hero-image-fit",
      { scale: 1.3, filter: "brightness(0.2) blur(10px)" },
      { scale: 1, filter: "brightness(0.6) blur(0px)", duration: 2.5, ease: "power2.out" }
    );

    // 2. Text Content Reveal (Layered)
    tl.fromTo(
      ".reveal-inner",
      { y: "120%", skewY: 7, opacity: 0 },
      { 
        y: "0%", 
        skewY: 0, 
        opacity: 1, 
        duration: 2, 
        stagger: 0.15, 
        ease: "power4.out" 
      },
      "-=2" // Starts while image is still scaling
    );

    // 3. Gold Glimmer Effect
    tl.fromTo(
      ".h-title.gold",
      { letterSpacing: "1rem", opacity: 0 },
      { letterSpacing: "0.2rem", opacity: 1, duration: 1.5, ease: "expo.out" },
      "-=1.5"
    );

    // 4. CTA Smooth Glide
    tl.fromTo(
      ".hero-cta-box",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=1"
    );
  }, []);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919712909405?text=I%20am%20interested%20in%20Balaji%20Sky%20Harmony.%20Please%20share%20more%20details.",
      "_blank",
    );
  };

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="media-container">
          <img
            src="/assets/FrontViewBuilding.webp"
            alt="Balaji Sky Harmony Luxury Apartment Building Facade in Vastral Ahmedabad East"
            className="hero-image-fit"
          />
          <div className="hero-dark-overlay" />
        </div>

        <div className="hero-content">
          <div className="reveal">
            <h1 className="reveal-inner h-title">A SKY-HARMONY OF</h1>
          </div>
          <div className="reveal">
            <h1 className="reveal-inner h-title gold">LUXURY LIVING</h1>
          </div>

          <div className="reveal">
            <span className="reveal-inner h-location">
              VASTRAL, AHMEDABAD EAST
            </span>
          </div>

          <div className="reveal">
            <p className="reveal-inner h-desc">
              Experience the pinnacle of urban sophistication in our 2 & 3 BHK
              premium residences meticulously designed for modern harmony.
            </p>
          </div>

          <div className="hero-cta-box">
            <Link
              to="/projects"
              className="button button-solid"
              style={{ minWidth: "220px" }}
            >
              Explore Portfolio
            </Link>
            <button
              className="button button-solid"
              onClick={openWhatsApp}
              style={{
                minWidth: "220px",
                background: "#25D366",
                color: "#fff",
                border: "none",
              }}
            >
              Connect on WhatsApp
            </button>
          </div>
        </div>

        {/* <div
          className="hero-scroll-guide"
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="mouse-icon">
            <div className="wheel" />
          </div>
          <span className="sg-text">SCROLL DOWN</span>
        </div> */}
      </section>

      <style>{`
        .home-wrapper {
          width: 100%;
          background: #0d0d0f;
          overflow: hidden;
        }

        .hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 5% 4rem; /* Safe padding for navbar */
          box-sizing: border-box;
        }

        .media-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-image-fit {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .hero-dark-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1200px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Huge top margin forces content down, completely clearing the Navbar */
          // margin-top: 6rem; 
        }

        .h-title {
          font-size: clamp(3rem, 9vw, 6.5rem);
          font-weight: 900;
          line-height: 1.1;
          color: #fff;
          margin: 0;
          text-shadow: 0 4px 15px rgba(0,0,0,0.4);
          text-transform: uppercase;
        }

        .h-title.gold {
          color: var(--primary-gold);
          margin-bottom: 2rem;
        }

        .h-location {
          display: block;
          font-size: 1rem;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.4rem;
          margin-bottom: 3rem;
          text-transform: uppercase;
          font-weight: 600;
        }

        .h-desc {
          max-width: 700px;
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .hero-cta-box {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-scroll-guide {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        
        .hero-scroll-guide:hover {
          opacity: 1;
        }

        .mouse-icon {
          width: 26px;
          height: 40px;
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 20px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: var(--primary-gold);
          border-radius: 2px;
          margin-top: 6px;
          animation: wheel-scroll 2s infinite ease-in-out;
        }

        @keyframes wheel-scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        .sg-text {
          font-size: 0.65rem;
          letter-spacing: 0.25rem;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          font-weight: 700;
        }

        @media (max-width: 1024px) {
           .hero-section { padding-top: 10rem; }
           .hero-content { margin-top: 0; }
           .hero-main-title, .hero-sub-title { font-size: clamp(2.5rem, 8vw, 4rem); }
           .hero-scroll-guide { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Home;
