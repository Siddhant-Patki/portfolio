import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { TerminalWindow } from './TerminalWindow';
import { TypewriterLine } from './TypewriterLine';

interface HeroProps {
  name?: string;
  role?: string;
  location?: string;
}

const LINES = [
  { prefix: '$ ', text: 'whoami' },
  { prefix: '> ', text: 'Siddhant Patki' },
  { prefix: '$ ', text: 'cat role.txt' },
  { prefix: '> ', text: 'Full-Stack Developer' },
  { prefix: '$ ', text: 'echo $LOCATION' },
  { prefix: '> ', text: 'Hof, Germany 🇩🇪' },
];

export function Hero({
  name = 'Siddhant Patki',
  role = 'Full-Stack Developer',
  location = 'Hof, Germany 🇩🇪',
}: HeroProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(prefersReduced ? LINES.length : 0);

  const resolvedLines = LINES.map((l, i) => {
    if (i === 1) return { ...l, text: name };
    if (i === 3) return { ...l, text: role };
    if (i === 5) return { ...l, text: location };
    return l;
  });

  function handleScrollDown(): void {
    document.getElementById('about')?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  }

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative flex min-h-screen items-center justify-center px-6"
      aria-label="Hero"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Greeting */}
          <p className="mb-4 font-mono text-sm text-[var(--color-terminal-green)]">
            Hello, world 👋
          </p>

          {/* Name heading */}
          <h1 className="font-display mb-2 text-5xl font-bold leading-tight text-[var(--color-foreground)] md:text-7xl">
            {name}
          </h1>

          <p className="mb-10 text-xl text-[var(--color-foreground)]/60 md:text-2xl">
            {role} · {location}
          </p>

          {/* Terminal */}
          <TerminalWindow className="mb-10">
            <div className="space-y-1">
              {resolvedLines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {i < lineIndex ? (
                    <span>
                      <span className="text-[var(--color-terminal-green)]">{line.prefix}</span>
                      <span className="text-[var(--color-foreground)]/80">{line.text}</span>
                    </span>
                  ) : i === lineIndex ? (
                    <TypewriterLine
                      prefix={line.prefix}
                      text={line.text}
                      speed={45}
                      delay={i === 0 ? 400 : 0}
                      className="text-[var(--color-foreground)]/80"
                      onComplete={() => setLineIndex((prev) => prev + 1)}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </TerminalWindow>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({
                  behavior: prefersReduced ? 'auto' : 'smooth',
                });
              }}
              className="rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              aria-label="View my projects"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({
                  behavior: prefersReduced ? 'auto' : 'smooth',
                });
              }}
              className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-[var(--color-foreground)]/80 transition-colors hover:border-white/20 hover:text-[var(--color-foreground)]"
              aria-label="Get in touch"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-foreground)]/30 hover:text-[var(--color-foreground)]/60"
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={22} />
      </motion.button>
    </section>
  );
}
