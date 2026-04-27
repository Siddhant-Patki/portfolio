import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown, Code2, MapPin } from 'lucide-react';
import { TerminalWindow } from './TerminalWindow';
import { TypewriterLine } from './TypewriterLine';

interface HeroProps {
  name?: string;
  role?: string;
  location?: string;
}

const TECH_STACK = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Docker',
  'CI/CD',
  'Tailwind CSS',
  'Framer Motion',
  'Git',
  'Supabase',
  'Vite',
];

const LINES = [
  { prefix: '$ ', text: 'whoami' },
  { prefix: '> ', text: 'Siddhant Patki' },
  { prefix: '$ ', text: 'cat role.txt' },
  { prefix: '> ', text: 'Full-Stack Developer' },
  { prefix: '$ ', text: 'echo $LOCATION' },
  { prefix: '> ', text: 'Hof, Germany' },
];

export function Hero({
  name = 'Siddhant Patki',
  role = 'Full-Stack Developer',
  location = 'Hof, Germany',
}: HeroProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(prefersReduced ? LINES.length : 0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const resolvedLines = LINES.map((l, i) => {
    if (i === 1) return { ...l, text: name };
    if (i === 3) return { ...l, text: role };
    if (i === 5) return { ...l, text: location };
    return l;
  });

  function scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  // Duplicate for seamless loop
  const marqueeItems = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      id="hero"
      data-testid="hero-section"
      aria-label="Hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: '88px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left column */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid rgba(52,211,153,0.25)',
                backgroundColor: 'rgba(52,211,153,0.08)',
                marginBottom: '32px',
              }}
            >
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  width: '8px',
                  height: '8px',
                }}
              >
                <motion.span
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    backgroundColor: '#34d399',
                  }}
                  animate={prefersReduced ? {} : { scale: [1, 2], opacity: [0.7, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
                />
                <span
                  style={{
                    position: 'relative',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#34d399',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'rgba(209,213,219,0.7)',
                  letterSpacing: '0.02em',
                }}
              >
                Available for opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: 'DM Sans, system-ui, sans-serif',
                fontSize: 'clamp(52px, 9vw, 96px)',
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #f1f5f9 0%, #f1f5f9 60%, #a7f3d0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {name}
            </h1>

            {/* Role + location */}
            <p
              style={{
                fontSize: '18px',
                color: 'rgba(209,213,219,0.5)',
                marginBottom: '40px',
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              <span style={{ color: 'rgba(209,213,219,0.85)', fontWeight: 500 }}>{role}</span>
              {' · '}
              {location}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('projects');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  backgroundColor: '#34d399',
                  color: '#0f172a',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  cursor: 'pointer',
                }}
                whileHover={prefersReduced ? {} : { scale: 1.02, backgroundColor: '#6ee7b7' }}
                whileTap={prefersReduced ? {} : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
                aria-label="View my projects"
              >
                View Projects
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '13px 28px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'rgba(209,213,219,0.8)',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  fontFamily: 'DM Sans, system-ui, sans-serif',
                  cursor: 'pointer',
                }}
                whileHover={
                  prefersReduced
                    ? {}
                    : {
                        backgroundColor: 'rgba(255,255,255,0.09)',
                        borderColor: 'rgba(52,211,153,0.3)',
                      }
                }
                whileTap={prefersReduced ? {} : { scale: 0.98 }}
                transition={{ duration: 0.15 }}
                aria-label="Get in touch"
              >
                Get in Touch
              </motion.a>
            </div>

            {/* Terminal */}
            <TerminalWindow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {resolvedLines.map((line, i) => (
                  <div
                    key={i}
                    style={{ lineHeight: '1.6', fontFamily: 'var(--font-mono)', fontSize: '13px' }}
                  >
                    {i < lineIndex ? (
                      <span>
                        <span style={{ color: '#34d399', marginRight: '6px' }}>{line.prefix}</span>
                        <span
                          style={{
                            color: line.prefix === '> ' ? '#d1d5db' : 'rgba(209,213,219,0.5)',
                          }}
                        >
                          {line.text}
                        </span>
                      </span>
                    ) : i === lineIndex ? (
                      <TypewriterLine
                        prefix={line.prefix}
                        text={line.text}
                        speed={45}
                        delay={i === 0 ? 700 : 180}
                        className={line.prefix === '> ' ? '' : 'opacity-55'}
                        onComplete={() => setLineIndex((prev) => prev + 1)}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Stats glass card */}
            <div
              style={{
                padding: '28px',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(52,211,153,0.12)',
                    border: '1px solid rgba(52,211,153,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Code2 size={22} color="#34d399" />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#f1f5f9',
                      lineHeight: 1.1,
                      fontFamily: 'DM Sans, system-ui, sans-serif',
                    }}
                  >
                    2+
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(209,213,219,0.5)' }}>
                    Years of Experience
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                    fontSize: '13px',
                  }}
                >
                  <span style={{ color: 'rgba(209,213,219,0.5)' }}>Projects delivered</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 500 }}>10+</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{
                      height: '100%',
                      borderRadius: '3px',
                      background: 'linear-gradient(90deg, #34d399, #6ee7b7)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '8px',
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {[
                    { value: 'M.Eng.', label: 'Degree' },
                    { value: '3rd', label: 'Semester' },
                    { value: 'DE', label: 'Germany' },
                  ].map(({ value, label }) => (
                    <div key={label}>
                      <div
                        style={{
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#f1f5f9',
                          marginBottom: '2px',
                        }}
                      >
                        {value}
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          color: 'rgba(209,213,219,0.4)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status pill */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'rgba(209,213,219,0.6)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <motion.span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#34d399',
                      }}
                      animate={prefersReduced ? {} : { opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    OPEN TO WORK
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 12px',
                      borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'rgba(209,213,219,0.6)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    <MapPin size={10} />
                    HOF, DE
                  </div>
                </div>
              </div>
            </div>

            {/* Tech marquee card */}
            <div
              style={{
                padding: '20px 0',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                overflow: 'hidden',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'rgba(209,213,219,0.35)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  paddingLeft: '24px',
                }}
              >
                Tech Stack
              </p>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  maskImage:
                    'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                }}
              >
                <motion.div
                  ref={marqueeRef}
                  style={{ display: 'flex', gap: '12px', width: 'max-content' }}
                  animate={prefersReduced ? {} : { x: ['0%', '-50%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  {marqueeItems.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '100px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'rgba(209,213,219,0.65)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(209,213,219,0.25)',
          cursor: 'pointer',
        }}
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} />
      </motion.button>
    </section>
  );
}
