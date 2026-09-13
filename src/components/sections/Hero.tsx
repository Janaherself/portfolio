import { useEffect, useState } from 'react';
import { ArrowDown, Coffee } from 'lucide-react';
import { personal } from '../../data/personal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MysteryTrigger } from '../curiosity/MysteryTrigger';

const LOG_LINES = [
  { prefix: '$', text: 'why does this break every third request?' },
  { prefix: '>', text: 'nobody asked. so I did.' },
  { prefix: '>', text: 'turned out to be a race condition. fixed.' },
  { prefix: '$', text: 'status: curious, caffeinated, shipping.' },
];

/**
 * Hero's centerpiece: a small typed "terminal log" that plays once,
 * standing in for how Jana actually approaches problems — question,
 * investigation, fix — instead of a static "Hi, I'm Jana" headline.
 * Falls back to the fully-typed text immediately if the user prefers
 * reduced motion.
 */
function TerminalLog() {
  const reducedMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? LOG_LINES.length : 0);

  useEffect(() => {
    if (reducedMotion) {
      setVisibleLines(LOG_LINES.length);
      return;
    }
    if (visibleLines >= LOG_LINES.length) return;
    const timeout = window.setTimeout(() => setVisibleLines((n) => n + 1), visibleLines === 0 ? 400 : 750);
    return () => window.clearTimeout(timeout);
  }, [visibleLines, reducedMotion]);

  return (
    <div
      className="w-full rounded-lg border p-5 font-mono text-sm shadow-sm sm:text-[15px]"
      style={{ background: 'var(--code-bg)', borderColor: 'var(--border)' }}
      role="group"
      aria-label="A short, illustrative log of how Jana approaches a problem"
    >
      <div className="mb-3 flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--border-strong)' }} />
      </div>
      <ul className="space-y-2">
        {LOG_LINES.slice(0, visibleLines).map((line, index) => (
          <li key={index} className="flex gap-2 leading-relaxed">
            <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
              {line.prefix}
            </span>
            <span style={{ color: line.prefix === '$' ? 'var(--ink)' : 'var(--ink-soft)' }}>{line.text}</span>
          </li>
        ))}
        {visibleLines < LOG_LINES.length && (
          <li aria-hidden="true" className="inline-block h-4 w-2" style={{ background: 'var(--accent)' }} />
        )}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:flex-row lg:items-center lg:gap-16 lg:pt-28"
    >
      <div className="flex-1">
        <p className="mb-4 flex items-center gap-2 font-mono text-sm font-medium" style={{ color: 'var(--accent)' }}>
          <Coffee className="h-4 w-4" aria-hidden="true" />
          {personal.role.toLowerCase()} · probably on her second coffee
        </p>

        <h1 className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          {personal.name} asks{' '}
          <span style={{ color: 'var(--accent)' }}>&ldquo;wait, why?&rdquo;</span> — then makes it work.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--ink-soft)' }}>
          {personal.tagline} I build full-stack software with a backend-leaning brain, and I care more about
          understanding a problem than about looking busy solving it.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-md px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--accent)', color: 'var(--accent-ink)' }}
          >
            See what I've been building
          </a>
          <a href="#about" className="ink-link text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            Get in touch
          </a>
        </div>

        <a
          href="#work"
          className="mt-14 hidden items-center gap-2 text-xs font-medium sm:inline-flex"
          style={{ color: 'var(--ink-faint)' }}
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          scroll — there's more to find
        </a>
      </div>

      <div className="flex-1">
        <MysteryTrigger id="hero-terminal" label="This terminal has more to say — click it" className="w-full">
          <TerminalLog />
        </MysteryTrigger>
      </div>
    </section>
  );
}
