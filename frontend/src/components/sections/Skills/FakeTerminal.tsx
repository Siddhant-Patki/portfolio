import { useState, useRef, useEffect } from 'react';
import { TerminalOutput, type OutputLine } from './TerminalOutput';
import { SKILLS, TERMINAL_COMMANDS } from '@constants/skills';
import { SOCIAL_LINKS } from '@constants/nav';

const WELCOME: OutputLine[] = [
  { text: 'Welcome! Type "help" to see available commands.', type: 'success' },
];

function processCommand(input: string): OutputLine[] {
  const cmd = input.trim().toLowerCase();

  if (cmd === 'help') {
    return [
      { text: 'help', type: 'command' },
      ...Object.entries(TERMINAL_COMMANDS).map(([k, v]) => ({
        text: `  ${k.padEnd(12)} — ${v}`,
        type: 'output' as const,
      })),
    ];
  }

  if (cmd === 'skills') {
    return [
      { text: 'skills', type: 'command' },
      ...SKILLS.flatMap((cat) => [
        { text: `\n${cat.category}:`, type: 'success' as const },
        { text: cat.items.join('  ·  '), type: 'output' as const },
      ]),
    ];
  }

  if (cmd === 'contact') {
    return [
      { text: 'contact', type: 'command' },
      { text: `email     ${SOCIAL_LINKS.email}`, type: 'output' },
      { text: `github    ${SOCIAL_LINKS.github}`, type: 'output' },
      { text: `linkedin  ${SOCIAL_LINKS.linkedin}`, type: 'output' },
    ];
  }

  if (cmd === 'whoami') {
    return [
      { text: 'whoami', type: 'command' },
      { text: 'Siddhant Patki — Full-Stack Developer', type: 'output' },
      { text: 'Hof University of Applied Sciences, Germany', type: 'output' },
    ];
  }

  if (cmd === 'clear') {
    return [];
  }

  if (cmd === '') {
    return [];
  }

  return [
    { text: cmd, type: 'command' },
    { text: `command not found: ${cmd}. Type "help" for available commands.`, type: 'error' },
  ];
}

export function FakeTerminal(): React.JSX.Element {
  const [history, setHistory] = useState<OutputLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (!input.trim()) return;

    const result = processCommand(input);

    if (input.trim().toLowerCase() === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, ...result]);
    }

    setCommandHistory((prev) => [input, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setInput(commandHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : (commandHistory[next] ?? ''));
    }
  }

  return (
    <div
      data-testid="fake-terminal"
      className="overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] font-mono text-sm"
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 text-xs text-white/30">skills — bash</span>
      </div>

      {/* Output */}
      <div ref={outputRef} className="h-72 overflow-y-auto p-4">
        <TerminalOutput lines={history} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-white/10 px-4 py-3"
      >
        <span className="mr-2 text-[var(--color-terminal-green)]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[var(--color-foreground)] outline-none placeholder:text-white/20"
          placeholder="type a command..."
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
