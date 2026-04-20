import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@components/ui/SocialIcons';
import { ContactForm } from './ContactForm';
import { SOCIAL_LINKS } from '@constants/nav';

export function Contact(): React.JSX.Element {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="contact-heading"
    >
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="grid gap-16 lg:grid-cols-2 lg:items-start"
      >
        {/* Left column */}
        <div>
          <p className="mb-3 font-mono text-sm text-[var(--color-terminal-green)]">06. contact</p>
          <h2
            id="contact-heading"
            className="font-display mb-6 text-4xl font-bold text-[var(--color-foreground)] md:text-5xl"
          >
            Get in touch
          </h2>
          <p className="mb-8 leading-relaxed text-[var(--color-foreground)]/60">
            I&apos;m currently open to internship and working student opportunities. Whether you
            have a project in mind, a role to fill, or just want to connect — my inbox is open.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="flex items-center gap-3 text-sm text-[var(--color-foreground)]/60 transition-colors hover:text-[var(--color-foreground)]"
            >
              <Mail size={16} />
              {SOCIAL_LINKS.email}
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[var(--color-foreground)]/60 transition-colors hover:text-[var(--color-foreground)]"
              aria-label="GitHub profile (opens in new tab)"
            >
              <GithubIcon size={16} />
              github.com/Siddhant-Patki
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[var(--color-foreground)]/60 transition-colors hover:text-[var(--color-foreground)]"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <LinkedinIcon size={16} />
              linkedin.com/in/siddhant-patki
            </a>
          </div>
        </div>

        {/* Form column */}
        <ContactForm />
      </motion.div>
    </section>
  );
}
