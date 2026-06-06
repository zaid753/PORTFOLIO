import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Code2, Instagram } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/zaid753', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white', hoverBg: 'hover:bg-gray-100 dark:hover:bg-white/10' },
  { icon: Linkedin, href: 'https://linkedin.com/in/mohammedjaid', label: 'LinkedIn', color: 'hover:text-blue-500', hoverBg: 'hover:bg-blue-500/10' },
  { icon: Instagram, href: 'https://www.instagram.com/zaid_4hmed/', label: 'Instagram', color: 'hover:text-pink-500', hoverBg: 'hover:bg-pink-500/10' },
  { icon: Code2, href: 'https://leetcode.com/u/zaid4hamed', label: 'LeetCode', color: 'hover:text-orange-500', hoverBg: 'hover:bg-orange-500/10' },
];

export function FloatingSocial() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4"
    >
      {socials.map((social, idx) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={idx}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3 rounded-full bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 shadow-lg backdrop-blur-md text-gray-500 transition-colors ${social.color} ${social.hoverBg}`}
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
