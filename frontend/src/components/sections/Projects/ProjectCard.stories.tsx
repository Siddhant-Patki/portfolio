import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

const baseProject = {
  id: 'travel-your-way',
  title: 'Travel Your Way',
  tagline: 'AI-powered personalised travel itinerary planner',
  description:
    'A full-stack web app that generates custom multi-day travel itineraries using AI, with real-time flight and hotel data.',
  problem: 'Planning a trip is overwhelming.',
  solution: 'Built an AI pipeline that generates a full itinerary.',
  impact: 'Reduced trip-planning time from hours to minutes.',
  tech: ['React', 'Node.js', 'Express', 'OpenAI API', 'PostgreSQL', 'Tailwind CSS'],
  links: {
    github: 'https://github.com',
    live: 'https://example.com',
  },
  featured: true,
};

export const Featured: Story = {
  args: {
    project: baseProject,
    index: 0,
    onExpand: () => {},
  },
};

export const NotFeatured: Story = {
  args: {
    project: { ...baseProject, featured: false, title: 'Side Project', id: 'side' },
    index: 1,
    onExpand: () => {},
  },
};

export const NoLinks: Story = {
  args: {
    project: { ...baseProject, links: {}, id: 'no-links' },
    index: 2,
    onExpand: () => {},
  },
};

export const ManyTechTags: Story = {
  args: {
    project: {
      ...baseProject,
      tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Docker', 'Redis'],
      id: 'many-tags',
    },
    index: 0,
    onExpand: () => {},
  },
};
