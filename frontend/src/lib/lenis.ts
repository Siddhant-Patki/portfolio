import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function initLenis(): () => void {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time: number): void {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  const rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
  };
}

export function getLenis(): Lenis | null {
  return lenis;
}
