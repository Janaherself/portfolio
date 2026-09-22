import { useMemo } from 'react';

// Deliberately more saturated/varied than the site's restrained palette —
// this is the one moment on the site allowed to be loud.
const COLORS = ['#e0562a', '#2f9c85', '#f2b705', '#e5539b', '#4d7fd8', '#8a3d09'];
const EDGES = ['top', 'right', 'bottom', 'left'] as const;

interface Piece {
  id: number;
  left: string;
  top: string;
  dx: number;
  dy: number;
  dxEnd: number;
  dyEnd: number;
  rotation: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  round: boolean;
}

function buildPieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => {
    const edge = EDGES[i % EDGES.length];
    const along = 5 + Math.random() * 90; // % position along that edge
    const distance = 90 + Math.random() * 140;
    const size = 7 + Math.random() * 8;
    const delay = Math.random() * 220;
    const duration = 900 + Math.random() * 500;
    const color = COLORS[i % COLORS.length];
    const round = i % 3 === 0;
    const rotation = 240 + Math.random() * 480;

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

    // A little extra "gravity" drop and outward drift on the second half
    // of the flight, so it reads as tumbling rather than sliding in a
    // straight line.
    const dxEnd = dx * 1.25;
    const dyEnd = dy + 60 + Math.random() * 50;

    return { id: i, left, top, dx, dy, dxEnd, dyEnd, rotation, size, delay, duration, color, round };
  });
}

/**
 * Bursts outward from the edges of its (relatively-positioned) parent,
 * rather than filling the whole viewport — the celebration modal is the
 * origin of the confetti, not a surface the confetti covers.
 */
export function Confetti({ count = 48 }: { count?: number }) {
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
              height: `${piece.size * 0.55}px`,
              background: piece.color,
              borderRadius: piece.round ? '999px' : '2px',
              animationDelay: `${piece.delay}ms`,
              animationDuration: `${piece.duration}ms`,
              '--confetti-dx': `${piece.dx}px`,
              '--confetti-dy': `${piece.dy}px`,
              '--confetti-dx-end': `${piece.dxEnd}px`,
              '--confetti-dy-end': `${piece.dyEnd}px`,
              '--confetti-rot': `${piece.rotation}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
