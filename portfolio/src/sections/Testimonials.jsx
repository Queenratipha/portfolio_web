import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';
import { testimonials } from '../data/portfolioData';

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          size={14}
          className={i < rating ? 'text-yellow-400' : 'text-gray-600'}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonials" className={`section-padding ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Client Feedback"
          title="What People Say"
          description="Don't just take my word for it — hear from the people I've had the pleasure of working with."
        />

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial card */}
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`relative p-8 md:p-10 rounded-3xl border text-center ${
                  isDark
                    ? 'bg-gray-900/60 border-white/5'
                    : 'bg-white border-gray-200 shadow-lg'
                }`}
              >
                {/* Quote mark */}
                <div className="text-6xl md:text-7xl font-black text-purple-500/20 absolute top-4 left-6 leading-none select-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-5">
                  <StarRating rating={t.rating} />
                </div>

                {/* Text */}
                <p className={`text-base md:text-lg leading-relaxed mb-8 italic relative z-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 rounded-2xl border-2 border-purple-500/30 bg-gray-700"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className="text-purple-400 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className={`p-3 rounded-xl border transition-all ${
                isDark
                  ? 'bg-gray-800 border-white/5 text-gray-300 hover:border-purple-500/40 hover:text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-gray-900 shadow-sm'
              }`}
              aria-label="Previous testimonial"
            >
              <FiChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 h-2.5 bg-gradient-to-r from-purple-500 to-cyan-500' : `w-2.5 h-2.5 ${isDark ? 'bg-gray-700 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className={`p-3 rounded-xl border transition-all ${
                isDark
                  ? 'bg-gray-800 border-white/5 text-gray-300 hover:border-purple-500/40 hover:text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-gray-900 shadow-sm'
              }`}
              aria-label="Next testimonial"
            >
              <FiChevronRight size={20} />
            </motion.button>
          </div>

          {/* Mini cards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {testimonials.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => goTo(i)}
                whileHover={{ y: -4 }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  i === current
                    ? isDark
                      ? 'bg-purple-500/10 border-purple-500/40'
                      : 'bg-purple-50 border-purple-300'
                    : isDark
                    ? 'bg-gray-900/60 border-white/5 hover:border-purple-500/20'
                    : 'bg-white border-gray-200 hover:border-purple-200 shadow-sm'
                }`}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-lg mb-2 bg-gray-700"
                  loading="lazy"
                />
                <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.name}
                </p>
                <p className={`text-xs truncate ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.role}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
