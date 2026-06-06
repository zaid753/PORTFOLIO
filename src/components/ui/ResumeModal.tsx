import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import resumeContentRaw from '../../../resume.md?raw';
import { generateResume } from '../../utils/generateResume';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { t } = useLanguage();
  const resumeContent = resumeContentRaw || '';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

  const handleDownload = () => {
    generateResume();
    onClose();
  };

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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[90vh] flex flex-col glass rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50">
              <h2 className="text-xl sm:text-2xl font-display font-bold">
                {t.resume.view_full}
              </h2>
              <div className="flex items-center gap-3">
                <Button onClick={handleDownload} className="hidden sm:flex">
                  <Download className="mr-2 w-4 h-4" />
                  {t.resume.download}
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto relative bg-white dark:bg-[#0a0a0a] min-h-[50vh] sm:min-h-[70vh] p-6 sm:p-10">
               <div className="max-w-3xl mx-auto prose prose-sm sm:prose-base dark:prose-invert prose-headings:font-display prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {resumeContent}
                  </ReactMarkdown>
               </div>
            </div>
            
            {/* Mobile Actions */}
            <div className="sm:hidden p-4 border-t border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50">
               <Button onClick={handleDownload} className="w-full">
                  <Download className="mr-2 w-4 h-4" />
                  {t.resume.download}
                </Button>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
