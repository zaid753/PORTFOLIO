import { motion } from 'motion/react';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { Section } from '../ui/Section';
import { experiences } from '../../data/experience';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" title={t.experience.title} subtitle={t.experience.subtitle}>
      <div className="relative max-w-4xl mx-auto pl-10 md:pl-0">
        {/* Timeline connector line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-600 to-transparent opacity-20" />

        <div className="space-y-16">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Node index dot */}
              <div className="absolute left-[-24px] md:left-1/2 md:ml-[-12px] top-0 md:top-8 w-6 h-6 rounded-full bg-[#0A0A0A] border-4 border-blue-500 z-10 hidden md:block" />
              
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:pl-16' : 'md:pr-16'}`}>
                <Card className="p-8 group hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="text-white bg-blue-500/10 h-14 w-14 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h3>
                  <div className="text-lg font-semibold text-blue-500 mb-6">
                    {exp.company}
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start text-sm md:text-md text-gray-500 dark:text-gray-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
