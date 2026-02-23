// client/src/components/Skills/SkillCard.jsx
import { motion } from 'framer-motion';

const SkillCard = ({ name, level, index, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col p-6 rounded-2xl bg-[#0b0f1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#7c3aed]/30 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(124,58,237,0.15)] hover:-translate-y-1"
    >
      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7c3aed]/0 to-[#7c3aed]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* 2.5D Mini Floating Orb */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#4f46e5]/20 blur-xl rounded-full group-hover:scale-150 transition-transform duration-700 ease-out pointer-events-none"></div>

      {/* Header: REAL Icon & Skill Name */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="w-14 h-14 mb-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#7c3aed]/40 transition-colors duration-300 text-3xl text-slate-300 group-hover:text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          {icon}
        </div>
        <h3 className="text-white font-medium text-lg tracking-wide">{name}</h3>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full relative z-10 mt-auto">
        <div className="flex justify-between text-xs text-slate-400 font-semibold mb-2 tracking-widest uppercase">
          <span>Proficiency</span>
          <span>{level}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] rounded-full relative"
          >
            {/* Bright tip at the end of the progress bar */}
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px] opacity-70"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;