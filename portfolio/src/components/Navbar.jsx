import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { navLinks } from '../data/portfolioData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-gray-950/90 backdrop-blur-xl shadow-lg shadow-purple-500/10 border-b border-white/5'
            : 'bg-white/90 backdrop-blur-xl shadow-lg shadow-purple-500/10 border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-black text-gradient">
              L<span className={isDark ? 'text-white' : 'text-gray-900'}>atifa</span>
            </span>
            <span className="text-xl md:text-2xl font-black text-gradient">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                whileHover={{ y: -2 }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-purple-400'
                    : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-purple-500/10 rounded-lg border border-purple-500/20"
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            {/* Hire Me CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Hire Me
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2.5 rounded-xl ${
                isDark ? 'bg-white/5 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${
              isDark ? 'bg-gray-950/95 backdrop-blur-xl border-t border-white/5' : 'bg-white/95 backdrop-blur-xl border-t border-gray-200'
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : isDark
                      ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                className="flex items-center justify-center mt-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold rounded-xl"
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
