import { cn } from '@lib/cn';

interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
}

export function TechBadge({ tech, size = 'sm' }: TechBadgeProps): React.JSX.Element {
  return (
    <span
      data-testid="tech-badge"
      className={cn(
        'rounded-full border border-white/10 font-mono text-[var(--color-foreground)]/60',
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {tech}
    </span>
  );
}
