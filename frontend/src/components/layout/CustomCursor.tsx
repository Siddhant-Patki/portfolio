import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export function CustomCursor(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { damping: 28, stiffness: 400, mass: 0.5 });
  const dotY = useSpring(mouseY, { damping: 28, stiffness: 400, mass: 0.5 });

  const ringX = useSpring(mouseX, { damping: 35, stiffness: 200, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 35, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    if (prefersReduced) return;

    function onMouseMove(e: MouseEvent): void {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    }

    function onMouseOver(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      setIsHovering(interactive !== null);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [mouseX, mouseY, isVisible, prefersReduced]);

  if (prefersReduced) return <></>;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        data-testid="cursor-dot"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[var(--color-primary)]"
        style={{ x: dotX, y: dotY }}
        animate={{
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        data-testid="cursor-ring"
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-[var(--color-primary)]"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 0.5 : 0,
          borderColor: isHovering ? 'var(--color-terminal-green)' : 'var(--color-primary)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
