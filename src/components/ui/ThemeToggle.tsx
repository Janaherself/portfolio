import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:opacity-80"
      style={{ borderColor: 'var(--border-strong)', background: 'var(--bg-raised)' }}
    >
      <Sun
        className="absolute h-[18px] w-[18px] transition-all duration-300"
        style={{
          color: 'var(--accent)',
          opacity: isDark ? 0 : 1,
          transform: isDark ? 'rotate(-90deg) scale(0.5)' : 'rotate(0) scale(1)',
        }}
        aria-hidden="true"
      />
      <Moon
        className="absolute h-[18px] w-[18px] transition-all duration-300"
        style={{
          color: 'var(--accent)',
          opacity: isDark ? 1 : 0,
          transform: isDark ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0.5)',
        }}
        aria-hidden="true"
      />
    </button>
  );
}
