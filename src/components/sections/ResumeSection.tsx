import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Maximize2 } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { ResumeModal } from '../ui/ResumeModal';
import { generateResume } from '../../utils/generateResume';

export function ResumeSection() {
  const { t } = useLanguage();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleDownload = () => {
    generateResume();
  };

  return (
    <Section id="resume" title={t.resume.title} className="bg-slate-50/50 dark:bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Mock Document Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 p-8 sm:p-12 aspect-[1/1.4] transition-transform duration-500 group-hover:scale-[1.02]">
              {/* Paper Content Mockup */}
              <div className="space-y-6">
                <div className="text-center border-b border-gray-100 dark:border-white/5 pb-6">
                  <div className="h-4 w-48 bg-gray-200 dark:bg-white/10 mx-auto rounded mb-3" />
                  <div className="h-2 w-64 bg-gray-100 dark:bg-white/5 mx-auto rounded" />
                </div>
                
                <div className="space-y-4">
                  <div className="h-3 w-32 bg-blue-500/20 rounded" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded" />
                    <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded" />
                    <div className="h-2 w-3/4 bg-gray-100 dark:bg-white/5 rounded" />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="h-3 w-40 bg-blue-500/20 rounded" />
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-2 w-32 bg-gray-200 dark:bg-white/10 rounded" />
                          <div className="h-2 w-16 bg-gray-100 dark:bg-white/5 rounded" />
                        </div>
                        <div className="h-2 w-full bg-gray-50 dark:bg-white/5 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Button 
                  variant="outline" 
                  className="bg-white text-black border-none"
                  onClick={() => setIsResumeModalOpen(true)}
                >
                  <Maximize2 className="w-4 h-4 mr-2" />
                  {t.resume.view_full}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Copy & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-3 p-3 rounded-2xl bg-blue-500/10 text-blue-500 mb-2">
              <FileText className="w-6 h-6" />
              <h3 className="text-xl font-display font-bold uppercase tracking-wider">
                {t.resume.summary_title}
              </h3>
            </div>

            <p className="text-2xl md:text-3xl font-display font-medium text-gray-800 dark:text-gray-200 leading-relaxed tracking-tight lg:pr-8">
              {t.resume.summary_text}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                size="lg" 
                className="group flex-1 py-8 text-lg"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <Maximize2 className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                {t.resume.view_full}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group flex-1 py-8 text-lg border-2"
                onClick={handleDownload}
              >
                <Download className="mr-3 w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                {t.resume.download}
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </Section>
  );
}
