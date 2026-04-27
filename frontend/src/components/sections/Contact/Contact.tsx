import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { GithubIcon, LinkedinIcon } from '@components/ui/SocialIcons';
import { SOCIAL_LINKS } from '@constants/nav';

export function Contact(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="contact"
      data-testid="contact-section"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '96px 24px' }}
      aria-labelledby="contact-heading"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'start',
          }}
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Left */}
          <div>
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
              06 · Contact
            </p>
            <h2
              id="contact-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#d1d5db',
                marginBottom: '20px',
              }}
            >
              Get in touch
            </h2>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.75,
                color: 'rgba(209,213,219,0.65)',
                marginBottom: '40px',
                maxWidth: '380px',
              }}
            >
              Currently open to internship and working student opportunities. Have a project in
              mind, or just want to connect? My inbox is open.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  icon: <Mail size={15} />,
                  href: `mailto:${SOCIAL_LINKS.email}`,
                  label: SOCIAL_LINKS.email,
                },
                {
                  icon: <GithubIcon size={15} />,
                  href: SOCIAL_LINKS.github,
                  label: 'github.com/Siddhant-Patki',
                  external: true,
                  ariaLabel: 'GitHub profile',
                },
                {
                  icon: <LinkedinIcon size={15} />,
                  href: SOCIAL_LINKS.linkedin,
                  label: 'linkedin.com/in/siddhant-patki',
                  external: true,
                  ariaLabel: 'LinkedIn profile',
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.ariaLabel}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '14px',
                    color: 'rgba(209,213,219,0.55)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      color: '#34d399',
                      flexShrink: 0,
                    }}
                  >
                    {link.icon}
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
