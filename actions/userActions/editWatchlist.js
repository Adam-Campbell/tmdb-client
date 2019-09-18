import * as actionTypes from '../../actionTypes';
import { getHasSession } from '../../reducers/sessionReducer';
import { getUserId } from '../../reducers/user';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const editWatchlistOptimisticRequest = (id, mediaType, isAdding, transactionId) => ({
    type: actionTypes.EDIT_WATCHLIST_OPTIMISTIC_REQUEST,
    payload: {
        id,
        mediaType,
        isAdding
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const editWatchlistSuccess = (transactionId) => ({
    type: actionTypes.EDIT_WATCHLIST_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const editWatchlistFailed = (transactionId) => ({
    type: actionTypes.EDIT_WATCHLIST_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const editWatchlist = (mediaType, mediaId, isAdding) => async (dispatch, getState) => {
    const state = getState();
    const accountId = getUserId(state);
    if (!getHasSession(state)) {
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(editWatchlistOptimisticRequest(mediaId, mediaType, isAdding, transactionId));
        const response = await a.request(`api/user/${accountId}/watchlist`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                mediaType,
                mediaId,
                isAdding
            }
        });
        dispatch(editWatchlistSuccess(transactionId));
        const mediaTypeDescription = mediaType === 'movie' ? 'Movie' : 'TV show';
        const actionDescription = isAdding ? 'added to' : 'removed from';
        toast.success(`${mediaTypeDescription} successfully ${actionDescription} watchlist`);
    } catch (error) {
        dispatch(editWatchlistFailed(transactionId));
        toast.error(error.response.data);
    }
};
