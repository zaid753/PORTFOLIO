import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Command, Maximize2, Minimize2, X } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HistoryItem {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string | React.ReactNode;
}

const COMMAND_DESCRIPTIONS: Record<string, string> = {
  about: 'Brief summary of who I am',
  skills: 'List a few of my core skills',
  tech: 'Display my core technical stack',
  projects: 'View my top projects',
  experience: 'Check my work experience',
  education: 'See my educational background',
  contact: 'Get my contact information',
  resume: 'Download my resume',
  cv: 'Download my resume',
  date: 'Display current system time',
  whoami: 'Identify the current user',
  theme: 'Toggle between light and dark modes',
  clear: 'Clear the terminal history',
  exit: 'Close the terminal'
};

export function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const { theme, setTheme } = useTheme();
  
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: '1', type: 'output', content: 'Welcome to the interactive terminal.' },
    { id: '2', type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd !== '') {
      setCommandHistory(prev => [...prev, cmd]);
    }
    setHistoryIndex(-1);

    const newHistory: HistoryItem[] = [...history, { id: Date.now().toString(), type: 'input', content: cmd }];

    const pushOutput = (content: string | React.ReactNode) => {
      newHistory.push({ id: (Date.now() + 1).toString(), type: 'output', content });
    };

    const pushError = (content: string) => {
      newHistory.push({ id: (Date.now() + 1).toString(), type: 'error', content });
    };

    switch (trimmedCmd) {
      case 'help':
        pushOutput(
          <div className="space-y-1">
            <p>Available commands:</p>
            <ul className="list-disc list-inside ml-2">
              {Object.entries(COMMAND_DESCRIPTIONS).map(([cmd, desc]) => (
                <li key={cmd}>
                  <span className="text-blue-400">{cmd}</span> - {desc}
                </li>
              ))}
            </ul>
          </div>
        );
        break;
      case 'about':
        pushOutput("Hi, I'm Mohammed Jaid. I'm a developer who enjoys building efficient and modern applications, focusing on impact and quality.");
        break;
      case 'skills':
        pushOutput("Core Skills: React, Node.js, TypeScript, Python, Tailwind CSS, Next.js, Google Gemini API, GCP/AWS/OCI.");
        break;
      case 'tech':
        pushOutput(
          <div className="space-y-4 mt-2">
            <p className="text-green-400 font-bold border-b border-gray-700 pb-1">=== CORE TECH STACK ===</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-blue-400 mb-1 font-semibold">Languages</p>
                <ul className="list-disc list-inside ml-2">
                  <li>TypeScript / JavaScript</li>
                  <li>Python</li>
                  <li>HTML / CSS (Tailwind)</li>
                </ul>
              </div>
              <div>
                <p className="text-blue-400 mb-1 font-semibold">Frameworks / Libraries</p>
                <ul className="list-disc list-inside ml-2">
                  <li>React & Next.js</li>
                  <li>Node.js & Express</li>
                  <li>PyTorch & TensorFlow</li>
                </ul>
              </div>
              <div>
                <p className="text-blue-400 mb-1 font-semibold">Cloud & DevOps</p>
                <ul className="list-disc list-inside ml-2">
                  <li>OCI / AWS / GCP</li>
                  <li>Docker & Kubernetes</li>
                  <li>Git / GitHub Actions</li>
                </ul>
              </div>
              <div>
                <p className="text-blue-400 mb-1 font-semibold">AI / LLM Tooling</p>
                <ul className="list-disc list-inside ml-2">
                  <li>Google Gemini API</li>
                  <li>LangChain / LLaMA Index</li>
                  <li>HuggingFace Transformers</li>
                </ul>
              </div>
            </div>
          </div>
        );
        break;
      case 'projects':
        pushOutput("Recent Projects:\n1. StockPilot - AI-powered voice-based inventory system\n2. PulseTalk - AI telehealth platform for rural India\n3. GlobeTrekker - AI-powered travel planner\n4. SpecIQ - AI-powered specification analysis\n5. NyayaSarathi - LegalTech platform using Gemini API\n6. NEBULA HAND - Real-Time Hand-Controlled Particle System");
        break;
      case 'experience':
        pushOutput("Experience:\n- Campus Mantri @ GeeksforGeeks (2026)\n- Google Student Ambassador @ Google / Developer Ecosystem (2025-26)\n- Open Source Contributor @ Code Social (2025-26)\n- Project Intern @ IIT Kanpur Virtual Labs (MoE) (2024-25)\n- Web Dev Intern @ BhuBhraman (2024)");
        break;
      case 'education':
        pushOutput("Education:\n- Oriental Institute of Science and Technology, Bhopal (B.Tech, IT): 2021-2025\n- Excellent H.S. School, Bhopal: 2019-2021");
        break;
      case 'contact':
        pushOutput("Email: mohammedjaid813@gmail.com\nLinkedIn: linkedin.com/in/mohammedjaid\nInstagram: instagram.com/zaid_4hmed\nGitHub: github.com/zaid753");
        break;
      case 'resume':
      case 'cv':
        const a = document.createElement('a');
        a.href = '/mohammed_jaid_resume.pdf';
        a.download = 'Mohammed_Jaid_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        pushOutput("Downloading resume... Please check your downloads folder.");
        break;
      case 'date':
        pushOutput(new Date().toString());
        break;
      case 'whoami':
        pushOutput("guest_user");
        break;
      case 'theme':
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        pushOutput(`Theme switched to ${newTheme} mode.`);
        break;
      case 'sudo':
      case 'su':
      case 'root':
        pushError("Nice try! This incident will be reported.");
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      case '':
        break;
      default:
        pushError(`Command not found: ${trimmedCmd}. Type "help" for a list of commands.`);
    }

    setHistory(newHistory);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };
  
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
           setHistoryIndex(nextIndex);
           setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 w-14 h-14 right-6 z-50 p-4 bg-gray-900 border border-gray-800 text-green-400 rounded-full shadow-2xl hover:scale-105 transition-transform group flex items-center justify-center hover-animate-pulse-glow"
        aria-label="Open Terminal"
      >
        <Terminal className="w-6 h-6 group-hover:text-green-300" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`fixed z-50 overflow-hidden bg-gray-950 border-gray-800 shadow-2xl flex flex-col font-mono text-sm sm:text-base ${
          isMaximized 
            ? 'inset-0 m-0 rounded-none border-0' 
            : 'bottom-6 right-6 w-[90vw] sm:w-[500px] h-[60vh] sm:h-[400px] rounded-xl border'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <div className="flex items-center gap-2 text-gray-400">
            <Command className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Interactive CLI</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="whitespace-pre-wrap">
              {item.type === 'input' && (
                <div className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400 shrink-0">guest@portfolio:~$</span>
                  <span>{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <div className="text-gray-300 ml-4 font-sans">{item.content}</div>
              )}
              {item.type === 'error' && (
                <div className="text-red-400 ml-4">{item.content}</div>
              )}
            </div>
          ))}
          
          <form onSubmit={onSubmit} className="flex items-start gap-2 text-gray-300 mt-4">
            <span className="text-green-400 shrink-0">guest@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-gray-300 caret-white"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
