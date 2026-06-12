import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';
import { services } from '../data/portfolioData';

function ServiceCard({ service, index }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative p-6 rounded-3xl border overflow-hidden transition-all cursor-default ${
        isDark
          ? 'bg-gray-900/60 border-white/5 hover:border-purple-500/40 shadow-lg hover:shadow-purple-500/10'
          : 'bg-white border-gray-200 hover:border-purple-300 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Gradient background glow on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      />

      {/* Top gradient line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-5 shadow-lg`}
      >
        {service.icon}
      </div>

      {/* Content */}
      <h3 className={`text-lg font-bold mb-3 group-hover:text-purple-400 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {service.title}
      </h3>
      <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {service.description}
      </p>

      {/* Feature list */}
      <ul className="space-y-1.5">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`} />
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feat}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const { isDark } = useTheme();

  return (
    <section id="services" className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="What I Offer"
          title="My Services"
          description="I provide end-to-end solutions from concept to deployment, with a focus on quality and user experience."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          }}
        >
          {/* decorative blobs */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Have a project in mind? 🚀
            </h3>
            <p className="text-white/80 text-base mb-6 max-w-xl mx-auto">
              Let's work together to bring your idea to life. I'm available for freelance projects and full-time opportunities.
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl shadow-xl hover:bg-gray-50 transition-colors"
            >
              Let's Talk 💬
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
