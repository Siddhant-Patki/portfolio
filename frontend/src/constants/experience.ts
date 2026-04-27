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
    id: 'nitor',
    company: 'Nitor Infotech',
    role: 'Software Engineer Intern',
    period: 'Jun 2023 – Aug 2023',
    location: 'Pune, India',
    description: [
      'Built and maintained RESTful APIs using Node.js and Express, improving endpoint response time by 30%.',
      'Developed reusable React components integrated with real-time dashboards for internal tooling.',
      'Collaborated with a cross-functional team of 8 engineers in an Agile sprint environment.',
    ],
    metrics: [
      { value: 30, suffix: '%', label: 'faster API responses' },
      { value: 8, suffix: '+', label: 'engineers collaborated with' },
    ],
    tech: ['Node.js', 'Express', 'React', 'PostgreSQL', 'REST APIs'],
  },
];
