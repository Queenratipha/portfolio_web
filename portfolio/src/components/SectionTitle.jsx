import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * Reusable section heading with animated underline
 */
export default function SectionTitle({ subtitle, title, description, center = true }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-widest uppercase rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {/* Animated gradient underline */}
      <div className={`flex ${center ? 'justify-center' : ''} mb-4`}>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
        <div className="h-1 w-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 ml-1" />
      </div>
      {description && (
        <p className={`max-w-2xl text-base md:text-lg leading-relaxed ${center ? 'mx-auto' : ''} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
