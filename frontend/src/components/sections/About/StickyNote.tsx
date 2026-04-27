import { motion, useReducedMotion } from 'framer-motion';

interface StickyNoteProps {
  text: string;
  color?: 'yellow' | 'green' | 'blue' | 'pink';
  rotate?: number;
}

const COLOR_MAP: Record<
  NonNullable<StickyNoteProps['color']>,
  { bg: string; text: string; border: string }
> = {
  yellow: { bg: 'rgba(254,240,138,0.9)', text: '#78350f', border: 'rgba(251,191,36,0.4)' },
  green: { bg: 'rgba(134,239,172,0.9)', text: '#14532d', border: 'rgba(52,211,153,0.4)' },
  blue: { bg: 'rgba(147,197,253,0.9)', text: '#1e3a5f', border: 'rgba(96,165,250,0.4)' },
  pink: { bg: 'rgba(249,168,212,0.9)', text: '#831843', border: 'rgba(236,72,153,0.4)' },
};

export function StickyNote({
  text,
  color = 'yellow',
  rotate = 0,
}: StickyNoteProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const palette = COLOR_MAP[color];

  return (
    <motion.div
      data-testid="sticky-note"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        minHeight: '160px',
        width: '175px',
        padding: '20px 18px',
        borderRadius: '4px',
        backgroundColor: palette.bg,
        border: `1px solid ${palette.border}`,
        color: palette.text,
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: 1.45,
        boxShadow: '4px 6px 24px rgba(0,0,0,0.35)',
        rotate,
        overflow: 'hidden',
        userSelect: 'none',
      }}
      drag={!prefersReduced}
      dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
      dragElastic={0.15}
      whileHover={prefersReduced ? {} : { scale: 1.06, zIndex: 20, rotate: 0 }}
      whileDrag={prefersReduced ? {} : { scale: 1.1, zIndex: 30 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
    >
      {/* Corner fold */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '32px',
          height: '32px',
          background: 'linear-gradient(225deg, rgba(0,0,0,0.15) 50%, transparent 50%)',
        }}
        aria-hidden="true"
      />
      {text}
    </motion.div>
  );
}
