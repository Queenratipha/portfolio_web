import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend, FiMail, FiPhone, FiMapPin,
  FiCheck, FiAlertCircle, FiLoader, FiUser, FiMessageSquare,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useTheme } from '../context/ThemeContext';
import SectionTitle from '../components/SectionTitle';
import { personalInfo } from '../data/portfolioData';

// ── EmailJS config — set these in your .env file ──────────────────────────────
// Get your keys at https://www.emailjs.com
// In Netlify: Site settings → Environment variables → add the 3 VITE_EMAILJS_* vars
const EJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';
const EJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';

// ── Rate limit: max 3 submissions per 10 minutes (stored in localStorage) ────
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit() {
  try {
    const raw = localStorage.getItem('_cf_ts');
    const timestamps = raw ? JSON.parse(raw) : [];
    const now = Date.now();
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) return false; // blocked
    recent.push(now);
    localStorage.setItem('_cf_ts', JSON.stringify(recent));
    return true;
  } catch {
    return true; // if localStorage unavailable, allow
  }
}

// ── Contact Info Cards ────────────────────────────────────────────────────────
const contactDetails = [
  {
    icon: FiMail,
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: personalInfo.location,
    href: '#',
    color: 'from-green-500 to-teal-500',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: 'Chat on WhatsApp',
    href: personalInfo.whatsapp,
    color: 'from-green-400 to-green-600',
  },
];

// ── Form initial state ────────────────────────────────────────────────────────
const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  // honeypot — must remain empty; bots fill it
  _honey: '',
};

