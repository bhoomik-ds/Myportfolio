// client/src/components/Skills/SkillsSection.jsx
import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillCard from './SkillCard';

import { FaReact, FaNodeJs, FaPython, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiExpress, SiDjango, SiGoogleanalytics, SiVercel } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';
import { TbBrandFramerMotion, TbSeo } from 'react-icons/tb';
import { MdDesignServices, MdOutlineCampaign } from 'react-icons/md';
import { BsGraphUpArrow, BsFunnelFill } from 'react-icons/bs';
import { AiOutlineApi, AiOutlineRobot } from 'react-icons/ai';

// Lazy load the 3D canvas
const Background3D = lazy(() => import('./Background3D'));

const SKILLS_DATA = {
  Frontend: [
    { name: 'React.js', level: 90, icon: <FaReact /> },
    { name: 'Tailwind CSS', level: 85, icon: <SiTailwindcss /> },
    { name: 'Graphic Design', level: 80, icon: <MdDesignServices /> },
    { name: 'JavaScript', level: 85, icon: <IoLogoJavascript /> },
    { name: 'Framer Motion', level: 75, icon: <TbBrandFramerMotion /> },
  ],
  Backend: [
    { name: 'Node.js', level: 80, icon: <FaNodeJs /> },
    { name: 'Express.js', level: 80, icon: <SiExpress /> },
    { name: 'MongoDB', level: 75, icon: <SiMongodb /> },
    { name: 'Django', level: 70, icon: <SiDjango /> },
    { name: 'REST APIs', level: 85, icon: <AiOutlineApi /> },
  ],
  'Digital Marketing': [
    { name: 'SEO & Content', level: 85, icon: <TbSeo /> },
    { name: 'Google Analytics 4', level: 80, icon: <SiGoogleanalytics /> },
    { name: 'Social Strategy', level: 85, icon: <MdOutlineCampaign /> },
    { name: 'Campaign Mgt', level: 75, icon: <BsGraphUpArrow /> },
    { name: 'Conversion Opt.', level: 80, icon: <BsFunnelFill /> },
  ],
  Others: [
    { name: 'Python', level: 80, icon: <FaPython /> },
    { name: 'AI / ML', level: 65, icon: <AiOutlineRobot /> },
    { name: 'Git & GitHub', level: 85, icon: <FaGithub /> },
    { name: 'Vercel Deploy', level: 90, icon: <SiVercel /> },
  ]
};

const CATEGORIES = Object.keys(SKILLS_DATA);

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  return (
    <section id="skills" className="relative min-h-screen flex flex-col items-center py-32 px-6 bg-[#0b0f1a] overflow-hidden font-sans">
      
      {/* Wrapped in Suspense */}
      <Suspense fallback={<div className="absolute inset-0 z-0 bg-transparent"></div>}>
        <Background3D />
      </Suspense>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent"></div>
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4f46e5]/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black)] [transform:perspective(1000px)_rotateX(75deg)] origin-bottom"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#a78bfa] drop-shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            My Skills
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7c3aed]/50"></div>
            <p className="text-slate-400 text-lg font-light tracking-widest uppercase">Technologies I Work With</p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7c3aed]/50"></div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16 p-1.5 bg-white/[0.03] backdrop-blur-md rounded-full border border-white/5 shadow-xl will-change-transform"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === category ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] rounded-full shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 will-change-transform"
            >
              {SKILLS_DATA[activeTab].map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  name={skill.name} 
                  level={skill.level} 
                  index={index} 
                  icon={skill.icon}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}