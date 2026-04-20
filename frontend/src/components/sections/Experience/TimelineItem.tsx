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
    <div className="relative flex gap-6" data-testid="timeline-item" ref={ref}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-8 bottom-0 w-px bg-white/10" aria-hidden="true" />
      )}

      {/* Dot */}
      <div className="relative mt-1 flex-shrink-0">
        <div className="h-6 w-6 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-background)]" />
      </div>

      {/* Content */}
      <motion.div
        className="mb-12 flex-1"
        initial={prefersReduced ? false : { opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-[var(--color-foreground)]">
            {item.role}
          </h3>
          <span className="font-mono text-xs text-[var(--color-foreground)]/40">{item.period}</span>
        </div>

        <p className="mb-4 text-sm font-medium text-[var(--color-primary)]">
          {item.company} · {item.location}
        </p>

        <ul className="mb-6 space-y-2">
          {item.description.map((point, i) => (
            <li key={i} className="flex gap-2 text-sm text-[var(--color-foreground)]/70">
              <span
                className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-primary)]"
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        {item.metrics.length > 0 && (
          <div className="mb-4 flex gap-8">
            {item.metrics.map((metric, i) => (
              <MetricCounter key={i} {...metric} inView={inView} />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {item.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-[var(--color-foreground)]/50"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
