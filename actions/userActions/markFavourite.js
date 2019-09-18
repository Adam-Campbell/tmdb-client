import * as actionTypes from '../../actionTypes';
import { getHasSession } from '../../reducers/sessionReducer';
import { getUserId } from '../../reducers/user';
import { a } from '../../axiosClient';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const markFavouriteOptimisticRequest = (id, mediaType, isMarking, transactionId) => ({
    type: actionTypes.MARK_FAVOURITE_OPTIMISTIC_REQUEST,
    payload: {
        id,
        mediaType,
        isMarking
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const markFavouriteSuccess = (transactionId) => ({
    type: actionTypes.MARK_FAVOURITE_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const markFavouriteFailed = (transactionId) => ({
    type: actionTypes.MARK_FAVOURITE_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const markFavourite = (mediaType, mediaId, isFavouriting) => async (dispatch, getState) => {
    const state = getState();
    const accountId = getUserId(state);
    if (!getHasSession(state)) {
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(markFavouriteOptimisticRequest(mediaId, mediaType, isFavouriting, transactionId));
        const response = await a.request(`api/user/${accountId}/favorite`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            method: 'POST',
            data: {
                mediaType,
                mediaId,
                isFavouriting
            }
        });
        dispatch(markFavouriteSuccess(transactionId));
        const mediaTypeDescription = mediaType === 'movie' ? 'Movie' : 'TV show';
        const actionDescription = isFavouriting ? 'added to' : 'removed from';
        toast.success(`${mediaTypeDescription} successfully ${actionDescription} favourites`);
    } catch (error) {
        dispatch(markFavouriteFailed(transactionId));
        toast.error(error.response.data);
    }
};
