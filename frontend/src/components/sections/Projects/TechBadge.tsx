interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
}

export function TechBadge({ tech, size = 'sm' }: TechBadgeProps): React.JSX.Element {
  return (
    <span
      data-testid="tech-badge"
      style={{
        display: 'inline-block',
        padding: size === 'sm' ? '3px 10px' : '5px 14px',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.1)',
        fontSize: size === 'sm' ? '11px' : '13px',
        fontFamily: 'var(--font-mono)',
        color: 'rgba(209,213,219,0.55)',
        backgroundColor: 'rgba(255,255,255,0.03)',
      }}
    >
      {tech}
    </span>
  );
}
