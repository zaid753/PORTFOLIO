import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Code2, Download, ArrowRight, FileText } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../lib/utils';
import { ResumeModal } from '../ui/ResumeModal';

export function Hero() {
  const { t } = useLanguage();
  const words = t.hero.roles;
  const currentText = useTypewriter(words);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 tracking-tight">
            {t.hero.greeting} <span className="text-gradient leading-tight block sm:inline">Mohammed Jaid</span>
          </h1>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="h-12 md:h-16 mb-4 sm:mb-6"
        >
          <p className="text-xl sm:text-2xl md:text-4xl text-gray-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {t.hero.role_prefix === 'A' ? (/^[aeiou]/i.test(currentText) ? 'An' : 'A') : t.hero.role_prefix} {currentText}
            <span className="w-1.5 h-6 sm:h-8 md:h-12 bg-blue-500 inline-block ml-2 animate-blink transform translate-y-1 sm:translate-y-2 md:translate-y-3" />
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-sans px-4 sm:px-0"
        >
          {t.hero.description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10 sm:mb-12 w-full max-w-md mx-auto sm:max-w-none gap-4"
        >
            <Button size="lg" className="group w-full sm:w-auto hover-animate-pulse-glow" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.hero.view_work}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="group w-full sm:w-auto hover-animate-pulse-glow" 
              onClick={() => setIsResumeModalOpen(true)}
            >
              DOWNLOAD RESUME
              <Download className="ml-2 inline-block w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center space-x-6 sm:space-x-8 text-gray-400"
          >
            {[
              { icon: Github, href: 'https://github.com/zaid753', color: 'hover:text-gray-900 dark:hover:text-white' },
              { icon: Linkedin, href: 'https://linkedin.com/in/mohammedjaid', color: 'hover:text-blue-500' },
              { icon: Code2, href: 'https://leetcode.com/u/zaid4hamed', color: 'hover:text-orange-500' },
              { icon: Mail, href: 'mailto:mohammedjaid813@gmail.com', color: 'hover:text-red-500' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={cn('transition-all duration-300 transform hover:scale-110 hover-animate-pulse-glow', social.color)}
              >
                <social.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </motion.a>
            ))}
          </motion.div>
      </div>

      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </section>
  );
}
