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

  useEffect(() => {
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
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
    if (isFloorPlanOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFloorPlanOpen]);

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
      return Math.min(Math.max(newZoom, 1), 2); // Locked between 100% (1) and 200% (2)
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
      <Helmet>
        <title>{`${project.title} - Premium ${project.type} in ${project.location}`}</title>
        <meta name="description" content={`Discover ${project.title} by ${project.developer}. ${project.subtitle} in ${project.location}. Featuring ${project.type} configurations starting from ${project.priceRange}. Ready to move options available.`} />
        <meta name="keywords" content={`${project.title}, ${project.location}, ${project.developer}, ${project.type} flats Ahmedabad, Ready to move vastral`} />
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
                                        <span className="pd-spec-category">{key.toUpperCase()}</span>
                                        <p className="pd-spec-val">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

            <div className="pd-amenities-card-container pd-reveal-line">
              <h3 className="pd-section-header">LIFESTYLE & AMENITIES</h3>
              <div className="pd-amenity-grid">
                {project.amenities.map((amenity, idx) => (
                  <motion.div
                    key={idx}
                    className="pd-amenity-item"
                    whileHover={{ y: -10 }}
                    style={{
                      backgroundImage: `linear-gradient(rgba(11,11,14,0.7), rgba(11,11,14,0.95)), url(${amenity.image})`,
                    }}
                  >
                    <div className="pd-amenity-icon-box">{amenity.icon}</div>
                    <div className="pd-amenity-meta">
                      <span className="pd-amenity-label">{amenity.name}</span>
                      <p className="pd-amenity-desc">{amenity.desc}</p>
                    </div>
                  </motion.div>
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
              <div className="pd-fp-header">
                <h4 className="pd-sidebar-title">FLOOR PLANS</h4>
                <div className="pd-fp-tabs">
                  {project.floorPlans.map((p, i) => (
                    <button
                      key={i}
                      className={`pd-fp-tab ${activeFloorPlan === i ? "active" : ""}`}
                      onClick={() => setActiveFloorPlan(i)}
                    >
                      {p.type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pd-fp-viewport">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFloorPlan}
                    className="pd-fp-viewport"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    onClick={openFloorPlan}
                  >
                    <img
                      src={project.floorPlans[activeFloorPlan].image}
                      alt={`${project.title} ${project.floorPlans[activeFloorPlan].type} Floor Plan layout in ${project.location}`}
                      className="pd-fp-img"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="pd-fp-zoom-hint">CLICK TO ENLARGE</div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="pd-fp-footer">
                <span className="pd-fp-area-label">ESTIMATED AREA</span>
                <span className="pd-fp-area-val">
                  {project.floorPlans[activeFloorPlan].area}
                </span>
              </div>
            </div>
          </aside>
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
                ✕
              </button>

              <div
                className="pd-fp-lightbox-viewport"
                ref={fpRef}
                onWheel={handleFpWheel}
              >
                <motion.div
                  className="pd-fp-zoom-container"
                  drag={fpZoom > 1}
                  dragConstraints={{
                    left: -600,
                    right: 600,
                    top: -600,
                    bottom: 600,
                  }}
                  dragElastic={0.1}
                  dragMomentum={true}
                  style={{
                    width: `${fpZoom * 100}%`,
                    height: `${fpZoom * 100}%`,
                    cursor: fpZoom > 1 ? "move" : "default",
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

      {/* SITE GALLERY PORTFOLIO */}
      <section className="pd-gallery-section">
        <div className="container">
          <h3 className="pd-gallery-title">ARCHITECTURAL PORTFOLIO</h3>
          <div className="pd-gallery-masonry">
            {project.gallery.map((img, i) => (
              <motion.div
                key={i}
                className="pd-gallery-image-wrapper"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={img}
                  alt={`Architectural render of ${project.title} - View ${i + 1} of portfolio gallery`}
                  className="pd-gallery-img"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
                .pd-page-wrapper {
                    background-color: #0b0b0e !important;
                    min-height: 100vh;
                    overflow-x: hidden;
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
                    padding: 6rem 0;
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

                /* AMENITIES */
                .pd-amenity-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .pd-amenity-item {
                    aspect-ratio: 16/10;
                    border-radius: 16px;
                    padding: 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.05);
                    cursor: pointer;
                    transition: border 0.3s;
                }

                .pd-amenity-item::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 70%);
                    z-index: 1;
                }

                .pd-amenity-icon-box {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 45px;
                    height: 45px;
                    background: rgba(212,175,55,0.15);
                    color: var(--primary-gold);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-size: 1.3rem;
                    border: 1px solid rgba(212,175,55,0.3);
                    z-index: 10;
                }

                .pd-amenity-meta { position: relative; z-index: 10; }

                .pd-amenity-label {
                    display: block;
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #fff !important;
                    margin-bottom: 0.5rem;
                }

                .pd-amenity-desc {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.5) !important;
                    line-height: 1.4;
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

                /* FLOOR PLAN SECTION */
                .pd-fp-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .pd-fp-tabs {
                    display: flex;
                    background: #0b0b0e;
                    padding: 4px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .pd-fp-tab {
                    padding: 0.5rem 1rem;
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    font-size: 0.7rem;
                    font-weight: 800;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: all 0.3s;
                }

                .pd-fp-tab.active {
                    background: var(--primary-gold);
                    color: #000;
                }

                .pd-fp-viewport {
                    background: #fff;
                    border-radius: 12px;
                    // padding: 2.5rem;
                    // height: 280px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    position: relative;
                    cursor: zoom-in;
                }

                .pd-fp-zoom-hint {
                    position: absolute;
                    bottom: 1rem;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0,0,0,0.8);
                    color: var(--primary-gold);
                    font-size: 0.6rem;
                    font-weight: 900;
                    padding: 0.4rem 0.8rem;
                    border-radius: 4px;
                    letter-spacing: 0.1rem;
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                }

                .pd-fp-viewport:hover .pd-fp-zoom-hint {
                    opacity: 1;
                }

                .pd-fp-img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }

                /* LIGHTBOX CSS */
                .pd-fp-lightbox-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.95);
                    z-index: 6000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    backdrop-filter: blur(10px);
                }

                .pd-fp-lightbox-content {
                    width: min(1300px, 100%);
                    height: 90vh;
                    background: #0b0b0e;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    box-shadow: 0 50px 100px rgba(0,0,0,0.5);
                }

                .pd-fp-lightbox-toolbar {
                    padding: 1.5rem 2.5rem;
                    background: #131316;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .pd-fp-lightbox-title {
                    display: block;
                    font-size: 0.75rem;
                    letter-spacing: 0.15rem;
                    color: var(--primary-gold);
                    font-weight: 800;
                    margin-bottom: 0.3rem;
                }

                .pd-fp-lightbox-area {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: #fff;
                }

                .pd-fp-lightbox-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .pd-fp-action-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: #fff;
                    padding: 0.6rem 1rem;
                    border-radius: 8px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .pd-fp-action-btn:hover {
                    background: var(--primary-gold);
                    color: #000;
                    border-color: var(--primary-gold);
                }

                .pd-fp-zoom-val {
                    min-width: 60px;
                    text-align: center;
                    font-weight: 800;
                    color: var(--primary-gold);
                }

                .pd-fp-close {
                    background: rgba(255,0,0,0.1);
                    border-color: rgba(255,0,0,0.2);
                    color: #ff7777;
                }

                .pd-fp-close:hover {
                    background: #ff4444;
                    color: #fff;
                    border-color: #ff4444;
                }

                .pd-fp-lightbox-viewport {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff;
                }

                .pd-fp-zoom-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    touch-action: pinch-zoom;

                }

                .pd-fp-zoom-img {
                    max-width: 95%;
                    max-height: 95%;
                    object-fit: contain;
                }

                .pd-fp-footer {
                    margin-top: 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.85rem;
                }

                .pd-fp-area-label { color: rgba(255,255,255,0.4); }
                .pd-fp-area-val { color: var(--primary-gold); font-weight: 800; border-bottom: 1px dashed var(--primary-gold); }

                /* GALLERY MASONRY */
                .pd-gallery-section { padding: 8rem 0; border-top: 1px solid rgba(255,255,255,0.05); }
                .pd-gallery-title { text-align: center; font-size: 2rem; letter-spacing: 0.4rem; font-weight: 950; margin-bottom: 4rem; }
                .pd-gallery-masonry {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .pd-gallery-image-wrapper {
                    border-radius: 16px;
                    overflow: hidden;
                    aspect-ratio: 16/10;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .pd-gallery-img { width: 100%; height: 100%; object-fit: cover; }

                /* MODAL */
                .pd-brochure-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.85);
                    backdrop-filter: blur(8px);
                    z-index: 5000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }

                .pd-modal-content {
                    width: min(1200px, 100%);
                    height: 85vh;
                    background: #111;
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .pd-modal-toolbar {
                    padding: 1.5rem 2rem;
                    background: #151518;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .pd-modal-title { font-weight: 900; letter-spacing: 0.1rem; display: block; font-size: 0.8rem; color: var(--primary-gold); }
                .pd-modal-subtitle { font-size: 1rem; font-weight: 600; color: #fff; }

                .pd-modal-actions { display: flex; align-items: center; gap: 0.8rem; }
                .pd-modal-btn { background: #222; border: 1px solid #333; color: #fff; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-size: 0.8rem; font-weight: 800; }
                .pd-close-btn { background: rgba(255,0,0,0.1); border-color: rgba(255,0,0,0.3); color: #ff8888; }
                .pd-zoom-pill { font-size: 0.8rem; font-weight: 700; color: #fff; min-width: 50px; text-align: center; }

                .pd-modal-viewport { flex: 1; position: relative; overflow: hidden; background: #000; display: flex; justify-content: center; }
                .pd-pdf-container { position: relative; }
                .pd-pdf-object { width: 100%; height: 100%; }
                .pd-pan-shroud { position: absolute; inset: 0; z-index: 100; cursor: move; }

                @media (max-width: 1200px) {
                    .pd-master-grid { grid-template-columns: 1fr; gap: 3rem; }
                    .pd-sidebar-col { order: -1; }
                    .pd-sidebar-card { padding: 2rem; }
                }

                @media (max-width: 768px) {
                    .pd-hero-container { height: 60vh; }
                    .pd-main-title { font-size: 3.5rem; }
                    .pd-hero-tagline { font-size: 1.1rem; }
                    .pd-glass-card { padding: 2rem; }
                    .pd-section-header { font-size: 1rem; margin-bottom: 1.5rem; }
                    .pd-gallery-masonry { grid-template-columns: 1fr; }
                    .pd-gallery-section { padding: 4rem 0; }
                    
                    .pd-fp-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .pd-fp-tabs { width: 100%; justify-content: space-between; }
                    .pd-fp-tab { flex: 1; text-align: center; }

                    .pd-modal-content { height: 95vh; width: 95%; border-radius: 12px; }
                    .pd-modal-toolbar { padding: 1rem; flex-direction: column; gap: 1rem; }
                    .pd-modal-actions { width: 100%; justify-content: space-between; }

                    .pd-fp-lightbox-content { height: 100vh; width: 100%; border-radius: 0; }
                    .pd-fp-lightbox-toolbar { display: none; }
                    .pd-fp-lightbox-viewport { background: #fff; }
                    .pd-mobile-fp-close { 
                        display: flex; 
                        position: fixed; 
                        top: 25px; 
                        right: 25px; 
                        z-index: 9999;
                        width: 48px;
                        height: 48px;
                        background: rgba(10, 10, 14, 0.85);
                        color: var(--primary-gold);
                        border: 2px solid var(--primary-gold);
                        border-radius: 50%;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.4rem;
                        font-weight: 800;
                        backdrop-filter: blur(15px);
                        box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 15px rgba(212, 175, 55, 0.3);
                        transition: all 0.3s ease;
                    }
                    .pd-mobile-fp-close:active {
                        transform: scale(0.9);
                        background: var(--primary-gold);
                        color: #000;
                    }
                }

                @media (max-width: 480px) {
                    .pd-main-title { font-size: 2.8rem; }
                    .pd-status-tag { padding: 0.4rem 1rem; font-size: 0.6rem; }
                    .pd-amenity-grid { grid-template-columns: 1fr; }
                    .pd-description { font-size: 1rem; line-height: 1.7; }
                    .pd-sum-val { font-size: 0.85rem; }
                    .pd-fp-viewport { height: 200px; padding: 1rem; }
                    .pd-sum-row { padding: 0.8rem 0; }
                }

                .pd-mobile-fp-close { display: none; }
            `}</style>
    </motion.div>
  );
};

export default ProjectDetail;
