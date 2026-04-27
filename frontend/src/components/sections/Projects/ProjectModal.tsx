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
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(4px)',
            }}
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
            style={{
              position: 'fixed',
              inset: '16px',
              zIndex: 201,
              overflowY: 'auto',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: '#1e293b',
            }}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
          >
            <div style={{ padding: '32px' }}>
              {/* Header */}
              <div
                style={{
                  marginBottom: '32px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h2
                    id="modal-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '32px',
                      fontWeight: 700,
                      color: '#d1d5db',
                      marginBottom: '8px',
                    }}
                  >
                    {project.title}
                  </h2>
                  <p style={{ fontSize: '15px', color: '#34d399' }}>{project.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    marginLeft: '16px',
                    padding: '11px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'rgba(209,213,219,0.4)',
                    transition: 'color 0.2s ease, background-color 0.2s ease',
                    flexShrink: 0,
                    fontFamily: 'inherit',
                    cursor: 'pointer',
                  }}
                  aria-label="Close project modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '14px',
                      color: 'rgba(209,213,219,0.65)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
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
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#34d399',
                      fontSize: '14px',
                      color: '#0f172a',
                      textDecoration: 'none',
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <ExternalLink size={16} />
                    Live Site
                  </a>
                )}
              </div>

              {/* Case study */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '32px',
                  marginBottom: '32px',
                }}
              >
                {[
                  { label: 'Problem', text: project.problem },
                  { label: 'Solution', text: project.solution },
                  { label: 'Impact', text: project.impact },
                ].map(({ label, text }) => (
                  <div key={label}>
                    <h3
                      style={{
                        marginBottom: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 500,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#34d399',
                      }}
                    >
                      {label}
                    </h3>
                    <p
                      style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(209,213,219,0.65)' }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div>
                <h3
                  style={{
                    marginBottom: '16px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(209,213,219,0.3)',
                  }}
                >
                  Tech Stack
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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
