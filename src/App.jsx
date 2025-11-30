import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion';
import { Mail, Instagram, Github, Linkedin, Send, Palette, ExternalLink, Image as ImageIcon, Sparkles, Home, Briefcase, FileText, Moon, Sun, Menu, X, Pencil } from 'lucide-react';

import { PROJECTS } from './data';
import './App.css';

import ITProjects from './components/ITProjects';
import Eye from './components/Eye';
import CustomCursor from './components/CustomCursor';
import SpiralRing from './components/SpiralRing';
import StickyTab from './components/StickyTab';
import Polaroid from './components/Polaroid';
import MobileHint from './components/MobileHint';
import Handwriting from './components/Handwriting';
import { StarDoodle, SquiggleDoodle } from './components/Doodles';
import CreativePortrait from './components/CreativePortrait';
import TypewriterText from './components/TypewriterText';

const App = () => {
  const containerRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({ container: containerRef });
  const [isTabsOpen, setIsTabsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const starY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const squiggleY = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const scrollToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };
  const scrollToWork = () => {
    containerRef.current.scrollTo({ top: 1000, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };
  const scrollToContact = () => {
    containerRef.current.scrollTo({ top: 3000, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const bgColor = isDark ? 'bg-[#1a1a1a]' : 'bg-[#FDFCE8]';
  const textColor = isDark ? 'text-[#E0E0E0]' : 'text-[#4A4036]';
  const mutedColor = isDark ? 'text-[#A0A0A0]' : 'text-[#6B5D52]';
  const borderColor = isDark ? 'border-[#E0E0E0]' : 'border-[#4A4036]';

  return (
    <div className={`h-[100dvh] ${bgColor} ${textColor} font-sans selection:bg-[#E6C6A6] selection:text-white overflow-hidden flex flex-col md:flex-row transition-colors duration-700`}>


      <CustomCursor isDark={isDark} />
      <MobileHint isDark={isDark} />

      {/* --- SIDEBAR --- */}
      <div className="relative z-50 flex-none w-full h-14 md:w-20 md:h-screen">

        {/* Tabs (Desktop Only) */}
        <div className="hidden md:block absolute top-1/4 left-0 w-full h-1/2 pointer-events-none z-10">
          <div className="relative w-full h-full pointer-events-auto">
            <AnimatePresence>
              {isTabsOpen && (
                <>
                  <StickyTab index={0} label="Home" icon={Home} color="bg-red-200" top="top-0" onClick={scrollToTop} />
                  <StickyTab index={1} label="About" icon={Briefcase} color="bg-yellow-200" top="top-24" onClick={scrollToWork} />
                  <StickyTab index={2} label="IT Projects" icon={Mail} color="bg-blue-200" top="top-48" onClick={scrollToContact} />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="absolute inset-0 bg-[#3e342c] border-b-4 border-[#2c251f] md:border-b-0 md:border-r-4 shadow-2xl z-20" />

        <div className="relative z-30 flex md:flex-col items-center justify-between w-full h-full">

          {/* Toggle Tabs Button */}
          <div
            onClick={() => setIsTabsOpen(!isTabsOpen)}
            className="hidden md:flex flex-col gap-1 mt-8 p-2 cursor-none text-[#FDFBF7]/50 hover:text-[#FDFBF7] transition-colors"
            title="Toggle Menu"
          >
            <div className={`w-1.5 h-1.5 rounded-full bg-current transition-all ${isTabsOpen ? 'bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]' : ''}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full bg-current transition-all ${isTabsOpen ? 'bg-blue-300 shadow-[0_0_8px_rgba(147,197,253,0.8)]' : ''}`}></div>
          </div>

          {/* Desktop Dark Mode Slider */}
          <div
            onClick={toggleTheme}
            className={`
                    hidden md:flex relative 
                    w-8 h-16 rounded-full p-1 cursor-none flex-col items-center 
                    transition-colors duration-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-black/5
                    ${isDark ? 'bg-slate-700 justify-end' : 'bg-[#D98E73]/40 justify-start'}
                `}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
              className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10"
            >
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon size={14} className="text-slate-700" /> : <Sun size={14} className="text-orange-400" />}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex md:flex-col justify-evenly w-full h-full py-2 md:py-12 px-2 md:px-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <SpiralRing key={i} index={i} scrollY={scrollY} />
            ))}
          </div>

          <div className="hidden md:block mb-8 text-[#FDFBF7]/50 text-xs font-mono rotate-[-90deg]">©2025</div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div ref={containerRef} className="flex-1 relative h-full overflow-y-auto no-scrollbar scroll-smooth perspective-1000">
        <div className="notebook-lines" />
        <div className="fixed inset-0 paper-texture z-40 w-full h-full" />
        <div className="fixed inset-0 vignette z-30 w-full h-full" />

        <svg className="absolute top-0 left-5 md:left-12 w-20 h-full pointer-events-none z-10 opacity-30 overflow-visible" height="2500">
          <motion.path
            d="M 2 100 V 2500"
            fill="none"
            stroke={isDark ? "#FFFFFF" : "#4A4036"}
            strokeWidth="4"
            strokeDasharray="10 10"
            style={{ pathLength: scaleY }}
            className="transition-colors duration-700"
          />
        </svg>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <StarDoodle isDark={isDark} style={{ top: '10%', right: '10%', y: starY }} />
          <StarDoodle isDark={isDark} style={{ top: '40%', left: '5%', y: starY }} />
          <SquiggleDoodle isDark={isDark} style={{ top: '25%', right: '20%', y: squiggleY }} />
          <SquiggleDoodle isDark={isDark} style={{ top: '70%', left: '15%', y: squiggleY }} />
        </div>

        <div className="relative z-20 w-full min-h-full">

          <nav className="w-full pl-8 pr-6 py-6 md:py-8 md:pl-10 md:pr-12 flex justify-between items-center max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className={`font-hand text-2xl md:text-4xl font-bold tracking-wide ${textColor} transition-colors duration-700`}>
              Daryanto Tanawi
            </motion.div>

            <div className="hidden md:flex items-center gap-4">
              <button className={`font-body font-bold flex items-center gap-2 px-5 py-2 border-2 ${borderColor} ${textColor} hover:bg-current hover:text-[#1a1a1a] rounded-full transition-all shadow-sm text-sm cursor-none duration-700`}>
                <FileText size={16} />
                <span>Resume</span>
              </button>
              <button onClick={scrollToContact} className={`font-body font-bold flex items-center gap-2 px-5 py-2 ${isDark ? 'bg-[#E0E0E0] text-[#1a1a1a] hover:bg-white' : 'bg-[#4A4036] text-[#FDFBF7] hover:bg-[#6B5D52]'} rounded-full transition-all shadow-md text-sm cursor-none duration-700`}>
                <Send size={16} />
                <span>Contact</span>
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden p-2 ${textColor} transition-colors duration-700`}
            >
              <Menu size={24} />
            </button>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`fixed inset-0 z-[70] ${bgColor} ${textColor} flex flex-col px-8 pb-8 pt-24 md:hidden transition-colors duration-700`}
              >
                <div className="flex justify-between items-center mb-12">
                  <div className="font-hand text-2xl font-bold">Menu</div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X size={28} />
                  </button>
                </div>

                <div className="flex flex-col gap-6 items-center text-xl font-bold font-body">
                  <button onClick={scrollToTop} className="hover:scale-110 transition-transform">Home</button>
                  <button onClick={scrollToWork} className="hover:scale-110 transition-transform">About</button>
                  <button onClick={scrollToContact} className="hover:scale-110 transition-transform">IT Projects</button>

                  <div className="w-12 h-1 bg-current opacity-20 rounded-full my-4"></div>

                  <button className="flex items-center gap-2 px-6 py-3 border-2 border-current rounded-full">
                    <FileText size={20} /> Resume
                  </button>

                  <div className="flex items-center gap-4 mt-8">
                    <span className="text-sm opacity-70">Theme:</span>
                    <div
                      onClick={toggleTheme}
                      className={`
                                  relative w-16 h-8 rounded-full p-1 cursor-pointer flex items-center 
                                  transition-colors duration-500 shadow-inner border border-black/5
                                  ${isDark ? 'bg-slate-700 justify-end' : 'bg-[#D98E73]/40 justify-start'}
                              `}
                    >
                      <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center relative z-10"
                      >
                        {isDark ? <Moon size={14} className="text-slate-700" /> : <Sun size={14} className="text-orange-400" />}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <section className="max-w-7xl mx-auto px-6 md:px-12 min-h-[85vh] flex flex-col md:flex-row items-center justify-center pb-12">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start space-y-6 mt-8 md:mt-0 pl-8 md:pl-12">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                {/* --- HEJ + EYES --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-10">
                  {/* The Handwriting Component */}
                  <h1 className={`font-hand text-6xl md:text-8xl lg:text-8xl leading-[1.4] drop-shadow-sm ${textColor} transition-colors duration-700 min-w-[250px]`}>
                    <Handwriting words={["Hej!", "Hello!", "Hola!", "Bonjour!", "Ciao!", "Namaste!", "Halo!", " Ni Hao!"]} />
                    {/* <Typewriter words={["Hej!", "Hello!", "Hola!", "Bonjour!", "Ciao!", "Namaste!", "Halo!", " Ni Hao!"]} wait = {2000} /> */}
                  </h1>

                  {/* The Eyes */}
                  <div className="flex gap-1 mt-3">
                    <Eye isDark={isDark} offsetX={3} />
                    <Eye isDark={isDark} offsetX={-3} />
                  </div>
                </div>


                <h1 className={`font-hand text-5xl md:text-8xl lg:text-9xl leading-[0.9] drop-shadow-sm ${textColor} transition-colors duration-700`}>
                  I'm <span className="text-[#D98E73]">Daryanto Tanawi</span>
                </h1>
                <div className={`w-24 h-1.5 ${isDark ? 'bg-[#E0E0E0]' : 'bg-[#4A4036]'} rounded-full my-6 opacity-80 transition-colors duration-700`} />
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className={`font-body font-bold text-xs md:text-sm tracking-widest ${mutedColor} space-y-3 pl-1 transition-colors duration-700`}>
                <a href="mailto:daryantotanawi1098@gmail.com" className="flex items-center gap-3 hover:text-[#D98E73] transition-colors group w-max cursor-none"><Mail size={16} /> <span>daryantotanawi1098@gmail.com</span></a>
                <a href="https://instagram.com" className="flex items-center gap-3 hover:text-[#D98E73] transition-colors group w-max cursor-none"><Instagram size={16} /> <span>@xcalbr_0517</span></a>
                <a href="https://github.com/Drynt-to" className="flex items-center gap-3 hover:text-[#D98E73] transition-colors group w-max cursor-none"><Github size={16} /> <span>Drynt-to</span></a>
                <a href="https://www.linkedin.com/in/daryanto-tanawi-792933345/" className="flex items-center gap-3 hover:text-[#D98E73] transition-colors group w-max cursor-none"><Linkedin size={16} /> <span>Daryanto Tanawi</span></a>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2 h-[450px] md:h-[600px] flex items-center justify-center relative">
              <CreativePortrait
                image="https://res.cloudinary.com/ddts06l2q/image/upload/v1764408876/profile_head_swabng.png"
                baseImage="https://res.cloudinary.com/ddts06l2q/image/upload/v1764407477/Profile_rljkmv.png"
                isDark={isDark}
              />
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 pb-40 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end gap-4 mb-16 pl-8 md:pl-12">
              <h2 className={`font-hand text-5xl md:text-7xl ${textColor} transition-colors duration-700`}>About Me</h2>
              <div className={`mb-4 h-1 flex-grow ${isDark ? 'bg-[#E0E0E0]/20' : 'bg-[#4A4036]/20'} rounded-full transition-colors duration-700`}></div>
            </motion.div>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex-1"
              >
                <TypewriterText
                  text="I’m a third-year Informatics student currently in my fifth semester at Petra Christian University, concentrating in Artificial Intelligence while actively exploring my interests in web development and UI/UX design."
                  className={`font-body text-lg md:text-xl leading-relaxed text-justify`}
                  delay={0.2}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex-1"
              >
                <TypewriterText
                  text="Beyond my technical studies, I’m deeply involved in creative work and student organizations. I’ve gained extensive hands-on experience in visual design, event branding, and multimedia production through various university projects and committees — where I often take part as a Creative Coordinator or Publication Sub-Coordinator."
                  className={`font-body text-lg md:text-xl leading-relaxed text-justify`}
                  delay={0.6}
                />
              </motion.div>
            </div>
          </section>

          {/* --- IT PROJECTS SECTION --- */}
          <ITProjects isDark={isDark} />

        </div>
      </div>
    </div>
  );
};

export default App;