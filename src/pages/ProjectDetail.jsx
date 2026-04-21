import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../data/projects";
import { Helmet } from "react-helmet-async";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const containerRef = useRef(null);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
  const [fpZoom, setFpZoom] = useState(1);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const fpRef = useRef(null);
  const [initialTouchDist, setInitialTouchDist] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);

  const handleFpTouchStart = (e) => {
    if (e.touches.length === 2 && isFloorPlanOpen) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      setInitialTouchDist(dist);
      setInitialZoom(fpZoom);
    }
  };

  const handleFpTouchMove = (e) => {
    if (e.touches.length === 2 && initialTouchDist > 0 && isFloorPlanOpen) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      const ratio = dist / initialTouchDist;
      setFpZoom(Math.min(Math.max(initialZoom * ratio, 1), 4));
    }
  };

  const handleFpTouchEnd = () => {
    setInitialTouchDist(0);
  };

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileDevice(isMobile);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!project) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".pd-reveal-line",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      );

      gsap.fromTo(
        ".pd-sidebar-stagger",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          delay: 0.4,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  useEffect(() => {
    // We allow page scrolling even when floor plan is previewed
    document.body.style.overflow = "auto";
  }, []);

  if (!project)
    return (
      <div
        className="section-padding container text-center"
        style={{ minHeight: "100vh", padding: "10rem 0" }}
      >
        <h2 className="section-title" style={{ color: "#fff" }}>
          Project Not Found
        </h2>
        <Link to="/projects" className="button button-solid">
          Back to Portfolio
        </Link>
      </div>
    );

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/919712909405?text=${encodeURIComponent(project.whatsappMsg)}`,
      "_blank",
    );
  };

  const openFloorPlan = () => {
    setFpZoom(1);
    setIsFloorPlanOpen(true);
  };

  const handleFpWheel = (e) => {
    if (!isFloorPlanOpen) return;
    // Standardized 100%-200% architectural scale
    const delta = e.deltaY;
    setFpZoom((prev) => {
      const step = 0.1; // Precise 10% steps
      const newZoom = delta > 0 ? prev - step : prev + step;
      return Math.min(Math.max(newZoom, 1), 4); // Locked between 100% (1) and 400% (4)
    });
  };

  const fpZoomPercent = Math.round(fpZoom * 100);

  return (
    <motion.div
      className="pd-page-wrapper"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="blueprint-bg" />
      <Helmet>
        <title>Ready to Move Apartments Ahmedabad | Sky Harmony</title>
        <meta
          name="description"
          content="Explore Balaji Sky Harmony: The top choice for new projects in Vastral. Gated community apartments near Metro & SP Ring Road. Luxury residential projects Ahmedabad."
        />
        <meta
          name="keywords"
          content="ready to move apartments Ahmedabad, new projects Vastral, gated community Vastral, apartments near Metro Ahmedabad, apartments near SP Ring Road, residential projects Ahmedabad, luxury apartments Vastral, Balaji Sky Harmony floor plan, 3 BHK luxury flats Ahmedabad, premium housing in Vastral, residential investment Ahmedabad, top builders in Ahmedabad East, gated society in Vastral"
        />
        <link rel="canonical" href={`https://skyharmony.vercel.app/project/${id}`} />
        <meta name="author" content="Balaji Construction" />
      </Helmet>

      {/* HERO SECTION - CINEMATIC ENTRANCE */}
      <div className="pd-hero-container">
        <motion.img
          src={project.mainImage}
          alt={`Front view of ${project.title} luxury apartment building in ${project.location}`}
          className="pd-hero-bg"
          initial={{ scale: 1.2, filter: "brightness(0.3)" }}
          animate={{ scale: 1, filter: "brightness(0.6)" }}
          transition={{ duration: 2.5, ease: "circOut" }}
        />
        <div className="pd-hero-overlay" />
        <div className="container pd-hero-content">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.2 }}
          >
            <span className="pd-status-tag">{project.status}</span>
            <h1 className="pd-main-title">{project.title}</h1>
            <p className="pd-hero-tagline">{project.subtitle}</p>
          </motion.div>
        </div>
      </div>



      <section className="pd-main-grid-section">
        <div className="container pd-master-grid">
          {/* LEFT CONTENT COLUMN */}
          <div className="pd-content-col">
            <div className="pd-glass-card pd-reveal-line">
              <div className="pd-card-beam" />
              <h3 className="pd-section-header">PROJECT ARCHITECTURE</h3>
              <p className="pd-description">{project.overview}</p>

              <div className="pd-highlights-container">
                {project.highlights.map((h, i) => (
                  <div key={i} className="pd-highlight-item">
                    <span className="pd-h-dot">◈</span>
                    <span className="pd-h-text">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pd-glass-card pd-reveal-line">
              <div className="pd-card-beam" />
              <h3 className="pd-section-header">TECHNICAL SPECIFICATIONS</h3>
              <div className="pd-spec-grid">
                {Object.entries(project.specifications).map(([key, val], i) => (
                  <div key={i} className="pd-spec-item">
                    <span className="pd-spec-category">
                      {key.toUpperCase()}
                    </span>
                    <p className="pd-spec-val">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside className="pd-sidebar-col">
            <div className="pd-sidebar-card pd-sidebar-stagger">
              <div className="pd-card-beam" />
              <h4 className="pd-sidebar-title">INVESTMENT SUMMARY</h4>
              <div className="pd-summary-list">
                {[
                  { l: "Location", v: project.location },
                  { l: "Configuration", v: project.type },
                  { l: "Price Range", v: project.priceRange },
                  { l: "Possession", v: project.possession },
                ].map((item, i) => (
                  <div className="pd-sum-row" key={i}>
                    <span className="pd-sum-label">{item.l}</span>
                    <span className="pd-sum-val">{item.v}</span>
                  </div>
                ))}
              </div>
              <div className="pd-action-stack">
                <button
                  className="button button-solid pd-btn-wa"
                  onClick={openWhatsApp}
                >
                  CHAT ON WHATSAPP
                </button>
                <button
                  className="button button-outline pd-btn-brochure"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = project.brochurePdf;
                    link.download = `${project.title.replace(/\s+/g, "_")}_Brochure.pdf`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  DOWNLOAD BROCHURE
                </button>
              </div>
            </div>

            <div className="pd-sidebar-card pd-sidebar-stagger">
              <div className="pd-card-beam" />
              <h4 className="pd-sidebar-title">VISIT THE PROPERTY</h4>
              <div className="pd-tour-preview">
                <div className="pd-tour-overlay">
                  <button className="pd-tour-btn" onClick={openWhatsApp}>
                    BOOK A HOUSE VISIT
                  </button>
                </div>
                <img
                  src={project.mainImage}
                  alt="House Visit Preview"
                  className="pd-tour-img"
                />
              </div>
              <p className="pd-sidebar-hint">
                Witness the harmony of luxury in person
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* NEW PREMIUM FLOOR PLAN SECTION */}
      <section className="pd-floorplan-section pd-reveal-line">
        <div className="container">
          <div className="pd-fp-intro">
            <h3 className="pd-section-header text-center">
              RESIDENCES & LAYOUTS
            </h3>
            <p className="pd-fp-subtitle text-center">
              Meticulously crafted spaces designed for modern living
            </p>
          </div>

          <div className="pd-fp-controls-container">
            {/* BHK SELECTOR TOGGLE */}
            <div className="pd-bhk-toggle-wrapper">
              <span
                className={`pd-bhk-label ${activeFloorPlan === 0 ? "active" : ""}`}
              >
                2 BHK
              </span>
              <div
                className="pd-bhk-toggle-track"
                onClick={() =>
                  setActiveFloorPlan(activeFloorPlan === 0 ? 1 : 0)
                }
              >
                <motion.div
                  className="pd-bhk-toggle-thumb"
                  animate={{ x: activeFloorPlan === 0 ? 0 : 38 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </div>
              <span
                className={`pd-bhk-label ${activeFloorPlan === 1 ? "active" : ""}`}
              >
                3 BHK
              </span>
            </div>
          </div>

          <div className="pd-fp-main-display">
            <div className="pd-fp-image-container" onClick={openFloorPlan}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFloorPlan}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="pd-fp-image-wrapper"
                >
                  <img
                    src={project.floorPlans[activeFloorPlan].image}
                    alt={`${project.title} ${project.floorPlans[activeFloorPlan].type}`}
                    className="pd-fp-main-img"
                  />
                  <div className="pd-fp-hint-overlay">
                    <span>CLICK TO ENLARGE</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="pd-fp-info-container">
              <h4 className="pd-fp-spec-title">SPECIFICATIONS</h4>
              <div className="pd-fp-spec-table">
                <div className="pd-fp-spec-row">
                  <div className="pd-fp-spec-item-box">
                    <span className="pd-fp-spec-icon">📐</span>
                    <span className="pd-fp-spec-label">CARPET AREA</span>
                  </div>
                  <span className="pd-fp-spec-value">
                    {project.floorPlans[activeFloorPlan].carpetArea}
                  </span>
                </div>
                <div className="pd-fp-spec-row">
                  <div className="pd-fp-spec-item-box">
                    <span className="pd-fp-spec-icon">🌅</span>
                    <span className="pd-fp-spec-label">BALCONY SIZE</span>
                  </div>
                  <span className="pd-fp-spec-value">
                    {project.floorPlans[activeFloorPlan].balconySize}
                  </span>
                </div>
                <div className="pd-fp-spec-row">
                  <div className="pd-fp-spec-item-box">
                    <span className="pd-fp-spec-icon">📏</span>
                    <span className="pd-fp-spec-label">TOTAL AREA</span>
                  </div>
                  <span className="pd-fp-spec-value">
                    {project.floorPlans[activeFloorPlan].totalArea}
                  </span>
                </div>
                <div className="pd-fp-spec-row">
                  <div className="pd-fp-spec-item-box">
                    <span className="pd-fp-spec-icon">🛏️</span>
                    <span className="pd-fp-spec-label">BEDROOMS</span>
                  </div>
                  <span className="pd-fp-spec-value">
                    {project.floorPlans[activeFloorPlan].bedrooms}
                  </span>
                </div>
                <div className="pd-fp-spec-row">
                  <div className="pd-fp-spec-item-box">
                    <span className="pd-fp-spec-icon">🚿</span>
                    <span className="pd-fp-spec-label">BATHROOMS</span>
                  </div>
                  <span className="pd-fp-spec-value">
                    {project.floorPlans[activeFloorPlan].bathrooms}
                  </span>
                </div>
              </div>

              <div className="pd-fp-cta-box">
                <p className="pd-fp-cta-text">Interested in this layout?</p>
                <button
                  className="button button-solid pd-fp-cta-btn"
                  onClick={openWhatsApp}
                >
                  ENQUIRE FOR THIS PLAN
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FLOOR PLAN LIGHTBOX */}
      <AnimatePresence>
        {isFloorPlanOpen && (
          <motion.div
            className="pd-fp-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFloorPlanOpen(false)}
          >
            <motion.div
              className="pd-fp-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pd-fp-lightbox-toolbar">
                <div className="pd-fp-lightbox-meta">
                  <span className="pd-fp-lightbox-title">
                    {project.floorPlans[activeFloorPlan].type} PLAN
                  </span>
                  <span className="pd-fp-lightbox-area">
                    {project.floorPlans[activeFloorPlan].area}
                  </span>
                </div>
                <div className="pd-fp-lightbox-actions">
                  <button
                    className="pd-fp-action-btn"
                    onClick={() => setFpZoom((z) => Math.max(z - 0.1, 1))}
                  >
                    −
                  </button>
                  <span className="pd-fp-zoom-val">{fpZoomPercent}%</span>
                  <button
                    className="pd-fp-action-btn"
                    onClick={() => setFpZoom((z) => Math.min(z + 0.1, 2))}
                  >
                    +
                  </button>
                  <button
                    className="pd-fp-action-btn"
                    onClick={() => setFpZoom(1)}
                  >
                    RESET
                  </button>
                  <button
                    className="pd-fp-action-btn pd-fp-close"
                    onClick={() => setIsFloorPlanOpen(false)}
                  >
                    CLOSE
                  </button>
                </div>
              </div>

              {/* MOBILE DEDICATED CLOSE */}
              <button
                className="pd-mobile-fp-close"
                onClick={() => setIsFloorPlanOpen(false)}
              >
                Close
              </button>

              <div
                className="pd-fp-lightbox-viewport"
                ref={fpRef}
                onWheel={handleFpWheel}
                onTouchStart={handleFpTouchStart}
                onTouchMove={handleFpTouchMove}
                onTouchEnd={handleFpTouchEnd}
              >
                <motion.div
                  className="pd-fp-zoom-container"
                  drag={fpZoom > 1}
                  dragConstraints={{
                    left: -(370 * (fpZoom - 1)) / 2,
                    right: (370 * (fpZoom - 1)) / 2,
                    top: -(281 * (fpZoom - 1)) / 2,
                    bottom: (281 * (fpZoom - 1)) / 2,
                  }}
                  dragElastic={0.05}
                  dragMomentum={true}
                  style={{
                    width: `${fpZoom * 100}%`,
                    height: `${fpZoom * 100}%`,
                    cursor: fpZoom > 1 ? "move" : "default",
                    touchAction: fpZoom > 1 ? "none" : "pan-y",
                  }}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <img
                    src={project.floorPlans[activeFloorPlan].image}
                    alt={`${project.title} detailed ${project.floorPlans[activeFloorPlan].type} architectural drawing and carpet area`}
                    className="pd-fp-zoom-img"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL WIDTH LIFESTYLE & AMENITIES */}
      <section className="pd-fullwidth-section pd-reveal-line">
        <div className="container-fluid pd-px-side">
          <h3 className="pd-section-header text-center">
            LIFESTYLE & AMENITIES
          </h3>
          <div className="pd-amenity-grid">
            {project.amenities.map((amenity, idx) => (
              <motion.div
                key={idx}
                className="pd-amenity-card-alt"
                whileHover={{ scale: 1.02 }}
                style={{
                  backgroundImage: `url(${amenity.image})`,
                }}
              >
                <div className="pd-amenity-overlay-alt" />
                <div className="pd-amenity-icon-tag">{amenity.icon}</div>
                <div className="pd-amenity-content-alt">
                  <span className="pd-amenity-title-alt">{amenity.name}</span>
                  <p className="pd-amenity-text-alt">{amenity.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL WIDTH SITE GALLERY PORTFOLIO */}
      <section className="pd-fullwidth-section pd-gallery-section">
        <div className="container-fluid pd-px-side">
          <h3 className="pd-gallery-title">ARCHITECTURAL PORTFOLIO</h3>
          <div className="pd-gallery-asymmetric-grid">
            <div className="pd-gallery-main-item">
              <motion.img
                src={project.gallery[0]}
                alt="Main Portfolio"
                whileHover={{ scale: 1.02 }}
                className="pd-gallery-img-large"
              />
            </div>
            <div className="pd-gallery-sub-grid">
              {project.gallery.slice(1, 5).map((img, i) => (
                <motion.div
                  key={i}
                  className="pd-gallery-sub-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="pd-gallery-img-small"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & CONNECTIVITY SECTION (MOVED) */}
      <section className="pd-map-section pd-reveal-line">
        <div className="container">
          <div className="pd-map-grid">
            <div className="pd-map-info">
              <span className="pd-section-label">LOCATION & CONNECTIVITY</span>
              <h2 className="pd-section-header">Ready to Move Apartments in Ahmedabad</h2>
              <p className="pd-map-desc">
                Balaji Sky Harmony stands as one of the premier <strong>new projects in Vastral</strong>. 
                Experience the security of a <strong>gated community in Vastral</strong> with unparalleled access 
                to East Ahmedabad's key hubs. Our property is strategically located 
                <strong> near Metro Ahmedabad</strong> and the <strong>SP Ring Road</strong>, making it the 
                pinnacle of modern <strong>residential projects in Ahmedabad</strong>.
              </p>
              <div className="pd-connectivity-list">
                <div className="pd-conn-item">
                  <span className="pd-conn-icon">🚇</span>
                  <div>
                    <strong>Near Metro Station</strong>
                    <p>Just 5 minutes from Vastral Metro Station</p>
                  </div>
                </div>
                <div className="pd-conn-item">
                  <span className="pd-conn-icon">🛣️</span>
                  <div>
                    <strong>SP Ring Road Access</strong>
                    <p>Immediate connectivity to the ring road</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pd-map-frame-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.483184654316!2d72.6716697!3d23.0067052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87040d1fd361%3A0x823da28726465463!2sSky%20Harmony!5e0!3m2!1sen!2sin!4v1713690000000!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0, borderRadius: '20px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>


      <style>{`
                .pd-mobile-fp-close { display: none; }
                .text-center { text-align: center; }

                .pd-page-wrapper {
                    background-color: #0b0b0e !important;
                    min-height: 100vh;
                    width: 100%;
                    overflow-x: hidden;
                    position: relative;
                }

                .blueprint-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    opacity: 0.04;
                    background-size: 60px 60px;
                    background-image:
                      linear-gradient(to right, var(--primary-gold) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--primary-gold) 1px, transparent 1px);
                    animation: panDraft 30s linear infinite;
                    pointer-events: none;
                }

                @keyframes panDraft {
                    from { background-position: 0 0; }
                    to { background-position: -60px -60px; }
                }

                .pd-hero-container {
                    position: relative;
                    height: 80vh;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .pd-hero-bg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 1;
                }

                .pd-hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, #0b0b0e 10%, transparent 60%);
                    z-index: 2;
                }

                .pd-hero-content {
                    position: relative;
                    z-index: 10;
                    margin-top: 15vh;
                }

                .pd-status-tag {
                    display: inline-block;
                    padding: 0.6rem 1.4rem;
                    background: rgba(212,175,55,0.15);
                    border: 1px solid rgba(212,175,55,0.4);
                    color: var(--primary-gold) !important;
                    font-size: 0.7rem;
                    letter-spacing: 0.2rem;
                    border-radius: 40px;
                    margin-bottom: 2rem;
                    font-weight: 800;
                }

                .pd-main-title {
                    font-size: clamp(3rem, 10vw, 7rem);
                    font-weight: 900;
                    color: #fff !important;
                    line-height: 0.9;
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                }

                .pd-hero-tagline {
                    font-size: 1.5rem;
                    color: rgba(255,255,255,0.6) !important;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                }

                /* GRID SYSTEM */
                .pd-main-grid-section {
                    padding: 6rem 0 2rem 0;
                    position: relative;
                    z-index: 15;
                }

                .pd-master-grid {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 4rem;
                    align-items: start;
                }

                .pd-content-col {
                    display: flex;
                    flex-direction: column;
                    gap: 4rem;
                }

                .pd-sidebar-col {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                /* GLASS CARD */
                .pd-glass-card {
                    background: #131316 !important;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    padding: 3.5rem;
                    position: relative;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.3);
                }

                .pd-card-beam {
                    position: absolute;
                    top: 0;
                    right: 4rem;
                    width: 60px;
                    height: 3px;
                    background: var(--primary-gold);
                }

                .pd-section-header {
                    font-size: 1.2rem;
                    letter-spacing: 0.3rem;
                    color: var(--primary-gold) !important;
                    font-weight: 800;
                    margin-bottom: 2.5rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    text-transform: uppercase;
                }

                .pd-description {
                    font-size: 1.15rem;
                    line-height: 1.9;
                    color: rgba(255,255,255,0.7) !important;
                    margin-bottom: 2.5rem;
                }

                /* HIGHLIGHTS */
                .pd-highlights-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1.2rem;
                    margin-top: 1rem;
                }

                .pd-highlight-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.8rem;
                }

                .pd-h-dot {
                    color: var(--primary-gold);
                    font-size: 0.8rem;
                    margin-top: 0.3rem;
                }

                .pd-h-text {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.8);
                    line-height: 1.5;
                }

                /* SPECIFICATIONS */
                .pd-spec-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 2.5rem;
                }

                .pd-spec-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .pd-spec-category {
                    font-size: 0.7rem;
                    letter-spacing: 0.15rem;
                    color: var(--primary-gold);
                    font-weight: 800;
                }

                .pd-spec-val {
                    font-size: 1rem;
                    color: #fff;
                    font-weight: 400;
                    line-height: 1.5;
                }

                .pd-amenity-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .pd-amenity-card-alt {
                    position: relative;
                    aspect-ratio: 16/10;
                    border-radius: 12px;
                    overflow: hidden;
                    background-size: cover;
                    background-position: center;
                    cursor: pointer;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .pd-amenity-overlay-alt {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
                    z-index: 1;
                }

                .pd-amenity-icon-tag {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 36px;
                    height: 36px;
                    background: rgba(212,175,55,0.2);
                    border: 1px solid var(--primary-gold);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 5;
                    font-size: 1rem;
                    backdrop-filter: blur(4px);
                }

                .pd-amenity-content-alt {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 2rem;
                    z-index: 5;
                }

                .pd-amenity-title-alt {
                    display: block;
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: var(--primary-gold);
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1rem;
                }

                .pd-amenity-text-alt {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.4;
                    font-weight: 300;
                }

                /* SIDEBAR CARDS */
                .pd-sidebar-card {
                    background: #131316 !important;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 18px;
                    padding: 2.5rem;
                    position: relative;
                }

                .pd-sidebar-title {
                    font-size: 0.9rem;
                    letter-spacing: 0.2rem;
                    color: #fff !important;
                    font-weight: 800;
                    margin-bottom: 2rem;
                }

                .pd-sidebar-hint {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.3);
                    text-align: center;
                    margin-top: 1rem;
                    letter-spacing: 0.05rem;
                }

                .pd-sum-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                }

                .pd-sum-label {
                    font-size: 0.7rem;
                    color: var(--primary-gold) !important;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                .pd-sum-val {
                    font-size: 0.95rem;
                    font-weight: 600;
                }

                .pd-action-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 2.5rem;
                }

                .pd-btn-wa {
                    background: #25D366 !important;
                    border: none;
                    width: 100%;
                    color: #fff !important;
                    letter-spacing: 0.1rem;
                    justify-content: center;
                }

                .pd-btn-brochure {
                    width: 100%;
                    justify-content: center;
                }

                .pd-tour-preview {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    aspect-ratio: 16/9;
                }

                .pd-tour-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: blur(2px) brightness(0.6);
                }

                .pd-tour-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                .pd-tour-btn {
                    padding: 0.8rem 1.5rem;
                    background: transparent;
                    border: 1px solid var(--primary-gold);
                    color: var(--primary-gold);
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .pd-tour-btn:hover {
                    background: var(--primary-gold);
                    color: #000;
                }

                /* PREMIUM FLOOR PLAN SECTION */
                .pd-floorplan-section {
                    padding: 8rem 0;
                    background: #0b0b0e;
                }

                .pd-fp-intro {
                    margin-bottom: 4rem;
                }

                .pd-fp-subtitle {
                    color: rgba(255,255,255,0.4);
                    font-size: 1.1rem;
                    font-weight: 300;
                    margin-top: -1.5rem;
                }

                .pd-fp-controls-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                    gap: 2rem;
                    padding: 2rem;
                    background: #131316;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                }

                .pd-bhk-toggle-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .pd-bhk-label {
                    font-size: 1rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.2);
                    transition: color 0.3s;
                }

                .pd-bhk-label.active {
                    color: var(--primary-gold);
                }

                .pd-bhk-toggle-track {
                    width: 76px;
                    height: 36px;
                    background: #0b0b0e;
                    border: 1px solid var(--primary-gold);
                    border-radius: 100px;
                    padding: 4px;
                    cursor: pointer;
                    display: flex;
                }

                .pd-bhk-toggle-thumb {
                    width: 26px;
                    height: 26px;
                    background: var(--primary-gold);
                    border-radius: 50%;
                }

                .pd-floor-selector {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .pd-floor-label {
                    font-size: 0.8rem;
                    letter-spacing: 0.1rem;
                    color: rgba(255,255,255,0.4);
                    font-weight: 700;
                }

                .pd-floor-chips {
                    display: flex;
                    gap: 0.8rem;
                }

                .pd-floor-chip {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #0b0b0e;
                    border: 1px solid rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.6);
                    font-weight: 700;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .pd-floor-chip.active, .pd-floor-chip:hover {
                    background: var(--primary-gold);
                    color: #000;
                    border-color: var(--primary-gold);
                }

                .pd-fp-main-display {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    align-items: center;
                }

                .pd-fp-image-container {
                    background: #fff;
                    border-radius: 24px;
                    padding: 4rem;
                    position: relative;
                    cursor: zoom-in;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                }

                .pd-fp-image-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .pd-fp-main-img {
                    max-width: 100%;
                    max-height: 500px;
                    object-fit: contain;
                }

                .pd-fp-hint-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.05);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding-bottom: 2rem;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                .pd-fp-image-container:hover .pd-fp-hint-overlay {
                    opacity: 1;
                }

                .pd-fp-hint-overlay span {
                    padding: 0.8rem 1.5rem;
                    background: #000;
                    color: #fff;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.2rem;
                    border-radius: 100px;
                }

                .pd-fp-info-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .pd-fp-spec-title {
                    font-size: 1.5rem;
                    color: #fff !important;
                    font-weight: 900;
                    letter-spacing: 0.2rem;
                    position: relative;
                    padding-bottom: 1rem;
                }

                .pd-fp-spec-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 60px;
                    height: 4px;
                    background: var(--primary-gold);
                }

                .pd-fp-spec-table {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .pd-fp-spec-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.2rem;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 12px;
                    transition: transform 0.3s;
                }

                /* FULL WIDTH COMPONENTS */
                .pd-fullwidth-section {
                    width: 100%;
                    padding: 8rem 0;
                    position: relative;
                }

                .pd-px-side {
                    padding-left: 5% !important;
                    padding-right: 5% !important;
                }

                .pd-amenity-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                    margin-top: 3rem;
                }

                .pd-amenity-card-alt {
                    position: relative;
                    aspect-ratio: 16/10;
                    border-radius: 12px;
                    overflow: hidden;
                    background-size: cover;
                    background-position: center;
                    cursor: pointer;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .pd-amenity-overlay-alt {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);
                    z-index: 1;
                }

                .pd-amenity-icon-tag {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 36px;
                    height: 36px;
                    background: rgba(212,175,55,0.2);
                    border: 1px solid var(--primary-gold);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 5;
                    font-size: 1rem;
                    backdrop-filter: blur(4px);
                }

                .pd-amenity-content-alt {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 2rem;
                    z-index: 5;
                }

                .pd-amenity-title-alt {
                    display: block;
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: var(--primary-gold);
                    margin-bottom: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1rem;
                }

                .pd-amenity-text-alt {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.6);
                    line-height: 1.4;
                    font-weight: 300;
                }

                /* SIDEBAR CARDS */
                .pd-sidebar-card {
                    background: #131316 !important;
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 18px;
                    padding: 2.5rem;
                    position: relative;
                }

                .pd-sidebar-title {
                    font-size: 0.9rem;
                    letter-spacing: 0.2rem;
                    color: #fff !important;
                    font-weight: 800;
                    margin-bottom: 2rem;
                }

                .pd-sidebar-hint {
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.3);
                    text-align: center;
                    margin-top: 1rem;
                    letter-spacing: 0.05rem;
                }

                .pd-sum-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.04);
                }

                .pd-sum-label {
                    font-size: 0.7rem;
                    color: var(--primary-gold) !important;
                    text-transform: uppercase;
                    font-weight: 700;
                }

                .pd-sum-val {
                    font-size: 0.95rem;
                    font-weight: 600;
                }

                .pd-action-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 2.5rem;
                }

                .pd-btn-wa {
                    background: #25D366 !important;
                    border: none;
                    width: 100%;
                    color: #fff !important;
                    letter-spacing: 0.1rem;
                    justify-content: center;
                }

                .pd-btn-brochure {
                    width: 100%;
                    justify-content: center;
                }

                .pd-tour-preview {
                    position: relative;
                    border-radius: 12px;
                    overflow: hidden;
                    aspect-ratio: 16/9;
                }

                .pd-tour-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: blur(2px) brightness(0.6);
                }

                .pd-tour-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }

                .pd-tour-btn {
                    padding: 0.8rem 1.5rem;
                    background: transparent;
                    border: 1px solid var(--primary-gold);
                    color: var(--primary-gold);
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .pd-tour-btn:hover {
                    background: var(--primary-gold);
                    color: #000;
                }

                /* PREMIUM FLOOR PLAN SECTION */
                .pd-floorplan-section {
                    padding: 8rem 0;
                    background: #0b0b0e;
                }

                .pd-fp-intro {
                    margin-bottom: 4rem;
                }

                .pd-fp-subtitle {
                    color: rgba(255,255,255,0.4);
                    font-size: 1.1rem;
                    font-weight: 300;
                    margin-top: -1.5rem;
                }

                .pd-fp-controls-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 1rem auto 3rem auto;
                    width: fit-content;
                    max-width: 90%;
                    flex-wrap: wrap;
                    gap: 2rem;
                    padding: 1.5rem 4rem;
                    background: #131316;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                }

                .pd-bhk-toggle-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .pd-bhk-label {
                    font-size: 1rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.2);
                    transition: color 0.3s;
                }

                .pd-bhk-label.active {
                    color: var(--primary-gold);
                }

                .pd-bhk-toggle-track {
                    width: 76px;
                    height: 36px;
                    background: #0b0b0e;
                    border: 1px solid var(--primary-gold);
                    border-radius: 100px;
                    padding: 4px;
                    cursor: pointer;
                    display: flex;
                }

                .pd-bhk-toggle-thumb {
                    width: 26px;
                    height: 26px;
                    background: var(--primary-gold);
                    border-radius: 50%;
                }

                .pd-fp-main-display {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    align-items: center;
                }

                .pd-fp-image-container {
                    background: #fff;
                    border-radius: 24px;
                    padding: 4rem;
                    position: relative;
                    cursor: zoom-in;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.5);
                }

                .pd-fp-image-wrapper {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .pd-fp-main-img {
                    max-width: 100%;
                    max-height: 500px;
                    object-fit: contain;
                }

                .pd-fp-hint-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0,0,0,0.05);
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding-bottom: 2rem;
                    opacity: 0;
                    transition: opacity 0.3s;
                }

                /* REMOVED DUPLICATE BLOCKS */


                .pd-fp-spec-item-box {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .pd-fp-spec-icon {
                    font-size: 1.2rem;
                    opacity: 0.8;
                }

                .pd-fp-spec-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    color: rgba(255,255,255,0.4);
                    letter-spacing: 0.1rem;
                }

                .pd-fp-spec-value {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--primary-gold);
                }

                .pd-fp-cta-box {
                    margin-top: 1rem;
                    padding: 2.5rem;
                    background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%);
                    border-radius: 20px;
                    border: 1px solid rgba(212,175,55,0.2);
                    text-align: center;
                }

                .pd-fp-cta-text {
                    font-size: 1.1rem;
                    font-weight: 400;
                    color: rgba(255,255,255,0.6);
                    margin-bottom: 1.5rem;
                }

                .pd-fp-cta-btn {
                    width: 100%;
                    justify-content: center;
                }

                /* LIGHTBOX */
                .pd-fp-lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.95);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                }

                .pd-fp-lightbox-content {
                    width: 95vw;
                    height: 90vh;
                    background: #fff;
                    border-radius: 24px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }

                .pd-fp-lightbox-toolbar {
                    padding: 1.5rem 2.5rem;
                    background: #0b0b0e;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    z-index: 10;
                }

                .pd-fp-lightbox-meta {
                    display: flex;
                    flex-direction: column;
                }

                .pd-fp-lightbox-title {
                    font-size: 1.2rem;
                    font-weight: 900;
                    color: var(--primary-gold);
                    letter-spacing: 0.2rem;
                }

                .pd-fp-lightbox-area {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.5);
                }

                .pd-fp-lightbox-viewport {
                    flex: 1;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff;
                }

                .pd-fp-zoom-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .pd-fp-zoom-img {
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                }

                .pd-fp-lightbox-actions {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .pd-fp-action-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    transition: all 0.3s;
                }

                .pd-fp-action-btn:hover {
                    background: var(--primary-gold);
                    color: #000;
                }

                .pd-fp-zoom-val {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #fff;
                    min-width: 60px;
                    text-align: center;
                }

                .pd-fp-close {
                    width: auto !important;
                    padding: 0 1.5rem;
                    background: #ff4444 !important;
                    border: none;
                    font-size: 0.7rem;
                    font-weight: 800;
                    letter-spacing: 0.1rem;
                }

                /* ASYMMETRIC GALLERY */
                .pd-gallery-section {
                    padding: 6rem 0;
                }

                .pd-gallery-title {
                    font-size: 1.2rem;
                    letter-spacing: 0.3rem;
                    color: var(--primary-gold) !important;
                    font-weight: 800;
                    margin-bottom: 4rem;
                    text-align: center;
                }

                .pd-gallery-asymmetric-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 1.5rem;
                }

                .pd-gallery-main-item {
                    border-radius: 20px;
                    overflow: hidden;
                    height: auto;
                }

                .pd-gallery-img-large {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 20px;
                }

                .pd-gallery-sub-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .pd-gallery-sub-item {
                    border-radius: 16px;
                    overflow: hidden;
                    aspect-ratio: 1/1;
                }

                .pd-gallery-img-small {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                /* MAP SECTION */
                .pd-map-section { padding: 8rem 0; background: #08080a; }
                .pd-map-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: center; }
                .pd-map-info { display: flex; flex-direction: column; gap: 1.5rem; }
                .pd-section-label { color: var(--primary-gold); font-size: 0.8rem; font-weight: 800; letter-spacing: 0.2rem; }
                .pd-section-header { font-size: 2.5rem; color: #fff; font-weight: 900; line-height: 1.2; }
                .pd-map-desc { font-size: 1.1rem; color: rgba(255,255,255,0.6); line-height: 1.8; margin-bottom: 2rem; }
                .pd-map-desc strong { color: #fff; font-weight: 600; }
                .pd-connectivity-list { display: flex; flex-direction: column; gap: 2rem; }
                .pd-conn-item { display: flex; gap: 1.5rem; align-items: center; }
                .pd-conn-icon { font-size: 2rem; width: 60px; height: 60px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05); }
                .pd-conn-item strong { display: block; color: #fff; font-size: 1.1rem; margin-bottom: 0.3rem; }
                .pd-conn-item p { color: rgba(255,255,255,0.4); font-size: 0.9rem; }
                .pd-map-frame-container { box-shadow: 0 50px 100px rgba(0,0,0,0.5); border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
                @media (max-width: 991px) {
                    .pd-map-grid { grid-template-columns: 1fr; gap: 4rem; text-align: center; }
                    .pd-map-info { align-items: center; }
                    .pd-connectivity-list { align-items: flex-start; text-align: left; }
                }

                /* RESPONSIVE FIXES */
                @media (max-width: 1200px) {
                    .pd-master-grid { grid-template-columns: 1fr; gap: 4rem; }
                    .pd-sidebar-col { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                }

                @media (max-width: 991px) {
                    .pd-fp-main-display { grid-template-columns: 1fr; }
                    .pd-fp-image-container { padding: 2rem; }
                    .pd-gallery-asymmetric-grid { grid-template-columns: 1fr; }
                    .pd-amenity-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 768px) {
                    .pd-sidebar-col { grid-template-columns: 1fr; }
                    .pd-hero-container { height: 70vh; }
                    .pd-main-title { font-size: clamp(2.5rem, 12vw, 4rem); }
                    .pd-hero-tagline { font-size: 1.1rem; }
                    .pd-glass-card { padding: 1.8rem; }
                    .pd-section-header { font-size: 1rem; margin-bottom: 1.5rem; }
                    .pd-description { font-size: 1rem; line-height: 1.7; }
                    .pd-highlights-container { grid-template-columns: 1fr; }
                    .pd-spec-grid { grid-template-columns: 1fr; gap: 1.5rem; }
                    .pd-amenity-grid { grid-template-columns: 1fr; }
                    .pd-fp-main-display { gap: 2rem; }
                    .pd-fp-info-container { padding: 1.5rem; }
                    .pd-fp-spec-value { font-size: 0.85rem; }
                    .pd-fp-spec-label { font-size: 0.6rem; }
                    .pd-fp-lightbox-toolbar { padding: 1rem; flex-direction: column; gap: 1rem; text-align: center; }
                    .pd-fp-lightbox-actions { gap: 0.8rem; }
                    .pd-fp-action-btn { width: 35px; height: 35px; }

                    .pd-fp-controls-container { 
                        flex-direction: column; 
                        gap: 2rem; 
                        padding: 1rem; 
                        width: 100%; 
                    }
                    .pd-mobile-fp-close {
                        display: block;
                        position: absolute;
                        bottom: 2rem;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 100;
                        background: #000;
                        color: #fff;
                        padding: 0.8rem 2rem;
                        border-radius: 50px;
                        font-weight: 800;
                        font-size: 0.7rem;
                        letter-spacing: 0.1rem;
                        text-transform: uppercase;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    }
                }

                @media (max-width: 480px) {
                    .pd-hero-content { margin-top: 10vh; }
                    .pd-status-tag { padding: 0.4rem 1rem; font-size: 0.6rem; }
                    .pd-main-title { font-size: 2.2rem; }
                    .pd-glass-card { padding: 1.2rem; }
                }
            `}</style>
    </motion.div>
  );
};

export default ProjectDetail;
