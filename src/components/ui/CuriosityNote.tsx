import { useEffect, useId, useRef, useState } from 'react';

interface CuriosityNoteProps {
  /** The little aside revealed on interaction. Keep it short. */
  note: string;
  /** Accessible label for the trigger, e.g. "Why ASP.NET Core?" */
  label: string;
  className?: string;
}

/**
 * A small "?" affordance that reveals a short aside — the site's main
 * "reward exploration without hiding important information" device.
 * Nothing essential is ever placed inside one of these; they're always
 * a bonus, never a requirement to understand the page.
 *
 * Hover/focus previews the note; a click or tap pins it open so touch
 * users (who have no hover state) can read it too. Clicking is
 * deliberately not a toggle against hover — otherwise a mouse user who
 * hovers, then clicks to "pin" it, would immediately close it again.
 */
export function CuriosityNote({ note, label, className = '' }: CuriosityNoteProps) {
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const noteId = useId();
  const open = hovering || pinned;

  // Clicking outside, or pressing Escape, un-pins the note.
  useEffect(() => {
    if (!pinned) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setPinned(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPinned(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [pinned]);

  return (
    <span ref={wrapperRef} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={noteId}
        aria-label={label}
        onClick={() => setPinned((prev) => !prev)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={() => setHovering(false)}
        className="curiosity-dot inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-colors"
        style={{
          borderColor: 'var(--border-strong)',
          color: 'var(--accent)',
          background: 'var(--bg-raised)',
        }}
      >
        ?
      </button>
      {/*
        Positioned with a physical `left` + `-translate-x-1/2` centering
        trick rather than logical `start`. Combining a logical inset with a
        physical transform fights itself under `dir="rtl"`. If this site is
        ever translated to Arabic, recompute this as a proper RTL-aware
        popover position instead of reusing this CSS-only centering trick.
      */}
      <span
        id={noteId}
        role="note"
        className="absolute left-1/2 top-full z-20 mt-2 w-56 max-w-[80vw] -translate-x-1/2 rounded-md border p-3 text-xs leading-relaxed shadow-lg transition-all duration-200"
        style={{
          background: 'var(--bg-raised)',
          borderColor: 'var(--border)',
          color: 'var(--ink-soft)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transform: open ? 'translate(-50%, 0)' : 'translate(-50%, -4px)',
          boxShadow: '0 10px 30px -12px hsl(var(--shadow-color) / 0.35)',
        }}
      >
        {note}
      </span>
    </span>
  );
}
