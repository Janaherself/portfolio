import { useEffect, useRef } from 'react';
import { personal } from '../../data/personal';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCuriosityGame } from '../../hooks/useCuriosityGame';
import { Confetti } from './Confetti';

export function CompletionModal() {
  const { celebration, closeCelebration, total } = useCuriosityGame();
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = celebration !== 'none';
  const isFullCelebration = celebration === 'full';

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCelebration();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [isOpen, closeCelebration]);

  if (!isOpen) return null;

  const quickCallLink = personal.calendlyUrl ? (
    <a
      href={personal.calendlyUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="ink-link font-semibold"
      style={{ color: 'var(--accent)' }}
    >
      quick call
    </a>
  ) : (
    <span className="font-semibold">quick call</span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: 'color-mix(in srgb, black 55%, transparent)' }}
        onClick={closeCelebration}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-heading"
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl border p-8 text-center shadow-2xl outline-none"
        style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)' }}
      >
        {!reducedMotion && <Confetti />}

        <h2 id="celebration-heading" className="font-display text-2xl font-semibold sm:text-3xl">
          {isFullCelebration ? 'Congrats 🎉' : 'Congrats again 🎉'}
        </h2>

        {isFullCelebration ? (
          <span>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              You passed the curiosity test!! Thank you for the time you wast… I mean spent in getting to know me!
            </p>
            
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              Now you got me curious about you, let's have a {quickCallLink} and get to know all about you too!!
            </p>
          </span>
        ) : (
          <span>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              You already found all {total} mysteries!
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              just so you know, that {quickCallLink} invitation is still valid 👀
            </p>
          </span>
        )}

        <button
          type="button"
          onClick={closeCelebration}
          className="mt-6 rounded-md border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: 'var(--border-strong)', color: 'var(--ink)' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
