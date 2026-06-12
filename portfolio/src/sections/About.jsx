import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGlobe, FiDownload } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';
import { personalInfo, education, languages, interests } from '../data/portfolioData';

const infoItems = [
  { icon: FiMail, label: 'Email', value: personalInfo.email },
  { icon: FiPhone, label: 'Phone', value: personalInfo.phone },
  { icon: FiMapPin, label: 'Location', value: personalInfo.location },
  { icon: FiGlobe, label: 'Website', value: personalInfo.website },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function About() {
  const { isDark } = useTheme();
  const cardBg = isDark ? 'bg-gray-900/60 border-white/5' : 'bg-white border-gray-200';
  const textSub = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMain = isDark ? 'text-white' : 'text-gray-900';

  return (
    <section id="about" className={`section-padding ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Who I Am"
          title="About Me"
          description="Get to know the person behind the code and design."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Bio + Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Avatar card */}
              <div className={`relative p-6 rounded-3xl border mb-8 overflow-hidden ${cardBg}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 pointer-events-none" />
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-4xl flex-shrink-0 shadow-lg">
                    👩‍💻
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${textMain}`}>{personalInfo.name}</h3>
                    <p className="text-purple-400 font-medium text-sm">{personalInfo.title}</p>
                    <span className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Available for freelance
                    </span>
                  </div>
                </div>
                <p className={`mt-5 text-sm leading-relaxed ${textSub}`}>{personalInfo.bio}</p>
              </div>

              {/* Personal Info Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {infoItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${cardBg}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                      <item.icon size={16} className="text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <p className={`text-xs ${textSub}`}>{item.label}</p>
                      <p className={`text-sm font-semibold truncate ${textMain}`}>{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Download CV */}
              <motion.a
                href="/cv.html"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
              >
                <FiDownload size={18} />
                Download Full CV
              </motion.a>
            </motion.div>
          </div>

          {/* Right — Education + Languages + Interests */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Education Timeline */}
            <div className={`p-6 rounded-3xl border ${cardBg}`}>
              <h3 className={`text-lg font-bold mb-5 ${textMain}`}>🎓 Education</h3>
              <div className="relative space-y-6 pl-6">
                {/* Timeline line */}
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500" />

                {education.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[1.625rem] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 border-2 border-gray-950 shadow" />

                    <div className={`p-4 rounded-2xl border transition-all hover:-translate-y-1 ${
                      isDark ? 'bg-gray-800/50 border-white/5 hover:border-purple-500/30' : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                    }`}>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 mb-2">
                        {edu.year}
                      </span>
                      <h4 className={`font-semibold text-sm ${textMain}`}>{edu.degree}</h4>
                      <p className="text-cyan-400 text-xs mt-0.5">{edu.institution} • {edu.location}</p>
                      <p className={`text-xs mt-1.5 leading-relaxed ${textSub}`}>{edu.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className={`p-6 rounded-3xl border ${cardBg}`}>
              <h3 className={`text-lg font-bold mb-4 ${textMain}`}>🌍 Languages</h3>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang) => (
                  <motion.div
                    key={lang.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      isDark
                        ? 'bg-gray-800/60 border-white/5 hover:border-purple-500/30 text-gray-300'
                        : 'bg-gray-100 border-gray-200 hover:border-purple-300 text-gray-700'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                    <span className="text-purple-400 text-xs">({lang.level})</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className={`p-6 rounded-3xl border ${cardBg}`}>
              <h3 className={`text-lg font-bold mb-4 ${textMain}`}>✨ Interests</h3>
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-default ${
                      isDark
                        ? 'bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/20 text-gray-300 hover:border-purple-400/40'
                        : 'bg-gradient-to-r from-purple-50 to-cyan-50 border-purple-200 text-gray-700 hover:border-purple-400'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
