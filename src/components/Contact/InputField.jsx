import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function InputField({ label, name, value, onChange, type = "text", placeholder, isTextArea = false }) {
  const baseClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all duration-300 backdrop-blur-md shadow-inner";

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
      {isTextArea ? (
        <textarea 
          name={name}
          value={value}
          onChange={onChange}
          rows="4"
          placeholder={placeholder}
          className={`${baseClasses} resize-none`}
          required
        />
      ) : (
        <input 
          type={type} 
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
          required
        />
      )}
    </motion.div>
  );
}