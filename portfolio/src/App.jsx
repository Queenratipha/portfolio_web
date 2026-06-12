import { lazy, Suspense } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './sections/Hero';

// Lazy-loaded sections for code splitting
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Services = lazy(() => import('./sections/Services'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Contact = lazy(() => import('./sections/Contact'));

// Loading skeleton for lazy sections
function SectionLoader() {
  const { isDark } = useTheme();
  return (
    <div className={`section-padding flex items-center justify-center ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioContent() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <main>
        {/* Hero loads eagerly */}
        <Hero />

        {/* All other sections are lazy-loaded */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      {/* Floating WhatsApp button — visible on all pages */}
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
}
