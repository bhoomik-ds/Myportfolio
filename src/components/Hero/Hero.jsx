// client/src/components/Hero/Hero.jsx
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// 1. We tell React to load the 3D background lazily (in the background)


const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Deep Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1c]/50 to-[#050511] z-0"></div>

      {/* Glowing Light Rays (Top Center) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[500px] bg-purple-600/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      {/* Purple & Blue Ambient Waves (Sides) */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-700/20 blur-[150px] rounded-full z-0"></div>
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-700/20 blur-[150px] rounded-full z-0"></div>

      {/* 2. We wrap the 3D Canvas in Suspense. 
          While the 3D math is calculating, it shows a blank dark background instead of freezing the site! */}
      

      {/* Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4c1d9533_1px,transparent_1px),linear-gradient(to_bottom,#4c1d9533_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black)] [transform:perspective(1000px)_rotateX(75deg)_scale(2.5)] origin-bottom"></div>
        {/* Floor Horizon Glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.5)]"></div>
      </div>

      {/* Main Content Container (This will now load instantly!) */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16">
        
        {/* Heading with Motion */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4"
        >
          <span className="text-white">Bhoomik </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            Sorathiya
          </span>
        </motion.h1>

        {/* Subtitle with Motion */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-400 font-medium mb-10 tracking-wide"
        >
          Digital Marketer & Full stack Developer
        </motion.p>

        {/* CTA Button with Motion & Hover Effects */}
        <motion.a 
          href="#contact"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="group relative px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] transition-all duration-300 flex items-center gap-2 overflow-hidden cursor-pointer will-change-transform"
        >
          {/* Internal Button Shine Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
          
          <span className="relative z-10">Get in Touch</span>
          <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;