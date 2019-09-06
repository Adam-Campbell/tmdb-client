import * as actionTypes from '../actionTypes';
import { getSeasonIdentifiers, getSeasonData } from '../reducers/seasonReducer';
import { getHasSession } from '../reducers/sessionReducer';
import { a } from '../axiosClient';
import toast from '../toast';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';

const fetchSeasonRequest = () => ({
    type: actionTypes.FETCH_SEASON_REQUEST
});

const fetchSeasonSuccess = (data, showId, seasonNumber) => ({
    type: actionTypes.FETCH_SEASON_SUCCESS,
    payload: {
        data,
        showId,
        seasonNumber
    }
});

const fetchSeasonFailed = (error) => ({
    type: actionTypes.FETCH_SEASON_FAILED,
    payload: {
        error
    }
});

export const fetchSeason = (showId, seasonNumber, ssrHeaders = {}) => async (dispatch, getState) => {
    const state = getState();
    const cached = getSeasonIdentifiers(state);
    if (showId === cached.showId && seasonNumber === cached.seasonNumber) return;
    dispatch(fetchSeasonRequest());
    try {
        const response = await a.get(`api/show/${showId}/season/${seasonNumber}`, {
            headers: ssrHeaders
        });
        dispatch(fetchSeasonSuccess(response.data, showId, seasonNumber));
    } catch (error) {
        dispatch(fetchSeasonFailed(error));
        throw new Error(error.response.status);
    }
}


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
        dispatch(rateEpisodeFailed('User not logged in'));
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
}

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
} 
