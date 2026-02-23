import { useState } from 'react';
import logo from '../assets/logo.webp'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50">
      <div className="bg-slate-900/60 backdrop-blur-md border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Left Side: Logo & Text */}
        <a href="#home" className="flex items-center gap-3 cursor-pointer group">
          <img 
            src={logo} 
            alt="Bhoomik Logo" 
            fetchpriority="high"
            className="w-[54px] h-[54px] md:w-[65px] md:h-[65px] object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform duration-300" 
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
        <div className="flex items-center gap-4">
          
          {/* 1. ADDED aria-label to Dark Mode Button */}
          <button 
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors hidden sm:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </button>

          <a 
            href="#contact" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-5 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] text-sm sm:text-base cursor-pointer"
          >
            Hire Me
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

          {/* 2. ADDED aria-label to Mobile Hamburger Menu Button */}
          <button 
            aria-label="Toggle Mobile Menu"
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 flex flex-col gap-4 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-lg font-medium ${item === 'Home' ? 'text-purple-400' : 'text-slate-300'}`}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;