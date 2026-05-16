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
  semester: 'Semester 2 (Summer 2026)',
  currentProject: 'Various projects',
  learning: ['Claude technology', 'CI/CD best practices', 'Full-stack developing'],
  availableFor: 'Internships & Working Student roles (Part-time)',
};
