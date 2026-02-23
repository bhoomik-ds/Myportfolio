// client/src/components/About/AboutSection.jsx
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
// 1. Import your photo from the assets folder
import myImage from '../../assets/myimage.webp'; 



export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center bg-transparent overflow-hidden py-24 px-6 font-sans">
      
     

      {/* --- 2D Environment Effects --- */}
      
      {/* Top Center Radial Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-[#7c3aed]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Soft Purple Wave (Right Side) */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[500px] h-[500px] bg-[#6366f1]/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Grid Floor Perspective */}
      <div className="absolute bottom-0 left-0 w-full h-[35vh] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,transparent,black)] [transform:perspective(1000px)_rotateX(75deg)_scale(2)] origin-bottom"></div>
      </div>

      {/* --- Main Glassmorphism Card --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto p-8 md:p-14 flex flex-col md:flex-row items-center gap-12 lg:gap-20 bg-transparent backdrop-blur-md rounded-[2rem] border border-[#7c3aed]/20 shadow-[0_8px_40px_rgba(124,58,237,0.1)] will-change-transform"
      >
        
        {/* LEFT SIDE: Profile Image with Neon Ring */}
        <div className="relative shrink-0 flex items-center justify-center">
          {/* Rotating Neon Ring */}
          <div className="absolute -inset-3 rounded-full border border-[#7c3aed]/50 animate-[spin_10s_linear_infinite] shadow-[0_0_20px_rgba(124,58,237,0.3)]"></div>
          
          {/* Secondary Counter-Rotating Ring */}
          <div className="absolute -inset-1 rounded-full border border-[#6366f1]/30 animate-[spin_15s_linear_infinite_reverse]"></div>
          
          {/* Profile Image Container */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-gradient-to-b from-slate-800 to-[#0b0f1a] border-2 border-[#0b0f1a] z-10">
            {/* 3. ADDED loading="lazy" for massive performance boost */}
            <img 
              src={myImage} 
              alt="Bhoomik Sorathiya" 
              loading="lazy" 
              className="w-full h-full object-cover object-top scale-[1.15] opacity-90 hover:opacity-100 transition-all duration-500 pt-2"
            />
            {/* Inner Glass Overlay for premium feel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/20 to-transparent mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>

        {/* RIGHT SIDE: Content & Typography */}
        <div className="flex flex-col text-center md:text-left">
          
          {/* Subtitle Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 text-[#a78bfa] text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(124,58,237,0.1)]">
              Who I Am
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#7c3aed] drop-shadow-[0_0_15px_rgba(124,58,237,0.2)]"
          >
            Bhoomik Sorathiya
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl"
          >
            Bridging the gap between high-performance web development and strategic digital marketing. Specializing in the MERN stack and data-driven growth, I architect scalable frontend solutions that not only look cinematic but convert users effortlessly. 
          </motion.p>

          {/* CTA Button - Updated to navigate to Contact */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-full font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-3 w-fit mx-auto md:mx-0 overflow-hidden cursor-pointer"
          >
            <span className="relative z-10">Get in Touch</span>
            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            {/* Internal Button Shine */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          </motion.a>

        </div>
      </motion.div>

    </section>
  );
}