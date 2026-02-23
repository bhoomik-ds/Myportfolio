// client/src/components/Contact/ContactSection.jsx
import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import InputField from './InputField';

const Background3D = lazy(() => import('./Background3D'));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        'service_8fjfnxn',   
        'template_ir2y04r',  
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'DpNJlPhI-2SosnC_x'    
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);

    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 bg-[#0b0f1a] overflow-hidden font-sans">
      
      <Suspense fallback={<div className="absolute inset-0 z-0 bg-transparent"></div>}>
        <Background3D />
      </Suspense>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#7c3aed]/10 blur-[130px] rounded-full pointer-events-none"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#6366f1]/5 blur-[150px] rounded-[100%] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#a78bfa]">
            Contact
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4f46e5]/50"></div>
            <p className="text-slate-400 text-lg font-light tracking-widest uppercase">Get in Touch</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4f46e5]/50"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="w-full bg-[#0b0f1a]/60 backdrop-blur-md rounded-3xl border border-white/5 border-t-[#7c3aed]/50 p-8 md:p-12 shadow-[0_10px_50px_rgba(0,0,0,0.5)] relative overflow-hidden will-change-transform"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#7c3aed]/5 to-transparent pointer-events-none"></div>

          <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-6">
              <InputField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
              <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="youremail@gmail.com" />
            </div>
            
            <InputField label="Message" name="message" value={formData.message} onChange={handleChange} placeholder="Interested in collaborating? Send me a message and I’ll get back to you as soon as possible." isTextArea={true} />

            <motion.div variants={itemVariants} className="mt-4">
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="group w-full md:w-auto md:px-10 py-4 flex items-center justify-center gap-3 bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-full font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <span className="relative z-10 tracking-wide">
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error Sending' : 'Send Message'}
                </span>
                {status !== 'loading' && status !== 'success' && (
                  <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}