import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.webp'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // ADDED: Track which section is currently active (defaults to Home)
  const [activeItem, setActiveItem] = useState('Home');

  // Array of all navigation items to keep the code clean
  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      
      <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
        
        {/* Left Side: Logo & Text */}
        <a 
          href="#home" 
          onClick={() => setActiveItem('Home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
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

        {/* Middle: Desktop Navigation Links (FIXED UNDERLINE BUG) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveItem(item)}
              className={`relative font-medium transition-colors group ${
                activeItem === item ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item}
              {/* Dynamic Underline: Stays full width if active, else grows on hover */}
              <span 
                className={`absolute -bottom-2 left-0 h-1 rounded-full transition-all duration-300 ${
                  activeItem === item 
                    ? 'w-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' 
                    : 'w-0 bg-purple-500/50 group-hover:w-full'
                }`}
              ></span>
            </a>
          ))}
        </nav>

        {/* Right Side: Button & Mobile Menu Toggle (DARK MODE BUTTON REMOVED) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          <a 
            href="#contact" 
            onClick={() => setActiveItem('Contact')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-4 py-1.5 sm:px-5 sm:py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] text-xs sm:text-sm md:text-base cursor-pointer"
          >
            Hire Me
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-4 sm:h-4">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

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

      {/* Mobile Dropdown (FIXED ACTIVE HIGHLIGHT) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] origin-top"
          >
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                  activeItem === item 
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => {
                  setIsOpen(false);
                  setActiveItem(item); // Update active state when clicked on mobile
                }}
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