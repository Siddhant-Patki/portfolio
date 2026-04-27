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

  const ringX = useSpring(mouseX, { damping: 22, stiffness: 150, mass: 0.8 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 150, mass: 0.8 });

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
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 9999,
          borderRadius: '50%',
          backgroundColor: '#34d399',
          x: dotX,
          y: dotY,
        }}
        animate={{
          width: isHovering ? 10 : 7,
          height: isHovering ? 10 : 7,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Outer ring — lags behind for a fluid feel */}
      <motion.div
        data-testid="cursor-ring"
        style={{
          pointerEvents: 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 9998,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'rgba(52,211,153,0.9)' : 'rgba(52,211,153,0.45)'}`,
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isHovering ? 52 : 34,
          height: isHovering ? 52 : 34,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.22 }}
      />
    </>
  );
}
