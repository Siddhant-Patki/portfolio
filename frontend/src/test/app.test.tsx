import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.querySelector('main')).toBeInTheDocument();
  });

  it('has dark background container', () => {
    render(<App />);
    expect(document.querySelector('.min-h-screen')).toBeInTheDocument();
  });
});
