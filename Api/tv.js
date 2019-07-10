import { get } from './helpers';

export const getPopularTV = async () => {
    const response = await get('tv/popular');
    return response.data.results;
};

export const getTopRatedTV = async () => {
    const response = await get('tv/top_rated');
    return response.data.results;
};

export const getOnAirTV = async () => {
    const response = await get('tv/on_the_air');
    return response.data.results;
};

export const getAiringTodayTV = async () => {
    const response = await get('tv/airing_today');
    return response.data.results;
};

export const getShowDetails = async (showId) => {
    const response = await get(`tv/${showId}`, {
        append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords'
    });
    return response.data;
}
