// src/App.jsx
import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';

// 1. Import the ONE global 3D Background from the Hero folder
const Background3D = lazy(() => import('./components/Hero/Background3D'));

// Dynamically import sections below the fold
const About = lazy(() => import('./components/About/AboutSection'));
const Skills = lazy(() => import('./components/Skills/SkillsSection'));
const Projects = lazy(() => import('./components/Projects/ProjectsSection'));
const Contact = lazy(() => import('./components/Contact/ContactSection'));
const Footer = lazy(() => import('./components/Footer/FooterSection'));

// Changed background to transparent so the global 3D background shows through
const SectionLoader = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center bg-transparent">
    <div className="w-8 h-8 border-2 border-[#7c3aed]/30 border-t-[#7c3aed] rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-[#050511] font-sans selection:bg-[#7c3aed]/30 selection:text-white overflow-x-hidden w-full relative">
      
      {/* 2. THE GLOBAL 3D BACKGROUND (Fixed to the back) */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-[#050511]"></div>}>
          <Background3D />
        </Suspense>
      </div>
      
      {/* 3. ALL CONTENT WRAPPED IN z-10 TO SIT ON TOP OF THE 3D CANVAS */}
      <div className="relative z-10 flex flex-col w-full">
        <Navbar />
        
        <main>
          <Hero />
          
          <Suspense fallback={<SectionLoader />}>
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />  
          </Suspense>
        </main>
      </div>

    </div>
  )
}

export default App;