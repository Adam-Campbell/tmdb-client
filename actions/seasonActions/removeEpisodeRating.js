import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import { getHasSession } from '../../reducers/sessionReducer';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const removeEpisodeRatingOptimisticRequest = (showId, seasonNumber, episodeNumber, transactionId) => ({
    type: actionTypes.REMOVE_EPISODE_RATING_OPTIMISTIC_REQUEST,
    payload: {
        showId,
        seasonNumber,
        episodeNumber
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const removeEpisodeRatingSuccess = (transactionId) => ({
    type: actionTypes.REMOVE_EPISODE_RATING_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const removeEpisodeRatingFailed = (transactionId) => ({
    type: actionTypes.REMOVE_EPISODE_RATING_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const removeEpisodeRating = (showId, seasonNumber, episodeNumber) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        dispatch(removeEpisodeRatingFailed('User not logged in'));
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(removeEpisodeRatingOptimisticRequest(showId, seasonNumber, episodeNumber, transactionId));
        const response = await a.request(`api/show/${showId}/season/${seasonNumber}/rating`, {
            params: { episodeNumber },
            method: 'DELETE'
        });
        dispatch(removeEpisodeRatingSuccess(transactionId));
        toast.success('Episode rating successfully removed');
    } catch (error) {
        dispatch(removeEpisodeRatingFailed(error));
        toast.error(error.response.data);
    }
};
