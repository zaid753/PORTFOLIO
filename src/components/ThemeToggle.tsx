import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="p-2.5 w-10 h-10" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl glass hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none overflow-hidden group"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0.5,
          opacity: theme === 'dark' ? 1 : 0,
          rotate: theme === 'dark' ? 0 : 90,
          y: theme === 'dark' ? 0 : -20,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: theme === 'light' ? 1 : 0.5,
          opacity: theme === 'light' ? 1 : 0,
          rotate: theme === 'light' ? 0 : -90,
          y: theme === 'light' ? 0 : 20,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)] dark:text-blue-400 dark:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
      </motion.div>
    </button>
  );
}
