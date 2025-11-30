import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileHint = ({ isDark }) => {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Wait 4 seconds, then fade out
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          // md:hidden ensures it NEVER shows on desktop
          className="fixed bottom-12 left-0 w-full flex justify-center z-[80] md:hidden pointer-events-none"
        >
          <div className={`
            px-6 py-2 rounded-full backdrop-blur-md shadow-lg
            font-hand font-bold text-sm tracking-wide
            ${isDark ? 'bg-white/10 text-white' : 'bg-black/5 text-[#4A4036]'}
          `}>
            ✨ Tip: Try touch & drag anywhere!
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileHint;