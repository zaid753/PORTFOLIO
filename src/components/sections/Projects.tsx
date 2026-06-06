import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Filter } from 'lucide-react';
import { Section } from '../ui/Section';
import { projects } from '../../data/projects';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../lib/utils';
import { ProjectModal } from '../ui/ProjectModal';
import { Project } from '../../types';

export function Projects() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <Section id="projects" title={t.projects.title} subtitle={t.projects.subtitle}>
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
              className="cursor-pointer h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
            >
              <TiltCard className="h-full flex flex-col p-0 group">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div 
                      className="w-full h-full" 
                      style={{ backgroundColor: project.accent }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {project.category}
                    </span>
                    {project.tag && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        {project.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm md:text-md mb-8 flex-grow leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 text-[11px] font-medium text-gray-800 dark:text-gray-200 backdrop-blur-md shadow-sm transition-colors hover:bg-white/80 dark:hover:bg-white/20">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 text-[11px] font-medium text-gray-800 dark:text-gray-200 backdrop-blur-md shadow-sm">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mt-auto">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank', 'noopener,noreferrer');
                      }}
                      className="flex-1 flex items-center justify-center px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {t.projects.code}
                    </button>
                    {project.link && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, '_blank', 'noopener,noreferrer');
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {t.projects.demo}
                      </button>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
      />
    </Section>
  );
}
