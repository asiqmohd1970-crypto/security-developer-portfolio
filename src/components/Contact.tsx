import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Copy,
  Check,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

const RECIPIENT_EMAIL = 'asiqmohd1970@gmail.com';
const RECIPIENT_PHONE = '6374004563';
const GITHUB_URL = 'https://github.com/asiqmohd1970-crypto';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohammad-aashiq-0627a0360';

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  RECIPIENT_EMAIL
)}&su=${encodeURIComponent('Project Inquiry - Asiq Mohd')}`;

const MAILTO_URL = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
  'Project Inquiry - Asiq Mohd'
)}`;

export const Contact: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch (err) {
        console.warn('Fallback copy failed', err);
      }
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const contactCards = [
    {
      id: 'email',
      icon: Mail,
      badge: 'PRIMARY CHANNEL',
      title: 'Email Address',
      value: RECIPIENT_EMAIL,
      description: 'Open directly in Gmail web or your preferred desktop email application.',
      primaryAction: {
        label: 'Open in Gmail',
        href: GMAIL_COMPOSE_URL,
        icon: ExternalLink,
        external: true,
      },
      secondaryAction: {
        label: 'Mail App',
        href: MAILTO_URL,
        icon: Mail,
        title: 'Launch desktop mail client (Outlook / Apple Mail)',
      },
      copyValue: RECIPIENT_EMAIL,
      copyLabel: 'Copy Email',
    },
    {
      id: 'phone',
      icon: Phone,
      badge: 'DIRECT LINE',
      title: 'Phone & WhatsApp',
      value: `+91 ${RECIPIENT_PHONE}`,
      description: 'Available for voice calls, technical discussions, and WhatsApp messaging.',
      primaryAction: {
        label: 'Call Direct',
        href: `tel:${RECIPIENT_PHONE}`,
        icon: ArrowUpRight,
      },
      copyValue: RECIPIENT_PHONE,
      copyLabel: 'Copy Phone',
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      badge: 'PROFESSIONAL NETWORK',
      title: 'LinkedIn Profile',
      value: 'mohammad-aashiq-0627a0360',
      description: 'Connect for career opportunities, technical collaborations, and network.',
      primaryAction: {
        label: 'Connect on LinkedIn',
        href: LINKEDIN_URL,
        icon: ExternalLink,
        external: true,
      },
      copyValue: LINKEDIN_URL,
      copyLabel: 'Copy Profile',
    },
    {
      id: 'github',
      icon: Github,
      badge: 'CODE REPOSITORY',
      title: 'GitHub Profile',
      value: 'asiqmohd1970-crypto',
      description: 'Explore open-source repositories, cryptography work, and codebase architectures.',
      primaryAction: {
        label: 'Explore GitHub',
        href: GITHUB_URL,
        icon: ExternalLink,
        external: true,
      },
      copyValue: GITHUB_URL,
      copyLabel: 'Copy Link',
    },
    {
      id: 'location',
      icon: MapPin,
      badge: 'BASE LOCATION',
      title: 'Location & Zone',
      value: 'Madurai, Tamil Nadu',
      description: 'India Standard Time (IST / UTC+5:30). Open to remote worldwide and hybrid engagements.',
      primaryAction: {
        label: 'View Map',
        href: 'https://maps.google.com/?q=Madurai,+Tamil+Nadu,+India',
        icon: ExternalLink,
        external: true,
      },
      copyValue: 'Madurai, Tamil Nadu, India',
      copyLabel: 'Copy Location',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-black/20 border-t border-white/[0.08] backdrop-blur-[2px]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>COMMUNICATION CHANNEL</span>
          </div>
          <h2
            className="font-bold tracking-tight text-white mb-4 font-display drop-shadow-md"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            DIRECT CONTACT
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 drop-shadow-sm">
            Reach out directly for software engineering, system architectures, or technical consultation.
          </p>
        </div>

        {/* Hero Quick-Action Card */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-cyan-950/20 backdrop-blur-[12px] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE & AVAILABLE FOR NEW PROJECTS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Let&apos;s build something exceptional together
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Skip form submissions and connect directly to my personal inbox or phone. Inquiries are answered with high priority.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer group"
                title="Opens Gmail compose directly in a new tab without desktop app prompts"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>Compose in Gmail</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white text-sm font-semibold transition-all duration-200 cursor-pointer group"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <a
                href={MAILTO_URL}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.15] text-slate-200 text-sm font-mono transition-all duration-200 cursor-pointer"
                title="Open in your default desktop mail app (Outlook, Apple Mail, Thunderbird)"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Desktop App</span>
              </a>

              <button
                type="button"
                onClick={() => handleCopy(RECIPIENT_EMAIL, 'hero-email')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.15] text-slate-200 text-sm font-mono transition-all duration-200 cursor-pointer"
              >
                {copiedKey === 'hero-email' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 5-Card Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {contactCards.map((card) => {
            const Icon = card.icon;
            const ActionIcon = card.primaryAction.icon;
            const isCopied = copiedKey === card.id;

            return (
              <div
                key={card.id}
                className="p-6 sm:p-7 rounded-2xl bg-white/[0.05] hover:bg-white/[0.07] backdrop-blur-[10px] border border-white/[0.12] hover:border-cyan-500/40 shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top line with Icon & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400/80 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Value */}
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    {card.title}
                  </h4>
                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 font-mono break-all">
                    {card.value}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
                  <a
                    href={card.primaryAction.href}
                    target={card.primaryAction.external ? '_blank' : undefined}
                    rel={card.primaryAction.external ? 'noopener noreferrer' : undefined}
                    className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 text-xs font-semibold transition-all duration-200"
                  >
                    <span>{card.primaryAction.label}</span>
                    <ActionIcon className="w-3.5 h-3.5" />
                  </a>

                  {'secondaryAction' in card && card.secondaryAction && (
                    <a
                      href={card.secondaryAction.href}
                      title={card.secondaryAction.title}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-mono transition-all duration-200 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{card.secondaryAction.label}</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopy(card.copyValue, card.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-mono transition-all duration-200 inline-flex items-center gap-1.5 cursor-pointer"
                    title={card.copyLabel}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px] hidden xs:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Guarantee / Trust Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.04] text-cyan-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-semibold">Fast Response</div>
              <div className="text-[11px] text-slate-400">Guaranteed response within 24h</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.04] text-cyan-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-semibold">Direct Communication</div>
              <div className="text-[11px] text-slate-400">Directly with Asiq Mohd</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.04] text-cyan-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-semibold">Global Remote Ready</div>
              <div className="text-[11px] text-slate-400">Flexible with international hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
