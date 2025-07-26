import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// ==== Replace these with your actual EmailJS credentials ====
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// ---- Social Links Array ----
const socials = [
  // { label: 'LinkedIn', url: 'https://linkedin.com/in/manojng17', icon: '💻' },
  // { label: 'GitHub', url: 'https://github.com/Omnific1', icon: '🐱' },
  // { label: 'Email', url: 'mailto:manojava.srinidhi@email.com', icon: '✉️' },
];

// ---- Floating Field Component ----
const FloatingField = ({ label, name, type = 'text', value, onChange, disabled }) => (
  <div className="relative mb-7">
    <input
      name={name}
      id={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={`
        peer block w-full px-4 py-3 bg-transparent rounded-lg border-b-2 border-black dark:border-white
        text-black dark:text-white font-medium focus:outline-none
      `}
      placeholder=" "
      autoComplete="off"
    />
    <label
      htmlFor={name}
      className={`
        absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500
        pointer-events-none transition-all duration-200
        peer-focus:-top-3 peer-focus:left-2 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white
        ${value ? '-top-3 left-2 text-xs text-black dark:text-white' : ''}
      `}
    >
      {label}
    </label>
  </div>
);

// ---- Toast/Alert Component ----
const Toast = ({ show, message, success, onClose }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.35 }}
        className={`
          fixed top-6 left-1/2 z-50 -translate-x-1/2 px-6 py-4 rounded-xl shadow-xl border-2
          ${success
            ? 'bg-white dark:bg-black border-green-500 text-green-600 dark:text-green-400'
            : 'bg-white dark:bg-black border-red-500 text-red-600 dark:text-red-400'}
        `}
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <div className="flex items-center gap-2">
          <span>{success ? "✅" : "❌"}</span>
          <span>{message}</span>
          <button onClick={onClose} className="ml-2 text-sm opacity-60 hover:opacity-100">
            ×
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ---- Social Links Component (Rectangular) ----
const ContactSocial = () => (
  <motion.div
    className="flex flex-wrap justify-center gap-4 mt-10"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {socials.map((item, idx) => (
      <a
        key={idx}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-8 py-3 rounded-none border-2 border-black dark:border-white text-black dark:text-white bg-transparent hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all font-medium text-base shadow-none"
        aria-label={item.label}
      >
        <span className="text-xl">{item.icon}</span>
        <span className="sm:inline">{item.label}</span>
      </a>
    ))}
  </motion.div>
);

// ---- Main Contact Component ----
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, success: false, message: '' });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFeedback({ show: true, success: false, message: 'All fields are required.' });
      return;
    }
    if (!validateEmail(form.email)) {
      setFeedback({ show: true, success: false, message: 'Please enter a valid email.' });
      return;
    }
    setSending(true);

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSending(false);
          setFeedback({
            show: true,
            success: true,
            message: "Message sent! I'll be in touch soon.",
          });
          setForm({ name: '', email: '', message: '' });
        },
        () => {
          setSending(false);
          setFeedback({
            show: true,
            success: false,
            message: "Couldn't send, please try again later.",
          });
        }
      );
  };

  return (
    <motion.section
      id="contact"
      className="py-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-black dark:from-black dark:via-gray-900 dark:to-white transition-all"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-2xl w-full px-4 mx-auto">
        {/* --- WOW Headline & Subtext --- */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl font-extrabold text-black dark:text-white mb-4 tracking-tight flex items-center justify-center gap-2"
            initial={{ letterSpacing: "-.07em" }}
            animate={{ letterSpacing: "normal" }}
            transition={{ duration: 0.8 }}
          >
            Start a Conversation
            <motion.span
              className="inline-block"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >💬</motion.span>
          </motion.h2>
          <motion.div
            className="w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-black/80 via-indigo-500 to-white/80 dark:from-white dark:via-cyan-400 dark:to-black rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto font-light">
            Got an idea, question, or want to share something? I'm all ears.<br />
            You Type, I’ll Reply. No bots, just me :) <br />
            <span className="text-indigo-500 dark:text-cyan-400">Prefer socials? All my links are below.👇</span>
          </p>
        </motion.div>

        {/* --- Glass Card Form --- */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="backdrop-blur-md bg-white/80 dark:bg-black/80 border-2 border-black dark:border-white rounded-3xl shadow-2xl px-8 py-10"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <FloatingField
            label="Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={sending}
          />
          <FloatingField
            label="Your Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={sending}
          />
          <div className="relative mb-7">
            <textarea
              name="message"
              id="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              disabled={sending}
              className={`
                peer block w-full px-4 py-3 bg-transparent rounded-lg border-b-2 border-black dark:border-white
                text-black dark:text-white font-medium focus:outline-none
              `}
              placeholder=" "
              autoComplete="off"
            />
            <label
              htmlFor="message"
              className={`
                absolute left-4 top-6 text-gray-400 dark:text-gray-500
                pointer-events-none transition-all duration-200
                peer-focus:-top-3 peer-focus:left-2 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white
                ${form.message ? '-top-3 left-2 text-xs text-black dark:text-white' : ''}
              `}
            >
              Message
            </label>
          </div>
          <motion.button
            type="submit"
            className={`
              w-full py-3 rounded-xl font-bold text-lg mt-2 border-2 border-black dark:border-white
              transition-all duration-300 flex items-center justify-center
              bg-black dark:bg-white text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
              shadow hover:shadow-lg focus:outline-none
              ${sending ? 'opacity-70 cursor-not-allowed' : ''}
            `}
            whileHover={{ scale: sending ? 1 : 1.04 }}
            whileTap={{ scale: sending ? 1 : 0.98 }}
            disabled={sending}
          >
            {sending ? (
              <span className="animate-spin mr-3">&#9696;</span>
            ) : (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            {sending ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>

        <ContactSocial />

        <Toast
          show={feedback.show}
          message={feedback.message}
          success={feedback.success}
          onClose={() => setFeedback({ ...feedback, show: false })}
        />
      </div>
    </motion.section>
  );
};

export default Contact;
