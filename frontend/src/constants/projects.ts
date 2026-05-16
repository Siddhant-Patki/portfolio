export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  links: {
    github?: string;
    live?: string;
  };
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 'travel-your-way',
    title: 'Travel Your Way',
    tagline: 'AI-powered personalised travel itinerary planner',
    description:
      'A full-stack web app that generates custom multi-day travel itineraries using AI, with real-time flight and hotel data.',
    problem:
      'Travellers spend hours manually researching destinations, flights, and accommodations — often ending up with disjointed plans.',
    solution:
      'Built an AI-driven planner that takes user preferences and generates a coherent day-by-day itinerary with integrated flight/hotel suggestions, exportable as PDF.',
    impact:
      'Reduced trip planning time from hours to minutes. Received positive feedback from early users for UX clarity and itinerary quality.',
    tech: ['React', 'Node.js', 'Express', 'OpenAI API', 'PostgreSQL', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/Siddhant-Patki/travel-your-way',
    },
    featured: true,
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    tagline: 'This site — built as a full learning project',
    description:
      'Personal portfolio with CI/CD pipelines, TypeScript strict mode, Vitest testing, and a Node.js contact backend.',
    problem:
      'Wanted a portfolio that doubles as a hands-on project for CI/CD, testing, and backend integration — not just a static site.',
    solution:
      'Monorepo with React + Vite frontend deployed to GitHub Pages and Express backend on Railway, with full GitHub Actions pipelines.',
    impact:
      'Green CI/CD pipeline from day one. Demonstrates full-stack TypeScript discipline and DevOps practices.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'GitHub Actions'],
    links: {
      github: 'https://github.com/Siddhant-Patki/portfolio',
      live: 'https://siddhant-patki.github.io/portfolio',
    },
    featured: true,
  },
];
