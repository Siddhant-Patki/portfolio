import { motion, useReducedMotion } from 'framer-motion';
import { TimelineItem } from './TimelineItem';
import { EXPERIENCE } from '@constants/experience';

export function Experience(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="experience-heading"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 font-mono text-sm text-[var(--color-terminal-green)]">02. experience</p>
        <h2
          id="experience-heading"
          className="font-display mb-12 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl"
        >
          Where I&apos;ve worked
        </h2>

        <div>
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.id} item={item} isLast={i === EXPERIENCE.length - 1} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
