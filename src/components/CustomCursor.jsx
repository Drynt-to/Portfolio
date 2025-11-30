import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';

const CustomCursor = ({ isDark }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const mouseDown = () => setIsClicking(true);
        const mouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', mouseDown);
            window.removeEventListener('mouseup', mouseUp);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            animate={{
                x: mousePos.x - 2,
                y: mousePos.y - 28,
                rotate: isClicking ? -20 : 0,
                scale: isClicking ? 0.9 : 1,
            }}
            transition={{
                x: { duration: 0 },
                y: { duration: 0 },
                default: { type: "spring", stiffness: 500, damping: 28 }
            }}
        >
            <Pencil
                size={32}
                className={`filter drop-shadow-lg transition-colors duration-700 ${isDark ? 'text-white fill-white/20' : 'text-[#4A4036] fill-[#4A4036]/20'}`}
                strokeWidth={2}
            />
        </motion.div>
    );
};

export default CustomCursor;