// ── Validation ────────────────────────────────────────────────────────────────
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form) {
  const errors = {};

  if (!form.name.trim())
    errors.name = 'Full name is required';
  else if (form.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters';

  if (!form.email.trim())
    errors.email = 'Email address is required';
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = 'Please enter a valid email address';

  if (!form.phone.trim())
    errors.phone = 'Phone number is required';
  else if (!PHONE_RE.test(form.phone.trim()))
    errors.phone = 'Please enter a valid phone number';

  // subject is optional — no validation required

  if (!form.message.trim())
    errors.message = 'Message is required';
  else if (form.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters';

  return errors;
}

// ── Build WhatsApp pre-filled URL with all form data ──────────────────────────
function buildWhatsAppUrl(form) {
  const number = personalInfo.phone.replace(/\D/g, '');
  const name    = form.name    || 'a visitor';
  const email   = form.email   || '(not provided)';
  const phone   = form.phone   || '(not provided)';
  const subject = form.subject || '(no subject)';
  const message = form.message || '(no message)';

  const text = [
    `Hello Latifa! 👋`,
    ``,
    `*Name:* ${name}`,
    `*Email:* ${email}`,
    `*Phone:* ${phone}`,
    `*Subject:* ${subject}`,
    ``,
    `*Message:*`,
    message,
  ].join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Contact() {
  const { isDark } = useTheme();
  const formRef    = useRef(null);

  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState({});
  const [status, setStatus]   = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear the error for this field as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Honeypot check ────────────────────────────────────────────────────
    if (form._honey) {
      // Silently reject bots — show fake success
      setStatus('success');
      setForm(INITIAL_FORM);
      return;
    }

    // ── Frontend validation ───────────────────────────────────────────────
    const clientErrors = validateForm(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      // Scroll to first error
      const firstErrField = Object.keys(clientErrors)[0];
      document
        .querySelector(`[data-field="${firstErrField}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ── Rate limit ────────────────────────────────────────────────────────
    if (!checkRateLimit()) {
      setStatus('error');
      setErrorMsg('Too many submissions. Please wait a few minutes before trying again.');
      return;
    }

    // ── EmailJS config guard ──────────────────────────────────────────────
    if (!EJS_PUBLIC_KEY || !EJS_SERVICE_ID || !EJS_TEMPLATE_ID) {
      setStatus('error');
      setErrorMsg(
        'Email service is not configured yet. Please reach out directly via the links below.',
      );
      return;
    }

    setStatus('loading');
    setErrors({});

    try {
      // EmailJS template variables (must match your template exactly):
      //   {{from_name}}   — Full Name
      //   {{from_email}}  — Email Address
      //   {{from_phone}}  — Phone Number
      //   {{subject}}     — Subject
      //   {{message}}     — Message body
      //   {{sent_date}}   — Date & time of submission
      //   {{owner_email}} — Recipient (your email, set in hidden field)
      await emailjs.sendForm(EJS_SERVICE_ID, EJS_TEMPLATE_ID, formRef.current, {
        publicKey: EJS_PUBLIC_KEY,
      });

      setStatus('success');
      setForm(INITIAL_FORM);
      setTimeout(() => setStatus('idle'), 9000);
    } catch (err) {
      console.error('[EmailJS]', err);
      setStatus('error');
      setErrorMsg(
        err?.text ||
          `Failed to send your message. Please email me directly at ${personalInfo.email}`,
      );
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  // ── Shared input class builder ────────────────────────────────────────────
  const inputBase =
    'w-full px-4 py-3.5 rounded-xl border text-sm outline-none transition-all duration-200';

  const inputClass = (field) =>
    `${inputBase} ${
      isDark
        ? `bg-gray-800 text-white placeholder-gray-500 ${
            errors[field]
              ? 'border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-white/5 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
          }`
        : `bg-white text-gray-900 placeholder-gray-400 ${
            errors[field]
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/20'
              : 'border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
          }`
    }`;

  const labelClass = `block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;
  const errorTextClass = 'text-red-400 text-xs mt-1.5 flex items-center gap-1';

  const isSubmitting = status === 'loading';

  const sentDate = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <section
      id="contact"
      className={`section-padding ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Get In Touch"
          title="Contact Me"
          description="Have a project in mind or just want to say hello? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-10">

          {/* ── Left: Contact Info ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              I'm currently available for freelance work and full-time positions.
              Don't hesitate to reach out — I typically reply within 24 hours!
            </motion.p>

            {contactDetails.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: 6, scale: 1.02 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-gray-800/50 border-white/5 hover:border-purple-500/30'
                    : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                >
                  <item.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className={`text-xs mb-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    {item.label}
                  </p>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* WhatsApp Quick Chat — prefilled with current form data */}
            <motion.a
              href={buildWhatsAppUrl(form)}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/25 hover:opacity-90 transition-opacity"
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp Now
            </motion.a>
          </div>

          {/* ── Right: Contact Form ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div
              className={`p-6 md:p-8 rounded-3xl border ${
                isDark
                  ? 'bg-gray-900/60 border-white/5'
                  : 'bg-gray-50 border-gray-200 shadow-sm'
              }`}
            >
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* ── Hidden fields for EmailJS template ──────────────── */}
                <input type="hidden" name="sent_date"   value={sentDate}          readOnly />
                <input type="hidden" name="owner_email" value={personalInfo.email} readOnly />

                {/* ── Honeypot — hidden from real users, visible to bots ─ */}
                {/* aria-hidden + tabIndex=-1 ensures screen readers skip it */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1 }}>
                  <label htmlFor="_honey">Leave this field empty</label>
                  <input
                    id="_honey"
                    type="text"
                    name="_honey"
                    value={form._honey}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {/* ── Row 1: Full Name + Email ─────────────────────────── */}
                <div className="grid sm:grid-cols-2 gap-5">

                  {/* Full Name */}
                  <div data-field="name">
                    <label htmlFor="contact-name" className={labelClass}>
                      <span className="flex items-center gap-1.5">
                        <FiUser size={13} className="text-purple-400" />
                        Full Name <span className="text-purple-400">*</span>
                      </span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="from_name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass('name')}
                      disabled={isSubmitting}
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className={errorTextClass}>
                        <FiAlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div data-field="email">
                    <label htmlFor="contact-email" className={labelClass}>
                      <span className="flex items-center gap-1.5">
                        <FiMail size={13} className="text-purple-400" />
                        Email Address <span className="text-purple-400">*</span>
                      </span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="from_email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass('email')}
                      disabled={isSubmitting}
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className={errorTextClass}>
                        <FiAlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Row 2: Phone + Subject ───────────────────────────── */}
                <div className="grid sm:grid-cols-2 gap-5">

                  {/* Phone Number */}
                  <div data-field="phone">
                    <label htmlFor="contact-phone" className={labelClass}>
                      <span className="flex items-center gap-1.5">
                        <FiPhone size={13} className="text-purple-400" />
                        Phone Number <span className="text-purple-400">*</span>
                      </span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="from_phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+250 7XX XXX XXX"
                      className={inputClass('phone')}
                      disabled={isSubmitting}
                      autoComplete="tel"
                      aria-required="true"
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && (
                      <p id="phone-error" role="alert" className={errorTextClass}>
                        <FiAlertCircle size={11} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject (optional) */}
                  <div data-field="subject">
                    <label htmlFor="contact-subject" className={labelClass}>
                      <span className="flex items-center gap-1.5">
                        <FiMessageSquare size={13} className="text-purple-400" />
                        Subject{' '}
                        <span className={`text-xs font-normal ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          (optional)
                        </span>
                      </span>
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry / Collaboration..."
                      className={inputClass('subject')}
                      disabled={isSubmitting}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" role="alert" className={errorTextClass}>
                        <FiAlertCircle size={11} /> {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Message ──────────────────────────────────────────── */}
                <div data-field="message">
                  <label htmlFor="contact-message" className={labelClass}>
                    <span className="flex items-center gap-1.5">
                      <FiSend size={13} className="text-purple-400" />
                      Message <span className="text-purple-400">*</span>
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    className={`${inputClass('message')} resize-none`}
                    disabled={isSubmitting}
                    maxLength={2000}
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    aria-invalid={!!errors.message}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.message ? (
                      <p id="message-error" role="alert" className={errorTextClass}>
                        <FiAlertCircle size={11} /> {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className={`text-xs ml-auto ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                      {form.message.length}/2000
                    </span>
                  </div>
                </div>

                {/* ── Submit + WhatsApp buttons ─────────────────────────── */}
                <div className="grid sm:grid-cols-2 gap-4 pt-1">

                  {/* Send via EmailJS */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white transition-all ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed opacity-80'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 shadow-lg shadow-purple-500/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <FiLoader size={16} />
                        </motion.div>
                        Sending…
                      </>
                    ) : (
                      <>
                        <FiSend size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Send via WhatsApp */}
                  <motion.a
                    href={buildWhatsAppUrl(form)}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 py-4 font-bold rounded-xl text-white bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 shadow-lg shadow-green-500/25 transition-all"
                    title="Open WhatsApp with your message prefilled"
                  >
                    <FaWhatsapp size={18} />
                    Send via WhatsApp
                  </motion.a>
                </div>

                {/* ── Status Banners ─────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      key="success"
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <FiCheck size={16} className="text-green-400" />
                        </div>
                        <div>
                          <p className="text-green-400 text-sm font-semibold">
                            Message sent successfully! 🎉
                          </p>
                          <p className="text-green-400/70 text-xs mt-0.5">
                            I'll get back to you within 24 hours. Check your inbox for a confirmation!
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      key="error"
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <FiAlertCircle size={16} className="text-red-400" />
                        </div>
                        <div>
                          <p className="text-red-400 text-sm font-semibold">Failed to send</p>
                          <p className="text-red-400/70 text-xs mt-0.5">
                            {errorMsg || `Please email me at ${personalInfo.email}`}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
