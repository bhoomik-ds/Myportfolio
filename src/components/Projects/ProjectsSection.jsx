// client/src/components/Projects/ProjectsSection.jsx
import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

const PROJECTS_DATA = [
  {
    id: 1,
    title: 'BookMyConcert',
    category: 'Web Apps',
    desc: 'A full-stack event ticketing platform featuring secure payment integration and dynamic seat management.',
    tech: ['MERN', 'Razorpay', 'Vercel'],
    image: 'https://res.cloudinary.com/dd4lbhc8g/image/upload/v1772192004/Screenshot_2026-02-27_164946_e3tcoh.png',
    link: 'https://concert-ticketbooking.vercel.app/' // ADDED LINK
  },
  { 
    id: 2, 
    title: 'Online Information', 
    category: 'Web Apps', 
    desc: 'Online Information is a simple web platform that provides users with organized and easily accessible information on various topics through a clean and user-friendly interface.', 
    tech: ['Django', 'cloudinary', 'SQL'],
    image: 'https://res.cloudinary.com/dd4lbhc8g/image/upload/v1772192069/Screenshot_2026-02-27_170323_idnys4.png',
    link: 'https://onlineinformation.vercel.app/' // ADDED LINK
  },
  { 
    id: 3, 
    title: 'Tours & Travels', 
    category: 'Web Apps', 
    desc: 'Tours & Travels is a travel website that showcases tour packages, destinations, and travel services to help users explore and plan their trips easily.', 
    tech: ['MERN', 'cloudinary', 'Razorpay'],
    image: 'https://res.cloudinary.com/dd4lbhc8g/image/upload/v1772192124/Screenshot_2026-02-27_170424_jhsdw5.png',
    link: 'https://tours-travels-ivory.vercel.app/' // ADDED LINK
  },
];

const FILTERS = ['All', 'Web Apps', 'React', 'UI/UX', '3D'];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = PROJECTS_DATA.filter(project => 
    activeFilter === 'All' ? true : project.category === activeFilter
  );

  return (
    <section id="projects" className="relative min-h-screen flex flex-col items-center py-32 px-6 bg-transparent font-sans">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#7c3aed]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#a78bfa]">
            Projects
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4f46e5]/50"></div>
            <p className="text-slate-400 text-lg font-light tracking-widest uppercase">My Recent Work</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4f46e5]/50"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16 p-1.5 bg-transparent backdrop-blur-md rounded-full border border-white/10 will-change-transform"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter ? 'text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {activeFilter === filter && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 will-change-transform">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              /* WRAPPED THE CARD IN AN A-TAG */
              <a 
                key={project.id} 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block outline-none cursor-pointer"
              >
                <ProjectCard project={project} index={index} />
              </a>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}