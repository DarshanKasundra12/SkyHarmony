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
        window.open('https://wa.me/919876543210?text=I%20would%20like%20to%20inquire%20about%20your%20projects.', '_blank');
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
                         <div className="con-detail-row con-stagger-item">
                             <h4 className="con-detail-label">DIRECT CONTACT</h4>
                             <p className="con-detail-value">+91 98765 43210 <br /> +91 91234 56789</p>
                         </div>
                         <div className="con-detail-row con-stagger-item border-none">
                             <h4 className="con-detail-label">DIGITAL CORRESPONDENCE</h4>
                             <p className="con-detail-value">sales@balajiconstruction.com <br /> info@balajiconstruction.com</p>
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
                            <h3>CLIENT INQUIRY FORUM</h3>
                            <div className="measuring-line" />
                        </div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="con-input-block">
                                <label>FULL NAME</label>
                                <input type="text" placeholder="Your esteemed name" className="con-input" />
                                <div className="con-input-baseline" />
                            </div>
                            <div className="con-input-block">
                                <label>EMAIL ADDRESS</label>
                                <input type="email" placeholder="email@example.com" className="con-input" />
                                <div className="con-input-baseline" />
                            </div>
                            <div className="con-input-block">
                                <label>PROJECT INTEREST</label>
                                <textarea rows="3" placeholder="Tell us about the bespoke requirements you seek..." className="con-input textarea"></textarea>
                                <div className="con-input-baseline" />
                            </div>
                            
                            <motion.button 
                                type="submit" 
                                className="button button-solid con-submit-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                TRANSMIT INQUIRY
                            </motion.button>
                            
                            <div className="con-whatsapp-divider">
                                 <span className="divider-text">OR CONNECT INSTANTLY</span>
                                 <div className="divider-line" />
                            </div>

                            <motion.button 
                                type="button" 
                                className="button button-solid con-wa-btn" 
                                onClick={openWhatsApp}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                CHAT ON WHATSAPP
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

            </div>

            <style>{`
                .contact-page-wrapper {
                    background-color: #0b0b0e !important;
                    min-height: 100vh;
                    width: 100%;
                    overflow: hidden;
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
                }

                .measuring-line {
                    width: 50px;
                    height: 3px;
                    background: var(--primary-gold);
                    margin-bottom: 3.5rem;
                }

                .con-input-block {
                    margin-bottom: 3rem;
                    position: relative;
                }

                .con-input-block label {
                    display: block;
                    margin-bottom: 0.8rem;
                    font-size: 0.75rem;
                    color: var(--primary-gold) !important;
                    letter-spacing: 0.15rem;
                    font-weight: 800;
                }

                .con-input {
                    width: 100%;
                    border: none;
                    background: transparent;
                    padding: 1rem 0;
                    color: #fff !important;
                    font-size: 1.15rem;
                    outline: none;
                    font-family: var(--sans);
                }

                .con-input::placeholder {
                    color: rgba(255,255,255,0.2) !important;
                }

                .con-input.textarea {
                    resize: none;
                }

                .con-input-baseline {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                    transition: all 0.3s;
                }

                .con-input:focus + .con-input-baseline {
                    background: var(--primary-gold) !important;
                    height: 2px;
                }

                .con-submit-btn {
                    width: 100%;
                    padding: 1.5rem;
                    font-weight: 800;
                    letter-spacing: 0.15rem;
                    font-size: 0.95rem;
                    margin-top: 1rem;
                }

                .con-whatsapp-divider {
                    text-align: center;
                    padding: 3rem 0;
                    position: relative;
                }

                .divider-text {
                    background: #141416 !important;
                    padding: 0 1.5rem;
                    position: relative;
                    z-index: 5;
                    font-size: 0.7rem;
                    color: rgba(255,255,255,0.4) !important;
                    letter-spacing: 0.2rem;
                }

                .divider-line {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: rgba(255,255,255,0.1);
                    z-index: 1;
                }

                .con-wa-btn {
                    width: 100%;
                    padding: 1.5rem;
                    background: #25D366 !important;
                    color: #fff !important;
                    font-weight: 800;
                    letter-spacing: 0.15rem;
                    font-size: 0.95rem;
                    border: none;
                    box-shadow: 0 10px 20px rgba(37, 211, 102, 0.1);
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
