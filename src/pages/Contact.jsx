import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Contact = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        let ctx = gsap.context(() => {
            // Safe fromTo stagger entrance to prevent StrictMode opacity bugs
            gsap.fromTo('.con-stagger-item', 
                { opacity: 0, x: -40 },
                { opacity: 1, x: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
            );

            // Form entrance coming from right
            gsap.fromTo('.con-form-container', 
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const openWhatsApp = () => {
        window.open('https://wa.me/919712909405?text=I%20would%20like%20to%20inquire%20about%20your%20projects.', '_blank');
    };

    return (
        <motion.div className="contact-page-wrapper"
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Architectural Blueprint Background Animation */}
            <div className="blueprint-bg" />

            <div className="container contact-grid">
                
                <div className="con-info-panel">
                    <span className="con-badge gold con-stagger-item">GET IN TOUCH</span>
                    <h2 className="con-title con-stagger-item">CONNECT WITH <br /> <span className="gold">OUR ELITE TEAM</span></h2>
                    
                    <div className="con-details-list">
                         <div className="con-detail-row con-stagger-item">
                             <h4 className="con-detail-label">OFFICE HEADQUARTERS</h4>
                             <p className="con-detail-value">Balaji Construction Hub, <br /> Near SP Ring Road, <br /> Vastral, Ahmedabad - 382418</p>
                         </div>
                         <div className="con-detail-row con-stagger-item border-none">
                             <h4 className="con-detail-label">DIRECT CONTACT</h4>
                             <p className="con-detail-value">+91 97129 09405</p>
                         </div>

                    </div>
                </div>

                <div className="con-form-panel">
                    <motion.div 
                        className="con-form-container"
                        whileHover={{ boxShadow: "0 25px 60px rgba(0,0,0,0.4)", y: -5 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="con-form-header">
                            <h3>WHATSAPP FAST-TRACK</h3>
                            <div className="measuring-line" />
                        </div>
                        
                        <div className="wa-redirect-box">
                            <p className="wa-redirect-intro">
                                Experience immediate consultation. Connect directly with our elite sales concierge for real-time project details, pricing, and private site visits.
                            </p>
                            
                            <div className="wa-feature-list">
                                <div className="wa-feature">
                                    <span className="wa-icon">✦</span> Instant Project Brochures
                                </div>
                                <div className="wa-feature">
                                    <span className="wa-icon">✦</span> Real-time Availability
                                </div>
                                <div className="wa-feature">
                                    <span className="wa-icon">✦</span> Book Site Visits
                                </div>
                            </div>

                            <motion.button 
                                type="button" 
                                className="con-wa-big-btn" 
                                onClick={openWhatsApp}
                                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(37, 211, 102, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                CHAT ON WHATSAPP
                            </motion.button>
                            
                            <p className="wa-security-note">
                                Secure & Direct Connection to Balaji Construction Sales Hub.
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>

            <style>{`
                .contact-page-wrapper {
                    background-color: #0b0b0e !important;
                    min-height: 100vh;
                    width: 100%;
                    overflow-x: hidden;
                    position: relative;
                    padding-top: 15vh;
                    padding-bottom: 8rem;
                }

                /* Architectural Grid Background */
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

                .contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1.1fr;
                    gap: 6rem;
                    position: relative;
                    z-index: 10;
                    max-width: 1300px;
                }

                .con-info-panel {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .con-badge.gold {
                    display: inline-block;
                    color: var(--primary-gold) !important;
                    letter-spacing: 0.4rem;
                    font-weight: 800;
                    font-size: 0.8rem;
                    margin-bottom: 2rem;
                    border-bottom: 2px solid var(--primary-gold);
                    padding-bottom: 0.5rem;
                }

                .con-title {
                    font-size: clamp(3.5rem, 6vw, 5.5rem);
                    font-weight: 900;
                    color: #fff !important;
                    line-height: 1.1;
                    margin-bottom: 3.5rem;
                    font-family: 'Noto Serif', serif;
                }

                .con-title .gold {
                    color: var(--primary-gold) !important;
                }

                .con-details-list {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .con-detail-row {
                    padding-bottom: 2.5rem;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }

                .con-detail-row.border-none {
                    border-bottom: none;
                    padding-bottom: 0;
                }

                .con-detail-label {
                    color: var(--primary-gold) !important;
                    font-size: 0.8rem;
                    letter-spacing: 0.2rem;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    font-weight: 800;
                }

                .con-detail-value {
                    font-size: 1.35rem;
                    color: rgba(255,255,255,0.8) !important;
                    line-height: 1.6;
                    font-weight: 400;
                }

                .con-form-panel {
                    display: flex;
                    align-items: center;
                }

                .con-form-container {
                    background: #141416 !important;
                    padding: 4rem;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-top: 4px solid var(--primary-gold);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    width: 100%;
                }

                .con-form-header h3 {
                    color: #fff !important;
                    font-size: 1.4rem;
                    letter-spacing: 0.15rem;
                    margin-bottom: 1rem;
                    font-weight: 800;
                }

                .measuring-line {
                    width: 50px;
                    height: 3px;
                    background: var(--primary-gold);
                    margin-bottom: 3.5rem;
                }

                /* New WhatsApp Redirect UI Styles */
                .wa-redirect-box {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .wa-redirect-intro {
                    color: rgba(255,255,255,0.6) !important;
                    font-size: 1.05rem;
                    line-height: 1.6;
                    margin: 0;
                }

                .wa-feature-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.2rem;
                }

                .wa-feature {
                    color: #fff !important;
                    font-size: 0.9rem;
                    letter-spacing: 0.1rem;
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                }

                .wa-icon {
                    color: var(--primary-gold);
                    margin-right: 12px;
                    font-size: 1.2rem;
                }

                .con-wa-big-btn {
                    width: 100%;
                    padding: 1.5rem;
                    background: #25D366 !important;
                    color: #fff !important;
                    font-weight: 800;
                    letter-spacing: 0.15rem;
                    font-size: 1rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.2);
                    transition: all 0.3s ease;
                }

                .wa-security-note {
                    text-align: center;
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.3) !important;
                    letter-spacing: 0.05rem;
                    margin: 0;
                }

                @media (max-width: 1024px) {
                    .contact-page-wrapper { padding-top: 10rem; }
                    .contact-grid { grid-template-columns: 1fr; gap: 4rem; padding: 0 5%; }
                    .con-title { font-size: clamp(3rem, 8vw, 4rem); }
                    .con-form-container { padding: 3rem 2rem; }
                }
            `}</style>
        </motion.div>
    );
};

export default Contact;
