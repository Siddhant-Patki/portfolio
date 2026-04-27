import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, GraduationCap, Code, BookOpen, Briefcase } from 'lucide-react';
import { CURRENTLY } from '@constants/currently';

// Evenly spaced hues around the colour wheel — one per card
const RAINBOW_BASES = [0, 72, 144, 216, 288] as const;

export function Currently(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  // CSS custom properties can't go in MotionStyle — set via DOM after mount
  useEffect(() => {
    RAINBOW_BASES.forEach((base, i) => {
      const el = cardRefs.current[i];
      if (el) {
        el.style.setProperty('--glow-base', String(base));
        el.style.setProperty('--glow-spread', '25');
      }
    });
  }, []);

  const cards = [
    {
      icon: <MapPin size={15} />,
      label: 'Location',
      value: `${CURRENTLY.city}, ${CURRENTLY.country}`,
    },
    {
      icon: <GraduationCap size={15} />,
      label: 'Studying',
      value: CURRENTLY.semester,
      sub: CURRENTLY.university,
    },
    { icon: <Code size={15} />, label: 'Building', value: CURRENTLY.currentProject },
    { icon: <BookOpen size={15} />, label: 'Learning', value: CURRENTLY.learning.join(' · ') },
    { icon: <Briefcase size={15} />, label: 'Open to', value: CURRENTLY.availableFor },
  ];

  return (
    <section
      id="currently"
      data-testid="currently-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '96px 24px' }}
      aria-labelledby="currently-heading"
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
            05 · Currently
          </p>
          <h2
            id="currently-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#d1d5db',
              marginBottom: '56px',
            }}
          >
            Right now
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.label}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                data-glow=""
                style={{
                  padding: '24px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                }}
                onMouseMove={(e) => {
                  if (prefersReduced) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    '--x',
                    String(Math.round(e.clientX - rect.left))
                  );
                  e.currentTarget.style.setProperty(
                    '--y',
                    String(Math.round(e.clientY - rect.top))
                  );
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.removeProperty('--x');
                  e.currentTarget.style.removeProperty('--y');
                }}
                initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.4, delay: i * 0.04, ease: 'easeOut' },
                  y: { type: 'spring', stiffness: 260, damping: 22, delay: i * 0.04 },
                  borderColor: { duration: 0.2, ease: 'easeOut' },
                  boxShadow: { duration: 0.25, ease: 'easeOut' },
                }}
                whileHover={
                  prefersReduced ? {} : { y: -5, boxShadow: '0 12px 32px rgba(0,0,0,0.35)' }
                }
                whileTap={prefersReduced ? {} : { scale: 0.98 }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '14px',
                    color: '#34d399',
                  }}
                >
                  {card.icon}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(209,213,219,0.3)',
                    }}
                  >
                    {card.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'rgba(209,213,219,0.75)',
                    lineHeight: 1.6,
                  }}
                >
                  {card.value}
                </p>
                {card.sub && (
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'rgba(209,213,219,0.28)',
                      marginTop: '6px',
                      lineHeight: 1.5,
                    }}
                  >
                    {card.sub}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
