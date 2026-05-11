import { defineStore } from 'pinia';
import storageHelper from '@/helpers/localStorageHelper';
import { highestRatingFirst, sortShows, SORTERS } from '@/helpers/showHelper';

import { getAllShowsPerPage, getShowById } from '@/api/tvmaze/shows';
import { getShowsByTerm } from '@/api/tvmaze/search';

const storage = new storageHelper();
const ttl = 24 * 60 * 60 * 1000; // Cache for 24 hours

export const useShowsStore = defineStore('shows', {
  state: () => ({
    isLoading: false,
    shows: [],
    singleShow: null,
    results: [],
    sortBy: 'highestRating',
    genres: [],
  }),
  getters: {
    currentShow: (state) => {
      return (id) => {
        if (id && state.singleShow?.id === id) {
          return state.singleShow;
        }
        return state.shows.find((show) => show.id === id) || null;
      };
    },
    byGenre: (state) => {
      return (genre, sortBy) => {
        return sortShows(
          state.shows.filter(show => show.genres.includes(genre))
          , sortBy || state.sortBy);
      }
    },
    showsWithSameGenre: (state) => {
      const sortBy = 'highestRating';

      return function ({ id, genres }) {
        const maxRelatedShows = 10;
        const relatedShows = new Map();

        for (const genre of genres || []) {
          const shows = this.byGenre(genre, sortBy).filter((show) => show.id !== id);

          for (const show of shows) {
            // Only add unique show  
            if (!relatedShows.has(show.id)) {
              relatedShows.set(show.id, show);
            }

            if (relatedShows.size >= maxRelatedShows) {
              // Max related shows is reached, no reason to collect from other genre
              break;
            }
          }

          if (relatedShows.size >= maxRelatedShows) {
            // Max related shows is reached
            break;
          }
        }

        // sort complete collection
        return sortShows([...relatedShows.values()], sortBy);
      };
    },
  },
  actions: {
    async loadInitialShows() {
      // sync with local storage to minimize API calls and improve performance
      const cached = this.collectCache();
      if (cached) {
        return;
      }

      const shows = await getAllShowsPerPage();
      storage.setWithExpiry('shows', shows, ttl);

      this.shows = shows;

      this.shows.forEach((show) => {
        this.updateGenres(show?.genres || []);
      });
    },
    async getSingleShowById(id) {
      const cacheRoute = `/show/${id}`;
      const cachedShow = storage.get(cacheRoute);
      if (cachedShow) {
        this.singleShow = cachedShow;
        return;
      }

      const show = await getShowById(id);
      if (show) {
        this.singleShow = show;
        this.updateGenres(show?.genres || []);
        // update local storage cache with the new show added
        storage.setWithExpiry(cacheRoute, show, ttl);
      }
    },
    async getShowsByQuery(query) {
      this.isLoading = true;

      const cacheRoute = `/search/${query}`;
      const cachedQuery = storage.get(cacheRoute);
      if (cachedQuery) {
        this.results = cachedQuery;
        this.isLoading = false;
        return;
      }

      const results = await getShowsByTerm(query);
      if (results) {
        const r = [];
        results.forEach(result => r.push({...result.show, score: result.score}));
        this.results = r;
        this.isLoading = false;
        // update local storage cache with the new show added
        storage.setWithExpiry(cacheRoute, r, ttl);
      }
    },
    updateGenres (genres) {
      if (!genres || !Array.isArray(genres) || genres.length === 0) {
        return;
      }
      // set genres for filtering
      const genresSet = new Set(this.genres);
      genres.forEach((genre) => {
        // avoid duplicates in genres list
        if (!genresSet.has(genre)) {
          genresSet.add(genre);
        }
      });

      this.genres = Array.from(genresSet).sort(); 
      storage.setWithExpiry('genres', this.genres, ttl);
    },
    collectCache () {
      const cachedShows = storage.get('shows');
      if (cachedShows) {
        this.shows = cachedShows;

        const cachedGenres = storage.get('genres');
        if (cachedGenres) {
          this.genres = cachedGenres;
        }

        return true;
      }

      return false;
    },
    updateSortBy (sort) {
      if (!Object.keys(SORTERS).includes(sort)) {
        // sorting type does not exists, don't change
        return;
      }

      this.sortBy = sort;
    }
  },
});