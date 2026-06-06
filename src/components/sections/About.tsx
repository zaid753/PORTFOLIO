import React from 'react';
import { motion } from 'motion/react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export function About() {
  const { t } = useLanguage();

  const stats = [
    { label: t.about.stats.projects, value: '7+' },
    { label: t.about.stats.leetcode, value: '300+' },
    { label: t.about.stats.students, value: '1000+' },
    { label: t.about.stats.participation, value: '10+' },
  ];

  return (
    <Section id="about" title={t.about.title}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Photo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group animate-float-slow"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-900 border border-white/10 group/image">
             <img 
               src="/me-1.jpg" 
               alt="Mohammed Jaid" 
               className="object-cover w-full h-full transition-transform duration-500 group-hover/image:scale-110" 
               onError={(e) => {
                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Mohammed+Jaid&size=512&background=3B82F6&color=fff`;
               }}
             />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 glass rounded-2xl flex items-center justify-center border-glow animate-float">
            <div className="text-center">
               <div className="text-2xl font-bold font-display text-blue-500">2027</div>
               <div className="text-[10px] uppercase tracking-wider text-gray-400">{t.about.graduating}</div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-sans font-medium italic border-l-4 border-blue-500 pl-6">
            "{t.about.quote}"
          </div>
          
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.about.bio}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
            {stats.map((stat, i) => (
              <Card key={i} delay={0.2 + i * 0.1} className="p-4 text-center hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <div className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
