import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from '@components/layout/Navbar';
import { Footer } from '@components/layout/Footer';
import { Hero } from '@components/sections/Hero/Hero';
import { About } from '@components/sections/About/About';
import { Experience } from '@components/sections/Experience/Experience';
import { Projects } from '@components/sections/Projects/Projects';
import { Skills } from '@components/sections/Skills/Skills';
import { Currently } from '@components/sections/Currently/Currently';
import { Contact } from '@components/sections/Contact/Contact';

function App(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Global pointer tracker — feeds --x/--y (px) + --xp/--yp (0-1) to all [data-glow] cards
  useEffect(() => {
    function onPointerMove(e: PointerEvent): void {
      const root = document.documentElement;
      root.style.setProperty('--x', String(e.clientX));
      root.style.setProperty('--y', String(e.clientY));
      root.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(3));
      root.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(3));
    }
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#d1d5db', minHeight: '100vh' }}>
      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#main-content"
        style={{
          position: 'fixed',
          top: '-100%',
          left: '16px',
          zIndex: 9999,
          padding: '10px 20px',
          backgroundColor: '#34d399',
          color: '#0f172a',
          fontWeight: 700,
          fontSize: '14px',
          borderRadius: '0 0 8px 8px',
          textDecoration: 'none',
          transition: 'top 0.15s ease',
        }}
        onFocus={(e) => (e.currentTarget.style.top = '0')}
        onBlur={(e) => (e.currentTarget.style.top = '-100%')}
      >
        Skip to main content
      </a>

      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: '#34d399',
          transformOrigin: '0%',
          zIndex: 9997,
        }}
      />

      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Currently />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
