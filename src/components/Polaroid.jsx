import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

const Polaroid = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100, rotate: 0 }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotate: project.rotate === 'rotate-2' ? 2 : project.rotate === '-rotate-1' ? -1 : project.rotate === 'rotate-3' ? 3 : -2
            }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.1 }}
            className={`relative group bg-white p-3 pb-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 hover:z-20 cursor-none`}
            style={{ width: '260px' }}
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#ffffff]/40 backdrop-blur-sm shadow-sm rotate-[-2deg] z-20"></div>
            <div className={`w-full h-40 ${project.color} mb-4 overflow-hidden relative flex items-center justify-center border-2 border-gray-100`}>
                <ImageIcon className="text-gray-400 opacity-50" size={48} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            <div className="absolute bottom-2 left-0 w-full text-center">
                <h3 className="font-hand text-2xl font-bold text-[#4A4036] leading-none">{project.title}</h3>
                <p className="font-hand text-lg text-gray-500">{project.desc}</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-[#4A4036] text-white px-4 py-2 rounded-full font-body font-bold text-sm flex items-center gap-2 shadow-lg cursor-none">
                    View <ExternalLink size={14} />
                </button>
            </div>
        </motion.div>
    );
};

export default Polaroid;
