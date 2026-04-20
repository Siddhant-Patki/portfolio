import { motion, useReducedMotion } from 'framer-motion';
import { FakeTerminal } from './FakeTerminal';
import { SKILLS } from '@constants/skills';

export function Skills(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="skills-heading"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 font-mono text-sm text-[var(--color-terminal-green)]">04. skills</p>
        <h2
          id="skills-heading"
          className="font-display mb-12 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl"
        >
          What I work with
        </h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Skill badges */}
          <div className="space-y-8">
            {SKILLS.map((category) => (
              <div key={category.category}>
                <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-foreground)]/40">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="rounded-full border border-white/10 px-3 py-1 text-sm text-[var(--color-foreground)]/70 transition-colors hover:border-[var(--color-primary)]/40 hover:text-[var(--color-foreground)]"
                      whileHover={prefersReduced ? {} : { scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive terminal */}
          <div>
            <p className="mb-3 text-sm text-[var(--color-foreground)]/40">
              Try it — type{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[var(--color-terminal-green)]">
                skills
              </code>{' '}
              or{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-[var(--color-terminal-green)]">
                help
              </code>
            </p>
            <FakeTerminal />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
