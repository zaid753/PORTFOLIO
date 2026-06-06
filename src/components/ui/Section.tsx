import React from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
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
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const Section = ({ id, title, subtitle, children, className }: SectionProps) => {
  const { ref, inView } = useScrollReveal();

  return (
    <section id={id} className={cn('py-24 px-6 md:px-12', className)}>
      <motion.div
        ref={ref}
        variants={containerVars}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {(title || subtitle) && (
          <motion.div variants={itemVars} className="mb-16 text-center">
            {title && (
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="h-1.5 w-12 bg-blue-500 mx-auto mt-6 rounded-full" />
          </motion.div>
        )}
        <motion.div variants={itemVars} className="h-full">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

