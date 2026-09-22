import { useState, type CSSProperties } from 'react';
import { getMystery } from '../../data/mysteries';
import { useCuriosityGame } from '../../hooks/useCuriosityGame';
import { MysteryPopover } from './MysteryPopover';

const MYSTERY_ID = 'coffee-pot';
const FILL_DURATION_MS = 700;
const DRAIN_DURATION_MS = 500;

type CupState = 'empty' | 'draining' | 'filling' | 'full';

/**
 * The liquid is a plain rectangle, clipped to the cup's silhouette, that
 * scales vertically from its own bottom edge — so it reads as a genuine
 * liquid level rising or falling inside the cup, anchored at the base,
 * rather than a block sliding in from underneath or fading uniformly.
 * `transformBox: 'fill-box'` makes the scale originate from the shape's
 * own bounding box instead of the SVG's outer viewport.
 */
function getLiquidStyle(cupState: CupState): CSSProperties {
  const base: CSSProperties = { transformOrigin: 'bottom', transformBox: 'fill-box' };
  switch (cupState) {
    case 'filling':
      // A gentle, symmetric ease — not the site's snappy `--ease-out`, which
      // front-loads most of its motion into the first fraction of its
      // duration. This one rises steadily across the whole pour.
      return { ...base, transform: 'scaleY(1)', transition: `transform ${FILL_DURATION_MS}ms ease-in-out` };
    case 'full':
      return { ...base, transform: 'scaleY(1)', transition: 'none' };
    case 'draining':
      return { ...base, transform: 'scaleY(0)', transition: `transform ${DRAIN_DURATION_MS}ms ease-in-out` };
    case 'empty':
    default:
      return { ...base, transform: 'scaleY(0)', transition: 'none' };
  }
}

/**
 * Click the pot, watch the cup fill — the level rises gradually from the
 * bottom. Clicking again after it's already full drains it the same way
 * in reverse (the level drops gradually, anchored at the base, never
 * spilling past the cup) before pouring a fresh one.
 */
export function CoffeePotMystery() {
  const { isFound, reveal } = useCuriosityGame();
  const [cupState, setCupState] = useState<CupState>('empty');
  const [open, setOpen] = useState(false);
  const found = isFound(MYSTERY_ID);
  const mystery = getMystery(MYSTERY_ID);

  const startPour = (rect: DOMRect) => {
    setCupState('filling');
    window.setTimeout(() => {
      setCupState('full');
      setOpen(true);
      if (!found) reveal(MYSTERY_ID, rect);
    }, FILL_DURATION_MS);
  };

  const handlePour = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (cupState === 'filling' || cupState === 'draining') return;
    const rect = event.currentTarget.getBoundingClientRect();

    if (cupState === 'full') {
      setOpen(false);
      setCupState('draining');
      window.setTimeout(() => startPour(rect), DRAIN_DURATION_MS);
    } else {
      startPour(rect);
    }
  };

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

        {/* Cup with an animated liquid level, clipped to the cup's silhouette */}
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <defs>
            <clipPath id="jana-cup-clip">
              <path d="M16 22h24l-2 20a5 5 0 0 1-5 4.5H23a5 5 0 0 1-5-4.5L16 22Z" />
            </clipPath>
          </defs>
          {/* Sized to match the cup's interior exactly, so scaleY(0) sits flush
              with the bottom and scaleY(1) fills flush with the rim — the
              level never overflows the cup or appears to come from beneath it. */}
          <rect
            x="16"
            y="22"
            width="24"
            height="24.5"
            fill="var(--accent-soft)"
            clipPath="url(#jana-cup-clip)"
            style={getLiquidStyle(cupState)}
          />
          <path
            d="M16 22h24l-2 20a5 5 0 0 1-5 4.5H23a5 5 0 0 1-5-4.5L16 22Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M40 25h3.5a4.5 4.5 0 0 1 0 9H41" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
          {cupState === 'full' && (
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