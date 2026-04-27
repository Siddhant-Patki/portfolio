import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FakeTerminal } from './FakeTerminal';
import { SKILLS } from '@constants/skills';

gsap.registerPlugin(ScrollTrigger);

export function Skills(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced || !badgesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-badge',
        { opacity: 0, y: 14, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.32,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgesRef.current,
            start: 'top 82%',
          },
        }
      );
    }, badgesRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      id="skills"
      data-testid="skills-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '96px 24px' }}
      aria-labelledby="skills-heading"
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
            04 · Skills
          </p>
          <h2
            id="skills-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#d1d5db',
              marginBottom: '56px',
            }}
          >
            What I work with
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '64px',
              alignItems: 'start',
            }}
          >
            {/* Badges */}
            <div ref={badgesRef} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              {SKILLS.map((cat) => (
                <div key={cat.category}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(209,213,219,0.25)',
                      marginBottom: '12px',
                    }}
                  >
                    {cat.category}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.items.map((skill) => (
                      <span
                        key={skill}
                        className="skill-badge"
                        style={{
                          display: 'inline-block',
                          opacity: 0,
                          padding: '5px 14px',
                          borderRadius: '100px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          fontSize: '13px',
                          color: 'rgba(209,213,219,0.6)',
                          cursor: 'default',
                          transition:
                            'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (prefersReduced) return;
                          const el = e.currentTarget;
                          el.style.color = '#34d399';
                          el.style.borderColor = 'rgba(52,211,153,0.35)';
                          el.style.backgroundColor = 'rgba(52,211,153,0.06)';
                          gsap.to(el, { scale: 1.08, duration: 0.2, ease: 'back.out(2)' });
                        }}
                        onMouseLeave={(e) => {
                          if (prefersReduced) return;
                          const el = e.currentTarget;
                          el.style.color = 'rgba(209,213,219,0.6)';
                          el.style.borderColor = 'rgba(255,255,255,0.08)';
                          el.style.backgroundColor = 'rgba(255,255,255,0.04)';
                          gsap.to(el, { scale: 1, duration: 0.18, ease: 'power2.out' });
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal */}
            <div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(209,213,219,0.3)',
                  marginBottom: '12px',
                }}
              >
                Try it — type{' '}
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#34d399',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  skills
                </code>{' '}
                or{' '}
                <code
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#34d399',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  help
                </code>
              </p>
              <FakeTerminal />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
