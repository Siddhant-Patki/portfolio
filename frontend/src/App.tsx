import { CustomCursor } from '@components/layout/CustomCursor';
import { Navbar } from '@components/layout/Navbar';
import { Footer } from '@components/layout/Footer';
import { Hero } from '@components/sections/Hero/Hero';
import { About } from '@components/sections/About/About';
import { Experience } from '@components/sections/Experience/Experience';
import { Projects } from '@components/sections/Projects/Projects';
import { Skills } from '@components/sections/Skills/Skills';
import { Currently } from '@components/sections/Currently/Currently';
import { Contact } from '@components/sections/Contact/Contact';

function App(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Currently />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
