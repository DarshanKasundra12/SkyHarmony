import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        // GSAP Context ensures clean animations in React 18 Strict Mode
        let ctx = gsap.context(() => {
            
            // 1. Initial Hero Stagger (Simulating building a structure)
            gsap.fromTo('.build-up-val', 
                { opacity: 0, y: 60, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out' }
            );

            // 2. Animated Number Counters
            gsap.utils.toArray('.stat-num').forEach(stat => {
                const targetVal = stat.getAttribute('data-target');
                gsap.to(stat, {
                    innerHTML: targetVal,
                    duration: 3,
                    snap: { innerHTML: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".stats-row",
                        start: "top 90%"
                    }
                });
            });

            // 3. Grid Cards Flip Entrance (Like blueprints folding out)
            gsap.fromTo('.detail-item', 
                { opacity: 0, rotationX: -60, y: 50, transformOrigin: 'top center' },
                { 
                    opacity: 1, rotationX: 0, y: 0, duration: 1.2, stagger: 0.15, ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: '.details-grid',
                        start: "top 85%"
                    }
                }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const openWhatsApp = () => {
        window.open('https://wa.me/919876543210?text=I%20am%20interested%20in%20knowing%20more%20about%20your%20projects.', '_blank');
    };

    return (
        <motion.div className="about-page-wrapper"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <section className="about-hero hero-safe-padding">
                {/* Architectural Blueprint Background Animation */}
                <div className="blueprint-bg" />
                
                <div className="container about-grid-centered">
                    <div className="about-header build-up-val">
                        <span className="subtitle gold">OUR ARCHITECTURAL LEGACY</span>
                        <h2 className="section-title-main">ENGINEERING SPACES <br /> THAT HARMONIZE LIVES</h2>
                    </div>

                    <div className="about-content-hero build-up-val">
                        <p className="about-intro-text">
                           With over two decades of structural excellence, Balaji Construction has been a pioneer in Ahmedabad's skyline. Since 1998, we have laid absolute foundations built on a relentless pursuit of transparency, timely delivery, and unmatched architectural precision.
                        </p>
                        
                        <div className="stats-row">
                             <div className="stat-card">
                                <span className="stat-num-container">
                                    <span className="stat-num" data-target="25">0</span>
                                    <span className="stat-suffix">+</span>
                                </span>
                                <span className="stat-lab">Projects Constructed</span>
                             </div>
                             <div className="stat-card">
                                <span className="stat-num-container">
                                    <span className="stat-num" data-target="5">0</span>
                                    <span className="stat-suffix">K+</span>
                                </span>
                                <span className="stat-lab">Happy Families</span>
                             </div>
                             <div className="stat-card">
                                <span className="stat-num-container">
                                    <span className="stat-num" data-target="15">0</span>
                                    <span className="stat-suffix">+</span>
                                </span>
                                <span className="stat-lab">Award Recognitions</span>
                             </div>
                        </div>
                    </div>

                    <div className="about-cta build-up-val">
                         <button className="button button-solid whatsapp-director-btn" onClick={openWhatsApp}>
                             Connect with our Director
                         </button>
                    </div>
                </div>
            </section>

            <section className="about-details">
                <div className="container">
                    <div className="details-grid">
                         <div className="detail-item">
                            <div className="detail-icon-box">
                                <div className="detail-icon">01</div>
                                <div className="structural-line" />
                            </div>
                            <h4 className="detail-title">BLUEPRINT VISION</h4>
                            <p className="detail-desc">To be the gold standard in luxury real estate by delivering robust innovation that transcends time.</p>
                         </div>
                         <div className="detail-item">
                            <div className="detail-icon-box">
                                <div className="detail-icon">02</div>
                                <div className="structural-line" />
                            </div>
                            <h4 className="detail-title">STRUCTURAL MISSION</h4>
                            <p className="detail-desc">Engineering sophisticated, sustainable environments where modern communities thrive.</p>
                         </div>
                         <div className="detail-item">
                            <div className="detail-icon-box">
                                <div className="detail-icon">03</div>
                                <div className="structural-line" />
                            </div>
                            <h4 className="detail-title">CORE VALUES</h4>
                            <p className="detail-desc">Upholding integrity and customer-centric design as our core foundational pillars.</p>
                         </div>
                    </div>
                </div>
            </section>

            <style>{`
                .about-page-wrapper {
                    background-color: #0b0b0e !important;
                    min-height: 100vh;
                    width: 100%;
                    overflow: hidden;
                    text-align: center;
                }

                /* --- Construction/Blueprint Animation Layer --- */
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
                }

                @keyframes panDraft {
                    from { background-position: 0 0; }
                    to { background-position: -60px -60px; }
                }
                /* ---------------------------------------------- */

                .hero-safe-padding {
                    padding: 12rem 5% 8rem;
                    position: relative;
                }

                .about-grid-centered {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 1000px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 10;
                }

                .subtitle.gold {
                    display: block;
                    font-size: 0.85rem;
                    color: var(--primary-gold, #d4af37) !important;
                    letter-spacing: 0.5rem;
                    font-weight: 800;
                    margin-bottom: 2rem;
                    text-transform: uppercase;
                }

                .section-title-main {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 900;
                    color: #fff !important;
                    line-height: 1.15;
                    margin: 0 0 3.5rem;
                    font-family: 'Noto Serif', serif;
                    text-shadow: 0 8px 25px rgba(0,0,0,0.6);
                }

                .about-intro-text {
                    max-width: 800px;
                    margin: 0 auto 5rem;
                    font-size: 1.25rem;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.75) !important;
                }

                .stats-row {
                    display: flex;
                    justify-content: center;
                    gap: 6rem;
                    flex-wrap: wrap;
                }

                .stat-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.8rem;
                    position: relative;
                }

                .stat-card::after {
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    width: 40px;
                    height: 2px;
                    background: var(--primary-gold);
                    opacity: 0.5;
                }

                .stat-num-container {
                    display: flex;
                    align-items: baseline;
                    color: #fff !important;
                }

                .stat-num {
                    font-size: 4.5rem;
                    font-weight: 900;
                    line-height: 1;
                    font-variant-numeric: tabular-nums;
                }

                .stat-suffix {
                    font-size: 3rem;
                    font-weight: 800;
                    color: var(--primary-gold);
                }

                .stat-lab {
                    color: rgba(255,255,255,0.6) !important;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15rem;
                    font-weight: 700;
                }

                .about-cta {
                    margin-top: 6rem;
                }

                .whatsapp-director-btn {
                    padding: 1.2rem 3rem;
                    background: #25D366 !important;
                    color: #fff !important;
                    font-weight: 800;
                    font-size: 0.9rem;
                    letter-spacing: 0.15rem;
                    border: none;
                    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.15);
                    transition: transform 0.3s;
                }

                .whatsapp-director-btn:hover {
                    transform: translateY(-5px);
                }

                .about-details {
                    padding: 8rem 5%;
                    background: #101014 !important;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }

                .details-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 3rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .detail-item {
                    background: #18181b !important;
                    padding: 4rem 3rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-top: 3px solid var(--primary-gold); /* Construction beam motif */
                    text-align: left;
                    transition: all 0.4s;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
                }

                .detail-item:hover {
                    background: #1c1c1f !important;
                    border-color: rgba(212, 175, 55, 0.3);
                }

                .detail-icon-box {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                }

                .detail-icon {
                    font-size: 2rem;
                    color: #fff !important;
                    font-weight: 900;
                }

                .structural-line {
                    height: 2px;
                    flex: 1;
                    background: repeating-linear-gradient(90deg, var(--primary-gold), var(--primary-gold) 10px, transparent 10px, transparent 15px);
                    opacity: 0.5;
                }

                .detail-title {
                    font-size: 1.8rem;
                    color: #fff !important;
                    margin-bottom: 1.5rem;
                    font-family: 'Noto Serif', serif;
                    letter-spacing: 0.05rem;
                }

                .detail-desc {
                    color: rgba(255, 255, 255, 0.6) !important;
                    font-size: 1.15rem;
                    line-height: 1.7;
                }

                @media (max-width: 768px) {
                    .hero-safe-padding { padding: 8rem 5% 4rem; }
                    .stats-row { gap: 4rem; flex-direction: column; }
                    .stat-card::after { bottom: -1.5rem; }
                    .detail-item { padding: 3rem 2rem; }
                }
            `}</style>
        </motion.div>
    );
};

export default About;
