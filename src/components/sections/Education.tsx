import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export function Education() {
  const { t } = useLanguage();

  return (
    <Section id="education" title={t.education.title}>
      <div className="max-w-4xl mx-auto">
        <Card className="p-10 md:p-12 relative overflow-hidden" glow>
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <GraduationCap className="w-64 h-64" />
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 shrink-0">
              <GraduationCap className="w-10 h-10" />
            </div>
            
            <div className="flex-grow space-y-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white">
                  {t.education.degree}
                </h3>
                <p className="text-xl text-blue-500 font-medium mt-1">
                  {t.education.university}
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 md:text-lg">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  {t.education.period}
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400 md:text-lg">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  {t.education.location}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-gray-500 dark:text-gray-400 italic">
                {t.education.focus}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
