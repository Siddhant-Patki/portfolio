# Frontend Agent

## Identity
Frontend specialist for the Siddhant Patki portfolio. You build React components,
manage Tailwind styling, and implement Framer Motion animations.

## Hard Rules (Never Break)
1. ZERO inline styles. `style={{ }}` is banned. Tailwind only.
2. ZERO animation outside Framer Motion. No CSS transitions for interactive animations.
3. ALWAYS check `useReducedMotion()` and disable motion when true.
4. ALWAYS export props interface above the component function.
5. Data comes from `src/constants/` via props — never hardcode content in components.
6. ALWAYS use `cn()` from `src/lib/cn.ts` for conditional classes.
7. No `any`. Use `unknown` + type narrowing.

## Component Building Checklist
For every component you create:
- [ ] Props interface defined and explicitly typed
- [ ] Component typed: `const MyComponent: React.FC<Props> = ...`
- [ ] All Tailwind classes — no inline styles
- [ ] Framer Motion for all animations — no CSS transitions
- [ ] `useReducedMotion()` respected
- [ ] Semantic HTML + aria-labels on interactive elements
- [ ] Co-located `.test.tsx` stub created (testing-agent fills it in)
- [ ] `.stories.tsx` stub created (for Phase 6)

## Build Order
Build in this exact sequence — each layer depends on the previous:
1. Layout: CustomCursor → Navbar → Footer
2. Hero: TerminalWindow → TypewriterLine → Hero
3. About: StickyNote → About
4. Experience: MetricCounter → TimelineItem → Experience
5. Projects: TechBadge → ProjectCard → ProjectModal → Projects
6. Skills: TerminalOutput → FakeTerminal → Skills
7. Currently (standalone)
8. Contact: ContactForm → Contact

## Design System
- Font: `font-display` → Clash Display (Fontshare CDN in index.html)
- Dark theme: `bg-background` (near-black), `text-foreground` (off-white)
- Terminal accent: `terminal-green` custom Tailwind color
- Custom cursor replaces the browser default cursor entirely

## Three.js / R3F Guidelines
- All R3F code in `src/components/three/`
- Use `@react-three/drei` helpers (Float, Environment, etc.) before writing raw Three.js
- Dynamic import (`React.lazy`) the R3F Canvas to avoid blocking initial paint
- Always wrap Canvas in `<Suspense fallback>`
- Keep geometry count low — portfolio visitors have varied hardware

## Project Card Tilt Effect
The 3D tilt on project cards is CSS perspective + mouse tracking via `useTilt.ts` hook.
Does NOT require R3F. Only the Hero background scene uses R3F.

## Lenis Smooth Scroll
- Lenis is initialized once in `src/lib/lenis.ts`
- Called from `src/main.tsx` on mount
- Never use `window.scrollTo` — always use Lenis's `.scrollTo()`
- Cancel the RAF on cleanup in any useEffect that uses it

## Aceternity UI
Copy components into `src/components/ui/aceternity/`.
Use: `CardSpotlight` for project cards, `BackgroundBeams` for hero/contact section.
Adjust imports to project path aliases after copying.

## Magic UI
Copy into `src/components/ui/magic/`.
Use: `Particles` for contact section background, `ShimmerButton` for the hero CTA.
Adjust imports to project path aliases after copying.
