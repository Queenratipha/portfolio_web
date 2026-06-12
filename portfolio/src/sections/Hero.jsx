import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';
import developerImage from '../assets/developer.png';

// Animated typing hook
function useTypingEffect(words, speed = 100, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
        if (charIndex === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      }, speed);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c - 1);
        if (charIndex === 0) {
          setDeleting(false);
          setWordIndex((w) => (w + 1) % words.length);
        }
      }, speed / 2);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
}

const socialLinks = [
  { icon: FiGithub, href: personalInfo.github, label: 'GitHub', color: 'hover:text-gray-300' },
  { icon: FiLinkedin, href: personalInfo.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: FiTwitter, href: personalInfo.twitter, label: 'Twitter', color: 'hover:text-sky-400' },
  { icon: FaWhatsapp, href: personalInfo.whatsapp, label: 'WhatsApp', color: 'hover:text-green-400' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Hero() {
  const { isDark } = useTheme();
  const typed = useTypingEffect(personalInfo.taglines);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${
        isDark ? 'bg-gray-950' : 'bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50'
      }`}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -60, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          className="absolute top-1/2 right-1/3 w-40 h-40 md:w-64 md:h-64 bg-pink-500/15 rounded-full blur-3xl"
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-green-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Available for work
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-lg mb-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              👋 Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              IRAKOZE{' '}
              <span className="text-gradient">Latifa</span>
            </motion.h1>

            {/* Typed tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 justify-center lg:justify-start mb-6 min-h-[2.5rem]"
            >
              <span className={`text-lg md:text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm a{' '}
              </span>
              <span className="text-xl md:text-2xl font-bold text-gradient">
                {typed}
                <span className="animate-pulse text-purple-400">|</span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-95 transition-opacity"
              >
                <FiMail size={18} />
                Get In Touch
              </motion.button>

              <motion.a
                href="/cv.html"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3.5 font-semibold rounded-xl border-2 border-purple-500/40 transition-all ${
                  isDark
                    ? 'text-white hover:bg-purple-500/10 hover:border-purple-500'
                    : 'text-gray-800 hover:bg-purple-50 hover:border-purple-500'
                }`}
              >
                <FiDownload size={18} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Follow me:</span>
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className={`p-2 rounded-lg transition-all ${isDark ? 'text-gray-400' : 'text-gray-500'} ${color}`}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Profile Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            className="flex-shrink-0 relative"
          >
            {/* Outer glow ring */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Spinning gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #7c3aed, #06b6d4, #f59e0b, #7c3aed)',
                  padding: '3px',
                  borderRadius: '50%',
                }}
              >
                <div className={`w-full h-full rounded-full ${isDark ? 'bg-gray-950' : 'bg-slate-50'}`} />
              </motion.div>

              {/* Profile picture */}
              <div className="absolute inset-3 rounded-full overflow-hidden shadow-2xl">
                <img
                  src={developerImage}
                  alt="Developer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute -top-4 -right-4 px-3 py-2 rounded-2xl text-xs font-bold shadow-lg ${
                  isDark ? 'bg-gray-800 text-white border border-white/10' : 'bg-white text-gray-800 shadow-xl'
                }`}
              >
                ✨ {personalInfo.yearsExperience}+ Years Exp
              </motion.div>

              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className={`absolute -bottom-4 -left-4 px-3 py-2 rounded-2xl text-xs font-bold shadow-lg ${
                  isDark ? 'bg-gray-800 text-white border border-white/10' : 'bg-white text-gray-800 shadow-xl'
                }`}
              >
                🚀 {personalInfo.projectsCompleted}+ Projects
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { value: `${personalInfo.yearsExperience}+`, label: 'Years Experience', icon: '📅' },
            { value: `${personalInfo.projectsCompleted}+`, label: 'Projects Completed', icon: '🚀' },
            { value: `${personalInfo.happyClients}+`, label: 'Happy Clients', icon: '😊' },
            { value: `${personalInfo.coffeeConsumed}+`, label: 'Cups of Coffee', icon: '☕' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className={`relative p-5 rounded-2xl text-center glass border transition-all ${
                isDark
                  ? 'border-white/5 hover:border-purple-500/30'
                  : 'border-gray-200 hover:border-purple-300 bg-white/60'
              }`}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-gradient">{stat.value}</div>
              <div className={`text-xs md:text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center mt-12 gap-2"
        >
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-purple-500/40 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
