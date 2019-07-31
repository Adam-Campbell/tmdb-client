import { get, a } from './helpers';
import api_key from '../apiKey';

export function postList(session_id, name = '', description = '', language = '') {
    return a.request('list', {
        params: {
            api_key,
            session_id
        },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            name,
            description,
            language
        }
    });
}

export function getListDetails(listId) {
    return get(`list/${listId}`);
}

export function deleteUserList(listId, session_id) {
    return a.request(`list/${listId}`, {
        params: {
            api_key,
            session_id
        },
        method: 'DELETE'
    });
}

export function postListMovie(listId, media_id, session_id) {
    return a.request(`list/${listId}/add_item`, {
        params: {
            api_key,
            session_id
        },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            media_id
        }
    });
}

export function postRemoveListMovie(listId, media_id, session_id) {
    return a.request(`list/${listId}/remove_item`, {
        params: {
            api_key,
            session_id
        },
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            media_id
        }
    });
}

export function postClearList(listId, session_id) {
    return a.request(`list/${listId}/clear`, {
        params: {
            api_key,
            session_id,
            confirm: true
        },
        method: 'POST'
    });
}

