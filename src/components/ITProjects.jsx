import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ExternalLink, Paperclip, Code2, Calendar, User, X, Package, Activity, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { IT_PROJECTS } from '../data';

const getProjectIcon = (id, size = 20, className = "") => {
    switch (id) {
        case 'p1': return <img src="https://res.cloudinary.com/ddts06l2q/image/upload/v1764356119/buat_yang_diatas_lic4qz.png" alt="Cathalina" className={`object-cover rounded ${className}`} style={{ width: size, height: size }} />;
        case 'p2': return <img src="https://res.cloudinary.com/ddts06l2q/image/upload/v1764507906/NewLogoUkb_xemelo.png" alt="Betlehem" className={`object-cover rounded ${className}`} style={{ width: size, height: size }} />;
        case 'p3': return <img src="https://res.cloudinary.com/ddts06l2q/image/upload/v1764508265/icon_vroom_psswr1.png" alt="VroomWash" className={`object-cover rounded ${className}`} style={{ width: size, height: size }} />;
        case 'p4': return <img src="https://res.cloudinary.com/ddts06l2q/image/upload/v1764509132/Jellycat_Birthday_Cake_w2cbzp.jpg" alt="CakeBot" className={`object-cover rounded ${className}`} style={{ width: size, height: size }} />;
        default: return <Code2 size={size} className={className} />;
    }
};

