export interface Mystery {
  id: string;
  note: string;
}

export const mysteries: Mystery[] = [
  {
    id: 'coffee-pot',
    note: 'Hope you brought coffee with you cuz I\'m a HUGE fan ☕🪭',
  },
  {
    id: 'nav-logo',
    note: 'Jana.',
  },
  {
    id: 'hero-terminal',
    note: 'Terminal to me is like the friend you never meant to be friends with but is the closet one to you now 👭',
  },
  {
    id: 'skill-chip',
    note: 'REST',
  },
  {
    id: 'footer-mark',
    note: 'This is exactly how much i care about details!',
  },
];

export const MYSTERY_COUNT = mysteries.length;

export function getMystery(id: string): Mystery {
  const found = mysteries.find((mystery) => mystery.id === id);
  if (!found) {
    throw new Error(`Unknown mystery id: "${id}".`);
  }
  return found;
}
