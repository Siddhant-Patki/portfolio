import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initLenis } from '@lib/lenis';
import App from './App';
import './styles/globals.css';

export function Root(): React.JSX.Element {
  useEffect(() => {
    const cleanup = initLenis();
    return cleanup;
  }, []);

  return <App />;
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
