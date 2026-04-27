import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MetricCounter } from './MetricCounter';
import type { ExperienceItem } from '@constants/experience';

interface TimelineItemProps {
  item: ExperienceItem;
  isLast?: boolean;
}

export function TimelineItem({ item, isLast = false }: TimelineItemProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      style={{ position: 'relative', display: 'flex', gap: '24px' }}
      data-testid="timeline-item"
      ref={ref}
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            left: '11px',
            top: '32px',
            bottom: 0,
            width: '1px',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Dot */}
      <div style={{ position: 'relative', marginTop: '4px', flexShrink: 0 }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '2px solid #34d399',
            backgroundColor: '#0f172a',
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ marginBottom: '48px', flex: 1 }}
        initial={prefersReduced ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: '8px',
            marginBottom: '4px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              fontWeight: 600,
              color: '#d1d5db',
            }}
          >
            {item.role}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'rgba(209,213,219,0.35)',
            }}
          >
            {item.period}
          </span>
        </div>

        <p style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 500, color: '#34d399' }}>
          {item.company} · {item.location}
        </p>

        <ul
          style={{
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            paddingLeft: 0,
            listStyle: 'none',
          }}
        >
          {item.description.map((point, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: '8px',
                fontSize: '14px',
                color: 'rgba(209,213,219,0.72)',
                lineHeight: 1.6,
              }}
            >
              <span
                style={{
                  marginTop: '8px',
                  width: '4px',
                  height: '4px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  backgroundColor: '#34d399',
                }}
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        {item.metrics.length > 0 && (
          <div style={{ marginBottom: '16px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {item.metrics.map((metric, i) => (
              <MetricCounter key={i} {...metric} inView={inView} />
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {item.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: '3px 12px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(209,213,219,0.45)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
