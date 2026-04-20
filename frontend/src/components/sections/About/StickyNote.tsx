import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@lib/cn';

interface StickyNoteProps {
  text: string;
  color?: 'yellow' | 'green' | 'blue' | 'pink';
  rotate?: number;
  className?: string;
}

const COLOR_MAP = {
  yellow: 'bg-[#fef08a] text-[#713f12]',
  green: 'bg-[#bbf7d0] text-[#14532d]',
  blue: 'bg-[#bae6fd] text-[#0c4a6e]',
  pink: 'bg-[#fecdd3] text-[#881337]',
};

export function StickyNote({
  text,
  color = 'yellow',
  rotate = 0,
  className,
}: StickyNoteProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      data-testid="sticky-note"
      className={cn(
        'cursor-grab select-none rounded-sm p-4 font-mono text-sm font-medium shadow-lg active:cursor-grabbing',
        COLOR_MAP[color],
        className
      )}
      style={{ rotate }}
      drag={!prefersReduced}
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      dragElastic={0.1}
      whileHover={prefersReduced ? {} : { scale: 1.05, zIndex: 10 }}
      whileDrag={prefersReduced ? {} : { scale: 1.08, zIndex: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {text}
    </motion.div>
  );
}
