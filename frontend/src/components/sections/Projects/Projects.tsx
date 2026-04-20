import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { PROJECTS } from '@constants/projects';

export function Projects(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = PROJECTS.find((p) => p.id === activeId) ?? null;

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="projects-heading"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-3 font-mono text-sm text-[var(--color-terminal-green)]">03. projects</p>
        <h2
          id="projects-heading"
          className="font-display mb-12 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl"
        >
          Things I&apos;ve built
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onExpand={setActiveId} />
          ))}
        </div>
      </motion.div>

      <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
    </section>
  );
}
