export interface Mystery {
  id: string;
  /**
   * The actual trivia/thought revealed when found. Replace every
   * PLACEHOLDER below with something real and specific — a strong
   * opinion, a funny debugging story, an actual habit. Keep each one
   * short enough to read in a few seconds.
   */
  note: string;
}

/**
 * Exactly 5 hidden "curiosities" scattered around the site. Each id here
 * must correspond to exactly one MysteryTrigger / mystery mechanic placed
 * in a component (see README's "the curiosity game" section for the map
 * of which id lives where).
 */
export const mysteries: Mystery[] = [
  {
    id: 'coffee-pot',
    note: 'PLACEHOLDER — pour-the-coffee note. e.g. a real fact about your coffee habit, or the actual reason it shows up on the site at all.',
  },
  {
    id: 'nav-logo',
    note: 'PLACEHOLDER — logo note. e.g. why you picked a coffee cup as your mark, or something about how you approach branding yourself.',
  },
  {
    id: 'hero-terminal',
    note: 'PLACEHOLDER — terminal note. e.g. a real "why does this break every third request" story from an actual bug you chased.',
  },
  {
    id: 'skill-chip',
    note: 'PLACEHOLDER — skill note. e.g. an honest opinion about REST APIs, or the moment you actually learned this the hard way.',
  },
  {
    id: 'footer-mark',
    note: 'PLACEHOLDER — footer note. e.g. something small and human, the kind of thing that only shows up if someone reads all the way to the bottom.',
  },
];

export const MYSTERY_COUNT = mysteries.length;

export function getMystery(id: string): Mystery {
  const found = mysteries.find((mystery) => mystery.id === id);
  if (!found) {
    throw new Error(`Unknown mystery id: "${id}". Add it to src/data/mysteries.ts first.`);
  }
  return found;
}
