import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  role?: string;
  key?: React.Key;
}

export const TiltCard = ({ children, className, onClick, onKeyDown, tabIndex, role }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;

    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    mouseX.set(mX);
    mouseY.set(mY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const background = useTransform(
    [mouseX, mouseY],
    ([mX, mY]) => `radial-gradient(600px circle at ${mX}px ${mY}px, rgba(59, 130, 246, 0.15), transparent 40%)`
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role={role}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative h-full w-full rounded-2xl border border-gray-200 dark:border-white/10 dark:bg-black/40 backdrop-blur-md transition-shadow duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20',
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl transition duration-300"
        style={{ background }}
      />
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="h-full w-full relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
};
