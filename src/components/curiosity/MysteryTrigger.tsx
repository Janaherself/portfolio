import { useState, type ReactNode } from 'react';
import { getMystery } from '../../data/mysteries';
import { useCuriosityGame } from '../../hooks/useCuriosityGame';
import { MysteryPopover } from './MysteryPopover';

interface MysteryTriggerProps {
  /** Must match an id in src/data/mysteries.ts. */
  id: string;
  /** Accessible name for the trigger button. Keep it a genuine hint, not a giveaway. */
  label: string;
  children: ReactNode;
  className?: string;
  align?: 'center' | 'start' | 'end';
}

/**
 * Wraps any element (a chip, a mark, a whole component) in a click target
 * that reveals one of the site's 5 hidden curiosities the first time it's
 * clicked, and just reopens the same note on later clicks. Use this for
 * anything that doesn't need its own bespoke animation — the coffee pot
 * is the one exception with a dedicated component, since it has its own
 * fill animation before the note appears.
 */
export function MysteryTrigger({ id, label, children, className = '', align = 'center' }: MysteryTriggerProps) {
  const { isFound, reveal } = useCuriosityGame();
  const [open, setOpen] = useState(false);
  const mystery = getMystery(id);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const alreadyFound = isFound(id);
    setOpen((prev) => !prev);
    if (!alreadyFound) {
      reveal(id, event.currentTarget.getBoundingClientRect());
    }
  };

  return (
    <span className={`relative inline-flex ${className}`}>
      <button type="button" onClick={handleClick} aria-expanded={open} aria-label={label} className="flex w-full text-left">
        {children}
      </button>
      <MysteryPopover open={open} onClose={() => setOpen(false)} text={mystery.note} align={align} />
    </span>
  );
}
