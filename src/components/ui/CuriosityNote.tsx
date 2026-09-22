import { useEffect, useId, useRef, useState } from 'react';

interface CuriosityNoteProps {
  note: string;
  label: string;
  className?: string;
}

export function CuriosityNote({ note, label, className = '' }: CuriosityNoteProps) {
  const [hovering, setHovering] = useState(false);
  const [pinned, setPinned] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const noteId = useId();
  const open = hovering || pinned;

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

      <span
        id={noteId}
        role="note"
        className="absolute left-1/2 top-full z-20 mt-2 w-64 max-w-[80vw] -translate-x-1/2 rounded-md border p-3 text-xs leading-relaxed shadow-lg transition-all duration-200"
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
        <span className="mb-1.5 block font-semibold" style={{ color: 'var(--ink)' }}>
          {label}
        </span>
        {note}
      </span>
    </span>
  );
}
