import { get, a } from './helpers';
import api_key from '../apiKey';

// export const getSeasonDetails = async (showId, seasonNumber, session_id) => {
//     if (session_id) {
//         const response = await get(`tv/${showId}/season/${seasonNumber}`, {
//             append_to_response: 'credits,images,account_states',
//             session_id
//         });
//         return response.data;
//     } else {
//         const response = await get(`tv/${showId}/season/${seasonNumber}`, {
//             append_to_response: 'credits,images'
//         });
//         return response.data;
//     }
// }

export const postEpisodeRating = async (showId, seasonNumber, episodeNumber, rating, session_id) => {
    return a.request(`tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating`, {
        params: {
            api_key,
            session_id,
        },
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
            value: rating
        }
    });
};

export const deleteEpisodeRating = async (showId, seasonNumber, episodeNumber, session_id) => {
    return a.request(`tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}/rating`, {
        params: {
            api_key,
            session_id,
        },
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    });
}