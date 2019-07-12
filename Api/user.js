import { get, a } from './helpers';
import api_key from '../apiKey';

export const fetchUserSummary = async (session_id) => {
    const response = await get('account', { session_id });
    return response.data;
}

export const postFavourite = (media_type, media_id, favorite, accountId, session_id) => {
    return a.request(`account/${accountId}/favorite`, {
        params: {
            api_key,
            session_id
        },
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
            media_type,
            media_id,
            favorite
        }
    });
}