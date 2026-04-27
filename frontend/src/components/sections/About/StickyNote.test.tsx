import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StickyNote } from './StickyNote';

describe('StickyNote', () => {
  it('renders the note text', () => {
    render(<StickyNote text="Full-Stack Dev" />);
    expect(screen.getByText('Full-Stack Dev')).toBeInTheDocument();
  });

  it('renders with yellow color by default', () => {
    render(<StickyNote text="Default" />);
    expect(screen.getByTestId('sticky-note')).toBeInTheDocument();
  });

  it('renders each color variant', () => {
    const colors = ['yellow', 'green', 'blue', 'pink'] as const;
    colors.forEach((color) => {
      const { unmount } = render(<StickyNote text={color} color={color} />);
      expect(screen.getByText(color)).toBeInTheDocument();
      unmount();
    });
  });
});
