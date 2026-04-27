export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  links: ProjectLinks;
  featured: boolean;
  sort_order: number;
  created_at?: string;
}
