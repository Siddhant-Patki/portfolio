import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { useProjects } from '@hooks/useProjects';

export function Projects(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const { projects } = useProjects();
  const activeProject = projects.find((p) => p.id === activeId) ?? null;

  return (
    <section
      id="projects"
      data-testid="projects-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '96px 24px' }}
      aria-labelledby="projects-heading"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#34d399',
              marginBottom: '16px',
            }}
          >
            03 · Projects
          </p>
          <h2
            id="projects-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#d1d5db',
              marginBottom: '56px',
            }}
          >
            Things I&apos;ve built
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '20px',
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} onExpand={setActiveId} />
            ))}
          </div>
        </motion.div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveId(null)} />
    </section>
  );
}
