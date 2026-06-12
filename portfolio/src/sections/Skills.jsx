import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';
import { skills } from '../data/portfolioData';

const categories = ['All', ...new Set(skills.map((s) => s.category))];

function SkillBar({ skill, inView }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`p-5 rounded-2xl border transition-all ${
        isDark
          ? 'bg-gray-900/60 border-white/5 hover:border-purple-500/30'
          : 'bg-white border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shadow"
            style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}60` }}
          />
          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {skill.name}
          </span>
        </div>
        <span className="text-sm font-bold text-purple-400">{skill.level}%</span>
      </div>

      {/* Progress track */}
      <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)` }}
        >
          {/* shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="What I Know"
          title="My Skills"
          description="A comprehensive overview of my technical skills and expertise levels across different domains."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                  : isDark
                  ? 'bg-gray-800 text-gray-300 border border-white/5 hover:border-purple-500/30'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:border-purple-300'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((skill) => (
            <SkillBar key={skill.name} skill={skill} inView={inView} />
          ))}
        </motion.div>

        {/* Skill tags cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className={`text-sm mb-5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Also familiar with:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Git & GitHub', 'REST APIs', 'GraphQL', 'Docker Basics', 'AWS S3', 'Vercel', 'Netlify', 'MySQL', 'TypeScript', 'Redux', 'Jest', 'Webpack'].map(
              (tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-default ${
                    isDark
                      ? 'bg-gray-800 border-white/5 text-gray-400 hover:border-purple-500/40 hover:text-purple-300'
                      : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
