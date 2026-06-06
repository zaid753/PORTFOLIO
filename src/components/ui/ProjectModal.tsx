import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, Code2 } from 'lucide-react';
import { Project } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 pointer-events-auto flex flex-col max-h-[90vh]"
            >
              <div 
                className="aspect-[16/9] sm:h-72 w-full relative shrink-0 overflow-hidden"
                style={{ backgroundColor: project.accent }}
              >
                {project.image && (
                  <div className="absolute inset-0">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                )}
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors z-10 backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-8 overflow-y-auto flex-1 min-h-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    {project.category}
                  </span>
                  {project.tag && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      {project.tag}
                    </span>
                  )}
                </div>
                
                <h2 className="text-3xl font-display font-bold mb-4">{project.title}</h2>
                
                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="text-gray-600 dark:text-gray-300 text-[1.1rem] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mb-8 p-5 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center">
                    <Code2 className="w-4 h-4 mr-2" />
                    Tech Stack Breakdown
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 flex items-center justify-center px-6 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-lg hover:opacity-90 transition-opacity transform hover:-translate-y-1 duration-300"
                  >
                    <Github className="w-5 h-5 mr-3" />
                    {t.projects?.code || 'Source Code'}
                  </a>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 flex items-center justify-center px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-white/10 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all transform hover:-translate-y-1 duration-300"
                    >
                      <ExternalLink className="w-5 h-5 mr-3" />
                      {t.projects?.demo || 'Live Demo'}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
