import { useEffect, useState } from 'react';
import { getMystery, MYSTERY_HINT_ORDER } from '../../data/mysteries';
import { useCuriosityGame } from '../../hooks/useCuriosityGame';

export function CuriosityMeter() {
  const { total, foundCount, meterRef, pulseKey, isComplete, hasSeenIntro, dismissIntro, openRecap, isFound } =
    useCuriosityGame();
  const [pulsing, setPulsing] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const showHints = hovering || pinned;

  useEffect(() => {
    if (pulseKey === 0) return;
    setPulsing(true);
    const timeout = window.setTimeout(() => setPulsing(false), 500);
    return () => window.clearTimeout(timeout);
  }, [pulseKey]);

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

  const closeIntro = () => {
    setShowIntro(false);
    setPinned(false);
    setHovering(false);
    dismissIntro();
  };

  return (
    <div className="relative">
      <button
        ref={meterRef}
        type="button"
        onClick={handleClick}
        aria-label={
          isComplete
            ? `All ${total} curiosities found, click to reopen the celebration`
            : `${foundCount} of ${total} curiosities found, click to learn about the game`
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
            There are {total} small mysteries hiding around this site, some obvious, some not. Find all of them
            and I'll have something for you 👀
          </p>
          <p className="mt-2 text-xs" style={{ color: 'var(--ink-faint)' }}>
            Need help? Find hints down below.
          </p>

          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={closeIntro}
              className="text-xs font-semibold underline underline-offset-2"
              style={{ color: 'var(--ink-faint)' }}
            >
              got it
            </button>

            <span className="relative inline-flex">
              <button
                type="button"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onFocus={() => setHovering(true)}
                onBlur={() => setHovering(false)}
                onClick={() => setPinned((prev) => !prev)}
                aria-expanded={showHints}
                className="text-xs font-semibold underline underline-offset-2"
                style={{ color: 'var(--accent-2)' }}
              >
                hints
              </button>

              {showHints && (
                <div
                  role="note"
                  aria-label="Hints for where each curiosity is hiding"
                  className="absolute left-1/2 top-full z-10 mt-2 w-72 max-w-[85vw] -translate-x-1/2 rounded-lg border p-4 text-left shadow-xl"
                  style={{ background: 'var(--bg-raised)', borderColor: 'var(--accent-2)' }}
                >
                  <p
                    className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wide"
                    style={{ color: 'var(--accent-2)' }}
                  >
                    top of the page to the bottom
                  </p>
                  <ol className="space-y-2">
                    {MYSTERY_HINT_ORDER.map((id, index) => {
                      const alreadyFound = isFound(id);
                      return (
                        <li key={id} className="flex gap-2 text-xs leading-relaxed">
                          <span className="font-mono" style={{ color: 'var(--ink-faint)' }}>
                            {index + 1}.
                          </span>
                          <span
                            style={{
                              color: alreadyFound ? 'var(--ink-faint)' : 'var(--ink-soft)',
                              textDecoration: alreadyFound ? 'line-through' : 'none',
                            }}
                          >
                            {getMystery(id).hint}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
