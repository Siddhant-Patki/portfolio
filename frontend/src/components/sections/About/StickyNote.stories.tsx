import type { Meta, StoryObj } from '@storybook/react';
import { StickyNote } from './StickyNote';

const meta: Meta<typeof StickyNote> = {
  title: 'Components/StickyNote',
  component: StickyNote,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['yellow', 'green', 'blue', 'pink'],
    },
    rotate: { control: { type: 'range', min: -15, max: 15 } },
  },
};

export default meta;
type Story = StoryObj<typeof StickyNote>;

export const Yellow: Story = {
  args: { text: 'Full-Stack Dev', color: 'yellow', rotate: -3 },
};

export const Green: Story = {
  args: { text: 'Open to Work', color: 'green', rotate: 2 },
};

export const Blue: Story = {
  args: { text: 'React Enthusiast', color: 'blue', rotate: -1 },
};

export const Pink: Story = {
  args: { text: 'Coffee Driven', color: 'pink', rotate: 4 },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', padding: '40px' }}>
      <StickyNote text="Full-Stack Dev" color="yellow" rotate={-3} />
      <StickyNote text="Open to Work" color="green" rotate={2} />
      <StickyNote text="React Enthusiast" color="blue" rotate={-1} />
      <StickyNote text="Coffee Driven" color="pink" rotate={4} />
    </div>
  ),
};
