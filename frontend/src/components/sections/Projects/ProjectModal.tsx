import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@components/ui/SocialIcons';
import { TechBadge } from './TechBadge';
import type { Project } from '@constants/projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            data-testid="project-modal"
            className="fixed inset-4 z-[201] overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d0d] md:inset-8 lg:inset-16"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h2
                    id="modal-title"
                    className="font-display mb-2 text-3xl font-bold text-[var(--color-foreground)]"
                  >
                    {project.title}
                  </h2>
                  <p className="text-[var(--color-primary)]">{project.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 rounded-lg p-2 text-[var(--color-foreground)]/40 transition-colors hover:bg-white/5 hover:text-[var(--color-foreground)]"
                  aria-label="Close project modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <div className="mb-8 flex gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-[var(--color-foreground)]/70 transition-colors hover:border-white/20 hover:text-[var(--color-foreground)]"
                  >
                    <GithubIcon size={16} />
                    View on GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm text-white transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={16} />
                    Live Site
                  </a>
                )}
              </div>

              {/* Case study */}
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-terminal-green)]">
                    Problem
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-foreground)]/70">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-terminal-green)]">
                    Solution
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-foreground)]/70">
                    {project.solution}
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-terminal-green)]">
                    Impact
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-foreground)]/70">
                    {project.impact}
                  </p>
                </div>
              </div>

              {/* Tech stack */}
              <div className="mt-8">
                <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-[var(--color-foreground)]/40">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechBadge key={t} tech={t} size="md" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
