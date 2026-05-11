import { describe, expect } from 'vitest';

import { sortShows } from './showHelper';

const mockShows = [
  {
    id: 1,
    name: 'Dark',
    genres: ['Drama', 'Sci-Fi'],
    summary: 'German mystery thriller',
    rating: {
      average: 9,
    },
  },
  {
    id: 2,
    name: 'Breaking Bad',
    genres: ['Drama'],
    summary: 'Chemistry teacher becomes criminal',
    rating: {
      average: 10,
    },
  },
  {
    id: 3,
    name: 'The Witcher',
    genres: ['Fantasy', 'Drama'],
    summary: 'Monster hunter fantasy story',
    rating: {
      average: 8,
    },
  },
  {
    id: 4,
    name: 'Arcane',
    genres: ['Fantasy'],
    summary: 'Animated fantasy drama',
    rating: {
      average: 9.5,
    },
  },
];

describe('showHelper', () => {
  it('Returns shows sorted by highest rating', () => {
    const results = sortShows(mockShows, 'highestRating');

    expect(results[0].name).toBe('Breaking Bad');
    expect(results[1].name).toBe('Arcane');
  });

  it('Returns shows sorted by alphabetical', () => {
    const results = sortShows(mockShows, 'alphabetical');

    expect(results[0].name).toBe('Arcane');
    expect(results[1].name).toBe('Breaking Bad');
  });

  it('Returns shows unsorted', () => {
    const results = sortShows(mockShows, 'none');

    expect(results[0].name).toBe('Dark');
    expect(results[1].name).toBe('Breaking Bad');
  });
});