import React, { useState } from 'react';
import { Trophy, Star, Code, Github } from 'lucide-react';
import { Section } from '../ui/Section';
import { TiltCard } from '../ui/TiltCard';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../lib/utils';
import { AchievementModal } from '../ui/AchievementModal';

const achievements = [
  {
    title: 'Winner — HACKFEST',
    description: 'SDC, REC Banda (2026)',
    longDescription: 'Secured first place at HACKFEST by developing an innovative solution using modern web technologies. Focus was on building a high-performance, real-time application to solve local community challenges.',
    icon: Trophy,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    grid: 'md:col-span-2',
    date: 'March 2026'
  },
  {
    title: 'Finalist — HACKSPACE',
    description: 'GDG Cloud Noida (2026)',
    longDescription: 'Selected as a finalist out of hundreds of participating teams. Our project leveraged Google Cloud Platform services to deliver scalable AI solutions for educational technology.',
    icon: Star,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    grid: 'md:col-span-2',
    date: 'February 2026'
  },
  {
    title: '300+ LeetCode',
    description: 'Arrays, Strings, Trees, Graphs, DP',
    longDescription: 'Consistently solving algorithmic challenges to sharpen problem-solving skills and master data structures including Dynamic Programming, Graphs, and Trees. Demonstrates a strong foundation in computer science principles.',
    icon: Code,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    grid: 'md:col-span-1'
  },
  {
    title: 'Finalist — HACKFEST',
    description: 'GDG Cloud New Delhi (2025)',
    longDescription: 'Competed at the national level hackathon and reached the finals by creating a cloud-native application aimed at streamlining environmental sustainability tracking.',
    icon: Star,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    grid: 'md:col-span-1',
    date: 'October 2025'
  },
  {
    title: 'Open Source',
    description: 'PRs merged to IIT Kanpur Virtual Labs & Code Social',
    longDescription: 'Active open source contributor, actively resolving issues, optimizing performance, and adding new features to widely used repositories. Notable contributions include major PRs merged into IIT Kanpur Virtual Labs.',
    icon: Github,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    grid: 'md:col-span-2'
  }
];

export function Achievements() {
  const { t } = useLanguage();
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  return (
    <Section id="achievements" title={t.achievements.title} subtitle={t.achievements.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
        {achievements.map((item, i) => (
          <TiltCard 
            key={i} 
            onClick={() => setSelectedAchievement(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedAchievement(item);
              }
            }}
            tabIndex={0}
            role="button"
            className={cn(
              "p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/40 relative overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm cursor-pointer", 
              item.grid
            )}
          >
            {/* Background oversized decorative icon */}
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none">
              <item.icon className="w-56 h-56" />
            </div>

            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm", item.bg, item.color)}>
              <item.icon className="w-6 h-6" />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2 font-medium">
                {item.description}
              </p>
            </div>
          </TiltCard>
        ))}
      </div>
      
      <AchievementModal 
        isOpen={!!selectedAchievement} 
        onClose={() => setSelectedAchievement(null)} 
        achievement={selectedAchievement}
      />
    </Section>
  );
}
