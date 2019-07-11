import { get } from './helpers';

export const getPopularPeople = async () => {
    const response = await get('person/popular');
    return response.data.results;
};

export const getPersonDetails = async (personId) => {
    const response = await get(`person/${personId}`, {
        append_to_response: 'combined_credits,images,external_ids'
    });
    return response.data;
}
