import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change automatically
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="nav-logo">
            BALAJI <span className="gold">SKY HARMONY</span>
          </Link>
          <div className="nav-links">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-item-num">0{navItems.indexOf(item) + 1}</span>
                <span className="nav-item-name">{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="nav-actions">
             <Link to="/contact" className="button button-solid mini nav-enquire-btn">Enquire</Link>
             <button 
                className="hamburger-btn" 
                onClick={() => setMenuOpen(!menuOpen)}
             >
                {menuOpen ? 'CLOSE' : 'MENU'}
             </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                   to={item.path} 
                   className={`mobile-menu-item ${location.pathname === item.path ? 'active' : ''}`}
                   onClick={() => setMenuOpen(false)}
                >
                   {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               style={{ marginTop: '2rem' }}
            >
               <Link to="/contact" className="button button-solid" onClick={() => setMenuOpen(false)}>Enquire Now</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
