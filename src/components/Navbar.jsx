import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Added framer-motion for smooth mobile menu
import logo from '../assets/logo.webp'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Floating Container with Glassmorphism
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      
      {/* 2. Adjusted mobile padding (px-4 py-2) vs desktop padding (sm:px-6 sm:py-3) */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        
        {/* Left Side: Logo & Text */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <img 
            src={logo} 
            alt="Bhoomik Logo" 
            fetchpriority="high"
            className="w-[45px] h-[45px] sm:w-[54px] sm:h-[54px] md:w-[65px] md:h-[65px] object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform duration-300" 
          />
          <div className="flex flex-col leading-tight hidden sm:flex">
            <span className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors duration-300">
              Bhoomik <span className="text-purple-500 group-hover:text-pink-500 transition-colors duration-300">Sorathiya</span>
            </span>
          </div>
        </a>

        {/* Middle: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className="relative text-white font-medium group">
            Home
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] rounded-full"></span>
          </a>
          
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-white font-medium transition-colors relative group">
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-purple-500/50 rounded-full transition-all group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Side: Dark Mode Toggle & Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          <button 
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors hidden sm:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>

          {/* 3. Scaled down the button slightly on mobile so it fits perfectly */}
          <a 
            href="#contact" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] text-xs sm:text-sm md:text-base cursor-pointer"
          >
            Hire Me
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

          {/* 4. Hamburger Menu that turns into an "X" when opened */}
          <button 
            aria-label="Toggle Mobile Menu"
            className="md:hidden text-slate-300 hover:text-white p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300">
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 5. Smooth Dropdown Animation using AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] origin-top"
          >
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${item === 'Home' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;