import { defineStore } from 'pinia';
import storageHelper from '@/helpers/localStorageHelper';
import { highestRatingFirst } from '@/helpers/showHelper';

import { getAllShowsPerPage, getShowById } from '@/api/tvmaze/shows';

const storage = new storageHelper();
const ttl = 24 * 60 * 60 * 1000; // Cache for 24 hours

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [],
    singleShow: null,
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
      return (genre) => {
        return state.shows
          .filter(show => show.genres.includes(genre))
          .sort(highestRatingFirst);
      }
    },
    searchResults: (state) => {
      const matchTerm = (term, show) => {
        return show.name.toLowerCase().includes(term)
        || new Set(show.genres).has(term)
        || show.summary.toLowerCase().includes(term);
      };

      return (term) => {
        return state.shows
          .filter(show => matchTerm(term, show))
          .sort(highestRatingFirst);
      }
    },
    showsWithSameGenre: (state) => {
      return function ({ id, genres }) {
        const maxRelatedShows = 10;
        const relatedShows = new Map();

        for (const genre of genres || []) {
          const shows = this.byGenre(genre).filter((show) => show.id !== id);

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

        return [...relatedShows.values()];
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
  },
});