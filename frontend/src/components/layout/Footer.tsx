import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@components/ui/SocialIcons';
import { SOCIAL_LINKS } from '@constants/nav';

export function Footer(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      data-testid="footer"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '32px 24px',
        backgroundColor: 'rgba(15,23,42,0.6)',
      }}
      initial={prefersReduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <p style={{ fontSize: '13px', color: 'rgba(209,213,219,0.25)' }}>
          © {year} Siddhant Patki · Built with React &amp; TypeScript
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {[
            { href: SOCIAL_LINKS.github, icon: <GithubIcon size={17} />, label: 'GitHub profile' },
            {
              href: SOCIAL_LINKS.linkedin,
              icon: <LinkedinIcon size={17} />,
              label: 'LinkedIn profile',
            },
            { href: `mailto:${SOCIAL_LINKS.email}`, icon: <Mail size={17} />, label: 'Send email' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={link.label}
              style={{
                color: 'rgba(209,213,219,0.25)',
                transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
