import { get } from './common';

export const getAllShowsPerPage = async (pageIndex = 0) => {
  const page = Number.isInteger(pageIndex) && pageIndex > 0 ? `?page=${pageIndex}` : ""; 
  return await get(`/shows${page}`);
};

export const getShowById = async (id, params = null) => {
  if (!id || !Number.isInteger(id)) {
    throw new Error('Show ID is required');
  }

  const query = params ? `?${new URLSearchParams(params).toString()}` : '';
  return await get(`/shows/${id}${query}`);
};

export const getShowImage = async (id) => {
  return getShowById(id, `/images`);
}