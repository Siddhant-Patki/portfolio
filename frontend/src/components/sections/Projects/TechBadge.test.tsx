import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TechBadge } from './TechBadge';

describe('TechBadge', () => {
  it('renders the tech label', () => {
    render(<TechBadge tech="React" />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders with sm size by default', () => {
    render(<TechBadge tech="TypeScript" />);
    const badge = screen.getByTestId('tech-badge');
    expect(badge).toBeInTheDocument();
  });

  it('renders with md size', () => {
    render(<TechBadge tech="Node.js" size="md" />);
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders overflow indicator', () => {
    render(<TechBadge tech="+3" />);
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
});
