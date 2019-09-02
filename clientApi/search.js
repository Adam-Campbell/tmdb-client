import { get } from '../axiosClient';

export const getSearchResults = async (searchQuery, searchCategory = 'movie') => {
    const response = await get(`api/search/${searchCategory}`, {
        query: searchQuery
    });
    return response.data;
};
