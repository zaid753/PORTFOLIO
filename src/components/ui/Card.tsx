import { motion } from 'motion/react';
import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  key?: React.Key;
  onClick?: () => void;
  delay?: number;
}

export const Card = ({ children, className, glow = false, onClick, delay = 0 }: CardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      whileHover={glow ? { y: -5 } : {}}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 dark:glass p-6 transition-all duration-300',
        glow && 'hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
