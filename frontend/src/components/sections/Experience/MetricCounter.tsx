import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Metric } from '@constants/experience';

interface MetricCounterProps extends Metric {
  inView: boolean;
}

export function MetricCounter({
  value,
  suffix,
  label,
  inView,
}: MetricCounterProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced || !inView ? value : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || prefersReduced || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200;
    const steps = 40;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(Math.round(stepValue * step), value);
      setCount(current);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, value, prefersReduced]);

  return (
    <div className="text-center" data-testid="metric-counter">
      <span className="font-display text-3xl font-bold text-[var(--color-primary)]">
        {count}
        {suffix}
      </span>
      <p className="mt-1 text-xs text-[var(--color-foreground)]/50">{label}</p>
    </div>
  );
}
