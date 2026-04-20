interface OutputLine {
  text: string;
  type: 'command' | 'output' | 'error' | 'success';
}

interface TerminalOutputProps {
  lines: OutputLine[];
}

const TYPE_CLASSES = {
  command: 'text-[var(--color-terminal-green)]',
  output: 'text-[var(--color-foreground)]/80',
  error: 'text-red-400',
  success: 'text-[var(--color-primary)]',
};

export function TerminalOutput({ lines }: TerminalOutputProps): React.JSX.Element {
  return (
    <div data-testid="terminal-output" className="space-y-1 font-mono text-sm">
      {lines.map((line, i) => (
        <p key={i} className={TYPE_CLASSES[line.type]}>
          {line.type === 'command' && <span className="mr-2 text-white/30">$</span>}
          {line.text}
        </p>
      ))}
    </div>
  );
}

export type { OutputLine };
