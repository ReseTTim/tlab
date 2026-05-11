import { beforeEach, describe, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { useShowsStore } from '@/stores/shows';

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

describe('Shows store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Returns shows sorted by highest rating', () => {
    const store = useShowsStore();

    store.shows = mockShows;

    const results = store.byGenre('Drama');

    expect(results[0].name).toBe('Breaking Bad');
    expect(results[1].name).toBe('Dark');
  });

  it('Returns related shows without show duplications', () => {
    const store = useShowsStore();

    store.shows = mockShows;

    const related = store.showsWithSameGenre({
      id: 3,
      genres: ['Fantasy', 'Drama'],
    });

    const ids = related.map(show => show.id);

    expect(ids).toContain(1);
    expect(ids).toContain(2);
    expect(ids).toContain(4);

    // ensure unique ids only
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Does not include current show in related results', () => {
    const store = useShowsStore();

    store.shows = mockShows;

    const related = store.showsWithSameGenre({
      id: 1,
      genres: ['Drama'],
    });

    const ids = related.map(show => show.id);

    expect(ids).not.toContain(1);
  });

  it('Updates genres without duplicates', () => {
    const store = useShowsStore();

    store.updateGenres(['Drama', 'Fantasy']);
    store.updateGenres(['Drama', 'Sci-Fi']);

    expect(store.genres).toEqual([
      'Drama',
      'Fantasy',
      'Sci-Fi',
    ]);
  });

  it('Returns singleShow when matching current id', () => {
    const store = useShowsStore();

    store.singleShow = mockShows[0];

    const result = store.currentShow(1);

    expect(result.name).toBe('Dark');
  });

  it('Falls back to shows collection when singleShow does not match', () => {
    const store = useShowsStore();

    store.singleShow = mockShows[0];
    store.shows = mockShows;

    const result = store.currentShow(2);

    expect(result.name).toBe('Breaking Bad');
  });
});