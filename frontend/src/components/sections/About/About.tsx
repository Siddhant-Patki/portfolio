import { motion, useReducedMotion } from 'framer-motion';
import { StickyNote } from './StickyNote';

const NOTES = [
  { text: '☕ Coffee-driven developer', color: 'yellow' as const, rotate: -3 },
  { text: '🇩🇪 Studying in Germany', color: 'blue' as const, rotate: 2 },
  { text: '🚀 Full-Stack Engineer', color: 'green' as const, rotate: -2 },
  { text: '🎯 Open to opportunities', color: 'pink' as const, rotate: 4 },
];

const S = {
  section: {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '96px 24px',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#34d399',
    marginBottom: '16px',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 5vw, 48px)',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: '#d1d5db',
    marginBottom: '32px',
    lineHeight: 1.15,
  },
  body: {
    fontSize: '16px',
    lineHeight: 1.75,
    color: 'rgba(209,213,219,0.65)',
    marginBottom: '16px',
  },
};

export function About(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      data-testid="about-section"
      style={S.section}
      aria-labelledby="about-heading"
    >
      <div style={S.inner}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Text */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p style={S.label}>01 · About me</p>
            <h2 id="about-heading" style={S.heading}>
              A bit about me
            </h2>
            <p style={S.body}>
              I&apos;m Siddhant — a full-stack developer and Master&apos;s student at{' '}
              <span style={{ color: '#d1d5db', fontWeight: 500 }}>
                Hof University of Applied Sciences
              </span>{' '}
              in Germany, studying Software Engineering for Industrial Applications.
            </p>
            <p style={S.body}>
              I care about writing clean, well-tested code and shipping things that actually work.
              My focus is the JavaScript/TypeScript ecosystem — from React UIs to Node.js backends —
              with a growing passion for DevOps and CI/CD.
            </p>
            <p style={{ ...S.body, marginBottom: 0 }}>
              When I&apos;m not coding, I&apos;m exploring a new city, finding the best coffee shop,
              or planning the next trip.
            </p>
          </motion.div>

          {/* Sticky notes */}
          <motion.div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
              padding: '24px',
            }}
            aria-label="Fun facts about Siddhant"
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            {NOTES.map((note, i) => (
              <StickyNote key={i} {...note} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
