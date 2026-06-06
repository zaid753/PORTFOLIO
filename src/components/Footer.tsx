import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-gray-500 dark:text-gray-400">
            Designed & built by <span className="font-semibold text-gray-900 dark:text-white">Mohammed Jaid</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Open to opportunities — let's connect
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/zaid753"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors hover-animate-pulse-glow"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/mohammedjaid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors hover-animate-pulse-glow"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/zaid_4hmed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors hover-animate-pulse-glow"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="mailto:mohammedjaid813@gmail.com"
            className="text-gray-400 hover:text-red-500 transition-colors hover-animate-pulse-glow"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-medium text-blue-500 hover:underline"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
