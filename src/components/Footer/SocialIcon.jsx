// client/src/components/Footer/SocialIcon.jsx
import { motion } from 'framer-motion';

export default function SocialIcon({ path, delay, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md group hover:border-[#7c3aed]/60 transition-colors duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
    >
      {/* Inner neon glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/0 to-[#4f46e5]/0 group-hover:from-[#7c3aed]/20 group-hover:to-[#4f46e5]/20 rounded-xl transition-colors duration-300 pointer-events-none"></div>
      
      {/* SVG Icon */}
      <svg className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300 relative z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d={path} />
      </svg>
    </motion.a>
  );
}