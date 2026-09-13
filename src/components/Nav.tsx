import { useEffect, useState } from 'react';
import { Coffee, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ui/ThemeToggle';
import { personal } from '../data/personal';

const NAV_LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#approach', label: 'Approach' },
  { href: '#about', label: 'About' },
];

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
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-semibold"
          aria-label={`${personal.name} — back to top`}
        >
          <Coffee className="h-5 w-5" style={{ color: 'var(--accent)' }} aria-hidden="true" />
          {personal.name}
        </a>

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
