export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  link?: string;
  category: 'AI/ML' | 'FullStack' | 'LegalTech' | 'Travel' | 'Web3';
  accent: string;
  tag?: string;
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  logo?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon?: string }[];
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon?: string;
}
