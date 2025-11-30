import React from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const SpiralRing = ({ scrollY, index }) => {
    const scrollVelocity = useVelocity(scrollY);
    const rotateInput = useTransform(scrollVelocity, [-1000, 1000], [-45, 45]);
    const rotate = useSpring(rotateInput, { damping: 10, stiffness: 200 });

    return (
        <div className="relative group w-full flex justify-center py-1">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#2c251f] shadow-[inset_0_1px_4px_rgba(0,0,0,0.8)]"></div>
            <motion.div
                style={{ rotate }}
                className="relative z-10 w-[4px] h-[150%] md:w-[140%] md:h-[6px] rounded-full shadow-lg bg-gradient-to-b md:bg-gradient-to-r from-gray-500 via-gray-200 to-gray-600 origin-center"
            />
        </div>
    );
};

export default SpiralRing;
