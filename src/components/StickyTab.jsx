import React from 'react';
import { motion } from 'framer-motion';

const StickyTab = ({ label, icon: Icon, color, top, onClick, index }) => (
    <motion.button
        onClick={onClick}
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -60, opacity: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 120, damping: 12 }}
        className={`hidden md:flex absolute ${top} left-[65%] z-10 items-center gap-2 pl-10 pr-5 py-4 rounded-r-lg shadow-md ${color} text-[#4A4036] font-hand font-bold text-sm tracking-wide transition-transform hover:translate-x-3 cursor-none`}
        style={{ transformOrigin: "left center" }}
    >
        <span className="opacity-80"><Icon size={20} /></span>
        <span>{label}</span>
    </motion.button>
);

export default StickyTab;
