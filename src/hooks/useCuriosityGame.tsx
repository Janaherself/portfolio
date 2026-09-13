import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { MYSTERY_COUNT } from '../data/mysteries';

const STORAGE_KEY = 'jana-curiosity-progress';

interface StoredProgress {
  foundIds: string[];
  hasSeenIntro: boolean;
  hasSeenCompletion: boolean;
}

const EMPTY_PROGRESS: StoredProgress = { foundIds: [], hasSeenIntro: false, hasSeenCompletion: false };

function loadProgress(): StoredProgress {
  if (typeof window === 'undefined') return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    return {
      foundIds: Array.isArray(parsed.foundIds) ? parsed.foundIds : [],
      hasSeenIntro: Boolean(parsed.hasSeenIntro),
      hasSeenCompletion: Boolean(parsed.hasSeenCompletion),
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

/**
 * Flies a small dot from wherever a mystery was found to the curiosity
 * meter in the header — the "collect the coin" feedback. Implemented as
 * a plain DOM element outside React, since it's a one-off fire-and-forget
 * animation, not part of the render tree. Skipped entirely under
 * prefers-reduced-motion; the meter's own pulse is feedback enough then.
 */
function flyToMeter(originRect: DOMRect, meterEl: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const meterRect = meterEl.getBoundingClientRect();
  const startX = originRect.left + originRect.width / 2;
  const startY = originRect.top + originRect.height / 2;
  const dx = meterRect.left + meterRect.width / 2 - startX;
  const dy = meterRect.top + meterRect.height / 2 - startY;

  const dot = document.createElement('span');
  dot.textContent = '✦';
  Object.assign(dot.style, {
    position: 'fixed',
    left: `${startX}px`,
    top: `${startY}px`,
    fontSize: '18px',
    lineHeight: '1',
    color: 'var(--accent-2)',
    zIndex: '200',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition: 'transform 650ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease-in',
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(dot);

  requestAnimationFrame(() => {
    dot.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.35)`;
    dot.style.opacity = '0.15';
  });

  window.setTimeout(() => dot.remove(), 700);
}

interface CuriosityGameValue {
  total: number;
  foundCount: number;
  isFound: (id: string) => boolean;
  /** Call when a mystery is discovered. Pass the trigger's bounding rect for the fly-to-header animation. */
  reveal: (id: string, originRect?: DOMRect) => void;
  isComplete: boolean;
  hasSeenIntro: boolean;
  dismissIntro: () => void;
  /** Attach to the header meter button so `reveal` knows where to fly dots to. */
  meterRef: RefObject<HTMLButtonElement | null>;
  /** Increments every time something is found; components can key off this to trigger a pulse animation. */
  pulseKey: number;
  celebration: 'none' | 'full' | 'recap';
  /** Reopens the (lightweight) celebration recap — only works once the game is already complete. */
  openRecap: () => void;
  closeCelebration: () => void;
}

const CuriosityGameContext = createContext<CuriosityGameValue | undefined>(undefined);

export function CuriosityGameProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<StoredProgress>(loadProgress);
  const [pulseKey, setPulseKey] = useState(0);
  const [celebration, setCelebration] = useState<'none' | 'full' | 'recap'>('none');
  const meterRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const isFound = useCallback((id: string) => progress.foundIds.includes(id), [progress.foundIds]);

  const reveal = useCallback((id: string, originRect?: DOMRect) => {
    setProgress((prev) => (prev.foundIds.includes(id) ? prev : { ...prev, foundIds: [...prev.foundIds, id] }));
    setPulseKey((key) => key + 1);
    if (originRect && meterRef.current) flyToMeter(originRect, meterRef.current);
  }, []);

  const isComplete = progress.foundIds.length >= MYSTERY_COUNT;

  // Fire the full celebration exactly once, the first time the last mystery lands.
  useEffect(() => {
    if (!isComplete || progress.hasSeenCompletion) return;
    const timeout = window.setTimeout(() => {
      setCelebration('full');
      setProgress((prev) => ({ ...prev, hasSeenCompletion: true }));
    }, 750); // let the fly-to-header animation land first
    return () => window.clearTimeout(timeout);
  }, [isComplete, progress.hasSeenCompletion]);

  const dismissIntro = useCallback(() => {
    setProgress((prev) => ({ ...prev, hasSeenIntro: true }));
  }, []);

  const openRecap = useCallback(() => {
    setCelebration((current) => (isComplete ? 'recap' : current));
  }, [isComplete]);

  const closeCelebration = useCallback(() => setCelebration('none'), []);

  const value = useMemo<CuriosityGameValue>(
    () => ({
      total: MYSTERY_COUNT,
      foundCount: progress.foundIds.length,
      isFound,
      reveal,
      isComplete,
      hasSeenIntro: progress.hasSeenIntro,
      dismissIntro,
      meterRef,
      pulseKey,
      celebration,
      openRecap,
      closeCelebration,
    }),
    [progress, isFound, reveal, isComplete, dismissIntro, pulseKey, celebration, openRecap, closeCelebration],
  );

  return <CuriosityGameContext.Provider value={value}>{children}</CuriosityGameContext.Provider>;
}

export function useCuriosityGame(): CuriosityGameValue {
  const context = useContext(CuriosityGameContext);
  if (!context) {
    throw new Error('useCuriosityGame must be used within a CuriosityGameProvider');
  }
  return context;
}
