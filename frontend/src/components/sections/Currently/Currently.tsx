import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, GraduationCap, Code, BookOpen, Briefcase } from 'lucide-react';
import { CURRENTLY } from '@constants/currently';

export function Currently(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="currently"
      data-testid="currently-section"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="currently-heading"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 font-mono text-sm text-[var(--color-terminal-green)]">05. currently</p>
        <h2
          id="currently-heading"
          className="font-display mb-12 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl"
        >
          Right now
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CurrentlyCard
            icon={<MapPin size={18} />}
            label="Location"
            value={`${CURRENTLY.city}, ${CURRENTLY.country}`}
          />
          <CurrentlyCard
            icon={<GraduationCap size={18} />}
            label="Studying"
            value={CURRENTLY.semester}
            sub={CURRENTLY.university}
          />
          <CurrentlyCard
            icon={<Code size={18} />}
            label="Building"
            value={CURRENTLY.currentProject}
          />
          <CurrentlyCard
            icon={<BookOpen size={18} />}
            label="Learning"
            value={CURRENTLY.learning.join(' · ')}
          />
          <CurrentlyCard
            icon={<Briefcase size={18} />}
            label="Open to"
            value={CURRENTLY.availableFor}
          />
        </div>
      </motion.div>
    </section>
  );
}

interface CurrentlyCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

function CurrentlyCard({ icon, label, value, sub }: CurrentlyCardProps): React.JSX.Element {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-3 flex items-center gap-2 text-[var(--color-primary)]">
        {icon}
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-foreground)]/40">
          {label}
        </span>
      </div>
      <p className="text-sm font-medium text-[var(--color-foreground)]">{value}</p>
      {sub && <p className="mt-1 text-xs text-[var(--color-foreground)]/40">{sub}</p>}
    </div>
  );
}
