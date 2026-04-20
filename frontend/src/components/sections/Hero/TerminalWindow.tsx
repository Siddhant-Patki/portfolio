import { type ReactNode } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({
  children,
  className = '',
}: TerminalWindowProps): React.JSX.Element {
  return (
    <div
      data-testid="terminal-window"
      className={`overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] font-mono text-sm ${className}`}
      role="region"
      aria-label="Terminal window"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 text-xs text-white/30">siddhant@portfolio ~ </span>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  );
}
