import { motion } from 'motion/react';

export function SectionSeparator() {
  return (
    <div className="relative py-12">
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent blur-[1px]"
      />
    </div>
  );
}
