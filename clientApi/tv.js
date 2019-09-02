import { get } from '../axiosClient';

export const getPopularTV = async (page = 1) => {
    const response = await get('api/tv/popular', { page });
    return response.data;
};

export const getTopRatedTV = async (page = 1) => {
    const response = await get('api/tv/top-rated', { page });
    return response.data;
};

export const getOnAirTV = async (page = 1) => {
    const response = await get('api/tv/on-air', { page });
    return response.data;
};

export const getAiringTodayTV = async (page = 1) => {
    const response = await get('api/tv/airing-today', { page });
    return response.data;
};
