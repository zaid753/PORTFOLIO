import { Award } from 'lucide-react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';

const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle', year: '2025', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=78459B82E471A98E2024482DF844D1DD84428784B7B23F25741AD146D9078360' },
  { name: 'OCI Data Science Professional', issuer: 'Oracle', year: '2025', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=8EA9228BFD3CA6C102D51EF3825D1E13CE10B87A75EA8DBA2571CBBA84FC9419' },
  { name: 'OCI DevOps Professional', issuer: 'Oracle', year: '2025', url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=8EA9228BFD3CA6C102D51EF3825D1E13EBCD9511B2D79DFC82B8674A3160FF15' }
];

export function Certifications() {
  const { t } = useLanguage();

  return (
    <Section id="certifications" title={t.certifications.title} subtitle={t.certifications.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {certifications.map((cert, i) => (
          <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 rounded-2xl">
            <Card delay={i * 0.1} className="h-full p-8 text-center group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-500/30" glow>
              <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                 {/* Oracle Logo placeholder or generic icon */}
                 <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{cert.name}</h3>
              <div className="flex flex-col items-center gap-2">
                <span className="text-gray-500 font-medium">{cert.issuer}</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-gray-400">
                  {cert.year}
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </Section>
  );
}
