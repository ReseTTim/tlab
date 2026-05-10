import { get } from './common';

export const getShowsByTerm = async (query) => {
  return await get(`/search/shows?q=${encodeURIComponent(query)}`);
};

export const getSingleShowByTerm = async (query) => {
  return await get(`/singlesearch/shows?q=${encodeURIComponent(query)}`);
};

// Lookup a show by its external ID (e.g., IMDb or TheTVDB)
// TODO: create regex for id validation
export const getShowLookupById = async (id) => {
  if (id.startsWith('tt')) {
    return await get(`/lookup/shows?imdb=${id}`);
  }
  
  return await get(`/lookup/shows?thetvdb=${id}`);
};