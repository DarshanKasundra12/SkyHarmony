import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    let ctx = gsap.context(() => {
        // Hero Text Entrance
        gsap.fromTo('.port-hero-stagger', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
        );

        // Project Cards Reveal on Scroll
        gsap.utils.toArray('.port-card-wrapper').forEach((card) => {
            gsap.fromTo(card, 
                { opacity: 0, y: 100 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                    }
                }
            );
        });

        // Image Parallax Effect
        gsap.utils.toArray('.port-img').forEach((img) => {
            gsap.to(img, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: img.parentNode,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = (project) => {
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(project.whatsappMsg)}`, '_blank');
  };

  return (
    <div className="port-page-body" ref={pageRef}>
      
      {/* Background Architectural Elements */}
      <div className="port-bg-lines" />

      <section className="port-header-section">
        <div className="container">
          <div className="port-header-content">
             <span className="port-badge port-hero-stagger">PORTFOLIO</span>
             <h2 className="port-main-title port-hero-stagger">WHERE VISION <br /> <span className="gold">MEETS REALITY</span></h2>
             <p className="port-desc port-hero-stagger">
               A selection of premium projects engineered to elevate your standard of living through architectural excellence and modern innovation.
             </p>
          </div>
        </div>
      </section>

      <section className="port-list-section">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          <div className="port-list-grid">
            {projectsData.map((project, index) => {
              const isEvent = index % 2 === 0;
              return (
                <div key={project.id} className={`port-card-wrapper ${isEvent ? 'layout-left' : 'layout-right'}`}>
                  
                  <motion.div 
                    className="port-visual-box"
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                  >
                    <Link to={`/project/${project.id}`}>
                        <div className="port-img-container">
                        <motion.img 
                            src={project.mainImage} 
                            alt={project.title} 
                            className="port-img"
                            variants={{
                                rest: { scale: 1.15, filter: "brightness(0.6)" },
                                hover: { scale: 1.25, filter: "brightness(0.95)", transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                        />
                        <div className="port-status-tag">{project.status}</div>
                        </div>
                    </Link>
                  </motion.div>

                  <div className="port-info-box">
                    <span className="port-location">{project.location}</span>
                    <h3 className="port-proj-title">{project.title}</h3>
                    <div className="port-measuring-line" />
                    
                    <p className="port-proj-desc">{project.overview.substring(0, 160)}...</p>
                    
                    <div className="port-amenities-wrap">
                      {project.amenities.slice(0, 4).map(am => (
                        <span key={am.name} className="port-amenity-chip">{am.name}</span>
                      ))}
                    </div>
                    
                    <div className="port-action-group">
                       <Link to={`/project/${project.id}`} className="button button-solid port-btn-view">View Blueprint</Link>
                       <button className="button button-solid port-btn-wa" onClick={() => openWhatsApp(project)}>
                         Inquire on WhatsApp
                       </button>
                    </div>
                  </div>

                </div>
              );
            })}
            
            {/* Future Project Card */}
            <div className="port-card-wrapper layout-left" style={{ opacity: 0.5 }}>
                  <div className="port-visual-box">
                    <div className="port-img-container" style={{ filter: 'grayscale(1)' }}>
                      <img src="/assets/hero.png" alt="Future Project" className="port-img" style={{ scale: '1.15', opacity: 0.4 }} />
                      <div className="port-status-tag" style={{ background: '#333' }}>COMING SOON</div>
                    </div>
                  </div>
                  <div className="port-info-box">
                    <span className="port-location">Science City, Ahmedabad</span>
                    <h3 className="port-proj-title">BALAJI LIFESTYLE VILLAS</h3>
                    <div className="port-measuring-line" />
                    <p className="port-proj-desc">The next benchmark in ultra-luxury structural engineering is coming.</p>
                    <div className="port-action-group">
                       <button className="button button-outline port-btn-view" disabled>Stay Tuned</button>
                    </div>
                  </div>
            </div>

          </div>

        </div>
      </section>

      <style>{`
        .port-page-body {
          background-color: #08080a !important;
          min-height: 100vh;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        /* Architectural Grid Background */
        .port-bg-lines {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
          background-image: linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px);
          background-size: 100px 100px;
          opacity: 0.5;
        }

        .port-header-section {
          padding: 14rem 5% 6rem;
          position: relative;
          z-index: 10;
        }

        .port-header-content {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }

        .port-badge {
          display: inline-block;
          color: var(--primary-gold) !important;
          letter-spacing: 0.5rem;
          font-weight: 800;
          font-size: 0.85rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid var(--primary-gold);
          padding-bottom: 0.5rem;
        }

        .port-main-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          color: #fff !important;
          line-height: 1.1;
          margin: 0 0 2rem;
          font-family: 'Noto Serif', serif;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .port-main-title .gold {
          color: var(--primary-gold) !important;
        }

        .port-desc {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7) !important;
          max-width: 700px;
          margin: 0 auto;
        }

        .port-list-section {
          padding-bottom: 10rem;
        }

        .port-list-grid {
          display: flex;
          flex-direction: column;
          gap: 8rem;
          margin-top: 4rem;
        }

        .port-card-wrapper {
          display: flex;
          align-items: center;
          gap: 6rem;
        }

        .port-card-wrapper.layout-right {
          flex-direction: row-reverse;
        }

        .port-visual-box {
          flex: 1;
          width: 50%;
        }

        .port-img-container {
          position: relative;
          width: 100%;
          height: 600px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          /* Metallic border to fit construction theme */
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .port-img {
          width: 100%;
          height: 130%; /* Extra height for smooth parallax scrub */
          object-fit: cover;
          position: absolute;
          top: -15%;
          left: 0;
          will-change: transform;
        }

        .port-status-tag {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: var(--primary-gold);
          color: #131314 !important;
          padding: 0.6rem 1.2rem;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 4px;
          letter-spacing: 0.1rem;
          z-index: 10;
        }

        .port-info-box {
          flex: 1;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .port-location {
          color: var(--primary-gold) !important;
          letter-spacing: 0.2rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .port-proj-title {
          font-size: 3rem;
          color: #fff !important;
          margin: 0 0 1.5rem;
          font-family: 'Noto Serif', serif;
          line-height: 1.1;
        }

        .port-measuring-line {
          width: 60px;
          height: 3px;
          background: var(--primary-gold);
          margin-bottom: 2rem;
        }

        .port-proj-desc {
          color: rgba(255,255,255,0.65) !important;
          font-size: 1.15rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        .port-amenities-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-bottom: 3.5rem;
        }

        .port-amenity-chip {
          display: inline-block;
          padding: 0.5rem 1.2rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 30px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.8) !important;
          background: rgba(255,255,255,0.03);
        }

        .port-action-group {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .port-btn-view {
          min-width: 200px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          letter-spacing: 0.1rem;
        }

        .port-btn-wa {
          background: #25D366 !important;
          color: #fff !important;
          min-width: 200px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          letter-spacing: 0.1rem;
          border: none;
        }

        @media (max-width: 1024px) {
          .port-header-section { padding-top: 10rem; }
          .port-list-grid { gap: 6rem; }
          .port-card-wrapper, .port-card-wrapper.layout-right { 
            flex-direction: column; 
            gap: 3rem; 
          }
          .port-visual-box, .port-info-box { width: 100%; }
          .port-img-container { height: 400px; }
          .port-proj-title { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
};

export default Projects;
