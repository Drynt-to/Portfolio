import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';

const Handwriting = ({ words }) => {
    const [index, setIndex] = useState(0);
    const [isWriting, setIsWriting] = useState(true);
    const currentWord = words[index % words.length];

    useEffect(() => {
        let timer;
        if (isWriting) {
            // Writing Phase: Variable speed based on length
            const timeToWrite = currentWord.length * 200;
            const timeToWait = 1500; // Pause at end of word

            timer = setTimeout(() => {
                setIsWriting(false);
            }, timeToWrite + timeToWait);
        } else {
            // Erasing Phase: Faster "scribble out"
            const timeToErase = 800;

            timer = setTimeout(() => {
                setIndex(prev => prev + 1);
                setIsWriting(true);
            }, timeToErase);
        }
        return () => clearTimeout(timer);
    }, [isWriting, index, currentWord]);

    return (
        <div className="inline-flex items-center relative">
            <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: isWriting ? "auto" : 0 }}
                transition={{
                    duration: isWriting ? currentWord.length * 0.2 : 0.8,
                    ease: isWriting ? "linear" : "easeInOut"
                }}
                className="overflow-hidden whitespace-nowrap flex-shrink-0 z-10"
            >
                {currentWord}
            </motion.div>

            {/* The Pen Tip */}
            <motion.div
                animate={isWriting ? {
                    // Subtle jitter to mimic hand movement
                    y: [0, -0.5, 0.5, -0.5, 0],
                    x: [0, 0.5, -0.5, 0],
                    rotate: [0, -1, 1, 0]
                } : {
                    y: 0, x: 0, rotate: 0
                }}
                transition={{
                    repeat: isWriting ? Infinity : 0,
                    duration: 0.2,
                    ease: "linear"
                }}
                // Position the pen right at the end of the text
                className="ml-0 text-[#D98E73] relative -top-2"
            >
                <Pencil size={32} fill="currentColor" />
            </motion.div>
        </div>
    );
};

export default Handwriting;
