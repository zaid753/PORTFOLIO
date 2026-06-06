import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, MapPin } from 'lucide-react';
import { Button } from './Button';

interface Achievement {
  title: string;
  description: string;
  longDescription?: string;
  icon: any;
  color: string;
  bg: string;
  date?: string;
  location?: string;
}

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement | null;
}

export function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!achievement) return null;

  const Icon = achievement.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl max-h-[90vh] flex flex-col p-0 glass rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10"
          >
            {/* Header / Banner */}
            <div className={`relative px-6 py-12 md:py-16 ${achievement.bg} flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                 <Icon className={`w-64 h-64 ${achievement.color} opacity-40 -rotate-12`} />
              </div>
              
              <div className={`relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-white dark:bg-zinc-900 shadow-xl ${achievement.color}`}>
                <Icon className="w-10 h-10 md:w-12 md:h-12" />
              </div>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white text-gray-900 dark:bg-black/50 dark:hover:bg-black dark:text-white transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 bg-white dark:bg-zinc-950 overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                {achievement.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>{achievement.description}</span>
                </div>
                {achievement.date && (
                  <div className="px-2 py-1 bg-gray-100 dark:bg-zinc-900 rounded-md font-medium text-xs">
                    {achievement.date}
                  </div>
                )}
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg">
                  {achievement.longDescription || 'Detailed information about this achievement is not available at the moment. It represents a significant milestone in my professional journey.'}
                </p>
              </div>
            </div>
            
            <div className="p-4 md:px-8 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900 flex justify-end">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Close
              </Button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
