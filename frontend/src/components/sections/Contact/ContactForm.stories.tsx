import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from './ContactForm';

const meta: Meta<typeof ContactForm> = {
  title: 'Components/ContactForm',
  component: ContactForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {};

export const WithSuccessSimulated: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 800));
    },
  },
};

export const WithErrorSimulated: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((_, reject) => setTimeout(() => reject(new Error('Server error')), 800));
    },
  },
};
