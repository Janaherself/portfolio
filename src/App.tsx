import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { About } from './components/sections/About';
import { CompletionModal } from './components/curiosity/CompletionModal';
import { ThemeProvider } from './hooks/useTheme';
import { CuriosityGameProvider } from './hooks/useCuriosityGame';

function App() {
  return (
    <ThemeProvider>
      <CuriosityGameProvider>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <About />
        </main>
        <Footer />
        <CompletionModal />
      </CuriosityGameProvider>
    </ThemeProvider>
  );
}

export default App;
