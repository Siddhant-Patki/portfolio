import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypewriterLineProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  prefix?: string;
}

export function TypewriterLine({
  text,
  delay = 0,
  speed = 50,
  onComplete,
  className = '',
  prefix = '',
}: TypewriterLineProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  // Initialize synchronously so no effect-triggered setState for reduced-motion users
  const [displayed, setDisplayed] = useState(() => (prefersReduced ? text : ''));
  const [started, setStarted] = useState(() => !!prefersReduced);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  // Fire onComplete once when prefersReduced and text is already fully displayed
  useEffect(() => {
    if (prefersReduced && displayed === text) {
      onCompleteRef.current?.();
    }
    // only on mount with prefersReduced
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReduced]);

  // Start delay timer (only when not prefersReduced)
  useEffect(() => {
    if (prefersReduced) return;
    const startTimer = window.setTimeout(() => setStarted(true), delay);
    return () => window.clearTimeout(startTimer);
  }, [delay, prefersReduced]);

  // Character-by-character ticker
  useEffect(() => {
    if (!started || prefersReduced) return;

    if (displayed.length >= text.length) {
      onCompleteRef.current?.();
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => window.clearTimeout(timer);
  }, [started, displayed, text, speed, prefersReduced]);

  return (
    <span data-testid="typewriter-line" className={className}>
      {prefix && <span className="text-[var(--color-terminal-green)]">{prefix}</span>}
      {displayed}
      {started && displayed.length < text.length && (
        <span
          className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-[var(--color-terminal-green)]"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
