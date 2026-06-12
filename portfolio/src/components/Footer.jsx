import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, navLinks } from '../data/portfolioData';

const socials = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: personalInfo.twitter, label: 'Twitter' },
  { icon: FaWhatsapp, href: personalInfo.whatsapp, label: 'WhatsApp' },
  { icon: FiMail, href: `mailto:${personalInfo.email}`, label: 'Email' },
];

export default function Footer() {
  const { isDark } = useTheme();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={`relative pt-12 pb-6 ${isDark ? 'bg-gray-950 border-t border-white/5' : 'bg-gray-50 border-t border-gray-200'}`}>
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="text-2xl font-black text-gradient mb-3 inline-block">
              Latifa<span className={isDark ? 'text-white' : 'text-gray-900'}>.</span>
            </a>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Creative UI/UX Designer & Full-Stack Developer based in Kigali, Rwanda. Building beautiful digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-sm transition-colors hover:text-purple-400 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`text-sm font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Get In Touch</h4>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${personalInfo.email}`} className={`text-sm hover:text-purple-400 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.phone}`} className={`text-sm hover:text-purple-400 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  {personalInfo.phone}
                </a>
              </li>
              <li className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                📍 {personalInfo.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px mb-6 ${isDark ? 'bg-white/5' : 'bg-gray-200'}`} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className={`text-xs text-center sm:text-left ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} IRAKOZE Latifa. Made with{' '}
            <FiHeart className="inline text-red-500" size={12} />{' '}
            in Kigali, Rwanda.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.2 }}
                aria-label={label}
                className={`p-2 rounded-lg transition-all ${
                  isDark ? 'text-gray-600 hover:text-purple-400' : 'text-gray-400 hover:text-purple-600'
                }`}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center z-40"
        aria-label="Back to top"
      >
        <FiArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
