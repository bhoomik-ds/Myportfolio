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
  image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1974&auto=format&fit=crop'
},
  { 
    id: 2, 
    title: 'Easycart E-Commerce', 
    category: 'Web Apps', 
    desc: 'Modern digital storefront with seamless cart management, user authentication, and optimized checkout flow.', 
    tech: ['React', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 3, 
    title: 'Jarvis AI Assistant', 
    category: 'Web Apps', 
    desc: 'Personal voice-activated AI assistant powered by advanced LLM integration for conversational task management.', 
    tech: ['Python', 'Gemini API', 'SpeechRec'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 4, 
    title: 'Digital Analytics Hub', 
    category: 'UI/UX', 
    desc: 'Real-time marketing metrics dashboard with interactive data visualization for GA4 and SEO tracking.', 
    tech: ['React', 'Tailwind', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 5, 
    title: 'Immersive Portfolio', 
    category: '3D', 
    desc: 'Cinematic WebGL portfolio with scroll-driven storytelling, physical materials, and Framer Motion.', 
    tech: ['React', 'Three.js', 'GSAP'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 6, 
    title: 'Enterprise CMS', 
    category: 'Web Apps', 
    desc: 'Custom content management system with advanced relational inlines and secure data architecture.', 
    tech: ['Django', 'Python', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop'
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
      
      {/* Wrapped in Suspense */}
      

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
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}