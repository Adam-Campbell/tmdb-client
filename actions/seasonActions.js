import * as actionTypes from '../actionTypes';
import { 
    getSeasonDetails,
    postEpisodeRating,
    deleteEpisodeRating 
} from '../Api';
import { getSeasonIdentifiers } from '../reducers/seasonReducer';
import { getUserSessionId } from '../reducers/sessionReducer';
import { a } from '../axiosClient';

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
    }
}


const rateEpisodeSuccess = (rating, showId, seasonNumber, episodeNumber) => ({
    type: actionTypes.RATE_EPISODE_SUCCESS,
    payload: {
        rating,
        showId,
        seasonNumber, 
        episodeNumber
    }
});

const rateEpisodeFailed = (error) => ({
    type: actionTypes.RATE_EPISODE_FAILED,
    payload: {
        error
    }
});

export const rateEpisode = (showId, seasonNumber, episodeNumber, rating) => async (dispatch, getState) => {
    const state = getState();
    const sessionId = getUserSessionId(state);
    if (!sessionId) {
        dispatch(rateEpisodeFailed('User not logged in'));
        return;
    }
    try {
        const response = await postEpisodeRating(showId, seasonNumber, episodeNumber, rating, sessionId);
        dispatch(rateEpisodeSuccess(rating, showId, seasonNumber, episodeNumber));
    } catch (error) {
        console.log(error);
        dispatch(rateEpisodeFailed(error));
    }
}

const removeEpisodeRatingSuccess = (showId, seasonNumber, episodeNumber) => ({
    type: actionTypes.REMOVE_EPISODE_RATING_SUCCESS,
    payload: {
        showId,
        seasonNumber,
        episodeNumber
    }
});

const removeEpisodeRatingFailed = (error) => ({
    type: actionTypes.REMOVE_EPISODE_RATING_FAILED,
    payload: {
        error
    }
});

export const removeEpisodeRating = (showId, seasonNumber, episodeNumber) => async (dispatch, getState) => {
    const state = getState();
    const sessionId = getUserSessionId(state);
    if (!sessionId) {
        dispatch(removeEpisodeRatingFailed('User not logged in'));
        return;
    }
    try {
        const response = await deleteEpisodeRating(showId, seasonNumber, episodeNumber, sessionId);
        dispatch(removeEpisodeRatingSuccess(showId, seasonNumber, episodeNumber));
    } catch (error) {
        console.log(error);
        dispatch(removeEpisodeRatingFailed(error));
    }
} 