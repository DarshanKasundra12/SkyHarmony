import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Hidden initially
    gsap.set([cursorRef.current, followerRef.current], { opacity: 0 });

    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        opacity: 1
      });
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        opacity: 1,
        ease: 'power4.out',
      });
    };

    const handleHover = (isEnter) => {
      gsap.to(followerRef.current, {
        scale: isEnter ? 2.5 : 1,
        backgroundColor: isEnter ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
        borderColor: isEnter ? 'rgba(212, 175, 55, 0.8)' : 'var(--primary-gold)',
        duration: 0.3
      });
      gsap.to(cursorRef.current, {
        scale: isEnter ? 0.5 : 1,
        duration: 0.3
      });
    };

    const links = document.querySelectorAll('a, button, .clickable');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => handleHover(true));
      link.addEventListener('mouseleave', () => handleHover(false));
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => handleHover(true));
        link.removeEventListener('mouseleave', () => handleHover(false));
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--primary-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div 
        ref={followerRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid var(--primary-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'border-color 0.3s'
        }}
      />
    </>
  );
};

export default CustomCursor;
