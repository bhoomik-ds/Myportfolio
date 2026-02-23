// src/App.jsx
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';

// 1. Dynamically import sections below the fold
const About = lazy(() => import('./components/About/AboutSection'));
const Skills = lazy(() => import('./components/Skills/SkillsSection'));
const Projects = lazy(() => import('./components/Projects/ProjectsSection'));
const Contact = lazy(() => import('./components/Contact/ContactSection'));
const Footer = lazy(() => import('./components/Footer/FooterSection'));

// 2. Create a premium, subtle loading fallback for when sections are downloading
const SectionLoader = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center bg-[#050511]">
    <div className="w-8 h-8 border-2 border-[#7c3aed]/30 border-t-[#7c3aed] rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    // The main wrapper with a deep dark background
    <div className="min-h-screen bg-[#050511] font-sans selection:bg-[#7c3aed]/30 selection:text-white">
      
      {/* The floating glassmorphism navbar (Loads Instantly) */}
      <Navbar />
      
      {/* Main content area */}
      <main>
        {/* Hero Section (Loads Instantly for SEO and User Experience) */}
        <Hero />

        {/* 3. Wrap the rest of the site in Suspense */}
        <Suspense fallback={<SectionLoader />}>
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />  
        </Suspense>
      </main>
    </div>
  )
}

export default App;