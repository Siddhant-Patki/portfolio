export interface SkillCategory {
  category: string;
  items: string[];
}

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    items: ['React', 'Svelte', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'HTML5', 'CSS3', 'Solidity'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'Supabase'],
  },
  {
    category: 'Tools & DevOps',
    items: ['Git', 'GitHub Actions', 'Docker', 'Railway', 'Vitest', 'ESLint', 'AWS Cloud', 'Proxmox'],
  },
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'Linux'],
  },
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  skills: 'List all skills by category',
  contact: 'Show contact information',
  help: 'List available commands',
  clear: 'Clear terminal output',
  whoami: 'Show developer info',
};
