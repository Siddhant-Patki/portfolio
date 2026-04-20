export interface CurrentlyData {
  city: string;
  country: string;
  university: string;
  degree: string;
  semester: string;
  currentProject: string;
  learning: string[];
  availableFor: string;
}

export const CURRENTLY: CurrentlyData = {
  city: 'Hof',
  country: 'Germany',
  university: 'Hof University of Applied Sciences',
  degree: 'M.Eng. Software Engineering for Industrial Applications',
  semester: 'Semester 2 (Summer 2025)',
  currentProject: 'This portfolio',
  learning: ['Advanced TypeScript patterns', 'CI/CD best practices', 'Playwright E2E testing'],
  availableFor: 'Internships & Working Student roles (Part-time)',
};
