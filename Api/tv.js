import { get, a } from './helpers';
import api_key from '../apiKey';

// export const getPopularTV = async (page = 1) => {
//     const response = await get('tv/popular', { page });
//     return response.data.results;
// };

// export const getTopRatedTV = async (page = 1) => {
//     const response = await get('tv/top_rated', { page });
//     return response.data.results;
// };

// export const getOnAirTV = async (page = 1) => {
//     const response = await get('tv/on_the_air', { page });
//     return response.data.results;
// };

// export const getAiringTodayTV = async (page = 1) => {
//     const response = await get('tv/airing_today', { page });
//     return response.data.results;
// };

// export const getShowDetails = async (showId, session_id) => {
//     if (session_id) {
//         const response = await get(`tv/${showId}`, {
//             append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords,account_states',
//             session_id
//         });
//         return response.data;
//     } else {
//         const response = await get(`tv/${showId}`, {
//             append_to_response: 'credits,images,recommendations,similar,reviews,external_ids,keywords'
//         });
//         return response.data;
//     }
// };

// export const postShowRating = (rating, showId, session_id) => {
//     return a.request(`tv/${showId}/rating`, {
//         params: {
//             api_key,
//             session_id
//         },
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         data: {
//             value: rating
//         }
//     });
// };

// export const deleteShowRating = (showId, session_id) => {
//     return a.request(`tv/${showId}/rating`, {
//         params: {
//             api_key,
//             session_id
//         },
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'DELETE',
//     });
// };