const ITProjects = ({ isDark }) => {
    const [activeTab, setActiveTab] = useState(IT_PROJECTS[0].id);
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    const activeProject = IT_PROJECTS.find(p => p.id === activeTab);

    // Reset image index when tab changes
    useEffect(() => {
        setCurrentImageIndex(0);
        setIsExpanded(false);
    }, [activeTab]);

    const toggleFolder = () => setIsOpen(!isOpen);

    const nextImage = (e) => {
        e.stopPropagation();
        if (activeProject.images && activeProject.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % activeProject.images.length);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (activeProject.images && activeProject.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
        }
    };

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-20 md:py-32 relative z-10 perspective-2000">
            {/* Full Screen Lightbox */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleExpand}
                        className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4 md:p-10 backdrop-blur-sm"
                    >
                        <button
                            onClick={toggleExpand}
                            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors hidden md:block"
                        >
                            <X size={32} />
                        </button>

                        <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
                            <motion.img
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                src={activeProject.images[currentImageIndex]}
                                alt="Full screen view"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                onClick={e => e.stopPropagation()}
                            />

                            {/* Navigation in Lightbox */}
                            {activeProject.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col items-center mb-16">
                <h2 className={`font-hand text-5xl md:text-7xl ${isDark ? 'text-[#E0E0E0]' : 'text-[#4A4036]'} transition-colors duration-700 mb-4`}>
                    IT Projects
                </h2>
                <div className={`h-1 w-24 rounded-full ${isDark ? 'bg-[#E0E0E0]/30' : 'bg-[#4A4036]/30'}`} />
            </div>

            {/* Folder Container */}
            <div
                className="relative w-full max-w-6xl mx-auto h-[700px] md:h-[650px]"
                onClick={() => isOpen && setIsOpen(false)}
            >
                {/* BACK COVER (Static base) */}
                <div
                    className={`
            absolute inset-0 rounded-r-2xl rounded-bl-2xl border-2 shadow-xl
            ${isDark ? 'bg-[#2a2a2a] border-[#444]' : 'bg-[#dcbfa6] border-[#8B735B]'}
          `}
                >
                    {/* Tabs (Attached to Back Cover) */}
                    <div className="absolute -top-10 left-0 w-full flex flex-row justify-center gap-2 z-0 md:flex-col md:w-auto md:h-auto md:-right-12 md:top-8 md:left-auto md:justify-start">
                        {IT_PROJECTS.map((project, index) => (
                            <motion.button
                                key={project.id}
                                onClick={() => {
                                    setActiveTab(project.id);
                                    if (!isOpen) setIsOpen(true);
                                }}
                                className={`
                  relative flex items-center justify-center
                  font-body font-bold text-sm tracking-widest
                  transition-all duration-300
                  
                  /* Mobile Styles */
                  h-10 w-12 rounded-t-xl border-t-2 border-x-2 border-b-0
                  
                  /* Desktop Styles */
                  md:w-16 md:h-16 md:rounded-r-xl md:rounded-tl-none md:border-y-2 md:border-r-2 md:border-l-0
                  
                  ${activeTab === project.id
                                        ? (isDark
                                            ? 'bg-[#2a2a2a] border-[#444] text-white translate-y-1 md:translate-y-0 md:translate-x-2'
                                            : 'bg-[#dcbfa6] border-[#8B735B] text-[#4A4036] translate-y-1 md:translate-y-0 md:translate-x-2')
                                        : (isDark
                                            ? 'bg-[#1a1a1a] border-[#333] text-gray-500 hover:bg-[#222]'
                                            : 'bg-[#ccb096] border-[#D7C4B0] text-[#8B735B] hover:bg-[#d4bba3]')}
                `}
                                style={{
                                    // Only apply margin offset on desktop
                                    marginTop: window.innerWidth >= 768 ? `${index * 10}px` : '0px'
                                }}
                                whileHover={{
                                    x: window.innerWidth >= 768 ? 5 : 0,
                                    y: window.innerWidth < 768 ? -2 : 0
                                }}
                                title={project.title}
                            >
                                {getProjectIcon(project.id, 20)}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* PAPER CONTENT (Inside) */}
                <motion.div
                    initial={false}
                    animate={{
                        x: isOpen ? 0 : 0,
                        y: isOpen ? -20 : 0,
                        scale: isOpen ? 1 : 0.98
                    }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute inset-4 md:inset-6 bg-[#fdfbf7] shadow-sm rounded-lg overflow-hidden z-10 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Paper Texture */}
                    <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                    {/* Content */}
                    <div className="relative z-10 p-2 h-full flex flex-col">
                        {/* Close Button for Mobile/Convenience */}


                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="flex-1 flex flex-col h-full overflow-y-auto"
                            >
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b-2 border-dashed border-gray-300 pb-4">
                                    <div>
                                        <h3 className="font-hand text-4xl md:text-5xl font-bold text-[#2c251f]">
                                            {activeProject.title}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 font-mono text-sm text-gray-500">
                                            <Calendar size={14} />
                                            <span>{activeProject.year}</span>
                                            <span>•</span>
                                            <User size={14} />
                                            <span>{activeProject.role}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={activeProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#4A4036] font-bold text-sm hover:bg-[#4A4036] hover:text-[#FDFBF7] transition-colors"
                                    >
                                        <span>View Project</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>

                                {/* Body */}
                                <div className="flex-1 grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-2">Description</h4>
                                            <p className="font-body text-lg leading-relaxed text-[#5c4d42]">
                                                {activeProject.desc}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-2">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeProject.tech.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-md text-sm font-mono border bg-gray-50 text-gray-600 border-gray-200"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Image Gallery / Placeholder */}
                                    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center min-h-[200px] relative overflow-hidden group">
                                        {activeProject.images && activeProject.images.length > 0 ? (
                                            <div
                                                className="relative w-full h-full flex items-center justify-center bg-gray-100 cursor-zoom-in"
                                                onClick={toggleExpand}
                                            >
                                                <img
                                                    src={activeProject.images[currentImageIndex]}
                                                    alt={`${activeProject.title} screenshot ${currentImageIndex + 1}`}
                                                    className="w-full h-full object-cover"
                                                />

                                                {/* Navigation Buttons (Only if > 1 image) */}
                                                {activeProject.images.length > 1 && (
                                                    <>
                                                        <button
                                                            onClick={prevImage}
                                                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <ChevronLeft size={20} className="text-gray-700" />
                                                        </button>
                                                        <button
                                                            onClick={nextImage}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                                                        >
                                                            <ChevronRight size={20} className="text-gray-700" />
                                                        </button>

                                                        {/* Dots Indicator */}
                                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                                            {activeProject.images.map((_, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="text-center p-6">
                                                <Folder size={48} className="mx-auto mb-2 text-gray-300" />
                                                <span className="font-hand text-xl text-gray-400">Project Screenshot</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* FRONT COVER (Rotates Open) */}
                <motion.div
                    onClick={toggleFolder}
                    initial={false}
                    animate={{
                        rotateY: isOpen ? -180 : 0,
                    }}
                    style={{ transformOrigin: 'left' }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    className={`
            absolute inset-0 rounded-r-2xl rounded-bl-2xl border-2 shadow-2xl z-20 cursor-pointer
            flex flex-col items-center justify-center overflow-hidden
            ${isDark ? 'bg-[#2a2a2a] border-[#444]' : 'bg-[#e6c6a6] border-[#8B735B]'}
          `}
                >
                    {/* Project Icon Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        {getProjectIcon(activeProject.id, 300, isDark ? 'text-white' : 'text-[#4A4036]')}
                    </div>

                    <Folder size={48} className={`opacity-50 ${isDark ? 'text-white' : 'text-[#4A4036]'}`} />
                    <span className={`mt-2 font-hand text-xl ${isDark ? 'text-gray-300' : 'text-[#4A4036]/70'}`}>
                        Click to Open
                    </span>
                    <span className={`mt-2 font-hand text-xl ${isDark ? 'text-gray-300' : 'text-[#4A4036]/70'}`}>
                        {activeProject.title}
                    </span>
                </motion.div>

            </div>
        </section>
    );
};

export default ITProjects;
