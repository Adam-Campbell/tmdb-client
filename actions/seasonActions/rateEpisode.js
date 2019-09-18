import * as actionTypes from '../../actionTypes';
import { a } from '../../axiosClient';
import { getHasSession } from '../../reducers/sessionReducer';
import toast from '../../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const rateEpisodeOptimisticRequest = (rating, showId, seasonNumber, episodeNumber, transactionId) => ({
    type: actionTypes.RATE_EPISODE_OPTIMISTIC_REQUEST,
    payload: {
        rating,
        showId,
        seasonNumber, 
        episodeNumber
    },
    optimist: {
        type: BEGIN,
        id: transactionId
    }
});

const rateEpisodeSuccess = (transactionId) => ({
    type: actionTypes.RATE_EPISODE_SUCCESS,
    optimist: {
        type: COMMIT,
        id: transactionId
    }
});

const rateEpisodeFailed = (transactionId) => ({
    type: actionTypes.RATE_EPISODE_FAILED,
    optimist: {
        type: REVERT,
        id: transactionId
    }
});

export const rateEpisode = (showId, seasonNumber, episodeNumber, rating) => async (dispatch, getState) => {
    const state = getState();
    if (!getHasSession(state)) {
        toast.error('Login required to perform this action');
        return;
    }
    const transactionId = Date.now();
    try {
        dispatch(rateEpisodeOptimisticRequest(
            rating, 
            showId, 
            seasonNumber, 
            episodeNumber,
            transactionId
        ));
        const response = await a.request(`api/show/${showId}/season/${seasonNumber}/rating`, {
            params: {
                episodeNumber,
                rating
            },
            method: 'POST'
        });
        dispatch(rateEpisodeSuccess(transactionId));
        toast.success('Episode successfully rated');
    } catch (error) {
        dispatch(rateEpisodeFailed(transactionId));
        toast.error(error.response.data);
    }
};
