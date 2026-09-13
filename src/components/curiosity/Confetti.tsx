import { useMemo } from 'react';

const COLORS = ['var(--accent)', 'var(--accent-2)', 'var(--accent-strong)'];
const EDGES = ['top', 'right', 'bottom', 'left'] as const;

interface Piece {
  id: number;
  left: string;
  top: string;
  dx: number;
  dy: number;
  size: number;
  delay: number;
  color: string;
}

function buildPieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const edge = EDGES[i % EDGES.length];
    const along = 10 + Math.random() * 80; // % position along that edge, avoiding corners
    const distance = 70 + Math.random() * 90;
    const size = 5 + Math.random() * 5;
    const delay = Math.random() * 150;
    const color = COLORS[i % COLORS.length];

    let left = '50%';
    let top = '50%';
    let dx = 0;
    let dy = 0;
    if (edge === 'top') {
      left = `${along}%`;
      top = '0%';
      dy = -distance;
    } else if (edge === 'bottom') {
      left = `${along}%`;
      top = '100%';
      dy = distance;
    } else if (edge === 'left') {
      left = '0%';
      top = `${along}%`;
      dx = -distance;
    } else {
      left = '100%';
      top = `${along}%`;
      dx = distance;
    }

    return { id: i, left, top, dx, dy, size, delay, color };
  });
}

/**
 * Bursts outward from the edges of its (relatively-positioned) parent,
 * rather than filling the whole viewport — the celebration modal is the
 * origin of the confetti, not a surface the confetti covers.
 */
export function Confetti({ count = 24 }: { count?: number }) {
  const pieces = useMemo(() => buildPieces(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={
            {
              left: piece.left,
              top: piece.top,
              width: `${piece.size}px`,
              height: `${piece.size * 0.4}px`,
              background: piece.color,
              animationDelay: `${piece.delay}ms`,
              '--confetti-dx': `${piece.dx}px`,
              '--confetti-dy': `${piece.dy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
