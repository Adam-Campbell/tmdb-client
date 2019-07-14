import { get, a } from './helpers';
import api_key from '../apiKey';

export const fetchUserSummary = async (session_id) => {
    const response = await get('account', { session_id });
    return response.data;
}

/**
 * Add or remove an item from the users favourites list.
 * @param {String} media_type - either 'movie' or 'tv' 
 * @param {Number} media_id - the id of the movie or tv show 
 * @param {Boolean} favorite - if true the request will add the item to the favourites list,
 * otherwise it will remove it
 * @param {Number} accountId - the users account id 
 * @param {String} session_id - the users session id 
 */
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
};

/**
 * Add or remove an item from the users watchlist
 * @param {String} media_type - either 'movie' or 'tv' 
 * @param {Number} media_id - the id of the movie or tv show 
 * @param {Boolean} watchlist - if true the request will add the item to the watchlist,
 * otherwise it will remove it
 * @param {Number} accountId - the users account id 
 * @param {String} session_id - the users session id 
 */
export const postWatchlist = (media_type, media_id, watchlist, accountId, session_id) => {
    return a.request(`account/${accountId}/watchlist`, {
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
            watchlist
        }
    });
};

