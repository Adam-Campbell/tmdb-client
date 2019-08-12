import { get } from './helpers';

export const getPopularMovies = async (page = 1) => {
    const response = await get('api/movies/popular', { page });
    return response.data;
}

export const getTopRatedMovies = async (page = 1) => {
    const response = await get('api/movies/top-rated', { page });
    return response.data;
}

export const getUpcomingMovies = async (page = 1) => {
    const response = await get('api/movies/upcoming', { region: 'GB', page });
    return response.data.results;
}

export const getNowPlayingMovies = async (page = 1) => {
    const response = await get('api/movies/now-playing', { page });
    return response.data.results;
};