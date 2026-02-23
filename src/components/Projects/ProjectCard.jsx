import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full bg-[#0b0f1a]/50 backdrop-blur-xl rounded-2xl border border-white/5 hover:border-[#7c3aed]/40 transition-colors duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(124,58,237,0.15)]"
    >
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 z-0 pointer-events-none"></div>

      {/* Top: Actual Project Image Area */}
      <div className="relative h-48 w-full bg-[#0b0f1a] border-b border-white/5 overflow-hidden z-10">
        <div className="absolute inset-0 bg-[#0b0f1a]/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
        
        {/* 1. ADDED loading="lazy" HERE */}
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow z-10">
        <h3 className="text-2xl font-semibold text-white mb-2 tracking-wide group-hover:text-[#a78bfa] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light flex-grow">
          {project.desc}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs font-medium text-[#a78bfa] bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[#7c3aed] hover:to-[#4f46e5] border border-white/10 hover:border-transparent text-slate-300 hover:text-white text-sm font-semibold transition-all duration-300 shadow-lg">
          View Project
        </button>
      </div>
    </motion.div>
  );
}