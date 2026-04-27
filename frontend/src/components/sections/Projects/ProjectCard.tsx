import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform, motion, useReducedMotion } from 'framer-motion';
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rawRotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 24, restDelta: 0.001 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 24, restDelta: 0.001 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): void {
    if (prefersReduced) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    // Card-local coords for the glow — fixes misalignment caused by CSS transforms
    el.style.setProperty('--x', String(Math.round(relX)));
    el.style.setProperty('--y', String(Math.round(relY)));
    mouseX.set(relX / rect.width - 0.5);
    mouseY.set(relY / rect.height - 0.5);
  }

  function handleMouseLeave(): void {
    const el = cardRef.current;
    if (el) {
      // Remove so CSS falls back to [data-glow]'s --x: -9999 default
      el.style.removeProperty('--x');
      el.style.removeProperty('--y');
    }
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      data-testid="project-card"
      data-glow=""
      initial={prefersReduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReduced ? 0 : rotateX,
        rotateY: prefersReduced ? 0 : rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        padding: '28px',
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              borderColor: 'rgba(52,211,153,0.35)',
              backgroundColor: 'rgba(52,211,153,0.04)',
              boxShadow: '0 0 40px rgba(52,211,153,0.12), 0 8px 32px rgba(0,0,0,0.4)',
            }
      }
      transition={{
        opacity: { duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] },
        borderColor: { duration: 0.22, ease: 'easeOut' },
        backgroundColor: { duration: 0.22, ease: 'easeOut' },
        boxShadow: { duration: 0.25, ease: 'easeOut' },
      }}
    >
      {/* Header row */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <p
            style={{
              marginBottom: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#34d399',
            }}
          >
            {project.featured ? 'Featured project' : 'Project'}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px',
              fontWeight: 700,
              color: '#d1d5db',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '4px',
            flexShrink: 0,
          }}
        >
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ color: 'rgba(209,213,219,0.3)', textDecoration: 'none' }}
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
              style={{ color: 'rgba(209,213,219,0.3)', textDecoration: 'none' }}
              aria-label={`${project.title} live site`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      <p
        style={{
          marginBottom: '8px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(52,211,153,0.85)',
        }}
      >
        {project.tagline}
      </p>
      <p
        style={{
          marginBottom: '24px',
          fontSize: '14px',
          lineHeight: 1.7,
          color: 'rgba(209,213,219,0.65)',
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.tech.slice(0, 4).map((t) => (
          <TechBadge key={t} tech={t} />
        ))}
        {project.tech.length > 4 && <TechBadge tech={`+${project.tech.length - 4}`} />}
      </div>

      <button
        type="button"
        onClick={() => onExpand(project.id)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 500,
          color: 'rgba(52,211,153,0.65)',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          transition: 'color 0.2s ease',
          fontFamily: 'inherit',
        }}
        aria-label={`View ${project.title} case study`}
      >
        View case study →
      </button>
    </motion.div>
  );
}
