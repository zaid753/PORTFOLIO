import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '../../lib/utils';

export function FloatingThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 flex flex-col gap-2 p-2 rounded-2xl glass border border-gray-200 dark:border-white/10 shadow-xl"
          >
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.name;
              
              return (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 w-full text-left group",
                    isActive 
                      ? "bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-medium" 
                      : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white")} />
                  <span className="text-sm">{t.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full glass hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        aria-label="Toggle theme switcher"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-6 h-6" />
        ) : (
          <Sun className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
