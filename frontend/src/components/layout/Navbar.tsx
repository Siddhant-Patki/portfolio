import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { NAV_LINKS, SOCIAL_LINKS } from '@constants/nav';

export function Navbar(): React.JSX.Element {
  const prefersReduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navListRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const underlineRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

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

  // Staggered entrance — links cascade down from top
  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-nav-link',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.15 }
      );
    });
    return () => ctx.revert();
  }, [prefersReduced]);

  // Sliding glowing indicator — follows active section
  useEffect(() => {
    const linkEl = activeSection ? linkRefs.current.get(activeSection) : null;
    const indicator = indicatorRef.current;
    const list = navListRef.current;
    if (!indicator || !list) return;

    if (!linkEl || prefersReduced) {
      gsap.to(indicator, { opacity: 0, duration: 0.2 });
      return;
    }

    const listRect = list.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    gsap.to(indicator, {
      x: linkRect.left - listRect.left,
      width: linkRect.width,
      opacity: 1,
      duration: 0.38,
      ease: 'power2.out',
    });
  }, [activeSection, prefersReduced]);

  function handleNavClick(href: string): void {
    setMenuOpen(false);
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  // Hover in: text → emerald, underline expands from center
  function onLinkEnter(id: string): void {
    if (prefersReduced) return;
    const el = linkRefs.current.get(id);
    const ul = underlineRefs.current.get(id);
    if (el) gsap.to(el, { color: '#34d399', scale: 1.05, duration: 0.22, ease: 'power2.out' });
    if (ul) gsap.to(ul, { scaleX: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
  }

  // Magnetic drift while cursor moves over link
  function onLinkMove(id: string, e: React.MouseEvent): void {
    if (prefersReduced) return;
    const el = linkRefs.current.get(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
    gsap.to(el, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
  }

  // Hover out: elastic snap-back, underline collapses
  function onLinkLeave(id: string): void {
    if (prefersReduced) return;
    const el = linkRefs.current.get(id);
    const ul = underlineRefs.current.get(id);
    const isActive = activeSection === id;
    if (el)
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        color: isActive ? '#34d399' : 'rgba(209,213,219,0.65)',
        duration: 0.55,
        ease: 'elastic.out(1, 0.6)',
      });
    if (ul) gsap.to(ul, { scaleX: 0, opacity: 0, duration: 0.18, ease: 'power2.in' });
  }

  return (
    <motion.header
      data-testid="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        backgroundColor: scrolled ? 'rgba(15,23,42,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
      initial={prefersReduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 32px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left spacer — keeps nav centered */}
        <div style={{ flex: 1 }} />

        {/* Desktop nav — centered */}
        <nav aria-label="Main navigation" style={{ position: 'relative' }}>
          {/* Sliding glowing indicator */}
          <div
            ref={indicatorRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-28px',
              left: 0,
              height: '2px',
              width: 0,
              opacity: 0,
              backgroundColor: '#34d399',
              borderRadius: '2px',
              pointerEvents: 'none',
              boxShadow: '0 0 10px rgba(52,211,153,0.7), 0 0 24px rgba(52,211,153,0.35)',
            }}
          />

          <ul
            ref={navListRef}
            className="hidden md:flex"
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '44px',
              alignItems: 'center',
              padding: 0,
              margin: 0,
            }}
          >
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <li key={link.href} className="gsap-nav-link">
                  <a
                    ref={(el) => {
                      if (el) linkRefs.current.set(id, el);
                    }}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    onMouseEnter={() => onLinkEnter(id)}
                    onMouseMove={(e) => onLinkMove(id, e)}
                    onMouseLeave={() => onLinkLeave(id)}
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: isActive ? '#34d399' : 'rgba(209,213,219,0.65)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      gap: '3px',
                    }}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {link.label}
                    {/* Hover underline — expands from center */}
                    <span
                      ref={(el) => {
                        if (el) underlineRefs.current.set(id, el);
                      }}
                      aria-hidden="true"
                      style={{
                        display: 'block',
                        height: '1.5px',
                        width: '100%',
                        backgroundColor: '#34d399',
                        borderRadius: '1px',
                        transform: 'scaleX(0)',
                        transformOrigin: 'center',
                        opacity: 0,
                        boxShadow: '0 0 6px rgba(52,211,153,0.5)',
                      }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right side — GitHub + hamburger */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block gsap-nav-link"
            onMouseEnter={(e) => {
              if (prefersReduced) return;
              gsap.to(e.currentTarget, { scale: 1.07, duration: 0.2, ease: 'power2.out' });
            }}
            onMouseLeave={(e) => {
              if (prefersReduced) return;
              gsap.to(e.currentTarget, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.7)' });
            }}
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#0f172a',
              textDecoration: 'none',
              padding: '9px 20px',
              backgroundColor: '#34d399',
              borderRadius: '8px',
              display: 'inline-block',
            }}
            aria-label="GitHub profile"
          >
            GitHub
          </a>

          <button
            type="button"
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(209,213,219,0.7)',
              padding: '4px',
              cursor: 'pointer',
            }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              backgroundColor: 'rgba(15,23,42,0.97)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                padding: '24px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
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
                      style={{
                        fontSize: '16px',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#34d399' : 'rgba(209,213,219,0.65)',
                        textDecoration: 'none',
                        borderLeft: isActive ? '2px solid #34d399' : '2px solid transparent',
                        paddingLeft: '12px',
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                        display: 'block',
                      }}
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
