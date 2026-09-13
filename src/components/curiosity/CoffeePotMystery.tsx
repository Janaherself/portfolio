import { useState } from 'react';
import { getMystery } from '../../data/mysteries';
import { useCuriosityGame } from '../../hooks/useCuriosityGame';
import { MysteryPopover } from './MysteryPopover';

const MYSTERY_ID = 'coffee-pot';
const FILL_DURATION_MS = 700;

/**
 * Click the pot, watch the cup fill, then the note appears — as requested.
 * Re-pouring after the first time just reopens the same note without
 * re-triggering the fly-to-header animation (that only fires once, on
 * first discovery).
 */
export function CoffeePotMystery() {
  const { isFound, reveal } = useCuriosityGame();
  const [filling, setFilling] = useState(false);
  const [open, setOpen] = useState(false);
  const found = isFound(MYSTERY_ID);
  const mystery = getMystery(MYSTERY_ID);

  const handlePour = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (filling) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setFilling(true);
    window.setTimeout(() => {
      setOpen(true);
      if (!found) reveal(MYSTERY_ID, rect);
    }, FILL_DURATION_MS);
  };

  const cupIsFull = filling || found;

  return (
    <div className="relative flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handlePour}
        aria-expanded={open}
        aria-label={found ? 'Pour another cup and reread what you found' : 'Pour a cup of coffee'}
        className="flex flex-col items-center gap-1 rounded-lg p-2 transition-transform hover:-translate-y-0.5"
      >
        {/* Pot */}
        <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden="true">
          <path
            d="M5 5h18a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H12l-3 8-3-8a4 4 0 0 1-3-3.8V9a4 4 0 0 1 4-4Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>

        {/* Cup with an animated liquid fill, clipped to the cup's silhouette */}
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <defs>
            <clipPath id="jana-cup-clip">
              <path d="M16 22h24l-2 20a5 5 0 0 1-5 4.5H23a5 5 0 0 1-5-4.5L16 22Z" />
            </clipPath>
          </defs>
          <rect
            x="14"
            y="18"
            width="28"
            height="30"
            fill="var(--accent-soft)"
            clipPath="url(#jana-cup-clip)"
            style={{
              transform: cupIsFull ? 'translateY(0%)' : 'translateY(100%)',
              transition: `transform ${FILL_DURATION_MS}ms var(--ease-out)`,
            }}
          />
          <path
            d="M16 22h24l-2 20a5 5 0 0 1-5 4.5H23a5 5 0 0 1-5-4.5L16 22Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M40 25h3.5a4.5 4.5 0 0 1 0 9H41" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          {cupIsFull && (
            <>
              <path className="steam" d="M23 18c0-3 3-3 3-6s-2-4-2-4" stroke="var(--accent-2)" strokeWidth="1.6" strokeLinecap="round" />
              <path
                className="steam steam-delay"
                d="M32 18c0-3 3-3 3-6s-2-4-2-4"
                stroke="var(--accent-2)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>

        <span className="font-mono text-[11px]" style={{ color: 'var(--ink-faint)' }}>
          {found ? 'pour again?' : 'pour a cup'}
        </span>
      </button>

      <MysteryPopover open={open} onClose={() => setOpen(false)} text={mystery.note} />
    </div>
  );
}
