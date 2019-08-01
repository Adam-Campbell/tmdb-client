import { get, a } from './helpers';
import api_key from '../apiKey';

export const getPopularMovies = async () => {
    const response = await get('movie/popular');
    return response.data.results;
}

export const getTopRatedMovies = async () => {
    const response = await get('movie/top_rated');
    return response.data.results;
}

export const getUpcomingMovies = async () => {
    const response = await get('movie/upcoming', { region: 'GB' });
    return response.data.results;
}

export const getNowPlayingMovies = async () => {
    const response = await get('movie/now_playing');
    return response.data.results;
};

export const getMovieDetails = async (movieId, session_id) => {
    if (session_id) {
        const response = await get(`movie/${movieId}`, {
            append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords,account_states,lists',
            session_id
        });
        return response.data;
    } else {
        const response = await get(`movie/${movieId}`, {
            append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords,lists',
        });
        return response.data;
    }
}

export const postMovieRating = (rating, movieId, session_id) => {
    return a.request(`movie/${movieId}/rating`, {
        params: {
            api_key,
            session_id
        },
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
            value: rating
        }
    });
}

export const deleteMovieRating = (movieId, session_id) => {
    return a.request(`movie/${movieId}/rating`, {
        params: {
            api_key,
            session_id
        },
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
    });
}