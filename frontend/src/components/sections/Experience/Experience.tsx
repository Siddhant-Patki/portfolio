import { motion, useReducedMotion } from 'framer-motion';
import { TimelineItem } from './TimelineItem';
import { EXPERIENCE } from '@constants/experience';

export function Experience(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="experience"
      data-testid="experience-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '96px 24px' }}
      aria-labelledby="experience-heading"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#34d399',
              marginBottom: '16px',
            }}
          >
            02 · Experience
          </p>
          <h2
            id="experience-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#d1d5db',
              marginBottom: '56px',
            }}
          >
            Where I&apos;ve worked
          </h2>

          <div style={{ maxWidth: '720px' }}>
            {EXPERIENCE.map((item, i) => (
              <TimelineItem key={item.id} item={item} isLast={i === EXPERIENCE.length - 1} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
