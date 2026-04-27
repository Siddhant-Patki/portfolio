import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechBadge } from './TechBadge';

const meta: Meta<typeof TechBadge> = {
  title: 'Components/TechBadge',
  component: TechBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TechBadge>;

export const Small: Story = {
  args: { tech: 'React', size: 'sm' },
};

export const Medium: Story = {
  args: { tech: 'TypeScript', size: 'md' },
};

export const Overflow: Story = {
  args: { tech: '+3', size: 'sm' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <TechBadge tech="React" size="sm" />
      <TechBadge tech="Node.js" size="md" />
      <TechBadge tech="PostgreSQL" size="sm" />
      <TechBadge tech="Tailwind CSS" size="md" />
    </div>
  ),
};
