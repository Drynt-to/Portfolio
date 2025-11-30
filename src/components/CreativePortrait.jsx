import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Eraser, Trash2, X } from 'lucide-react';

const CreativePortrait = ({ image, baseImage, isDark }) => {
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [tool, setTool] = useState('pen'); // 'pen' or 'eraser'
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const toggleDrawingMode = (e) => {
        e.stopPropagation(); // Prevent bubbling
        setIsDrawingMode(!isDrawingMode);
        setTool('pen'); // Reset to pen when opening
    };

    // Load saved drawing on mount
    useEffect(() => {
        const savedDrawing = localStorage.getItem('userDrawing');
        if (savedDrawing && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
            img.src = savedDrawing;
        }
    }, []);

    // Handle drawing - Mouse events
    const startDrawing = (e) => {
        if (!isDrawingMode) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Calculate scale factors
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 3;
            ctx.strokeStyle = isDark ? '#FDFBF7' : '#2a2a2a';
        }

        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing || !isDrawingMode) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
            localStorage.setItem('userDrawing', canvas.toDataURL());
        }
    };

    // Handle drawing - Touch events for mobile
    const startDrawingTouch = (e) => {
        if (!isDrawingMode) return;
        e.preventDefault(); // Prevent scrolling while drawing
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 3;
            ctx.strokeStyle = isDark ? '#FDFBF7' : '#2a2a2a';
        }

        setIsDrawing(true);
    };

    const drawTouch = (e) => {
        if (!isDrawing || !isDrawingMode) return;
        e.preventDefault(); // Prevent scrolling while drawing
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        localStorage.removeItem('userDrawing');
    };

    // Random border radius values for the blob animation
    const blobVariants = {
        animate: {
            borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 60% 70% 40% / 50% 60% 30% 60%",
                "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const floatVariants = {
        animate: {
            y: [0, -15, 0],
            rotate: [0, 2, -1, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Container that floats */}
            <motion.div
                variants={floatVariants}
                animate="animate"
                className="relative w-64 h-64 md:w-96 md:h-96 group flex items-center justify-center"
                whileHover={!isDrawingMode ? { scale: 1.05, rotate: 2 } : {}}
            >
                {/* 1. The Blob Background (Decorative) */}
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    className={`absolute inset-0 w-full h-full opacity-20 filter blur-xl transition-colors duration-700 ${isDark ? 'bg-[#D98E73]' : 'bg-[#E6C6A6]'
                        }`}
                />

                {/* 2. The Masked Base Image (Inside the blob) */}
                <motion.div
                    variants={blobVariants}
                    animate="animate"
                    className={`absolute inset-0 w-full h-full overflow-hidden border-4 shadow-inner transition-colors duration-700 ${isDark ? 'border-[#E0E0E0]/20 bg-[#2a2a2a]' : 'border-[#4A4036]/20 bg-[#FDFBF7]'
                        }`}
                >
                    <img
                        src={baseImage}
                        alt="Portrait Base"
                        className="w-[100%] h-[100%] object-cover opacity-90"
                    />
                </motion.div>

                {/* 3. The Pop-out Image (On top, unmasked) */}
                <div className="absolute inset-0 z-10 w-full h-full flex items-end justify-center pointer-events-none">
                    <img
                        src={image}
                        alt="Portrait Pop-out"
                        style={{
                            marginBottom: '0px',
                            transform: 'translateY(29%) translateX(0%)'
                        }}
                        className="w-[100%] h-[240%] object-contain drop-shadow-xl"
                    />
                </div>

                {/* 4. Drawing Canvas Overlay */}
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={600}
                    className={`absolute inset-0 z-30 w-full h-[150%] -top-[25%] touch-none ${isDrawingMode ? 'cursor-crosshair pointer-events-auto' : 'pointer-events-none'}`}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawingTouch}
                    onTouchMove={drawTouch}
                    onTouchEnd={stopDrawing}
                />

                {/* Drawing Toolbar */}
                <AnimatePresence>
                    {isDrawingMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            className={`absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 p-2 rounded-full shadow-xl z-50 ${isDark ? 'bg-[#2a2a2a] border border-gray-700' : 'bg-white border border-gray-200'}`}
                        >
                            <button
                                onClick={() => setTool('pen')}
                                className={`p-2 rounded-full transition-colors ${tool === 'pen' ? 'bg-yellow-300 text-black' : (isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
                                title="Pen"
                            >
                                <Pencil size={20} />
                            </button>
                            <button
                                onClick={() => setTool('eraser')}
                                className={`p-2 rounded-full transition-colors ${tool === 'eraser' ? 'bg-yellow-300 text-black' : (isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')}`}
                                title="Eraser"
                            >
                                <Eraser size={20} />
                            </button>
                            <div className="w-px bg-gray-300 mx-1 self-center h-6"></div>
                            <button
                                onClick={clearCanvas}
                                className={`p-2 rounded-full transition-colors ${isDark ? 'text-white hover:bg-red-900/50 hover:text-red-400' : 'text-gray-700 hover:bg-red-50 hover:text-red-500'}`}
                                title="Clear All"
                            >
                                <Trash2 size={20} />
                            </button>
                            <div className="w-px bg-gray-300 mx-1 self-center h-6"></div>
                            <button
                                onClick={toggleDrawingMode}
                                className={`p-2 rounded-full transition-colors ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                title="Close"
                            >
                                <X size={20} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* "Me!" Tag / Toggle Button (Only show when NOT drawing) */}
                {!isDrawingMode && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        onClick={toggleDrawingMode}
                        className={`absolute -bottom-4 -right-4 px-4 py-1 rounded-full font-hand text-lg font-bold shadow-md rotate-[-10deg] z-40 cursor-pointer hover:scale-110 transition-transform ${isDark ? 'bg-[#D98E73] text-white' : 'bg-[#4A4036] text-[#FDFBF7]'
                            }`}
                    >
                        Draw on me!
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
};

export default CreativePortrait;
