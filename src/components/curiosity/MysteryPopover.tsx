import { useEffect } from 'react';

interface MysteryPopoverProps {
  open: boolean;
  onClose: () => void;
  text: string;
  /** Tailwind alignment classes for the popover box; override per-placement if needed. */
  align?: 'center' | 'start' | 'end';
}

/**
 * The reveal panel for a found mystery. Deliberately different from
 * `CuriosityNote` (the documentation asides on project cards): a ✦ mark
 * and the teal "accent-2" color instead of orange, so a visitor can tell
 * at a glance which kind of "?" they've run into.
 */
export function MysteryPopover({ open, onClose, text, align = 'center' }: MysteryPopoverProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const alignment =
    align === 'start'
      ? 'left-0 translate-x-0'
      : align === 'end'
        ? 'right-0 left-auto translate-x-0'
        : 'left-1/2 -translate-x-1/2';

  return (
    <div
      role="dialog"
      aria-label="A curiosity you found"
      className={`absolute top-full z-30 mt-3 w-64 max-w-[85vw] rounded-lg border p-4 text-left text-sm leading-relaxed shadow-xl ${alignment}`}
      style={{ background: 'var(--bg-raised)', borderColor: 'var(--accent-2)', color: 'var(--ink-soft)' }}
    >
      <p
        className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: 'var(--accent-2)' }}
      >
        <span aria-hidden="true">✦</span> found one
      </p>
      <p>{text}</p>
      <button
        type="button"
        onClick={onClose}
        className="mt-3 text-xs font-semibold underline underline-offset-2"
        style={{ color: 'var(--ink-faint)' }}
      >
        close
      </button>
    </div>
  );
}
