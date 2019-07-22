import { get } from './helpers'

export const getSeasonDetails = async (showId, seasonNumber, session_id) => {
    if (session_id) {
        const response = await get(`tv/${showId}/season/${seasonNumber}`, {
            append_to_response: 'credits,images,account_states',
            session_id
        });
        return response.data;
    } else {
        const response = await get(`tv/${showId}/season/${seasonNumber}`, {
            append_to_response: 'credits,images'
        });
        return response.data;
    }
}
