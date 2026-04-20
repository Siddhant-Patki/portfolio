import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@components/ui/SocialIcons';
import { TechBadge } from './TechBadge';
import type { Project } from '@constants/projects';

interface ProjectCardProps {
  project: Project;
  onExpand: (id: string) => void;
  index: number;
}

export function ProjectCard({ project, onExpand, index }: ProjectCardProps): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleMouseLeave(): void {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }

  return (
    <motion.div
      data-testid="project-card"
      ref={cardRef}
      initial={prefersReduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20"
    >
      {/* Spotlight */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent" />
      </div>

      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-display text-xl font-semibold text-[var(--color-foreground)]">
          {project.title}
        </h3>
        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--color-foreground)]/40 transition-colors hover:text-[var(--color-foreground)]"
              aria-label={`${project.title} GitHub repository`}
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[var(--color-foreground)]/40 transition-colors hover:text-[var(--color-foreground)]"
              aria-label={`${project.title} live site`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">{project.tagline}</p>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--color-foreground)]/60">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((t) => (
          <TechBadge key={t} tech={t} />
        ))}
        {project.tech.length > 4 && <TechBadge tech={`+${project.tech.length - 4}`} />}
      </div>

      <button
        type="button"
        onClick={() => onExpand(project.id)}
        className="mt-auto self-start text-xs font-medium text-[var(--color-primary)] transition-opacity hover:opacity-70"
        aria-label={`View ${project.title} case study`}
      >
        View case study →
      </button>
    </motion.div>
  );
}
