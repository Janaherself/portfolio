import { useEffect, useState } from 'react';
import { ArrowDown, Coffee } from 'lucide-react';
import { personal } from '../../data/personal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MysteryTrigger } from '../curiosity/MysteryTrigger';

const LOG_LINES = [
  { prefix: '$', text: 'everything worked fine, only a tiny bug annoyed me' },
  { prefix: '>', text: 'nobody asked me to fix it. investigated anyway' },
  { prefix: '>', text: 'learnt something new. owned it. fixed it!' },
  { prefix: '$', text: 'status: curious, caffeinated, shippinggg!!' },
];

const CHAR_DELAY_MS = 30;
const LINE_PAUSE_MS = 300;
const START_DELAY_MS = 400;

/** Total characters typed so far, mapped onto which lines are done and how far into the current one. */
function sliceLines(charsTyped: number) {
  let remaining = charsTyped;
  const result: { prefix: string; text: string; done: boolean }[] = [];

  for (const line of LOG_LINES) {
    if (remaining <= 0) break;
    const shown = Math.min(remaining, line.text.length);
    result.push({ prefix: line.prefix, text: line.text.slice(0, shown), done: shown === line.text.length });
    remaining -= shown;
  }

  return result;
}

const TOTAL_CHARS = LOG_LINES.reduce((sum, line) => sum + line.text.length, 0);

function TerminalLog() {
  const reducedMotion = useReducedMotion();
  const [charsTyped, setCharsTyped] = useState(0);
  const finished = reducedMotion || charsTyped >= TOTAL_CHARS;

  useEffect(() => {
    if (reducedMotion || charsTyped >= TOTAL_CHARS) return;

    let delay = charsTyped === 0 ? START_DELAY_MS : CHAR_DELAY_MS;
    let consumed = 0;
    for (const line of LOG_LINES) {
      consumed += line.text.length;
      if (charsTyped === consumed) {
        delay = LINE_PAUSE_MS;
        break;
      }
    }

    const timeout = window.setTimeout(() => setCharsTyped((n) => n + 1), delay);
    return () => window.clearTimeout(timeout);
  }, [charsTyped, reducedMotion]);

  const lines = reducedMotion ? LOG_LINES.map((l) => ({ ...l, done: true })) : sliceLines(charsTyped);

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

      {/* The full log, read once by assistive tech instead of the animating copy. */}
      <p className="sr-only">
        {LOG_LINES.map((line) => `${line.prefix} ${line.text}`).join(' ')}
      </p>

      {/* Reserve the finished height up front so the hero doesn't reflow while typing. */}
      <ul
        aria-hidden="true"
        className="space-y-2"
        style={{ minHeight: `calc(${LOG_LINES.length} * 1.625em + ${(LOG_LINES.length - 1) * 0.5}rem)` }}
      >
        {lines.map((line, index) => {
          const isLastRendered = index === lines.length - 1;
          return (
            <li key={index} className="flex gap-2 leading-relaxed">
              <span style={{ color: 'var(--accent)' }}>{line.prefix}</span>
              <span style={{ color: line.prefix === '$' ? 'var(--ink)' : 'var(--ink-soft)' }}>
                {line.text}
                {!finished && isLastRendered && <span className="terminal-caret" />}
              </span>
            </li>
          );
        })}
        {/* Caret sits on its own line while waiting for the first character. */}
        {!finished && lines.length === 0 && (
          <li className="flex gap-2 leading-relaxed">
            <span className="terminal-caret" />
          </li>
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
          {personal.role.toLowerCase()} · problem solver
        </p>

        <h1 className="font-display text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          {personal.name} keeps asking{' '}
          <span style={{ color: 'var(--accent)' }}>&ldquo;wait, why?&rdquo;</span>,  till it works.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed sm:text-xl" style={{ color: 'var(--ink-soft)' }}>
          {personal.tagline} 
            <span className="block">I build full-stack software with a backend-leaning brain,
              and I care more about understanding a problem than about looking busy solving it.
            </span>
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
