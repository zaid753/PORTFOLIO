import { motion } from 'motion/react';
import { Section } from '../ui/Section';
import { skillCategories } from '../../data/skills';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export function Skills() {
  const { t } = useLanguage();

  return (
    <Section id="skills" title={t.skills.title} subtitle={t.skills.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <Card key={idx} delay={idx * 0.1} className="p-8 group hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <h3 className="text-xl font-display font-semibold mb-6 flex items-center text-blue-500">
              <span className="w-1.5 h-6 bg-blue-500 mr-4 rounded-full" />
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-transparent dark:border-white/5 text-sm md:text-md text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-blue-500/20 hover:border-blue-500/30 transition-all duration-200 cursor-default"
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

