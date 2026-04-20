import { motion, useReducedMotion } from 'framer-motion';
import { StickyNote } from './StickyNote';

const NOTES = [
  { text: '☕ Coffee-driven dev', color: 'yellow' as const, rotate: -3 },
  { text: '🇩🇪 Studying in Germany', color: 'blue' as const, rotate: 2 },
  { text: '🚀 Full-Stack Engineer', color: 'green' as const, rotate: -1 },
  { text: '🎯 Open to opportunities', color: 'pink' as const, rotate: 3 },
];

export function About(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      data-testid="about-section"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="about-heading"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="grid gap-16 lg:grid-cols-2 lg:items-center"
      >
        {/* Text column */}
        <div>
          <p className="mb-3 font-mono text-sm text-[var(--color-terminal-green)]">01. about</p>
          <h2
            id="about-heading"
            className="font-display mb-6 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl"
          >
            A bit about me
          </h2>

          <div className="space-y-4 text-[var(--color-foreground)]/70 leading-relaxed">
            <p>
              I&apos;m Siddhant — a full-stack developer and Master&apos;s student at{' '}
              <span className="text-[var(--color-foreground)]">
                Hof University of Applied Sciences
              </span>{' '}
              in Germany, studying Software Engineering for Industrial Applications.
            </p>
            <p>
              I care about writing clean, well-tested code and shipping things that actually work.
              My focus is on the JavaScript/TypeScript ecosystem — from React UIs to Node.js
              backends — with a growing interest in DevOps and CI/CD pipelines.
            </p>
            <p>
              When I&apos;m not coding, I&apos;m usually exploring a new city, trying a new coffee
              shop, or planning the next travel adventure.
            </p>
          </div>
        </div>

        {/* Sticky notes column */}
        <div
          className="relative flex flex-wrap justify-center gap-4 p-8"
          aria-label="Fun facts about Siddhant"
        >
          {NOTES.map((note, i) => (
            <StickyNote key={i} {...note} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
