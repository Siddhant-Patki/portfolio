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
      style={{
        overflow: 'hidden',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: '#1a2540',
        fontFamily: 'var(--font-mono)',
        fontSize: '13px',
      }}
    >
      {/* Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 16px',
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
          skills — bash
        </span>
      </div>

      {/* Output */}
      <div ref={outputRef} style={{ height: '288px', overflowY: 'auto', padding: '16px' }}>
        <TerminalOutput lines={history} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 16px',
        }}
      >
        <span style={{ marginRight: '8px', color: '#34d399', userSelect: 'none' }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#d1d5db',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
          }}
          placeholder="type a command..."
          aria-label="Terminal input"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
