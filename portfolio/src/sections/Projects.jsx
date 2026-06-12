import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiX, FiZoomIn } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';
import { projects } from '../data/portfolioData';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

// Project Card
function ProjectCard({ project, onOpen }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative rounded-3xl overflow-hidden border transition-all cursor-pointer ${
        isDark
          ? 'bg-gray-900/60 border-white/5 hover:border-purple-500/40 shadow-lg hover:shadow-purple-500/10'
          : 'bg-white border-gray-200 hover:border-purple-300 shadow-md hover:shadow-purple-100'
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onOpen(project)}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-purple-600/50 transition-colors"
            aria-label="View details"
          >
            <FiZoomIn size={20} />
          </motion.button>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-cyan-600/50 transition-colors"
            aria-label="Live demo"
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink size={20} />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-gray-600/50 transition-colors"
            aria-label="GitHub repo"
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub size={20} />
          </motion.a>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-purple-600/80 text-white backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                isDark
                  ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                  : 'bg-purple-50 text-purple-600 border border-purple-200'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <FiExternalLink size={14} />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all ${
              isDark
                ? 'border-white/10 text-gray-300 hover:border-purple-500/40 hover:text-white'
                : 'border-gray-200 text-gray-600 hover:border-purple-300 hover:text-gray-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <FiGithub size={14} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// Project Detail Modal
function ProjectModal({ project, onClose }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
          isDark ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-xl transition-all ${
            isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Close modal"
        >
          <FiX size={18} />
        </button>

        <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-t-3xl" />

        <div className="p-6 md:p-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
            {project.category}
          </span>
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {project.title}
          </h3>
          <p className={`text-base leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.description}
          </p>

          <div className="mb-6">
            <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    isDark ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20' : 'bg-purple-50 text-purple-600 border border-purple-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              <FiExternalLink size={16} />
              View Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl border transition-all ${
                isDark ? 'border-white/10 text-gray-300 hover:border-purple-500/40' : 'border-gray-200 text-gray-600 hover:border-purple-300'
              }`}
            >
              <FiGithub size={16} />
              Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className={`section-padding ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="My Work"
          title="Featured Projects"
          description="A selection of projects I've built with passion and attention to detail."
        />

        {/* Filter Buttons */}
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
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 shadow-sm'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href={projects[0]?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-xl border-2 border-purple-500/40 transition-all hover:border-purple-500 ${
              isDark ? 'text-white hover:bg-purple-500/10' : 'text-gray-800 hover:bg-purple-50'
            }`}
          >
            <FiGithub size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
