import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { personalInfo } from '../data/portfolioData';

// Build the WhatsApp deep-link URL
const WA_URL = (() => {
  const number = personalInfo.phone.replace(/\D/g, '');
  const text = encodeURIComponent(
    "Hi Latifa! I visited your portfolio and I'd love to connect with you. 👋"
  );
  return `https://wa.me/${number}?text=${text}`;
})();

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Show tooltip automatically after 3s, then hide after 6s
  // (we use CSS animation via Framer for this)

  return (
    <>
      {/* ── Floating Button ──────────────────────────────────────────────── */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">

        {/* Tooltip / mini card */}
        <AnimatePresence>
          {showTooltip && !dismissed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="relative flex items-start gap-2 max-w-[220px] px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-green-200 dark:border-green-900"
            >
              <button
                onClick={() => setDismissed(true)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Dismiss"
              >
                <FiX size={10} className="text-gray-600 dark:text-gray-300" />
              </button>
              <FaWhatsapp size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                Chat with me on WhatsApp! I reply fast 🚀
              </p>
              {/* Tail */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-green-200 dark:border-green-900 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The button itself */}
        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl shadow-green-500/40"
          style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}
        >
          <FaWhatsapp size={28} className="text-white" />

          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20" />
        </motion.a>
      </div>
    </>
  );
}
