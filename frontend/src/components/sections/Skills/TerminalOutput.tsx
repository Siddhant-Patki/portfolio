interface OutputLine {
  text: string;
  type: 'command' | 'output' | 'error' | 'success';
}

interface TerminalOutputProps {
  lines: OutputLine[];
}

const TYPE_COLORS: Record<OutputLine['type'], string> = {
  command: '#34d399',
  output: 'rgba(209,213,219,0.75)',
  error: '#f87171',
  success: '#34d399',
};

export function TerminalOutput({ lines }: TerminalOutputProps): React.JSX.Element {
  return (
    <div
      data-testid="terminal-output"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
      }}
    >
      {lines.map((line, i) => (
        <p key={i} style={{ color: TYPE_COLORS[line.type], lineHeight: 1.6, margin: 0 }}>
          {line.type === 'command' && (
            <span style={{ marginRight: '8px', color: 'rgba(255,255,255,0.3)' }}>$</span>
          )}
          {line.text}
        </p>
      ))}
    </div>
  );
}

export type { OutputLine };
