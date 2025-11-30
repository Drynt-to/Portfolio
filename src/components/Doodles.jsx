import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const StarDoodle = ({ style, isDark }) => (
    <motion.div style={style} className={`absolute ${isDark ? 'text-white/20' : 'text-[#4A4036]/20'} pointer-events-none z-10 transition-colors duration-700`}>
        <Sparkles size={48} strokeWidth={1} />
    </motion.div>
);

export const SquiggleDoodle = ({ style, isDark }) => (
    <motion.div style={style} className={`absolute ${isDark ? 'text-[#D98E73]/50' : 'text-[#D98E73]/30'} pointer-events-none z-10 transition-colors duration-700`}>
        <svg width="60" height="20" viewBox="0 0 60 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 10C10 2 10 18 18 10C26 2 26 18 34 10C42 2 42 18 50 10C58 2 58 18 66 10" />
        </svg>
    </motion.div>
);
