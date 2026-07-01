import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const containerVars = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const Section = ({ id, title, subtitle, children, className }: SectionProps) => {
  return (
    <section id={id} className={cn('py-20 md:py-32 px-4 sm:px-6 md:px-12 w-full overflow-hidden', className)}>
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto w-full"
      >
        {(title || subtitle) && (
          <motion.div variants={itemVars} className="mb-16 md:mb-20 text-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
                {subtitle}
              </p>
            )}
            <div className="h-1.5 w-12 sm:w-16 bg-blue-500 mx-auto mt-6 sm:mt-8 rounded-full" />
          </motion.div>
        )}
        <motion.div variants={itemVars} className="h-full w-full">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

