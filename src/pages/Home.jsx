import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projectsData } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);


  useEffect(() => {
    window.scrollTo(0, 0);

    const tl = gsap.timeline();
    
    // Hero Entrance
    tl.fromTo(
      ".hero-image-fit",
      { scale: 1.4, filter: "brightness(0.1) blur(15px)" },
      { scale: 1, filter: "brightness(0.5) blur(0px)", duration: 3, ease: "power2.out" }
    );

    tl.fromTo(
      ".reveal-inner",
      { y: "130%", skewY: 10, opacity: 0 },
      { y: "0%", skewY: 0, opacity: 1, duration: 1.8, stagger: 0.1, ease: "power4.out" },
      "-=2.5"
    );

    // Scroll Reveals
    const sections = document.querySelectorAll(".reveal-on-scroll");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll(".stat-number");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 90%"
        }
      });
    });

  }, []);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919712909405?text=I%20am%20interested%20in%20Balaji%20Sky%20Harmony.%20Please%20share%20more%20details.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="home-wrapper" ref={containerRef}>
      <Helmet>
        <title>Sky Harmony | Luxury Real Estate & Premium Living in Ahmedabad</title>
        <meta name="description" content="Discover the pinnacle of luxury living with Sky Harmony. Explore premium 2 & 3 BHK residences, new projects in Vastral, and gated communities in Ahmedabad." />
      </Helmet>

      {/* CINEMATIC HERO SECTION */}
      <section id="hero" className="hero-section">
        <div className="media-container">
          <img
            src="/assets/FrontViewBuilding.webp"
            alt="Sky Harmony Luxury Building"
            className="hero-image-fit"
          />
          <div className="hero-dark-overlay" />
        </div>

        <div className="hero-content">
          <motion.div className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span className="dot" /> THE SIGNATURE COLLECTION
          </motion.div>
          
          <div className="reveal">
            <h1 className="reveal-inner h-title">CRAFTING SPACES</h1>
          </div>
          <div className="reveal">
            <div className="reveal-inner h-title gold">BEYOND HARMONY</div>
          </div>

          <div className="reveal">
            <p className="reveal-inner h-desc">
              Redefining the skyline of Vastral with meticulously designed 
              premium residences that blend architectural brilliance with serene living.
            </p>
          </div>

          <div className="hero-cta-box">
            <Link to="/projects/sky-harmony" className="premium-btn primary">
              <span className="btn-text">EXPLORE SKY HARMONY</span>
              <span className="btn-icon">→</span>
            </Link>
            <button onClick={openWhatsApp} className="premium-btn secondary">
              <span className="btn-text">CONNECT NOW</span>
            </button>
          </div>
        </div>

        <div className="hero-bottom-strip">
          <div className="strip-item">
            <span className="strip-value">12+</span>
            <span className="strip-label">Years Legacy</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-value">2500+</span>
            <span className="strip-label">Happy Families</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-value">15+</span>
            <span className="strip-label">Projects</span>
          </div>
          <div className="strip-divider" />
          <div className="strip-item">
            <span className="strip-value">45+</span>
            <span className="strip-label">Total Acres</span>
          </div>
        </div>

        {/* <div className="hero-scroll-guide">
          <div className="mouse-icon">
            <div className="wheel" />
          </div>
        </div> */}
      </section>

      {/* SIGNATURE STATS */}
      {/* <section className="stats-section reveal-on-scroll">
        <div className="container stats-grid">
          {[
            { label: "YEARS OF LEGACY", value: "12", suffix: "+" },
            { label: "HAPPY FAMILIES", value: "2500", suffix: "+" },
            { label: "PROJECTS DELIVERED", value: "15", suffix: "+" },
            { label: "TOTAL ACRES", value: "45", suffix: "+" }
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <h2 className="stat-value">
                <span className="stat-number" data-target={stat.value}>0</span>
                {stat.suffix}
              </h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* SPLIT LIVING SECTION */}
      <section className="split-section reveal-on-scroll">
        <div className="container split-grid">
          <div className="split-image-container">
            <img src="/assets/HeroImage.webp" alt="Luxury Living" className="split-img" />
            <div className="img-border" />
          </div>
          <div className="split-content">
            <span className="section-subtitle">OUR PHILOSOPHY</span>
            <h2 className="section-title">Design That <span className="gold-text">Inspires</span></h2>
            <p className="section-desc">
              At Balaji Construction, we don't just build apartments; we craft legacies. 
              Every corner of Sky Harmony is a testament to our commitment to quality, 
              safety, and the art of modern living.
            </p>
            <div className="features-list">
              <div className="feature-pill">◈ Gated Community</div>
              <div className="feature-pill">◈ Premium Amenities</div>
              <div className="feature-pill">◈ Strategic Location</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-box reveal-on-scroll">
            <h2 className="section-title">Signature <span className="gold-text">Residences</span></h2>
            <Link to="/projects" className="view-all-link">VIEW ALL PROJECTS ↗</Link>
          </div>

          <div className="projects-showcase">
            {projectsData.map((project) => (
              <Link to={`/project/${project.id}`} key={project.id} className="showcase-card reveal-on-scroll">
                <div className="showcase-img-wrap">
                  <img src={project.mainImage} alt={project.title} className="showcase-img" />
                  <div className="showcase-overlay" />
                  <div className="showcase-status">{project.status}</div>
                </div>
                <div className="showcase-content">
                  <span className="showcase-location">◈ {project.location}</span>
                  <h3 className="showcase-name">{project.title}</h3>
                  <p className="showcase-subtitle">{project.subtitle || 'A Sanctuary of Modern Living'}</p>
                  <div className="showcase-details">
                    <div className="showcase-detail">
                      <span className="detail-label">Type</span>
                      <span className="detail-value">{project.type}</span>
                    </div>
                    <div className="showcase-detail">
                      <span className="detail-label">Price Range</span>
                      <span className="detail-value">{project.priceRange}</span>
                    </div>
                    <div className="showcase-detail">
                      <span className="detail-label">Area</span>
                      <span className="detail-value">{project.unitSizes}</span>
                    </div>
                  </div>
                  <div className="showcase-cta">
                    <span className="showcase-btn">VIEW PROJECT</span>
                    <span className="showcase-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* UPCOMING TEASER BANNER */}
          <div className="upcoming-banner reveal-on-scroll">
            <div className="upcoming-glow" />
            <div className="upcoming-content">
              <span className="upcoming-badge">UPCOMING</span>
              <h3 className="upcoming-title">Project</h3>
              <p className="upcoming-desc">The next chapter of luxury living — launching soon in Ahmedabad.</p>
            </div>
            <button onClick={openWhatsApp} className="upcoming-notify">
              GET NOTIFIED →
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials-section reveal-on-scroll">
         <div className="container">
            <h2 className="section-title text-center">Voices of <span className="gold-text">Harmony</span></h2>
            <div className="testimonial-grid">
               {[
                  { name: "Rahul Sharma", role: "Business Owner", text: "Moving to Sky Harmony was the best decision for my family. The attention to detail in the architecture is simply world-class." },
                  { name: "Priya Patel", role: "IT Professional", text: "The cross-ventilation and natural light in my 3BHK are amazing. Plus, the connectivity to the Metro makes my commute so easy." },
                  { name: "Amit Shah", role: "Doctor", text: "A truly gated community with 24/7 security. It feels like a sanctuary away from the city's hustle, yet everything is nearby." }
               ].map((item, i) => (
                  <div key={i} className="testi-card">
                     <div className="testi-quotes">"</div>
                     <p className="testi-text">{item.text}</p>
                     <div className="testi-author">
                        <strong>{item.name}</strong>
                        <span>{item.role}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta reveal-on-scroll">
        <div className="container cta-inner">
          <h2 className="cta-title">Ready to Experience <br /> <span className="gold-text">Pure Harmony?</span></h2>
          <p className="cta-subtitle">Schedule a private site visit today and witness the craftsmanship in person.</p>
          <div className="cta-btns">
            <button onClick={openWhatsApp} className="premium-btn primary">BOOK A SITE VISIT</button>
            <Link to="/contact" className="premium-btn ghost">CONTACT SALES</Link>
          </div>
        </div>
        <div className="cta-bg-glow" />
      </section>

      <style>{`
        .home-wrapper {
          width: 100%;
          background: #0b0b0e;
          color: #fff;
          overflow-x: hidden;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 5%;
        }

        /* ===== HERO SECTION ===== */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .media-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-image-fit {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-dark-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom, rgba(11,11,14,0.7) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.25) 60%, rgba(11,11,14,0.95) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 1100px;
          padding: 0 5%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 0.65rem;
            letter-spacing: 0.3rem;
            color: var(--primary-gold);
            margin-bottom: 1.5rem;
            font-weight: 800;
            background: rgba(212,175,55,0.08);
            padding: 0.5rem 1.8rem;
            border-radius: 50px;
            border: 1px solid rgba(212,175,55,0.2);
            backdrop-filter: blur(10px);
        }

        .hero-badge .dot {
            width: 7px;
            height: 7px;
            background: var(--primary-gold);
            border-radius: 50%;
            display: inline-block;
            animation: dot-pulse 2s infinite ease-in-out;
        }

        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.6); }
          50% { box-shadow: 0 0 0 6px rgba(212,175,55,0); }
        }

        .h-title {
          font-size: clamp(2.2rem, 6.5vw, 5.5rem);
          font-weight: 950;
          line-height: 1;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: -0.02em;
        }

        .h-title.gold {
          color: var(--primary-gold);
          margin-bottom: 1.5rem;
        }

        .h-desc {
          max-width: 580px;
          margin: 0 auto 2rem;
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
        }

        .hero-cta-box {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* ===== HERO BOTTOM STAT STRIP ===== */
        .hero-bottom-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 1.5rem 5%;
          background: rgba(11,11,14,0.7);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .strip-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 3rem;
        }

        .strip-value {
          font-size: 1.6rem;
          font-weight: 900;
          color: var(--primary-gold);
          line-height: 1.2;
        }

        .strip-label {
          font-size: 0.65rem;
          letter-spacing: 0.15rem;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
          text-transform: uppercase;
        }

        .strip-divider {
          width: 1px;
          height: 35px;
          background: rgba(255,255,255,0.1);
        }

        /* ===== PREMIUM BUTTONS ===== */
        .premium-btn {
            padding: 1.1rem 2.4rem;
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.18rem;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            border: none;
            text-decoration: none;
        }

        .premium-btn.primary {
            background: var(--primary-gold);
            color: #000;
        }

        .premium-btn.primary:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(212,175,55,0.3);
        }

        .premium-btn.secondary {
            background: #25D366;
            color: #fff;
        }

        .premium-btn.secondary:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 35px rgba(37,211,102,0.25);
        }

        .premium-btn.ghost {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.2);
            color: #fff;
        }

        .premium-btn.ghost:hover {
            border-color: var(--primary-gold);
            color: var(--primary-gold);
        }

        /* ===== STATS SECTION ===== */
        .stats-section {
            padding: 8rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 4rem;
        }

        .stat-item {
            text-align: center;
        }

        .stat-value {
            font-size: 4rem;
            font-weight: 900;
            color: var(--primary-gold);
            margin-bottom: 0.5rem;
            font-family: inherit;
        }

        .stat-label {
            font-size: 0.8rem;
            letter-spacing: 0.2rem;
            color: rgba(255,255,255,0.4);
            font-weight: 700;
        }

        /* ===== SPLIT SECTION ===== */
        .split-section {
            padding: 10rem 0;
        }

        .split-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8rem;
            align-items: center;
        }

        .split-image-container {
            position: relative;
        }

        .split-img {
            width: 100%;
            height: 600px;
            object-fit: cover;
            border-radius: 20px;
            position: relative;
            z-index: 2;
        }

        .img-border {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 2px solid var(--primary-gold);
            top: 30px;
            left: -30px;
            border-radius: 20px;
            z-index: 1;
        }

        .split-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .section-subtitle {
            color: var(--primary-gold);
            letter-spacing: 0.3rem;
            font-size: 0.8rem;
            font-weight: 800;
        }

        .section-title {
            font-size: 3.5rem;
            font-weight: 900;
            line-height: 1.1;
        }

        .gold-text {
            color: var(--primary-gold);
        }

        .section-desc {
            font-size: 1.15rem;
            line-height: 1.8;
            color: rgba(255,255,255,0.6);
            font-weight: 300;
        }

        .feature-pill {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 100px;
            margin-right: 1rem;
            margin-bottom: 1rem;
            font-size: 0.85rem;
            font-weight: 600;
            color: rgba(255,255,255,0.8);
        }

        /* ===== FEATURED / SHOWCASE SECTION ===== */
        .featured-section {
            padding: 10rem 0;
            background: #08080a;
        }

        .section-header-box {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 5rem;
        }

        .view-all-link {
            color: #fff;
            text-decoration: none;
            font-size: 0.8rem;
            letter-spacing: 0.2rem;
            font-weight: 800;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--primary-gold);
            transition: color 0.3s;
        }

        .view-all-link:hover {
            color: var(--primary-gold);
        }

        /* Showcase Card — full-width cinematic layout */
        .projects-showcase {
            display: flex;
            flex-direction: column;
            gap: 3rem;
        }

        .showcase-card {
            display: grid;
            grid-template-columns: 1.1fr 1fr;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
            border-radius: 28px;
            overflow: hidden;
            text-decoration: none;
            transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .showcase-card:hover {
            transform: translateY(-8px);
            border-color: rgba(212,175,55,0.3);
            box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }

        .showcase-img-wrap {
            position: relative;
            height: 480px;
            overflow: hidden;
        }

        .showcase-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 1s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .showcase-card:hover .showcase-img {
            transform: scale(1.08);
        }

        .showcase-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.5));
        }

        .showcase-status {
            position: absolute;
            top: 2rem;
            left: 2rem;
            padding: 0.55rem 1.4rem;
            background: var(--primary-gold);
            color: #000;
            font-size: 0.68rem;
            font-weight: 800;
            letter-spacing: 0.12rem;
            border-radius: 6px;
        }

        .showcase-content {
            padding: 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1.2rem;
        }

        .showcase-location {
            font-size: 0.72rem;
            letter-spacing: 0.2rem;
            color: var(--primary-gold);
            font-weight: 700;
        }

        .showcase-name {
            font-size: 2.2rem;
            font-weight: 900;
            color: #fff;
            margin: 0;
            line-height: 1.1;
        }

        .showcase-subtitle {
            font-size: 1rem;
            color: rgba(255,255,255,0.45);
            font-weight: 300;
            margin: 0;
        }

        .showcase-details {
            display: flex;
            gap: 2.5rem;
            margin-top: 0.5rem;
            padding-top: 1.2rem;
            border-top: 1px solid rgba(255,255,255,0.06);
        }

        .showcase-detail {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }

        .detail-label {
            font-size: 0.65rem;
            letter-spacing: 0.15rem;
            color: rgba(255,255,255,0.35);
            text-transform: uppercase;
            font-weight: 600;
        }

        .detail-value {
            font-size: 0.95rem;
            color: #fff;
            font-weight: 700;
        }

        .showcase-cta {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-top: 1rem;
        }

        .showcase-btn {
            font-size: 0.75rem;
            letter-spacing: 0.2rem;
            font-weight: 800;
            color: var(--primary-gold);
            text-transform: uppercase;
        }

        .showcase-arrow {
            font-size: 1.2rem;
            color: var(--primary-gold);
            transition: transform 0.3s;
        }

        .showcase-card:hover .showcase-arrow {
            transform: translateX(6px);
        }

        /* ===== UPCOMING BANNER ===== */
        .upcoming-banner {
            margin-top: 4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2.5rem 3.5rem;
            background: linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.02));
            border: 1px solid rgba(212,175,55,0.15);
            border-radius: 20px;
            position: relative;
            overflow: hidden;
        }

        .upcoming-glow {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%);
            top: -200px;
            right: -100px;
            z-index: 0;
        }

        .upcoming-content {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .upcoming-badge {
            font-size: 0.6rem;
            letter-spacing: 0.2rem;
            font-weight: 800;
            color: #000;
            background: var(--primary-gold);
            padding: 0.4rem 1rem;
            border-radius: 4px;
        }

        .upcoming-title {
            font-size: 1.5rem;
            font-weight: 900;
            color: #fff;
            margin: 0;
        }

        .upcoming-desc {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.5);
            margin: 0;
            font-weight: 300;
        }

        .upcoming-notify {
            position: relative;
            z-index: 2;
            padding: 1rem 2rem;
            background: transparent;
            border: 1px solid rgba(212,175,55,0.4);
            color: var(--primary-gold);
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.15rem;
            border-radius: 100px;
            cursor: pointer;
            transition: all 0.3s;
            white-space: nowrap;
        }

        .upcoming-notify:hover {
            background: var(--primary-gold);
            color: #000;
        }

        /* ===== TESTIMONIALS ===== */
        .testimonials-section {
            padding: 10rem 0;
        }

        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
            margin-top: 5rem;
        }

        .testi-card {
            padding: 3rem;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 20px;
            position: relative;
        }

        .testi-quotes {
            font-size: 5rem;
            color: var(--primary-gold);
            line-height: 1;
            margin-bottom: -1rem;
            font-family: serif;
            opacity: 0.3;
        }

        .testi-text {
            font-size: 1.1rem;
            line-height: 1.8;
            color: rgba(255,255,255,0.7);
            margin-bottom: 2.5rem;
            font-style: italic;
        }

        .testi-author {
            display: flex;
            flex-direction: column;
        }

        .testi-author strong {
            color: #fff;
            font-size: 1.1rem;
        }

        .testi-author span {
            color: var(--primary-gold);
            font-size: 0.8rem;
            letter-spacing: 0.1rem;
        }

        /* ===== FINAL CTA ===== */
        .final-cta {
            padding: 12rem 0;
            position: relative;
            background: #08080a;
            text-align: center;
            overflow: hidden;
        }

        .cta-inner {
            position: relative;
            z-index: 3;
        }

        .cta-title {
            font-size: 4.5rem;
            font-weight: 950;
            line-height: 1;
            margin-bottom: 2rem;
        }

        .cta-subtitle {
            font-size: 1.3rem;
            color: rgba(255,255,255,0.5);
            margin-bottom: 4rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-btns {
            display: flex;
            gap: 2rem;
            justify-content: center;
        }

        .cta-bg-glow {
            position: absolute;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
        }

        /* ===== MOUSE ICON ===== */
        .mouse-icon {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(255,255,255,0.35);
          border-radius: 20px;
          display: flex;
          justify-content: center;
        }

        .wheel {
          width: 3px;
          height: 7px;
          background: var(--primary-gold);
          border-radius: 2px;
          margin-top: 6px;
          animation: wheel-scroll 2s infinite ease-in-out;
        }

        @keyframes wheel-scroll {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }

        .hero-scroll-guide {
          position: absolute;
          bottom: 4.2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1200px) {
            .split-grid { gap: 4rem; }
            .showcase-card { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 991px) {
            .hero-content { padding: 0 5%; }
            .h-title { font-size: clamp(2rem, 7vw, 4rem); }
            .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem; }
            .split-grid { grid-template-columns: 1fr; text-align: center; }
            .img-border { display: none; }
            .split-image-container { order: 2; }
            .split-img { height: 400px; }
            .showcase-card { grid-template-columns: 1fr; }
            .showcase-img-wrap { height: 320px; }
            .testimonial-grid { grid-template-columns: 1fr; }
            .section-title { font-size: 3rem; }
            .cta-title { font-size: 3rem; }
            .upcoming-banner { flex-direction: column; gap: 1.5rem; text-align: center; }
            .upcoming-content { flex-direction: column; gap: 1rem; }
            .strip-item { padding: 0 1.5rem; }
            .strip-value { font-size: 1.2rem; }
        }

        @media (max-width: 768px) {
            .hero-cta-box, .cta-btns { flex-direction: column; width: 100%; align-items: stretch; }
            .premium-btn { width: 100%; justify-content: center; }
            .stat-value { font-size: 3rem; }
            .h-title { font-size: clamp(1.8rem, 8vw, 3.2rem); }
            .h-desc { font-size: 0.9rem; }
            .hero-bottom-strip { gap: 0; padding: 1rem 2%; }
            .strip-item { padding: 0 0.8rem; }
            .strip-value { font-size: 1rem; }
            .strip-label { font-size: 0.55rem; letter-spacing: 0.08rem; }
            .showcase-details { flex-direction: column; gap: 1rem; }
            .showcase-content { padding: 2rem; }
            .showcase-name { font-size: 1.6rem; }
        }

        @media (max-width: 480px) {
            .hero-bottom-strip { flex-wrap: wrap; justify-content: center; }
            .strip-divider:nth-child(4) { display: none; }
        }
      `}</style>
    </div>
  );
};

export default Home;
