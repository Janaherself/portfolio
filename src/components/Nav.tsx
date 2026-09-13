import { useEffect, useRef, useState } from 'react';
import { Coffee, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { CuriosityMeter } from './curiosity/CuriosityMeter';
import { MysteryPopover } from './curiosity/MysteryPopover';
import { getMystery } from '../data/mysteries';
import { useCuriosityGame } from '../hooks/useCuriosityGame';
import { personal } from '../data/personal';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#approach', label: 'Approach' },
  { href: '#about', label: 'About' },
];

const LOGO_MYSTERY_ID = 'nav-logo';
const LOGO_CLICK_WINDOW_MS = 2000;
const LOGO_CLICKS_NEEDED = 3;

/**
 * The logo still behaves like a normal "back to top" link on every click.
 * Click it three times within two seconds, though, and it also reveals a
 * hidden curiosity — a small "extraordinary" hiding spot that doesn't
 * interfere with its everyday job.
 */
function Logo() {
  const { isFound, reveal } = useCuriosityGame();
  const [open, setOpen] = useState(false);
  const clickCountRef = useRef(0);
  const resetTimeoutRef = useRef<number | undefined>(undefined);
  const mystery = getMystery(LOGO_MYSTERY_ID);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    clickCountRef.current += 1;
    window.clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
    }, LOGO_CLICK_WINDOW_MS);

    if (clickCountRef.current >= LOGO_CLICKS_NEEDED) {
      clickCountRef.current = 0;
      setOpen(true);
      if (!isFound(LOGO_MYSTERY_ID)) {
        reveal(LOGO_MYSTERY_ID, event.currentTarget.getBoundingClientRect());
      }
    }
  };

  return (
    <span className="relative inline-flex">
      <a
        href="#top"
        onClick={handleClick}
        className="flex items-center gap-2 font-display text-lg font-semibold"
        aria-label={`${personal.name} — back to top`}
      >
        <Coffee className="h-5 w-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
        {personal.name}
      </a>
      <MysteryPopover open={open} onClose={() => setOpen(false)} text={mystery.note} align="start" />
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu if the viewport grows back to desktop size.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ borderColor: 'var(--border)', background: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="ink-link text-sm font-medium"
              style={{ color: 'var(--ink-soft)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CuriosityMeter />
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-raised)' }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="flex flex-col gap-1 border-t px-5 py-4 md:hidden"
          style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
              style={{ color: 'var(--ink)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
