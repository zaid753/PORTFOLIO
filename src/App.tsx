import { motion } from 'motion/react';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Achievements } from './components/sections/Achievements';
import { Certifications } from './components/sections/Certifications';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { SectionSeparator } from './components/ui/SectionSeparator';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { ParticlesBackground } from './components/ui/Particles';

import { FloatingSocial } from './components/ui/FloatingSocial';

import { InteractiveTerminal } from './components/ui/InteractiveTerminal';

export default function App() {
  return (
    <LanguageProvider>
      {/* @ts-expect-error - ThemeProvider types may conflict with React 19 children */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GoogleAnalytics />
      <div className="relative min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <ScrollProgress />
        {/* Background radial gradient decoration */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-indigo-500/5 blur-[120px] rounded-full" />
          <ParticlesBackground />
        </div>

        <Navbar />
        
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <Hero />
          <SectionSeparator />
          <About />
          <SectionSeparator />
          <Skills />
          <SectionSeparator />
          <Projects />
          <SectionSeparator />
          <Experience />
          <SectionSeparator />
          <Achievements />
          <SectionSeparator />
          <Certifications />
          <SectionSeparator />
          <Education />
          <SectionSeparator />
          <Contact />
        </motion.main>

        <FloatingSocial />
        <InteractiveTerminal />
        <Footer />
      </div>
    </ThemeProvider>
    </LanguageProvider>
  );
}
