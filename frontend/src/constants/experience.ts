export interface Metric {
  value: number;
  suffix: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  metrics: Metric[];
  tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'nitor-trainee',
    company: 'Nitor Infotech',
    role: 'Trainee Software Engineering',
    period: 'Jul 2024 – Jul 2025',
    location: 'Pune, India',
    description: [
      'Built full-stack dashboards for US healthcare clients using React.js (frontend) and Django/Python (backend), serving production users across multiple client organizations.',
      'Implemented JWT authentication and RBAC system via Django middleware securing REST endpoints, reducing unauthorized access incidents by 50%.',
      'Engineered reusable React components with Redux state management, reducing user error rates by 35%.',
      'Developed CI/CD pipelines via GitHub Actions for React-Django-PostgreSQL application, reducing manual deployment effort by 60%.',
    ],
    metrics: [
      { value: 40, suffix: '%', label: 'faster API responses' },
      { value: 15, suffix: '+', label: 'engineers collaborated with' },
    ],
    tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'REST APIs', 'Python'],
  },
  {
    id: 'nitor',
    company: 'Nitor Infotech',
    role: 'Software Engineer Intern',
    period: 'Jan 2024 – July 2024',
    location: 'Pune, India',
    description: [
      'Built and maintained RESTful APIs using Node.js and Express, improving endpoint response time by 30%.',
      'Developed reusable React components integrated with real-time dashboards for internal tooling.',
      'Collaborated with a cross-functional team of 8 engineers in an Agile sprint environment.',
    ],
    metrics: [
      { value: 20, suffix: '%', label: 'faster API responses' },
      { value: 8, suffix: '+', label: 'engineers collaborated with' },
    ],
    tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'REST APIs'],
  },
];
