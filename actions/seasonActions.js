import * as actionTypes from '../actionTypes';
import { getSeasonDetails } from '../Api';
import { getSeasonIdentifiers } from '../reducers/seasonReducer';
import { getUserSessionId } from '../reducers/sessionReducer';

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

export const fetchSeason = (showId, seasonNumber) => async (dispatch, getState) => {
    const state = getState();
    const cached = getSeasonIdentifiers(state);
    if (showId === cached.showId && seasonNumber === cached.seasonNumber) return;
    dispatch(fetchSeasonRequest());
    try {
        const response = await getSeasonDetails(showId, seasonNumber, getUserSessionId(state));
        dispatch(fetchSeasonSuccess(response, showId, seasonNumber));
    } catch (error) {
        dispatch(fetchSeasonFailed(error));
    }
}