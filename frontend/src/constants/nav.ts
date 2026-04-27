export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/Siddhant-Patki',
  linkedin: 'https://linkedin.com/in/siddhant-patki',
  email: 'sidpatki123@gmail.com',
} as const;
