import { type ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ children }: TerminalWindowProps): React.JSX.Element {
  return (
    <div
      data-testid="terminal-window"
      role="region"
      aria-label="Terminal window"
      style={{
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#1a2540',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '10px 16px',
        }}
      >
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff5f57',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#febc2e',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#28c840',
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span style={{ marginLeft: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
          siddhant@portfolio ~
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px' }}>{children}</div>
    </div>
  );
}
