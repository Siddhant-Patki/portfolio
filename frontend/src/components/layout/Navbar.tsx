import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '@constants/nav';
import { cn } from '@lib/cn';

export function Navbar(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll(): void {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  function handleNavClick(href: string): void {
    setMenuOpen(false);
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  return (
    <motion.header
      data-testid="navbar"
      className={cn(
        'pointer-events-auto fixed left-0 right-0 top-0 z-[100] transition-colors duration-300',
        scrolled
          ? 'border-b border-white/5 bg-[var(--color-background)]/90 backdrop-blur-md'
          : 'bg-transparent'
      )}
      initial={prefersReduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Logo — scroll-to-top action, uses button semantics */}
        <button
          type="button"
          className="font-display text-lg font-semibold text-[var(--color-foreground)] transition-colors hover:text-[var(--color-primary)]"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })}
          aria-label="Siddhant Patki — back to top"
        >
          SP
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    'relative text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-foreground)]/60 hover:text-[var(--color-foreground)]'
                  )}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--color-primary)]"
                      transition={{ duration: prefersReduced ? 0 : 0.2 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* GitHub link (desktop) */}
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-sm font-medium text-[var(--color-foreground)]/60 transition-colors hover:text-[var(--color-foreground)] md:block"
          aria-label="GitHub profile (opens in new tab)"
        >
          GitHub
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center justify-center rounded p-1 text-[var(--color-foreground)]/60 hover:text-[var(--color-foreground)] md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            className="border-t border-white/5 bg-[var(--color-background)]/95 px-6 py-4 backdrop-blur-md md:hidden"
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const id = link.href.slice(1);
                const isActive = activeSection === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={cn(
                        'block text-base font-medium transition-colors',
                        isActive
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--color-foreground)]/60'
                      )}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
