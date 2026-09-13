import { useEffect, useState } from 'react';
import { useCuriosityGame } from '../../hooks/useCuriosityGame';

export function CuriosityMeter() {
  const { total, foundCount, meterRef, pulseKey, isComplete, hasSeenIntro, dismissIntro, openRecap } =
    useCuriosityGame();
  const [pulsing, setPulsing] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  // Flash briefly every time a new curiosity is found.
  useEffect(() => {
    if (pulseKey === 0) return;
    setPulsing(true);
    const timeout = window.setTimeout(() => setPulsing(false), 500);
    return () => window.clearTimeout(timeout);
  }, [pulseKey]);

  // A quiet, dismissible "there's a game here" toast a few seconds after
  // first load — never blocks the page, never shows again once dismissed.
  useEffect(() => {
    if (hasSeenIntro) return;
    const timeout = window.setTimeout(() => setShowIntro(true), 2600);
    return () => window.clearTimeout(timeout);
  }, [hasSeenIntro]);

  const handleClick = () => {
    if (isComplete) {
      openRecap();
      return;
    }
    setShowIntro((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        ref={meterRef}
        type="button"
        onClick={handleClick}
        aria-label={
          isComplete
            ? `All ${total} curiosities found — click to reopen the celebration`
            : `${foundCount} of ${total} curiosities found — click to learn about the game`
        }
        className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-semibold transition-transform"
        style={{
          borderColor: isComplete ? 'var(--accent-2)' : 'var(--border-strong)',
          color: isComplete ? 'var(--accent-2)' : 'var(--ink-soft)',
          background: 'var(--bg-raised)',
          transform: pulsing ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        <span aria-hidden="true">✦</span>
        {foundCount}/{total}
      </button>

      {showIntro && (
        <div
          role="dialog"
          aria-label="About the curiosity game"
          className="absolute right-0 top-full z-30 mt-2 w-64 rounded-lg border p-4 text-sm leading-relaxed shadow-xl"
          style={{ background: 'var(--bg-raised)', borderColor: 'var(--border)', color: 'var(--ink-soft)' }}
        >
          <p className="mb-2 font-display text-base font-semibold" style={{ color: 'var(--ink)' }}>
            Curious about the curiosities?
          </p>
          <p>
            There are {total} small discoveries hiding around this site — some obvious, some not. Find all of them
            and I'll have something for you.
          </p>
          <button
            type="button"
            onClick={() => {
              setShowIntro(false);
              dismissIntro();
            }}
            className="mt-3 text-xs font-semibold underline underline-offset-2"
            style={{ color: 'var(--ink-faint)' }}
          >
            got it
          </button>
        </div>
      )}
    </div>
  );
}
