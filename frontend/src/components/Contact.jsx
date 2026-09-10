import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2, Terminal, User, MessageSquare } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | null;
    message;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (feedback.type) {
      setFeedback({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFeedback({ type: 'error', message: 'Name is required.' });
      return;
    }
    if (!formData.email.trim()) {
      setFeedback({ type: 'error', message: 'Email address is required.' });
      return;
    }
    if (!formData.message.trim()) {
      setFeedback({ type: 'error', message: 'Message is required.' });
      return;
    }

    setLoading(true);
    setFeedback({ type: null, message: '' });

    try {
      const baseUrl = (import.meta  }).env?.VITE_API_URL || '';
      const endpoint = `${baseUrl}/api/contact`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFeedback({
          type: 'success',
          message: data.message || 'Message received successfully',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedback({
          type: 'error',
          message: data.error || data.message || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Could not connect to the Python Flask backend. Please ensure the server is running.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION CHANNEL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 font-display drop-shadow-md">
            CONTACT
          </h2>
          <p className="text-base sm:text-lg text-slate-300 drop-shadow-sm">
            Reach out directly for software development, systems security, or collaboration opportunities.
          </p>
        </div>

        {/* Contact Information & Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Info Column (Resume Details) */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-[8px] border border-white/[0.12] shadow-xl">
              <h3 className="text-sm font-mono text-cyan-400 uppercase mb-4 tracking-wider">
                Direct Contact
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <a
                  href="mailto:asiqmohd1970@gmail.com"
                  className="flex items-center gap-3 text-slate-200 hover:text-cyan-300 transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Email</div>
                    <div className="font-sans font-medium text-white">asiqmohd1970@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:6374004563"
                  className="flex items-center gap-3 text-slate-200 hover:text-cyan-300 transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Phone</div>
                    <div className="font-sans font-medium text-white">6374004563</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-200">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Location</div>
                    <div className="font-sans font-medium text-white">Madurai, Tamil Nadu</div>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/mohammad-aashiq-0627a0360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-cyan-300 transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">LinkedIn</div>
                    <div className="font-sans font-medium text-white">in/mohammad-aashiq-0627a0360</div>
                  </div>
                </a>

                <a
                  href="https://github.com/asiqmohd1970-crypto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-cyan-300 transition-colors group cursor-pointer"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-400 group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">GitHub</div>
                    <div className="font-sans font-medium text-white">asiqmohd1970-crypto</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Flask Service Indicator */}
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Python Flask API</span>
              </span>
              <span className="text-cyan-400">POST /api/contact</span>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-3 p-8 rounded-2xl bg-white/[0.06] backdrop-blur-[8px] border border-white/[0.12] shadow-2xl">
            {feedback.type === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{feedback.message}</p>
                  <p className="text-xs text-emerald-400/80 mt-1">
                    Your inquiry has been successfully delivered and processed by the Flask backend.
                  </p>
                </div>
              </div>
            )}

            {feedback.type === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{feedback.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-slate-200 mb-1.5">
                  Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-slate-200 mb-1.5">
                  Email <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-slate-200 mb-1.5">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, message, or project details..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.12] text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting to Flask...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
