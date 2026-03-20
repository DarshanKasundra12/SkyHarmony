import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../data/projects";
import { gsap } from "gsap";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === id);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project && containerRef.current) {
      // Using gsap.context prevents the React 18 Strict Mode double-fire bug
      let ctx = gsap.context(() => {
        // Proper fromTo animation ensures opacity solidly reaches 1
        gsap.fromTo(
          ".stagger-item",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          },
        );

        // Specific Staggered Entrance for Amenities Cards
        gsap.fromTo(
          ".pd-amenity-card",
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: ".pd-amenities-grid",
              start: "top 85%",
            },
          },
        );

        // Added a cinematic scale-down entrance for the hero image
        gsap.fromTo(
          ".hero-img-detail",
          { scale: 1.15, filter: "brightness(0.1)" },
          {
            scale: 1,
            filter: "brightness(0.7)",
            duration: 1.8,
            ease: "power2.out",
          },
        );
      }, containerRef);
      return () => ctx.revert(); // Cleanup GSAP tweens cleanly
    }
  }, [id, project]);

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
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(project.whatsappMsg)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      className="project-detail-layout"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="pd-hero-section">
        <img
          src={project.mainImage}
          alt={project.title}
          className="hero-img-detail"
        />
        <div className="pd-hero-scrim" />

        <div className="pd-hero-content container">
          <div className="stagger-item">
            <span className="pd-badge gold">{project.status}</span>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-subtitle">{project.subtitle}</p>
          </div>
        </div>
      </div>

      <section className="pd-main-section">
        <div className="container pd-grid">
          <div className="pd-layout-main">
            <div className="pd-glass-card stagger-item">
              <h3 className="pd-card-heading">PROJECT OVERVIEW</h3>
              <p className="pd-overview-text">{project.overview}</p>
            </div>

            <div className="pd-amenities-section stagger-item">
              <h3 className="pd-card-heading">LIFE AT HARMONY</h3>
              <div className="pd-amenities-grid">
                {project.amenities.map((amenity, idx) => (
                  <motion.div
                    key={idx}
                    className="pd-amenity-card"
                    initial="idle"
                    whileHover="hover"
                    variants={{
                      idle: { y: 0, backgroundColor: "rgba(25, 25, 28, 0.5)" },
                      hover: {
                        y: -5,
                        backgroundColor: "rgba(212,175,55,0.05)",
                      },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="pd-icon-circle"
                      variants={{
                        idle: {
                          backgroundColor: "rgba(212, 175, 55, 0.1)",
                        },
                        hover: {
                          backgroundColor: "rgba(212, 175, 55, 0.2)",
                        },
                      }}
                    >
                      {/* Using the static reliable icon, but applying an infinite wiggle/bounce when the card is hovered */}
                      <motion.div
                         variants={{
                            idle: { rotate: 0, scale: 1 },
                            hover: { 
                                rotate: [0, -15, 15, -10, 10, 0], 
                                scale: [1, 1.2, 1.2, 1.2, 1.2, 1],
                                transition: { duration: 0.6, repeat: Infinity, repeatType: "loop" } 
                            }
                         }}
                         style={{ display: "flex", originX: 0.5, originY: 0.5 }}
                      >
                         {amenity.icon}
                      </motion.div>
                    </motion.div>
                    <div className="pd-amenity-info">
                      <span className="pd-amenity-name">{amenity.name}</span>
                      <span className="pd-amenity-desc">{amenity.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="pd-layout-sidebar">
            <div className="pd-summary-card stagger-item">
              <div className="pd-summary-row">
                <span className="pd-sum-label">Location</span>
                <span className="pd-sum-value">{project.location}</span>
              </div>
              <div className="pd-summary-row">
                <span className="pd-sum-label">Configuration</span>
                <span className="pd-sum-value">{project.type}</span>
              </div>
              <div className="pd-summary-row">
                <span className="pd-sum-label">Price Range</span>
                <span className="pd-sum-value">{project.priceRange}</span>
              </div>
              <div className="pd-summary-row border-none">
                <span className="pd-sum-label">Possession</span>
                <span className="pd-sum-value">{project.possession}</span>
              </div>

              <div className="pd-sidebar-actions">
                <button
                  className="button button-solid pd-whatsapp-btn"
                  onClick={openWhatsApp}
                >
                  Inquire on WhatsApp
                </button>
                <button
                  className="button button-outline"
                  style={{
                    width: "100%",
                    borderColor: "rgba(212,175,55,0.5)",
                    color: "#d4af37",
                  }}
                >
                  Download Brochure
                </button>
              </div>
            </div>

            <div className="pd-floor-plan-card stagger-item">
              <h3 className="pd-fp-heading">TYPICAL FLOOR PLAN</h3>
              <motion.div
                className="pd-fp-image-wrapper"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={project.floorPlan}
                  alt="Floor Plan"
                  className="pd-fp-image"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="pd-gallery-section stagger-item">
        <div className="container">
          <h3 className="pd-card-heading center">SITE GALLERY</h3>
          <div className="pd-gallery-grid">
            {project.gallery.map((img, i) => (
              <motion.div
                key={i}
                className="pd-gallery-item"
                whileHover={{ scale: 1.04, rotate: 0.5 }}
              >
                <img
                  src={img}
                  alt={`Gallery ${i}`}
                  className="pd-gallery-img"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
                .project-detail-layout {
                    background-color: #0b0b0e !important;
                    min-height: 100vh;
                    color: #fff;
                    font-family: var(--sans);
                    overflow: hidden;
                }

                .pd-hero-section {
                    position: relative;
                    width: 100%;
                    height: 80vh;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .hero-img-detail {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                }

                .pd-hero-scrim {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, #0b0b0e 0%, rgba(11,11,14,0.3) 100%);
                    z-index: 1;
                }

                .pd-hero-content {
                    position: relative;
                    z-index: 10;
                    padding-top: 10rem;
                }

                .pd-badge.gold {
                    display: inline-block;
                    padding: 0.5rem 1.2rem;
                    background: rgba(212, 175, 55, 0.15);
                    border: 1px solid rgba(212, 175, 55, 0.3);
                    color: var(--primary-gold, #d4af37) !important;
                    font-size: 0.75rem;
                    letter-spacing: 0.2rem;
                    text-transform: uppercase;
                    border-radius: 30px;
                    margin-bottom: 2rem;
                }

                .pd-title {
                    font-size: clamp(3rem, 7vw, 6rem);
                    font-weight: 900;
                    color: #fff !important;
                    line-height: 1;
                    margin: 0 0 1rem;
                    text-transform: uppercase;
                }

                .pd-subtitle {
                    font-size: 1.5rem;
                    color: rgba(255, 255, 255, 0.8) !important;
                    font-weight: 400;
                }

                .pd-main-section {
                    position: relative;
                    z-index: 10;
                    padding: 4rem 0 6rem;
                    background-color: #0b0b0e !important;
                }

                .pd-grid {
                    display: grid;
                    grid-template-columns: 1fr 380px;
                    gap: 3rem;
                }

                .pd-glass-card {
                    background: #141416 !important;
                    padding: 3rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    margin-bottom: 3rem;
                }

                .pd-card-heading {
                    font-size: 1.3rem;
                    color: #fff !important;
                    letter-spacing: 0.15rem;
                    margin-bottom: 2rem;
                    border-left: 3px solid var(--primary-gold);
                    padding-left: 1rem;
                }

                .pd-card-heading.center {
                    text-align: center;
                    border-left: none;
                    padding-left: 0;
                    margin-bottom: 3rem;
                }

                .pd-overview-text {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.75) !important;
                }

                .pd-amenities-section {
                    background: #141416 !important;
                    padding: 3rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .pd-amenities-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                .pd-amenity-card {
                    background: rgba(25, 25, 28, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.02);
                    border-radius: 12px;
                    padding: 1.5rem;
                    display: flex;
                    align-items: flex-start;
                    gap: 1.2rem;
                    transition: all 0.3s;
                    cursor: pointer;
                }

                .pd-icon-circle {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: rgba(212, 175, 55, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    color: var(--primary-gold) !important;
                    flex-shrink: 0;
                }

                .pd-amenity-info {
                    display: flex;
                    flex-direction: column;
                }

                .pd-amenity-name {
                    font-weight: 700;
                    color: #fff !important;
                    margin-bottom: 0.3rem;
                    font-size: 1.1rem;
                }

                .pd-amenity-desc {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5) !important;
                    line-height: 1.4;
                }

                /* Sidebar */
                .pd-layout-sidebar {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }

                .pd-summary-card {
                    background: #141416 !important;
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    position: sticky;
                    top: 100px;
                }

                .pd-summary-row {
                    display: flex;
                    flex-direction: column;
                    padding-bottom: 1.5rem;
                    margin-bottom: 1.5rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .pd-summary-row.border-none {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }

                .pd-sum-label {
                    font-size: 0.75rem;
                    color: var(--primary-gold) !important;
                    letter-spacing: 0.1rem;
                    text-transform: uppercase;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                }

                .pd-sum-value {
                    font-size: 1.15rem;
                    color: #fff !important;
                    font-weight: 600;
                }

                .pd-sidebar-actions {
                    margin-top: 2.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .pd-whatsapp-btn {
                    width: 100%;
                    background: #25D366 !important;
                    color: #fff !important;
                    border: none;
                }

                .pd-floor-plan-card {
                    background: #fff !important;
                    padding: 2.5rem;
                    border-radius: 20px;
                }

                .pd-fp-heading {
                    font-size: 1.1rem;
                    color: #131314 !important;
                    text-align: center;
                    letter-spacing: 0.15rem;
                    margin-bottom: 1.5rem;
                    font-weight: 800;
                }

                .pd-fp-image-wrapper {
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    cursor: pointer;
                }

                .pd-fp-image {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                /* Gallery */
                .pd-gallery-section {
                    padding: 4rem 0 8rem;
                    background: #0b0b0e !important;
                }

                .pd-gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.5rem;
                }

                .pd-gallery-item {
                    border-radius: 12px;
                    overflow: hidden;
                    height: 250px;
                    cursor: pointer;
                }

                .pd-gallery-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @media (max-width: 1024px) {
                    .pd-grid { grid-template-columns: 1fr; }
                    .pd-hero-section { height: 60vh; }
                    .pd-glass-card, .pd-amenities-section { padding: 2rem; }
                    .pd-summary-card { position: static; }
                }
            `}</style>
    </motion.div>
  );
};

export default ProjectDetail;
