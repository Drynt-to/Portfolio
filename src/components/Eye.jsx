import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

/* --- UPDATED OVAL EYE COMPONENT WITH OFFSET --- */
const Eye = ({ isDark, offsetX = 0 }) => {
  const eyeRef = useRef(null);
  const [isTouching, setIsTouching] = useState(false); 
  
  const springConfig = { stiffness: 150, damping: 15, mass: 1 };
  
  // 1. Initialize X spring with the offset value
  const springX = useSpring(offsetX, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    const updateEyePosition = (clientX, clientY) => {
      if (!eyeRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.hypot(dx, dy) / 5; 

      const maxRadiusX = 6; 
      const maxRadiusY = 12; 
      
      const a = maxRadiusX;
      const b = maxRadiusY;
      const maxDistanceAtAngle = (a * b) / Math.sqrt(Math.pow(b * Math.cos(angle), 2) + Math.pow(a * Math.sin(angle), 2));
      
      const clampedDistance = Math.min(distance, maxDistanceAtAngle);
      
      springX.set(Math.cos(angle) * clampedDistance);
      springY.set(Math.sin(angle) * clampedDistance);
    };

    const handleMouseMove = (e) => {
      if (isTouching) return;
      updateEyePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        updateEyePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = () => setIsTouching(true);
    
    const handleTouchEnd = () => {
      setIsTouching(false);
      // 2. Snap back to the OFFSET, not 0
      springX.set(offsetX); 
      springY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [springX, springY, isTouching, offsetX]); // Added offsetX to dependencies

  return (
    <div 
      ref={eyeRef}
      className={`relative w-8 h-9 md:w-9 md:h-10 rounded-full border-2 flex items-center justify-center overflow-hidden transition-colors duration-700 ${isDark ? 'border-white bg-[#1a1a1a]' : 'border-[#4A4036] bg-white'}`}
    >
      <motion.div 
        className={`w-4 h-5 md:w-5 md:h-6 rounded-full transition-colors duration-700 ${isDark ? 'bg-white' : 'bg-[#4A4036]'}`}
        style={{ x: springX, y: springY }}
      />
    </div>
  );
};

export default Eye;
